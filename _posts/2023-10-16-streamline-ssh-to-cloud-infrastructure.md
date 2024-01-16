---
layout: post
title: "Streamlining Cloud Infrastructure Access: Simplifying SSH with ProxyCommand and Wildcards"
description: "This article outlines an elegant solution for efficient, user-friendly access to servers within private networks via SSH, making maintenance and management a breeze."
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
   url: /img/blog/labs64-shell-code.gif
tags:
  - Secure Shell
  - SSH
  - Cloud
  - Infrastructure
  - Development
---

Building IT infrastructure using cloud services represents a cutting-edge approach for small companies and startups. It eliminates the need to invest in, maintain, and set up physical hardware while providing industry-standard resiliency and security. Typically, this infrastructure involves placing virtual hosts that provide services in a private network and exposing these services over secure protocols like HTTPS through a reverse proxy acting as a gateway accessible from the internet. This setup ensures that the servers hosting the services remain protected from internet-based attacks. However, it can pose challenges for legitimate users who require access to these servers for maintenance. This typically involves a two-step process: first, logging into a gateway server with access to the private network, and then logging into the target server, with SSH being the assumed login method.

To streamline this process, the SSH ProxyCommand directive can be efficiently used. However, listing every host in the private network can be impractical, especially when the list of hosts changes frequently, as is often the case for software development companies like Labs64. The elegant solution in such cases is to leverage SSH wildcards in the configuration. Here, we presume that hosts in the private network are assigned a common internal domain name (typically the case for cloud providers, or can be configured as such).

Given the frequent changes in cloud service hosts, adding them to the `known_hosts` repository may not be practical. To address this, we disable the addition by directing it to a dummy known hosts file. Adjustments for Windows may be needed (use `NUL` instead of `/dev/null`). Disabling host key fingerprint confirmation is also necessary to avoid prompts with each connection. And even though it may overall appear less secure, in practice with such dynamic environments the hosts fingerprints typically not verified anyway, even when asked, so the net effect is the same, but more convenient.

Here's an example of the corresponding SSH configuration that can be added to the `~/.ssh/config` file:

```ssh-config
Host *.private.net.domain
   EnableEscapeCommandline yes
   ProxyCommand=ssh -i ~/.ssh/key-for-gateway.pem -W %h:%p gateway-user@gateway.my-internet-domain.org
   User target-host-user
   IdentityFile ~/.ssh/key1-for-target-hosts.pem
   IdentityFile ~/.ssh/key2-for-target-hosts.pem
   UserKnownHostsFile /dev/null
   StrictHostKeyChecking no
```

With this configuration, you can both directly SSH into the target host using a command like:

```bash
ssh target-host.private.net.domain
```

And you can also use the `scp` command with these hosts.

Note that if the target hosts use several different SSH keys, you can list multiple keys repeating `IdentityFile` option, and SSH will attempt them one by one. Naturally, you can include any additional SSH options tailored to the specific requirements of hosts within your private network.

This setup simplifies and streamlines access to your cloud-based infrastructure, making it more efficient and user-friendly.
