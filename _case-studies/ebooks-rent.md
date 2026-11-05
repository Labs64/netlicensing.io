---
layout: casestudy
title: "Digital Publishing Platform: Time-Limited eBook Rentals"
description: "How a digital library can rent out eBooks for 7, 14 or 30 days with the Rental licensing model, with an end date and a due-soon warning for every borrowed title."
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
- Warning Levels & Notifications
- NetLicensing REST API
---

### Challenge

An online library rents out professional and academic eBooks. Readers pay a small fee to read a title for a week, two weeks or a month in the platform's reader app. Students often want a textbook for a whole semester.

The first version stored rentals in a database table, and a nightly script closed the ones that had ended. Support spent a lot of time on the edge cases: extensions, rentals that ended a day early because of time zones, readers who rented the same book again while the old rental was still running. Reminders before the end date were sent by hand, when someone had time.

### Approach

Each reader account is a licensee. Every book a reader has rented at least once is an item under that account, and each rental period is linked to that item. That's exactly what the [Rental](https://netlicensing.io/wiki/rental) model is built for: many instances of one thing, each licensed for its own period.

```
Product: Library (licenseeAutoCreate = true)
└── Module "Rentals" – Rental, yellowThreshold = 3, redThreshold = 1 (days)
    ├── Title:    FEATURE, price 0, one license per book, license number = reader ID + ISBN
    ├── 7 days:   TIMEVOLUME 7 DAY
    ├── 14 days:  TIMEVOLUME 14 DAY
    ├── 30 days:  TIMEVOLUME 30 DAY
    └── Semester: TIMEVOLUME 120 DAY
```

When a reader pays for a rental in the platform's checkout, the back end creates the title license (only the first time this reader rents this book; license numbers are unique, so the number combines reader ID and ISBN) and then a rental period linked to it:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "licenseeNumber=READER-90321" -d "licenseTemplateNumber=RENT-14D" \
  -d "parentFeature=R90321-9783161484100" \
  -d "startDate=2026-11-05T10:12:00Z" \
  https://go.netlicensing.io/core/v2/rest/license
```

The reader app validates when it opens and before it opens a book:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/READER-90321/validate
```

The response lists every book the reader has ever rented, each with `valid`, `expires` and an `expirationWarningLevel`. The app shows "Due in 2 days" next to a book whose level is yellow and locks books whose rental has ended. It can keep the last response for offline reading on a train, until the response's `ttl` runs out.

#### Extending a rental

Extending is one more rental period for the same title, with its `startDate` set to the current end date. NetLicensing works out the new end date from all periods linked to that book. The reader doesn't lose their bookmarks, because the title license stays the same.

#### Reminders

With `yellowThreshold = 3` and `redThreshold = 1`, a rental turns yellow three days before it ends and red on the last day. The platform registers a [webhook](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED`. When it arrives, the platform sends the reader a short "your book is due soon, extend?" email with a direct extension link.

### Results

- Every rental ends on its own date, worked out by NetLicensing. The nightly script is gone.
- Extensions are one API call, and the reader keeps the same book in the same place.
- Reminders go out automatically from warning levels and webhooks, a few days before the end.
- Rental periods and prices, including semester rentals, are templates in the [Management Console](https://ui.netlicensing.io) and can be changed without an app release.

Planning time-limited access to content? Read the [Rental model documentation](https://netlicensing.io/wiki/rental) or [contact us](https://netlicensing.io/contact/).
