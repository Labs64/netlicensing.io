---
layout: casestudy
title: "Online Service Subscription"
description: "Learn how NetLicensing helps modernize online service subscription models."
permalink: "/case-studies/online-service/"
img: "/img/case-studies/netlicensing-case-study-online-service-v2.png"
tags:
- Case Studies
- Use Cases
- Online Service
- Subscription
industry:
- Online Service
use-case:
- Subscription
- e-Commerce
favorite-feature:
- Licensing Model "Subscription"
- NetLicensing Shop
---

### Overview

A digital asset marketplace provides licensed stock photography to creative professionals — designers, marketing agencies, and content creators needing images for client projects. The platform previously operated on a transactional pay-per-download model where customers paid individually for each image purchase, requiring them to navigate checkout multiple times per session. This created friction, unpredictable budgeting for customers, and inconsistent revenue for the vendor.

The vendor introduced subscription tiers using NetLicensing to manage recurring billing, monthly download quotas, and customer lifecycle. By combining the original transactional model with subscription options, the platform increased revenue predictability, improved customer retention, and reduced payment friction through recurring billing automation.

### Licensing Challenge

The vendor’s original business model relied on per-image pricing with batch discounts to incentivize volume purchasing. While this approach maximized revenue per transaction, it created several problems:

1. **Unpredictable Revenue**: No recurring income stream; revenue was spiky and difficult to forecast for business planning
2. **High Friction for Repeat Customers**: Creative professionals who needed images regularly faced multiple checkout experiences per week, creating friction and encouraging competitors’ platforms
3. **Poor Customer Retention**: No subscription mechanism to build long-term customer relationships; customers could easily switch to competitors for individual purchases
4. **Payment Processing Overhead**: Per-image transactions meant higher payment processing fees (3-4% per transaction) eroding margins
5. **Discovery and Usage Analysis**: Difficult to track customer usage patterns, favorite categories, or feature adoption metrics

The vendor needed to: introduce predictable subscription revenue while keeping transactional purchases available, reduce checkout friction for power users, implement per-tier download quotas and limits, automatically track usage metrics for business intelligence, and provide customers with self-service subscription management without support overhead.

### Chosen Licensing Model

**Subscription Licensing** with **Multi-Feature options** and **Pay-Per-Use quota tracking** forms the foundation. The subscription model provides:

- **Recurring monthly billing** with automatic renewal
- **Tiered feature sets** (Basic, Professional, Enterprise tiers with different monthly download limits)
- **Grace period handling** for failed payments
- **Pay-per-use extensions** for customers exceeding tier limits

Why this model fits: Subscription aligns revenue with customer lifetime value and provides predictable monthly recurring revenue (MRR). Multi-Feature licenses allow different tier definitions without managing separate products. Quota tracking (downloads per month) enforces tier boundaries and enables upsell opportunities when customers approach limits.

Mechanism: Customers select a subscription tier at signup or upgrade. NetLicensing tracks monthly download quota usage and resets quotas on renewal dates. If a customer exhausts monthly quota, they receive upsell prompts or pay-per-use overages before accessing additional downloads.

### NetLicensing Configuration

#### Step 1: Create Product

1. Log into NetLicensing Management Console
2. Navigate to Products → Create Product
3. Configure:
   - **Number**: `STOCKPHOTO-PLATFORM`
   - **Name**: `Creative Assets Stock Photo Library`
   - **Version**: `1.0`
   - **Active**: Enabled
   - **Description**: Subscription-based stock photo licensing platform with tiered download quotas
   - **Licensee Auto-Create**: Enabled (auto-provision licensees on first validation)

#### Step 2: Create Product Module

1. Navigate to the product → Modules → Create Module
2. Configure:
   - **Number**: `MOD-SUBSCRIPTIONS`
   - **Name**: `Monthly Subscription Licenses`
   - **Licensing Model**: Select `Subscription`
   - **Grace Period**: `14` (days; allows 2-week grace for failed payment retries)

