---
layout: post
title: "License Keys with Stripe Managed Payments: How to Set Them Up"
description: "Stripe Managed Payments sells your software but does not issue license keys. Connect Checkout to NetLicensing with webhooks for purchases and renewals."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-stripe-managed-payments-license-keys-hero.png
  alt: "Stripe Managed Payments checkout creating a license in NetLicensing"
tags:
  - "Stripe Managed Payments"
  - "License Keys"
  - "Software Licensing"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-stripe-managed-payments-license-keys-hero.png
---

A customer pays on Friday night. Stripe takes the money, works out the tax and sends the receipt. Then your application asks a question Stripe won't answer: is this person allowed to use the product?

## Key takeaways

- Stripe Managed Payments is a merchant-of-record service for digital products. License keys are your job.
- It works with Checkout and Payment Links only.
- A small webhook receiver turns each payment into a license in NetLicensing.
- Test purchases, renewals, cancellations and refunds in a sandbox first.

## What Stripe does, and what it leaves to you

With [Managed Payments](https://docs.stripe.com/payments/managed-payments){:target="_blank"}{:rel="noopener nofollow"}, Stripe is merchant of record and handles indirect tax in more than 80 countries, along with disputes and transaction support. Your business must be in one of the [eligible countries](https://docs.stripe.com/payments/managed-payments/eligibility){:target="_blank"}{:rel="noopener nofollow"}, and your product must be digital.

| Job | Stripe Managed Payments | Your side with NetLicensing |
|---|---|---|
| Checkout and receipts | Yes | |
| Sales tax and VAT | Yes | |
| Customer billing portal | Yes, at link.com | |
| License keys and entitlements | No | Licensees and licenses |
| Checking access in your app | No | A validate call |

If you're moving from Lemon Squeezy, its [comparison page](https://docs.lemonsqueezy.com/migration/comparison){:target="_blank"}{:rel="noopener nofollow"} says the same: license keys are not included. Our [migration guide]({{ "/blog/2026/11/27/lemon-squeezy-license-keys-migration/" | relative_url }}) covers moving existing keys.

> A payment proves someone bought something. A license says what they can do with it today.

## 1. Model what you sell

In the Management Console, create a product, a module with the [licensing model](https://netlicensing.io/wiki/licensing-models) you need, and a license template for each plan. Keep a lookup table from each Stripe price ID to a template number.

## 2. Send customers through Checkout

Create a [Checkout Session](https://docs.stripe.com/payments/managed-payments/set-up){:target="_blank"}{:rel="noopener nofollow"} with API version `2025-03-31.basil` or higher and `managed_payments[enabled]=true`:

```bash
curl https://api.stripe.com/v1/checkout/sessions -u "$STRIPE_SECRET_KEY:" \
  -H "Stripe-Version: 2025-03-31.basil" \
  -d "managed_payments[enabled]=true" -d "mode=subscription" \
  -d "line_items[0][price]=PRICE_ID" -d "line_items[0][quantity]=1" \
  -d "success_url=https://example.com/thanks"
```

Payment Links work too, with the same parameter. You can't switch it on for an existing link, so create a new one.

## 3. Turn events into licenses

| Stripe event | What your receiver does |
|---|---|
| `checkout.session.completed` | Create the licensee; for a one-time sale, add the license |
| `invoice.paid` | Add one license per paid subscription period |
| `customer.subscription.deleted` | Deactivate the license |
| A refund | Deactivate the license of that payment |

Stripe's Managed Payments pages name the checkout events. The others are standard Stripe Billing events, so confirm in your sandbox that your account receives them. Our [Stripe Billing guide](https://netlicensing.io/wiki/stripe-billing) shows signature checks and the API calls:

```bash
curl --user apiKey:$NETLICENSING_API_KEY \
  --data "productNumber=YOUR_PRODUCT&number=cus_123" \
  https://go.netlicensing.io/core/v2/rest/licensee

curl --user apiKey:$NETLICENSING_API_KEY \
  --data "number=in_456&licenseeNumber=cus_123&licenseTemplateNumber=YOUR_TEMPLATE" \
  https://go.netlicensing.io/core/v2/rest/license
```

Use Stripe's IDs as NetLicensing numbers. A repeated webhook then reports a duplicate instead of creating a second license. A subscription license template that isn't automatic also needs a `startDate`.

## 4. Check the license in your product

Your application [validates the licensee](https://netlicensing.io/wiki/licensee-services) and reuses the result until its `ttl` expires. Ship only a licensee-role API key inside client software.

## Test before you sell

Buy once, subscribe, renew, cancel and refund. After each step, validate the licensee and compare the result with what the customer should have. Stripe's sandbox doesn't send automatic receipt emails, so check events rather than your inbox.

## Questions people ask

**Does Stripe Managed Payments issue license keys?**
No. You need a licensing service or your own system for keys and entitlements.

**Can I use Payment Links?**
Yes, with Managed Payments enabled on a new link.

**What identifies the customer in NetLicensing?**
A licensee number you choose. The Stripe customer ID works well.

**Do I need a server?**
You need a small receiver for webhooks, for example a serverless function.

## Try it with one product

Connect one price, run the five test cases and expand from there. [Create a free NetLicensing account](https://ui.netlicensing.io/#/register){:target="_blank"}{:rel="noopener"} to start.

*Happy Licensing!*
