---
layout: casestudy
title: "Document SaaS: Credit Packs to Subscription Tiers"
description: "A document conversion and eSignature service moved from credit packs to subscription tiers with overage pricing."
permalink: "/case-studies/document-saas-subscription-tiers/"
img: "/img/case-studies/netlicensing-case-study-document-saas-subscription-tiers.png"
tags:
- Case Studies
- Use Cases
- Document Automation
- Subscription
- Overage Pricing
industry:
- Document Automation / eSignature SaaS
use-case:
- Credit-to-subscription migration
- Overage billing
- Trial management
favorite-feature:
- Licensing Model "Subscription"
- Quantity-Based Licensing
- Licensing Model "Try & Buy"
---

### Overview

DocConvert Pro is a cloud-based SaaS platform offering document conversion (PDF to Word, Excel to PDF, etc.) and electronic signature (eSignature) capabilities to SMBs and enterprises. The platform serves teams of document processors, HR departments, legal firms, and finance teams who need reliable, scalable document workflows. Before NetLicensing, the platform relied on a credit pack monetization model: users purchased prepaid blocks of credits (e.g., 100 conversions for $25), each document action consumed a fixed number of credits, and when credits depleted, users either stopped using the platform or repurchased. This model generated inconsistent revenue, provided no visibility into customer usage trends, and created user friction at the critical moment of document submission—a user who ran out of credits would receive a "purchase credits" prompt mid-workflow, leading to abandonment and high customer frustration.

DocConvert Pro's leadership recognized that predictable SaaS subscription revenue, combined with flexible overage pricing for power users, would improve customer lifetime value, reduce churn, and simplify financial planning. The transition required a new licensing architecture that NetLicensing's Subscription, Try & Buy, and quantity-based models were built to support. The goal was to migrate the existing credit pack customer base to subscriptions while introducing tiered feature sets and usage limits that matched market expectations.

### Licensing Challenge

DocConvert Pro's original credit pack model created four interconnected problems:

**Unpredictable Revenue and Poor LTV Forecasting:** Credit sales were transactional and bursty. A single power user might purchase 500 credits once, then disappear for six months; another might buy 50 credits monthly for five months, then churn. The company had no way to forecast monthly recurring revenue or predict which customers were at risk of churn. Customer acquisition cost was difficult to justify when payback could occur across a variable number of sporadic transactions.

**Customer Anxiety and Friction at Usage Time:** When a user initiated a document conversion and discovered insufficient credits, the experience was jarring. The user had to abandon their workflow, navigate to a billing page, select a credit pack, and complete a purchase before returning to retry. This friction drove significant abandonment; internal analysis showed 34% of users who encountered a credit-insufficient error never returned.

**Inability to Monetize High-Volume Users:** Some teams with high document volumes (legal firms processing contracts daily, finance departments with weekly batch conversions) found the per-credit model wasteful and switched to competitors with flat-rate subscriptions. DocConvert Pro had no mechanism to capture these high-value customers without building custom licensing logic.

**Trial-to-Paid Conversion Was Vague:** The free trial offered unlimited access for 14 days with no limits. This gave prospects an unrealistic experience and made conversion ratios unpredictable. Many prospects used the trial to accomplish a one-off task (converting a handful of documents) and never upgraded, treating the platform as a free tool rather than a paid service.

### Chosen Licensing Model

DocConvert Pro implemented a hybrid subscription + overage model using NetLicensing's Subscription, Quantity, and Try & Buy licensing models:

**1. Subscription Model (Primary Pricing):** Three tier levels—Starter, Professional, Business—each with a fixed monthly included volume of conversions and signatures. At the beginning of each billing period, NetLicensing's Subscription model automatically renews the license and resets usage counters. This creates predictable monthly revenue and aligns pricing with customer workflow size.

- **Starter:** 200 conversions + 50 signatures/month for $29/month
- **Professional:** 1,000 conversions + 250 signatures/month for $99/month
- **Business:** 5,000 conversions + 1,000 signatures/month for $299/month

**2. Overage Licensing (Quantity Model):** Customers who exceed their monthly included volumes can purchase overage blocks in real-time through the NetLicensing Pricing Table. Each overage block (e.g., 100 additional conversions) is a separate QUANTITY license that depletes as usage occurs.

