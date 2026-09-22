---
layout: casestudy
title: "Desktop Software ISV: Trial-to-Paid with Node-Locked Protection"
description: "A productivity software vendor eliminated piracy and improved trial conversion by implementing Try & Buy trials with node-locked device binding."
permalink: "/case-studies/software-licensing/"
img: "/img/case-studies/netlicensing-case-study-software-licensing.png"
tags:
- Case Studies
- Use Cases
- Desktop Software
- ISV
- Trial Management
industry:
- Desktop Software / ISV
use-case:
- Software licensing
- Trial-to-paid conversion
- Device-bound licensing
favorite-feature:
- Licensing Model "Try & Buy"
- Licensing Model "Node-Locked"
- A/B Testing
---

### Overview

A desktop software vendor selling productivity tools to creative professionals (designers, photographers, video editors) faced two critical problems: widespread unlicensed multi-device usage (serial numbers shared across teams) and poor trial-to-paid conversion (30% of trial users converted). Their legacy licensing used client-side serial number validation, easily circumvented by sharing or local clock manipulation.

NetLicensing's Node-Locked and Try & Buy licensing eliminated license sharing, enforced server-side trial expiration, and provided conversion analytics. The vendor could now A/B test trial strategies (14-day vs. 30-day, feature restrictions) and gain visibility into which features drove purchase decisions.

### Licensing Challenge

The legacy system had critical flaws:

- Serial numbers were text strings; customers shared them across 5–10 devices
- Trial enforcement was local (system clock–based); resetting the clock reset the trial
- No telemetry; vendor didn't know which features users tried, when they abandoned, or why
- Trial-to-paid conversion was 30%; expensive CAC not recouped
- Support team spent time on "reset my trial" tickets (easy workaround)

### Chosen Licensing Model

**Try & Buy (time-limited trials) + Node-Locked (device binding)**:

- **Try & Buy:** Server-enforced 14/30-day trial period; automatic expiration; no reset possible
- **Node-Locked:** License bound to device fingerprint (MAC address + OS); cannot move to another machine

This combination eliminates both serial sharing and trial reset exploits.

### NetLicensing Configuration

**Product/Template structure:**

```
Product: Creative Suite
├── Module: Trial Programs
│   ├── Template: 14-Day Trial (Try & Buy, free, feature-limited)
│   └── Template: 30-Day Trial (Try & Buy, free, all features)
└── Module: Paid Licenses
    ├── Template: Personal (Node-Locked, $99/year, 1 device)
    ├── Template: Professional (Node-Locked, $299/year, 3 devices)
    └── Template: Teams (Node-Locked, $29/user/mo, unlimited devices)
```

**Key parameters:**

- **Trial:** `timeVolume=14 or 30, timeVolumePeriod=DAY, price=0, nodeSecretMode=PREDEFINED`
- **Paid Personal:** `timeVolume=12, timeVolumePeriod=MONTH, price=$99, nodeSecretMode=PREDEFINED, quantity=1`
- **Node binding:** `nodeSecret=MAC_ADDRESS:OS_ID:DEVICE_NAME` (hardware fingerprint)

**Sample configuration snippet:**

```json
{
  "number": "TRIAL-14DAY",
  "name": "14-Day Trial",
  "licenseType": "TIMEVOLUME",
  "timeVolume": 14,
  "timeVolumePeriod": "DAY",
  "price": 0,
  "nodeSecretMode": "PREDEFINED",
  "active": true
}
```

### Integration Walkthrough

**Trial signup and license validation:**

```
User downloads software, launches first time
  ↓
App prompts for email; shows "Start 14-Day Free Trial"
  ↓
Backend creates Licensee record + issues Try & Buy license
  POST /licensee (email=user@example.com)
  POST /license (templateNumber=TRIAL-14DAY, nodeSecret=computed_device_fingerprint)
  ↓
App calls GET /validate
  ↓
Response: {valid: true, expiresIn: 14 days, features: [all]}
  ↓
App grants full feature access for 14 days
```

**Trial expiration and upgrade flow:**

```
Day 14: License expires
  ↓
On next app launch, GET /validate returns {valid: false, expired: true}
  ↓
App displays: "Trial ended. Upgrade to Professional for $299/year"
  ↓
User clicks "Upgrade" → NetLicensing Shop → Stripe payment
  ↓
On payment success:
  POST /license (templateNumber=PROFESSIONAL, nodeSecret=same_device_fingerprint)
  ↓
License issued; app relaunches validation, now returns {valid: true, expiresIn: 365 days}
```

**A/B testing cohorts:**

The vendor created two user cohorts during signup:

- Cohort A (50%): 14-day trial, all features → measure urgency-based conversion
- Cohort B (50%): 30-day trial, all features → measure extended trial impact

NetLicensing validation responses included cohort ID and trial start date, allowing the vendor's analytics to compare:

- Cohort A: 14-day users → 42% conversion rate
- Cohort B: 30-day users → 38% conversion rate (longer trial may reduce urgency)

Result: vendor optimized trial to 14 days, increasing conversion 34%.

### Licensee Management

A Licensee = a user account (email-based):

- Created on app first launch when user enters email
- Licensee record stored in NetLicensing with `licenseeNumber = email`
- Same user on different devices → different Licensee records (each device is a separate node-locked license)

For Professional/Teams licenses supporting 3+ devices, the vendor creates multiple licenses per Licensee (one per device), all synced to the same account. Device management is handled via the app's settings panel, which calls NetLicensing to list and deactivate device licenses.

### Shop & Payment Integration

Trial-to-paid conversion happens via NetLicensing Shop:

1. User's trial license expires
2. App displays upgrade button → generates shop token via `POST /shop-token`
3. Shop token includes user email + expired license ID
4. User directed to NetLicensing Shop (white-labeled)
5. Stripe processes payment
6. On success, Shop backend creates new paid license (Personal/Professional/Teams)
7. Shop redirects back to app with success message
8. App refreshes license validation; paid license is now active

### Edge Cases & Best Practices

- **Device fingerprinting stability:** Use combination of MAC address, OS UUID, and volume serial (not just MAC) to survive minor OS updates; recompute fingerprint quarterly and warn users if device hardware changes significantly.
- **Trial reset attempts:** If app detects system clock was set back, revoke trial and block further use without escalation to support (security against exploit).
- **License transfer (new device):** User replaces laptop → old device license becomes invalid. Implement device deactivation flow: user deactivates old device via app settings, which calls `PUT /license/{id}` to mark inactive, freeing license slot on Professional plan.
- **License grace period:** After expiration, permit 3-day grace period with nag screen; after 3 days, full access block until renewal or upgrade.
- **Usage telemetry for product insights:** Log feature usage (which tools opened, for how long) during trial and send to product team; this revealed that 80% of trial users never opened "Advanced Export" feature, leading to UI redesign.
- **Chargeback prevention:** Track trial abuse patterns (account created, trial immediately upgraded to annual plan, then chargeback); flag for manual review if pattern detected.

### Results & Outcome

- Unauthorized multi-device usage eliminated through node-locked binding; serial sharing completely ineffective
- Trial-to-paid conversion improved 34% after A/B testing optimized trial duration from 30 to 14 days
- Revenue recovery from previously unlicensed multi-device users; estimated 25% of baseline revenue was previously lost to sharing
- Product team gained actionable insights into feature adoption during trial (identified underused features, drove roadmap prioritization)
- Support ticket volume for licensing decreased 70% (trial reset requests, activation issues eliminated; self-service Shop reduced manual upgrades)
- Reduced CAC payback period from 18 months to 8 months due to higher trial-to-paid conversion and decreased support overhead

