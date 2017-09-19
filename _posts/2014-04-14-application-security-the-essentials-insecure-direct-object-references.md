---
layout: post
title: "Application Security&#58; The Essentials &#8211; Insecure Direct Object References"
description: "Try and limit the amount of information which is stored in any one place within the application"
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/unsplash-7_cSSarxoAA.png
tags:
  - Access
  - Authentication
  - Credentials
  - Session
  - SQL
  - Security
---

In the articles which we have already published on the topic of [application security](https://www.google.com/search?q=site%3Anetlicensing.io%20Application%20Security%20Essentials "Application Security Essentials"){:target="_blank"}, there has been a recurring topic of proper authentication within the application. Applications are built in layers, with different degrees of access being granted to different users; depending upon whether their credentials have been correctly authenticated. Obviously the primary access to the application should be as secure as possible, with timeouts, secure password policies etc. This article will look at the need for secure references _within_ the application.

A direct object reference is when the developer exposes a reference to an internal ‘object’ within the application. Essentially, when the code points to one of the ‘parts’ which makes up the app. These include the numerous ‘building blocks’ of applications such as specific files, database keys and internal directories. All of these are necessary aspects to make the app work properly for the end-user. The danger which you face by having Insecure Direct Object References is that an attacker can easily modify the parameter’s which have been generated in their browser to access confidential data.

For example; say you have a secure database which stores payment information for your users, this is done for their convenience and to increase their overall ease-of-use if the application is often used as a step in making financial purchases. This could also apply where customers have submitted other personal information, for you to use in providing them with a better experience. If the application uses a SQL call but the initial data is unverified (i.e. user credentials) which is then used to access this account information, attackers can exploit the insecurity in the parameter to access details from any account.

The effect which this can have upon your company is potentially very damaging. A lot of it depends upon the type of data which can be accessed, how much data is stored within the application and how much of it can be accessed as a part of the day to day usage of the application by a user.

It is easy to detect as application testers will be able to easily manipulate parameter values within the code. A thorough analysis of the code will quickly show any potential flaws and gaps in security. It is highly advisable to use ‘human testers’ as automated tool do not usually search for this type of flaw as they are unable to determine when highly levels of security are required.

There are a number of ways to prevent insecure direct object references; as with other security risks – get your code checked – it is not possible to undervalue the importance of a competent and effective human code-checker.

Use per-session or per-user references; this limits the availability of potential flaws which could enable attackers to gain access to secure information.

Try and limit the amount of information which is stored in any one place within the application. Although this can take longer to code and can mean that the user has to go through a couple of additional steps in order to complete tasks within the application, it acts as damage limitation should any unauthorized access occur.
