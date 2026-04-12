---
layout: casestudy
title: "Streaming Platform: Monetizing Digital Media with Flexible Access Models"
description: "Monetize and gate eBooks, in-game assets, streaming channels, and publisher content with time-limited or consumption-based entitlements"
permalink: "/case-studies/digital-media-content-access/"
img: "/img/case-studies/netlicensing-case-study-digital-media-content-access.png"
tags:
- Case Studies
- Use Cases
- Digital Media
- Content Platform
- Streaming Access
industry:
- Digital Media / Content Platform
use-case:
- Content monetization
- Digital rights management
- Streaming access control
- Publisher content gating
favorite-feature:
- Licensing Model "Rental"
- Licensing Model "Pay-Per-Use"
- Licensing Model "Subscription"
---

### Overview

MediaStream is a B2C content aggregation platform offering eBooks, audiobooks, video courses, and premium articles from hundreds of independent publishers and content creators. Their primary audience includes students, professionals seeking continuing education, and casual readers who consume content on varied schedules. Before adopting NetLicensing, the platform was constrained to a single monetization model: monthly subscriptions. This one-size-fits-all approach created friction with both users and publishers—casual users abandoned the platform due to subscription commitment hesitation, while high-volume content consumers felt penalized by paying flat monthly rates regardless of consumption levels. Publishers, in turn, lacked visibility into revenue attribution and couldn't optimize their content strategy around actual engagement patterns.

MediaStream's leadership recognized that flexible monetization was essential to capturing untapped market segments and maximizing publisher partnerships. The decision to integrate NetLicensing as the unified entitlement layer was driven by three core requirements: (1) support multiple simultaneous licensing models without rebuilding backend infrastructure, (2) enforce digital rights server-side to prevent unauthorized content sharing and piracy, and (3) provide real-time analytics on consumption patterns tied to license types for revenue optimization. NetLicensing's Rental, Pay-Per-Use, and Subscription models aligned perfectly with these needs and eliminated months of custom development.

### Licensing Challenge

MediaStream's original platform enforced a rigid subscription model: users paid a flat $9.99/month for unlimited access to the premium catalog, or used a free tier with crippled functionality. This created two critical business problems:

**User Acquisition Friction:** A substantial segment of potential users—students wanting to try a single textbook chapter, business professionals seeking one-off training videos, or casual readers exploring a niche author—declined to subscribe. The $9.99 commitment was perceived as high-risk for uncertain value. The company observed a 68% cart abandonment rate when converting free-tier users to paid subscriptions.

**Publisher Revenue Misalignment:** Publishing partners were compensated based on fixed monthly revenue pools distributed proportionally across all content, with no correlation to actual consumption. Publishers had no incentive to optimize for the subscription model and frequently questioned whether their content was driving meaningful engagement. Some high-demand content (e.g., professional certification study guides) was carrying the entire revenue model while other content generated vanishingly small payouts, but all received the same "per-catalog" revenue split.

**Content Piracy and Unauthorized Sharing:** With subscriptions downloaded to mobile apps and web clients, unauthorized sharing became prevalent. Users shared login credentials or redistributed downloadable eBooks via email and torrent sites. The platform lacked granular entitlement enforcement and had no mechanism to tie licenses to specific devices or revoke access in real-time.

### Chosen Licensing Model

MediaStream implemented a hybrid approach using three of NetLicensing's core models:

**1. Subscription Model (Premium Access):** Users paying $9.99/month receive a Multi-Feature license granting access to the entire premium catalog. Renewal is automated through NetLicensing's Subscription model with monthly grace-period handling. This continues to serve loyal users and provides predictable recurring revenue.

**2. Rental Model (Time-Limited Access):** Individual content pieces are offered on time-limited rental terms: eBooks and audiobooks for 7 or 14 days ($2.99–$6.99), video courses for 30 days ($12.99–$24.99). Each rental creates a TIMEVOLUME license with precise expiration enforcement. After the rental window closes, the license is automatically revoked and content access is blocked without manual intervention.

