---
layout: post
title: "Licensing AI Agents: Metering Tool Calls and Tokens"
description: "How to license AI agents: credits per MCP tool call or per token, per-agent entitlements, overage handling and a tested Python metering function with NetLicensing."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-ai-agent-licensing-hero.png
  alt: "Licensing AI agents: metering tool calls per customer"
tags:
  - "AI Agents"
  - "Agent Licensing"
  - "MCP"
  - "Token Usage"
  - "Usage-Based Licensing"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-ai-agent-licensing-hero.png
    - /img/blog/netlicensing-ai-agent-metering.png
---

At 02:00 an agent decides a task needs one more search, then another, then four hundred more. Nobody is watching. By breakfast the work is done and the bill is yours.

Agents do not tire or hesitate, so the limit has to live somewhere they cannot talk their way past. This article shows patterns for that. Nobody has settled them yet, and we say where the choices are yours.

## Key takeaways

- License the **customer**, then decide how its agents share the allowance.
- Meter at your server, where the tool call arrives, and reserve credits before running it.
- A credit can mean a tool call, a block of tokens or a finished task. NetLicensing counts integers.
- Treat NetLicensing as the entitlement record. Authentication stays with your identity system.

![Diagram: several agents of one customer call tools on your MCP server, which prices each call and reserves credits through NetLicensing validation against Pay-per-Use licenses]({{ "/img/blog/netlicensing-ai-agent-metering.png" | relative_url }})

## Choose the unit

| Unit | Good for | Weakness |
| --- | --- | --- |
| Tool call | Simple to explain and meter | Cheap and expensive calls cost the same unless weighted |
| Weighted tool call | Matches your cost better | Customers need a price list |
| Token block | Follows model cost closely | Hard to predict; you only know after the call |
| Completed task | Close to value | You must define "completed" and defend it |

For tool calls you know the price in advance, so **reserve** it. For tokens you learn the amount afterwards, so **report** it, and accept that the last call can overshoot.

## Give each agent an identity, or not

| Pattern | How | Use when |
| --- | --- | --- |
| Shared pool | One licensee for the customer, one Pay-per-Use module | The customer cares about total spend |
| One licensee per agent | Each agent has its own licensee number and credits | Each agent has a budget or an owner |
| Capped concurrency | A [Floating](https://netlicensing.io/wiki/floating) module, one session per running agent | You limit how many agents work at once |
| Capabilities | A [Multi-Feature](https://netlicensing.io/wiki/multi-feature) module | Some agents may use premium tools |

NetLicensing does not create agent or session identifiers and does not sign agents in. Your server decides which licensee a request belongs to, using credentials you trust, and never from text the model produced.

> Never let the agent tell you who is paying. Work that out from the credentials it connected with.

## Meter an MCP tool call

In the Model Context Protocol, a client asks a server to run a tool with a `tools/call` request. If that server is yours, it is a natural place to charge. NetLicensing does not meter MCP calls by itself; your code does, in a few lines:

```python
from nlic import validate

MODULE = "M-AGENT"  # your Pay-per-Use product module number

# What one call of each tool costs, in credits. You choose these numbers.
TOOL_COST = {"search_documents": 1, "summarize": 5}


class OutOfCredits(Exception):
    pass


def metered(licensee, tool, run):
    """Reserve credits first, run the tool only if the reservation succeeded."""
    result = validate(licensee, {"productModuleNumber0": MODULE, "reserveQuantity0": TOOL_COST[tool]})[MODULE]
    if result["valid"] != "true":
        raise OutOfCredits("%s needs %d credits, %s left" % (tool, TOOL_COST[tool], result["remainingQuantity"]))
    return run(), int(result["remainingQuantity"])
```

It uses the small [NetLicensing helper from the API licensing guide]({{ "/blog/2027/01/11/api-licensing-in-practice-keys-metering-entitlements/" | relative_url }}), shown there in full. Wrap your tool handler:

```python
text, left = metered(customer_id, "summarize", lambda: summarize(document))
```

We tested this against a mock of the documented validation response: enough credits runs the tool, and too few raises `OutOfCredits` without running it.

Credits are taken before the tool runs. If the tool then fails, decide whether to refund by adjusting the license, or to price in occasional failures. Also watch your [monthly API calls](https://netlicensing.io/wiki/faq-api-rate-limit): one validation per tool call adds up quickly, and reserving blocks of credits cuts the number of requests.

## Overage and runaway loops

Prepaid credits stop a loop when the balance reaches zero. That may be too late if the balance is large. Add your own per-hour cap and a step limit in the agent. Subscribe to `WARNING_LEVEL_CHANGED` with a [webhook](https://netlicensing.io/wiki/notifications) so a person hears about low balances, and offer a top-up through a shop link.

## Agents that manage licenses

There is a second kind of agent: one that administers your account through the [NetLicensing MCP server](https://netlicensing.io/wiki/netlicensing-mcp). Keep the two apart. Give a managing agent its own API key with the narrowest role, read-only for reporting, and require human approval for changes. Our earlier guide covers [safe access for agents]({{ "/blog/2026/07/08/giving-ai-agents-safe-access-to-licensing/" | relative_url }}).

## Questions people ask

### Does an AI agent need its own license?

Only if your terms say so. Decide whether you count agents, concurrent runs, units of work or features, and write it into the agreement.

### Can I bill per token?

Yes, if your server knows the token count. Map a block of tokens to one credit and report it with `usedQuantity`.

### What happens when credits run out mid-task?

With reservation, the next tool call is refused. Design the agent to report what it finished.

### Which plan includes Pay-per-Use?

Pay-per-Use is part of Select. Floating starts at Premium and Multi-Feature at Basic. See [pricing]({{ "/pricing/" | relative_url }}).

## Start with one paid tool

Pick the tool that costs you most, give it a price in credits and meter only that. Read a week of balances before you price the rest. If you want to talk through a design, [contact us]({{ "/contact/" | relative_url }}).

<div style="text-align:center;margin:36px 0">
  <a href="https://ui.netlicensing.io/#/register" target="_blank" rel="noopener" style="background:#E14817;color:#fff;padding:16px 40px;border-radius:6px;font-size:20px;font-weight:700;text-decoration:none;display:inline-block">Start with NetLicensing</a>
</div>

*Happy Licensing!*
