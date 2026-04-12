---
layout: casestudy
title: "Connected Cars: Subscription-Based In-Vehicle Services"
description: "An automotive manufacturer monetized streaming entertainment, navigation data, and vehicle services using Subscription and Feature-Based licensing."
permalink: "/case-studies/connected-cars-services/"
img: "/img/case-studies/netlicensing-case-study-connected-cars-services.png"
tags:
- Case Studies
- Use Cases
- Automotive
- Connected Vehicles
- Subscription Services
industry:
- Automotive / Connected Vehicles
use-case:
- In-vehicle service subscriptions
- Feature-based vehicle services
- Remote service activation
favorite-feature:
- Licensing Model "Subscription"
- Licensing Model "Multi-Feature"
- Remote License Management
---

### Overview

A global automotive OEM had invested heavily in connected vehicle technology, equipping new models with embedded cellular modems, high-resolution in-cabin displays, and cloud-integrated infotainment systems. The hardware platform supported streaming entertainment, real-time navigation, remote vehicle control, concierge services, and advanced telematics—but the business model lagged behind the technology. Initial deployments bundled all connected services as complimentary trials (3–12 months), after which features stopped working entirely. This created customer frustration and missed revenue opportunities.

The manufacturer faced two critical challenges: customers expected clear upgrade paths rather than abrupt feature shutoffs, and dealerships had no tools to sell service subscriptions as an add-on revenue stream during delivery or service appointments. The OEM needed a system to manage subscription tiers, feature-based bundles, trial periods, and per-vehicle entitlements at scale across millions of vehicles globally.

The team selected NetLicensing to serve as the system of record for in-vehicle service entitlements. Each vehicle would be registered as a Licensee (using its Vehicle Identification Number as the unique identifier), and services would be modeled as License Templates within a combination of Subscription and Multi-Feature licensing models.

### Licensing Challenge

The manufacturer's previous system relied on trial bundles hardcoded into each vehicle at manufacture time. When the trial expired, the infotainment system simply disabled features, offering no customer self-service to upgrade or extend access. This approach had three structural problems:

1. **Inflexible feature granularity**: Customers couldn't purchase individual services (e.g., just streaming entertainment) or à la carte add-ons; they were forced into rigid all-or-nothing tiers.
2. **No trial-to-paid conversion path**: Trial expiration didn't trigger any upgrade prompt or sales engagement; features just stopped, causing frustration and churn.
3. **Dealership revenue loss**: Service departments had no system to sell subscription packages, missing recurring revenue opportunities during vehicle delivery, maintenance visits, and trade-in negotiations.

Additionally, the manufacturer lacked visibility into which vehicles had active entitlements, subscription status, or upcoming renewals. Manual license management (VINs, entitlements, trial extensions) was error-prone and didn't scale to 2+ million vehicles on the road.

### Chosen Licensing Model

The OEM adopted two NetLicensing models working in tandem:

**Subscription Model** for time-bound recurring plans (monthly/annual tiers: Essential, Premium, Ultimate). This model automatically renews at the specified interval and can be configured with grace periods to allow ride-out of payment delays.

**Multi-Feature Model** for granular per-service activation. Instead of bundling all services into a single license, each service (streaming audio, premium maps, remote start, concierge, safety features) is its own feature license. This allows customers to:
- Purchase tiered bundles (Premium tier bundles streaming + premium maps + concierge)
- Buy individual features à la carte
- Mix subscription features with one-time feature purchases

The combination means a customer's vehicle might have:
- One active Subscription license (Premium tier, monthly, auto-renewing)
- Three additional feature licenses for à la carte add-ons (purchased once, perpetual)

### NetLicensing Configuration

#### Step 1: Create the Product in Management Console