**3. Pay-Per-Use Model (Consumption-Based):** Individual articles, conference talks, and premium research papers are sold as single-use licenses for $0.99–$3.99. Each purchase creates a QUANTITY license with a quota of 1, expiring after the session or at a fixed time window (e.g., 24 hours). Prepaid credit accounts are also supported, where users purchase a $25 credit pack and each article access decrements the remaining balance.

The rationale for this three-model approach: Subscriptions retain high-lifetime-value users; rentals capture price-sensitive users seeking flexible, temporary access; and pay-per-use monetizes impulse purchases and single-item discovery patterns. Together, these models increased the addressable market by approximately 45% compared to subscription-only.

### NetLicensing Configuration

The following describes the step-by-step configuration in NetLicensing's Management Console:

**Step 1: Create the Product**

1. Log into the NetLicensing Management Console at `https://admin.netlicensing.io`
2. Navigate to **Products** and click **Create Product**
3. Enter the following details:
   - **Product Number:** `MEDIASTREAM-P001`
   - **Product Name:** `MediaStream Content Platform`
   - **Version:** `2.0`
   - **Licensee Auto-Create:** Enabled (to auto-provision licensees on first license assignment)
   - **Licensee Secret Mode:** PREDEFINED (to bind licenses to specific devices via device_id)
4. Click **Save**

**Step 2: Create Product Modules**

Create three modules, one for each licensing model. This allows independent configuration and analytics per model.

**Module 1: Premium Subscriptions**

1. Navigate to the product and click **Create Module**
2. Enter:
   - **Module Number:** `MEDIASTREAM-M-SUBSCRIPTION`
   - **Module Name:** `Premium Subscription Access`
   - **Licensing Model:** Subscription
   - **Grace Period:** 5 days (allows subscribers 5-day grace period after monthly renewal date before access is revoked)
3. Click **Save**

**Module 2: Rental Access**

1. Click **Create Module**
2. Enter:
   - **Module Number:** `MEDIASTREAM-M-RENTAL`
   - **Module Name:** `Time-Limited Rental Access`
   - **Licensing Model:** Rental
   - **Yellow Threshold:** 2 days (warning sent when rental has 2 days remaining)
   - **Red Threshold:** 1 day (critical warning when 1 day remains)
3. Click **Save**

**Module 3: Pay-Per-Use**

1. Click **Create Module**
2. Enter:
   - **Module Number:** `MEDIASTREAM-M-PAY-PER-USE`
   - **Module Name:** `Pay-Per-Use Content Access`
   - **Licensing Model:** Pay-Per-Use
3. Click **Save**

**Step 3: Create License Templates**

For each module, create license templates representing specific product offerings:

**Subscription Templates:**

1. In Module `MEDIASTREAM-M-SUBSCRIPTION`, click **Create License Template**
   - **Template Number:** `MEDIASTREAM-LT-SUB-BASIC`
   - **Template Name:** `Monthly Premium Subscription`
   - **License Type:** FEATURE
   - **Time Volume:** 1
   - **Time Volume Period:** MONTH
   - **Price:** 9.99
   - **Currency:** USD
   - **Automatic Assignment:** Enabled (auto-create for new users)

2. Create another for annual commitment:
   - **Template Number:** `MEDIASTREAM-LT-SUB-ANNUAL`
   - **Template Name:** `Annual Premium Subscription (Discounted)`
   - **License Type:** FEATURE
   - **Time Volume:** 12
   - **Time Volume Period:** MONTH
   - **Price:** 99.99
   - **Currency:** USD

**Rental Templates:**

1. In Module `MEDIASTREAM-M-RENTAL`, click **Create License Template**
   - **Template Number:** `MEDIASTREAM-LT-RENT-EBOOK-7D`
   - **Template Name:** `eBook 7-Day Rental`
   - **License Type:** TIMEVOLUME
   - **Time Volume:** 7
   - **Time Volume Period:** DAY
   - **Price:** 2.99
   - **Currency:** USD

