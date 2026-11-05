---
layout: casestudy
title: "Compliance & Licence Audit: Automated Overuse Detection and Audit-Ready Reporting"
description: "How an enterprise software vendor can prevent overuse instead of finding it in audits, using Node-Locked and Floating limits, warning levels and signed validation responses."
permalink: "/case-studies/compliance-licence-audit/"
img: "/img/case-studies/netlicensing-case-study-compliance-licence-audit.png"
tags:
- Case Studies
- Use Cases
- Enterprise Software
- Compliance Management
- License Audit
- Overuse Detection
industry:
- Enterprise Software / Compliance Management
use-case:
- License compliance monitoring
- Overuse prevention
- Entitlement enforcement
favorite-feature:
- Licensing Model "Node-Locked"
- Licensing Model "Floating"
- Warning Levels & Notifications
- Response Signing
---

### Challenge

A vendor sells risk analysis software to banks and insurers. Customers buy a number of installations and, for a server component, a number of concurrent users. Once a year the vendor audits each customer.

Those audits were unpleasant for everyone. The software didn't enforce anything, so customers counted installations in spreadsheets. When the audit found 140 installations against 100 purchased, nobody could say when the extra 40 had appeared. The true-up invoice turned into a negotiation, and the customer felt ambushed.

The vendor wanted to stop finding overuse after the fact and prevent it instead. Customers should see they're getting close to the limit and buy more before they hit it.

### Approach

Each customer is a licensee. The product has two modules that enforce limits directly:

```
Product: RiskAnalyzer
├── Module "Installations" – Node-Locked, nodeSecretMode = CLIENT, yellowThreshold = 90
│   └── Installation pack: QUANTITY, quantity = 10
└── Module "Server users" – Floating, maxCheckoutValidity = 900 s
    └── User pack: FLOATING, maxSessions = 5
```

**Installations.** With [Node-Locked](https://netlicensing.io/wiki/node-locked) in client mode, every installation sends a stable machine ID as `nodeSecret` when it validates. NetLicensing stores each new ID until the purchased quantity is reached, and further machines get `valid=false`. A customer with ten packs can run exactly 100 installations. The vendor's installer computes the machine ID, because NetLicensing doesn't generate fingerprints itself.

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/xml" \
  -d "productModuleNumber0=M-INSTALL" \
  -d "nodeSecret0=9c41e0...b2f7" \
  https://go.netlicensing.io/core/v2/rest/licensee/BANK-0042/validate
```

**Server users.** The server component checks out a [Floating](https://netlicensing.io/wiki/floating) session for each signed-in user and checks it in at logout. When all sessions are taken, the next user is told to wait or to ask their administrator for more seats.

#### Warning before the limit

Both models have [warning levels](https://netlicensing.io/wiki/warning-level). With `yellowThreshold = 90`, a customer turns yellow once 90% of its installation slots are taken, and red when they're all used. The vendor registers a [webhook](https://netlicensing.io/wiki/notifications) for `WARNING_LEVEL_CHANGED`. When it fires, the vendor's CRM creates a task for the account manager, and the customer's administrator gets an email: "You're using 92 of 100 installations."

#### Evidence both sides can trust

- The license's `nodeSecretN` properties are the list of registered machines. Support sees it in the [Management Console](https://ui.netlicensing.io), and retiring a machine means clearing its entry.
- Every purchase and every license change creates a [transaction](https://netlicensing.io/wiki/transaction-services) with a date. When a customer asks "since when do we have 100 installations?", the answer is right there.
- Validation responses are signed. The vendor attaches an RSA private key to the API key and sends `Accept: application/xml`. The application checks the signature with the matching public key, as described in [Signing the Response](https://netlicensing.io/wiki/signing-the-response), so a fake server can't fake a valid result. The customer's administrator can keep the signed responses as a record.

NetLicensing doesn't keep a log of every individual validation for the customer to browse. If a customer needs that level of detail for its own controls, the application writes the signed responses to the customer's log system.

### Results

- Overuse is prevented when it happens, instead of being found in a yearly audit. The software enforces the limit the customer paid for.
- Customers get a warning while they still have room, and buying more becomes a routine order, not a dispute.
- Registered machines and license history are visible in the Console, so the yearly audit is a quick look rather than a project.
- Signed responses protect the licensing decision against tampering on the customer's side.

Does your contract model depend on audits today? [Talk to us](https://netlicensing.io/contact/) about moving to built-in enforcement.
