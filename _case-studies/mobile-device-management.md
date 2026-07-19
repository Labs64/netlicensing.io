---
layout: casestudy
title: "Mobile Device Management: Fleet Tracking and Software Provisioning"
description: "Track distributed mobile device deployments across departments and locations, correlating devices to contracts, users, and software requirements."
permalink: "/case-studies/mobile-device-management/"
img: "/img/case-studies/netlicensing-case-study-mobile-device-management-v2.png"
tags:
- Case Studies
- Use Cases
- Usage Tracking
- MDM
industry:
- Mobile
use-case:
- Validation
- Auto-Activation
favorite-feature:
- Product Usage Tracking and Analytics
- Licensing Model "Rental"
---

### Overview

A technology consulting firm deployed 500+ mobile devices (smartphones, tablets, laptops) across 8 offices, serving a mix of permanent employees and short-term contractors on project engagements. Devices were frequently reassigned between team members and locations as projects launched and concluded. The firm faced operational complexity: tracking which employee had which device, ensuring devices carried the correct software (client-specific applications, security tools, compliance agents), managing hardware warranties and insurance, and automating decommissioning when devices were returned. NetLicensing Rental licensing combined with device tracking enabled automated software provisioning and access control, turning device assignment into a lightweight, self-service process.

### Licensing Challenge

Manual device management created operational bottlenecks:

**Device-to-employee tracking**: A spreadsheet tracked device assignments, but updates lagged reality by days. When an employee left, IT staff couldn't quickly identify which devices to retrieve. Devices sitting in storage without assigned ownership created audit and compliance risks.

**Software provisioning latency**: When a device was reassigned to a new employee or project, IT manually determined which applications and security tools were needed, then either visited the employee or sent detailed installation instructions. Complex setups (VPN, compliance agents, client-specific apps) took 2–3 days. This delayed project starts and created support overhead.

**License compliance uncertainty**: The firm purchased enterprise software licenses (e.g., mobile development tools, security monitoring) with per-device limits. Without systematic device tracking, the firm risked accidentally deploying software beyond licensed seat counts, exposing the firm to legal liability and audit findings.

**Warranty and insurance management**: Device warranties and insurance coverage were tied to individual devices (serial numbers). When devices were reassigned, the firm often forgot to update warranty records, creating coverage gaps. When devices were lost or damaged, determining warranty status required manual lookups.

**Contractor device cleanup**: Contractor engagement typically lasted 3–6 months. When contracts ended, retrieving all issued devices was challenging. Devices sometimes "went missing" during contractor departures, representing both asset loss and data security risk.

### Chosen Licensing Model

The deployment used the **Rental License Model** with **Multi-Feature** capabilities:

- Each device assignment was represented as a Rental license with a defined time volume (contract duration)
- Example: contractor hired for 3-month project → device Rental license with `timeVolume=3`, `timeVolumePeriod=MONTH`
- Each license included multiple features (Rental metadata), specifying which applications and security tools the device should have: "Development Tools", "Client App A", "VPN Client", "Mobile Device Management Agent", "Compliance Monitoring"
- When a device was reassigned, the old Rental license was cancelled and a new one created for the new employee/project

The Rental model's automatic expiration was critical: when a contractor's engagement ended, their device Rental license expired automatically. The device flagged itself as unlicensed on the next cloud sync, triggering a deactivation sequence: the firm received an alert, IT could remotely wipe the device or send retrieval instructions, and sensitive data was protected even if the device went temporarily missing.

### NetLicensing Configuration

**Entity Structure:**
```
Product: Enterprise Mobile Device Fleet
├── Module: Device Assignment (Rental)
│   ├── Template: 3-Month Contractor Device (3 months, no cost)
│   ├── Template: Employee Device (3 years, no cost)
│   └── Template: Temporary Demo Device (2 weeks, no cost)
└── Module: Software & Features (Multi-Feature, per device)
    ├── Feature: Development Tools Suite
    ├── Feature: Client Confidential App
    ├── Feature: VPN & Network Access
    ├── Feature: Mobile Device Management Agent
    ├── Feature: Compliance Monitoring (HIPAA/SOC2)
    └── Feature: Secure Data Container
```

**Template Parameters:**
- Contractor 3-month device: `timeVolume=3`, `timeVolumePeriod=MONTH`, `price=0` (cost tracked elsewhere)
- Employee 3-year device: `timeVolume=36`, `timeVolumePeriod=MONTH`, `price=0`
- Demo device: `timeVolume=14`, `timeVolumePeriod=DAY`, `price=0`

