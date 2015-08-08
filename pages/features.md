---
layout: page
title: "Features"
description: "All the features you need to effectively manage your product licenses"
permalink: "/features/"
tags:
- features
- FAQ
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Features</h1>
        <span>Our enterprise services and support programs ensure your success at every step along the management of your product licensing.</span>
    </div>
</div>

<div class="NL_block">
{% for feature in site.data.features %}
    {% if feature.name %}
        <div class="col-md-3 NL_feature">
            <h3>
                <i class="fa {{ feature.class }} NL_icon"></i> 
                {{ feature.name }}
            </h3>
            <p>{{ feature.description }}</p>
        </div>
    {% endif %}
{% endfor %}
</div>

<div class="row">
    <div class="col-md-12 NL_form1 NL_block">
        <div class="col-md-6 col-md-offset-3">
            <h2>Miss a Feature?</h2>
            <span>Do you have an idea for a cool new feature of NetLicensing that you think could be the Next Big Thing™?</span>

            <form action="//formspree.io/{{ site.email }}" method="POST" name="sentMessage" id="contactForm"
                  novalidate>
                <input type="hidden" name="_next" value="/features/"/>
                <input type="hidden" name="_subject" value="NetLicensing Contact">
                <input type="text" name="_gotcha" style="display:none"/>

                <div class="form-group">
                    <input type="text" name="feature" class="form-control" placeholder="A one-line feature description"
                           id="feature"
                           data-validation-required-message="Please enter a feature description.">

                    <textarea rows="3" name="summary" class="form-control" placeholder="A summary of the feature"
                              id="summary"
                              data-validation-required-message="Please enter a summary of the feature."></textarea>

                    <button type="submit" class="NL_button button_main NL_banner_btn" role="button"><i
                            class="fa fa-paper-plane"></i>Send
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
