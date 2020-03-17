---
layout: post
title: "Build Guided Product Tours Using GuideChimp"
description: "Help your customers to reach "Aha!" moment faster with GuideChimp"
author:
  name: GuideChimp
  url: https://github.com/Labs64/GuideChimp
image:
  url: https://raw.githubusercontent.com/Labs64/GuideChimp/master/docs/img/guidechimp-stage-04.png
tags:
  - News
  - Announcements
  - guide
  - guided-tour
  - user-flow
  - product-tour
  - tour-guide
  - tour-guide-app
  - tour
  - tours
  - user-experience
  - onboarding
  - feature-adoption
  - employee-training
  - tooltips
  - beacon
  - hint
  - hotspot
  - walkthrough
  - flow
---

Customer retention and churn are the biggest concerns for almost all SaaS vendors. To engage the customers you need to help them reach "Aha!" moment faster.
One of the proven tactics here is - Guided Product Tours.
There are numerous libraries available, which allows you to create your own guided product tour and onboard customers quickly.
Today we want to present you GuideChimp - a lightweight, extendable and most non-technical friendly library for creation of interactive guided product tours.

Why is GuideChimp different
Although it does the same job as the rest of the Guided Tour libraries, the main differences are:
extendability - use build-in plugins or contribute by developing your own plugin, which is extending GuideChimp functionality
support modern asynchronous & single page web applications written in React, Angular, Vue.js and many others
deferred DOM element assignment (lazy-loading)
multi-page tour capabilities
tour event listeners and callbacks
GuideChimp is the most up-2-date and well-maintained library as of today, and available under Apache 2.0 License.

How To Start
Install
There are multiple options available on how you can include GuideChimp in your application. You can choose one, which fits best in your technology stack:
HTML Element declaration
Node.js/npm Module
ES6 Module
Below example can be used to enable GuideChimp by adding as a HTML head elements:

{% highlight html %}
<!-- GuideChimp -->
<script src="https://cdn.jsdelivr.net/npm/guidechimp@1/dist/guidechimp.min.js"></script>	 
<linkrel="stylesheet" href="https://cdn.jsdelivr.net/npm/guidechimp@1/dist/guidechimp.min.css">
<!-- GuideChimp - GA plugin -->
<script src="https://cdn.jsdelivr.net/npm/guidechimp@1/dist/plugins/googleAnalytics.js"></script>     
{% endhighlight %}

Configure
Below is the minimal configuration needed to create tour definition for your web app.

{% highlight javascript %}
var tour = [
  {
    element: '#id1',
    title: 'Step 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    element: '#id2',
    title: 'Step 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];
{% endhighlight %}

Single tour steps can be associated with particular element on the page by defining 'element' attribute.

As a next step you need to initialize GuideChimp object and define action to start tour:

{% highlight javascript %}
var guideChimp = new GuideChimp(tour);
document.getElementById('startTour').onclick = function() {
  guideChimp.start();
};
{% endhighlight %}

With this minimal configuration, you are good to go and by clicking on the element with id '#startTour' you will see GuideChimp in action.

Conclusion

In this article, we showcased the basic GuideChimp functionality only.
GuideChimp is flexible enough and allows you to adopt the visual and functional part as per your requirements and website design.

Please use GuideChimp wiki as a reference here: https://github.com/Labs64/GuideChimp/wiki

We hope this GuideChimp intro will be a great use for your new user onboarding process.
Be part of the community ( Slack ) - share your ideas and best practices, help other adopters, contribute to the GuideChimp ecosystem... be in the good company.
Stay up-to-date on GuideChimp social media channels; LinkedIn, Reddit, Twitter, Instagram, Facebook.