**Device Metadata Storage:**
The firm stored the following in the Licensee profile (NetLicensing API custom fields or external CRM):
- Device serial number (IMEI, MAC address)
- Employee/contractor name and employee ID
- Project assignment and client name
- Software bundle required (e.g., "Client A - Full Stack")
- Assignment start and end dates (matched Rental license validity)

### Integration Walkthrough

**Device Provisioning on New Assignment:**

```
IT Manager Receives Request: "Deploy device to contractor Jane for 3-month project"
        ↓
POST /licensee (create Licensee for Jane)
   { "name": "Jane Contractor", "email": "jane@contractor.com" }
   → Response: licenseeNumber = C001
        ↓
POST /license (create 3-month Rental license)
   { "licensee": "C001", 
     "licenseTemplate": "3-MONTH-CONTRACTOR",
     "startDate": "2026-04-19",
     "expiryDate": "2026-07-19",
     "features": ["Development Tools", "Client App A", "VPN Client", "MDM Agent"]
   }
   → Response: licenseNumber = L001
        ↓
IT Links Physical Device to License:
   ├─ Scan device QR code (serial number)
   ├─ Platform associates device IMEI with licenseNumber L001
   ├─ Device receives provisioning profile (OTA installation)
        ↓
Device Provisioning Initiated (automated):
   ├─ Device receives activation token via NetLicensing API
   ├─ Cloud MDM service pushes feature list to device
   ├─ Device automatically installs:
   │  ├─ Development Tools Suite (binary from app store)
   │  ├─ Client Confidential App (enterprise distribution)
   │  ├─ VPN client (configured with firm credentials)
   │  ├─ MDM agent (allows remote lock/wipe/monitor)
   │  └─ Compliance monitoring (HIPAA-required audit logging)
   ├─ No manual installation steps; no IT site visit
   └─ Process completes in ~15 minutes
        ↓
Device Ready for Deployment:
   ├─ Mailed or handed to contractor Jane
   ├─ Device boots with all required apps pre-installed
   ├─ Jane logs in with her credentials → access to Client App A
   └─ Project work begins day 1
```

**License Validation on Device Sync:**

```
Device Connects to Corporate Network (WiFi or VPN)
        ↓
Device Firmware Initiates License Check:
   GET /licensee/C001/validate?deviceSerial={IMEI}
        ↓
NetLicensing Responds with License Status:
   {
     "status": "ACTIVE",
     "validUntil": "2026-07-19",
     "features": ["Development Tools", "Client App A", "VPN Client", "MDM Agent"],
     "daysRemaining": 87
   }
        ↓
Device Firmware Actions:
   ├─ Status = ACTIVE → all features enabled, normal operation
   ├─ Compare validUntil to local clock
   ├─ If 30 days remain: show notification "Device assignment expires in 30 days"
   ├─ If 7 days remain: escalate to warning "Return device to IT by 2026-07-19"
   └─ Cache response locally (TTL = 1 week)
        ↓
Device Continues Normal Operation
```

**Device Reassignment (Same Device, Different Employee):**

```
Project Ends, Contractor Jane Departs
        ↓
IT Manager Returns Device to Inventory
        ↓
Platform Receives Device Return Event:
   ├─ PATCH /license/L001 { "active": false }
   ├─ Device Rental license L001 deactivated
        ↓
On Next Device Sync:
   ├─ Device queries license status for C001
   ├─ Validation returns INACTIVE
   ├─ Device enters "Unenrolled" state:
   │  ├─ Client App A disabled (data is not deleted)
   │  ├─ VPN Client disabled
   │  ├─ Development Tools access revoked
   │  ├─ MDM agent remains (for remote lock/wipe if needed)
   │  └─ Device shows message "Device unassigned; awaiting new assignment"
        ↓
Device Reassigned to New Employee (Alice, 6-month contract)
        ↓
POST /licensee (create Licensee for Alice)
   → Response: licenseeNumber = C002
        ↓
POST /license (create new 6-month Rental)
   { "licensee": "C002", 
     "licenseTemplate": "6-MONTH-CONTRACTOR",
     "startDate": "2026-04-26",
     "features": ["Development Tools", "Client App B", "VPN Client", "MDM Agent"]
   }
   → Response: licenseNumber = L002
        ↓
Platform Registers Device with New License:
   ├─ Device IMEI re-mapped: IMEI ↔ L002 (was L001)
   ├─ Cloud MDM service detects change
   ├─ New features pushed to device: Client App B (instead of Client App A)
        ↓
On Next Device Sync:
   ├─ Device queries new license status for C002
   ├─ Validation returns ACTIVE with updated features
   ├─ Device uninstalls Client App A → installs Client App B
   ├─ Other tools (VPN, Dev Tools, MDM) remain
   ├─ Alice logs in with her credentials
   └─ Device ready for Alice's work in <30 min, no IT visit needed
```

