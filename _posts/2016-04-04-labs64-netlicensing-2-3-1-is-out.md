---
layout: post
title: "Labs64 NetLicensing 2.3.1 Maintenance Release"
description: "In this maintenance release, we focused on fixing a few specific and annoying bugs and improvements reported by our vendors"
author:
  name: NetLicensing
  url: http://netlicensing.io
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
In this maintenance release, we focused on fixing a few specific and annoying bugs and improvements reported by our vendors.

Notable changes in this release:

* **PayPal**: improved stability of checkout process and fixed a bug where vendor account wasn't funded after successful payment; [PayPal documentation](https://www.labs64.de/confluence/x/vwCo) has been updated accordingly and provide more detailed info on PayPal setup for Digital Goods
* **Multi-Feature** licensing model: validation response improved, so status for all configured feature licenses and their relation to license template is returned back
* **Floating** licensing model: validation response improved, so it can be differentiated whether licensee doesn't have any free licensees to check-out or has no acquired licenses yet
* NetLicensing **Shop**: checkout process fine-tuning including sending of order confirmation mail, handling of success and cancel URLs, selected payment method display and much more minor improvements
* Java Client was updated according to the latest NetLicensing API; **NetLicensing Java Client** v2.3.1 is available immediately from its [GitHub repository](https://github.com/Labs64/NetLicensingClient-java){:target="_blank"} and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.labs64.netlicensing%22){:target="_blank"} repository

With this change we also have a new home for the *NetLicensing Management Console* [https://go.netlicensing.io/console/v2/](https://go.netlicensing.io/console/v2/?lc=4b566c7e20&source=lmbox001) - make sure you updated your bookmark!

For a detailed list of changes in this release, see [NetLicensing 2.3.1 Release Notes](https://www.labs64.de/confluence/x/tAHk).

As always, your feedback is important to us - please visit [NetLicensing Website](http://netlicensing.io) - [Leave Feedback](https://netlicensing.uservoice.com/){:target="_blank"}.

Thank you for your contributions & *Happy Licensing*!
