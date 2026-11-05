---
layout: casestudy
title: "Internet & Network Access Control: Time-Limited Access to Physical Connection Points"
description: "How a coworking operator can rent dedicated ethernet desks to teams by the month with the Rental model and sell hourly connection credits to drop-in members with Pay-per-Use."
permalink: "/case-studies/internet-network-access-control/"
img: "/img/case-studies/netlicensing-case-study-internet-network-access-control.png"
tags:
- Case Studies
- Use Cases
- Network Infrastructure
- Access Control
- Hospitality
- Coworking
industry:
- Network Infrastructure / Hospitality / Coworking
use-case:
- Network access control
- Physical connection points
- Time-limited access
- Shared infrastructure
favorite-feature:
- Licensing Model "Rental"
- Licensing Model "Pay-per-Use"
- Licensing Model "Subscription"
---

### Challenge

A coworking company runs three spaces in one city. WiFi is included in every membership. On top of that it sells wired connection points: desks with a dedicated, symmetric ethernet port, popular with video editors and developers who move large files.

Two groups use these ports very differently. Small teams rent a fixed set of ports, say desks 12 to 15, for several months. Drop-in members want a wired desk for an afternoon. The front desk managed both in a shared calendar and switched ports on and off in the switch configuration by hand. Ports stayed open after a team had left, and drop-ins were charged by guesswork.

### Approach

Each member account (a person or a team) is a licensee. The operator's network controller, which manages the switches, is the only system that talks to NetLicensing.

```
Product: Wired Desks
├── Module "Membership" – Subscription
│   └── Month: TIMEVOLUME 1 MONTH
├── Module "Reserved ports" – Rental, yellowThreshold = 7, redThreshold = 2 (days)
│   ├── Port:     FEATURE, one license per reserved port, number = location + port
│   ├── 1 month:  TIMEVOLUME 1 MONTH
│   └── 3 months: TIMEVOLUME 3 MONTH
└── Module "Drop-in hours" – Pay-per-Use
    └── 10 hours: QUANTITY 10
```

**Reserved ports for teams.** The [Rental](https://netlicensing.io/wiki/rental) model licenses many copies of one thing, each for its own period. A team that rents four desks gets four FEATURE licenses (`HQ-P12` to `HQ-P15`), each with a TIMEVOLUME license linked through `parentFeature`. Each port can be renewed or ended on its own. A team that shrinks from four desks to three just doesn't renew one of them.

The network controller validates each team every hour:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/TEAM-PIXELWORKS/validate
```

For "Reserved ports", the result lists every port with `valid`, `expires` and an `expirationWarningLevel`. Valid ports stay enabled on the switch, and expired ones are switched off. With the thresholds above, a port turns yellow a week before it ends and red two days before. The operator's member portal shows those colours, and a [webhook](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED` sends the team lead a renewal reminder.

**Hours for drop-in members.** Drop-ins buy packs of connection hours. These are [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) credits, where one credit is one hour. A member taps their card at a free wired desk, and the controller checks there's at least one hour left and enables the port. When the member taps out or the day ends, the controller reports the hours used, rounded up:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-DROPIN" -d "usedQuantity0=3" \
  https://go.netlicensing.io/core/v2/rest/licensee/MEMBER-20417/validate
```

The response returns `remainingQuantity`, which the member portal shows as "7 hours left".

**Membership.** Both reserved ports and drop-in hours require an active monthly [Subscription](https://netlicensing.io/wiki/subscription). The controller checks "Membership" in the same validation.

#### Buying

Members buy hour packs and renew their membership in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop), opened from the member portal with a shop token. Teams sign a desk agreement, and the community manager creates their port licenses in the [Management Console](https://ui.netlicensing.io).

### Results

- Reserved ports switch off on their own when a rental ends, and each port has its own renewal date.
- Drop-in members pay for the hours they actually use, counted by the network controller.
- Renewal reminders come from warning levels a week ahead, not from the front desk's calendar.
- Ports, packs and prices are configured in one product. The switches only follow what validation says.

Operating shared network infrastructure? [Contact us](https://netlicensing.io/contact/) to talk about your setup.
