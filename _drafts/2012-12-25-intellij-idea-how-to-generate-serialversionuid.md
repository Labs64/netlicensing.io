---
layout: post
title: "IntelliJ IDEA&#58; How to generate &#8216;serialVersionUID&#8217;"
description: ""
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/blog-placeholder.jpg
canonical: http://www.labs64.com/blog/2012/12/intellij-idea-how-to-generate-serialversionuid/
tags:
  - Java
  - Howto
  - IDE
  - IntelliJ IDEA
  - JavaEE
  - Serializable
  - serialVersionUID
---
When Java class implements _Serializable_ interface you have the following options:

  * don&#8217;t declare _serialVersionUID_ explicitly
  * add default _serialVersionUID(1L)_
  * generate _serialVersionUID_ value

<a href="/content/uploads/2012/12/labs64-blog-howto-idea001.png" rel="attachment wp-att-102" target="_blank" rel="nofollow"><img class="alignnone size-medium wp-image-102" alt="" src="/content/uploads/2012/12/labs64-blog-howto-idea001-241x300.png" width="241" height="300" srcset="http://www.labs64.com/content/uploads/2012/12/labs64-blog-howto-idea001-241x300.png 241w, http://www.labs64.com/content/uploads/2012/12/labs64-blog-howto-idea001.png 551w" sizes="(max-width: 241px) 100vw, 241px" /></a>

<a title="Interface Serializable" href="http://docs.oracle.com/javase/7/docs/api/java/io/Serializable.html" target="_blank" rel="nofollow">Java API Specification</a> says:

> It is _strongly recommended_ that all serializable classes explicitly declare serialVersionUID values, since the default serialVersionUID computation is highly sensitive to class details that may vary depending on compiler implementations, and can thus result in unexpected InvalidClassException&#8217;s during deserialization.

therefore it is wise to choose the latter option.

If you&#8217;re using a very popular Java development IDE IntelliJ IDEA, you may find it not straightforward, how to generate the _serialVersionUID_ there. Below is the recipe for the IntelliJ IDEA 12 (latest at the time of writing), hope you&#8217;ll find it useful:

  * Go to &#8220;_File&#8221; => &#8220;Settings&#8230; (Ctrl+Alt+S)&#8221; => &#8220;Inspections&#8221; => &#8220;Serialization issues&#8221;_
  * &#8230; and enable _&#8220;Serializable classes without &#8216;serialVersionUID'&#8221;_

<a href="/content/uploads/2012/12/labs64-blog-howto-idea002.png" rel="attachment wp-att-103" target="_blank" rel="nofollow"><img class="alignnone size-medium wp-image-103" alt="" src="/content/uploads/2012/12/labs64-blog-howto-idea002-300x249.png" width="300" height="249" srcset="http://www.labs64.com/content/uploads/2012/12/labs64-blog-howto-idea002-300x249.png 300w, http://www.labs64.com/content/uploads/2012/12/labs64-blog-howto-idea002-1024x851.png 1024w, http://www.labs64.com/content/uploads/2012/12/labs64-blog-howto-idea002.png 1036w" sizes="(max-width: 300px) 100vw, 300px" /></a>

  * Then use the IntelliJ IDEA light bulb or press Alt+Enter to generate the field

<a href="/content/uploads/2012/12/labs64-blog-howto-idea003.png" target="_blank" rel="nofollow"><img class="alignleft size-medium wp-image-104" alt="" src="/content/uploads/2012/12/labs64-blog-howto-idea003-268x300.png" width="268" height="300" /></a>
