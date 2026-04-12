---
layout: casestudy
title: "Physical Security: Feature-Based Access Control with Time-Limited Permissions"
description: "A building management company implemented feature-based access control with time-limited permissions to manage resource gating and dynamic authorization across facilities."
permalink: "/case-studies/access-control/"
img: "/img/case-studies/netlicensing-case-study-access-control.png"
tags:
- Case Studies
- Use Cases
- Physical Security
- Access Control
- Network Security
industry:
- Physical Security / Network Infrastructure
use-case:
- Access control
- Resource gating
- Permissions management
favorite-feature:
- Licensing Model "Multi-Feature"
- Licensing Model "Rental"
- Time-Limited Access
---

### Overview

SecureGate Solutions is a commercial building management company operating 12 multi-tenant office complexes across North America, serving over 250 corporate tenants. Their facilities host diverse amenities: secure entry points, reserved conference rooms, dedicated parking, gym facilities, and segmented network infrastructure. Before NetLicensing, SecureGate managed access control through a legacy badge system with static permission levels, unable to adapt to temporary needs, contractor access windows, or time-bound resource reservations.

The business model relies on tenant subscription tiers, with premium tiers including higher-tier amenity access, premium parking, and network bandwidth allocations. Temporary access for contractors, visitors, and event attendees required manual badge programming and administrative overhead. The core challenge was bridging the gap between SecureGate's physical infrastructure and their SaaS tenant management platform, while maintaining security and audit compliance for multi-tenant facilities.

SecureGate chose NetLicensing because it offers a centralized entitlement engine supporting both feature-based and time-limited licensing models, enabling them to unify access control across physical and network layers with minimal infrastructure changes.

### Licensing Challenge

SecureGate faced four interconnected problems:

1. **Static Access Levels:** The legacy badge system assigned fixed permission sets (Level 1, 2, or 3) that couldn't differentiate resource types. All Level 2 access holders received identical permissions regardless of their actual subscription tier or actual business need.

2. **Manual Temporary Access Management:** Granting a contractor 72-hour access to a building required manually programming their badge, setting a calendar reminder for revocation, and manually programming the badge again at expiration. Forgotten revocations became a security liability and compliance risk.

3. **No Integration with Reservation Systems:** Conference rooms and parking spaces were frequently double-booked because the access control system didn't communicate with reservation calendars. Tenants could reserve a room, but the access control system wouldn't grant entry to that specific room at the booked time.

4. **Inability to Monetize Network Access Tiers:** Premium tenants requested specialized network services (dedicated bandwidth, guest Wi-Fi provisioning, segment isolation) that the all-or-nothing network access policy couldn't support. SecureGate had no way to offer tiered network services aligned with tenant subscriptions.

Additionally, SecureGate lacked complete audit trails for access entitlements, making compliance with security standards (SOC 2, ISO 27001) difficult and creating liability during security investigations.

### Chosen Licensing Model

SecureGate implemented a **Multi-Feature licensing model** combined with **Rental licensing** to support dynamic access control:

- **Multi-Feature Licensing:** Different features represent different resource types—building entry, parking, conference rooms, gym, premium network bandwidth, guest Wi-Fi provisioning. Each tenant is assigned feature licenses matching their subscription tier. A Premium tier tenant receives features for all resources; a Basic tier tenant receives only building entry and standard network.

- **Rental Licensing:** Temporary access (contractors, visitors, event attendees) is granted using Rental licenses with explicit time-volume constraints. A 3-day contractor pass is a Rental license with a 3-day (72-hour) time volume that counts down from first use. Upon expiration, the license automatically becomes invalid—no manual revocation needed.

**Model mechanics:**
- Each Licensee (tenant, contractor, visitor, device) has a unique `licenseeNumber` (e.g., `TENANT-00123`, `CONTRACTOR-08456`).
- Each Licensee can hold multiple License records, each tied to a License Template defining allowed features and validity constraints.
- Access control systems validate Licensees at entry points by calling the Validation API and inspecting the returned features and time-volume remaining.
- Automatic expiration is enforced server-side: after a Rental license's time volume expires, validation calls return an invalid status, and the access control system immediately denies entry.

