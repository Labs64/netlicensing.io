---
layout: casestudy
title: "Mobile Game Studio: In-Game Purchases and DLC Monetization"
description: "How a game studio can keep players' unlocks, season passes and in-game currency on the server with NetLicensing, so purchases follow the player across mobile and PC."
permalink: "/case-studies/gaming/"
img: "/img/case-studies/netlicensing-case-study-gaming.png"
tags:
- Case Studies
- Use Cases
- Game Development
- In-App Purchases
- DLC Management
industry:
- Game Development / Mobile Gaming
use-case:
- In-game purchases
- DLC and expansion content
- Cross-platform entitlements
- Consumable items
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Subscription"
- Licensing Model "Pay-per-Use"
---

### Challenge

A small studio makes a free-to-play fantasy RPG for iOS, Android and Windows. It earns money from character packs, story expansions, a seasonal pass and gems, the in-game currency.

What a player owned used to live in the game client, checked against app store receipts on the device. That had three side effects:

- A player who bought a character on the phone didn't have it on the PC.
- Modified clients unlocked content without paying.
- Every new pack or seasonal item needed a client update and an app store review.

The studio wanted the server to be the only place that knows what a player owns, whatever the platform.

### Approach

Each player account is a licensee. The game server, not the client, talks to NetLicensing.

```
Product: Realms (licenseeAutoCreate = true)
├── Module "Content" – Multi-Feature
│   └── FEATURE templates: CHAR-DRAGONRIDER, CHAR-SHADOWMAGE, EXP-FROSTLANDS, ...
├── Module "Season pass" – Subscription
│   └── Season 7: TIMEVOLUME 90 DAY
└── Module "Gems" – Pay-per-Use
    └── Gem packs: QUANTITY 100, 550, 1200
```

- **Characters and expansions** are [Multi-Feature](https://netlicensing.io/wiki/multi-feature) licenses. Each template number is the content ID the game uses. A new pack is a new template, and the game reads its ID from the validation result, so it doesn't need a client release if the assets ship through the game's content download.
- **The season pass** is a [Subscription](https://netlicensing.io/wiki/subscription) that runs for the length of the season.
- **Gems** are a [Pay-per-Use](https://netlicensing.io/wiki/pay-per-use) balance. Buying gems adds a license with that quantity. Spending them reports `usedQuantity`.

#### Where purchases come from

Mobile purchases still go through the App Store and Google Play, as the platforms require. The game server verifies the store receipt as before. What changes is the next step: instead of trusting the device, the server records the purchase in NetLicensing:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "licenseeNumber=PLAYER-7718203" \
  -d "licenseTemplateNumber=CHAR-DRAGONRIDER" \
  -d "storeReceipt=GPA.3344-5566-7788" \
  https://go.netlicensing.io/core/v2/rest/license
```

`storeReceipt` is stored as a [custom property](https://netlicensing.io/wiki/custom-properties), so support can match a license to the original store transaction. On Windows, where the studio sells directly, the game opens the [NetLicensing Shop](https://netlicensing.io/wiki/netlicensing-shop) with a shop token for the player, and the license is created by the purchase itself.

#### When a player logs in

The game server validates the player once per session and keeps the result until its `ttl`:

```bash
curl -u apiKey:SERVER_API_KEY -H "Accept: application/json" \
  -d "productNumber=REALMS" \
  https://go.netlicensing.io/core/v2/rest/licensee/PLAYER-7718203/validate
```

The response lists every character and expansion with `valid=true` or `false`, the season pass with `valid` and `expires`, and the gem balance as `remainingQuantity`. The same answer goes to the phone and the PC, so a character bought on one is there on the other.

Spending gems happens on the server. Before the server confirms a gem purchase in the game, it checks the balance and reports the spend in the same call (`usedQuantity0=...`). A modified client can't spend gems it doesn't have.

#### Refunds

When a store refund notice arrives, the server sets the matching license to `active=false`. The content disappears from the player's account at the next login.

### Results

- What a player owns lives on the server, and every platform sees the same answer.
- Modified clients can't unlock content or create gems, because the decision is made from server-side data.
- New characters and expansions are templates in the [Management Console](https://ui.netlicensing.io), with no client update for the licensing part.
- App store rules are respected. The stores still take the mobile payments, and NetLicensing holds the entitlements.

Making games with paid content? Read about [Multi-Feature](https://netlicensing.io/wiki/multi-feature) or [contact us](https://netlicensing.io/contact/).
