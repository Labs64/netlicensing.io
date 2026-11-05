---
layout: casestudy
title: "Embedded Devices: Feature-on-Demand Licensing"
description: "How a smart energy device maker can ship one hardware build, unlock features per device after installation and deliver signed offline validation files to sites without connectivity."
permalink: "/case-studies/embedded-feature-on-demand/"
img: "/img/case-studies/netlicensing-case-study-embedded-feature-on-demand.png"
tags:
- Case Studies
- Use Cases
- Embedded Systems
- Smart Energy
- Feature-On-Demand
industry:
- Embedded Systems / Smart Energy / Edge Computing
use-case:
- Device-bound licensing
- Post-shipment feature unlock
- Offline-resilient validation
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Try & Buy"
- Offline Validation File
---

### Challenge

A company builds energy controllers for commercial buildings: the box in the plant room that manages solar panels, batteries and EV chargers. It used to sell three hardware variants, Basic, Pro and Grid, which differed mostly in firmware. Keeping three variants in stock was expensive. Worse, a customer who bought Basic and later wanted the battery optimisation of Pro needed a technician and a new box.

The company wanted a single build. Features would be unlocked per device after installation, with a trial for the most expensive one. Many controllers sit in basements with no reliable network, so it also had to work offline.

### Approach

Every controller is its own licensee, and the serial number printed on the device is the licensee number. That keeps the model simple: whatever is licensed to the serial belongs to that box and moves with it if it's sold on.

```
Product: EnergyController
├── Module "Features" – Multi-Feature
│   └── FEATURE templates: BATTERY-OPT, EV-LOADMGMT, MODBUS-EXPORT
└── Module "Grid services" – Try & Buy
    ├── Trial: TIMEVOLUME 30 days, price 0, automatic, hidden
    └── Full:  FEATURE, one-time price
```

Each unlockable feature is a [Multi-Feature](https://netlicensing.io/wiki/multi-feature) license template, and its number is the feature ID the firmware looks for. Grid services, the most valuable option, uses [Try & Buy](https://netlicensing.io/wiki/try-n-buy). Every controller gets 30 days to try it, counted from its first validation, and then the customer decides.

Devices are created when they leave the factory, so all of them exist before they ever go online. The production line registers each one:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "number=EC-2611-004582" -d "productNumber=ENERGYCTRL" \
  https://go.netlicensing.io/core/v2/rest/licensee
```

#### Online controllers

A connected controller validates once a day through the vendor's cloud and stores the signed response:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/xml" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/EC-2611-004582/validate
```

The response lists each feature with `valid=true` or `false`, and for "Grid services" whether it's in evaluation and when that ends. The firmware checks the XML signature with the vendor's public key and enables the features that are valid. It uses the stored response until the `ttl` it contains runs out.

#### Offline controllers

For controllers without a network, the installer brings the licence on a USB stick. The vendor creates an [offline validation file](https://netlicensing.io/wiki/faq-offline-validation-file) for the serial in the [Management Console](https://ui.netlicensing.io), or requests it through the API with `forOfflineUse=true`. The file is the same signed validation result, so the firmware checks it in exactly the same way.

An offline file is a snapshot. A feature bought later needs a new file, and a trial that ends or a purchase made after the file was created only shows up with the next file. Installers bring a fresh one on each service visit.

#### Buying a feature

The building owner buys features in the vendor's web portal, which opens the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) for the device's serial with a shop token. Installers can also order on the customer's behalf: the vendor's partner system creates the FEATURE license directly through the API. Either way, an online controller picks up the new feature at its next daily validation.

### Results

- One hardware build and one firmware image cover every product variant.
- Features can be added to a device years after installation without a technician, for controllers that are online.
- Offline sites use the same signed licensing data, delivered as a file.
- Every controller gets a 30-day trial of the premium option, counted on the NetLicensing side.

Designing feature-on-demand for your own hardware? Read about [offline license validation](https://netlicensing.io/wiki/offline-license-validation) or [contact us](https://netlicensing.io/contact/).
