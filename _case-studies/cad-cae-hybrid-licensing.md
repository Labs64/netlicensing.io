---
layout: casestudy
title: "CAD/CAE Vendor: Dongle to Hybrid Licensing"
description: "An engineering software vendor replaced dongles and FlexLM with cloud-validated hybrid licensing for both on-prem and cloud deployments."
permalink: "/case-studies/cad-cae-hybrid-licensing/"
img: "/img/case-studies/netlicensing-case-study-cad-cae-hybrid-licensing.png"
tags:
- Case Studies
- Use Cases
- Engineering Software
- Hybrid Licensing
- Floating
industry:
- Engineering Software / ISV
use-case:
- Hybrid deployment licensing
- Dongle-to-cloud migration
- Reseller self-service
favorite-feature:
- Licensing Model "Floating"
- Composite Licensing
- Customer Portal
---

### Overview

A mid-size independent software vendor develops sophisticated CAD/CAE (computer-aided design and engineering) tools for mechanical design, simulation, and manufacturing planning. The company serves engineering firms, product design consultancies, and manufacturing companies worldwide, with a customer base ranging from small design boutiques to large enterprises with hundreds of users.

For two decades, the vendor relied on perpetual licenses protected by hardware dongles and FlexLM-style node-locked activation servers. This model worked well for traditional on-premise deployments but became increasingly misaligned with customer infrastructure evolution. Customers demanded the ability to run CAD workloads in cloud environments (AWS, Azure) alongside on-premise workstations, use the software on temporary virtual instances, and manage seat allocation dynamically without purchasing separate licensing infrastructure.

The vendor needed to transition to a hybrid licensing model that unified on-premise and cloud-based deployments while preserving existing perpetual license investments. NetLicensing was chosen as the cloud-based licensing backbone, enabling floating seat pools that span deployment environments and eliminating the operational burden of managing dongle inventory and on-premise license servers.

### Licensing Challenge

The existing licensing architecture consisted of:
- **Hardware dongles** (USB or parallel port) protecting perpetual licenses, with unique serial numbers per license
- **FlexLM license server** running on-premise, managing concurrent seat pools for networked workstations
- **Manual activation process** where resellers and end users contacted the vendor support team to register dongles and obtain license keys
- **No cloud deployment support** — the architecture was fundamentally designed for on-premise networks

This created several critical problems as customers modernized:
- Dongles couldn't exist in virtual machines or ephemeral cloud instances
- Cloud workloads required separate floating licenses and additional license servers in the cloud
- Resellers spent hours on manual activation, updating inventory spreadsheets, and troubleshooting connectivity issues
- The vendor's support team fielded hundreds of license-activation tickets monthly, consuming engineering resources
- Introducing subscription pricing required building new license management code without disrupting perpetual customers
- No visibility into actual seat utilization; customers often over-purchased to account for unpredictable peak usage

### Chosen Licensing Model

NetLicensing's **Floating** licensing model was the core of the solution. Floating licenses allow any entitled user to check out a license from a shared pool, use it for a session, and release it back when done. This model naturally supports hybrid deployment: a floating seat pool can serve users on on-premise workstations, cloud-hosted instances, and temporary development environments without distinguishing between them.

The vendor mapped three licensing approaches:
1. **Perpetual floating seats** for existing customers: migrate dongle entitlements to floating licenses with unlimited validity
2. **Subscription floating seats** for new customers and cloud-native deployments: time-bounded floating licenses with monthly/annual renewal
3. **Module-based licensing** for optional plugins: core CAD licensing bundled with separate feature licenses for FEA (finite element analysis), CAM (computer-aided manufacturing), and premium rendering

### NetLicensing Configuration

**Product and Module Structure:**
```
Product: CAD/CAE Engineering Suite
├── Module: Floating Seats (Floating model)
│   ├── Template: Core CAD (max_sessions=1, perpetual)
│   ├── Template: Core CAD + FEA (max_sessions=1, perpetual)
│   └── Template: Subscription Lite (max_sessions=2, timeVolume=12, monthly)
└── Module: Optional Plugins (Feature model)
    ├── Template: CAM Module
    ├── Template: Advanced Rendering
    └── Template: Simulation Diagnostics
```

**Key Configuration:**
1. Create a Product representing the CAD/CAE suite
2. Create a Floating Module with license templates for each core SKU
3. Set `max_sessions=1` for single-seat perpetual licenses, `max_sessions=2` or `3` for floating lab licenses
4. For subscription licenses, set `timeVolume=12, timeVolumePeriod=MONTH` with annual renewal
5. Create a separate Feature-based Module for optional plugins
6. Configure the Customer Portal to allow licensed users to view seat usage and available features

