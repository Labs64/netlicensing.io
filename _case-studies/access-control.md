---
layout: casestudy
title: "Physical Security: Feature-Based Access Control with Time-Limited Permissions"
description: "How a building operator can tie tenant amenities to Multi-Feature licenses and give contractors passes that expire on their own with the Subscription model."
permalink: "/case-studies/access-control/"
img: "/img/case-studies/netlicensing-case-study-access-control.png"
tags:
- Case Studies
- Use Cases
- Physical Security
- Access Control
- Network Security
industry:
- Physical Security / Network Infrastructure
use-case:
- Access control
- Resource gating
- Permissions management
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Subscription"
- Licensing Model "Rental"
---

### Challenge

A company runs several multi-tenant office buildings. Tenants book a package that decides what their staff can use: the main entrance, the garage, the gym, meeting rooms, a faster network segment. Contractors and visitors need access for a few days and then none at all.

The badge system only knew three fixed access levels. Anything finer was done by hand:

- Moving a tenant to a bigger package meant reprogramming every badge of that tenant.
- A contractor's three-day pass needed a calendar reminder so someone would remember to switch it off. Sometimes nobody did.
- Reserved parking spaces were tracked in a spreadsheet, apart from the gate system.

The operator wanted the packages defined in one place and access to stop on its own when it should.

### Approach

The operator's access control server is the only system that talks to NetLicensing. Badge readers and network switches ask that server, and the server asks NetLicensing. Each tenant company is a licensee. Each contractor or visitor gets their own licensee too.

```
Product: Building Access
├── Module "Amenities" – Multi-Feature
│   └── FEATURE templates: ENTRY, GARAGE, GYM, MEETING, NET-PLUS
├── Module "Passes" – Subscription
│   └── TIMEVOLUME templates: 1 day, 3 days, 7 days (timeVolumePeriod = DAY)
└── Module "Parking" – Rental
    ├── FEATURE template: Reserved space (one license per space)
    └── TIMEVOLUME template: 1 month per space
```

**Amenities.** In the [Multi-Feature](https://netlicensing.io/wiki/multi-feature) model, every license template is a feature, and its number is the feature ID. A tenant on the Basic package has ENTRY and MEETING licenses. Premium adds GARAGE, GYM and NET-PLUS. Moving a tenant up means adding licenses in the Console. Moving them down means setting `active=false` on the extra ones. The badges stay as they are.

**Contractor passes.** For a contractor, the operator's back end creates a licensee and gives it a [Subscription](https://netlicensing.io/wiki/subscription) license with a start date:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "licenseeNumber=CTR-2026-0412" \
  -d "licenseTemplateNumber=PASS-3DAYS" \
  -d "startDate=2026-11-10T07:00:00Z" \
  https://go.netlicensing.io/core/v2/rest/license
```

Three days later, validation for that licensee returns `valid=false` for "Passes", and the gates stop opening. Nobody has to remember anything. If the job runs longer, the back end adds another pass that starts when the first one ends.

**Reserved parking.** The [Rental](https://netlicensing.io/wiki/rental) model licenses several copies of one thing, each for its own period. Each reserved space is a FEATURE license. Monthly TIMEVOLUME licenses extend a space via `parentFeature`. Validation returns each space with `valid`, `expires` and a green, yellow or red `expirationWarningLevel`, so the operator sees which spaces are about to lapse.

#### Checking access

When a badge is presented, the access server finds the licensee behind it and validates:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/TENANT-0312/validate
```

The response has one entry per module. For "Amenities" it lists every feature with `valid=true` or `false`. The server opens the garage gate only if GARAGE is valid. It sets the network switch port to the faster segment only if NET-PLUS is valid.

The server caches each result until its `ttl`. A badge swipe never waits for the internet, and a short outage doesn't lock people out of their offices. The flip side: a revoked pass stops working at the end of the cached period at the latest. The operator chooses a short TTL in the NetLicensing settings for that reason.

#### Billing

Tenants have contracts and are invoiced by the operator's own accounting system, so the NetLicensing Shop isn't needed here. All licenses are created at price 0 through the API or the [Management Console](https://ui.netlicensing.io).

### Results

- Packages are defined once, as feature sets in NetLicensing. Changing a tenant's package changes its licenses, not its badges.
- Contractor and visitor passes end on their own date. Revoking one early means deactivating a single license.
- Reserved parking spaces have their own expiry dates and warning levels instead of a spreadsheet.
- Readers and switches don't hold any licensing logic. They ask the access server, which asks NetLicensing.

Want to try a similar setup? [Talk to us](https://netlicensing.io/contact/) or [create a free account](https://ui.netlicensing.io/#/register).
