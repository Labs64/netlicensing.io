---
layout: casestudy
title: "Offline & Air-Gapped Deployment: Secure Licensing for Disconnected Environments"
description: "Issue cryptographically signed licences for software running in disconnected, regulated, or secure environment deployments"
permalink: "/case-studies/offline-air-gapped-deployment/"
img: "/img/case-studies/netlicensing-case-study-offline-air-gapped-deployment.png"
tags:
- Case Studies
- Use Cases
- Enterprise Software
- Defense
- Healthcare
- Security
- Offline Licensing
industry:
- Enterprise Software / Defense / Healthcare
use-case:
- Air-gapped environments
- Offline validation
- Secure deployments
- Regulated industries
favorite-feature:
- Licensing Model "Node-Locked"
- Offline Licensing
- Cryptographic Validation
---

### Overview

A defense contractor develops mission-critical command and control software deployed in classified government and military facilities. Their customers require deployments in completely air-gapped environments with zero external network connectivity for security and regulatory compliance reasons. The vendor previously relied on expensive hardware dongles for license enforcement, but needed a solution that could validate entitlements offline while providing cryptographic proof of authenticity, binding licenses to specific hardware devices, and allowing secure license distribution through offline channels.

NetLicensing's Node-Locked and offline licensing capabilities enabled the vendor to issue cryptographically signed license files that validate entirely on-device without any network connectivity, eliminating dongle costs while maintaining strong anti-piracy protection suitable for defense and highly regulated industries.

### Licensing Challenge

Defense contractors, healthcare providers, and financial institutions deploying software in air-gapped environments face a fundamental incompatibility between cloud-based licensing systems and network isolation requirements. The vendor's customers operated in Sensitive Compartmented Information Facilities (SCIFs), classified networks, and offline research environments where any internet connectivity was prohibited by policy.

Their legacy licensing approach used hardware security dongles, which created significant operational friction: physical distribution took weeks through secure courier services, dongle failures required expensive field replacements, and multi-facility deployments meant managing hardware across geographically distributed secure locations. Additionally, regulatory compliance requirements (HIPAA, PCI-DSS, FedRAMP) mandated network isolation that made traditional cloud-based licensing impossible.

The vendor needed to eliminate hardware dongles entirely while maintaining equivalent security. This required: validating entitlements with zero network access, providing cryptographic proof that licenses were authentic and unmodified, binding licenses to specific hardware to prevent unauthorized sharing, supporting license updates through secure offline channels, and complying with government security standards for classified system deployments.

### Chosen Licensing Model

**Node-Locked Licensing** with **Offline License Files** forms the technical foundation. This model binds each license to specific hardware identifiers (CPU serial, motherboard ID, TPM module fingerprint) and encodes all entitlement information into a cryptographically signed license file that validates entirely offline.

Why this model fits: The vendor needs zero-trust, offline-first validation that cannot be bypassed through network access. Node-Locked prevents a single license from being transferred across devices. Cryptographic signing ensures license files cannot be modified without invalidating the signature. All validation logic runs locally on the customer's disconnected system, eliminating any dependency on external infrastructure.

Mechanism: When the software starts, it computes a hardware fingerprint from multiple device identifiers, reads the local license file, verifies the cryptographic signature against the vendor's embedded public key, and checks that the hardware fingerprint matches the license binding. Feature entitlements and expiration dates are read entirely from the local file, with no network calls.

### NetLicensing Configuration

#### Step 1: Create Product

1. Log into the NetLicensing Management Console
2. Navigate to Products → Create Product
3. Enter product details:
   - **Number**: `CMDCTRL-001`
   - **Name**: `Command Control Suite`
   - **Version**: `2024.1`
   - **Active**: Enabled
   - **Description**: Mission-critical command and control software for government and defense deployments
   - **Licensee Secret Mode**: Set to `PREDEFINED` (each customer receives a unique secret code as an additional binding element)

#### Step 2: Create Product Module

1. Navigate to the product → Modules → Create Module
2. Configure the module:
   - **Number**: `MOD-OFFLINE-001`
   - **Name**: `Air-Gapped Offline Licensing`
   - **Licensing Model**: Select `Node-Locked`
   - **Node Secret Mode**: Set to `PREDEFINED` (hardware fingerprints are treated as predefined node secrets)

#### Step 3: Create License Templates

Create multiple templates representing different feature tiers:

