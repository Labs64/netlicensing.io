---
layout: page
title: "For Integrators"
description: "NetLicensing Wiki: current specification, documentation, implementation status, as well as a repository of examples and resources"
permalink: "/documentation/"
tags:
- Documentation
- RESTful
- Getting Started
- Reference
- How-To
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>NetLicensing Wiki</h1>
        <span>Here you will find resources that will help you learn about NetLicensing, including the current specification, documentation, implementation status, as well as a repository of demos and resources that take advantage of NetLicensing.</span>
    </div>
</div>

<div class="row NL_block">
    <div class="col-md-6">
        <div class="docu-card">
            <img class="image col-md-4" src="{{ '/img/how_it_works.png' | prepend: site.baseurl | prepend: site.url }}" alt="How it Works">
            <div class="content col-md-8">
                <h3 class="title">How it Works</h3>
                <p>As a vendor, you need just few steps to integrate NetLicensing into your product.</p>
            </div>
            <div class="action col-md-12">
                <a href="https://www.labs64.de/confluence/x/vQCo">Read More</a>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="docu-card">
            <img class="image col-md-4" src="{{ '/img/getting_started.png' | prepend: site.baseurl | prepend: site.url }}" alt="Getting Started">
            <div class="content col-md-8">
                <h3 class="title">Getting Started</h3>
                <p>Getting started guide provides step-by-step instructions for the vendor how to begin with the
                    NetLicensing service.</p>
            </div>
            <div class="action col-md-12">
                <a href="https://www.labs64.de/confluence/x/sgCo">Read More</a>
            </div>
        </div>
    </div>
</div>
<div class="row NL_block">
    <div class="col-md-6">
        <div class="docu-card">
            <img class="image col-md-4" src="{{ '/img/api.png' | prepend: site.baseurl | prepend: site.url }}" alt="NetLicensing API">
            <div class="content col-md-8">
                <h3 class="title">NetLicensing API</h3>
                <p>The NetLicensing API (RESTful / JavaDoc) is for developers integrating NetLicensing with applications
                    and
                    administrators who want to script interactions with the NetLicensing server.</p>
            </div>
            <div class="action col-md-12">
                <a href="https://netlicensing.io/NetLicensing-API/">API Test Center</a>
                <a href="https://www.labs64.de/confluence/x/pwCo">RESTful</a>
                <a href="https://go.netlicensing.io/javadoc/v2/index.html">JavaDoc</a>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="docu-card">
            <img class="image col-md-4" src="{{ '/img/libraries.png' | prepend: site.baseurl | prepend: site.url }}" alt="Client Libraries">
            <div class="content col-md-8">
                <h3 class="title">Client Libraries</h3>
                <p>Use the following client libraries and examples as a foundation for integrating NetLicensing in
                    your
                    code. It will help you to understand how to perform the validation, build the infrastructure to
                    manage
                    and track licenses, perform various vendor administrative tasks, etc. using the NetLicensing
                    API.</p>
            </div>
            <div class="action col-md-12">
                <a href="https://www.labs64.de/confluence/x/xgCo">Read More</a>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_container">
        <div class="col-md-6 col-md-offset-3 NL_container_text">
            <h2>Get Started with NetLicensing</h2>
            <span>It’s easy to get started with NetLicensing to enable license management for your products.<br>Just follow these five simple steps.</span>
            <form action="/getting-started/" method="GET"
                  name="Getting Started" id="Getting-started"
                  novalidate>
                <button type="submit" class="NL_button button_main NL_dark_btn NL_wide_btn">
                    <i class="fa fa-rocket"></i>Getting Started
                </button>
            </form>
        </div>
    </div>
</div>

<div class="row NL_block" style="text-align:center;">
    <h2 class="col-md-12">NetLicensing Usage Scenarios</h2>
    <p class="col-md-8 col-md-offset-2">Here you can find typical NetLicensing integration and usage scenarios, which might give you some impressions on how you can elaborate on the best-fit licensing approach for your products.</p>
</div>

