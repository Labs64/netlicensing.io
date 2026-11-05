---
layout: casestudy
title: "Telecom Analytics: Multi-Tier Usage Licensing"
description: "How a network analytics SaaS for operators can price by subscriber count with Pricing Table tiers, let operators add capacity in blocks and apply volume discounts in the Shop."
permalink: "/case-studies/telecom-usage-licensing/"
img: "/img/case-studies/netlicensing-case-study-telecom-usage-licensing.png"
tags:
- Case Studies
- Use Cases
- Telecommunications
- Usage-Based
- Volume Licensing
industry:
- Telecommunications / Network Operations
use-case:
- Subscriber-count licensing
- Feature-tiered modules
- Self-serve capacity expansion
favorite-feature:
- Licensing Model "Pricing Table"
- Licensing Model "Quota"
- Volume Discounts
---

### Challenge

A company sells a cloud platform that monitors network quality for mobile and fixed-line operators: dropped calls, congestion, outages, suspicious traffic. Its customers range from regional ISPs with 40,000 subscribers to national carriers with millions.

Everyone paid the same yearly fee. The small ISPs found it too expensive, and the large carriers got a bargain. The product also had three parts, Monitoring, Forecasting and Security, that were sold as one package, although many smaller operators only wanted Monitoring. When an operator grew, say after buying a competitor, a bigger licence meant a new contract negotiation.

### Approach

Each operator is a licensee. Price follows two things: which tier the operator chose, and how many subscribers it monitors.

```
Product: NetPulse (volume discount: 10% from EUR 50,000 cart total)
├── Module "Tier" – Pricing Table
│   SKUs: MONITORING, FORECASTING, SECURITY (features), SUBSCRIBERS (quota)
│   Monitor   TIMEVOLUME 1 YEAR   MONITORING            SUBSCRIBERS=50000
│   Insight   TIMEVOLUME 1 YEAR   + FORECASTING         SUBSCRIBERS=250000
│   Complete  TIMEVOLUME 1 YEAR   + FORECASTING, SECURITY  SUBSCRIBERS=1000000
└── Module "Extra subscribers" – Quota
    └── Block: QUANTITY, quantity = 50000
```

The [Pricing Table](https://netlicensing.io/wiki/pricing-table) tiers decide which parts of the product an operator can use and how many subscribers are included. Operators who outgrow their tier buy extra blocks in a separate [Quota](https://netlicensing.io/wiki/quota) module. Quota adds up all active blocks, so an Insight customer with two extra blocks is licensed for 350,000 subscribers.

The platform measures the number of active subscribers it sees in each operator's data every day. It then validates:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "measuredSubscribers=287400" \
  https://go.netlicensing.io/core/v2/rest/licensee/OP-ALPENNET/validate
```

The result contains the tier's features, the included `SUBSCRIBERS` value and the extra block `quota`. The platform adds the two and compares that total with its own measurement. NetLicensing provides the licensed number, and the platform does the counting. `measuredSubscribers` isn't a NetLicensing field. Extra validation parameters are stored as licensee properties, so the vendor's account team can see each operator's latest count in the [Management Console](https://ui.netlicensing.io).

An operator above its licensed number isn't cut off, because a monitoring outage during a network incident would hurt everyone. Instead, the platform shows a banner to the operator's admins, and the account manager is notified. After 30 days above the limit, new data sources can't be added until the operator buys more capacity.

#### Buying capacity

Operators add blocks themselves in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop), opened from the platform with a shop token. The product's volume discount applies automatically once the cart reaches the threshold, which makes large expansions cheaper without a negotiation. Large carriers with framework agreements get their tiers and blocks created by the vendor's sales team and invoiced under the contract.

### Results

- Small operators pay for a small tier, and large carriers pay according to their size.
- Forecasting and Security are sold as separate tiers instead of being bundled for everyone.
- Growing operators buy capacity in blocks, with volume discounts, without a new contract.
- The licensed subscriber number comes from NetLicensing, the measured one from the platform, and both are visible to the account team.

Pricing a B2B platform by customer size? Read [Usage-based software licensing](https://netlicensing.io/wiki/usage-based-licensing) or [contact us](https://netlicensing.io/contact/).
