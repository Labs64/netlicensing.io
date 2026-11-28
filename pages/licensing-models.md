---
layout: page
title: "Licensing Models"
description: "Compare NetLicensing licensing models: Try & Buy, Subscription, Multi-Feature, Floating, Node-Locked, Pay-per-Use, Quota, Pricing Table, Rental and Discount, and the lowest plan that includes each."
last_modified_at: 2026-11-28
permalink: /licensing-models/
tags:
- Licensing Models
- Try-and-Buy
- Subscription
- Pricing Table
- Node-Locked
- Rental
- Floating
- Pay-per-use
- Standard
- Multi-Feature
- Discount
- Named User
guidechimp: true
use_quicksand: true
sitemap:
  priority: 0.6
  images:
   - /img/licensing-model/licensing-model-floating.png
   - /img/licensing-model/licensing-model-multi-feature.png
   - /img/licensing-model/licensing-model-named-user.png
   - /img/licensing-model/licensing-model-pay-per-use.png
   - /img/licensing-model/licensing-model-rental.png
   - /img/licensing-model/licensing-model-standard.png
   - /img/licensing-model/licensing-model-subscription.png
   - /img/licensing-model/licensing-model-try-and-buy.png
   - /img/licensing-model/licensing-model-pricing-table.png
   - /img/licensing-model/licensing-model-discount.png
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Licensing models tailored to your needs</h1>
        <span>NetLicensing covers licensing models from single-user to network overflow licenses, and lets software vendors map and combine them.</span>
    </div>
</div>

<div class="row NL_block">
    <div class="col-md-12">
        <p class="NL_models_note">Filter by what the license limits. Each model shows the lowest plan that includes it; <a href="{{ '/pricing/' | relative_url }}">compare plans</a>.</p>
        <ul id="filterOptions">
            <li class="active"><a href="" class="NL_button button_main NL_orange_btn" id="all">All</a></li>
            <li><a href="" class="NL_button button_main NL_orange_btn" id="time">Time</a></li>
            <li><a href="" class="NL_button button_main NL_orange_btn" id="volume">Volume</a></li>
            <li><a href="" class="NL_button button_main NL_orange_btn" id="feature">Feature</a></li>
            <li><a href="" class="NL_button button_main NL_orange_btn" id="user">User</a></li>
            <li><a href="" class="NL_button button_main NL_orange_btn" id="concurrent">Concurrent</a></li>
          </ul>

          <ul class="NL_licensing_models">
            {% for licensingmodel in site.data.licensingmodels %}
                {% if licensingmodel.name %}
                    <li class="item col-md-4" data-id="id-{{ forloop.index }}" data-type="{{ licensingmodel.tags | join: ' '}}">
                        <a href="{{ licensingmodel.url }}" title="Licensing Model: {{ licensingmodel.name }}">
                          <img loading="lazy" decoding="async" alt="{{ licensingmodel.name }}" title="Licensing Model: {{ licensingmodel.name }}" src="{{ licensingmodel.img | prepend: site.baseurl | prepend: site.url }}"/>
                        </a>
                        <a href="{{ licensingmodel.url }}" title="Licensing Model: {{ licensingmodel.name }}"><h3>{{ licensingmodel.name }}</h3></a>
                        <p class="NL_licensing_model_aliases">
                            {{ licensingmodel.aliases | join: ', ' }}
                        </p>
                        <p>{{ licensingmodel.description }}</p>
                        <p class="NL_model_meta">
                            {%- unless licensingmodel.picker == false %}
                            {%- assign first_plan = licensingmodel.plans | first %}
                            {%- case first_plan %}
                            {%- when 'free' %}{% assign plan_label = 'On every plan' %}
                            {%- when 'basic' %}{% assign plan_label = 'From Basic' %}
                            {%- when 'premium' %}{% assign plan_label = 'From Premium' %}
                            {%- else %}{% assign plan_label = 'Select plan' %}
                            {%- endcase %}
                            <a class="NL_model_plan" href="{{ '/pricing/' | relative_url }}">{{ plan_label }}</a>
                            {%- endunless %}
                            <a href="{{ licensingmodel.url }}">How it works &rarr;</a>
                        </p>
                    </li>
                {% endif %}
            {% endfor %}
          </ul>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Need a Model That Isn't Listed?</h2>
            <span>Models can be combined in one product, and custom models can be built for your needs and goals. Tell us how you want to sell.</span>
            <div class="NL_cta_center">
                <a href="{{ '/contact/' | relative_url }}" class="NL_button button_main NL_dark_btn NL_wide_btn"><i class="fa fa-paper-plane"></i>Describe your model</a>
            </div>
        </div>
    </div>
</div>
