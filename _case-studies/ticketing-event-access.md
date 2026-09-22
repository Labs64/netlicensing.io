---
layout: casestudy
title: "Event Management: Subscription, Per-Event, and Floating Access Passes"
description: "A hybrid event platform implemented flexible ticketing with subscription passes, per-event tickets, and concurrent attendance limits to manage live and virtual event access without custom infrastructure."
permalink: "/case-studies/ticketing-event-access/"
img: "/img/case-studies/netlicensing-case-study-ticketing-event-access.png"
tags:
- Case Studies
- Use Cases
- Events
- Entertainment
- Virtual Events
- Ticketing
industry:
- Events / Entertainment / Virtual Events
use-case:
- Event ticketing
- Access passes
- Concurrent attendance
- Subscription management
favorite-feature:
- Licensing Model "Subscription"
- Licensing Model "Floating"
- Per-Event Licensing
---

### Overview

EventSphere is a SaaS platform for professional conference organizers, event management companies, and corporate learning teams that host a mix of live in-person, hybrid, and fully virtual events. The platform supports event discovery and registration, ticketing, live streaming, attendee networking, and post-event analytics. EventSphere serves clients ranging from small 50-person webinars to major industry conferences with 10,000+ attendees. The platform previously relied on a legacy ticketing system that separated physical and virtual event flows, had no support for subscription or membership models, and lacked any mechanism to enforce concurrent viewer limits for virtual events. After integrating NetLicensing, EventSphere moved to a unified entitlement system supporting three distinct ticketing models: subscription passes for unlimited annual event access, per-event tickets with time-bound validity, and floating licenses to enforce concurrent viewer limits for virtual events.

### Licensing Challenge

EventSphere's customers operated in three distinct ticketing scenarios, each with different requirements:

**Individual Event Attendees:** Customers needed to purchase tickets to specific events (e.g., "Q2 Industry Conference," "Advanced Sales Techniques Webinar"). Each ticket was valid only for that specific event and became worthless after the event concluded. The legacy system stored ticket data in a spreadsheet-like database with manual check-in at physical gates and no real-time validation capability. Refunds required manual database edits by EventSphere ops staff.

**Corporate Team Subscriptions:** Enterprise customers (Fortune 500 companies, government agencies) wanted annual "all-access" passes for their entire teams. They wanted 100-200 of their employees to be able to attend any event throughout the year without individual ticket purchases. The legacy system had no way to express "unlimited events within a time period," forcing EventSphere to either charge per-employee per-event (creating invoice chaos) or provide flat-fee annual contracts with unlimited access (massive revenue leakage). There was also no way to track which employees were using the pass, making compliance audits impossible.

**Concurrent Virtual Event Access:** Virtual events were plagued by credential sharing. A customer purchasing a 5-seat virtual event pass would share that single login across their entire department, allowing 50+ people to watch the stream on one ticket. EventSphere had no way to enforce "exactly 5 simultaneous viewers" and had to rely on manual monitoring and customer honesty. This resulted in an estimated 30% revenue loss on virtual event tickets.

**Operational Bottlenecks:** Ticket transfers were manual (customer emails ops, ops creates new ticket, ops deletes old ticket). Refund processing took 3-5 business days. Check-in at physical events required staff to manually verify printed ticket sheets or customer email confirmations against a master list. There was no real-time integration between registration, payment, and access control.

### Chosen Licensing Model

EventSphere implemented a three-tier entitlement architecture using NetLicensing:

1. **Subscription Licensing** for annual all-access passes
2. **Feature-Based Licensing** for individual event tickets with time-bound validity
3. **Floating Licensing** for concurrent virtual event viewer limits

**Why Subscription:** Corporate customers purchasing annual all-access passes receive a Subscription license with a 1-year validity period. The subscription automatically validates against any event within the active subscription term without requiring per-event ticket issuance. This aligns with the customer's purchasing model (one contract, annual renewal) and provides EventSphere with predictable annual revenue and simple licensing logic.

**Why Feature-Based:** Each individual event ticket is issued as a Feature license. The feature identifier is a unique event code (e.g., `event-q2-conf-2024-05-15`). The license's expiry time is set to the event's end timestamp. When an attendee tries to check in, NetLicensing validates that the attendee's Licensee has a Feature license matching the event code and that the license hasn't expired. This provides real-time, automated check-in without manual intervention.

