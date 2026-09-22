---
layout: casestudy
title: "Embedded Devices: Feature-on-Demand Licensing"
description: "A smart energy and edge device vendor shipped one hardware build and unlocked feature tiers remotely via NetLicensing."
permalink: "/case-studies/embedded-feature-on-demand/"
img: "/img/case-studies/netlicensing-case-study-embedded-feature-on-demand.png"
tags:
- Case Studies
- Use Cases
- Embedded Systems
- Smart Energy
- Feature-On-Demand
industry:
- Embedded Systems / Smart Energy / Edge Computing
use-case:
- Device-bound licensing
- Post-shipment feature unlock
- Offline-resilient validation
favorite-feature:
- Licensing Model "Node-Locked"
- Licensing Model "Multi-Feature"
- Offline Grace Period
---

### Overview

An embedded systems vendor manufactures smart energy meters and edge gateways deployed in utility networks and industrial facilities. Traditionally, they shipped multiple hardware SKUs, each with a fixed set of firmware capabilities: a basic meter with standard metering functions, a premium meter with advanced analytics, and an enterprise gateway with full API access and edge computing capabilities. Each SKU required separate manufacturing, testing, and inventory management, creating supply chain complexity and leaving the vendor exposed to demand forecasting errors.

The vendor's shift to a single universal hardware build with post-shipment software feature unlock delivers significant operational advantages. Devices are manufactured identically and shipped with core software; capabilities are unlocked remotely via NetLicensing when customers purchase upgrades. This reduces SKU complexity, eliminates stranded inventory, enables mid-life upsells, and supports dynamic licensing aligned with evolving customer needs.

### Licensing Challenge

The original multi-SKU approach created substantial operational friction:

- **Supply chain complexity:** Manufacturing and testing distinct hardware variants for different feature tiers consumed engineering resources and extended lead times. Inventory forecasting errors left high-tier units stranded while low-tier units sold out.
- **No upsell motion:** Customers committed to a tier at purchase time. If their operational needs evolved (e.g., a utility needed advanced demand-response capabilities after 6 months), they had no upgrade path without replacing physical hardware—a process requiring site visits and customer downtime.
- **Missed revenue:** The vendor couldn't monetize mid-life upgrades or offer trial periods for premium features because feature access was locked at the silicon level.
- **Field service burden:** Feature modifications required physical hardware replacement in deployed devices, incurring travel costs and customer disruption.

### Chosen Licensing Model

**Node-Locked License Model** — device serial number or hardware ID serves as the unique Licensee identifier. Each device is registered in NetLicensing at manufacturing time, and feature entitlements are bound to that specific device. **Multi-Feature License Model** — granular per-capability entitlements. Rather than "Pro" vs. "Enterprise" tiers, capabilities are licensed individually: basic metering, advanced analytics, demand-response, API access, edge processing. Customers purchase combinations of features matching their operational needs.

```
Node-Locked Multi-Feature Architecture:
- Device serial: SN-2024-0045821
  ├─ Feature: Basic Metering (always included)
  ├─ Feature: Advanced Analytics (licensed, active)
  ├─ Feature: Demand Response (not licensed)
  ├─ Feature: API Access (licensed, active)
  └─ Feature: Edge Processing (not licensed)

Customer upgrades → adds "Demand Response" → device re-validates
on next check-in → new feature available in firmware
```

### NetLicensing Configuration

**Product & Module Setup:**
- **Product:** "SmartMeter" or "EdgeGateway" (hardware product)
- **Module:** "Feature Access" (licensing model: Multi-Feature + Node-Locked)
- **License Templates (one per feature):**
  - `BASIC_METERING` — always included, no license required
  - `ADVANCED_ANALYTICS` — $500 one-time, unlocks data aggregation and trend analysis
  - `DEMAND_RESPONSE` — $1000 one-time, enables automatic load shedding
  - `API_ACCESS` — $2000 one-time, remote device control and data query API
  - `EDGE_PROCESSING` — $3000 one-time, on-device ML model inference

**Key Parameters:**
- `nodeSecretMode=PREDEFINED` — device serial number is the node identifier
- `active=true` — features are active immediately upon purchase
- `number` — feature name (e.g., `ADVANCED_ANALYTICS`)

**ASCII Configuration:**
```
Product: SmartMeter
└── Module: Feature Access (Multi-Feature, Node-Locked)
    ├── Template: BASIC_METERING (included)
    ├── Template: ADVANCED_ANALYTICS ($500)
    ├── Template: DEMAND_RESPONSE ($1000)
    ├── Template: API_ACCESS ($2000)
    └── Template: EDGE_PROCESSING ($3000)

Device SN-2024-0045821 Licenses:
├─ BASIC_METERING (auto)
├─ ADVANCED_ANALYTICS (purchased)
└─ API_ACCESS (purchased)
```

