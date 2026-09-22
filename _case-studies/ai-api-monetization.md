---
layout: casestudy
title: "AI/ML Platform: Token-Based Monetization with Inference Metering"
description: "Control API usage with Pay-per-Use or subscription models — charge per inference call, token consumed, or agent outcome"
permalink: "/case-studies/ai-api-monetization/"
img: "/img/case-studies/netlicensing-case-study-ai-api-monetization.png"
tags:
- Case Studies
- Use Cases
- AI/ML Platform
- API Provider
- Token-Based Billing
- Inference Metering
industry:
- AI/ML Platform / API Provider
use-case:
- AI API monetization
- Token-based billing
- Inference metering
- Agent outcome billing
favorite-feature:
- Licensing Model "Pay-Per-Use"
- Licensing Model "Quota"
- Licensing Model "Subscription"
---

### Overview

NeuralScale is an AI/ML inference-as-a-service platform providing REST APIs for large language models, computer vision, and multimodal models. They serve over 8,000 developers ranging from indie startups building AI-powered applications to Fortune 500 enterprises. NeuralScale's business model revolves around metering actual GPU/compute consumption and pricing based on token consumption (for LLM models) or inference volume (for vision models).

Before NetLicensing, NeuralScale used a flat-rate pricing model ($0.001 per API request regardless of model or size), which created severe margin erosion. A simple 50-token completion earned the same revenue as a 4,000-token context window response that required 80x more GPU time. Additionally, NeuralScale had no quota enforcement, leading to customer incidents where misconfigured applications generated runaway costs ($50K+ bills due to infinite retry loops or prompt injection attacks).

NeuralScale adopted NetLicensing to implement sophisticated token-based billing aligned with actual computational costs, granular quota enforcement, real-time usage tracking, and flexible billing models (pay-as-you-go, subscription, postpaid enterprise).

### Licensing Challenge

NeuralScale faced three interconnected monetization problems:

1. **Misaligned Pricing and Computational Cost:** The flat-per-request model didn't account for wildly variable inference costs. A 50-token completion cost 1% of the GPU time of a 4,000-token response, yet both earned identical revenue. Customers using expensive multimodal models (text+image, vision transformers) subsidized customers using cheap small language models. Premium fine-tuned models weren't separately priced, eliminating upsell opportunities.

2. **No Quota Enforcement or Cost Controls:** Customers had no per-minute, per-hour, or monthly consumption limits. When a customer misconfigured their application, incorrect retry logic or prompt injection attacks could trigger thousands of unexpected API calls, resulting in unexpected $50K-$100K charges. NeuralScale absorbed chargeback costs and customer goodwill damage.

3. **Fragmented Billing Models:** Startups wanted prepaid "pay-as-you-go" with low entry friction ($5 to start). SMBs wanted predictable monthly subscriptions with tiered token allowances. Enterprise customers needed postpaid invoicing with volume-based discounts negotiated into contracts. NeuralScale's billing infrastructure couldn't support all three models simultaneously.

4. **Lack of Usage Visibility:** Developers had no real-time insight into token consumption or cost projections. They'd discover they'd exceeded budget only when receiving unexpected invoices, damaging the developer experience.

### Chosen Licensing Model

NeuralScale implemented a **three-model strategy** using NetLicensing:

- **Pay-Per-Use (PPU) Model:** For startups and low-volume developers. Prepaid credits with per-token metering. No upfront commitment, low barrier to entry. Pricing is variable: GPT-4 class models cost $0.001 per output token + $0.0005 per input token; smaller models cost $0.0001 per token. Vision models cost $0.01 per inference.

- **Subscription (Monthly Quota) Model:** For SMBs with predictable usage. Fixed monthly fees ($99, $499, $1,999) include a token quota (1M, 10M, 100M tokens/month respectively). Overage charges apply at per-token rates. Soft limits (80% of quota) trigger warnings; hard limits (100% of quota) trigger throttling.

- **Enterprise Postpaid Model:** For large customers with custom contracts. Monthly token metering with no pre-set quota. Volume discounts applied automatically based on total consumption (e.g., 10% discount above 500M tokens/month). Invoicing is postpaid with NET-30 terms.

