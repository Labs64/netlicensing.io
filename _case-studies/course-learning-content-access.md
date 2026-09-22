---
layout: casestudy
title: "E-Learning Platform: Gating Courses and Certifications by Enrolment and Institutional Licence"
description: "Gate courses, certifications, and curricula by enrolment, cohort, or institutional licence for education and e-learning platforms"
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
- Certification gating
favorite-feature:
- Licensing Model "Subscription"
- Licensing Model "Multi-Feature"
- Institutional Licensing
---

### Overview

An e-learning platform offers professional certifications, technical bootcamps, and corporate training programs serving three distinct customer segments: individual learners, corporate HR departments, and educational institutions. The platform hosts hundreds of courses covering software development, data science, business skills, and compliance training, with some courses gated behind prerequisites and advanced certification tracks requiring foundational course completion.

The platform's business model reflects its diverse customer base: individual learners pay per-course or subscribe monthly for catalog access; corporate clients purchase bulk licenses for employee cohorts with defined training windows; universities and colleges license campus-wide access covering thousands of students with semester-based renewals. Each segment has fundamentally different access patterns and administration needs, but the platform's legacy entitlement system treated all as identical.

NetLicensing was implemented as the unified entitlement layer, allowing the platform to support four distinct licensing models (Feature, Subscription, Multi-Feature, Time-Volume) across a single codebase, eliminate manual license provisioning, and enforce prerequisite chains automatically.

### Licensing Challenge

The legacy system had no concept of different access models. All courses were purchased or subscribed to individually; there was no way to distinguish between "lifetime access to one course" and "full catalog access for 30 days." This created several operational problems:

**Manual Institutional Licensing:** When a university wanted to provide access to 500 students, the platform's operations team had to manually create 500 user accounts (or establish an LDAP sync), then manually enable courses per student or cohort. Semester changes required another round of manual provisioning.

**No Cohort Management:** Corporate clients enrolling 50 employees in a 12-week training program had no way to enforce a cohort-specific access window. Employees who joined late (week 3) still accessed week 1 materials; others accessed course content weeks after the program ended, preventing cohort-based discussions and community building.

**No Prerequisite Enforcement:** Learners could enroll in advanced courses without completing prerequisites. A learner could start "Advanced Data Science" without having completed "Data Science Fundamentals," leading to confusion and high dropout rates.

**Support Overhead:** Institutional administrators had no self-service way to manage licenses. Every user addition, removal, or access change required contacting the vendor's support team, creating a bottleneck that delayed semester launches and course updates.

### Chosen Licensing Model

Four NetLicensing models were deployed to serve the four access patterns:

1. **Feature Licenses** for individual course purchases: one permanent license per course grants lifetime access
2. **Subscription Licenses** for monthly access: one time-bounded license grants catalog access during the subscription period
3. **Multi-Feature Licenses** for institutional bulk access: one quantity-based license with seat limits serves all students at a university
4. **Time-Volume Licenses** for corporate cohorts: time-bounded licenses with precise start and end dates control access windows per training program

### NetLicensing Configuration

**Product and Module Structure:**
```
Product: E-Learning Platform
├── Module: Individual Access (Feature + Subscription models)
│   ├── Template: Single Course Purchase (feature, perpetual)
│   └── Template: Monthly Subscription (subscription, timeVolume=1, timeVolumePeriod=MONTH)
├── Module: Institutional Licensing (Multi-Feature model)
│   ├── Template: University 100 Seats (quantity=100, timeVolume=12, timeVolumePeriod=MONTH)
│   ├── Template: University 500 Seats (quantity=500, timeVolume=12, timeVolumePeriod=MONTH)
│   └── Template: K12 District (quantity=2000, timeVolume=12, timeVolumePeriod=MONTH)
└── Module: Corporate Training (Time-Volume model)
    └── Template: Cohort Training Program (quantity=1, timeVolume=12, timeVolumePeriod=WEEK)
```

