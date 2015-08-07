---
layout: page
title: "Licensing Models"
description: "NetLicensing is sophisticated enough to cover even the most outlandish licensing models"
permalink: "/licensing-models/"
tags:
- Licensing Models
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Licensing Models</h1>
        <h3>NetLicensing is sophisticated enough to cover even the most outlandish licensing models: from single-user to network overflow licenses. NetLicensing provides the software vendor with the ability to map/combine numerous licensing models.</h3>
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
                        <img alt="{{ licensingmodel.name }}" title="Licensing Model: {{ licensingmodel.name }}" src="/img/{{ licensingmodel.img }}"/>
                        <h3>{{ licensingmodel.name }}</h3>
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
