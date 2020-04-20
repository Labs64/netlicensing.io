---
layout: page
title: "Getting Started"
description: "Step-by-step guide helps you to integrate and customize NetLicensing to your needs"
permalink: "/getting-started/"
tags:
- getting started
- how-to
sitemap:
  images:
    - /img/getting-started/getting-started-01-big.png
    - /img/getting-started/getting-started-02-big.png
    - /img/getting-started/getting-started-03-big.png
    - /img/getting-started/getting-started-04-big.png
    - /img/getting-started/getting-started-05-big.png
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>As easy as one, two, three!</h1>
        <span>NetLicensing makes setup and integration fast, safe and very simple.<br/>So you can get up and running in a few hours.</span>
    </div>
</div>

<div class="row panel-group NL_accordion" id="accordion" role="tablist" aria-multiselectable="true">
    <!-- Step 1: Configure product -->
    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingTwo">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"
               aria-controls="collapseOne">
                <span>1</span>Configure product
            </a>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div class="panel-body row NL_accordion_content">
                <div class="col-md-4">

                    <div data-toggle="modal" data-target=".bs-example-modal-lg" data-target="#step2">
                        <i class="fa fa-search-plus NL-see-popup"></i>
                        <img src="{{ '/img/getting-started/getting-started-02.png' | prepend: site.baseurl | prepend: site.url }}" alt="Configure product"/>
                    </div>

                    <div id="step2" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">Configure product</h4>
                                </div>
                                <div class="modal-body">
                                    <img src="{{ '/img/getting-started/getting-started-02-big.png' | prepend: site.baseurl | prepend: site.url }}" alt="Configure product">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-7 col-md-offset-1">
                    <ul style="margin-left: 20px;">
                        <li>Navigate to <i><a href="https://ui.netlicensing.io/#/demo-data">'Demo Data'</a></i> page</li>
                        <li>Select <i>'Licensing Model'</i></li>
                        <li>(Optional) provide custom identifier</li>
                        <li>Click on <i>'Create'</i></li>
                    </ul>
                    Demo NetLicensing entities (Product, Product Module, License Templates, Licensee) will be created
                </div>
            </div>
        </div>
    </div>

    <!-- Step 2: Validate licensee -->
    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingThree">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true"
               aria-controls="collapseOne">
                <span>2</span>Validate licensee
            </a>
        </div>
        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div class="panel-body row NL_accordion_content">
                <div class="col-md-4">

                    <div data-toggle="modal" data-target=".bs-example-modal-lg" data-target="#step3">
                        <i class="fa fa-search-plus NL-see-popup"></i>
                        <img src="{{ '/img/getting-started/getting-started-03.png' | prepend: site.baseurl | prepend: site.url }}" alt="Validate licensee"/>
                    </div>

                    <div id="step3" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">Validate licensee</h4>
                                </div>
                                <div class="modal-body">
                                    <img src="{{ '/img/getting-started/getting-started-03-big.png' | prepend: site.baseurl | prepend: site.url }}" alt="Validate licensee">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-7 col-md-offset-1">
                    <ul style="margin-left: 20px;">
                        <li>Navigate to <i><a href="https://ui.netlicensing.io/#/customers">'Customers'</a></i> view</li>
                        <li>Identify newly created licensee and note <i>Licensee Number</i></li>
                        <li>Send first validation request (replace %LICENSEE_NUMBER%)</li>
                        <li>In case you are using your vendor account please provide <i>username:password</i> in the <i>--user</i> attribute</li>
                        <li>Alternatively you can use NetLicensing API <i><a href="https://netlicensing.io/NetLicensing-API/">test application</a></i>, which provides easy access to all NetLicensing functions</li>
                    </ul>
                    <div>
                    <em>Sample request:</em>
                    {% highlight bash %}
