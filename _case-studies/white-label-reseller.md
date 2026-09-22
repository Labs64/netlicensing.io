---
layout: casestudy
title: "White-Label & Reseller Distribution: Partner-Driven License Provisioning"
description: "Empower resellers and OEM partners to provision and manage end-customer licences under your entitlement umbrella"
permalink: "/case-studies/white-label-reseller/"
img: "/img/case-studies/netlicensing-case-study-white-label-reseller.png"
tags:
- Case Studies
- Use Cases
- Channel Partner Program
- White-Label
- Reseller Management
industry:
- Software Vendor / Channel Partner Program
use-case:
- Reseller management
- White-label licensing
- Partner provisioning
- Revenue sharing
favorite-feature:
- Licensing Model "Multi-Tenant"
- Licensing Model "Subscription"
- Revenue Sharing
---

### Overview

An enterprise workflow automation platform enables organizations to build no-code business process automations. The platform serves as both a direct SaaS offering and a white-label component embedded in partners' solutions (accounting software, HR platforms, supply chain systems).

The company built a strong channel ecosystem: dozens of resellers and OEM partners integrated the platform into their products and sold it under their own brands. However, the partnership model was operationally inefficient. Every time a partner needed to provision a license for an end customer, they submitted a manual request to the vendor's operations team, which processed it over 2–3 days. This created friction, slowed deal closure, and frustrated partners who couldn't move independently.

Additionally, the vendor lacked visibility into partner revenue and license utilization, making commission calculations manual and error-prone. Partners wanted autonomy; the vendor wanted control over entitlements and compliance visibility. NetLicensing solved this by enabling partner self-service provisioning within a centralized entitlement framework.

### Licensing Challenge

Manual license provisioning created three operational bottlenecks:

1. **Deal delays**: Partners couldn't close deals without waiting for the vendor's operations team. A 2–3 day turnaround in a competitive RFQ process meant lost deals.
2. **No partner autonomy**: Partners felt like second-class citizens, unable to manage their own customer relationships. Requests piled up, response times slipped, and partner satisfaction declined.
3. **Opaque revenue tracking**: License sales went through partners, but the vendor had no real-time visibility into which partner sold to whom, at what price, or which end-customer features were active. Commission calculations required manual reconciliation of spreadsheets from multiple partners, leading to disputes and audit costs.

The company needed to delegate day-to-day license operations to partners (allowing them to create end-customer licenses and manage renewals independently), maintain centralized control over entitlement policies and feature definitions (no partner could weaken security or create unlicensed access), enable partners to set their own customer-facing pricing while the vendor tracked wholesale consumption, and provide end customers with a fully white-labeled experience (no vendor branding visible in the licensing flow).

### Chosen Licensing Model

The company implemented **Subscription** licensing within a **multi-tenant architecture**. Each reseller and OEM partner was registered as a distinct Product in NetLicensing. Partners inherited the vendor's master License Templates (which defined feature tiers and entitlements) but operated independently within their Product namespace.

This model enabled:

- **Partner delegation**: Partners received API credentials scoped to their Product, allowing them to create Licensees (end customers) and issue licenses without touching the vendor's core entitlements.
- **Feature consistency**: The vendor defined master templates once; partners instantiated them for their customers, ensuring identical features across all channels.
- **Revenue tracking**: Every license issued by a partner was visible to the vendor in NetLicensing's reports, enabling automated commission calculations and revenue recognition.
- **Pricing flexibility**: Partners could set their own customer-facing prices and billing terms. NetLicensing tracked the wholesale transaction, and the vendor applied its standard commission (e.g., 30% of retail price to the vendor, 70% to the partner).

### NetLicensing Configuration

**Multi-tenant product structure:**

```
Organization: VendorCorp
├── Product: PartnerA_WhiteLabel (partner #1)
│   ├── Module: Subscription Plans
│   │   ├── Template: Starter (shared master template)
│   │   ├── Template: Pro (shared master template)
│   │   └── Template: Enterprise (shared master template)
│   └── Licensees: EndCustomer_A1, EndCustomer_A2, ...
├── Product: PartnerB_OEM (partner #2)
│   ├── Module: Subscription Plans
│   │   ├── Template: Starter (same shared template)
│   │   ├── Template: Pro (same shared template)
│   │   └── Template: Enterprise (same shared template)
│   └── Licensees: EndCustomer_B1, EndCustomer_B2, ...
└── Product: DirectSales_Channel
    ├── Module: Subscription Plans
    ├── Licensees: DirectCustomer_1, DirectCustomer_2, ...
```

**Master template definitions** (defined once by vendor, used by all partners):

| Template | Price to Vendor | API Calls/mo | Automations | Audit Log |
|----------|-----------------|-------------|------------|-----------|
| Starter | $30 (wholesale) | 100,000 | 10 | Standard |
| Pro | $100 (wholesale) | 1,000,000 | Unlimited | Detailed |
| Enterprise | Custom | Unlimited | Unlimited | Detailed + HIPAA |