**3. Try & Buy Model (Trial):** Prospects receive a 14-day trial with a TIMEVOLUME license and a fixed included quantity (50 conversions, 10 signatures). This gives a realistic product experience while preventing unlimited free usage. At trial expiry, the user is prompted to upgrade without hard service interruption.

The logic: Subscriptions provide predictable base revenue from committed customers; overage allows high-volume users to pay proportionally to usage without hitting hard limits; Try & Buy converts high-intent prospects with a low-friction trial.

### NetLicensing Configuration

The following describes the Management Console configuration:

**Step 1: Create the Product**

1. Log into NetLicensing Management Console at `https://admin.netlicensing.io`
2. Navigate to **Products** → **Create Product**
3. Enter:
   - **Product Number:** `DOCCONVERT-P001`
   - **Product Name:** `DocConvert Pro`
   - **Version:** `3.1`
   - **Licensee Auto-Create:** Enabled
   - **Licensee Secret Mode:** DISABLED
4. Click **Save**

**Step 2: Create Product Modules**

Create three modules: one for subscriptions, one for overage, and one for trial.

**Module 1: Subscriptions**

1. Navigate to the product and click **Create Module**
2. Enter:
   - **Module Number:** `DOCCONVERT-M-SUBSCRIPTION`
   - **Module Name:** `Subscription Plans`
   - **Licensing Model:** Subscription
   - **Grace Period:** 3 days (3-day grace after renewal date before service revocation)
3. Click **Save**

**Module 2: Overage**

1. Click **Create Module**
2. Enter:
   - **Module Number:** `DOCCONVERT-M-OVERAGE`
   - **Module Name:** `Overage & Top-Up`
   - **Licensing Model:** PayPerUse
3. Click **Save**

**Module 3: Trial**

1. Click **Create Module**
2. Enter:
   - **Module Number:** `DOCCONVERT-M-TRIAL`
   - **Module Name:** `Free Trial Access`
   - **Licensing Model:** Try & Buy
3. Click **Save**

**Step 3: Create License Templates**

**Subscription Templates:**

1. In Module `DOCCONVERT-M-SUBSCRIPTION`, click **Create License Template**
   - **Template Number:** `DOCCONVERT-LT-SUB-STARTER`
   - **Template Name:** `Starter Plan`
   - **License Type:** FEATURE
   - **Time Volume:** 1
   - **Time Volume Period:** MONTH
   - **Price:** 29.00
   - **Currency:** USD
   - **Automatic Assignment:** Disabled (users choose tier)
   - **Custom Properties:**
     - `included_conversions: 200`
     - `included_signatures: 50`
     - `tier_name: Starter`

2. Create Professional tier:
   - **Template Number:** `DOCCONVERT-LT-SUB-PROFESSIONAL`
   - **Template Name:** `Professional Plan`
   - **License Type:** FEATURE
   - **Time Volume:** 1
   - **Time Volume Period:** MONTH
   - **Price:** 99.00
   - **Currency:** USD
   - **Custom Properties:**
     - `included_conversions: 1000`
     - `included_signatures: 250`
     - `tier_name: Professional`

3. Create Business tier:
   - **Template Number:** `DOCCONVERT-LT-SUB-BUSINESS`
   - **Template Name:** `Business Plan`
   - **License Type:** FEATURE
   - **Time Volume:** 1
   - **Time Volume Period:** MONTH
   - **Price:** 299.00
   - **Currency:** USD
   - **Custom Properties:**
     - `included_conversions: 5000`
     - `included_signatures: 1000`
     - `tier_name: Business`

**Overage Templates:**

1. In Module `DOCCONVERT-M-OVERAGE`, click **Create License Template**
   - **Template Number:** `DOCCONVERT-LT-OVERAGE-100C`
   - **Template Name:** `100 Conversion Credits`
   - **License Type:** QUANTITY
   - **Quantity:** 100
   - **Price:** 10.00
   - **Currency:** USD
   - **Custom Properties:**
     - `overage_type: conversions`
     - `overage_quantity: 100`

2. Create signature overage:
   - **Template Number:** `DOCCONVERT-LT-OVERAGE-50S`
   - **Template Name:** `50 Signature Credits`
   - **License Type:** QUANTITY
   - **Quantity:** 50
   - **Price:** 8.00
   - **Currency:** USD
   - **Custom Properties:**
     - `overage_type: signatures`
     - `overage_quantity: 50`

