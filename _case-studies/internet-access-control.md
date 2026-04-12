---
layout: casestudy
title: "Internet Access Control"
description: "Managed connection points with ethernet and power sockets under controlled access."
permalink: "/case-studies/internet-access-control/"
img: "/img/case-studies/netlicensing-case-study-internet-access-control-v2.png"
tags:
- Case Studies
- Use Cases
- Access Control
- Internet Access Point
- WLAN
industry:
- Internet
use-case:
- Access Control
- Internet Access Point
favorite-feature:
- Licensing Model "Floating"
- Licensing Model "Subscription"
- Online License Acquisition
---

### Overview

A boutique café operator wanted to differentiate their business by offering a workspace-quality experience to freelancers, remote workers, and traveling professionals. Rather than competing on free WiFi (standard in most cafés), they positioned premium high-speed internet access and dedicated connection points as a revenue-generating service. The business model blended free basic WiFi to drive foot traffic with subscription-gated premium tiers — tiered subscriptions for daily, weekly, monthly, and annual access to dedicated ethernet ports and high-speed WiFi segments. NetLicensing enabled automated, subscription-based access control without requiring manual credential management or expensive network infrastructure upgrades.

### Licensing Challenge

The operator faced a fundamental access control problem: how to enforce premium internet tiers on a per-device basis without expensive dedicated network hardware for each subscription level. Traditional WiFi security (WPA/PSK with shared passwords) offered no per-user granularity — all users with the password received the same access. Manual access provisioning (adding/removing MAC addresses or credentials for each subscription change) was labor-intensive and error-prone. There was no mechanism to offer flexible subscription periods (daily, weekly, monthly, annual) with automatic expiration. Revenue leakage occurred when premium access controls relied on customer self-regulation rather than technical enforcement.

### Chosen Licensing Model

The deployment leveraged two complementary models:

- **Subscription Model** for recurring access: Monthly and annual subscriptions for regular customers. Time-volume parameters ensured recurring renewals aligned with payment cycles.
- **Floating Model** for session-based access: Day passes and hourly access for transient visitors, where concurrent sessions were limited to prevent quota abuse.

Both models operated under the Multi-Feature paradigm, segmenting access into Basic WiFi (included with all subscriptions), Premium WiFi (QoS-prioritized), and Dedicated Ethernet (physical port binding). This structure allowed flexible upselling without requiring separate hardware SKUs.

### NetLicensing Configuration

**Entity Structure:**
```
Product: Café Internet Services
├── Module: WiFi Access (Floating + Subscription)
│   ├── Template: Basic WiFi (free, included)
│   ├── Template: Premium WiFi Sub (monthly, price=9.99)
│   ├── Template: Premium WiFi Sub (annual, price=99.99)
│   └── Template: Day Pass (daily rental, price=2.99)
└── Module: Ethernet Ports (Subscription only)
    ├── Template: Single Port Sub (monthly, price=19.99)
    └── Template: Dual Port Sub (annual, price=199.99)
```

**Key Parameters:**
- Subscription templates: `timeVolume=1`, `timeVolumePeriod=MONTH` or `YEAR`
- Floating templates: `maxSessions=2` (limit concurrent devices per pass)
- Day pass rentals: `timeVolume=24`, `timeVolumePeriod=DAY`
- Annual plans: `gracePeriod=7` (days of access after payment failure before deactivation)

### Integration Walkthrough

**Access Control Flow:**

```
Device Connects to WiFi/Ethernet
        ↓
Network Controller queries NetLicensing
        ↓
GET /licensee/{customerId}/validate?productModule=WiFi
        ↓
License Status Response:
   ├─ valid + Premium tier → grant access to premium WiFi
   ├─ valid + Basic tier  → grant access to basic WiFi only
   ├─ expired            → redirect to purchase page
   └─ not found          → deny access
        ↓
Device authenticated/denied + cached locally (60s TTL)
```

When a customer purchases access through the reception desk (using NetLicensing Shop), they receive credentials and a Licensee number. Their device MAC address is registered in the customer profile. On subsequent connections, the wireless controller performs a validation check. For ethernet ports, 802.1X authentication integrated with the NetLicensing API enforces entitlements — the network access server (RADIUS backend) queries the validation API and either permits or denies port activation based on license status.

High-speed access (Premium WiFi) was enforced through QoS rules tied to MAC address authentication. Basic WiFi segments were open to any authenticated customer. Ethernet ports remained physically disabled unless the validation response indicated active Dedicated Ethernet entitlements.

### Licensee Management

Each customer (individual, daily visitor, or monthly member) was registered as a Licensee with a unique `licenseeNumber` tied to their email address. For walk-in customers, the café reception system auto-provisioned Licensees on first purchase using the NetLicensing API (`POST /licensee`), then issued credentials immediately. For subscription members, manual Licensee creation occurred during account signup, with recurring renewal licenses tied to their billing schedule.

Device ownership was tracked through MAC address registration in the Licensee profile. Multiple devices (phone, laptop, tablet) could be linked to a single Licensee, simplifying management for members who moved between workstations throughout the day.

### Results

- **Revenue diversification**: Premium access fees contributed 22% of monthly café revenue, significantly higher than anticipated
- **Reduced administrative overhead**: Automated license expiration and validation eliminated manual MAC address whitelisting and credential resets
- **Improved customer experience**: Flexible subscription options (daily, weekly, monthly, annual) with instant activation attracted diverse customer segments — tourists, remote workers, and digital nomads
- **Transparent billing**: Customers had clear visibility into access tier and subscription duration; grace period handling recovered 35% of failed payment attempts through automated reminder emails
- **Data-driven operations**: Validation logs provided usage insights, enabling café management to optimize WiFi coverage and capacity planning across locations

