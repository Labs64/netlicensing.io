---
layout: page
title: "Features"
description: "World class features you need to effectively manage your product licenses"
permalink: "/features-all/"
sitemap:
  priority: 0.7
tags:
- features
- FAQ
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>NetLicensing Features</h1>
        <span>World class features, integrated to save you time & money.</span>
    </div>
</div>

<div class="row">
    <div style="padding:40px;">
        {% for feature in site.data.features %}
        {% if feature.show-default == "Y" %}
        <div class="col-md-3 NL_feature">
            <figure class="hover_effect">
                <figcaption>
                <img src="{{ feature.icon }}" alt="{{ feature.name }}"/>  
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
        {% if feature.show-default != "Y" %}
        <div class="col-md-3 NL_feature">
            <figure class="hover_effect">
                <figcaption>
                <img src="{{ feature.icon }}" alt="{{ feature.name }}"/>  
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
    <div class="col-md-12 show-more" >
        <a id="load-features" href="/features" class="NL_button button_main NL_dark_btn">Hide</a>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Miss a Feature?</h2>
            <span>Do you have an idea for a cool new feature of NetLicensing that you think could be the Next Big Thing™?</span>

            <form action="//formspree.io/{{ site.email }}" method="POST" name="sentMessage" id="contactForm"
                  novalidate>
                <input type="hidden" name="_next" value="/features/"/>
                <input type="hidden" name="_subject" value="NetLicensing Feature Request">
                <input type="text" name="_gotcha" style="display:none"/>

                <div class="form-group">
                    <input type="text" name="feature" class="form-control" placeholder="A one-line feature description"
                           id="feature"
                           data-validation-required-message="Please enter a feature description.">

                    <textarea rows="3" name="summary" class="form-control" placeholder="A summary of the feature"
                              id="summary"
                              data-validation-required-message="Please enter a summary of the feature."></textarea>

                    <button type="submit" class="NL_button button_main NL_dark_btn">
                        <i class="fa fa-paper-plane"></i>Send
                    </button>
                </div>
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
            <li>99.9% UPTIME</li>
            <li>FREE support</li>
            <li>FREE maintenance</li>
            <li>FREE updates</li>
            <li>Support for ALL environments</li>
            <li>Easy to retrofit to your product then setup and use</li>
            <li>No additional requirements, just NetLicensing API - the rest works out of the box</li>
        </ul>
    </div>
</div>
