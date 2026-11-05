---
layout: casestudy
title: "B2B SaaS: From Stripe-Only to Licensing-as-a-Service"
description: "How a B2B SaaS vendor can keep Stripe Billing for payments and use NetLicensing as the single source of truth for subscriptions, trials and add-on features."
permalink: "/case-studies/b2b-saas-stripe-licensing/"
img: "/img/case-studies/netlicensing-case-study-b2b-saas-stripe-licensing.png"
tags:
- Case Studies
- Use Cases
- B2B SaaS
- Subscription
- Trial Management
industry:
- Compliance / Document Automation SaaS
use-case:
- Subscription lifecycle management
- Trial-to-paid conversion
- Feature gating
favorite-feature:
- Licensing Model "Subscription"
- Licensing Model "Multi-Feature"
- NetLicensing REST API
---

### Challenge

A company sells contract review and document assembly software to legal and HR teams. Billing runs on Stripe subscriptions, and that part works well: cards, invoices, dunning and tax are all handled.

What Stripe doesn't know is which features a customer may use. That knowledge ended up scattered across the codebase. The API gateway checked the plan name, the UI checked a flag in the user table, and the AI clause analysis checked something else again. After a downgrade, some features stayed open. After a failed payment, some closed too early. Trials were a date column that only one service read.

The team didn't want to give up Stripe. They wanted one entitlement source that every part of the product asks.

### Approach

Stripe stays in charge of money. NetLicensing becomes the place that decides what a customer may use. Each customer account is a licensee, and the vendor uses its own account ID as the licensee number.

```
Product: DocSuite
├── Module "Access" – Subscription
│   ├── Trial: TIMEVOLUME 14 DAY, price 0, automatic
│   ├── Month: TIMEVOLUME 1 MONTH
│   └── Grace: TIMEVOLUME 7 DAY, hidden, grace period
└── Module "Features" – Multi-Feature
    └── FEATURE templates: TEMPLATES-LIB, AI-REVIEW, E-SIGN, SSO-CONNECTOR
```

[Subscription](https://netlicensing.io/wiki/subscription) answers "may this account use the product today?". [Multi-Feature](https://netlicensing.io/wiki/multi-feature) answers "which add-ons does it have?". Every new licensee gets the automatic 14-day trial, which starts at its first validation.

#### Stripe events drive the licenses

The vendor's back end already receives Stripe webhooks. It now also calls NetLicensing, using an API key with the role `ROLE_APIKEY_OPERATION` that never leaves the server:

| Stripe event | NetLicensing call |
|---|---|
| `customer.subscription.created` | Create a "Month" license with `startDate` = period start. Create a FEATURE license for each add-on in the plan. |
| `invoice.paid` (renewal) | Create the next "Month" license. |
| `customer.subscription.updated` | Add FEATURE licenses for new add-ons, set `active=false` on removed ones. |
| `customer.subscription.deleted` | Set `active=false` on the remaining licenses. |

For example, when an invoice is paid:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "licenseeNumber=ACC-30917" \
  -d "licenseTemplateNumber=ACCESS-MONTH" \
  -d "startDate=2026-11-14T00:00:00Z" \
  -d "stripeInvoice=in_1Q2w3E4r" \
  https://go.netlicensing.io/core/v2/rest/license
```

`stripeInvoice` isn't a NetLicensing field. Any extra form field is saved as a [custom property](https://netlicensing.io/wiki/custom-properties) on the license, so support can see which invoice a license belongs to. Stripe can deliver the same event twice, so the handler records the event ID and skips duplicates.

When a payment fails, Stripe retries for a few days. The Subscription module's [grace period](https://netlicensing.io/wiki/subscription#grace-period) keeps the customer working during that time, instead of cutting them off the moment a period ends.

#### One check for the whole product

Every service asks the same question in the same way:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/ACC-30917/validate
```

For "Access" the result holds `valid` and `expires`. For "Features" it lists each add-on with `valid=true` or `false`. The back end caches the answer until its `ttl` and drops it whenever the Stripe webhook handler has changed something for that account. The old scattered checks are gone. The gateway, the UI and the AI service all read the same entitlements object.

### Results

- Stripe still handles payments, invoices and taxes. NetLicensing is the one place that decides what a customer may use.
- Downgrades and cancellations take effect exactly when the Stripe event arrives, and nothing stays open by accident.
- Trials, renewals and grace periods follow the same rules for every customer.
- Support can open a customer in the [Management Console](https://ui.netlicensing.io) and see every license, its dates and the Stripe invoice behind it.

Running on another billing system? The same pattern works with any service that sends webhooks. See [using NetLicensing with subscription management services](https://netlicensing.io/wiki/faq-3pp-subscription-management), or [get in touch](https://netlicensing.io/contact/).
