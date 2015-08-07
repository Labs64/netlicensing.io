---
layout: page
title: "Case Studies"
description: "Whether you're looking for inspiration, business models, or precedents, the NetLicensing Case Studies are a perfect place to start."
permalink: "/case-studies/"
tags:
- Case Studies
- Use Cases
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Case Studies</h1>
        <span>Whether you're looking for inspiration, business models, or precedents, the NetLicensing Case Studies are a perfect place to start.</span>
    </div>
</div>

<div class="NL_block">
{% for casestudy in site.data.casestudies %}
    {% if casestudy.name %}
        <div class="col-md-4 NL_feature">
            <a href="{{ casestudy.url }}">
            <h3>
                <i class="fa {{ casestudy.class }} NL_icon"></i>
                {{ casestudy.name }}
            </h3>
            </a>
            <p>{{ casestudy.description }}</p>
        </div>
    {% endif %}
{% endfor %}
</div>

<div class="row">
    <div class="col-md-12 NL_form1 NL_block">
        <div class="col-md-6 col-md-offset-3">
            <h2>Submit a Case Study</h2>
            <h3>Get your project listed on the NetLicensing website</h3>
            <form>
                <div class="form-group">
                    <input class="form-control" id="case-study" placeholder="A one-line case study description"/>
                    <textarea class="form-control" rows="3" placeholder="A summary of the case study"></textarea>
                    <button type="submit" class="NL_button button_main NL_banner_btn" role="button"><i class="fa fa-paper-plane"></i>Send</button>
                </div>
            </form>
        </div>
    </div>
</div>
