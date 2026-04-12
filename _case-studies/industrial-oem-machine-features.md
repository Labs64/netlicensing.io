---
layout: casestudy
title: "Industrial OEM: Monetizing Machine Features"
description: "An industrial OEM added software feature unlocks and usage-based licensing for PLCs and edge controllers."
permalink: "/case-studies/industrial-oem-machine-features/"
img: "/img/case-studies/netlicensing-case-study-industrial-oem-machine-features.png"
tags:
- Case Studies
- Use Cases
- Industrial Automation
- OEM Licensing
- Feature-On-Demand
industry:
- Industrial Machinery / OT/IoT
use-case:
- Machine-bound licensing
- Feature-on-demand
- Usage-based metering
favorite-feature:
- Licensing Model "Node-Locked"
- Quantity-Based Licensing
- Offline Grace Period
---

### Overview

PrecisionTech Industries manufactures programmable logic controllers (PLCs) and industrial edge computing devices for discrete manufacturing, food processing, and chemical production facilities. Their TQM-4500 and TQM-6000 series controllers process orders, manage production workflows, and execute real-time machine control logic. Previously, advanced capabilities like predictive maintenance analytics, safety interlocks, and high-throughput processing were only available in premium hardware SKUs at significantly higher price points. By integrating NetLicensing with their cloud management platform, PrecisionTech now sells all controllers at a base price and monetizes advanced software modules through post-sale licensing, creating a recurring software revenue stream while reducing manufacturing complexity.

### Licensing Challenge

PrecisionTech faced a critical business model problem: their software capabilities were tightly coupled to hardware SKUs, creating inflexibility and inventory risk:

1. **Hardware SKU proliferation**: They manufactured separate hardware variants—Base, Professional, Enterprise—each with different software capabilities burned into firmware. This required maintaining three distinct production lines, managing separate inventory buffers, and dealing with excess stock of unpopular SKUs.

2. **No post-sale upsell capability**: Once a machine shipped with Base firmware, the customer was locked into that feature set for life. If production demand grew and customers needed higher throughput or new safety features, they had to purchase entirely new hardware—a $50K-$100K capital expense. PrecisionTech got no share of that upgrade revenue.

3. **Competitor pressure**: Larger OEM competitors (Siemens, Rockwell Automation) had begun offering software-feature licensing on their industrial controllers. Customers expected the ability to purchase feature upgrades remotely without hardware swaps.

4. **Field service inefficiency**: Customers at remote sites (mines, offshore platforms, rural manufacturing facilities) had unreliable network connectivity. Hardware updates required physical site visits from PrecisionTech technicians, adding $10K-$20K in deployment costs and 2-4 weeks of lead time.

5. **Usage tracking gaps**: PrecisionTech had no visibility into how customers were utilizing their machines. Introducing usage-based licensing (per runtime hour, per processed units) required instrumenting the machines to report telemetry back to a central management backend.

### Chosen Licensing Model

PrecisionTech selected **Node-Locked licensing** combined with **Quantity-based licensing**:

**Node-Locked** ensures that software licenses are cryptographically bound to specific machine serial numbers. This prevents customers from cloning licenses across unauthorized hardware and protects PrecisionTech's intellectual property. Each machine's unique hardware identifier (MAC address, CPU serial, combination of component identifiers) becomes the basis for license validation.

**Quantity-based licensing** tracks usage: runtime hours, processed production units, or processed tons of material. NetLicensing decrements the licensed quota as the machine operates, enabling PrecisionTech to meter advanced features based on customer utilization rather than flat annual fees.

**Model mechanics:**
- Machine S/N TQM-6000-20415 (the node identifier) owns all licenses for that physical unit
- A license for "Predictive Maintenance Analytics" includes a quota of 8,760 runtime hours (one year)
- Each hour of operation decrements the quota by 1
- When quota reaches 0, the feature disables; customer must renew/upgrade to continue
- If quota falls below a configurable red threshold (e.g., 10% remaining), alerts are sent to customer account managers

### NetLicensing Configuration