**Trial Template:**

1. In Module `DOCCONVERT-M-TRIAL`, click **Create License Template**
   - **Template Number:** `DOCCONVERT-LT-TRIAL-14D`
   - **Template Name:** `14-Day Free Trial`
   - **License Type:** TIMEVOLUME
   - **Time Volume:** 14
   - **Time Volume Period:** DAY
   - **Price:** 0.00 (free)
   - **Automatic Assignment:** Enabled (auto-assign to new free accounts)
   - **Custom Properties:**
     - `trial_conversions: 50`
     - `trial_signatures: 10`

**Step 4: Configure Custom Properties Tracking**

Add custom properties at the license level to track consumption:

1. On each subscription template license, add:
   - **Property Name:** `conversions_used` — incremented each conversion
   - **Property Name:** `signatures_used` — incremented each signature
   - **Property Name:** `last_reset_date` — timestamp of last usage reset (set at renewal)

### Integration Walkthrough

DocConvert Pro's backend integrates NetLicensing at the critical document processing step and customer management lifecycle.

**User Registration and Trial Assignment**

When a new user registers, the backend creates a NetLicensing Licensee and automatically assigns a trial license:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "productNumber=DOCCONVERT-P001&licenseeNumber=USR-$(uuidgen)&name=$(urlencode $userEmail)"
```

**Response (201 Created):**

```json
{
  "licensee": {
    "number": "USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a",
    "active": true,
    "name": "user@company.com",
    "productNumber": "DOCCONVERT-P001",
    "created": "2024-06-19T10:15:30Z"
  }
}
```

Next, the backend assigns a trial license:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseeNumber=USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a" \
  -d "licenseTemplateNumber=DOCCONVERT-LT-TRIAL-14D" \
  -d "startDate=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
```

**Response (201 Created):**

```json
{
  "license": {
    "number": "LIC-TRIAL-20240619-001",
    "active": true,
    "licenseeNumber": "USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a",
    "licenseTemplateNumber": "DOCCONVERT-LT-TRIAL-14D",
    "startDate": "2024-06-19T10:15:30Z",
    "expiryDate": "2024-07-03T10:15:30Z",
    "validity": 14,
    "validityPeriod": "DAY"
  }
}
```

**License Validation Before Processing**

When the user initiates a document conversion, the backend validates their license and usage against NetLicensing:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a/validate" \
  -H "Authorization: Basic <base64_encoded_api_token>"
```

**Response (200 OK):**

```json
{
  "ttl": "3600",
  "productModuleValidation": [
    {
      "moduleNumber": "DOCCONVERT-M-SUBSCRIPTION",
      "moduleName": "Subscription Plans",
      "valid": false
    },
    {
      "moduleNumber": "DOCCONVERT-M-OVERAGE",
      "moduleName": "Overage & Top-Up",
      "valid": false
    },
    {
      "moduleNumber": "DOCCONVERT-M-TRIAL",
      "moduleName": "Free Trial Access",
      "valid": true,
      "license": {
        "number": "LIC-TRIAL-20240619-001",
        "active": true,
        "expiryDate": "2024-07-03T10:15:30Z"
      }
    }
  ]
}
```

**Application Logic for Document Processing:**

```python
def validate_document_conversion(user_id, document_type="conversion"):
    licensee_id = get_licensee_id(user_id)
    validation = call_netlicensing_validate(licensee_id)
    
    # Check if any license is valid
    has_valid_license = any(
        mv["valid"] for mv in validation["productModuleValidation"]
    )
    
    if not has_valid_license:
        # Show upgrade prompt
        return {"status": "upgrade_required", "redirect": "/pricing"}
    
    # Determine included volume based on active license
    active_tier = find_active_tier(validation)
    included_volume = get_included_volume(active_tier, document_type)
    current_usage = get_usage_from_db(licensee_id, document_type)
    
    if current_usage >= included_volume:
        # User has exceeded included volume; check overage
        overage_available = check_overage_balance(licensee_id, document_type)
        if not overage_available:
            return {"status": "overage_required", "redirect": "/add-credits"}
    
    return {"status": "allowed"}
```

**Subscription Upgrade Flow**

When a trial user selects a paid subscription, the backend creates a new subscription license and deactivates the trial:

```bash
# Create new subscription license
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseeNumber=USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a" \
  -d "licenseTemplateNumber=DOCCONVERT-LT-SUB-PROFESSIONAL" \
  -d "startDate=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
