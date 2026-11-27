---
layout: post
title: "EU AI Act Record-Keeping and AI Agent Actions"
description: "What Article 12 of the EU AI Act requires for logging, which systems it covers, when it applies and where license data does and does not help."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-eu-ai-act-record-keeping-agent-actions-hero.png
  alt: "EU AI Act record-keeping duties for high-risk AI systems"
tags:
  - "EU AI Act"
  - "AI Agents"
  - "Compliance"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-eu-ai-act-record-keeping-agent-actions-hero.png
---

An agent approves a request at 2 a.m. In the morning someone asks what it did, on what basis and under whose account. If the answer is in nobody's logs, you have a problem, whether or not a law says so.

## Key takeaways

- Article 12 requires automatic logging for **high-risk** AI systems, not for every AI feature or agent.
- Providers and deployers keep those logs for at least six months where they control them, unless other law says otherwise.
- The high-risk dates moved: December 2, 2027 for Annex III systems and August 2, 2028 for Annex I.
- License checks record entitlement decisions at most. They are not AI Act logging.

## What Article 12 says

High-risk AI systems must technically allow events to be [recorded automatically](https://artificialintelligenceact.eu/article/12/){:target="_blank"}{:rel="noopener nofollow"} over the system's lifetime. The logs must support identifying situations that may present a risk or a substantial modification, post-market monitoring, and monitoring of operation by deployers. Remote biometric identification systems have extra minimum fields.

## Who keeps logs, and for how long

| Role | Duty | Retention |
|---|---|---|
| Provider ([Article 19](https://artificialintelligenceact.eu/article/19/){:target="_blank"}{:rel="noopener nofollow"}) | Keep automatically generated logs under its control | Appropriate to the purpose, at least six months |
| Deployer ([Article 26](https://artificialintelligenceact.eu/article/26/){:target="_blank"}{:rel="noopener nofollow"}) | Keep logs under its control | At least six months |

Other EU or national law, including data protection law, can set different periods. Financial institutions follow their own documentation rules.

## When it applies

An amendment known as the AI Omnibus entered into force on July 27, 2026. According to the [European Commission](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai){:target="_blank"}{:rel="noopener nofollow"}, rules for high-risk systems listed in Annex III now apply from **December 2, 2027**, and for systems in products covered by Annex I from **August 2, 2028**. Other parts of the Act apply earlier.

> Logging is cheap to design in and expensive to reconstruct.

## First question: are you high-risk?

Classification depends on the system's purpose, for example uses in biometrics, education, employment or critical infrastructure. A coding assistant or a support bot isn't automatically high-risk. Get a legal assessment before you build to a requirement you may not have.

## A useful logging baseline for agents

Even outside the Act, record for each action:

- when it happened, and which agent and account acted;
- the input or a reference to it;
- the tool called and the result;
- who approved it, where a person did;
- the model or configuration version.

Keep personal data to a minimum and set a retention period.

## Where licensing fits

A licensing service answers "may this customer, device or agent use this?" NetLicensing validation returns that answer per product module, and its [MCP server](https://netlicensing.io/wiki/netlicensing-mcp) lets agents manage licensing with scoped API keys. **NetLicensing does not provide AI Act record-keeping.** Log your agents' decisions in your own system, including the validation result you relied on.

## Questions people ask

**Does every AI agent need Article 12 logging?**
No. The article applies to high-risk AI systems.

**How long must logs be kept?**
At least six months where the provider or deployer controls them, unless other law provides otherwise.

**When do the high-risk rules apply?**
December 2, 2027 for Annex III and August 2, 2028 for Annex I, per the Commission.

This is general information, not legal advice.

## Start small

Pick one agent action and check that you can reconstruct it a week later. Then read [how to give agents safe access to licensing](https://netlicensing.io/wiki/netlicensing-mcp-security).

*Happy Licensing!*
