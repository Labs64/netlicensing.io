---
layout: casestudy
title: "Connected Products & Smart Home: Remote Feature Enablement and Service Subscription Management"
description: "Expand smart home, connected vehicle, and consumer electronics offerings with remote feature enablement and service subscription management"
permalink: "/case-studies/connected-products-smart-home/"
img: "/img/case-studies/netlicensing-case-study-connected-products-smart-home.png"
tags:
- Case Studies
- Use Cases
- Smart Home
- Consumer Electronics
- Connected Products
industry:
- Consumer Electronics / Smart Home
use-case:
- Remote feature enablement
- Service subscription management
- Connected product ecosystems
favorite-feature:
- Licensing Model "Subscription"
- Licensing Model "Multi-Feature"
- Remote License Management
---

### Overview

A consumer electronics manufacturer had successfully launched a portfolio of connected products spanning smart speakers, security cameras, fitness wearables, and connected kitchen appliances. Individual product lines drove strong hardware sales, but each operated in isolation with its own mobile app, cloud backend, and feature management system. The company struggled to monetize premium features (cloud video recording, AI analytics, cross-device automation, priority support) and lacked a business model for ecosystem-wide subscriptions that would reward customers for owning multiple product types.

Customers who owned, for example, both a smart speaker and a security camera system had to manage separate subscription accounts, inconsistent billing cycles, and no discount for loyalty. The technical infrastructure—with entitlements hardcoded in firmware or locked in product-specific backends—made it impossible to launch promotional campaigns or adjust pricing without pushing firmware updates to millions of devices.

The manufacturer needed a unified, cloud-based entitlement layer that could span all product categories, enable remote feature activation, support flexible subscription tiers, and provide a single management portal where customers could view all devices and subscriptions.

### Licensing Challenge

The company's fragmented approach created three specific problems:

1. **Subscription fragmentation**: Customers with multiple product types juggled separate subscriptions with different billing dates, feature sets, and price points. A customer with a smart speaker subscription ($4.99/mo) plus a fitness tracker subscription ($9.99/mo) plus a camera subscription ($6.99/mo) paid $21.97/month for three separate accounts, with no ecosystem discount or unified management.

2. **Inflexible feature management**: Features were hardcoded into device firmware or managed via product-specific APIs with no central control. Launching a new feature across all products required coordinated firmware releases. Running a promotional campaign (e.g., "free video storage for 60 days") required manual backend changes per product and generated support confusion.

3. **No ecosystem incentive structure**: There was no mechanism to detect customer ownership of multiple products or reward cross-product loyalty. A customer who invested in all five product categories received no benefit, creating a missed opportunity to increase lifetime value and reduce churn.

### Chosen Licensing Model

The manufacturer implemented a three-layer entitlement strategy using NetLicensing:

**Layer 1: Subscription Tiers (Subscription Model)** — recurring billing plans spanning the entire ecosystem:
- Essential (free, included with hardware; basic connectivity only)
- Connected Home Plus (cloud features, analytics, automation)
- Ultimate Ecosystem (all features plus premium content and concierge)

**Layer 2: Feature Packages (Multi-Feature Model)** — granular capabilities activated independently:
- Cloud Services (video recording, backup, extended history)
- Intelligence Features (AI recommendations, predictive analytics)
- Automation & Integration (cross-device routines, third-party APIs)
- Premium Content (curated playlists, workout programs, recipes)
- Professional Services (installation support, priority support)

**Layer 3: Device Entitlements (Per-Device Licenses)** — tracking which devices have which features active:
- Smart Speaker (supports Cloud Services, Intelligence, Automation, Premium Content)
- Security Camera (supports Cloud Services, Intelligence, Professional Services)
- Fitness Tracker (supports Intelligence, Premium Content)
- Kitchen Appliance (supports Intelligence, Automation)

A typical customer might hold:
- One active Subscription license (Ultimate Ecosystem, monthly)
- Three additional feature licenses (e.g., Professional Services, Premium Content, Automation & Integration)
- Entitlements mapped to all their devices (speaker, camera, tracker, appliance)

### NetLicensing Configuration

#### Step 1: Create the Product

