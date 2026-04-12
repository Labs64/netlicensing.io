---
layout: casestudy
title: "IoT & Device Feature Activation: Fleet-Wide Remote Feature Management"
description: "Activate, upgrade, or revoke feature sets on demand — across tablet deployments, smart meters, eSIM devices, and connected hardware fleets"
permalink: "/case-studies/iot-device-feature-activation/"
img: "/img/case-studies/netlicensing-case-study-iot-device-feature-activation.png"
tags:
- Case Studies
- Use Cases
- IoT
- Device Management
- Feature Activation
industry:
- IoT / Connected Devices
use-case:
- Device fleet management
- Remote feature activation
- On-demand upgrades
favorite-feature:
- Licensing Model "Node-Locked"
- Licensing Model "Multi-Feature"
- Remote License Management
---

### Overview

An industrial IoT platform provider manufactures connected devices (smart meters, environmental sensors, industrial gateways, edge computing hubs) deployed across manufacturing plants, utility networks, and logistics operations. Each device ships with identical firmware containing advanced analytics, predictive maintenance, real-time alerting, cloud data synchronization, and third-party API integration capabilities. Customers purchase devices at different service tiers, and the provider needed fine-grained control to activate only the features corresponding to each customer's subscription. NetLicensing Node-Locked and Multi-Feature models enabled a single hardware SKU to support unlimited feature tier combinations, dramatically reducing manufacturing and inventory complexity while preventing revenue leakage from unauthorized feature access.

### Licensing Challenge

The provider faced competing demands that traditional licensing models could not satisfy:

**Manufacturing complexity**: Previously, creating separate hardware SKUs for each feature tier (Basic, Professional, Enterprise) required maintaining multiple BOM variants, separate manufacturing runs, and dedicated inventory bins. Cost of goods sold increased 40% due to SKU proliferation. A single feature enhancement required re-certifying and re-manufacturing all SKUs.

**Revenue leakage**: Pre-activating all features in firmware and relying on customers to self-regulate was not viable; many customers simply used advanced features without paying for them. Retrofitting firmware after deployment was impossible for offline devices.

**On-field upgrade constraints**: Visiting customer sites to install new feature licenses or swap hardware was operationally expensive and created field service bottlenecks. Customers demanded faster feature availability.

**Offline operation**: Many devices operated in environments with intermittent or no connectivity (underground mining operations, remote substations, aircraft interiors). Local license validation was required without constant cloud connectivity.

**Scale**: Tens of thousands of devices across hundreds of customer accounts meant per-device manual provisioning was infeasible.

### Chosen Licensing Model

The deployment used two complementary models:

- **Node-Locked License Model**: Features were cryptographically bound to device hardware identifiers (serial number, MAC address, device UUID). This prevented customers from copying licenses to unauthorized devices or using a single license across multiple units.
- **Multi-Feature License Model**: Each device capability (analytics engine, predictive maintenance, real-time alerting, cloud sync, API integrations, firmware access) was modeled as a separate license template. A customer's entitlement was an additive bundle: "Device A gets analytics + alerting", "Device B gets full feature set".

Together, these models allowed unlimited feature tier combinations without manufacturing complexity. A single device could be instantly upgraded to any feature level by issuing new licenses, without firmware changes or device replacement.

### NetLicensing Configuration

**Entity Structure:**
```
Product: Industrial IoT Platform
├── Module: Device Features (Node-Locked)
│   ├── Template: Analytics Engine (per-device, node-locked)
│   ├── Template: Predictive Maintenance (per-device, node-locked)
│   ├── Template: Real-Time Alerting (per-device, node-locked)
│   ├── Template: Cloud Data Sync (per-device, node-locked)
│   ├── Template: API Integration (per-device, node-locked)
│   └── Template: Firmware Update Access (per-device, node-locked)
└── Module: Feature Bundles (Multi-Feature, for enterprise agreements)
    ├── Bundle: Basic (analytics only)
    ├── Bundle: Professional (analytics + maintenance + alerting)
    └── Bundle: Enterprise (all features)
```

**Key Parameters:**
- Node-Locked templates: `nodeSecretMode=PREDEFINED` (device serial embedded during manufacturing)
- Multi-Feature templates: each feature licensed independently, combined via bundle relationships
- Cache validity: `checkOutValidity=7` (days) for offline validation tokens
- Offline operation: signed JWT tokens cached locally, re-validated on next cloud connection

**Sample Configuration:**
```json
{
  "number": "IOT-ANALYTICS-NODE",
  "name": "Analytics Engine - Node Locked",
  "licenseType": "FEATURE",
  "model": "Node-Locked",
  "price": 150.00,
  "nodeSecretMode": "PREDEFINED",
  "description": "Per-device advanced analytics capability"
}
```

### Integration Walkthrough

**Device Entitlement Check Flow:**