#### Step 3: Create License Templates

Create three subscription tiers:

**Template 1: Basic Tier**
- **Number**: `LT-BASIC-MONTHLY`
- **Name**: `Basic Monthly Subscription`
- **License Type**: `SUBSCRIPTION` (implied by module model)
- **Price**: 9.99 USD
- **Currency**: USD
- **Custom Properties**:
  - `quotaVolume`: `50`
  - `quotaPeriod`: `MONTH`
  - `featureTier`: `basic`
  - `category`: `standard-licenses-only`

**Template 2: Professional Tier**
- **Number**: `LT-PROFESSIONAL-MONTHLY`
- **Name**: `Professional Monthly Subscription`
- **Price**: 29.99 USD
- **Custom Properties**:
  - `quotaVolume`: `250`
  - `quotaPeriod`: `MONTH`
  - `featureTier`: `professional`
  - `category`: `standard-extended-licenses`

**Template 3: Enterprise Tier**
- **Number**: `LT-ENTERPRISE-MONTHLY`
- **Name**: `Enterprise Monthly Subscription`
- **Price**: 99.99 USD
- **Custom Properties**:
  - `quotaVolume`: `Unlimited`
  - `quotaPeriod`: `MONTH`
  - `featureTier`: `enterprise`
  - `category`: `all-licenses`

### Integration Walkthrough

#### Customer Signup and License Assignment

When a customer signs up for a subscription:

```bash
# Step 1: Create Licensee (customer account)
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Authorization: Basic {api_key}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee.number=CUST-DESIGNER-42857&licensee.name=Sarah Creative Studio&product=STOCKPHOTO-PLATFORM&licensee.active=true"
```

Response:
```json
{
  "licensee": {
    "number": "CUST-DESIGNER-42857",
    "name": "Sarah Creative Studio",
    "productNumber": "STOCKPHOTO-PLATFORM",
    "active": true
  }
}
```

#### Step 2: Create Subscription License for Selected Tier

```bash
# Customer selects Professional tier at checkout
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic {api_key}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "license.licensee=CUST-DESIGNER-42857&license.template=LT-PROFESSIONAL-MONTHLY&license.startDate=2024-04-19T00:00:00Z&license.number=SUB-PROF-CUST-42857"
```

Response:
```json
{
  "license": {
    "number": "SUB-PROF-CUST-42857",
    "licensee": "CUST-DESIGNER-42857",
    "template": "LT-PROFESSIONAL-MONTHLY",
    "startDate": "2024-04-19T00:00:00Z",
    "expirationDate": "2024-05-19T00:00:00Z",
    "status": "active",
    "nextCheckDate": "2024-05-19T00:00:00Z",
    "properties": {
      "quotaVolume": "250",
      "featureTier": "professional"
    }
  }
}
```

#### Step 3: Handle Payment Processing

The vendor integrates Stripe for subscription payment:

```python
import stripe
import requests

stripe.api_key = "sk_live_YOUR_STRIPE_KEY"

def create_stripe_subscription(customer_email, plan_id, licensee_number):
    """Create Stripe subscription and link to NetLicensing licensee"""
    
    # Create/retrieve Stripe customer
    stripe_customer = stripe.Customer.create(
        email=customer_email,
        metadata={"netlicensing_licensee": licensee_number}
    )
    
    # Create subscription
    subscription = stripe.Subscription.create(
        customer=stripe_customer.id,
        items=[{"price": plan_id}],
        payment_behavior="default_on_incomplete"
    )
    
    # Store Stripe subscription ID in NetLicensing custom property
    requests.post(
        f"https://go.netlicensing.io/core/v2/rest/licensee/{licensee_number}",
        auth=("api_key", "netlicensing_api_key"),
        data={
            "licensee.custom_stripe_subscription_id": subscription.id
        }
    )
    
    return subscription

# On signup
stripe_sub = create_stripe_subscription(
    "sarah@creativestudio.com",
    "price_professional_monthly",
    "CUST-DESIGNER-42857"
)
```

