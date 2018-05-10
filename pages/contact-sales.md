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
                <p>Email us <a href="mailto:{{ site.email }}?subject=NetLicensing%20Quote">netlicensing@labs64.com</a> or submit the form, and we’ll be in touch right away.</p>
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
                                <option value="free">FREE forever</option>
                                <option value="basic">Basic</option>
                                <option value="premium">Premium</option>
                                <option value="enterprise">Enterprise</option>
                            </select>

                            <p class="help-block text-danger"></p>
                        </div>
                    </div>

                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>First Name</label>
                            <input type="text" name="firstname" class="form-control form_dark" placeholder="First Name" id="firstname" required
                                   data-validation-required-message="Please enter your first name.">

                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Last Name</label>
                            <input type="text" name="lastname" class="form-control form_dark" placeholder="Last Name" id="lastname" required
                                   data-validation-required-message="Please enter your last name.">

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
                            <label>Phone</label>
                            <input type="tel" name="phone" class="form-control form_dark" placeholder="Phone" id="phone"
                                   required data-validation-required-message="Please enter your phone number.">

                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>Job Title</label>
                            <input type="text" name="jobtitle" class="form-control form_dark" placeholder="Job Title" id="jobtitle"
                                   required data-validation-required-message="Please enter your job title.">

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
                            <label>Website</label>
                            <input type="url" name="website" class="form-control form_dark" placeholder="Website" id="website"
                                   required data-validation-required-message="Please enter your website URL.">

                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="row control-group">
                        <div class="form-group col-xs-12 floating-label-form-group controls">
                            <label>How may we assist you?</label>
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
                                <i class="fa fa-paper-plane"></i>Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
