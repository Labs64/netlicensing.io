---
layout: casestudy
title: "Multi-Platform Software: Seamless License Sharing Across Devices"
description: "A creative software company enabled flexible license sharing across desktop, mobile, and web platforms using Floating licensing with cross-device synchronization."
permalink: "/case-studies/cross-platform-license-sharing/"
img: "/img/case-studies/netlicensing-case-study-cross-platform-license-sharing.png"
tags:
- Case Studies
- Use Cases
- Multi-Platform Software
- Cross-Device Licensing
- Concurrent Usage
industry:
- Creative Software / Multi-Platform SaaS
use-case:
- Cross-platform license sharing
- Concurrent usage management
- Device-agnostic licensing
favorite-feature:
- Licensing Model "Floating"
- Cross-Device Licensing
- Concurrent Session Management
---

### Overview

A creative software company develops collaboration and design tools available across Windows, macOS, iOS, Android, and web. Their professional user base works across multiple devices daily—desktop workstations at the office, laptops at home, tablets for client presentations, and browsers for quick edits. Under their original per-device licensing model, users paying separately for each platform created friction and left money on the table, as users would simply abandon high-cost platforms rather than double-pay.

The vendor needed a licensing model that recognizes a user working across five devices as one paying customer, not five separate seats. They wanted to enforce fair concurrent usage limits (prevent one user from being logged in on 10 devices simultaneously) while permitting legitimate multi-device workflows. NetLicensing's Floating model was the ideal fit: it tracks concurrent active sessions rather than binding licenses to specific devices or platforms.

### Licensing Challenge

The original licensing system treated each device as a separate entitlement. A professional user working on a desktop at the office, a laptop at home, an iPad for meetings, and a web app for quick edits was forced to purchase four separate licenses—creating customer friction, support escalations, and churn. The company had no visibility into which devices consumed the most licenses and couldn't offer team-based floating pools. Without a unified entitlement system, on-device license validation was opaque, and users frequently encountered confusing "license locked" states when applications crashed without properly checking out their session.

### Chosen Licensing Model

**Floating License Model** — tracks active sessions rather than device bindings. Each user account (Licensee) is assigned a maximum concurrent session limit (e.g., 3 concurrent sessions). When a user launches the app on any device, the client checks out a session. If they exceed their session limit, they are prompted to check in a prior session or upgrade. When the app closes or times out, the session is automatically checked in and freed for reuse on another platform.

```
Concurrent Session Mechanics:
- User has Floating License with maxSessions=3
- Opens desktop app → session 1 active
- Opens mobile app → session 2 active
- Opens web browser → session 3 active
- Tries to open tablet app → Error: max sessions reached
  Choose: (a) close another session, or (b) upgrade to maxSessions=5
```

### NetLicensing Configuration

**Product & Module Setup:**
- **Product:** "DesignStudio" (main product)
- **Module:** "Multi-Device Access" (licensing model: Floating)
- **License Templates:**
  - `PERSONAL_3SEATS` — max 3 concurrent sessions, $9/month
  - `PROFESSIONAL_5SEATS` — max 5 concurrent sessions, $19/month
  - `TEAM_10SEATS` — max 10 concurrent sessions (team pool), $49/month

**Key Parameters:**
- `maxSessions` — enforced concurrency cap per template
- `timeVolume=1`, `timeVolumePeriod=MONTH` — subscription billing cycle
- `sessionTimeout=30` minutes — automatic check-in after idle/crash

**ASCII Configuration Hierarchy:**
```
Product: DesignStudio
└── Module: Multi-Device Access (Floating)
    ├── Template: PERSONAL_3SEATS (maxSessions=3)
    ├── Template: PROFESSIONAL_5SEATS (maxSessions=5)
    └── Template: TEAM_10SEATS (maxSessions=10)
```

Each Licensee (user account) is assigned one of these templates, and all platform clients (desktop, mobile, web) use the same NetLicensing account.

### Integration Walkthrough

**Validation Trigger Points:**
- **App Launch:** Client makes `GET /licensee/{num}/validate` with `action=checkout` to reserve a session slot
- **Session Recovery:** On app close, `action=checkin` immediately releases the slot
- **Periodic Refresh:** Every 15 minutes, client calls validate to confirm session is still valid
- **Forced Timeout:** Server automatically checks in idle sessions after 30 minutes

