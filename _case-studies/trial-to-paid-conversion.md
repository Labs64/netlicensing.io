---
layout: casestudy
title: "Trial-to-Paid Conversion: Structured Trials and Freemium Tiers"
description: "Run structured free trials and freemium tiers that enforce feature limits and convert users automatically at the right moment"
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
- Conversion optimization
favorite-feature:
- Licensing Model "Try & Buy"
- Licensing Model "Subscription"
- Feature-Based Gating
---

### Overview

A rapidly growing project management SaaS company provides team collaboration, task tracking, and workflow automation to organizations ranging from freelancers to enterprises. The platform includes features like project templates, team chat, time tracking, advanced analytics, and third-party integrations.

The company's growth was constrained by a poor trial-to-paid conversion funnel: despite strong freemium interest, the 14-day trial converted at only 8% — well below the industry benchmark of 15–20%. The core problem was structural: trial users received full access to enterprise features immediately, creating confusion about core versus premium capabilities. When trials expired, users were locked out abruptly with no soft landing, generating frustration and negative app store reviews. The company lacked systematic visibility into trial engagement, automated conversion nudges, and any freemium safety net for users not ready to pay.

NetLicensing became the central entitlement system, enabling structured trial tiers with progressive feature access, automatic conversion triggers based on usage milestones, and a freemium tier that retained non-converting users while enforcing strict feature limits.

### Licensing Challenge

Before NetLicensing, trial management was handled by a crude timestamp-based cron job that checked expiry dates and revoked access. Three critical problems emerged:

1. **Trial enforcement drift**: Different clients (web, mobile, API) implemented license checks inconsistently. Users could sometimes circumvent expiry by switching platforms.
2. **No engagement segmentation**: All trial users were identical in the system. Marketing had no way to identify high-intent users (those who created 10+ projects) versus explorers, so conversion campaigns were broad and low-response.
3. **Abrupt lockout**: When trials expired, users lost all project access with no grace period or conversion opportunity. This generated support tickets and negative reviews rather than converting customers.
4. **No freemium fallback**: Users who weren't ready to upgrade were simply locked out, lost forever.

Sales visibility was also poor: the team had no real-time way to identify which trial accounts were actively using the platform, making proactive outreach impossible.

### Chosen Licensing Model

The company implemented two NetLicensing models working in tandem:

**Try & Buy (Subscription variant)** — time-bounded trial licenses that automatically expire but trigger conversion workflows rather than hard lockouts. Three trial tiers were created:
- **Quick Start** (7 days): core features only; positioned for casual explorers
- **Professional** (14 days): advanced collaboration; for teams evaluating the platform
- **Enterprise** (30 days): full platform; for qualified leads with longer evaluation cycles

**Subscription** — for paid tiers (Starter, Pro, Team) and the freemium tier (perpetual Subscription license with `quantity` limits and feature gates).

Why this fit: Try & Buy provided time-bounded enforcement without hard failures, while Subscription gave the company flexible pricing tiers and the ability to cap freemium features programmatically (e.g., max 3 team members, 100 MB storage).

### NetLicensing Configuration

**Product/Module/Template hierarchy:**

```
Product: ProjectManager
├── Module: Trial Plans (Try & Buy model)
│   ├── Template: Quick Start (7 days, core features)
│   ├── Template: Professional (14 days, standard features)
│   └── Template: Enterprise (30 days, all features)
└── Module: Paid Plans (Subscription model, monthly renewal)
    ├── Template: Freemium (perpetual, feature-gated)
    ├── Template: Starter ($9/mo, 10 projects, 5 users)
    ├── Template: Pro ($29/mo, unlimited projects, 25 users)
    └── Template: Team ($99/mo, unlimited + integrations)
```

**Key template parameters:**

| Template | Type | Duration | Max Projects | Max Users | Feature Set |
|----------|------|----------|--------------|-----------|-------------|
| Quick Start | Try & Buy | 7 days | 5 | 1 | Core only |
| Professional | Try & Buy | 14 days | 20 | 5 | Standard |
| Enterprise | Try & Buy | 30 days | unlimited | unlimited | All |
| Freemium | Subscription | perpetual | unlimited | 3 | Basic reporting |
| Starter | Subscription | 30 days | 10 | 5 | Integrations |

**Configuration snippet** (conceptual):

```json
{
  "licenseTemplate": {
    "number": "LT_PROFESSIONAL_TRIAL",
    "name": "Professional Trial",
    "licenseType": "TIMEVOLUME",
    "timeVolume": "14",
    "timeVolumePeriod": "DAY",
    "price": "0",
    "automatic": true
  }
}
```

