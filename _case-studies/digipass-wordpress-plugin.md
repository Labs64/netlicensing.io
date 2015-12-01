---
layout: page
title: "Wordpress Plugin: DigiPass"
description: "DigiPass is the best way for publishers and bloggers to monetize their digital content."
permalink: "/case-studies/digipass-wordpress-plugin/"
img: "netlicensing-case-study-digipass.png"
website: https://wordpress.org/plugins/digipass/
tags:
- Case Studies
- Use Cases
- Wordpress Plugin
- DigiPass
- Subscription
- PayWall
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>{{ page.title }}</h1>
        <span>{{ page.description }}</span>
    </div>
</div>

<!--![{{ page.title }}](/img/case-studies/{{ page.img }} "{{ page.title }}")-->

<div class="row NL_block">
	<div class="col-md-7 NL_case_study">
		<h3>Challenge</h3>
		<p>The idea for DigiPass was originally conceived when we were approached by a potential customer who had heard of NetLicensing and wanted to find a way to utilize the software to help monetise the written content that was hosted on their Wordpress website. They wanted a plugin that would enable them to establish a ‘paywall’ where customers would be able to see a limited amount of content but would have to pay for full access.</p>

		<p>They had been looking for a way to establish this by using a manual system of several plugins combined with user role restrictions to give access to users who had paid. They found this to be cumbersome and difficult to regulate as it required several individuals to monitor the payments, the subscribers and ensure that the content was correctly restricted.</p>

		<h3>Approach</h3>
		<img src="/img/case-studies/{{ page.img }}" alt="{{ page.title }}"/>
		<p>We developed DigiPass to help with just this kind of challenge. Wordpress is an increasingly popular content management system (CMS) and allows for easy integration of new features through the use of plugins which do not require detailed coding knowledge to configure. We strove to develop a tool that was easy to set-up and simple to use.</p>

		<p>DigiPass integrates with NetLicensing’s subscription model to allow developers to restrict access to posts and pages via WordPress. Once the customer had installed the plugin to their site, and configured it with their existing NetLicensing subscription management – they were then able to migrate all of their existing subscribers over to NetLicensing and assign them licenses through DigiPass.</p>

		<h3>Results</h3>
		<p>The results of this project were almost immediate! The amount of time that the client’s staff were saved was huge and this improved productivity led to them being able to reallocate resources into improving their content and pushing their product further. They saw a sharp rise in sales and also in retention. The feedback was their customers was very positive, as it meant that they were able to access more content, more easily than before and, as a result, they remained loyal to the service.</p>
	</div>
	<div class="col-md-4 col-md-offset-1 NL_case_facts">
		<h3>Case Facts</h3>
		<p>Industry</p><span>Online Publishing</span>
		<p>Use Case</p>
		<ul>
			<li>Subscription</li>
			<li>PayWall</li>
			<li>e-Commerce</li>
		</ul>
		<p>Favorite Feature</p>
		<ul>
			<li>Licensing Model "Subscription"</li>
			<li>NetLicensing Shop</li>
		</ul>
		<p>Website:</p><a href="{{ page.website }}">{{ page.website }}</a>
	</div>
</div>

<div class="NL_block row">
	<h2>Case Studies</h2>
	<p class="col-md-8 col-md-offset-2" style="text-align:center;">Whether you're looking for inspiration, business models, or precedents, the NetLicensing Case Studies are a perfect place to start.</p>
	{% for casestudy in site.case-studies %}
	    {% if casestudy.title %}
	        <a href="{{ casestudy.url }}" class="NL_cases_card col-md-6" title="Case Study: {{ casestudy.title }}">
	            <div>
	                <div class="view view-info col-md-5">
	                    <img class="view-img" src="/img/case-studies/{{ casestudy.img }}" alt="{{ casestudy.title }}" />
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