### NetLicensing Configuration

#### Step 1: Create the Product in Management Console

1. Log in to the **NetLicensing Management Console** at `https://go.netlicensing.io/`.
2. Navigate to **Products** > **New Product**.
3. Enter the following details:
   - **Product Number:** `SECUREGATE-001`
   - **Product Name:** `SecureGate Access Control`
   - **Version:** `1.0`
   - **Description:** `Multi-tenant building access control and resource management system`
   - **Licensee Auto-Create:** Enable (allows on-demand Licensee creation via API)
   - **Licensee Secret Mode:** `PREDEFINED` (SecureGate assigns licensee numbers from their internal database)
4. Click **Create**.

#### Step 2: Create Product Modules

Create three Product Modules to separate licensing concerns:

**Module 1: Physical Access (Multi-Feature Model)**

1. Navigate to **Products** > `SECUREGATE-001` > **Modules** > **New Module**.
2. Enter:
   - **Module Number:** `PHYS-ACCESS`
   - **Module Name:** `Physical Access Control`
   - **Licensing Model:** `MultiFeature`
   - **Description:** `Manages feature-based access to physical resources`
3. Click **Create**.

**Module 2: Temporary Access (Rental Model)**

1. Create another module with:
   - **Module Number:** `TEMP-ACCESS`
   - **Module Name:** `Temporary Access`
   - **Licensing Model:** `Rental`
   - **Yellow Threshold:** `1440` (days, about 2 days remaining warning)
   - **Red Threshold:** `120` (minutes, less than 2 hours remaining warning)
   - **Description:** `Time-limited access for contractors and visitors`
2. Click **Create**.

**Module 3: Network Bandwidth (Feature-based)**

1. Create:
   - **Module Number:** `NETWORK-TIER`
   - **Module Name:** `Network Access Tiers`
   - **Licensing Model:** `MultiFeature`
   - **Description:** `Network bandwidth and services gating`
2. Click **Create**.

#### Step 3: Create License Templates

**Template 1: Basic Tenant License (Physical Access)**

1. Navigate to **Products** > `SECUREGATE-001` > **Modules** > `PHYS-ACCESS` > **License Templates** > **New Template**.
2. Enter:
   - **Template Number:** `BASIC-PHYS`
   - **Name:** `Basic Tenant - Physical Access`
   - **License Type:** `FEATURE`
   - **Features (Multi-Select):** Select or create the following features:
     - `BUILDING_ENTRY` (core feature)
     - `STANDARD_PARKING` (1 assigned space)
     - `CONF_ROOM_ACCESS` (shared access, not reserved)
   - **Price:** `0` (included in tenant subscription)
   - **Description:** `Grants basic building and parking access for tenant employees`
3. Click **Create**.

**Template 2: Premium Tenant License (Physical Access)**

1. Create:
   - **Template Number:** `PREMIUM-PHYS`
   - **Name:** `Premium Tenant - Physical Access`
   - **License Type:** `FEATURE`
   - **Features:**
     - `BUILDING_ENTRY`
     - `PREMIUM_PARKING` (dedicated spaces)
     - `CONF_ROOM_PRIORITY` (priority booking)
     - `GYM_ACCESS`
   - **Price:** `0` (included in premium subscription)
2. Click **Create**.

**Template 3: Contractor Temporary Access (Rental)**

1. Navigate to **Products** > `SECUREGATE-001` > **Modules** > `TEMP-ACCESS` > **License Templates** > **New Template**.
2. Enter:
   - **Template Number:** `CONTRACTOR-72H`
   - **Name:** `Contractor - 72 Hour Access`
   - **License Type:** `TIMEVOLUME`
   - **Time Volume:** `72` (hours)
   - **Time Volume Period:** `HOUR`
   - **Features (if supported):** `BUILDING_ENTRY`, `PARKING`
   - **Price:** `0` (tenant-issued, no direct charge)
   - **Description:** `Time-limited access for contractor projects`
3. Click **Create**.

**Template 4: Guest - Single Day (Rental)**

