---
layout: casestudy
title: "AI/ML Platform: Token-Based Monetization with Inference Metering"
description: "How an AI inference API can sell prepaid token credits with Pay-per-Use, report consumption in batches and gate premium models with a Subscription."
permalink: "/case-studies/ai-api-monetization/"
img: "/img/case-studies/netlicensing-case-study-ai-api-monetization.png"
tags:
- Case Studies
- Use Cases
- AI/ML Platform
- API Provider
- Token-Based Billing
- Inference Metering
industry:
- AI/ML Platform / API Provider
use-case:
- AI API monetization
- Token-based billing
- Inference metering
favorite-feature:
- Licensing Model "Pay-per-Use"
- Licensing Model "Subscription"
- Warning Levels & Notifications
---

### Challenge

A small company hosts language and vision models behind a REST API. Developers sign up, get an API key and pay for what they use.

They started with a flat price per request. That didn't hold up for long. A short completion and a 4,000-token answer cost the same, although the long one used many times the GPU time. There were no spending limits either. One customer's retry loop ran all weekend and produced a bill nobody wanted to pay.

What they needed:

- Prepaid credits that match real cost, counted in tokens.
- A hard stop when the credits run out, plus a warning before that.
- Access to the larger models only for customers on a paid plan.

### Approach

Each customer account is a licensee. The product has two modules:

```
Product: Inference API
├── Module "Credits" – Pay-per-Use
│   ├── Welcome credits: QUANTITY 200, price 0, automatic
│   ├── Pack S:  QUANTITY 10,000   (1 credit = 1,000 tokens)
│   └── Pack L:  QUANTITY 100,000  (lower price per credit)
└── Module "Large models" – Subscription
    └── Monthly access: TIMEVOLUME 1 MONTH
```

[Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) keeps a simple counter per license, `quantity` and `usedQuantity`. What one credit means is up to the vendor. Here it's 1,000 tokens, and the large models count double. NetLicensing doesn't know about tokens or GPUs. It counts credits.

The API gateway doesn't call NetLicensing for every inference request. That would add latency, and every API call counts toward the vendor's [rate limit](https://netlicensing.io/wiki/faq-api-rate-limit). Instead, the gateway adds up the credits used per customer and reports them every minute in a single validation:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-CREDITS" \
  -d "usedQuantity0=37" \
  https://go.netlicensing.io/core/v2/rest/licensee/ACC-77120/validate
```

The response contains `remainingQuantity` for "Credits" and `valid` plus `expires` for "Large models". The gateway keeps both in memory until the next report. When `remainingQuantity` reaches zero, `valid` becomes `false` and the gateway answers new requests with "402 Payment Required". Usage that hasn't been reported yet stays on the gateway's side until the call succeeds, so nothing is lost when the network hiccups.

For long batch jobs, the gateway can reserve credits upfront with `reserveQuantity` instead of reporting afterwards. That way a job can't start if the balance won't cover it.

#### Warning before the balance runs out

Pay-per-Use modules have [warning levels](https://netlicensing.io/wiki/warning-level), and the yellow threshold is a percentage set on the module. The vendor registers a [webhook](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED`. When an account turns yellow, the vendor's back end sends a "you're running low on credits" email with a top-up link.

#### Topping up

The top-up link comes from a shop token for the customer:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "tokenType=SHOP" -d "licenseeNumber=ACC-77120" \
  -d "successURL=https://console.inference.example/billing" \
  https://go.netlicensing.io/core/v2/rest/token
```

The customer buys a credit pack or the monthly "Large models" access in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) and pays with PayPal or Stripe. The new credits add up with what's left. On the next report the gateway sees the higher balance and serves requests again.

#### Larger customers

Some customers want an invoice instead of a card payment. For them, the vendor's sales team creates a large credit license from its own back end. The customer's own billing happens outside NetLicensing. The gateway works exactly the same way.

### Results

- Customers pay for what they actually use, in units that follow the vendor's real costs.
- When credits are used up, requests stop at the gateway. A runaway script can't run up a bill anymore.
- Customers get a warning email before their balance runs out, and they can top up themselves.
- Credit packs and prices are configured in the [Management Console](https://ui.netlicensing.io). The gateway code doesn't change when prices do.

More on this pattern: [Usage-based software licensing](https://netlicensing.io/wiki/usage-based-licensing). To try it, [create a free account](https://ui.netlicensing.io/#/register).
