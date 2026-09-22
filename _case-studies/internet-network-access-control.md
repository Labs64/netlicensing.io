---
layout: casestudy
title: "Internet & Network Access Control: Time-Limited Access to Physical Connection Points"
description: "Manage time-limited or subscription-gated access to physical connection points, ethernet sockets, and shared network infrastructure"
permalink: "/case-studies/internet-network-access-control/"
img: "/img/case-studies/netlicensing-case-study-internet-network-access-control.png"
tags:
- Case Studies
- Use Cases
- Network Infrastructure
- Access Control
- Hospitality
- Coworking
industry:
- Network Infrastructure / Hospitality / Coworking
use-case:
- Network access control
- Physical connection points
- Time-limited access
- Shared infrastructure
favorite-feature:
- Licensing Model "Rental"
- Licensing Model "Subscription"
- Time-Limited Access
---

### Overview

A multi-location coworking operator manages premium network infrastructure across several urban centers, serving freelancers, remote teams, and enterprise hot-deskers. While basic WiFi is bundled with all memberships, the company offers tiered network services: high-speed fiber WiFi segments with QoS prioritization, dedicated 10Gbps ethernet ports with guaranteed bandwidth, and managed VPN access for enterprise clients. The business model differentiates members by network tier (Basic, Premium WiFi, Dedicated Ethernet) and duration (hourly day passes, monthly memberships, annual commitments). NetLicensing Subscription and Rental models automate access provisioning, enforce time-bound access through the validation API, and enable self-service purchasing through NetLicensing Shop for day-pass visitors.

### Licensing Challenge

The operator faced complex access control requirements across multiple dimensions:

**Temporal complexity**: Members expected different access patterns — monthly subscribers with continuous access, day-pass visitors with 4–8 hour windows, hourly freelancers purchasing 1–2 hour blocks. Manual access management could not scale.

**Network segmentation**: Three distinct service tiers (Basic WiFi, Premium WiFi, Dedicated Ethernet) required fine-grained entitlement control. Treating all network access as a flat amenity meant power users consumed disproportionate bandwidth without additional revenue capture.

**Device proliferation**: Members brought multiple devices (phone, laptop, tablet, external hard drives) to sessions. Mapping device entitlements to user subscriptions without creating administrative burden was non-trivial.

**Automation gap**: Subscription renewals, expired access deactivation, and upgrade processing required manual staff intervention, creating delays and errors. Reception desk staff spent hours manually adding/removing credentials instead of assisting members.

### Chosen Licensing Model

The deployment combined two models:

- **Subscription Model**: Monthly and annual memberships for regular members. Recurring licenses with automated renewal and grace periods for payment failures ensured continuous access for committed customers.
- **Rental Model**: Time-limited day passes (4–8 hours) and hourly bookings. Time-volume parameters (`timeVolume=4`, `timeVolumePeriod=DAY`) created hard expiration boundaries without requiring manual license revocation.

Both models operated on the Multi-Feature licensing structure, with separate license templates for each network tier. A member could hold a Subscription license for Premium WiFi while optionally purchasing an à la carte Rental license for temporary Dedicated Ethernet access.

### NetLicensing Configuration

**Entity Hierarchy:**
```
Product: Coworking Network Access
├── Module: Wireless Segments (Subscription + Rental)
│   ├── Template: Basic WiFi (unlimited, included)
│   ├── Template: Premium WiFi (monthly, price=49)
│   ├── Template: Premium WiFi (annual, price=499)
│   └── Template: WiFi Day Pass (4-hour rental, price=9.99)
└── Module: Dedicated Ethernet (Subscription + Rental)
    ├── Template: Single Port (monthly, price=99)
    ├── Template: Dual Port (monthly, price=179)
    ├── Template: Port Day Pass (8-hour rental, price=19.99)
    └── Template: Port Hourly (1-hour rental, price=4.99)
```

**Configuration Parameters:**
- Monthly subscriptions: `timeVolume=1`, `timeVolumePeriod=MONTH`, `gracePeriod=7`
- Annual subscriptions: `timeVolume=12`, `timeVolumePeriod=MONTH`
- Day passes: `timeVolume=4`, `timeVolumePeriod=DAY`
- Hourly passes: `timeVolume=60`, `timeVolumePeriod=DAY` (countdown minutes, not calendar hours)

**Sample API Configuration (Pseudocode):**
```json
{
  "number": "ENET-PORT-SUB-MONTH",
  "name": "Dedicated Ethernet - Monthly",
  "licenseType": "TIMEVOLUME",
  "model": "Subscription",
  "price": 99.00,
  "currency": "USD",
  "timeVolume": 1,
  "timeVolumePeriod": "MONTH",
  "gracePeriod": 7
}
```

### Integration Walkthrough

**Network Authentication Flow:**

```
Member Device Connect Request
        ↓
802.1X / Network Access Control Query
        ↓
GET /licensee/{memberId}/validate?productModule=EthernetPorts
        ↓
NetLicensing Responds with License Status & Tier
        ├─ valid + Dedicated Ethernet → RADIUS Access-Accept (port enabled)
        ├─ valid + Premium WiFi only  → RADIUS Access-Reject (eth disabled, VLAN to WiFi)
        ├─ valid + Basic WiFi only    → RADIUS Access-Reject + redirect to WiFi portal
        ├─ expired                    → RADIUS Access-Reject + captive portal (upsell prompt)
        └─ not found                  → RADIUS Access-Reject + member registration flow
        ↓
Access Granted/Denied + decision cached locally (5 min TTL)
```

