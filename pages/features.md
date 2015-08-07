---
layout: page
title: "Features"
description: "All the features you need to effectively manage your product licenses"
permalink: "/features/"
tags:
- features
- FAQ
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Features</h1>
        <h3>Our enterprise services and support programs ensure your success at every step along the management of your product licensing.</h3>
    </div>
</div>

<div class="NL_block">
{% for feature in site.data.features %}
    {% if feature.name %}
        <div class="col-md-3 NL_feature">
            <h3>
                <i class="fa {{ feature.class }} NL_icon"></i> 
                {{ feature.name }}
            </h3>
            <p>{{ feature.description }}</p>
        </div>
    {% endif %}
{% endfor %}
</div>

<div class="row">
    <div class="col-md-12 NL_form1 NL_block">
        <div class="col-md-6 col-md-offset-3">
            <h2>Miss a Feature?</h2>
            <h3>Do you have an idea for a cool new feature of NetLicensing that you think could be the Next Big Thing™?</h3>
            <form>
                <div class="form-group">
                    <input class="form-control" id="feature" placeholder="A one-line feature description"/>
                    <textarea class="form-control" rows="3" placeholder="A summary of the feature"></textarea>
                    <button type="submit" class="NL_button button_main NL_banner_btn" role="button"><i class="fa fa-paper-plane"></i>Send</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="row NL_block">
    <h2 class="col-md-12">You may still have some questions, so here's our FAQs</h2>
</div>

<div class="row NL_FAQ">
    <div class= "col-md-4">
        <h3>Do I have to pay to use your service?</h3>
        <p>No. There is a Free Forever plan includes a NetLicensing account with unlimited products and API Access.</p>
    </div>
    <div class= "col-md-4">
        <h3>Are there any hidden cost or extra charges?</h3>
        <p>No. NetLicensing won’t charge you any setup fees or monthly fees if you are using a free plan.
The selected payment service provider may charge an internet gateway fee and/or a processing fee.</p>
    </div>
    <div class= "col-md-4">
        <h3>Do I need a credit card to sign up for the free plan?</h3>
        <p>No. We do not collect credit card information when you sign up for a free account.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class= "col-md-4">
        <h3>Can I cancel anytime?</h3>
        <p>Yes! You can cancel your plan anytime you wish and you will not be charged.</p>
    </div>
    <div class= "col-md-4">
        <h3>What is Licensing eCommerce Platform? Shall I use it?</h3>
        <p>NetLicensing Shop is an innovative eCommerce solution which provides your customers licenses acquisition possibility for every available <a title="NetLicensing Licensing Models" href="http://l64.cc/nl09">licensing models</a>.
You may omit using of NetLicensing Shop and create all licensing entities via NetLicensing API instead.</p>
    </div>
    <div class= "col-md-4">
        <h3>Do you have an API? CLI? Libraries?</h3>
        <p>Yes. NetLicensing RESTful API documentation is available <a title="API" href="http://l64.cc/nl10">here</a>. You may also use the following <a title="NetLicensing client libraries" href="http://l64.cc/nl07">client libraries and examples</a> as a foundation for integrating NetLicensing in your code.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class= "col-md-4">
        <h3>How secure is this?</h3>
        <p>NetLicensing uses industry standard SSL security. Your data is hosted in a secure hosting facility and regularly backed up.</p>
    </div>
    <div class= "col-md-4">
        <h3>I have more questions. Who do I ask?</h3>
        <p>Please <a title="Contact" href="/contact/">contact us</a> and we can put together something that fits your specific needs.</p>
    </div>
    <div class= "col-md-4">
        <h3></h3>
        <p></p>
    </div>
</div>