**Why Floating:** Corporate team virtual event passes use Floating licenses with a `maxSessions` parameter. When 5 employees join a virtual stream, each performs a `checkOut` operation via the validation API, incrementing the session count. When the 6th employee tries to join, NetLicensing returns `valid: false, sessions_remaining: 0`, blocking access. When an employee leaves the stream, a `checkIn` operation returns the session slot. This enforces the concurrent limit programmatically.

### NetLicensing Configuration

#### Step-by-step Management Console Setup

1. **Create the Master Product**
   - Name: "EventSphere Ticketing Platform"
   - Product Number: `EVENTSPHERE-PROD-001`
   - Version: `3.2`
   - Licensee Auto-Create: Enable (attendees self-register)
   - Description: "Unified event registration, ticketing, and access control"

2. **Create Product Module: Subscription Passes**
   - Module Number: `EVENTSPHERE-MOD-SUBSCRIPTIONS`
   - Name: "Annual All-Access Subscriptions"
   - Licensing Model: **Subscription**
   - Description: "Annual subscription granting unlimited access to all events"

3. **Create Product Module: Per-Event Tickets**
   - Module Number: `EVENTSPHERE-MOD-EVENTS`
   - Name: "Individual Event Tickets"
   - Licensing Model: **Multi-Feature** (each event is a distinct feature)
   - Description: "Event-specific entry passes with automatic expiration"

4. **Create Product Module: Virtual Concurrency Control**
   - Module Number: `EVENTSPHERE-MOD-VIRTUAL`
   - Name: "Concurrent Virtual Event Viewer Limits"
   - Licensing Model: **Floating**
   - Description: "Enforces max concurrent viewers per virtual event stream"

#### License Templates: Subscriptions

**Template 1: Annual Corporate Subscription**
- Template Number: `LT-CORP-ANNUAL-SUBSCRIPTION`
- Name: "Corporate Annual All-Access Pass"
- License Type: SUBSCRIPTION
- Price: €50000 / year
- Currency: EUR
- Validity Period: 12 months
- Automatic Renewal: Yes
- Active: Yes
- Description: "Grants unlimited event access for entire organization for 12 months; includes all live, hybrid, and virtual events"

**Template 2: Team Lead Subscription (smaller orgs)**
- Template Number: `LT-TEAM-SUBSCRIPTION`
- Name: "Team Subscription - 5 Users"
- License Type: SUBSCRIPTION
- Price: €8000 / year
- Currency: EUR
- Validity Period: 12 months
- Automatic Renewal: Yes
- Active: Yes

#### License Templates: Per-Event Tickets

**Template 1: Standard Event Ticket**
- Template Number: `LT-EVENT-STANDARD`
- Name: "Standard Event Ticket"
- License Type: FEATURE
- Price: €99 per ticket
- Currency: EUR
- Active: Yes
- Description: "Single-event entry; expires at event conclusion"

**Template 2: VIP/Premium Event Ticket**
- Template Number: `LT-EVENT-VIP`
- Name: "VIP Event Ticket"
- License Type: FEATURE
- Price: €299 per ticket
- Currency: EUR
- Active: Yes
- Description: "Premium seating/early access to pre-event materials; expires at event conclusion"

**Template 3: Speaker/Organizer Pass**
- Template Number: `LT-EVENT-SPEAKER`
- Name: "Speaker/Organizer Pass"
- License Type: FEATURE
- Price: €0 (complimentary)
- Currency: EUR
- Active: Yes
- Description: "Full access to event and backstage areas; non-transferable"

#### License Templates: Virtual Concurrency

**Template 1: Small Team Virtual Pass (1-5 concurrent)**
- Template Number: `LT-VIRTUAL-5-SEAT`
- Name: "Virtual Event Pass - 5 Concurrent Viewers"
- License Type: FLOATING
- Price: €499 per event
- Max Sessions: 5
- Currency: EUR
- Active: Yes

**Template 2: Department Virtual Pass (6-20 concurrent)**
- Template Number: `LT-VIRTUAL-20-SEAT`
- Name: "Virtual Event Pass - 20 Concurrent Viewers"
- License Type: FLOATING
- Price: €1199 per event
- Max Sessions: 20
- Currency: EUR
- Active: Yes

