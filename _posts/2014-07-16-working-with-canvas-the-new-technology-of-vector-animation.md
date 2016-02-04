---
layout: post
title: "Working with Canvas – The new technology of vector animation"
description: "Use of HTML5 gives developers new horizons in animation implement for their websites"
author:
  name: Labs64
  url: http://www.labs64.com
image:
  url: /img/blog/HTML5-working-with-canvas.png
  hide: true
tags:
  - Animation
  - Canvas
  - Drawing
  - Dynamic Web Cookbook
  - GitHub
  - HTML5
  - JavaScript
---

Use of HTML5 gives developers new horizons in animation implement for their websites. There is no need to use outdated Flash technology or to overload traffic with large images, you can simply familiarize with a few norms of creation of motion interpretation by canvas redraw.

<div style="text-align: left;">
    <iframe src="http://io.labs64.com/dynamic-web-cookbook/html5-canvas/index.min.html" width="560" height="550" scrolling="yes" class="iframe-class" frameborder="0"></iframe>
</div>

<span style="line-height: 1.5em;"><strong>Canvas</strong> is a page area reserved for drawing vector elements; there are local coordinates in this area. The following line should be written by using JS to draw, for example, a circle:</span>

`arc(ox, oy, radius, startAngle, endAngle, antiClockWise)`

where _ox_ and _oy_ — center coordinates, _radius_ — circle radius, _startAngle_ and _endAngle_ — start and end angles (in radians) to draw the circle, and _antiClockWise_ is the direction of motion during drawing (true for clockwise motion, false is for counterclockwise).

The given technology allows creation of all basic forms and elements, thus providing the opportunity to ideally create a picture on the reserved area at your website. This method does not effect the page loading time as the drawing of elements takes place instantly, without loading images as had previously been the case.

Now about animation. Everybody is aware about how old cartoons were created, when each frame was drawn manually and the illusion of motion was created by frame rate at which they were then show.

<span style="line-height: 1.5em;">This approach lies behind the animation creation in canvas. Redrawing of all elements takes place automatically every 0.2 seconds, and this creates realistic motion. </span>

<span style="line-height: 1.5em;">There is a mass of originally drawn balls placed on their coordinates. The <em>drawFrame()</em> function activates when a point action occurs. The <em>drawFrame()</em> function is a key part of this example. It not only draws the balls on the canvas but also calculates their current position and speed. A number of different calculations are calculated in the <em>drawFrame()</em> function to more realistically emulate the balls motion. For example, a ball‘s acceleration while falling and deceleration when they bounce from interference. The function activates every 0.2 seconds, evaluates ball position and speed at a time. The standard JavaScript method is used to implement this:</span>

`setTimeout("drawFrame()", 20)`

As a result the balls move according to programmed laws of motion.

<span style="line-height: 1.5em;">You can get aquainted with the same technology of Google company: <a href="http://www.html5canvastutorials.com/labs/html5-canvas-google-bouncing-balls/" target="_blank" rel="nofollow">HTML5 Canvas Google Bouncing Balls</a>. This technology is used to create modern browser games, moving elements interaction with users and also just to make a webpage more appealing to a client.</span>

> Dynamic Web Cookbook - HTML, CSS, JavaScript and other WEBby stuff - [View on GitHub](https://github.com/Labs64/dynamic-web-cookbook/tree/gh-pages/html5-canvas "Dynamic Web Cookbook"){:target="_blank"}
