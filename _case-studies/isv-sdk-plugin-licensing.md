---
layout: casestudy
title: "ISV Ecosystem: Monetizing SDKs and Plugins"
description: "How a platform vendor with an open-source core can sell commercial plugins, limit production deployments per customer and let channel partners provision their own customers."
permalink: "/case-studies/isv-sdk-plugin-licensing/"
img: "/img/case-studies/netlicensing-case-study-isv-sdk-plugin-licensing.png"
tags:
- Case Studies
- Use Cases
- Developer Tools
- SDK Licensing
- Plugin Monetization
industry:
- Platform / Developer Tools ISV
use-case:
- Commercial plugin licensing
- Per-deployment entitlements
- Channel partner management
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Node-Locked"
- API Key Roles
---

### Challenge

A company maintains an open-source workflow engine that businesses run on their own servers. It earns money from commercial plugins: connectors for SAP and Salesforce, an audit export, a high-availability add-on. Most customers buy through system integrators, not directly.

The plugins were simply downloads behind a login. Once a customer had the files, nothing stopped them from running the plugins on ten production servers after paying for two, or from passing them on. Integrators asked the vendor by email to "activate" new customers, and someone in the vendor's office typed the details into a spreadsheet.

### Approach

Each end customer is a licensee. The open-source core is never licensed. Only the commercial plugins check NetLicensing, and they do it when the engine starts.

```
Product: FlowEngine Commercial
├── Module "Plugins" – Multi-Feature
│   └── FEATURE templates: CONN-SAP, CONN-SALESFORCE, AUDIT-EXPORT, HA-CLUSTER
└── Module "Production nodes" – Node-Locked, nodeSecretMode = CLIENT
    └── Node pack: QUANTITY, quantity = 2
```

**Plugins** are [Multi-Feature](https://netlicensing.io/wiki/multi-feature) licenses. Each plugin reads its own feature from the validation result and stays inactive if it isn't licensed.

**Production nodes** are limited with [Node-Locked](https://netlicensing.io/wiki/node-locked). The engine sends a node ID it generates once per installation and stores in its data directory. A customer with one node pack can run commercial plugins on two production servers. A third server starts the engine without them and logs why. Test and development installations run in a "non-production" mode that doesn't use a node slot, but that mode is only allowed for a few hours at a time.

On start-up, the engine validates once:

```bash
curl -u apiKey:CUSTOMER_API_KEY -H "Accept: application/xml" \
  -d "productModuleNumber0=M-NODES" -d "nodeSecret0=node-4f1a9e2c" \
  https://go.netlicensing.io/core/v2/rest/licensee/CUST-NORDBANK/validate
```

It repeats the call before the cached result's `ttl` ends. The API key in the customer's configuration has the role `ROLE_APIKEY_LICENSEE`, which can validate but not read or change anything else. Responses are signed, and the engine verifies them with the public key it ships with.

#### Channel partners

Each integrator gets its own API key with the role `ROLE_APIKEY_OPERATION` (see [Reseller setup](https://netlicensing.io/wiki/faq-reseller)). With it, the integrator's systems create the end customer as a licensee and add plugin and node licenses after a sale. No email to the vendor is needed. Integrators tag their customers with a custom property (`partner=...`), so the vendor sees in the [Management Console](https://ui.netlicensing.io) which partner sold what, and can settle commissions from that list in its own accounting.

Because every partner has a separate key, the vendor can revoke one partner's access without affecting anyone else.

#### Moving a server

When a customer replaces a production server, their administrator asks support, or uses a small self-service page on the vendor's site, to clear the old node ID. The new server takes the slot on its next start.

### Results

- Commercial plugins run only where they're licensed, and production nodes are limited to what the customer bought.
- Integrators provision customers from their own systems, and every license shows which partner sold it.
- The open-source core stays free and unaffected. Only the commercial plugins depend on NetLicensing.
- Keys in customer installations can validate and nothing else.

Selling plugins or SDKs through partners? Read about [API key roles](https://netlicensing.io/wiki/security) or [contact us](https://netlicensing.io/contact/).
