---
layout: casestudy
title: "CAD/CAE Vendor: Dongle to Hybrid Licensing"
description: "How an engineering software vendor can replace USB dongles with Floating seat pools that work on workstations, VMs and cloud instances, and sell plugins and maintenance on top."
permalink: "/case-studies/cad-cae-hybrid-licensing/"
img: "/img/case-studies/netlicensing-case-study-cad-cae-hybrid-licensing.png"
tags:
- Case Studies
- Use Cases
- Engineering Software
- Hybrid Licensing
- Floating
industry:
- Engineering Software / ISV
use-case:
- Hybrid deployment licensing
- Dongle-to-cloud migration
- Reseller self-service
favorite-feature:
- Licensing Model "Floating"
- Licensing Model "Multi-Feature"
- NetLicensing Agent
---

### Challenge

A mid-size vendor makes CAD and simulation software for mechanical engineers. For years each seat came with a USB dongle, and larger customers ran a local license server for shared seats.

Customers' IT departments kept moving work to virtual machines and cloud instances, and that's where dongles stop working. A simulation that should run on a cloud machine overnight needed a dongle plugged into a workstation in the office. Lost and broken dongles meant shipping hardware. Resellers activated seats by e-mailing the vendor's support team.

The vendor wanted seats that aren't tied to a piece of hardware, without forcing anyone to give up the perpetual licenses they already own.

### Approach

Each customer company is one licensee. Its engineers all use the same licensee number, which is entered once when the software is installed (or pushed out by IT).

```
Product: DesignSuite
├── Module "Seats" – Floating, maxCheckoutValidity = 1800 s
│   ├── 1 seat:  FLOATING, maxSessions = 1
│   └── 5 seats: FLOATING, maxSessions = 5
├── Module "Plugins" – Multi-Feature
│   └── FEATURE templates: FEA, CFD, CAM, RENDER
└── Module "Maintenance" – Subscription
    └── 1 year: TIMEVOLUME 1 YEAR
```

**Seats.** With [Floating](https://netlicensing.io/wiki/floating), a customer owns a pool of concurrent seats. When an engineer starts the application, it checks out a session. When they close it, the session is checked back in:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productModuleNumber0=M-SEATS" \
  -d "sessionId0=ws-0231:j.miller" \
  -d "action0=checkOut" \
  https://go.netlicensing.io/core/v2/rest/licensee/ACME-ENG/validate
```

If a seat is free, the response returns `valid=true` and an `expirationTimestamp`. The application checks out again before that time to keep the seat while the engineer works. It sends `action0=checkIn` on exit. If the application crashes and never checks in, the seat is freed automatically after `maxCheckoutValidity`, here 30 minutes. The session ID is chosen by the application (host plus user works well), so the same pool works on a workstation, in a VM and on a cloud instance.

Existing dongle owners get FLOATING licenses with the same seat count. Floating licenses don't expire, so their perpetual rights stay perpetual.

**Plugins.** Simulation and CAM modules are [Multi-Feature](https://netlicensing.io/wiki/multi-feature) licenses. The same validation response lists each plugin with `valid=true` or `false`, and the application enables only the menus a customer paid for.

**Maintenance.** The yearly maintenance plan is a [Subscription](https://netlicensing.io/wiki/subscription). NetLicensing returns its `expires` date. The application compares that date with its own release date: a version released while maintenance was active keeps working forever, and newer versions ask the customer to renew. That rule lives in the application. NetLicensing provides the date.

#### Resellers

Resellers sell most seats. Each gets its own API key with the role `ROLE_APIKEY_OPERATION`, which lets the reseller's system create licensees and licenses for new customers (see [Reseller setup](https://netlicensing.io/wiki/faq-reseller)). Because every reseller has a separate key, one key can be revoked without touching the others.

#### Sites without internet

A few customers run simulations on networks with no internet access at all. For them the vendor uses the [NetLicensing Agent](https://netlicensing.io/wiki/netlicensing-agent), available on selected plans. The Agent runs inside the customer's network and answers validation requests in place of the cloud. The vendor exports the customer's licenses, the customer imports them on the Agent, and the application points to the Agent's address instead of the cloud. After an import, the Agent treats all sessions as checked in, so the vendor keeps `maxCheckoutValidity` short to limit the effect.

### Results

- Seats are no longer tied to hardware. The same pool covers office workstations, VMs and cloud instances, and nobody has to ship dongles anymore.
- A crashed session frees its seat on its own after 30 minutes.
- Dongle customers kept their perpetual rights when they moved to floating seats.
- Resellers create customers and licenses from their own systems, so activations no longer go through the vendor's support inbox.
- Air-gapped sites use the same licensing data through the Agent.

Planning a move away from dongles? Read [Node-Locked vs Floating licenses](https://netlicensing.io/wiki/node-locked-vs-floating-licenses) or [contact us](https://netlicensing.io/contact/).