1. Create:
   - **Template Number:** `GUEST-1DAY`
   - **Name:** `Guest - 24 Hour Access`
   - **License Type:** `TIMEVOLUME`
   - **Time Volume:** `24` (hours)
   - **Time Volume Period:** `HOUR`
   - **Features:** `BUILDING_ENTRY`, `PARKING`, `CONF_ROOM_ACCESS`
   - **Price:** `0`
2. Click **Create**.

**Template 5: Premium Network Tier (Multi-Feature)**

1. Navigate to **Products** > `SECUREGATE-001` > **Modules** > `NETWORK-TIER` > **License Templates** > **New Template**.
2. Enter:
   - **Template Number:** `PREMIUM-NETWORK`
   - **Name:** `Premium Network Tier`
   - **License Type:** `FEATURE`
   - **Features:**
     - `STANDARD_BANDWIDTH` (included in all)
     - `PREMIUM_BANDWIDTH` (100 Mbps dedicated)
     - `GUEST_WIFI_PROVISIONING`
     - `SEGMENT_ISOLATION`
   - **Price:** `0`
3. Click **Create**.

### Integration Walkthrough

#### Application Architecture

SecureGate integrates NetLicensing into three primary touchpoints:

1. **Access Control Readers** at entry points, parking gates, and amenities call the Validation API to check Licensee entitlements before granting access.
2. **Tenant Management Portal** (web application) provisions new Licensees and issues Rental licenses for temporary access.
3. **Network Access Points** (switches, firewalls) query NetLicensing to assign VLAN and bandwidth policies.

#### API Endpoint Configuration

NetLicensing API base URL: `https://go.netlicensing.io/core/v2/rest/`

All API calls require HTTP Basic Authentication using NetLicensing API credentials.

#### Creating a Licensee (Tenant Onboarding)

When SecureGate onboards a new tenant, the portal calls this endpoint to register the tenant as a Licensee:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-api-key" \
  -d "licenseeNumber=TENANT-00312" \
  -d "active=true" \
  -d "name=Acme Corp - Suite 500"
```

**Response:**
```json
{
  "licensee": {
    "number": "TENANT-00312",
    "active": true,
    "name": "Acme Corp - Suite 500",
    "productNumber": "SECUREGATE-001",
    "creationTime": "2026-04-19T10:30:00Z"
  }
}
```

#### Assigning License Templates to a Licensee

Upon tenant onboarding, SecureGate auto-assigns the appropriate physical access and network access licenses based on subscription tier:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-api-key" \
  -d "licenseTemplateNumber=PREMIUM-PHYS" \
  -d "licenseeNumber=TENANT-00312" \
  -d "active=true"
```

**Response:**
```json
{
  "license": {
    "number": "L-TENANT-00312-PHYS-001",
    "active": true,
    "licenseeNumber": "TENANT-00312",
    "licenseTemplateNumber": "PREMIUM-PHYS",
    "creationTime": "2026-04-19T10:31:00Z"
  }
}
```

Repeat for network tier license:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-api-key" \
  -d "licenseTemplateNumber=PREMIUM-NETWORK" \
  -d "licenseeNumber=TENANT-00312" \
  -d "active=true"
```

#### Validating Access at Entry Points

When a cardholder swipes at a building entrance, the access control reader calls the Validation API:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/TENANT-00312/validate" \
  -u "apikey:your-api-key"
```

**Response:**
```json
{
  "validationResult": {
    "valid": true,
    "licenseeNumber": "TENANT-00312",
    "productModuleValidations": [
      {
        "productModule": "PHYS-ACCESS",
        "valid": true,
        "features": ["BUILDING_ENTRY", "PREMIUM_PARKING", "CONF_ROOM_PRIORITY", "GYM_ACCESS"],
        "licensing": "MultiFeature"
      },
      {
        "productModule": "NETWORK-TIER",
        "valid": true,
        "features": ["STANDARD_BANDWIDTH", "PREMIUM_BANDWIDTH", "GUEST_WIFI_PROVISIONING", "SEGMENT_ISOLATION"],
        "licensing": "MultiFeature"
      },
      {
        "productModule": "TEMP-ACCESS",
        "valid": false,
        "features": [],
        "licensing": "Rental"
      }
    ]
  }
}
```

