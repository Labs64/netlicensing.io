---
layout: casestudy
title: "eSIM Telecommunications: Remote Carrier Feature Activation"
description: "A mobile network operator enabled on-demand carrier feature activation and service plan management for eSIM-enabled devices using Feature-Based licensing."
permalink: "/case-studies/esim-features-enablement/"
img: "/img/case-studies/netlicensing-case-study-esim-features-enablement.png"
tags:
- Case Studies
- Use Cases
- Telecommunications
- eSIM
- Feature Activation
industry:
- Telecommunications / Mobile Network Operators
use-case:
- eSIM profile management
- Remote feature activation
- Carrier service enablement
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Node-Locked"
- Remote License Management
---

### Overview

A mobile network operator (MNO) expanded into the eSIM market, replacing traditional physical SIM cards with remote provisioning to smartphones, tablets, wearables, and IoT devices. eSIM technology unlocked the potential for instant profile provisioning and dynamic service plan changes, but the operator lacked a flexible entitlement system to manage granular carrier features across diverse device types. Network capability features—5G access, international roaming, mobile hotspot, premium data speeds, edge computing—needed to be independently licensable so customers could purchase the exact capabilities they needed rather than fixed all-or-nothing service tiers.

NetLicensing's Multi-Feature + Node-Locked licensing model enabled the operator to bind entitlements to individual eSIM profiles and devices, offer dynamic feature add-ons via self-service, and generate new revenue streams from on-demand feature purchases like travel roaming packages and temporary data boosts. The result was a dramatically improved customer experience, faster time-to-market for new services, and significant operational cost reduction by eliminating manual provisioning workflows.

### Licensing Challenge

The operator's legacy approach relied on manual provisioning of service tiers tied to eSIM profiles:

- **Manual activation delays:** Customer purchases a service plan; provisioning team manually configures the eSIM profile, applies service policies, and enables features in the network. Process took hours; customers couldn't access new features immediately after purchase.
- **Rigid service plans:** Operators offered pre-defined bundles (Starter, Pro, Enterprise) with fixed feature sets. Customers wanting to add a single feature (e.g., international roaming to one device) had to upgrade to the next tier, paying for unneeded capabilities.
- **No feature granularity:** Toggling individual features on/off for a specific eSIM profile required manual network operator intervention or complex backend API calls with no self-service portal.
- **Roaming provisioning friction:** Traveling customers wanting to activate international roaming had to contact support or navigate complex menu options; no self-service mechanism existed.
- **No mid-life upsells:** Customers locked into their chosen tier for the billing period; the operator missed opportunities to sell temporary upgrades (e.g., "double your data for 1 week" for $5).

### Chosen Licensing Model

**Multi-Feature License Model** — each carrier feature is independently licensable. Features (5G access, roaming, hotspot, premium speeds, edge computing) can be purchased individually or in bundles, giving customers fine-grained control. **Node-Locked License Model** — entitlements are bound to individual eSIM profiles and device identifiers (IMEI), preventing unauthorized feature sharing across devices.

```
eSIM Multi-Feature Model:
eSIM Profile EID: 89-0000-0000-0000-0001
Device IMEI: 123456789012345

Licensed Features:
├─ Feature: Domestic Data (always included)
├─ Feature: 5G Access (licensed, active)
├─ Feature: International Roaming (licensed, active)
├─ Feature: Mobile Hotspot (not licensed)
└─ Feature: Premium Speeds (not licensed)

Customer purchases hotspot → activates license
Next network validation → feature enabled
```

### NetLicensing Configuration

**Product & Module Setup:**
- **Product:** "MobileNetworkServices"
- **Module:** "Carrier Features" (licensing model: Multi-Feature + Node-Locked)
- **License Templates (one per feature):**
  - `DOMESTIC_DATA` — included with all plans, always active
  - `5G_ACCESS` — $10/month, enables 5G network connectivity
  - `INTERNATIONAL_ROAMING` — $15/month, allows usage in 200+ countries
  - `MOBILE_HOTSPOT` — $5/month, tethering capability
  - `PREMIUM_SPEEDS` — $8/month, prioritized data queue (lower latency)
  - `EDGE_COMPUTING` — $20/month, edge MEC services (enterprise tier)

