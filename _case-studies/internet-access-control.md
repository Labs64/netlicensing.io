---
layout: casestudy
title: "Internet Access Control"
description: "How a café start-up used NetLicensing subscriptions to sell premium high-speed internet by the day, week, month or year, with access granted to registered devices automatically."
permalink: "/case-studies/internet-access-control/"
img: "/img/case-studies/netlicensing-case-study-internet-access-control-v2.png"
tags:
- Case Studies
- Use Cases
- Access Control
- Internet Access Point
- WLAN
industry:
- Internet
use-case:
- Access Control
- Internet Access Point
favorite-feature:
- Licensing Model "Subscription"
- Licensing Model "Node-Locked"
- Online License Acquisition
---

### Challenge

Internet cafés were big business in the late 1990s and early 2000s. Nobody needs a café terminal to check email anymore. Instead, people carry phones, tablets and notebooks, and they want fast internet and a power socket wherever they sit down.

Most cafés offer free WiFi to anyone who buys a coffee. In practice, that WiFi is often slow, fine for a bit of browsing and email but not for real work, and there's a scramble for the few power sockets.

### Approach

A small start-up approached us with a different idea. They were opening a café with free internet for everyone, plus a fast connection for paying customers. They also planned dedicated "connection points" with ethernet sockets and several power sockets at each seat.

Their customers would be freelancers and self-employed people who want a place to work that isn't their home office, without paying for an office of their own. The café wanted to be flexible, so regulars shouldn't have to pay at the counter every visit. At the same time, the fast connection had to stay locked to people who had paid.

We suggested MAC address filtering instead of a shared WPA password for the fast network. A customer's devices get access automatically, as long as their MAC address is registered to an active subscription.

Here's how that maps to NetLicensing today. Each customer is a licensee. The product has two modules:

```
Product: Café Fast Lane
├── Module "Access" – Subscription
│   ├── Day:   TIMEVOLUME 1 DAY
│   ├── Week:  TIMEVOLUME 1 WEEK
│   ├── Month: TIMEVOLUME 1 MONTH
│   └── Year:  TIMEVOLUME 1 YEAR
└── Module "Devices" – Node-Locked, nodeSecretMode = CLIENT
    └── 3 devices: QUANTITY, quantity = 3, price 0, automatic
```

The [Subscription](https://netlicensing.io/wiki/subscription) holds the paid period. A customer who buys another week before the current one ends gets it added after the current one. The [Node-Locked](https://netlicensing.io/wiki/node-locked) module holds the registered devices. Each customer can register up to three, and the MAC address is the `nodeSecret`.

The first time a device joins the fast network, the café's login page asks the customer for their customer number. The small server that manages the network then validates:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-DEVICES" -d "nodeSecret0=3c:22:fb:91:0e:47" \
  https://go.netlicensing.io/core/v2/rest/licensee/CAFE-1043/validate
```

If "Access" is valid and the device is one of the customer's three, the server adds the MAC address to the router's allow list until the `expires` date of the subscription. After that, the device is back on the free network until the customer renews.

Customers buy and renew passes online in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop), or at the counter, where staff create the license in the [Management Console](https://ui.netlicensing.io).

### Results

The café used NetLicensing subscription management to keep track of payments and active subscriptions for its premium customers. That let them offer daily, weekly, monthly and annual passes, and it gave them a clear record of active subscriptions to plan the business on.

With that data they developed the business model further and went on to open more locations.

Running a venue with paid connectivity? [Contact us](https://netlicensing.io/contact/) and tell us about your setup.
