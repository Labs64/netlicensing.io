---
layout: page
title: "NetLicensing for Enterprise"
description: "Enterprise software licensing on your terms: self-hosted or dedicated, a contractual SLA, SSO, audit log, EU hosting and a technical manager for your rollout."
permalink: "/enterprise/"
use_cbpscroller: true
tags:
- Enterprise
- Select
- Pricing
sitemap:
  priority: 0.7
  images:
  - /img/netlicensing-industry-healthcare-offline-validation.png
  - /img/netlicensing-industry-fintech-role-access.png
  - /img/netlicensing-industry-fintech-entitlement-records.png
  - /img/netlicensing-industry-data-consumption-metering.png
---

<!-- Built only from existing page sections: banner (homepage), NL_feature
     cards and cbp-so zig-zag (industry pages) and the NL_form_light call
     to action. -->
{% assign plan_products = site.data.pricing | where: "name", "Active products" | first %}
{% assign plan_customers = site.data.pricing | where: "name", "Customers" | first %}

<div class="row NL_banner">
    <div class="col-md-8 col-md-offset-2 NL_about_page">
        <h1>Software Licensing Built for Enterprise Requirements</h1>
        <span>Run NetLicensing on your own infrastructure or in a dedicated environment we operate. A contractual SLA backs it, and a technical manager guides your rollout.</span>
        <div class="row">
            <div class="col-md-4 col-md-offset-2">
                <a href="/contact/?utm_source=netlicensing.io_enterprise&amp;utm_medium=website&amp;utm_campaign=netlicensing.io_enterprise&amp;utm_content=enterprise-hero"{% if site.calendly_enabled %} onclick="Calendly.initPopupWidget({url: 'https://calendly.com/netlicensing/netlicensing-demo?primary_color=853E29'});return false;"{% endif %} class="NL_button button_main NL_light_btn" role="button"><i class="fa fa-calendar"></i>Book a call</a>
            </div>
            <div class="col-md-4">
                <a href="https://l64.cc/questionnaire" target="_blank" rel="noopener" class="NL_button button_main NL_light_btn" role="button"><i class="fa fa-sliders"></i>Describe your setup</a>
            </div>
        </div>
    </div>
</div>

<div class="row NL_block">
    <h2 class="col-md-12">Everything the Standard Plans Do, Plus What Enterprises Ask For</h2>
    <p class="col-md-8 col-md-offset-2" style="text-align:center;">
        Enterprise is our Select plan, shaped per deal. You agree your limits, your deployment model and your level of support, and keep the full NetLicensing platform.
    </p>
</div>

<div class="row NL_industry_problem_row">
    <div class="col-md-3 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ '/img/features/different_hosting_options.png' | prepend: site.baseurl | prepend: site.url }}" alt="Self-hosted or dedicated"/>
                <h3>Your Infrastructure or Ours</h3>
                <p>Self-host with Docker Compose or Kubernetes, or let us operate a dedicated environment for you.</p>
            </figcaption>
        </figure>
    </div>
    <div class="col-md-3 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ '/img/features/service_level_agreement.png' | prepend: site.baseurl | prepend: site.url }}" alt="Service Level Agreement"/>
                <h3>Uptime in Writing</h3>
                <p>A monthly uptime commitment with service credits, set out in our <a href="https://www.labs64.com/legal/terms-of-service/netlicensing/service-level-agreement-1-0/" target="_blank" rel="noopener">Service Level Agreement</a>.</p>
            </figcaption>
        </figure>
    </div>
    <div class="col-md-3 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ '/img/features/security_encryption.png' | prepend: site.baseurl | prepend: site.url }}" alt="Security and access"/>
                <h3>Security and Control</h3>
                <p>Single sign-on through standards such as OpenID Connect, and an audit log of admin changes. Managed hosting stays in the EU, on AWS in Ireland.</p>
            </figcaption>
        </figure>
    </div>
    <div class="col-md-3 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ '/img/features/netlicensing_enterprise.png' | prepend: site.baseurl | prepend: site.url }}" alt="Dedicated technical manager"/>
                <h3>A Named Expert on Your Side</h3>
                <p>A dedicated technical manager for your rollout, phone support, and consulting and tutoring at every stage.</p>
            </figcaption>
        </figure>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_container">
        <div class="col-md-6 col-md-offset-3 NL_container_text">
            <h2>Built to Pass Your Review</h2>
            <span>Security, legal and procurement teams ask the same questions every time. Here are the answers: where it runs, who can sign in, what the contract commits to, and how it connects to your systems.</span>
        </div>
    </div>
</div>

