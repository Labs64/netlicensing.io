---
layout: post
title: "Application Security&#58; The Essentials &#8211; Insufficient Transport Layer Protection"
description: "Finally, require SSL/TLS for frontend as well as backend connections, this means that your own developmental connections are encrypted"
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/application-security-the-essentials-insufficient-transport-layer-protection.png
tags:
  - Certificate
  - Encryption
  - SSL
  - TLS
canonical: http://www.labs64.com/blog/2014/07/application-security-the-essentials-insufficient-transport-layer-protection/
---

In this, our final article in our [series](https://www.google.com/search?q=site%3Anetlicensing.io%20Application%20Security%20Essentials "Application Security Essentials"){:target="_blank"} on the essentials of Application Security, we will be looking at Insufficient Transport Layer Protection. This occurs when an application has failed to properly encrypt network traffic, which means that confidentiality and overall integrity has been compromised. ITLP also covers the times when applications network level security is weakened; this can be because of flaws in algorithms, improper use of certificates and use of security certificates which have expired.

All of these factors will reduce the effectiveness of any Secure Sockets Layer (SSL) and Transport Layer Security (TLS) which you have put in place as a part of the application’s development.

If you are unfamiliar with either TLS or SSL then now is the time to acquaint yourself. TLS, and SSL before it, is used to add a layer of security to all traffic which has gone through an authentication process – i.e. when you have logged into a website or application, TLS will protect any data which is sent over the network for the duration of the session. SSL certificates are installed on the relevant servers and are in place to act as verification that the site or app to which the user is connecting is genuine.

The flaw which is common amongst many applications is not that they do not have any form of TLS/SSL protection in place, but that they do not have enough of it. Modern web browsers will warn users against connecting to a site which has an expired or invalid SSL certificate and as such many applications have TLS/SSL present at the authentication level, but not beyond.

The danger which this creates is that user’s data becomes exposed and is vulnerable to account theft. This flaw exists at every level of account meaning that insufficient transport layer protection can lead to an admin account being accessed and the entire site being exposed to attack. The consequences could be potentially devastating; with vast amounts of data being exposed and the potential to access each individual user account through administrative overrides – i.e. password resets.

The damage to your business is potentially both reputational as well as countable in terms of data theft. It can also cause you to incur significant expenses through having to compensate customers as well as recovering the site and restoring it to its original state.

It is easy to observe whether or not basic ITLP is present through observation of the site’s network traffic. Specialist knowledge may be required to locate the less obvious flaws within the site’s security.

It is relatively easy to prevent ITLP; first and foremost ensure that all pages which have sensitive data – even those accessed after authentication – require SSL.

Secondly; keep every, and all certificates VALID. You would be surprised at how many companies and developers are caught out by what would seem to be an obvious case for monitoring.

Finally, require SSL/TLS for frontend as well as backend connections, this means that your own developmental connections are encrypted.

As we have often found with application security, a keen eye and remaining vigilant can set on a strong path to a secure application.
