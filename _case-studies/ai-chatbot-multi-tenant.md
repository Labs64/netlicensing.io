---
layout: casestudy
title: "AI Chatbot Platform: Multi-Tenant Licensing"
description: "A white-label AI chatbot startup replaced flat pricing with tiered entitlements for bot count, message volume, and premium NLP features."
permalink: "/case-studies/ai-chatbot-multi-tenant/"
img: "/img/case-studies/netlicensing-case-study-ai-chatbot-multi-tenant.png"
tags:
- Case Studies
- Use Cases
- AI Platform
- Multi-Tenant
- Feature-Based
industry:
- AI / Conversational SaaS
use-case:
- Tiered pricing
- Conversation metering
- Self-serve upgrades
favorite-feature:
- Licensing Model "Multi-Feature"
- Quantity-Based Licensing
- NetLicensing Pricing Table
---

### Overview

A white-label AI chatbot infrastructure startup provides conversational AI platforms to SMEs for customer service automation, FAQ handling, and lead qualification. The company maintains a solid multi-tenant SaaS architecture serving hundreds of customers, from small businesses running a single bot to enterprise customers operating dozens of advanced conversational agents across multiple departments.

Initially, the startup monetized through a single flat monthly subscription. As the customer base grew, usage patterns diverged dramatically: some customers ran simple FAQ bots with minimal traffic, while others deployed multiple advanced bots with high message volumes and required premium NLP features like retrieval-augmented generation (RAG), voice transcription, and analytics dashboards. This one-size-fits-all model left significant revenue on the table, created pricing friction with larger customers, and made it impossible to meter actual usage fairly.

NetLicensing was chosen to replace the homegrown entitlement layer, enabling tiered feature-based pricing across three dimensions (bot count, message volume, and premium features) while eliminating engineering effort spent on custom metering logic.

### Licensing Challenge

The startup's original system had no mechanism to differentiate pricing by actual usage. A customer running one simple FAQ bot with 100 monthly messages paid the same fee as a customer running five advanced RAG-powered bots handling 500,000 monthly conversations. This created three critical problems: lost revenue from under-pricing high-volume customers, pricing friction preventing larger deals from closing, and persistent feature entitlement drift where customers accessed premium features without paying for them because enforcement was scattered across the codebase and never validated against a single source of truth.

The engineering team spent significant time building and maintaining custom quota logic, metering APIs, and feature flag conditionals. Adding new pricing tiers or features required code changes and careful deployment coordination. Self-service upgrades were impossible — customers had to contact sales to change plans, creating friction and increasing time-to-revenue.

### Chosen Licensing Model

NetLicensing's **Multi-Feature** and **Quantity-Based** licensing models were the natural fit. Each pricing tier (Starter, Pro, Enterprise) was implemented as a composite License Template bundling three independent entitlements:

- **Bot Count** — a quantity-based license limiting the number of active bots per tenant
- **Message Volume** — a subscription quantity license measured in conversation messages (e.g., 10,000/month, 100,000/month)
- **Feature Flags** — separate feature-based licenses for RAG, voice transcription, and analytics modules

This model allows customers to purchase exactly what they need: a startup might buy a 5-bot license with 50,000 monthly messages and no premium features, while an enterprise customer buys 25 bots with unlimited messages and all feature modules enabled.

### NetLicensing Configuration

**Product and Module Structure:**
```
Product: WhiteLabel Chatbot Platform
└── Module: Tiered Entitlements (Multi-Feature model)
    ├── Template: Starter (bot_count=3, message_volume=10000, features=none)
    ├── Template: Pro (bot_count=10, message_volume=100000, features=RAG)
    └── Template: Enterprise (bot_count=unlimited, message_volume=unlimited, features=all)
```

**Key Configuration Steps:**
1. Create a Product representing the chatbot platform
2. Create a single Product Module using the **Multi-Feature** licensing model
3. For each pricing tier, create a License Template with three license types:
   - **Quantity license** for bot count (e.g., quantity=5)
   - **Subscription license** for message volume with time period MONTH and quantity=10000
   - **Feature licenses** for RAG, voice, analytics (active=true for included tiers)
4. Assign License Templates to each Licensee (tenant) on signup
5. Configure NetLicensing Shop with self-service upgrade options

**Key API Parameters:**
- `quantity` = bot count or message limit per tenant
- `timeVolume=1, timeVolumePeriod=MONTH` for monthly quota resets
- Feature license `active=true/false` per tier to gate RAG and analytics modules

### Integration Walkthrough

**Validation Flow at Key Lifecycle Points:**

When a customer attempts to create a new bot, the platform calls:
```bash
GET /licensee/{licenseeNumber}/validate
```

