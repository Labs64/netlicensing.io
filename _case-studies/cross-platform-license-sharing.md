---
layout: casestudy
title: "Multi-Platform Software: Seamless License Sharing Across Devices"
description: "How a design app for desktop, tablet and web can let one subscription run on any device, limited to two at the same time, with the Floating and Subscription models."
permalink: "/case-studies/cross-platform-license-sharing/"
img: "/img/case-studies/netlicensing-case-study-cross-platform-license-sharing.png"
tags:
- Case Studies
- Use Cases
- Multi-Platform Software
- Cross-Device Licensing
- Concurrent Usage
industry:
- Creative Software / Multi-Platform SaaS
use-case:
- Cross-platform license sharing
- Concurrent usage management
- Device-agnostic licensing
favorite-feature:
- Licensing Model "Floating"
- Licensing Model "Subscription"
- NetLicensing Shop
---

### Challenge

A small studio makes a vector design app for Windows, macOS, iPad and the browser. Its users switch devices all day: a desktop in the studio, a laptop at home, an iPad at the client's office.

The first licensing approach bound each subscription to two devices. Users hit that limit constantly. Someone who replaced a laptop, reinstalled Windows or borrowed a colleague's iPad had to email support to free a slot. At the same time, the studio did want a limit, because otherwise one subscription would end up shared by a whole agency.

The rule they settled on was "any device, but at most two at the same time".

### Approach

Each user account is a licensee. The product has two modules:

```
Product: Vectora (licenseeAutoCreate = true)
├── Module "Plan" – Subscription
│   ├── Trial: TIMEVOLUME 14 DAY, price 0, automatic
│   ├── Month: TIMEVOLUME 1 MONTH
│   └── Year:  TIMEVOLUME 1 YEAR
└── Module "Devices in use" – Floating, maxCheckoutValidity = 900 s
    └── Two at a time: FLOATING, maxSessions = 2, price 0, automatic
```

The [Subscription](https://netlicensing.io/wiki/subscription) decides whether the account may use the app at all. The [Floating](https://netlicensing.io/wiki/floating) module limits how many devices use it at once. Nothing is bound to a device, so a new laptop simply works.

When the app starts or comes back to the foreground, it checks out a session. The session ID identifies the device, for example an installation ID the app generates once and stores:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productNumber=VECTORA" \
  -d "productModuleNumber0=M-DEVICES" \
  -d "sessionId0=ipad-5c1e9a" -d "action0=checkOut" \
  https://go.netlicensing.io/core/v2/rest/licensee/USER-88213/validate
```

The response tells the app whether the subscription is valid and until when (`expires`), and whether it got a session (`valid` plus `expirationTimestamp`). While the user works, the app checks out again every ten minutes to keep the session. When the app is closed or sent to the background, it sends `action0=checkIn`. If a device crashes or loses its connection, its session runs out after 15 minutes on its own.

When both sessions are taken, the third device doesn't fail silently. It shows "Vectora is open on two other devices" and offers to continue when one of them is closed. The app's back end keeps the list of the user's devices, so it can show their names.

The web app works the same way. Its server checks out a session for the browser tab, and that session counts toward the two.

#### Teams

A studio of eight designers with five subscriptions doesn't need five accounts. The team account is one licensee with a Floating license of `maxSessions = 5`. Everyone signs in with their own user, and the team's sessions are counted together. The team administrator can buy more sessions in the Shop.

#### Buying and renewing

"Subscribe" and "Renew" create a shop token for the account and open the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop). Users pay with PayPal or Stripe. Monthly PayPal payments can renew automatically. If a user renews early, the new period is added after the current one.

### Results

- A subscription works on any device the user owns. Replacing a computer or reinstalling doesn't need support.
- The two-at-a-time rule is enforced by NetLicensing across desktop, tablet and web.
- Crashed or forgotten sessions free themselves after 15 minutes.
- Teams share a pool of sessions under one account, without one login per seat.

Want the same rule for your app? Read [Node-Locked vs Floating licenses](https://netlicensing.io/wiki/node-locked-vs-floating-licenses) or [create a free account](https://ui.netlicensing.io/#/register).
