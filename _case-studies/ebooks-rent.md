---
layout: casestudy
title: "Digital Publishing Platform: Time-Limited eBook Rentals"
description: "A digital library service implemented time-volume licensing to offer flexible rental periods for eBooks and digital media with automated expiration."
permalink: "/case-studies/ebooks-rent/"
img: "/img/case-studies/netlicensing-case-study-ebooks-rent.png"
tags:
- Case Studies
- Use Cases
- Digital Publishing
- eBook Rental
- Content Access
industry:
- Digital Publishing / eBook Platform
use-case:
- eBook rental
- Digital media access
- Time-limited content
- Library services
favorite-feature:
- Licensing Model "Rental"
- Licensing Model "Time-Volume"
- Automated Expiration
---

### Overview

A digital library platform serving academic and professional readers faces intense competition from retail bookstores and library services. Rather than forcing customers into all-or-nothing purchase decisions, the platform shifted to a rental model: readers rent textbooks, professional guides, and research materials for flexible periods (7 days to semester-long) at a fraction of purchase price. This model captures price-sensitive students and professionals while protecting author royalties and publisher interests.

Implementing rental management manually would be prohibitively expensive: tracking thousands of concurrent rentals, calculating individual expiration times, and revoking access precisely at expiration. NetLicensing's Rental licensing model automates the entire lifecycle: rental period enforcement, automatic expiration, pre-expiration renewal prompts, and analytics on rental patterns. Publishers can configure flexible rental options per title, and the platform scales to millions of simultaneous readers without operational overhead.

### Licensing Challenge

The legacy rental system required customer service staff to manually track rental expiration dates in a spreadsheet, send expiration notices via email, and process manual access revocation when periods ended. This created multiple operational risks:

- **Manual tracking errors:** Staff occasionally forgot to revoke access, allowing customers extended free reading; other times access was revoked prematurely, causing customer complaints and support escalations.
- **No flexible rental options:** All rentals were fixed at 14 days regardless of content type or customer need. Publishers wanted textbooks available for 30–120 days (semester rentals) while professional guides should be 7–14 days. Implementing this required weeks of engineering.
- **No renewal automation:** When customers wanted to extend rentals, they had to email support and wait for manual processing. Many users simply gave up and purchased elsewhere.
- **Lack of visibility:** The platform had no analytics on which rental durations drove conversion or revenue, making it impossible to optimize pricing.
- **Scalability bottleneck:** As rental volume grew, manual processes became unsustainable, requiring hiring additional staff dedicated solely to access management.

### Chosen Licensing Model

**Rental License Model** — time-volume licenses with server-controlled expiration and automated access revocation. When a customer rents a book for 14 days, NetLicensing issues a time-volume license with `timeVolume=14`, `timeVolumePeriod=DAY`. The server calculates exact expiration (`startDate + 14 days`) and enforces it automatically. No manual intervention, no staff involvement—expiration is atomic and server-controlled.

```
Rental License Mechanics:
- Customer rents book for 14 days at $8.00
- NetLicensing creates time-volume license:
  - startDate = now
  - timeVolume = 14 (days)
  - expirationDate = startDate + 14 days (auto-calculated)
- Customer reads during this window; validation succeeds
- On day 15, next validation check fails; access denied
- NetLicensing sends pre-expiration reminders (day 11, day 13)
```

### NetLicensing Configuration

**Product & Module Setup:**
- **Product:** "DigitalLibrary"
- **Module:** "Rental" (licensing model: Rental)
- **License Templates per content type:**
  - Textbooks: `TEXTBOOK_30DAY` (30 days, $15), `TEXTBOOK_60DAY` (60 days, $25), `TEXTBOOK_SEMESTER` (120 days, $40)
  - Professional Guides: `GUIDE_7DAY` (7 days, $5), `GUIDE_14DAY` (14 days, $8)
  - Research Papers: `PAPER_3DAY` (3 days, $2), `PAPER_30DAY` (30 days, $8)

**Key Parameters:**
- `timeVolume` — rental duration in days
- `timeVolumePeriod=DAY` — always days for rentals
- `price` — rental price per duration
- `currency=USD`
- `gracePeriod=0` — no grace period; expiration is strict

**ASCII Configuration:**
```
Product: DigitalLibrary
└── Module: Rental
    ├── Textbooks (content category)
    │   ├── Template: TEXTBOOK_30DAY (30d, $15)
    │   ├── Template: TEXTBOOK_60DAY (60d, $25)
    │   └── Template: TEXTBOOK_SEMESTER (120d, $40)
    ├── Guides (content category)
    │   ├── Template: GUIDE_7DAY (7d, $5)
    │   └── Template: GUIDE_14DAY (14d, $8)
    └── Papers (content category)
        ├── Template: PAPER_3DAY (3d, $2)
        └── Template: PAPER_30DAY (30d, $8)
```

### Integration Walkthrough

