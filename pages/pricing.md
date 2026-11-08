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
{%- comment -%}
  Promo offer: dates, discount and promo code live in _config.yml (promo).
  The markup is built until the end date; js/promo.js switches it on and off in the
  browser, so the offer starts and ends on time without a rebuild.
  data-promo-on = visible during the offer, data-promo-off = visible outside it.
{%- endcomment -%}
{% include promo-state.html %}
{% if promo_live %}
{% assign promo_keep = 100 | minus: promo.discount_percent %}
{% assign basic_eur = 120 %}
{% assign premium_eur = 380 %}
{%- comment -%} Monthly offer price rounded up to whole euros, so checkout is never higher than shown. {%- endcomment -%}
{% assign basic_offer = basic_eur | times: promo_keep | plus: 99 | divided_by: 100 %}
{% assign premium_offer = premium_eur | times: promo_keep | plus: 99 | divided_by: 100 %}
{% assign basic_save = basic_eur | minus: basic_offer | times: 12 %}
{% assign premium_save = premium_eur | minus: premium_offer | times: 12 %}
{% endif %}

<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Grow better with the right plan</h1>
        <span>All plans are built on top of the "Community",<br/>upgrade is possible at any time.</span>
    </div>
</div>

<div class="row NL_block NL_block_center NL_pricing_intro">
    {% include plan-picker.html %}
</div>

