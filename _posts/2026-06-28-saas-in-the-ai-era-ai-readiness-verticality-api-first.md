---
layout: post
title: "SaaS in the AI Era: AI Readiness, Vertical Depth and API-First Design"
description: "SaaS isn't dying, but UI-only software is under pressure. What AI readiness, API-native design, event-first data and vertical depth mean in the age of agents."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-saas-ai-era-hero.png
  alt: "SaaS in the AI Era: a screen on the left connected to a network of API nodes on the right"
tags:
  - SaaS in the AI Era
  - AI Readiness
  - AI Agents
  - API-First
  - API-Native
  - Event-Driven Architecture
  - Vertical SaaS
  - Model Context Protocol
  - Observability
  - AI Pricing
  - Software Architecture
  - NetLicensing
  - Labs64
  - AuditFlow
sitemap:
  images:
    - /img/blog/netlicensing-saas-ai-era-hero.png
    - /img/blog/netlicensing-saas-ai-era-ui-first-vs-agent-ready.png
    - /img/blog/netlicensing-saas-ai-era-decision-and-execution.png
---

In early February 2026, software stocks fell hard. Coverage tied it to a set of new plugins for an AI agent product, aimed at legal, finance, sales and marketing work. An analyst at Jefferies reportedly coined a name for the mood: the "SaaSpocalypse." Estimates of the damage varied from hundreds of billions to close to a trillion dollars, depending on who counted and when.

Plenty of people took the obvious conclusion: if an agent can do the work, nobody needs the software. It's a tidy story, and it skips the interesting part. The software that's in trouble is the kind whose main value is a screen. The software that holds trusted data, enforces rules and exposes clean interfaces is in a different position, because an agent that acts needs something dependable to act on.

This article follows that thread through five questions: what "AI readiness" means, why APIs and events matter more than interfaces, what a data pipeline owes an agent, why vertical depth keeps winning arguments, and which risks arrive with autonomy.

## Key takeaways

- AI readiness is mostly backend work: data quality, contracts, events, controls and cost visibility.
- Agents consume APIs and event streams. A machine-readable contract is now a product feature.
- Domain-specific systems give agents context they'd otherwise have to guess.
- Autonomy brings new risks (excessive permissions, invisible decisions, runaway cost) that need design answers rather than policy memos.
- Vendors are experimenting with outcome-based and credit-based pricing, and no model has won yet.

![UI-first SaaS compared with agent-ready SaaS: a human uses a screen on one side, an agent uses a contract, events, a domain model and an audit trail on the other]({{ "/img/blog/netlicensing-saas-ai-era-ui-first-vs-agent-ready.png" | relative_url }})

## 1. From AI features to AI readiness

The first wave of AI in software was about features: a summarize button, a chat panel, a "draft with AI" action. They're quick to build and quick for competitors to copy, so they rarely last as a differentiator.

AI readiness is the harder question. Can your product's data, interfaces and controls support software that acts on its own? The stakes are visible in Gartner's June 2025 forecast that [over 40% of agentic AI projects will be canceled by the end of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027.){:target="_blank"}{:rel="noopener nofollow"}. Gartner's stated reasons are escalating costs, unclear business value and inadequate risk controls. It also warns about "agent washing," where vendors relabel chatbots and automation as agents, and estimates that only about 130 of the thousands of agentic AI vendors are real.

Look at that list again. Cost, value and risk. None of them says the model wasn't smart enough. They're all questions about what sits around the model: what it can reach, what it can spend, and how anyone knows what it did.

## 2. API-native and event-first architectures

A human uses your interface. An agent uses your API and reacts to your events. If those two are an afterthought, the product has no door for the thing that's about to become its busiest user.

### From API-first to API-native

"API-first" is common. In Postman's 2025 State of the API report, covering more than 5,700 respondents, [about a quarter of organizations called themselves fully API-first](https://www.postman.com/state-of-api/2025/){:target="_blank"}{:rel="noopener nofollow"}, and many more said they were partly there. The same survey found that 43% of fully API-first organizations earn more than a quarter of their revenue from APIs, against 16% of organizations that aren't API-first.

But an API that works for developers can still be a poor fit for agents. Postman found that only about 24% of developers were designing APIs with agents in mind, and 60% still designed mainly for humans. "API-native" is the stricter standard, and it has three parts.

**Machine-discoverable contracts.** A person can guess from a doc page. An agent can't. It needs typed schemas, predictable errors and stated rules, in a format a tool can read, such as an OpenAPI 3.1 description (which uses JSON Schema for its data models). The Model Context Protocol (MCP) adds a standard way to describe tools to a model. MCP now has a neutral home: Anthropic donated it to the Agentic AI Foundation at the Linux Foundation in December 2025, alongside goose and AGENTS.md.

