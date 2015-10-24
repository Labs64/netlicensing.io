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

[Infographic: How To Select Licensing Model (PDF / lo-res)](/resources/how-to-select-licensing-model-infographic-netlicensing_lo.pdf "Infographic: How To Select Licensing Model (low)")

[Infographic: How To Select Licensing Model (PDF / hi-res)](/resources/how-to-select-licensing-model-infographic-netlicensing_hi.pdf "Infographic: How To Select Licensing Model (high)")

<div class="NL_block">
{% for casestudy in site.case-studies %}
    {% if casestudy.title %}
    <div class="panel-body row">
        <div class="col-md-4">
            <a href="{{ casestudy.url }}" title="Case Study: {{ casestudy.title }}">
                <img alt="{{ casestudy.title }}" title="Case Study: {{ casestudy.title }}"
                 src="/img/case-studies/{{ casestudy.img }}" style="width: 350px;padding-left:20px;"/>
            </a>
        </div>
        <div class="col-md-8">
            <a href="{{ casestudy.url }}" title="Case Study: {{ casestudy.title }}">
                <h2>{{ casestudy.title }}</h2>
            </a>

            <p>{{ casestudy.description }}</p>
        </div>
    </div>
    {% endif %}
{% endfor %}
</div>

<div class="row">
    <div class="col-md-12 NL_form1 NL_block">
        <div class="col-md-6 col-md-offset-3">
            <h2>Submit a Case Study</h2>
            <span>Get your project listed on the NetLicensing website.</span>

            <form action="//formspree.io/{{ site.email }}" method="POST" name="sentMessage" id="contactForm"
                  novalidate>
                <input type="hidden" name="_next" value="/case-studies/"/>
                <input type="hidden" name="_subject" value="NetLicensing Case Study Submission">
                <input type="text" name="_gotcha" style="display:none"/>

                <div class="form-group">
                    <input type="text" name="case-study" class="form-control" placeholder="A one-line case study description"
                           id="case-study"
                           data-validation-required-message="Please enter a case study description.">

                    <textarea rows="3" name="summary" class="form-control" placeholder="A summary of the case study"
                              id="summary"
                              data-validation-required-message="Please enter a summary of the case study."></textarea>

                    <button type="submit" class="NL_button button_main NL_banner_btn">
                        <i class="fa fa-paper-plane"></i>Send
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
