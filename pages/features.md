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
        <p>Our enterprise services and support programs ensure your success at every step along the management of your product licensing.</p>
    </div>
</div>

<div class="NL_block">
{% for feature in site.data.features %}
	{% if feature.name %}
		<div class="col-md-3 NL_feature">
			<h4>
				<i class="fa {{ feature.class }} NL_icon"></i> 
				{{ feature.name }}
			</h4>
			<p>{{ feature.discription }}</p>
		</div>
	{% endif %}
{% endfor %}
</div>

<div class="row"></div>
#### MISS A FEATURE?
Do you have a question or suggestion? <a href="/contact/">Please contact us</a>


<a href="https://netlicensing.labs64.com/app/v2/?lc=4b566c7e20&source=lmbox001" class="btn NL_banner_btn" role="button">Try Demo Now</a>
<a href="https://www.labs64.de/confluence/display/NLICPUB/Home" class="btn NL_banner_btn" role="button">Explore More</a>


## You may still have some questions, so here's our FAQs

#### Do I have to pay to use your service?
No. There is a Free Forever plan includes a NetLicensing account with unlimited products and API Access.

#### Are there any hidden cost or extra charges?
No. NetLicensing won’t charge you any setup fees or monthly fees if you are using a free plan.
The selected payment service provider may charge an internet gateway fee and/or a processing fee.

#### Do I need a credit card to sign up for the free plan?
No. We do not collect credit card information when you sign up for a free account.

#### Can I cancel anytime?
Yes! You can cancel your plan anytime you wish and you will not be charged.

#### What is Licensing eCommerce Platform? Shall I use it?
NetLicensing Shop is an innovative eCommerce solution which provides your customers licenses acquisition possibility for every available <a title="NetLicensing Licensing Models" href="http://l64.cc/nl09">licensing models</a>.
You may omit using of NetLicensing Shop and create all licensing entities via NetLicensing API instead.

#### Do you have an API? CLI? Libraries?
Yes. NetLicensing RESTful API documentation is available <a title="API" href="http://l64.cc/nl10">here</a>. You may also use the following <a title="NetLicensing client libraries" href="http://l64.cc/nl07">client libraries and examples</a> as a foundation for integrating NetLicensing in your code.

#### How secure is this?
NetLicensing uses industry standard SSL security. Your data is hosted in a secure hosting facility and regularly backed up.

#### I have more questions. Who do I ask?
Please <a title="Contact" href="/contact/">contact us</a> and we can put together something that fits your specific needs.