```
Device Boots / Periodic Check-In
        ↓
Invoke Entitlement Validation:
  GET /licensee/{customerId}/validate?nodeSecret={deviceSerialNumber}
        ↓
NetLicensing Response Contains Active Licenses:
   [
     { "name": "Analytics Engine", "status": "ACTIVE" },
     { "name": "Real-Time Alerting", "status": "ACTIVE" },
     { "name": "API Integration", "status": "INACTIVE" }
   ]
        ↓
Device Firmware Parses Response:
   ├─ Enabled features: load analytics + alerting modules into memory
   ├─ Disabled features: stub functions return "unlicensed" error code
   └─ Cache response locally with TTL = 7 days
        ↓
Device Continues Operation
        ↓
On Next Validation Call (network available):
   ├─ Refresh licenses from cloud
   ├─ If new licenses added: dynamically load modules (no reboot)
   └─ If licenses revoked: gracefully disable features, log audit event
```

**Feature Upgrade Workflow (Customer Initiates):**

```
Customer Portal → Request Feature Upgrade
        ↓
POST /license (create new license for device)
   { "licensee": customer_id, "device_serial": ABC123XYZ, 
     "license_template": "API-INTEGRATION" }
        ↓
License Created, Status = ACTIVE
        ↓
Webhook → Customer Platform Notifies Device
   (optional: device can poll on next scheduled check-in)
        ↓
Device Next Validation Call:
   GET /licensee/{customerId}/validate?nodeSecret=ABC123XYZ
        ↓
Response includes new "API Integration" license
        ↓
Device loads API integration module, no reboot required
        ↓
Customer application can now call API functions immediately
```

**Offline Validation (e.g., mining site with no connectivity):**

```
Device Last Connected: 2 days ago
Currently Offline: underground, no cellular/network
        ↓
Device periodically attempts feature activation:
   "Can I use analytics?"
        ↓
Local cache hit: "yes, valid until 2026-04-26"
        ↓
Analytics module loaded and operational
        ↓
Days later, device reconnects to cloud:
   GET /licensee/{customerId}/validate?nodeSecret={serial}
        ↓
If licenses unchanged: cache refreshed with new TTL
If licenses revoked: device disables modules on next reboot
```

The provider's customer success team used NetLicensing's management console to provision trial feature activations for proof-of-concept deployments (30-day license validity), bulk-activate features across entire device fleets when customers upgraded service tiers, and remotely revoke features when subscriptions expired or devices were decommissioned.

### Licensee Management

Each customer account was registered as a Licensee, with `licenseeNumber` tied to their account ID in the provider's customer portal. Individual devices were identified by unique hardware identifiers (MAC address, device serial number, or UUID burned into firmware during manufacturing).

**Device Registration & Provisioning:**
- During manufacturing, each device received a unique node secret (device serial number)
- On first cloud connection, the device transmitted its serial to the provider's platform, which created a Licensee entry mapping that device to its customer account
- Or: provider used NetLicensing bulk API to pre-register devices in batches before shipment

**Feature Assignment:**
- When a customer purchased a feature bundle, the provider issued multiple licenses in a single API call, each specifying the device serial and feature template
- Example: customer upgrades 50 meters to Professional tier → 50 licenses created for "Predictive Maintenance" + 50 for "Real-Time Alerting", all with the node-secret binding to each meter's serial

**Multi-Device Fleet Management:**
- Large customers (utilities, manufacturers) deployed hundreds of devices across sites
- The provider used NetLicensing's batch operations API to provision/upgrade/revoke licenses for entire fleets with a single request, indexed by device serial numbers

### Edge Cases & Best Practices

- **Node-secret protection**: Device serial numbers were treated as sensitive; the provider used TLS encryption for all validation API calls and hashed serials in logs to prevent unauthorized reverse-engineering of device identities.
- **Grace period on revocation**: When a customer's subscription expired, features were not immediately disabled; instead, a 7-day grace period allowed billing disputes to be resolved before functional impact to the customer.
- **Audit logging for compliance**: All license activations, upgrades, revocations, and validation calls were logged with timestamps and customer ID, enabling compliance audits for regulated industries (utilities, healthcare).
- **Firmware update distribution**: Feature licensing was decoupled from firmware versioning; a device could upgrade features without updating firmware, but firmware updates could introduce new feature types without breaking existing entitlements.
- **Offline downgrade prevention**: If a customer's subscription lapsed while a device was offline, the cached license remained valid until expiration, preventing customer disruption. The next cloud connection would deactivate the feature gracefully.
- **Rollback on license conflict**: If a device's node-secret validation failed (e.g., device tampered with), the device reverted to a minimal safe state (only core diagnostics enabled) and logged a security alert for investigation.

### Results & Outcome

- **Manufacturing cost reduction**: Single hardware SKU eliminated 12 BOM variants and associated manufacturing complexity; COGS reduced by 40%
- **Feature-driven revenue model**: Customers upgraded features on-demand without hardware replacement; average feature bundle revenue per device increased 180% vs. old SKU-based model
- **Accelerated market entry**: Trial feature activations (30-day licenses) enabled proof-of-concept deployments for enterprise prospects; sales cycle shortened by 6 weeks
- **Operational efficiency**: Remote feature activation eliminated field service visits for capability upgrades; support team time reduced by 60%
- **Revenue protection**: Node-Locked cryptographic binding prevented unauthorized feature sharing; attempted license cloning was detected and logged
- **Agile product development**: New feature launches could be released via API without firmware rollouts; time-to-market for new capabilities shortened from 3 months to 1 week
- **Customer retention**: Easy, affordable feature upgrades improved customer lifetime value; annual churn decreased by 25%

