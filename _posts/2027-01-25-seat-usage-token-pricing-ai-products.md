---
layout: post
title: "Seat, Usage or Token Pricing for AI Products"
description: "Per seat vs token vs hybrid pricing for AI software, worked through for 30 engineers, with overage handling, other SaaS pricing models and how to configure them."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-ai-pricing-hero.png
  alt: "Seat, usage or token pricing for AI products, with worked numbers"
tags:
  - "AI Pricing"
  - "Token Pricing"
  - "Per-Seat Pricing"
  - "SaaS Pricing Models"
  - "Usage-Based Pricing"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-ai-pricing-hero.png
    - /img/blog/netlicensing-seat-vs-token-vs-hybrid-cost.png
---

A head of engineering asks for a quote for 30 people. Your product runs on a language model, so each of those people costs you something different. One tries it twice a week. Another leaves it working through a codebase overnight.

Which price survives both of them? We think a hybrid does most often, and the numbers show where it does not.

## Key takeaways

- Per-seat pricing is easy to buy and puts the usage risk on you.
- Token pricing follows your cost and puts the uncertainty on your customer.
- A hybrid, a base fee with an included allowance and overage, splits the risk.
- The right choice depends on how usage is spread across your customers, so measure that first.

## One team, three prices

These prices are **assumptions chosen for the arithmetic**, not market rates: $60 per seat per month; or $5 per million tokens; or a hybrid of $25 per seat that includes 5 million tokens per seat, then $4 per million. We treat usage as the average across the 30 engineers, with allowances pooled.

![Line chart of monthly cost for 30 engineers under the assumed prices: per seat stays at 1,800 dollars, token pricing rises from zero and passes it at 12 million tokens per engineer, hybrid starts at 750 dollars and passes it at 13.75 million]({{ "/img/blog/netlicensing-seat-vs-token-vs-hybrid-cost.png" | relative_url }})

| Average tokens per engineer per month | Per seat | Token | Hybrid |
| --- | --- | --- | --- |
| 2 million | $1,800 | $300 | $750 |
| 5 million | $1,800 | $750 | $750 |
| 10 million | $1,800 | $1,500 | $1,350 |
| 15 million | $1,800 | $2,250 | $1,950 |
| 20 million | $1,800 | $3,000 | $2,550 |

The formulas, so you can use your own numbers, with *t* as average million tokens per engineer: per seat is 30 × 60; token is 30 × 5 × *t*; hybrid is 30 × 25 + 30 × 4 × max(0, *t* − 5).

Below 12 million tokens, the seat price costs this customer more than metering does. Above it, the seat price is where your margin goes. The hybrid never falls to zero, which protects you, and grows more slowly than pure token pricing, which protects your customer from some of the surprise.

> Before you choose a price, find out whether your heaviest tenth of users looks anything like the rest.

## When each model fits

| Model | Fits when | Breaks when |
| --- | --- | --- |
| Per seat | Cost per user is small or similar | A few users, or agents, consume most of the resources |
| Token or usage | Cost tracks consumption closely | Buyers need a fixed budget |
| Hybrid | Usage varies and buyers want a predictable floor | The allowance is so confusing nobody can explain it |
| Enterprise agreement | Procurement wants one negotiated number | You cannot measure whether it is profitable |

For the buyer-side view of this shift, read [from seats to tokens]({{ "/blog/2026/02/17/ai-transformation-from-seats-to-tokens/" | relative_url }}). For subscription against usage in general, see [this comparison]({{ "/blog/2026/08/19/usage-based-vs-subscription-pricing/" | relative_url }}).

## Handle overage before it happens

Decide what happens at the limit and write it down:

1. **Block.** Stop at zero and offer a top-up. Predictable for both sides, painful mid-task.
2. **Allow and bill.** Keep working and charge later. Needs a cap and an invoice your customer understands.
3. **Warn, then degrade.** Tell the owner early, then switch to a cheaper model or lower priority.

In NetLicensing's [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) model, `reserveQuantity` gives you the first behaviour and `usedQuantity` the second, because reported use may push the balance below zero. [Warning levels](https://netlicensing.io/wiki/warning-level) and a [webhook](https://netlicensing.io/wiki/notifications) support the third. NetLicensing counts integer credits and you decide what a credit means, for example 1,000 tokens.

## The other SaaS pricing models, briefly

| Model | The customer pays | Watch out for |
| --- | --- | --- |
| Flat rate | One price for everything | Heavy users cost as much to serve as they like |
| Tiered | A package of features and limits | Too many tiers confuse buyers |
| Freemium | Nothing, until they upgrade | Free users still cost money |
| Per active user | Only for people who used it | You must define "active" |
| Per feature or add-on | A base plus modules | Many small charges feel like a trap |
| Custom | A negotiated contract | Every contract is a special case |

## Configure it in NetLicensing

A hybrid is two product modules. Use a [Subscription](https://netlicensing.io/wiki/subscription) module for the base fee and a Pay-per-Use module for credits. For plans that bundle features, [Pricing Table](https://netlicensing.io/wiki/pricing-table) does the packaging. Your application validates once and receives both results.

Pay-per-Use and Pricing Table are part of the Select plan, while Subscription is available on every plan. The plan helper on the [pricing page]({{ "/pricing/" | relative_url }}) shows what your combination needs.

## Questions people ask

### Is token pricing cheaper than per-seat pricing?

Only below a break-even point. With the assumed prices here it is 12 million tokens per engineer per month. Calculate yours.

### What is an included allowance?

Usage covered by the base fee. Beyond it, overage is charged or access is limited.

### Should unused credits roll over?

It is a commercial decision. Rollover is friendlier and makes revenue and cost harder to predict. State the rule in your terms.

### How do I move customers from seats to usage?

Meter silently for at least one billing cycle, show each customer what the new price would have been and offer the change at renewal.

## Run your own numbers

Replace the three assumed prices with yours, pull real usage per customer and draw the same chart. If the lines cross somewhere inside your customer base, you have found the conversation to have next.

<div style="text-align:center;margin:36px 0">
  <a href="https://ui.netlicensing.io/#/register" target="_blank" rel="noopener" style="background:#E14817;color:#fff;padding:16px 40px;border-radius:6px;font-size:20px;font-weight:700;text-decoration:none;display:inline-block">Start with NetLicensing</a>
</div>

*Happy Licensing!*
