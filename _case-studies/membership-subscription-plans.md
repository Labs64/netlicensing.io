---
layout: casestudy
title: "Membership Platform: Automated Access, Renewals, and Tier Management"
description: "How a professional association can run yearly membership tiers with automatic renewal, a grace period for late payers and self-service for members, using the Subscription model."
permalink: "/case-studies/membership-subscription-plans/"
img: "/img/case-studies/netlicensing-case-study-membership-subscription-plans.png"
tags:
- Case Studies
- Use Cases
- Membership Management
- SaaS
- Subscription Automation
industry:
- Associations / Online Communities
use-case:
- Membership & subscription plans
- Automated renewals
- Tier upgrades
favorite-feature:
- Licensing Model "Subscription"
- Grace Period
- Customer Portal
- Zoho CRM Extension
---

### Challenge

A professional association for project managers runs an online member area: a job board, webinars, a forum, and, for higher tiers, certification courses and discounted event tickets. Members pay yearly, as Individual or Professional members.

Renewals were handled by two people in the office. They sent invoices, matched incoming payments, and switched access on and off in the member area by hand. A member who paid late lost access for a few days. A member who didn't pay at all often kept it for weeks. An upgrade from Individual to Professional meant an email, a pro-rata calculation and another manual change.

### Approach

Each member is a licensee, identified by their member number. Each tier is its own Subscription module:

```
Product: Member Area
├── Module "Individual" – Subscription
│   ├── 1 year: TIMEVOLUME 1 YEAR
│   └── Grace:  TIMEVOLUME 14 DAY, hidden, grace period
└── Module "Professional" – Subscription
    ├── 1 year: TIMEVOLUME 1 YEAR
    └── Grace:  TIMEVOLUME 14 DAY, hidden, grace period
```

A [Subscription](https://netlicensing.io/wiki/subscription) is valid while a paid period runs, and validation returns its `expires` date. When a member renews early, the new year is added to the end of the current one, so nobody loses days by paying on time.

The member area validates when a member logs in and caches the result for the session:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/PM-0047712/validate
```

If "Professional" is valid, the member gets everything. If only "Individual" is valid, the certification courses show a "Professional members only" note with an upgrade link. If neither is valid, the member sees the public pages and a renewal button.

#### Late payments

Both modules have the [grace period](https://netlicensing.io/wiki/subscription#grace-period) switched on. A member whose year has ended keeps access for 14 more days while they sort out the payment. After that, access stops on its own, and nobody in the office has to remember to switch it off.

Reminders come before that point. A yearly membership turns yellow at 80% of its time, about ten weeks before the end ([warning levels](https://netlicensing.io/wiki/warning-level)). The association's mailing tool receives a `WARNING_LEVEL_CHANGED` [webhook](https://netlicensing.io/wiki/notifications) and sends the renewal email.

#### Paying and upgrading

"Renew" and "Upgrade" open the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) from a shop token for the member. With PayPal, members can choose automatic yearly renewal. PayPal doesn't allow recurring payments for buyers in some countries, including Germany, so those members renew with a one-time payment, which the reminder email makes easy.

An upgrade is a purchase of a Professional year. The member's Individual year simply runs out alongside it. The association prices the upgrade in the Shop so it doesn't charge twice for the overlap.

#### Members and the office

Members check their membership, renewal date and payments in the [Customer Portal](https://netlicensing.io/wiki/customer-portal), opened from the member area without a second login (an `ACTION` token with `action=licenseeLogin`).

The office works in Zoho CRM. The [NetLicensing extension for Zoho CRM](https://netlicensing.io/wiki/zoho-crm) adds the member's customer number to each CRM account and shows their licenses there. Staff don't need to switch between two systems to answer "is this member paid up?".

### Results

- Access starts with the payment and ends with the membership, including a fair grace period, without manual work in the office.
- Renewal reminders go out automatically, weeks ahead.
- Upgrades are a normal purchase in the Shop instead of an email thread.
- Members find their own renewal date and payment history in the Customer Portal.

Running a membership organisation or community? See [membership management with NetLicensing](/membership-management/) or [contact us](https://netlicensing.io/contact/).
