---
layout: post
title: "Machine ID Generator for Node-Locked Licensing"
description: "Free in-browser machine ID generator, plus tested code for reading a stable machine fingerprint in Python, Node and Java, and how it feeds a node-locked license."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-machine-id-hero.png
  alt: "Machine ID generator: a stable fingerprint for node-locked licensing"
tags:
  - "Machine ID"
  - "Machine Fingerprint"
  - "Node-Locked Licensing"
  - "Software Licensing"
  - "Device Binding"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-machine-id-hero.png
    - /img/blog/netlicensing-machine-id-flow.png
---

A customer emails on a Monday morning: "We reinstalled the laptop and now your software says it isn't licensed." Nothing about their purchase changed. The only thing that moved was the string your application uses to recognise the machine.

Pick that string well and node-locked licensing is quiet. Pick it badly and your support inbox does the work. Here is a generator you can try right away, then the code and the pitfalls behind it.

## Key takeaways

- A machine ID is a value your application reads or builds on a device, so it can recognise that device again.
- Start with the identifier the operating system already provides, then hash it with a product-specific salt.
- Virtual machine clones, containers and reinstalls are where fingerprints break. Plan a way to move a license.
- NetLicensing stores and checks the value as `nodeSecret`. It does not generate it for you.

## Generate a machine ID

Read an identifier on the target machine, paste it below and click the button. The hash is calculated in your browser and your input is not sent anywhere.

- **Windows (PowerShell):** `(Get-CimInstance Win32_ComputerSystemProduct).UUID`
- **macOS:** `ioreg -rd1 -c IOPlatformExpertDevice | grep IOPlatformUUID` (use the value in quotes)
- **Linux:** `cat /etc/machine-id`

{% include machine-id-generator.html %}

![Diagram: the application normalises an OS machine ID and a product salt, hashes them with SHA-256 and sends the result as nodeSecret to NetLicensing, where a Node-Locked license with a quota of two stores it]({{ "/img/blog/netlicensing-machine-id-flow.png" | relative_url }})

## Where a stable identifier comes from

| Source | Stable across reboots | Changes when | Notes |
| --- | --- | --- | --- |
| Linux `/etc/machine-id` | Yes | The image is regenerated | Cloned images can carry the same value unless it is reset |
| macOS `IOPlatformUUID` | Yes | The logic board is replaced | Read with `ioreg` |
| Windows SMBIOS UUID | Yes | The mainboard changes | Some vendors ship placeholder values, so check for them |
| MAC address | Usually | Adapters are added, removed or randomised | Easy to spoof, and a machine has several |
| Host name or IP address | No | Anyone renames or moves the machine | Do not lock a license to it |
| Generated ID saved to disk | Yes | The file is deleted or copied | Simple, but only as safe as the file |

No source is perfect. The operating system identifier is a sensible first choice because it survives ordinary updates and needs no guesswork about which network card matters.

> A fingerprint is a promise to recognise the same machine tomorrow, so choose inputs that will still be there.

## The same value in your application

The generator and the three programs below follow one recipe: trim and lowercase each identifier, drop empty ones, sort them, put the salt first, join with newlines and hash the UTF-8 bytes with SHA-256. We ran the Python, Node and Java versions on macOS and got identical output. The Windows and Linux branches use the commands listed above; test them on your own target systems.

### Python

```python
import hashlib, platform, re, subprocess
from pathlib import Path


def os_identifier():
    system = platform.system()
    if system == "Linux":
        return Path("/etc/machine-id").read_text()
    if system == "Darwin":
        out = subprocess.check_output(["ioreg", "-rd1", "-c", "IOPlatformExpertDevice"], text=True)
        return re.search(r'"IOPlatformUUID" = "([^"]+)"', out).group(1)
    if system == "Windows":
        command = "(Get-CimInstance Win32_ComputerSystemProduct).UUID"
        return subprocess.check_output(["powershell", "-NoProfile", "-Command", command], text=True)
    raise RuntimeError("unsupported system: " + system)


def machine_id(identifiers, salt=""):
    parts = sorted(p.strip().lower() for p in identifiers if p.strip())
    return hashlib.sha256("\n".join([salt.strip()] + parts).encode("utf-8")).hexdigest()


print(machine_id([os_identifier()], salt="my-product"))
```

### Node.js

```javascript
const { createHash } = require("node:crypto");
const { execFileSync } = require("node:child_process");
const { readFileSync } = require("node:fs");

const run = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8" });

function osIdentifier() {
  if (process.platform === "linux") return readFileSync("/etc/machine-id", "utf8");
  if (process.platform === "darwin")
    return run("ioreg", ["-rd1", "-c", "IOPlatformExpertDevice"]).match(/"IOPlatformUUID" = "([^"]+)"/)[1];
  if (process.platform === "win32")
    return run("powershell", ["-NoProfile", "-Command", "(Get-CimInstance Win32_ComputerSystemProduct).UUID"]);
  throw new Error(`unsupported system: ${process.platform}`);
}

function machineId(identifiers, salt = "") {
  const parts = identifiers.map((p) => p.trim().toLowerCase()).filter(Boolean).sort();
  return createHash("sha256").update([salt.trim(), ...parts].join("\n"), "utf8").digest("hex");
}

console.log(machineId([osIdentifier()], "my-product"));
```