$ curl --header "Accept: application/xml" --insecure --user demo:demo --request POST https://go.netlicensing.io/core/v2/rest/licensee/%LICENSEE_NUMBER%/validate
                    {% endhighlight %}
                    <em>Sample response:</em>
                    {% highlight xml %}
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<netlicensing xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns="http://netlicensing.labs64.com/schema/context" ttl="2015-08-09T06:41:15.854Z">
    <infos/>
    <items>
        <item type="ProductModuleValidation">
            <property name="productModuleNumber">MNLIC-DEMO</property>
            <property name="valid">true</property>
            <property name="licensingModel">TryAndBuy</property>
            <property name="productModuleName">Module licensed under Try &amp; Buy LM</property>
            <property name="evaluationExpires">2015-09-07T06:38:16.809Z</property>
            <property name="evaluation">true</property>
        </item>
    </items>
</netlicensing>
                    {% endhighlight %}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Step 3: Acquire licenses via NetLicensing Shop -->
    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingFive">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true"
               aria-controls="collapseOne">
                <span>3</span>Acquire licenses via NetLicensing Shop
            </a>
        </div>
        <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
            <div class="panel-body row NL_accordion_content">
                <div class="col-md-4">

                    <div data-toggle="modal" data-target=".bs-example-modal-lg" data-target="#step5">
                        <i class="fa fa-search-plus NL-see-popup"></i>
                        <img src="{{ '/img/getting-started/getting-started-05.png' | prepend: site.baseurl | prepend: site.url }}" alt="Acquire licenses via NetLicensing Shop"/>
                    </div>

                    <div id="step5" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">Acquire licenses via NetLicensing Shop</h4>
                                </div>
                                <div class="modal-body">
                                    <img src="{{ '/img/getting-started/getting-started-05-big.png' | prepend: site.baseurl | prepend: site.url }}" alt="Acquire licenses via NetLicensing Shop">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-7 col-md-offset-1">
                    <ul style="margin-left: 20px;">
                        <li>Create shop token for the given licensee (replace %LICENSEE_NUMBER%)<br/>
                        <em>Create token request:</em>
                        {% highlight bash %}
$ curl --header "Accept: application/xml" --header "Content-Type: application/x-www-form-urlencoded" --insecure --user demo:demo --request POST https://go.netlicensing.io/core/v2/rest/token --data "tokenType=SHOP&licenseeNumber=%LICENSEE_NUMBER%"
                        {% endhighlight %}
                        <em>Create token response:</em>
                        {% highlight xml %}
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<netlicensing xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns="http://netlicensing.labs64.com/schema/context">
    <infos/>
    <items>
        <item type="Token">
            <property name="number">00d08804-2d09-44c2-a853-7feffbfd2a17</property>
            <property name="active">true</property>
            <property name="expirationTime">2015-08-16T09:12:05.065Z</property>
            <property name="tokenType">SHOP</property>
            <property name="shopURL">
                https://go.netlicensing.io/shop/v2/?shoptoken=00d08804-2d09-44c2-a853-7feffbfd2a17
            </property>
            <property name="licenseeNumber">INLIC-DEMO</property>
            <property name="vendorNumber">VDEMO</property>
        </item>
    </items>
</netlicensing>
                        {% endhighlight %}
                        </li>
                        <li><i><a href="https://netlicensing.io/wiki/token-services">Create token</a></i> service returns also the complete <i>shopURL</i> for convenience</li>
                        <li>Provide a link to NetLicensing Shop (<i>shopURL</i>) in the UI of your product or forward the user to NetLicensing Shop URL by other means</li>
                        <li>The URL of NetLicensing Shop has the following format:
                        {% highlight ruby %}
https://go.netlicensing.io/shop/v2/?shoptoken=%TOKEN_NUMBER%
                        {% endhighlight %}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12 NL_container">
        <div class="col-md-6 col-md-offset-3 NL_container_text">
            <h2>Signup for a NetLicensing account</h2>
            <span>Join the hundreds of happy NetLicensing customers.</span>

            <form action="https://ui.netlicensing.io/#/register" method="GET"
                  name="register" id="register"
                  novalidate>
                <button type="submit" class="NL_button button_main NL_dark_btn NL_wide_btn">
                    <i class="fa fa-user-plus"></i>Start Your Free License Management
                </button>
            </form>
        </div>
    </div>
</div>
