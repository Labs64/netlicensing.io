---
layout: post
title: "Node-Locked vs Floating Licensing: Which to Choose"
description: "Choose between node-locked and floating licenses by constraint: devices, concurrent users, offline use, CI runners and Kubernetes, with the NetLicensing setup for each."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-node-locked-vs-floating-hero.png
  alt: "Node-locked vs floating licensing: decide by constraint"
tags:
  - "Node-Locked Licensing"
  - "Floating License"
  - "Concurrent License"
  - "Software Licensing Models"
  - "CI Licensing"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-node-locked-vs-floating-hero.png
    - /img/blog/netlicensing-node-locked-vs-floating-decision.png
---

A design studio has twelve people, seven workstations and a build server that wakes up at night. Ask them how many licenses they need and you will get three different answers, all of them reasonable.

The answer depends on what you want to count. Node-locked licensing counts places where the software may run. Floating licensing counts how many are running it right now.

## Key takeaways

- **Node-locked** suits fixed machines and per-device pricing.
- **Floating** suits teams where more people need the tool than use it at the same moment.
- Offline work, CI runners and Kubernetes change the answer more than company size does.
- You can use both in one product, one module for each.

![Decision flow: if more people need the software than use it at once choose Floating; otherwise, if devices must be limited choose Node-Locked; otherwise license the account with Subscription or Pricing Table]({{ "/img/blog/netlicensing-node-locked-vs-floating-decision.png" | relative_url }})

## Decide by constraint

| Your constraint | Node-Locked | Floating |
| --- | --- | --- |
| Each person has their own fixed machine | Good fit | Works, with little to gain |
| Shifts or classrooms share a pool | Poor fit, every device needs a slot | Good fit |
| Price per device | Natural | Awkward |
| Machines are offline after activation | Possible, with cached or signed results | Needs a server to check out seats |
| Short-lived CI runners | Every new runner needs a free slot | Seat is returned after the job |
| Autoscaling containers | Poor fit, identities change | Possible, one session per replica |
| Hardware dongle | Supported through predefined or client secrets | Not what it is for |

## How the two behave

With node-locked, the license remembers devices. A node secret that has been seen once keeps working, and a new one is accepted only while the quota has room. Someone who replaces a laptop needs the old secret removed.

With floating, the license remembers nothing about your machines. It holds a number of seats, `maxSessions`. Your application checks a session out, keeps it alive and checks it in. If an application crashes, the seat comes back when its checkout expires, which is why a short `maxCheckoutValidity` matters.

> One model remembers where you have been. The other only cares who is here now.

## Set up Node-Locked

Create a product module with the Node-Locked model and a license template with a `quota`, for example 2. Choose client mode so new devices bind on first use, or predefined mode if you hand out the secrets yourself. Your application sends:

```text
productModuleNumber0=M-NODE&nodeSecret0=<stable fingerprint>
```

NetLicensing does not create the fingerprint. Our [machine ID generator]({{ "/blog/2026/12/07/machine-id-generator-node-locked-licensing/" | relative_url }}) shows one recipe.

## Set up Floating

Create a product module with the Floating model, set its `maxCheckoutValidity` in seconds, and add a license template with `maxSessions`. Check out and check in with:

```text
productModuleNumber0=M-FLOAT&sessionId0=host-42&action0=checkOut
productModuleNumber0=M-FLOAT&sessionId0=host-42&action0=checkIn
```

A successful check-out returns `valid=true` and an `expirationTimestamp`. Checking out again before then extends the session. A check-in returns `valid=false` by design, so do not treat that as an error.

## CI runners and Kubernetes replicas

Floating works well for jobs that start, run and stop, as long as each one uses its own session ID, such as the pod or runner name, and returns the seat when it finishes. A small wrapper does it:

```sh
#!/bin/sh
# Take a floating seat for this replica, run the job, give the seat back.
set -eu
NLIC_URL="${NLIC_URL:-https://go.netlicensing.io/core/v2/rest}"
SESSION="${HOSTNAME}"          # the pod name in Kubernetes
MODULE="M-FLOAT"               # your Floating product module number

seat() {
  curl --silent --show-error --fail --user "apiKey:${NLIC_API_KEY}" \
    --header "Accept: application/json" \
    --data "productModuleNumber0=${MODULE}&sessionId0=${SESSION}&action0=$1" \
    "${NLIC_URL}/licensee/${LICENSEE}/validate"
}

seat checkOut | grep -Eq '"name" *: *"valid" *, *"value" *: *"true"' || { echo "no free seat" >&2; exit 1; }
trap 'seat checkIn >/dev/null || true' EXIT
"$@"
```

We tested this script against a mock of the documented API. Before you rely on it, count your calls. Every request counts toward your plan's [monthly API calls](https://netlicensing.io/wiki/faq-api-rate-limit): 1,000,000 on Premium and customizable on Select. A fleet that checks out hundreds of seats per minute needs that conversation first. If a job is killed without running the exit handler, the seat returns when the checkout expires.

## Offline use

A node-locked result can be cached until its `ttl`, or delivered as a [signed offline validation file](https://netlicensing.io/wiki/offline-license-validation) after the devices are bound. Floating needs something to hand out seats: the cloud, or the [NetLicensing Agent](https://netlicensing.io/wiki/netlicensing-agent) on the local network, which is part of the Select plan. The Agent treats sessions as checked in for up to `maxCheckoutValidity` after a repeated asset import.

## When to combine them

Some products need both: ten concurrent seats, usable only on registered machines. Add one Node-Locked module and one Floating module to the same product. One validation request can carry parameters for both, numbered `0` and `1`, and your application unlocks only when both results are valid.

## Questions people ask

### Is a floating license the same as a concurrent license?

Yes. Both names mean the limit applies to sessions running at the same time.

### Can a floating license work without the internet?

Only with a local server that can track seats, such as the NetLicensing Agent. A static file cannot.

### What happens if a floating session is never checked in?

It expires after the maximum checkout validity. You can also force a check-in by removing the session property from the license.

### Which plan do I need?

Both Node-Locked and Floating are available on Premium and Select. See [pricing]({{ "/pricing/" | relative_url }}).

## Choose, then test with real behaviour

Write down how your customers actually work, then try that pattern against a test product: a replaced laptop, a crashed session, a nightly job. The model that survives those three is your answer. The [wiki comparison](https://netlicensing.io/wiki/node-locked-vs-floating-licenses) has the reference details.

<div style="text-align:center;margin:36px 0">
  <a href="https://ui.netlicensing.io/#/register" target="_blank" rel="noopener" style="background:#E14817;color:#fff;padding:16px 40px;border-radius:6px;font-size:20px;font-weight:700;text-decoration:none;display:inline-block">Start with NetLicensing</a>
</div>

*Happy Licensing!*
