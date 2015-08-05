---
layout: page
title: "Licensing Models"
description: "All the features you need to effectively manage your product licenses"
permalink: "/licensing-models/"
tags:
- features
- FAQ
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Licensing Models</h1>
        <h3>NetLicensing is sophisticated enough to cover even the most outlandish licensing models: from single-user to network overflow licenses. NetLicensing provides the software vendor with the ability to map/combine numerous licensing models.</h3>
    </div>
</div>

<div class="NL_block">
{% for licensingmodel in site.data.licensingmodels %}
    {% if licensingmodel.name %}
        <div class="col-md-3 NL_feature">
            <h4>
                <i class="fa {{ licensingmodel.class }} NL_icon" title="{{ licensingmodel.status }}"></i>
                {{ licensingmodel.name }}
            </h4>
            <p style="font-style: italic; font-size: x-small;">
                {{ licensingmodel.aliases | join: ', ' }}
            </p>
            <p>{{ licensingmodel.description }}</p>
            <div style="display: none;">
                {% for tag in licensingmodel.tags %}
                    {{ tag }}
                {% endfor %}
            </div>
        </div>
    {% endif %}
{% endfor %}
</div>

<div class="row"></div>
