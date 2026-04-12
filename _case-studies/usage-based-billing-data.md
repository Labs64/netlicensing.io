---
layout: casestudy
title: "Data Analytics Platform: Usage-Based Billing for Data Products"
description: "Meter and invoice by queries run, rows processed, reports generated, or any custom usage unit for analytics and data platform vendors"
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
- Report generation tracking
- Custom usage units
favorite-feature:
- Licensing Model "Pay-Per-Use"
- Licensing Model "Quota"
- Licensing Model "Subscription"
---

### Overview

A business intelligence and data analytics platform provides SQL query engines, interactive dashboards, and automated reporting capabilities to data teams, analysts, and data scientists across mid-market and enterprise organizations. The platform integrates with data warehouses (Snowflake, BigQuery, Redshift) and processes billions of rows daily for customers.

For years, the company used seat-based subscription pricing: a fixed monthly fee per analyst user, regardless of query volume or data consumption. This model created severe friction: light users (executing 10–50 queries monthly) subsidized heavy users (executing 10,000+ queries monthly), and compute infrastructure costs bore no relationship to revenue. Neither customers nor the platform benefited from this misalignment.

NetLicensing was implemented as a consumption-based billing engine, enabling query-level metering, flexible quota enforcement, and hybrid pricing combining base subscriptions with usage overages.

### Licensing Challenge

The seat-based pricing model exposed three fundamental problems:

1. **Revenue leakage**: Heavy users consuming 100x more compute than light users paid identical fees. A customer with 50 analysts running complex queries against 50+ GB datasets paid the same as a customer with 50 analysts running simple COUNT queries.
2. **Customer friction**: Light users felt they were overpaying for unused capacity, while heavy users had no incentive to optimize query patterns since marginal cost was zero.
3. **Infrastructure cost mismatch**: Compute costs scaled with query complexity and data volume, but revenue was flat per seat. Some customers became unprofitable at scale.

The company needed to track actual data consumption (queries executed, rows scanned, compute hours, data egress), enforce real-time quotas to prevent runaway costs from inefficient queries, support both prepaid credit-based and postpaid enterprise billing, and combine base subscriptions with consumption overages for hybrid pricing that balanced predictability with fairness.

### Chosen Licensing Model

The company deployed three NetLicensing models in combination:

**Pay-Per-Use** — for customers wanting pure consumption-based billing with no base fee. Each query execution decremented a prepaid credit balance at rates varying by query complexity and data volume (simple queries = 1 credit, complex joins = 10+ credits).

**Quota** — for subscription customers with monthly included usage allowances. The Starter plan included 10,000 query executions and 100 GB data scanned per month; the Enterprise plan included 1M queries and 10 TB scanned.

**Subscription** — for base tier fees, combined with both Quota and Pay-Per-Use overages. A customer on the Pro plan paid $500/month plus usage charges for consumption exceeding their included quota.

Why this fit: Pay-Per-Use enabled flexible, fair pricing for cost-conscious startups. Quota provided predictable monthly budgets for enterprises. Subscription + overage fees addressed hybrid requirements (base+usage) common in analytics workloads.

### NetLicensing Configuration

**Product/Module/Template hierarchy:**

```
Product: DataAnalyticsPlatform
├── Module: Pay-As-You-Go (Pay-Per-Use model)
│   └── Template: Credit Purchase (quantity=credits, price varies)
├── Module: Subscription Plans (Subscription + Quota model)
│   ├── Template: Starter (30 days, quota=10k queries, price=$99)
│   ├── Template: Pro (30 days, quota=100k queries, price=$499)
│   ├── Template: Enterprise (30 days, quota=unlimited, price=$2499)
│   └── Template: Overage Rate Card (price per unit above quota)
└── Module: Postpaid (Subscription model for invoice-based customers)
    └── Template: Enterprise Postpaid (30 days, usage metered for invoicing)
```

**Key parameters for metering:**

| Plan | Included Queries | Included Rows Scanned | Overage Rate |
|------|------------------|----------------------|--------------|
| Starter | 10,000 | 100 GB | $0.05/query, $0.002/GB |
| Pro | 100,000 | 1 TB | $0.03/query, $0.001/GB |
| Enterprise | Unlimited | Unlimited | Negotiated per contract |
| Pay-As-You-Go | — | — | $0.10/query, $0.005/GB |

**Configuration snippet** (conceptual):

```json
{
  "licenseTemplate": {
    "number": "LT_STARTER_QUOTA",
    "name": "Starter Plan",
    "licenseType": "TIMEVOLUME",
    "timeVolume": "1",
    "timeVolumePeriod": "MONTH",
    "price": "99.00",
    "quantity": "10000"
  }
}
```

The `quantity` field stored the monthly query quota. Overage tracking was handled by the app's usage engine, which reported consumption to NetLicensing after each query execution.

### Integration Walkthrough

**Query execution flow:**

Before executing any SQL query, the app validated the user's license quota and credit balance:

