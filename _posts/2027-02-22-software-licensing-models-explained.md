---
layout: post
title: "Software Licensing Models Explained: How to Choose"
description: "Compare software licensing models: trial, subscription, feature, node-locked, floating, pay-per-use, quota, rental and perpetual, with pricing examples."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-licensing-models-explained-hero.png
  alt: "Software licensing models explained: how to choose the right one"
tags:
  - "Software Licensing"
  - "Licensing Models"
  - "Software Monetization"
  - "Pricing Strategy"
  - "SaaS Licensing"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-licensing-models-explained-hero.png
    - /img/blog/netlicensing-licensing-models-by-limit.png
---

The product is ready, and the pricing meeting is not going well. Sales wants seats. Engineering says a seat means nothing for a tool that runs in a build pipeline. Finance wants something that renews. Someone asks whether the biggest prospect, with no internet in the lab, can buy it at all.

Everyone is arguing about price, but the open question comes earlier: **what exactly does a license limit?** Answer that, and the licensing model mostly picks itself.

A software licensing model is the rule that decides what a customer may use, for how long and how much.

## Key takeaways

- Start with the limit: time, features, devices, concurrent sessions, consumption, capacity or nothing.
- Most products combine two or three models, for example a trial, a subscription and paid add-ons.
- Node-locked licensing counts devices; floating licensing counts sessions running at the same time.
- Pay-per-use spends credits. A quota sets a ceiling that your application enforces.
- In NetLicensing each product module uses one model, and one validation returns the results for all modules.

## Start with what you limit

![Seven kinds of limit and the licensing models that express them: time, features, devices or named users, concurrent sessions, consumption, capacity, and no limit once bought]({{ "/img/blog/netlicensing-licensing-models-by-limit.png" | relative_url }}){: .img-responsive }

Ask what makes one customer's use worth more than another's. If a larger customer uses the product longer, limit time. If they need more of its parts, limit features. If more people share it, count sessions or devices. If they simply do more with it, meter consumption or cap capacity.

Pick a limit your customer can predict and your application can observe. A metric nobody can explain on an invoice turns into a support ticket.

## Software licensing models compared

NetLicensing has ten licensing models you configure directly. Named user and perpetual licenses are two common patterns that you build from them.

<div class="table-responsive" markdown="1">

