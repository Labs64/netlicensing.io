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
        <span>NetLicensing makes setup and integration fast, safe and very simple.<br/>So you can get up and running in a few minutes.</span>
    </div>
</div>

<div class="row panel-group NL_accordion" id="accordion" role="tablist" aria-multiselectable="true">
    <!-- Step 1: Configure Product -->
    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingOne">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"
               aria-controls="collapseOne">
                <span>1</span>Configure Product
            </a>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
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
                                    <h4 class="modal-title">Configure Product</h4>
                                </div>
                                <div class="modal-body">
                                    <img src="{{ '/img/getting-started/getting-started-02-big.png' | prepend: site.baseurl | prepend: site.url }}" alt="Configure product">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-7 col-md-offset-1">
                    Create your individual <i><a href="https://ui.netlicensing.io/#/products">product</a></i> configuration with one or more product modules. Each module is licensed according to its <i><a href="/licensing-models/">licensing model</a></i>.<br/>
Not sure how to configure your product? - Start over by using one of the predefined <i><a href="https://ui.netlicensing.io/#/demo-data">'Demo Data'</a></i> configurations.
                </div>
            </div>
        </div>
    </div>

    <!-- Step 2: Validate Customer -->
    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingTwo">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true"
               aria-controls="collapseTwo">
                <span>2</span>Validate Customer
            </a>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
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
                                    <h4 class="modal-title">Validate Customer</h4>
                                </div>
                                <div class="modal-body">
                                    <img src="{{ '/img/getting-started/getting-started-03-big.png' | prepend: site.baseurl | prepend: site.url }}" alt="Validate licensee">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-7 col-md-offset-1">
                    NetLicensing uses a <i>Customer-centric</i> license management approach. In comparison to the <i>License-centric</i> (legacy) systems, all customer’s licenses are kept in one place, so you don’t need to deliver license files separately. Instead, using the same unique <i>'Licensee Number'</i> you can retrieve / validate all product features the customer is entitled for.<br/>
                    At minimum you need a call to the <i><a href="https://netlicensing.io/wiki/licensee-services#validate-licensee">validate</a></i> method of the licensee services.
                    <ul style="margin-left: 20px;">
                        <li>Send first validation request (replace %LICENSEE_NUMBER%)</li>
                        <li>Alternatively you can use an online <i><a href="https://netlicensing.io/NetLicensing-API/">API Test Center</a></i>, which provides easy access to all NetLicensing RESTful services</li>
                    </ul>
                    <div>
                    <em>Validate Request:</em>
                    {% highlight bash %}
$ curl -X POST --header 'Accept: application/xml' --header 'Content-Type: application/x-www-form-urlencoded' --insecure --user demo:demo 'https://go.netlicensing.io/core/v2/rest/licensee/%LICENSEE_NUMBER%/validate'
                    {% endhighlight %}
                    <em>Validate Response:</em>
                    {% highlight xml %}
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<netlicensing xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns="http://netlicensing.labs64.com/schema/context" ttl="2020-08-09T06:41:15.854Z">
    <infos/>
    <items>
        <item type="ProductModuleValidation">
            <property name="productModuleNumber">MNLIC-DEMO</property>
            <property name="valid">true</property>
            <property name="licensingModel">TryAndBuy</property>
            <property name="productModuleName">Module licensed under Try &amp; Buy LM</property>
            <property name="evaluationExpires">2020-09-07T06:38:16.809Z</property>
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

    <!-- Step 3: Acquire Licenses -->
    <div class="panel NL_accordion_panel col-md-10 col-md-offset-1">
        <div class="NL_accordion_heading" role="tab" id="headingThree">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true"
               aria-controls="collapseThree">
                <span>3</span>Acquire Licenses
            </a>
        </div>
        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div class="panel-body row NL_accordion_content">
                <div class="col-md-4">

                    <div data-toggle="modal" data-target=".bs-example-modal-lg" data-target="#step5">
                        <i class="fa fa-search-plus NL-see-popup"></i>
                        <img src="{{ '/img/getting-started/getting-started-05.png' | prepend: site.baseurl | prepend: site.url }}" alt="Acquire Licenses"/>
                    </div>

                    <div id="step5" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">Acquire Licenses</h4>
                                </div>
                                <div class="modal-body">
                                    <img src="{{ '/img/getting-started/getting-started-05-big.png' | prepend: site.baseurl | prepend: site.url }}" alt="Acquire Licenses">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-7 col-md-offset-1">
                    Automate licenses acquisition by using your established e-commerce solutions or an optional NetLicensing integrated shop, which provides a seamless online purchase experience, aligned with the deployed licensing models.<br/>
While using NetLicensing Shop you need to create <i><a href="https://netlicensing.io/wiki/token-services#create-token">Shop Token</a></i> and provide <i>'shopURL'</i> in the UI of your product or forward the user to NetLicensing Shop URL by other means.<br/><br/>
                        <em>Create Token Request:</em>
                        {% highlight bash %}
$ curl -X POST --header 'Accept: application/xml' --header 'Content-Type: application/x-www-form-urlencoded' --insecure --user demo:demo --data 'tokenType=SHOP&licenseeNumber=%LICENSEE_NUMBER%' https://go.netlicensing.io/core/v2/rest/token
                        {% endhighlight %}
                        <em>Create Token Response:</em>
                        {% highlight xml %}
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:netlicensing xmlns="http://www.w3.org/2000/09/xmldsig#" xmlns:ns2="http://netlicensing.labs64.com/schema/context">
    <ns2:infos/>
    <ns2:items>
        <ns2:item type="Token">
            <ns2:property name="number">976bde51-0014-4e2a-b97e-08ede6604054</ns2:property>
            <ns2:property name="active">true</ns2:property>
            <ns2:property name="expirationTime">2020-04-20T21:51:05.293Z</ns2:property>
            <ns2:property name="tokenType">SHOP</ns2:property>
            <ns2:property name="shopURL">https://go.netlicensing.io/shop/v2/?shoptoken=976bde51-0014-4e2a-b97e-08ede6604054</ns2:property>
            <ns2:property name="cancelURL">https://netlicensing.io/#cancel</ns2:property>
            <ns2:property name="successURL">https://netlicensing.io/#success</ns2:property>
            <ns2:property name="successURLTitle">Return to netlicensing.io</ns2:property>
            <ns2:property name="cancelURLTitle">Cancel and return to netlicensing.io</ns2:property>
            <ns2:property name="licenseeNumber">CUST-API-KEY-SIGN-01</ns2:property>
            <ns2:property name="vendorNumber">VDEMO</ns2:property>
        </ns2:item>
    </ns2:items>
</ns2:netlicensing>
                        {% endhighlight %}
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
