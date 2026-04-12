---
layout: casestudy
title: "B2B SaaS: From Stripe-Only to Licensing-as-a-Service"
description: "A compliance SaaS eliminated entitlement drift and improved trial conversion by making NetLicensing the entitlement authority alongside Stripe."
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
- Licensing Model "Try & Buy"
- Feature-Based Gating
---

### Overview

A compliance and document automation SaaS vendor serves corporate legal teams and HR departments with software for contract analysis, document assembly, and compliance tracking. The platform processes sensitive documents for thousands of users across enterprise and mid-market customers, with per-user pricing and tiered feature sets (basic workflows, advanced AI analysis, unlimited templates).

The company built its billing entirely on Stripe subscription plans, which handles payment collection reliably. However, Stripe has no native understanding of feature-level entitlements, trial periods, or license lifecycle management. As the product matured and feature complexity increased, the company faced persistent entitlement drift where the billing state (what Stripe knew) diverged from the actual application state (what users could access).

NetLicensing was introduced as the authoritative entitlement layer, with Stripe retained for its payment strength. This separation of concerns enabled automated lifecycle management, eliminated feature access inconsistencies, and reduced support escalations caused by billing/entitlement mismatches.

### Licensing Challenge

The application's feature access was enforced through scattered conditional logic: some checks occurred at the API gateway, others in business logic, and still others in UI rendering. Different parts of the codebase had different assumptions about what "trial" meant, what happened on plan downgrade, and how to enforce feature availability.

The result was chronic entitlement drift. A customer on a free trial could sometimes access paid features because the trial check in one module wasn't synchronized with the check in another. When customers downgraded their plan, residual access remained intact for days or weeks because the feature gate code didn't consistently check current subscription status. Support tickets flooded in from customers confused about why they lost access abruptly, or conversely, why they could still use features after cancelling.

Trial-to-paid conversion was another critical gap. The company had no way to predict or influence when trials would expire, no automated upgrade prompts, and no mechanism to grant a grace period to customers who were actively using the product but hadn't yet converted. Many high-potential customers churned because the product simply stopped working when their trial expired, with no warning.

### Chosen Licensing Model

NetLicensing's **Subscription** and **Try & Buy** (trial) models provided the framework. Each plan tier (Starter, Professional, Enterprise) became a License Template with:
- A Subscription license defining the plan's feature set and monthly price
- Time-based validity tied to the Stripe billing cycle
- Feature flags for advanced analytics, template libraries, AI analysis capabilities

Trial customers received a separate time-bounded **Try & Buy** license with a 14-day expiry. This license existed independently from the subscription license, enabling clean lifecycle management: trial → upgrade to paid subscription (license swap), or trial expiry → access denied (not feature removal).

### NetLicensing Configuration

**Product and Module Structure:**
```
Product: Compliance & Document Automation
└── Module: Plans & Features (Subscription model)
    ├── Template: Starter Trial (timeVolume=14, timeVolumePeriod=DAY, features=basic)
    ├── Template: Starter (timeVolume=1, timeVolumePeriod=MONTH, price=$49, features=basic)
    ├── Template: Professional (timeVolume=1, timeVolumePeriod=MONTH, price=$149, features=advanced)
    └── Template: Enterprise (custom pricing, features=all)
```

**Key Configuration Steps:**
1. Create Subscription License Templates for each plan tier with `timeVolume=1, timeVolumePeriod=MONTH`
2. Create a separate Try & Buy Template for trials: `timeVolume=14, timeVolumePeriod=DAY`
3. Map Stripe product IDs to NetLicensing License Templates in a configuration table
4. Create a Stripe webhook handler that:
   - On `customer.subscription.created`: POST `/licensee/{id}` to create/activate the customer, then issue the appropriate Subscription license
   - On `customer.subscription.updated`: update the license to reflect the new plan
   - On `customer.subscription.deleted`: deactivate the license (set `active=false`)
   - On `invoice.payment_failed`: notify the licensee and prepare for suspension

**Key Parameters:**
- `timeVolume=1, timeVolumePeriod=MONTH` for all production subscription templates
- `timeVolume=14, timeVolumePeriod=DAY` for trial licenses
- Feature license `active=true/false` per plan to gate analytics, AI, templates

### Integration Walkthrough

**Trial Signup and Expiry:**
```
User signs up → POST /licensee + POST /license (Try & Buy template)
  ↓ App grants access, user sees 14-day countdown
  ↓ Periodic cron job checks: GET /licensee/{id}/validate
  ↓ At day 11: license response shows remaining_time=3d → send upgrade prompt email
  ↓ At day 14: trial license expires → validate returns "not valid" → app blocks access
```

