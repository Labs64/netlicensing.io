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
  <div class="panel-body row">
      <div class="col-md-4">
          <img alt="Infographic: How To Select Licensing Model" title="Infographic: How To Select Licensing Model"
               src="/img/case-studies/how-to-select-licensing-model-infographic-netlicensing-icon.png" style="width: 350px;padding-left:20px;"/>
      </div>
      <div class="col-md-8">
          <a href="/resources/how-to-select-licensing-model-infographic-netlicensing.png" title="Infographic: How To Select Licensing Model">
            <h2>Infographic: How To Select Licensing Model</h2>
          </a>
          <p>
            <a href="/resources/how-to-select-licensing-model-infographic-netlicensing_lo.pdf" title="Infographic: How To Select Licensing Model (low)">Infographic: How To Select Licensing Model (PDF / lo-res)</a>
            <br/>
            <a href="/resources/how-to-select-licensing-model-infographic-netlicensing_hi.pdf" title="Infographic: How To Select Licensing Model (high)">Infographic: How To Select Licensing Model (PDF / hi-res)</a>
          </p>
      </div>
  </div>
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
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
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
