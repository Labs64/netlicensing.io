---
layout: casestudy
title: "Telecom Analytics: Multi-Tier Usage Licensing"
description: "A telecom analytics vendor replaced flat annual pricing with subscriber-count metering and feature-tiered licensing."
permalink: "/case-studies/telecom-usage-licensing/"
img: "/img/case-studies/netlicensing-case-study-telecom-usage-licensing.png"
tags:
- Case Studies
- Use Cases
- Telecommunications
- Usage-Based
- Volume Licensing
industry:
- Telecommunications / Network Operations
use-case:
- Subscriber-count metering
- Feature-tiered modules
- Self-serve capacity expansion
favorite-feature:
- Quantity-Based Licensing
- Licensing Model "Multi-Feature"
- NetLicensing Pricing Table
---

### Overview

TeleOps Analytics is a cloud-based network monitoring and operations intelligence platform serving mobile operators, fixed-line carriers, and regional ISPs. The platform ingests real-time data from network probes deployed across subscriber networks, aggregates traffic metrics, and provides predictive analytics dashboards for capacity planning and network optimization. The vendor had grown from a startup to a mid-market player with 150+ customers but faced a critical pricing problem: their flat annual licensing model did not scale fairly with customer size, creating pricing friction for regional operators while allowing national carriers to extract disproportionate value. The vendor evaluated NetLicensing specifically for its ability to meter usage across multiple dimensions (subscriber counts, monitored sites, traffic volume) and enforce feature-tiered entitlements that would align pricing with actual platform value delivered.

### Licensing Challenge

The vendor's original pricing structure charged a fixed annual fee per operator, regardless of scale. A regional fixed-line carrier monitoring 50,000 subscribers paid the same €50,000 annual license fee as a national mobile operator monitoring 20 million subscribers. This created two critical problems: smaller operators viewed the platform as unaffordably expensive relative to the subscriber counts they managed, while national carriers viewed their pricing as a major loss-leader—they were consuming 400x more platform resources but paying identical fees.

Additionally, the vendor's product offered three distinct feature modules—Basic Network Monitoring, Predictive Analytics (traffic forecasting and anomaly detection), and Security Threat Detection—but the licensing model didn't support tiering. All customers received all features, regardless of which modules they actually used or could justify in their budget. There was no programmatic way to enforce feature gates, so customers sometimes disabled modules manually but continued paying full price, further eroding the vendor's unit economics.

When customers wanted to expand (a regional carrier acquiring a competitor and doubling their subscriber count), license renewal required manual intervention from the sales team, slow contract negotiation, and procurement delays. The vendor had no self-service mechanism for customers to expand capacity without hitting a sales bottleneck.

### Chosen Licensing Model

TeleOps implemented a hybrid licensing approach combining **Quantity-Based Licensing** (Pay-Per-Use model in NetLicensing terminology) with **Multi-Feature Licensing** to create a tiered subscription offering. The vendor modeled each operator as a Licensee with a Quantity license tracking monitored subscriber count (the metered dimension) and separate Feature licenses for each optional module (Predictive Analytics, Security Threats).

**Why this model:** The Quantity license directly maps to subscriber count—operators report active subscriber counts via daily API reconciliation, and NetLicensing tracks consumed quantity against the operator's licensed allocation. When an operator's actual subscriber count exceeds their licensed amount, NetLicensing's validation API returns a status indicating overage. The operator can purchase additional subscriber blocks through the NetLicensing Shop without vendor involvement.

The Multi-Feature model ensures each feature module (analytics, security) is individually gated. Operators subscribe to features they need at different price points, eliminating the bundling problem. A small operator can subscribe to Basic Monitoring only at €15,000/year, while a large operator can subscribe to all three modules at proportionally higher cost based on subscriber scale.

### NetLicensing Configuration

#### Step-by-step Management Console Setup

1. **Create the Master Product**
   - Name: "TeleOps Analytics Platform"
   - Product Number: `TELEOPS-PROD-001`
   - Version: `4.0`
   - Licensee Auto-Create: Enable (operators can self-register as Licensees)
   - Description: "Cloud-based network monitoring and operations intelligence"

2. **Create Product Module: Subscriber Metering**
   - Module Number: `TELEOPS-MOD-SUBSCRIBERS`
   - Name: "Subscriber Volume Metering"
   - Licensing Model: **Pay-Per-Use**
   - Description: "Meters network operator's active subscriber count and enforces licensed capacity"

