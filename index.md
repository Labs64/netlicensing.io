---
layout: page
title: Innovative License Management Solution
description: "NetLicensing allows Software Vendors to deliver and activate product licenses online and provides the ability to adopt numerous ready-to-use Licensing Models"
permalink: /
sitemap:
  priority: 0.8
no-cache: true
---
<!-- Styles: _scss/_home.scss, _scss/_features.scss (illustrated rows). Every section below the
     banner has the same shape: centred title, one-line intro, content. -->
<div class="row NL_main_banner NL_home_hero">
    <div class="col-md-6 col-md-offset-1 NL_about NL_home_pitch">
        <h1>All-in-one licensing automation for your digital products and services</h1>
        <span>Add trials, subscriptions, floating, node-locked and usage-based licensing through one API, and sell licenses online. No license server of your own.</span>
        <div class="NL_home_actions">
            <a href="https://ui.netlicensing.io/#/register?utm_source=netlicensing.io_home&amp;utm_medium=website&amp;utm_campaign=netlicensing.io_home&amp;utm_content=hero-signup"
               class="NL_button button_main NL_light_btn NL_cta_primary" role="button"><i class="fa fa-user-plus"></i>Sign Up Free</a>
            <div id="live-demo"><a href="/demo-optin/" class="NL_button button_main NL_light_btn" role="button"><i class="fa fa-eye"></i>Live Demo</a></div>
        </div>
        <p class="NL_cta_note">No credit card required &middot; <span id="getting-started"><a href="/getting-started/">Getting Started &rarr;</a></span></p>
    </div>
    <figure class="col-md-4 NL_home_call">
        <figcaption>One call tells your product what a customer may use</figcaption>
{% highlight bash %}
POST /core/v2/rest/licensee/CUSTOMER-123/validate

{
  "valid": "true",
  "licensingModel": "Subscription",
  "expires": "2027-11-30T09:00:00.000Z"
}
{% endhighlight %}
        <small>Simplified example. <a href="/getting-started/#validate">See the full request and response</a></small>
    </figure>
</div>

<!-- Latest entry of the changelog; stays hidden if the feed can't be read (js/latest-update.js). -->
<p class="NL_latest_update" data-latest-update data-feed="/wiki/feed.xml" hidden></p>
<script src="{{ '/js/latest-update.js' | prepend: site.baseurl }}?v={{ site.time | date: '%Y%m%d%H%M' }}" defer></script>

<section class="NL_home_section">
    <header class="NL_home_head">
        <h2>What You Can Check Before You Commit</h2>
        <p>Four facts, each with a link to the details.</p>
    </header>
    <div class="row NL_industry_problem_row NL_trust_cards NL_home_proof">
        <div class="col-md-3 col-sm-6 NL_feature">
            <figure class="hover_effect"><figcaption>
                <img loading="lazy" decoding="async" src="{{ '/img/features/different_hosting_options.png' | relative_url }}" alt="">
                <h3>EU Operated</h3>
                <p>Run by Labs64 GmbH in Germany, with managed hosting on AWS in Ireland.</p>
                <p class="NL_home_link"><a href="{{ '/trust/' | relative_url }}">Trust and privacy &rarr;</a></p>
            </figcaption></figure>
        </div>
        <div class="col-md-3 col-sm-6 NL_feature">
            <figure class="hover_effect"><figcaption>
                <img loading="lazy" decoding="async" src="{{ '/img/features/integrated_payment_services.png' | relative_url }}" alt="">
                <h3>Your Payment Accounts</h3>
                <p>Shop sales go straight into your own PayPal or Stripe account.</p>
                <p class="NL_home_link"><a href="https://netlicensing.io/wiki/payment-service-providers">Payment providers &rarr;</a></p>
            </figcaption></figure>
        </div>
        <div class="col-md-3 col-sm-6 NL_feature">
            <figure class="hover_effect"><figcaption>
                <img loading="lazy" decoding="async" src="{{ '/img/features/service_level_agreement.png' | relative_url }}" alt="">
                <h3>Uptime in Writing</h3>
                <p>99.5% uptime SLA with Select and Enterprise.</p>
                <p class="NL_home_link"><a href="https://www.labs64.com/legal/terms-of-service/netlicensing/service-level-agreement-1-1/">Read the SLA &rarr;</a></p>
            </figcaption></figure>
        </div>
        <div class="col-md-3 col-sm-6 NL_feature">
            <figure class="hover_effect"><figcaption>
                <img loading="lazy" decoding="async" src="{{ '/img/features/restful_api_and_integration.png' | relative_url }}" alt="">
                <h3>Open Interfaces</h3>
                <p>A documented REST API, an OpenAPI specification and client libraries on GitHub.</p>
                <p class="NL_home_link"><a href="{{ '/documentation/' | relative_url }}">For integrators &rarr;</a></p>
            </figcaption></figure>
        </div>
    </div>
</section>

<section class="NL_home_section">
    <header class="NL_home_head">
        <h2>What NetLicensing Takes Off Your Plate</h2>
        <p>Activation, licensing models, online sales and integration.</p>
    </header>