**Template 3: Enterprise Virtual Pass (unlimited concurrent)**
- Template Number: `LT-VIRTUAL-UNLIMITED`
- Name: "Virtual Event Pass - Unlimited Concurrent Viewers"
- License Type: FLOATING
- Price: €2999 per event
- Max Sessions: 999 (practical unlimited)
- Currency: EUR
- Active: Yes

#### Custom Properties

- `attendeeType`: "INDIVIDUAL", "CORPORATE", "SPEAKER", "ORGANIZER" — for analytics and support routing
- `eventId`: e.g., "EVENT-Q2-CONF-2024-05-15" — links to the event being attended
- `subscriptionAutoRenewal`: "yes", "no" — whether to automatically renew subscription on expiry

### Integration Walkthrough

#### Architecture

EventSphere's ticketing system validates access at three integration points: online ticket purchase (checkout), physical event check-in (gate/kiosk), and virtual event stream login (video platform).

#### Attendee Registration and Licensee Creation

When an individual or corporate representative registers for EventSphere, they become a Licensee:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "product=EVENTSPHERE-PROD-001" \
  -d "name=Marie Dupont" \
  -d "licensee.attendeeType=INDIVIDUAL" \
  -d "licensee.corporateAffiliation=None"
```

**Response:**
```json
{
  "licensee": {
    "number": "I-ATTENDEE-8f7e6d5c",
    "name": "Marie Dupont",
    "active": true,
    "creationTime": "2026-04-19T09:15:00.000Z"
  }
}
```

For corporate customers, a single Licensee is created representing the organization, and individual employees are tracked via a custom property:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "product=EVENTSPHERE-PROD-001" \
  -d "name=Acme Corporation - Event Access" \
  -d "licensee.attendeeType=CORPORATE" \
  -d "licensee.corporateAffiliation=Acme Inc" \
  -d "licensee.subscriptionAutoRenewal=yes"
```

#### Ticket Purchase: Individual Event

When Marie purchases a ticket to the Q2 Industry Conference online, EventSphere:

1. Generates a unique event feature identifier: `event-q2-conf-2024-05-15`
2. Creates a Feature license for Marie's Licensee, expiring at the event's end time:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "licenseTemplate=LT-EVENT-STANDARD" \
  -d "licensee=I-ATTENDEE-8f7e6d5c" \
  -d "name=Q2 Industry Conference Ticket" \
  -d "licenseeName=Marie Dupont" \
  -d "feature=event-q2-conf-2024-05-15" \
  -d "startDate=2026-05-15T08:00:00Z" \
  -d "expiresAt=2026-05-17T18:00:00Z" \
  -d "active=true"
```

**Response:**
```json
{
  "license": {
    "number": "L-TICKET-5c4d3e2f",
    "licenseTemplate": "LT-EVENT-STANDARD",
    "licensee": "I-ATTENDEE-8f7e6d5c",
    "active": true,
    "feature": "event-q2-conf-2024-05-15",
    "expiresAt": "2026-05-17T18:00:00.000Z"
  }
}
```

Marie receives a confirmation email with her ticket details and a QR code encoding her `licensee_id` and `license_id` for check-in.

#### Check-In at Physical Event Gates

At the conference venue, an EventSphere check-in kiosk (iPad running the EventSphere app) scans Marie's QR code, extracting her Licensee ID. The app validates in real-time:

```bash
# Check-in validation request
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/I-ATTENDEE-8f7e6d5c/validate?productModule=EVENTSPHERE-MOD-EVENTS&productModule=EVENTSPHERE-MOD-SUBSCRIPTIONS" \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -H "Accept: application/json"
```

**Response:**
```json
{
  "productModuleValidation": [
    {
      "productModule": "EVENTSPHERE-MOD-EVENTS",
      "valid": true,
      "licenses": [
        {
          "number": "L-TICKET-5c4d3e2f",
          "feature": "event-q2-conf-2024-05-15",
          "valid": true,
          "expiresAt": "2026-05-17T18:00:00.000Z"
        }
      ]
    },
    {
      "productModule": "EVENTSPHERE-MOD-SUBSCRIPTIONS",
      "valid": false,
      "message": "No active subscription"
    }
  ]
}
```

The kiosk checks for either:
- A Feature license with `feature=event-q2-conf-2024-05-15` and `valid=true` (per-event ticket), OR
- Any active Subscription license (corporate all-access pass)

If either condition is met, the gate unlocks and Marie is checked in. If both are false or expired, access is denied.

#### Subscription Ticket: Corporate All-Access

When Acme Corp purchases an annual subscription for their 200-person organization:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "licenseTemplate=LT-CORP-ANNUAL-SUBSCRIPTION" \
  -d "licensee=I-ACME-CORP-001" \
  -d "name=Acme Corp Annual All-Access" \
  -d "active=true" \
  -d "startDate=2026-04-19T00:00:00Z" \
  -d "expiresAt=2027-04-18T23:59:59Z"
```

