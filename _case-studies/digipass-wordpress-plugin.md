---
layout: casestudy
title: "Wordpress Plugin: DigiPass"
description: "How Labs64 built DigiPass, a WordPress plugin that puts posts and pages behind a paywall using the NetLicensing Subscription model and NetLicensing Shop."
permalink: "/case-studies/digipass-wordpress-plugin/"
img: "/img/case-studies/netlicensing-case-study-digipass-wordpress-plugin.png"
tags:
- Case Studies
- Use Cases
- Wordpress Plugin
- DigiPass
- Subscription
- PayWall
company: Labs64 GmbH
industry:
- Online Publishing
use-case:
- Subscription
- PayWall
- e-Commerce
favorite-feature:
- Licensing Model "Subscription"
- NetLicensing Shop
website: "https://wordpress.org/plugins/digipass/"
---

### Challenge

The idea for DigiPass came from a prospective NetLicensing customer. They ran a WordPress site with written content and wanted readers to pay for access to some of it.

They had tried to build this from several plugins: one for payments, one for user roles, and some manual work in between. Every payment had to be matched to a user and the right role switched on, and switched off again when the subscription ended. It took several people to keep track of payments and subscribers, and it was easy to get wrong.

### Approach

We built [DigiPass](https://wordpress.org/plugins/digipass/) to do this inside WordPress, with NetLicensing handling subscriptions and payments. Site owners don't need to write code.

The site owner sets up a product with a [Subscription](https://netlicensing.io/wiki/subscription) module in NetLicensing, with subscription periods and prices as license templates, say one month and one year. In WordPress, they enter their NetLicensing credentials in the DigiPass settings and connect a post or page to that product module.

In the post, everything after the `<!--digipass-->` marker (or after the standard `<!--more-->` tag) is protected. When a reader opens the post:

1. A visitor who isn't logged in sees the free part and a prompt to log in or register.
2. For a logged-in reader, DigiPass uses the licensee number stored with their WordPress user and sends a validation request for the product.
3. If the subscription module is valid, the full post is shown. DigiPass saves the result until the `ttl` from the response, so the next page view doesn't call NetLicensing again.
4. If it isn't valid, DigiPass creates a shop token for the reader, with the post's address as `successURL` and `cancelURL`, and shows a "subscription options" link instead of the protected part.

The reader pays in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) and returns to the same post, now unlocked. When the subscription runs out, the next validation returns `valid=false` and the paywall comes back by itself. Nobody has to change a role. Site administrators always see the full content.

If NetLicensing can't be reached, readers see a short notice, and the site administrator gets an email.

### Results

Payments, subscription periods and access come from one source. The site owner's team no longer matches payments to users or switches roles on and off. Readers buy and renew in the Shop on their own, and access follows the subscription automatically.

The DigiPass source code is on [GitHub](https://github.com/Labs64/DigiPass). The plugin's last release (0.4.0) dates from 2016 and stores the vendor's account credentials in WordPress. Today we'd use an API key with the role `ROLE_APIKEY_LICENSEE` for the reader-facing validation and shop links (see [API security](https://netlicensing.io/wiki/faq-api-key-in-client-application)).

Want to sell content or software from WordPress? [Create a free NetLicensing account](https://ui.netlicensing.io/#/register) and start with the Subscription model.