{% assign plan_products = site.data.pricing | where: "name", "Active products" | first %}
{% assign plan_customers = site.data.pricing | where: "name", "Customers" | first %}
<div class="row NL_block NL_pricing">
    <div class="col-md-15 col-sm-3">
        <div class="NL_price_captions">
            <h3 class="NL_price_captions_spacer"> &#160; <br/> &#160; <br/> &#160; <br/> &#160; <br/> &#160;</h3>
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
        <div class="NL_price_features NL_price_regular" data-plan="free" data-products="{{ plan_products.free }}" data-customers="{{ plan_customers.free }}">
            <h3><strong class="NL_plan_name">Community</strong><br/>Quick and simple for community projects</h3>
            <div class="NL_price_tag">0 € / month</div>
            <div class="NL_price_tag_sub">&nbsp;</div>
            {% include pricing-features.html plan="free" %}

            <div class="NL_btn NL_btn_pricing">
                <a href="https://ui.netlicensing.io/#/register?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=free"
                   class="NL_button button_main NL_dark_btn">Register Now for FREE</a>
                <p class="NL_btn_note">No credit card required</p>
            </div>
        </div>
    </div>

    <div class="col-md-15 col-sm-3">
        <div class="NL_price_features NL_price_regular" data-plan="basic" data-products="{{ plan_products.basic }}" data-customers="{{ plan_customers.basic }}">
            <h3><strong class="NL_plan_name">Basic</strong><br/>For startups and growing businesses</h3>
            <div class="NL_price_tag"{% if promo_live %} data-promo-off{% endif %}>120 € / month</div>
            <div class="NL_price_tag_sub"{% if promo_live %} data-promo-off{% endif %}>billed annually</div>
            {%- if promo_live %}
            <div class="NL_price_tag" data-promo-on hidden><s class="NL_promo_old">120 €</s> {{ basic_offer }}<sup>*</sup> € / month</div>
            <div class="NL_price_tag_sub" data-promo-on hidden>billed annually, first year</div>
            {%- endif %}
            {% include pricing-features.html plan="basic" %}

            <div class="NL_btn NL_btn_pricing">
                <a href="https://ui.netlicensing.io/#/register?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=basic"
                   {% if promo_live %}data-promo-href="https://ui.netlicensing.io/#/register?promoCode={{ promo.code }}&utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign={{ promo.campaign }}&utm_content=basic" {% endif %}class="NL_button button_main NL_dark_btn">Start Free Trial</a>
                <p class="NL_btn_note"{% if promo_live %} data-promo-off{% endif %}>No credit card required</p>
                {%- if promo_live %}
                <p class="NL_btn_note" data-promo-on hidden><sup>*</sup> {{ promo.name }}: Save {{ basic_save }} € in year one. New customers, code {{ promo.code }} is applied at sign-up.</p>
                {%- endif %}
            </div>
        </div>
    </div>

    <div class="col-md-15 col-sm-3">
        <div class="NL_price_features NL_price_promo" data-plan="premium" data-products="{{ plan_products.premium }}" data-customers="{{ plan_customers.premium }}">
            <h3><strong class="NL_plan_name">Premium</strong><br/>Full featured for comprehensive products</h3>
            <div class="NL_price_tag"{% if promo_live %} data-promo-off{% endif %}>380 € / month</div>
            <div class="NL_price_tag_sub"{% if promo_live %} data-promo-off{% endif %}>billed annually</div>
            {%- if promo_live %}
            <div class="NL_price_tag" data-promo-on hidden><s class="NL_promo_old">380 €</s> {{ premium_offer }}<sup>*</sup> € / month</div>
            <div class="NL_price_tag_sub" data-promo-on hidden>billed annually, first year</div>
            {%- endif %}
            {% include pricing-features.html plan="premium" %}

            <div class="NL_btn NL_btn_pricing">
                <a href="https://ui.netlicensing.io/#/register?utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign=netlicensing.io_pricing&utm_content=premium"
                   {% if promo_live %}data-promo-href="https://ui.netlicensing.io/#/register?promoCode={{ promo.code }}&utm_source=netlicensing.io_pricing&utm_medium=website&utm_campaign={{ promo.campaign }}&utm_content=premium" {% endif %}class="NL_button button_main NL_dark_btn">Start Free Trial</a>
                <p class="NL_btn_note"{% if promo_live %} data-promo-off{% endif %}>No credit card required</p>
                {%- if promo_live %}
                <p class="NL_btn_note" data-promo-on hidden><sup>*</sup> {{ promo.name }}: Save {{ premium_save }} € in year one. New customers, code {{ promo.code }} is applied at sign-up.</p>
                {%- endif %}
            </div>
        </div>
    </div>

    <div class="col-md-15 col-sm-3">
        <div class="NL_price_features NL_price_regular" data-plan="enterprise">
            <h3><strong class="NL_plan_name">Select</strong><br/>Advanced functionality for specific requirements</h3>
            <div class="NL_price_tag NL_price_tag_contact"><div class="NL_btn NL_btn_pricing">
                <a href="https://l64.cc/questionnaire" target="_blank" rel="noopener" class="NL_button button_main NL_dark_btn">Get a Quote</a>
            </div></div>
            <div class="NL_price_tag_sub NL_price_tag_sub_contact">&nbsp;</div>
            {% include pricing-features.html plan="enterprise" %}

            <div class="NL_btn NL_btn_pricing">
                <a href="https://l64.cc/questionnaire" target="_blank" rel="noopener" class="NL_button button_main NL_dark_btn">Get a Quote</a>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Licensing at Company Scale?</h2>
            <span>NetLicensing Select for Enterprise: self-hosted or dedicated, with SSO, audit log and a 99% SLA.<br>Custom development, priority feature requests and a technical manager for your rollout.</span>

            <div class="row NL_cta_row">
                <div class="col-sm-4 col-sm-offset-4">
                    <a href="/enterprise/" class="NL_button button_main NL_dark_btn NL_wide_btn">
                        <i class="fa fa-building-o"></i>Explore Enterprise
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="faq" class="row NL_block">
    <h2 class="col-md-12">You may still have some questions, so here's our FAQ</h2>
</div>

{%- if promo_live %}
<div data-promo-on hidden>
<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Who can use the {{ promo.name }} offer?</h3>

        <p>New customers who register with promo code <strong>{{ promo.code }}</strong> between {{ promo.start | date: "%B %-d, %Y" }} and {{ promo.end | date: "%B %-d, %Y" }}. The offer does not apply to upgrades of existing accounts.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>Does the {{ promo.discount_percent }}% also apply to renewals?</h3>

        <p>No. It reduces the price of the first year of our paid plans. After that the regular plan price applies. Prefer an invoice to the checkout - <a title="Contact" href="/contact/">Contact us</a> and mention the code.</p>
    </div>
</div>
</div>
{%- endif %}

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
        <h3>Do I need a credit card to sign up?</h3>

        <p>No. We do not collect credit card information when you sign up, neither for the free Community plan nor for the 30-day trial of all features.</p>
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
        <h3>Do you support early-stage startups & nonprofits?</h3>

        <p>NetLicensing is proud to support people doing great things in the world. That’s why we offer significant discounts for eligible startups and nonprofits.</p>
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

