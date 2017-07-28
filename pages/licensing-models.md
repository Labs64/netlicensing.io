---
layout: page
title: "Licensing Models"
description: "NetLicensing is sophisticated enough to cover even the most outlandish software licensing models"
permalink: "/licensing-models/"
tags:
- Licensing Models
- Try-and-Buy
- Subscription
- Rental
- Floating
- Pay-per-use
- Standard
- Multi-Feature
- Named User
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
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Licensing models tailored to your needs</h1>
        <span>NetLicensing is sophisticated enough to cover even the most outlandish licensing models: from single-user to network overflow licenses. NetLicensing provides software vendors with the ability to map/combine numerous licensing models.</span>
    </div>
</div>

<div class="row NL_block">
    <div class="col-md-12">
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
                          <img alt="{{ licensingmodel.name }}" title="Licensing Model: {{ licensingmodel.name }}" src="{{ licensingmodel.img | prepend: site.baseurl | prepend: site.url }}"/>
                        </a>
                        <a href="{{ licensingmodel.url }}" title="Licensing Model: {{ licensingmodel.name }}"><h3>{{ licensingmodel.name }}</h3></a>
                        <p style="font-style: italic; font-size: small; color:#853E29;">
                            {{ licensingmodel.aliases | join: ', ' }}
                        </p>
                        <p>{{ licensingmodel.description }}</p>
                    </li>
                {% endif %}
            {% endfor %}
          </ul>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Need a special Licensing Model?</h2>
            <span>With NetLicensing, complex software licensing models can be created that fit your business needs.</span>

            <form action="//formspree.io/{{ site.email }}" method="POST" name="sentMessage" id="contactForm"
                  novalidate>
                <input type="hidden" name="_next" value="/licensing-models/#emailsent"/>
                <input type="hidden" name="_subject" value="NetLicensing Licensing Model Request">
                <input type="text" name="_gotcha" style="display:none"/>

                <div class="form-group">
                    <input type="email" name="email" class="form-control" placeholder="Email" id="email"
                           required data-validation-required-message="Please enter your email address.">
                    <input type="text" name="feature" class="form-control" placeholder="A one-line licensing model description"
                           id="licensing-model"
                           data-validation-required-message="Please enter a licensing model description.">

                    <textarea rows="3" name="summary" class="form-control" placeholder="A summary of the licensing model"
                              id="summary"
                              data-validation-required-message="Please enter a summary of the licensing model."></textarea>

                    <button type="submit" class="NL_button button_main NL_dark_btn">
                        <i class="fa fa-paper-plane"></i>Send
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