The access control reader inspects the `valid` flag and feature list. If `BUILDING_ENTRY` is present and the overall result is valid, the reader unlocks the door. The access point logs the validation result (success/denial) and licensee number for audit purposes.

#### Creating Temporary Access (Contractor Badge)

When a SecureGate tenant authorizes a contractor for 72-hour building access, the tenant portal issues a Rental license:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-api-key" \
  -d "licenseeNumber=CONTRACTOR-08456" \
  -d "active=true" \
  -d "name=John Smith - ABC Contractors"
```

Then assign the temporary access license:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-api-key" \
  -d "licenseTemplateNumber=CONTRACTOR-72H" \
  -d "licenseeNumber=CONTRACTOR-08456" \
  -d "active=true" \
  -d "startDate=2026-04-20T08:00:00Z"
```

**Response:**
```json
{
  "license": {
    "number": "L-CONTRACTOR-08456-TEMP-001",
    "active": true,
    "licenseeNumber": "CONTRACTOR-08456",
    "licenseTemplateNumber": "CONTRACTOR-72H",
    "startDate": "2026-04-20T08:00:00Z",
    "creationTime": "2026-04-19T15:00:00Z"
  }
}
```

The contractor can now access the building for 72 hours from the start date. After 72 hours, the license expires, and subsequent validation calls will return `valid: false`.

#### Checking Remaining Time Volume

For UI feedback (e.g., displaying "Time remaining: 48 hours"), the portal queries:

```bash
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/CONTRACTOR-08456/validate?productModuleNumber=TEMP-ACCESS" \
  -u "apikey:your-api-key"
```

**Response (while license is active):**
```json
{
  "validationResult": {
    "valid": true,
    "licenseeNumber": "CONTRACTOR-08456",
    "productModuleValidations": [
      {
        "productModule": "TEMP-ACCESS",
        "valid": true,
        "licensing": "Rental",
        "timeVolumeRemaining": 48,
        "timeVolumeUnit": "HOUR"
      }
    ]
  }
}
```

#### Network Access Decision Logic

Network access points pull the same validation response and use the feature list to assign network policies:

```python
# Pseudocode for network access point decision logic
def assign_network_policy(licensee_number):
    validation = validate_licensee(licensee_number)
    
    if not validation['valid']:
        assign_policy('deny_all')
        return
    
    for module_result in validation['productModuleValidations']:
        if module_result['productModule'] == 'NETWORK-TIER':
            features = module_result['features']
            
            if 'PREMIUM_BANDWIDTH' in features:
                assign_vlan(200)  # Premium VLAN
                set_bandwidth_limit('1000 Mbps')
            else:
                assign_vlan(100)  # Standard VLAN
                set_bandwidth_limit('100 Mbps')
            
            if 'GUEST_WIFI_PROVISIONING' in features:
                enable_guest_ssid_creation()
            
            if 'SEGMENT_ISOLATION' in features:
                enable_network_isolation()
```

### Licensee Management

#### Auto-Provisioning via Tenant Portal

SecureGate's tenant self-service portal allows authorized tenant administrators to provision temporary access for visitors without manual intervention:

1. **Tenant admin logs in** and navigates to "Guest Access" section.
2. **Portal prompts for:** guest name, access start date/time, duration (hours), and required resources (building entry, parking, conference room).
3. **Backend logic (Python example):**

```python
def create_guest_access(guest_name, tenant_number, duration_hours, resources):
    # Create licensee for guest
    guest_licensee = create_licensee({
        'licenseeNumber': f'GUEST-{uuid.uuid4()[:8].upper()}',
        'name': guest_name,
        'active': True
    })
    
    # Select appropriate template based on duration
    if duration_hours == 24:
        template = 'GUEST-1DAY'
    elif duration_hours == 72:
        template = 'CONTRACTOR-72H'
    else:
        template = 'CONTRACTOR-72H'  # fallback
    
    # Assign license
    license = create_license({
        'licenseTemplateNumber': template,
        'licenseeNumber': guest_licensee['number'],
        'active': True,
        'startDate': datetime.utcnow().isoformat() + 'Z'
    })
    
    return {
        'licensee_number': guest_licensee['number'],
        'access_code': license['number'],
        'expires_at': calculate_expiry(license, duration_hours)
    }
```