**Model mechanics:**
- Each API key is a Licensee (e.g., `APIKEY-user123-sk-abcd`).
- License records define the pricing tier (GPT-4, GPT-3, vision, etc.), billing model (PPU/subscription/postpaid), and quota parameters.
- Before each inference call, the API gateway validates the Licensee against NetLicensing, checking entitlement status and remaining quota.
- After the inference completes, the actual token consumption (input+output tokens) is reported to NetLicensing, which decrements the quota or increments the usage meter.
- Monthly reconciliation calculates overage charges or applies volume discounts.

### NetLicensing Configuration

#### Step 1: Create the Product in Management Console

1. Log in to the **NetLicensing Management Console** at `https://go.netlicensing.io/`.
2. Navigate to **Products** > **New Product**.
3. Enter:
   - **Product Number:** `NEURALSCALE-API`
   - **Product Name:** `NeuralScale AI Inference API`
   - **Version:** `2.0`
   - **Description:** `Token-metered inference API for LLM, vision, and multimodal models`
   - **Licensee Auto-Create:** Enable (developers auto-create accounts via signup)
   - **Licensee Secret Mode:** `PREDEFINED` (NeuralScale assigns API key as licensee secret)
4. Click **Create**.

#### Step 2: Create Product Modules

Create three modules corresponding to billing models:

**Module 1: Pay-Per-Use (Quota Model)**

1. Navigate to **Products** > `NEURALSCALE-API` > **Modules** > **New Module**.
2. Enter:
   - **Module Number:** `PPU-TOKENS`
   - **Module Name:** `Pay-Per-Use Token Metering`
   - **Licensing Model:** `PayPerUse`
   - **Description:** `Per-token billing with prepaid credits`
3. Click **Create**.

**Module 2: Subscription (Quota Model)**

1. Create another module:
   - **Module Number:** `SUBSCRIPTION-QUOTA`
   - **Module Name:** `Subscription Token Quota`
   - **Licensing Model:** `Quota`
   - **Description:** `Monthly token quota with overage billing`
2. Click **Create**.

**Module 3: Enterprise Postpaid (PayPerUse Model)**

1. Create:
   - **Module Number:** `ENTERPRISE-METERING`
   - **Module Name:** `Enterprise Postpaid Metering`
   - **Licensing Model:** `PayPerUse`
   - **Description:** `Postpaid token metering with volume discounts`
2. Click **Create**.

#### Step 3: Create License Templates

**Template 1: Pay-Per-Use - GPT-4 Class Models**

1. Navigate to **Products** > `NEURALSCALE-API` > **Modules** > `PPU-TOKENS` > **License Templates** > **New Template**.
2. Enter:
   - **Template Number:** `PPU-GPT4-TOKENS`
   - **Name:** `Pay-Per-Use - GPT-4 Models`
   - **License Type:** `QUANTITY`
   - **Price:** `0` (metering handled separately)
   - **Custom Properties (add these via API):**
     - `input_token_price`: `0.0005` (dollars per input token)
     - `output_token_price`: `0.001` (dollars per output token)
     - `model_class`: `gpt4`
   - **Description:** `Per-token pricing for GPT-4 class models`
3. Click **Create**.

**Template 2: Pay-Per-Use - Small Base Models**

1. Create:
   - **Template Number:** `PPU-SMALL-TOKENS`
   - **Name:** `Pay-Per-Use - Base Models`
   - **License Type:** `QUANTITY`
   - **Price:** `0`
   - **Custom Properties:**
     - `input_token_price`: `0.00005`
     - `output_token_price`: `0.0001`
     - `model_class`: `base`
   - **Description:** `Per-token pricing for small base language models`
2. Click **Create**.

**Template 3: Pay-Per-Use - Vision Models**

1. Create:
   - **Template Number:** `PPU-VISION-TOKENS`
   - **Name:** `Pay-Per-Use - Vision Models`
   - **License Type:** `QUANTITY`
   - **Price:** `0`
   - **Custom Properties:**
     - `inference_price`: `0.01`
     - `model_class`: `vision`
   - **Description:** `Per-inference pricing for computer vision models`
2. Click **Create**.