#### Step 4: Download Quota Tracking

When a customer downloads an image, track quota usage:

```python
def handle_image_download(licensee_number, image_id):
    """Process image download and track quota"""
    
    # Validate current license quota
    response = requests.get(
        f"https://go.netlicensing.io/core/v2/rest/licensee/{licensee_number}/validate",
        auth=("api_key", "netlicensing_api_key")
    )
    
    validation = response.json()
    license_info = validation.get("license", [{}])[0]
    quota_volume = license_info.get("properties", {}).get("quotaVolume")
    
    # For unlimited tier
    if quota_volume == "Unlimited":
        allow_download = True
        remaining = None
    else:
        # Track downloads this month (implementation-specific)
        downloads_this_month = get_monthly_download_count(licensee_number)
        remaining = int(quota_volume) - downloads_this_month
        allow_download = remaining > 0
    
    if allow_download:
        # Process download
        image_data = fetch_image(image_id)
        log_download(licensee_number, image_id)
        
        return {
            "status": "success",
            "downloadedFile": image_id,
            "remainingQuota": remaining
        }
    else:
        # Quota exhausted
        return {
            "status": "quota_exhausted",
            "message": "Monthly download limit reached",
            "upgradeUrl": "/upgrade-subscription",
            "payPerUseUrl": "/pay-per-use?image=" + image_id
        }

# REST endpoint
@app.route("/api/download/<image_id>")
def download_image(image_id):
    licensee = get_current_user_licensee()
    return handle_image_download(licensee, image_id)
```

#### Validation and Feature Access

The web application validates licenses on login to determine available features:

```bash
# On user login or session refresh
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/CUST-DESIGNER-42857/validate" \
  -H "Authorization: Basic {api_key}"
```

Response:
```json
{
  "licensee": {
    "number": "CUST-DESIGNER-42857",
    "active": true,
    "validationTime": "2024-04-19T16:45:30Z"
  },
  "license": [
    {
      "number": "SUB-PROF-CUST-42857",
      "template": "LT-PROFESSIONAL-MONTHLY",
      "status": "active",
      "expirationDate": "2024-05-19T00:00:00Z",
      "properties": {
        "quotaVolume": "250",
        "featureTier": "professional"
      }
    }
  ]
}
```

Web application uses this response:

```python
def render_dashboard(user_licensee):
    validation = validate_licensee(user_licensee)
    license_data = validation["license"][0]
    
    feature_tier = license_data["properties"]["featureTier"]
    quota = license_data["properties"]["quotaVolume"]
    
    # Show tier-specific UI
    if feature_tier == "basic":
        show_limited_categories = True
        show_advanced_filters = False
    elif feature_tier == "professional":
        show_limited_categories = False
        show_advanced_filters = True
    elif feature_tier == "enterprise":
        show_limited_categories = False
        show_advanced_filters = True
        show_api_access = True
    
    return render("dashboard.html", {
        "quota_remaining": quota - get_downloads_this_month(),
        "tier": feature_tier,
        "next_renewal": license_data["expirationDate"]
    })
```

### Licensee Management

Licensees represent customer accounts. In a SaaS platform, each user/organization maps to one Licensee:

**Auto-Provisioning at Signup:**

Since the Product has `licenseeAutoCreate=true`, NetLicensing automatically creates licensees on first validation if they don’t exist. Alternatively, create explicitly:

```python
def create_customer_account(email, organization_name):
    """Create customer account and NetLicensing licensee"""
    
    # Create in platform database
    customer = Customer.create(
        email=email,
        organization=organization_name
    )
    
    # Create NetLicensing licensee
    response = requests.post(
        "https://go.netlicensing.io/core/v2/rest/licensee",
        auth=("api_key", "netlicensing_api_key"),
        data={
            "licensee.number": f"CUST-{customer.id}",
            "licensee.name": organization_name,
            "product": "STOCKPHOTO-PLATFORM"
        }
    )
    
    return response.json()
```

