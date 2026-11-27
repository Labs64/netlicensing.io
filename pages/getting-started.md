---
layout: page
title: "Getting Started"
description: "Configure a product, validate a customer and sell licenses: NetLicensing in three steps, with copy-ready API examples."
permalink: "/getting-started/"
tags:
- getting started
- how-to
---
<!-- Styles: _scss/_getting-started.scss. Copy buttons: js/copy-code.js. -->
<div class="row NL_banner">
    <div class="col-md-8 col-md-offset-2 NL_about_page">
        <h1>From account to first validation</h1>
        <span>Three steps: describe your product, ask NetLicensing what a customer may use, and let customers buy.</span>
        <div class="row">
            <div class="col-md-4 col-md-offset-2">
                <a href="https://ui.netlicensing.io/#/register?utm_source=netlicensing.io_getting-started&amp;utm_medium=website&amp;utm_campaign=netlicensing.io_getting-started&amp;utm_content=hero-signup" class="NL_button button_main NL_light_btn NL_cta_primary" role="button"><i class="fa fa-user-plus"></i>Sign Up Free</a>
            </div>
            <div class="col-md-4">
                <a href="https://netlicensing.io/NetLicensing-API/" class="NL_button button_main NL_light_btn" role="button"><i class="fa fa-flask"></i>API Test Center</a>
            </div>
        </div>
    </div>
</div>

<nav class="row NL_start_nav" aria-label="Steps">
    <ol>
        <li><a href="#configure"><b>1</b>Configure your product</a></li>
        <li><a href="#validate"><b>2</b>Validate a customer</a></li>
        <li><a href="#sell"><b>3</b>Sell licenses</a></li>
    </ol>
</nav>

<section id="configure" class="row NL_start_step" aria-labelledby="configure-title">
    <div class="col-md-4 col-md-offset-1">
        <h2 id="configure-title"><b aria-hidden="true">1</b>Configure your product</h2>
        <p>Create a <a href="https://ui.netlicensing.io/#/products">product</a> in the Management Console with one or more product modules. Each module follows a <a href="{{ '/licensing-models/' | relative_url }}">licensing model</a>, and its license templates are what you sell.</p>
        <p>Not sure where to start? Load a ready-made configuration from <a href="https://ui.netlicensing.io/#/demo-scenario">Demo Data</a> and change it.</p>
        <p><a href="https://netlicensing.io/wiki/planning">Plan your licensing scheme &rarr;</a></p>
    </div>
    <div class="col-md-6">
        <div class="NL_start_model">
            <ul>
                <li><b>Product</b><span>Your application or service</span>
                    <ul>
                        <li><b>Product module</b><span>One licensing model, such as Subscription or Multi-Feature</span>
                            <ul>
                                <li><b>License template</b><span>A package with its price, period or quantity</span></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><b>Customer (licensee)</b><span>Identified by a licensee number that you can choose</span>
                    <ul>
                        <li><b>License</b><span>Created from a template when the customer buys or tries</span></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</section>

<section id="validate" class="row NL_start_step" aria-labelledby="validate-title">
    <div class="col-md-4 col-md-offset-1">
        <h2 id="validate-title"><b aria-hidden="true">2</b>Validate a customer</h2>
        <p>All of a customer&rsquo;s licenses live in one place, so there are no license files to deliver. One call with the licensee number tells your application what this customer may use.</p>
        <ol>
            <li>Create an <a href="https://netlicensing.io/wiki/security#api-key-identification">API key</a> with the role <code>ROLE_APIKEY_LICENSEE</code>.</li>
            <li>Replace <code>YOUR_API_KEY</code> and <code>CUSTOMER-123</code> in the request.</li>
            <li>Turn features on or off from the answer, and reuse it until <code>ttl</code> passes.</li>
        </ol>
        <p>New customer? Switch on licensee auto-create for the product and send <code>productNumber</code> with the first call.</p>
        <p><a href="https://netlicensing.io/wiki/licensee-services#validate-licensee">Validation reference &rarr;</a></p>
    </div>
    <div class="col-md-6 NL_start_code">
        <h3>Request</h3>
{% highlight bash %}
curl --request POST --user apiKey:YOUR_API_KEY \
  --header "Accept: application/json" \
  https://go.netlicensing.io/core/v2/rest/licensee/CUSTOMER-123/validate
{% endhighlight %}
        <h3>Response (example, shortened)</h3>
{% highlight json %}
{
  "ttl": "2026-12-01T09:00:00.000Z",
  "items": {
    "item": [
      {
        "type": "ProductModuleValidation",
        "property": [
          { "name": "productModuleNumber", "value": "M-TRIAL" },
          { "name": "licensingModel", "value": "TryAndBuy" },
          { "name": "valid", "value": "true" },
          { "name": "evaluation", "value": "true" },
          { "name": "evaluationExpires", "value": "2026-12-30T09:00:00.000Z" }
        ]
      }
    ]
  }
}
{% endhighlight %}
    </div>
