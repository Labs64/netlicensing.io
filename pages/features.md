---
layout: page
title: "Features"
description: "The features you need to manage your product licenses"
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
        <span>Integrated features that save you time and money.</span>
    </div>
</div>

<div class="row">
    <div style="padding:40px;">
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
            <h2>Miss a Feature?</h2>
            <span>Do you have an idea for a cool new feature of NetLicensing that you think could be the Next Big Thing™?</span>

            <form action="/contact/" method="GET"
                  name="Request Feature" id="request-feature"
                  novalidate>
                <button type="submit" class="NL_button button_main NL_dark_btn NL_wide_btn">
                    <i class="fa fa-paper-plane"></i>Send Request
                </button>
            </form>
        </div>
    </div>
</div>

{% include licensing-story.html %}
