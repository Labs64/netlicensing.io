---
layout: post
title: "Application Security&#58; The Essentials &#8211; Injection"
description: "When and where you can, use a safe and secure API"
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/unsplash-8z2Q6XWLYa4.png
tags:
  - Security
  - API
  - Injection
  - Risk
  - Security
  - SQL
canonical: http://www.labs64.com/blog/2013/12/application-security-the-essentials-injection/
---

In this next [series of articles](https://www.google.com/search?q=site%3Anetlicensing.io%20Application%20Security%20Essentials "Application Security Essentials"){:target="_blank"} we will be looking in some detail at some of the major risks which present themselves to creators and users of applications. We will not be targeting developers themselves, but those of you who either run a business or are looking to get started in the world of application development this is good place to start. You will often be dealing with large amounts of highly sensitive data and security is there absolute paramount to your operation.

### Injection

The root of application security lies in well planned and well-written code. It is through your code that attackers will seek to jeopardise your product. In short, injection is when a piece of untrusted data is sent as part of a programmed command or query which is built into the software. The target of an injection is usually the potentially confidential data which is stored and used by the application.

The nature of application use in the modern world means that applications frequently have access to information such as the users mobile phone number, address and certain aspects of their profiles on social networking sites – often where the user has used their login details for a social network to register with an application or service.

The root of the risk which injection presents is at the point of interpretation – when the command is ‘read’ by the application or software. It is therefore of upmost importance that your application code can effectively distinguish between a genuine command or query and the untrusted data. There are numerous companies and individuals who specialize in checking code security.

The tiny changes which an injected command can make the pre-determined SQL call or OS command line can have a devastating effect. As an example; if the call is designed to access a specific piece of information on a database i.e. a customer’s email address, the SQL code can be altered to cause the call to return all of the addresses on file, rather than just one. This can cause problems with regard to the protection of yours and your customer’s personal data.

As someone who owns or runs a company to whom customers entrust such data, it is paramount that you protect it in order to protect your reputation and to protect yourself from any legal action being taken against you as the result of stolen, or compromised confidential information.

Injection is a high security risk as attacks can come from almost anywhere and can be simple text-based commands which abuse the weaknesses in the syntax of the applications code. The nature of injections means that they can often only be detected by looking directly at the code itself and automated detection systems may not be all that effective.

### How to prevent Injection?

When and where you can, use a safe and secure API. Also, make sure that you keep a tight lid on the specifics of how the application runs and its source code. Ensure that your business operation is secure, make sure that everyone who works on building your application is experienced and can be trusted. Injection attacks can often come from within the company or development source and by someone who knows the program’s code. Where you can, avoid relying on automatic checking software and have a human physically check the code for you. A human eye is always better than a virtual one.
