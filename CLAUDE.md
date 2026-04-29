# CLAUDE.md — netlicensing.io Website

This file provides Claude Code with context, conventions, and runbook instructions for working with the **netlicensing.io** marketing website.

## Project Overview

**netlicensing.io** is the public marketing and documentation website for Labs64 NetLicensing, a Licensing-as-a-Service (LaaS) platform. It is a static site built with **Jekyll** and deployed via **GitHub Pages**.

- **Production URL**: https://netlicensing.io
- **Management Console**: https://ui.netlicensing.io
- **GitHub Repo**: https://github.com/Labs64/netlicensing.io

---

## Tech Stack

| Layer | Technology |
|---|---|
| Static Site Generator | Jekyll (via `github-pages` gem, Jekyll 3.x compatible) |
| Ruby / Bundler | Ruby 3.1.x, Bundler 2.x |
| Templating | Liquid |
| Markup | Markdown (kramdown), HTML |
| Styling | SCSS (compiled by Jekyll), Bootstrap 3 grid |
| Syntax Highlighting | Rouge |
| Local Dev | Docker + Docker Compose |
| CI/CD | GitHub Actions → GitHub Pages |
| Content | Markdown flat files + YAML data files |

---

## Repository Structure

```
netlicensing.io/
├── _config.yml          # Main site configuration (URL, title, plugins, collections)
├── _config_dev.yml      # Dev overrides (URL → localhost:4000, analytics disabled)
├── _config_draft.yml    # Draft/staging overrides (URL → draft.netlicensing.io)
│
├── _posts/              # Blog posts (YYYY-MM-DD-slug.md) — published
├── _drafts/             # Blog drafts (not built in production)
├── _case-studies/       # Case study collection (layout: casestudy)
├── pages/               # Static pages (features, pricing, licensing-models, etc.)
│
├── _layouts/            # Jekyll layouts
│   ├── default.html     # Base layout (head, nav, footer)
│   ├── page.html        # Generic page wrapper
│   ├── post.html        # Blog post (sidebar with related posts)
│   ├── casestudy.html   # Case study (facts sidebar + content)
│   └── redirect.html    # HTTP meta-refresh redirect
│
├── _includes/           # Reusable partials (nav, head, footer, analytics, etc.)
├── _data/               # YAML data files (drives dynamic site sections)
│   ├── features.yml         # Feature cards on /features/
│   ├── licensingmodels.yml  # Licensing model cards on /licensing-models/
│   ├── pricing.yml          # Pricing table rows on /pricing/
│   ├── customplans.yml      # Custom plan cards on /pricing/
│   ├── usecases.yml         # Use case tiles on homepage
│   ├── testimonials.yml     # Testimonial quotes on homepage
│   ├── navigation.yml       # Top nav links
│   ├── services.yml         # Footer links (Company / Documentation / Legal)
│   ├── socialmedia.yml      # Social media links
│   └── images.yml           # Image attribution registry
│
├── _scss/               # SCSS source files
│   ├── _variables.scss  # Color/font variables
│   └── highlights.scss  # Code syntax highlighting
│
├── img/                 # Static images
├── js/                  # JavaScript (third-party + custom)
├── css/                 # Compiled CSS output
├── fonts/               # Web fonts
├── resources/           # Downloadable files (PDFs, infographics)
│
├── llms.txt             # LLM-readable site description (llms.txt standard)
├── robots.txt           # Search engine crawler rules
├── sitemap.xml          # Static sitemap scaffold (Jekyll generates dynamic one)
│
├── Gemfile              # Ruby gems
├── Dockerfile           # Jekyll Docker image
├── docker-compose.yml   # Local dev server
├── _serve_docker.sh     # Convenience script: docker compose up --build
├── _new_post.sh         # Scaffold a new draft blog post
└── .github/workflows/   # GitHub Actions CI
    └── netlicensing-jekyll-ci.yml
```

---

## Local Development

### Prerequisites
- Docker Desktop installed and running (preferred)
- OR Ruby 3.1.x + Bundler installed natively

### Start the dev server (Docker — recommended)

```bash
./_serve_docker.sh
# or
docker compose up --build
```

- Site: http://localhost:4000
- LiveReload: port 35729
- Builds with `--drafts` and `--future` flags (shows draft posts and future-dated posts)
- Uses merged config: `_config.yml` + `_config_dev.yml`

