---
layout: post
title: ".NET Licensing: Offline Activation and License Files"
description: "Add licensing to a C# .NET application: NuGet client, online validation, signed offline license files, machine binding, TTL caching and key handling."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-dotnet-licensing-hero.png
  alt: "Licensing a .NET application with signed offline license files"
tags:
  - ".NET Licensing"
  - "C# Licensing"
  - "Offline Activation"
  - "License File"
  - "Software Licensing"
  - "NetLicensing"
sitemap:
  images:
    - /img/blog/netlicensing-dotnet-licensing-hero.png
    - /img/blog/netlicensing-dotnet-offline-license-flow.png
---

Your .NET desktop tool works on a factory floor where the Wi-Fi stops at the office door. The customer has paid. The application cannot ask anyone whether that is true.

That is the case for a signed license file: a statement you create while connected, and the application can verify on its own. Here is how to build the whole path with the NetLicensing C# client.

## Key takeaways

- Install `NetLicensingClient-csharp` from NuGet and validate online whenever you can.
- Offline files are validation responses signed with your **RSA** key. The application checks them with the public key built into it.
- A file is a snapshot. Renewals and revocations need a new file.
- Signing protects the license data, not your program code.

![Diagram: you create an RSA key pair, attach the private key to an API key in NetLicensing, NetLicensing signs a validation file, and the offline application verifies it with the built-in public key]({{ "/img/blog/netlicensing-dotnet-offline-license-flow.png" | relative_url }})

## Install the client

```bash
dotnet add package NetLicensingClient-csharp
```

The client targets .NET Standard 2.0 and .NET Framework 4.6.2 in the public repository. Check the package page for the targets of the version you install.

## Validate online first

```csharp
using System;
using NetLicensingClient;
using NetLicensingClient.Entities;

public static class License
{
    public static ValidationResult Check(string licenseeNumber, string apiKey)
    {
        var context = new Context
        {
            securityMode = SecurityMode.APIKEY_IDENTIFICATION,
            apiKey = apiKey                     // role ROLE_APIKEY_LICENSEE
        };
        return LicenseeService.validate(context, licenseeNumber, new ValidationParameters());
    }

    public static bool Allows(ValidationResult result, string moduleNumber)
    {
        var module = result.getProductModuleValidation(moduleNumber);
        return module.properties.TryGetValue("valid", out var valid) && bool.Parse(valid.value);
    }
}
```

`Allows` uses `TryGetValue` on purpose: for an unknown module number the client returns an empty result, so reading `valid` directly would throw.

We checked these calls against the client source code, but did not compile this article's snippets. Build them in your own project first.

## Cache with the TTL

Every response carries a time until which you may reuse it:

```csharp
if (cached == null || DateTime.UtcNow > cached.getTtl().ToUniversalTime())
{
    cached = License.Check(licenseeNumber, apiKey);
}
```

You set the interval in the Management Console. This covers short outages. For weeks offline, use a file.

## Create the signed license file

1. Generate a key pair on a machine you trust:

```bash
openssl genpkey -algorithm RSA -out rsa_private.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem
```

{:start="2"}
2. Create an API key that carries the private key, as described in [Signing the response](https://netlicensing.io/wiki/signing-the-response).
3. Set up the product and the customer in NetLicensing.
4. Download the offline validation file for that licensee in the Management Console.

NetLicensing signs with RSA. If you were planning on ECDSA, this feature does not offer it.

## Verify it in the application

```csharp
using System;
using System.IO;
using NetLicensingClient;
using NetLicensingClient.Entities;

public static class OfflineLicense
{
    private const string PublicKey = @"-----BEGIN PUBLIC KEY-----
...your public key...
-----END PUBLIC KEY-----";

    public static ValidationResult Load(string path)
    {
        var context = new Context { publicKey = PublicKey };
        // Throws NetLicensingException if the signature does not verify.
        return ValidationService.validateOffline(context, File.ReadAllText(path));
    }
}
```

Compile the public key into the program. A key loaded from a file beside the application can be swapped by whoever can swap the license.

A valid signature does not mean the license is still current. For a subscription, compare the `expires` value in the result with the clock, and remember the latest time your application has seen so a clock set backwards stands out. See [clock tampering](https://netlicensing.io/wiki/faq-clock-tampering).

> A signature proves who wrote the file. Your code still has to decide whether it is for this machine and this day.

## Bind the license to a machine

| Approach | How it works | Suits | Watch out for |
| --- | --- | --- | --- |
| Node-Locked, online | Send a [fingerprint]({{ "/blog/2026/12/07/machine-id-generator-node-locked-licensing/" | relative_url }}) as `nodeSecret` | Machines that connect at least once | Needs the Premium or Select plan |
| One licensee per machine | Use the machine ID as the licensee number, and compare it with `getLicenseeNumber()` | Machines that never connect | Confirm your file contains the licensee entry; a new machine is a new licensee |
| Node-Locked, then file | Bind the secrets before creating the file | Fixed fleets | The file reflects the state when it was made |

An offline file writes nothing back to NetLicensing: no new device is bound and no credit is used up. Choose models whose result does not depend on that, such as Subscription, Multi-Feature, Pricing Table or Quota.

## Build and ship

Reference the package in your project file, pin the version and let your build restore it. If you publish your own libraries as packages, our [NuGet and GitHub Actions guide]({{ "/blog/2020/09/01/publish-nuget-packages-using-github-actions/" | relative_url }}) shows the pipeline.

## What this does not protect

Anyone with full control of the machine can modify your assembly to skip the check. Signed files stop forged license data. Code signing, obfuscation and your platform's protections are separate work.

## Questions people ask

### Can a .NET application be licensed completely offline?

Yes, with a signed offline validation file. Creating or renewing the file needs a connected step on your side.

### Does the client support Unity?

The C# client can be used in Unity projects; see the [Unity FAQ](https://netlicensing.io/wiki/faq-unity3d).

### How do I revoke an offline license?

You cannot reach an offline machine. Issue files for short periods and send new ones while the customer remains entitled.

### Where do I put the API key?

Use a key with the Licensee role in distributed applications. Keep the private signing key out of the application entirely.

## Start with one module

Add one product module, validate it online, then produce a file and run your application with the network unplugged. The [.NET quick start](https://netlicensing.io/wiki/dotnet-software-licensing) and [offline guide](https://netlicensing.io/wiki/offline-license-validation) have the reference material.

<div style="text-align:center;margin:36px 0">
  <a href="https://ui.netlicensing.io/#/register" target="_blank" rel="noopener" style="background:#E14817;color:#fff;padding:16px 40px;border-radius:6px;font-size:20px;font-weight:700;text-decoration:none;display:inline-block">Start with NetLicensing</a>
</div>

*Happy Licensing!*