3. **Create Product Module: Feature Tiers**
   - Module Number: `TELEOPS-MOD-FEATURES`
   - Name: "Feature Module Licensing"
   - Licensing Model: **Multi-Feature**
   - Description: "Tiered feature access: Basic, Predictive Analytics, Security Threats"

#### License Templates for Subscriber Module

**Template 1: Base Subscriber Allocation**
- Template Number: `LT-SUBSCRIBERS-BASIC`
- Name: "Subscriber License - Base Block"
- License Type: QUANTITY
- Price: €0.50 per subscriber per year (wholesale; operators purchase in blocks)
- Quantity: 50000 (represents one "block" of 50,000 subscribers)
- Active: Yes
- Description: "Licenses 50,000 monitored subscribers; customers can purchase multiple blocks"

When an operator with 120,000 subscribers signs up, NetLicensing issues them 3 Subscriber licenses (150,000 total capacity, aligned to 120,000 current count with 25% buffer).

**Template 2: Overage Subscriber License**
- Template Number: `LT-SUBSCRIBERS-OVERAGE`
- Name: "Subscriber Overage Block"
- License Type: QUANTITY
- Price: €0.75 per subscriber per year (premium overage pricing)
- Quantity: 10000 (small overage blocks for expansion)
- Active: Yes

#### License Templates for Feature Module

**Template 1: Basic Monitoring Feature**
- Template Number: `LT-FEATURE-BASIC`
- Name: "Basic Network Monitoring"
- License Type: FEATURE
- Price: €15000 / year
- Active: Yes
- Description: "Real-time probe data collection, basic dashboards, historical data for 30 days"

**Template 2: Predictive Analytics Feature**
- Template Number: `LT-FEATURE-ANALYTICS`
- Name: "Predictive Analytics Module"
- License Type: FEATURE
- Price: €35000 / year
- Active: Yes
- Description: "Traffic forecasting, anomaly detection, capacity planning recommendations"

**Template 3: Security Threat Detection Feature**
- Template Number: `LT-FEATURE-SECURITY`
- Name: "Security Threat Detection Module"
- License Type: FEATURE
- Price: €40000 / year
- Active: Yes
- Description: "DDoS pattern recognition, network intrusion detection, automated threat reporting"

#### Custom Properties

The vendor added a custom property to each Licensee:

- `operatorType`: "REGIONAL", "NATIONAL", "ISP" — used for analytics and support tier routing
- `subscriberCountReportingFrequency`: "daily", "weekly" — controls how often the operator reports actual subscriber metrics
- `billingCycle`: "annual", "monthly" — aligns with operator's internal fiscal calendar

### Integration Walkthrough

#### Architecture Overview

The probe software running on customer networks makes hourly health checks and performs daily subscriber count reconciliation. The operations dashboard integrates NetLicensing validation at login and at module access points. The backend licensing microservice runs every 24 hours to reconcile reported subscriber counts against licensed quantities.

#### Licensee Creation: Operator On-boarding

When a new operator signs up via TeleOps's self-serve portal, the system creates a corresponding Licensee in NetLicensing:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee \
  -H "Accept: application/json" \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "product=TELEOPS-PROD-001" \
  -d "licenseeSecret=GENERATED_SECRET" \
  -d "name=Telia Sweden (regional operator)" \
  -d "licensee.operatorType=REGIONAL" \
  -d "licensee.subscriberCountReportingFrequency=daily" \
  -d "licensee.billingCycle=annual"
```

**Response:**
```json
{
  "licensee": {
    "number": "I-TELIA-SWE-001",
    "name": "Telia Sweden (regional operator)",
    "active": true,
    "creationTime": "2026-04-19T08:32:00.000Z"
  }
}
```

The returned Licensee Number (`I-TELIA-SWE-001`) is stored in TeleOps's operator database as `netlicensing_licensee_id` for all future API calls.

#### License Issuance: Subscriber Allocation

During on-boarding, TeleOps captures the operator's current subscriber count via survey (estimated active subscribers) or via initial probe sync. If Telia reports 850,000 subscribers, the system provisions 17 Subscriber licenses (17 × 50,000 = 850,000):

```bash
# Issue 17 subscriber license blocks
for i in {1..17}; do
  curl -X POST https://go.netlicensing.io/core/v2/rest/license \
    -H "Authorization: Basic YOUR_API_TOKEN" \
    -d "licenseTemplate=LT-SUBSCRIBERS-BASIC" \
    -d "licensee=I-TELIA-SWE-001" \
    -d "name=Subscriber Block $i" \
    -d "active=true"