### Useful Docker commands

```bash
docker compose up --build          # Build image and start
docker compose up -d               # Start in background
docker compose logs -f             # Tail logs
docker compose down                # Stop
docker compose down -v             # Stop and clear bundle cache
docker compose exec netlicensing bundle exec jekyll doctor   # Jekyll diagnostics
docker compose exec netlicensing bundle exec htmlproofer ./_site  # HTML link checker
```

### Native Jekyll (without Docker)

```bash
bundle install
bundle exec jekyll serve --config _config.yml,_config_dev.yml --drafts --future --livereload
```

### Environment configs

| Config combo | Purpose |
|---|---|
| `_config.yml` only | Production build |
| `_config.yml` + `_config_dev.yml` | Local development (localhost, no analytics) |
| `_config.yml` + `_config_draft.yml` | Draft/staging preview (draft.netlicensing.io) |

---

## Deployment

Deployment is **fully automated** via GitHub Pages:

1. Push to any branch → GitHub Actions runs `.github/workflows/netlicensing-jekyll-ci.yml`
2. The CI job builds the site using `jekyll/builder:latest` Docker image with `--future` flag
3. GitHub Pages serves the `_site/` output from the `main` branch automatically

**No manual deployment steps are needed.** Simply push to `main` (or merge a PR) and the site deploys within ~2 minutes.

### CI pipeline

```yaml
# .github/workflows/netlicensing-jekyll-ci.yml
docker run jekyll/builder:latest jekyll build --future
```

> **Note**: The `htmlproofer` step is currently commented out in CI. Run manually with `bundle exec htmlproofer ./_site` to check broken links before merging.

---

## Content Authoring

### Writing a new blog post

**Recommended — use the scaffolding script:**

```bash
./_new_post.sh "Your Post Title Here"
```

This creates a pre-filled draft at `_drafts/YYYY-MM-DD-your-post-title-here.md`.

**Blog post front matter template:**

```yaml
---
layout: post
title: "Post Title"
description: "One-sentence description for SEO and social sharing"
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/your-image-filename.png
  hide: false          # set true to suppress hero image display
tags:
  - NetLicensing
  - Software Licensing
  - tag3
sitemap:
  images:
    - /img/blog/your-image-filename.png
canonical:             # leave blank OR set to canonical URL if duplicate content
---
```

**Rules:**
- File name format: `YYYY-MM-DD-slug.md` (date determines publish order and URL)
- Place in `_drafts/` while writing; **move to `_posts/`** when ready to publish
- Future-dated posts are built with `--future` flag (in production and CI) but only appear after their date on GitHub Pages
- Each post file in `_posts/` should have a matching `_301` redirect file if the URL ever changes (see pattern: `2024-01-15-what-is-software-licensing_301.md`)
- All images **must** have an entry in `_data/images.yml` for attribution tracking

### Publishing workflow

1. Run `./_new_post.sh "Title"` → creates `_drafts/YYYY-MM-DD-title.md`
2. Write content in Markdown
3. Add image to `/img/blog/` and register in `_data/images.yml`
4. Preview locally: `docker compose up --build` (drafts are included)
5. When ready: move file from `_drafts/` → `_posts/`
6. Commit and push to `main` → auto-deploys

### Front matter for future-dated posts
Set the date in the filename to a future date (e.g. `2026-12-25-...`). The post is included in all builds but only shows up publicly once the date is reached.

---

## Static Pages

Pages live in `pages/` with `layout: page` and a `permalink:` in front matter.

**Example front matter for a page:**

```yaml
---
layout: page
title: "Page Title"
description: "SEO description"
permalink: "/your-page-slug/"
tags:
  - tag1
sitemap:
  priority: 0.7        # 0.0–1.0; homepage is 0.8
  images:
    - /img/your-image.png
---
```

**Key pages and their source files:**

| URL | Source file |
|---|---|
| `/` | `index.md` |
| `/features/` | `pages/features.md` |
| `/features-all/` | `pages/features-all.md` |
| `/licensing-models/` | `pages/licensing-models.md` |
| `/membership-management/` | `pages/membership-management.md` |
| `/getting-started/` | `pages/getting-started.md` |
| `/documentation/` | `pages/documentation.md` |
| `/pricing/` | `pages/pricing.md` |
| `/case-studies/` | `pages/case-studies.md` |
| `/contact/` | `pages/contact.md` |
| `/demo-optin/` | `pages/demo-optin.md` |
| `/blog/` | `pages/blog.html` |