**Template 1: Basic Operations**
- **Number**: `LT-BASIC-OFFLINE`
- **Name**: `Basic Operations License`
- **License Type**: `FEATURE`
- **Price**: 0 (determine through separate quotes)
- **Active**: Enabled
- **Custom Properties**:
  - `featureSet`: `basic-operations`
  - `maxConcurrentSessions`: `1`
  - `offlineGracePeriod`: `90` (days)

**Template 2: Advanced Intelligence**
- **Number**: `LT-ADVANCED-OFFLINE`
- **Name**: `Advanced Intelligence Suite`
- **License Type**: `FEATURE`
- **Custom Properties**:
  - `featureSet`: `advanced-intelligence,data-analytics,predictive-modeling`
  - `maxConcurrentSessions`: `2`
  - `offlineGracePeriod`: `90`

**Template 3: Time-Limited Government Trial**
- **Number**: `LT-TRIAL-GOVT`
- **Name**: `Government Evaluation License`
- **License Type**: `TIMEVOLUME`
- **Custom Properties**:
  - `timeVolume`: `30`
  - `timeVolumePeriod`: `DAY`
  - `trialFeatures`: `all-features`
  - `offlineGracePeriod`: `30`

### Integration Walkthrough

#### License File Generation Flow

When a new government customer is onboarded:

```bash
# Step 1: Create Licensee (customer facility)
curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
  -H "Authorization: Basic {base64_api_key}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "licensee.number=GOV-FACILITY-2024-001&licensee.name=Strategic Operations Center - DC&product=CMDCTRL-001&licensee.secret=PREDEFINED_SECRET_12345"
```

Response:
```json
{
  "licensee": {
    "number": "GOV-FACILITY-2024-001",
    "name": "Strategic Operations Center - DC",
    "productNumber": "CMDCTRL-001",
    "status": "active",
    "licenseeSecret": "PREDEFINED_SECRET_12345"
  }
}
```

#### Step 2: Create Licenses for Specific Devices

Before deployment, capture hardware fingerprints from customer's systems:

```bash
# Create a license bound to specific hardware
curl -X POST "https://go.netlicensing.io/core/v2/rest/license" \
  -H "Authorization: Basic {base64_api_key}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "license.licensee=GOV-FACILITY-2024-001&license.template=LT-ADVANCED-OFFLINE&license.startDate=2024-04-19T00:00:00Z&license.number=LIC-SCIF-HW-98765432"
```

Response:
```json
{
  "license": {
    "number": "LIC-SCIF-HW-98765432",
    "licensee": "GOV-FACILITY-2024-001",
    "template": "LT-ADVANCED-OFFLINE",
    "startDate": "2024-04-19T00:00:00Z",
    "status": "active",
    "properties": {
      "featureSet": "advanced-intelligence,data-analytics,predictive-modeling",
      "maxConcurrentSessions": "2",
      "offlineGracePeriod": "90"
    }
  }
}
```

#### Step 3: Export and Sign License File

The vendor's backend retrieves the license and exports it as a cryptographically signed offline file:

```bash
# Retrieve license details for offline export
curl -X GET "https://go.netlicensing.io/core/v2/rest/license/LIC-SCIF-HW-98765432" \
  -H "Authorization: Basic {base64_api_key}"
```

The vendor's internal system then:
1. Serializes the license data (features, expiration, hardware binding) to JSON
2. Computes HMAC-SHA256 using the vendor's private key
3. Encodes as a `.license` file with embedded signature

Example generated license file (`command-control.license`):
```json
{
  "format": "OFFLINE_LICENSE_V1",
  "licensee": "GOV-FACILITY-2024-001",
  "features": ["advanced-intelligence", "data-analytics", "predictive-modeling"],
  "hardwareBindings": {
    "cpuSerial": "CPU-Z9X8W7V6U5T",
    "motherboardId": "MOBO-A9B8C7D6E5",
    "tpmModuleId": "TPM-F1E2D3C4B5"
  },
  "expirationDate": "2025-04-19",
  "maxConcurrentSessions": 2,
  "offlineGracePeriod": 90,
  "issuedAt": "2024-04-19T10:30:00Z",
  "signature": "HMAC_SHA256_BASE64_ENCODED_SIGNATURE_HERE"
}
```

#### Step 4: Secure Delivery

The vendor delivers the license file to the customer through secure offline channels:
- **Encrypted USB drive** hand-carried by authorized personnel
- **Secure classified courier service** for multi-site deployments
- **Physical media** shipped through government security infrastructure

#### Validation During Application Startup

When the command and control software initializes on the customer's air-gapped system:

