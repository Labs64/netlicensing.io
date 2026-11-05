---
layout: casestudy
title: "SaaS Seat & Team Management: Unified Entitlement Across Organizations"
description: "How a B2B collaboration tool can sell named seats per organisation with Quota, add shared guest access with Floating, and let admins move seats between teams without support."
permalink: "/case-studies/saas-seat-team-management/"
img: "/img/case-studies/netlicensing-case-study-saas-seat-team-management.png"
tags:
- Case Studies
- Use Cases
- B2B SaaS
- Team Collaboration Platform
- Seat Management
industry:
- B2B SaaS / Team Collaboration Platform
use-case:
- Seat provisioning
- Team management
- Guest access
favorite-feature:
- Licensing Model "Quota"
- Licensing Model "Floating"
- Licensing Model "Subscription"
---

### Challenge

A company makes a project collaboration tool for engineering and construction firms. Customers pay per user. Their organisations have departments, project teams and lots of external people: subcontractors, architects, clients who need to look at a plan now and then.

Seats were a quantity on the customer's Stripe subscription. Moving ten seats from one department to another meant a support ticket. External people needed a full paid seat even if they logged in twice a month, so customers shared logins instead, which nobody liked.

The vendor wanted two things: a seat count the customer's admin could manage alone, and a cheaper way to let occasional guests in.

### Approach

Each customer organisation is a licensee. The product has three modules:

```
Product: SiteCollab
├── Module "Plan" – Subscription
│   └── Year: TIMEVOLUME 1 YEAR
├── Module "Seats" – Quota
│   └── Seat pack: QUANTITY, quantity = 10
└── Module "Guest access" – Floating, maxCheckoutValidity = 3600 s
    └── Guest pool: FLOATING, maxSessions = 5
```

**Named seats.** [Quota](https://netlicensing.io/wiki/quota) returns the number of seats an organisation has bought: the sum of all its active seat packs. Quota doesn't count users. That's deliberate, because only the collaboration tool knows who is a member. When an admin invites someone, the tool counts the organisation's active members and compares that with the quota. How the admin spreads those seats across departments and teams is entirely up to them. Moving a seat from one team to another is a change in the tool, with no license involved, so nobody files a ticket.

**Guests.** External people don't take a named seat. When a guest opens a shared project, the tool checks out a session from the [Floating](https://netlicensing.io/wiki/floating) guest pool. When they leave, it checks the session back in. An organisation with a pool of five can have any number of invited guests, as long as no more than five are active at the same time. If a guest closes the browser without logging out, the session is freed after an hour.

**Plan.** A yearly [Subscription](https://netlicensing.io/wiki/subscription) keeps everything running, and its `expires` date is the organisation's renewal date.

When an admin opens the member settings or invites someone, the tool validates the organisation:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/ORG-BAUWERK-AG/validate
```

The result contains the plan's `valid` and `expires`, the seat `quota`, and the guest pool state. The member settings show "38 of 40 seats used", which is the tool's own count against NetLicensing's quota.

A guest session is a separate, short call with `productModuleNumber0`, `sessionId0` (the guest's user ID plus the browser session) and `action0=checkOut` or `checkIn`.

#### Buying more

"Add seats" and "Add guest capacity" open the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) with a shop token for the organisation. A new seat pack adds to the quota as soon as it's bought, and a [webhook](https://netlicensing.io/wiki/notifications) on `LICENSE_CREATED` refreshes the tool's cached result. Large customers with a framework contract get their seat packs created by the vendor's sales team in the [Management Console](https://ui.netlicensing.io).

When a customer reduces seats at renewal, sales sets one seat pack to `active=false`. The quota drops, and the tool asks the admin to remove members until they're within the new limit.

### Results

- Admins manage named seats across teams themselves. The number they've paid for comes from NetLicensing.
- Occasional guests use a shared pool of concurrent sessions instead of paid named seats or shared logins.
- Buying more seats or guest capacity is self-service and takes effect immediately.
- Plan, seats and guests are checked with one validation per organisation.

Managing seats in a B2B product? See the [SaaS licensing guide](https://netlicensing.io/wiki/saas-licensing) or [contact us](https://netlicensing.io/contact/).
