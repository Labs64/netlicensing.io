---
layout: page
title: "Features"
description: "World class features you need to effectively manage your product licenses"
permalink: "/features-all/"
tags:
- features
- FAQ
---
<body>
    {% for feature in site.data.features %}
    <div class="col-md-3 NL_feature">
        <figure class="hover_effect">
            <figcaption>
                <img src="{{ feature.icon }}" alt="{{ feature.name }}"/>

                <h3>
                    {{ feature.name }}
                </h3>

                <p>{{ feature.description }}</p>
            </figcaption>
        </figure>
    </div>
    {% endfor %}
</body>
