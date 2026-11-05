---
layout: casestudy
title: "OEM & Embedded Software Licensing"
description: "How a control software vendor can let OEM partners license each machine they build, bind the license to a secret written at production, and count units per partner for royalties."
permalink: "/case-studies/oem-embedded-licensing/"
img: "/img/case-studies/netlicensing-case-study-oem-embedded-licensing.png"
tags:
- Case Studies
- Use Cases
- OEM Software
- Embedded Systems
- Multi-Tenant
industry:
- OEM Software / Embedded Systems
use-case:
- OEM partnerships
- Device-bound licensing
- Per-unit royalty counting
favorite-feature:
- Licensing Model "Node-Locked"
- API Key Roles
- Custom Properties
---

### Challenge

A software company makes motion control software. It doesn't sell to factories directly. Machine builders, its OEM partners, put the software into their CNC machines and robots and sell those machines to their own customers.

Until now each OEM received a list of serial numbers and typed one into every machine at the end of production. Nothing tied a serial to a particular machine, so the same number could end up in several. The software company only knew how many machines a partner had built when the partner reported it, once a quarter, and royalties were calculated from that report.

### Approach

Each machine is a licensee, and the machine's serial number is the licensee number. Every OEM partner provisions its own machines.

```
Product: MotionCore
└── Module "Runtime" – Node-Locked, nodeSecretMode = PREDEFINED
    └── Per machine: QUANTITY, quantity = 1
```

[Node-Locked](https://netlicensing.io/wiki/node-locked) in predefined mode means the secret is known before the machine ever validates. At the end of the OEM's production line, the test station generates a random secret, writes it into the controller's protected storage, and registers the machine:

```bash
# 1. create the machine, tagged with the OEM partner
curl -u apiKey:OEM_API_KEY -H "Accept: application/json" \
  -d "number=KRL-R12-0083311" -d "productNumber=MOTIONCORE" -d "oem=KRAUSE-ROBOTICS" \
  https://go.netlicensing.io/core/v2/rest/licensee

# 2. give it a runtime license with the stored secret
curl -u apiKey:OEM_API_KEY -H "Accept: application/json" \
  -d "licenseeNumber=KRL-R12-0083311" -d "licenseTemplateNumber=RUNTIME-1" \
  -d "nodeSecret0=f3a9c1...7e20" -d "oem=KRAUSE-ROBOTICS" \
  https://go.netlicensing.io/core/v2/rest/license
```

The controller later validates with that secret. Only a controller that holds the right secret gets `valid=true`. Copying the licensee number to another machine doesn't help, because the other machine doesn't have the secret.

Each OEM partner has its own API key with the role `ROLE_APIKEY_OPERATION`, used only by the test station's server. If a partner's key leaks or the partnership ends, the vendor revokes that one key, and nobody else is affected. The `oem` field isn't a NetLicensing field. Any extra field is stored as a [custom property](https://netlicensing.io/wiki/custom-properties), so every machine and license carries the name of the partner that built it.

#### Royalties

Each runtime license is created the moment a machine leaves the production line, and every license creation is recorded as a [transaction](https://netlicensing.io/wiki/transaction-services). At the end of each month, the vendor's billing job lists the licenses created per partner and invoices the royalties from that list. Partners no longer report numbers. The licenses are the numbers.

#### In the field

Factories don't always have a reliable internet connection. A controller validates when it starts and once a day, keeps the last signed response until its `ttl` runs out, and keeps running if a validation fails within that window. The vendor sets a long TTL for this product. A machine that's sold on keeps its licensee number and secret, so the new owner doesn't need to do anything.

For production halls with no outside connection at all, see [offline and air-gapped deployment](/case-studies/offline-air-gapped-deployment/).

### Results

- Every machine's license is bound to a secret written at production, so a licensee number copied to another machine doesn't work.
- OEM partners provision machines from their own test stations, with their own API key.
- Royalties are based on licenses actually created, not on quarterly reports.
- Controllers in the field keep working through normal network outages.

Shipping your software inside partners' hardware? [Contact us](https://netlicensing.io/contact/) to discuss an OEM setup.