<div class="row NL_block" style="text-align:center;">
    <h3 class="col-md-12">Online validation & activation</h3>
    <p class="col-md-8 col-md-offset-2">Use NetLicensing services in an innovative Licensing-as-a-Service (LaaS) mode, so your products can be validated & activated online, as well as provide the best customer experience by allowing immediate online licenses acquisition.</p>
    <figure> 
        <div class="image">
            <img src="{{ '/img/use-cases/netlicensing-online.png' | prepend: site.baseurl | prepend: site.url }}" alt="NetLicensing Use Case: Online validation & activation" width="70%">
        </div> 
    </figure>
</div>

<div class="row NL_block" style="text-align:center;">
    <h3 class="col-md-12">Online validation using NetLicensing Agent on vendors’ premises</h3>
    <p class="col-md-8 col-md-offset-2">NetLicensing core services are hosted on very reliable and scalable architecture with the high availability. Nevertheless, based on the vendors demand, fault-tolerant infrastructure can be established by deploying NetLicensing Agent on vendor’s premises, so this additional installation will allow the vendor to ensure availability using his own infrastructure.</p>
    <figure> 
        <div class="image">
            <img src="{{ '/img/use-cases/netlicensing-agent-vendor.png' | prepend: site.baseurl | prepend: site.url }}" alt="NetLicensing Use Case: Online validation using NetLicensing Agent on vendors’ premises" width="70%">
        </div> 
    </figure>
</div>

<div class="row NL_block" style="text-align:center;">
    <h3 class="col-md-12">Offline validation using NetLicensing Agent on customers’ premises</h3>
    <p class="col-md-8 col-md-offset-2">In some environments access to the NetLicensing cloud services is not possible for technical or organizational reasons, such as no internet connectivity or security restrictions. To enable NetLicensing functionality even in such restricted environments, we offer NetLicensing Agent - a standalone module, which is able to operate without connectivity to the NetLicensing cloud services and responding in a local network or on a local host to the validation requests same as the NetLicensing cloud service does.</p>
    <figure> 
        <div class="image">
            <img src="{{ '/img/use-cases/netlicensing-agent-customer.png' | prepend: site.baseurl | prepend: site.url }}" alt="NetLicensing Use Case: Offline validation using NetLicensing Agent on customers’ premises" width="70%">
        </div> 
    </figure>
</div>

<div class="row NL_block" style="text-align:center;">
    <h3 class="col-md-12">Offline validation using TTL & Cache</h3>
    <p class="col-md-8 col-md-offset-2">This is a typical scenario, which can be used for mobile applications and IoT devices in order to reduce outgoing traffic on validation requests. Initial successful response from NetLicensing validation can be  cached in the application for the defined Time-To-Live interval and used to enable product functionalities.</p>
</div>

<div class="row NL_block" style="text-align:center;">
    <h3 class="col-md-12">3pp e-commerce integration using NetLicensing Gateway</h3>
    <p class="col-md-8 col-md-offset-2">Integration with NetLicensing doesn’t mean, that existing sales channels need to be changed. You can use established e-commerce (FastSpring, MyCommerce, PrestaShop, SendOwl, etc.) platforms for licenses checkout process and configure fulfillment / web-hocks process to be used in the combination with NetLicensing Gateway. So all acquired licenses will be available and assigned to the customer for later validation in NetLicensing.</p>
</div>

<div class="row NL_block" style="text-align:center;">
    <h3 class="col-md-12">ERP & CRM integration using NetLicensing RESTful API</h3>
    <p class="col-md-8 col-md-offset-2">The best synergies can be achieved via integration of your CRM, CMS, ERP & BI and NetLicensing services. Transform your  existing systems in “one-stop-shop” for all customer and process relevant metrics and  access retrieve NetLicensing assets assigned to your customers in the above systems.</p>
</div>

<div class="row">
    <div class="col-md-12 NL_form_light NL_block">
        <div class="col-md-8 col-md-offset-2 NL_form_light_text">
            <h2>NetLicensing Case Studies</h2>
            <span>Check out our Case Studies to see how we have helped create license management solutions across a diverse range of vendors and industry sectors.</span>
            <form action="/case-studies/" method="GET"
                  name="Case Studies" id="case-studies"
                  novalidate>
                <button type="submit" class="NL_button button_main NL_dark_btn NL_wide_btn">
                    <i class="fa fa-shield-alt"></i>View Case Studies
                </button>
            </form>
        </div>
    </div>
</div>