done
```

Additionally, the operator purchases feature modules. For Telia's initial tier:

```bash
# Issue Basic Monitoring license
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "licenseTemplate=LT-FEATURE-BASIC" \
  -d "licensee=I-TELIA-SWE-001" \
  -d "name=Basic Monitoring - Telia" \
  -d "active=true"

# Issue Predictive Analytics license
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "licenseTemplate=LT-FEATURE-ANALYTICS" \
  -d "licensee=I-TELIA-SWE-001" \
  -d "name=Predictive Analytics - Telia" \
  -d "active=true"
```

#### Daily Subscriber Reconciliation

Each operator's probes report aggregate subscriber metrics once daily. TeleOps's backend processes this:

```python
# Pseudocode: Daily reconciliation job
def reconcile_subscriber_count(operator_id, reported_subscriber_count):
    licensee_number = get_licensee_number(operator_id)
    
    # Query current licensed quantity
    validation_response = validate_licensee(
        licensee_number=licensee_number,
        productModule="TELEOPS-MOD-SUBSCRIBERS"
    )
    
    # Check if reported count exceeds license
    if reported_subscriber_count > validation_response['quantity_licensed']:
        overage_amount = reported_subscriber_count - validation_response['quantity_licensed']
        send_overage_alert(operator_id, overage_amount)
        # Optionally auto-provision overage licenses for enterprise operators
        if operator.tier == "ENTERPRISE":
            auto_issue_overage_licenses(licensee_number, overage_amount)
```

#### License Validation at Module Access

When an operator logs into the TeleOps Analytics dashboard, the application validates both subscriber entitlement and feature licenses:

```bash
# Validation request at dashboard login
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/I-TELIA-SWE-001/validate?productModule=TELEOPS-MOD-SUBSCRIBERS&productModule=TELEOPS-MOD-FEATURES" \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -H "Accept: application/json"
```

**Response:**
```json
{
  "productModuleValidation": [
    {
      "productModule": "TELEOPS-MOD-SUBSCRIBERS",
      "valid": true,
      "licensingModel": "PayPerUse",
      "quantity": 850000,
      "quantityUsed": 820000,
      "quantityRemaining": 30000,
      "expiresAt": "2027-04-19T23:59:59.000Z"
    },
    {
      "productModule": "TELEOPS-MOD-FEATURES",
      "valid": true,
      "licenses": [
        {
          "number": "L-TELEOPS-BASIC-12345",
          "name": "Basic Monitoring",
          "valid": true,
          "expiresAt": "2027-04-19T23:59:59.000Z"
        },
        {
          "number": "L-TELEOPS-ANALYTICS-12346",
          "name": "Predictive Analytics",
          "valid": true,
          "expiresAt": "2027-04-19T23:59:59.000Z"
        }
      ]
    }
  ]
}
```

The application unpacks this response:
- If `valid: true` and `quantityRemaining > 0` for Subscribers module, subscriber access is granted
- If any Feature license has `valid: false`, that feature's UI is hidden or disabled
- If `quantityRemaining < 5000` (low buffer), the dashboard displays an upgrade prompt

#### Feature Gating

The dashboard backend checks feature availability before rendering:

```python
def render_dashboard_modules(licensee_number):
    validation = validate_licensee(licensee_number)
    
    feature_licenses = validation['productModuleValidation'][1]['licenses']
    feature_map = {license['name']: license['valid'] for license in feature_licenses}
    
    modules = {
        'basic_monitoring': feature_map.get('Basic Monitoring', False),
        'predictive_analytics': feature_map.get('Predictive Analytics', False),
        'security_threats': feature_map.get('Security Threat Detection', False)
    }
    
    return render_html_dashboard(modules)
```

### Licensee Management

#### Operator Registration and Auto-Provisioning

TeleOps enabled Licensee Auto-Create in NetLicensing, allowing new operators to self-register through the portal without manual vendor intervention. When an operator completes the signup form (name, country, estimated subscriber count), TeleOps's backend calls the Licensee creation endpoint:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "product=TELEOPS-PROD-001" \
  -d "name=Vodafone Germany" \
  -d "licensee.operatorType=NATIONAL" \
  -d "licensee.subscriberCountReportingFrequency=daily" \
  -d "licensee.billingCycle=annual"
```

#### Mapping Licensees to Internal Records

The TeleOps internal database maintains a mapping table:

