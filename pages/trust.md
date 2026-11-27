---
layout: page
title: "Trust"
description: "How NetLicensing handles your data: hosting, GDPR agreement, subprocessors, security measures, SLA, security advisories and how to report an issue."
permalink: "/trust/"
tags:
- Trust
- Security
- Privacy
- GDPR
sitemap:
  priority: 0.6
---

<!-- Content lives in _data/trust.yml. Built from existing page sections:
     banner and closing NL_form_light call to action, plus Bootstrap tables. -->
{% assign trust = site.data.trust %}

<div class="row NL_banner">
    <div class="col-md-8 col-md-offset-2 NL_about_page">
        <h1>Trust at NetLicensing</h1>
        <span>Clear answers for your security, privacy and procurement reviews, with links to the evidence.</span>
    </div>
</div>

<div class="row NL_block NL_trust">
    <div class="col-md-10 col-md-offset-1">
        <p class="NL_trust_reviewed">Last reviewed: {{ trust.reviewed | date: "%B %-d, %Y" }}</p>
        <nav class="NL_trust_nav" aria-label="On this page">
            <a href="#glance">At a glance</a>
            {%- for section in trust.sections %}
            <a href="#{{ section.id }}">{{ section.title }}</a>
            {%- endfor %}
            <a href="#subprocessors">Subprocessors</a>
            <a href="#vulnerabilities">Vulnerabilities</a>
        </nav>

        <h2 id="glance">At a Glance</h2>
        <table class="table table-striped NL_trust_table">
            <thead><tr><th scope="col">Question</th><th scope="col">Answer</th><th scope="col">Applies to</th><th scope="col">Evidence</th></tr></thead>
            <tbody>
            {%- for row in trust.glance %}
                <tr>
                    <th scope="row">{{ row.question }}</th>
                    <td data-label="Answer">{{ row.answer }}</td>
                    <td data-label="Applies to"><span class="NL_trust_status">{{ row.status }}</span></td>
                    <td data-label="Evidence">{% include trust-links.html links=row.links %}</td>
                </tr>
            {%- endfor %}
            </tbody>
        </table>

        {%- for section in trust.sections %}
        <h2 id="{{ section.id }}">{{ section.title }}</h2>
        <table class="table table-striped NL_trust_table">
            <thead class="sr-only"><tr><th scope="col">Topic</th><th scope="col">Details</th><th scope="col">Evidence</th></tr></thead>
            <tbody>
            {%- for item in section.items %}
                <tr>
                    <th scope="row">{{ item.topic }}</th>
                    <td data-label="Details">{{ item.text }}</td>
                    <td data-label="Evidence">{% include trust-links.html links=item.links %}</td>
                </tr>
            {%- endfor %}
            </tbody>
        </table>
        {%- endfor %}

        <h2 id="subprocessors">Subprocessors</h2>
        <p>A subprocessor is a company that processes personal data for us while we process it for you.</p>
        <table class="table table-striped NL_trust_table">
            <thead><tr><th scope="col">Company</th><th scope="col">Purpose</th><th scope="col">Location</th></tr></thead>
            <tbody>
            {%- for processor in trust.subprocessors %}
                <tr>
                    <th scope="row">{{ processor.name }}</th>
                    <td data-label="Purpose">{{ processor.purpose }}</td>
                    <td data-label="Location">{{ processor.location }}</td>
                </tr>
            {%- endfor %}
            </tbody>
        </table>
        <p>Under article 5 of the <a href="https://netlicensing.io/wiki/data-processing-agreement-dpa">Data Processing Agreement</a>, we tell you on request which third parties we engage. <a href="{{ '/contact/' | relative_url }}">Ask for the current list</a>.</p>
        <p><strong>Payment providers:</strong> if you sell through NetLicensing Shop, you connect your own {{ trust.payment_providers | join: " or " }} account, and the data needed to complete a payment is sent to the provider you choose. The provider processes it under its own terms with you.</p>

        <h2 id="vulnerabilities">Vulnerabilities and Advisories</h2>
        <table class="table table-striped NL_trust_table">
            <thead><tr><th scope="col">Component</th><th scope="col">Where to find security advisories</th></tr></thead>
            <tbody>
                <tr>
                    <th scope="row">NetLicensing service</th>
                    <td data-label="Security advisories">On request: <a href="{{ '/contact/' | relative_url }}">contact us</a></td>
                </tr>
            {%- for group in trust.repositories %}
                <tr>
                    <th scope="row">{{ group.component }}</th>
                    <td data-label="GitHub Security tab">
                    {%- for item in group.repos %}
                        <a class="NL_trust_repo" href="https://github.com/Labs64/{{ item.repo }}/security" target="_blank" rel="noopener">{{ item.label }}</a>
                    {%- endfor %}
                    </td>
                </tr>
            {%- endfor %}
            </tbody>
        </table>
        <p><strong>Report a security issue privately.</strong> Email <a href="mailto:info@netlicensing.io?subject=Security%20report">info@netlicensing.io</a> with the subject "Security report". For an open-source component, you can also report through its GitHub Security tab where private reporting is offered. Please don't open a public issue.</p>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Reviewing NetLicensing?</h2>
            <span>Send us your security questionnaire, or ask for your Data Processing Agreement.</span>
            <div class="row NL_cta_row">
                <div class="col-sm-4 col-sm-offset-4">
                    <a href="{{ '/contact/' | relative_url }}?utm_source=netlicensing.io_trust&amp;utm_medium=website&amp;utm_campaign=netlicensing.io_trust" class="NL_button button_main NL_dark_btn NL_wide_btn">
                        <i class="fa fa-envelope-o"></i>Contact Us
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