2. Create additional rental templates:
   - **Template Number:** `MEDIASTREAM-LT-RENT-COURSE-30D`
   - **Template Name:** `Video Course 30-Day Rental`
   - **Time Volume:** 30
   - **Time Volume Period:** DAY
   - **Price:** 19.99

**Pay-Per-Use Templates:**

1. In Module `MEDIASTREAM-M-PAY-PER-USE`, click **Create License Template**
   - **Template Number:** `MEDIASTREAM-LT-PPU-ARTICLE`
   - **Template Name:** `Premium Article Single View`
   - **License Type:** QUANTITY
   - **Quantity:** 1
   - **Price:** 0.99
   - **Currency:** USD

2. Create for credit packs:
   - **Template Number:** `MEDIASTREAM-LT-PPU-CREDITS-25`
   - **Template Name:** `$25 Content Credits`
   - **License Type:** QUANTITY
   - **Quantity:** 25
   - **Price:** 25.00
   - **Currency:** USD

**Step 4: Configure Custom Properties (Optional)**

Add custom properties to track content metadata:

1. On each template, add:
   - **Property Name:** `contentId` — store the internal content database ID
   - **Property Name:** `contentType` — values: ebook | video | article | audiobook
   - **Property Name:** `deviceId` — store the user's device identifier for revocation tracking

### Integration Walkthrough

The MediaStream application integrates NetLicensing at four critical junctures:

**Licensee Creation (User Registration)**

When a new user registers, the application creates a NetLicensing Licensee representing that user:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "productNumber=MEDIASTREAM-P001&licenseeNumber=USR-$(date +%s)&name=$(urlencode $userEmail)"
```

**Response (201 Created):**

```json
{
  "licensee": {
    "number": "USR-1718814225",
    "active": true,
    "name": "user@example.com",
    "productNumber": "MEDIASTREAM-P001",
    "created": "2024-06-19T14:30:25Z",
    "product": {
      "number": "MEDIASTREAM-P001",
      "name": "MediaStream Content Platform"
    }
  }
}
```

The application stores the returned `licenseeNumber` in its user database, establishing a persistent mapping.

**License Issuance (Purchase Flow)**

When a user selects a rental or pay-per-use item, the application creates a new license by posting to the NetLicensing API:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseeNumber=USR-1718814225&licenseTemplateNumber=MEDIASTREAM-LT-RENT-EBOOK-7D&name=Rental: Learning Python (2024)" \
  -d "startDate=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
```

**Response (201 Created):**

```json
{
  "license": {
    "number": "LIC-1718814290-001",
    "active": true,
    "name": "Rental: Learning Python (2024)",
    "licenseeNumber": "USR-1718814225",
    "licenseTemplateNumber": "MEDIASTREAM-LT-RENT-EBOOK-7D",
    "startDate": "2024-06-19T14:31:30Z",
    "expiryDate": "2024-06-26T14:31:30Z",
    "validity": 7,
    "validityPeriod": "DAY",
    "timeVolumeCheckIn": 0,
    "timeVolumeCheckOut": 0
  }
}
```

**License Validation (Content Access)**

Whenever the user attempts to read, stream, or view content, the application validates the active license before serving the content:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/USR-1718814225/validate" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

**Response (200 OK):**

```json
{
  "ttl": "3600",
  "productModuleValidation": [
    {
      "moduleNumber": "MEDIASTREAM-M-SUBSCRIPTION",
      "moduleName": "Premium Subscription Access",
      "valid": false
    },
    {
      "moduleNumber": "MEDIASTREAM-M-RENTAL",
      "moduleName": "Time-Limited Rental Access",
      "valid": true,
      "license": {
        "number": "LIC-1718814290-001",
        "active": true,
        "expiryDate": "2024-06-26T14:31:30Z",
        "validity": 7
      }
    },
    {
      "moduleNumber": "MEDIASTREAM-M-PAY-PER-USE",
      "moduleName": "Pay-Per-Use Content Access",
      "valid": false
    }
  ]
}
```