**Template 4: Starter Subscription - 1M Monthly Tokens**

1. Navigate to **Products** > `NEURALSCALE-API` > **Modules** > `SUBSCRIPTION-QUOTA` > **License Templates** > **New Template**.
2. Enter:
   - **Template Number:** `SUB-STARTER`
   - **Name:** `Starter Subscription - 1M Tokens/Month`
   - **License Type:** `TIMEVOLUME`
   - **Time Volume:** `1` (month)
   - **Time Volume Period:** `MONTH`
   - **Price:** `99` (USD)
   - **Custom Properties:**
     - `quota_tokens`: `1000000`
     - `soft_limit_percent`: `80`
     - `overage_price_per_token`: `0.0005`
   - **Description:** `Monthly subscription with 1M token quota and overage billing`
3. Click **Create**.

**Template 5: Professional Subscription - 10M Monthly Tokens**

1. Create:
   - **Template Number:** `SUB-PROFESSIONAL`
   - **Name:** `Professional Subscription - 10M Tokens/Month`
   - **License Type:** `TIMEVOLUME`
   - **Time Volume:** `1` (month)
   - **Time Volume Period:** `MONTH`
   - **Price:** `499` (USD)
   - **Custom Properties:**
     - `quota_tokens`: `10000000`
     - `soft_limit_percent`: `80`
     - `overage_price_per_token`: `0.0003`
   - **Description:** `Monthly subscription with 10M token quota`
2. Click **Create**.

**Template 6: Enterprise Subscription - 100M Monthly Tokens**

1. Create:
   - **Template Number:** `SUB-ENTERPRISE`
   - **Name:** `Enterprise Subscription - 100M Tokens/Month`
   - **License Type:** `TIMEVOLUME`
   - **Time Volume:** `1` (month)
   - **Time Volume Period:** `MONTH`
   - **Price:** `1999` (USD)
   - **Custom Properties:**
     - `quota_tokens`: `100000000`
     - `soft_limit_percent`: `80`
     - `overage_price_per_token`: `0.0002`
   - **Description:** `Monthly subscription with 100M token quota`
2. Click **Create**.

**Template 7: Enterprise Postpaid - Monthly Metering**

1. Navigate to **Products** > `NEURALSCALE-API` > **Modules** > `ENTERPRISE-METERING` > **License Templates** > **New Template**.
2. Enter:
   - **Template Number:** `POSTPAID-ENTERPRISE`
   - **Name:** `Enterprise Postpaid - Monthly Metering`
   - **License Type:** `QUANTITY`
   - **Price:** `0` (usage-based metering)
   - **Custom Properties:**
     - `base_price_per_token`: `0.0002`
     - `volume_discount_500m`: `0.10` (10% discount above 500M tokens)
     - `volume_discount_1b`: `0.15` (15% discount above 1B tokens)
     - `billing_cycle`: `monthly`
     - `payment_terms`: `net-30`
   - **Description:** `Postpaid enterprise metering with volume discounts`
3. Click **Create**.

### Integration Walkthrough

#### Application Architecture

The NeuralScale API platform integrates NetLicensing at three critical points:

1. **API Gateway Authentication:** When a request arrives with an API key, the gateway validates the Licensee status and quota before routing to the inference engine.
2. **Inference Engine Post-Call Metering:** After inference completes, actual token consumption is reported to NetLicensing.
3. **Developer Dashboard:** Displays real-time usage, cost projections, and subscription renewal information pulled from NetLicensing.

#### Creating an API Key and Licensee

When a developer signs up, NeuralScale's backend creates a Licensee and issues an API key:

```bash
# Create licensee for new API account
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-netlicensing-api-key" \
  -d "licenseeNumber=APIKEY-user123-sk-9a8b7c6d" \
  -d "active=true" \
  -d "name=John Developer" \
  -d "licenseeSecret=sk-9a8b7c6d"
```

**Response:**
```json
{
  "licensee": {
    "number": "APIKEY-user123-sk-9a8b7c6d",
    "active": true,
    "name": "John Developer",
    "licenseeSecret": "sk-9a8b7c6d",
    "productNumber": "NEURALSCALE-API",
    "creationTime": "2026-04-19T12:00:00Z"
  }
}
```

