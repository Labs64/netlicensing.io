---
layout: post
title: "IntelliJ IDEA&#58; How to generate &#8216;serialVersionUID&#8217;"
description: "It is strongly recommended that all serializable classes explicitly declare serialVersionUID values"
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/labs64-blog-howto-idea002.png
  hide: true
tags:
  - Java
  - Howto
  - IDE
  - IntelliJ IDEA
  - JavaEE
  - Serializable
  - serialVersionUID
sitemap:
  images:
    - /img/blog/labs64-blog-howto-idea001.png
    - /img/blog/labs64-blog-howto-idea002.png
    - /img/blog/labs64-blog-howto-idea003.png
---

When Java class implements _Serializable_ interface you have the following options:

  * don&#8217;t declare _serialVersionUID_ explicitly
  * add default _serialVersionUID(1L)_
  * generate _serialVersionUID_ value

![IntelliJ IDEA - serialVersionUID](/img/blog/labs64-blog-howto-idea001.png "IntelliJ IDEA - serialVersionUID"){:class="blog-center"}

<a title="Interface Serializable" href="http://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html" target="_blank" rel="nofollow">Java API Specification</a> says:

> It is _strongly recommended_ that all serializable classes explicitly declare serialVersionUID values, since the default serialVersionUID computation is highly sensitive to class details that may vary depending on compiler implementations, and can thus result in unexpected InvalidClassException&#8217;s during deserialization.

therefore it is wise to choose the latter option.

If you&#8217;re using a very popular Java development IDE IntelliJ IDEA, you may find it not straightforward, how to generate the _serialVersionUID_ there. Below is the recipe for the IntelliJ IDEA 12 (latest at the time of writing), hope you&#8217;ll find it useful:

  * Go to &#8220;_File&#8221; => &#8220;Settings&#8230; (Ctrl+Alt+S)&#8221; => &#8220;Inspections&#8221; => &#8220;Serialization issues&#8221;_
  * &#8230; and enable _&#8220;Serializable classes without &#8216;serialVersionUID'&#8221;_

![IntelliJ IDEA - serialVersionUID](/img/blog/labs64-blog-howto-idea002.png "IntelliJ IDEA - serialVersionUID"){:class="blog-center"}

  * Then use the IntelliJ IDEA light bulb or press Alt+Enter to generate the field

![IntelliJ IDEA - serialVersionUID](/img/blog/labs64-blog-howto-idea003.png "IntelliJ IDEA - serialVersionUID"){:class="blog-center"}
