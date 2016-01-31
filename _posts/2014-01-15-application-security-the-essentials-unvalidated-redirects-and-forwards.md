---
layout: post
title: "Application Security&#58; The Essentials &#8211; Unvalidated Redirects and Forwards"
description: "A redirect or forward is when the application automatically sends the user to an external webpage through a link which has been placed in the code"
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/blog-placeholder.jpg
tags:
  - Security
  - Forward
  - Redirect
  - URL
canonical: http://www.labs64.com/blog/2014/01/application-security-the-essentials-unvalidated-redirects-and-forwards/
---

In this third article on [application security](https://www.google.com/search?q=site%3Anetlicensing.io%20Application%20Security%20Essentials "Application Security Essentials"){:target="_blank"}, we will be looking at Unvalidated Redirects and Forwards, an uncommon flaw but one which can have a damaging effect on your company’s reputation as it targets your customers rather than you directly.

A redirect or forward is when the application automatically sends the user to an external webpage through a link which has been placed in the code. If you are using a .Net Framework to build your application, a redirect is known as a transfer.

These redirects are not always external, they are on occasion built within the application – particularly where is it a browser-based app.

The danger comes when attackers change the parameters to redirect your users to unsafe and unauthorised pages. The potential damage can be severe as these fake pages can be modelled to imitate your own, genuine pages and lead users to download damaging software as well as expose their own systems to attack and infiltration.

### How do I prevent a Unvalidated Redirects and Forwards?

If you can, avoid using redirects. They are prone to failure and can cause errors for users who are accessing the application or service over unsecured connections. They also open up ‘holes’ in the system through which hackers can infiltrate and change the location to which your customers are sent.

If you have to use redirects, then make sure that you regularly review your code and check that you don’t have any broken links or unvalidated redirects present. If you can, try and ensure that your application will only send customers to validated URLs and try to build in extra-layers of security to pages to which they are redirected. The harder your pages are to copy, the less likely it will be that your customers will be tricked.

If you are unsure about whether or not your code contains redirects, have a professional use crawlers or ‘spiders’ to check the code and look for any broken links, redirects which fail or which have unusual URLs that you do not recognize.

If you can avoid using actual URLs and instead build an application network which only directs users within its parameters you will be more protected from potential attackers and hijackers taking over your system.

As a business owner or operator, the public image of your company is of paramount importance to you. Whilst an unvalidated redirect can be accidental, if it is detected by a user before you pick up on it, it can have a devasting impact on the public image of your company and the application.

Keep in mind that as with much of application security, as well as security in the wider world; prevention is the before form of protection. Stay safe, stay ahead, stay secure.
