---
layout: casestudy
title: "Multi-Product Bundle Licensing: Suite Management with Component Tracking"
description: "Sell product suites under one customer agreement while tracking usage and entitlements per component independently"
permalink: "/case-studies/multi-product-bundle/"
img: "/img/case-studies/netlicensing-case-study-multi-product-bundle.png"
tags:
- Case Studies
- Use Cases
- Software Suite
- Enterprise Software
- Bundle Management
industry:
- Software Suite Vendor / Enterprise Software
use-case:
- Product bundle licensing
- Suite licensing
- Component tracking
- Multi-product entitlement
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Subscription"
- Bundle Management
---

### Overview

An enterprise software vendor offering a comprehensive business intelligence suite needed to modernize their licensing model to support enterprise customers demanding unified suite agreements. Their platform comprised six tightly integrated applications—data visualization, ETL pipeline management, predictive analytics, reporting engine, data governance, and team collaboration—each historically sold and licensed independently. Enterprise buyers increasingly refused to sign six separate agreements and manage six renewal cycles; they wanted unified pricing, coordinated expiration dates, and a single management interface.

NetLicensing solved this challenge by unifying suite-wide licensing under a Product/Module/Bundle architecture while preserving per-component entitlement tracking for compliance, usage analytics, and selective feature activation. The vendor could now sell "BI Suite bundles" as a single transaction while automatically provisioning individual component licenses with synchronized renewal cycles.

### Licensing Challenge

Before NetLicensing, the vendor's licensing system treated each of the six applications as completely separate products with independent license keys, activation workflows, and support processes. Enterprise customers faced:

- Six separate renewal dates requiring six distinct negotiations and invoicing cycles
- No suite-level licensing agreements; each component had its own contract
- No visibility into which suite components drove adoption and value
- Manual, error-prone component license provisioning during onboarding (3+ weeks)
- Customers managing six separate portals and support contacts
- Complex mid-contract upgrades affecting only some components

### Chosen Licensing Model

**Subscription + Multi-Feature licensing**, implemented via Product Modules and Bundle grouping:

- **Subscription** for the suite: single annual or monthly renewal across all six components with synchronized expiration
- **Multi-Feature** per component: allows each application to enforce Standard/Professional/Enterprise tiers independently
- **Bundles** group related License Templates, enabling one purchase transaction that provisions multiple component licenses simultaneously

This architecture allows the vendor to sell "BI Suite Starter" (3 components), "BI Suite Professional" (5 components), or "BI Suite Enterprise" (all 6) with preset feature allocations per tier.

### NetLicensing Configuration

**Product/Module/Bundle Structure:**

```
Product: BI Suite
├── Module: Data Visualization
│   ├── Template: Starter (price=$15/user)
│   ├── Template: Professional (price=$35/user)
│   └── Template: Enterprise (price=$75/user)
├── Module: ETL Pipeline
│   ├── Template: Starter (price=$20/job)
│   ├── Template: Professional (price=$50/job)
│   └── Template: Enterprise (price=$120/job)
└── [4 more modules...]

Bundles:
├── "BI Suite Starter" → groups Starter templates from Viz + ETL + Reporting
├── "BI Suite Professional" → groups Prof. templates from all 6 modules
└── "BI Suite Enterprise" → groups Enterprise from all 6 modules
```

**Key parameters:**

- `timeVolume=12, timeVolumePeriod=MONTH` — 1-year subscription per bundle
- `price` varies per template (Standard $500/year, Pro $1500/year, Enterprise $4500/year)
- Bundle prices preset for each tier; pre-calculated savings vs. à la carte

**Sample configuration snippet:**

```json
{
  "bundleNumber": "BIS-PROF",
  "name": "BI Suite Professional Annual",
  "licenseTemplateNumbers": [
    "DV-PROF",
    "ETL-PROF",
    "PA-PROF",
    "RE-PROF",
    "DG-PROF",
    "CT-PROF"
  ],
  "price": 1500,
  "currency": "USD",
  "active": true
}
```

