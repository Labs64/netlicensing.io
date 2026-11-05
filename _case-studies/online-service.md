---
layout: casestudy
title: "Online Service Subscription"
description: "How a stock photo service kept selling single images and batches, added three monthly subscription tiers with download limits, and ran both through NetLicensing."
permalink: "/case-studies/online-service/"
img: "/img/case-studies/netlicensing-case-study-online-service-v2.png"
tags:
- Case Studies
- Use Cases
- Online Service
- Subscription
industry:
- Online Service
use-case:
- Subscription
- e-Commerce
favorite-feature:
- Licensing Model "Pricing Table"
- Licensing Model "Pay-per-Use"
- NetLicensing Shop
---

### Challenge

Many of our customers have told us how they moved from one-off sales to subscriptions with NetLicensing. This is one of those stories.

The customer sold stock photos, mostly to designers who needed images for client websites and print material. Images were sold one at a time or in batches, and the price per image dropped with the size of the batch.

That model had two problems. It didn't produce a regular income. And customers had to go through checkout every time they needed an image, which made each purchase slower than it had to be and kept people from coming back.

### Approach

We suggested keeping the existing model and adding a subscription with three tiers on top. Each tier comes with a number of image downloads per month, and the top tier allows unlimited downloads. NetLicensing would keep track of payments and of each customer's subscription.

Here's how that setup looks in NetLicensing today. Each customer account is a licensee:

```
Product: Stock Library (licenseeAutoCreate = true)
├── Module "Subscription" – Pricing Table
│   SKU: DOWNLOADS (quota, per month)
│   Basic      TIMEVOLUME 1 MONTH   DOWNLOADS=25
│   Pro        TIMEVOLUME 1 MONTH   DOWNLOADS=100
│   Unlimited  TIMEVOLUME 1 MONTH   DOWNLOADS=-1
└── Module "Image credits" – Pay-per-Use
    ├── 1 image:   QUANTITY 1
    ├── 10 images: QUANTITY 10   (lower price per image)
    └── 50 images: QUANTITY 50   (lowest price per image)
```

The [Pricing Table](https://netlicensing.io/wiki/pricing-table) module holds the three tiers, and `-1` means unlimited. The single-image and batch sales continue as [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) credits, one credit per image. Several templates with different quantities give the volume pricing the customer already had.

When a customer downloads an image, the site validates their account:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/json" \
  -d "productNumber=STOCKLIB" \
  https://go.netlicensing.io/core/v2/rest/licensee/CUST-30418/validate
```

The response returns the current tier with its `DOWNLOADS` limit, and the remaining image credits. The site counts each subscriber's downloads in the current month. While they're under the limit, the download is free. Above it, or without a subscription, the site uses a credit and reports it with `reserveQuantity0=1` for the "Image credits" module. If nothing is left, the customer sees the options to subscribe or buy a batch.

Subscriptions and batches are bought in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop), opened from a shop token for the customer account, so the customer pays once for a month instead of going through checkout for every image.

### Results

At first only a few customers subscribed, but the number grew steadily. Customers who had bought under the old model moved to the subscription, because it let them get images faster and with less hassle. As the subscriber base grew, so did the regular income, and the company tracked subscriptions and payments in NetLicensing.

The result was more revenue, and more predictable revenue. Customers had a better experience, which helped sales and kept them coming back.

Thinking about adding subscriptions to an online service? [Create a free account](https://ui.netlicensing.io/#/register) or [contact us](https://netlicensing.io/contact/).
