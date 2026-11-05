---
layout: casestudy
title: "Wordpress Plugin: Credit Tracker"
description: "How Labs64 uses NetLicensing in its free Credit Tracker WordPress plugin to see which sites use the plugin, with licensee auto-create and a single validation call."
permalink: "/case-studies/credit-tracker/"
img: "/img/case-studies/netlicensing-case-study-credit-tracker-v2.png"
tags:
- Case Studies
- Use Cases
- Wordpress Plugin
- Credit Tracker
company:
- Labs64 GmbH
industry:
- Software as a Service
use-case:
- Product usage tracking
- Licensee auto-create
favorite-feature:
- Licensee Auto-Create
- NetLicensing REST API
website: "https://wordpress.org/plugins/credit-tracker/"
---

### Challenge

Stock photos make a website look better, but most of them come with a duty to credit the photographer and the agency. Labs64 built [Credit Tracker](https://wordpress.org/plugins/credit-tracker/), a free WordPress plugin, to make that easy. It adds credit fields to every image in the Media Library (Ident-Nr., source, author, publisher, license and link), can pull image details from stock agencies, and builds a styled "Image Credits" table with the `[credit_tracker_table]` shortcode. It can also add microdata to images and replace the standard `[caption]` shortcode.

A free plugin downloaded from wordpress.org has one blind spot for its maker: you don't know who actually uses it. Download counts don't tell you how many sites run the plugin today or which ones. Labs64 wanted that picture without building a tracking server of its own.

### Approach

Credit Tracker uses NetLicensing as a lightweight usage register. The plugin is a product in NetLicensing (product number `CT`) with licensee auto-create switched on. Each WordPress site becomes a licensee, and its number is derived from the site URL.

In the plugin's settings, the "Features" section has a **Validate** button. When a site owner clicks it, the plugin sends one validation request for that site, including the product number and the site URL as the licensee name:

```bash
curl -u apiKey:PLUGIN_API_KEY -H "Accept: application/json" \
  -d "productNumber=CT" \
  -d "licenseeName=https://myblog.example" \
  https://go.netlicensing.io/core/v2/rest/licensee/myblog.example/validate
```

If the site isn't known yet, NetLicensing creates the licensee on the spot. From then on, the site appears in the [Management Console](https://ui.netlicensing.io) like any other customer.

The plugin doesn't act on the response. All of its features are free, so there's nothing to unlock. The point of the call is to register the site. The code is small: a few lines of PHP that send the request through the NetLicensing REST API. It's open source in the [Credit Tracker GitHub repository](https://github.com/Labs64/credit-tracker).

_The plugin's last release (1.1.18) still uses the older GET form of the validate call. New integrations should use POST, as shown above._

### Results

- Labs64 can see which sites run Credit Tracker, without a tracking server of its own.
- There is no sign-up for site owners: auto-create registers a site the first time it validates.
- The same setup leaves room for paid features later. Adding a licensing model to the `CT` product would turn the usage register into real license checks without changing how sites are identified.

Want to use NetLicensing in your own WordPress plugin? Have a look at [DigiPass](/case-studies/digipass-wordpress-plugin/) or [create a free account](https://ui.netlicensing.io/#/register).