### Java

```java
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.security.MessageDigest;
import java.util.*;
import java.util.regex.*;

public class MachineId {
    static String run(String... command) throws Exception {
        Process process = new ProcessBuilder(command).start();
        return new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    static String osIdentifier() throws Exception {
        String os = System.getProperty("os.name").toLowerCase(Locale.ROOT);
        if (os.contains("linux")) return Files.readString(Path.of("/etc/machine-id"));
        if (os.contains("mac")) {
            Matcher m = Pattern.compile("\"IOPlatformUUID\" = \"([^\"]+)\"")
                    .matcher(run("ioreg", "-rd1", "-c", "IOPlatformExpertDevice"));
            if (m.find()) return m.group(1);
        }
        if (os.contains("windows"))
            return run("powershell", "-NoProfile", "-Command", "(Get-CimInstance Win32_ComputerSystemProduct).UUID");
        throw new IllegalStateException("no identifier for " + os);
    }

    static String machineId(List<String> identifiers, String salt) throws Exception {
        List<String> parts = new ArrayList<>();
        parts.add(salt.trim());
        identifiers.stream().map(p -> p.trim().toLowerCase(Locale.ROOT))
                .filter(p -> !p.isEmpty()).sorted().forEach(parts::add);
        byte[] hash = MessageDigest.getInstance("SHA-256")
                .digest(String.join("\n", parts).getBytes(StandardCharsets.UTF_8));
        return String.format("%064x", new java.math.BigInteger(1, hash));
    }

    public static void main(String[] args) throws Exception {
        System.out.println(machineId(List.of(osIdentifier()), "my-product"));
    }
}
```

### C# and .NET

On Windows, .NET applications often read the `MachineGuid` value under `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography`, then hash it the same way. Our [.NET quick start](https://netlicensing.io/wiki/dotnet-software-licensing) shows where the result goes in the NetLicensing client.

## What makes a machine ID unstable

- **Virtual machine clones.** A copied disk image can carry the same identifier to every clone. Reset it as part of image preparation, or limit concurrent use instead.
- **Containers.** A container is meant to be replaced. Binding to something inside it usually binds to nothing lasting.
- **Hardware swaps.** A new mainboard is a new machine as far as most identifiers are concerned.
- **Reinstalls.** Reinstalling the operating system can generate a new ID.
- **Too many inputs.** Every extra input is another thing that can change. Combining five values feels safer and fails more often.

## Privacy

An identifier that can be linked to a person may count as personal data under the GDPR. Hash it before it leaves the device, use a different salt for each product so values cannot be matched across products, collect only what you need and say so in your privacy notice. Hashing reduces exposure but does not make the value anonymous by itself. Ask your privacy advisor how it applies to you.

## How the ID becomes a license check in NetLicensing

The [Node-Locked licensing model](https://netlicensing.io/wiki/node-locked) binds a license to one or more node secrets. Your application sends the hash with validation:

```http
POST https://go.netlicensing.io/core/v2/rest/licensee/CUSTOMER-123/validate
Content-Type: application/x-www-form-urlencoded

productModuleNumber0=M-NODE&nodeSecret0=<your SHA-256 value>
```

In **client mode**, a new secret is stored the first time it appears, as long as the license quota still has a free slot. In **predefined mode**, you store the secrets in advance. When the quota is full, an unknown machine gets `valid=false`.

For a replacement laptop, remove the old `nodeSecret` property from the license in the Console or through the API, and the new machine binds on its next validation. See [how to move a license to a new computer](https://netlicensing.io/wiki/faq-move-license-to-new-computer). Node-Locked is available on the Premium and Select [plans]({{ "/pricing/" | relative_url }}).

## Questions people ask

### What is a machine ID?

A value that identifies a device or an operating system installation, used so software can recognise it again.

### Is a MAC address a good machine ID?

Usually not on its own. A device can have several adapters, they can be added or removed, and the address can be changed in software.

### Can someone fake a machine ID?

Yes. Anyone who controls the machine can alter what your program reads. A fingerprint raises the effort needed to share a license; it is not tamper-proof.

### Does NetLicensing generate machine IDs?

No. Your application creates the value, and NetLicensing stores and checks it. The [machine ID FAQ](https://netlicensing.io/wiki/faq-how-to-generate-machine-fingerprint) lists libraries that can help.

## Try it with your product

Generate an ID above, create a Node-Locked product module and validate it from your application. You can start with a free account, then pick the plan that includes the model when you go live.

<div style="text-align:center;margin:36px 0">
  <a href="https://ui.netlicensing.io/#/register" target="_blank" rel="noopener" style="background:#E14817;color:#fff;padding:16px 40px;border-radius:6px;font-size:20px;font-weight:700;text-decoration:none;display:inline-block">Start with NetLicensing</a>
</div>

*Happy Licensing!*
