---
layout: casestudy
title: "Desktop Software ISV: Trial-to-Paid with Node-Locked Protection"
description: "How a desktop software vendor can run server-side trials with Try & Buy and limit each purchase to a set number of computers with Node-Locked."
permalink: "/case-studies/software-licensing/"
img: "/img/case-studies/netlicensing-case-study-software-licensing.png"
tags:
- Case Studies
- Use Cases
- Desktop Software
- ISV
- Trial Management
industry:
- Desktop Software / ISV
use-case:
- Software licensing
- Trial-to-paid conversion
- Device-bound licensing
favorite-feature:
- Licensing Model "Try & Buy"
- Licensing Model "Node-Locked"
- NetLicensing Shop
---

### Challenge

A small company sells a photo and video editing tool for Windows and macOS. Customers buy a perpetual license and may use it on two computers, say a desktop and a laptop.

Their old system worked with serial numbers checked inside the application. That caused two problems:

- A serial number worked on any number of machines, so one purchase often ended up on a whole team's computers.
- The 14-day trial started on the local clock. Turning the clock back or reinstalling gave users a fresh trial.

The vendor didn't want to run a license server of their own. They wanted the trial and the device limit enforced somewhere users couldn't touch.

### Approach

The vendor creates one product in the [NetLicensing Management Console](https://ui.netlicensing.io) with two product modules:

```
Product: PhotoCut (licenseeAutoCreate = true)
├── Module "Editor" – Try & Buy
│   ├── Trial: TIMEVOLUME, 14 days, price 0, automatic, hidden
│   └── Full license: FEATURE, EUR 99, one-time
└── Module "Devices" – Node-Locked, nodeSecretMode = CLIENT
    ├── Included devices: QUANTITY, quantity = 2, price 0, automatic
    └── Extra device: QUANTITY, quantity = 1, EUR 19
```

[Try & Buy](https://netlicensing.io/wiki/try-n-buy) handles the trial: NetLicensing creates the trial license on the first validation and records when it started. After 14 days validation returns `valid=false` unless the customer has bought the FEATURE license.

[Node-Locked](https://netlicensing.io/wiki/node-locked) handles the device limit. In client mode, NetLicensing stores each new `nodeSecret` it sees until the licensee's quantity is used up. Every licensee gets two device slots automatically, and customers can buy extra ones. NetLicensing doesn't generate the device ID itself. The application computes a stable hash from hardware data (see [How to generate a machine fingerprint](https://netlicensing.io/wiki/faq-how-to-generate-machine-fingerprint)).

On first start the application creates an installation ID for the customer account and validates. Because the product has licensee auto-create switched on, NetLicensing creates the licensee and its automatic licenses in the same call:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productNumber=PHOTOCUT" \
  -d "productModuleNumber0=M-DEVICES" \
  -d "nodeSecret0=3f9a1c...e07b" \
  https://go.netlicensing.io/core/v2/rest/licensee/CUST-104233/validate
```

The response holds one result per module. For "Editor" it contains `valid`, `evaluation` and `evaluationExpires`, which the application uses to show "9 days left in your trial". For "Devices" it contains `valid`, telling the application whether this computer is one of the allowed ones.

The API key built into the application has the role `ROLE_APIKEY_LICENSEE`. It can validate and open the shop, but it can't read or change the vendor's other data. Response signing is turned on, and the application checks the signature, so a fake local server can't return a made-up "valid" answer.

When the trial ends, or a third computer is refused, the application asks NetLicensing for a shop link and opens it in the browser:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "tokenType=SHOP" -d "licenseeNumber=CUST-104233" \
  -d "successURL=https://photocut.example/thanks" \
  https://go.netlicensing.io/core/v2/rest/token
```

The customer pays in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) with PayPal or Stripe. The new license goes to the same licensee, so there's no key to type in. The next validation simply returns `valid=true`.

#### Replacing a computer

When a customer gets a new laptop, support removes the old device's `nodeSecret` property from the license in the Console. The new laptop takes the free slot on its next validation. The vendor could also build a small "deactivate this device" page that does the same through the [License Services API](https://netlicensing.io/wiki/license-services).

#### Working offline

Validation results carry a `ttl`. The application stores the signed response and uses it until the `ttl` runs out, so a short loss of connection doesn't lock anyone out. It also remembers the latest time it has seen and asks for an online validation if the clock suddenly goes backwards (see [clock tampering](https://netlicensing.io/wiki/faq-clock-tampering)).

### Results

- The trial start date is stored in NetLicensing. Reinstalling the application or changing the clock doesn't restart it.
- Each purchase works on the number of computers the customer paid for. Customers who need more buy extra device slots in the Shop without contacting support.
- Purchases, renewals and extra devices all land on the same licensee, so the application never asks for a license key.
- The vendor runs no license server. Licensing setup and customer support happen in the Management Console.

Want to try this setup? [Create a free NetLicensing account](https://ui.netlicensing.io/#/register) or read the [Try & Buy](https://netlicensing.io/wiki/try-n-buy) and [Node-Locked](https://netlicensing.io/wiki/node-locked) documentation.