**Step 1: Create the Product**

Log in to the NetLicensing Management Console and create:

- **Product Number**: `OEM_PRECISIONTECHPLC`
- **Product Name**: `PrecisionTech TQM Industrial Controller Series`
- **Version**: `4.5.2`
- **Description**: Cloud-managed PLC and edge computing devices with modular software capabilities
- **Licensee Auto Create**: Disable (machines are pre-registered during manufacturing)
- **Licensee Secret Mode**: `PREDEFINED` (hardware manufacturers provide the node secret at factory)

**Step 2: Create Product Modules**

Create three modules corresponding to feature categories:

*Module 1: Advanced Analytics*
- **Module Number**: `ANALYTICS`
- **Module Name**: `Predictive Maintenance & Process Analytics`
- **Licensing Model**: `NodeLocked`
- **Node Secret Mode**: `PREDEFINED`

*Module 2: Safety & Compliance*
- **Module Number**: `SAFETY`
- **Module Name**: `Safety Interlocks & Compliance Features`
- **Licensing Model**: `NodeLocked`
- **Node Secret Mode**: `PREDEFINED`

*Module 3: Performance & Throughput*
- **Module Number**: `THROUGHPUT`
- **Module Name**: `High-Throughput Processing Modules`
- **Licensing Model**: `NodeLocked`
- **Node Secret Mode**: `PREDEFINED`

**Step 3: Create License Templates**

For the **ANALYTICS** module with quota-based usage tracking:

| Template Number | Name | License Type | Quantity (Hours/Year) | Price (Annual) | Parameters |
|---|---|---|---|---|---|
| `ANALYTICS_BASIC` | Predictive Maintenance - Basic Tier | QUANTITY | 8760 | $5,000 | Hourly quota; auto-renews annually |
| `ANALYTICS_PREMIUM` | Predictive Maintenance - Premium Tier | QUANTITY | 8760 | $12,000 | Advanced ML models; higher data retention |
| `ANALYTICS_ENTERPRISE` | Predictive Maintenance - Enterprise | QUANTITY | 8760 | $25,000 | Custom algorithms; dedicated support |

For the **SAFETY** module:

| Template Number | Name | License Type | Parameters | Price (One-Time) |
|---|---|---|---|---|
| `SAFETY_INTERLOCKS` | Enhanced Safety Interlocks Module | FEATURE | Perpetual; prevents concurrent operation of incompatible machine states | $8,000 |
| `SAFETY_AUDIT_LOG` | Compliance Audit Logging & Reporting | FEATURE | Perpetual; generates FDA/OSHA-compliant audit trails | $3,500 |

For the **THROUGHPUT** module:

| Template Number | Name | License Type | Quantity (Units/Year) | Price (Annual) | Parameters |
|---|---|---|---|---|---|
| `THROUGHPUT_STD` | Standard Throughput - 50K Units/Year | QUANTITY | 50000 | $4,000 | Processes up to 50K items/year; soft-limit (warns at 90%) |
| `THROUGHPUT_HI` | High-Throughput - 250K Units/Year | QUANTITY | 250000 | $15,000 | Processes up to 250K items/year |
| `THROUGHPUT_UNLIMITED` | Unlimited Throughput | FEATURE | Perpetual | $35,000 | No processing limits; highest performance tier |

**Step 4: Register Machines as Licensees (During Manufacturing)**

When a TQM-6000 is manufactured, the factory system registers it as a Licensee with a predefined node secret:

```bash
# Factory system creates licensee for machine serial TQM-6000-20415
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "product=OEM_PRECISIONTECHPLC&number=NODE_TQM6000_20415&name=TQM-6000 SN:20415 - Acme Manufacturing&licenseeSecret=NODE_SEC_xk9m2p8v&active=true"
```

Response:

```json
{
  "licensee": {
    "number": "NODE_TQM6000_20415",
    "name": "TQM-6000 SN:20415 - Acme Manufacturing",
    "active": true,
    "licenseeSecret": "NODE_SEC_xk9m2p8v"
  }
}
```

