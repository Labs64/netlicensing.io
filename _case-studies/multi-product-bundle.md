---
layout: casestudy
title: "Multi-Product Bundle Licensing: Suite Management with Component Tracking"
description: "How a software suite vendor can sell all components under one renewal date with Bundles, while each application still checks its own entitlement."
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
- Component entitlements
favorite-feature:
- Bundles
- Licensing Model "Subscription"
- Licensing Model "Multi-Feature"
---

### Challenge

A vendor sells a business intelligence suite made of five applications: Data Prep, Dashboards, Reports, Forecasting and Data Catalog. Over the years each one had grown its own licensing: separate keys, separate renewal dates, separate activation steps.

Customers who bought the whole suite ended up with five contracts that renewed in five different months. Onboarding a new customer meant generating five keys and sending five emails. A customer who wanted to add Forecasting halfway through the year got a pro-rata calculation done by hand, and a sixth renewal date.

The vendor wanted to sell the suite, or a smaller pack, as one item with one renewal date. Each application should still check only its own part.

### Approach

Each customer company is a licensee. All applications belong to one product, with one module per application:

```
Product: Insight Suite
├── Module "Data Prep"    – Subscription  (yearly template)
├── Module "Dashboards"   – Subscription  (yearly template)
├── Module "Reports"      – Subscription  (yearly template)
├── Module "Forecasting"  – Subscription  (yearly template)
├── Module "Data Catalog" – Subscription  (yearly template)
└── Module "Add-ons"      – Multi-Feature
    └── FEATURE templates: SSO-CONNECTOR, WHITE-LABEL, PRIORITY-SUPPORT

Bundles:
  Full suite      all five yearly licenses
  Analytics pack  Dashboards + Reports + Forecasting
```

Each application is a [Subscription](https://netlicensing.io/wiki/subscription) module, so each one can be valid or not on its own. Optional extras across the suite are [Multi-Feature](https://netlicensing.io/wiki/multi-feature) licenses.

The suite and the packs are [bundles](https://netlicensing.io/wiki/bundle-services). A bundle groups license templates from one product and has its own price. When a customer obtains a bundle, NetLicensing creates all its licenses in one go, so their yearly periods start together and end on the same day. For a direct sale, the vendor's back end calls:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "licenseeNumber=CUST-HARBOUR-LOGISTICS" \
  https://go.netlicensing.io/core/v2/rest/bundle/B-FULL-SUITE/obtain
```

The response returns one license per included template. Customers who buy online get the same result through the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop), from a shop token that names the bundle (`bundleNumber`).

#### Each application checks its own module

All five applications validate the same licensee, and each one reads its own module from the result:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/CUST-HARBOUR-LOGISTICS/validate
```

Forecasting looks for "Forecasting" and `valid=true`, and Reports looks for "Reports". The suite's shared launcher shows all applications and greys out the ones that aren't licensed. A customer who has the Analytics pack and later adds Data Prep simply gets one more license. The launcher shows the new tile at the next validation.

#### Keeping renewal dates aligned

A component added mid-year shouldn't create a new renewal date. For those cases the vendor's sales team creates the extra license in the [Management Console](https://ui.netlicensing.io) and sets its `timeVolume` so it ends on the suite's renewal date, and invoices the remainder through its own billing. From the next renewal, it's part of the bundle.

### Results

- A suite or pack is one purchase that creates all licenses at once, with one shared renewal date.
- Each application still validates its own module, so licensing stays independent per component.
- New customers are set up with one call instead of five keys and five emails.
- Packs and their prices are bundles in the Console and can change without touching the applications.

Selling several products as a suite? Read about [bundles](https://netlicensing.io/wiki/bundle-services) or [contact us](https://netlicensing.io/contact/).
