---
layout: post
title: "Application Security&#58; The Essentials &#8211; Cross Site Scripting (XSS)"
description: "If ever you become concerned that there may be a risk of XSS, act immediately"
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/blog-placeholder.jpg
tags:
  - Security
  - Browser
  - Cross Site Scripting
  - JavaScript
  - UI
  - XSS
canonical: http://www.labs64.com/blog/2014/01/application-security-the-essentials-cross-site-scripting-xss/
---

Cross Site Scripting, or XSS as it is also known, is when the data which is taken by an application and sent to a web browser is done so without proper validation and authentication being carried out first. It leaves the user open to attacking scripts from hackers and hijackers; the effect of this being that they can potentially hijack the user’s session and obtain a vast amount of data.

As well as this cross site scripting can also be used to redirect the user to malicious websites which then implants viruses and other invasive and damaging software on the user’s device or computer.

This brings us back to the issue which we discussed in a [previous article](/blog/2014/01/15/application-security-the-essentials-unvalidated-redirects-and-forwards/ "Application Security: The Essentials – Unvalidated Redirects and Forwards"); about the dangers of redirects and external references within an application. Whenever an application links to a web browser it immediately opens up a ‘gap’ which can potentially be used by attackers to access the user’s confidential data and information.

Although this is not an attack which has a direct impact upon your application – insofar as the attackers are not targeting the application directly – however they can have a disastrous impact upon your users. If your application has a strong business user base, or involves the processing of sensitive information, then it can have a highly negative effect upon the public image of your product.

XSS is one of the most prevalent types of attack amongst application users and developers should be very careful about building applications which rely on interpreters such as JavaScript and Microsoft Silverlight in web browsers. As ever, the most effective method of protection is prevention and by keeping as many of the applications operations within it as possible you will minimise the risk of Cross Site Scripting.

If the type of app you are building requires external references, then ensure that your code is secure and well written. Look into effective data escaping techniques. Where you have external references in the application, carry out regular tests to check that when the data is being sent it is being done so securely.

As with many weaknesses and flaws in application security, XSS occurs when gaps or ‘holes’ are left in the coding.  When your application is still in the developmental stages, make sure that you carry out regular checks upon your code to test its safety and security.

The same rules apply to when release GUI and base-layer updates for the application to its users.

Although Cross Site Scripting is a relatively simple hack, it is equally simple to prevent. In short;

  * Ensure that data is properly escaped through the correct coding
  * Keep external references to a minimum
  * Where possible, work with web browsers and their developers to maintain security across both sites, as well as in-between.

If ever you become concerned that there may be a risk of XSS, act immediately.
