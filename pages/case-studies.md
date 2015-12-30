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

<div class="NL_block row">
{% for casestudy in site.case-studies %}
    {% if casestudy.title %}
        <a href="{{ casestudy.url }}" class="NL_cases_card col-md-6" title="Case Study: {{ casestudy.title }}">
            <div>
                <div class="view view-info col-md-5">
                    <img class="view-img" src="{{ casestudy.img | prepend: site.baseurl | prepend: site.url }}" alt="{{ casestudy.title }}" />
                    <div class="mask">
                        <img alt="{{ site.title }}" src="{{ '/img/labs64-avatar-30x30.png' | prepend: site.baseurl | prepend: site.url }}" />
                        <p>{{ casestudy.title }}</p>
                    </div>
                </div>
                <div class="col-md-5 col-md-offset-1">
                    <h3>{{ casestudy.title }}</h3>
                    <p>{{ casestudy.description }}</p>
                </div>
            </div>
        </a>
    {% endif %}
{% endfor %}
</div>

<div class="row NL_infographic">
    <div class="col-md-12 NL_container">
        <div class="col-md-6 col-md-offset-3 NL_container_text">
            <a href="{{ '/resources/how-to-select-licensing-model-infographic-netlicensing.png' | prepend: site.baseurl | prepend: site.url }}" title="Infographic: How To Select Licensing Model">
				<h2>Infographic: How To Select Licensing Model</h2>
            </a>
            <p>
				<a href="{{ '/resources/how-to-select-licensing-model-infographic-netlicensing_lo.pdf' | prepend: site.baseurl | prepend: site.url }}" title="Infographic: How To Select Licensing Model (low)">Infographic: How To Select Licensing Model (PDF / lo-res)</a>
				<br/>
				<a href="{{ '/resources/how-to-select-licensing-model-infographic-netlicensing_hi.pdf' | prepend: site.baseurl | prepend: site.url }}" title="Infographic: How To Select Licensing Model (high)">Infographic: How To Select Licensing Model (PDF / hi-res)</a>
            </p>
        </div>
    </div>
</div>
