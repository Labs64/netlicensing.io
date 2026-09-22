---
layout: casestudy
title: "MedTech Imaging: Pay-Per-Study Analytics"
description: "A medical imaging analytics company launched per-study pricing for AI modules, enabling lower-friction hospital adoption."
permalink: "/case-studies/medtech-pay-per-study/"
img: "/img/case-studies/netlicensing-case-study-medtech-pay-per-study.png"
tags:
- Case Studies
- Use Cases
- Medical Technology
- Pay-Per-Use
- Audit Trail
industry:
- Medical Technology / Digital Health
use-case:
- Per-study consumption billing
- Regulatory audit trail
- Site license management
favorite-feature:
- Licensing Model "Pay-per-Use"
- Audit Trail
- Customer Portal
---

### Overview

A medical imaging analytics company develops advanced AI-powered analysis modules for radiology: automated lesion detection, quantification, workflow prioritization, and comparative longitudinal analysis. The initial go-to-market strategy offered per-site annual licenses, but this model created significant barriers to adoption. Hospital procurement cycles are slow, involving months of approval; budget holders resist large upfront commitments for novel AI technologies with unproven ROI; and smaller hospitals and outpatient imaging centers lack capital budgets for full-site deployments. The vendor needed to introduce a consumption-based, per-study pricing model that allowed hospitals to pay only for actual usage while maintaining profitability, regulatory compliance, and visibility into customer consumption patterns. NetLicensing's Pay-per-Use licensing model and audit trail capabilities enabled this transition.

### Licensing Challenge

The original per-site annual licensing model had three concrete failure modes:

- **High Customer Acquisition Cost**: Hospitals required lengthy procurement negotiations, pilot periods, and executive approvals before committing to annual contracts. Average sales cycle was 6-9 months.
- **Adoption Bottleneck for Smaller Facilities**: Outpatient imaging centers with 1-2 MRI units and 3-5 radiologists couldn't justify $150K annual investment. They were effectively excluded from the market.
- **No Usage Visibility**: Once a site license was sold, the vendor had no data on actual usage, adoption rates, or ROI per modality. This prevented targeted upsell and made churn prediction difficult.
- **Regulatory Compliance Gap**: Without granular audit trails of each analysis performed, the company couldn't satisfy FDA SaMD (Software as Medical Device) audit requirements or defend usage claims in compliance reviews.

### Chosen Licensing Model

This use case uses **Pay-per-Use licensing** with **Quantity-based credit tracking**.

In the Pay-per-Use model, customers purchase a pool of "credits" representing the right to use a feature a certain number of times. Each time the feature is used, the NetLicensing API decrements the credit balance. When credits run out, further usage is blocked unless the customer purchases additional credits.

For medical imaging, "one unit of use" is defined as one study (one imaging exam analyzed by the AI module). Hospitals purchase study credits per modality (e.g., 100 CT studies, 50 MRI studies, 25 PET studies). This maps naturally to radiology workflows: administrators track studies performed per modality and purchase refills as needed.

### NetLicensing Configuration

#### Step 1: Create the Product

In the NetLicensing Management Console:

1. Navigate to **Products** and click **Create Product**.
2. Enter **Product Number**: `MEDTECH-AI-SUITE`
3. Enter **Product Name**: `RadiologyAI Analytics Suite`
4. Enter **Version**: `3.2`
5. Enable **Licensee Auto Create**: YES (so hospital IT systems can auto-provision on first validation)
6. Set **Licensee Secret Mode**: `PREDEFINED`
7. Click **Create**.

#### Step 2: Create Product Modules

Create one module per imaging modality:

**Module 1: CT Lesion Detection**

1. From the product, click **Create Module**.
2. Enter **Module Number**: `MOD-CT-DETECT`
3. Enter **Module Name**: `CT Lesion Detection Analytics`
4. Select **Licensing Model**: `PayPerUse`
5. Click **Create**.

**Module 2: MRI Analysis**

1. Click **Create Module** again.
2. Enter **Module Number**: `MOD-MRI-ANALYSIS`
3. Enter **Module Name**: `MRI Quantification Analytics`
4. Select **Licensing Model**: `PayPerUse`
5. Click **Create**.

**Module 3: PET Workflow**

1. Click **Create Module** again.
2. Enter **Module Number**: `MOD-PET-WORKFLOW`
3. Enter **Module Name**: `PET Workflow Prioritization`
4. Select **Licensing Model**: `PayPerUse`
5. Click **Create**.

#### Step 3: Create License Templates

For **MOD-CT-DETECT**:

