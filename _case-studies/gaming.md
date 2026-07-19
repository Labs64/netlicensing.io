---
layout: casestudy
title: "Mobile Game Studio: In-Game Purchases and DLC Monetization"
description: "A mobile game developer implemented feature-based unlocks and consumable purchases using Multi-Feature licensing to monetize in-game content and DLC."
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
- Asset unlocking
- Consumable items
favorite-feature:
- Licensing Model "Multi-Feature"
- Feature-Based Licensing
- In-App Purchase Integration
---

### Overview

StellarRPG is a free-to-play fantasy mobile RPG with 2.5 million monthly active users available on iOS, Android, and Windows desktop. The studio monetizes through cosmetic items, battle pass subscriptions, permanent character unlocks, and consumable in-game currency packs. By integrating NetLicensing as their entitlement authority, they decoupled monetization logic from the game client, enabling server-side feature management without requiring app store reviews or client updates. This architectural change allows their product team to ship new purchasable content within hours and validate all purchases through a cryptographically secure backend, eliminating client-side cheating and revenue leakage.

### Licensing Challenge

The studio's original monetization system was fundamentally flawed: purchasable items were hardcoded directly into the game client, with purchase validation delegated to app store receipt verification. This created several critical problems:

1. **Deployment friction**: Adding a new cosmetic item, battle pass tier, or character pack required shipping a new client version, enduring a multi-week app store review cycle. A seasonal Halloween event could not be monetized until weeks after launch, missing peak engagement windows.

2. **No server-side enforcement**: The client was the source of truth for what content a player owned. A determined player could modify local game files, network traffic, or replay purchase confirmations to unlock items without payment.

3. **Cross-platform fragmentation**: A player could purchase a character on iOS but that entitlement was stored locally on their device. Switching to desktop or Android meant re-purchasing the same item, degrading cross-platform experience and driving player frustration.

4. **Limited pricing flexibility**: Adjusting prices or running promotional discounts required client updates. Time-sensitive sales (holiday specials, flash promotions) were impossible to execute.

5. **Blind monetization**: The studio had no real-time visibility into which items generated revenue, which cohorts purchased most, or which features drove highest lifetime value for targeted upsells.

### Chosen Licensing Model

The studio implemented **Multi-Feature licensing** as their core entitlement model, supplemented by **Subscription licensing** for the battle pass. Multi-Feature licensing maps naturally to their game's content structure: each purchasable item (character, cosmetic, DLC level, currency bundle) becomes an independently licensed feature. The studio defines a "Character Module" and "Cosmetic Module" within their NetLicensing Product, each containing License Templates for specific items.

**Multi-Feature mechanics:**
- Each license represents a single entitlement (e.g., "Legendary Dragon Rider Character")
- Licenses can be perpetual (one-time purchases) or time-bound (seasonal battle pass)
- Quota-based licenses track consumable depletion (50 premium currency units are decremented as the player spends)
- Multiple licenses coexist per licensee; validation returns the entire entitlement bundle

**Subscription licensing** governs battle passes: a recurring monthly or seasonal commitment that unlocks a tier progression system and exclusive cosmetics.

### NetLicensing Configuration

**Step 1: Create the Product**

