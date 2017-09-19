---
layout: post
title: "License Mobility"
description: "License mobility is made possible through the definition of a ‘single physical machine’ which is typically defined by the number of ‘cores’"
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/blog-placeholder.jpg
tags:
  - Licensing
  - License Mobility
  - Single Physical Machine
  - Reassign License
---

The concept of license mobility is actually surprisingly easy to understand in essence it means that can reassign your license between devices as and when it is required. For this article, we are going to look at the limitations about options that you have when assigning software licenses in a couple of settings. Specifically, server farms and server repartitioning. We will look at these in more detail shortly, but first we are going to explain the rules of license reassignment, and what is defined as ‘short-term’.

For example, the general rule with Microsoft software licensing is that you cannot reassign a license more frequently than every 90 days. Meaning that once you have assigned and registered a license to a device you will have to wait for three months before you can reassign that same license to a new device. However, as we have already said, there are certain cases where you can reassign licenses on a short-term basis. This is what is know as ‘license mobility’.

License mobility is made possible through the definition of a *‘single physical machine’* which is typically defined by the number of ‘cores’. The number of machines that a server or group of servers acts as is important to correctly make use of licenses and to knowing whether or not you can take advantage of license mobility.

Let us look at the first example &#8211; server farms. If we understand how a server farm works, it will help with our explanation of license mobility and its uses as well as its limitations. A server farm defines a collection of separate physical machines that are grouped into a cluster thereby acting as one single entity. This is most often used by large companies where the single power of one server would not be enough.

In this context; the group of machines acts as a single physical machine which is why under the rules of license mobility, software licenses can be reassigned more frequently than every 90 days across the different sections of the single cluster.

If we move to the second example of server repartitioning it is surprising similar to working within a server farm; except on a smaller scale. A typical server setup will have multiple hard drives configured in a RAID Array where multiple drives are treated as a single drive and the data is split across all of them. The major advantage of having a RAID is that it looks and functions exactly like a single physical disk with both increased storage and the added advantage of often being hot-swappable. They can also be split into separate partitions as with a physical disk allowing for separate OS installations and data storage. As with our example of a server farm, because this server is as far as the license is concerned a single physical machine it allows for license reassignment on a short-term basis, or as we have learned to call it license mobility.

A typical example of when we may wish to reassign a license is if we are reorganizing and resizing the partitions on the disk. This can happen for any number of reasons, for example if we have installed software across multiple partitions because it was needed urgently, but we want to actually have all of the software installations on a single partition we may need to reassign a license, or multiple licenses taking advantage of licensing mobility to achieve this task.

We hope this has helped with your understanding of license mobility and how you can take advantage of it with your next infrastructure deployment.
