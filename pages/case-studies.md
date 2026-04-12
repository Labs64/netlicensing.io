---
layout: page
title: "Case Studies"
description: "Whether you're looking for inspiration, business models, or precedents, the NetLicensing Case Studies are a perfect place to start"
permalink: "/case-studies/"
tags:
- Case Studies
- Use Cases
sitemap:
  images:
   - /img/case-studies/netlicensing-case-study-access-control.png
   - /img/case-studies/netlicensing-case-study-ai-api-monetization.png
   - /img/case-studies/netlicensing-case-study-ai-chatbot-multi-tenant.png
   - /img/case-studies/netlicensing-case-study-b2b-saas-stripe-licensing.png
   - /img/case-studies/netlicensing-case-study-cad-cae-hybrid-licensing.png
   - /img/case-studies/netlicensing-case-study-compliance-licence-audit.png
   - /img/case-studies/netlicensing-case-study-connected-cars-services.png
   - /img/case-studies/netlicensing-case-study-connected-products-smart-home.png
   - /img/case-studies/netlicensing-case-study-course-learning-content-access.png
   - /img/case-studies/netlicensing-case-study-credit-tracker.png
   - /img/case-studies/netlicensing-case-study-cross-platform-license-sharing.png
   - /img/case-studies/netlicensing-case-study-digipass-wordpress-plugin.png
   - /img/case-studies/netlicensing-case-study-digital-media-content-access.png
   - /img/case-studies/netlicensing-case-study-document-saas-subscription-tiers.png
   - /img/case-studies/netlicensing-case-study-ebooks-rent.png
   - /img/case-studies/netlicensing-case-study-embedded-feature-on-demand.png
   - /img/case-studies/netlicensing-case-study-esim-features-enablement.png
   - /img/case-studies/netlicensing-case-study-gaming-middleware-per-title.png
   - /img/case-studies/netlicensing-case-study-gaming.png
   - /img/case-studies/netlicensing-case-study-industrial-oem-machine-features.png
   - /img/case-studies/netlicensing-case-study-internet-access-control.png
   - /img/case-studies/netlicensing-case-study-internet-network-access-control.png
   - /img/case-studies/netlicensing-case-study-iot-device-feature-activation.png
   - /img/case-studies/netlicensing-case-study-iot-tablet-computers.png
   - /img/case-studies/netlicensing-case-study-isv-sdk-plugin-licensing.png
   - /img/case-studies/netlicensing-case-study-medtech-pay-per-study.png
   - /img/case-studies/netlicensing-case-study-membership-subscription-plans.png
   - /img/case-studies/netlicensing-case-study-mobile-device-management.png
   - /img/case-studies/netlicensing-case-study-multi-product-bundle.png
   - /img/case-studies/netlicensing-case-study-oem-embedded-licensing.png
   - /img/case-studies/netlicensing-case-study-offline-air-gapped-deployment.png
   - /img/case-studies/netlicensing-case-study-online-service.png
   - /img/case-studies/netlicensing-case-study-plugin-extension-marketplace.png
   - /img/case-studies/netlicensing-case-study-saas-seat-team-management.png
   - /img/case-studies/netlicensing-case-study-smart-metering.png
   - /img/case-studies/netlicensing-case-study-software-licensing.png
   - /img/case-studies/netlicensing-case-study-telecom-usage-licensing.png
   - /img/case-studies/netlicensing-case-study-ticketing-event-access.png
   - /img/case-studies/netlicensing-case-study-trial-to-paid-conversion.png
   - /img/case-studies/netlicensing-case-study-usage-based-billing-data.png
   - /img/case-studies/netlicensing-case-study-white-label-reseller.png
   - /resources/how-to-select-licensing-model-infographic-netlicensing.png
---
<div class="row NL_banner">
	<div class="col-md-6 col-md-offset-3 NL_about_page">
		<h1>NetLicensing Case Studies</h1>
		<span>Whether you're looking for inspiration, business models, or precedents,<br/>the NetLicensing Case Studies are a perfect place to start.</span>
	</div>
</div>

<div class="NL_block row">
{% for casestudy in site.case-studies %}
    {% if casestudy.layout == 'casestudy' and casestudy.title %}
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
