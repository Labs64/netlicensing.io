---
layout: page
title: "Getting Started"
description: "This step-by-step guide helps you to customize NetLicensing to your needs."
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

<!--<div class="col-md-12" >
	<h1 style="color: #444;"> Integration </h1>
	<h3> Integration of NetLicensing into your product has two aspects: </h3>
</div>

<div class="row NL_block">
	<div class="col-md-6">
		<h2>NetLicensing API</h2>
		<p>Implement calls to the NetLicensing API in your code. <a href="https://www.labs64.de/confluence/pages/viewpage.action?pageId=11010215">NetLicensing API reference</a> and <a href="https://www.labs64.de/confluence/display/NLICPUB/Client+Libraries+and+Sample+Code">examples</a> will help you. At minimum you need a call to the <a href="https://www.labs64.de/confluence/display/NLICPUB/Licensee+Services#LicenseeServices-Validatelicensee">validate</a> method of the licensee services.</p>
	</div>
	<div class="col-md-6">
		<h2>NetLicensing Shop</h2>
		<p>Provide a link to NetLicensing Shop in the UI of your product or forward the user to NetLicensing Shop URL by other means.
		The URL of NetLicensing Shop has the following format:</p>
		{% highlight ruby %}
		https://netlicensing.labs64.com/app/v2/content/shop.xhtml?shoptoken={token}
		{% endhighlight %}
		<p>_token_ must be obtained using <a href="https://www.labs64.de/confluence/display/NLICPUB/Token+Services">create token</a> service with tokenType=SHOP. The Generate token service returns also the complete shop URL for convenience.</p>
	</div>
</div> -->

<div class="panel-group NL_accordion" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel NL_accordion_panel">
    <div class="NL_accordion_heading" role="tab" id="headingOne">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
           <span>1</span> NetLicensing API
        </a>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body row NL_accordion_content">
      	<div class="col-md-5">
      		<img src="/img/netlicensing-promo-01.jpg" alt="NetLicensing Flex" style="width: 350px;padding-left:20px;">
      	</div>
        <div class="col-md-7">
        	<p>Provide a link to NetLicensing Shop in the UI of your product or forward the user to NetLicensing Shop URL by other means.The URL of NetLicensing Shop has the following format:</p>
				{% highlight ruby %}
				https://netlicensing.labs64.com/app/v2/content/shop.xhtml?shoptoken={token}
				{% endhighlight %}
			<p>_token_ must be obtained using <a href="https://www.labs64.de/confluence/display/NLICPUB/Token+Services">create token</a> service with tokenType=SHOP. The Generate token service returns also the complete shop URL for convenience.</p>
		</div>
      </div>
    </div>
  </div>

  <div class="panel NL_accordion_panel">
    <div class="NL_accordion_heading" role="tab" id="headingTwo">
      	<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
           <span>2</span> Collapsible Group Item #2
        </a>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body row NL_accordion_content">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>

  <div class="panel NL_accordion_panel">
    <div class="NL_accordion_heading" role="tab" id="headingThree">
      	<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
           <span>3</span> Collapsible Group Item #3
        </a>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body row NL_accordion_content">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>

  <div class="panel NL_accordion_panel">
    <div class="NL_accordion_heading" role="tab" id="headingFour">
      	<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="true" aria-controls="collapseOne">
           <span>4</span> Collapsible Group Item #4
        </a>
    </div>
    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
      <div class="panel-body row NL_accordion_content">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>

  <div class="panel NL_accordion_panel">
    <div class="NL_accordion_heading" role="tab" id="headingFive">
    	<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="true" aria-controls="collapseOne">
           <span>5</span> Collapsible Group Item #5
        </a>
    </div>
    <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
      <div class="panel-body row NL_accordion_content">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
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