```
operator_id | operator_name | netlicensing_licensee_id | subscriber_count | created_at
1001        | Telia Sweden  | I-TELIA-SWE-001         | 850000           | 2026-01-15
1002        | Vodafone DE   | I-VODAFONE-DE-002       | 12500000         | 2026-02-01
```

All API calls to NetLicensing use `netlicensing_licensee_id` as the universal customer identifier.

#### License Transfers (M&A Scenarios)

When a regional operator acquires another operator's network, TeleOps consolidates their licenses. If Telia acquires a smaller operator (licensee `I-SMALL-OP-003`), the system transfers all outstanding licenses to the consolidated Licensee:

```bash
# Transfer all licenses from acquired operator to acquiring operator
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee/I-TELIA-SWE-001/transfer \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "from=I-SMALL-OP-003" \
  -d "to=I-TELIA-SWE-001"
```

After transfer, the acquired operator's Licensee is marked as inactive, but all licenses and usage history are preserved under Telia's consolidated account.

#### Capacity Expansion Workflow

When an operator acquires new spectrum or rolls out service to new regions (subscriber count increases), they purchase additional subscriber blocks through the NetLicensing Shop. The vendor configured a Shop token with operator-specific context:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/token \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "tokenType=SHOP" \
  -d "licensee=I-TELIA-SWE-001" \
  -d "licenseTemplate=LT-SUBSCRIBERS-BASIC" \
  -d "successUrl=https://teleops.example.com/dashboard?message=License+upgrade+successful" \
  -d "cancelUrl=https://teleops.example.com/dashboard?message=Upgrade+cancelled"
```

The Shop token is embedded in a "Upgrade Capacity" button in the TeleOps dashboard. When clicked, the operator is taken to the NetLicensing Shop, where they can purchase additional subscriber blocks with Stripe or PayPal, then are returned to TeleOps's dashboard with the new license automatically activated.

### Shop & Payment Integration

#### Shop Token Generation

Telia's account manager wants to offer an operator a trial of the Predictive Analytics feature for 30 days. TeleOps generates a one-time Shop token:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/token \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "tokenType=SHOP" \
  -d "licensee=I-TELIA-SWE-001" \
  -d "licenseTemplate=LT-FEATURE-ANALYTICS" \
  -d "licenseTemplate=LT-SUBSCRIBERS-BASIC" \
  -d "successUrl=https://teleops.example.com/licenses?upgrade=success" \
  -d "cancelUrl=https://teleops.example.com/licenses?upgrade=cancelled"
```

**Response:**
```json
{
  "token": {
    "number": "SHOP-TOKEN-9f8e7d6c5b4a3201",
    "tokenType": "SHOP",
    "active": true,
    "creationTime": "2026-04-19T10:45:00.000Z",
    "expiryTime": "2026-04-26T10:45:00.000Z",
    "shopUrl": "https://go.netlicensing.io/shop/v2/?shoptoken=SHOP-TOKEN-9f8e7d6c5b4a3201"
  }
}
```

#### Shop Experience

Telia clicks the Shop link and is presented with a NetLicensing-hosted purchase page. The page is branded (if a white-label agreement is in place) and shows available license templates and pricing. Telia selects 2 additional Subscriber Blocks (100,000 more subscribers) at €0.50/subscriber/year = €50,000 for the annual term, plus the Predictive Analytics module at €35,000/year. 

At checkout, Telia is prompted to enter payment information (Stripe or PayPal, as configured). Upon successful payment:

1. NetLicensing creates two new Subscriber licenses and one Analytics license for licensee `I-TELIA-SWE-001`
2. NetLicensing sends a webhook event to TeleOps's `/webhooks/license-provisioned` endpoint
3. TeleOps's backend receives the event, updates internal records, and triggers a confirmation email
4. The browser redirects to `https://teleops.example.com/licenses?upgrade=success`

#### Payment Gateway Configuration

TeleOps configured NetLicensing's Payment Methods with Stripe as the primary gateway:

- **Payment Method Number:** `PM-STRIPE-PRIMARY`
- **Provider:** Stripe
- **Currency:** EUR
- **Webhook Endpoint:** `https://teleops.example.com/webhooks/stripe`

Operators in countries without Stripe coverage (e.g., some Eastern European carriers) can pay via PayPal, which NetLicensing also supports.

### Edge Cases & Best Practices

#### Grace Period and Offline Validation