```

**Response (201 Created):**

```json
{
  "license": {
    "number": "LIC-SUB-20240619-002",
    "active": true,
    "licenseeNumber": "USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a",
    "licenseTemplateNumber": "DOCCONVERT-LT-SUB-PROFESSIONAL",
    "startDate": "2024-06-19T14:30:00Z",
    "expiryDate": "2024-07-19T14:30:00Z",
    "validity": 1,
    "validityPeriod": "MONTH"
  }
}
```

**Overage Purchase (Self-Service)**

When a user exceeds their included volume, they can self-service purchase overage credits through the NetLicensing Pricing Table. The backend generates a shop token scoped to overage templates:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/token" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseeNumber=USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a" \
  -d "action=SHOP" \
  -d "successUrl=https://docconvert.app/dashboard" \
  -d "successUrlTitle=Back to Dashboard"
```

**Response (201 Created):**

```json
{
  "token": {
    "number": "TOKEN-SHOP-20240619-OVERAGE",
    "active": true,
    "expiryDate": "2024-06-19T14:45:00Z"
  }
}
```

Shop URL:

```
https://shop.netlicensing.io/?token=TOKEN-SHOP-20240619-OVERAGE
```

The user is presented with overage options (100 conversions for $10, 50 signatures for $8, etc.). After purchase, the new QUANTITY license is automatically assigned and the user can immediately continue processing.

### Licensee Management

DocConvert Pro uses automatic provisioning with manual override options:

**User Registration to Licensee Mapping**

When a user registers on DocConvert Pro, the backend:

1. Creates a local user record in the `users` table with email, password hash, created_at
2. Calls the Licensee creation API (shown above) with email as the name
3. Stores the returned `licenseeNumber` in `users.netlicensing_id`
4. Automatically assigns the trial license

This mapping persists for the lifetime of the account and is used for all subsequent license operations.

**Manual Subscription Creation (Admin/Sales)**

For enterprise customers or special offers, sales staff can manually create subscription licenses:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseeNumber=USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a" \
  -d "licenseTemplateNumber=DOCCONVERT-LT-SUB-BUSINESS" \
  -d "startDate=2024-06-20T00:00:00Z" \
  -d "customProperty.discount=25%" \
  -d "customProperty.salesPerson=john@docconvert.io"
```

**Tier Downgrade or Upgrade**

If a customer changes their subscription tier, the backend:

1. Deactivates the old subscription license
2. Creates a new subscription license with the new tier
3. Pro-rates the billing (handled by an external accounting system, not NetLicensing)

**Subscription Renewal**

NetLicensing's Subscription model handles renewal automatically. Seven days before expiry, the backend receives a webhook notification (or polls the validation endpoint) and:

1. Sends a renewal reminder email to the customer
2. Attempts auto-charge via Stripe
3. On success, NetLicensing automatically creates a new license for the next period
4. On failure, a manual retry sequence is triggered

### Shop & Payment Integration

DocConvert Pro uses NetLicensing Shop as the primary purchase interface for subscriptions and overage credits. Stripe is configured as the payment gateway.

**Shop Token Generation for Tier Selection**

When a trial user navigates to the pricing page, the backend generates a shop token without specifying a template (allowing the customer to choose):

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/token" \
  -H "Authorization: Basic <base64_encoded_api_token>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseeNumber=USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a" \
  -d "action=SHOP" \
  -d "successUrl=https://docconvert.app/welcome" \
  -d "successUrlTitle=Go to Dashboard" \
  -d "cancelUrl=https://docconvert.app/pricing" \
  -d "cancelUrlTitle=Back to Pricing"
```

The shop displays all subscription tiers (Starter, Professional, Business) and overage options. Customers can toggle between plans or purchase overage as a one-time addition.

**Payment Method Setup**

In the NetLicensing Management Console:

1. Navigate to **Payment Methods** → **Create**
2. Select **Stripe**
3. Enter your Stripe API credentials (obtainable from your Stripe dashboard)
4. Enable Stripe as the default payment processor
5. (Optional) Add PayPal as a secondary method for international customers

All credit card processing is handled by Stripe (PCI-DSS compliant); DocConvert Pro never touches card data.

**Post-Purchase License Activation and Webhook Handling**

