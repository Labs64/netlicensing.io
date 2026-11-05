---
layout: casestudy
title: "Mobile Device Management: Fleet Tracking and Software Provisioning"
description: "How a company used NetLicensing as the register for its mobile devices: which device is issued to whom, where, under which contract, and which software it should get."
permalink: "/case-studies/mobile-device-management/"
img: "/img/case-studies/netlicensing-case-study-mobile-device-management-v2.png"
tags:
- Case Studies
- Use Cases
- Usage Tracking
- MDM
industry:
- Mobile
use-case:
- Validation
- Auto-Activation
- Device register
favorite-feature:
- Licensee Auto-Create
- Custom Properties
- Licensing Model "Subscription"
- Licensing Model "Multi-Feature"
---

### Challenge

Mobile devices are part of everyday business now. Employees are expected to work remotely, move between sites and still be as productive as at their desk. So companies hand out phones and tablets, and those devices need the right software wherever they are.

For system administrators, managing these devices is a big part of the job, for efficiency and for security. Every device has to be accounted for and kept up to date with the software it needs.

### Approach

A company came to us with exactly this situation. It had just rolled out mobile devices across several sites and departments, from engineers to executives, to make the whole company better connected.

What they hadn't planned for was keeping track of all those devices. Only a few employees were permanent staff. Much of the work was done by short-term contractors brought in for specific projects. Each department needed its own software, and several projects were always running at the same time. On top of that, devices were frequently passed between departments and sites. The company had to keep every device up to date and secure, and be able to tell quickly where a device was if it went missing.

They used NetLicensing to keep track of every device and the contract that assigned it to a person. Here's how that maps to NetLicensing:

```
Product: Company Devices (licenseeAutoCreate = true)
├── Module "Assignment" – Subscription
│   └── Contract period: TIMEVOLUME, length set per contract
└── Module "Software" – Multi-Feature
    └── FEATURE templates: FIELD-SURVEY, CAD-VIEWER, SALES-CRM, FLEET-NAV
```

**Every device is a licensee**, and its serial number is the licensee number. The company's device agent validates when a device is first switched on. Because licensee auto-create is on, NetLicensing registers the device on that first call, with no manual activation step:

```bash
curl -u apiKey:DEVICE_API_KEY -H "Accept: application/json" \
  -d "productNumber=DEVICES" \
  https://go.netlicensing.io/core/v2/rest/licensee/R58N70ABCDE/validate
```

**Who has it and where** is kept on the licensee as [custom properties](https://netlicensing.io/wiki/custom-properties): the person it's issued to, the department, the site. When a device moves to another department, IT updates those properties in the [Management Console](https://ui.netlicensing.io) or through the API from their asset tool.

**The contract** is a [Subscription](https://netlicensing.io/wiki/subscription) license with the contract's start date and length. While the contract runs, validation returns `valid=true` and the contract end in `expires`. When a contractor's project ends, the device's assignment ends with it. The device agent locks the company apps until IT assigns the device to someone new.

**The software** a device should carry is a set of [Multi-Feature](https://netlicensing.io/wiki/multi-feature) licenses. The engineering department's devices get FIELD-SURVEY and CAD-VIEWER, and sales gets SALES-CRM. The company's deployment tool reads the validation result and installs or removes apps to match. When a device changes department, IT swaps its feature licenses, and the next sync brings the right software.

NetLicensing doesn't locate devices or push software itself. It's the register the company's own device tools work from.

### Results

The company used NetLicensing to track each device by serial number, together with the person it was issued to and the site where they were based. At any time they had a complete list of all devices and locations. Their tools used that list to deploy the required software and updates and to keep an eye on every device.

Need a register for devices, contracts and entitlements? [Contact us](https://netlicensing.io/contact/).