</section>

<section id="sell" class="row NL_start_step" aria-labelledby="sell-title">
    <div class="col-md-4 col-md-offset-1">
        <h2 id="sell-title"><b aria-hidden="true">3</b>Sell licenses</h2>
        <p>Use NetLicensing Shop: create a shop token for the customer and open the <code>shopURL</code> it returns, from your product&rsquo;s interface or any link. The next validation shows what they bought.</p>
        <p>Already selling elsewhere? Your e-commerce or billing system can create licenses through the API.</p>
        <p><a href="https://netlicensing.io/wiki/token-services#create-token">Shop token reference &rarr;</a><br>
        <a href="https://netlicensing.io/wiki/integrations">Integrations &rarr;</a></p>
    </div>
    <div class="col-md-6 NL_start_code">
        <h3>Request</h3>
{% highlight bash %}
curl --user apiKey:YOUR_API_KEY \
  --header "Accept: application/json" \
  --data "tokenType=SHOP&licenseeNumber=CUSTOMER-123" \
  https://go.netlicensing.io/core/v2/rest/token
{% endhighlight %}
        <h3>Response (example, shortened)</h3>
{% highlight json %}
{
  "items": {
    "item": [
      {
        "type": "Token",
        "property": [
          { "name": "tokenType", "value": "SHOP" },
          { "name": "licenseeNumber", "value": "CUSTOMER-123" },
          { "name": "expirationTime", "value": "2026-12-01T09:00:00.000Z" },
          { "name": "shopURL",
            "value": "https://go.netlicensing.io/shop/v2/?shoptoken=YOUR-SHOP-TOKEN" }
        ]
      }
    ]
  }
}
{% endhighlight %}
    </div>
</section>

<div class="row NL_block">
    <h2 class="col-md-12">Continue in Your Language</h2>
    <p class="col-md-8 col-md-offset-2 NL_start_intro">Quick starts with a client library, or plain REST from anything that speaks HTTPS.</p>
</div>
<div class="row">
    <ul class="col-md-10 col-md-offset-1 NL_start_links">
        <li><a href="https://netlicensing.io/wiki/java-software-licensing">Java</a></li>
        <li><a href="https://netlicensing.io/wiki/dotnet-software-licensing">C# / .NET</a></li>
        <li><a href="https://netlicensing.io/wiki/python-software-licensing">Python</a></li>
        <li><a href="https://netlicensing.io/wiki/javascript-software-licensing">JavaScript</a></li>
        <li><a href="https://netlicensing.io/wiki/php-software-licensing">PHP</a></li>
        <li><a href="https://netlicensing.io/wiki/restful-api">REST API</a></li>
    </ul>
    <p class="col-md-10 col-md-offset-1 NL_start_intro">Also useful: <a href="https://netlicensing.io/wiki/offline-license-validation">offline validation</a> and the <a href="https://netlicensing.io/wiki/netlicensing-mcp">MCP server</a> for AI assistants.</p>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Try It With Your Own Product</h2>
            <span>Start with a free account. No credit card required.</span>
            <div class="row NL_cta_row">
                <div class="col-sm-4 col-sm-offset-4">
                    <a href="https://ui.netlicensing.io/#/register?utm_source=netlicensing.io_getting-started&amp;utm_medium=website&amp;utm_campaign=netlicensing.io_getting-started&amp;utm_content=closing-signup" class="NL_button button_main NL_dark_btn NL_wide_btn"><i class="fa fa-user-plus"></i>Create a Free Account</a>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ '/js/copy-code.js' | prepend: site.baseurl }}?v={{ site.time | date: '%Y%m%d%H%M' }}" defer></script>