When a customer completes a purchase in the NetLicensing Shop, they are redirected to `successUrl`. The backend verifies the license was created:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a/validate" \
  -H "Authorization: Basic <base64_encoded_api_token>"
```

If the response includes a valid subscription or overage license, the user's account is immediately upgraded. The DocConvert Pro dashboard displays the new subscription tier and available monthly volumes.

### Edge Cases & Best Practices

**Grace Period Handling**

NetLicensing's Subscription model includes a configurable grace period (3 days, set in the module configuration). If a subscription renewal fails due to payment issues, the user's license remains valid for 3 additional days. During this window, DocConvert Pro's backend sends escalating payment retry emails and may block overage purchases to encourage immediate payment. After the grace period expires, the license becomes invalid and the user is redirected to re-subscribe.

**Trial Expiration and Upgrade Prompts**

Seven days before trial expiry, the validation endpoint includes a warning in the response:

```json
{
  "license": {
    "number": "LIC-TRIAL-20240619-001",
    "expiryDate": "2024-07-03T10:15:30Z",
    "daysUntilExpiry": 7
  }
}
```

The frontend detects this and displays a banner encouraging upgrade to a paid plan. At trial expiry (when `expiryDate` passes), the license becomes invalid but the user is not immediately hard-blocked; instead, they see a full-screen upgrade modal offering a 20% first-month discount.

**Usage Tracking and Reset**

Usage counters for conversions and signatures are stored in the local `user_monthly_usage` table, keyed by licensee_number, document_type, and billing_period. At subscription renewal, a background job resets these counters to zero. For overage licenses (QUANTITY type), NetLicensing itself tracks the remaining quantity; each overage usage call decrements it automatically.

**Subscription Cancellation and Refunds**

When a customer cancels their subscription, the backend:

1. Marks the license as inactive (optional: calls the delete endpoint, or simply does not renew)
2. Sets the account to free tier (trial or limited-feature account if not already expired)
3. Retains data for 90 days to allow re-activation without data loss

If a refund is warranted, the support team manually creates a credit in the accounting system (NetLicensing does not handle refunds directly).

**Rate Limiting and Caching**

To avoid hitting NetLicensing's API rate limits (typically 10,000 requests/minute per API token), DocConvert Pro:

1. Caches validation responses for 30 minutes per user
2. Uses separate API tokens for production and development environments
3. Batches license creations when processing bulk customer imports (e.g., during migration from the old credit system)
4. Schedules analytics queries during off-peak hours

**Audit Logging**

Every subscription change is logged to an internal audit table:

```json
{
  "timestamp": "2024-06-19T14:30:00Z",
  "licensee_number": "USR-a1b2c3d4-e5f6-4a9b-8c7d-6e5f4d3c2b1a",
  "action": "subscribe",
  "old_tier": "trial",
  "new_tier": "professional",
  "license_number": "LIC-SUB-20240619-002",
  "source": "shop_ui"
}
```

This enables customer service to troubleshoot billing issues and identify patterns in subscription changes.

### Results & Outcome

Following NetLicensing migration, DocConvert Pro achieved significant improvements in revenue predictability and customer retention:

- **Monthly Recurring Revenue (MRR) increased 87%** within the first quarter. The shift from sporadic credit purchases to monthly subscriptions created consistent, forecastable revenue. Average customer lifetime value increased by 156%.
- **Customer retention improved to 91% monthly churn rate** (down from 47% churn under the credit model). Subscription customers exhibited 3x stronger retention than credit pack customers, likely due to the psychological commitment and habit formation of recurring billing.
- **Trial-to-paid conversion improved to 23%** (from a baseline of ~8% under unlimited trials). The 14-day time limit and fixed included volumes created appropriate scarcity and urgency, improving conversion while still providing a realistic product preview.
- **High-volume customer monetization:** Overage purchases represented 12% of monthly revenue by month 4, capturing customers who would have churned under fixed-tier limits.
- **Reduced support burden:** Clearer pricing tiers and automatic overage options reduced billing-related support tickets by 64%.
- **Analytics and insights:** Consumption patterns by tier enabled DocConvert Pro to optimize pricing and identify which features drove the most value for each customer segment.
- **Payment success rates:** Using Stripe for subscription payments yielded 96% initial payment success rates and automated dunning management reduced involuntary churn from payment failures.
