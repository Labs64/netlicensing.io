---
layout: post
title: "Post template - Title"
description: "Post template - Description"
image:
tags:
- TechExpress
author:
  name: TechExpress
  url: http://tech-x.press
---

[Markdown](http://daringfireball.net/projects/markdown/) allows you to write using an easy-to-read, easy-to-write plain text format, which then converts to valid HTML post.

This [post template](https://raw.githubusercontent.com/Labs64/tech-x.press/gh-pages/_drafts/2010-09-16-post-template.md) includes sample content to guide you on how to create content on [TechExpress](http://tech-x.press).

## HEADERS
---

# This is an H1 header

## This is an H2 header

### This is an H3 header

#### This is an H4 header

##### This is an H5 header

###### This is an H6 header

## TEXT FORMATTING
---

*Emphasized* text (var 1)

_Emphasized_ text (var 2)

**Strong** text (var 1)

__Strong__ text (var 2)

~~Strikethrough~~ text

Citations:

> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

> *Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.*

## LISTS
---

Unordered (bulleted) list (var 1)

* labs64.com
* netlicensing.io
* tech-x.press

Unordered (bulleted) list (var 2)

- labs64.com
- [netlicensing.io](http://netlicensing.io "Innovative License Management Solution")
- tech-x.press

Unordered (bulleted) list (var 3)

+ labs64.com
+ netlicensing.io

  list item - second line

+ tech-x.press

Ordered (bulleted) list (var 1)

1. labs64.com
2. netlicensing.io
3. tech-x.press

Nested lists

1. labs64.com
2. netlicensing.io
  1. Flexible Licensing Models
  2. Easy Setup and Integration
  3. Cross-Platform Licensing
3. tech-x.press

## LINKS
---

This a [link](http://netlicensing.io)

This a [link with title](http://netlicensing.io "Innovative License Management Solution")

Reference-style links: [NetLicensing][NLIC] and [TechExpress][2] were developed by [Labs64][3]

[NLIC]: http://netlicensing.io   "Labs64 NetLicensing - Innovative License Management Solution"
[2]: http://tech-x.press         "TechExpress - Latest Tech News Around the World"
[3]: http://www.labs64.com       "Labs64 - Innovations Delivered"

## IMAGES
---

Image with title and alt tags

![Labs64 QR Code](/img/labs64-QR-white.png "Labs64 QR Code")

## CODE
---

Syntax highlighting (var 1)

{% highlight ruby %}
require 'netlicensing'
res = NetLicensing.validate("1234-5678-90")
puts res.to_html
{% endhighlight %}

Syntax highlighting (var 2)

```xml
<dependencies>
  <dependency>
    <groupId>com.labs64.netlicensing</groupId>
    <artifactId>netlicensing-client</artifactId>
    <version>2.2.1</version>
  </dependency>
</dependencies>
```
