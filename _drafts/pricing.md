---
layout: page
title: "Pricing"
description: "Whether you’re just getting started or are ready to bring licensing to your enterprise, there’s a NetLicensing level that’s right for you"
permalink: "/pricing/"
tags:
- Pricing
- Free
- Enterprise
---
<div class="row NL_banner">
    <div class="col-md-6 col-md-offset-3 NL_about_page">
        <h1>Pick your NetLicensing plan</h1>
        <span>Whether you’re just getting started or are ready to bring licensing to your enterprise, there’s a NetLicensing level that’s right for you.</span>
    </div>
</div>

<div class="row">
    <div style="padding:40px;">
        <style type="text/css">
            .tg {
                border-collapse: collapse;
                border-spacing: 0;
                border-color: #853E29;
            }

            .tg td {
                padding: 10px 5px;
                border-style: solid;
                border-width: 0px;
                overflow: hidden;
                word-break: normal;
                border-color: #853E29;
                color: #333;
                background-color: #fff;
                border-top-width: 1px;
                border-bottom-width: 1px;
            }

            .tg th {
                font-weight: normal;
                padding: 10px 5px;
                border-style: solid;
                border-width: 0px;
                overflow: hidden;
                word-break: normal;
                border-color: #853E29;
                color: #fff;
                background-color: #E14817;
                border-top-width: 1px;
                border-bottom-width: 1px;
                text-align: center;
            }

            .tg .tg-odd {
                background-color: #f9e1c4;
                vertical-align: top
            }

            .tg .tg-even {
                vertical-align: top
            }

            .tg .fa {
                font-size: 20px;
            }

            .tg .fa-check-square {
                color: #109E56;
            }

            .tg .fa-square-o {
                color: gray;
            }

            @media screen and (max-width: 767px) {
                .tg {
                    width: auto !important;
                }

                .tg col {
                    width: auto !important;
                }

                .tg-wrap {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }
            }</style>
        <div class="tg-wrap">
            <table class="tg" align="center">
                <tr>
                    <th>&nbsp;</th>
                    <th align="center"><strong>FREE forever</strong><br/>built for freelancers and start ups</th>
                    <th align="center"><strong>Enterprise</strong><br/>built for businesses and enterprises</th>
                </tr>
                {% for feature in site.data.pricing %}
                {% capture rowstyle %}{% cycle 'tg-odd', 'tg-even' %}{% endcapture %}
                <tr>
                    <td class="{{ rowstyle }}">{{ feature.name }}</td>
                    <td class="{{ rowstyle }}" align="center">
                        {% if feature.free == "Y" %}
                        <i class="fa fa-check-square"></i>
                        {% elsif feature.free == "N" %}
                        <i class="fa fa-square-o"></i>
                        {% else %}
                        {{ feature.free }}
                        {% endif %}
                    </td>
                    <td class="{{ rowstyle }}" align="center">
                        {% if feature.enterprise == "Y" %}
                        <i class="fa fa-check-square"></i>
                        {% elsif feature.enterprise == "N" %}
                        <i class="fa fa-square-o"></i>
                        {% else %}
                        {{ feature.enterprise }}
                        {% endif %}
                    </td>
                </tr>
                {% endfor %}
                <tr>
                    <td>&nbsp;</td>
                    <td align="center">
                        <div class="show-more" style="padding: 5px 0 10px 0;">
                            <a href="https://netlicensing.labs64.com/app/v2/content/register.xhtml"
                               class="NL_button button_main NL_dark_btn">Register Now</a>
                        </div>
                    </td>
                    <td align="center">
                        <div class="show-more" style="padding: 5px 0 10px 0;">
                            <a href="/contact" class="NL_button button_main NL_dark_btn">Contact Us</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