**High-Level Flow:**
```
┌─────────────────┐
│  User opens app │
└────────┬────────┘
         │
         ▼
┌────────────────────────────────────────┐
│ POST /licensee/{num}/validate          │
│   action=checkout                      │
└────────┬───────────────────────────────┘
         │
   ┌─────┴──────┐
   │            │
   ▼            ▼
 Valid      Expired/
   │       Limit Exceeded
   │            │
   ▼            ▼
Grant      Prompt user to
Access     close another session
           or upgrade

On app close:
POST /licensee/{num}/validate
  action=checkin
```

The validation response includes a `validUntil` timestamp and the `sessionId` of the checked-out session. Client-side code stores this for periodic refresh calls. If the response indicates the session expired, the app gracefully exits and prompts the user to re-authenticate on the next launch.

### Licensee Management

Each user in the system maps to a single NetLicensing Licensee. The Licensee number is derived from the user's account ID (e.g., `USER_12345`). When a user subscribes or upgrades, the backend assigns them a License based on their chosen tier template (PERSONAL_3SEATS, PROFESSIONAL_5SEATS, etc.).

For team licenses (TEAM_10SEATS), a single Licensee is created per team, and all team members authenticate under that shared Licensee account. The team administrator manages seat usage and invites members through the application's own user management UI; NetLicensing tracks only the aggregate concurrent session count across all team members.

Auto-provisioning is applied: when a user signs up, a Licensee is automatically created and assigned a trial license (e.g., PERSONAL_3SEATS for 30 days). Manual intervention is only needed for enterprise or bulk team licenses negotiated outside the standard shop.

### Shop & Payment Integration

The application embeds a NetLicensing Shop integration for tier upgrades. When a user hits their session limit or their subscription is nearing expiration, the app displays an upgrade button that generates a shop token and opens the NetLicensing Shop in a modal or browser window.

```
Upgrade Flow:
1. App detects user at maxSessions limit or renewal date approaching
2. App calls POST /shop token endpoint with licenseeNumber
   and targetTemplate (e.g., PROFESSIONAL_5SEATS)
3. NetLicensing returns one-time shop URL
4. User completes purchase via Stripe/PayPal
5. Shop redirects to app's success_url
6. App server receives webhook confirming new license
7. Next validation call reflects updated tier
```

This allows seamless in-app upgrades without forcing users to the vendor's website.

### Edge Cases & Best Practices

- **Offline & Grace Period:** Mobile devices may lose connectivity briefly. Cache the last validation response with a 30-minute grace period so users can continue working offline; re-validate when connectivity returns.
- **Session Timeout Recovery:** Devices that crash without checking out must not lock licenses indefinitely. Server-side timeout (30 min) automatically releases stuck sessions. Provide a "Release Session" button in app settings for user-initiated manual release.
- **Team License Audit:** For shared team licenses, log all session activity (user, device, timestamp, duration) to detect abuse or unused seats. Monthly reports help teams right-size their allocation.
- **Upgrade Without Interruption:** When a user upgrades mid-session, the new session limit takes effect immediately; no logout/re-login required.
- **Rate Limiting & Retry:** Client apps may validate 10–20 times per day per user. NetLicensing APIs are robust; implement exponential backoff for transient failures.
- **Certificate Pinning (Mobile):** On iOS and Android, use certificate pinning to prevent man-in-the-middle attacks on license validation calls.

### Results & Outcome

- **License friction eliminated:** Users can now work across desktop, mobile, and web without paying per device or dealing with confusing license locks.
- **Conversion rates increased:** Cross-platform flexibility became a key differentiator against competitors with rigid, per-device models.
- **Team adoption doubled:** Organizations can now allocate a single floating license pool across teams of varying sizes, matching actual usage patterns.
- **Support costs reduced by 60%:** Automatic session timeout and self-service session release eliminated the majority of "locked license" escalations.
- **Revenue per user increased by 22%:** Users upgraded to higher tiers (5-seat and 10-seat) rather than abandoning the platform due to device restrictions.
- **User satisfaction improved:** Professionals maintaining workflow continuity across office workstations, home laptops, tablets, and web browsers reported significantly higher satisfaction scores.
