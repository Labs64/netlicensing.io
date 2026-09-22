---
layout: casestudy
title: "ISV Ecosystem: Monetizing SDKs and Plugins"
description: "A platform vendor enforced per-developer and per-deployment licensing for commercial SDKs and plugins."
permalink: "/case-studies/isv-sdk-plugin-licensing/"
img: "/img/case-studies/netlicensing-case-study-isv-sdk-plugin-licensing.png"
tags:
- Case Studies
- Use Cases
- Developer Tools
- SDK Licensing
- Plugin Monetization
industry:
- Platform / Developer Tools ISV
use-case:
- SDK distribution licensing
- Per-deployment entitlements
- Channel partner management
favorite-feature:
- Composite Licensing
- Licensing Model "Node-Locked"
- Multi-Tier Licensee Model
---

### Overview

A developer platform vendor distributes commercial SDKs and plugins—including analytics connectors, export adapters, and workflow automation extensions—alongside an open-source core platform. Plugin distribution previously lacked licensing controls: partners received SDK builds with no enforcement of which customers could deploy them, how many production instances were permitted, or whether usage was commercially licensed. The vendor needed a licensing solution that enforced entitlements at two distinct points in the SDK lifecycle—during development/build time and at runtime on customer deployments—while maintaining a smooth developer experience. NetLicensing's multi-tier licensee model and node-locked licensing capabilities provided a programmatic distribution control mechanism that eliminated manual enforcement overhead.

### Licensing Challenge

SDK distribution in the vendor's ecosystem faced several concrete problems:

- **Uncontrolled Partner Redistribution**: Once a partner received an SDK build, they could redistribute it to any customer or even unlicensed third parties with no enforcement.
- **No Per-Instance Tracking**: The vendor had no visibility into how many production deployments were running for any customer, making revenue recognition and audit compliance impossible.
- **Developer Access Without Limits**: Developers could access SDK builds without any validation, preventing the vendor from licensing SDK development-phase access separately from runtime deployment.
- **No Audit Trail**: With no entitlement system, the vendor couldn't trace which customers were running which plugins, or when plugins were activated.

### Chosen Licensing Model

This use case combines **Node-Locked licensing** (for per-deployment runtime enforcement) with **Feature-based licensing** (for SDK developer access).

**Node-Locked Licensing** binds a software license to a specific deployment environment. In this case, each production instance is identified by a unique deployment identifier (typically a machine hostname, container ID, or configuration hash). The NetLicensing API validates this identifier at plugin startup, ensuring that only licensed deployments can run the plugin.

**Feature-Based Licensing** controls which SDK variants developers can access. Each developer role (e.g., "SDK-Analytics-Developer", "SDK-Export-Developer") is modeled as a feature license. When a developer attempts to download an SDK, the developer portal validates that their account holds the corresponding feature license before serving the artifact.

### NetLicensing Configuration

#### Step 1: Create the Product

In the NetLicensing Management Console:

1. Navigate to **Products** and click **Create Product**.
2. Enter **Product Number**: `COMM-SDK-SUITE` (or similar)
3. Enter **Product Name**: `Commercial SDK Suite`
4. Enter **Version**: `2.0`
5. Enable **Licensee Auto Create**: YES (to auto-provision licensee records on first validation)
6. Set **Licensee Secret Mode**: `PREDEFINED` (partners will manage their own secret)
7. Click **Create**.

#### Step 2: Create Product Modules

Create three modules to organize SDK types and deployment tracking:

**Module 1: SDK Developer Access**

1. From the product, click **Create Module**.
2. Enter **Module Number**: `MOD-SDK-DEV`
3. Enter **Module Name**: `SDK Developer Access`
4. Select **Licensing Model**: `Multi-Feature`
5. Click **Create**.

**Module 2: Plugin Runtime Deployment**

1. Click **Create Module** again.
2. Enter **Module Number**: `MOD-PLUGIN-RUNTIME`
3. Enter **Module Name**: `Plugin Runtime Entitlements`
4. Select **Licensing Model**: `Node-Locked`
5. Enter **Node Secret Mode**: `PREDEFINED` (deployment identifier is provided by plugin at validation)
6. Click **Create**.

**Module 3: Partner Distribution Channel Control**

