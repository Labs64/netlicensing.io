---
layout: post
title: "How to use NetLicensing with Java and Spring Security"
description: "How NetLicensing can be used to enhance user authorization flow with Spring Security."
image:
  url: /img/blog/authenticate-authorize-validate-framework.gif
tags:
  - AAV
  - Framework
  - Authenticate
  - Authorize
  - Validate
  - Spring Security
  - Java
  - JEE
  - Maven
author:
  name: Alexey Averikhin
  url: https://netlicensing.io
---

Recently we started a journey through user **A**uthentication-**A**uthorization and entitlements **V**alidation process with the article [What is Authentication-Authorization-Validation Framework](/blog/2020/09/24/authenticate-authorize-validate-framework/).

Now that we have a basic understanding of *AAV Framework* and what it brings to us, I think it’s time to see how we can apply this to enhance user authorization flow.

---

We will use [Spring Security demo project](https://github.com/spring-guides/gs-securing-web){:target="_blank"}{:rel="noopener nofollow"} as a good starting point. This demo project offers implementation of sample authentication and authorization process as well as simple UI (Spring MVC Framework).

These steps needed to integrate NetLicensing customer entitlements validation in the Java Spring Security project:

- Setup Spring Security Project
- Configure NetLicensing Product
- Integrate NetLicensing RESTful API

## Setup Spring Security Project

### Prerequisites

- Installed Java (>= 8.x)
- Installed Maven (>= 3.5)

Spring Security demo project can be cloned or forked on [GitHub](https://github.com/spring-guides/gs-securing-web){:target="_blank"}{:rel="noopener nofollow"}.

```shell
> git clone https://github.com/Labs64/gs-securing-web
```

After clone, you can verify your setup and preconditions by executing:

```shell
> cd complete
> ./mvnw spring-boot:run
```

First execution might take a bit more time, as all needed Maven project dependencies need to be downloaded in your local Maven repository.

If everything works well, you should see the following message:

```log
...
2020-11-13 10:04:43.948  INFO 5093 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
...
```

... and you can open the website in your browser at [localhost:8080](http://localhost:8080){:target="_blank"} (make sure you are using Tomcat port number from the log message).

To work with the java source code, you can use any available IDE; e.g. Eclipse, IntelliJ IDEA, VSCode, etc.

So, now your development environment is set up, and we can move on to the next step.

## Configure NetLicensing Product

As next, we will create NetLicensing product configuration, which will be used to specify customers entitlements.
You can create the *product*, *module* and *packages* configurations manually (you might find these [video tutorials](https://www.youtube.com/watch?v=LrfVsOVy73s&list=PLXfRIwjR9ZR5ZTNuLt7esvObY2BcIgpp1){:target="_blank"}{:rel="noopener nofollow"} helpful) or simply open [Demo Data](https://ui.netlicensing.io/#/demo-data){:target="_blank"} view and create one of the demo configurations for the chosen *Licensing Model*.

After this step is finished, you should have the following entities created:

### Product

*NetLicensing Product* corresponds to your specific product being offered to the end-customers.

![NetLicensing Product](/img/blog/netlicensing-springsecurity-product.png "NetLicensing Product"){:class="blog-center"}

For this demo, we recommend enabling *"Auto-create customer"* option, so every not-existing customer will be created automatically upon the first validation request.

### Module

*NetLicensing Module* represents a specific product licensing schema and configured using one of the supported [Licensing Models](/licensing-models/){:target="_blank"}.

![NetLicensing Module](/img/blog/netlicensing-springsecurity-module.png "NetLicensing Module"){:class="blog-center"}

**Did you know!**

One product in the NetLicensing can be configured using more than one licensing models, which is allowing you the highest level of customization accordingly to your business needs.

### Packages

*NetLicensing Package* is an individual product module configuration which is defining licensing packages offered to the end-customers.

![NetLicensing Packages](/img/blog/netlicensing-springsecurity-packages.png "NetLicensing Packages"){:class="blog-center"}

**Did you know!**

Modules & Packages configuration can vary depending on the chosen licensing model.

You need to note the following configuration data for the NetLicensing API integration described in the next chapter:

- Product Number
- Module Number

## Integrate NetLicensing RESTful API

NetLicensing offers a very flexible [RESTful API](https://netlicensing.io/wiki/restful-api){:target="_blank"}, which can be implemented with almost every programming language and technology stack. To speed up integration, a set of predefined [client libraries](https://netlicensing.io/wiki/client-libraries){:target="_blank"} is provided. In this demo, we will be using NetLicensing [Java Client](https://github.com/Labs64/NetLicensingClient-java){:target="_blank"}{:rel="noopener nofollow"} library.

### Maven dependency

NetLicensing Java Client library needs to be added as a project dependency in the `pom.xml` file

**[complete/pom.xml](https://github.com/Labs64/gs-securing-web/commit/3866ba6d7f600f97395af2169d95a6214bbfcc5a#diff-fcf3cb2ee99907216d3970ac8303b53d5aaa3a39458c9508370eddd65013a246){:target="_blank"}{:rel="noopener nofollow"}**
```xml
<dependency>
  <groupId>com.labs64.netlicensing</groupId>
  <artifactId>netlicensing-client</artifactId>
  <version>2.5.8</version>
  <exclusions>
    <exclusion>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
    </exclusion>
    <exclusion>
      <groupId>org.slf4j</groupId>
      <artifactId>jcl-over-slf4j</artifactId>
    </exclusion>
    <exclusion>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-log4j12</artifactId>
    </exclusion>
    <exclusion>
      <groupId>org.slf4j</groupId>
      <artifactId>jul-to-slf4j</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```

For this demo, we will slightly modify Spring Security configuration and allow every username with the same password as username (e.g. `guidechimp`:`guidechimp`)

**[complete/src/main/java/com/example/securingweb/WebSecurityConfig.java](https://github.com/Labs64/gs-securing-web/commit/3866ba6d7f600f97395af2169d95a6214bbfcc5a#diff-1b7b4731937297b5b9636d037c604c2b44268b7386e2df7214da316a95c72f89){:target="_blank"}{:rel="noopener nofollow"}**
```java
@Override
protected void configure(HttpSecurity http) throws Exception {
	http.authorizeRequests().antMatchers("/", "/home").permitAll().anyRequest().authenticated().and().formLogin()
			.loginPage("/login").permitAll().and().logout().permitAll();
}

@Bean
@Override
public UserDetailsService userDetailsService() {
	return new UserDetailsService() {

		@Override
		public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
			// Set password same as username
			return User.withDefaultPasswordEncoder().username(username).password(username).roles("USER").build();
		}

	};
}
```

Every logged-in user will be forwarded to the `/hello` page. We introduced a new controller class, which will receive username for the logged-in user and use this to validate users entitlements in the NetLicensing.

This class need to be changed with the specific configuration you made in the previous step:
- `NLIC_APIKEY` - NetLicensing API Key with the Role: `Licensee`; API Key can be created in the Management Console / [Settings](https://ui.netlicensing.io/#/settings){:target="_blank"} view.
- `NLC_PRODUCT` - use created *Product Number*
- `NLC_MODULE` - use created *Module Number*

After successful validation, the result will be added to the Spring MVC model object and shown on the `/hello` page.

**[complete/src/main/java/com/example/securingweb/NetLicensingController.java](https://github.com/Labs64/gs-securing-web/commit/3866ba6d7f600f97395af2169d95a6214bbfcc5a#diff-15645ddaef4ce0be9c5e6d84123e0f75c09538b19433c2514f3a0893f1b858ab){:target="_blank"}{:rel="noopener nofollow"}**
```java
@GetMapping("/hello")
public String greeting(Model model) throws NetLicensingException {

    // NetLicensing configuration
    // API Key - min role needed: Licensee
    final String NLIC_APIKEY = "ea624604-028e-458c-b5e5-85bc6620b890";
    // Product number
    final String NLC_PRODUCT = "P1S85TDRU-DEMO";
    // Product module number
    final String NLC_MODULE = "MTGTOW8EC-DEMO";

    // Initiate NetLicensing context
    final Context context = new Context();
    context.setBaseUrl("https://go.netlicensing.io/core/v2/rest");
    context.setSecurityMode(SecurityMode.APIKEY_IDENTIFICATION);
    context.setApiKey(NLIC_APIKEY);

    // Prepare validation request
    final ValidationParameters validationParameters = new ValidationParameters();
    validationParameters.setProductNumber(NLC_PRODUCT);
    // Send validation request; where current login username will be used as unique customer identifier
    ValidationResult validationResult = LicenseeService.validate(context, getUsername(), validationParameters);

    // Prepare model to be rendered on the hello page
    Composition moduleValidation = validationResult.getProductModuleValidation(NLC_MODULE);
    model.addAttribute("name", getUsername());
    model.addAttribute("moduleValidation", moduleValidation);

    return "hello";
}
```

Hello page was extended in order to show NetLicensing validation status and other relevant information.

**[complete/src/main/resources/templates/hello.html](https://github.com/Labs64/gs-securing-web/commit/3866ba6d7f600f97395af2169d95a6214bbfcc5a#diff-ed39a88c465ecb42461c9234f62a49fbc382a0c1f5ddde81a32a9cbe993256c2){:target="_blank"}{:rel="noopener nofollow"}**
```html
...
<hr>
<h2 th:inline="text">[[${moduleValidation.properties.get('productModuleName')}]]!</h2>
<p th:text="'- valid: ' + ${moduleValidation.properties['valid']}" />
<p th:text="'- expires: ' + ${moduleValidation.properties['expires']}" />
<p th:text="'RAW validation result: ' + ${moduleValidation}" />
...
```

Now you can start the project again and verify NetLicensing integration.

```shell
> ./mvnw spring-boot:run
```

## Conclusion

With the above simple adjustments, we added the possibility to *validate customers licenses* maintained in the NetLicensing system.

This *validation* process extends standard *authentication & authorization* steps and allows you to drive application behaviour based on the customer's entitlements and validation status.

---

We are always happy to receive your feedback as well as suggestions on how we can improve NetLicensing services. Get in touch with us [here](/contact/).

Source code: [Labs64/gs-securing-web](https://github.com/Labs64/gs-securing-web/commit/3866ba6d7f600f97395af2169d95a6214bbfcc5a){:target="_blank"}{:rel="noopener nofollow"}
