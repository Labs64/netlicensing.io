---
layout: post
title: "GDPR and Software Licensing Data: What Vendors Should Do"
description: "Which personal data software licensing processes, who is controller and processor, and how to answer access and erasure requests."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-gdpr-software-licensing-data-hero.png
  alt: "Software licensing data under the GDPR: controller, processor and customer rights"
tags:
  - "GDPR"
  - "Data Protection"
  - "Software Licensing"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-gdpr-software-licensing-data-hero.png
---

Your license check sends an identifier every time the app starts. It looks like plumbing. If it can be linked to a person, it's personal data.

## Key takeaways

- Identifiers, device data and IP addresses can all be personal data.
- With a hosted licensing service, you're usually the controller and the service is your processor.
- Licensing rarely needs consent; the contract is often the lawful basis.
- Send less data and requests get easier to answer.

## What licensing data usually contains

| Data | Why it's there | Keep it small by |
|---|---|---|
| Customer or installation ID | Finding the license | Using a pseudonymous ID |
| Name and email | Support, invoices | Keeping them in your CRM |
| Device fingerprint | Node-locked licensing | Sending a hash, not raw hardware details |
| IP address | Part of every request | Limiting how long logs are kept |
| Purchase details | Orders and tax | Keeping only what the law and the sale need |

Pseudonymised data is still personal data when you can link it back to someone (Article 4 GDPR).

## Controller and processor

You decide why and how your customers' data is processed, so you're the **controller**. A hosted licensing service that processes it for you is your **processor**, and Article 28 requires a contract between you. NetLicensing offers a [Data Processing Agreement](https://netlicensing.io/wiki/data-processing-agreement-dpa).

> The easiest personal data to protect is the data you never send.

## Lawful basis and information

Licensing a product someone bought is usually necessary for the contract (Article 6(1)(b)). Protecting against unlicensed use may rest on legitimate interests. Consent is only one basis, so don't ask for it unless you rely on it. Tell customers who processes their data (Articles 13 and 14); our [privacy statement template](https://netlicensing.io/wiki/privacy-statement-data-processing-by-netlicensing) is a starting point.

## Answering requests

| Right | Article | In NetLicensing |
|---|---|---|
| Access | 15 | Look up and export the licensee |
| Rectification | 16 | Update the licensee |
| Erasure | 17 | Delete the licensee, after checking legal retention duties |
| Restriction | 18 | Deactivate the licensee |
| Portability | 20 | Export as JSON or XML |

Answer within one month (Article 12(3)). The [Privacy Center](https://netlicensing.io/wiki/privacy-center) links each how-to.

## If something goes wrong

A processor must tell the controller about a personal data breach without undue delay. The controller decides on notifying the authority, within 72 hours where required (Article 33).

## A short checklist

1. List every field your app and shop send.
2. Remove what licensing doesn't need.
3. Sign a DPA with each processor.
4. Add the processor to your privacy notice and records (Article 30).
5. Practise one export and one deletion.

## Questions people ask

**Is a license ID personal data?**
It is if it can be linked to an identifiable person.

**Do I need consent to validate licenses?**
Usually not, when validation is needed to perform the contract.

**Can I delete invoices on request?**
Not if the law requires you to keep them.

This article is general information, not legal advice. See the [Trust page]({{ "/trust/" | relative_url }}) for how NetLicensing handles data.

*Happy Licensing!*