NetLicensing responds with the current active licenses. The app checks:
- `license.botCount.quantity` — is current bot count < limit?
- `license.messageVolume.quantity` — will monthly usage exceed quota?
- `license.rag.active` — are premium features enabled?

If the tenant has already deployed max bots, creation fails with an upgrade prompt. If message volume will exceed the monthly limit, the platform warns the customer or suggests an upgrade.

**On Bot Conversation:**
```
App receives user message → GET /licensee/{licenseeNumber}/validate
  ↓ Check: message_volume_used < message_volume_limit?
  ↓ Valid: route to bot, increment usage counter
  ↓ Expired/Invalid: return 402 "Quota Exceeded" → show upgrade CTA
```

**Self-Service Upgrades:**
When a customer wants to upgrade from Pro to Enterprise, they click "Upgrade Plan" in settings. This initiates:
```bash
POST /token/{tokenNumber} (fetch shop token for customer)
Redirect to NetLicensing Shop → select new template → pay via Stripe
Webhook callback: create new composite license → invalidate old license → immediate access
```

**Integration Points:**
- **Bot creation**: validate bot_count license before allowing creation
- **Message routing**: validate message_volume before processing conversation
- **Feature access**: validate feature-specific licenses before opening RAG/voice/analytics UI
- **Upgrade flow**: NetLicensing Shop token generation → Stripe payment → webhook provisioning

### Licensee Management

Each tenant (customer account) is registered as a Licensee in NetLicensing with `licenseeNumber` mapped to the tenant's internal ID. When a customer signs up, the platform automatically calls:
```bash
POST /licensee
{
  "licenseeNumber": "tenant-12345",
  "productNumber": "chatbot-platform",
  "active": true
}
```

This creates the Licensee and immediately assigns default License Templates for the customer's chosen plan. Subsequent validations use the same `licenseeNumber` throughout the customer lifecycle.

For self-service upgrades, the platform generates a one-time shop token scoped to the Licensee:
```bash
POST /token
{
  "licenseeNumber": "tenant-12345",
  "type": "SHOP"
}
```
The returned shop URL allows the customer to browse and purchase upgrades without involving sales, and upgrades take effect immediately upon successful payment.

### Shop & Payment Integration

Self-service upgrades are central to the business model. When a customer wants to add more bots or messages or unlock premium features, they access the "Manage Plan" page in the product. The backend generates a NetLicensing Shop token scoped to their Licensee and embeds the shop iframe (or redirects to a modal).

The customer browses available upgrade templates, selects one, and completes payment via Stripe. NetLicensing sends a webhook to the platform's backend confirming the new license creation. The backend uses the webhook payload to fetch the new entitlements and immediately apply them to the user session.

```
Customer clicks "Upgrade" → POST /token → embed shop iframe
  ↓ Customer selects new tier → Stripe payment
  ↓ Payment approved → NetLicensing creates license
  ↓ Webhook: POST /webhooks/license-created
  ↓ Backend fetches new entitlements → update session
  ↓ User sees new limits reflected in UI immediately
```

No manual provisioning needed; the entire flow is automated and transparent to the customer.

### Edge Cases & Best Practices

- **Monthly quota reset**: Message volume quotas reset on the subscription anniversary using `timeVolume=1, timeVolumePeriod=MONTH`. Ensure webhook handlers reset usage counters at this boundary.
- **Overage handling**: When a tenant exceeds message volume, queue excess conversations with a grace period (e.g., 24 hours) to allow upgrade completion before blocking.
- **Bot creation validation**: Always validate bot_count license synchronously before committing the bot to the database; don't rely on async validation.
- **License transfer**: If a customer account is transferred to another org, call the license transfer API to move entitlements cleanly.
- **Offline fallback**: Cache the most recent validation response for 5–10 minutes to survive brief NetLicensing API outages; block new bot creation if cache is stale.
- **Feature flag audit**: Log all feature gate decisions (feature requested, user license state, access granted/denied) for compliance audits and customer support escalations.

### Results & Outcomes

- Revenue per customer increased by an average of 40% as high-volume tenants moved to appropriately priced tiers
- Engineering effort spent on custom metering and feature flag logic was entirely eliminated; entitlements now managed centrally via NetLicensing
- Self-service upgrades reduced the sales-assisted expansion cycle from days to minutes; customers upgrade directly without contacting support
- Entitlement drift was eliminated at the API validation layer; customers can no longer accidentally access features beyond their plan
- Development velocity improved as new pricing tiers and features could be added without code changes — just new License Templates in NetLicensing
- Customer satisfaction improved due to transparent, real-time quota visibility and frictionless self-service upgrades