---

## Case Studies

Case studies are a Jekyll custom collection (`_case-studies/`).

**Front matter template:**

```yaml
---
layout: casestudy
title: "Company: Product Name"
description: "Short description of the case study."
permalink: "/case-studies/slug/"
img: "/img/case-studies/netlicensing-case-study-slug.png"
tags:
  - Case Studies
company:
  - Company Name
industry:
  - Industry Name
use-case:
  - Use case description
favorite-feature:
  - Feature Name
website: https://example.com
---
```

Content uses Markdown with `### Challenge`, `### Approach`, `### Results` section headings.

---

## YAML Data Files

Most dynamic content is driven by YAML data files in `_data/`. Edit these to update site content without touching layouts.

### `_data/features.yml`
Controls feature cards on `/features/` and `/features-all/`.
```yaml
- name: "Feature Name"
  description: "HTML description with optional <a> links."
  icon: "/img/features/icon-filename.png"
  show-default: true   # true = shown by default; omit/false = hidden behind "Show more"
```

### `_data/licensingmodels.yml`
Controls licensing model cards on `/licensing-models/`.
```yaml
- name: "Model Name"
  aliases:
    - Alias1
    - Alias2
  description: "HTML description."
  tags:
    - time      # used for filter buttons: time, volume, feature, user, concurrent
    - feature
  status: "AVAILABLE"
  img: '/img/licensing-model/licensing-model-slug.png'
  url: "https://netlicensing.io/wiki/slug"
```

### `_data/pricing.yml`
Controls pricing table rows on `/pricing/`.
```yaml
- name: "Row label"
  description: "Optional tooltip text."
  free: "value or Y/N"
  basic: "value or Y/N"
  premium: "value or Y/N"
  enterprise: "value or Y/N"
```
- `"Y"` renders a ✓ checkmark
- `"N"` renders an empty square
- Any other string renders as text

### `_data/usecases.yml`
Use case tiles on the homepage.
```yaml
- name: "Use Case Name"
  description: "One-sentence description (HTML allowed)."
```

### `_data/testimonials.yml`
Customer quotes on the homepage.
```yaml
- testimonial: "Quote text."
  author: "Full Name"
  role: "Job Title, Company"
```

### `_data/navigation.yml`
Top navigation bar items.
```yaml
- title: "Label"
  url: "/path/"
  icon: "fa-icon-class"    # optional Font Awesome icon
  class: "css-classes"     # optional extra CSS classes
```

### `_data/images.yml`
**Every image used on the site should have an entry here** for attribution compliance. Used by the `credit-tracker.html` include.
```yaml
- id: unique-image-id
  source: /img/path/to/image.png
  title: "Image Title"
  caption: "Caption text"
  license: https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
  author: Author Name
  publisher: Publisher Name
  creditlink: https://source-url.com
  exclude: true    # optional: set true to exclude from attribution display
```

---

## Redirects

When a URL changes, create a redirect file using the `redirect` layout:

```yaml
---
layout: redirect
permalink: /old-url/
redirect_to: /new-url/
sitemap:
  exclude: true
---
```

The naming convention is `original-filename_301.md` for the redirect counterpart of any renamed post or page.

---

## SEO & Analytics Conventions

- **`description`** in front matter → `<meta name="description">` and OG/Twitter tags
- **`tags`** in front matter → displayed on posts; also used for related posts logic
- **`canonical`** in front matter → overrides default canonical URL (use for syndicated/duplicate content)
- Google Analytics: configured via `google_analytics_tracking_id` in `_config.yml` (currently disabled)
- Yandex Metrika: `yandex_metrika_tracking_id` (currently disabled)
- Microsoft Clarity: `microsoft_clarity_tracking_id` (currently disabled)
- Zoho SalesIQ live chat: `zoho_salesiq_code` in `_config.yml` (active)
- Calendly demo booking: enabled via `calendly_enabled: true` in `_config.yml`; widget injected via `_includes/calendly.html`

---

## Layouts Reference

