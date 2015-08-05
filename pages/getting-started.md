---
layout: page
title: "Getting Started"
description: "This step-by-step guide helps you to customize NetLicensing to your needs."
permalink: "/getting-started/"
tags:
- getting started
- how-to
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>As easy as one, two, three!</h1>
        <h3>NetLicensing makes setup and integration fast, safe and very simple. So you can get up and running in a few hours.</h3>
    </div>
</div>

## Integration

Integration of NetLicensing into your product has two aspects:

### NetLicensing API
<p>Implement calls to the NetLicensing API in your code. <a href="https://www.labs64.de/confluence/pages/viewpage.action?pageId=11010215">NetLicensing API reference</a> and <a href="https://www.labs64.de/confluence/display/NLICPUB/Client+Libraries+and+Sample+Code">examples</a> will help you. At minimum you need a call to the <a href="https://www.labs64.de/confluence/display/NLICPUB/Licensee+Services#LicenseeServices-Validatelicensee">validate</a> method of the licensee services.</p>

### NetLicensing Shop
Provide a link to NetLicensing Shop in the UI of your product or forward the user to NetLicensing Shop URL by other means.
The URL of NetLicensing Shop has the following format:
{% highlight ruby %}
https://netlicensing.labs64.com/app/v2/content/shop.xhtml?shoptoken={token}
{% endhighlight %}
_token_ must be obtained using <a href="https://www.labs64.de/confluence/display/NLICPUB/Token+Services">create token</a> service with tokenType=SHOP. The Generate token service returns also the complete shop URL for convenience.