**Application Logic:**
- If any module returns `"valid": true`, the user's license is current and content is served
- If all modules return `"valid": false`, content access is blocked and the user is redirected to the shop
- The application caches the validation response for 1 hour (TTL = 3600) to minimize API calls and handle brief offline periods

**Expiration Handling (Background Job)**

A scheduled backend job runs hourly to detect expired rentals and notify users:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/USR-1718814225/validate" \
  -H "Authorization: Basic <base64_encoded_api_token>"
```

If the response includes a license with `expiryDate` within 2 days of now, the application queues a reminder notification (email or in-app) with a one-click renewal link to the NetLicensing Shop.

### Licensee Management

MediaStream uses a hybrid approach combining auto-provisioning and manual management:

**Auto-Provisioning on Sign-Up**

1. User completes email and password registration on the MediaStream website
2. The backend calls the Licensee creation endpoint (shown above) and receives a `licenseeNumber`
3. This number is stored in the `users.netlicensing_id` column
4. On first login, if the user has no licenses, they are shown the NetLicensing Shop to select a subscription, rental, or pay-per-use purchase

**Linking Devices**

For multi-device entitlement enforcement (preventing credential sharing), the application implements device binding:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseeNumber=USR-1718814225&licenseTemplateNumber=MEDIASTREAM-LT-RENT-EBOOK-7D" \
  -d "customProperty.deviceId=IPHONE-12345-ABC&customProperty.contentId=EBOOK-789"
```

The `customProperty.deviceId` field is set to a unique device identifier (IDFA on iOS, AAID on Android, or a browser fingerprint on web). This enables the backend to validate that the license holder is requesting access from an authorized device, preventing sharing of credentials across multiple households.

**Manual License Transfer (Support Flow)**

If a user upgrades their device or loses access, support staff can manually transfer licenses:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee/USR-1718814225/transfer" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "targetLicenseeNumber=USR-NEW-TRANSFER&licenseNumbers=LIC-1718814290-001"
```

This reassigns the specified license to a new licensee (useful if the user creates a second account or switches devices).

### Shop & Payment Integration

MediaStream uses the NetLicensing Shop as the primary purchase interface for all non-subscription offerings (rentals and pay-per-use). Subscriptions are handled separately through Stripe integration for recurring billing.

**Shop Token Generation**

When a user navigates to the "Purchase" section of the app, the backend generates a shop token valid for 30 minutes:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/token" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseeNumber=USR-1718814225&action=SHOP" \
  -d "successUrl=https://mediastream.com/home&successUrlTitle=Return to App" \
  -d "cancelUrl=https://mediastream.com/purchase&cancelUrlTitle=Continue Shopping"
```

**Response (201 Created):**

```json
{
  "token": {
    "number": "TOKEN-SHOP-2024-06-19-001",
    "active": true,
    "expiryDate": "2024-06-19T15:00:00Z",
    "successUrl": "https://mediastream.com/home",
    "successUrlTitle": "Return to App",
    "cancelUrl": "https://mediastream.com/purchase",
    "cancelUrlTitle": "Continue Shopping"
  }
}
```

**Shop URL Construction**

The application constructs the shop URL by appending the token number to the NetLicensing Shop base URL:

```
https://shop.netlicensing.io/?token=TOKEN-SHOP-2024-06-19-001
```

The user is directed to this URL via webview (mobile) or new browser tab (web). The shop presents the available license templates (rentals, pay-per-use, and subscription tiers) with pricing and descriptions.

**Payment Gateway Integration**

NetLicensing Shop supports multiple payment methods; MediaStream configures:
- **Stripe** for credit/debit card payments (default, 2.9% + $0.30 per transaction)
- **PayPal** as secondary (3.49% + $0.49 per transaction)

Payment method configuration is handled in the NetLicensing Management Console under **Payment Methods**:

1. Navigate to **Payment Methods** → **Create Payment Method**
2. Select **Stripe** and enter your Stripe API keys
3. Enable PayPal and configure PayPal merchant account

NetLicensing handles the payment processing; the application never touches payment data directly (PCI-DSS compliant).

**Post-Purchase License Activation**