**WiFi Access Flow:**
```
Device Joins SSID → Wireless Controller RADIUS Check
        ↓
GET /licensee/{memberId}/validate?productModule=WiFiSegments
        ↓
Response determines VLAN assignment:
   ├─ Premium WiFi license → assign to high-QoS VLAN (3.1ms latency SLA)
   ├─ Basic WiFi license   → assign to shared VLAN (best-effort, 8ms)
   └─ Expired/None         → redirect to portal for upgrade
        ↓
Device connects to assigned VLAN + cached entry (2 hours)
```

**Day-Pass Purchase & Provisioning:**
```
Visitor uses Self-Service Kiosk / Reception
        ↓
SELECT Plan (4-hr WiFi, 8-hr Ethernet, 1-hr hourly)
        ↓
POST /transaction (process payment via NetLicensing Shop connector)
        ↓
On Success: POST /licensee + POST /license
        ├─ create Licensee if new visitor
        ├─ create Rental license with timeVolume=4 (hours) or 480 (minutes)
        ├─ set startDate=now
        └─ return credentials (visitor PIN or QR code)
        ↓
Visitor scans code / enters PIN
        ↓
NEXT Device Connection: validation succeeds, access granted
        ↓
After 4 hours elapsed (time-volume countdown): automatic license expiration
        ↓
NEXT Connection Attempt: validation returns expired, redirect to re-purchase
```

Physical ethernet ports were controlled through network access servers (Cisco ISE, Fortinet) integrated with NetLicensing's validation API. Members attempting to connect a device to a port triggered a real-time entitlement check. If the member held an active Subscription or Rental license with Dedicated Ethernet entitlements, the port activated. If the license had expired or didn't include ethernet access, the port remained disabled and displayed a helpful message (e.g., "Your ethernet access expired; renew for continuous connectivity").

### Licensee Management

Each member and visitor was registered as a Licensee, with `licenseeNumber` mapped to their email address and account ID in the coworking platform's CRM.

**Member Provisioning:**
- New member signup triggered automatic Licensee creation via `POST /licensee`
- Subscription license assignment occurred immediately for the selected tier (Basic/Premium/Dedicated)
- Recurring renewals were handled by NetLicensing's automated payment integration (Stripe/PayPal connected via Shop)

**Day-Pass Visitor Provisioning:**
- Reception desk or self-service kiosk initiated visitor Licensee creation
- Temporary Licensee created with minimal data (email or phone)
- Rental license provisioned with precise time bounds
- Credentials issued immediately; access active within seconds

**Device Tracking:**
- MAC addresses were optionally registered per member for seamless re-connection (no re-authentication on return visits)
- Multiple devices per Licensee supported: office laptop, personal phone, borrowed tablet all could authenticate under one member account

### Shop & Payment Integration

The coworking operator integrated NetLicensing Shop for self-service day-pass sales at an automated reception kiosk and online before-visit booking.

**Shop Token Generation:**
```bash
POST /shop
{
  "licensee_number": "{memberId}",
  "product_number": "COWORKING-NYC",
  "license_template_number": "WIFI-DAY-PASS",
  "success_url": "https://coworking.example.com/access/confirmed",
  "cancel_url": "https://coworking.example.com/access/failed"
}
→ Response: {"shopURL": "https://netlicensing.shop/..."}
```

Visitors clicked the shop link, purchased a day pass, and received a confirmation with instant access credentials. Payment processing (Stripe/PayPal) was handled entirely by NetLicensing Shop; the coworking app received a webhook notification on successful purchase, triggering immediate license provisioning and credential delivery via SMS/email.

### Edge Cases & Best Practices

- **Offline grace period**: Members traveling between coworking locations with intermittent WiFi received a 15-minute access grace window (cached license) to prevent disruption during network transitions.
- **Device MAC spoofing**: While MAC-based identification improved UX, the operator enforced secondary authentication (credentials) at least once per 24 hours to prevent unauthorized device swapping.
- **Subscription downgrade timing**: Members downgrading (e.g., Premium WiFi → Basic WiFi) had the change take effect at their next renewal date, not immediately, to avoid disrupting active sessions.
- **Day-pass overrun handling**: When time-volume was nearly depleted, the WiFi portal displayed a "renewal window" (30 minutes before expiration) allowing members to extend access without losing connectivity.
- **Audit logging**: All license activations, validations, and expirations were logged with timestamps for compliance and dispute resolution if members contested billing.
- **Bulk operations for corporate accounts**: Enterprise members leasing 10+ seats used NetLicensing's bulk license API to provision/deprovision seats as team compositions changed, without manual per-seat operations.

### Results & Outcome

- **Revenue impact**: Premium network access contributed 18% additional monthly recurring revenue; day-pass sales increased 45% as visitors could purchase flexible packages matching their actual usage patterns
- **Operational efficiency**: Eliminated manual network access provisioning; automated grace period and renewal handling recovered 40% of failed renewal payments through timely reminders
- **Member satisfaction**: Network congestion decreased 32% as bandwidth-intensive users migrated to dedicated ethernet, freeing WiFi capacity for general browsing; members appreciated transparent subscription management and instant access provisioning
- **Scalability**: The operator expanded to five additional locations replicating the same configuration without infrastructure changes; licensing logic remained centralized in NetLicensing
- **Data insights**: Validation API logs provided per-member access patterns, identifying peak-demand hours and enabling informed capacity planning across all locations
- **Compliance**: Complete audit trail of membership lifecycle events (signup, renewal, upgrade, cancellation, expiration) satisfied financial reporting and tax compliance requirements

