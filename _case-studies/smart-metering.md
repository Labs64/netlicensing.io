---
layout: casestudy
title: "Smart Metering: Feature Enablement and Consumption Tracking"
description: "A utility equipment provider enabled tiered smart meter capabilities and usage-based billing using Node-Locked and Pay-Per-Use licensing models."
permalink: "/case-studies/smart-metering/"
img: "/img/case-studies/netlicensing-case-study-smart-metering.png"
tags:
- Case Studies
- Use Cases
- Smart Metering
- Utilities
- Industrial IoT
industry:
- Utilities / Industrial IoT
use-case:
- Device-bound licensing
- Usage-based metering
- Feature enablement
favorite-feature:
- Licensing Model "Node-Locked"
- Licensing Model "Pay-Per-Use"
- Remote License Management
---

### Overview

A global smart meter manufacturer ships advanced metering infrastructure to utility companies. Each meter includes sophisticated features—real-time demand response, power quality monitoring, tamper detection, load profiling, and distributed energy resource (DER) management for solar. However, utilities typically purchase meters for immediate deployment and want only basic consumption measurement initially. Shipping feature-complete hardware but giving away premium features for free leaves revenue on the table; shipping multiple hardware SKUs for different feature tiers creates supply chain chaos.

NetLicensing's Node-Locked + Multi-Feature + Pay-Per-Use licensing enabled the manufacturer to ship universal hardware pre-loaded with all capabilities, then activate features remotely per meter based on utility purchases. This transformed the business from one-time hardware sales to recurring software revenue, with zero field service costs.

### Licensing Challenge

The manufacturer's legacy approach required different firmware builds per feature tier:

- Multiple hardware SKUs (Base Model, Professional, Enterprise) across supply chain
- Feature upgrades required truck rolls: technician visits each site, manually updates firmware
- Months of lead time between order and deployment due to SKU-specific builds
- No way to upsell mid-deployment; customers stuck with initial feature tier
- Utilities had to forecast peak needs years in advance and buy expensive "future-proof" meters
- Complex firmware version control and QA for 15+ firmware variants in field

### Chosen Licensing Model

**Node-Locked (per-meter binding) + Multi-Feature (per-capability flags) + Pay-Per-Use (usage-based consumption)**:

- **Node-Locked:** Each meter's serial number is bound to its entitlements; no license sharing across meters
- **Multi-Feature:** Each advanced capability (demand response, power quality, DER) is separately licensable
- **Pay-Per-Use:** Utilities can pay monthly per active meter count instead of upfront per-meter fees

This structure allows one universal hardware product with remote feature activation.

### NetLicensing Configuration

**Node-Locked Product structure:**

```
Product: Smart Meter Universal Hardware
├── Module: Basic Metering (always enabled)
│   └── Template: Consumption Measurement (no license needed, built-in)
├── Module: Advanced Features
│   ├── Template: Demand Response (Node-Locked, price=$2/meter/mo)
│   ├── Template: Power Quality Analytics (Node-Locked, price=$1.50/meter/mo)
│   ├── Template: Tamper Detection (Node-Locked, price=$0.75/meter/mo)
│   ├── Template: Load Profiling (Node-Locked, price=$1/meter/mo)
│   └── Template: DER Management (Node-Locked, price=$3/meter/mo)
└── Module: Trial Features
    └── Template: 30-Day Trial (Multi-Feature, all features, free)
```

**Key parameters per template:**

- **Perpetual features:** `price=$2–$3 per meter (one-time), quantity=1`
- **Pay-Per-Use features:** `price=$2–$3 per month per active meter, quantity=1, timeVolume=1, timeVolumePeriod=MONTH`
- **Node binding:** `nodeSecretMode=PREDEFINED, nodeSecret=METER_SERIAL_12345`
- **Trial:** `timeVolume=30, timeVolumePeriod=DAY, price=0`

**Sample Node-Locked license creation:**

```json
{
  "licenseeNumber": "UTILITY-ABC-METER-12345",
  "licenseTemplateNumber": "DEMAND-RESPONSE-FEATURE",
  "nodeSecret": "MFM-300-SN-9876543210",
  "number": "LIC-ABC-12345-DR",
  "active": true
}
```

### Integration Walkthrough