When a user completes a purchase in the NetLicensing Shop and is redirected back to the app via `successUrl`, the application must confirm that the license was created:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/USR-1718814225/validate" \
  -H "Authorization: Basic <base64_encoded_api_token>"
```

The application checks the response for the newly created license. If present and `"valid": true`, the user is granted immediate access to the purchased content. A background job also polls this endpoint periodically to detect delayed license creation due to asynchronous payment processing.

### Edge Cases & Best Practices

**Offline and Grace-Period Handling**

MediaStream implements a 1-hour cache of validation responses to handle brief offline periods and reduce API load. When the cache is valid, content is served without querying NetLicensing. When the cache expires and no network connection is available, a 24-hour offline grace period is extended, allowing the user to continue accessing previously validated content. If the device goes offline and the user attempts to access a new piece of content, they are presented with a "Connection Required" message.

For rental licenses approaching expiry, the app respects the `yellowThreshold` and `redThreshold` set in the module configuration (2 days and 1 day remaining, respectively). When the license approaches these thresholds, the UI displays a countdown banner with a one-click renewal link.

**License Transfer and Device Deactivation**

Support staff use the license transfer API (shown above) for user-initiated device switches. The application also implements a "deactivate device" flow where a user can manually revoke licenses tied to an old device through account settings. The backend calls the license deactivation endpoint:

```bash
curl -X DELETE "https://go.netlicensing.io/core/v2/rest/license/LIC-1718814290-001" \
  -H "Authorization: Basic <base64_encoded_api_token>"
```

This immediately blocks content access on the revoked device.

**Audit Logging**

Every license create, activate, and validation is logged to a local audit table with:
- Timestamp
- Licensee number
- License number
- API response status code
- User action (content access attempt, purchase, renewal)
- IP address (for fraud detection)

This log is retained for 2 years and is queryable by support and analytics teams.

**Error Handling and Retry Logic**

The application implements exponential backoff for NetLicensing API calls:
- On 5xx errors (server issues), retry with 2-second, 4-second, and 8-second delays
- On 429 (rate limit), respect the `Retry-After` header and queue the request
- On 4xx errors (invalid request), fail immediately and log to error tracking (e.g., Sentry)

All validation calls include a request timeout of 5 seconds; if exceeded, the cached validation result is used.

**Rate Limiting Considerations**

The MediaStream application serves millions of monthly validation requests. To stay within NetLicensing rate limits (typically 10,000 requests/minute per API token), the application:

1. Caches validation responses for 1 hour per user
2. Batches license creation calls (e.g., bulk rental assignments for promotional campaigns)
3. Schedules analytics and reporting queries during low-traffic hours (2–4 AM UTC)
4. Uses separate API tokens for different services (one for web, one for mobile, one for batch jobs) to distribute the rate limit quota

### Results & Outcome

Following NetLicensing integration, MediaStream achieved significant business and technical improvements:

- **Revenue increased 34%** within the first six months. The rental and pay-per-use tiers captured price-sensitive users who previously abandoned the platform due to subscription friction. The ability to try single items before committing to a subscription lowered the conversion barrier.
- **User base expanded 28%**, driven primarily by casual and new users adopting rental and pay-per-use options. Monthly active users grew from 245,000 to 314,000.
- **Publisher satisfaction improved significantly**. By providing consumption-based analytics tied to specific license types, publishers gained transparency into which content performed best under each model. Revenue distribution shifted from flat pools to engagement-driven payouts, improving partnerships and content quality.
- **Piracy and unauthorized sharing declined 67%**. Server-side entitlement validation, combined with device binding and real-time license revocation, made unauthorized access economically unattractive compared to legitimate purchase options.
- **Customer support burden decreased 41%**. Automated expiration notifications and one-click renewal reduced manual requests for license reactivation or transfer.
- **Platform scaled to support 5x content growth** without additional licensing infrastructure. NetLicensing's cloud backend absorbed the increased licensing volume without requiring internal scaling.
- **Cross-device content access became seamless**, with users able to start reading on mobile and continue on web/tablet without license reassignment or manual intervention.