**Key Parameters:**
- `nodeSecretMode=PREDEFINED` — EID + IMEI composite key identifies the eSIM-device binding
- `timeVolume=1`, `timeVolumePeriod=MONTH` — monthly subscription for each feature
- `price` — per-feature cost
- `currency=USD`

**ASCII Configuration:**
```
Product: MobileNetworkServices
└── Module: Carrier Features (Multi-Feature, Node-Locked)
    ├── Template: DOMESTIC_DATA (included)
    ├── Template: 5G_ACCESS ($10/mo)
    ├── Template: INTERNATIONAL_ROAMING ($15/mo)
    ├── Template: MOBILE_HOTSPOT ($5/mo)
    ├── Template: PREMIUM_SPEEDS ($8/mo)
    └── Template: EDGE_COMPUTING ($20/mo)

eSIM EID: 89-0000-0000-0000-0001 (iPhone 14)
Active Licenses:
├─ DOMESTIC_DATA
├─ 5G_ACCESS
└─ INTERNATIONAL_ROAMING
```

### Integration Walkthrough

**Integration Points:**
- **At eSIM provisioning:** Operator provisions eSIM profile with EID; cloud platform registers it as NetLicensing Licensee with node_secret = (EID + IMEI).
- **On device network registration:** Device validates licenses with `GET /licensee/{eid+imei}/validate` to retrieve active feature set.
- **On customer purchase (self-service):** Mobile app calls `POST /licensee/{eid+imei}/license` to activate feature; NetLicensing updates backend entitlements.
- **Periodic validation:** Device validates licenses every 24 hours or on network reattach to detect feature changes (additions or removals).

**High-Level Flow:**
```
Customer opens mobile app
    ↓
Navigates to "Add Features"
    ↓
Sees available features with pricing:
  5G Access $10/mo, Roaming $15/mo, Hotspot $5/mo, etc.
    ↓
Selects "Add International Roaming"
    ↓
App calls POST /licensee/{eid+imei}/license
     licenseTemplate=INTERNATIONAL_ROAMING
     (generates charge via payment method on file)
    ↓
NetLicensing creates license
    ↓
App returns success → "Roaming enabled"
    ↓
On next network validation (or immediate for high-priority features):
GET /licensee/{eid+imei}/validate
    ↓
Response includes: [DOMESTIC_DATA, 5G_ACCESS, INTERNATIONAL_ROAMING]
    ↓
Network infrastructure (HSS/SPR) applies service policies:
  if (INTERNATIONAL_ROAMING) → enable_roaming_services()
    ↓
Customer can now use roaming internationally
```

**Trial Feature Workflow:**
```
Customer traveling to Japan → needs roaming
    ↓
App offers "Try Roaming (7-day trial) $0"
    ↓
Customer clicks "Start Trial"
    ↓
App calls POST /licensee/{eid+imei}/license
     licenseTemplate=ROAMING_7DAY_TRIAL
    ↓
NetLicensing creates time-volume license (7 days)
    ↓
Day 8: license expires → roaming disabled
    ↓
Customer receives notification: "Trial expired. Upgrade to permanent roaming?"
     (link to purchase flow)
    ↓
If customer purchases INTERNATIONAL_ROAMING ($15/mo),
prior trial license is revoked, permanent license activated
```

### Licensee Management

Each eSIM profile deployed in the field is registered as a NetLicensing Licensee. The Licensee identifier is a composite of the eSIM's EID (eUICC Identifier) and the device's IMEI: `EID-IMEI` (e.g., `89000000000000000001-123456789012345`). This binding ensures that features licensed for a specific eSIM-device pair cannot be used on other devices, preventing unauthorized feature sharing.

When a customer purchases a feature or activates a trial, the operator's backend calls the NetLicensing API to create a License under that Licensee. On the device's next network validation (or immediately for critical features), the network retrieves the updated license list and applies service policies accordingly.

