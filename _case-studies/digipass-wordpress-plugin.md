---
layout: casestudy
title: "Wordpress Plugin: DigiPass"
description: "DigiPass helps publishers and bloggers monetize digital content with subscription-based access."
permalink: "/case-studies/digipass-wordpress-plugin/"
img: "/img/case-studies/netlicensing-case-study-digipass-wordpress-plugin.png"
tags:
- Case Studies
- Use Cases
- Wordpress Plugin
- DigiPass
- Subscription
- PayWall
company: Labs64 GmbH
industry:
- Online Publishing
use-case:
- Subscription
- PayWall
- e-Commerce
favorite-feature:
- Licensing Model "Subscription"
- NetLicensing Shop
website: "https://wordpress.org/plugins/digipass/"
---

### Overview

DigiPass is a WordPress plugin that enables publishers, bloggers, and content platforms to implement subscription-based paywalls without requiring custom development. WordPress powers millions of websites globally; adding a modern monetization layer that integrates seamlessly with existing content management workflows was essential for publishers seeking to transition from ad-driven models to reader revenue.

DigiPass leverages NetLicensing's Subscription licensing model to automate subscriber provisioning, renewal tracking, and access revocation. Publishers can configure content tiers (free preview, basic subscriber, premium subscriber, VIP member) and attach them to posts and pages. Subscribers purchase access via the embedded NetLicensing Shop, and access permissions are automatically enforced on every page load. The plugin eliminates manual subscriber tracking and complex role-based access control configurations that previously required multiple plugins and constant staff monitoring.

### Licensing Challenge

Before DigiPass, a typical WordPress publisher monetizing premium content relied on a fragmented stack: a payment processor (Stripe/PayPal), a user role management plugin, and manual workflows to grant and revoke access based on payment records. This approach created operational friction:

- **Manual subscriber provisioning:** After receiving a payment, staff manually created user accounts and assigned custom roles, introducing delays and human error.
- **No automated renewal tracking:** Subscriptions expiring required manual intervention to revoke access; many publishers left access active too long (lost revenue) or revoked it too early (customer complaints).
- **Complex role configurations:** Multiple plugins managing user roles led to permission conflicts and debugging nightmares.
- **No visibility into subscriber health:** Publishers had no clear view of churn rates, renewal rates, or subscription lifecycle analytics to inform pricing strategies.
- **Scaling challenges:** As subscriber count grew, manual processes became unsustainable, requiring dedicated staff to manage recurring billing and access.

### Chosen Licensing Model

**Subscription License Model** — time-based recurring licenses with automatic renewal and expiration. Each subscriber receives a time-volume license (typically 1 month, 1 year, or custom period) that automatically expires and must be renewed. NetLicensing handles invoice generation, payment processing integration, and renewal reminders. The plugin validates subscriber access on every page load by checking license status in real-time.

```
Subscription Lifecycle:
- Customer purchases 1-month subscription → NetLicensing creates time-volume license
- License auto-renews monthly (if payment succeeds)
- Payment fails → license marked for expiration, subscriber notified
- License expires → access revoked on next page load
- Subscriber receives reminder email 3 days before expiration
```

### NetLicensing Configuration

**Product & Module Setup:**
- **Product:** "BlogName" (the WordPress site)
- **Module:** "Subscription Tiers" (licensing model: Subscription)
- **License Templates:**
  - `BASIC_MONTHLY` — 1 month duration, $5/month, basic tier content access
  - `PREMIUM_MONTHLY` — 1 month duration, $12/month, all content + ad-free
  - `PREMIUM_ANNUAL` — 12 months duration, $99/year, all content + ad-free + archives
  - `LIFETIME` — no time limit, one-time $299, permanent access

**Key Parameters:**
- `timeVolume=1`, `timeVolumePeriod=MONTH` (or `YEAR` for annual plans)
- `price=5.00`, `currency=USD`
- `gracePeriod=14` days — allow access for 2 weeks after expiration while billing issues resolve

**ASCII Configuration:**
```
Product: BlogName
└── Module: Subscription Tiers (Subscription)
    ├── Template: BASIC_MONTHLY (1 mo, $5)
    ├── Template: PREMIUM_MONTHLY (1 mo, $12)
    ├── Template: PREMIUM_ANNUAL (12 mo, $99)
    └── Template: LIFETIME (no expiry, $299)
```

### Integration Walkthrough