**Tier Upgrades:**

When a customer upgrades from Basic to Professional:

```python
def upgrade_subscription(licensee_number, new_tier):
    """Upgrade customer subscription tier"""
    
    # Get current license
    current = get_licensee_licenses(licensee_number)[0]
    
    # Delete old license
    requests.delete(
        f"https://go.netlicensing.io/core/v2/rest/license/{current[‘number’]}",
        auth=("api_key", "netlicensing_api_key")
    )
    
    # Create new license for upgraded tier
    tier_map = {
        "basic": "LT-BASIC-MONTHLY",
        "professional": "LT-PROFESSIONAL-MONTHLY",
        "enterprise": "LT-ENTERPRISE-MONTHLY"
    }
    
    new_license = requests.post(
        "https://go.netlicensing.io/core/v2/rest/license",
        auth=("api_key", "netlicensing_api_key"),
        data={
            "license.licensee": licensee_number,
            "license.template": tier_map[new_tier],
            "license.startDate": datetime.now().isoformat() + "Z"
        }
    )
    
    return new_license.json()
```

### Shop & Payment Integration

The vendor integrates NetLicensing Shop with Stripe for subscription management:

**Shop Token Generation:**

```bash
# Generate NetLicensing Shop token for customer
curl -X POST "https://go.netlicensing.io/core/v2/rest/token" \
  -H "Authorization: Basic {api_key}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "tokenType=SHOP&licensee=CUST-DESIGNER-42857&license_template=LT-PROFESSIONAL-MONTHLY"
```

Response:
```json
{
  "token": [
    {
      "number": "TOKEN-SHOP-ABC123",
      "tokenType": "SHOP",
      "licensee": "CUST-DESIGNER-42857",
      "active": true
    }
  ]
}
```

**Shop URL Construction:**

```python
def generate_shop_url(licensee_number, template_number):
    """Generate NetLicensing Shop URL for upgrading subscription"""
    
    shop_token = create_shop_token(licensee_number, template_number)
    
    shop_url = (
        f"https://go.netlicensing.io/shop/v2/?token={shop_token[‘number’]}"
        f"&utm_source=platform&utm_campaign=upgrade"
    )
    
    return shop_url

# Use in upgrade prompt
upgrade_link = generate_shop_url("CUST-DESIGNER-42857", "LT-PROFESSIONAL-MONTHLY")
# Returns: https://go.netlicensing.io/shop/v2/?token=TOKEN-SHOP-ABC123&utm_source=platform&utm_campaign=upgrade
```

**Post-Purchase License Activation:**

NetLicensing Shop automatically creates licenses after successful payment. No additional integration required. Stripe handles subscription renewal; NetLicensing automatically extends license expiration on renewal.

For monthly billing, the vendor integrates Stripe Billing API:

```python
# Stripe webhook handler
@app.route("/webhooks/stripe", methods=["POST"])
def handle_stripe_webhook():
    payload = request.get_data()
    event = stripe.Event.construct_from(json.loads(payload), stripe.api_key)
    
    if event[‘type’] == ‘invoice.payment_succeeded’:
        # Update NetLicensing license expiration
        invoice = event[‘data’][‘object’]
        subscription_id = invoice[‘subscription’]
        
        # Lookup licensee from Stripe subscription metadata
        stripe_sub = stripe.Subscription.retrieve(subscription_id)
        licensee = stripe_sub[‘metadata’][‘netlicensing_licensee’]
        
        # Extend license by one month
        extend_license_renewal(licensee)
    
    elif event[‘type’] == ‘customer.subscription.deleted’:
        # Mark license as inactive
        stripe_sub = event[‘data’][‘object’]
        licensee = stripe_sub[‘metadata’][‘netlicensing_licensee’]
        deactivate_licenses(licensee)
    
    return {"status": "received"}
```

