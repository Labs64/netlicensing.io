---
layout: casestudy
title: "Event Management: Subscription, Per-Event, and Floating Access Passes"
description: "How a hybrid event platform can sell single-event tickets, yearly all-access passes and group passes for virtual sessions that limit how many people watch at the same time."
permalink: "/case-studies/ticketing-event-access/"
img: "/img/case-studies/netlicensing-case-study-ticketing-event-access.png"
tags:
- Case Studies
- Use Cases
- Events
- Entertainment
- Virtual Events
- Ticketing
industry:
- Events / Entertainment / Virtual Events
use-case:
- Event ticketing
- Access passes
- Concurrent attendance
- Subscription management
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Subscription"
- Licensing Model "Floating"
---

### Challenge

A company runs professional conferences and webinars on its own platform. Some events take place in a venue with a livestream, some are online only, and all recordings stay available afterwards.

Customers buy in three ways:

- **Individuals** buy a ticket for one event.
- **Companies** buy a yearly all-access pass for their staff.
- **Teams** buy a group pass for a virtual event, for example "5 viewers".

The group passes were the problem. One login for "5 viewers" was shared across a whole department, and sometimes forty people were watching. The organisers wanted to keep group passes, but they wanted "5 viewers" to mean five at a time.

### Approach

A licensee is whoever buys: a person, or a company or team.

```
Product: EventHub
├── Module "Events" – Multi-Feature
│   └── FEATURE templates: one per event (EV-2026-SUMMIT, EV-2026-WEBINAR-11, ...)
├── Module "All access" – Subscription
│   └── 1 year: TIMEVOLUME 1 YEAR
└── Module "Viewer seats" – Floating, maxCheckoutValidity = 300 s
    ├── 5 viewers:  FLOATING, maxSessions = 5
    └── 20 viewers: FLOATING, maxSessions = 20
```

**Single tickets.** Each event is a [Multi-Feature](https://netlicensing.io/wiki/multi-feature) license template, and its number is the event ID. When the organisers publish a new event, the platform creates the template with one API call, with name and price. A ticket is a license for that event, which also covers the recording later.

**All-access passes.** A yearly [Subscription](https://netlicensing.io/wiki/subscription) gives access to every event while it runs. The company's employees log in with their own accounts, and the platform links them to the company licensee.

**Group passes.** For virtual sessions, every viewer's player checks out a [Floating](https://netlicensing.io/wiki/floating) session from the group's pool and checks out again every couple of minutes while the stream plays:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-VIEWERS" \
  -d "sessionId0=u4471-browser-9e1c" -d "action0=checkOut" \
  https://go.netlicensing.io/core/v2/rest/licensee/TEAM-NORTHWIND-SALES/validate
```

With a 5-viewer pass, the sixth person sees "All 5 viewer seats of your team are in use" and can watch as soon as someone else stops. A browser tab that's closed without logging out frees its seat after five minutes. The pass doesn't care who the five are, so a team can rotate people through a long conference day.

#### Who gets in

When someone opens an event page, the platform validates the licensee behind that user. Access is granted if the event's own feature is valid, or the All-access subscription is valid. For live virtual sessions bought as a group pass, a free viewer seat is needed too. In the venue, the same check runs when a badge is scanned at the entrance. The result is cached for a few minutes, so a queue at the door doesn't wait for the network.

#### Selling

Tickets and passes are sold in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop), opened from the event page with a shop token. Early-bird prices are [Discount](https://netlicensing.io/wiki/discount) promo codes with an end date. Companies that buy many all-access passes on invoice get them created by the organisers' sales team in the [Management Console](https://ui.netlicensing.io).

### Results

- Single tickets, yearly passes and group passes all go through the same access check.
- Group passes for virtual events now mean "this many viewers at a time", enforced by NetLicensing.
- New events are a new license template, created by the platform when the event is published.
- Early-bird offers end on their own date.

Selling access to events or live content? [Contact us](https://netlicensing.io/contact/) to talk about your ticket types.