1. Log in to the NetLicensing Management Console
2. Navigate to **Products**
3. Click **New Product**
4. Enter:
   - **Product Number**: `VEHICLESERVICES`
   - **Name**: `Connected Vehicle Services Platform`
   - **Version**: `1.0`
   - **Description**: `In-vehicle subscription and feature licensing for connected car services`
   - **Licensee Auto-Create**: Enable (vehicles will auto-register on first cloud platform connection)
   - **Licensee Secret Mode**: `PREDEFINED` (VIN is the licensee secret)
5. Click **Save**

#### Step 2: Create Product Modules

Create two modules to organize licensing models.

**Module 1: Subscription Plans**
1. Within the `VEHICLESERVICES` product, click **New Module**
2. Enter:
   - **Module Number**: `MOD_SUBSCRIPTIONS`
   - **Name**: `Monthly Subscription Plans`
   - **Licensing Model**: `Subscription`
   - **Active**: Checked
3. Click **Save**

**Module 2: Feature Services**
1. Click **New Module** again
2. Enter:
   - **Module Number**: `MOD_FEATURES`
   - **Name**: `Premium Features`
   - **Licensing Model**: `Multi-Feature`
   - **Active**: Checked
3. Click **Save**

#### Step 3: Create License Templates for Subscriptions

Create three subscription tiers in `MOD_SUBSCRIPTIONS`.

**Essential Tier Template**
1. Navigate to `MOD_SUBSCRIPTIONS` → **New License Template**
2. Enter:
   - **Template Number**: `LT_ESSENTIAL`
   - **Name**: `Essential Monthly Subscription`
   - **License Type**: `TIMEVOLUME` (Subscription model uses TIMEVOLUME internally)
   - **Time Volume**: `1`
   - **Time Volume Period**: `MONTH`
   - **Price**: `9.99` EUR
   - **Currency**: `EUR`
   - **Features included** (as description): `Basic navigation, remote services (vehicle locator, remote start)`
   - **Automatic**: Unchecked (customers must explicitly purchase)
3. Click **Save**

**Premium Tier Template**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_PREMIUM`
   - **Name**: `Premium Monthly Subscription`
   - **License Type**: `TIMEVOLUME`
   - **Time Volume**: `1`
   - **Time Volume Period**: `MONTH`
   - **Price**: `19.99` EUR
   - **Currency**: `EUR`
   - **Features included**: `Navigation (real-time traffic, 3D maps), remote services, streaming entertainment, concierge`
3. Click **Save**

**Ultimate Tier Template**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_ULTIMATE`
   - **Name**: `Ultimate Monthly Subscription`
   - **License Type**: `TIMEVOLUME`
   - **Time Volume**: `1`
   - **Time Volume Period**: `MONTH`
   - **Price**: `34.99` EUR
   - **Currency**: `EUR`
   - **Features included**: `All Premium features + advanced safety (emergency calling, roadside coordination), diagnostic data access`
   - **Grace Period**: `7` days (allows ride-out if payment fails)
3. Click **Save**

#### Step 4: Create License Templates for Feature Services

Create individual feature templates in `MOD_FEATURES`. Each vehicle can hold these licenses independently of subscriptions.

**Streaming Entertainment Feature**
1. Navigate to `MOD_FEATURES` → **New License Template**
2. Enter:
   - **Template Number**: `LT_STREAMING`
   - **Name**: `Premium Streaming Entertainment`
   - **License Type**: `FEATURE`
   - **Price**: `7.99` EUR (one-time purchase option)
3. Click **Save**

**Advanced Navigation Feature**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_NAV_PREMIUM`
   - **Name**: `Advanced Navigation Package`
   - **License Type**: `FEATURE`
   - **Price**: `4.99` EUR
   - **Description**: `Real-time traffic, 3D maps, parking availability, EV charging station finder`
3. Click **Save**

**Concierge Services Feature**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_CONCIERGE`
   - **Name**: `Concierge Services`
   - **License Type**: `FEATURE`
   - **Price**: `6.99` EUR
3. Click **Save**

