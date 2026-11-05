---
layout: casestudy
title: "Connected Products & Smart Home: Remote Feature Enablement and Service Subscription Management"
description: "How a smart home brand can sell one household plan across cameras, speakers and sensors, limit cloud recording to a number of cameras and let customers manage it all themselves."
permalink: "/case-studies/connected-products-smart-home/"
img: "/img/case-studies/netlicensing-case-study-connected-products-smart-home.png"
tags:
- Case Studies
- Use Cases
- Smart Home
- Consumer Electronics
- Connected Products
industry:
- Consumer Electronics / Smart Home
use-case:
- Remote feature enablement
- Service subscription management
- Connected product ecosystems
favorite-feature:
- Licensing Model "Pricing Table"
- Licensing Model "Node-Locked"
- Customer Portal
---

### Challenge

A consumer electronics brand sells security cameras, smart speakers and door sensors, all controlled from one mobile app. The hardware works on its own. Cloud features cost extra: video history for the cameras, smart alerts that recognise people and parcels, and routines that link several devices.

Each product line had started with its own subscription. A customer with three cameras and a speaker had two plans, two renewal dates and no idea which device was covered by what. Support spent its days explaining the difference.

The brand wanted one plan per household that covers all devices, with a clear limit on how many cameras get cloud recording.

### Approach

The household account in the app is the licensee. Its account ID is the licensee number. The devices aren't separate licensees. They're counted inside the account.

```
Product: Home Cloud (licenseeAutoCreate = true)
├── Module "Plan" – Pricing Table
│   SKUs: HISTORY_DAYS (quota), SMART_ALERTS (feature), ROUTINES (feature)
│   Basic   FEATURE, EUR 0, automatic, hidden    HISTORY_DAYS=1   SMART_ALERTS=false  ROUTINES=true
│   Plus    TIMEVOLUME 1 MONTH                   HISTORY_DAYS=30  SMART_ALERTS=true   ROUTINES=true
└── Module "Recording cameras" – Node-Locked, nodeSecretMode = CLIENT
    ├── Free camera: QUANTITY, quantity = 1, EUR 0, automatic
    ├── Plus cameras: QUANTITY, quantity = 2
    └── Extra camera: QUANTITY, quantity = 1

Bundle "Plus": Plus plan + Plus cameras
```

The [Pricing Table](https://netlicensing.io/wiki/pricing-table) plan decides what the household gets: how many days of video history and whether smart alerts are on. Every account starts on the free Basic plan, so a new camera works out of the box.

Cloud recording is limited per camera with [Node-Locked](https://netlicensing.io/wiki/node-locked). The camera's serial number is the `nodeSecret`. Every household gets one free slot. Plus is sold as a [bundle](https://netlicensing.io/wiki/bundle-services) of the plan and two more slots, so a Plus household can record on three cameras. Slots from all active licenses add up. Node-Locked slots don't expire on their own, so when a validation reports Plus under `expiredPricingPlan`, the back end sets `active=false` on the Plus cameras license. The first cameras that ask for recording take the slots, and a further camera is refused until the customer frees a slot or buys another one. The cloud back end does the checking, not the camera:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productNumber=HOMECLOUD" \
  -d "productModuleNumber0=M-REC-CAMERAS" -d "nodeSecret0=CAM-7G42K19" \
  https://go.netlicensing.io/core/v2/rest/licensee/HH-200418/validate
```

The response returns the plan with its SKU values and, for "Recording cameras", whether this camera is allowed to record. The back end keeps the result until its `ttl`. The video service reads `HISTORY_DAYS` to decide how long to keep recordings.

#### Moving a camera

When a customer replaces a camera or wants recording on a different one, the app shows the cameras that hold a slot. Removing one clears its `nodeSecret` property on the license through the [License Services API](https://netlicensing.io/wiki/license-services), and the next camera that asks gets the slot.

#### Buying and managing the plan

"Upgrade to Plus" and "Add a camera" open the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) from a shop token for the household. For Plus, the token names the bundle (`bundleNumber`). The Shop carries the brand's logo and colours. Customers pay with PayPal, which also handles the monthly renewal, or Stripe.

The app's "My plan" screen links to the [Customer Portal](https://netlicensing.io/wiki/customer-portal). The back end creates an `ACTION` token with `action=licenseeLogin`, and the customer lands logged in, with their plan, purchases and licenses in one place.

A [webhook](https://netlicensing.io/wiki/notifications) for `LICENSE_CREATED` lets the back end refresh a household's cached result right after a purchase, so smart alerts switch on while the customer is still in the app.

### Results

- One plan per household covers every device, with one renewal date.
- The number of recording cameras is enforced by NetLicensing, and customers can move a slot from one camera to another themselves.
- New devices work immediately on the free plan, so paying for cloud features is the customer's choice.
- Customers check and manage their plan in the Customer Portal instead of calling support.

Building a connected product line? See [Multi-Feature](https://netlicensing.io/wiki/multi-feature) and [Pricing Table](https://netlicensing.io/wiki/pricing-table), or [contact us](https://netlicensing.io/contact/).