```python
# Application initialization (Python pseudocode)
import hashlib
import hmac
import json
from datetime import datetime

class OfflineLicenseValidator:
    def __init__(self, vendor_public_key):
        self.vendor_public_key = vendor_public_key
    
    def get_hardware_fingerprint(self):
        """Compute device fingerprint from hardware identifiers"""
        import subprocess
        cpu_serial = subprocess.check_output(
            ["dmidecode", "-s", "processor-serial-number"]
        ).decode().strip()
        motherboard_id = subprocess.check_output(
            ["dmidecode", "-s", "baseboard-serial-number"]
        ).decode().strip()
        # TPM fingerprint from cryptographic key
        tpm_id = self._read_tpm_module_id()
        return {
            "cpuSerial": cpu_serial,
            "motherboardId": motherboard_id,
            "tpmModuleId": tpm_id
        }
    
    def validate_license_file(self, license_path):
        """Validate offline license file"""
        try:
            with open(license_path, 'r') as f:
                license_data = json.load(f)
            
            # Verify format
            if license_data.get("format") != "OFFLINE_LICENSE_V1":
                return False, "Invalid license format"
            
            # Verify signature
            signature = license_data.pop("signature")
            payload = json.dumps(license_data, sort_keys=True)
            expected_sig = hmac.new(
                self.vendor_public_key.encode(),
                payload.encode(),
                hashlib.sha256
            ).hexdigest()
            
            if signature != expected_sig:
                return False, "License signature invalid (tampering detected)"
            
            # Verify hardware binding
            current_hw = self.get_hardware_fingerprint()
            license_hw = license_data["hardwareBindings"]
            if not self._matches_hardware(current_hw, license_hw):
                return False, "License not bound to this hardware"
            
            # Verify expiration
            expiration = datetime.fromisoformat(
                license_data["expirationDate"]
            )
            if datetime.now() > expiration:
                return False, "License expired"
            
            # License valid
            return True, {
                "features": license_data["features"],
                "expiresAt": license_data["expirationDate"],
                "maxSessions": license_data["maxConcurrentSessions"]
            }
        
        except Exception as e:
            return False, f"Validation error: {str(e)}"
    
    def _matches_hardware(self, current, licensed):
        """Check if current hardware matches licensed binding"""
        return (current["cpuSerial"] == licensed["cpuSerial"] and
                current["motherboardId"] == licensed["motherboardId"] and
                current["tpmModuleId"] == licensed["tpmModuleId"])

# Application startup
validator = OfflineLicenseValidator(vendor_public_key="VENDOR_PUBLIC_KEY_BASE64")
valid, result = validator.validate_license_file("/etc/cmdctrl/license.license")

if valid:
    print(f"✓ License valid until {result['expiresAt']}")
    print(f"✓ Features: {', '.join(result['features'])}")
    app.initialize_with_features(result['features'])
else:
    print(f"✗ License validation failed: {result}")
    app.shutdown("License validation failed")
```

### Licensee Management

Licensees represent customer deployments (facilities, organizational units, or individual systems). In air-gapped scenarios, licensees are created in the vendor's NetLicensing console, then hardware fingerprints are manually collected from customer facilities.

**Creation Flow:**

1. Customer contacts vendor requesting deployment license
2. Vendor creates Licensee in NetLicensing:
   ```bash
   curl -X POST "https://go.netlicensing.io/core/v2/rest/licensee" \
     -H "Authorization: Basic {api_key}" \
     -d "licensee.number=GOV-SCIF-DENVER-2024&licensee.name=SCIF Denver Operations&product=CMDCTRL-001&licensee.secret=CUST_SECRET_CODE_ABC123"
   ```

3. Customer provides hardware identifiers from their systems (obtained via secure communication)
4. Vendor creates licenses bound to those specific hardware IDs
5. License files are generated and delivered through secure channels
6. Customer loads license file into their air-gapped system

**Hardware Fingerprinting Collection (Customer-Side):**

Customers capture hardware identifiers on their isolated systems and transmit only the fingerprints (no sensitive data) back to the vendor:

```bash
# Run on customer's air-gapped system (Linux example)
# Capture CPU serial
dmidecode -s processor-serial-number

# Capture motherboard ID
dmidecode -s baseboard-serial-number

# Capture TPM module fingerprint
tpm2_getcap handles-persistent | grep -A1 "0x81000001"

# Send only these identifiers back to vendor through secure channel
# Vendor then associates them with the Licensee in NetLicensing
```