**Configuration snippet** (master template, created once):

```json
{
  "licenseTemplate": {
    "number": "LT_STARTER_RECURRING",
    "name": "Starter Plan (Recurring)",
    "licenseType": "TIMEVOLUME",
    "timeVolume": "1",
    "timeVolumePeriod": "MONTH",
    "price": "30.00",
    "automatic": false
  }
}
```

Each partner's Product inherited this template. When a partner issued a license to an end customer, the template's feature definitions and entitlements were locked in; the partner couldn't modify the feature set (ensuring vendor compliance).

### Integration Walkthrough

**Partner provisioning workflow:**

```
Partner Admin Panel
    ↓
Partner selects end customer + plan (Starter/Pro/Enterprise)
    ↓
Partner's app calls: POST /licensee (create end customer)
{
  "number": "PARTNER_A:ENDCUSTOMER_123",
  "name": "Acme Corp"
}
    ↓
NetLicensing returns: licenseeNumber (e.g., "ENDCUST_ABC")
    ↓
Partner's app calls: POST /license (assign plan)
{
  "licenseeNumber": "ENDCUST_ABC",
  "licenseTemplateNumber": "LT_PRO_RECURRING",
  "startDate": "2026-04-19"
}
    ↓
License is issued; end customer's app validates immediately
    ↓
GET /licensee/ENDCUST_ABC/validate
Response: valid, plan=Pro, features=[automations, api_calls_1m, audit_log]
    ↓
End customer's app grants feature access; no vendor branding shown
```

**Vendor visibility (read-only):**

The vendor's operations team had separate API credentials with read-only access to all Products, enabling compliance audits and support escalation without disrupting partner operations:

```
GET /licensee?product=PartnerA_WhiteLabel
→ returns all end customers under Partner A
→ vendor can see license types, expiry dates, usage

GET /license?licenseTemplate=LT_PRO_RECURRING
→ returns all Pro licenses across all partners
→ vendor can calculate total wholesale revenue
```

### Licensee Management

Each end customer (company or individual) was registered as one Licensee in NetLicensing, created by the partner via API. The partner's internal identifier was stored in the Licensee's `name` field for reconciliation.

**Auto-provisioning** was disabled for partners: each license required explicit provisioning, allowing partners to control onboarding timing and billing start dates. When a partner created a Licensee and issued a license, the end customer's app immediately called `validate` and activated the licensed features.

For enterprise partners with hundreds of end customers, bulk provisioning APIs were provided (e.g., `POST /license` with a CSV payload), reducing API call overhead. Partners typically provisioned licenses at customer signup time or upon payment confirmation in their own billing system.

### Edge Cases & Best Practices

- **Brand isolation**: End customers never saw the vendor's name or branding in the licensing flow. Shop tokens were white-labeled; expiry notifications came from the partner, not the vendor. This required careful API scoping so partners couldn't accidentally expose vendor infrastructure.
- **License transfers**: If an end customer changed partners (rare but happened), the vendor's operations team transferred their license from one partner's Product to another, preserving license history and data.
- **Grace period**: A 7-day grace period after subscription expiry prevented accidental service interruption from delayed partner renewals. After 7 days, the license transitioned to a read-only mode, then deactivated.
- **Audit trail**: Every license issued, renewed, or transferred was logged with the partner's identity, enabling vendor compliance and chargeback resolution if a partner issued fraudulent licenses.
- **Overage handling**: Partners could configure "overage pricing" (e.g., additional API calls at $0.001/call) within their templates. Overages were tracked by NetLicensing and reported to both partner and vendor.
- **Credential rotation**: Partner API credentials were scoped to their Product namespace and expired quarterly, requiring partner cooperation on renewal to prevent unauthorized license creation.

### Results & Outcome

- **License provisioning time** dropped from 2–3 days to instant. Partners could close deals and activate customer licenses within minutes, directly improving deal velocity.
- **Vendor operations headcount** was reduced by 40%. The operations team shifted from manual provisioning to compliance auditing and strategic partner support, higher-value work.
- **Partner satisfaction** improved dramatically; partners gained autonomy and no longer felt bottlenecked by the vendor's internal processes.
- **Revenue visibility** became real-time. The vendor could see which partner sold to which customer, at what price, and track wholesale license consumption for automated commission payouts. Commission disputes dropped by 95%.
- **Channel sales velocity** accelerated. Partners closed deals 5–7 days faster on average, improving win rates in competitive situations.
- **Compliance and audit** capabilities were maintained: the vendor retained read-only visibility across all partner Products, enabling SOC 2 audits, license compliance checks, and fraud detection without interfering with partner operations.
- **New partner onboarding** time decreased from 3–4 weeks (manual setup, training, process documentation) to 2–3 days (API credentials issued, master templates inherited, partner testing in sandbox environment).
