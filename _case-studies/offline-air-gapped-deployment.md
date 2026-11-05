---
layout: casestudy
title: "Offline & Air-Gapped Deployment: Secure Licensing for Disconnected Environments"
description: "How a vendor of software for secure facilities can license fully disconnected installations, with signed offline validation files for single machines and the NetLicensing Agent for isolated networks."
permalink: "/case-studies/offline-air-gapped-deployment/"
img: "/img/case-studies/netlicensing-case-study-offline-air-gapped-deployment.png"
tags:
- Case Studies
- Use Cases
- Enterprise Software
- Defense
- Healthcare
- Security
- Offline Licensing
industry:
- Enterprise Software / Defense / Healthcare
use-case:
- Air-gapped environments
- Offline validation
- Secure deployments
- Regulated industries
favorite-feature:
- Offline Validation File
- NetLicensing Agent
- Response Signing
---

### Challenge

A company makes analysis software for laboratories and control rooms: places like research labs, utility control centres and government facilities. Many of its installations run on networks with no internet connection at all, by design. Some are a single workstation in a shielded room. Others are an isolated network with a few dozen workstations.

The company had used USB dongles. Shipping them through secure courier took weeks, a broken dongle stopped work until a replacement arrived, and dongles don't work in the virtual machines these customers increasingly use. Every other customer used NetLicensing online already, and the company wanted to use the same licensing data for the disconnected sites too.

### Approach

All customers, connected or not, are set up the same way in the [Management Console](https://ui.netlicensing.io): the same product, modules and license templates. What differs is how a disconnected installation gets its answer. There are two options, depending on the site.

```
Product: LabAnalyzer
├── Module "Core"     – Subscription (yearly)
└── Module "Modules"  – Multi-Feature
    └── FEATURE templates: SPECTRAL, CHROMATOGRAPHY, REPORTING-21CFR
```

#### Option 1: a signed file for a single workstation

For a standalone machine, the licensee is the workstation itself, and its licensee number is a machine ID that the installer shows on screen. The vendor creates an [offline validation file](https://netlicensing.io/wiki/faq-offline-validation-file) for that licensee, either in the Console or through the API:

```bash
curl -u apiKey:SIGNING_API_KEY -H "Accept: application/xml" \
  -d "forOfflineUse=true" \
  https://go.netlicensing.io/core/v2/rest/licensee/WS-7F3A-91C2-0B44/validate \
  -o WS-7F3A-91C2-0B44.xml
```

The file is a normal validation result, signed with the private key attached to the API key. The customer's administrator brings it into the secure area on approved media. The application checks the signature with the public key it ships with (the Java and C# client libraries do this in `validateOffline`), checks that the licensee number in the file matches its own machine ID, and then reads the result: subscription valid until a date, which modules are on.

A file is a snapshot. A renewal or a new module needs a new file. Because the file can't count anything, the vendor uses only models that don't change state on validation here: Subscription and Multi-Feature, no Floating and no Pay-per-Use.

#### Option 2: the NetLicensing Agent for an isolated network

For a site with many workstations, the vendor uses the [NetLicensing Agent](https://netlicensing.io/wiki/netlicensing-agent), available on selected plans. The Agent is a Java server that runs inside the customer's network and answers validation requests in place of the cloud:

1. On a connected machine, the vendor exports the customer's licensees with `--action=export-assets`. The export can be bound to a smart card, which protects against copying the Agent's data and rolling it back to an older snapshot.
2. The export files are carried into the secure network and loaded with `--action=import-assets`.
3. The Agent runs with `--action=run-agent-offline`, behind an HTTPS reverse proxy ([Securing the Agent with SSL/TLS](https://netlicensing.io/wiki/securing-the-agent-with-ssl-tls)).

The application only changes its API base URL to the Agent's address. Everything else, including Floating seats for shared workstations, works as it does online. Updates are the same export and import again.

The Agent has [known limitations](https://netlicensing.io/wiki/netlicensing-agent#known-limitations) that the vendor plans around. Licensee auto-create isn't supported, so all licensees are created in the cloud beforehand. Floating sessions count as checked in right after an import, so the module's `maxCheckoutValidity` is kept short. And Pay-per-Use isn't recommended on the current Agent release.

#### Clocks

Offline, the expiry check depends on the local clock. The application stores the latest time it has seen and refuses to start if the clock jumps backwards (see [clock tampering](https://netlicensing.io/wiki/faq-clock-tampering)). With a smart card, the Agent's own time tracking is protected as well.

### Results

- Disconnected sites use the same products, templates and licenses as connected customers. Nothing is maintained twice.
- Single workstations get a signed file that can't be edited without breaking the signature.
- Isolated networks get a local Agent that behaves like the cloud service, including floating seats.
- Dongles and secure courier shipments are no longer needed.

Licensing software for disconnected environments? Read [Offline License Validation](https://netlicensing.io/wiki/offline-license-validation) or [contact us](https://netlicensing.io/contact/) about the NetLicensing Agent.
