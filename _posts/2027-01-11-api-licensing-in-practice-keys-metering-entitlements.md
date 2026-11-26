---
layout: post
title: "API Licensing in Practice: Keys and Metering"
description: "A hands-on API licensing guide: key issuance, 401 vs 403 vs 429, per-key metering with NetLicensing Pay-per-Use, quota limits, webhooks and a runnable Python example."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-api-licensing-hero.png
  alt: "API licensing in practice: keys, status codes, metering and webhooks"
tags:
  - "API Licensing"
  - "API License"
  - "API Monetization"
  - "Usage-Based Licensing"
  - "API Keys"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-api-licensing-hero.png
    - /img/blog/netlicensing-api-licensing-request-flow.png
---

The first paying customer of an API usually asks two questions in the same email: "Where do I get my key?" and "Why did I just get an error?" If your answer to the second is a shrug and a generic 403, you will be debugging their integration for them.

[API Licensing 101]({{ "/blog/2024/01/30/api-licensing-101-generating-recurring-revenue-from-your-apis/" | relative_url }}) covers the business models. This follow-up builds the check itself.

## Key takeaways

- Your API authenticates the caller. The license service answers what that customer may still do.
- Use **401** for an unknown key, **403** for a known caller without access and **429** when the allowance is used up.
- Reserve credits before doing the work if you must not give any away.
- Keep the NetLicensing API key on your server, never in your customers' code.

![Sequence diagram: the client calls your API with a key, the API answers 401 or 403 from its own checks, reserves one credit with NetLicensing and returns 200, or 429 when no credits are left]({{ "/img/blog/netlicensing-api-licensing-request-flow.png" | relative_url }})

## Issue keys you control