A concrete example: the [NetLicensing REST API]({{ "/wiki/restful-api" | relative_url }}) is described in an OpenAPI 3.1 specification that lists, for every operation, which roles may call it, so an agent's permissions are readable before it makes a call. The [NetLicensing MCP server](https://github.com/Labs64/NetLicensing-MCP) wraps the same API as tools for MCP-compatible clients.

**Pipelines with interfaces.** If a data pipeline is one opaque job, nothing else can plug into it. Treating each stage (ingest, transform, enrich, serve) as a typed, versioned interface makes the pipeline something an agent or another service can call, test and replace. [AuditFlow](https://labs64.io/docs/modules/auditflow/), the audit-event router from the Labs64.IO ecosystem, follows this pattern: a service publishes an event with one REST call, and where the event goes is YAML configuration, so rerouting needs no rebuild and no restart.

**Data exhaust.** Each programmatic call leaves a trace: what was asked, by whom, with what result. Companies that capture it on purpose learn how their product is really used. That's a possible advantage, not a guaranteed one. It only counts if someone looks at the data. In a licensing system, for example, usage-based licenses store consumed credits as `usedQuantity` on each license, so consumption is recorded where entitlements live.

### Event-first as the default

Overnight batch jobs suit reports. They don't suit software that acts all day and needs to know what changed a minute ago. Polling works, but it burns calls to learn that nothing happened.

An event-first design publishes changes as they occur. The usual building blocks are change data capture (turning database changes into a stream), event sourcing (storing every change as an event, which doubles as an audit trail) and stream processors such as Apache Kafka, Redpanda and Apache Flink. For the contract side, AsyncAPI describes event interfaces the way OpenAPI describes HTTP ones.

Two smaller-scale examples. NetLicensing supports webhooks for four events: `LICENSEE_CREATED`, `LICENSE_CREATED`, `WARNING_LEVEL_CHANGED` and `PAYMENT_TRANSACTION_PROCESSED`, so an agent can react instead of polling. AuditFlow buffers incoming events on a message broker (RabbitMQ or Amazon SQS, by configuration) before processing, which keeps API latency flat during bursts.

Industry surveys point the same way, though with a vendor's bias. Confluent's 2025 report, based on 4,175 IT leaders, says 44% reported a fivefold return on data streaming investments. Treat that as a vendor survey and not an independent study.

## 3. Data pipelines: the part nobody demos

An agent is only as good as the data it's handed. If the data is late, inconsistent or unreachable, the agent fails in ways that look like model errors but aren't. Seen this way, data becomes a product with promises attached: freshness targets, schema rules and lineage.

| Requirement | What goes wrong without it | What it looks like |
|---|---|---|
| Streaming first | Agents act on yesterday's state | Unified pipelines that handle structured data, embeddings and audio |
| Schema stability | A renamed field breaks every consumer silently | Protobuf or Avro schemas with a registry, plus versioned APIs |
| Real-time context | The model answers from stale or missing facts | Retrieval pipelines where chunking and indexing are first-class, monitored stages |
| Lineage | Nobody can say where a wrong answer came from | Every record traceable to its source and transformations |

Schema drift deserves special attention. A human spots a changed column name and adapts. An agent keeps going with the old assumption. Contracts that can change only in declared, versioned ways are cheap insurance. NetLicensing's API is versioned in its path (`/v2`) and returns every entity in one generic envelope, an `item` with a type and named properties. AuditFlow takes the complementary route for incoming data: transformers normalize each source once, so downstream consumers see one shape.

## 4. Why vertical depth keeps winning arguments

A horizontal tool, such as a general CRM or a general database, hands an agent a blank canvas. Someone has to explain what the fields mean, which values are legal and what the business rules are. A vertical system comes with that explanation baked in.

**Context density.** In healthcare, the FHIR standard defines how patient, medication and encounter data are structured and exchanged through a REST API. In payments, ISO 20022 standardizes message formats. A system built on a domain model like that gives an agent fewer chances to misread the data.

**Data gravity and trust.** The system that owns a particular kind of record becomes the place other systems ask about it. A single authority makes an agent's output easier to predict and easier to check.

**Compliance by design.** Regulations such as HIPAA for US health data, GDPR for personal data of people in the EU and PCI DSS for payment cards shape how data may be stored and shared. Vertical products tend to build those constraints into the data model and the workflow. A generic tool leaves each customer to rebuild them.

Licensing is a small, clear example of a vertical domain. NetLicensing models it directly: products, product modules, license templates, licensees and licenses, with twelve [licensing models]({{ "/licensing-models/" | relative_url }}) on top. A Quota license, for instance, sums the quota of all active licenses and treats `-1` as unlimited, and a Floating license limits concurrent sessions. An agent that asks the validate call gets the result of those rules and doesn't have to learn them.

You'll see big numbers for vertical AI spending in analyst reports. We left them out, because we couldn't trace them back to a primary source. The argument stands without them.

## 5. The concerns that arrive with autonomy

### Observability, and what it can't tell you

When software acts by itself, "why did it do that?" has to have an answer. OpenTelemetry maintains semantic conventions for generative AI, including spans for agent and tool calls, so the same tracing used for services can follow an agent through its steps.

Tracing answers whether the system is healthy and where time went. A separate record answers who did what, and with what result, which is what compliance and security teams need. A dropped trace is a gap in a graph. A dropped audit event can be a compliance failure. Plan for both. The Labs64.IO documentation draws the same line for AuditFlow: OpenTelemetry answers "is my system healthy?", while AuditFlow answers "who did what, when, with what outcome?". AuditFlow is a router, not a store, so your own destinations keep the data. It masks, hashes or drops sensitive fields before anything is buffered, retries delivery over hours, parks failures in a replayable dead-letter queue, and emits OpenTelemetry traces, metrics and logs of its own.

### Shadow code

Agent logic that runs inside a vendor's platform can change data and spend money without the review normal software gets. OWASP's LLM Top 10 names the failure mode Excessive Agency: giving a model more functionality, permissions or autonomy than its task needs. Its recommended direction is least privilege: few tools, narrow permissions, and human approval for high-impact actions. In NetLicensing terms, that means giving each agent an API key with the narrowest of the five roles (from licensee-only up to admin), and the MCP server makes destructive calls two-step: it returns a preview and a single-use confirmation token that expires after five minutes.

### Separating the model from the decision

A sound pattern splits two jobs. The model interprets the request and proposes an action. A deterministic layer, which can be your own code, checks the rules and executes. The model never holds the authority. A license validation is a small instance of it: the agent asks, the server evaluates the licensee's licenses and answers `valid`, `quota` or `remainingQuantity`, and the product acts on that answer.

![The model interprets and proposes; a deterministic layer decides and executes; every action is logged]({{ "/img/blog/netlicensing-saas-ai-era-decision-and-execution.png" | relative_url }})

This split also gives enterprises a reason to keep the model-facing control layer in an environment they own, while the SaaS provides the deterministic execution underneath.

### Pricing under agent load

Per-seat pricing assumes a person per seat. Agents break that assumption, and vendors are experimenting in the open. Intercom charges $0.99 per resolution for its Fin agent. Salesforce has offered Agentforce per conversation and, more recently, through credits. Published comparisons list about $2 per conversation at one point, then $500 per 100,000 Flex Credits, with a typical action costing roughly 20 credits.

There's no settled answer yet. Outcome pricing is easy to explain and hard to define, since "resolved" means different things in different contracts. Credits are predictable for the vendor and abstract for the buyer. Seats still make sense where a human is the real user. Expect a mix for a while. On the tooling side, Named User and Floating licenses cover seat-style access, Quota sets a ceiling, and Pay-per-Use tracks credits, with `usedQuantity` to write off consumption afterward or `reserveQuantity` to hold credits before an expensive call. More on the pricing shift in [From Seats to Tokens]({{ "/blog/2026/02/17/ai-transformation-from-seats-to-tokens/" | relative_url }}).

## Questions people ask

**Is SaaS dying?** Not as a category. Pressure is greatest on products that offer little beyond an interface, and on pricing built around human seats. Products that hold trusted data and enforce rules have more reason to exist when agents arrive.

**What does "AI-ready" actually mean?** The product's data is clean and current, its interfaces are machine-readable, it publishes events, it limits what each agent can do, and it records what happened.

**What is the difference between API-first and API-native?** API-first means the API comes before the interface. API-native means the API is designed for machine readers, with typed schemas, predictable errors and documented permissions.

**Why do agentic AI projects get canceled?** Gartner points to escalating costs, unclear business value and inadequate risk controls.

## A short checklist

1. Can a tool read your API contract, including errors and permissions, with no human explaining it?
2. Can other systems learn about changes without polling?
3. If a field changes, does a version change with it?
4. Does each agent hold only the access it needs?
5. Can you reconstruct afterwards what an agent did and why?
6. Do you know what a runaway agent would cost you in an hour?

Answer "no" to a few of these and you have your roadmap. The model comes last.

## Where NetLicensing and AuditFlow fit

NetLicensing is the licensing and entitlement layer: it decides who may use what, and how much. AuditFlow is the audit layer: it records and routes what happened. Neither replaces your model, your tracing or your own judgment. Both are meant to be the dependable, machine-readable parts around an agent. You can try the licensing side in the [API Test Center](https://netlicensing.io/NetLicensing-API/), read the [AuditFlow documentation](https://labs64.io/docs/modules/auditflow/), or [talk to us]({{ "/contact/" | relative_url }}) about an agent rollout.