1. Click **Create License Template**.
2. **Template: CT Study Credit Pack (100 studies)**
   - **Number**: `LT-CT-100-STUDIES`
   - **Name**: `CT Lesion Detection - 100 Studies`
   - **License Type**: `QUANTITY`
   - **Quantity**: `100` (number of studies)
   - **Price**: `USD 1,500` (per 100 studies = $15 per study)
   - **Automatic**: NO
   - Click **Create**.

3. **Template: CT Study Credit Pack (500 studies)**
   - **Number**: `LT-CT-500-STUDIES`
   - **Name**: `CT Lesion Detection - 500 Studies`
   - **License Type**: `QUANTITY`
   - **Quantity**: `500`
   - **Price**: `USD 6,500` (per 500 studies = $13 per study - volume discount)
   - **Automatic**: NO
   - Click **Create**.

For **MOD-MRI-ANALYSIS**:

1. Click **Create License Template**.
2. **Template: MRI Study Credit Pack (75 studies)**
   - **Number**: `LT-MRI-75-STUDIES`
   - **Name**: `MRI Quantification - 75 Studies`
   - **License Type**: `QUANTITY`
   - **Quantity**: `75`
   - **Price**: `USD 1,350` (per 75 studies = $18 per study)
   - **Automatic**: NO
   - Click **Create**.

For **MOD-PET-WORKFLOW**:

1. Click **Create License Template**.
2. **Template: PET Study Credit Pack (50 studies)**
   - **Number**: `LT-PET-50-STUDIES`
   - **Name**: `PET Workflow Prioritization - 50 Studies`
   - **License Type**: `QUANTITY`
   - **Quantity**: `50`
   - **Price**: `USD 1,200` (per 50 studies = $24 per study)
   - **Automatic**: NO
   - Click **Create**.

### Integration Walkthrough

#### Integration Point: PACS Analysis Request

When a radiologist submits a study for AI analysis in the hospital's PACS (Picture Archiving and Communication System), the analysis engine validates the hospital's entitlement:

**Step 1: Validation Request**

```bash
POST https://go.netlicensing.io/core/v2/rest/licensee/{hospitalLicenseeNumber}/validate
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

productNumber=MEDTECH-AI-SUITE&productModuleNumber=MOD-CT-DETECT
```

**Example Response (Valid, with remaining credits):**

```json
{
  "licensingModel": "PayPerUse",
  "ttl": 3600,
  "validations": {
    "MOD-CT-DETECT": {
      "valid": true,
      "checkDate": "2026-04-19T14:22:00Z",
      "licenseType": "QUANTITY",
      "licenses": [
        {
          "number": "L-CT-STUDIES-HOSP-001",
          "type": "QUANTITY",
          "name": "CT Lesion Detection - 100 Studies",
          "active": true,
          "quantity": "100",
          "usedQuantity": "42"
        }
      ]
    }
  }
}
```

**Step 2: Usage Decrement**

After successful analysis, decrement the used quantity:

```bash
PUT https://go.netlicensing.io/core/v2/rest/license/L-CT-STUDIES-HOSP-001
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

usedQuantity=43
```

**PACS Integration Logic (Python example):**