Log in to the [NetLicensing Management Console](https://go.netlicensing.io). Create a new Product:

- **Product Number**: `GAME_STELLARRPG`
- **Product Name**: `StellarRPG Mobile & Desktop`
- **Version**: `1.0`
- **Description**: Free-to-play fantasy RPG monetized through DLC characters, cosmetics, consumables, and battle pass subscriptions.
- **Licensee Auto Create**: Enable (so new players auto-provision when they first connect)
- **Licensee Secret Mode**: Set to `CLIENT` (player devices generate their own licensee identifiers)

**Step 2: Create Product Modules**

Create three modules corresponding to the three revenue categories:

*Module 1: Characters & DLC*
- **Module Number**: `CHARACTERS`
- **Module Name**: `Playable Characters & DLC Expansions`
- **Licensing Model**: `MultiFeature`

*Module 2: Cosmetics*
- **Module Number**: `COSMETICS`
- **Module Name**: `Cosmetic Items (Skins, Emotes, Mounts)`
- **Licensing Model**: `MultiFeature`

*Module 3: Battle Pass & Subscriptions*
- **Module Number**: `BATTLEPASS`
- **Module Name**: `Seasonal Battle Pass & Premium Subscription`
- **Licensing Model**: `Subscription`

**Step 3: Create License Templates**

For the **CHARACTERS** module, create templates for each purchasable character:

| Template Number | Name | License Type | Price (USD) | Parameters |
|---|---|---|---|---|
| `CHAR_DRAGON_RIDER` | Legendary Dragon Rider | FEATURE | $9.99 | Perpetual access |
| `CHAR_FROST_MAGE` | Frost Mage Bundle | FEATURE | $7.99 | Perpetual access |
| `CHAR_DARK_ASSASSIN` | Dark Assassin (Event) | FEATURE | $4.99 | Auto-expires after seasonal event |
| `DLC_EXPANSION_1` | Lost Kingdom Expansion | FEATURE | $19.99 | Perpetual access to 15 new levels |

For the **COSMETICS** module, create fine-grained templates:

| Template Number | Name | License Type | Price (USD) | Parameters |
|---|---|---|---|---|
| `SKIN_GALAXY_DRAGON` | Galaxy Dragon Rider Skin | FEATURE | $4.99 | Perpetual cosmetic |
| `EMOTE_VICTORY` | Victory Emote Pack | FEATURE | $1.99 | Perpetual, multiple emotes |
| `MOUNT_PHOENIX` | Phoenix Mount | FEATURE | $3.99 | Perpetual cosmetic |
| `SEASON_1_BP` | Season 1 Battle Pass (Premium) | FEATURE | $9.99 | Active for 90 days |

For consumables (premium currency), use **Quantity-based** templates:

| Template Number | Name | License Type | Quantity | Price | Parameters |
|---|---|---|---|---|---|
| `CURRENCY_500` | 500 Premium Coins | QUANTITY | 500 | $4.99 | Quota decrement per use |
| `CURRENCY_2500` | 2500 Premium Coins (Bundle Discount) | QUANTITY | 2500 | $19.99 | Quota decrement per use |
| `CURRENCY_5000_ELITE` | 5000 Premium Coins (Elite Package) | QUANTITY | 5000 | $34.99 | Quota decrement per use |

For the **BATTLEPASS** module, create subscription templates:

| Template Number | Name | License Type | Billing Period | Price | Parameters |
|---|---|---|---|---|---|
| `BP_MONTHLY` | Battle Pass Monthly Subscription | SUBSCRIPTION | 1 month | $9.99 | Auto-renews; unlock 90 exclusive cosmetics and XP boost |
| `BP_ANNUAL` | Battle Pass Annual (Discounted) | SUBSCRIPTION | 12 months | $89.99 | Auto-renews yearly; 25% savings |

### Integration Walkthrough

**Entitlement Validation at Game Launch**

When a player launches the game, the client performs the following flow:

```bash
# Player launches game; client retrieves stored licensee ID from device storage
LICENSEE_ID="player_a1b2c3d4e5f6"
API_KEY="your-netlicensing-api-key"

# Client calls NetLicensing validation endpoint
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/${LICENSEE_ID}/validate" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/json"
```

**Expected Response (JSON):**

```json
{
  "licensee": {
    "number": "player_a1b2c3d4e5f6",
    "licensingObject": {
      "name": "StellarRPG Mobile & Desktop",
      "ref": "https://go.netlicensing.io/core/v2/rest/product/GAME_STELLARRPG"
    }
  },
  "productModuleValidation": [
    {
      "name": "Playable Characters & DLC Expansions",
      "number": "CHARACTERS",
      "licensingModel": "MultiFeature",
      "valid": true,
      "license": [
        {
          "number": "L_CHAR_DRAGON_RIDER_p1",
          "name": "Legendary Dragon Rider",
          "licenseType": "FEATURE",
          "valid": true,
          "expirationTime": null
        },
        {
          "number": "L_DLC_EXPANSION_1_p1",
          "name": "Lost Kingdom Expansion",
          "licenseType": "FEATURE",
          "valid": true,
          "expirationTime": null
        }
      ]
    },
    {
      "name": "Cosmetic Items",
      "number": "COSMETICS",
      "licensingModel": "MultiFeature",
      "valid": true,
      "license": [
        {
          "number": "L_SKIN_GALAXY_p1",
          "name": "Galaxy Dragon Rider Skin",
          "licenseType": "FEATURE",
          "valid": true,
          "expirationTime": null
        }
      ]
    },
    {
      "name": "Seasonal Battle Pass",
      "number": "BATTLEPASS",
      "licensingModel": "Subscription",
      "valid": true,
      "license": [
        {
          "number": "L_BP_MONTHLY_p1",
          "name": "Battle Pass Monthly Subscription",
          "licenseType": "SUBSCRIPTION",
          "valid": true,
          "expirationTime": "2026-05-19T00:00:00Z"
        }
      ]
    }
  ]
}
```

The client parses this response and populates the player's character roster, cosmetic selection menu, and battle pass progress tracker. Any licensed features are automatically enabled in the game UI; unlicensed features are greyed out.

**Consumable Currency Deduction**

When a player purchases an item from the in-game shop using premium currency, the client calls:

```bash
# Player spends 50 premium coins from their 500 coin bundle
LICENSEE_ID="player_a1b2c3d4e5f6"
LICENSE_NUMBER="L_CURRENCY_500_p1"
AMOUNT_SPENT=50

curl -X POST "https://go.netlicensing.io/core/v2/rest/license/${LICENSE_NUMBER}" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "action=DEBIT&debit=${AMOUNT_SPENT}"
```

NetLicensing decrements the quantity from 500 to 450. The response confirms the new balance:

```json
{
  "license": {
    "number": "L_CURRENCY_500_p1",
    "name": "500 Premium Coins",
    "quantity": "450",
    "valid": true
  }
}
```

The client stores this new quantity locally and updates the UI currency counter.

**In-Game Shop Purchase Flow**

When the player clicks "Buy" on a cosmetic in the in-game shop:

1. Client opens a modal showing the item and price
2. Player confirms purchase
3. Client sends an in-app purchase request to the native platform (Google Play / Apple App Store)
4. Platform processes payment and returns a purchase receipt
5. Client forwards the receipt and item details to the game backend server:

```bash
curl -X POST "https://api.stellarrpg.com/purchase/confirm" \
  -H "Content-Type: application/json" \
  -d '{
    "licensee_id": "player_a1b2c3d4e5f6",
    "item_template": "SKIN_GALAXY_DRAGON",
    "receipt": {
      "platform": "apple",
      "receipt_data": "base64-encoded-app-store-receipt",
      "transaction_id": "1000000123456789"
    }
  }'
```

6. The backend verifies the receipt with Apple/Google, then calls NetLicensing to activate the license:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee=${LICENSEE_ID}&licenseTemplate=SKIN_GALAXY_DRAGON&active=true"
```

7. NetLicensing returns a new license record (e.g., `L_SKIN_GALAXY_p2`):

```json
{
  "license": {
    "number": "L_SKIN_GALAXY_p2",
    "name": "Galaxy Dragon Rider Skin",
    "licenseType": "FEATURE",
    "active": true,
    "valid": true
  }
}
```

8. Backend responds to client confirming purchase success, and logs the transaction in NetLicensing:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/transaction" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee=${LICENSEE_ID}&name=Purchase+Galaxy+Dragon+Skin&status=CLOSED&source=SHOP"
```

9. Client re-validates the licensee to pull the updated entitlements and refresh the cosmetic menu.

### Licensee Management

**Auto-Provisioning**

The studio configured `licenseeAutoCreate: true` on their Product, enabling automatic licensee provisioning on first connection. When a player launches StellarRPG for the first time:

1. Client generates a unique deviceId (UUID on Android/iOS, or hardware-based identifier on Windows desktop)
2. Client derives a licensee number: `GAME_STELLARRPG_<deviceId_hash>`
3. Client stores this licensee ID in local encrypted storage
4. On first game launch, client attempts validation. NetLicensing detects the licensee doesn't exist and auto-creates a new account
5. From this point forward, the same licensee ID is reused across all subsequent launches

This eliminates manual sign-up friction: players can start playing immediately.

**Cross-Platform Entitlement Sharing**

To enable purchases to sync across iOS, Android, and desktop, players must link their game account to a Studio account (email + password, or OAuth via Google/Facebook). The linking flow:

1. Player opens account settings and clicks "Link Account"
2. Studio backend generates a temporary linking token
3. Player authenticates to Studio (email/password or OAuth)
4. Studio backend merges the local licensee ID with the account's canonical licensee ID
5. All future launches on any platform use the canonical licensee ID
6. Entitlements are now visible across all platforms

In NetLicensing terms: the canonical licensee ID becomes the owner of all licenses, regardless of which device type created them.

**Creating Licensees Programmatically**

For bulk onboarding or testing, create licensees via API:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "product=GAME_STELLARRPG&number=player_testuser_001&name=TestUser001&active=true"
```

Response:

```json
{
  "licensee": {
    "number": "player_testuser_001",
    "name": "TestUser001",
    "active": true,
    "ref": "https://go.netlicensing.io/core/v2/rest/licensee/player_testuser_001"
  }
}
```

### Shop & Payment Integration

The studio uses **NetLicensing Shop** for web-based purchases and integrates it with their mobile in-app purchase flows.

**Web Shop Flow (Desktop Players)**

For desktop players purchasing cosmetics through the web store:

1. Backend generates a shop token scoped to the player's licensee:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/token" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee=player_a1b2c3d4e5f6&tokenType=SHOP"
```

Response:

```json
{
  "token": {
    "number": "TOKEN_abc123xyz",
    "tokenType": "SHOP",
    "licensee": "player_a1b2c3d4e5f6"
  }
}
```

2. Backend constructs the shop URL:

```
https://go.netlicensing.io/shop/v2?token=TOKEN_abc123xyz&redirectSuccessUrl=https://stellarrpg.com/shop-success?order_id={ORDER_ID}&redirectCancelUrl=https://stellarrpg.com/shop-cancelled
```

3. Player opens this URL in their browser (or embedded WebView)
4. NetLicensing Shop displays all available License Templates with pricing
5. Player selects items and completes payment via Stripe (the studio's configured gateway)
6. Upon successful payment, NetLicensing auto-creates licenses and redirects to the success URL
7. Backend webhook receives payment confirmation and syncs entitlements back to the game

**Mobile In-App Purchase Flow**

For iOS and Android, the studio delegates payment to app store SDKs (avoiding the need to handle PCI compliance):

1. Player taps "Buy" in mobile game
2. App calls native IAP SDK (Google Play Billing / App Store SDK)
3. User completes payment with their platform account (Apple/Google handles card processing)
4. App receives receipt from platform
5. App backend validates receipt with Apple/Google servers
6. App backend creates/activates license in NetLicensing
7. Game refreshes entitlements

The studio does NOT use NetLicensing Shop for mobile purchases; instead, they directly create licenses via API post-receipt-verification.

### Edge Cases & Best Practices

**Offline Validation & Grace Period**

The mobile game may be played offline (airplane mode, poor connectivity). To handle this:

1. After each successful validation, client caches the entitlements response locally
2. If validation fails due to network error, client uses the cached response (within a configured grace period, e.g., 7 days)
3. On next network connection, client re-validates and updates cache
4. If grace period expires without successful validation, restricted features are locked until connectivity is restored

**Preventing Entitlement Cheating**

The studio implements the following safeguards:

1. **Server-Authoritative Validation**: Critical game progression (boss defeats, level completion) is logged to the backend, which validates the licensee had the required character/DLC licensed at the time of the action
2. **License Revocation**: If fraud is detected (e.g., a chargeback on a cosmetic purchase), the backend revokes the license immediately via:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/${LICENSE_NUMBER}" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "active=false"
```

3. **Audit Logging**: Every validation, purchase, and license change is logged to the backend database and correlated with player account changes for forensic analysis

**Handling License Expiration**

Seasonal battle passes and limited-time event characters auto-expire based on NetLicensing's `expirationTime` field:

1. Validation response includes expiration timestamps
2. Client UI shows countdown timers for expiring cosmetics / battle passes
3. At expiration, the license transitions to `valid=false`
4. Next validation call will omit the expired license
5. Player loses access to that content, but existing cosmetics remain (visual assets stay on device; content restrictions are enforced server-side)

**Quota Exhaustion**

When a player depletes premium currency (quota reaches 0):

1. NetLicensing returns `valid=false` for that license
2. Client UI disables any purchases that require that currency type
3. Player must purchase another currency bundle to continue spending
4. Studio prompts in-game purchase of new currency bundle, driving monetization

**Bulk License Operations**

For seasonal events or promotions granting free cosmetics to all players:

```bash
# Grant 5000 players free Battle Pass for a limited time
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/grant" \
  -H "Authorization: Basic $(echo -n "${API_KEY}:" | base64)" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "product=GAME_STELLARRPG&licenseTemplate=BP_MONTHLY&quantity=5000&expirationTime=2026-04-30T23:59:59Z"
```

This creates 5000 licenses, each expiring on the specified date.

**API Rate Limiting & Retry Logic**

NetLicensing enforces rate limits (typically 100 requests/minute per API key). The game backend implements exponential backoff:

```python
import requests
import time

def validate_with_retry(licensee_id, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.get(
                f"https://go.netlicensing.io/core/v2/rest/licensee/{licensee_id}/validate",
                auth=("api_key", ""),
                timeout=5
            )
            if response.status_code == 200:
                return response.json()
            elif response.status_code == 429:  # Rate limited
                wait_time = 2 ** attempt  # Exponential backoff
                time.sleep(wait_time)
                continue
            else:
                raise Exception(f"Unexpected status: {response.status_code}")
        except requests.RequestException as e:
            if attempt == max_retries - 1:
                raise
            time.sleep(2 ** attempt)
    raise Exception("Max retries exceeded")
```

### Results & Outcome

* **Time-to-market reduced from 6-8 weeks to 2-4 hours**: New cosmetics and characters can be created in the content editor, added as License Templates in NetLicensing, and shipped live without any client build or app store review
* **Seasonal event revenue increased 340%**: Halloween 2025 event generated $180K in 2 weeks (vs. $42K for comparable prior event with delayed rollout) by enabling rapid cosmetic and limited-time character launches
* **Cross-platform engagement improved by 52%**: Desktop and mobile player cohorts are now unified; purchase stickiness and lifetime value increased as players leverage devices interchangeably
* **Chargeback fraud reduced 95%**: Server-authoritative validation eliminated client-side exploits; fraud detection systems flag suspicious entitlement patterns for immediate license revocation
* **Monetization analytics dashboard**: Real-time views of revenue per cosmetic, character, and bundle enable data-driven content roadmap planning. Top performers are prioritized for seasonal rotations
* **Player retention +28%**: Faster content updates, frictionless cross-platform purchases, and reduced server downtime from legacy entitlement system migrations improved overall game perception and churn metrics
* **Development velocity +85%**: Engineering resources previously tied to app store updates and entitlement debugging were redirected to new game features and content, accelerating roadmap execution
