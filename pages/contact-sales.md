---
layout: page
title: "Contact Sales"
description: "Our sales team can answer your questions, provide product demos, and create custom plans that fit your needs"
permalink: "/contact-sales/"
tags:
- contact
- sales
- plans
- prospects
- quote
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Contact Sales</h1>
        <span>Looking for a plan that fits your specific business needs?<br/>Our sales team can answer your questions, provide product demos, and create custom plans that fit your needs.<br/>We can't wait to hear what you're working on.</span>
    </div>
</div>

<!-- Contact Section -->
<section id="contact">
    <div class="container">
        <div class="row NL_block">
            <div class="col-lg-12 text-center">
                <h2>Get a Quote Today</h2>
                <p>Email us <a href="mailto:{{ site.email }}?subject=NetLicensing%20Quote">netlicensing@labs64.com</a> or submit the form, and we’ll be in touch right away.</p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 NL_form_dark">
                <form action="//formspree.io/{{ site.email }}" method="POST" name="sentMessage" id="contactForm"
                      novalidate>
                    <input type="hidden" name="_next" value="{{ site.url }}"/>
                    <input type="hidden" name="_subject" value="NetLicensing Contact">
                    <input type="text" name="_gotcha" style="display:none"/>

                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Name</label>
                            <input type="text" name="name" class="form-control form_dark" placeholder="Name" id="name" required
                                   data-validation-required-message="Please enter your name.">

                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Email</label>
                            <input type="email" name="email" class="form-control form_dark" placeholder="Email" id="email"
                                   required data-validation-required-message="Please enter your email address.">

                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Message</label>
                            <textarea rows="5" name="message" class="form-control form_dark" placeholder="Message" id="message"
                                      required data-validation-required-message="Please enter a message."></textarea>

                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <br>

                    <div id="success"></div>
                    <div class="row">
                        <div class="form-group col-xs-12">
                            <button type="submit" class="NL_button button_main NL_dark_btn">
                                <i class="fa fa-paper-plane"></i>Send
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