Automatic trial provisioning was enabled so new signups were assigned a trial license immediately without manual intervention.

### Integration Walkthrough

**Validation trigger points:**

The app integrated NetLicensing validation at three critical moments:

1. **User login**: Check trial expiry status and license state
2. **Feature access**: Before opening paid features (advanced analytics, bulk operations, integrations), validate entitlement
3. **Storage check**: Before allowing file uploads, verify quota against user's license tier

**High-level flow:**

```
New Signup
    ↓
POST /licensee (create user account)
    ↓
Auto-assign trial license (via "automatic": true)
    ↓
Daily/On-demand: GET /licensee/{num}/validate
    ↓
Response: valid + trial_end_date + remaining_days
    ↓
If valid: grant access
If 50% remaining: trigger in-app upgrade prompt
If 80% remaining: send "upgrade soon" email
If expired: transition to freemium license
```

**Validation response structure** (simplified):

```json
{
  "licensee": "US00001",
  "validations": {
    "LT_PROFESSIONAL_TRIAL": {
      "valid": true,
      "expirationDate": "2026-05-03"
    }
  }
}
```

The app's entitlement service cached this response for 1 hour to minimize API calls, then honored feature gates locally (e.g., "if license LT_PRO_TRIAL is valid and userId in this set, show advanced analytics tab").

### Licensee Management

Each user signup in the application created one Licensee in NetLicensing, with the app's internal user ID mapped to `licenseeNumber`. A lookup table stored this mapping for quick retrieval during API calls.

**Auto-provisioning** was enabled: when a user signed up, the app called `POST /licensee` with their email as the external identifier, and NetLicensing automatically assigned the configured "automatic" trial license (Professional Trial by default). This eliminated manual onboarding steps.

For partner or team accounts (where multiple users share one license), the primary account holder was the Licensee, and the app's access control layer enforced per-user feature limits in application logic, not in NetLicensing (since NetLicensing operates at the Licensee level, not per-user).

### Shop & Payment Integration

When a trial reached 80% expiry (with 2–3 days remaining), the app displayed a prominent in-app prompt with a direct link to the NetLicensing Shop. The shop token was generated server-side:

```bash
POST /token
{
  "licenseeNumber": "US00001",
  "productNumber": "ProjectManager",
  "successUrl": "https://app.example.com/settings/billing?status=success",
  "cancelUrl": "https://app.example.com/settings/billing?canceled=true"
}
```

This returned a one-time shop URL. Users clicked through, selected a paid plan, and completed checkout (with Stripe as the payment processor). On successful purchase, the shop redirected to the app's billing page, and a webhook callback updated NetLicensing's transaction status. The app then queried the Licensee's updated license set and activated the new Subscription license immediately.

For users who didn't upgrade, a separate automated flow transitioned them from the expired trial license to the freemium license, preserving their data and avoiding a hard lockout.

### Edge Cases & Best Practices

- **Trial overlap**: If a user manually purchased a plan mid-trial, both trial and subscription licenses coexisted temporarily. The validation endpoint returned both; the app prioritized the paid license and ignored the expiring trial.
- **Offline operation**: Trial-enabled mobile apps cached the last validation response for 7 days, allowing offline access even if the server was unreachable. Strict validation resumed once connectivity returned.
- **Grace period**: A 3-day grace period after trial expiry allowed users to retain read access before hard transition to freemium, reducing support escalations.
- **License transfer**: If a user had created projects before purchasing, those assets moved seamlessly to their new Subscription license with no manual migration.
- **Audit logging**: Every validation query and license state transition was logged to a data warehouse for conversion funnel analysis and anomaly detection.
- **Retry logic**: Transient NetLicensing API failures (500s) were retried up to 3 times with exponential backoff; on persistent failure, the app fell back to the last cached validation response.

### Results & Outcome

- **Trial-to-paid conversion rate** increased from 8% to 19% within three months, driven by structured trial tiers matching user sophistication levels and timely conversion prompts.
- **Freemium retention** captured 42% of non-converting trial users, creating a long-tail pipeline. Some converted 3–6 months later after expanding their team.
- **Consistent enforcement** across web, mobile, and API clients eliminated access drift and reduced support escalations by 35%.
- **Sales efficiency** improved: the sales team gained real-time visibility into trial usage and could proactively reach out to high-intent accounts before expiry.
- **Customer acquisition cost** decreased by 31% as automated conversion flows reduced manual sales intervention.
- **Revenue per trial user** increased 54% as high-value enterprise prospects were automatically routed to 30-day enterprise trials instead of the default 14-day tier.
