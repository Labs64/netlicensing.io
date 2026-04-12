---
layout: casestudy
title: "SaaS Seat & Team Management: Unified Entitlement Across Organizations"
description: "Provision, transfer, and cap user seats across teams and organisations from a single entitlement layer"
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
- Seat transfers
- Organizational hierarchies
favorite-feature:
- Licensing Model "Subscription"
- Licensing Model "Multi-Feature"
- Licensing Model "Floating"
---

### Overview

A team collaboration platform (similar to Slack, Asana, or Microsoft Teams) manages seat licenses for mid-market and enterprise organizations with complex structures. Enterprise customers have multiple departments, subsidiaries, and temporary contractors—all requiring flexible seat allocation. The platform's billing was initially tied directly to seat subscriptions in Stripe, which meant every seat transfer required a billing change. This created friction: customers couldn't move seats between teams without opening support tickets and triggering billing updates.

NetLicensing's Subscription + Multi-Feature + Floating licensing decoupled seat entitlements from billing, enabling team administrators to provision, transfer, and share seats autonomously while the platform enforces seat caps and the billing system tracks usage for final reconciliation.

### Licensing Challenge

Before NetLicensing, the platform's seat management was tightly coupled to Stripe subscriptions:

- Customer purchased 50 seats at $8/seat → Stripe subscription for 50 units
- Team A wanted to reallocate 10 seats to Team B → required support ticket + Stripe subscription edit
- Temporary contractors needed access → had to purchase 1-seat "guest" subscription (expensive, inflexible)
- No seat sharing; floating access unavailable
- No visibility into which teams used how many seats; overcounting and undercounting happened
- Support team spent 30% of engineering time on "move my seat" and "what's my utilization" requests

### Chosen Licensing Model

**Subscription (organization-level seat pool) + Multi-Feature (per-team premium tiers) + Floating (guest/contractor sharing)**:

- **Subscription:** Organization buys 50 seats for $400/month; all seats renew monthly
- **Multi-Feature:** Teams can have different feature tiers (Starter/Professional) independently of seat allocation
- **Floating:** Guest/contractor seats can temporarily "borrow" from the pool without permanent allocation

This architecture lets organizations manage internal seat distribution freely while billing remains a simple monthly subscription.

### NetLicensing Configuration

**Product/Module/Licensee hierarchy:**

```
Product: Organization Account (Acme Corp)
├── Module: Team A (Sales)
│   └── Template: Subscription Seats (10 seats allocated, $60/mo)
├── Module: Team B (Engineering)
│   └── Template: Subscription Seats (30 seats allocated, $180/mo)
└── Module: Contractors
    └── Template: Floating Seats (5 guest slots, shared pool)
```

Each **Licensee** = one user account. Users are created on-demand and assigned to teams via the admin panel.

**Key parameters:**

- **Organization-level:** `timeVolume=1, timeVolumePeriod=MONTH, price=$400` (fixed 50-seat pool)
- **Per-team:** `quantity=10–30` (seats assigned to this team; sum across teams ≤ 50)
- **Floating:** `maxSessions=5` (concurrent guest users)
- Multi-Feature: `PROFESSIONAL` tier includes advanced analytics, SSO, audit logs

**Sample configuration:**

```json
{
  "productNumber": "ACME-CORP",
  "name": "Acme Corp - 50 Seat Subscription",
  "moduleNumber": "SALES-TEAM",
  "templateNumber": "TEAM-SEATS-STARTER",
  "licenseType": "TIMEVOLUME",
  "timeVolume": 1,
  "timeVolumePeriod": "MONTH",
  "price": 400.00,
  "currency": "USD",
  "automatic": true
}
```

### Integration Walkthrough

**Seat provisioning flow:**

```
Organization admin clicks "Add user to Sales Team"
  ↓
Admin panel calls POST /licensee (create new user in NetLicensing)
  ↓
Platform checks: Does Sales Team have available seats?
  → GET /module/SALES-TEAM/licenses (count active licenses)
  → If count < allocated (10), POST /license (assign seat)
  → If count == 10, show "Team full" error; prompt upgrade
  ↓
New user created; Licensee record stored; seat counter incremented
```

**Login validation:**

```
User logs in
  ↓
Auth middleware calls GET /validate
  ├─ License valid & not expired → Grant access
  ├─ License expired → Prompt admin to renew
  └─ Seat cap exceeded → Deny access, show "Upgrade required"
```

**Seat transfer (team reassignment):**

```
Admin moves User [ABC] from Sales Team (Team A) to Engineering (Team B)
  ↓
Admin panel calls PUT /license/{oldTeamLicense} (deactivate in Team A)
  ↓
Admin panel calls POST /license/{newTeamModule} (activate in Team B)
  ↓
No Stripe change, no billing event — entitlement updated instantly
  ↓
User logs out and back in; validation now points to Team B
```

**Guest/floating seat access:**

```
Admin allows contractor@external.com temporary access (30 days)
  ↓
POST /license (create Floating license, time-bounded)
  ↓
Contractor logs in; concurrent session counter increments
  ↓
If 5 concurrent contractors already in, deny access until one logs out
  ↓
After 30 days, license auto-expires; contractor access revoked
```

### Licensee Management

A Licensee = a user account. Users are created either:

1. **Automatic (on first login via SSO)** — AuthN system calls POST /licensee with user email
2. **Manual (admin provisioning)** — Admin invites user; platform creates Licensee + sends invite link

Each Licensee has attributes:
- `licenseeNumber` = user ID (synced with platform's user database)
- `name` = user email or display name
- `active` = whether user can log in (soft delete; reactivate without re-provisioning)

Team membership is managed via Module assignment. Moving a user between teams is a license reassignment, not a Licensee deletion.

### Edge Cases & Best Practices

- **Seat cap enforcement:** Implement soft cap at 110% (warn admin) and hard cap at 120% (deny new logins) to prevent accidental overage; require immediate upgrade or seat removal.
- **Team restructuring:** When teams merge or split, bulk-update license allocations via API to avoid individual seat reassignment transactions.
- **Licensing audit trail:** Log every seat provisioning/transfer with admin user, timestamp, and reason (for SOC2 compliance and support investigation).
- **SSO + auto-provisioning:** If SSO login doesn't match an active Licensee, auto-create if under seat cap; if at cap, deny with "purchase additional seats" message.
- **Guest overuse:** Track concurrent Floating license usage; if guest pool is consistently full, flag in admin dashboard and recommend upgrading guest quota.
- **Expired subscription handling:** On monthly renewal failure (Stripe decline), implement 14-day grace period; warn users daily; block new logins after 14 days until payment succeeds.

### Results & Outcome

- Seat transfer operations reduced from multi-day support tickets to instant self-service (admin clicks "Move to Team B")
- Support ticket volume for seat and access management decreased 68%
- Sales cycle friction eliminated as enterprise prospects could model complex organizational structures (50 seats across 8 teams) during free trial
- Seat utilization visibility enabled customers to optimize subscription sizes, reducing overprovisioning and preventing surprise overages
- Feature tier management decoupled from seat counts; teams can upgrade to Professional independently of total seat count
- Floating license pools reduced seat waste for organizations with 10–20% contractor/temporary staff fluctuation
- Upsell motions accelerated; sales team could now propose "add 5 more seats" or "upgrade Team A to Professional" as separate, modular transactions instead of subscription-wide changes