**Advanced Safety Features**
1. Click **New License Template**
2. Enter:
   - **Template Number**: `LT_SAFETY`
   - **Name**: `Advanced Safety Package`
   - **License Type**: `FEATURE`
   - **Price**: `9.99` EUR
   - **Description**: `Automatic emergency calling, stolen vehicle assistance, roadside coordination`
3. Click **Save**

### Integration Walkthrough

#### Licensing Model Overview

When a vehicle connects to the cloud platform (on ignition or infotainment startup), it calls the NetLicensing validation endpoint to determine which services are available. The validation response returns a list of all active licenses for that VIN.

#### Licensee Registration (Vehicle Onboarding)

When a vehicle first connects to the cloud platform, the manufacturing system (or dealership activation service) creates a Licensee record. With Licensee Auto-Create enabled, the first validation call will auto-create a Licensee if one doesn't exist.

Optionally, licensees can be pre-created at manufacturing time via API:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "number=VIN_1G1YY22G965118127&productNumber=VEHICLESERVICES&licenseeSecret=1G1YY22G965118127&name=Silver%20Sedan%20-%20Customer%20Test"
```

Response:
```json
{
  "licensee": {
    "number": "VIN_1G1YY22G965118127",
    "productNumber": "VEHICLESERVICES",
    "active": true,
    "licenseeSecret": "1G1YY22G965118127",
    "name": "Silver Sedan - Customer Test",
    "licenseCount": 0
  }
}
```

#### Validation at Startup

When the vehicle's infotainment system initializes, it calls the validation endpoint to fetch all active entitlements:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/VIN_1G1YY22G965118127/validate?productNumber=VEHICLESERVICES" \
  -u "apiKey:<YOUR_API_KEY>"
```

Response (before any licenses):
```json
{
  "validationResult": {
    "productModuleValidationResult": [
      {
        "productModule": "MOD_SUBSCRIPTIONS",
        "valid": false,
        "licensing": "Subscription"
      },
      {
        "productModule": "MOD_FEATURES",
        "valid": false,
        "licensing": "MultiFeature"
      }
    ]
  }
}
```

#### Creating a License (Customer Purchase)

When a customer purchases the Premium monthly subscription through the in-vehicle UI or dealership portal, the backend creates a license:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_PREMIUM&licenseeNumber=VIN_1G1YY22G965118127&active=true&startDate=2024-04-19T00:00:00Z"
```

Response:
```json
{
  "license": {
    "number": "L_PREMIUM_001",
    "licenseTemplateNumber": "LT_PREMIUM",
    "licenseeNumber": "VIN_1G1YY22G965118127",
    "active": true,
    "startDate": "2024-04-19T00:00:00Z",
    "expirationDate": "2024-05-19T00:00:00Z",
    "timeVolume": "1",
    "timeVolumePeriod": "MONTH"
  }
}
```

#### Validation After Purchase

Next time the vehicle calls validate, the response now includes the active subscription:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/VIN_1G1YY22G965118127/validate?productNumber=VEHICLESERVICES" \
  -u "apiKey:<YOUR_API_KEY>"
```

Response:
```json
{
  "validationResult": {
    "productModuleValidationResult": [
      {
        "productModule": "MOD_SUBSCRIPTIONS",
        "valid": true,
        "licensing": "Subscription",
        "license": [
          {
            "number": "L_PREMIUM_001",
            "licenseTemplateNumber": "LT_PREMIUM",
            "active": true,
            "expirationDate": "2024-05-19T00:00:00Z",
            "type": "TIMEVOLUME"
          }
        ]
      },
      {
        "productModule": "MOD_FEATURES",
        "valid": false,
        "licensing": "MultiFeature"
      }
    ]
  }
}
```

The infotainment system parses this response and enables all services bundled in the Premium tier: navigation, remote services, streaming, and concierge.

#### Feature Add-ons