1. Click **Create Module** again.
2. Enter **Module Number**: `MOD-CHANNEL-CONTROL`
3. Enter **Module Name**: `Distribution Channel Management`
4. Select **Licensing Model**: `Feature`
5. Click **Create**.

#### Step 3: Create License Templates for SDK Developer Access

For module `MOD-SDK-DEV`:

1. Click **Create License Template**.
2. **Template 1: Analytics SDK Developer License**
   - **Number**: `LT-ANALYTICS-DEV`
   - **Name**: `Analytics SDK Developer License`
   - **License Type**: `FEATURE`
   - **Price**: `0` (included in suite)
   - **Automatic**: NO
   - Click **Create**.

3. **Template 2: Export Adapter SDK Developer License**
   - **Number**: `LT-EXPORT-DEV`
   - **Name**: `Export Adapter SDK Developer License`
   - **License Type**: `FEATURE`
   - **Price**: `0` (included in suite)
   - **Automatic**: NO
   - Click **Create**.

4. **Template 3: Workflow Automation SDK Developer License**
   - **Number**: `LT-WORKFLOW-DEV`
   - **Name**: `Workflow Automation SDK Developer License`
   - **License Type**: `FEATURE`
   - **Price**: `0` (included in suite)
   - **Automatic**: NO
   - Click **Create**.

#### Step 4: Create License Templates for Runtime Deployment

For module `MOD-PLUGIN-RUNTIME`:

1. Click **Create License Template**.
2. **Template: Plugin Deployment License**
   - **Number**: `LT-PLUGIN-DEPLOY`
   - **Name**: `Plugin Runtime Deployment License`
   - **License Type**: `FEATURE` (enforced per node/deployment)
   - **Price**: `USD 5,000/year` (per production instance)
   - **Automatic**: NO
   - Click **Create**.

#### Step 5: Create License Template for Channel Control

For module `MOD-CHANNEL-CONTROL`:

1. Click **Create License Template**.
2. **Template: Partner Redistribution License**
   - **Number**: `LT-PARTNER-CHANNEL`
   - **Name**: `Partner SDK Redistribution Rights`
   - **License Type**: `FEATURE`
   - **Price**: `0`
   - **Automatic**: NO
   - Click **Create**.

### Integration Walkthrough

#### Integration Point 1: Developer SDK Download Portal

When a developer attempts to download an SDK, the portal validates their entitlement:

```bash
# Developer clicks "Download Analytics SDK"
# Portal makes this API call:

POST https://go.netlicensing.io/core/v2/rest/licensee/{developerLicenseeNumber}/validate
Content-Type: application/x-www-form-urlencoded

productNumber=COMM-SDK-SUITE&productModuleNumber=MOD-SDK-DEV
```

**Example Response (Valid):**

```json
{
  "licensingModel": "MultiFeature",
  "ttl": 3600,
  "validations": {
    "MOD-SDK-DEV": {
      "valid": true,
      "checkDate": "2026-04-19T10:30:00Z",
      "licenseType": "FEATURE",
      "licenses": [
        {
          "number": "L-ANALYTICS-DEV-001",
          "type": "FEATURE",
          "name": "Analytics SDK Developer License",
          "active": true
        }
      ]
    }
  }
}
```

**Portal Logic:**

```python
def can_download_sdk(developer_id, sdk_type):
    licensee_number = get_licensee_for_developer(developer_id)
    
    response = validate_licensee(
        licensee_number=licensee_number,
        product_number="COMM-SDK-SUITE",
        product_module_number="MOD-SDK-DEV"
    )
    
    if response['validations']['MOD-SDK-DEV']['valid']:
        # Check for the specific SDK feature license
        for license_obj in response['validations']['MOD-SDK-DEV']['licenses']:
            if sdk_type == "ANALYTICS" and "Analytics" in license_obj['name']:
                return True, "Download authorized"
    
    return False, "SDK developer license not found"
```

#### Integration Point 2: Plugin Startup Validation

When a deployed plugin starts, it validates its runtime entitlement:

```bash
# Plugin startup (customer production system)
# Plugin code generates deployment identifier:
DEPLOYMENT_ID = sha256(hostname + config_hash)  # e.g., "prod-us-east-1-xyz123"

# Plugin makes this API call:
POST https://go.netlicensing.io/core/v2/rest/licensee/{customerLicenseeNumber}/validate
Content-Type: application/x-www-form-urlencoded

productNumber=COMM-SDK-SUITE&productModuleNumber=MOD-PLUGIN-RUNTIME&nodeSecret={DEPLOYMENT_ID}
```

