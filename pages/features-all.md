---
layout: page
title: "Features"
description: "World class features you need to effectively manage your product licenses"
permalink: "/features-all/"
prefetch:
- /features/
sitemap:
  priority: 0.7
tags:
- features
- FAQ
sitemap:
  images:
   - /img/features/availability.png
   - /img/features/consulting_services.png
   - /img/features/cross_platform_licensing.png
   - /img/features/different_hosting_options.png
   - /img/features/easy_setup_and_integration.png
   - /img/features/escrow.png
   - /img/features/flexible_licensing_models.png
   - /img/features/integrated_payment_services.png
   - /img/features/internet_of_things.png
   - /img/features/licensing-as-a-service.png
   - /img/features/licensing_ecommerce_platform.png
   - /img/features/netlicensing_enterprise.png
   - /img/features/online_license_acquisition.png
   - /img/features/online_management_portal.png
   - /img/features/predefined_client_libraries.png
   - /img/features/product_usage_tracking_and_analytics.png
   - /img/features/restful_api_and_integration.png
   - /img/features/security_encryption.png
   - /img/features/service_level_agreement.png
   - /img/features/virtualization_support.png
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>All the features needed<br/>for your business process</h1>
        <span>World class features, integrated to save you time & money.</span>
    </div>
</div>

<div class="row">
    <div style="padding:40px;">
        {% for feature in site.data.features %}
        {% if feature.show-default %}
        <div class="col-md-3 NL_feature" id="feature-{{ feature.name | slugify }}">
            <figure class="hover_effect">
                <figcaption>
                <img src="{{ feature.icon | prepend: site.baseurl | prepend: site.url }}" alt="{{ feature.name }}"/>
                <h3>
                {{ feature.name }}
                </h3>

                <p>{{ feature.description }}</p>
                </figcaption>
            </figure>
        </div>
        {% endif %}
        {% endfor %}
    </div>

    <div id="showContent" class="col-md-12 content showContent">
        {% for feature in site.data.features %}
        {% unless feature.show-default %}
        <div class="col-md-3 NL_feature" id="feature-{{ feature.name | slugify }}">
            <figure class="hover_effect">
                <figcaption>
                <img src="{{ feature.icon | prepend: site.baseurl | prepend: site.url }}" alt="{{ feature.name }}"/>
                <h3>
                {{ feature.name }}
                </h3>

                <p>{{ feature.description }}</p>
                </figcaption>
            </figure>
        </div>
        {% endunless %}
        {% endfor %}
    </div>
    <div class="col-md-12 NL_btn" >
        <a id="load-features" href="/features/" class="NL_button button_main NL_dark_btn">Hide</a>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Miss a Feature?</h2>
            <span>Do you have an idea for a cool new feature of NetLicensing that you think could be the Next Big Thing™?</span>

            <form action="/contact/" method="GET"
                  name="Reaquest Feature" id="request-feature"
                  novalidate>
                <button type="submit" class="NL_button button_main NL_dark_btn NL_wide_btn">
                    <i class="fa fa-paper-plane"></i>Send Request
                </button>
            </form>
        </div>
    </div>
</div>

<div class="row NL_block">
    <h2 class="col-md-12">NetLicensing Software Licensing</h2>

    <p class="col-md-8 col-md-offset-2" style="text-align:center;">A Online Software Licensing Management Service for Application Control, Trial Management and
        Software Activation. Easily retrofit your product and then control all the aspects of a users interaction and
        usage.</p>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Protect your Intellectual Property and give users a great experience</h3>
        <ul style="margin-left: 20px;">
            <li>Control, secure and manage your software assets</li>
            <li>Save engineering time and forget expensive infrastructure costs by outsourcing your license management</li>
            <li>Our enterprise services and support programs ensure your success at every step along the management of your product licensing</li>
            <li>Automated systems capture license abuse and convert it to new revenues</li>
            <li>Total control of your installed software from a central server using NetLicensing API</li>
            <li>Measure and report license activation and product usage</li>
            <li>Virtualization management and control</li>
        </ul>
    </div>
    <div class="col-md-5 col-md-offset-1">
        <h3>All you need out of the box</h3>
        <ul style="margin-left: 20px;">
            <li>99.0% UPTIME</li>
            <li>FREE support</li>
            <li>FREE maintenance</li>
            <li>FREE updates</li>
            <li>Support for ALL environments</li>
            <li>Easy to retrofit to your product then setup and use</li>
            <li>No additional requirements, just NetLicensing API - the rest works out of the box</li>
        </ul>
    </div>
</div>
