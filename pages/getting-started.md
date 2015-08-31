---
layout: page
title: "Getting Started"
description: "Step-by-step guide helps you to integrate and customize NetLicensing to your needs"
permalink: "/getting-started/"
tags:
- getting started
- how-to
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>As easy as one, two, three!</h1>
        <span>NetLicensing makes setup and integration fast, safe and very simple. So you can get up and running in a few hours.</span>
    </div>
</div>

<div class="row panel-group NL_accordion" id="accordion" role="tablist" aria-multiselectable="true">
    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingOne">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"
               aria-controls="collapseOne">
                <span>1</span>Create NetLicensing account
            </a>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body row NL_accordion_content">
                <div class="col-md-4">

                    <div data-toggle="modal" data-target="#myModal">
                        <img src="/img/getting-started/getting-started-01.jpg" alt="Create NetLicensing account"/>
                        <i class="fa fa-search-plus NL-see-popup"></i>
                    </div>

                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">Create NetLicensing account</h4>
                                </div>
                                <div class="modal-body">
                                    <img src="/img/getting-started/getting-started-01.jpg" alt="Create NetLicensing account">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-7 col-md-offset-1">
                    <ul style="margin-left: 20px;">
                        <li>Sign-up for a <a href="https://netlicensing.labs64.com/app/v2/content/register.xhtml" title="It’s not just free to get started, it’s FREE forever!">free NetLicensing account</a> and or use our <a href="https://netlicensing.labs64.com/app/v2/?lc=4b566c7e20&source=lmbox001">demo account</a></li>
                        <li>Add your username, password, email and company name</li>
                        <li>Agree to the NetLicensing <i>Terms of Service</i> and <i>Privacy Policy</i></li>
                        <li>Enable <i>'Newsletter'</i> checkbox if want to be notified about NetLicensing announcements, news and promo actions</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingTwo">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true"
               aria-controls="collapseOne">
                <span>2</span>Configure product
            </a>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div class="panel-body row NL_accordion_content">
                <div class="col-md-4">
                    <img src="/img/getting-started/getting-started-02.jpg" alt="Configure product"
                         style="width: 350px;padding-left:20px;">
                </div>
                <div class="col-md-7 col-md-offset-1">
                    <ul style="margin-left: 20px;">
                        <li>Navigate to <i><a href="https://netlicensing.labs64.com/app/v2/content/vendor/demodata.xhtml">'Settings -> Demo Data'</a></i></li>
                        <li>Select <i>'Licensing Model'</i></li>
                        <li>(Optional) provide custom identifier</li>
                        <li>Click on <i>'Create'</i></li>
                    </ul>
                    Demo NetLicensing entities (Product, Product Module, License Templates, Licensee) will be created
                </div>
            </div>
        </div>
    </div>

    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingThree">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true"
               aria-controls="collapseOne">
                <span>3</span>Validate licensee
            </a>
        </div>
        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div class="panel-body row NL_accordion_content">
                <div class="col-md-4">
                    <img src="/img/getting-started/getting-started-03.jpg" alt="Validate licensee"
                         style="width: 350px;padding-left:20px;">
                </div>
                <div class="col-md-7 col-md-offset-1">
                    <ul style="margin-left: 20px;">
                        <li>Navigate to <i><a href="https://netlicensing.labs64.com/app/v2/content/vendor/licensee.xhtml">'Operate -> Licensee'</a></i></li>
                        <li>Identify newly created licensee and note <i>Licensee Number</i></li>
                        <li>Send first validation request (replace %LICENSEE_NUMBER%)</li>
                        <li>In case you are using your vendor account please provide <i>username:password</i> in the <i>--user</i> attribute</li>
                        <li>Alternatively you can use NetLicensing API <i><a href="http://io.labs64.com/NetLicensing-API/">test application</a></i>, which provides easy access to all NetLicensing functions</li>
                    </ul>
                    <span>
                    <u>Sample request:</u>
                    {% highlight ruby %}
