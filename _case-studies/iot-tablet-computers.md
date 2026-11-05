---
layout: casestudy
title: "Internet of Things: Tablet Computers"
description: "How a tablet start-up leased its devices to companies and charities instead of selling them, with every tablet working only while its NetLicensing subscription is active."
permalink: "/case-studies/iot-tablet-computers/"
img: "/img/case-studies/netlicensing-case-study-iot-tablet-computers-v2.png"
tags:
- Case Studies
- Use Cases
- Subscription
- Internet of Things
industry:
- Hardware
use-case:
- Subscription
- Device leasing
- Activation
favorite-feature:
- Licensing Model "Subscription"
- Licensing Model "Rental"
- NetLicensing API
---

### Challenge

More and more companies don't just sell physical products online. They lease them on a subscription.

One of our customers, a start-up that makes tablet computers, is a good example. With the help of a large investment they had built a first batch of their first-generation device. Selling those tablets at a reasonable profit would have been hard, though. The market was crowded, and the big manufacturers already offered plenty of cheap entry-level devices.

### Approach

So the company took a different route, using NetLicensing for subscription management. Instead of selling the tablets, they would lease them to companies and charities for much less than the purchase price. Both sides benefit: customers get devices they otherwise couldn't afford, and the manufacturer gets a regular income.

A tablet only works while it has an active subscription. Each customer organisation is registered in NetLicensing with its email address, and NetLicensing keeps track of what the manufacturer needs to know: which devices are in use, the payments, and how long each subscription runs.

Today we'd model this with the [Rental](https://netlicensing.io/wiki/rental) licensing model, which is essentially a set of independent subscriptions, one per device:

```
Product: Tablet Lease
└── Module "Tablets" – Rental, yellowThreshold = 14, redThreshold = 3 (days)
    ├── Tablet:   FEATURE, one license per device, license number = device serial
    ├── 3 months: TIMEVOLUME 3 MONTH
    └── 1 year:   TIMEVOLUME 1 YEAR
```

A customer organisation leasing 25 tablets has 25 FEATURE licenses, one per serial number. Each has its own lease period linked through `parentFeature`. Tablets added later get their own start date, and a returned tablet's license is set to `active=false`.

Each tablet checks its status when it starts and once a day after that:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/xml" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/IT-CHARITY-EXAMPLE-ORG/validate
```

The response lists every tablet of the organisation with `valid`, `expires` and a warning level. A tablet looks for its own serial number. If its lease is valid, it starts normally. If the lease has run out, it shows a message to contact the organisation's administrator. The tablet keeps the last signed response until its `ttl`, so a missing WiFi connection doesn't lock anyone out for a day.

Two weeks before a lease ends, the tablet's entry turns yellow. The manufacturer uses that to send the organisation a renewal reminder ([warning levels](https://netlicensing.io/wiki/warning-level) together with [webhooks](https://netlicensing.io/wiki/notifications)). Renewing is one more TIMEVOLUME license for the same tablet, created by the manufacturer's back end or bought by the customer in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop).

### Results

For the business, leasing created a regular income stream. The margin per device was smaller than with an outright sale, but the steady revenue let the company reinvest in developing the product and building more devices.

All of this runs on licensing managed through NetLicensing: tablets work only while their subscription is active, and every organisation's devices, payments and subscription periods are tracked in one place.

Thinking about leasing hardware instead of selling it? [Contact us](https://netlicensing.io/contact/).