### Integration Walkthrough

**Integration Points:**
- **At manufacture:** Device receives serial number; cloud management platform registers it as a Licensee in NetLicensing with that serial.
- **On device boot:** Device calls `GET /licensee/{serial_number}/validate` to retrieve current feature entitlements.
- **Periodic check-in:** Device performs daily or weekly check-in to refresh feature license status and download updated firmware if available.
- **On customer purchase:** Sales system calls `POST /licensee/{serial}/license` to activate a feature template for that device.

**High-Level Flow:**
```
Device manufactures
    ↓
Cloud platform registers device as NetLicensing Licensee
with node_secret = serial number
    ↓
Device deployed at customer site
    ↓
On next network connectivity:
GET /licensee/{serial}/validate
    ↓
NetLicensing returns active licenses:
[BASIC_METERING, ADVANCED_ANALYTICS, API_ACCESS]
    ↓
Device firmware applies feature flags:
if (license exists for ADVANCED_ANALYTICS) → enable_analytics_module()
if (license exists for DEMAND_RESPONSE) → skip_demand_response_module()
    ↓
Customer calls utility: "We need demand-response capability"
    ↓
Sales system: POST /licensee/{serial}/license
  licenseTemplate=DEMAND_RESPONSE
    ↓
On next device check-in:
GET /licensee/{serial}/validate
    ↓
Response now includes DEMAND_RESPONSE
    ↓
Device firmware reloads feature flags
    ↓
Demand-response functionality immediately available
```

### Licensee Management

Each device is registered as a single NetLicensing Licensee, using the device serial number (or a composite ID like `SERIAL_SN-2024-0045821`) as the Licensee identifier. This binding is permanent and occurs at manufacturing time, before the device ships to any customer.

When a customer purchases a feature upgrade, the sales system calls the NetLicensing Management API to create a License for that feature under the device's Licensee. On the device's next periodic check-in (daily or weekly, depending on network connectivity), it retrieves the updated feature list and applies the changes locally.

For customer transfers (e.g., a device moves from Customer A to Customer B), the vendor calls the NetLicensing transfer API to reassign the Licensee ownership or creates a new Licensee record. This ensures accurate billing and entitlement tracking.

### Edge Cases & Best Practices

- **Offline Grace Period & Cached Tokens:** Devices in remote locations may have intermittent connectivity (daily or weekly check-ins). Cache the last successful validation response signed by NetLicensing with a 30-day offline validity window. If a device falls outside this window, it enters a "limited mode" (basic functions only) until connectivity is restored and licenses are re-validated.
- **Firmware Updates Tied to Licenses:** When deploying a firmware update that requires a new feature license, tag the update with a dependency (e.g., `EDGE_PROCESSING` license required). During update, device checks license before applying the update; if not licensed, update is skipped with a notification to the customer.
- **Audit Logging:** Log all license activations, deletions, and validation checks with timestamps and device identifiers. This provides a complete entitlement audit trail for compliance and support investigation.
- **Trial Licenses:** Offer 30-day trial licenses for premium features (e.g., EDGE_PROCESSING). On expiration, the feature becomes read-only or disabled; send the device owner a notification with a purchase link.
- **Batch Operations:** For utilities managing thousands of devices, provide bulk license activation (e.g., "activate DEMAND_RESPONSE for all meters in district XYZ"). Use NetLicensing's batch API or integrate with utility management platforms.
- **Predictive Maintenance Correlation:** Collect device telemetry alongside license usage to identify patterns (e.g., devices with higher CPU usage tend to use EDGE_PROCESSING feature). Use this data to recommend feature upsells to customers.

### Results & Outcome

- **Hardware SKU count reduced to one:** Manufacturing and logistics simplified; inventory risk eliminated through demand forecasting concentration.
- **Supply chain complexity eliminated:** No need to manage distinct hardware builds; all devices are identical and feature-differentiated in software.
- **Post-shipment upsell motion created:** Customers can upgrade capabilities without hardware replacement; vendor realized new revenue stream from mid-life feature unlocks with zero field service cost.
- **Customer lifetime value increased:** By enabling feature trials and incremental upgrades, customers could start with a basic device and expand capabilities as their operational needs evolved, increasing total revenue per device by an average of 45%.
- **Time-to-market improved:** New feature releases could be delivered via firmware updates without waiting for hardware manufacturing cycles.
- **Field service costs reduced by 78%:** Feature upgrades no longer required technician visits or device replacement; everything was handled remotely via API.
