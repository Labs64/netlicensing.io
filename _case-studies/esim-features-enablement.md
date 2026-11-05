---
layout: casestudy
title: "eSIM Telecommunications: Remote Carrier Feature Activation"
description: "How a mobile operator can sell permanent add-ons, time-limited passes like roaming weeks and device-bound plans per eSIM line, with NetLicensing as the entitlement source for its provisioning system."
permalink: "/case-studies/esim-features-enablement/"
img: "/img/case-studies/netlicensing-case-study-esim-features-enablement.png"
tags:
- Case Studies
- Use Cases
- Telecommunications
- eSIM
- Feature Activation
industry:
- Telecommunications / Mobile Network Operators
use-case:
- eSIM line add-ons
- Remote feature activation
- Carrier service enablement
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Subscription"
- Licensing Model "Node-Locked"
---

### Challenge

A mobile virtual network operator sells eSIM plans, entirely online. Customers activate a line in the app, and the eSIM profile is downloaded to the phone. Over the life of a line they want extras: a roaming pass for a week abroad, Wi-Fi calling, a second eSIM for a smartwatch.

Each extra was set up by hand in the provisioning system after the payment came in. A roaming pass bought on Friday evening might be active on Monday. And every pass had to be switched off again by someone at the end of the week.

The operator wanted extras to be bought in the app, switched on within the provisioning run, and switched off automatically when they end.

### Approach

Each mobile line is a licensee, identified by an internal line ID (not the phone number, which can be ported). NetLicensing doesn't talk to the network. It holds the entitlements, and the operator's provisioning system asks it what a line should have.

```
Product: Mobile Lines
├── Module "Add-ons" – Multi-Feature
│   └── FEATURE templates: WIFI-CALLING, VOLTE-HD, SPAM-FILTER
├── Module "Roaming EU" – Subscription
│   ├── 1 week:  TIMEVOLUME 1 WEEK
│   └── 1 month: TIMEVOLUME 1 MONTH
└── Module "Watch eSIM" – Node-Locked, nodeSecretMode = CLIENT
    └── One watch: QUANTITY, quantity = 1
```

**Permanent add-ons** are [Multi-Feature](https://netlicensing.io/wiki/multi-feature) licenses that stay on until the customer cancels them. Cancelling sets the license to `active=false`.

**Roaming** is a [Subscription](https://netlicensing.io/wiki/subscription). A pass runs from the moment of purchase for a week or a month. Buying a second week before the first one ends adds it after the first, so a traveller never has a gap.

**The watch eSIM** is limited to one paired device with [Node-Locked](https://netlicensing.io/wiki/node-locked). The provisioning system sends the watch's EID as `nodeSecret` when the watch profile is requested. The first watch is bound, and a second one is refused until support releases the slot.

The provisioning system validates a line whenever it builds the line's service profile, and again on every purchase event:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-WATCH" \
  -d "nodeSecret0=89049032000000000000000000012345" \
  https://go.netlicensing.io/core/v2/rest/licensee/LINE-0048812/validate
```

The response lists each add-on, the roaming status with `valid` and `expires`, and whether this watch is allowed. The provisioning system turns that into network settings. When a roaming pass expires, the next validation says `valid=false` for "Roaming EU", and the provisioning system removes roaming from the line. The operator runs that check for all lines with an active pass shortly after each expiry date, which it knows from the `expires` value.

#### Buying in the app

The app's "Add-ons" screen opens the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) from a shop token for the line. The Shop shows only what the operator offers and takes PayPal or card payment through Stripe. A [webhook](https://netlicensing.io/wiki/notifications) for `LICENSE_CREATED` reaches the provisioning system the moment a purchase is completed, and it validates the line and applies the change.

Some customers prefer to add the cost to their monthly bill. For them, the operator's billing system creates the license directly through the API and invoices it itself.

### Results

- Add-ons are switched on from a webhook right after purchase, not on the next working day.
- Roaming passes end on their own date, and nobody has to switch them off by hand.
- The watch eSIM is limited to one paired device per line, enforced by NetLicensing.
- New add-ons and passes are license templates in the [Management Console](https://ui.netlicensing.io). The provisioning logic reads them from the validation result.

Selling digital add-ons for connectivity products? [Contact us](https://netlicensing.io/contact/) to discuss your provisioning flow.