### Edge Cases & Best Practices

**Grace Period for Failed Payments**

When Stripe payment fails, NetLicensing’s grace period (14 days) allows continued access while the vendor retries payment:

```python
def validate_subscription_access(licensee_number):
    """Check if customer can access despite payment issues"""
    
    validation = validate_licensee(licensee_number)
    license_data = validation[‘license’][0]
    
    # Check status
    if license_data[‘status’] == ‘active’:
        return True
    elif license_data[‘status’] == ‘grace’:
        # In grace period - show payment failure notice but allow access
        log_warning(f"License {licensee} in grace period")
        return True
    else:
        # Suspended - no access
        return False
```

**Automatic Renewal Reminders**

Send email notifications before renewal:

```python
def send_renewal_reminders():
    """Daily task to send renewal notifications"""
    
    upcoming_renewals = get_licenses_expiring_in_days(7)
    
    for license in upcoming_renewals:
        licensee = license[‘licensee’]
        renewal_date = parse_date(license[‘nextCheckDate’])
        
        email_customer(
            licensee[‘email’],
            f"Your subscription renews on {renewal_date.strftime(‘%B %d’)}",
            template="renewal_reminder"
        )
```

**Quota Reset on Monthly Boundary**

Reset download quotas on license renewal date:

```python
def reset_monthly_quotas():
    """Reset quotas on renewal dates"""
    
    renewing_licenses = get_licenses_renewing_today()
    
    for license in renewing_licenses:
        licensee = license[‘licensee’]
        
        # Reset monthly download counter
        reset_download_count(licensee)
        
        # Send summary email of month’s usage
        usage = get_monthly_usage_summary(licensee)
        email_customer(
            licensee[‘email’],
            f"Your monthly downloads: {usage[‘count’]}/{usage[‘quota’]}",
            template="monthly_usage_summary"
        )
```

**Overage Handling**

Customers who exceed quota can purchase pay-per-use downloads:

```python
def offer_overage_option(licensee_number, image_id):
    """Offer customer to purchase single image when quota exhausted"""
    
    overage_price = 2.99
    
    # Create limited-use license or charge directly
    return {
        "status": "quota_exceeded",
        "payPerUseOption": {
            "price": overage_price,
            "url": f"/pay-per-image?image={image_id}",
            "method": "stripe_charge"
        }
    }
```

**Rate Limiting**

To protect API from abuse during high download volume:

```python
# Redis-based rate limiter
def rate_limit_api_calls(licensee_number, limit_per_minute=60):
    """Rate limit validation API calls per licensee"""
    
    key = f"api_calls:{licensee_number}"
    current = redis.incr(key)
    
    if current == 1:
        redis.expire(key, 60)
    
    if current > limit_per_minute:
        return False, {"error": "Rate limit exceeded", "retry_after": 60}
    
    return True, None
```

### Results & Outcomes

The vendor successfully transitioned from transactional to subscription-based revenue model with tiered offerings:

- **Revenue increased 180%**: Monthly recurring revenue (MRR) from subscriptions exceeded previous pay-per-download revenue within 6 months
- **Customer retention improved 56%**: Subscription-based customers showed 3.2x higher lifetime value compared to transactional customers
- **Payment friction reduced**: Subscription customers eliminated per-download checkout friction, increasing average downloads per customer from 8.3 to 47 per month
- **Predictable revenue forecast**: MRR enabled accurate business forecasting and resource planning
- **Reduced payment fees**: Recurring monthly charges reduced payment processing overhead from 12% (per-transaction fees) to 2.9% (subscription processing)
- **Self-service management**: Customers could upgrade/downgrade tiers through NetLicensing Shop without support tickets, reducing customer support requests by 68%
- **Improved usage insights**: Quota tracking and monthly reset provided actionable data on feature adoption and customer segments, informing product roadmap decisions