4. **Portal displays access code** (e.g., `GUEST-A8C2F9B2` or QR code) that the guest can use at entry readers.

#### Manual Licensee Creation for Long-Term Access

For permanent residents or dedicated contractors, SecureGate creates Licensees directly via the Management Console or API:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-api-key" \
  -d "licenseeNumber=EMP-00847" \
  -d "active=true" \
  -d "name=Jane Doe - Facilities Manager" \
  -d "custom_field_employee_id=847"
```

The `custom_field_employee_id` custom property maps the NetLicensing Licensee to SecureGate's internal HR database, enabling sync and audit trail alignment.

#### Licensee to Physical Badge Mapping

SecureGate's access control hardware stores a mapping table:

| Badge Swipe | Licensee Number | Reader Location | Timestamp | Allowed? |
|---|---|---|---|---|
| 5832 | TENANT-00312 | Building A Lobby | 2026-04-19 09:15:00 | Yes |
| 5832 | TENANT-00312 | Parking Gate 2 | 2026-04-19 09:20:00 | Yes |
| 4201 | CONTRACTOR-08456 | Building A Lobby | 2026-04-22 14:30:00 | No (expired) |

When a badge reader detects a swipe, it maps the badge to the `licenseeNumber` and calls the Validation API. Expired Rental licenses automatically return invalid status.

### Shop & Payment Integration

SecureGate does **not** use NetLicensing Shop for tenant access provisioning, as tenant relationships are B2B with direct contracts and invoicing.

**Alternative flow (enterprise direct billing):**

1. **Sales team negotiates tenant contract** specifying access tier (Basic, Premium) and duration.
2. **NetLicensing Licensee created** via API during contract signing with licenses auto-assigned.
3. **Monthly billing** is handled through SecureGate's own invoicing system tied to the contract, not NetLicensing transactions.

**Monetized temporary access (optional):**

For Ad-Hoc temporary access (beyond included limits), SecureGate could enable Shop-based provisioning:

1. **Generate shop token for tenant:**

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-api-key" \
  -d "tokenType=SHOP" \
  -d "licenseeNumber=TENANT-00312"
```

**Response:**
```json
{
  "token": {
    "number": "TOKEN-XYZ123",
    "value": "https://shop.netlicensing.io/?token=TOKEN-XYZ123&utm_source=securegate",
    "creationTime": "2026-04-19T11:00:00Z"
  }
}
```

2. **Tenant clicks shop link** to purchase additional temporary access passes.
3. **Shop license purchased** (e.g., 10-pack of 24-hour guest passes at $50).
4. **SecureGate backend receives webhook notification** of successful purchase and credits tenant account with 10 guest access licenses.

For now, SecureGate issues temporary access at no charge to existing tenants, as it's bundled into their subscription.

### Edge Cases & Best Practices

#### Offline Grace Period Handling

Access readers operate in facilities where network connectivity may be intermittent (basement levels, outdoor gates). SecureGate implements local caching:

1. **Readers cache validation results** for 4 hours with encrypted storage on the reader device.
2. **On offline access request:** Reader checks local cache. If cached validation exists and is fresh, access is granted with a warning flag logged.
3. **On online reconnection:** Reader validates all cached access against NetLicensing API and syncs results.

```python
def validate_with_offline_fallback(licensee_number, reader_id):
    try:
        validation = validate_licensee_online(licensee_number)
        cache_validation(licensee_number, validation, reader_id)
        return validation
    except NetworkError:
        cached = get_cached_validation(licensee_number, reader_id)
        if cached and cached['age_seconds'] < 14400:  # 4 hours
            return cached
        else:
            return {'valid': False, 'reason': 'offline_cache_expired'}
```

#### License Transfer and Re-activation

