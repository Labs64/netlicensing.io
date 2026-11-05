---
layout: casestudy
title: "Trial-to-Paid Conversion: Structured Trials and Freemium Tiers"
description: "How a SaaS vendor can give every new account a 14-day trial of its Pro plan and fall back to a free tier afterwards, using the Pricing Table licensing model."
permalink: "/case-studies/trial-to-paid-conversion/"
img: "/img/case-studies/netlicensing-case-study-trial-to-paid-conversion.png"
tags:
- Case Studies
- Use Cases
- SaaS
- Trial Management
- Freemium
- Conversion Optimization
industry:
- SaaS / Software Vendor
use-case:
- Trial-to-paid conversion
- Freemium tier management
- Feature gating
favorite-feature:
- Licensing Model "Pricing Table"
- Warning Levels & Notifications
- NetLicensing Shop
---

### Challenge

A team builds a web-based project planning tool. New accounts get a 14-day trial with everything unlocked. After that, accounts either pay for Pro or Team, or keep using a limited Free tier.

Their first version kept the trial end date in their own database and checked it with a nightly job. It worked, more or less, but the problems added up:

- Plan logic was spread across the web app, the mobile app and the public API, and the three didn't always agree.
- When a trial ended, the account was simply locked. Users who weren't ready to pay left instead of dropping to the Free tier.
- Every pricing change, like "Pro now includes 20 projects instead of 10", meant a code release.

The team wanted one place that answers "what is this account allowed to do right now?", and they wanted to change plans without redeploying.

### Approach

The team models its plans with the [Pricing Table](https://netlicensing.io/wiki/pricing-table) licensing model. A Pricing Table module has a list of SKUs. Each SKU is either a feature (on/off) or a quota (a number). Each plan sets values for those SKUs.

```
Product: Planner (licenseeAutoCreate = true)
└── Module "Plans" – Pricing Table
    SKUs: PROJECTS (quota), MEMBERS (quota), REPORTS (feature), API (feature)

    Free       FEATURE, EUR 0, automatic, hidden     PROJECTS=3   MEMBERS=3   REPORTS=false  API=false
    Pro trial  TIMEVOLUME 14 DAY, EUR 0, automatic,  PROJECTS=20  MEMBERS=10  REPORTS=true   API=true
               hidden
    Pro        TIMEVOLUME 1 MONTH, EUR 12            PROJECTS=20  MEMBERS=10  REPORTS=true   API=true
    Team       TIMEVOLUME 1 MONTH, EUR 39            PROJECTS=-1  MEMBERS=50  REPORTS=true   API=true
```

Both the Free plan and the Pro trial are automatic, so every new account gets both. While several plans are active, NetLicensing combines them: a feature is on if any active plan includes it, and each quota takes the highest value. During the 14 days the account therefore gets Pro limits. The plan weight set in the Console decides which plan is reported as the current one. When the trial runs out, NetLicensing lists it under `expiredPricingPlan`, and the Free plan is what's left. There's no lockout and no job to write for the downgrade. A quota of `-1` means unlimited.

Each account in the app is one licensee, and the account ID is the licensee number. The back end validates when a user signs in. On the first call it passes `productNumber`, and NetLicensing creates the licensee with its automatic plans:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productNumber=PLANNER" \
  https://go.netlicensing.io/core/v2/rest/licensee/ACC-58213/validate
```

The result names the current plan (`pricingPlanId`, `pricingPlanName`), lists all active plans, and returns each SKU with its value. The back end turns that into an entitlements object and caches it until the response's `ttl` runs out. The web app, the mobile app and the API all read the same object, so they can't drift apart anymore.

NetLicensing returns limits but doesn't count anything. When a user creates a project, the app compares its own project count with `PROJECTS`. That's how the [Quota](https://netlicensing.io/wiki/quota) concept works in NetLicensing too.

#### Reminding users before the trial ends

Pricing Table plans have [warning levels](https://netlicensing.io/wiki/warning-level). A time-based plan turns yellow once 80% of its time is used. The team registers a [webhook notification](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED` and sends a short "your trial ends in a few days" email when an account turns yellow. The same webhook with `LICENSE_CREATED` tells the back end to drop its cached entitlements right after a purchase.

#### Upgrading

The "Upgrade" button asks the back end for a shop token and redirects the user to the returned `shopURL`:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "tokenType=SHOP" -d "licenseeNumber=ACC-58213" \
  -d "successURL=https://planner.example/billing/done" \
  -d "cancelURL=https://planner.example/billing" \
  https://go.netlicensing.io/core/v2/rest/token
```

The user picks Pro or Team in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) and pays with PayPal or Stripe. If they renew before a period ends, the new month is added after the current one, so nobody loses days.

### Results

- One validation call is the single answer to "what can this account do?" for web, mobile and API clients.
- Trial users who don't buy drop to the Free plan automatically and keep their projects.
- Plans and their limits are edited in the [Management Console](https://ui.netlicensing.io). Changing what Pro includes doesn't need a release.
- Trial reminders come from NetLicensing warning levels and webhooks, so the nightly cron job is gone.

Read the [SaaS licensing guide](https://netlicensing.io/wiki/saas-licensing) or [start a free account](https://ui.netlicensing.io/#/register) to try the Pricing Table model.
