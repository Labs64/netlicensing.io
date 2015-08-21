---
layout: page
title: "Licensing Models"
description: "NetLicensing is sophisticated enough to cover even the most outlandish licensing models"
permalink: "/licensing-models/"
tags:
- Licensing Models
- Try-and-Buy
- Subscription
- Rental
- Floating
- Pay-per-use
sitemap:
  priority: 0.5
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Licensing Models</h1>
        <span>NetLicensing is sophisticated enough to cover even the most outlandish licensing models: from single-user to network overflow licenses. NetLicensing provides the software vendor with the ability to map/combine numerous licensing models.</span>
    </div>
</div>

<div class="row NL_block">
    <div class="col-md-12">
        <ul id="filterOptions">
            <li class="active"><a href="" class="NL_button button_main NL_LM_btn" id="all">All</a></li>
            <li><a href="" class="NL_button button_main NL_LM_btn" id="time">Time</a></li>
            <li><a href="" class="NL_button button_main NL_LM_btn" id="volume">Volume</a></li>
            <li><a href="" class="NL_button button_main NL_LM_btn" id="feature">Feature</a></li>
            <li><a href="" class="NL_button button_main NL_LM_btn" id="user">User</a></li>
            <li><a href="" class="NL_button button_main NL_LM_btn" id="concurrent">Concurrent</a></li>
          </ul>

          <ul class="NL_licensing_models">
            {% for licensingmodel in site.data.licensingmodels %}
                {% if licensingmodel.name %}
                    <li class="item col-md-4" data-id="id-{{ forloop.index }}" data-type="{{ licensingmodel.tags | join: ' '}}">
                        <img alt="{{ licensingmodel.name }}" title="Licensing Model: {{ licensingmodel.name }}" src="/img/licensing-model/{{ licensingmodel.img }}"/>
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
    <div class="col-md-12 NL_form1 NL_block">
        <div class="col-md-6 col-md-offset-3">
            <h2>Need a special Licensing Model?</h2>
            <span>With NetLicensing, complex licensing models can be created that fit your business needs.</span>

            <form action="//formspree.io/{{ site.email }}" method="POST" name="sentMessage" id="contactForm"
                  novalidate>
                <input type="hidden" name="_next" value="/licensing-models/"/>
                <input type="hidden" name="_subject" value="NetLicensing Licensing Model Request">
                <input type="text" name="_gotcha" style="display:none"/>

                <div class="form-group">
                    <input type="text" name="feature" class="form-control" placeholder="A one-line licensing model description"
                           id="licensing-model"
                           data-validation-required-message="Please enter a licensing model description.">

                    <textarea rows="3" name="summary" class="form-control" placeholder="A summary of the licensing model"
                              id="summary"
                              data-validation-required-message="Please enter a summary of the licensing model."></textarea>

                    <button type="submit" class="NL_button button_main NL_banner_btn" role="button"><i
                            class="fa fa-paper-plane"></i>Send
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
