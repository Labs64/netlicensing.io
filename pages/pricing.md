---
layout: page
title: "Pricing"
description: "Whether you’re just getting started or are ready to bring licensing to your enterprise, there’s a NetLicensing level that’s right for you"
permalink: "/pricing/"
tags:
- Pricing
- Plan
- Free
- Enterprise
- FAQ
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Grow better with the right plan</h1>
        <span>All plans are built on top of the "FREE forever",<br/>upgrade is possible at any time.</span>
    </div>
</div>

<div id="pricing-header" class="row NL_block" style="text-align:center;">
    <p class="col-md-8 col-md-offset-2">Choose a standard plan or see <a href="#custom-plans">more options below</a>.<br/>All plans include 90-day Free Premium Trial (risk-free, no credit card required).</p>
</div>

<div class="row NL_block NL_pricing">
    <div class="col-md-15 col-sm-3">
        <div class="NL_price_captions">
            <h3 style="font-size:larger;"> &#160; <br/> &#160; <br/> &#160; <br/> &#160; <br/> &#160;</h3>
            <ul>
                {% for feature in site.data.pricing %}
                <li>
                    {{ feature.name }}
                    {% if feature.description %}
                    <a class="NL_pricing_tooltip" data-toggle="tooltip" data-placement="right"
                       title="{{ feature.description }}" target="_blank" href="#">
                        <i class="fa fa-question-circle"></i>
                    </a>
                    {% endif %}
                </li>
                {% endfor %}
            </ul>
        </div>
    </div>

    <div class="col-md-15 col-sm-3">
        <div class="NL_price_features NL_price_regular">
            <h3><strong style="font-size:larger;">FREE forever</strong><br/>Quick and simple for individuals and startups</h3>
            <div class="NL_price_tag">0 € / month</div>
            <ul>
                {% for feature in site.data.pricing %}
                <li>
                    <span class="NL_price_feature"> {{ feature.name }} </span>
                    {% if feature.free == "Y" %}
                    <i class="fa fa-check-square"></i>
                    {% elsif feature.free == "N" %}
                    <i class="fa fa-square-o"></i>
                    {% else %}
                    {{ feature.free }}
                    {% endif %}
                </li>
                {% endfor %}
            </ul>

            <div class="NL_btn" style="padding: 5px 0 10px 0;">
                <a href="https://ui.netlicensing.io/#/register?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=free"
                   class="NL_button button_main NL_dark_btn">Register Now for FREE</a>
            </div>
        </div>
    </div>

    <div class="col-md-15 col-sm-3">
        <div class="NL_price_features NL_price_regular">
            <h3><strong style="font-size:larger;">Basic</strong><br/>For growing businesses with more customers</h3>
            <div class="NL_price_tag">48 € / month</div>
            <ul>
                {% for feature in site.data.pricing %}
                <li>
                    <span class="NL_price_feature"> {{ feature.name }} </span>
                    {% if feature.basic == "Y" %}
                    <i class="fa fa-check-square"></i>
                    {% elsif feature.basic == "N" %}
                    <i class="fa fa-square-o"></i>
                    {% else %}
                    {{ feature.basic }}
                    {% endif %}
                </li>
                {% endfor %}
            </ul>

            <div class="NL_btn" style="padding: 5px 0 10px 0;">
                <a href="https://ui.netlicensing.io/#/register?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=basic"
                   class="NL_button button_main NL_dark_btn">Start Free Trial</a>
            </div>
        </div>
    </div>

    <div class="col-md-15 col-sm-3">
        <div class="NL_price_features NL_price_promo">
            <h3><strong style="font-size:larger;">Premium</strong><br/>Full featured for comprehensive products</h3>
            <div class="NL_price_tag">198 € / month</div>
            <ul>
                {% for feature in site.data.pricing %}
                <li>
                    <span class="NL_price_feature"> {{ feature.name }} </span>
                    {% if feature.premium == "Y" %}
                    <i class="fa fa-check-square"></i>
                    {% elsif feature.premium == "N" %}
                    <i class="fa fa-square-o"></i>
                    {% else %}
                    {{ feature.premium }}
                    {% endif %}
                </li>
                {% endfor %}
            </ul>

            <div class="NL_btn" style="padding: 5px 0 10px 0;">
                <a href="https://ui.netlicensing.io/#/register?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=premium"
                   class="NL_button button_main NL_dark_btn">Start Free Trial</a>
            </div>
        </div>
    </div>

    <div class="col-md-15 col-sm-3">
        <div class="NL_price_features NL_price_regular">
            <h3><strong style="font-size:larger;">Enterprise</strong><br/>Advanced functionality for specific requirements</h3>
            <div class="NL_price_tag">Individual</div>
            <ul>
                {% for feature in site.data.pricing %}
                <li>
                    <span class="NL_price_feature"> {{ feature.name }} </span>
                    {% if feature.enterprise == "Y" %}
                    <i class="fa fa-check-square"></i>
                    {% elsif feature.enterprise == "N" %}
                    <i class="fa fa-square-o"></i>
                    {% else %}
                    {{ feature.enterprise }}
                    {% endif %}
                </li>
                {% endfor %}
            </ul>

            <div class="NL_btn" style="padding: 5px 0 10px 0;">
                <a href="/contact-sales/?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=enterprise" class="NL_button button_main NL_dark_btn">Contact Sales</a>
            </div>
        </div>
    </div>
</div>

<div id="custom-plans" class="row NL_block" style="text-align:center;">
    <p class="col-md-8 col-md-offset-2">Free access to <a href="/github-students/">Student Plan</a> via <strong>Github Student Developer Pack</strong>.</p>
</div>

<div id="faq" class="row NL_block">
    <h2 class="col-md-12">You may still have some questions, so here's our FAQ</h2>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Are there any hidden cost or extra charges?</h3>

        <p>No. NetLicensing won’t charge you any setup fees or monthly fees if you are using a free plan.
            The selected payment service provider may charge an internet gateway fee and/or a processing fee.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>What is included in Free Premium Trial?</h3>

        <p>Free Premium Trial plan includes all functionality of Premium Plan for 90 days, except product, product module and licensee limits.
        After 90 days your vendor account will remain active and will be automatically switched to FREE forever plan unless upgraded.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Do you have an API? CLI? Libraries?</h3>

        <p>Yes. NetLicensing RESTful API documentation is available <a title="API" href="http://l64.cc/nl10">here</a>.
            You may also use the following <a title="NetLicensing client libraries" href="http://l64.cc/nl07">client
                libraries and examples</a> as a foundation for integrating NetLicensing in your code.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>Can I cancel anytime?</h3>

        <p>Yes! You can cancel your plan anytime you wish and you will not be charged.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>What is NetLicensing Shop? Shall I use it?</h3>

        <p>NetLicensing Shop is an innovative eCommerce solution which provides your customers licenses acquisition
            possibility for every available <a title="NetLicensing Licensing Models" href="/licensing-models/">licensing
                models</a>.
            You may omit using of NetLicensing Shop and create all licensing entities via NetLicensing API instead.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3> Do I need a credit card to sign up for the free plan?</h3>

        <p>No. We do not collect credit card information when you sign up for a free account.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>How secure is this?</h3>

        <p>NetLicensing uses industry standard SSL security. Your data is hosted in a secure hosting facility and
            regularly backed up.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>I have more questions. Who do I ask?</h3>

        <p>Please <a title="Contact" href="/contact/">contact us</a> or <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/netlicensing/netlicensing-demo?primary_color=853E29'});return false;">book a 1-1 call</a> and we can put together something that fits your
            specific needs.</p>
    </div>
</div>
