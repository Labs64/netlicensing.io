---
layout: post
title: "Labs64 NetLicensing 2.3.1 Maintenance Release"
description: "In this maintenance release, we focused on fixing a few specific and annoying bugs and improvements reported by our vendors"
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/blog-placeholder.jpg
tags:
  - News
  - Announcements
  - PayPal
  - Floating
  - Multi-Feature
  - Shop
  - eCommerce
---

We are extremely happy to announce that NetLicensing 2.3.1 is now Generally Available!
In this maintenance release, we focused on fixing a few specific and annoying bugs and improvements reported by NetLicensing users.

Notable changes in this release:

* **PayPal**: improved stability of checkout process and fixed a bug where vendor account wasn't funded after successful payment; [PayPal documentation](https://netlicensing.io/wiki/paypal) has been updated accordingly and provide more detailed info on PayPal setup for Digital Goods
* **Multi-Feature** licensing model: validation response improved, returning status of all configured features including those without active licenses
* **Floating** licensing model: validation response improved, allowing to differentiate between the case of no licenses acquired at all, and all acquired licenses are in use / checked out
* **NetLicensing Shop**: checkout process fine-tuning including: sending of order confirmation mail, customization of success and cancel URLs, improved payment method selection logic, and other minor improvements
* Java Client was updated according to the latest NetLicensing API; **NetLicensing Java Client** v2.3.1 is available immediately from its [GitHub repository](https://github.com/Labs64/NetLicensingClient-java){:target="_blank"} and [Maven Central](https://search.maven.org/search?q=g:com.labs64.netlicensing){:target="_blank"} repository

With this change we also have a new home for the *NetLicensing Management Console* [https://ui.netlicensing.io](https://ui.netlicensing.io/#/login?cr=ZGVtbzpkZW1v&utm_source=netlicensing.io_demo_optin&utm_medium=website&utm_campaign=netlicensing.io_announcement&utm_content=announcement) - make sure you updated your bookmarks!

For a detailed list of changes in this release, see [NetLicensing 2.3.1 Release Notes](https://netlicensing.io/wiki/netlicensing-2-3-1-final).

As always, your feedback is important to us - please visit [NetLicensing Website](https://netlicensing.io) - [Leave Feedback](https://github.com/Labs64/NetLicensing-Community/){:target="_blank"}.

Thank you for your contributions & *Happy Licensing*!
