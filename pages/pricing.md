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
        <h1>Choose optimal pricing for your scale</h1>
        <span>Whether you’re just getting started or are ready to bring licensing to your enterprise,<br/>there is a NetLicensing level that’s right for you.</span>
    </div>
</div>

<div class="row NL_block NL_pricing">
    <div class="col-md-4">
        <div class="NL_price_captions">
            <h3> &#160; <br/> &#160; </h3>
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

    <div class="col-md-4">
        <div class="NL_price_features NL_price_free">
            <h3>Quick and simple for individuals and startups</h3>
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

            <div class="show-more" style="padding: 5px 0 10px 0;">
                <a href="https://go.netlicensing.io/console/v2/content/register.xhtml?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=free"
                   class="NL_button button_main NL_dark_btn">Register Now for FREE</a>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="NL_price_features NL_price_enterprise">
            <h3>Advanced functionality and customization for specific requirements</h3>
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

            <div class="show-more" style="padding: 5px 0 10px 0;">
                <a href="/contact/?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=enterprise" class="NL_button button_main NL_dark_btn">Contact Us</a>
            </div>
        </div>
    </div>
</div>


<div class="row NL_block">
    <h2 class="col-md-12">You may still have some questions, so here's our FAQs</h2>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Are there any hidden cost or extra charges?</h3>

        <p>No. NetLicensing won’t charge you any setup fees or monthly fees if you are using a free plan.
            The selected payment service provider may charge an internet gateway fee and/or a processing fee.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>Do I have to pay to use your service?</h3>

        <p>Our Free Forever plan is perfect for individuals and startups who want to enable license managing for their products and services.</p>
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

        <p>Please <a title="Contact" href="/contact/">contact us</a> and we can put together something that fits your
            specific needs.</p>
    </div>
</div>
