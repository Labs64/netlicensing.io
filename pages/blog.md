---
layout: page
title: "Journal"
description: "Software Licensing &amp; Protection made simple"
permalink: "/blog/"
tags:
- Blog
- Journal
- Announcement
---
<div class="row NL_banner">
	<div class="col-md-6 col-md-offset-3 NL_about_page">
		<h1>NetLicensing Journal</h1>
		<span>Software Licensing &amp; Protection made simple</span>
	</div>
</div>

<section id="articles" class="js-packery" data-packery-options='{ "itemSelector": ".card", "gutter": 10 }'>
    {% for post in site.posts %}
    <div class="card radius shadowDepth1">
        <div class="card__image border-tlr-radius">
            <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">
                <img src="{% if post.image.url %}{{ post.image.url }}{% else %}{{ site.blog_placeholder_image }}{% endif %}"
                     alt="{{ post.title }}" class="border-tlr-radius">
            </a>
        </div>
        <div class="card__content card__padding">
            <div class="card__meta">
                <ul>
                    <li>
                        <time datetime="{{ post.date | date: '%Y-%m-%d' }}"
                              title="{{ post.date | date: '%b %-d, %Y' }}">{{ post.date | date: "%b %-d, %Y" }}
                        </time>
                    </li>
                    <li>
                        <address class="author">&nbsp;by
                            {% if post.author.name %}
                              {% assign author_name = post.author.name %}
                            {% else %}
                              {% assign author_name = site.title %}
                            {% endif %}

                            {% if post.author.url %}
                              <a href="{{ post.author.url }}" target="_blank">{{ author_name }}</a>
                            {% else %}
                              {{ author_name }}
                            {% endif %}
                        </address>
                    </li>
                </ul>
            </div>
            <article class="card__article">
                <header>
                    <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
                </header>
                {{ post.excerpt }}
            </article>
        </div>
    </div>
    {% endfor %}
</section>

{% include google-search.html %}