```python
import requests
import json
from datetime import datetime

class RadiologyAILicenseValidator:
    def __init__(self, hospital_licensee_number, api_key):
        self.licensee_number = hospital_licensee_number
        self.api_key = api_key
        self.api_base = "https://go.netlicensing.io/core/v2/rest"
        self.validation_cache = {}
    
    def validate_study_credit(self, modality):
        """
        Validate that hospital has study credits for this modality.
        Returns (can_proceed, remaining_credits, license_number)
        """
        modality_map = {
            'CT': 'MOD-CT-DETECT',
            'MRI': 'MOD-MRI-ANALYSIS',
            'PET': 'MOD-PET-WORKFLOW'
        }
        
        module_number = modality_map.get(modality)
        if not module_number:
            return False, 0, None
        
        # Check cache first (valid 1 hour)
        cache_key = f"{self.licensee_number}_{module_number}"
        if cache_key in self.validation_cache:
            cached_time = self.validation_cache[cache_key]['timestamp']
            if (datetime.now() - cached_time).seconds < 3600:
                result = self.validation_cache[cache_key]
                return result['valid'], result['remaining'], result['license_number']
        
        # Validate with NetLicensing
        url = f"{self.api_base}/licensee/{self.licensee_number}/validate"
        params = {
            'productNumber': 'MEDTECH-AI-SUITE',
            'productModuleNumber': module_number
        }
        
        response = requests.get(url, params=params, auth=(self.api_key, ''))
        
        if response.status_code != 200:
            print(f"Validation API error: {response.status_code}")
            return False, 0, None
        
        data = response.json()
        validation = data['validations'].get(module_number, {})
        
        if not validation.get('valid'):
            return False, 0, None
        
        licenses = validation.get('licenses', [])
        if not licenses:
            return False, 0, None
        
        license_obj = licenses[0]
        quantity = int(license_obj.get('quantity', 0))
        used = int(license_obj.get('usedQuantity', 0))
        remaining = quantity - used
        license_number = license_obj.get('number')
        
        # Cache the result
        self.validation_cache[cache_key] = {
            'timestamp': datetime.now(),
            'valid': remaining > 0,
            'remaining': remaining,
            'license_number': license_number
        }
        
        return remaining > 0, remaining, license_number
    
    def decrement_study_credit(self, license_number, current_used_quantity):
        """
        Decrement study credit after analysis completes.
        """
        url = f"{self.api_base}/license/{license_number}"
        data = {
            'usedQuantity': str(current_used_quantity + 1)
        }
        
        response = requests.put(url, data=data, auth=(self.api_key, ''))
        
        if response.status_code == 200:
            print(f"License {license_number} updated successfully")
            # Invalidate cache
            cache_keys = [k for k in self.validation_cache.keys() if license_number in k]
            for k in cache_keys:
                del self.validation_cache[k]
            return True
        else:
            print(f"Failed to update license: {response.status_code}")
            return False

# PACS Integration Hook
validator = RadiologyAILicenseValidator(
    hospital_licensee_number='HOSP-STANFORD-MC',
    api_key='your_api_key_here'
)

def process_imaging_study(study_id, modality, dicom_images):
    """
    Called when radiologist submits study for AI analysis.
    """
    # Validate study credit availability
    can_proceed, remaining, license_number = validator.validate_study_credit(modality)
    
    if not can_proceed:
        return {
            'status': 'INSUFFICIENT_CREDITS',
            'message': f'No {modality} study credits available. Please purchase additional credits.',
            'remaining_studies': remaining
        }
    
    # Proceed with AI analysis
    analysis_result = run_ai_analysis(dicom_images, modality)
    
    # Get current used quantity before updating
    # (In production, you'd track this more robustly)
    validation_data = validator.validate_study_credit(modality)
    
    # Decrement license
    if not validator.decrement_study_credit(license_number, analysis_result['used_quantity']):
        # Log for manual reconciliation
        log_license_update_failure(study_id, license_number)
    
    return {
        'status': 'SUCCESS',
        'analysis_id': analysis_result['id'],
        'remaining_studies': remaining - 1,
        'timestamp': datetime.now().isoformat()
    }
```

#### Batch Usage Reporting

For high-volume environments, batch reporting is more efficient than per-study decrements:

```bash
# Daily usage summary submitted to NetLicensing
PUT https://go.netlicensing.io/core/v2/rest/license/L-CT-STUDIES-HOSP-001
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

usedQuantity=87
```

### Licensee Management

#### Creating a Hospital Licensee

```bash
POST https://go.netlicensing.io/core/v2/rest/licensee
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

productNumber=MEDTECH-AI-SUITE&number=HOSP-STANFORD-MC&name=Stanford+Medical+Center&active=true&licenseeSecret=hosp-secret-xyz
```

#### Auto-Provisioning on First Use

If **Licensee Auto Create** is enabled at the product level, a PACS system can call validate with an unknown licensee number, and NetLicensing automatically creates the licensee:

```bash
POST https://go.netlicensing.io/core/v2/rest/licensee/{newHospitalLicenseeNumber}/validate
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

productNumber=MEDTECH-AI-SUITE&productModuleNumber=MOD-CT-DETECT
```

If the licensee doesn't exist, NetLicensing creates it automatically (assuming auto-create is enabled).

### Shop & Payment Integration

The hospital procurement team accesses the NetLicensing Shop to purchase study credit refills:

**Step 1: Generate Shop Token**

```bash
POST https://go.netlicensing.io/core/v2/rest/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

action=SHOP&licenseeNumber=HOSP-STANFORD-MC&productNumber=MEDTECH-AI-SUITE&successUrl=https://hospital-admin.example.com/licenses/success&cancelUrl=https://hospital-admin.example.com/licenses/cancel
```

**Response:**

```json
{
  "shopToken": {
    "number": "SHOP-TOKEN-hosp-xyz789",
    "successUrl": "https://hospital-admin.example.com/licenses/success",
    "cancelUrl": "https://hospital-admin.example.com/licenses/cancel"
  }
}
```

