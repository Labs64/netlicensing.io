---
layout: casestudy
title: "Wordpress Plugin: Credit Tracker"
description: "A simple way to show attribution credits for images used on your website."
permalink: "/case-studies/credit-tracker/"
img: "/img/case-studies/netlicensing-case-study-credit-tracker.png"
tags:
- Case Studies
- Use Cases
- Wordpress Plugin
- Credit Tracker
company:
- Labs64 GmbH
industry:
- Software as a Service
use-case:
- In-plugin engagement
- Product monitoring
favorite-feature:
- Product Usage
website: "https://wordpress.org/plugins/credit-tracker/"
---

### Overview

The Credit Tracker WordPress plugin enables website and blog owners to manage attribution for stock images and licensed photography. Web designers frequently use high-quality images from agencies like Flickr, iStock, and Adobe Stock to enhance visual appeal and engagement — but licensing agreements require proper attribution. Credit Tracker automates the tracking, formatting, and display of image credits across a website, eliminating the manual process of documenting photographer names, licenses, and attribution URLs.

The plugin is designed for small agencies, bloggers, and freelance designers who use numerous licensed images and need an easy way to maintain compliance without hiring a dedicated licensing coordinator. By integrating directly into WordPress Media Library, it requires minimal configuration and produces styled credit tables suitable for website display.

### Licensing Challenge

Website owners and designers face a compliance dilemma with licensed stock images:

**Attribution Tracking:** A typical website might use 50–200 licensed images across blog posts, landing pages, and portfolio galleries. Tracking which images require attribution, who created them, which license applies, and what format of credit is legally required becomes overwhelming when done manually via spreadsheets or post metadata.

**Formatting Complexity:** Different image agencies specify different attribution formats. Some require "Photo by [Name] via [Agency]," others require clickable links back to their portfolio, and some require embedded microdata (Schema.org) for legal validity. Keeping all these formats consistent across a website is tedious and error-prone.

**Compliance Risk:** Forgetting or incorrectly formatting a credit for even one licensed image can trigger a licensing violation claim, resulting in cease-and-desist letters or settlement demands. Small business owners and freelancers often don’t realize they’re non-compliant until months after the image was published.

**Manual Maintenance:** When a blog post is updated or an image is replaced, the corresponding credit must also be updated. Without a system, credits drift out of sync with actual images on the page.

### Chosen Licensing Model

Credit Tracker employs a **Feature-Based** approach where individual images are associated with metadata licenses. Each image added to WordPress Media Library can be tagged with:
- License type (Creative Commons, commercial stock, proprietary, public domain)
- Photographer/creator name and URL
- Source agency (e.g., Flickr, iStock)
- Required attribution format
- Publication date

This metadata becomes the source of truth for credit generation. When a post or page requests a list of image credits, the plugin queries all images used and automatically generates a properly formatted credits table.

### NetLicensing Configuration

While Credit Tracker is primarily a WordPress plugin (not a SaaS requiring complex NetLicensing setup), NetLicensing can optionally power premium features:

**Product Structure (optional NetLicensing integration):**
```
Product: Credit Tracker Pro
└── Module: Premium Features
    ├── Template: Auto-Format Credits (feature-based)
    ├── Template: Agency API Sync (feature-based, pulls updates from iStock/Flickr APIs)
    └── Template: Advanced Reporting (feature-based, generates compliance certificates)
```

**Use Case:**
The free version of Credit Tracker allows manual credit entry. Pro users can enable automatic credit format generation and optional API integrations with stock agencies to auto-populate photographer names and license info. NetLicensing controls which features are available per license type.

**Configuration (if using NetLicensing):**
1. Create Feature License Templates for "Auto-Format," "Agency API Sync," and "Compliance Reports"
2. Free users get all Feature licenses with `active=false`
3. Pro users (annual subscription) get Feature licenses with `active=true`
4. Plugin checks: `GET /licensee/{siteId}/validate` on admin load to determine which features to display

### Integration Walkthrough

**Basic Usage (No NetLicensing):**
```
Step 1: Upload Image to Media Library
  ↓ User right-clicks image → "Edit Media"
  ↓ Credit Tracker UI displays new fields:
     - Ident-Nr., Source, Owner/Author, Publisher, License, Link
  ↓ User fills: Owner="Jane Smith" | Source="Flickr" | License="CC-BY 4.0"
  ↓ Saves metadata with the image

Step 2: Insert [credit_tracker_table] Shortcode
  ↓ In a blog post, author adds: [credit_tracker_table]
  ↓ Shortcode finds all images used in post
  ↓ For each image, retrieves stored metadata
  ↓ Generates styled credits table:
     | Image | Photographer | License | Link |
     |-------|--------------|---------|------|
     | ... | Jane Smith | CC-BY 4.0 | flickr.com/photo/... |
  ↓ Table rendered at bottom of post with custom colors/fonts

Step 3: Styling
  ↓ Admin panel: Settings → Credit Tracker → Appearance
  ↓ Customize table colors, fonts, link styles
  ↓ Preview table as users will see it
  ↓ Plugin applies custom CSS to match website design
```

**Pro Tier with NetLicensing (optional):**
```
Pro User Enables Auto-Format:
  ↓ Plugin checks: GET /licensee/{siteId}/validate
  ↓ Response: featureAutoFormat.active=true (Pro license)
  ↓ User interface shows "Auto-Format from Template" button
  ↓ User selects template (iStock, Creative Commons, etc.)
  ↓ Plugin auto-fills format string for all images with that source
  ↓ No manual configuration per-image needed
```

### Licensee Management

Credit Tracker operates per WordPress site, not per user. Each installed instance of the plugin corresponds to one Licensee in NetLicensing:

```bash
licenseeNumber = WordPress site domain (e.g., "myblog-example-com")
```

When a site owner purchases a Pro license, the WordPress plugin stores the license key and validates it on each admin load:
```bash
GET /licensee/myblog-example-com/validate
```

If the site has a valid Pro license, premium features appear in the admin UI. If the license expires or is not found, the plugin reverts to free feature set and displays a renewal prompt.

### Edge Cases & Best Practices

- **Image deletion:** When an image is removed from Media Library, its credit entry is automatically deleted. No orphaned credits remain.
- **Shortcode caching:** Cache the generated credits table for 24 hours to avoid repeated queries for every page view. Invalidate cache when an image is added/updated.
- **Schema.org microdata:** Include structured data (`<span itemprop="creator">`, `<link rel="license">`) in the credits table to satisfy automated license validators used by some agencies.
- **Copyright year tracking:** Allow optional copyright year metadata. Auto-update year for current calendar year on publish; some licenses require current year in attribution.
- **Multiple image versions:** If a post uses multiple versions of the same image (thumbnail, featured, body), deduplicate credits in the table to avoid redundancy.
- **Export functionality:** Provide a CSV export of all credits on the site for site owners to share with legal teams or auditors if a licensing dispute arises.

### Results & Outcomes

- Website owners maintain consistent, legally compliant image attribution without manual tracking or spreadsheets
- Compliance risk reduced: automated credit generation prevents omitted or incorrectly formatted attributions
- WordPress admin experience simplified: intuitive Media Library UI makes credit entry part of the natural publishing workflow
- Styled credit tables enhance visual consistency across blog posts and landing pages
- Optional Pro tier provides agency API integrations for users managing 100+ licensed images
- Support for both manual and automated workflows allows plugin to serve solo bloggers (free) and agencies (Pro)
- Microdata support ensures credits are recognized by automated license compliance scanners
- Site owners gain peace of mind knowing all published images carry proper attribution