Operators' probes run in remote networks without guaranteed internet connectivity. If a probe fails to reach NetLicensing for 7 days, the probe's embedded validation cache (populated on successful validation) allows the operator to continue limited operations without blocking critical monitoring.

Best practice: The probe caches the most recent successful validation response locally. If network connectivity is restored and a newer validation shows the license has expired, the probe immediately halts data collection and alerts the operator's NOC.

```python
def validate_with_grace_period(cached_validation, days_since_last_validation):
    if cached_validation['valid'] and days_since_last_validation < 7:
        return True  # Use cached validation
    else:
        try:
            fresh_validation = validate_licensee(licensee_id)
            return fresh_validation['valid']
        except ConnectionError:
            if days_since_last_validation < 7:
                return True  # Grace period allows offline operation
            else:
                return False  # Grace period expired; fail safely
```

#### Handling Subscriber Count Overages

When an operator's reported subscriber count exceeds their licensed quantity, the system does not immediately block operations (this would cause outages). Instead:

1. The reconciliation job calculates overage amount
2. An automated email is sent to the operator's technical and procurement contacts
3. A dashboard alert is displayed for 14 days: "Your network is operating 25,000 subscribers above license"
4. After 14 days, if overage persists without purchase or dispute, the system reduces dashboard query performance or restricts reports to basic metrics only

For enterprise operators with high spend, the vendor's sales team can provision temporary overage licenses (at overage pricing) while the procurement team completes a formal contract amendment.

#### License Revocation and Audit Logging

If an operator fails to renew their subscription, NetLicensing automatically marks their licenses as `active=false` on the renewal date. TeleOps's validation API begins returning `valid: false` for the expired Licensee. The probe software ceases data collection, and the dashboard shows a "License Expired" message.

For audit and compliance purposes, TeleOps logs every license state change in a dedicated audit table:

```
timestamp               | operator_id | event_type       | licensee_id    | details
2026-04-19 14:23:00    | 1001        | LICENSE_EXPIRED  | I-TELIA-SWE-001| Subscription LT-FEATURE-ANALYTICS expired
2026-04-19 14:23:00    | 1001        | GRACE_PERIOD     | I-TELIA-SWE-001| 30-day grace period active until 2026-05-19
```

#### Retry Logic and Rate Limiting

The daily reconciliation job uses exponential backoff when calling NetLicensing APIs. If a request fails (network timeout, 503 Service Unavailable), the job retries after 60 seconds, then 120 seconds, then 300 seconds, up to 5 attempts per Licensee. If all attempts fail, an alert is sent to the TeleOps ops team to investigate.

NetLicensing's API enforces rate limiting at 100 requests per minute per API token. TeleOps batches Licensee validations where possible and caches validation responses for up to 1 hour to stay within limits.

### Results & Outcome

**Pricing Alignment:** Within 6 months of NetLicensing deployment, TeleOps increased average revenue per operator from €47,000 to €68,000 annually by aligning pricing to subscriber scale. National carriers paying based on 10+ million subscribers, regional operators paying based on 50,000–500,000, and ISPs paying proportionally created a fair tiering that reduced customer friction.

**Feature Module Adoption:** Separating feature tiers (Basic at €15K, Analytics at €35K, Security at €40K) increased attach-rate. Previously, 100% of customers received all features. Post-implementation, 45% of operators purchase only Basic Monitoring, 40% add Predictive Analytics, and 25% add Security Threat Detection. This segmentation allows operators to control costs while providing upsell paths.

**Self-Service Expansion:** Eliminating the sales bottleneck for capacity upgrades shortened deal cycles. Operators can now purchase additional subscriber blocks independently through the NetLicensing Shop in minutes, vs. 5–10 days for manual sales intervention. This reduced friction increased expansion revenue by 30% as operators no longer delayed growth due to license procurement delays.

**Operational Efficiency:** Automating license provisioning, validation, and reconciliation via NetLicensing API reduced manual licensing operations by 60%. TeleOps's operations team redirected effort from license administration to higher-value support and compliance activities.

**Transparent Usage:** The daily reconciliation process provides operators with complete visibility into their licensed vs. actual subscriber counts via a self-serve dashboard. This transparency eliminated billing disputes and enabled operators to forecast license costs accurately for their annual budgets.

**Enterprise Adoption:** Large carriers that previously viewed TeleOps as expensive now appreciate the variable cost model. Annual contract value for the top 10 customers increased by an average of 35%, as these operators confidently scaled probe deployments across new networks knowing pricing would scale proportionally.