1. Log in to the NetLicensing Management Console
2. Navigate to **Products**
3. Click **New Product**
4. Enter:
   - **Product Number**: `SMART_ECOSYSTEM`
   - **Name**: `Connected Product Ecosystem Platform`
   - **Version**: `2.0`
   - **Description**: `Unified licensing for smart home, wearables, and connected appliances`
   - **Licensee Auto-Create**: Enable (users auto-register on first app login)
   - **Licensee Secret Mode**: `CLIENT` (users authenticate with email or account ID)
5. Click **Save**

#### Step 2: Create Product Modules

Create three modules for organizational clarity.

**Module 1: Subscription Tiers**
1. Within `SMART_ECOSYSTEM`, click **New Module**
2. Enter:
   - **Module Number**: `MOD_TIERS`
   - **Name**: `Ecosystem Subscription Tiers`
   - **Licensing Model**: `Subscription`
3. Click **Save**

**Module 2: Feature Packages**
1. Click **New Module**
2. Enter:
   - **Module Number**: `MOD_FEATURES`
   - **Name**: `Premium Feature Packages`
   - **Licensing Model**: `MultiFeature`
3. Click **Save**

**Module 3: Trial & Promotion**
1. Click **New Module**
2. Enter:
   - **Module Number**: `MOD_TRIALS`
   - **Name**: `Feature Trials & Promotions`
   - **Licensing Model**: `TryAndBuy`
3. Click **Save**

#### Step 3: Create Subscription Tier Templates (MOD_TIERS)

**Essential Template** (free, auto-assigned)
1. Navigate to `MOD_TIERS` → **New License Template**
2. Enter:
   - **Template Number**: `LT_ESSENTIAL`
   - **Name**: `Essential Tier`
   - **License Type**: `TIMEVOLUME`
   - **Time Volume**: `1`
   - **Time Volume Period**: `MONTH`
   - **Price**: `0.00` EUR
   - **Automatic**: Checked (assign to all new users)
   - **Features**: Basic connectivity, local control only
3. Click **Save**

**Connected Home Plus Template**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_PLUS`
   - **Name**: `Connected Home Plus Monthly`
   - **License Type**: `TIMEVOLUME`
   - **Time Volume**: `1`
   - **Time Volume Period**: `MONTH`
   - **Price**: `12.99` EUR
   - **Automatic**: Unchecked
   - **Features**: Cloud services, analytics, basic automation
   - **Grace Period**: `3` days
3. Click **Save**

**Ultimate Ecosystem Template**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_ULTIMATE`
   - **Name**: `Ultimate Ecosystem Monthly`
   - **License Type**: `TIMEVOLUME`
   - **Time Volume**: `1`
   - **Time Volume Period**: `MONTH`
   - **Price**: `24.99` EUR
   - **Features**: All features including premium content and concierge
   - **Grace Period**: `7` days
3. Click **Save**

#### Step 4: Create Feature Package Templates (MOD_FEATURES)

Each feature is a separate feature license that can be purchased independently.

**Cloud Services Package**
1. Navigate to `MOD_FEATURES` → **New License Template**
2. Enter:
   - **Template Number**: `LT_CLOUD_SERVICES`
   - **Name**: `Cloud Services (Video Recording, Backup)`
   - **License Type**: `FEATURE`
   - **Price**: `7.99` EUR
3. Click **Save**

**Intelligence Features Package**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_INTELLIGENCE`
   - **Name**: `Intelligence Features (AI Analytics, Predictions)`
   - **License Type**: `FEATURE`
   - **Price**: `5.99` EUR
3. Click **Save**

**Automation & Integration Package**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_AUTOMATION`
   - **Name**: `Automation & Integration (Cross-Device Routines)`
   - **License Type**: `FEATURE`
   - **Price**: `6.99` EUR
3. Click **Save**

**Premium Content Package**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_CONTENT`
   - **Name**: `Premium Content (Workouts, Recipes, Playlists)`
   - **License Type**: `FEATURE`
   - **Price**: `4.99` EUR
3. Click **Save**

**Professional Services Package**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_PROFESSIONAL`
   - **Name**: `Professional Services (Priority Support, Installation)`
   - **License Type**: `FEATURE`
   - **Price**: `9.99` EUR
3. Click **Save**

#### Step 5: Create Trial Templates (MOD_TRIALS)

