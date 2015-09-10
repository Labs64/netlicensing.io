---
layout: compress
permalink: "/features-all/"
---
<body>
        {% for feature in site.data.features %}
        {% if feature.show != "Y" %}
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
        {% endif %}
        {% endfor %}
</body>
