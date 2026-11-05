---
layout: casestudy
title: "E-Learning Platform: Gating Courses and Certifications by Enrolment and Institutional Licence"
description: "How an e-learning platform can sell single courses, a catalogue subscription and seat-limited institutional licences side by side, with promo codes for students."
permalink: "/case-studies/course-learning-content-access/"
img: "/img/case-studies/netlicensing-case-study-course-learning-content-access.png"
tags:
- Case Studies
- Use Cases
- Education
- E-Learning
- Course Access
- Institutional Licensing
industry:
- Education / E-Learning Platform
use-case:
- Course access control
- Cohort management
- Institutional licensing
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Subscription"
- Licensing Model "Quota"
- Licensing Model "Discount"
---

### Challenge

An online academy offers technical courses and certification tracks. It sells to three kinds of customers, and each buys differently:

- **Individual learners** buy one course and keep it, or subscribe to the whole catalogue month by month.
- **Companies** send groups of employees through a training programme that runs for a fixed period.
- **Universities** give a set number of students access to the catalogue for a semester.

The academy's shop only knew "buy a course". Everything else was handled by the operations team: user lists in spreadsheets, accounts switched on and off by hand at the start and end of each programme. Students who left a university course kept access for months because nobody remembered to remove them.

### Approach

A licensee is whoever pays. That's the learner for individual purchases, and the company or university for group access. The platform knows which users belong to which organisation, and it validates the organisation's licensee for those users.

```
Product: Academy
├── Module "Courses" – Multi-Feature
│   └── FEATURE templates: one per course (PY-101, DATA-201, CLOUD-301, ...)
├── Module "Catalogue" – Subscription
│   ├── Month: TIMEVOLUME 1 MONTH
│   └── Semester: TIMEVOLUME 6 MONTH
├── Module "Seats" – Quota
│   └── Seat pack: QUANTITY, quantity = 25
└── Module "Promotions" – Discount
    └── STUDENT20: PERCENT 20, valid Sep 1 – Oct 31
```

**Single courses.** Each course is a [Multi-Feature](https://netlicensing.io/wiki/multi-feature) license template whose number is the course ID. A purchased course has no end date, so the learner keeps it.

**Catalogue access.** A [Subscription](https://netlicensing.io/wiki/subscription) unlocks every course for as long as it runs. A company programme from March 1 to May 31 is a Subscription license on the company's licensee with `startDate` set to March 1. When the programme ends, access ends with it, and nobody has to switch anything off.

**Seats.** A university buys seat packs. [Quota](https://netlicensing.io/wiki/quota) returns the total number of seats, the sum of all active packs. The platform counts the students the university's administrator has added and refuses the 101st student when the quota is 100. NetLicensing provides the limit, and the platform does the counting.

When a learner opens a course, the platform validates the licensee behind that learner:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/UNI-HAMBURG/validate
```

The result contains every course feature with `valid`, the catalogue subscription with `valid` and `expires`, and the seat `quota`. Access is granted if the course itself is valid or the catalogue subscription is. The platform caches the result per licensee until its `ttl`.

#### Selling

Individual learners and small companies buy in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop), opened from a shop token for their licensee. At the start of the winter semester, students enter the [Discount](https://netlicensing.io/wiki/discount) promo code `STUDENT20` at checkout for 20% off. The code works only between its start and end dates.

Universities and larger companies sign a contract and pay by invoice. The academy's sales team creates their Subscription and seat licenses in the [Management Console](https://ui.netlicensing.io).

#### Ending access

When a university doesn't renew, its Subscription simply runs out at the end of the semester. When a company programme is cancelled early, sales sets `active=false` on the license. Either way, the next validation tells the platform to close access for every user of that organisation.

### Results

- Single courses, catalogue subscriptions and institutional seats run side by side in one product, and each is enforced the same way.
- Programme and semester access starts and ends on fixed dates without manual work.
- Seat limits are set in NetLicensing, so administrators can add students only up to the number they bought.
- Seasonal promotions are a promo code with dates, not a code change.

Running an education platform? See the [licensing models overview](https://netlicensing.io/licensing-models/) or [contact us](https://netlicensing.io/contact/).
