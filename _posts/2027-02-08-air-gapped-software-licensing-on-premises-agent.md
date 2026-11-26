---
layout: post
title: "Air-Gapped Software Licensing: Agent and Offline Files"
description: "License software in an air-gapped network: NetLicensing Agent export and import, signed offline files, concurrent seats from Kubernetes, and staying compliant offline."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-air-gapped-licensing-hero.png
  alt: "Air-gapped software licensing with the NetLicensing Agent"
tags:
  - "Air-Gapped Licensing"
  - "On-Premises Licensing"
  - "Offline Licensing"
  - "NetLicensing Agent"
  - "Kubernetes"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-air-gapped-licensing-hero.png
    - /img/blog/netlicensing-air-gapped-agent-deployment.png
---

The security officer is polite and completely clear: nothing inside this network talks to the internet. Not for updates, not for telemetry and certainly not to ask whether a license is valid.

You can still license software there. You have to move the answer inside, and accept that it is only as fresh as the last time someone carried it across.

## Key takeaways

- Two routes work without a connection: a **signed offline file** per licensee, or the **NetLicensing Agent** on a local server.
- The Agent serves the same validation requests as the cloud, from assets you export and import.
- Some licensing models behave differently after a repeated import. Check yours first.
- Compliance offline is a procedure: scheduled transfers, records and a protected host.

![Diagram: assets are exported from the NetLicensing cloud with the Agent, carried as files into an isolated network, imported, and served by the Agent to CI runners, Kubernetes pods and workstations]({{ "/img/blog/netlicensing-air-gapped-agent-deployment.png" | relative_url }})

## Pick the route

| Situation | Route | Needs |
| --- | --- | --- |
| One machine, no local server | Signed offline validation file | Public key in your application |
| Many clients in an isolated network | NetLicensing Agent, offline mode | Select plan, a Java 8 runtime on the host |
| Floating seats without internet | NetLicensing Agent | A host the clients can reach |
| Usually online, short outages | Cached response until `ttl` | Nothing extra |

## Set up the Agent

On a machine with internet access, export the licensees the site needs. Option names are in the [Agent documentation](https://netlicensing.io/wiki/netlicensing-agent):

```bash
java -jar netlicensing-agent.jar --action=export-assets \
  --nlic.username=<vendor> --nlic.password=<password> \
  --licensees=<number1>,<number2> --serial-number=<smart card serial> --output=./transfer
```

Carry the files and the JAR into the isolated network through your approved transfer process. The files contain sensitive data. Then:

```bash
java -jar netlicensing-agent.jar --action=import-assets --input=./transfer
java -jar netlicensing-agent.jar --action=run-agent-offline --port=8080
```

The export can run without a smart card using `--without-card`, which removes a protection against cloning. The Agent creates its database in the working directory, so always start it from the same place and back that directory up.

Point your application's API base URL at the Agent. It does not encrypt traffic to clients, so put it behind a TLS reverse proxy, as in [Securing the Agent](https://netlicensing.io/wiki/securing-the-agent-with-ssl-tls). There is also a caching proxy mode, `run-agent`, which currently has limited support; do not use it in production.

## Concurrent seats from CI and Kubernetes

Pods and runners come and go, which suits [Floating](https://netlicensing.io/wiki/floating): each takes a seat under its own session ID and returns it. Set `NLIC_URL` to the Agent in this wrapper:

```sh
#!/bin/sh
# Take a floating seat for this replica, run the job, give the seat back.
set -eu
NLIC_URL="${NLIC_URL:-https://go.netlicensing.io/core/v2/rest}"
SESSION="${HOSTNAME}"          # the pod name in Kubernetes
MODULE="M-FLOAT"               # your Floating product module number

seat() {
  curl --silent --show-error --fail --user "apiKey:${NLIC_API_KEY}" \
    --header "Accept: application/json" \
    --data "productModuleNumber0=${MODULE}&sessionId0=${SESSION}&action0=$1" \
    "${NLIC_URL}/licensee/${LICENSEE}/validate"
}

seat checkOut | grep -Eq '"name" *: *"valid" *, *"value" *: *"true"' || { echo "no free seat" >&2; exit 1; }
trap 'seat checkIn >/dev/null || true' EXIT
"$@"
```

We tested the script against a mock of the documented API, not against an Agent. The checkout lifetime is your safety net: choose `maxCheckoutValidity` longer than a normal job, and repeat the check-out during long ones. If a pod is killed without its exit handler, the seat returns when the checkout expires.

NetLicensing does not publish a Helm chart for the Agent in the documentation we used. If you package it yourself, plan for a single instance with persistent storage for its database, and test restarts and restores.

## Know how re-imports behave

| Model | After importing again |
| --- | --- |
| Try & Buy | The trial may start over unless `startDate` was set before export |
| Subscription, Rental | Licenses without an explicit `startDate` lose the one set while running |
| Floating | Every session counts as checked in for up to `maxCheckoutValidity` |
| Pay-per-Use | Used quantities are lost, so avoid it with the current Agent release |
| Multi-Feature, Quota | No difference |

The Agent also does not support licensee auto-create.

> Offline licensing is a delivery schedule: decide who carries the next update, and when, before the first one leaves.

## Staying compliant without a network

- Agree how often assets are refreshed, and put it in the contract.
- Keep a record of each export: date, licensees, who transferred it.
- Run the Agent on a host you control; copied virtual machines can start extra instances.
- Use the smart card, which also stops counters being rolled back from an old snapshot.
- Watch the clock. Dated licenses trust it, so detect large jumps backwards.

A signed offline file is a snapshot. A renewal or revocation reaches the site only with a new file or a new import. Our [offline monetization guide]({{ "/blog/2026/09/30/monetize-offline-on-premises-software/" | relative_url }}) covers the commercial side.

## Questions people ask

### How do you manage software licenses in air-gapped environments?

Run a local license server fed by exported licensing data, or issue signed files, and schedule how updates are carried in.

### Do offline entitlements stay compliant?

They stay accurate as of the last transfer. Compliance depends on refreshing them on an agreed schedule and keeping records.

### Does the NetLicensing Shop work offline?

No. The Shop and the Management Console run in the cloud.

### Which plan includes the Agent?

The Select plan. See [pricing]({{ "/pricing/" | relative_url }}).

## Rehearse the transfer

Before the site visit, run export, transfer, import and restart on two of your own machines with networking disabled on the second. Time it, write it down and give that page to the customer. Then [talk to us]({{ "/contact/" | relative_url }}) about the Select plan.

<div style="text-align:center;margin:36px 0">
  <a href="{{ "/contact/" | relative_url }}" style="background:#E14817;color:#fff;padding:16px 40px;border-radius:6px;font-size:20px;font-weight:700;text-decoration:none;display:inline-block">Talk to us about on-premises licensing</a>
</div>

*Happy Licensing!*