```
User submits SQL query
    ↓
App estimates query complexity (scans, joins, result size)
    ↓
GET /licensee/{num}/validate?product=DataAnalyticsPlatform
    ↓
NetLicensing response: active licenses, quotas, remaining balance
    ↓
If Pay-Per-Use: check available credits
    If available: allocate query, execute, report consumption
    If insufficient: deny with "insufficient credits" message
    ↓
If Subscription+Quota: check monthly quota
    If within quota: execute query
    If at/above quota: deny or charge overage, depending on plan terms
    ↓
POST /license/{num}/consumption (report actual rows scanned, compute seconds)
    ↓
App updates user's consumption dashboard with real-time cost projection
```

**Validation response structure** (simplified):

```json
{
  "licensee": "ACME001",
  "validations": {
    "LT_STARTER_QUOTA": {
      "valid": true,
      "expirationDate": "2026-05-19",
      "quantity": "10000",
      "used": "7200",
      "remaining": "2800"
    },
    "LT_CREDIT_POOL": {
      "valid": true,
      "quantity": "5000",
      "used": "2100",
      "remaining": "2900"
    }
  }
}
```

The app cached this response for 5 minutes and enforced hard quotas at query time. If a user approached 80% quota exhaustion, an in-app notification suggested upgrading their tier or purchasing additional credits.

### Licensee Management

Each organization (tenant) in the analytics platform was registered as one Licensee in NetLicensing. Individual users within that organization shared the same license pool; the app's permission layer controlled per-user query execution, but quota and billing were Licensee-wide.

For large enterprises with multiple business units, the company provisioned separate Licensees per unit (e.g., FINANCE_TEAM_001, MARKETING_TEAM_001) so each unit had independent quotas and cost allocation.

License provisioning was manual for enterprises (sales team created the Licensee and assigned the appropriate Subscription template) but automated for self-serve customers (app called `POST /licensee` when a user signed up for a Pay-As-You-Go account, then automatically issued a Credit Purchase license).

### Shop & Payment Integration

**Self-service credit top-ups:**

When a Pay-As-You-Go customer ran low on credits (< 500 remaining), an in-app prompt offered a one-click checkout to purchase additional credit blocks (500, 2500, or 10,000 credits at tiered discounts). The app generated a NetLicensing Shop token:

```bash
POST /token
{
  "licenseeNumber": "STARTUP_001",
  "licenseTemplateNumber": "LT_CREDIT_PURCHASE",
  "licenseeQuantity": "5000"
}
```

The shop presented a clean checkout flow (Stripe backend), and upon successful payment, NetLicensing issued a new Credit Purchase license to the Licensee. The app detected the license creation via webhook and updated the user's credit balance immediately.

**Subscription tier upgrades:**

Enterprise customers on postpaid plans had their monthly usage metered and accumulated for invoicing. The app's billing system queried NetLicensing for cumulative consumption at month-end and generated invoices with volume-based discounts applied automatically by NetLicensing's tiering engine.

### Edge Cases & Best Practices

- **Query explosion**: Runaway queries (e.g., accidental cross-joins) could consume a month's quota in seconds. Hard quotas at 100% were enforced to prevent negative balances; users received an immediate "quota exceeded" error and were directed to purchase additional credits or upgrade.
- **Batch processing**: Data science teams often ran bulk operations consuming thousands of queries. The app offered "batch plans" (higher quotas at better per-unit rates) auto-triggered when users submitted 50+ queries in a 1-hour window.
- **Trial to paid**: New enterprise customers received a 30-day Enterprise trial license (unlimited quota) to evaluate the platform. At day 27, sales reached out to convert to a paid plan.
- **Credits expiry**: Prepaid credits were set to expire after 12 months of non-use, encouraging customers to commit to larger credit purchases (better discounts) and reducing stale credit liability.
- **Consumption reporting**: The app reported actual query consumption asynchronously via a background job, ensuring NetLicensing's quota tracking stayed synchronized with the query engine's internal ledger.
- **Multi-cloud support**: Customers could authenticate to multiple data warehouses within one account. Each warehouse's compute costs were tracked separately and consolidated into a single monthly bill per Licensee.

### Results & Outcome

- **Revenue per customer** increased 62% within 12 months as pricing aligned with actual compute consumption. Heavy users now paid proportional fees, and light users paid minimal charges.
- **Customer acquisition** improved dramatically: startups and small teams could enter at $0 base cost (pay-as-you-go), reducing friction compared to the previous minimum $500/mo seat fee.
- **Query efficiency** improved as consumption-based pricing incentivized customers to optimize SQL patterns and reduce unnecessary table scans.
- **Quota exhaustion incidents** dropped by 88% due to proactive warnings at 80% and automatic throttling at 100%, eliminating surprise overages.
- **Customer retention** improved; transparent usage-based billing replaced opaque seat pricing that penalized growth. Customers felt pricing was fair and proportional.
- **Enterprise sales cycle** shortened 3–4 weeks because flexible hybrid pricing (base + overage) addressed budget predictability concerns that previously stalled deals.
