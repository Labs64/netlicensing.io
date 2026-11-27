# AGENTS.md — netlicensing.io

Instructions for AI coding agents (Claude Code, Codex, Cursor, Copilot, …) working in this repository. Human contributors: see `README.md` and `DOCKER_SETUP.md`.

**netlicensing.io** is the public marketing and documentation site of Labs64 NetLicensing, a Licensing-as-a-Service (LaaS) platform. It is a static **Jekyll 3.10** site (`github-pages` gem, whitelisted plugins only), built and deployed by GitHub Pages from the **`gh-pages`** branch.

- Production: https://netlicensing.io · Console: https://ui.netlicensing.io · Repo: https://github.com/Labs64/netlicensing.io
- Related repos: `Labs64/wiki` (product docs, served at `/wiki/`) and `Labs64/NetLicensing-API` (OpenAPI spec). Both are separate GitHub Pages projects.

Read this file first, then the section for your task. When this file and the code disagree, trust the code and fix this file.

---

## 1. Quick start

Prefer `just` (see `justfile`) or Docker. Local Ruby may not match the lockfile, so do not rely on a bare `bundle exec` on the host.

| Task | Command |
|---|---|
| Dev server (http://localhost:4000, drafts + future posts, LiveReload) | `just serve` or `./_serve_docker.sh` |
| Background / stop / logs | `just serve -d` · `just down` · `just logs` |
| One-off production build | `just build` (`jekyll build --config _config.yml`) |
| Jekyll diagnostics | `just doctor` |
| Link/HTML check | `just proofer` |
| New draft post | `just new-post "Title"` or `./_new_post.sh "Title"` |

Config combinations: `_config.yml` = production; `+ _config_dev.yml` = local (localhost URL, analytics off); `+ _config_draft.yml` = staging (draft.netlicensing.io).

### Verify before you claim "done"

1. YAML you touched parses (`ruby -ryaml -e 'YAML.load_file("_data/images.yml")'`, and the front matter of changed posts/pages).
2. The site builds: `just build`. CI uses `--future --strict_front_matter`, so a missing front-matter value fails it.
3. Look at the result in the dev server (http://localhost:4000), not only at the source. For visual work, compare with an existing similar page.
4. Internal links, images and scripts must resolve (HTMLProofer is blocking in CI).

> **Gotcha — build clobber.** The dev server serves `_site/`. A production build writes the same folder with `url: https://netlicensing.io`, so every absolute link on localhost then points to the live site. After any production build, rebuild for dev: `docker compose run --rm netlicensing bundle exec jekyll build --drafts --future --config _config.yml,_config_dev.yml`.

---

## 2. Boundaries

**Always**
- Keep brand spelling: "NetLicensing" (one word), "Labs64", "LaaS".
- Reuse existing layouts, includes, CSS classes and data files before creating anything new.
- Register every new image in `_data/images.yml`.
- Add a `_301` redirect stub for every post or page whose URL could be reached without the trailing slash or that you rename.
- Keep changes minimal and scoped to the request; mention anything you noticed but didn't change.

**Ask first**
- Backdating, scheduling or publishing posts (past dates go live with the next push).
- New layouts, new SCSS surfaces, new colours, new dependencies or Jekyll plugins.
- Changing `_config.yml`, `robots.txt`, the sitemap files or CI workflows.
- Pricing, plan limits, promo terms and any other commercial content.

**Never**
- Invent facts: metrics, customer results, API endpoints, parameters, features, prices (see §7 and §8).
- Rely on Jekyll 4 features or custom plugins. Production only runs the GitHub Pages whitelist.
- Change XML namespaces in `sitemap*.xml` / `feed.xml` from `http://` to `https://` (they are identifiers).
- Commit secrets, or force-push / rewrite history on `gh-pages`.
- Hard-code dev URLs (`localhost`) or the production URL into content; use `relative_url` / `absolute_url`.
- Commit or push unless asked. Don't add `_site/` changes or build artefacts to commits.

---

## 3. Deployment and CI

Push or merge to **`gh-pages`** → GitHub Pages builds with the `github-pages` gem (Jekyll 3.10) and deploys in about 2 minutes, served through CloudFront. There are no manual steps.

`.github/workflows/netlicensing-jekyll-lint.yml` reproduces the build (Ruby 3.3, `bundle exec jekyll build --future --strict_front_matter`) and then:
- runs `xmllint` on `sitemap.xml`, `sitemap_images.xml`, `feed.xml`;
- parses every JSON-LD block;
- runs HTMLProofer on internal links/images/scripts (**blocking**; `/wiki/` and `/NetLicensing-API/` are ignored) and on external links (informational).

---

## 4. Repository map

```
_config.yml · _config_dev.yml · _config_draft.yml   site config + overrides
index.md                      homepage
pages/                        static pages (pricing, features, enterprise, industries/…)
_posts/ · _drafts/            blog (published / work in progress)
_case-studies/                case-study collection
_layouts/                     default, page, post, casestudy, redirect
_includes/                    partials (head/SEO, nav, footer, plan-picker, promo-state, …)
_data/                        YAML that drives sections (see §9)
_scss/ · css/                 styles; css/netlicensing-style.scss is the entry point
js/                           third-party + custom (plan-picker.js, promo.js, netlicensing.js)
img/                          images (blog/, features/, licensing-model/, case-studies/)
llms.txt · robots.txt · sitemap*.xml · feed.xml   machine-readable surface
DESIGN.md                     design system: colours, typography, components — read before UI work
justfile · docker-compose.yml · Dockerfile · _new_post.sh · _serve_docker.sh
```

Key pages: `/` → `index.md`; `/pricing/` → `pages/pricing.md`; `/features/`, `/features-all/`, `/licensing-models/`, `/enterprise/`, `/getting-started/`, `/documentation/`, `/case-studies/`, `/contact/`, `/demo-optin/` → `pages/<slug>.md`; `/blog/` → `pages/blog.html`.

---

## 5. Design and UI work

- Read `DESIGN.md` first. Use the brand palette in `_scss/_variables.scss` (`$brand-primary #7B2A10`, `$brand-hover #E14817`, `$brand-orange #F2951C`, …), Roboto, Bootstrap 3 grid.
- **Build new or redesigned pages from existing sections**, not new layouts in brand colours. Copy markup from `pages/industries/*.md`, `pages/membership-management.md`, `pages/pricing.md` and `index.md`: banner (`row NL_banner`), highlights (`NL_industry_problem_row`), intro band, zig-zag details (`cbp-so-scroller`), pricing columns, filter buttons, `industry-case-studies.html`, closing CTA (`NL_form_light`, `NL_dark_btn`).
- Custom SCSS is for layout only, with no new colours or surfaces. Dark panels, stat strips, tabs and cream callouts were rejected as "doesn't fit".
- Compare the result with `/pricing/`, `/membership-management/` and an industry page in the browser before finishing.

---

## 6. Content model

### Blog posts

Front matter (`layout: post`):

```yaml
---
layout: post
title: "Keyword-led title"
description: "One sentence for SEO and social cards"
author: {name: NetLicensing, url: https://netlicensing.io}
image: {url: /img/blog/netlicensing-slug-hero.png, alt: "…", hide: false}
tags: [Software Licensing, NetLicensing]
sitemap:
  images: [/img/blog/netlicensing-slug-hero.png]
canonical:        # only for syndicated/duplicate content
last_modified_at: # set when a post is substantially updated
---
```

Rules: file name `YYYY-MM-DD-slug.md` (the date sets URL and order); draft in `_drafts/`, move to `_posts/` to publish; future-dated posts are built but appear only after their date; every post gets `YYYY-MM-DD-slug_301.md` (see §6 Redirects); all images are registered (§9).

### Pages

`pages/<slug>.md` with `layout: page`, `permalink: "/slug/"`, `description`, optional `tags` and `sitemap: {priority, images}`.

### Case studies

`_case-studies/`, `layout: casestudy`, fields `title, description, permalink, img, tags, company, industry, use-case, favorite-feature, website`; body uses `### Challenge`, `### Approach`, `### Results`. They are **illustrative scenarios**, not real customers. Never add outcome numbers unless the user supplies them, verify every API call against the OpenAPI spec and wiki, and don't add an "illustrative" disclaimer line. Console URL is `https://ui.netlicensing.io`.

### Redirects

```yaml
---
layout: redirect
permalink: /old-url/          # for post stubs: no trailing slash
redirect_to: /new-url/
sitemap: {exclude: true}
---
```
Naming: `original-filename_301.md`. Redirect stubs are noindexed automatically.

### Promo offers

The pricing page shows a time-boxed offer from the `promo` block of `_config.yml` (`_includes/promo-state.html`, `js/promo.js`). The markup is built until the end date and switched in the browser, so offers start and end without a rebuild. Offer *content* (what is promised in a post, banner or email) must be confirmed with the user, not inferred.

---

## 7. Blog post generation guide

Follow this whenever you write or rework posts.

**Facts first, no invention**
- Every product claim must match the wiki (`Labs64/wiki`, `docs/`: `guides/`, `licensing-models/`, `faq/`, `notifications.md`; checked out next to this repo it is `../wiki/docs`) or the OpenAPI spec (`Labs64/NetLicensing-API`, `v2.x/netlicensing.yaml`). Use exact parameter, property and event names (`ttl`, `usedQuantity`, `reserveQuantity`, `evaluationExpires`, `LICENSEE_CREATED`, `WARNING_LEVEL_CHANGED`, …). If the wiki isn't available, say which claims you couldn't verify.
- No invented statistics, market figures, customer results or features. If NetLicensing doesn't do something (e.g. license hierarchies, automatic "trial ends soon" events, generating machine fingerprints), say so or describe the honest workaround.
- Plan availability comes from `_data/pricing.yml` and `_data/licensingmodels.yml` (`plans`): Try & Buy, Subscription and Discount on every plan; Multi-Feature from Basic; Floating and Node-Locked from Premium; Pricing Table, Pay-per-Use, Quota, Rental and the NetLicensing Agent on Select only; Customer Portal from Premium. Re-check these files, since plans change.
- Campaign and offer posts: confirm dates, discounts, codes and terms with the user or the current offer description, and never promise bonuses, extras or conditions that weren't confirmed.

**Tone and structure**
- Humanized and concrete: open with a scene or a real problem, not a definition. Professional, approachable, no hype, no filler. Audience: developers, product managers, ISVs, SaaS founders.
- About 1,100–1,500 words for an educational post; shorter for announcements.
- NetLicensing-centric but not an ad: educate first, then one section near the end showing how NetLicensing does it. Include practical examples.
- SEO/GEO structure: keyword-led title and `description`; a **Key takeaways** list near the top; at least one comparison table; a **Questions people ask** section with short, self-contained answers; meaningful `tags`; `image.alt`.
- One short pull quote (`> …`, styled with an orange left border) per post; it must not repeat the sentence next to it.
- End with one clear CTA (pricing, contact or free sign-up) and *Happy Licensing!*.

**Links** (few, and each to the correct target)
- **Every external link opens in a new tab with `noopener nofollow`.** Markdown: `[text](https://example.com){:target="_blank"}{:rel="noopener nofollow"}`; HTML: `target="_blank" rel="noopener nofollow"`. This applies to all content (posts, drafts, pages, case studies, includes, data files). Exempt own links: `netlicensing.io` and its subdomains, `labs64.com`, `labs64.io`, `labs64.de`, `l64.cc`, `github.com/Labs64`.
- Wiki: absolute `https://netlicensing.io/wiki/<permalink>`; verify the permalink exists in the wiki repo.
- Site pages and other posts: `{{ "/path/" | relative_url }}`; verify the target exists.
- Sign-up: `https://ui.netlicensing.io/#/register` (promo posts append `?promoCode=<code>&utm_source=…&utm_campaign=…`; use `target="_blank" rel="noopener"`).
- Demo booking: the Calendly URL in `topnav_sticker_onclick` of `_config.yml`, not `/demo-optin/`.
- A CTA button in raw HTML sits in a `text-align:center` wrapper.

**Diagrams** (use the `diagram-design` skill; don't overshoot)
- One or two per post, only where they explain what text can't. Match type to argument: before/after architecture → architecture delta; process → steps; decision → flowchart; trend or balance → line/step chart; load against a limit → bar chart; stages → funnel; options side by side → panels.
- They must represent facts in the article and wiki; illustrative numbers must match the text.
- Style: Roboto, white paper, ink `#2d3142`, accent `#C4390F` on one or two focal elements, orthogonal connectors, masked labels, no shadows. Render PNG at 2× via headless Chrome, 1000 px wide.
- Run the skill's `scripts/verify_geometry.py` (and `verify-architecture-delta.py` for deltas) and look at the PNG before using it.
- Files `img/blog/netlicensing-<slug>.png`; descriptive alt text; list them under `sitemap.images` and in `_data/images.yml`.

**Hero image**: 1200×630, Roboto, brand colours, key words of the title in orange; registered in `_data/images.yml`; `image.alt` set.

**Workflow**: scaffold with `just new-post`; write in `_drafts/`; add images and registry entries; add the `_301` stub; validate YAML; preview in the dev server; move to `_posts/` only when the user wants it published. When filling a publishing gap, ask whether to backdate, schedule or publish today.

---

## 8. Facts and sources

- Product facts: wiki (`../wiki/docs` if checked out), OpenAPI spec, then `llms.txt`. Hosts: Console `https://ui.netlicensing.io`, API `https://go.netlicensing.io/core/v2/rest`, Shop `https://go.netlicensing.io/shop/v2/`, Customer Portal `https://my.netlicensing.io`, status `https://status.netlicensing.io`.
- Pricing and plan limits: `_data/pricing.yml` and `pages/pricing.md`. Don't restate prices from memory.
- When you can't verify a claim, leave it out or flag it in your reply. Don't guess.

---

## 9. YAML data files (`_data/`)

Edit these to change content without touching layouts.

| File | Drives | Notes |
|---|---|---|
| `features.yml` | `/features/`, `/features-all/` | `name`, `description` (HTML), `icon`, `show-default` |
| `licensingmodels.yml` | `/licensing-models/`, plan picker | `name`, `aliases`, `description`, `tags` (time, volume, feature, user, concurrent), `status`, `img`, `url`, `plans`, `summary`, optional `picker: false`. Keep `plans` consistent with the "Licensing Models" row of `pricing.yml` |
| `pricing.yml` | `/pricing/` rows | `Y` = ✓, `N` = empty box, other strings render as text. The plan picker reads "Active products" and "Customers" as limits, so keep those plain numbers. A row's optional `packs.<plan>: {size, price, max?}` shows an add-on under the value (`tall: true` gives a row with long values more height on desktop); the picker, pricing FAQ and FAQ JSON-LD use the "Customers" packs, and `llms.txt` repeats them by hand |
| `usecases.yml`, `testimonials.yml` | homepage tiles / quotes | `name, description` / `testimonial, author, role` |
| `navigation.yml`, `services.yml`, `socialmedia.yml` | top nav, footer, social links | |
| `images.yml` | attribution registry | `id, source, title, caption, license, author, publisher, creditlink`, optional `exclude: true`. **Every image gets an entry** |

Image folders and names: blog `img/blog/netlicensing-<slug>.png` (hero 1200×630), features `img/features/snake_case.png`, models `img/licensing-model/licensing-model-<slug>.png`, case studies `img/case-studies/netlicensing-case-study-<slug>.png`.

---

## 10. SEO, GEO and analytics

- SEO meta is computed once in `_includes/head.html` (`seo_title`, `seo_description`, `seo_image`, `canonical`, `seo_modified`) and reused by `opengraph.html`, `twittercard.html`, `dublincore.html`, `jsonld.html`.
- Front matter: `description`, `tags`, `canonical`, `noindex: true` (also drops the page from the sitemap), `last_modified_at` / `sitemap.lastmod` (→ `dateModified`, `article:modified_time`, `<lastmod>`), `image.alt`.
- JSON-LD is one linked `@graph`: Organization, WebSite, WebPage, BreadcrumbList everywhere; BlogPosting (posts), Article (case studies), SoftwareApplication (home), FAQPage (`/pricing/`).
- `robots.txt` explicitly allows AI search and assistant crawlers and lists all sitemaps.
- `llms.txt` follows the llms.txt standard. Update it when features or licensing models are added, plans or pricing change, major integrations ship (e.g. MCP tools, payment providers) or positioning changes.
- Analytics IDs live in `_config.yml` (`google_analytics_tracking_id`, `yandex_metrika_tracking_id`, `microsoft_clarity_tracking_id`; currently disabled). Zoho SalesIQ chat is active (`zoho_salesiq_code`). Calendly is enabled via `calendly_enabled: true` (`_includes/calendly.html`). Treat consent and analytics changes as "ask first".

---

## 11. Task playbooks

| Task | Steps |
|---|---|
| Add a feature card | `_data/features.yml` entry → icon in `img/features/` → register icon in `images.yml` |
| Add a licensing model | `_data/licensingmodels.yml` entry (incl. `plans`, `summary`) → image in `img/licensing-model/` → register it → keep `pricing.yml` row consistent → update `llms.txt` |
| Update pricing | `_data/pricing.yml` rows (`Y`/`N`/text) → check `licensingmodels.yml` `plans` and the plan picker → update `llms.txt` and the pricing FAQ in `pages/pricing.md` if affected |
| Add a testimonial | `_data/testimonials.yml` entry |
| URL change | create `*_301.md` stub (§6) → update internal links |
| Write a blog post | §6 + §7, then verify (§1) |
| Toggle analytics | set or clear the tracking ID in `_config.yml` (ask first) |

---

## 12. Reference

**Layouts**: `default` (head, nav, footer, analytics), `page`, `post` (hero image, date/author, related posts), `casestudy` (facts sidebar, more case studies), `redirect` (meta-refresh + JS, excluded from sitemap).

**Notable includes**: `head.html` (SEO/OG/Twitter), `nav.html` and `footer.html` (data-driven), `jsonld.html`, `credit-tracker.html` (image attribution from `images.yml`), `plan-picker.html` (+ `js/plan-picker.js`, `_scss/_pricing.scss`), `pricing-features.html`, `promo-state.html` (+ `js/promo.js`), `industry-case-studies.html`, `calendly.html`, `contact-crm.html`, `cookieconsent.html`.

**Tech stack**: Jekyll 3.10 via `github-pages`, Liquid, kramdown, Rouge, SCSS, Bootstrap 3 grid, Docker Compose for local dev, GitHub Actions → GitHub Pages.