### Integration Walkthrough

**Provisioning flow:**

1. Customer purchases bundle via NetLicensing Shop → single transaction
2. Shop backend calls `POST /licensee` (create Licensee for customer account)
3. Shop calls `POST /license` six times in parallel, one per template in the bundle
4. Each application calls `GET /licensee/{num}/validate` on startup

**Validation pattern:**

```
Customer Login
  ↓
App calls GET /licensee/{licenseNumber}/validate
  ↓
Response includes all six component license statuses
  ↓
If all valid → Grant access to all active components
  If any expired → Show upgrade/renew prompt, allow component downgrade
```

Each component application validates independently but respects the suite-level entitlement. Shared middleware checks both the component-specific license and the parent suite license before granting feature access.

**Usage metering:**

After feature access is granted, each component reports consumption (rows processed, models executed, reports generated) back to NetLicensing API via `POST /license/{num}/usage`, feeding suite-level analytics dashboards.

### Licensee Management

A Licensee in this model maps to a customer organization. When an enterprise customer signs the BI Suite agreement:

- One Licensee record is created (e.g., `LICENSE-ACME-001`)
- That Licensee is automatically assigned six licenses (one per bundle component template)
- All six licenses share the same expiration date (suite renewal)

The customer's IT admin accesses the NetLicensing Shop to:
- View all six component statuses
- Activate/deactivate individual components for their end users
- Manage team assignments within the bundle

No separate per-component Licensee records are needed; the single Licensee manages the unified suite.

### Shop & Payment Integration

The vendor integrated Stripe for payment processing with NetLicensing Shop for license provisioning:

1. Customer selects bundle tier (Starter/Professional/Enterprise)
2. Shop calculates total price from bundle definition
3. Stripe checkout processes payment
4. On successful payment, Shop triggers `POST /bundle/{bundleNumber}/licensee/{newLicensee}`
5. NetLicensing automatically provisions all six component licenses
6. Customer receives a single invoice from the vendor (aggregated across all components)

Post-purchase upgrade workflow:

- Mid-contract: customer requests "Professional" tier upgrade
- Shop recalculates pro-rata price difference, charges via Stripe
- NetLicensing `PUT /license/{id}` upgrades all six component licenses to Professional tier simultaneously
- Single unified invoice reflects the upgrade adjustment

### Edge Cases & Best Practices

- **Partial renewals:** If one component needs emergency renewal (e.g., ETL pipeline license expires early), update only that license independently, but flag for billing team to sync with next suite renewal.
- **License transfer:** When bundle moves to different customer, call `POST /licensee/{oldNum}/transfer` to bulk-transfer all six component licenses in one operation.
- **Compliance audit:** Query all licenses for a single Licensee to prove all six components have valid coverage for the audit period; component-level tracking enables per-application compliance reports.
- **Offline grace period:** Cache the validation response from each component for 24 hours to survive temporary API outages.
- **Error handling:** If any one of six parallel license provisioning calls fails, mark the entire bundle purchase as pending and retry within 1 hour; do not partially activate components.
- **Seat overflow:** Implement soft caps at 110% of purchased seat count per component with automated warnings; hard block at 120% to prevent unexpected overage charges.

### Results & Outcome

- Suite sales increased 240% as unified licensing eliminated friction of managing six separate agreements
- Customer onboarding time reduced from 3 weeks to 2 days (automatic bundle provisioning replaced manual multi-step per-component setup)
- Renewal rates improved 45% through synchronized expiration and automated suite-wide renewal reminders
- Usage analytics revealed 70% of customers activate only 3-4 components initially, leading to targeted "Starter" bundle that increased conversions by 28%
- Support ticket volume for license/billing issues decreased 60%
- Revenue leakage eliminated through per-component tracking preventing unauthorized feature usage within suite context
- Mid-contract upsell velocity increased because tier upgrades now affect all six components simultaneously, raising perceived value and justifying premium tiers