### Shop & Payment Integration

Air-gapped deployments do not use the NetLicensing Shop or online payment systems, as customers have no internet connectivity. Instead:

**Alternative Flow:**

1. **License Request**: Customer submits formal license request through established vendor sales process
2. **Procurement**: Vendor processes through standard enterprise software procurement (purchase order, contract negotiation)
3. **License Generation**: Once contract is signed, vendor:
   - Creates Licensee in NetLicensing
   - Collects customer hardware fingerprints
   - Generates signed offline license files
4. **Delivery**: License files are delivered as described in Integration Walkthrough
5. **Invoice & Payment**: Handled through vendor's existing enterprise billing system (outside NetLicensing)

No payment integration with NetLicensing is required for air-gapped deployments. The vendor tracks entitlements through NetLicensing but handles payment separately through their standard enterprise software licensing process.

### Edge Cases & Best Practices

**Offline Grace Period Handling**

Government facilities may experience prolonged disconnection from vendor communication channels. The vendor implements a grace period where licenses continue functioning even if validation would fail:

```python
def validate_with_grace_period(license_data, grace_days=90):
    """Allow limited operation after expiration during grace period"""
    expiration = datetime.fromisoformat(license_data["expirationDate"])
    grace_limit = expiration + timedelta(days=grace_days)
    
    if datetime.now() <= grace_limit:
        if datetime.now() > expiration:
            # In grace period - log warning but allow continued operation
            logger.warning(
                f"License in grace period (expires {expiration}, "
                f"grace ends {grace_limit})"
            )
            return True, "GRACE_PERIOD"
        else:
            return True, "VALID"
    else:
        # Grace period expired
        return False, "EXPIRED_NO_GRACE"
```

**License Renewal in Air-Gapped Environments**

Renewals require physical license file exchange:

1. Customer submits renewal request 60 days before expiration
2. Vendor generates new license file with extended expiration date
3. Vendor delivers updated file through secure channel
4. Customer replaces old license file with new one on isolated system
5. Application detects updated license at next startup

**Device Hardware Changes**

If customer hardware requires replacement (failed motherboard, system upgrade):

1. Customer provides new hardware fingerprints through secure channel
2. Vendor creates new Licensee or updates existing license with new hardware bindings
3. New license file is generated and delivered
4. Customer deploys new license file on replacement system

**Audit Logging for Compliance**

Maintain detailed audit logs for government compliance:

```json
{
  "auditEvent": {
    "timestamp": "2024-04-19T15:30:00Z",
    "eventType": "LICENSE_VALIDATION",
    "licensee": "GOV-SCIF-DENVER-2024",
    "license": "LIC-SCIF-HW-98765432",
    "result": "VALID",
    "validatedFeatures": ["advanced-intelligence", "data-analytics"],
    "hardwareFingerprint": "HASH_OF_FINGERPRINT",
    "systemUptime": "2847 hours"
  }
}
```

**No Network Retry Logic Required**

Unlike online deployments, air-gapped validation does not require retry logic or fallback mechanisms. Validation is deterministic and offline:

- No network timeouts or connection errors
- No rate limiting concerns
- Validation succeeds or fails immediately based on local file integrity

**Serialization and Tamper Detection**

License files are JSON with HMAC-SHA256 signatures. Any modification (including whitespace changes) invalidates the signature and prevents the application from initializing.

### Results & Outcomes

The vendor successfully eliminated hardware dongles while maintaining stronger security through cryptographic validation and hardware binding:

- **Zero network dependency**: License validation requires no internet or cloud connectivity, meeting strict air-gap compliance requirements for classified government deployments and regulated industries
- **Hardware dongle costs eliminated**: Replaced expensive physical security devices with software-based licensing, reducing per-deployment costs by 60%
- **License distribution accelerated**: Reduced time-to-deployment from weeks (secure courier hardware shipping) to days (encrypted digital file transfer through secure channels)
- **Anti-piracy strengthened**: Cryptographic signatures and hardware binding prevent license tampering and unauthorized sharing across facilities
- **Regulatory compliance simplified**: Deployments in HIPAA, FedRAMP, and classified networks now had verifiable, cryptographically-signed entitlement validation suitable for government audits
- **Field service eliminated**: License renewals and feature upgrades no longer required on-site technician visits; new license files could be deployed through secure channels
- **Multi-facility scaling**: Single license file could be distributed across multiple isolated networks within customer organizations without vendor involvement, reducing support overhead
