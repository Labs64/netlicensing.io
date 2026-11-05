---
layout: casestudy
title: "Data Analytics Platform: Usage-Based Billing for Data Products"
description: "How a data platform can meter compute units with Pay-per-Use: prepaid packs for self-service customers, a monthly committed allowance for enterprise contracts and a storage limit with Quota."
permalink: "/case-studies/usage-based-billing-data/"
img: "/img/case-studies/netlicensing-case-study-usage-based-billing-data.png"
tags:
- Case Studies
- Use Cases
- Data Analytics
- Business Intelligence
- Usage-Based Billing
industry:
- Data Analytics / Business Intelligence Platform
use-case:
- Query metering
- Data consumption billing
- Committed usage contracts
- Custom usage units
favorite-feature:
- Licensing Model "Pay-per-Use"
- Licensing Model "Quota"
- Licensing Model "Subscription"
---

### Challenge

A company runs a hosted SQL analytics platform: customers load their data, run queries and schedule reports. It charged per analyst seat.

Seats had little to do with cost. A team of five running heavy queries over terabytes cost the company far more than a team of fifty building a few dashboards, but the small heavy team paid less. The company wanted to charge by compute instead, using a unit it could measure reliably.

Two customer groups needed different terms. Self-service teams wanted to pay upfront with a card and top up when needed. Enterprise customers wanted a contract with a monthly committed volume and an invoice at the end of the month.

### Approach

The platform measures every query in **compute units** (CU), its own measure combining scanned data and processing time. NetLicensing counts CUs. It doesn't need to know how they're calculated.

Each customer workspace is a licensee:

```
Product: QueryCloud (licenseeAutoCreate = true)
├── Module "Compute" – Pay-per-Use
│   ├── Starter credits: QUANTITY 500, price 0, automatic
│   ├── Pack 10k:        QUANTITY 10000
│   ├── Pack 100k:       QUANTITY 100000
│   └── Enterprise month: QUANTITY per contract, hidden
├── Module "Storage" – Quota
│   ├── Included: QUANTITY 100 (GB), price 0, automatic
│   └── Extra 500 GB: QUANTITY 500
└── Module "Workspace" – Subscription
    └── Month: TIMEVOLUME 1 MONTH
```

**Compute.** Every workspace starts with 500 free CUs. The query engine adds up CUs per workspace and reports them every minute with [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use):

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-COMPUTE" -d "usedQuantity0=86" \
  https://go.netlicensing.io/core/v2/rest/licensee/WS-ATLAS-ANALYTICS/validate
```

The response returns `remainingQuantity`. When the balance reaches zero, the engine stops accepting new queries for that workspace. Queries that are already running finish. The platform's usage page shows the current balance with the same call and `dryRun=true`, which returns the result without changing anything.

**Storage.** The [Quota](https://netlicensing.io/wiki/quota) module returns the workspace's storage limit in GB. The platform knows how much data is stored and refuses new loads once the limit is reached. Quota is a fixed limit and isn't used up, so it fits storage better than Pay-per-Use does.

**Workspace.** A small monthly [Subscription](https://netlicensing.io/wiki/subscription) keeps the workspace, its users and its scheduled reports active.

#### Self-service and enterprise

Self-service teams buy packs in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) from the usage page. A [webhook](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED` triggers a "you're running low" email before a balance runs out.

For enterprise contracts, the platform's billing job creates one hidden "Enterprise month" license at the start of each month, with `quantity` set to the committed volume from the contract. At the end of the month it reads that license, takes `usedQuantity` for the invoice, and sets the license to `active=false`. Invoicing itself happens in the vendor's own billing system. NetLicensing provides the usage number. If an enterprise customer is close to using up its monthly volume, the same warning webhook alerts the account manager, who can add volume before queries stop.

### Results

- Customers pay for the compute they use, measured in one unit across the platform.
- Self-service teams pay upfront and top up themselves, and enterprise customers get a monthly committed volume and an invoice.
- Storage is limited separately, as a fixed quota that grows with paid add-ons.
- The usage page shows live balances without affecting them, thanks to dry-run validation.

Moving from seats to usage-based pricing? Read [Usage-based software licensing](https://netlicensing.io/wiki/usage-based-licensing) or [contact us](https://netlicensing.io/contact/).
