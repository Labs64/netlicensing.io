---
layout: post
title: "Application Security&#58; The Essentials &#8211; Cross Site Request Forgery"
description: "With Cross Site Request Forgery you are dealing specifically with an application which sends HTTP requests to the user’s browser"
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/application-security-the-essentials-cross-site-request-forgery.png
tags:
  - Browser
  - CSRF
  - HTTP
  - Request
  - URL
  - Security
canonical: http://www.labs64.com/blog/2014/05/application-security-the-essentials-cross-site-request-forgery/
---

We have already looked at how applications which use external references to a browser can be vulnerable to attacks (see [Unvalidated Redirects and Forwards](/blog/2014/01/15/application-security-the-essentials-unvalidated-redirects-and-forwards/ "Application Security: The Essentials – Unvalidated Redirects and Forwards")). With Cross Site Request Forgery you are dealing specifically with an application which sends HTTP requests to the user’s browser, as a part of its day to day functionality. External URL requests are, as we have previously discussed, a risk because they take the user outside of the boundaries of the application. This means that the level of control which you as a developer have is immediately impeded. However, there are still a number of steps you can take to prevent cross site request forgery.

In essence, CSRF forces the user’s browser to request fraudulent HTTP requests which the application believes to be genuine. As this is an attack which targets users who are logged into the application, it immediately opens them up the potential for data to be stolen by the attackers through what appears to be a genuine request by the application.

Any application which uses links to initiate a change of data is vulnerable to cross site request forgery. This is particularly prevalent with multi-step transactions i.e. where a user has to click through several different requests in order to carry out the task which they are attempting to achieve. You should consider any request as potentially being one which could be forged by an attacker and which would not be detectable by the application.

A good example would be thus; the application stores information about the user and they are able, when properly authenticated to make changes to their personal data. The effect which CSRF has to cause the application to carry out unauthorized changes to both data and application settings, the result can vary from minor inconvenience to severe financial fraud and theft of highly confidential data.

As ever the most important question is; how do I prevent an attack by cross site request forgery? The best option is to include a unique token in a hidden field. This stops the value of the request from being sent in the URL, which is easily exposed, and instead sends it in the body of the HTTP. It should be noted that the token can also be included in a URL parameter, or the URL itself, however it is important to remember that the token can be compromised, should the URL become exposed to an attacker.

The resultant impact upon you as a business owner is twofold; firstly you will not be able to determine the difference between genuine and fraudulent requests and such an attack can be damaging to your reputation.

Although CSRF is widespread and effect’s many thousands of applications; it is easily detected and prevented. Detection of any cross site request forgery flaws is possible through careful checking of code by security expert as well as through penetration testing.