A customer can also add individual features. When they purchase the Advanced Navigation feature:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_NAV_PREMIUM&licenseeNumber=VIN_1G1YY22G965118127&active=true"
```

The next validation call returns both the subscription and the feature license. The app can detect which specific features are active and display them independently.

### Licensee Management

#### Manual Licensee Creation (Pre-Manufacturing)

For vehicles pre-provisioned at the factory or during dealer onboarding, licensees are created in bulk using the Management Console or API. The VIN serves as both the licensee number and licensee secret:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "number=VIN_2T1FV1E18CC072014&productNumber=VEHICLESERVICES&licenseeSecret=2T1FV1E18CC072014&name=Red%20Truck%20-%20Customer%20Demo"
```

#### Auto-Provisioning

With `licenseeAutoCreate=true` on the product, the first validation call from a vehicle with an unknown VIN automatically creates a Licensee record. This simplifies fleet management—no pre-registration needed.

#### Trial License Grant

Dealerships can activate trial licenses for customers during vehicle delivery. This is a time-limited `TIMEVOLUME` license granting full access:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_ULTIMATE&licenseeNumber=VIN_3G5DA03E08S587491&active=true&startDate=2024-04-19T00:00:00Z"
```

NetLicensing's Subscription model automatically manages renewal dates, so trial periods naturally expire without manual intervention.

#### Bulk License Deactivation

For warranty voids, unpaid accounts, or fraud cases, licenses can be deactivated in bulk:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license/L_PREMIUM_001 \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "active=false"
```

### Shop & Payment Integration

#### NetLicensing Shop Token Generation

Customers access the shop through the vehicle's touchscreen or the manufacturer's mobile app. The app calls the backend to generate a shop token scoped to the specific VIN:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/token \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "tokenType=SHOP&licenseeNumber=VIN_1G1YY22G965118127&productNumber=VEHICLESERVICES&successUrl=https://vehicle-cloud.example.com/license-complete&cancelUrl=https://vehicle-cloud.example.com/license-canceled"
```

Response:
```json
{
  "token": {
    "number": "e8a8b2c1-4d5f-11eb-ae93-0242ac120002",
    "tokenType": "SHOP",
    "licenseeNumber": "VIN_1G1YY22G965118127",
    "productNumber": "VEHICLESERVICES",
    "created": "2024-04-19T10:00:00Z",
    "expiresIn": 86400,
    "successUrl": "https://vehicle-cloud.example.com/license-complete",
    "cancelUrl": "https://vehicle-cloud.example.com/license-canceled"
  }
}
```

The app constructs the shop URL:
```
https://go.netlicensing.io/shop/v2/?token=e8a8b2c1-4d5f-11eb-ae93-0242ac120002
```

This URL is either embedded in a web view within the infotainment system or sent to the customer's phone via deep link.

#### Payment Gateway Integration

NetLicensing supports Stripe and PayPal as payment processors. The manufacturer configures these in the Management Console under **Settings > Payment Methods**:

1. Create a Stripe payment method:
   - **Number**: `STRIPE_MAIN`
   - **Provider**: `Stripe`
   - **Stripe API Key**: (configured by admin)
   - **Active**: Checked

2. Customers purchasing from the shop select a payment method. NetLicensing handles PCI compliance and token storage.

#### Post-Purchase License Activation

When a customer completes a purchase in the shop, NetLicensing automatically creates the license and redirects to the `successUrl`. The vehicle polls for the new license immediately:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/VIN_1G1YY22G965118127/validate?productNumber=VEHICLESERVICES" \
  -u "apiKey:<YOUR_API_KEY>"
```

Within seconds, the validation response includes the new license. The infotainment system detects the change and enables the purchased services without requiring a restart.

#### Dealership Portal Integration

