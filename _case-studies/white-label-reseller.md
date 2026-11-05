---
layout: casestudy
title: "White-Label & Reseller Distribution: Partner-Driven License Provisioning"
description: "How a SaaS vendor can let resellers provision their own end customers through the API, sell renewal codes in their own shops with license transfer, and bill partners from per-partner license data."
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
favorite-feature:
- API Key Roles
- License Transfer
- Licensing Model "Subscription"
---

### Challenge

A company makes a no-code workflow automation platform. It sells some subscriptions directly, but most go through about thirty resellers. Many of them offer the platform under their own brand, as part of their consulting or IT services.

Every reseller sale started with an email to the vendor's operations team: "please set up customer X with plan Y". That took a day or two, which is a long time when a reseller is in the middle of closing a deal. At the end of each quarter, operations matched those emails against reseller reports to work out what each partner owed. And resellers who sold renewals in their own web shops had no way to deliver them, other than another email.

### Approach

Each end customer is a licensee, whichever channel it came from. The plans are the same for everyone:

```
Product: FlowBuilder
└── Module "Plan" – Subscription
    ├── Team, 1 year:     TIMEVOLUME 1 YEAR
    └── Business, 1 year: TIMEVOLUME 1 YEAR
```

#### Resellers provision their own customers

Every reseller gets its own API key with the role `ROLE_APIKEY_OPERATION`, as described in the [reseller FAQ](https://netlicensing.io/wiki/faq-reseller). With it, the reseller's CRM or provisioning script creates the customer and the plan at the moment of sale:

```bash
curl -u apiKey:RESELLER_API_KEY -H "Accept: application/json" \
  -d "number=RS14-ACME-LOGISTICS" -d "productNumber=FLOWBUILDER" \
  -d "partner=RS14" \
  https://go.netlicensing.io/core/v2/rest/licensee

curl -u apiKey:RESELLER_API_KEY -H "Accept: application/json" \
  -d "licenseeNumber=RS14-ACME-LOGISTICS" -d "licenseTemplateNumber=TEAM-1Y" \
  -d "startDate=2026-11-05T00:00:00Z" -d "partner=RS14" \
  https://go.netlicensing.io/core/v2/rest/license
```

The licensee number starts with the reseller's code, and `partner` is saved as a [custom property](https://netlicensing.io/wiki/custom-properties) on both the licensee and the license. The customer can start working right away. Resellers bill their customers themselves, under their own brand and at their own prices. NetLicensing doesn't appear in that relationship at all.

Because every reseller has its own key, the vendor can revoke one reseller's access without affecting the others.

#### Renewal codes from a reseller's web shop

Some resellers sell renewals in their own online shops, which don't know the customer's licensee number. For them, the [license transfer](https://netlicensing.io/wiki/transferring-licenses-between-licensees) feature helps. When a renewal is sold, the reseller's shop creates a temporary licensee with the renewal license on it, marks it with `markedForTransfer=true`, and gives the customer that temporary licensee number as a "renewal code".

The customer enters the code in the platform's settings, and the platform moves the licenses to the customer's real licensee:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "sourceLicenseeNumber=RENEW-7KQ2-M9XD" \
  https://go.netlicensing.io/core/v2/rest/licensee/RS14-ACME-LOGISTICS/transfer
```

The transfer works only for licensees marked for transfer, so a customer can't move licenses away from someone else's account.

#### Billing resellers

At the end of each month, the vendor's billing job lists the licenses created in that month, groups them by the `partner` property, and invoices each reseller the wholesale price. Commission terms and invoices live in the vendor's accounting system. NetLicensing provides the record of what each partner provisioned.

Direct customers go through the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) as usual. The platform validates every customer the same way, whether it came direct or through a reseller.

### Results

- Resellers set up customers from their own systems immediately, without waiting for the vendor's operations team.
- Resellers keep their brand, prices and billing relationship with their customers.
- Renewals sold in resellers' web shops reach the right customer through renewal codes and license transfer.
- The vendor bills each reseller from license data tagged with the partner, instead of matching emails against reports.

Running a reseller or white-label channel? [Contact us](https://netlicensing.io/contact/) to discuss partner provisioning.