**Step 2: Hospital Visits Shop**

```
https://go.netlicensing.io/shop/SHOP-TOKEN-hosp-xyz789
```

The shop displays available study credit packs (100 CT studies, 500 CT studies, 75 MRI studies, etc.) with pricing. Hospital procurement selects desired packs and completes payment via Stripe or PayPal.

**Step 3: Post-Purchase License Activation**

After payment, NetLicensing automatically creates new license records for the purchased study credits:

```json
{
  "event": "shop_token_completed",
  "licenseeNumber": "HOSP-STANFORD-MC",
  "timestamp": "2026-04-20T09:15:00Z",
  "purchased_licenses": [
    {
      "number": "L-CT-STUDIES-HOSP-002",
      "templateNumber": "LT-CT-500-STUDIES",
      "quantity": "500",
      "transactionNumber": "TXN-shop-xyz789-001"
    }
  ]
}
```

### Edge Cases & Best Practices

**Low Credit Warning & Auto-Replenishment:**

```python
def check_and_warn_low_credits(licensee_number, modality, threshold=10):
    """
    Alert hospital admins when credits fall below threshold.
    """
    can_proceed, remaining, license_number = validator.validate_study_credit(modality)
    
    if 0 < remaining <= threshold:
        send_email_to_admins(
            hospital=licensee_number,
            subject=f"Warning: Low {modality} study credits",
            message=f"You have only {remaining} {modality} studies remaining. " +
                   f"Visit the NetLicensing Shop to purchase more credits.",
            shop_url=get_shop_token_url(licensee_number)
        )
    
    return remaining
```

**Regulatory Audit Trail:**

NetLicensing's built-in audit trail captures every validation and license update. For FDA SaMD compliance, export the audit log monthly:

```bash
GET https://go.netlicensing.io/core/v2/rest/audit
Content-Type: application/json
Authorization: Basic {API_TOKEN}

# Query parameters:
# ?min_start_time=2026-04-01T00:00:00Z&max_start_time=2026-04-30T23:59:59Z&licensee=HOSP-*
```

**Batching and Caching:**

For large hospitals performing 50+ studies per day, minimize API calls by caching validation results:

```python
# Cache validation result for 1 hour or until first credit decrement
validation_cache[modality] = {
    'result': validation_response,
    'expires': datetime.now() + timedelta(hours=1),
    'invalidate_on_decrement': True
}

# If a decrement occurs, invalidate all cache
def invalidate_cache(modality):
    if modality in validation_cache:
        del validation_cache[modality]
```

**Handling Failed Transactions:**

If the credit decrement API call fails (network error, timeout), use a failsafe:

```python
def process_study_with_failsafe(study_id, modality):
    can_proceed, remaining, license_number = validator.validate_study_credit(modality)
    
    if not can_proceed:
        return {'status': 'BLOCKED', 'reason': 'No credits available'}
    
    # Perform analysis
    result = run_ai_analysis(study_dicom, modality)
    
    # Attempt credit decrement with retry
    max_retries = 3
    for attempt in range(max_retries):
        try:
            validator.decrement_study_credit(license_number, result['used_quantity'])
            return {'status': 'SUCCESS', 'analyzed': True, 'credited': True}
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                # Final attempt failed - log for manual reconciliation
                log_failed_decrement(study_id, license_number)
                return {'status': 'SUCCESS', 'analyzed': True, 'credited': False}
```

### Results & Outcome

- **Market Expansion Achieved**: Adoption by 47 smaller hospitals and outpatient imaging centers that were previously unable to justify per-site annual licenses. These facilities now represent 18% of the customer base.
- **Significant Sales Cycle Reduction**: Average time from first contact to contract signature dropped from 8 months to 6 weeks. Self-service shop purchasing eliminated procurement negotiations for credit refills.
- **High-Margin Recurring Revenue**: Per-study pricing at $13-24/study generates higher margins than per-site annual licenses. Average hospital usage grew to 847 studies/month within 12 months, generating $9,200 MRR per customer.
- **Regulatory Compliance Verified**: FDA audit review of AI/ML module noted that "NetLicensing audit trail provided complete, timestamped evidence of every analysis performed, exceeding validation requirements."
- **Usage Insights Unlocked**: Granular per-modality, per-study data revealed that CT Lesion Detection was the most-utilized module (68% of analyses), informing product roadmap prioritization.
- **Churn Reduction**: Hospitals with active monthly usage showed 94% annual renewal rate compared to 72% under the per-site model.
