---
layout: post
title: "Application Security&#58; The Essentials &#8211; Broken Authentication and Session Management"
description: "Modern applications frequently handle sensitive data and as such it is common practice for developers to implement varying layers of authentication to access the application"
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/blog-placeholder.jpg
tags:
  - Security
  - Authentication
  - Password
  - Session
  - Strength Indicator
---

Modern applications frequently handle sensitive data and as such it is common practice for developers to implement varying layers of authentication to access the application. This also means that as a developer you can gather more detailed information about your users i.e. through their email address, which can be used as a marketing tool.

In essence; authentication is the security process which requires a unique username and password to be entered by the user in order to access the application in full. This means that they can personalise their experience as well as have a greater confidence in the safety of any personal data which may be used and/ or securely stored by the application.

Session management covers the processes that the application uses to keep users safe whilst they are actually using the application. A highly common example of this is session timeouts, where if the user is inactive for a given period of time, or if they lock their device, the application will log them out. This is often used by financial applications where users can carry out their personal and business banking through the use of an official application.

One of the most common causes of broken authentication is a weak password policy which enables credentials to be easily worked out by hackers. It is also possible that if your ‘Password Reset’ process, which developers prefer to automate, may not be secure enough. For example; if all pressing the ‘password reset’ button does is send a link to the users registered email address, or if the user only has to answer a pre-determined ‘secret question’ then it may be relatively easy for the account to be accessed by an outsider.

One simple way of tightening up the security on this process is by adding steps to the password reset process – it may prove to be frustrating for a handful of users – but ultimately they would surely rather have their data be kept safe?

Secure passwords are created by using a combination of letters, numbers and symbols. If you want to make sure that your users are setting the most secure passwords that they can then you can set an in-built policy which only accepts passwords that meet a set of specific requirements.

It is also advisable to add a ‘Strength Indicator’ where appropriate which allows the everyday user to have a graphic representation of the strength of their password. This policy can also be strengthened by forcing your users to change their passwords on a frequent basis (i.e. every three months) and preventing them from reusing old or similar passwords.

Having an in-built session timeout on your application means that if your users device is lost, stolen or otherwise compromised whilst they are using it, then it is quickly ‘locked down’ and prevents any unauthorised access.

Although a small minority of users can express frustration at the complexity of an application’s password or timeout policy – consider the wider impact of a hack upon both your [security](https://www.google.com/search?q=site%3Anetlicensing.io%20Application%20Security%20Essentials "Application Security Essentials"){:target="_blank"} and your reputation.

Listen to your user’s feedback, make adjustments if necessary, but keep security at the top of your priorities.
