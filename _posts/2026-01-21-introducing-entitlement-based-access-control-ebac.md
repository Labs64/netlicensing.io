---
layout: post
title: "Beyond Roles and Attributes: Introducing Entitlement-Based Access Control (EBAC) and Feature-Based Access Control (FeBAC)"
description: "The Business Authorization Gap: when security models are not enough and how entitlement-based access control closes this gap"
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-ebac-febac.png
tags:
  - AAV
  - EBAC
  - FeBAC
  - NetLicensing
  - RBAC
  - ABAC
  - Access Control
  - Authenticate
  - Authorize
  - Validate
  - Software Licensing
  - Entitlement-Based Access Control
  - Feature-Based Access Control
  - Access Control Models
  - SaaS Authorization
  - Business Entitlements
  - Subscription Tiers
  - Feature Flags
  - Layered Authorization
  - Entitlement Service
  - Dynamic Permissions
  - Entitlement Quotas
  - Entitlement Rules
---

Access control has evolved significantly over the past two decades. Organizations started with simple *Role-Based Access Control (RBAC)*, moved to more flexible *Attribute-Based Access Control (ABAC)*, and now face a new challenge: managing **business entitlements** alongside security permissions. Enter *Entitlement-Based Access Control (EBAC)* and *Feature-Based Access Control (FeBAC)* - two emerging paradigms that extend the traditional [authorization frameworks](https://netlicensing.io/blog/2020/09/24/authenticate-authorize-validate-framework/) to handle product licensing, subscription tiers, and feature accessibility.

## The Evolution of Access Control Models

To understand where EBAC and FeBAC fit, let's briefly review the landscape of access control models.

**Role-Based Access Control (RBAC)** assigns permissions based on user roles. An "Admin" role grants access to sensitive operations; a "Viewer" role permits read-only access. RBAC is simple to implement and audit - permissions are stable, predictable, and map cleanly to organizational structure. However, RBAC struggles with scenarios that don't fit neatly into discrete roles. As requirements become more nuanced, organizations face "role explosion," creating dozens of roles to handle exceptions and edge cases.

**Attribute-Based Access Control (ABAC)** addresses this by evaluating multiple attributes - user attributes (department, clearance level), resource attributes (data classification, sensitivity), action attributes (read, write, delete), and environmental attributes (time, location, device). ABAC provides fine-grained control and handles dynamic conditions. But with flexibility comes complexity: managing dozens of policies across all attributes requires careful governance, and auditing access decisions becomes harder.

Both models assume that authorization is primarily a **security concern**. They ask: *"Does this person have the credentials and context to access this resource?"* This works well for traditional IT security - controlling who can view database schemas or execute administrative commands.

What happens when authorization becomes a **business concern**?

## The Business Authorization Problem

Consider a SaaS platform with multiple subscription tiers:
- **Free tier:** Users can create up to 5 projects
- **Pro tier:** Unlimited projects, advanced analytics
- **Enterprise tier:** All features, SSO, dedicated support

Traditional RBAC might model this by creating roles like "FreeUser," "ProUser," and "EnterpriseUser," then attaching permissions accordingly. But this approach has three problems:

1. **Static coupling:** When you promote a free user to Pro, you must manually change their role. If they downgrade mid-month, you scramble to revoke permissions. Changes are often delayed or forgotten.

2. **Tangled logic:** Entitlements are scattered across your application. One microservice checks the subscription tier in the database; another hardcodes feature flags; a third calls a separate licensing API. Consistency is hard to maintain.

3. **Business-security confusion:** Authorization logic mixes security concerns (*who is logged in?*) with business rules (*does their plan include this feature?*). This makes the codebase brittle and complicates audits - was a user denied access because they lacked credentials or because their subscription expired?

ABAC helps somewhat by encoding entitlements as attributes (e.g., `subscription_tier="pro"`). But attributes still live in your identity system or external store, making real-time updates difficult. If you're running a metered billing system, adjusting entitlements on the fly becomes a challenge.

## Introducing Entitlement-Based Access Control (EBAC)

**Entitlement-Based Access Control (EBAC)** is a specialized authorization model designed specifically for **business entitlements**. Instead of asking *"Is this person authorized by role or attributes?"* EBAC asks *"What is this person entitled to use?"*

Entitlements are **transactional, externally managed permissions** tied to business rules like subscriptions, licenses, feature packs, or metered usage. They're distinct from security permissions because they're:

- **Dynamic:** They change as customers upgrade, downgrade, or run out of quota
- **Time-bound:** A trial might be valid for 14 days; a yearly license expires on a specific date
- **Consumable:** Some entitlements have quotas (100 API calls per month) that deplete over time
- **Business-driven:** Defined by product and commercial teams, not IT security

In an EBAC model, authorization decisions flow through a dedicated **Entitlement Decision Point (EDP)** - a service that knows about subscriptions, licenses, and feature availability. When a user requests access to a feature, the EDP evaluates their entitlements and responds in real-time.

### EBAC in Practice

Imagine a user on a Pro plan tries to export data in a custom format (an Enterprise-only feature). Here's how EBAC differs from traditional RBAC:

**With RBAC:** The application checks if the user has an "EnterpriseUser" role. If not, access is denied. To grant access, an admin must manually reassign the user's role - a slow, error-prone process.

**With EBAC:** The application queries the Entitlement Service: *"Does this user have access to custom_export?"* The service checks the user's subscription tier (Pro) against the feature's entitlement rules (Enterprise tier only) and returns a real-time denial. If the user upgrades their plan, the service immediately reflects that change without any role reassignment.

## Introducing Feature-Based Access Control (FeBAC)

**Feature-Based Access Control (FeBAC)** is a specialized subset of EBAC focused on **feature flags and product features**. FeBAC combines entitlements with feature management platforms to enable granular, dynamic control over which features are accessible to whom.

FeBAC extends EBAC by adding:

- **Percentage rollouts:** Roll out a new feature to 10% of Pro users for testing
- **Cohort targeting:** Enable a feature only for users in a specific geography or industry
- **A/B testing:** Show variant A to 50% of users, variant B to the other 50%
- **Kill switches:** Instantly disable a buggy feature without redeploying code

### EBAC vs. FeBAC

The distinction is subtle but important:

- **EBAC** handles broad entitlements: *"Does the customer's subscription include this feature family?"*
- **FeBAC** handles feature-level decisions: *"Should this specific user see this specific variant of this feature right now?"*

In practice, they work together. EBAC creates a coarse-grained gate (only Pro users can see the export feature), and FeBAC adds fine-grained control (and only show the new UI variant to 20% of them).

## How EBAC/FeBAC Align with RBAC and ABAC

Rather than replacing RBAC and ABAC, EBAC and FeBAC **extend and complement** them.

### The Three-Layer Authorization Stack

Think of modern authorization as three layers:

<table border="1" width="100%" cellpadding="5" cellspacing="0">
  <thead>
    <tr>
      <th>Layer</th>
      <th>Model</th>
      <th>Concern</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Security Layer</strong></td>
      <td>RBAC + ABAC</td>
      <td>Who are you? What's your context?</td>
      <td>Is this user authenticated? Are they in the right geographic region?</td>
    </tr>
    <tr>
      <td><strong>Business Layer</strong></td>
      <td>EBAC + FeBAC</td>
      <td>What are you entitled to use?</td>
      <td>Does the customer's plan include analytics? Should we show the beta UI?</td>
    </tr>
    <tr>
      <td><strong>Data Layer</strong></td>
      <td>Fine-grained policies (rows, columns)</td>
      <td>What specific data can you access?</td>
      <td>Can this user view customer records for their region only?</td>
    </tr>
  </tbody>
</table>

In this architecture:

1. **RBAC** handles employee roles (Developer, Manager, Admin). It answers: *"Who is logged in and what's their job title?"*
2. **ABAC** refines security decisions by adding context. It answers: *"Is this request coming from a trusted network? What time of day is it?"*
3. **EBAC** handles product entitlements. It answers: *"Does this customer's subscription tier include this feature?"*
4. **FeBAC** handles feature rollouts and experimentation. It answers: *"Should this specific customer see this feature variant right now?"*

A real request might flow through all layers:

1. User logs in with their SSO credentials → **RBAC check:** Is this a valid employee?
2. User's device and IP are verified → **ABAC check:** Is the request from a trusted context?
3. User accesses a customer's SaaS account → **EBAC check:** Does this customer's plan include this feature?
4. The feature is in an A/B test → **FeBAC check:** Is this user in the test cohort?

Only if all checks pass does the user gain access.

## Key Differences at a Glance

<table border="1" width="100%" cellpadding="5" cellspacing="0">
  <thead>
    <tr>
      <th>Aspect</th>
      <th>RBAC</th>
      <th>ABAC</th>
      <th>EBAC</th>
      <th>FeBAC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Primary focus</strong></td>
      <td>Job function</td>
      <td>Context and attributes</td>
      <td>Subscription and licenses</td>
      <td>Feature availability</td>
    </tr>
    <tr>
      <td><strong>Decision basis</strong></td>
      <td>Roles (Admin, Viewer)</td>
      <td>User/resource/env attributes</td>
      <td>Entitlement rules</td>
      <td>Feature flags + entitlements</td>
    </tr>
    <tr>
      <td><strong>Real-time updates</strong></td>
      <td>Slow (manual role changes)</td>
      <td>Medium (policy changes)</td>
      <td>Fast (subscription changes)</td>
      <td>Very fast (flag toggles)</td>
    </tr>
    <tr>
      <td><strong>Typical use case</strong></td>
      <td>Employee access</td>
      <td>Sensitive data protection</td>
      <td>SaaS feature access</td>
      <td>Product experimentation</td>
    </tr>
    <tr>
      <td><strong>Managed by</strong></td>
      <td>IT/Security team</td>
      <td>Security architects</td>
      <td>Product/Commercial teams</td>
      <td>Product/Engineering teams</td>
    </tr>
  </tbody>
</table>

## Implementation Considerations

If you're considering EBAC or FeBAC for your platform, keep these points in mind:

**Centralize the source of truth.** Entitlements should flow from a single system - your licensing platform, subscription manager, or dedicated [entitlement service](https://netlicensing.io). Avoid scattering entitlement logic across microservices.

**Separate concerns.** Keep security authorization (RBAC/ABAC) distinct from business authorization (EBAC). Different teams own them; different change velocities apply; different audit trails matter.

**Cache strategically.** Entitlements can change frequently. Cache decisions locally (with short TTLs) to avoid constant network calls, but refresh regularly to stay current.

**Log comprehensively.** Track not just who accessed what, but why they were allowed. This is crucial for compliance and debugging.

**Version your policies.** As your product evolves, feature entitlements change. Version your policies so you can audit historical decisions and understand which rules applied when.

## Conclusion

EBAC and FeBAC represent the next evolution in authorization frameworks. They don't replace RBAC and ABAC; instead, they work alongside them in a layered architecture that separately handles security concerns, business rules, and experimentation.

For SaaS platforms, licensing systems, and any product with dynamic entitlements, EBAC provides the conceptual clarity and architectural flexibility to manage subscription tiers, feature access, and metered usage in real-time. FeBAC takes this further, enabling sophisticated feature rollouts, A/B testing, and behavioral targeting.

By aligning authorization architecture with your actual business model, you reduce complexity, improve auditability, and empower your product teams to ship faster. It's not about having more models - it's about having the right model for each layer of authorization.