**Ultimate Tier Trial** (new device purchasers get 30-day trial)
1. Navigate to `MOD_TRIALS` → **New License Template**
2. Enter:
   - **Template Number**: `LT_TRIAL_ULTIMATE`
   - **Name**: `Ultimate Ecosystem 30-Day Trial`
   - **License Type**: `TIMEVOLUME`
   - **Time Volume**: `30`
   - **Time Volume Period**: `DAY`
   - **Price**: `0.00` EUR
   - **Features**: Full Ultimate access for trial period
3. Click **Save**

**Premium Content Trial** (seasonal promotion)
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_TRIAL_CONTENT`
   - **Name**: `Premium Content 14-Day Trial`
   - **License Type**: `TIMEVOLUME`
   - **Time Volume**: `14`
   - **Time Volume Period**: `DAY`
   - **Price**: `0.00` EUR
3. Click **Save**

### Integration Walkthrough

#### Unified Licensee Registration

When a customer launches the connected ecosystem app for the first time, the mobile app backend calls NetLicensing to register the user account:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "number=USR_user123@example.com&productNumber=SMART_ECOSYSTEM&licenseeSecret=user123@example.com&name=John%20Doe"
```

Response:
```json
{
  "licensee": {
    "number": "USR_user123@example.com",
    "productNumber": "SMART_ECOSYSTEM",
    "active": true,
    "name": "John Doe",
    "licenseCount": 1
  }
}
```

The Essential tier license is auto-created due to the `automatic: true` flag on the template.

#### Device Association

When a user adds a device (e.g., a new smart camera) to their account, the mobile app stores the device's serial number or model identifier and associates it with the customer's licensee record. The backend maintains a mapping of devices to licensee:

Device association data (stored in app backend, not NetLicensing):
```json
{
  "licenseeNumber": "USR_user123@example.com",
  "devices": [
    {
      "deviceId": "speaker_001",
      "type": "smart-speaker",
      "serialNumber": "SS-A1B2C3D4",
      "addedDate": "2024-01-15"
    },
    {
      "deviceId": "camera_002",
      "type": "security-camera",
      "serialNumber": "SC-X9Y8Z7W6",
      "addedDate": "2024-04-19"
    }
  ]
}
```

#### Validation at App Startup

When the mobile app launches, it validates the customer's entitlements by calling NetLicensing:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/USR_user123@example.com/validate?productNumber=SMART_ECOSYSTEM" \
  -u "apiKey:<YOUR_API_KEY>"
```

Response:
```json
{
  "validationResult": {
    "productModuleValidationResult": [
      {
        "productModule": "MOD_TIERS",
        "valid": true,
        "licensing": "Subscription",
        "license": [
          {
            "number": "L_ESSENTIAL_001",
            "licenseTemplateNumber": "LT_ESSENTIAL",
            "active": true,
            "expirationDate": "2024-05-19T00:00:00Z"
          }
        ]
      },
      {
        "productModule": "MOD_FEATURES",
        "valid": false,
        "licensing": "MultiFeature"
      },
      {
        "productModule": "MOD_TRIALS",
        "valid": false,
        "licensing": "TryAndBuy"
      }
    ]
  }
}
```

The app parses this response and determines that the user has Essential tier (basic connectivity only, no cloud services). The UI hides premium features and displays upgrade prompts.

#### Subscription Upgrade

When a customer upgrades from Essential to Ultimate Ecosystem tier, the app backend creates a new Subscription license:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_ULTIMATE&licenseeNumber=USR_user123@example.com&active=true&startDate=2024-04-19T00:00:00Z"
```

Response:
```json
{
  "license": {
    "number": "L_ULTIMATE_001",
    "licenseTemplateNumber": "LT_ULTIMATE",
    "licenseeNumber": "USR_user123@example.com",
    "active": true,
    "startDate": "2024-04-19T00:00:00Z",
    "expirationDate": "2024-05-19T00:00:00Z",
    "timeVolume": "1",
    "timeVolumePeriod": "MONTH"
  }
}
```

#### Feature Add-on Purchase

