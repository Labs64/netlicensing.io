---
layout: page
title: "Pricing"
description: "Whether you’re just getting started or are ready to bring licensing to your enterprise, there’s a NetLicensing level that’s right for you"
permalink: "/pricing/"
tags:
- Pricing
- Free
- Enterprise
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Pick your NetLicensing plan</h1>
        <span>Whether you’re just getting started or are ready to bring licensing to your enterprise, there’s a NetLicensing level that’s right for you.</span>
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
                    <a class="NL_pricing_tooltip" data-toggle="tooltip" data-placement="right" title="{{ feature.description }}" target="_blank" href="{{ link }}"><i class="fa fa-question-circle"></i></a>
                    {% endif %}
                </li>
            {% endfor %}
            </ul>
        </div>
    </div>

    <div class="col-md-4">
        <div class="NL_price_features NL_price_free">
            <h3><strong>FREE forever</strong><br/>built for freelancers and start ups</h3>
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
                <a href="https://netlicensing.labs64.com/app/v2/content/register.xhtml"
                   class="NL_button button_main NL_dark_btn">Register Now for FREE</a>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="NL_price_features NL_price_enterprise">
            <h3><strong>Enterprise</strong><br/>built for businesses and enterprises</h3>
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
                <a href="/contact/" class="NL_button button_main NL_dark_btn">Contact Us</a>
            </div>
        </div>
    </div>
</div>