<div class="row NL_feature_story" id="simplify-license-activation">
    <div class="col-md-5 col-md-offset-1">
        <img src="{{ '/img/netlicensing-landing-laas.png' | relative_url }}" alt="">
    </div>
    <div class="col-md-5">
        <h3>Simplify License Activation</h3>
        <p>Deliver and activate product licenses around the clock without involving customer support. Your licensing back office can run fully automated, and you can still manage licenses by hand in the Management Console.</p>
        <p><a href="{{ '/features/' | relative_url }}">All features &rarr;</a></p>
    </div>
</div>

<div class="row NL_feature_story" id="maximize-revenue">
    <div class="col-md-5 col-md-push-6">
        <img loading="lazy" decoding="async" src="{{ '/img/netlicensing-landing-licensing-models.png' | relative_url }}" alt="">
    </div>
    <div class="col-md-5 col-md-pull-4">
        <h3>Maximize Revenue with Flexible Licensing Models</h3>
        <p>Choose ready-to-use licensing models and combine them in one product, or have custom models built for your needs and goals.</p>
        <ul class="NL_home_chips">
            {%- for model in site.data.licensingmodels %}
            {%- if model.picker == false %}{% continue %}{% endif %}
            <li><a href="{{ model.url }}" title="{{ model.summary | escape }}">{{ model.name | escape }}</a></li>
            {%- endfor %}
        </ul>
        <p><a href="{{ '/licensing-models/' | relative_url }}">Compare licensing models &rarr;</a></p>
    </div>
</div>

<div class="row NL_feature_story" id="reduce-ecommerce-complexity">
    <div class="col-md-5 col-md-offset-1">
        <img loading="lazy" decoding="async" src="{{ '/img/netlicensing-landing-shop.png' | relative_url }}" alt="">
    </div>
    <div class="col-md-5">
        <h3>Reduce Your E-Commerce Complexity</h3>
        <p>The integrated NetLicensing Shop gives customers an online purchase that matches your licensing models. With PayPal and Stripe, they pay in their preferred currency.</p>
        <p><a href="{{ '/pricing/' | relative_url }}">Plans and pricing &rarr;</a></p>
    </div>
</div>

<div class="row NL_feature_story" id="automate-processes">
    <div class="col-md-5 col-md-push-6">
        <img loading="lazy" decoding="async" src="{{ '/img/netlicensing-landing-api.png' | relative_url }}" alt="">
    </div>
    <div class="col-md-5 col-md-pull-4">
        <h3>Automate Your Processes</h3>
        <p>The RESTful API gives you full control over all licensing entities, so you can connect NetLicensing to your business processes, ERP, CRM, e-commerce or IoT device.</p>
        <ol class="NL_home_chips NL_home_steps">
            <li><a href="{{ '/getting-started/#configure' | relative_url }}">Configure your product</a></li>
            <li><a href="{{ '/getting-started/#validate' | relative_url }}">Validate a customer</a></li>
            <li><a href="{{ '/getting-started/#sell' | relative_url }}">Sell licenses</a></li>
        </ol>
        <p><a href="{{ '/getting-started/' | relative_url }}">Getting Started &rarr;</a></p>
    </div>
</div>

</section>

{%- assign industries = site.data.navigation | where: "title", "Industries" | first %}
<section class="NL_home_section">
    <header class="NL_home_head">
        <h2>Built for Your Kind of Product</h2>
        <p>Pick your industry to see how licensing fits it.</p>
    </header>
    <ul class="NL_home_chips NL_home_chips_center">
        {%- for item in industries.subitems %}
        <li><a href="{{ item.url | relative_url }}" title="{{ item.description | escape }}">{{ item.title }}</a></li>
        {%- endfor %}
    </ul>
</section>

<section class="NL_home_section">
    <header class="NL_home_head">
        <h2>Example Solutions</h2>
        <p>See how products like yours can use NetLicensing.</p>
    </header>
<!-- Every case study is in the page; js/random-examples.js shows three at random on each visit.
     Without JavaScript the first three stay visible. -->
<div class="row NL_home_examples" data-random-examples="3">
    {%- comment %} The collection also holds redirect stubs, which have no image. {% endcomment %}
    {%- assign studies = site["case-studies"] | where_exp: "item", "item.img" %}
    {%- for study in studies %}
    <div class="col-md-4"{% if forloop.index > 3 %} hidden{% endif %}>
        <a class="NL_home_example" href="{{ study.url | relative_url }}">
            <img loading="lazy" decoding="async" src="{{ study.img | relative_url }}" alt="">
            <h3>{{ study.title }}</h3>
            <p>{{ study.description }}</p>
        </a>
    </div>
    {%- endfor %}
</div>
<!-- Not deferred: runs before the cards are painted, so they don't swap in front of the visitor. -->
<script src="{{ '/js/random-examples.js' | prepend: site.baseurl }}?v={{ site.time | date: '%Y%m%d%H%M' }}"></script>
<div class="row NL_home_more">
    <a href="{{ '/case-studies/' | relative_url }}" class="NL_button button_main NL_dark_btn">See All Examples</a>
</div>
</section>
