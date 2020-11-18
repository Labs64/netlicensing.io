---
layout: post
title: "Onboard users using interactive Product Tours with GuideChimp"
description: "..."
image:
  url: /img/blog/guidechimp-webapp-product-tours.png
tags:
  - GuideChimp
  - user adoption
  - user onboarding
  - user experience
  - guided tour
  - product tour
  - walkthrough
  - digital adoption
  - DAP
  - user training
  - user engagement
author:
  name: GuideChimp
  url: https://www.labs64.com/guidechimp/
---

Step-by-step interactive guides and feature introduction tours is one of the techniques every marketer should know and adopt nowadays.

Using these techniques you can easily convert new users into the happy and... paying customers.

There are several free JavaScript-based product tour libraries available, such as Shepherd, Intro.js, React Joyride, *GuideChimp* and also commercial products, such as Whatfix, Walkme, etc.

Among these libraries, [GuideChimp](https://www.labs64.com/guidechimp/){:target="_blank"} provides all the essential features to enable product tour on any website or webapp.

### Why GuideChimp is different?

- GuideChimp is a well-maintained library with great support and documentation.
- A fresh and modern look&feel can be easily customized according to your needs and brand identity.
- Great support of Single Page Applications build with Angular, Vue.js, React, and other dynamic JS-Frameworks.
- Modular design allows functionality extension and customisations.
- GuideChimp can be extended using out-of-the-box and third-party [plugins](https://github.com/Labs64/GuideChimp/wiki/Plugins){:target="_blank"}{:rel="noopener nofollow"}.
- You can enable tour on the lazy-loaded or delayed elements in single-page applications.
- GuideChimp is designed as a JS class, so you can easily inherit from it and change / add custom methods.
- With [GuideChimp Chrome Extension](https://chrome.google.com/webstore/detail/guidechimp-chrome-extensi/afecedbgkfoijeligfjflidfddndnjng){:target="_blank"}{:rel="noopener nofollow"} you can start guided tours on any website with ZERO! code effort.
- ... see the full list of GuideChimp features [here](https://www.labs64.com/guidechimp/#features){:target="_blank"}

### What can you do with GuideChimp?

These are only some few examples of how you can use GuideChimp in your web applications.

- **User Experience:** Implement engaging and personalised guides to walk users through your system.
- **User Onboarding:** Successfully onboard your users from day one with an intuitive step by step walkthroughs.
- **Feature Adoption:** Introduce and highlight new features with personalized guides.
- **In-product Messaging:** Engage the right segment of your users at the right time and increase conversion.
- **Employee Training:** Improve your employees' productivity by providing an efficient and interactive training system.

### How to enable GuideChimp tours

So, let's see, how you can start using GuideChimp in a few simple steps.

#### **Install library**

There are numerous [ways](https://github.com/Labs64/GuideChimp/wiki/Install){:target="_blank"}{:rel="noopener nofollow"} how you can install GuideChimp library:

- CDN
- Node.js / npm module
- ES6 module
- manual installation

We will be using Node.js / npm method in this guide:

Execute following command in your Node.js environment:
```shell
> npm install guidechimp
```

or simply add the dependency to your `package.json` file:
```json
"dependencies": {
    "guidechimp": "x.y.z"
}
```

#### **Prepare HTML page**

GuideChimp is using DOM elements on your website to highlight these and show tooltips. You need to identify website visuals that need to be highlighted.

Use CSS selectors to identify these elements. You can use this article to see [how to verify CSS selector](/blog/2020/10/12/validate-css-selectors/).

HTML snippet example with the link element and `"id"` property set:
```html
<a href="#" id="guidechimp-demo" class="NL_button button_main NL_light_btn" role="button">
    <i class="fa fa-eye"></i>Demo Tour
</a>
```

#### **Define tour steps**

Now you need to define guided tour steps using the elements data we prepared and collected in the previous section.
GuideChimp supports [two ways](https://github.com/Labs64/GuideChimp/wiki/Configure#step-definition){:target="_blank"}{:rel="noopener nofollow"} of how the tour steps can be defined: *HTML Attributes* and *JavaScript Object*.

In this tutorial we will be using JS method.ö

Create `tourGuideChimp` JS variable and assign an array of the steps:
```javascript
var tourGuideChimp = [
    {
        element: '#guidechimp-demo',
        title: 'GuideChimp Demo',
        description: 'See GuideChimp in action, right here & now, on your screen.'
    }
];
```

#### **Start guided tour**

Now we need to trigger GuideChimp tour start, e.g. on element click, page open or any other event on the website.

```javascript
// initialize GuideChimp class
var guideChimp = GuideChimp(tourGuideChimp);
document.querySelector('#guidechimp-demo').onclick = function () {
    // start tour via 'onclick' event
    guideChimp.start();
};
```

### Showtime

That's all and very easy! The tour is ready to go and show your customers all the best sides of your webapp!

![GuideChimp in Action](/img/blog/guidechimp-in-action.png "GuideChimp in Action"){:class="blog-center"}

You can see this demo tour and *GuideChimp in action* at [www.labs64.com/guidechimp](https://www.labs64.com/guidechimp/)

### Final Thoughts

A guided tour or walkthrough can provide so much benefit to your visitors and drive product adoption by showing essential product features and convert users into happy customers.

This tutorial showing best practices on how you can use GuideChimp and build guided product tours for your webapps.

If you have further ideas, how we can improve GuideChimp, please share these with at [Labs64/GuideChimp](https://github.com/Labs64/GuideChimp/issues){:target="_blank"}{:rel="noopener nofollow"}.
