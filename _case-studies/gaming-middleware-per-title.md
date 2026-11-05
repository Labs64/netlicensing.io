---
layout: casestudy
title: "Gaming Middleware: Per-Title and Per-Seat Licensing"
description: "How a game middleware vendor can license its SDK per shipped title and per concurrent developer seat, and package Indie, Studio and Enterprise tiers as bundles."
permalink: "/case-studies/gaming-middleware-per-title/"
img: "/img/case-studies/netlicensing-case-study-gaming-middleware-per-title.png"
tags:
- Case Studies
- Use Cases
- Game Development
- Per-Title Licensing
- Tiered Pricing
industry:
- Game Development / Interactive Media
use-case:
- Per-title licensing
- Per-seat management
- Tiered pricing (indie/studio/enterprise)
favorite-feature:
- Licensing Model "Node-Locked"
- Licensing Model "Floating"
- Bundles
---

### Challenge

A company sells an audio engine for games: an SDK that ships inside the game plus an authoring tool that sound designers use while the game is being made. It used to charge one flat yearly fee per company.

That fee was too high for solo developers and too low for large studios. A studio with four games in production paid the same as an indie with one. The vendor wanted pricing that follows two things it could actually count: how many titles ship with the engine, and how many sound designers use the authoring tool at the same time.

### Approach

Each customer company is a licensee. The product has two metered modules:

```
Product: SoundForge Engine
├── Module "Titles" – Node-Locked, nodeSecretMode = CLIENT
│   └── 1 title: QUANTITY, quantity = 1
└── Module "Editor seats" – Floating, maxCheckoutValidity = 1800 s
    └── 1 seat: FLOATING, maxSessions = 1

Bundles:
  Indie       1 title  + 1 seat
  Studio      3 titles + 5 seats
  Enterprise  10 titles + 20 seats
```

**Titles.** [Node-Locked](https://netlicensing.io/wiki/node-locked) usually binds a license to a machine, but the "node secret" can be any stable identifier. Here it's the game's title ID, which the developer sets in the engine's project settings. When the authoring tool opens a project for the first time, it registers that title ID. Once the purchased number of titles is reached, a new title ID is refused, and the tool shows a clear message instead of opening the project. Builds of titles that are already registered keep working.

**Seats.** The authoring tool checks out a [Floating](https://netlicensing.io/wiki/floating) session when a sound designer opens it and checks in when they close it. Anyone at the studio can use the tool, as long as no more people use it at once than the studio has seats.

**Tiers.** Indie, Studio and Enterprise are [bundles](https://netlicensing.io/wiki/bundle-services): each one is a set of title and seat licenses sold for one price. A studio that needs a fourth title or a sixth seat buys a single extra license on top. Quantities from all active licenses add up.

The authoring tool validates both modules in one call:

```bash
curl -u apiKey:YOUR_API_KEY -H "Accept: application/xml" \
  -d "productModuleNumber0=M-TITLES" -d "nodeSecret0=com.example.skyforge" \
  -d "productModuleNumber1=M-SEATS" -d "sessionId1=ws-17:a.chen" -d "action1=checkOut" \
  https://go.netlicensing.io/core/v2/rest/licensee/STUDIO-0091/validate
```

The response shows whether this title is registered (or could still be) and whether a seat was free. Responses are signed and checked by the tool, so a patched local server can't fake them.

The runtime inside a shipped game doesn't check licenses at all. The check happens during development and when building. Players are never affected by the studio's license status.

#### Buying

Studios buy tiers and extras in the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop). The editor's "Manage licenses" button creates a shop token with the studio's licensee number, and for a tier it passes `bundleNumber`. Enterprise customers with a contract get their licenses created by the vendor's sales team in the [Management Console](https://ui.netlicensing.io).

When a game is cancelled before release, support clears its title ID from the license, which frees the slot for the next project.

### Results

- Pricing follows the number of shipped titles and concurrent seats, so a solo developer pays far less than a large studio.
- Studios can't quietly reuse one title license across several games, because each title ID takes a slot.
- Tiers are bundles, and growing beyond a tier is a single extra license, not a contract change.
- Shipped games never depend on the studio's licensing status.

Licensing an SDK or engine? See [Node-Locked](https://netlicensing.io/wiki/node-locked), [Floating](https://netlicensing.io/wiki/floating) or [contact us](https://netlicensing.io/contact/).
