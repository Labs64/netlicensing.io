---
layout: post
title: "What is Authentication-Authorization-Validation Framework?"
description: "AAV Framework allows developers to easily managing changing product use cases and scenarios"
image:
  url: /img/blog/authenticate-authorize-validate-framework.gif
tags:
  - AAV
  - Framework
  - Authenticate
  - Authorize
  - Validate
author:
  name: Alexey AVerikhin
  url: https://www.labs64.com/our-team/
---

Authentication and Authorization are one of the important and integral concepts in software development.

Almost every developer is familiar with the basic technology stack and buzz-words: Single-Factor- / Two-Factor- / Multi-factor authentication, Basic Auth, OAuth, OpenID, LDAP, Active Directory and many, many others.

Let's take a look at these two concepts:

### Authentication

*Authentication* is the first step of authentication & authorization flow and validating user credentials (usually requires username and password) and confirms user identity to grant access to the system.

### Authorization

*Authorization* is done after successful authentication and determines whether the user is authorized to access the requested resources.

Authorization often defines a static set of access rights to resources and has its restrictions, when it comes to dynamic access control when using subscriptions or metered (pay-per-use) access models (think of AWS).

So, for instance, the same application role (Trial-User, Administrator, etc.) can have a different access level to the system in general or to the individual components and functionality, depending on the licensing status.

An extended *"Authentication-Authorization-Validation Framework (AAV) Framework"* addressing this concern and adding a third step to the process - **Validation**.

![Authentication-Authorization-Validation Framework](/img/blog/aav-framework-flow.png "Authentication-Authorization-Validation Framework"){:class="blog-center"}

### Validation

*Validation* is a process of user entitlements verification, based on the applied licensing scheme; e.g. subscription, metered model, node locking, concurrent system access, etc.

In most of the cases, a hybrid model adopted to cover different monetization and licensing strategies. So, the user might be able to use application functions, he or she is entitled to ([Multi-Feature](https://netlicensing.io/wiki/multi-feature)), use an application on two devices only ([Node-Locked](https://netlicensing.io/wiki/node-locked)) and have time restriction to access an application for 1 year ([Subscription](https://netlicensing.io/wiki/subscription)).

Thus, the enhanced *AAV Framework* allows developers to use standard and proven toolset to authenticate and authorize users, and easily manage dynamically changing product use cases and scenarios defined by the company's *Monetization and Licensing Strategy*.

{% include advert.html image='/img/ads/netlicensing-license-management-728x90.png' %}

While the Authentication and Authorization processes are often the responsibility of the operations team, Validation and management of the user entitlements are usually controlled by customer support and account management team.