| Layout | Used for | Key features |
|---|---|---|
| `default` | All pages (base) | Head, nav bar, footer, analytics includes |
| `page` | Static pages | Minimal wrapper; content rendered directly |
| `post` | Blog posts | Hero image, date/author, related posts sidebar |
| `casestudy` | Case studies | Facts sidebar (company, industry, use-case), "More Case Studies" section |
| `redirect` | URL redirects | Meta-refresh + JS redirect; excluded from sitemap |

---

## Includes Reference

| Include | Purpose |
|---|---|
| `head.html` | `<head>` meta tags, SEO, OG, Twitter Card, canonical |
| `nav.html` | Top navigation bar (driven by `_data/navigation.yml`) |
| `footer.html` | Footer (driven by `_data/services.yml`, `_data/socialmedia.yml`) |
| `calendly.html` | Calendly widget script injection |
| `contact-crm.html` | Contact form (Zoho CRM embed) |
| `google-analytics.html` | GA4 script (conditional on config) |
| `cookieconsent.html` | Cookie consent banner |
| `jsonld.html` | JSON-LD structured data |
| `opengraph.html` | Open Graph meta tags |
| `twittercard.html` | Twitter Card meta tags |
| `credit-tracker.html` | Image attribution lookup from `_data/images.yml` |
| `disqus.html` | Disqus comments (conditional on config) |
| `addthis.html` | AddThis social sharing (conditional on config) |

---

## Common Tasks

### Add a new feature card
1. Open `_data/features.yml`
2. Add a new entry with `name`, `description`, `icon`
3. Set `show-default: true` to show immediately, or omit/`false` for the "show more" section
4. Add the icon image to `/img/features/`

### Add a new licensing model
1. Open `_data/licensingmodels.yml`
2. Add entry with `name`, `aliases`, `description`, `tags`, `status`, `img`, `url`
3. Add model image to `/img/licensing-model/`
4. Register image in `_data/images.yml`

### Update pricing table
1. Open `_data/pricing.yml`
2. Add or modify rows; use `Y`/`N` for boolean cells, or free-text/HTML for complex values

### Add a testimonial
1. Open `_data/testimonials.yml`
2. Add `testimonial`, `author`, `role` entry

### Create a redirect (URL change)
1. Create `pages/old-slug_301.md` (or `_posts/YYYY-MM-DD-old-slug_301.md`)
2. Use `layout: redirect`, set `permalink:` to old URL and `redirect_to:` to new URL
3. Add `sitemap: { exclude: true }`

### Disable/enable analytics
Edit `_config.yml` and set the relevant tracking ID:
```yaml
google_analytics_tracking_id: "G-XXXXXXXXXX"   # or leave blank to disable
```

---

## Content Style Guidelines

- **Voice**: Professional but approachable; technical but not overly academic
- **Audience**: Software developers, product managers, ISVs, SaaS founders
- **Brand terms**: Always write "NetLicensing" (one word, capital N and L); "Labs64" (no space); "LaaS" (Licensing-as-a-Service)
- **Avoid jargon** unless it is industry-standard licensing/SaaS terminology (which is fine to use)
- Blog posts should include **practical examples** where possible
- Posts should end with a **CTA** (e.g. link to Sign Up, Contact, or relevant wiki page)
- All external links in Markdown: use absolute URLs; add `target="_blank"` via HTML only where necessary (Liquid/Jekyll is preferred)

---

## Image Conventions

- Blog images: `/img/blog/netlicensing-[descriptive-slug].png` (or `.jpg`, `.gif`)
- Feature icons: `/img/features/snake_case_name.png`
- Licensing model images: `/img/licensing-model/licensing-model-[slug].png`
- Case study images: `/img/case-studies/netlicensing-case-study-[slug].png`
- Recommended blog image dimensions: **1200×630px** (social sharing / OG image standard)
- **Every image must be registered in `_data/images.yml`** with proper attribution metadata

---

## LLM-Readable Site Description

The file `llms.txt` at the root follows the [llms.txt standard](https://llmstxt.org/) and provides a comprehensive Markdown description of NetLicensing for AI assistants. Keep it up to date when:
- New features or licensing models are added
- Pricing plans change
- New major integrations ship (e.g. new MCP tools, payment providers)
- The product description or positioning changes significantly