**Key Parameters:**
- `max_sessions` — concurrent users per floating license; set to 1 for exclusive use or 2+ for lab/shared seats
- `timeVolume=12, timeVolumePeriod=MONTH` for annual subscriptions (the typical CAD/CAE renewal cycle)
- Feature licenses per module to gate optional capabilities
- `checkout_validity` — grace period for seat release (typically 30 minutes for desktop sessions)

### Integration Walkthrough

**License Checkout on Application Launch:**
```
User launches CAD software on any deployment (on-prem, cloud, VM)
  ↓ Software calls: GET /licensee/{licenseeNumber}/validate
  ↓ NetLicensing checks: do floating seats remain available?
  ↓ Yes: return license details + checkout token
  ↓ Software stores checkout token locally
  ↓ User works for up to 8 hours (session timeout)
  ↓ On logout or timeout: POST /license/{number}/checkout (release seat)
  ↓ Seat returns to pool, available for next user
```

**Multi-Environment Workflow:**
```
Company licensed for 5 floating CAD seats

Monday morning (on-premise lab):
  - 3 engineers check out 3 seats from the pool
  - 2 seats remain available

Monday afternoon (AWS cloud):
  - Architect starts a temporary EC2 instance with CAD installed
  - Instance checks out 1 floating seat → 1 seat remains
  - On-premise users don't notice the cloud deployment

Tuesday (on-premise)
  - 2 new engineers need CAD, but only 1 seat available
  - One waits for an on-premise user to log out
  - No need to purchase additional licenses — same 5-seat pool serves both environments
```

**Feature Access Validation:**
```
User attempts to open FEA workbench
  ↓ App queries: GET /licensee/{licenseeNumber}/validate
  ↓ Response includes featureFEA.active (true/false)
  ↓ If false: show "FEA module not licensed" → suggest upgrade
  ↓ If true: grant access to FEA solvers and result analysis
```

### Licensee Management

Each customer organization is a Licensee in NetLicensing. For a company with 50 engineers, a single Licensee is created with floating licenses representing the seat pool:
```bash
POST /licensee
{
  "licenseeNumber": "acme-corp-engineering",
  "productNumber": "cad-suite",
  "licenseeSecret": "acme-generated-secret",
  "active": true
}
```

A reseller activates the customer's floating license:
```bash
POST /license
{
  "licenseeNumber": "acme-corp-engineering",
  "licenseTemplateNumber": "core-cad-floating-5-seats",
  "active": true
}
```

From this point, all 50 engineers at Acme use the same Licensee number and share the 5-seat floating pool. Individual engineers don't need separate licenses or personal accounts; they simply authenticate to the CAD software, which uses the Licensee's floating license to validate and check out seats.

**Perpetual to Floating Migration:**
For existing customers with dongle-based perpetual licenses, the migration flow was:
1. Admin logs into the Customer Portal (backed by NetLicensing)
2. Portal displays: "2 dongle licenses → 2 floating seats (perpetual validity)"
3. Admin clicks "Migrate to Cloud Licensing"
4. Backend creates a new floating license with the same seat count and perpetual validity
5. Admin receives new license key for deployment in the cloud
6. Existing dongles continue to work on-premise indefinitely
7. Both licensing methods serve the same organization; no forced upgrade

### Edge Cases & Best Practices

- **Checkout grace period**: Configure `checkout_validity` to 30–60 minutes. If a user's application crashes without properly releasing a seat, it's freed within the grace period rather than held indefinitely.
- **Session management**: Floating licenses check out one seat per user session. Ensure the desktop/cloud installer properly calls the release endpoint on logout; an orphaned checkout blocks the seat for others.
- **Perpetual license sunset**: Don't revoke existing perpetual licenses; instead, allow them to coexist with new floating subscriptions. Customers can migrate at their own pace.
- **Cloud-specific limits**: Some customers want to limit concurrent cloud instances (e.g., max 2 concurrent EC2 instances even with 10 floating seats). Implement this at the application level by checking cloud instance metadata during checkout.
- **Offline validation**: Cache the most recent validation response for 24 hours to allow short-term offline use. If a user launches the software in an airplane, a cached response grants temporary access.
- **Reseller portal integration**: Provide resellers a self-service Customer Portal where they can issue new floating licenses and monitor seat utilization across their customer base without contacting vendor support.

### Results & Outcomes

- Hybrid deployment fully supported from day one of rollout; existing on-premise installations and new cloud deployments use the same entitlement model
- Support ticket volume related to license activation and dongle management dropped by 65%; resellers resolved most issues self-serve via the Customer Portal
- Cloud adoption accelerated as customers realized they could burst workloads to AWS/Azure without purchasing additional licenses
- New subscription pricing launched in weeks (not months) by creating new License Templates; no application code changes required
- Perpetual customer base maintained; existing dongle holders were not forced to upgrade, reducing sales friction
- Reseller efficiency improved as manual license issuance and inventory tracking were replaced by self-service provisioning
- License utilization visibility improved; customers could see peak usage patterns and optimize seat purchases for actual load
