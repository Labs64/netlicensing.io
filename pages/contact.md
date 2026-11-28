---
layout: page
title: "Contact NetLicensing"
description: "Contact the NetLicensing team at Labs64 about licensing your product, plans and pricing, Enterprise or your integration. Send a message, email info@netlicensing.io or book a call."
last_modified_at: 2026-11-28
permalink: "/contact/"
tags:
- contact
- sales
- quote
- request
- enquiry
---
<div class="row NL_banner">
    <div class="col-md-8 col-md-offset-2 NL_about_page">
        <h1>Contact NetLicensing</h1>
        <span>Questions about licensing your product, plans or Enterprise? Send us a message, email <a href="mailto:{{ site.email }}?subject=NetLicensing%20Contact">{{ site.email }}</a> or book a call.</span>
    </div>
</div>

<!-- Routes for visitors who don't need the form. Styles: _scss/_pages.scss -->
<section class="NL_home_section">
    <div class="row NL_contact_routes">
        <div class="col-md-3 col-sm-6">
            <h2>Technical Questions</h2>
            <p>Many integration questions already have an answer in the wiki.</p>
            <p><a href="https://netlicensing.io/wiki/faq">FAQ &amp; troubleshooting &rarr;</a></p>
        </div>
        <div class="col-md-3 col-sm-6">
            <h2>Enterprise</h2>
            <p>Self-hosted or dedicated deployment, single sign-on, SLA and a technical manager.</p>
            <p><a href="{{ '/enterprise/' | relative_url }}">NetLicensing Enterprise &rarr;</a></p>
        </div>
        <div class="col-md-3 col-sm-6">
            <h2>Talk It Through</h2>
            <p>A 1-1 call about your product, your licensing models and the plan that fits.</p>
            <p><a href="{{ '/contact/' | relative_url }}"{% if site.calendly_enabled %} onclick="Calendly.initPopupWidget({url: 'https://calendly.com/netlicensing/netlicensing-demo?primary_color=7B2A10'});return false;"{% endif %}>Book a call &rarr;</a></p>
        </div>
        <div class="col-md-3 col-sm-6">
            <h2>Service Status</h2>
            <p>Check whether NetLicensing is running normally right now.</p>
            <p><a href="https://status.netlicensing.io">status.netlicensing.io &rarr;</a></p>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="NL_home_section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center NL_home_head">
                <div id="contact-form-submitted" class="alert alert-success" style="display: none;" role="status">
                    Thank you, your message has been sent. We will reply by email.
                </div>
                <h2>Send Us a Message</h2>
                <p>Fields marked * are required. We reply by email.</p>
            </div>
        </div>
        <div class="row">
{% include contact-crm.html %}
        </div>
    </div>
</section>

<script>
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('status') === 'submitted') {
        document.getElementById('contact-form-submitted').style.display = "block";
    }
</script>
