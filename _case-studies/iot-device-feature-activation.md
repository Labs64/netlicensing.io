---
layout: casestudy
title: "IoT & Device Feature Activation: Fleet-Wide Remote Feature Management"
description: "How an industrial IoT vendor can license premium capabilities per device across a customer's fleet with the Rental model, with renewal dates and warning levels for every device."
permalink: "/case-studies/iot-device-feature-activation/"
img: "/img/case-studies/netlicensing-case-study-iot-device-feature-activation.png"
tags:
- Case Studies
- Use Cases
- IoT
- Device Management
- Feature Activation
industry:
- IoT / Connected Devices
use-case:
- Device fleet management
- Remote feature activation
- On-demand upgrades
favorite-feature:
- Licensing Model "Rental"
- Warning Levels & Notifications
- NetLicensing REST API
---

### Challenge

A vendor builds sensor gateways for factories and warehouses. Every gateway has the same hardware and firmware. Two capabilities cost extra: on-device anomaly detection and a predictive maintenance model that runs on the gateway.

Customers don't buy these for the whole fleet at once. A plant manager might license anomaly detection on the twelve gateways at one production line for a year, and add another twenty in a new hall six months later. The old process was a spreadsheet of serial numbers and dates, and the firmware enabled features from a config file the support team pushed out by hand. Renewals were missed in both directions: some gateways kept working without a valid contract, and others stopped although the customer had paid.

### Approach

Each customer company is a licensee. The devices live inside it as individual licenses.

```
Product: Gateway Services
├── Module "Anomaly detection" – Rental, yellowThreshold = 30, redThreshold = 7 (days)
│   ├── Device:  FEATURE, one license per gateway, license number = serial
│   ├── 6 months: TIMEVOLUME 6 MONTH
│   └── 1 year:   TIMEVOLUME 1 YEAR
└── Module "Predictive maintenance" – Rental (same structure)
```

The [Rental](https://netlicensing.io/wiki/rental) model was made for this: many instances of one thing, each licensed for its own period. A gateway becomes licensed for anomaly detection when it has a FEATURE license and a running TIMEVOLUME license linked to it through `parentFeature`.

When a customer orders anomaly detection for a gateway, the vendor's order system makes two calls:

```bash
# 1. register the gateway in the module (license number = serial)
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "number=GW-30A1-0087" -d "licenseeNumber=CUST-ACME" \
  -d "licenseTemplateNumber=AD-DEVICE" \
  https://go.netlicensing.io/core/v2/rest/license

# 2. license it for a year, starting today
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "licenseeNumber=CUST-ACME" -d "licenseTemplateNumber=AD-1YEAR" \
  -d "parentFeature=GW-30A1-0087" -d "startDate=2026-11-05T00:00:00Z" \
  https://go.netlicensing.io/core/v2/rest/license
```

NetLicensing has no batch endpoint, so a fleet order of 40 gateways is a loop over these calls. The order system uses an API key with the role `ROLE_APIKEY_OPERATION`, and that key stays on the server.

#### What the gateways see

Gateways don't call NetLicensing themselves. The vendor's device cloud validates each customer a few times a day and pushes the result to the gateways during their regular check-in:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/xml" -X POST \
  https://go.netlicensing.io/core/v2/rest/licensee/CUST-ACME/validate
```

For each module, the response holds one entry per gateway, named by its serial, with `valid`, `expires` and `expirationWarningLevel`. A gateway enables a capability only while its own entry is valid. It keeps the last signed answer locally, so a gateway that loses its connection for a few days keeps working until the `expires` date it already knows.

#### Renewals

Rental gives every gateway a traffic light. With the thresholds above, an entry turns yellow 30 days before it expires and red 7 days before. The customer portal of the vendor's device cloud shows these colours per gateway, so a plant manager sees at a glance which devices need renewing. A [webhook](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED` triggers a renewal quote from the vendor's sales team.

Renewing is one more TIMEVOLUME license for the same `parentFeature`. When a gateway is scrapped or replaced, its FEATURE license is set to `active=false`.

### Results

- Every gateway has its own licensed period, and expired gateways turn their premium capabilities off automatically.
- Customers can license part of a fleet and grow it at any time, device by device.
- Renewals show up as yellow and red entries weeks in advance, instead of being found in a spreadsheet afterwards.
- The firmware is the same for every gateway. Which capabilities run is decided by licensing data, not by builds or config files.

Managing licensed capabilities across a device fleet? [Talk to us](https://netlicensing.io/contact/) or read the [Rental model documentation](https://netlicensing.io/wiki/rental).
