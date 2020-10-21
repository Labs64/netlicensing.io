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
        <span>Looking for a plan that fits your specific business needs?<br/>Our sales team can answer your questions, provide product demos,<br/>and create custom plans that fit your needs.</span>
    </div>
</div>

<!-- Contact Section -->
<section id="contact">
    <div class="container">
        <div class="row NL_block">
            <div class="col-lg-12 text-center">
                <h2>Get a Quote Today</h2>
                <p>Email us <a href="mailto:{{ site.email }}?subject=NetLicensing%20Quote">info@netlicensing.io</a>, <a href="" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/netlicensing/netlicensing-demo?primary_color=853E29'});return false;">book a 1-1 call</a> or submit the form, and we’ll be in touch right away.</p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 NL_form_dark">
                <form action="//formspree.io/{{ site.email }}" method="POST" name="sentMessage" id="contactForm"
                      novalidate>
                    <input type="hidden" name="_next" value="{{ site.url }}?utm_source=netlicensing.io_contact-sales&utm_medium=website&utm_campaign=netlicensing.io_contact-sales&utm_content=contact-sales"/>
                    <input type="hidden" name="_subject" value="NetLicensing Sales Contact">
                    <input type="text" name="_gotcha" style="display:none"/>

                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>NetLicensing Plan</label>
                            <select name="pricingplan" class="form-control form_dark" id="pricingplan" required
                                   data-validation-required-message="Please select a plan.">
                                <option value="" disabled="disabled" selected="selected">Please select a plan</option>
                                <option value="free">Community</option>
                                <option value="basic">Basic</option>
                                <option value="premium">Premium</option>
                                <option value="enterprise">Select</option>
                            </select>

                            <p class="help-block text-danger"></p>
                        </div>
                    </div>

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
                            <label>Company</label>
                            <input type="text" name="company" class="form-control form_dark" placeholder="Company" id="company"
                                   required data-validation-required-message="Please enter your company name.">

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
                        <div style="font-size:small;">
                            By clicking Send, you agree to our <a href="https://www.labs64.com/legal/privacy-policy/" target="_blank">Privacy Policy </a> and that we contact you via email to respond to your request.
                        </div>
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