If the customer purchases the Professional Services add-on independently:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_PROFESSIONAL&licenseeNumber=USR_user123@example.com&active=true"
```

The next validation call shows both the subscription and the feature license.

#### Device-Specific Feature Activation

When displaying a smart camera in the app, the client queries which features are available for that specific device type. The app determines:

Smart Speaker supports: Cloud Services, Intelligence, Automation, Premium Content
Security Camera supports: Cloud Services, Intelligence, Professional Services
Fitness Tracker supports: Intelligence, Premium Content

The app checks the validation response against the device's supported features and enables/disables UI accordingly.

#### Trial License Grant (New Device Promotion)

When a customer purchases a new device, the backend automatically grants a 30-day trial of the Ultimate tier:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_TRIAL_ULTIMATE&licenseeNumber=USR_user123@example.com&active=true&startDate=2024-04-19T00:00:00Z"
```

This trial exists alongside the customer's paid subscription. At trial expiry, the paid subscription remains active, but the temporary Ultimate-tier trial benefits expire.

### Licensee Management

#### Bulk Trial Activation (Customer Retention Campaign)

To retain at-risk customers (those with 3+ devices but on Essential tier), marketing can trigger automatic trial grants via API:

```bash
# Bulk grant: All customers with 3+ devices get 14-day Premium Content trial
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_TRIAL_CONTENT&licenseeNumber=USR_user123@example.com&active=true&startDate=2024-04-19T00:00:00Z"
```

#### Device Deactivation

If a customer unlinks a device from their account, the backend updates local device metadata but does not change NetLicensing entitlements (since entitlements are account-level, not device-level).

#### Licensee Deactivation

If a customer cancels their account, the backend deactivates the licensee:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee/USR_user123@example.com \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "active=false"
```

All active licenses automatically become invalid.

### Shop & Payment Integration

#### Unified Subscription Management Portal

The company built a unified "Manage Subscription" interface accessible from any product's mobile app. The portal calls NetLicensing to fetch the user's current entitlements and displays them side-by-side:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/USR_user123@example.com/validate?productNumber=SMART_ECOSYSTEM" \
  -u "apiKey:<YOUR_API_KEY>"
```

The UI displays:
- Current tier: Ultimate Ecosystem (expires 2024-05-19)
- Active add-ons: Professional Services, Premium Content
- Devices: Speaker, Camera, Tracker, Appliance (all devices share the same subscription)
- Manage: Upgrade/Downgrade tier, Add features, View billing history

#### Shop Token Generation for In-App Purchases

When a customer clicks "Upgrade Subscription" in the mobile app, the backend generates a shop token:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/token \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "tokenType=SHOP&licenseeNumber=USR_user123@example.com&productNumber=SMART_ECOSYSTEM&productNumber=SMART_ECOSYSTEM&successUrl=https://app.example.com/subscription-activated&cancelUrl=https://app.example.com/upgrade-canceled"
```

Response:
```json
{
  "token": {
    "number": "a1b2c3d4-e5f6-47ba-8d9e-f8a9b0c1d2e3",
    "tokenType": "SHOP",
    "licenseeNumber": "USR_user123@example.com",
    "expiresIn": 86400
  }
}
```

The app displays the NetLicensing shop URL in a web view:
```
https://go.netlicensing.io/shop/v2/?token=a1b2c3d4-e5f6-47ba-8d9e-f8a9b0c1d2e3
```

#### Payment Gateway Configuration

The manufacturer configured Stripe as the primary payment processor in the Management Console:

1. **Settings > Payment Methods**
2. Create a Stripe payment method with API keys
3. Customers in the shop select this Stripe payment option
4. NetLicensing handles tokenization and PCI compliance

#### Post-Purchase Entitlement Activation

When the customer completes the Stripe payment in the shop, NetLicensing automatically creates the license and redirects to the success URL. The app immediately calls validate again to fetch the new entitlements:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/USR_user123@example.com/validate?productNumber=SMART_ECOSYSTEM" \
  -u "apiKey:<YOUR_API_KEY>"
```

The validation response now includes the upgraded tier license. The app detects the change and immediately displays "Upgraded to Ultimate Ecosystem" confirmation.

#### Cross-Product Feature Display

Because this manufacturer has multiple mobile apps (one for smart speakers, one for cameras, etc.), each app calls the same validate endpoint and parses the response, filtering for features relevant to that product type:

App: SmartSpeaker
- Checks validation response for user's subscription tier
- Filters: Cloud Services, Intelligence, Automation, Premium Content
- Displays active features in device settings

App: SecurityCamera
- Checks validation response for user's subscription tier
- Filters: Cloud Services, Intelligence, Professional Services
- Displays active features in camera settings