| Model | What it limits | Typical use | Your application sends | Plan |
| --- | --- | --- | --- | --- |
| [Try & Buy](https://netlicensing.io/wiki/try-n-buy) | Evaluation time before purchase | Downloadable software with a trial | Nothing extra | All |
| [Subscription](https://netlicensing.io/wiki/subscription) | Calendar time, renewable | Monthly or yearly licenses | Nothing extra | All |
| [Discount](https://netlicensing.io/wiki/discount) | Price at checkout, not usage | Promo codes and campaigns | Nothing at validation | All |
| [Multi-Feature](https://netlicensing.io/wiki/multi-feature) | Which features are on | Add-ons and editions | Nothing extra | Basic and above |
| [Floating](https://netlicensing.io/wiki/floating) | Sessions at the same time | Tools shared by a team | Session ID, check-out or check-in | Premium and Select |
| [Node-Locked](https://netlicensing.io/wiki/node-locked) | Which devices | Workstation software | Node secret | Premium and Select |
| [Pricing Table](https://netlicensing.io/wiki/pricing-table) | Plans and their features | SaaS tiers and memberships | Nothing extra | Basic, Premium and Select |
| [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) | Credits consumed | API calls, processed documents | Quantity used or reserved | Premium and Select |
| [Quota](https://netlicensing.io/wiki/quota) | A capacity ceiling | Users, projects, storage | Nothing; your app counts usage | Basic, Premium and Select |
| [Rental](https://netlicensing.io/wiki/rental) | Time for each licensed instance | Fleets of devices or assets | Nothing extra | Select |
{: .table .table-striped }

</div>

Plan details are on the [pricing page]({{ "/pricing/" | relative_url }}).

### Time: Try & Buy and Subscription

Try & Buy starts a free evaluation on the first validation, then unlocks the product once the customer buys it. Subscription licenses a number of days and extends them on renewal. It can also grant a free automatic license and offer a grace period when a renewal is late.

### Features: Multi-Feature and Pricing Table

Multi-Feature sells features one by one, and validation reports each as valid or not. Pricing Table groups features and quantities into named plans, such as free, basic and premium. Use the first for add-ons, the second when customers choose a tier.

### Devices, users and sessions: Node-Locked and Floating

Node-Locked binds a license to a secret that identifies a node, often a hardware fingerprint, with a quota of allowed nodes. Your application creates that identifier, because NetLicensing does not generate fingerprints.

Floating sells concurrent sessions. The application checks a session out and checks it back in. If a client crashes, the session returns when the module's maximum checkout validity runs out, so keep that value realistic. The wiki compares [node-locked and floating licenses](https://netlicensing.io/wiki/node-locked-vs-floating-licenses) in detail.

### Consumption and capacity: Pay-per-Use and Quota

These two look alike on a price list and behave differently in code.

<div class="table-responsive" markdown="1">

| Question | Pay-per-Use | Quota |
| --- | --- | --- |
| What the customer buys | A number of credits | A ceiling |
| Does use reduce it? | Yes | No |
| Who counts usage? | You report it, NetLicensing tracks the balance | Your application |
| What validation returns | `remainingQuantity` | `quota` |
{: .table .table-striped }

</div>

With Pay-per-Use, send `usedQuantity` after the work, or `reserveQuantity` before it, but not both in one call. Reserving never goes beyond the remaining credits. Reporting afterwards can, and the balance then turns negative.

### Time per instance: Rental

Rental is for many things that each need their own period, such as payment terminals. Each device has its own entry and its own expiry date, so one can lapse while the others keep working.

### Named user and perpetual licenses

For named users, use the user ID as the licensee number, or as the node secret in a Node-Locked module. This associates a license with a person, but does not by itself stop one ID being used in several places.

For a perpetual license, use Try & Buy with the minimum evaluation period of one day. After purchase, validation has no end date. If you also sell maintenance, add a Subscription module for it. The wiki's [model comparison](https://netlicensing.io/wiki/software-licensing-models-compared) shows both patterns.

## Which licensing model fits your product?

<div class="table-responsive" markdown="1">

| How you deliver | Start with | Add when needed | Check first |
| --- | --- | --- | --- |
| Desktop application | Try & Buy or Subscription | Node-Locked | How a customer moves to a new computer |
| SaaS | Pricing Table or Subscription | Multi-Feature, Quota | Who counts usage against a quota |
| API or AI product | Pay-per-Use | Subscription as a base fee | Your [monthly API calls](https://netlicensing.io/wiki/faq-api-rate-limit) |
| Shared engineering tools | Floating | Subscription | How crashed sessions are released |
| On-premises or air-gapped | Subscription or Multi-Feature | NetLicensing Agent (Select) | What changes after an offline import |
| Fleet or embedded devices | Rental | Node-Locked | Whether each device needs its own period |
{: .table .table-striped }

</div>

> The best licensing model is the one your customer can explain to their own finance team.

## How licensing model pricing scales

The prices below are invented for illustration. Look at what makes each bill grow.

<div class="table-responsive" markdown="1">

| Model | Example offer | What the customer pays |
| --- | --- | --- |
| Subscription | €30 per user per month, 20 users | 20 × 30 = €600 a month |
| Floating | €80 per concurrent seat per month, 8 at once | 8 × 80 = €640 a month |
| Node-Locked | €200 per device, once, 20 devices | 20 × 200 = €4,000 once |
| Pay-per-Use | €50 per 10,000 credits, 120,000 used | 12 × 50 = €600 |
| Quota | €100 per 1,000 records, 6,000 needed | 6 × 100 = €600 |
| Multi-Feature | €40 base plus a €15 add-on per month | 40 + 15 = €55 a month |
| Rental | €10 per device per month, 20 devices | 20 × 10 = €200 a month |
{: .table .table-striped }

</div>

Compare the first two rows. For twenty users with a peak of eight at once, the two bills come out close: €600 against €640. If all twenty work at once, floating needs twenty seats, or €1,600. Measure peak concurrent use before you price it.

## Combining licensing models in NetLicensing

Say you sell an engineering tool: shared seats for the desktop application, plus a node-locked module for a render server. In [NetLicensing](https://netlicensing.io/wiki/licensing-models) that is one product with two modules. A single validation call can carry the parameters for both:

```shell
curl -X POST -u "apiKey:${NLIC_API_KEY}" -H "Accept: application/json" \
  -d "productNumber=P-CAD" \
  -d "productModuleNumber0=M-SEATS&sessionId0=${SESSION_ID}&action0=checkOut" \
  -d "productModuleNumber1=M-RENDER&nodeSecret1=${NODE_SECRET}" \
  "https://go.netlicensing.io/core/v2/rest/licensee/${LICENSEE}/validate"
```

The response holds one result per module, and your application acts on each. Changing a price or a package happens in the license templates; a new *kind* of limit may need your application to send or read something new. That boundary is why it pays to [decouple licensing from your application]({{ "/blog/2026/11/04/decouple-software-licensing-from-your-application/" | relative_url }}). Before shipping a client, check [how to handle API keys](https://netlicensing.io/wiki/faq-api-key-in-client-application).

For more depth, read about [feature-based pricing]({{ "/blog/2026/08/05/feature-based-pricing-turn-features-into-revenue/" | relative_url }}), [usage-based versus subscription pricing]({{ "/blog/2026/08/19/usage-based-vs-subscription-pricing/" | relative_url }}) and [offline and on-premises monetization]({{ "/blog/2026/09/30/monetize-offline-on-premises-software/" | relative_url }}). We also have an [infographic on selecting a model]({{ "/resources/how-to-select-licensing-model-infographic-netlicensing_lo.pdf" | relative_url }}) (PDF).

## Questions people ask

### What are the main types of software licensing models?

The main types limit time (trial, subscription, rental), features (add-ons, plans), devices or users (node-locked, named user), concurrent sessions (floating), consumption (pay-per-use) or capacity (quota). A perpetual license has no end date.

### What is the difference between node-locked and floating licenses?

A node-locked license is tied to specific devices. A floating license is a pool of seats that any allowed user or machine can borrow, up to a limit on simultaneous sessions.

### What is the difference between usage-based licensing and a quota?

Usage-based licensing spends a balance of credits as the product is used. A quota is a fixed ceiling, such as a number of projects, that does not shrink with use.

### Can one product use several licensing models?

Yes. In NetLicensing, give the product one module per model. One validation returns the results for all of them.

### Which licensing model is best for SaaS?

Usually plans or a subscription for access, with features or a quota added where customers differ. Add pay-per-use when your costs rise with every request.

### Can I change my licensing model later?

You can add modules and new packages. Plan how existing customers move over, and test your application if the new model needs different validation parameters.

## Pick one limit this week

Write down the single thing that makes your best customer's use bigger than your smallest customer's. Match it in the first table, add one secondary model only if you can say what problem it solves, and validate it with a test licensee. [Compare the plans]({{ "/pricing/" | relative_url }}) to see which models each includes.

<div style="text-align:center;margin:36px 0">
  <a href="https://ui.netlicensing.io/#/register" target="_blank" rel="noopener" style="background:#E14817;color:#fff;padding:16px 40px;border-radius:6px;font-size:20px;font-weight:700;text-decoration:none;display:inline-block">Try a licensing model for free</a>
</div>

*Happy Licensing!*