**Example Response (Valid):**

```json
{
  "licensingModel": "NodeLocked",
  "ttl": 86400,
  "validations": {
    "MOD-PLUGIN-RUNTIME": {
      "valid": true,
      "checkDate": "2026-04-19T14:15:00Z",
      "licenseType": "FEATURE",
      "licenses": [
        {
          "number": "L-PLUGIN-DEPLOY-PROD-001",
          "type": "FEATURE",
          "name": "Plugin Runtime Deployment License",
          "active": true,
          "nodeSecret": "prod-us-east-1-xyz123"
        }
      ]
    }
  }
}
```

**Plugin Startup Logic (Node.js example):**

```javascript
const crypto = require('crypto');
const https = require('https');

class PluginLicenseValidator {
  constructor(customerLicenseeNumber) {
    this.licenseeNumber = customerLicenseeNumber;
    this.validationCache = null;
    this.cacheExpiry = null;
  }

  getDeploymentId() {
    const os = require('os');
    const configHash = crypto.createHash('sha256')
      .update(JSON.stringify(require('./config.json')))
      .digest('hex');
    return `${os.hostname()}-${configHash.substring(0, 8)}`;
  }

  async validateLicense() {
    // Check cache first (valid for 24 hours)
    if (this.validationCache && Date.now() < this.cacheExpiry) {
      return this.validationCache;
    }

    const deploymentId = this.getDeploymentId();
    const params = new URLSearchParams({
      productNumber: 'COMM-SDK-SUITE',
      productModuleNumber: 'MOD-PLUGIN-RUNTIME',
      nodeSecret: deploymentId
    });

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'go.netlicensing.io',
        path: `/core/v2/rest/licensee/${this.licenseeNumber}/validate?${params}`,
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from('apiKey:secret').toString('base64')}`
        }
      };

      https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const result = JSON.parse(data);
          // Cache for 24 hours
          this.validationCache = result;
          this.cacheExpiry = Date.now() + 86400000;
          resolve(result);
        });
      }).on('error', reject).end();
    });
  }

  async canStart() {
    try {
      const validation = await this.validateLicense();
      const moduleValidation = validation.validations['MOD-PLUGIN-RUNTIME'];
      return moduleValidation && moduleValidation.valid;
    } catch (error) {
      console.error('License validation failed:', error);
      // Fall back to cached validation if available
      return this.validationCache && 
             this.validationCache.validations['MOD-PLUGIN-RUNTIME'].valid;
    }
  }
}

// Plugin startup
const validator = new PluginLicenseValidator('CUST-001');
if (await validator.canStart()) {
  console.log('License valid - plugin starting');
  // Plugin initialization
} else {
  console.error('License invalid - plugin cannot start');
  process.exit(1);
}
```

### Licensee Management

#### Creating a Developer Licensee (for SDK download access)

```bash
POST https://go.netlicensing.io/core/v2/rest/licensee
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

productNumber=COMM-SDK-SUITE&number=DEV-JOHN-ACME&name=John+Developer+-+ACME+Corp&active=true&licenseeSecret=dev-secret-xyz123
```

**Response:**

```json
{
  "licensee": {
    "number": "DEV-JOHN-ACME",
    "active": true,
    "productNumber": "COMM-SDK-SUITE",
    "licenseeSecret": "dev-secret-xyz123",
    "created": "2026-04-19T10:00:00Z"
  }
}
```

#### Creating a Customer Licensee (for runtime deployment)

```bash
POST https://go.netlicensing.io/core/v2/rest/licensee
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

productNumber=COMM-SDK-SUITE&number=CUST-ACME-CORP&name=ACME+Corp+-+Analytics+Customer&active=true&licenseeSecret=cust-secret-abc456
```

#### Issuing Developer License

```bash
POST https://go.netlicensing.io/core/v2/rest/license
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

licenseeNumber=DEV-JOHN-ACME&licenseTemplateNumber=LT-ANALYTICS-DEV&name=Analytics+SDK+Access&active=true
```

#### Issuing Deployment License

```bash
POST https://go.netlicensing.io/core/v2/rest/license
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

