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
        <span>All plans are built on top of the "Community",<br/>upgrade is possible at any time.</span>
    </div>
</div>

<div class="row NL_block" style="text-align:center;">
    <h3 class="col-md-12">Simply choose your preferred plan to get started or see <a href="#custom-plans">more options below</a>.</h3>
    <h3>New accounts get access to<br><strong>All NetLicensing features for 30 days</strong>
    <span style="font-size: smaller;"><br>(free of charge, risk-free, no credit card required)</span></h3>
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
            <h3><strong style="font-size:larger;">Community</strong><br/>Quick and simple for community projects</h3>
            <div class="NL_price_tag">0 € / month</div>
            <div class="NL_price_tag_sub">&nbsp;</div>
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
            <h3><strong style="font-size:larger;">Basic</strong><br/>For startups and growing businesses</h3>
            <div class="NL_price_tag">80 € / month</div>
            <div class="NL_price_tag_sub">billed annually</div>
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
            <div class="NL_price_tag">280 € / month</div>
            <div class="NL_price_tag_sub">billed annually</div>
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
            <h3><strong style="font-size:larger;">Select</strong><br/>Advanced functionality for specific requirements</h3>
            <div class="NL_price_tag" style="padding: 0 0 0 0;"><div class="NL_btn" style="padding: 5px 0 10px 0;">
                <a href="/contact/?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=enterprise" class="NL_button button_main NL_dark_btn">Contact Sales</a>
            </div></div>
            <div class="NL_price_tag_sub" style="margin-bottom: -17px;">&nbsp;</div>
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
                <a href="/contact/?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=enterprise" class="NL_button button_main NL_dark_btn">Contact Sales</a>
            </div>
        </div>
    </div>
</div>

<div id="custom-plans" class="row NL_block">
    <h2 class="col-md-12">Our custom plans and special offers</h2>
</div>

<div class="row NL_block">
    <div>
        {% for customplan in site.data.customplans %}
        <div class="col-md-6 NL_feature" id="customplan-{{ customplan.name | slugify }}">
            <figure class="hover_effect">
                <figcaption>
                <img src="{{ customplan.icon | prepend: site.baseurl | prepend: site.url }}" alt="{{ customplan.name }}"/>
                <h3>
                <a href="{{ customplan.url }}">{{ customplan.name }}</a>
                </h3>
                <p>{{ customplan.description }}</p>
                </figcaption>
            </figure>
        </div>
        {% endfor %}
    </div>
</div>

<div id="faq" class="row NL_block">
    <h2 class="col-md-12">You may still have some questions, so here's our FAQ</h2>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Can I use NetLicensing for free?</h3>

        <p>Absolutely! NetLicensing can be completely free to use. The Community plan does have some limits and feature locks. You can always upgrade to higher plans if you’d like to access those advanced features.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>What is included in Free Premium Trial?</h3>

        <p>Free Premium Trial plan includes all functionality of Premium Plan for 30 days, except product, product module and licensee limits.
        After 30 days your vendor account will remain active and will be automatically switched to "Community" plan unless upgraded.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Do I need a credit card to sign up for the free plan?</h3>

        <p>No. We do not collect credit card information when you sign up for a free account.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>Can I cancel anytime?</h3>

        <p>Yes! You can cancel your plan anytime you wish and you will not be charged. Your annual payment will be refunded pro-rata.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Are there any hidden cost or extra charges?</h3>

        <p>No. NetLicensing won’t charge you any setup fees or monthly fees if you are using a free plan.
            The selected payment service provider may charge an internet gateway fee and/or a processing fee.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>Do you support early-stage startups, education & nonprofits?</h3>

        <p>NetLicensing is proud to support people doing great things in the world. That’s why we offer significant discounts for eligible students and educators and nonprofits.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Is my data safe?</h3>

        <p>We take data security very seriously. All your data is securely stored and regularly backed up in Amazon data centers, and the network design ensures no unauthorized access. All web interactions are encrypted through industry-standard SSL security. You can request deletion of your data permanently at any time.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>I have more questions. Who do I ask?</h3>

        <p>Please <a title="Contact" href="/contact/">contact us</a>{% if site.calendly_enabled %} or <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/netlicensing/netlicensing-demo?primary_color=853E29'});return false;">book a 1-1 call</a>{% endif %} and we can put together something that fits your
            specific needs.</p>
    </div>
</div>