**Access Control Points:**
- **At page load:** WordPress calls DigiPass plugin to check if user has valid license for this content tier
- **License validation:** Plugin queries NetLicensing `GET /licensee/{subscriber_id}/validate`
- **Decision:** If license valid and not expired, content is displayed; else show paywall
- **Renewal logic:** If license approaching expiration, display reminder banner with "Renew Now" link

**High-Level Flow:**
```
WordPress page load
    ↓
Plugin checks page content tier requirement
    ↓
Is user logged in and a subscriber?
    ├─ No  → Show paywall with "Subscribe" button (links to Shop)
    └─ Yes → Validate license against NetLicensing
              ↓
           GET /licensee/{subscriber_id}/validate
              ↓
         License valid & not expired?
         ├─ Yes  → Display content
         └─ No   → Show upgrade/renew prompt
```

When a visitor clicks "Subscribe," the plugin generates a NetLicensing Shop token scoped to their intended tier and opens the Shop in a modal. After successful payment, the Shop redirects to a success page, and the plugin receives a webhook confirming the new license. On next page load, the subscriber has immediate access.

### Licensee Management

Each WordPress subscriber is mapped to a single NetLicensing Licensee. The Licensee number is the subscriber's WordPress user ID prefixed with the site slug (e.g., `myblog_user_4521`). This ensures that even if a user has accounts on multiple blogs, each blog's subscription is tracked independently.

When a visitor signs up through the DigiPass paywall, the WordPress plugin automatically creates a new user account and a corresponding NetLicensing Licensee. No manual setup is required. Renewal is handled entirely by NetLicensing: on each monthly anniversary, the Subscription license auto-renews, and NetLicensing attempts to charge the stored payment method. If payment fails, the subscriber is notified and the license enters a grace period before expiration.

### Shop & Payment Integration

DigiPass directly embeds NetLicensing Shop integration. The plugin provides a "Subscribe Now" button or paywall overlay that users click to purchase access.

```
Purchase Flow:
1. Visitor clicks "Subscribe to Premium" button
2. DigiPass plugin calls POST /shop/token endpoint with:
   - licenseeNumber (subscriber WordPress ID)
   - licenseTemplate (chosen tier, e.g., PREMIUM_MONTHLY)
   - successUrl (redirect after payment)
   - cancellationUrl (redirect if user cancels)
3. NetLicensing returns a one-time shop URL
4. DigiPass opens shop in modal or new window
5. User enters payment details in Shop, completes transaction
6. Shop creates license, charges payment method
7. Shop redirects to success_url
8. DigiPass plugin receives confirmation webhook
9. Plugin refreshes subscriber role/permissions
10. User granted immediate access to purchased tier
```

DigiPass also supports integration with Stripe and PayPal webhooks for real-time reconciliation of payments and license status.

### Edge Cases & Best Practices

- **Grace Period for Failed Payments:** NetLicensing's grace period (e.g., 14 days) allows subscribers to continue reading after a failed renewal attempt while they update payment information. Configure a clear grace-period notice in the plugin UI.
- **Email Notifications:** Configure NetLicensing to send renewal reminders (3 days before, 1 day before, at expiration) or have DigiPass send custom publisher-branded reminders.
- **Churn Reduction:** Monitor renewal rates per tier and price point. If a tier shows high churn, use the NetLicensing analytics API to identify renewal trends and test promotions.
- **Content Preview for Non-Subscribers:** Show the first 2–3 paragraphs of premium articles to non-subscribers, encouraging conversion. Implement this as a post excerpt, not a NetLicensing rule.
- **Cancellation Workflow:** Provide a clear "Manage Subscription" link in plugin settings; allow subscribers to cancel or switch tiers without contacting support.
- **Data Export for GDPR:** On subscriber deletion request, DigiPass should call NetLicensing API to delete associated Licensee records (with appropriate data retention review).

### Results & Outcome

- **Manual processing overhead eliminated:** New subscriber onboarding, renewal processing, and access revocation are fully automated; no staff intervention required.
- **Customer service load reduced:** Automated renewal reminders and grace periods dramatically reduced "my access stopped" support tickets.
- **Time-to-revenue decreased:** Visitors can sign up and gain access within minutes; no manual approval delays.
- **Subscriber analytics gained:** NetLicensing provides rich data on subscription preferences, renewal rates, and lifetime value per tier, directly informing pricing and promotion strategies.
- **Revenue per subscriber increased:** Publishers using DigiPass with clear multi-tier pricing captured 2–3x more revenue per engaged reader compared to single-price or ad-only models.
- **Adoption accelerated:** WordPress-native plugin deployment (no custom coding required) made subscription monetization accessible to publishers of all technical skill levels.
