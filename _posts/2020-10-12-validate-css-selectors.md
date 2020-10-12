---
layout: post
title: "How to evaluate and validate XPath and CSS selectors?"
description: "The easiest way to validate CSS selectors without any third-party tools or extensions"
image:
  url: /img/blog/netlicensing-guidechimp-tour.png
tags:
  - GuideChimp
  - guded tour
  - JavaScript
  - Browser
  - developers tools
  - CSS
  - XPath
author:
  name: GuideChimp
  url: https://github.com/Labs64/GuideChimp/
---

There are many scenarios where developers need a valid XPath/CSS selector definition.

For instance, [JavaScript configuration for GuideChimp tours](https://github.com/Labs64/GuideChimp/wiki/Configure#javascript-object){:target="_blank"}{:rel="noopener nofollow"} needs a valid element selector, which will be used to highlight an HTML/DOM element or place a beacon.

## What is the easiest way to validate XPath / CSS selectors?

Most of the browsers provide a built-in developer tools, which includes a handy feature that can evaluate or validate XPath/CSS selectors without any third-party extensions: *browser console*.

### Step-by-step instructions:

- Open page containing HTML/DOM you would need to verify selector on; in our example, we'll be using [netlicensing.io/licensing-models](https://netlicensing.io/licensing-models/){:target="_blank"} page
- Open Browser's DevTools panel
  - Chrome, Firefox: press `F12`
  - Safari: use the shortcut `Option + ⌘ + J` (on macOS), or `Shift + CTRL + J` (on Windows/Linux)
- Switch to `Console` tab
- Type in XPath or CSS selectors to evaluate like:

<script src="https://gist.github.com/r-brown/e0d4fde1e14e792b4ec155b0f6f06e7a.js"></script>

If there are matched elements, the console output will contain a matched DOM element; otherwise `null`, `undefined` or an exception will be thrown if the locator is invalid or doesn't exist.

![Validate CSS selector for GuideChimp](/img/blog/guidechimp-scc-selector.png "Validate CSS selector for GuideChimp"){:class="blog-center"}

Most of the browser will even highlight HTML element on mouse hover over the console output.

---

Having all CSS selectors properly defined, GuideChimp will show an [interactive guided tour](https://netlicensing.io/licensing-models/?guidechimp=on&tour=licensing-models){:target="_blank"} for your website or application.