NeuralScale generates an API key `sk-9a8b7c6d` and returns it to the developer. The key is used in API requests as a Bearer token.

#### Assigning License Based on Signup Tier

During signup, the developer chooses a plan. NeuralScale assigns the corresponding license:

For a developer selecting the "Starter Subscription" plan:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-netlicensing-api-key" \
  -d "licenseTemplateNumber=SUB-STARTER" \
  -d "licenseeNumber=APIKEY-user123-sk-9a8b7c6d" \
  -d "active=true" \
  -d "startDate=2026-04-19T00:00:00Z"
```

**Response:**
```json
{
  "license": {
    "number": "L-APIKEY-user123-SUB-001",
    "active": true,
    "licenseeNumber": "APIKEY-user123-sk-9a8b7c6d",
    "licenseTemplateNumber": "SUB-STARTER",
    "startDate": "2026-04-19T00:00:00Z",
    "creationTime": "2026-04-19T12:01:00Z"
  }
}
```

The developer now has a license with 1M token quota for the month starting 2026-04-19.

#### Pre-Call Validation

When a developer calls an inference endpoint, the API gateway validates before routing to the inference engine:

```bash
# API Gateway validation call
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/APIKEY-user123-sk-9a8b7c6d/validate" \
  -u "apikey:your-netlicensing-api-key"
```

**Response:**
```json
{
  "validationResult": {
    "valid": true,
    "licenseeNumber": "APIKEY-user123-sk-9a8b7c6d",
    "productModuleValidations": [
      {
        "productModule": "SUBSCRIPTION-QUOTA",
        "valid": true,
        "licensing": "Quota",
        "used": 750000,
        "quota": 1000000
      }
    ]
  }
}
```

The gateway extracts `used` and `quota` to check if the request can proceed. If `used >= quota` (hard limit), the gateway returns HTTP 429 (Too Many Requests). If `used >= quota * 0.8` (soft limit), a warning is logged and the developer's dashboard displays a warning.

#### Post-Call Token Metering

After inference completes with actual token counts, NeuralScale reports consumption to NetLicensing:

```python
# Pseudocode: API gateway after inference completes
def handle_inference_request(api_key, model, prompt, params):
    licensee_number = extract_licensee_from_key(api_key)
    
    # Pre-call validation
    validation = validate_licensee(licensee_number)
    if not validation['valid']:
        return {'error': 'Invalid or expired API key', 'status': 401}
    
    # Check quota before routing
    module_validation = get_module_validation(validation, 'SUBSCRIPTION-QUOTA')
    if module_validation and module_validation['used'] >= module_validation['quota']:
        return {'error': 'Quota exceeded', 'status': 429}
    
    # Route to inference engine
    inference_result = call_inference_engine(model, prompt, params)
    
    # Extract token counts
    input_tokens = inference_result['usage']['input_tokens']
    output_tokens = inference_result['usage']['output_tokens']
    total_tokens = input_tokens + output_tokens
    
    # Report usage to NetLicensing
    report_usage_to_netlicensing({
        'licensee_number': licensee_number,
        'tokens_consumed': total_tokens,
        'input_tokens': input_tokens,
        'output_tokens': output_tokens,
        'model': model,
        'timestamp': datetime.utcnow().isoformat()
    })
    
    return inference_result
```

The backend calls the NetLicensing API to record usage. For PayPerUse licenses, this decrements the prepaid credit balance. For Quota licenses, this increments the monthly usage counter.

#### Pay-Per-Use: Decreasing Prepaid Balance

When a PPU customer makes an inference call consuming 500 tokens with GPT-4 pricing:

```python
# Calculate charges
input_tokens = 300
output_tokens = 200
input_price = 0.0005  # per token
output_price = 0.001  # per token
total_charge = (input_tokens * input_price) + (output_tokens * output_price)
# total_charge = (300 * 0.0005) + (200 * 0.001) = 0.15 + 0.20 = $0.35