**Contractor Departure & Device Recovery:**

```
Contractor's Rental License Expires (end of engagement)
        ↓
Device Performs Scheduled License Validation:
   GET /licensee/C001/validate
        ↓
NetLicensing Returns: EXPIRED (validUntil = 2026-07-19 is in the past)
        ↓
Device Firmware Actions:
   ├─ Set device status to LOCKED
   ├─ Show lock screen: "This device is no longer assigned. Return to corporate IT."
   ├─ MDM agent sends alert to IT dashboard: "Device ABC123 expired, awaiting return"
   ├─ Apps remain installed but non-functional (data preserved for forensics)
   ├─ VPN disconnected; network access denied
   └─ Device still reachable via MDM for remote lock/wipe
        ↓
Scenario 1: Device Returned to IT
   ├─ IT scans device → platform records return
   ├─ Device reset and reprovisioned for next assignment
        ↓
Scenario 2: Device Not Returned (lost/stolen)
   ├─ IT initiates remote wipe via MDM console
   ├─ All user data, Client App A data deleted
   ├─ Device left in LOCKED state (requires IT reset)
   └─ IT creates incident ticket for follow-up
```

### Licensee Management

Each employee or contractor was registered as a Licensee with `licenseeNumber` tied to their employee ID or contractor account.

**Employee Lifecycle:**
- New hire: Licensee created on first day, permanent device Rental license issued for 3-year employment period
- Role change / project reassignment: existing employee Licensee retained, device license updated (new features bundle pushed)
- Termination: Licensee marked inactive, all associated device licenses deactivated

**Contractor Management:**
- Contractor onboarded: Licensee created with engagement start/end dates
- Device assigned: Rental license created with duration matching contract term
- Engagement ends: License automatically expires; device is locked and retrieved

**Device Master Record:**
The firm maintained a device inventory in a spreadsheet or MDM platform, with the following fields:
- Device serial number (IMEI)
- Current licensee (employee/contractor name)
- Current license number (NetLicensing)
- Assignment start/end dates
- Software bundle assigned
- Warranty expiration date

NetLicensing served as the source of truth for license status; the inventory system was a read-only reference for IT operations.

### Edge Cases & Best Practices

- **Device offline during assignment expiry**: Devices on field assignments without network connectivity could cache license validity for up to 30 days. If a device remained offline past the cache expiry, it entered LOCKED state on next boot, preventing unauthorized access.
- **Warranty tracking**: Device serial numbers were linked to warranty records in an external system. When a device assignment changed, the platform automatically updated warranty insurance beneficiary (now under new employee), preventing coverage gaps.
- **Software upgrade on reassignment**: When a device was reassigned from a client requiring "Client App A" to a different client requiring "Client App B", the cloud MDM service automated the app swap (uninstall A, install B), with data migration where applicable.
- **Lost device protocols**: If a device was marked as lost, IT could immediately revoke its license and initiate remote wipe via MDM, protecting corporate data even if the device was not physically recovered.
- **Compliance audit trail**: All device assignment changes (new license, license expiry, feature bundle changes) were logged with timestamps. This created an audit trail satisfying regulatory requirements (SOC 2 controls, HIPAA audit logs for contractor compliance).
- **Bulk device import**: When the firm acquired another consulting team, IT provisioned 50 new devices in bulk via NetLicensing's batch license creation API, assigning each to the new team members and pushing the required software stack in a single operation.

### Results & Outcome

- **Device assignment latency elimination**: Automated provisioning reduced device-to-employee assignment time from 2–3 days to <30 minutes; project starts no longer delayed by device preparation
- **Software compliance**: Automatic feature bundle enforcement ensured devices carried only licensed software, eliminating the risk of unauthorized software deployment beyond seat limits
- **Contractor device recovery**: Automatic license expiration and device locking improved device recovery rate from 85% (manual process) to 98% (automated alerts + lock-down)
- **IT overhead reduction**: Device assignment and software provisioning previously required 1 FTE help desk staff; automation reduced to 2 hours/week exception handling
- **Audit trail improvement**: Complete device assignment and software history satisfied compliance audits (SOC 2, HIPAA); dispute resolution and forensics supported by timestamped records
- **Operational agility**: Assignment flexibility enabled dynamic team composition during projects; devices swapped between employees on days notice without IT bottlenecks
- **Data security**: Expired device licenses automatically locked devices, preventing unauthorized access even during contractor departure delays; remote wipe capability protected data on lost/stolen devices