This creates a single Subscription license for Acme's Licensee account. Now any Acme employee (represented as a sub-Licensee under Acme's account, or tracked via a custom property) can validate against this license and gain access to any event within the 12-month window.

EventSphere implements employee access like this:

```python
def validate_acme_employee_access(employee_name, employee_email):
    # Query Acme's corporate Licensee
    acme_licensee_id = "I-ACME-CORP-001"
    
    validation_response = validate_licensee(
        licensee_id=acme_licensee_id,
        productModule="EVENTSPHERE-MOD-SUBSCRIPTIONS"
    )
    
    if validation_response['valid']:
        # Employee is covered by corporate subscription
        return {
            'access': True,
            'reason': 'Acme Annual All-Access Subscription',
            'expiresAt': validation_response['licenses'][0]['expiresAt']
        }
    else:
        # Corporate subscription expired or invalid
        return {
            'access': False,
            'reason': 'Corporate subscription expired or not active'
        }
```

#### Virtual Event Concurrency Control

When registering for a virtual event, a corporate customer purchases a "5-seat virtual pass" granting 5 concurrent viewers:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "licenseTemplate=LT-VIRTUAL-5-SEAT" \
  -d "licensee=I-ACME-CORP-001" \
  -d "name=Q2 Conference Virtual Pass - 5 Seats" \
  -d "feature=event-q2-conf-virtual-05-15" \
  -d "active=true"
```

When the first Acme employee joins the virtual stream, EventSphere performs a checkOut operation:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee/I-ACME-CORP-001/validate \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "productModule=EVENTSPHERE-MOD-VIRTUAL" \
  -d "action=checkOut" \
  -d "feature=event-q2-conf-virtual-05-15" \
  -d "sessionId=SESSION-user1-stream-001"
```

**Response:**
```json
{
  "productModuleValidation": [
    {
      "productModule": "EVENTSPHERE-MOD-VIRTUAL",
      "valid": true,
      "feature": "event-q2-conf-virtual-05-15",
      "maxSessions": 5,
      "sessionsActive": 1,
      "sessionsRemaining": 4
    }
  ]
}
```

The video player receives `valid: true` and the stream loads. As the 2nd, 3rd, 4th, and 5th Acme employees join, each checkOut increments `sessionsActive`. When the 6th employee tries to join:

```json
{
  "productModuleValidation": [
    {
      "productModule": "EVENTSPHERE-MOD-VIRTUAL",
      "valid": false,
      "feature": "event-q2-conf-virtual-05-15",
      "maxSessions": 5,
      "sessionsActive": 5,
      "sessionsRemaining": 0,
      "message": "Maximum concurrent viewers reached"
    }
  ]
}
```

The video player displays: "All 5 seats are in use. Please wait for someone to exit or purchase additional seats." This prevents credential sharing while allowing flexible team participation within the purchased seat count.

When an employee exits the stream, EventSphere performs a checkIn:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee/I-ACME-CORP-001/validate \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "productModule=EVENTSPHERE-MOD-VIRTUAL" \
  -d "action=checkIn" \
  -d "feature=event-q2-conf-virtual-05-15" \
  -d "sessionId=SESSION-user1-stream-001"
```

This decrements `sessionsActive` back to 4, freeing a seat.

### Licensee Management

#### Automatic Expiration of Event Tickets

NetLicensing automatically marks event licenses as `valid: false` after the event's expiry timestamp. EventSphere configures all per-event Feature licenses with an `expiresAt` matching the event's end time. Once the event concludes, validation requests return `valid: false` without EventSphere having to do anything.

#### Ticket Transfers (Self-Service)

If Marie cannot attend the Q2 Conference and wants to transfer her ticket to a colleague (John), EventSphere implements this via the NetLicensing API:

```bash
# Get Marie's license
curl -X GET "https://go.netlicensing.io/core/v2/rest/licensee/I-ATTENDEE-8f7e6d5c/validate" \
  -H "Authorization: Basic YOUR_API_TOKEN"