NetLicensing has [API keys](https://netlicensing.io/wiki/security) for talking to NetLicensing. They are not your customers' keys. Generate your own key for each customer, store only a hash of it and map it to a NetLicensing licensee number. That mapping is where your API and the license meet.

Rules worth following from day one:

- Show a new key once and let customers rotate it.
- Give each environment its own key, so a leaked test key is not a production incident.
- Log which key made each call, not the key itself.

## 401, 403 or 429

| Status | Meaning | Who decides | What the client should do |
| --- | --- | --- | --- |
| 401 | The key is missing or unknown | Your API | Check the key |
| 403 | The key is valid but the plan does not include this endpoint | Your API, from the license result or your own plan table | Upgrade or call something else |
| 429 | The allowance is exhausted or requests come too fast | Your API | Wait, or buy more |
| 503 | You could not reach the license service | Your API | Retry later |

Do not turn your own upstream trouble into a customer error. NetLicensing can answer 429 to **you** when the system is busy and you are above your plan's rate. That is not your customer's fault, so the example maps it to a 503 with `Retry-After`.

> An error code is part of the contract: it should tell the customer what to do next.

## Pick the metering model

| Question | Model | What validation returns | Plan |
| --- | --- | --- | --- |
| Do customers consume credits per call? | [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) | `remainingQuantity` | Select |
| Is there a ceiling, such as projects or requests per day? | [Quota](https://netlicensing.io/wiki/quota) | `quota` | Select |
| Is access time-limited? | [Subscription](https://netlicensing.io/wiki/subscription) | `expires` | All plans |
| Are features sold separately? | [Multi-Feature](https://netlicensing.io/wiki/multi-feature) | Features and their status | Basic and above |

The difference between the first two catches people out. **Pay-per-Use** counts down. **Quota** is a fixed number that changes only when licenses change, so your application must count usage against it.

## A runnable gateway

The example uses only the Python standard library. The first file calls NetLicensing:

```python
import base64, json, os, urllib.error, urllib.parse, urllib.request

BASE = os.environ.get("NLIC_URL", "https://go.netlicensing.io/core/v2/rest")
AUTH = "Basic " + base64.b64encode(("apiKey:" + os.environ["NLIC_API_KEY"]).encode()).decode()


def post(path, fields):
    request = urllib.request.Request(
        BASE + path,
        data=urllib.parse.urlencode(fields).encode(),
        headers={"Authorization": AUTH, "Accept": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        return json.load(response)


def validate(licensee, fields):
    """Return {productModuleNumber: {property: value}} for one licensee."""
    body = post("/licensee/%s/validate" % urllib.parse.quote(licensee, safe=""), fields)
    modules = {}
    for item in body["items"]["item"]:
        values = {p["name"]: p["value"] for p in item["property"]}
        if item["type"] == "ProductModuleValidation":
            modules[values["productModuleNumber"]] = values
    return modules
```

The second is the API itself. It checks the key, checks the path, reserves one credit and answers:

```python
import hashlib, os, urllib.error
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from nlic import validate

MODULE = "M-API"  # your Pay-per-Use product module number

# Your own key store: SHA-256 of the API key -> licensee number and allowed paths
KEYS = {
    hashlib.sha256(b"demo-customer-key").hexdigest(): {"licensee": "CUSTOMER-123", "paths": {"/v1/report"}},
}


class Gateway(BaseHTTPRequestHandler):
    def reply(self, status, text, headers=None):
        self.send_response(status)
        for name, value in (headers or {}).items():
            self.send_header(name, value)
        self.end_headers()
        self.wfile.write(text.encode())

    def do_GET(self):
        key = self.headers.get("X-API-Key", "")
        client = KEYS.get(hashlib.sha256(key.encode()).hexdigest())
        if client is None:
            return self.reply(401, "unknown API key\n")
        if self.path not in client["paths"]:
            return self.reply(403, "your plan does not include this endpoint\n")
        try:
            module = validate(client["licensee"], {"productModuleNumber0": MODULE, "reserveQuantity0": 1})[MODULE]
        except urllib.error.HTTPError as error:
            wait = error.headers.get("Retry-After", "60")
            return self.reply(503, "license service unavailable, retry later\n", {"Retry-After": wait})
        except (urllib.error.URLError, KeyError):
            return self.reply(503, "license service unavailable, retry later\n", {"Retry-After": "60"})
        if module["valid"] != "true":
            return self.reply(429, "no credits left\n")
        self.reply(200, "report data\n", {"X-Credits-Remaining": module["remainingQuantity"]})


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", int(os.environ.get("PORT", "8000"))), Gateway).serve_forever()
```

Run it with `NLIC_API_KEY=<your key> python3 gateway.py`, then call it:

```bash
curl -i -H "X-API-Key: demo-customer-key" http://127.0.0.1:8000/v1/report
```

We tested this code against a mock that follows the documented validation response, including the 401, 403 and 429 paths. Run it against your own product before using it, and replace the in-memory key table with a real store.

### Reserve or report?

`reserveQuantity` takes credits before the work and refuses when there are not enough. `usedQuantity` reports consumption afterwards and allows the balance to go negative. Reserve when each unit costs you money; report when a short overdraft is acceptable. Never send both in one call.

One call per request is simple, and it uses your rate limit one request at a time. For busy APIs, reserve a block of credits, serve requests from that block and reserve again when it runs low. Decide what happens to an unused block when a server restarts.

## Tell your systems when credits run low

NetLicensing keeps a [warning level](https://netlicensing.io/wiki/warning-level) per licensee, calculated on validation, with rules defined by each licensing model. A [webhook notification](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED` can create a CRM task or email the account owner.

Webhooks need a public HTTPS endpoint, and delivery is not guaranteed. Make your handler safe to run twice, and treat the validation result as the source of truth.

## Questions people ask

### What is an API license?

The terms and the technical entitlement that say who may call an API, which parts, how much and for how long.

### Should rate limiting and licensing be the same thing?

No. Rate limiting protects your service from bursts. Licensing records what a customer bought. Both can answer 429.

### Can I embed my NetLicensing key in a client app?

Only a key with the Licensee role, which can validate, transfer licenses and create shop tokens. A server-side API like the one above should keep its key private.

### What if the license service is unreachable?

Decide in advance. Serving from a cached result until its `ttl` is common for time-based licenses. For metered calls, refusing may be safer.

## Meter your first endpoint

Start with one endpoint, one Pay-per-Use module and a test customer. Watch the balance fall, exhaust it on purpose and read the error your client receives.

<div style="text-align:center;margin:36px 0">
  <a href="https://ui.netlicensing.io/#/register" target="_blank" rel="noopener" style="background:#E14817;color:#fff;padding:16px 40px;border-radius:6px;font-size:20px;font-weight:700;text-decoration:none;display:inline-block">Start with NetLicensing</a>
</div>

*Happy Licensing!*
