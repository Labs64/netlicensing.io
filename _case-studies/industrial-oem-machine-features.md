---
layout: casestudy
title: "Industrial OEM: Monetizing Machine Features"
description: "How a machine builder can sell software options per machine across a customer's plant with Node-Locked and offer prepaid hours of a premium operating mode with Pay-per-Use."
permalink: "/case-studies/industrial-oem-machine-features/"
img: "/img/case-studies/netlicensing-case-study-industrial-oem-machine-features.png"
tags:
- Case Studies
- Use Cases
- Industrial Automation
- OEM Licensing
- Feature-On-Demand
industry:
- Industrial Machinery / OT/IoT
use-case:
- Machine-bound licensing
- Feature-on-demand
- Usage-based metering
favorite-feature:
- Licensing Model "Node-Locked"
- Licensing Model "Pay-per-Use"
- Response Signing
---

### Challenge

A mid-size company builds laser cutting machines. Their controller software has options customers pay extra for: a nesting optimiser that saves sheet metal, a camera-based part sorter, and a high-power mode for thick material that wears the laser source faster.

Options used to be enabled at the factory, so they were part of the machine order. A plant that bought three machines without the nesting optimiser and later wanted it on all of them needed a service visit for each one. The high-power mode was all or nothing, although most customers needed it only now and then.

Every machine already connects to the builder's remote service gateway for diagnostics, so remote activation was possible. What was missing was a licensing system behind it.

### Approach

Each customer plant is a licensee. Its machines are identified by their serial numbers.

```
Product: LaserLine Controller
├── Module "Nesting optimiser" – Node-Locked, nodeSecretMode = CLIENT
│   └── Per machine: QUANTITY, quantity = 1
├── Module "Part sorter" – Node-Locked, nodeSecretMode = CLIENT
│   └── Per machine: QUANTITY, quantity = 1
└── Module "High-power hours" – Pay-per-Use
    ├── 50 hours:  QUANTITY 50
    └── 200 hours: QUANTITY 200
```

**Options per machine.** Every option is its own [Node-Locked](https://netlicensing.io/wiki/node-locked) module, and the machine serial is the `nodeSecret`. A plant that buys the nesting optimiser for two machines has two slots. The first two machines that ask for it get it, and a third is refused. The plant doesn't have to decide upfront which machines those are. If a machine is retired, service clears its serial from the license, and the slot is free for another machine.

**Usage-based mode.** High-power hours are a prepaid [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) balance for the whole plant, shared by all machines. The controller counts the minutes it runs in high-power mode.

The service gateway, not the controller itself, talks to NetLicensing. It validates the plant every few minutes and reports the high-power minutes used since the last call, rounded to full hours, in the same request:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/xml" \
  -d "productModuleNumber0=M-NESTING" -d "nodeSecret0=LL-6040-20415" \
  -d "productModuleNumber1=M-HIGHPOWER" -d "usedQuantity1=2" \
  https://go.netlicensing.io/core/v2/rest/licensee/PLANT-ACME-STUTTGART/validate
```

The response says whether this machine has the nesting optimiser and how many high-power hours the plant has left (`remainingQuantity`). The gateway passes a signed summary to the controller. The controller checks the signature, enables the licensed options, and greys out high-power mode in the operator panel when the balance reaches zero.

#### When the connection drops

Production can't stop because a network link is down. The controller keeps the last signed result until its `ttl` runs out, and the builder sets the TTL in the NetLicensing settings to cover a typical outage. Hours used offline are counted locally and reported when the gateway is back. They aren't lost, only reported late.

Plants with no outside connection at all are a separate case. See [offline and air-gapped deployment](/case-studies/offline-air-gapped-deployment/).

#### Buying

The plant's maintenance manager orders options and hour packs in the builder's customer portal, which opens the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) with a shop token for the plant. Larger orders go through the builder's sales team, which creates the licenses in the [Management Console](https://ui.netlicensing.io) and invoices them with the service contract.

A [webhook](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED` warns the plant when its high-power hours get low, so the next pack is ordered before a big job.

### Results

- Software options are sold per machine after delivery and activated remotely, with no service visit.
- Plants decide later which machines get an option, and slots can move to another machine when one is retired.
- High-power mode is paid by the hour from a shared plant balance, instead of being all or nothing.
- Licensing results are signed, and short network outages don't stop production.

Building machines with paid software options? [Contact us](https://netlicensing.io/contact/) to talk about your controller and gateway setup.