The machine ships with the licensee number and node secret encoded in firmware (or embedded in a factory certificate).

### Integration Walkthrough

**Machine Cloud Connection & License Validation**

When the TQM-6000 powers on and establishes cloud connectivity (via MQTT to PrecisionTech's management backend):

1. Machine reads its serial number and node secret from firmware
2. Machine derives the licensee number: `NODE_TQM6000_20415`
3. Machine connects to the cloud backend and initiates a license validation handshake:

```bash
# Machine calls NetLicensing validation with node secret
LICENSEE_ID="NODE_TQM6000_20415"
NODE_SECRET="NODE_SEC_xk9m2p8v"

curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/${LICENSEE_ID}/validate" \
  -H "Authorization: Basic $(echo -n "${NODE_SECRET}:" | base64)" \
  -H "Content-Type: application/json"
```

**Expected Response:**

```json
{
  "licensee": {
    "number": "NODE_TQM6000_20415",
    "name": "TQM-6000 SN:20415 - Acme Manufacturing"
  },
  "productModuleValidation": [
    {
      "name": "Predictive Maintenance & Process Analytics",
      "number": "ANALYTICS",
      "licensingModel": "NodeLocked",
      "valid": true,
      "license": [
        {
          "number": "L_ANALYTICS_PREMIUM_20415",
          "name": "Predictive Maintenance - Premium Tier",
          "licenseType": "QUANTITY",
          "quantity": "8650",
          "valid": true
        }
      ]
    },
    {
      "name": "Safety & Compliance",
      "number": "SAFETY",
      "valid": true,
      "license": [
        {
          "number": "L_SAFETY_INTERLOCKS_20415",
          "licenseType": "FEATURE",
          "valid": true
        }
      ]
    },
    {
      "name": "High-Throughput Processing",
      "number": "THROUGHPUT",
      "valid": true,
      "license": [
        {
          "number": "L_THROUGHPUT_HI_20415",
          "licenseType": "QUANTITY",
          "quantity": "186420",
          "valid": true
        }
      ]
    }
  ]
}
```

4. Machine caches this response locally on disk or in persistent memory
5. Machine firmware enables/disables features based on license validity:
   - If `ANALYTICS` is valid, load predictive maintenance module
   - If `SAFETY_INTERLOCKS` is valid, enable safety logic
   - If `THROUGHPUT` quantity > 0, run at full speed; otherwise throttle
6. Machine continues normal operation using cached entitlements

**Usage Metering & Quota Depletion**

Every 5 minutes, the machine heartbeat sends a usage report to the cloud backend:

```bash
# Machine reports operational metrics every 5 minutes
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/L_ANALYTICS_PREMIUM_20415" \
  -H "Authorization: Basic $(echo -n "${NODE_SECRET}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "action=DEBIT&debit=0.0833"  # 0.0833 hours = 5 minutes
```

```bash
# Separately, report units processed
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/L_THROUGHPUT_HI_20415" \
  -H "Authorization: Basic $(echo -n "${NODE_SECRET}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "action=DEBIT&debit=427"  # 427 units processed in last 5 minutes
```

NetLicensing decrements both quotas. The backend logs responses to a time-series database for dashboard visualization:

```json
{
  "license": {
    "number": "L_ANALYTICS_PREMIUM_20415",
    "quantity": "8649.9167",
    "valid": true
  }
}
```

**Offline Operation & Grace Period**

If cloud connectivity is lost (network outage, satellite link failure), the machine operates using cached entitlements for up to 30 days (configurable grace period):

1. Machine enters "offline mode" and continues using the last-known license state
2. Feature quotas are still decremented locally, but not reported to NetLicensing
3. When connectivity is restored, machine catches up by reporting accumulated usage:

```bash
# After 3 days offline, report all usage at once
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/L_ANALYTICS_PREMIUM_20415" \
  -H "Authorization: Basic $(echo -n "${NODE_SECRET}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "action=DEBIT&debit=72"  # 72 hours (3 days) of operation
```

4. If grace period expires (e.g., 30+ days without connectivity), restricted features lock until validation succeeds

**Feature Unlock: Upsell Flow**

Customer account manager identifies that Acme Manufacturing is processing 180K units/year (exceeding their 50K quota). The manager offers an upgrade to the "High-Throughput 250K Units/Year" plan.

Customer approves. Account manager (or customer self-service portal) activates the upgrade via API:

```bash
# Upgrade Acme Manufacturing to High-Throughput Premium tier
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee=NODE_TQM6000_20415&licenseTemplate=THROUGHPUT_HI&active=true"
```

Response creates a new license or updates the existing one:

```json
{
  "license": {
    "number": "L_THROUGHPUT_HI_20415_UPGRADED",
    "name": "High-Throughput - 250K Units/Year",
    "quantity": "250000",
    "valid": true
  }
}
```

The old license is deactivated, and the machine's next heartbeat pulls the updated license state. The machine firmware automatically loads the new quota; no reboot or physical intervention required.

### Licensee Management

**Factory Registration**

During manufacturing, each TQM-6000 is pre-registered as a licensee with a unique node secret derived from the serial number:

```python
import hashlib

serial_number = "TQM-6000-20415"
base_secret = "factory-seed-key-xyz123"

# Derive node secret from serial and factory seed
node_secret = hashlib.sha256(f"{serial_number}{base_secret}".encode()).hexdigest()[:32]
licensee_number = f"NODE_{serial_number.replace('-', '_')}"

# Write to machine firmware during factory test
firmware_config = {
    "licensee_number": licensee_number,
    "node_secret": node_secret,
    "product": "OEM_PRECISIONTECHPLC"
}
```

The firmware is locked and cryptographically signed so customers cannot modify it.

**Customer Onboarding**

When Acme Manufacturing receives the TQM-6000, they:

1. Unbox the machine
2. Connect to their production network
3. Machine auto-discovers the NetLicensing backend and performs first-time validation
4. PrecisionTech's cloud system detects a new licensee validation and auto-provisions it in their customer billing system
5. Account manager is notified and initiates the onboarding workflow
6. Customer receives an email with a dashboard link to manage entitlements and view usage

**Remote Feature Activation (No Physical Site Visit)**

An offshore oil platform needs to enable predictive maintenance analytics on their TQM-6000. Instead of scheduling a technician site visit (2-week lead time, $25K cost):

1. Facility engineer requests the feature upgrade via web portal
2. PrecisionTech sales approves the $12,000 annual license
3. Backend provisions the license:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee=NODE_TQM6000_20415&licenseTemplate=ANALYTICS_PREMIUM&active=true"
```

4. At the next machine heartbeat (usually within 10 minutes), the license is pulled down and the feature activates automatically
5. Facility engineer sees the analytics dashboard populate with data from the machine, no technician visit required

### Shop & Payment Integration

PrecisionTech does **not** use NetLicensing Shop for this use case. Instead, they use their own customer portal for license purchases and NetLicensing for the backend entitlement authority.

**Why not Shop?** Industrial customers expect integration with their purchasing workflows (purchase orders, net-30 invoicing, vendor contracts). NetLicensing Shop is optimized for immediate self-service checkout; it doesn't support B2B workflows like POs or multi-approval purchasing.

**Custom Portal Flow:**

1. Account manager logs into PrecisionTech's Sales Portal
2. Searches for customer account ("Acme Manufacturing")
3. Views current machine inventory and license status
4. Clicks "Upgrade License" on machine TQM-6000-20415
5. Portal displays available plans and pricing
6. Manager creates a quote/purchase order (integrates with their ERP system)
7. Upon customer approval, backend API call creates the NetLicensing license
8. Invoice is generated and sent via their standard AR process (net-30 terms)
9. Transaction is logged in NetLicensing:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/transaction" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee=NODE_TQM6000_20415&name=ANALYTICS_PREMIUM+Annual+Renewal+-+Acme+Manufacturing&status=PENDING&source=ERP"
```

When payment is received, the transaction status is updated to `CLOSED`.

### Edge Cases & Best Practices

**Quota Thresholds & Alerts**

NetLicensing allows configurable alert thresholds on quantity licenses. PrecisionTech sets:
- **Yellow threshold**: Quota reaches 10% remaining → email sent to customer
- **Red threshold**: Quota reaches 5% remaining → email + dashboard alert

For Acme's "High-Throughput 250K Units/Year" license:
- Yellow alert at 25K units remaining
- Red alert at 12.5K units remaining

Account managers use these alerts to proactively reach out with renewal or upgrade offers.

**License Expiration & Auto-Renewal**

Annual licenses are set to auto-expire on contract anniversary. NetLicensing sends a 30-day advance notice to the customer. If payment is received before expiration:

```bash
# Renew ANALYTICS_PREMIUM for another year
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/L_ANALYTICS_PREMIUM_20415" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "expirationTime=2027-04-19T23:59:59Z&quantity=8760"
```

If payment is NOT received before expiration, the license transitions to `valid=false` at the expiration timestamp. The machine's next validation will disable the feature.

**Hardware Replacement & License Transfer**

If a customer's TQM-6000 fails and needs replacement, PrecisionTech ships a new unit. The customer transfers licenses from the old unit to the new one:

```bash
# Deactivate old machine's license
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/L_ANALYTICS_PREMIUM_20415" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "active=false"

# Activate the same license template on the new machine
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee=NODE_TQM6000_20416&licenseTemplate=ANALYTICS_PREMIUM&active=true"
```

The new machine's firmware includes its own node secret (derived from its serial number), ensuring licenses remain node-locked.

**Bulk License Operations for Fleet Upgrades**

When an enterprise customer with 50 TQM-6000 units wants to upgrade all machines to "Unlimited Throughput" tier:

```bash
# Bulk activate THROUGHPUT_UNLIMITED for all 50 machines in a customer account
for i in {1..50}; do
  LICENSEE="NODE_TQM6000_$(printf '%05d' $i)"
  curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
    -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "licensee=${LICENSEE}&licenseTemplate=THROUGHPUT_UNLIMITED&active=true"
done
```

**Audit Logging & Compliance**

Industrial customers (especially food processing, pharmaceuticals) have regulatory audit requirements. Every license change is logged:

```bash
# Log all license changes to audit trail
curl -X POST "https://go.netlicensing.io/core/v2/rest/audit" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee=NODE_TQM6000_20415&action=LICENSE_ACTIVATED&license=L_SAFETY_AUDIT_LOG_20415&timestamp=2026-04-19T10:30:00Z"
```

These logs are retained and exportable for FDA 21 CFR Part 11 and ISO 9001 compliance audits.

### Results & Outcome

* **Revenue model transformation**: Launched recurring software licensing stream, generating $3.2M in annual recurring revenue (ARR) within 18 months. Average contract value per machine increased from $0 (one-time hardware sale) to $8,500-$15,000 per year (subscription + usage-based fees)
* **Manufacturing cost reduction of 38%**: Eliminated three hardware SKUs; now manufacture a single base configuration and differentiate via software. Inventory carrying costs reduced $420K annually
* **Market expansion**: 47 new enterprise customers acquired within first year, representing $2.8M in annual contract value, primarily driven by ability to offer modular feature upgrades without hardware replacement
* **Field service cost elimination**: Remote feature activation eliminated need for technician site visits for most upgrades. Field service headcount reduced by 6 FTEs; those resources redirected to new product development
* **Customer upgrade velocity**: 34% of installed base upgraded to higher service tiers within first 12 months, generating $1.1M in incremental revenue. Upgrade NPS improved from 42 to 78
* **Competitive positioning**: Ability to rapidly launch new software modules (safety compliance packs, industry-specific analytics) on the same hardware enabled PrecisionTech to compete directly with Siemens and Rockwell on flexibility while maintaining 15-20% lower pricing
* **Operational efficiency**: Cloud-based entitlement management eliminated need for custom onsite activation servers. Support burden for license activation dropped 92%