# Create John as a Licensee (if not already)
curl -X POST https://go.netlicensing.io/core/v2/rest/licensee \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "product=EVENTSPHERE-PROD-001" \
  -d "name=John Smith"

# Transfer the license from Marie to John (by re-issuing)
curl -X POST https://go.netlicensing.io/core/v2/rest/license \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "licenseTemplate=LT-EVENT-STANDARD" \
  -d "licensee=I-ATTENDEE-john-smith" \
  -d "name=Q2 Industry Conference Ticket" \
  -d "feature=event-q2-conf-2024-05-15" \
  -d "expiresAt=2026-05-17T18:00:00Z" \
  -d "active=true"

# Deactivate Marie's license
curl -X POST https://go.netlicensing.io/core/v2/rest/license/L-TICKET-5c4d3e2f \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "active=false"
```

The entire transfer completes in seconds without manual ops intervention.

#### Refund Processing

If Marie requests a refund, EventSphere deactivates her license:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/license/L-TICKET-5c4d3e2f \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "active=false"
```

Within seconds, her license becomes invalid. She can no longer check in. EventSphere's payment processor (Stripe) issues a refund simultaneously. No manual ops work required.

### Shop & Payment Integration

#### Shop Token for Tickets

EventSphere generates Shop tokens to allow customers to purchase tickets via the NetLicensing Shop. When a customer is ready to buy a ticket to the Q2 Conference:

```bash
curl -X POST https://go.netlicensing.io/core/v2/rest/token \
  -H "Authorization: Basic YOUR_API_TOKEN" \
  -d "tokenType=SHOP" \
  -d "licensee=I-ATTENDEE-8f7e6d5c" \
  -d "licenseTemplate=LT-EVENT-STANDARD" \
  -d "successUrl=https://eventsphere.example.com/tickets?purchase=success" \
  -d "cancelUrl=https://eventsphere.example.com/tickets?purchase=cancelled"
```

**Response:**
```json
{
  "token": {
    "number": "SHOP-TOKEN-a1b2c3d4",
    "tokenType": "SHOP",
    "shopUrl": "https://go.netlicensing.io/shop/v2/?shoptoken=SHOP-TOKEN-a1b2c3d4"
  }
}
```

The EventSphere website embeds this Shop URL in a "Buy Ticket" button. Clicking it takes the customer to the NetLicensing Shop, where they enter payment info (Stripe or PayPal) and complete purchase. Upon success, NetLicensing creates the license and redirects to EventSphere's success page.

#### Payment Gateway

EventSphere configured NetLicensing's payment integration with Stripe as the primary gateway, supporting credit cards, debit cards, and ACH transfers. All transaction data (amounts, currencies, customer details) flows through Stripe's API, with NetLicensing serving as the entitlement issuer.

#### Post-Purchase License Activation

EventSphere's backend listens for webhook events from NetLicensing when licenses are issued:

```python
# Example webhook handler
@app.route('/webhooks/netlicensing', methods=['POST'])
def handle_netlicensing_webhook(request):
    event = request.json
    
    if event['eventType'] == 'license.created':
        license_number = event['license']['number']
        licensee_id = event['license']['licensee']
        feature = event['license'].get('feature')
        
        # Send confirmation email with QR code
        attendee = get_attendee_by_licensee_id(licensee_id)
        send_ticket_confirmation_email(attendee, license_number, feature)
        
        return {'status': 'ok'}
```

### Edge Cases & Best Practices

#### Virtual Stream Timeout Handling

If an employee's internet connection drops during a virtual stream, their session may remain "checked out" indefinitely, blocking other team members from using that seat. EventSphere implements a 30-minute activity timeout: if a checked-out session sends no keep-alive heartbeat for 30 minutes, EventSphere automatically performs a checkIn, freeing the seat.

```python
def cleanup_idle_sessions():
    """Run every 5 minutes to detect and free timed-out sessions"""
    idle_sessions = get_sessions_without_heartbeat(minutes=30)
    for session_id in idle_sessions:
        licensee_id = session_id['licensee']
        feature = session_id['feature']
        
        validate_licensee(
            licensee_id=licensee_id,
            productModule="EVENTSPHERE-MOD-VIRTUAL",
            action="checkIn",
            sessionId=session_id
        )
        
        log_event("SESSION_TIMEOUT_CLEANUP", session_id)
```

