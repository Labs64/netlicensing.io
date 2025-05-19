---
layout: post
title: "Unlock New Revenue Streams: Introducing the NetLicensing's Bundles Feature"
description: "Unlock new revenue with NetLicensing Bundles - package features, simplify sales, and offer flexible pricing to your customers"
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-bundles.png
tags:
  - Bundle
  - Software Licensing
  - Software Distribution
  - Software Monetization
  - Software-as-a-Service
  - LaaS
  - API
  - E-commerce
  - Integration
  - NetLicensing
  - Product Feature
  - Software Package
  - Software Entitlement
---

In the competitive world of software distribution, offering flexible and attractive licensing options is key to maximizing sales and customer satisfaction. Recognizing this need, Labs64 NetLicensing is excited to announce its powerful *"Bundles"* feature. This addition empowers software vendors to package multiple product features together, simplifying the purchasing process for customers and opening up new possibilities for tailored offers and pricing strategies.

## What are Bundles in NetLicensing?

At its core, the Bundles feature allows you to group existing NetLicensing features into a single, sellable unit – a *"Bundle"*. Think of it as creating a curated package of your software products or features under a single entitlement.

Instead of requiring customers to purchase individual licenses for each component of a suite or collection, they can now acquire a single bundle license. This streamlines the acquisition process significantly, making it easier and faster for your customers to get access to the software they need.

## The Benefits of Using Bundles

The introduction of Bundles brings advantages for both software vendors and their customers:

**For Vendors:**

- **Simplified Product Offering:** Create clear and attractive packages of your software, making it easier for customers to understand the value proposition.
- **Increased Sales Potential:** Encourage upsells and cross-sells by bundling complementary products or premium features.
- **Flexible Pricing Strategies:** Set a single price for the entire bundle, which can be different from the sum of the individual license costs. This allows for promotional pricing or volume discounts. Recent enhancements even enable vendors to set individual bundle prices for specific customers using features like Shop Tokens.
- **Streamlined Management:** Manage the bundle as a single entity within NetLicensing, simplifying tracking and reporting compared to managing numerous individual licenses per customer.
- **Faster Go-to-Market:** Quickly create and deploy new product combinations without altering existing product or module structures.

**For Customers:**

- **Easier Purchasing Process:** Acquire multiple software entitlements in one go, reducing the complexity of managing several individual licenses.
- **Clearer Value:** Understand exactly what they are getting as part of a defined package.
- **Potential Cost Savings:** Benefit from bundled pricing that may be more favorable than purchasing items individually.

## Technical Integration Guide: Implementing Bundles

Integrating the Bundles feature into your existing sales channels, e-commerce platform, or internal systems is straightforward using the NetLicensing API. The core concept involves defining your bundles and then using the API to "obtain" a bundle for a specific customer when a purchase or entitlement event occurs.

### Defining Your Bundles

![License Bundles](/img/blog/netlicensing-aws-bundle.png "NetLicensing Bundles"){:class="blog-center"}

Before you can obtain a bundle via the API, you need to define it within your NetLicensing Management Console.

- Navigate to the Bundles section in your NetLicensing account.
- Create a new bundle.
- Give it a unique name and number.
- Select the existing product features that will be included in this bundle.

Once defined, this bundle serves as a blueprint for creating licenses when a customer acquires it.

### Obtaining a Bundle via API

The primary method for technical integration is using the NetLicensing RESTful API to ["obtain"](https://netlicensing.io/wiki/bundle-services#obtain-bundle) a bundle for a specific licensee (customer). When you obtain a bundle, NetLicensing automatically generates the individual licenses for each product feature included in the bundle and assigns them to the specified licensee.

The relevant API endpoint is:

`POST /core/v2/rest/bundle/{bundleNumber}/obtain`

**Parameters:**

- `bundleNumber` (path parameter): The unique number of the bundle you want to obtain.
- `licenseeNumber` (form parameter): The unique number of the licensee (customer) for whom you are obtaining the bundle.

**Example API Request (using cURL):**

```bash
curl -X POST 'https://go.netlicensing.io/core/v2/rest/bundle/YOUR_BUNDLE_NUMBER/obtain' \
  -H 'authorization: Basic base64(apiKey:YOUR_API_KEY)' \
  -H 'accept: application/json' \
  -H 'content-type: application/x-www-form-urlencoded' \
  --data-raw 'licenseeNumber=YOUR_LICENSEE_NUMBER'
```

*(replace `YOUR_BUNDLE_NUMBER`, `YOUR_LICENSEE_NUMBER`, `YOUR_API_KEY` with your actual NetLicensing credentials and identifiers)*

**API Response:**

Upon a successful request (HTTP Status Code 200), the response will contain the details of the licenses that were created and assigned to the licensee as part of obtaining the bundle.

**Workflow:**

A typical integration workflow might look like this:

- A customer purchases a "Premium Suite Bundle" on your website (via your e-commerce platform).
- Your e-commerce system or backend receives the purchase confirmation.
- Your system makes an API call to NetLicensing using the `POST /core/v2/rest/bundle/{bundleNumber}/obtain` endpoint, providing the bundle number for the "Premium Suite Bundle" and the licensee number for the purchasing customer.
- NetLicensing processes the request, creates the individual licenses for all features in the bundle, and assigns them to the customer's account within NetLicensing.
- Your system can then confirm the successful license assignment and provide the customer with access to their software, which will use the standard NetLicensing validation process for the individual licenses.

### Using Bundle Shop Tokens for Personalized Offers

For more advanced scenarios, such as offering a specific bundle at a custom price to an individual customer, you can leverage Bundle Shop Tokens. This feature, introduced in a recent update, allows you to generate a unique token that links a specific customer to a specific bundle and optionally defines a custom price for that bundle acquisition via a generated `shopURL`.

This is particularly useful for:

- Manual sales processes where you want to **send a customer a direct link** to purchase a pre-defined bundle.
- Offering **discounts or special deals** on bundles to specific customer segments.

Refer to the NetLicensing documentation for detailed instructions on creating and using [Bundle Shop Tokens](https://netlicensing.io/wiki/token-services#create-token).

## Get Started with Bundles Today

The Bundles feature in Labs64 NetLicensing provides a powerful and flexible way to structure your software offerings and streamline the licensing process for your customers. By leveraging the NetLicensing API, you can seamlessly integrate this feature into your existing sales and distribution systems.

Explore the *"Bundles"* section in NetLicensing Management Console and consult the comprehensive NetLicensing API documentation for the most up-to-date information and detailed technical specifications.
Start creating attractive bundles and unlock new possibilities for your software business!

For any questions or assistance, feel free to reach out to our [support team](https://netlicensing.io/contact/) or consult the [NetLicensing community forum](https://github.com/Labs64/NetLicensing-Community).