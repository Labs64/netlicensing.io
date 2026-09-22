---
layout: casestudy
title: "OEM & Embedded Software Licensing"
description: "Distribute your software inside a hardware partner's product with device-bound entitlements and per-unit usage reporting"
permalink: "/case-studies/oem-embedded-licensing/"
img: "/img/case-studies/netlicensing-case-study-oem-embedded-licensing.png"
tags:
- Case Studies
- Use Cases
- OEM Software
- Embedded Systems
- Multi-Tenant
industry:
- OEM Software / Embedded Systems
use-case:
- OEM partnerships
- Device-bound licensing
- Per-unit usage reporting
- Multi-tenant management
favorite-feature:
- Licensing Model "Node-Locked"
- Multi-Tenant Architecture
- Usage Tracking
---

### Overview

An industrial software vendor supplies embedded control software for CNC machines, robotic systems, and automated production lines. Their customers are OEM hardware manufacturers who integrate the software into their equipment and sell to end-user factories. The vendor needed a licensing strategy that:

1. Let each OEM partner manage their own customer licenses independently
2. Prevented license keys from being copied or shared across equipment units
3. Gave the software vendor centralized visibility into total deployments for royalty billing
4. Worked reliably when equipment operated offline (common in manufacturing environments)

NetLicensing's Node-Locked licensing combined with multi-tenant management enabled the vendor to empower OEM partners as self-service license administrators while maintaining centralized compliance oversight.

### Licensing Challenge

The vendor's legacy model issued serial numbers that OEM partners shared with end customers. This created multiple problems:

- No device binding: a serial number issued for one CNC could be copied to unauthorized machines
- No deployment visibility: vendor had no idea how many units each OEM actually sold
- No royalty tracking: vendor couldn't measure actual device activations for revenue-sharing calculations
- OEM support burden: each partner's IT team managed their own license infrastructure and called vendor support for every activation issue
- Offline operations: manufacturing facilities often operate in areas with poor or no connectivity; validation failures blocked production

### Chosen Licensing Model

**Node-Locked licensing** per device, in a multi-tenant OEM-partner structure:

- Each OEM partner is a separate tenant with isolated license pools
- Each device (Licensee) is bound to its hardware serial number and device identifier
- A device cannot be activated without its unique serial number; copying the license key to a different device fails validation
- OEM partners receive scoped API credentials to manage licenses for their own end customers

This model prevents license sharing while giving OEM partners operational autonomy.

### NetLicensing Configuration

**Multi-tenant Product structure:**

```
Organization: [OEM Partner Name] — isolated tenant
├── Product: [Software Edition A]
│   ├── Module: Standard Edition
│   │   └── Template: Node-Locked License (perpetual, nodeSecretMode=PREDEFINED)
│   ├── Module: Professional Edition
│   │   └── Template: Node-Locked License (perpetual, nodeSecretMode=PREDEFINED)
│   └── Module: Enterprise Edition
│       └── Template: Node-Locked License (perpetual, nodeSecretMode=PREDEFINED)
```

**Key parameters per template:**

- `licenseType=QUANTITY` (seats/devices); `quantity=1` (one device per license)
- `nodeSecretMode=PREDEFINED` (vendor provides hardware serial number at provisioning)
- No time limit (perpetual license or tied to equipment warranty)
- Usage tracking enabled for activation telemetry

**Sample Node-Locked license creation:**

```json
{
  "licenseeNumber": "OEM-PARTNER-001-DEVICE-ABC123",
  "licenseTemplateNumber": "INDUSTRIAL-NODE-LOCKED",
  "nodeSecret": "ABC123:DEVICE:CNC-MODEL-5000",
  "quantity": "1",
  "active": true
}
```

### Integration Walkthrough

**Device-level validation flow:**

```
Device Boots
  ↓
Embedded software reads hardware serial number (BIOS/firmware)
  ↓
POST /validate with deviceNumber + nodeSecret (serial)
  ↓
NetLicensing checks: Does this serial match the license binding?
  ├─ Yes → return valid, permit operation
  └─ No → return invalid, deny operation
```

**OEM partner provisioning flow:**

```
OEM Partner purchases 10 licenses for [Customer ABC]
  ↓
OEM calls POST /licensee (creates Licensee for Customer ABC)
  ↓
OEM calls POST /license 10 times, each with a unique device serial (nodeSecret)
  ↓
OEM ships 10 CNC machines with device serial numbers pre-configured
  ↓
Each device validates on startup; all 10 succeed because serials are registered
```

**Offline grace period:**

For equipment deployed in disconnected areas, the software caches a signed entitlement token locally:

- On startup with connectivity, fetch fresh validation → cache token + 90-day expiry
- On subsequent startups without connectivity, use cached token (within 90-day window)
- After 90 days offline, require fresh validation before operation
- Prevents infinite offline operation while tolerating temporary network outages

### Licensee Management

In this model, a Licensee = a single device or end-customer organization:

- Each device gets a unique Licensee record with `licenseeNumber = hardwareSerialNumber`
- OEM partner provisions Licensees on behalf of their end customers using scoped API tokens
- No shared Licensee; each device is independently registered and validated

OEM partners access their own tenant via NetLicensing Management Console or API to:
- View all licenses issued to their end customers
- Activate new licenses by device serial number
- Suspend or revoke licenses if devices are returned or warranty expires
- Generate usage reports (activations, runtime hours) for their own customer support

### Edge Cases & Best Practices

- **Hardware replacement:** If a device's motherboard is replaced, the hardware serial changes. Enable end customers to request a license transfer via OEM support, which updates the nodeSecret binding.
- **License audit trail:** Log all license activation, suspension, and transfer events for compliance; include timestamp, device serial, and OEM partner ID.
- **Cloned or counterfeit hardware:** Validate that hardware serial formats match expected patterns; reject obviously forged or duplicate serials on license creation.
- **Intermittent connectivity retry:** If validation fails due to network error (not invalid license), permit operation for 24 hours, then require successful validation before next startup.
- **Vendor-to-partner reporting:** Generate monthly reports per OEM tenant showing total device activations, cumulative runtime, and revenue attribution for royalty calculations.
- **API credential rotation:** Require OEM partners to rotate API keys annually; revoke old keys and issue new scoped credentials to prevent unauthorized access.

### Results & Outcome

- OEM partner onboarding reduced from weeks to days (self-service tenant provisioning and API credential issuance)
- License activation overhead eliminated for vendor support team; OEM partners manage their own customer licenses via API
- Device license fraud prevented; hardware-bound entitlements block serial key copying
- Real-time visibility into deployment volumes across all OEM partners enables accurate royalty billing and revenue forecasting
- OEM partners gained full operational autonomy; no vendor support tickets for routine license activation
- Monthly compliance reports automated; audit trail supports warranty and SLA enforcement
- New revenue stream unlocked: usage-based pricing option where OEM pays per active device activation or per total device runtime hours, rather than flat per-unit fees
