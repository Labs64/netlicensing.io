---
layout: page
title: "Software Licensing Features"
description: "NetLicensing features: ready-to-use licensing models, NetLicensing Shop with PayPal and Stripe, REST API and client libraries, EU hosting, 99.5% SLA and self-hosted Enterprise."
last_modified_at: 2026-11-28
permalink: "/features/"
canonical: "/features-all/"
prefetch:
- /features-all/
tags:
- features
- FAQ
guidechimp: true
sitemap:
  priority: 0.5
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
        <span>Everything you need to license, sell and validate your software: licensing models, an online shop, a REST API and enterprise deployment options.</span>
    </div>
</div>

<div class="row">
    <div class="NL_feature_grid">
        {% for feature in site.data.features %}
        {% if feature.show-default %}
        <div class="col-md-3 NL_feature" id="feature-{{ feature.name | slugify }}">
            <figure class="hover_effect">
                <figcaption>
                <img loading="lazy" decoding="async" src="{{ feature.icon | prepend: site.baseurl | prepend: site.url }}" alt="{{ feature.name }}"/>
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

    <div id="showContent" class="col-md-12 content hideContent">
        {% for feature in site.data.features %}
        {% unless feature.show-default %}
        <div class="col-md-3 NL_feature" id="feature-{{ feature.name | slugify }}">
            <figure class="hover_effect">
                <figcaption>
                <img loading="lazy" decoding="async" src="{{ feature.icon | prepend: site.baseurl | prepend: site.url }}" alt="{{ feature.name }}"/>
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
        <a id="load-features" href="/features-all/" class="NL_button button_main NL_dark_btn">Show more features</a>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Need a Feature We Don't Have Yet?</h2>
            <span>Tell us what your licensing needs. Select and Enterprise customers can also get custom development and priority feature requests.</span>
            <div class="NL_cta_center">
                <a href="{{ '/contact/' | relative_url }}" class="NL_button button_main NL_dark_btn NL_wide_btn"><i class="fa fa-paper-plane"></i>Request a feature</a>
            </div>
        </div>
    </div>
</div>

{% include licensing-story.html %}
