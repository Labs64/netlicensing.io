# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, served equally, each with its own path through the site (confirmed 2026-11-28):

- **Self-serve vendors and developers.** Founders, product managers and engineers at software vendors (ISVs, SaaS, desktop, mobile, embedded and IoT products) who need to license and sell their product. Their job is to choose a licensing approach, integrate it, and start selling without building licensing infrastructure. They usually start on the free Community plan or the 30-day Premium trial, then move to Basic or Premium.
- **Enterprise buyers.** Companies that need Select (an extension of Basic or Premium) or Enterprise, and the security, legal and procurement reviewers who assess them. Their job is to verify where NetLicensing runs, who can sign in, what the contract commits to and how it connects to their systems.

Developers and integrators are part of both audiences; `/getting-started/` and `/documentation/` (For Integrators) serve them.

## Product Purpose

Labs64 NetLicensing is a Licensing-as-a-Service (LaaS) platform. Software vendors use it to deliver, activate and validate licenses and to sell them online, through one REST API and a hosted shop, so they don't build or run their own license server. Success for a vendor: their product asks NetLicensing what a customer may use, customers buy and renew without manual work, and licensing follows the vendor's business model.

The website netlicensing.io exists to explain NetLicensing clearly, give each audience a clear path (sign up, integrate, compare plans, talk to sales), and earn trust with verifiable facts.

## Positioning

Lead with these four, all confirmed by the user:

1. **EU-operated.** Built and run by Labs64 GmbH in Munich, Germany; managed hosting on AWS in Ireland; a GDPR Data Processing Agreement for every vendor who asks.
2. **No license server of your own.** Licensing as a service through one API and a hosted shop. Self-hosting (Docker Compose or Kubernetes) and dedicated environments are available with Enterprise.
3. **Combinable licensing models.** Ready-to-use models (Try & Buy, Subscription, Discount, Multi-Feature, Pricing Table, Quota, Floating, Node-Locked, Pay-per-Use, Rental) that can be combined in one product, plus custom models.
4. **Since 2010, and AI-ready.** In service since 2010; an MCP server for AI agents, and usage metering for AI products with the Pay-per-Use and Quota models.

## Operating Context

- Vendors evaluate on the website, then work in the Management Console (https://ui.netlicensing.io) and the wiki (https://netlicensing.io/wiki/).
- Integration runs through the REST API (https://go.netlicensing.io/core/v2/rest), the OpenAPI specification and API Test Center (https://netlicensing.io/NetLicensing-API/), with a public demo account for trying it without signing up.
- End customers buy in NetLicensing Shop (https://go.netlicensing.io/shop/v2/) and manage licenses in the Customer Portal (https://my.netlicensing.io, Premium and up).
- Service status: https://status.netlicensing.io.
- Enterprise buyers go through a scoping call, technical pilot, security and legal review, offer and contract, then rollout. Calls are booked through Calendly; leads arrive through the Zoho CRM contact form.

## Capabilities and Constraints

- **Plans:** Community (free), Basic, Premium, Select; Enterprise is a separate offering. Select extends Basic or Premium and is not the same as Enterprise: never write that one is the other. Prices, limits and plan contents live only in `_data/pricing.yml` and `_data/licensingmodels.yml`; don't restate them from memory. Pricing, plan limits and promo terms are "ask first".
- **Capabilities** (each verifiable in the wiki or OpenAPI spec): REST API with OpenAPI spec; open-source client libraries (Apache 2.0) for Java, C#/.NET, PHP, JavaScript/Node.js, Kotlin and C++ (no Python library; Python calls the REST API); NetLicensing MCP server; webhook notifications (new licensee, new license, shop transaction, warning-level change); NetLicensing Shop with PayPal and Stripe; NetLicensing Gateway (open source; FastSpring connector only); integration guides for billing platforms, cloud marketplaces, CRMs, identity providers and automation tools; NetLicensing Agent for offline validation; offline validation files and cached responses (`ttl`); signed validation responses; EU VAT support (Basic and up); Customer Portal (Premium and up); 99.5% monthly uptime SLA with service credits (Select and Enterprise); SSO via OpenID Connect, audit log, source code escrow, self-hosting (Enterprise).
- **Not offered** (don't imply otherwise): license hierarchies, automatic "trial ends soon" events, generating machine fingerprints.
- **Facts rule:** every product claim must match the wiki (`../wiki/docs`), the OpenAPI spec (`Labs64/NetLicensing-API`) or the site's data files. If a claim can't be verified, leave it out or flag it.
- **No competitor mentions** on the websites for now: no comparison pages, price comparisons or posts naming rival licensing vendors. Platforms covered as integrations (payment and billing providers) are fine.
- **Terminology:** "NetLicensing" (one word), "Labs64", "LaaS", "licensee" (API) = "customer" (site copy), "Management Console", "NetLicensing Shop", "NetLicensing Agent".
- **SEO and GEO are key:** one keyword-led H1 per page, descriptive headings that read as answers, accurate `title`/`description`, `last_modified_at` on substantive changes, FAQ JSON-LD kept identical to the visible FAQ, and `llms.txt` kept in sync with product facts and positioning.

## Brand Commitments

- Name and spelling: Labs64 NetLicensing; "NetLicensing" as one word.
- Voice: professional, approachable and concrete. No hype, no filler, no exclamation-mark marketing. Show facts with a link to the evidence.
- The visual system is recorded in `DESIGN.md` ("The Warm Ledger").

## Evidence on Hand

- **No customer proof yet** (confirmed 2026-11-28): no customer names, logos, quotes or metrics may be shown. Don't fabricate any, and don't reuse `_data/testimonials.yml`.
- `_case-studies/` (41 entries) are illustrative scenarios, not real customers; never add outcome numbers to them.
- Verifiable proof to use instead: the SLA (https://www.labs64.com/legal/terms-of-service/netlicensing/service-level-agreement-1-1/), the DPA and Privacy Center, the `/trust/` page (`_data/trust.yml`, facts with evidence links), the open-source repositories on github.com/Labs64, the public wiki and changelog, the API Test Center and demo account, and the status page.

## Product Principles

1. **Facts with evidence over claims.** Every statement links to, or is checkable in, the wiki, spec, SLA, DPA or data files; missing proof is left out, not invented.
2. **Two clear paths.** A self-serve path (sign up free → integrate in three steps → choose a plan) and an enterprise path (review → call → pilot → contract) are both obvious from every main page.
3. **Show the mechanism.** Explain how licensing works (a validation call, a model, a shop token) instead of describing it in adjectives.
4. **EU and openness as trust.** Lead with where it runs, who runs it, open interfaces and the ability to leave (export, deletion, escrow).
5. **One source of truth.** Plans, models and features come from `_data/`; the site, the pricing FAQ, JSON-LD and `llms.txt` say the same thing.
