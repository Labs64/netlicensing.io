---
layout: casestudy
title: "MedTech Imaging: Pay-Per-Study Analytics"
description: "How a medical imaging AI vendor can sell prepaid study credits per modality with Pay-per-Use, offer flat-rate site licences to large hospitals, and send no patient data to the licensing service."
permalink: "/case-studies/medtech-pay-per-study/"
img: "/img/case-studies/netlicensing-case-study-medtech-pay-per-study.png"
tags:
- Case Studies
- Use Cases
- Medical Technology
- Pay-Per-Use
industry:
- Medical Technology / Digital Health
use-case:
- Per-study consumption billing
- Site license management
- Prepaid credits
favorite-feature:
- Licensing Model "Pay-per-Use"
- Licensing Model "Subscription"
- Customer Portal
---

### Challenge

A company develops AI analysis for radiology: it flags suspicious findings on CT and MRI studies and measures them over time. It sold only annual site licences, priced for large hospitals.

That shut out the long tail. An imaging centre with one MRI scanner and three radiologists couldn't justify the annual fee, and a pilot at a university hospital took months of procurement before anyone could try the software on real cases. The company wanted a way to pay per study, prepaid, with the site licence still available for the big customers.

There was one firm requirement from the start: no patient data could leave the hospital for licensing purposes.

### Approach

Each hospital or imaging centre is a licensee. The analysis server runs inside the hospital and is the only component that talks to NetLicensing.

```
Product: RadAssist
├── Module "CT studies" – Pay-per-Use
│   └── Packs: QUANTITY 50, 200, 1000
├── Module "MRI studies" – Pay-per-Use
│   └── Packs: QUANTITY 50, 200, 1000
└── Module "Site licence" – Subscription
    └── 1 year: TIMEVOLUME 1 YEAR
```

**Per-study credits.** Each modality is a [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) module, because a CT and an MRI analysis cost different amounts. One credit is one analysed study. Before the server starts an analysis, it reserves the credit:

```bash
curl -u apiKey:SITE_API_KEY -H "Accept: application/xml" \
  -d "productModuleNumber0=M-CT" -d "reserveQuantity0=1" \
  https://go.netlicensing.io/core/v2/rest/licensee/HOSP-ST-MARY/validate
```

If the response is `valid=true`, the analysis runs, and `remainingQuantity` shows the new balance. If the balance is used up, the radiologist sees "No CT credits left" in the viewer, and the study is processed normally without AI assistance. The request contains the hospital's ID and a count. It never includes a patient name, study ID or image.

Reserving before the analysis (rather than reporting afterwards) means the hospital can't run analyses it hasn't paid for, even if the network drops halfway.

**Site licences.** A large hospital on an annual contract gets a [Subscription](https://netlicensing.io/wiki/subscription) license instead. When "Site licence" is valid, the server doesn't touch the credits at all. Some hospitals start on credits during the pilot and move to a site licence later. Their remaining credits stay on the account.

#### Staying ahead of the balance

Pay-per-Use modules have [warning levels](https://netlicensing.io/wiki/warning-level). When a hospital's CT credits get low, the level changes, and a `WARNING_LEVEL_CHANGED` [webhook](https://netlicensing.io/wiki/notifications) tells the vendor's account team to contact the hospital's purchasing department before the credits run out.

#### Buying and records

Small centres buy credit packs in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop). Hospitals that buy through purchase orders get their packs created by the vendor in the [Management Console](https://ui.netlicensing.io) and invoiced as usual.

Each purchase is a [transaction](https://netlicensing.io/wiki/transaction-services) in NetLicensing. Hospital administrators can look up their packs, balances and purchase history in the [Customer Portal](https://netlicensing.io/wiki/customer-portal). The detailed record of which studies were analysed, which a clinic may need for its own quality assurance, stays in the analysis server's local log inside the hospital, together with the clinical data it belongs to.

### Results

- Small imaging centres can start with a 50-study pack instead of an annual contract.
- Every analysis is paid for before it runs, and running out of credits never blocks a study from being read.
- Large hospitals keep a flat-rate site licence, and pilots can turn into site licences without losing credits.
- The licensing service only ever sees a hospital ID and a number. Patient data stays in the hospital.

Licensing software in a regulated environment? [Talk to us](https://netlicensing.io/contact/) about your setup.