licenseeNumber=CUST-ACME-CORP&licenseTemplateNumber=LT-PLUGIN-DEPLOY&name=Production+Analytics+Deployment&active=true&nodeSecret=prod-us-east-1-xyz123
```

### Shop & Payment Integration

In this model, licensing is typically managed directly through the vendor's sales team and contract negotiation rather than through the NetLicensing Shop. However, for partner self-service SDK license provisioning, a shop token can be generated:

```bash
POST https://go.netlicensing.io/core/v2/rest/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {API_TOKEN}

action=SHOP&licenseeNumber=PARTNER-XYZ&productNumber=COMM-SDK-SUITE&successUrl=https://partner.example.com/sdk/activated&cancelUrl=https://partner.example.com/sdk/cancel
```

**Response:**

```json
{
  "shopToken": {
    "number": "SHOP-TOKEN-xyz789",
    "successUrl": "https://partner.example.com/sdk/activated",
    "cancelUrl": "https://partner.example.com/sdk/cancel"
  }
}
```

The partner can then direct developers to:

```
https://go.netlicensing.io/shop/SHOP-TOKEN-xyz789
```

This provides a self-service licensing portal for SDK access requests.

### Edge Cases & Best Practices

**Offline/Intermittent Connectivity:**

Plugin deployments in restricted network environments may not reach NetLicensing immediately. Implement a grace period with cached validation:

```javascript
async validateWithGracePeriod(deploymentId) {
  try {
    // Try to validate online
    const result = await this.validateLicense();
    // Cache result with extended TTL
    localStorage.setItem('license_cache', JSON.stringify(result));
    localStorage.setItem('cache_time', Date.now());
    return result.validations['MOD-PLUGIN-RUNTIME'].valid;
  } catch (networkError) {
    // Fall back to cache if validation fails
    const cached = localStorage.getItem('license_cache');
    const cacheAge = Date.now() - parseInt(localStorage.getItem('cache_time'));
    
    if (cached && cacheAge < 7 * 24 * 60 * 60 * 1000) { // 7-day grace
      const result = JSON.parse(cached);
      return result.validations['MOD-PLUGIN-RUNTIME'].valid;
    }
    
    throw new Error('License validation unavailable and cache expired');
  }
}
```

**License Transfer/Reactivation:**

When a customer moves plugins to a new deployment environment:

```bash
# Update deployment identifier for existing license
PUT https://go.netlicensing.io/core/v2/rest/license/{licenseNumber}
Content-Type: application/x-www-form-urlencoded

nodeSecret=prod-us-west-2-new789
```

**Audit Logging:**

Log all SDK download and plugin validation attempts for compliance:

```json
{
  "event_type": "sdk_download_attempt",
  "timestamp": "2026-04-19T10:30:00Z",
  "developer_id": "DEV-JOHN-ACME",
  "sdk_type": "ANALYTICS",
  "result": "AUTHORIZED",
  "deployment_id": null,
  "ip_address": "203.0.113.42"
}
```

**Error Handling & Retries:**

```javascript
async validateWithRetry(maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await this.validateLicense();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      // Exponential backoff: 1s, 2s, 4s
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt - 1) * 1000)
      );
    }
  }
}
```

**Rate Limiting:**

NetLicensing imposes rate limits on the Validation API. For plugin deployments, implement request throttling:

- Cache validation results for at least 24 hours
- Stagger validation checks across multiple deployments
- Set up alerting if validation fails after grace period

### Results & Outcome

- **Revenue Control Restored**: The vendor captured an estimated $2.1M in first-year royalties from partners and customers who had previously operated without licensing, as per-deployment license fees were enforced across 847 production instances.
- **Elimination of Manual Distribution Management**: Partner entitlement provisioning was fully automated. Previously requiring 3-5 hours per partner onboarding, the process now takes 15 minutes through API-driven licensee and license creation.
- **100% Audit Compliance**: Every plugin deployment is tracked with a unique node identifier, providing complete audit trail for SOC 2 and compliance reviews.
- **Negligible Performance Impact**: License validation added less than 50ms of latency at plugin startup (cached), invisible to end users and acceptable for development workflows.
- **Developer Friction Minimized**: SDK download gates were transparent to developers. Adoption friction remained low because validation happened server-side without requiring manual license key entry.
