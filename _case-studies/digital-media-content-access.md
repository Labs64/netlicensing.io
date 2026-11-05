---
layout: casestudy
title: "Streaming Platform: Monetizing Digital Media with Flexible Access Models"
description: "How a video and audio platform can combine a catalogue subscription, a limit on simultaneous streams and prepaid credits for single titles in one NetLicensing product."
permalink: "/case-studies/digital-media-content-access/"
img: "/img/case-studies/netlicensing-case-study-digital-media-content-access.png"
tags:
- Case Studies
- Use Cases
- Digital Media
- Content Platform
- Streaming Access
industry:
- Digital Media / Content Platform
use-case:
- Content monetization
- Streaming access control
- Publisher content gating
favorite-feature:
- Licensing Model "Subscription"
- Licensing Model "Floating"
- Licensing Model "Pay-per-Use"
---

### Challenge

A platform streams documentaries, lecture series and audio dramas from independent producers. It started with one monthly subscription for everything. Two things kept coming up:

- Many visitors only wanted one film or one lecture series. A monthly plan was too much for them, so they left.
- Some subscriptions were clearly shared. One account would stream in four cities at the same time.

The platform wanted to keep the subscription, add a way to pay for single titles, and limit how many streams an account can run at once.

### Approach

Each viewer account is a licensee. Three modules cover the three rules:

```
Product: StreamHouse (licenseeAutoCreate = true)
├── Module "Membership" – Subscription
│   ├── Month: TIMEVOLUME 1 MONTH
│   └── Year:  TIMEVOLUME 1 YEAR
├── Module "Streams" – Floating, maxCheckoutValidity = 300 s
│   ├── Free:   FLOATING, maxSessions = 1, price 0, automatic
│   └── Family: FLOATING, maxSessions = 3
└── Module "Credits" – Pay-per-Use
    ├── 5 credits:  QUANTITY 5
    └── 20 credits: QUANTITY 20
```

**Membership.** A [Subscription](https://netlicensing.io/wiki/subscription) unlocks the whole catalogue while it runs. Validation returns `valid` and `expires`.

**Single titles.** Viewers without a membership buy credit packs. Unlocking a title costs credits. The platform decides how many, for example one for a film and three for a lecture series. Credits are a [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) counter. When a viewer unlocks a title, the platform reserves the credits for it:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-CREDITS" -d "reserveQuantity0=3" \
  https://go.netlicensing.io/core/v2/rest/licensee/VIEWER-51007/validate
```

If the balance covers the price, the credits are deducted and the response returns `valid=true` with the new `remainingQuantity`. If it doesn't, nothing is deducted and `valid=false` tells the platform to offer a credit pack. NetLicensing counts credits, not titles, so the platform stores which titles a viewer has unlocked in its own database.

**Simultaneous streams.** Every player checks out a [Floating](https://netlicensing.io/wiki/floating) session when playback starts and checks out again every few minutes while it plays:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-STREAMS" \
  -d "sessionId0=tv-livingroom-8c2f" -d "action0=checkOut" \
  https://go.netlicensing.io/core/v2/rest/licensee/VIEWER-51007/validate
```

Every account gets one stream for free. The Family add-on raises the limit to three. A fourth device gets `valid=false` and shows "Your account is already streaming on 3 devices". When playback stops, the player checks in. A player that crashes or loses its connection releases its session after five minutes.

The same validation call returns all three modules. The streaming back end caches the Membership and Credits results per viewer until their `ttl`. Only the stream checkout runs on every playback start.

#### Buying

"Subscribe", "Buy credits" and "Add Family streams" open the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) from a shop token for the viewer. Viewers pay with PayPal or Stripe, and monthly PayPal memberships can renew automatically. A [webhook](https://netlicensing.io/wiki/notifications) on `LICENSE_CREATED` clears the cached result, so a new purchase works at once.

### Results

- Viewers can choose a membership or pay for single titles, and both run through the same entitlement check.
- Account sharing is limited by the number of simultaneous streams, not by blocking devices.
- Credits, streams and memberships are separate products in the Shop, each with its own price.
- Producers' titles can be priced in credits without changing how the platform validates.

Monetising media or content? See [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) and [Floating](https://netlicensing.io/wiki/floating), or [contact us](https://netlicensing.io/contact/).
