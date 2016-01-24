---
layout: post
title: "Application Security&#58; The Essentials &#8211; Failure to Restrict URL Access"
description: ""
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/blog-placeholder.jpg
canonical: http://www.labs64.com/blog/2014/06/application-security-the-essentials-failure-to-restrict-url-access/
tags:
  - Security
  - Access Rights
  - Link
  - Security
  - URL
---
It is often the case that applications will contain URL references to its separate pages through the use of protected links and buttons. The content to which you link depends entirely upon the application and its function; however, you should consider every link to be a potential gateway for an attack. Within an application, there is likely to be references to pages which contain confidential or sensitive data and unless you have correctly configured the restrictions; anyone with network access could potentially access private pages.

This is a [security](http://www.labs64.com/?s=Application+Security+Essentials "Application Security") flaw which is easily exploited by attackers. This is because all they need to do to access a private page is make a manual change to the URL which forces the browser to open a different page to the one which you may have originally intended – this means that instead of accessing the pages designed for users, they can access those which are in place for use by admins only.

Depending upon the access rights which they have been granted, users are able to access different pages within the application, each of which has its own unique URL. Although links and buttons may be visible to users with all levels of access, if the access rights have been correctly configured then they will only be able to access the levels which they are supposed to.

Every application which uses internal URLs is vulnerable to this particular security flaw. It can be a cause for concern as it is not always possible to determine what level of access may be granted to a user who is able to view pages which they do not have clearance to view. You then need to consider whether or not unrestricted access to certain pages within the application then enables a user to make broader changes to setting within the application as well as access other sensitive data.

It is easy to detect flaws, but it can be a long a laborious task as _every_ single page has to be checked and verified individually. Although it is easy to find a page which does not have the necessary restrictions in place, it is significantly harder to determine which pages may be at risk of unauthorized access.

In order to prevent Unrestricted URL Access there are a number of steps which you should take during the development process. At its heart, there is the case of proper selection of the authentication method both for initial application access and between pages within the application.

The access policy should be based upon the defined user role, so as to make it easier to configure any additional pages which are added so that only authorized users can have access to them; i.e. having a standard and admin user roles already configured means that you can then easily assigned the relative access rights to new pages as they are created – rather than having to set the access policies for each individual page.

Access should be denied by default, if authentication fails for any user then they should not have any access. This can cause frustration but is an obvious step in the prevention of unauthorized access to your application.