# Report to NetLicensing (using quantity/usage field)
report_usage(licensee_number, {
    'used_quantity': 500,  # total tokens
    'charge_amount': 0.35,
    'model': 'gpt-4'
})
```

NetLicensing decrements the remaining prepaid balance. When balance approaches $0, the system notifies the developer via email and in-dashboard warning: "Your prepaid credits are nearly depleted. Add funds to continue using the API."

#### Subscription: Monthly Quota Enforcement

For a Subscription customer with 1M monthly token quota, token consumption increments each call:

```python
# After inference with 500 tokens
report_usage(licensee_number, {
    'used_quantity': 500,  # add to monthly count
})
```

NetLicensing tracks cumulative monthly usage. At the start of the next month (calendar or anniversary date depending on configuration), the quota resets.

#### Overage Billing

If a Subscription customer exceeds their monthly quota:

```python
# Customer has used 1.05M tokens out of 1M quota (50K over)
# Overage price: 0.0005 per token (from SUB-STARTER template)
overage_charge = 50000 * 0.0005  # $25

# Overage applied at next invoice cycle
monthly_invoice = {
    'subscription_fee': 99,
    'overage_tokens': 50000,
    'overage_charge': 25,
    'total': 124
}
```

NeuralScale's billing system calculates overages during monthly reconciliation.

#### Developer Dashboard Integration

The developer dashboard pulls real-time metrics from NetLicensing:

```javascript
// Dashboard JavaScript
async function fetchUsageMetrics(licenseeNumber) {
    const validation = await validateLicensee(licenseeNumber);
    const moduleValidation = validation.productModuleValidations.find(
        m => m.productModule === 'SUBSCRIPTION-QUOTA'
    );
    
    const quotaUsed = moduleValidation.used;
    const quotaTotal = moduleValidation.quota;
    const percentUsed = (quotaUsed / quotaTotal) * 100;
    
    return {
        tokensUsed: quotaUsed.toLocaleString(),
        tokensRemaining: (quotaTotal - quotaUsed).toLocaleString(),
        quotaPercent: percentUsed.toFixed(1),
        quotaWarning: percentUsed >= 80,
        projectedOverage: percentUsed > 100 ? 
            ((quotaUsed - quotaTotal) * 0.0005).toFixed(2) : 
            '0'
    };
}
```

The dashboard displays:
- **Tokens Used This Month:** 750,000 / 1,000,000 (75%)
- **Tokens Remaining:** 250,000
- **Projected Cost:** $99 (subscription) + $0.00 (no overage)
- **Renewal Date:** May 19, 2026

### Licensee Management

#### Self-Service Signup Flow

1. Developer visits NeuralScale website and clicks "Sign Up".
2. **Signup form** collects name, email, and selected plan (Pay-Per-Use, Starter, Professional, Enterprise).
3. **Backend logic:**

```python
def create_api_account(email, name, selected_plan):
    # Generate unique API key
    api_key = generate_api_key()  # e.g., sk-9a8b7c6d
    
    # Create licensee
    licensee = create_licensee({
        'licenseeNumber': f'APIKEY-{uuid.uuid4()[:8]}-{api_key}',
        'name': name,
        'active': True,
        'licenseeSecret': api_key
    })
    
    # Assign license based on plan
    if selected_plan == 'pay_as_you_go':
        # Add $5 initial prepaid credit
        license = create_license({
            'licenseTemplateNumber': 'PPU-GPT4-TOKENS',
            'licenseeNumber': licensee['number'],
            'active': True
        })
        add_credit(licensee['number'], 5.00)
    elif selected_plan == 'starter':
        license = create_license({
            'licenseTemplateNumber': 'SUB-STARTER',
            'licenseeNumber': licensee['number'],
            'active': True,
            'startDate': datetime.utcnow().isoformat() + 'Z'
        })
        process_payment(email, 99)  # Charge credit card
    
    return {
        'api_key': api_key,
        'licensee_number': licensee['number'],
        'email_confirmation_sent': True
    }
```

4. Developer receives API key via email and can immediately start making inference calls.

#### Upgrading Plans

When a developer upgrades from Starter to Professional:

```bash
# Deactivate old license
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/L-OLD-LICENSE" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-netlicensing-api-key" \
  -d "active=false"