#### Subscription Renewal Failures

If Acme Corp's subscription renewal payment fails (card declined, billing address changed), NetLicensing doesn't automatically deactivate the license on day 1. Instead:

1. Day 1 (renewal date): Payment fails; NetLicensing marks the license for renewal but keeps it active
2. Day 3: EventSphere triggers an email to Acme's billing contact: "Renewal payment failed"
3. Day 10: Final reminder email with urgency
4. Day 15: License is deactivated; employees lose access and see a "Subscription Expired" message in the app

This grace period prevents sudden service disruption while giving the customer time to fix payment issues.

#### Concurrent Viewer Surge Protection

If an event goes viral and 10,000+ people try to access simultaneously, this could cause a thundering herd at NetLicensing's validation API. EventSphere implements client-side caching: once a validation succeeds, the result is cached locally for 60 seconds. If NetLicensing becomes temporarily unavailable, the cached validation allows the stream to continue (with a disclaimer that licensing status may be stale).

#### Audit and Compliance Logging

EventSphere maintains an audit log for every licensing event:

```
timestamp            | event_type        | licensee_id         | license_id      | details
2026-05-15 09:00:00 | LICENSE_CREATED   | I-ATTENDEE-8f7e6d5c | L-TICKET-5c4d3e2f | Q2 Conference; expires 2026-05-17
2026-05-15 09:15:00 | VALIDATION_CHECK  | I-ATTENDEE-8f7e6d5c | L-TICKET-5c4d3e2f | Gate check-in at venue; VALID
2026-05-16 14:30:00 | CHECKOUT          | I-ACME-CORP-001    | L-VIRTUAL-5seat  | Virtual stream session start; sessions_active=1
2026-05-16 15:00:00 | CHECKIN           | I-ACME-CORP-001    | L-VIRTUAL-5seat  | Virtual stream session end; sessions_active=0
2026-05-18 10:00:00 | LICENSE_EXPIRED   | I-ATTENDEE-8f7e6d5c | L-TICKET-5c4d3e2f | Auto-expiration after event end
```

This audit trail supports compliance certifications, customer refund disputes, and organizational analytics.

### Results & Outcome

**Unified Infrastructure:** EventSphere consolidated three separate ticketing systems (physical events, virtual events, subscriptions) into a single entitlement platform. Operations work decreased by 50% as license issuance, check-in, transfers, and refunds became automated through the NetLicensing API.

**Credential Sharing Elimination:** Implementing concurrent viewer limits via Floating licenses recovered an estimated 25% of virtual event revenue previously lost to credential sharing. The "5 seats in use, wait for someone to exit" message is now visible to every corporate customer, creating transparency and discouraging abuse.

**Subscription Revenue Growth:** Separating subscription (all-access annual passes) from per-event tickets doubled adoption of subscription products. The annual all-access pass became the preferred purchasing model for enterprises with 200+ employees attending multiple events per year, providing EventSphere with predictable annual recurring revenue.

**Check-In Speed Improvement:** Real-time API validation eliminated manual check-in processes. Average check-in time at physical events dropped from 2-3 minutes per attendee (scanning spreadsheets) to 5-10 seconds (QR code scan + instant validation). This improved attendee experience and reduced venue staffing requirements by 40%.

**Customer Self-Service:** Ticket transfers and subscription management moved from 3-5 day manual ops cycles to instant self-service through the NetLicensing Shop and EventSphere's integration. Customer satisfaction with ticketing operations increased from 6.2/10 to 8.7/10 based on post-event surveys.

**Enterprise Adoption:** Large corporate customers with 1,000+ annual event attendees now represent 35% of EventSphere's revenue, up from 12% before NetLicensing integration. The ability to offer flexible subscription models (per-team, per-department, per-organization) with transparent concurrent viewer enforcement became a key sales differentiator.

**Payment Processing:** NetLicensing's integrated Stripe and PayPal payment gateways reduced payment processing overhead. Failed payment reconciliation is now automatic; NetLicensing flags renewal failures immediately, allowing EventSphere to reach out proactively rather than discovering issues during customer complaint calls.