This ensures a unified entitlement across all apps and devices.

### Edge Cases & Best Practices

#### Offline Cache for Subscription Validation

Mobile apps cache the validation response locally to function offline. The cache is refreshed each time the app connects to the internet. If a customer's subscription expires while the app is offline, they continue to use premium features until the cache expires (typically 7 days) or they regain connectivity.

```python
def validate_with_local_cache(licensee_number, cache_ttl_seconds=604800):  # 7 days
    cached = load_from_local_storage(f"entitlements_{licensee_number}")
    
    if cached and (time.time() - cached["timestamp"]) < cache_ttl_seconds:
        return cached["data"]
    
    try:
        response = requests.get(
            f"https://go.netlicensing.io/core/v2/rest/licensee/{licensee_number}/validate",
            auth=(api_key, "")
        )
        entitlements = response.json()
        save_to_local_storage(f"entitlements_{licensee_number}", {
            "data": entitlements,
            "timestamp": time.time()
        })
        return entitlements
    except requests.RequestException:
        if cached:
            return cached["data"]
        raise
```

#### Subscription Renewal and Payment Failure

NetLicensing's Subscription model automatically attempts renewal at the expiration date. If payment fails (e.g., expired credit card):

1. License enters grace period (7 days configured in Ultimate tier template)
2. App continues to function normally during grace period
3. At grace period expiry, license becomes inactive
4. App displays "Subscription Payment Failed" prompt with re-try option
5. Customer can update payment method in the subscription portal

The backend monitors subscription status via GET license endpoints and sends proactive email reminders 3 days before grace period expiry.

#### Feature Trials Expiring to Upsell

When a trial license expires (e.g., 30-day Ultimate trial on new device purchase), the app detects this via validation and displays an upsell prompt:

```
"Your 30-day Ultimate trial expires tomorrow. Upgrade to Ultimate Ecosystem for $24.99/month to keep all features."
```

Clicking "Upgrade Now" generates a shop token and opens the purchase flow.

#### Multi-Device Ecosystem Loyalty Bonus

The backend monitors how many devices a customer owns. Customers with 4+ devices automatically receive a 20% discount on their subscription tier. This is implemented as a custom price override via the API:

```bash
# Create a discounted license for a loyal customer
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_ULTIMATE&licenseeNumber=USR_user123@example.com&active=true&startDate=2024-04-19T00:00:00Z&price=19.99"
```

#### Seasonal Feature Promotions

During holiday seasons or product launches, the company activates time-limited feature trials for all users to drive engagement:

```bash
# Grant all customers 7-day Premium Content trial (holiday promotion)
# Executed for each active licensee
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_TRIAL_CONTENT&licenseeNumber=USR_user123@example.com&active=true&startDate=2024-04-19T00:00:00Z"
```

When the trial expires, customers who experienced premium content are prompted to purchase.

#### Audit and Revenue Reconciliation

The company exports transaction logs monthly for financial reconciliation:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/transaction?licenseeNumber=USR_user123@example.com" \
  -u "apiKey:<YOUR_API_KEY>"
```

All successful purchases create transaction records in NetLicensing, which are matched against Stripe receipts to ensure revenue accuracy.

### Results & Outcome

- **Recurring subscription revenue** grew to 34% of total company revenue within 18 months, generating $47M in annual recurring revenue (ARR)
- **Customer lifetime value** increased 280% as ecosystem subscribers maintained active plans for an average of 2.8 years vs. 0.8 years for non-subscribers
- **Cross-product adoption** accelerated 2.3x; customers with multiple subscriptions grew from 12% to 44% of the user base
- **Trial-to-paid conversion rate** reached 41% as customers experienced premium features before committing
- **Customer support volume** decreased 22% as the unified portal reduced billing and subscription confusion inquiries
- **Feature release velocity** doubled as product teams could activate new features remotely without coordinating firmware releases
- **Marketing campaign flexibility** enabled sophisticated promotions: 30-day new device trials, loyalty discounts for multi-device owners, seasonal feature unlocks, and time-limited bundles—all activated via API without engineering involvement
- **Churn rate** for Ultimate tier subscribers dropped to 3.2% annually (vs. 18% for Essential tier), indicating strong value perception and ecosystem lock-in