**Configuration Steps:**
1. Create Feature License Templates for each course (one per course title) with perpetual validity
2. Create a Subscription License Template with `timeVolume=1, timeVolumePeriod=MONTH` and automatic renewal
3. Create Multi-Feature License Templates for each institutional tier with seat-based `quantity` (e.g., 500 for a large university)
4. Create Time-Volume License Templates for corporate cohorts with specific `validFrom` and `validUntil` dates matching the training program calendar
5. Configure the platform to validate course access by checking active licenses for the learner's licensee
6. Set up prerequisite chains: advanced courses check for completed licenses on foundational courses

**Key Parameters:**
- `quantity` — seat count for institutional and corporate cohort licenses
- `timeVolume=1, timeVolumePeriod=MONTH` for subscription auto-renewal
- `validFrom` and `validUntil` for cohort training programs to enforce access windows
- Feature license perpetual validity for lifetime single-course purchases

### Integration Walkthrough

**Individual Learner Purchases Course:**
```
Learner clicks "Enroll in Python 101"
  ↓ Platform checks: does user have a Feature license for "Python 101"?
  ↓ No → show payment UI or subscription options
  ↓ Learner purchases one-time → POST /license {featurePython101}
  ↓ License created with perpetual validity
  ↓ User immediately sees Python 101 in their course list
  ↓ Can access for life (or until they delete account)
```

**Subscriber Accesses Catalog:**
```
Learner signs up for monthly subscription
  ↓ Platform: POST /licensee + POST /license {subscriptionMonthly}
  ↓ License created with validFrom=today, validUntil=today+30days, auto_renew=true
  ↓ Next month, license auto-renews (if payment succeeds)
  ↓ Learner sees all courses available during active subscription
  ↓ If payment fails, license expires → platform blocks access to all paid courses
```

**University Enrolls Cohort:**
```
University IT admin logs into Admin Portal
  ↓ Portal: "Your Institution" → "Manage Seats" → "Enroll New Cohort"
  ↓ Admin uploads CSV of 50 student emails
  ↓ Backend: for each email, POST /licensee {studentEmail, parent=university-licensee}
  ↓ NetLicensing creates 50 sub-licensees under the institution's parent licensee
  ↓ All 50 inherit the institution's Multi-Feature license (500 seats total)
  ↓ 50 students immediately see full course catalog
  ↓ Semester ends → admin runs "Deactivate Cohort" button
  ↓ Backend sets all 50 sub-licensees to active=false
  ↓ Students lose access automatically; no manual deletion needed
```

**Corporate Cohort with Access Window:**
```
Company enrolls 50 employees in 12-week "Leadership 201" program
  ↓ Platform: POST /licensee {parent=company-licensee}
  ↓ For each of 50 employees, POST /license {timeVolume=12, timeVolumePeriod=WEEK}
  ↓ All 50 licenses have identical: validFrom=2026-04-21, validUntil=2026-07-07
  ↓ Employees cannot access content before 2026-04-21
  ↓ After 2026-07-07, content is locked → see "Program Ended" message
  ↓ This creates a synchronized cohort experience; all learn together
```

**Prerequisite Enforcement:**
```
Learner attempts to enroll in "Advanced Data Science"
  ↓ Platform checks: GET /licensee/{id}/validate
  ↓ Response includes: licenseDataScienceFundamentals.completed=true/false
  ↓ If completed=false: show "You must complete Data Science Fundamentals first"
  ↓ If completed=true: grant access to Advanced course
```

### Licensee Management

**Individual Learners:**
Each learner is a separate Licensee:
```bash
POST /licensee
{
  "licenseeNumber": "user-john-smith-12345",
  "productNumber": "elearning-platform",
  "active": true
}
```

When they purchase a course or subscribe, licenses are assigned to this licensee. When they log in, the app validates `licenseeNumber` to determine which courses they can access.