**Subscription Lifecycle:**
```
Stripe event: subscription.created → webhook handler
  ↓ Extract Stripe subscription ID and product ID
  ↓ POST /licensee {licenseeNumber=stripe_customer_id}
  ↓ POST /license {licenseeNumber, template=Professional}
  ↓ App: GET /validate → returns active Professional license
  ↓ User gains full access to advanced features
  ↓
Stripe event: subscription.updated (plan change)
  ↓ Identify old and new License Templates
  ↓ DELETE /license {old_license_number}
  ↓ POST /license {new_license_number, template=Enterprise}
  ↓ App: GET /validate → returns new Enterprise license
  ↓ User immediately sees expanded feature set
  ↓
Stripe event: subscription.deleted (cancellation)
  ↓ PATCH /license {active=false} OR DELETE /license
  ↓ App: GET /validate → returns "not valid"
  ↓ At next request, user sees "subscription expired" page with reactivation prompt
```

**Feature Gating:**
All feature access flows through a single validation call:
```bash
GET /licensee/{licenseeNumber}/validate
```
The response includes active license details:
```json
{
  "ttl": 2592000,
  "validFrom": "2026-03-19",
  "validUntil": "2026-04-19",
  "featureAnalytics": { "active": true },
  "featureAI": { "active": true },
  "featureTemplates": { "active": false }
}
```
The app denies access to any feature where `active=false` or the current timestamp is outside `validFrom`/`validUntil`.

### Licensee Management

Each customer account is a Licensee, with `licenseeNumber` mapped to the Stripe `customer_id`. This linkage is critical for webhook integration: when Stripe fires a `customer.subscription.created` event, the webhook handler maps the Stripe customer ID to the corresponding licensee.

**Provisioning Flow:**
1. User signs up → app creates a Stripe customer record
2. User initiates free trial → app POST `/licensee {licenseeNumber=stripe_customer_id}` to NetLicensing
3. NetLicensing returns the Licensee record; app stores the returned `number` for future API calls
4. App POST `/license {licenseeNumber, template=trial}` to assign a trial license
5. Subsequent requests use `licenseeNumber` for validation calls

**Plan Changes:**
When a Stripe `customer.subscription.updated` webhook fires (customer upgrades/downgrades), the webhook handler:
1. Parses the Stripe event to extract old and new product IDs
2. Calls GET `/licensee/{licenseeNumber}` to fetch the current Licensee
3. Calls DELETE or PATCH on the old license to deactivate it
4. Calls POST `/license` with the new License Template to activate the upgraded license
5. Does not create or modify the Licensee itself — only licenses change

This ensures clean state transitions with no residual access from old plans.

### Edge Cases & Best Practices

- **Webhook idempotency**: Stripe webhooks can be delivered multiple times. Use an idempotency key (webhook ID + timestamp) in your event handler to detect and skip duplicate license operations.
- **Trial-to-paid gap**: When a trial expires but the customer hasn't upgraded, give a 24-hour grace period before hard-blocking access. Send a "last chance" email 12 hours before the grace period ends.
- **Subscription suspension vs. cancellation**: If a Stripe invoice fails, Stripe marks the subscription as `past_due`. Set the license to a limited "suspended" state (e.g., read-only access) rather than immediately deactivating it. This gives customers a chance to update payment info without losing all access.
- **License time sync**: Ensure the trial expiry date and the subscription renewal date in NetLicensing match the corresponding dates in Stripe. Use Stripe's `current_period_start` and `current_period_end` as the source of truth when creating licenses.
- **Downgrade buffer**: When a customer downgrades to a lower-tier plan, maintain access to all previously created documents but restrict creation of new documents requiring upgraded features. This reduces churn caused by loss of existing work.
- **Audit logging**: Log every license state change (creation, expiry, suspension, upgrade) with the Stripe event ID and timestamp. This creates a clear audit trail for support escalations and revenue recognition.

### Results & Outcomes

- Entitlement drift eliminated: feature access now strictly reflects actual license state from NetLicensing; no scattered conditional logic in the codebase
- Trial-to-paid conversion improved by 18% through automated upgrade prompts timed to trial expiry and grace-period extensions for active users
- Support tickets related to access/billing mismatches dropped by 65%; most remaining tickets are now customer choice (intentional downgrades) rather than bugs
- Engineering team reduced feature gate maintenance from a distributed, fragile set of conditionals to a single API integration; new plans and features launch faster
- Webhook integration with Stripe is the single source of truth for billing state; subscription changes in Stripe are immediately reflected in application entitlements
- Regulatory compliance improved: audit logs show clear lifecycle transitions for invoicing and SOC 2 audits