When a Licensee (e.g., tenant employee) transfers to a different office within SecureGate's portfolio:

1. **New Licensee created** for the new office.
2. **Old licenses deactivated** via API:

```bash
curl -X POST "https://go.netlicensing.io/core/v2/rest/license/L-OLD-LICENSE-NUM" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "apikey:your-api-key" \
  -d "active=false"
```

3. **New licenses assigned** to the new Licensee.

#### Audit Logging

SecureGate logs all validation calls and access decisions to an immutable audit log for SOC 2 compliance:

```json
{
  "timestamp": "2026-04-19T09:15:00Z",
  "event": "access_attempt",
  "reader_id": "LOBBY-A-01",
  "licensee_number": "TENANT-00312",
  "badge_swipe_id": "5832",
  "validation_valid": true,
  "features_checked": ["BUILDING_ENTRY"],
  "access_granted": true,
  "log_hash": "sha256:abc123def456"
}
```

Audit logs are immutable and retained for 7 years per regulatory requirements.

#### Error Handling and Retry Logic

Access readers implement exponential backoff for transient API failures:

```python
def validate_with_retry(licensee_number, max_retries=3):
    for attempt in range(max_retries):
        try:
            return validate_licensee(licensee_number)
        except requests.Timeout:
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt  # 1s, 2s, 4s
                time.sleep(wait_time)
            else:
                # Last attempt failed; use offline cache or deny
                return get_cached_validation(licensee_number) or {'valid': False}
        except requests.ConnectionError:
            # Network down; use offline cache
            return get_cached_validation(licensee_number) or {'valid': False}
```

#### Rate Limiting

NetLicensing enforces rate limits (typically 100 req/sec per API key). SecureGate mitigates this by:

1. **Validation caching at the reader:** Cache successful validations for 60 seconds; only re-validate if cache expires.
2. **Batch validation for network access:** Network switches query entitlements once per user session, not per packet.
3. **Monitoring dashboard:** SecureGate monitors API call volume and requests increased rate limits during peak hours if needed.

#### Handling Expired Rental Licenses

When a Contractor's 72-hour rental access window expires, the access control system behavior:

1. **Entry reader validation call returns `valid: false`.**
2. **Reader denies access** and displays message: "Access expired. Contact building management."
3. **Audit log records denial** with licensee number and reason (expired license).
4. **Tenant can re-issue new license** if contractor needs extended access.

### Results & Outcome

After integrating NetLicensing, SecureGate achieved:

- **Administrative overhead reduced 60%:** Temporary access provisioning now requires 2 minutes (self-service portal) instead of 30 minutes of manual badge programming and calendar reminders. Automated expiration eliminated revocation tasks.

- **Security posture improved:** Time-limited licenses automatically expire without manual revocation, eliminating forgotten-badge-removal incidents. Complete audit logs provide SOC 2 compliance evidence.

- **Conference room and amenity utilization optimized:** Integration with reservation systems ensures access is granted only during booked time slots, eliminating unauthorized usage and double-booking conflicts.

- **Network tier monetization enabled:** Premium tenants can now be offered tiered network services (premium bandwidth, guest Wi-Fi provisioning, segment isolation) through feature-based licensing, opening new revenue streams. SecureGate projects $150K/year in additional revenue from premium network tier adoption.

- **Feature-based access control reduced implementation complexity:** Instead of building custom permission logic, SecureGate maps business features directly to NetLicensing features, reducing development effort by 40%.

- **Multi-facility expansion simplified:** New facility onboarding requires only replicating the same NetLicensing Product configuration; no hardware-level changes. SecureGate plans to deploy to 8 additional facilities within 12 months.

- **Self-service tenant portal adoption:** 85% of tenants now use the self-service portal for temporary access; support ticket volume for access requests dropped from 12/week to 2/week.

- **Audit compliance:** Complete validation and access decision logs enable SecureGate to pass security audits in 2 weeks (previously 6 weeks of manual log collection).

SecureGate continues to expand access control capabilities by adding additional features (e.g., time-of-day restrictions, location-based access for hybrid work scenarios) as business requirements evolve, all within the same NetLicensing framework.