$ curl --header "Accept: application/xml" --insecure --user demo:demo --request GET https://netlicensing.labs64.com/core/v2/rest/licensee/%LICENSEE_NUMBER%/validate
                    {% endhighlight %}
                    <u>Sample response:</u>
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
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingFour">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="true"
               aria-controls="collapseOne">
                <span>4</span>Integrate NetLicensing API
            </a>
        </div>
        <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
            <div class="panel-body row NL_accordion_content">
                <div class="col-md-4">
                    <img src="/img/getting-started/getting-started-04.jpg" alt="Integrate NetLicensing API"
                         style="width: 350px;padding-left:20px;">
                </div>
                <div class="col-md-7 col-md-offset-1">
                    <ul style="margin-left: 20px;">
                        <li>NetLicensing API allows you automate managing of all licensing entities (from <i>product</i> to <i>transaction</i>)</li>
                        <li>Please refer to the <i><a href="https://www.labs64.de/confluence/x/sQCo">NetLicensing Object Model</a></i> in order to better understand licensing entities relationship</li>
                        <li>Page <i><a href="/documentation/">For Integrators</a></i> will give you overview over all existing NetLicensing resources (Test App, RESTful API, JavaDoc, Client Libraries etc.)</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingFive">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="true"
               aria-controls="collapseOne">
                <span>5</span>Acquire licenses via NetLicensing Shop
            </a>
        </div>
        <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
            <div class="panel-body row NL_accordion_content">
                <div class="col-md-4">
                    <img src="/img/getting-started/getting-started-05.jpg" alt="Acquire licenses via NetLicensing Shop"
                         style="width: 350px;padding-left:20px;">
                </div>
                <div class="col-md-7 col-md-offset-1">
                    <ul style="margin-left: 20px;">
                        <li>Create shop token for the given licensee (replace %LICENSEE_NUMBER%)</li>
                        <u>Create token request:</u>
                        {% highlight ruby %}
$ curl --header "Accept: application/xml" --header "Content-Type: application/x-www-form-urlencoded" --insecure --user demo:demo --request POST https://netlicensing.labs64.com/core/v2/rest/token --data "tokenType=SHOP&licenseeNumber=%LICENSEE_NUMBER%"
                        {% endhighlight %}
                        <u>Create token response:</u>
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
                https://netlicensing.labs64.com/app/v2/content/shop.xhtml?shoptoken=00d08804-2d09-44c2-a853-7feffbfd2a17
            </property>
            <property name="licenseeNumber">INLIC-DEMO</property>
            <property name="vendorNumber">VDEMO</property>
        </item>
    </items>
</netlicensing>
                        {% endhighlight %}
                        <li><i><a href="https://www.labs64.de/confluence/x/rwCo">Create token</a></i> service returns also the complete <i>shopURL</i> for convenience</li>
                        <li>Provide a link to NetLicensing Shop (<i>shopURL</i>) in the UI of your product or forward the user to NetLicensing Shop URL by other means</li>
                        <li>The URL of NetLicensing Shop has the following format:</li>
                        {% highlight ruby %}
                        https://netlicensing.labs64.com/app/v2/content/shop.xhtml?shoptoken=%TOKEN_NUMBER%
                        {% endhighlight %}
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

            <form action="https://netlicensing.labs64.com/app/v2/content/register.xhtml" method="GET"
                  name="register" id="register"
                  novalidate>
                <button type="submit" class="NL_button button_main NL_dark_btn" style="max-width: 400px;">
                    <i class="fa fa-user-plus"></i>Start Your Free License Management
                </button>
            </form>
        </div>
    </div>
</div>

<div class="row NL_block">
    <h2 class="col-md-12">You may still have some questions, so here's our FAQs</h2>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Are there any hidden cost or extra charges?</h3>

        <p>No. NetLicensing won’t charge you any setup fees or monthly fees if you are using a free plan.
            The selected payment service provider may charge an internet gateway fee and/or a processing fee.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>Do I have to pay to use your service?</h3>

        <p>No. There is a Free Forever plan includes a NetLicensing account with unlimited products and API Access.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>Do you have an API? CLI? Libraries?</h3>

        <p>Yes. NetLicensing RESTful API documentation is available <a title="API" href="http://l64.cc/nl10">here</a>.
            You may also use the following <a title="NetLicensing client libraries" href="http://l64.cc/nl07">client
                libraries and examples</a> as a foundation for integrating NetLicensing in your code.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>Can I cancel anytime?</h3>

        <p>Yes! You can cancel your plan anytime you wish and you will not be charged.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>What is Licensing eCommerce Platform? Shall I use it?</h3>

        <p>NetLicensing Shop is an innovative eCommerce solution which provides your customers licenses acquisition
            possibility for every available <a title="NetLicensing Licensing Models" href="/licensing-models/">licensing
                models</a>.
            You may omit using of NetLicensing Shop and create all licensing entities via NetLicensing API instead.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3> Do I need a credit card to sign up for the free plan?</h3>

        <p>No. We do not collect credit card information when you sign up for a free account.</p>
    </div>
</div>

<div class="row NL_FAQ">
    <div class="col-md-5 col-md-offset-1">
        <h3>How secure is this?</h3>

        <p>NetLicensing uses industry standard SSL security. Your data is hosted in a secure hosting facility and
            regularly backed up.</p>
    </div>
    <div class="col-md-4 col-md-offset-1">
        <h3>I have more questions. Who do I ask?</h3>

        <p>Please <a title="Contact" href="/contact/">contact us</a> and we can put together something that fits your
            specific needs.</p>
    </div>
</div>