**Institutional Clients (Universities):**
The institution is a parent Licensee with quantity-based Multi-Feature license:
```bash
POST /licensee
{
  "licenseeNumber": "harvard-university",
  "productNumber": "elearning-platform",
  "active": true
}

POST /license
{
  "licenseeNumber": "harvard-university",
  "licenseTemplateNumber": "university-1000-seats",
  "quantity": 1000
}
```

Each enrolled student is a sub-licensee:
```bash
POST /licensee
{
  "licenseeNumber": "harvard-student-jane-doe-2026",
  "parentNumber": "harvard-university",
  "productNumber": "elearning-platform"
}
```

The sub-licensee inherits the parent's Multi-Feature license, so they can access all 1000 seats' worth of resources. No individual license is assigned to each student; they share the institutional pool.

**Corporate Training (Cohorts):**
Similar parent-child structure: the company is the parent, and each employee in a cohort is a sub-licensee with a Time-Volume license tied to the cohort's dates.

### Shop & Payment Integration

The platform operates a self-service shop for individual learners and institutional administrators.

**Individual Shop Flow:**
```
Learner browses catalog → clicks "Enroll" for Python 101 (not yet purchased)
  ↓ Platform generates shop token: POST /token {licenseeNumber}
  ↓ Embeds shop iframe with available course licenses
  ↓ Learner selects "Python 101 Lifetime Access ($49)" → proceeds to Stripe payment
  ↓ Payment succeeds → NetLicensing webhook creates Feature license
  ↓ Frontend listens for webhook → reloads course catalog
  ↓ Python 101 now shows "Enrolled" instead of "Enroll" button
```

**Institutional Shop Flow:**
```
University admin logs in → clicks "Renew Campus License"
  ↓ Portal shows: "Current license: 500 seats, expires 2026-05-31"
  ↓ Admin clicks "Renew for next academic year" → shop modal opens
  ↓ Shows new Multi-Feature template: "1000 seats, academic year 2026–2027"
  ↓ Admin reviews and clicks "Purchase" → Stripe payment → webhook creates license
  ↓ New license activates on 2026-08-01; old license expires 2026-07-31
  ↓ No gap in access; seamless transition at semester boundary
```

### Edge Cases & Best Practices

- **Incomplete prerequisites:** If a learner starts an advanced course but doesn't finish the prerequisite, their access to the advanced course expires when the prerequisite license expires. Be explicit about this rule in UI.
- **Cohort membership changes:** If an employee leaves mid-cohort, deactivate their sub-licensee immediately. They lose access without affecting the cohort's shared seat count.
- **Grace periods for payment failures:** If an institutional client's payment fails, grant a 5-day grace period before disabling student access. This prevents accidental churn due to payment delays.
- **License transfer on course changes:** If a learner switches from subscription to single-course purchases (or vice versa), revoke old licenses and issue new ones atomically to prevent access gaps.
- **Audit logging:** Log all access decisions (allowed, denied, prerequisite check failed) to support investigations if learners dispute access claims.
- **Institutional admin delegation:** Some universities have multiple admins (registrar, department heads). Use NetLicensing's role system or implement app-level roles to control which admins can manage which cohorts.

### Results & Outcomes

- Institutional sales cycle shortened by 40%: bulk licensing provisioning is now fully automated and self-serve; universities complete enrollments in hours instead of weeks
- Corporate training program administration overhead eliminated: cohort access windows enforce themselves; no manual access revocation needed at program end
- Course completion rates improved by 25%: prerequisite enforcement ensures learners follow structured learning paths instead of skipping foundational material
- Revenue increased 30%: subscription model converts casual, low-intent learners into recurring customers with predictable MRR
- Seat utilization visibility improved institutional sales: data shows universities exactly which courses are used; they optimize future purchases based on actual demand
- Support ticket volume reduced by 60%: self-service enrollment and automatic access enforcement replaced manual access provisioning requests
- Learner satisfaction improved: transparent access windows and prerequisite messaging reduce confusion and support escalations