**Meter feature validation at startup:**

```
Smart Meter boots / connects to MDMS
  ↓
Embedded software reads hardware serial (BIOS)
  ↓
MDMS calls GET /licensee/{serialNumber}/validate
  ↓
NetLicensing returns active features for this meter:
  {
    "valid": true,
    "demandResponse": true,
    "powerQuality": false,
    "tamperDetection": true,
    "loadProfiling": true,
    "derManagement": false
  }
  ↓
Meter loads only enabled features; disabled features excluded from firmware
```

**Utility purchases feature upgrade (MDMS portal):**

```
Utility admin selects "Enable Power Quality Analytics for all 5,000 meters"
  ↓
MDMS backend calls:
  POST /license (for each meter)
    licenseTemplateNumber=POWER-QUALITY
    nodeSecret=METER_SERIAL_1, etc.
  ↓
Meters validate on next sync (within 24 hrs)
  ↓
Power Quality feature automatically enabled; zero truck rolls needed
```

**Pay-Per-Use billing flow:**

```
Each month, MDMS queries per-feature usage:
  ↓
MDMS reports back to NetLicensing:
  POST /usage
    feature=demandResponse, count=4800 meters used this month
    feature=powerQuality, count=2100 meters used this month
  ↓
NetLicensing calculates charges:
  4800 meters × $2/mo = $9,600
  2100 meters × $1.50/mo = $3,150
  ↓
Monthly invoice reflects actual usage, not theoretical capacity
```

**Trial-to-paid conversion:**

```
Utility creates trial account; MDMS provisions all meters with
  temporaryTrialLicense, timeVolume=30 days
  ↓
Meters validate; all features enabled for evaluation
  ↓
After 30 days, trial license expires
  ↓
Utility converts to paid: selects which features to keep
  ↓
MDMS creates perpetual or Pay-Per-Use licenses for selected features
  ↓
Meters re-validate; only licensed features remain enabled
```

### Licensee Management

A Licensee = a unique meter device:

- `licenseeNumber = UTILITY_ID + METER_SERIAL_NUMBER` (e.g., `UTILITY-ABC-MFM300-SN9876543210`)
- Created automatically when meter is manufactured and registered in MDMS
- No manual Licensee provisioning; bulk-register all meters at factory

Features are assigned via licenses. Utility upgrades features by purchasing licenses, which are automatically associated with the meter's Licensee at validation time.

### Edge Cases & Best Practices

- **Offline operation grace period:** Meter caches signed license tokens locally for 90 days; can operate offline during temporary network outage (rural areas, cell dead zones); after 90 days without validation, block operation until connection restored.
- **Feature rollback (downgrade):** If meter's feature license expires, automatically disable that feature on next validation; meter continues operating with remaining features (safe degradation).
- **Bulk feature activation:** MDMS supports batch operations: "Activate Demand Response for all 10,000 meters in Region X"; one API call provisions 10,000 licenses in seconds.
- **Tamper detection audit trail:** Log all feature activations/deactivations with timestamp and reason (for regulatory compliance); enable utilities to prove which features were enabled when, for billing disputes.
- **Meter replacement:** If meter hardware is swapped (serial changes), manually reassign licenses to new serial via MDMS; old serial's licenses automatically revoked.
- **Geofencing:** Bind licenses to utility territory (via Licensee custom attributes) to prevent accidental activation in wrong region; validate territory during license creation.

### Results & Outcome

- Hardware SKU complexity eliminated; single universal meter deployed across all utility tiers and feature levels
- Post-deployment feature upgrades became recurring revenue stream (0% field service cost); transformed business from one-time hardware to ongoing software revenue
- Feature activation reduced from 3–6 months (truck rolls, firmware updates) to minutes (API-driven remote activation)
- Utility customer satisfaction improved; buyers deploy base functionality immediately and scale features as grid modernization budgets evolve
- Pay-Per-Use licensing attracted budget-constrained utilities, expanded addressable market and accelerated feature adoption
- Firmware version fragmentation eliminated; single firmware build in field simplifies support and QA complexity by 70%
- Sales cycle friction reduced; sales team offers pilot programs (30-day free trial on all features) instead of feature-limited demo units, improving proof-of-concept conversion by 45%
