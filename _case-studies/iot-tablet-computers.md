---
layout: casestudy
title: "Internet of Things: Tablet Computers"
description: "Track essential data including usage, payments, and subscription duration for IoT tablet fleets."
permalink: "/case-studies/iot-tablet-computers/"
img: "/img/case-studies/netlicensing-case-study-iot-tablet-computers-v2.png"
tags:
- Case Studies
- Use Cases
- Subscription
- Internet of Things
industry:
- Hardware
use-case:
- Subscription
- Activation
favorite-feature:
- Licensing Model "Subscription"
- NetLicensing API
---

### Overview

A tablet manufacturer entered the B2B market with a subscription-based hardware leasing model, targeting enterprise field teams (logistics, healthcare, retail field audits). Rather than competing on upfront device cost with commodity tablet vendors, the company offered a holistic solution: tablets pre-loaded with enterprise software, cloud connectivity, managed OS updates, and hardware replacement insurance — all delivered on a monthly or annual subscription. The subscription model eliminated customer hesitation about hardware capital expenditure and provided the manufacturer with predictable recurring revenue. NetLicensing Subscription licensing managed the end-to-end leasing lifecycle: device activation on purchase, automated monthly billings, grace period handling for payment failures, and automatic deactivation when subscriptions expired.

### Licensing Challenge

The company faced a fundamental business model transition challenge:

**Device activation**: When a customer purchased a tablet lease, the device needed to "activate" (become fully functional) only for authorized lessees. Pre-activating all devices at the factory meant inventory in transit was functional but not yet paid for; lost devices represented unrecovered revenue.

**Usage tracking and billing**: The company needed to track which devices were currently under active leases, correlate devices to customers, and automate monthly billing cycles. Manual reconciliation of device-to-subscription mappings was error-prone and delayed invoicing.

**Churn and redeployment**: When customers cancelled subscriptions or missed payments, the company needed to remotely disable leased devices to prevent further usage and enforce cost recovery. Field-deployed devices needed to enforce these constraints locally (on-device) rather than relying on customer cooperation.

**Multi-tier subscription options**: The company wanted to offer flexible lease terms — monthly pay-as-you-go for risk-averse customers, annual commitments with discounts for cost-conscious enterprises — without managing multiple billing systems.

**International expansion**: Multi-currency and multi-timezone support was essential for global leasing; automated invoicing and grace period handling across time zones was non-trivial without centralized subscription management.

### Chosen Licensing Model

The deployment used the **Subscription License Model** exclusively:

- Each device leasing agreement was represented as a Subscription license, with `timeVolume=1`, `timeVolumePeriod=MONTH` for monthly leases or `timeVolume=12`, `timeVolumePeriod=MONTH` for annual agreements
- Recurring payment was tied to license renewal; when payment succeeded, the license term extended automatically
- Grace period parameters (`gracePeriod=14` days) handled payment processing delays and disputes, temporarily extending device access without payment

The model's simplicity — one Licensee per customer, one Subscription license per leased device — made integration straightforward and reduced operational overhead. Renewals were automatic, eliminating manual invoice generation and payment follow-up.

### NetLicensing Configuration

**Entity Structure:**
```
Product: Tablet Leasing Service
└── Module: Tablet Subscriptions (Subscription Model)
    ├── Template: Monthly Lease (timeVolume=1 month, price=79.99)
    ├── Template: Annual Lease (timeVolume=12 months, price=699.99)
    └── Template: Enterprise Fleet Lease (custom terms, price negotiated)
```

**Template Parameters:**
- Monthly: `timeVolume=1`, `timeVolumePeriod=MONTH`, `gracePeriod=14`
- Annual: `timeVolume=12`, `timeVolumePeriod=MONTH`, `gracePeriod=14`
- Automatic renewal: enabled (NetLicensing handles renewal API calls on success)
- Payment method: Stripe connected (automatic monthly charge on file)

**Sample Configuration:**
```json
{
  "number": "TABLET-MONTHLY",
  "name": "Monthly Tablet Lease",
  "licenseType": "TIMEVOLUME",
  "model": "Subscription",
  "price": 79.99,
  "currency": "USD",
  "timeVolume": 1,
  "timeVolumePeriod": "MONTH",
  "gracePeriod": 14,
  "automatic": true
}
```

### Integration Walkthrough

**Device Provisioning on Purchase:**

```
Customer Orders Tablet via Web Portal
        ↓
POST /licensee (create customer account if new)
   { "name": "Acme Corp", "email": "admin@acme.com" }
   → Response: licenseeNumber = I001
        ↓
POST /license (create Subscription for this tablet)
   { "licensee": "I001", "licenseTemplate": "TABLET-MONTHLY", 
     "startDate": "2026-04-19", "active": true }
   → Response: licenseNumber = L001
        ↓
Tablet Fleet Management System Receives Webhook
   "licensee=I001, license=L001 created"
        ↓
Tablet in Warehouse Receives Provisioning:
   ├─ Embedded device ID registered to license L001
   ├─ OS unlocked, enterprise software installed
   └─ Device firmware connects to cloud, retrieves activation token
        ↓
Device Shipped to Customer
        ↓
Customer Unboxes Tablet:
   ├─ First boot validates activation token
   ├─ Token confirmed by manufacturer cloud → device fully functional
   └─ Customer begins using device day 1
```

**Monthly Renewal & Payment:**

