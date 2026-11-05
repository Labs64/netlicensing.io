---
layout: casestudy
title: "Connected Cars: Subscription-Based In-Vehicle Services"
description: "How a vehicle maker can license connected services per vehicle: a free first year, paid service packages afterwards and one-time feature unlocks that stay with the car."
permalink: "/case-studies/connected-cars-services/"
img: "/img/case-studies/netlicensing-case-study-connected-cars-services.png"
tags:
- Case Studies
- Use Cases
- Automotive
- Connected Vehicles
- Subscription Services
industry:
- Automotive / Connected Vehicles
use-case:
- In-vehicle service subscriptions
- Feature-based vehicle services
- Remote service activation
favorite-feature:
- Licensing Model "Pricing Table"
- Licensing Model "Multi-Feature"
- Response Signing
---

### Challenge

A vehicle maker ships every new car with a modem and an infotainment system that can do a lot: live traffic, music streaming, remote climate control from the phone, a Wi-Fi hotspot. Some of it should be free for the first year. After that, owners choose a package. A few functions, like an extended driving range mode on the electric models, are sold once and belong to the car for good.

Until now, the trial period was written into the head unit at the factory. When it ran out, services just stopped. There was no way to buy a package from the car or the owner's app, and dealers had nothing to sell at handover.

### Approach

Each vehicle is a licensee, and the VIN is its licensee number. The car's back end (not the head unit directly) talks to NetLicensing.

```
Product: Connected Services (licenseeAutoCreate = true)
├── Module "Packages" – Pricing Table
│   SKUs: TRAFFIC, STREAMING, REMOTE, HOTSPOT (features)
│   First year  TIMEVOLUME 12 MONTH, EUR 0, automatic, hidden   all on
│   Essential   TIMEVOLUME 1 YEAR                               TRAFFIC, REMOTE
│   Premium     TIMEVOLUME 1 YEAR                               all on
└── Module "Unlocks" – Multi-Feature
    └── FEATURE templates: RANGE-PLUS, HEATED-REAR, PARK-ASSIST
```

**Packages.** [Pricing Table](https://netlicensing.io/wiki/pricing-table) plans hold the service packages. The free first year is an automatic plan. It starts the first time the car validates, which is usually at delivery. After twelve months it expires, and the car keeps whatever package the owner has bought since.

**Unlocks.** One-time purchases are [Multi-Feature](https://netlicensing.io/wiki/multi-feature) licenses without an end date. Because they belong to the VIN licensee, they stay with the car when it's sold.

The car's back end validates when the car comes online and caches the result until the response's `ttl`:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/xml" \
  -d "productNumber=CONNECTED" \
  https://go.netlicensing.io/core/v2/rest/licensee/WVWZZZ1KZ6W000001/validate
```

The response lists every package SKU and every unlock with `valid=true` or `false`. The back end turns that into a short list of enabled services and sends it to the car. The head unit shows the services as available or locked, and a locked tile opens the purchase screen.

Responses are signed with the vendor's private key, and the back end checks the signature before it passes anything on (see [Signing the Response](https://netlicensing.io/wiki/signing-the-response)). A car that drives through a tunnel or parks underground works with the last list it received.

#### Buying

There are three ways to buy, and all of them end up as a license on the same VIN:

- **In the owner's app.** The app's back end creates a shop token for the VIN (`tokenType=SHOP&licenseeNumber=WVWZZZ...`) and opens the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) in the app. The owner pays with PayPal or Stripe.
- **At the dealer.** The dealer system has its own API key with the role `ROLE_APIKEY_OPERATION`. It creates the license directly, and the dealer invoices the customer as part of the car purchase.
- **In the car.** The head unit shows a QR code that opens the owner's app on the right purchase screen.

A [webhook](https://netlicensing.io/wiki/notifications) for `LICENSE_CREATED` tells the back end to refresh the car's list right away, so a purchased service shows up right away instead of at the next ignition.

#### Reminders and change of owner

Packages turn yellow when 80% of their time is used ([warning levels](https://netlicensing.io/wiki/warning-level)). A `WARNING_LEVEL_CHANGED` webhook triggers a renewal reminder in the owner's app.

When a car is sold, the maker's back end leaves the unlocks alone. It sets `active=false` on the running package if that package was bought by the previous owner and isn't meant to transfer. The new owner then picks their own package.

### Results

- Every service decision for a car comes from one validation, keyed by the VIN.
- The free first year starts at delivery and ends on its own. Owners then pick a package instead of losing everything.
- Owners can buy from the app, the car or the dealer, and all three paths create the same kind of license.
- One-time unlocks stay with the vehicle when it's resold.
- Packages and prices are maintained in the [Management Console](https://ui.netlicensing.io), and changing them doesn't require a head unit update.

Working on connected vehicle services? [Contact us](https://netlicensing.io/contact/) to talk through your setup.