For customer changes (e.g., eSIM transferred to a new device), the operator can call the transfer API to re-bind the Licensee to the new IMEI, or simply deactivate all licenses on the old IMEI and create new ones on the new IMEI.

### Shop & Payment Integration

The operator integrates a mobile app and web portal for self-service feature management, powered by NetLicensing Shop.

```
In-App Feature Purchase Flow:
1. Customer opens "Manage Plan" section in mobile app
2. App displays available features with pricing
3. Customer selects "Add 5G Access" ($10/month)
4. Mobile app backend generates NetLicensing Shop token:
   POST /shop/token
   {
     licenseeNumber: "89000000000000000001-123456789012345",
     licenseTemplate: "5G_ACCESS",
     successUrl: "app://feature-activated/5G_ACCESS",
     cancelUrl: "app://manage-plan"
   }
5. Shop returns one-time token & URL
6. App opens Shop in WebView with payment form
7. Customer enters card details (or uses saved payment method)
8. Shop processes payment, creates license
9. Shop redirects to successUrl
10. Mobile app receives notification: license active
11. App displays "5G Access enabled on this device"
12. Next network validation loads new feature
```

For temporary promotional offers (e.g., "Double your data for 7 days for $5"):
```
1. App displays "Limited-time offer" banner
2. Customer taps "Activate offer"
3. App creates time-volume license (7 days) via POST /licensee/.../license
4. Charge $5 to account
5. Data cap doubles for 7 days
6. Day 8: NetLicensing auto-expires license
7. Data cap reverts to normal
8. Customer receives email: "Your data boost offer expires in 2 days"
   (link to re-activate offer)
```

### Edge Cases & Best Practices

- **Roaming Feature Geofencing:** Combine NetLicensing feature licensing with device GPS or network cell location. Feature is only enabled when device is outside home country, preventing accidental roaming charges.
- **Multi-Device Feature Sharing (Limited):** Some premium features (e.g., EDGE_COMPUTING) should be shareable across multiple eSIM profiles under the same customer account. Create a parent Licensee for the customer account and sub-Licensees for each eSIM; apply per-account feature licenses with device-level enforcement.
- **Automatic Feature Downgrade on Low Balance:** For prepaid customers, automatically disable premium features (PREMIUM_SPEEDS, EDGE_COMPUTING) if account balance falls below a threshold, preventing overages. Re-enable automatically when balance is restored.
- **Roaming Package Bundles:** Offer time-limited roaming packages (e.g., "Japan 7-day unlimited roaming $30"). Create ROAMING_JAPAN_7DAY as a time-volume license template with automatic expiration and renewal prompts.
- **Feature Upsell During Call:** If a customer attempts to use roaming while the feature is not licensed, intercept at network policy enforcement level and display an in-app offer: "Roaming not active. Activate for $15/month?"
- **Audit & Transparency:** Log all feature activations, expirations, and price changes. Provide customers with a "Feature Usage Summary" dashboard showing active features, renewal dates, and cost breakdown.

### Results & Outcome

- **Customer onboarding time reduced from 2–4 hours (manual provisioning) to 5 minutes (self-service eSIM provisioning):** Customers can provision eSIM and activate features entirely within the mobile app.
- **Feature activation became instant and API-driven:** Zero manual provisioning delays; features are enabled on next network validation (typically within minutes).
- **New revenue streams emerged from on-demand feature purchases:** Travel roaming packages, temporary data boosts, and premium service trials generated 30% additional ARPU (average revenue per user).
- **Customer satisfaction improved:** Self-service feature management and transparent per-feature pricing reduced support escalations by 67%; customers appreciated granular control over their entitlements.
- **Operational costs reduced by 55%:** Manual eSIM provisioning, network configuration, and customer support were fully automated via NetLicensing and integrated backend systems.
- **Time-to-market for new services accelerated:** New carrier features could be deployed as NetLicensing license templates without network infrastructure changes; go-to-market cycle reduced from weeks to days.
