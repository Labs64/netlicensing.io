---
layout: page
title: "Search"
description: "Search NetLicensing articles, case studies and pages."
permalink: /search/
noindex: true
sitemap:
  exclude: true
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Search</h1>
        <span>Find articles, case studies and pages.</span>
    </div>
</div>

<div class="row NL_block">
    <div class="col-md-8 col-md-offset-2">
        {% include search-form.html %}
        <p class="NL_search_status" role="status" data-search-status></p>
        <ol class="NL_search_results" data-search-results data-index="{{ '/search.json' | relative_url }}"></ol>
        <noscript><p>Search needs JavaScript. Browse the <a href="{{ '/blog/' | relative_url }}">Journal</a> or the <a href="{{ '/case-studies/' | relative_url }}">case studies</a>.</p></noscript>
        <p>Looking for technical documentation? Search the <a href="https://netlicensing.io/wiki/">NetLicensing Wiki</a>.</p>
    </div>
</div>
<script src="{{ '/js/search.js' | prepend: site.baseurl }}?v={{ site.time | date: '%Y%m%d%H%M' }}" defer></script>