**Access Control Points:**
- **At book open:** Reader's app calls `GET /licensee/{reader_id}/validate` to check active rental licenses
- **On rental purchase:** Platform calls `POST /licensee/{reader_id}/license` to create new time-volume license with chosen duration
- **Periodic validation:** App re-validates every 5 minutes during reading session (detects expired rentals)
- **Renewal trigger:** When rental nears expiration, platform API detects upcoming expiration and sends renewal link

**High-Level Flow:**
```
Reader clicks "Rent this book"
    ↓
Choose rental duration (7d, 14d, 30d, etc.)
    ↓
Click "Proceed to checkout"
    ↓
Platform generates NetLicensing Shop token
    ↓
Reader completes payment via Stripe/PayPal
    ↓
NetLicensing creates time-volume license
Shop redirects to "Rental Confirmed" page
    ↓
Reader opens book in reading app
    ↓
App validates license: GET /licensee/{id}/validate
    ↓
License valid?
├─ Yes  → Display book, grant read access
└─ No   → Show "Rental expired" prompt with upgrade option
    ↓
Every 5 minutes during reading, re-validate
    ↓
5 days remaining?
├─ Yes  → Display "Expires in 5 days" banner, show "Extend Rental" button
└─ No   → Continue uninterrupted
```

### Licensee Management

Each reader in the platform maps to a single NetLicensing Licensee. The Licensee number is the reader's account ID (e.g., `READER_789456`). When a reader rents multiple books, each rental creates a separate License linked to the same Licensee, ensuring the platform can track all active rentals for that reader and calculate total read costs.

Rental auto-provisioning is the default: when a reader completes a purchase via the NetLicensing Shop, a License is immediately created. Readers do not need to contact support or wait for activation; reading can begin within seconds of payment confirmation.

For institutional customers (schools, libraries), a shared Licensee account can represent the institution, and multiple patron accounts validate against it, allowing library administrators to manage a central rental budget across all patrons.

### Shop & Payment Integration

The platform uses NetLicensing Shop for seamless rental purchases. When a reader selects a rental duration and proceeds to checkout, the process is fully automated:

```
Rental Purchase Flow:
1. Reader selects book and rental duration (e.g., TEXTBOOK_30DAY)
2. Platform calls POST /shop/token with:
   - licenseeNumber (reader account)
   - licenseTemplate (e.g., TEXTBOOK_30DAY)
   - successUrl (app redirect after payment)
3. NetLicensing returns shop URL (valid for 24 hours, single-use)
4. Platform opens Shop in iframe or new window
5. Reader enters payment info, completes transaction
6. Shop charges payment method, creates license
7. Shop redirects to successUrl
8. Platform receives webhook confirming license creation
9. Platform displays "Rental active until [date]" confirmation
10. Reader immediately opens book in reading app
```

Pre-expiration renewal flow (day 10 of 14-day rental):
```
Platform detects rental expiring in 4 days
    ↓
Generates renewal shop token for same title, same duration
    ↓
Displays in-app "Extend your rental" prompt with one-click link
    ↓
Reader clicks "Extend" → Shop opens
    ↓
Completes quick payment (payment method saved from original purchase)
    ↓
NetLicensing extends license by adding timeVolume to existing license
    ↓
Reader continues reading without interruption
```

### Edge Cases & Best Practices

- **Offline Reading with Cached Licenses:** Mobile apps may download books for offline reading. Cache the last successful validation response with a 30-day offline window; require fresh validation when online to detect expired rentals.
- **License Extension Without Re-Rent:** When a reader renews/extends a rental, add time to the existing license rather than creating a duplicate. This maintains the original rental start date for analytics while extending expiration.
- **Pre-Expiration Notifications:** Configure NetLicensing to send automated emails 3 days and 1 day before expiration, with one-click renewal links. This dramatically improves extension rates (studies show 20%+ boost).
- **Seasonal Pricing:** Offer higher-priced semester rentals during back-to-school periods (August, January) to capture bulk student rentals. NetLicensing templates support per-period price adjustments.
- **Refund Policy:** Allow readers to request refunds within 24 hours of rental if they haven't opened the book. Automate refunds by calling the NetLicensing license deletion API with appropriate audit logging.
- **Analytics & Optimization:** Query NetLicensing reporting API monthly to identify top rental durations, popular titles, and renewal rates. Use data to adjust template pricing and inform publisher negotiations.

### Results & Outcome

- **Manual rental management overhead eliminated:** Expiration is fully automated; no staff required to monitor, notify, or revoke access.
- **Customer complaint volume decreased by 89%:** Server-controlled expiration removed ambiguity; access changes happen predictably without surprise delays or premature revocation.
- **Revenue per rental increased by 23%:** After introducing flexible duration options (3-day, 7-day, 14-day, 30-day, semester), readers could choose the optimal rental period for their use case, reducing cart abandonment.
- **Rental extension rate improved from 12% to 31%:** Pre-expiration automation with one-click renewal links dramatically increased reader continuation, extending average customer lifetime value.
- **Publishers gained actionable data:** Analytics revealed which rental durations and price points optimized revenue per title, directly informing future content strategies.
- **Platform scaled from 10k to 100k+ simultaneous rentals:** Without adding customer service staff, the platform handled 10x growth through fully automated licensing.
