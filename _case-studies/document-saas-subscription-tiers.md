---
layout: casestudy
title: "Document SaaS: Credit Packs to Subscription Tiers"
description: "How a document conversion and e-signature service can move from credit packs to monthly plans, keep customers' unused credits for overage and offer a switch-over promo code."
permalink: "/case-studies/document-saas-subscription-tiers/"
img: "/img/case-studies/netlicensing-case-study-document-saas-subscription-tiers.png"
tags:
- Case Studies
- Use Cases
- Document Automation
- Subscription
- Overage Pricing
industry:
- Document Automation / eSignature SaaS
use-case:
- Credit-to-subscription migration
- Overage billing
- Trial management
favorite-feature:
- Licensing Model "Pricing Table"
- Licensing Model "Pay-per-Use"
- Licensing Model "Discount"
---

### Challenge

A service converts documents (PDF to Word, scans to searchable PDF) and collects e-signatures. Since launch it sold credit packs: one credit per conversion, five per signature request. Revenue came in bursts and was hard to plan. Teams that used the service daily kept running out of credits in the middle of a job and had to stop and buy more.

The company decided to offer monthly plans with an included volume, and to sell extra volume on top. Two constraints made it tricky. Existing customers had paid for credits they hadn't used yet and had to keep them. And the switch had to happen without a big-bang migration.

### Approach

Each customer team is a licensee. The product gets a new Pricing Table module, and the credit packs stay as they were:

```
Product: DocFlow (licenseeAutoCreate = true)
├── Module "Plans" – Pricing Table
│   SKUs: CONVERSIONS (quota, per month), SIGNATURES (quota, per month), TEMPLATES (feature)
│   Starter  TIMEVOLUME 1 MONTH   CONVERSIONS=200    SIGNATURES=20   TEMPLATES=false
│   Team     TIMEVOLUME 1 MONTH   CONVERSIONS=1000   SIGNATURES=100  TEMPLATES=true
│   Business TIMEVOLUME 1 MONTH   CONVERSIONS=5000   SIGNATURES=500  TEMPLATES=true
├── Module "Credits" – Pay-per-Use        (the existing credit packs)
│   └── 100 credits, 500 credits, 2000 credits
└── Module "Promotions" – Discount
    └── SWITCH30: 30% off the order, valid until the end of the campaign
```

The [Pricing Table](https://netlicensing.io/wiki/pricing-table) plans set the monthly allowance for each team. NetLicensing returns the limits. The service counts each team's conversions and signatures per billing month in its own database and compares them with the limits.

When a team goes over its allowance, the service doesn't stop. It switches to the [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) credits, which are now the overage. Existing customers' unused credits sit right there, so nothing had to be migrated. The credit licenses they bought before simply stay on their licensee.

The service validates a team when a job starts and reports credit use in batches:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productNumber=DOCFLOW" \
  -d "productModuleNumber0=M-CREDITS" -d "usedQuantity0=14" \
  https://go.netlicensing.io/core/v2/rest/licensee/TEAM-1180/validate
```

The response returns the current plan with its SKU values and the remaining credits (`remainingQuantity`). If a team has neither allowance nor credits left, the job editor shows two buttons: "Buy credits" and "Upgrade plan".

#### Moving customers over

Credit customers see a banner: "Switch to a monthly plan and keep your credits." The link opens the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) from a shop token for their team. At checkout they enter the [Discount](https://netlicensing.io/wiki/discount) promo code `SWITCH30` for 30% off the order. The code has an end date, so the offer closes on its own.

New customers get a free 14-day Team plan (an automatic, hidden TIMEVOLUME plan at price 0) and drop to credits-only use afterwards, unless they subscribe.

Plan reminders use [warning levels](https://netlicensing.io/wiki/warning-level): a monthly plan turns yellow when 80% of its time is used, and a `WARNING_LEVEL_CHANGED` [webhook](https://netlicensing.io/wiki/notifications) triggers the renewal email.

### Results

- Teams pay a predictable monthly price, and heavy months are covered by credits instead of interrupted jobs.
- Existing customers kept every credit they had paid for. No data migration was needed.
- The switch-over offer runs as a promo code with an end date, configured in the [Management Console](https://ui.netlicensing.io).
- Plans, allowances and credit packs live side by side in one product and are checked with one validation call.

Thinking about moving from credits to plans? Read [Usage-based software licensing](https://netlicensing.io/wiki/usage-based-licensing) or [talk to us](https://netlicensing.io/contact/).