# Create new license
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-netlicensing-api-key" \
  -d "licenseTemplateNumber=SUB-PROFESSIONAL" \
  -d "licenseeNumber=APIKEY-user123-sk-9a8b7c6d" \
  -d "active=true" \
  -d "startDate=2026-05-19T00:00:00Z"
```

Quota resets to 10M tokens on the new subscription start date. NeuralScale processes a prorated credit (refunding unused portion of Starter plan) and charges the Professional plan.

#### Enterprise Account Setup

For enterprise customers with signed contracts, NeuralScale manually creates Licensees and licenses in the Management Console:

1. Sales completes contract with customer specifying monthly token consumption (estimated 500M), volume discount tier (10%), and custom terms.
2. **NeuralScale admin:**
   - Creates Licensee: `ENTERPRISE-acme-corp`
   - Creates License: `POSTPAID-ENTERPRISE` with custom properties: `base_price_per_token: 0.00017` (post-discount), `monthly_billing: true`
3. **Each month,** NeuralScale queries NetLicensing for cumulative usage and generates an invoice for the postpaid amount.

### Shop & Payment Integration

#### Pay-Per-Use Credit Top-Ups via Shop

When a PPU customer's prepaid balance approaches zero, they receive an in-app notification:

1. **Dashboard displays:** "Your prepaid credits are nearly depleted. Add funds to continue."
2. **Link redirects to NetLicensing Shop** with a token:

```bash
# Generate shop token for developer
curl -X POST "https://go.netlicensing.io/core/v2/rest/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-netlicensing-api-key" \
  -d "tokenType=SHOP" \
  -d "licenseeNumber=APIKEY-user123-sk-9a8b7c6d"
```

**Response:**
```json
{
  "token": {
    "number": "TOKEN-shop-xyz789",
    "value": "https://shop.netlicensing.io/?token=TOKEN-shop-xyz789",
    "creationTime": "2026-04-19T13:00:00Z"
  }
}
```

3. Developer clicks link and is presented with credit bundles in the NetLicensing Shop:
   - $10 bundle (10,000 tokens)
   - $50 bundle (50,000 tokens)
   - $100 bundle (100,000 tokens, 10% discount)
4. Developer selects bundle and checks out using Stripe.
5. **Post-purchase webhook** notifies NeuralScale backend:

```json
{
  "event": "license.purchased",
  "licensee": "APIKEY-user123-sk-9a8b7c6d",
  "transaction_id": "TXN-12345678",
  "amount": 50.00,
  "credit_purchased": 50000
}
```

6. Backend credits the Licensee's prepaid balance by 50,000 tokens at current pricing and notifies the developer via email.

#### Subscription Billing

Subscription licenses are billed monthly via Stripe:

1. During signup, developer enters Stripe payment details.
2. **Monthly billing (automated):**
   - Day before renewal, NeuralScale triggers payment via Stripe API.
   - Upon successful payment, the license is renewed for another month.
   - If payment fails, a retry sequence is initiated (3 attempts over 7 days).
3. **Overage billing:** At the end of the month, NeuralScale's backend queries NetLicensing usage and calculates overage charges. If overage > $0, a separate invoice is issued to Stripe.

### Edge Cases & Best Practices

#### Handling Burst Traffic and Rate Limiting

A developer might burst to 10M tokens in a single day, exhausting a monthly quota. NeuralScale's approach:

1. **Soft limit warnings:** At 80% quota, the dashboard displays "80% of your monthly tokens consumed" but requests still succeed.
2. **Hard limit throttling:** At 100% quota, requests are rate-limited to 1 req/sec (instead of 100 req/sec) to discourage abuse while allowing critical operations to complete.
3. **Quota reset:** At the calendar month boundary (e.g., May 1), quotas automatically reset via NetLicensing.

#### Preventing Runaway Costs from Prompt Injection

If a customer's application is compromised and attackers inject prompts triggering infinite loops:

1. **Real-time monitoring dashboard** shows spike in token consumption (e.g., 1M tokens in 1 hour vs. normal 100K/hour).
2. **Automated alert to customer** via email and SMS (if configured): "Unusual API usage detected. Your account has consumed 1M tokens in the last hour."
3. **Customer can immediately disable API key** via dashboard, which deactivates the Licensee in NetLicensing.
4. **Retroactive fairness:** If prompt injection is detected and confirmed as attack (not misconfiguration), NeuralScale's support team can refund overage charges as a goodwill gesture.

#### Handling Subscription Renewal Failures

If a Stripe payment fails during subscription renewal:

```python
def handle_subscription_renewal_failure(licensee_number, attempt_count):
    if attempt_count == 1:
        # First failure: notify customer, retry in 3 days
        send_email(licensee_number, 'Payment Renewal Failed', 
                   'Your subscription renewal failed. Please update your payment method.')
        schedule_retry(licensee_number, days=3)
    elif attempt_count == 2:
        # Second failure: grace period, warn of suspension
        send_email(licensee_number, 'Final Payment Attempt', 
                   'Your subscription will be suspended in 4 days if payment is not received.')
        extend_license_with_grace_period(licensee_number, days=4)
        schedule_retry(licensee_number, days=3)
    elif attempt_count >= 3:
        # Third failure: suspend license
        deactivate_license(licensee_number)
        send_email(licensee_number, 'Account Suspended', 
                   'Your subscription has been suspended due to non-payment.')