```
Day 28 of Subscription (approaching 30-day renewal):
        ↓
NetLicensing Scheduler Triggers Renewal:
   POST /license/{L001}/renew
   [Attempts to charge customer's payment method on file via Stripe]
        ↓
Payment Succeeds:
   ├─ License L001 extended: new validity end date = 30 days from now
   ├─ Tablet receives update notification on next cloud sync
   ├─ Device lifecycle continues uninterrupted
   └─ Customer invoiced
        ↓
OR: Payment Fails (card declined, insufficient funds, etc.):
   ├─ NetLicensing sets license state = GRACE_PERIOD
   ├─ Grace period = 14 days; customer retains access but receives email alert
   ├─ Webhook triggers support ticket for follow-up outreach
   ├─ Customer given 14 days to update payment method
        ↓
After 14-Day Grace Period:
   ├─ If payment still unsuccessful: license expires (INACTIVE)
   ├─ On next device sync: tablet receives deactivation command
   ├─ Device firmware locks: displays message "Subscription Expired"
   ├─ Access to enterprise features revoked (read-only mode only)
   └─ Customer must renew or return device to avoid additional charges
```

**Payment Remediation During Grace Period:**

```
Customer Receives Email: "Your subscription payment failed"
        ↓
Customer Updates Payment Method in Web Portal
        ↓
Portal Calls NetLicensing Update API:
   PATCH /license/{L001}
   { "paymentMethod": "<new_stripe_token>" }
        ↓
Renewal Retry Triggered Immediately
        ↓
Payment Succeeds:
   ├─ License L001 re-activated
   ├─ Grace period cleared
   └─ Tablet receives activation confirmation on next sync
```

**Device Deactivation on Subscription Expiry:**

```
License L001 Expires (no payment, 14-day grace exhausted)
        ↓
NetLicensing Sets License.active = false
        ↓
Fleet Management System Receives Webhook:
   "license=L001 deactivated"
        ↓
Sends Remote Deactivation Command to Tablet:
   [Pushed via cloud or on next device sync]
        ↓
Device Firmware Receives Command:
   ├─ Validates license against NetLicensing
   ├─ License validation returns: EXPIRED
   ├─ Device enters Locked State:
   │  ├─ Enterprise apps remain installed but non-functional
   │  ├─ Device displays "Subscription Expired" lock screen
   │  ├─ Camera, data access, APIs disabled
   │  └─ Read-only access to cached data permitted for customer data recovery
   └─ Send alert back to manufacturer: "Device L001 deactivated"
        ↓
Customer or Manufacturer Can:
   ├─ Reactivate by purchasing new lease: POST /license (new license)
   ├─ Or: retrieve device for redeployment to new customer
   └─ Or: retire device (audit log records device end-of-life)
```

### Licensee Management

Each customer organization was registered as a single Licensee, with `licenseeNumber` tied to their account ID in the manufacturer's CRM.

**Customer Account Creation:**
- On first purchase, a Licensee was created with company name, billing email, and contact information
- Payment method (Stripe card or ACH) was stored securely in Stripe; NetLicensing referenced the Stripe payment method ID
- All subsequent tablet leases for that company were created as separate Subscription licenses under the same Licensee

**Device Tracking:**
- Each tablet received a unique hardware identifier (IMEI, MAC address, or manufacturer serial)
- The identifier was registered in the tablet's firmware and transmitted to NetLicensing on first boot
- Device-to-license mapping was maintained in the fleet management system: tablet IMEI ↔ license number
- This allowed the manufacturer to locate any tablet in the field and query its subscription status

**Fleet Billing:**
- Large customers (enterprises with 50+ tablets) negotiated custom Subscription templates with volume pricing
- Example: "Annual Enterprise Lease: 100 tablets, $69/month/tablet = $82,800/year billed annually"
- Renewal webhooks enabled automated reconciliation: if 100 licenses renewed, the system expected a single $82,800 invoice to the customer

### Edge Cases & Best Practices

- **Payment retry logic**: NetLicensing's renewal system attempted payment 3 times over 14 days (days 28, 30, 32) before entering grace period, accommodating ACH processing delays and transient network failures.
- **Multi-currency invoicing**: For international customers, Stripe's currency conversion was used; NetLicensing invoices reflected the customer's local currency, simplifying reconciliation with their accounting systems.
- **Device trade-in and upgrade**: When customers wanted newer tablet models mid-contract, the manufacturer used NetLicensing's license transfer API to move the active subscription from old device to new device without creating a gap in service.
- **Churn prevention**: As licenses approached expiration, the platform sent automated outreach emails 30 days and 7 days before renewal, with one-click renewal links; this increased renewal rates by 35%.
- **Audit trail for disputes**: All payment attempts, grace periods, deactivations, and reactivations were logged in NetLicensing with timestamps, enabling clear documentation if customers disputed charges.
- **Offline locking enforcement**: For tablets with intermittent connectivity, a signed JWT token (valid for 30 days) was cached locally; if a device remained offline past the token expiry, it self-locked on next boot to prevent unauthorized use after subscription expiry.

### Results & Outcome

- **Revenue model validation**: Subscription revenue proved more predictable and higher lifetime value than one-time device sales; annual customer retention improved to 82%
- **Operational efficiency**: Eliminated manual invoice generation and payment follow-up; finance team reduced from 3 FTE to 0.5 FTE for billing operations
- **Payment recovery**: Grace period automation and timely customer outreach recovered 35% of otherwise-failed renewals, representing significant revenue protection
- **Device fleet visibility**: Manufacturer had real-time visibility into which devices were active, which subscriptions were expiring, and which customers were at churn risk
- **Customer experience**: Transparent subscription terms, automated renewals, and clear communication around payment status reduced support tickets by 40% and improved NPS
- **Scale without complexity**: From 100 devices to 10,000 devices deployed across 200 enterprise customers — all managed through NetLicensing with zero scaling-related incidents
- **Financial reporting**: Automated recurring revenue (ARR) tracking via NetLicensing API integration enabled accurate SaaS metrics for investor reporting and forecasting