A separate dealership web app integrates with NetLicensing to sell subscriptions at point of sale. When a salesperson processes a purchase, the backend creates a license and optionally emails a receipt:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -u "apiKey:<DEALERSHIP_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licenseTemplateNumber=LT_PREMIUM&licenseeNumber=VIN_5TDJKRFH7LS123456&active=true&startDate=2024-04-19T00:00:00Z"
```

The dealership portal displays the vehicle's current entitlements by querying NetLicensing's GET license endpoints.

### Edge Cases & Best Practices

#### Offline Grace Period Handling

Vehicles may lose connectivity for extended periods (tunnels, rural areas, international travel). To prevent service interruption, the infotainment system caches the last successful validation response locally. NetLicensing's grace period (configurable per license template, e.g., 7 days for subscriptions) allows the vehicle to continue using services even if validation is unavailable.

Implementation:
- On successful validation, cache the response with a timestamp
- If validation fails and cached data exists, use cached entitlements
- If cached data expires (older than grace period), disable premium services

```python
def validate_and_cache(vin):
    try:
        response = requests.get(
            f"https://go.netlicensing.io/core/v2/rest/licensee/{vin}/validate",
            auth=(api_key, "")
        )
        cache[vin] = {
            "data": response.json(),
            "timestamp": time.time()
        }
        return response.json()
    except requests.RequestException:
        cached = cache.get(vin)
        if cached and (time.time() - cached["timestamp"]) < (7 * 86400):  # 7 days
            return cached["data"]
        raise
```

#### License Transfer Between Vehicles

When a customer sells their vehicle or trades it in, the OEM can transfer all active licenses to the new vehicle owner's VIN:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee/VIN_OLD/transfer \
  -u "apiKey:<YOUR_API_KEY>" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "targetLicenseeNumber=VIN_NEW"
```

This preserves the customer's subscription and feature licenses while protecting against license sharing across multiple vehicles.

#### Subscription Renewal and Failed Payments

NetLicensing's Subscription model automatically renews at the configured interval. If payment fails (e.g., expired credit card), the license enters grace period state. The vehicle can continue using services for the grace period duration (e.g., 7 days).

After grace period expiry, the license becomes inactive. The infotainment system detects this and displays a payment-required notification to the customer. The OEM's backend monitors subscription status via the API and can send proactive email reminders.

#### Audit Logging

All license changes (create, update, deactivate) are logged in NetLicensing. The OEM periodically exports transaction logs for compliance and financial reconciliation:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/transaction?licenseeNumber=VIN_1G1YY22G965118127" \
  -u "apiKey:<YOUR_API_KEY>"
```

#### Error Handling in Validation Calls

The infotainment system must gracefully handle validation failures (network errors, API timeouts, rate limiting). Recommended retry strategy:

```python
def validate_with_retry(vin, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.get(
                f"https://go.netlicensing.io/core/v2/rest/licensee/{vin}/validate?productNumber=VEHICLESERVICES",
                auth=(api_key, ""),
                timeout=5
            )
            if response.status_code == 200:
                return response.json()
            elif response.status_code == 429:  # Rate limited
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise Exception(f"Validation failed: {response.status_code}")
        except requests.RequestException as e:
            if attempt == max_retries - 1:
                raise
            time.sleep(1)
```

#### Rate Limiting Considerations

NetLicensing enforces API rate limits. For a fleet of millions of vehicles, the OEM should:
- Cache validation responses locally (7–24 hours typically)
- Batch licensee creation calls
- Stagger validation checks across vehicles
- Use connection pooling to reduce overhead

### Results & Outcome

- **Recurring service revenue** reached $12M annually, offsetting cloud infrastructure and 3rd-party content licensing costs within 18 months
- **Customer satisfaction increased** 34% as subscription options replaced abrupt feature shutoffs with clear upgrade paths
- **Dealership revenue contribution** grew to represent 18% of total subscription originations, creating an additional $2M annual incentive stream for sales staff
- **Trial-to-paid conversion rate** reached 28%, significantly higher than the previous model where no conversion was possible
- **License transfer efficiency** enabled vehicle ownership transfers to complete within minutes instead of manual 2–3 day processes
- **Operational transparency** improved with real-time visibility into 2.1M vehicle entitlements, enabling targeted upsell campaigns by subscription tier
- **Customer retention** strengthened among active subscribers (85% 12-month retention vs. 52% for non-subscribers), directly correlating with future vehicle purchase intent