```

#### Audit Logging and Compliance

All token consumption is logged for compliance (PCI-DSS, SOC 2):

```json
{
  "timestamp": "2026-04-19T14:23:45Z",
  "event": "token_consumption_reported",
  "licensee_number": "APIKEY-user123-sk-9a8b7c6d",
  "model": "gpt-4",
  "input_tokens": 300,
  "output_tokens": 200,
  "total_tokens": 500,
  "charge_amount": 0.35,
  "charge_currency": "USD",
  "remaining_balance": 9.65,
  "api_request_id": "req_xyz789"
}
```

Logs are immutable and retained for 7 years.

#### Handling Negative Balance (Credit/Refunds)

If NeuralScale refunds a customer $100 for a billing error:

```bash
# Add credit (negative usage in NetLicensing terms)
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/L-LICENSE-NUM" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-netlicensing-api-key" \
  -d "used_quantity=-100000" \
  -d "custom_refund_reason=Billing_Error_Correction"
```

This increments the Licensee's available balance by the refunded amount, allowing them to continue using the API.

### Results & Outcome

After integrating NetLicensing for token-based billing, NeuralScale achieved:

- **Revenue per customer increased 47%:** Precise token-level pricing aligned with actual computational costs. Premium model pricing ($0.001/output token for GPT-4 vs. $0.0001 for base models) captured margin on higher-value models.

- **Margin protection:** Expensive inference operations (4,000-token contexts, multimodal vision models) now generate appropriate revenue. Cost-of-goods sold for expensive operations is covered by pricing tiers.

- **Customer acquisition improved:** Low-friction pay-as-you-go entry with $5 initial credit lowered conversion barriers for startups and indie developers. Signup-to-first-inference time dropped from 2 hours (manual account creation) to 10 minutes (automated).

- **Runaway cost incidents eliminated:** Proactive quota warnings at 80% and automatic throttling at 100% prevented surprise bills. Zero $50K+ chargeback incidents in 6 months post-launch (previously 2-3 per month).

- **Developer satisfaction improved:** Real-time usage dashboards showing per-model token consumption and cost projections replaced opaque billing. NPS for billing transparency increased from 32 to 72.

- **Enterprise sales cycle shortened:** Flexible postpaid billing with volume discounts addressable through a single contract accelerated deal closures. Sales cycle reduced from 4 months to 6 weeks for $100K+ contracts.

- **Subscription adoption increased:** 65% of new customers selected monthly subscription plans (vs. 15% before NetLicensing), creating predictable recurring revenue. Average customer LTV increased 3x.

- **Operational overhead reduced 40%:** Manual billing reconciliation and chargeback handling eliminated. NetLicensing API automates metering, quota enforcement, and usage reporting.

NeuralScale continues to expand monetization sophistication: upcoming features include per-endpoint pricing (different rates for batch inference vs. streaming), SLA-based pricing tiers (98% uptime base vs. 99.9% premium), and custom volume discount tiers for enterprise contracts.