<div class="row">
    <div id="cbp-so-scroller" class="cbp-so-scroller NL_intro NL_industry_zigzag">

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/netlicensing-industry-healthcare-offline-validation.png' | prepend: site.baseurl | prepend: site.url }}"
                     alt="Deployment options" title="Deployment options">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>Run It Where Your Security Team Wants It</h2>
                <span>Pick a dedicated managed environment that we operate, or self-host with Docker Compose or Kubernetes. Sites without internet access validate licenses offline with the NetLicensing Agent, and virtual environments are supported.</span>
                <br><br>
                <a href="/features/">All platform features &rarr;</a>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>One Sign-On, Your Identity Provider</h2>
                <span>Sign in through your corporate identity provider using standard protocols such as OpenID Connect (OIDC). We enable and test the integration with you, so access follows the identity provider your company already runs. The audit log records admin changes.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/netlicensing-industry-fintech-role-access.png' | prepend: site.baseurl | prepend: site.url }}"
                     alt="Identity provider sign-in" title="Identity provider sign-in">
            </figure>
        </section>

        <section class="cbp-so-section">
            <figure class="cbp-so-side cbp-so-side-left">
                <img src="{{ '/img/netlicensing-industry-fintech-entitlement-records.png' | prepend: site.baseurl | prepend: site.url }}"
                     alt="Security and continuity" title="Security and continuity">
            </figure>
            <article class="cbp-so-side cbp-so-side-right">
                <h2>EU Operations, Backed by Contract</h2>
                <span>NetLicensing is operated by Labs64 GmbH in Germany and hosted on AWS in Ireland. The Service Level Agreement commits to 99.0% monthly uptime, with service credits if we fall short. Data transfer is encrypted, your data is deleted on request, and source code escrow is available on request.</span>
                <br><br>
                <a href="https://www.labs64.com/legal/terms-of-service/netlicensing/service-level-agreement-1-0/" target="_blank" rel="noopener">Read the Service Level Agreement &rarr;</a>
            </article>
        </section>

        <section class="cbp-so-section">
            <article class="cbp-so-side cbp-so-side-left">
                <h2>Licensing That Talks to Your Business Systems</h2>
                <span>Webhook notifications send new customers, new licenses, warning-level changes and payments straight to your CRM, database or reporting. Product usage tracking and analytics show how your products are used. Customized reporting automation and revenue sharing for partners and resellers are available as Select options.</span>
            </article>
            <figure class="cbp-so-side cbp-so-side-right">
                <img src="{{ '/img/netlicensing-industry-data-consumption-metering.png' | prepend: site.baseurl | prepend: site.url }}"
                     alt="Usage insight" title="Usage insight">
            </figure>
        </section>

    </div>
</div>

<div class="row NL_block">
    <h2 class="col-md-12">From First Call to Go-Live, in Five Steps</h2>
</div>

<div class="row NL_industry_problem_row">
    <div class="col-md-15 col-sm-6 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ '/img/features/consulting_services.png' | prepend: site.baseurl | prepend: site.url }}" alt="Scoping call"/>
                <h3>1. Scoping call</h3>
                <p>We talk through your products, customers and deployment model. To prepare, you can fill in the <a href="https://l64.cc/questionnaire" target="_blank" rel="noopener">Individual Setup questionnaire</a>.</p>
            </figcaption>
        </figure>
    </div>
    <div class="col-md-15 col-sm-6 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ '/img/features/easy_setup_and_integration.png' | prepend: site.baseurl | prepend: site.url }}" alt="Technical pilot"/>
                <h3>2. Technical pilot</h3>
                <p>Try all features free for 30 days, no credit card required. We answer your architecture and integration questions.</p>
            </figcaption>
        </figure>
    </div>
    <div class="col-md-15 col-sm-6 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ '/img/features/escrow.png' | prepend: site.baseurl | prepend: site.url }}" alt="Security and legal review"/>
                <h3>3. Security and legal review</h3>
                <p>Your security and legal teams review the SLA, terms and hosting. We answer their technical questions.</p>
            </figcaption>
        </figure>
    </div>
    <div class="col-md-15 col-sm-6 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ '/img/features/integrated_payment_services.png' | prepend: site.baseurl | prepend: site.url }}" alt="Offer and contract"/>
                <h3>4. Offer and contract</h3>
                <p>Limits, deployment and services are agreed per deal. Custom development and priority feature requests are scoped and priced separately, so you only pay for what you need.</p>
            </figcaption>
        </figure>
    </div>
    <div class="col-md-15 col-sm-6 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ '/img/features/availability.png' | prepend: site.baseurl | prepend: site.url }}" alt="Rollout"/>
                <h3>5. Rollout</h3>
                <p>Your technical manager guides you all the way to go-live.</p>
            </figcaption>
        </figure>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>Let's Plan Your Enterprise Rollout</h2>
            <span>Tell us about your products, customers and deployment. We will come back with an Enterprise setup that fits.</span>

            <div class="row NL_cta_row">
                <div class="col-sm-4 col-sm-offset-2">
                    <a href="/contact/?utm_source=netlicensing.io_enterprise&amp;utm_medium=website&amp;utm_campaign=netlicensing.io_enterprise&amp;utm_content=enterprise-closing"{% if site.calendly_enabled %} onclick="Calendly.initPopupWidget({url: 'https://calendly.com/netlicensing/netlicensing-demo?primary_color=853E29'});return false;"{% endif %} class="NL_button button_main NL_dark_btn NL_wide_btn">
                        <i class="fa fa-calendar"></i>Book a call
                    </a>
                </div>
                <div class="col-sm-4">
                    <a href="https://l64.cc/questionnaire" target="_blank" rel="noopener" class="NL_button button_main NL_dark_btn NL_wide_btn">
                        <i class="fa fa-sliders"></i>Describe your setup
                    </a>
                </div>
            </div>
            <p class="NL_cta_footnote">
                Smaller setup? <a href="/pricing/">Premium covers up to {{ plan_products.premium }} products and {{ plan_customers.premium }} customers.</a>
            </p>
        </div>
    </div>
</div>
