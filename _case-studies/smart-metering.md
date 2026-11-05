---
layout: casestudy
title: "Smart Metering: Feature Enablement and Consumption Tracking"
description: "How a smart meter supplier can license its head-end software per utility: a meter count with Quota, optional analytics modules with Multi-Feature and on-demand meter reads with Pay-per-Use."
permalink: "/case-studies/smart-metering/"
img: "/img/case-studies/netlicensing-case-study-smart-metering.png"
tags:
- Case Studies
- Use Cases
- Smart Metering
- Utilities
- Industrial IoT
industry:
- Utilities / Industrial IoT
use-case:
- Meter count licensing
- Usage-based metering
- Feature enablement
favorite-feature:
- Licensing Model "Quota"
- Licensing Model "Multi-Feature"
- Licensing Model "Pay-per-Use"
---

### Challenge

A company supplies smart electricity meters and the head-end system that utilities use to collect readings from them. The head-end software runs in the utility's data centre and talks to hundreds of thousands of meters.

The software was sold as one large licence, sized by guesswork at the start of a rollout. Utilities that rolled out meters more slowly than planned felt they had overpaid. Those that grew faster ran past the agreed number without anyone noticing. Analytics like power quality monitoring were sold as separate projects. And on-demand reads, where the utility pulls a reading outside the normal schedule (for a move-out, say), put load on the network but weren't charged at all.

### Approach

Each utility is a licensee. The head-end server validates the utility on start-up and every few hours. It's the only component that talks to NetLicensing. The meters themselves never do.

```
Product: GridHead HES
├── Module "Meters" – Quota
│   └── Meter block: QUANTITY, quantity = 10000
├── Module "Analytics" – Multi-Feature
│   └── FEATURE templates: POWER-QUALITY, OUTAGE-MAP, THEFT-DETECTION
├── Module "On-demand reads" – Pay-per-Use
│   └── 10,000 reads: QUANTITY 10000
└── Module "Support" – Subscription
    └── 1 year: TIMEVOLUME 1 YEAR
```

**Meter count.** The [Quota](https://netlicensing.io/wiki/quota) module returns how many meters the utility has licensed: the sum of its meter blocks. The head-end system knows how many meters are commissioned, and it compares the two. Commissioning stops with a clear message once the quota is reached. A utility that grows buys another block of 10,000.

**Analytics.** Optional modules are [Multi-Feature](https://netlicensing.io/wiki/multi-feature) licenses. The head-end system switches each analytics screen and job on or off according to the validation result.

**On-demand reads.** Each read outside the schedule uses one [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) credit. The head-end server counts them and reports them in batches:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/xml" \
  -d "productModuleNumber0=M-ONDEMAND" -d "usedQuantity0=412" \
  -d "commissionedMeters=48731" \
  https://go.netlicensing.io/core/v2/rest/licensee/UTIL-NORDSTROM-ENERGI/validate
```

The response contains the meter `quota`, the analytics features, the support contract's `expires` date and the `remainingQuantity` of on-demand reads, all in one answer. Scheduled reads are never limited. When on-demand credits run out, only on-demand requests are refused, and operators see how many are left on the dashboard.

#### In the utility's data centre

Utility networks are tightly controlled. The head-end server reaches NetLicensing through the utility's outbound proxy, and only that one host is allowed. Responses are signed, and the server keeps the last signed result until its `ttl`, so a proxy maintenance window doesn't affect operations. Utilities whose policy doesn't allow any outbound connection use the [NetLicensing Agent](https://netlicensing.io/wiki/netlicensing-agent) inside their network instead. Pay-per-Use isn't recommended on the current Agent release, so those utilities get on-demand reads as part of their contract.

#### Alerts

A [webhook](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED` alerts the supplier's account manager when a utility's on-demand credits get low. The head-end server also sends its current meter count with each validation (`commissionedMeters` above). NetLicensing stores any extra validation parameter as a licensee property, so the account manager sees the count in the Console and can offer the next meter block before commissioning stops.

### Results

- Utilities pay for the meters they actually run, in blocks they buy as the rollout progresses.
- Analytics modules are switched on remotely, with no new software installation.
- On-demand reads, which cost network capacity, are now metered and paid for.
- One signed validation per server gives the head-end system everything it needs.

Licensing software for utilities or critical infrastructure? [Contact us](https://netlicensing.io/contact/).
