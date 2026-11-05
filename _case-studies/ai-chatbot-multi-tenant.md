---
layout: casestudy
title: "AI Chatbot Platform: Multi-Tenant Licensing"
description: "How a white-label chatbot platform can limit bots and premium AI features per tenant with Pricing Table plans and sell extra message packs with Pay-per-Use."
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
- Licensing Model "Pricing Table"
- Licensing Model "Pay-per-Use"
- Customer Portal
---

### Challenge

A startup runs a chatbot platform for small businesses. Each customer (a tenant) builds bots for support, FAQs or lead capture and embeds them on their own website. Some tenants run one quiet FAQ bot. Others run five bots with document search (RAG) and voice, answering thousands of messages a day.

Everyone paid the same monthly fee, and that was the problem. The busy tenants were barely profitable, and the small ones felt they paid too much. The team had started writing its own plan logic, with bot limits in one service, feature flags in another and message counters in a third. Every new plan needed changes in all three.

### Approach

Each tenant is a licensee, and the tenant ID is the licensee number. The product has two modules:

```
Product: Chatbot Platform (licenseeAutoCreate = true)
├── Module "Plans" – Pricing Table
│   SKUs: BOTS (quota), MESSAGES (quota, per month), RAG (feature), VOICE (feature)
│   Starter  FEATURE, EUR 0, automatic, hidden   BOTS=1   MESSAGES=1000    RAG=false VOICE=false
│   Growth   TIMEVOLUME 1 MONTH                  BOTS=3   MESSAGES=20000   RAG=true  VOICE=false
│   Scale    TIMEVOLUME 1 MONTH                  BOTS=10  MESSAGES=100000  RAG=true  VOICE=true
└── Module "Extra messages" – Pay-per-Use
    └── Message pack: QUANTITY 10,000
```

The [Pricing Table](https://netlicensing.io/wiki/pricing-table) module holds the plans. Each plan sets values for the same SKUs, so comparing plans is easy, both for the team and for customers. NetLicensing can also render the plans as an HTML pricing table through the `PricingTable/render` endpoint.

The platform's back end validates a tenant when it loads the tenant's settings, and it caches the result until the response's `ttl`:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productNumber=CHATBOT" \
  https://go.netlicensing.io/core/v2/rest/licensee/TENANT-4410/validate
```

For "Plans" the response returns the current plan and every SKU, for example `BOTS` with `quota=3` and `RAG` with `valid=true`. The platform uses these values in three places:

- **Creating a bot.** The platform counts the tenant's active bots and compares that with `BOTS`. NetLicensing provides the limit, and the platform does the counting.
- **Opening the knowledge base editor** requires `RAG`. Voice settings require `VOICE`.
- **Answering a message.** The platform counts messages per tenant per calendar month in its own database. Once the count reaches `MESSAGES`, it switches to the extra message credits.

#### Extra messages

A tenant who goes over the monthly allowance can buy message packs instead of upgrading right away. These live in a [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) module. The platform reports the overflow in batches, for example every few minutes:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-EXTRA-MESSAGES" -d "usedQuantity0=120" \
  https://go.netlicensing.io/core/v2/rest/licensee/TENANT-4410/validate
```

The response holds `remainingQuantity`. When it reaches zero, the bots reply with a polite "we'll get back to you" message until the next month starts or the tenant buys more.

#### Self-service

The "Change plan" and "Buy messages" buttons create a shop token (`tokenType=SHOP`) for the tenant and send the tenant to the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop), branded with the platform's logo and colours. A [webhook](https://netlicensing.io/wiki/notifications) on `LICENSE_CREATED` tells the back end to drop the cached result, so the new plan takes effect on the next request.

Tenants can see their plan, purchases and remaining packs in the [Customer Portal](https://netlicensing.io/wiki/customer-portal). The platform opens it with an `ACTION` token (`action=licenseeLogin`), so there's no separate login.

### Results

- Plans are defined once, as SKU values in the [Management Console](https://ui.netlicensing.io). Adding a plan or changing a limit doesn't need a release.
- One cached validation per tenant gives the back end everything it needs: limits, features and remaining extra messages.
- Small tenants can start on the free Starter plan. Busy tenants pay for what they use through plans and message packs.
- Tenants handle upgrades and message packs themselves in the Shop, and look up their licenses and purchases in the Customer Portal.

Building something similar? See the [SaaS licensing guide](https://netlicensing.io/wiki/saas-licensing) or [contact us](https://netlicensing.io/contact/).
