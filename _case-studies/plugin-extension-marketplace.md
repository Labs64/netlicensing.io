---
layout: casestudy
title: "Plugin & Extension Marketplace: Multi-Vendor Monetization Platform"
description: "How a marketplace for CAD plugins can let each plugin use its own licensing model (trial, subscription or usage-based) as a separate NetLicensing product, and settle developer payouts from per-product transactions."
permalink: "/case-studies/plugin-extension-marketplace/"
img: "/img/case-studies/netlicensing-case-study-plugin-extension-marketplace.png"
tags:
- Case Studies
- Use Cases
- Plugin Marketplace
- Developer Platform
- Multi-Vendor
industry:
- Plugin Marketplace / Developer Platform
use-case:
- Plugin licensing
- Marketplace monetization
- Per-vendor tracking
favorite-feature:
- Licensing Model "Try & Buy"
- Licensing Model "Subscription"
- Licensing Model "Pay-per-Use"
---

### Challenge

A company runs an online marketplace for plugins for a popular CAD application. Around eighty independent developers sell their plugins there. The marketplace handles listing, checkout and licensing, and pays each developer their share every month.

Its first licensing system knew only one model, a yearly subscription. Developers kept asking for other options. One wanted a 30-day trial followed by a one-time purchase. Another sold a rendering plugin that runs on the developer's servers and wanted to charge per render. Every request turned into a custom build.

### Approach

The marketplace operator has one NetLicensing vendor account. Each plugin is its own product in that account. Products in NetLicensing are completely independent of each other, so each plugin can use whichever licensing model fits it. With dozens of products, the marketplace needs a plan with a customizable product limit (see [pricing](/pricing/)).



```
Vendor account: CAD Marketplace
├── Product "Sheet Metal Pro" (developer A)
│   └── Module – Try & Buy: 30-day trial, then one-time purchase
├── Product "BIM Exporter" (developer B)
│   └── Module – Subscription: 1 month / 1 year
├── Product "Cloud Render" (developer C)
│   └── Module – Pay-per-Use: packs of 10 / 100 renders
└── ... one product per plugin
```

Each customer is a licensee in every plugin product they use. The marketplace uses a predictable licensee number, its own customer ID plus the plugin code (for example `C-50213-SMP`), so the marketplace client can validate any plugin without looking anything up. Each product has licensee auto-create switched on. The first time a customer starts a plugin, the licensee is created, and Try & Buy trials start right then.

The marketplace provides a small client library that every plugin calls when it loads:

```bash
curl -u apiKey:MARKETPLACE_CLIENT_KEY -H "Accept: application/xml" \
  -d "productNumber=SHEETMETALPRO" \
  https://go.netlicensing.io/core/v2/rest/licensee/C-50213-SMP/validate
```

The library hands the plugin a simple answer: allowed or not, in trial or not, days or renders left. Developers don't need to know the details of each licensing model. The API key in the library has the role `ROLE_APIKEY_LICENSEE`, so it can validate and open the shop but can't change anything. Responses are signed, and the library checks the signature.

For "Cloud Render", the render service (not the desktop plugin) reports each finished render with `usedQuantity`, so usage is counted on the server where it happens.

#### Checkout

The marketplace's "Buy" and "Renew" buttons open the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) with a shop token for the right product and licensee. The Shop is branded as the marketplace, and payments go to the marketplace's own PayPal or Stripe account.

#### Paying developers

Every purchase is a [transaction](https://netlicensing.io/wiki/transaction-services) that belongs to one product, and so to one plugin. At the end of each month, the marketplace's accounting job lists the closed shop transactions per product and calculates each developer's share. The payout itself happens in the marketplace's own accounting. NetLicensing provides the sales data, not the payments to developers.

Developers don't need their own NetLicensing accounts. They tell the marketplace team which model and prices they want, and the team configures the product in the [Management Console](https://ui.netlicensing.io).

### Results

- Each plugin can have the licensing model its developer wants, without a custom build for the marketplace.
- One client library handles validation for all plugins, whatever model they use.
- Usage-based plugins are metered on the server that does the work.
- Monthly developer payouts are calculated from per-product transactions instead of manual spreadsheets.

Running a marketplace or app store for plugins? [Contact us](https://netlicensing.io/contact/) to talk through the setup.
