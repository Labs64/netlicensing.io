---
layout: post
title: "Publish NuGet packages using GitHub Actions"
description: "GitHub Actions: automate, CI, package and push your .NET libraries to NuGet.org"
author:
  name: NetLicensing
  url: https://netlicensing.io
image:
  url: /img/blog/netlicensing-csharp-cover.png
tags:
  - NuGet
  - GitHub Actions
  - dotNET
  - CI
  - Continuous Integration
  - Continuous Delivery
  - NetLicensing
  - Client Library
sitemap:
  images:
  - /img/blog/netlicensing-csharp-cover.png
  - /img/blog/netlicensing-gitflow.png
  - /img/blog/netlicensing-csharp-nuget-apikey.png
  - /img/blog/netlicensing-csharp-actions-secrets.png
  - /img/blog/netlicensing-csharp-actions-runs.png
---

### *GitHub Actions: automate, CI, package and push your .NET libraries to NuGet.org*

---

Unbelievable! One of the oldest *NetLicensing Client libraries for C#* (with the first GitHub push made on [Oct 2, 2013](https://github.com/Labs64/NetLicensingClient-csharp/commit/9ea3942b0d986907cbf197c8673826aee5123d8a){:target="_blank"}{:rel="noopener nofollow"}) was not available in one of the notable package managers for .NET

*Better late than never* - so we decided to change this status quo, and today want to share with you our this walkthrough on how we published [NetLicensing C# Client](https://github.com/Labs64/NetLicensingClient-csharp){:target="_blank"}{:rel="noopener nofollow"} library to *NuGet* repository using *GitHub Actions*.

## Background Info - GitHub Flow

Before moving forward, just a note about *GitHub Flow* workflow adopted for Labs64 projects [hosted at GitHub](https://github.com/Labs64){:target="_blank"}{:rel="noopener nofollow"}.

**“Pull Request”** or **“PR”** is a very useful feature of the GitHub version control system and allowing efficient feature and bugfix development with the GitHub Flow.

The below diagram showing GitHub Flow adopted for Labs64 projects:

![GitHub Flow](/img/blog/netlicensing-gitflow.png "GitHub Flow"){:class="blog-center"}

Any new feature or defect fix implementation is being done only in a dedicated feature branch. When branch implementation is ready to be integrated into the master branch, a *Pull Request* gets created. Using this *PR*, team members, working on a particular feature/enhancement/bug fix, can get feedback from other team members along the way.

This feedback is being used to make further changes and commits to the branch before finally merging the changes back up to the `'master'` branch.

For the above GitHub Flow following workflows will be defined:

- **CI** - build and test push commits at Pull Request branches and master
- **Release** - package and publish C# library after successful CI run on `'master'`

## Create Actions Workflow

There are two ways how you can create a new GitHub Actions workflow:

 - **Wizard** - Use predefined configurations for your environment and technology stack. GitHub Actions offering heaps of community built actions that cover the whole #devops spectrum.
- **Manually** - Create a new workflow YAML file in repository `.github/workflows` directory.

This is the full [YAML](https://github.com/Labs64/NetLicensingClient-csharp/blob/master/.github/workflows/netlicensing-csharp-ci.yml){:target="_blank"}{:rel="noopener nofollow"} we are using for Continuous Integration runs upon every push in `'master'` and feature branches. It uses actions to setup .NET Core, restore packages, build and test code base by executing *NetLicensingClient-demo CLI* project.

<script src="https://gist.github.com/r-brown/9a4886e2e7f9c5ed1db81ef404e8dabd.js"></script>

## Publish NuGet Package

After *Pull Request* merge and successful "CI" workflow run, we trigger a second ["Release" workflow](https://github.com/Labs64/NetLicensingClient-csharp/blob/master/.github/workflows/netlicensing-csharp-release.yml){:target="_blank"}{:rel="noopener nofollow"} to push `'master'` branch code base to NuGet.

<script src="https://gist.github.com/r-brown/a2c61a4a764e7c22212129c015e04b72.js"></script>

[brandedoutcast/publish-nuget](https://github.com/marketplace/actions/publish-nuget){:target="_blank"}{:rel="noopener nofollow"} community action definition provides a very useful option to Publish Nuget packages every time the new project version is available.

The action by default looks for changes to the `<version></version>` tag in your `.csproj` file, which we had to tweak in our case using `VERSION_REGEX` configuration parameter to `'^\s*<PackageVersion>(.*)<\/PackageVersion>\s*$'` to match the format of the *Visual Studio 2019*.

For a basic action setup, you only need to set `PROJECT_FILE_PATH` and `NUGET_KEY`.

## Create NuGet API Key

NuGet API key needs to be created and added to GitHub Actions to authenticate publish requests to NuGet.

![NuGet API Key](/img/blog/netlicensing-csharp-nuget-apikey.png "NuGet API Key"){:class="blog-center"}

In the key creation dialogue provide:
- **Key Name** - use this name to easily identify the API key scope
- **Package Owner** - your NuGet account
- **Select Scope**- choose *"Push new packages and package versions"*
- **Glob Pattern** - use `"*"` to select all packages

Created API key needs to be added to the GitHub repository *"Secrets"* section.

![GitHub Secrets](/img/blog/netlicensing-csharp-actions-secrets.png "GitHub Secrets"){:class="blog-center"}

In our configuration we use `NUGET_API_KEY` as a key name; you can choose the name accordingly to your name schema, however.

## Execution

After your GitHub Actions setup is complete the CI workflow will be executed every time you push changes in master or feature branch.
After the successful merge and incremented project version number, the Release workflow will start and publish NuGet package. *Voilà!*

![GitHub Actions executions](/img/blog/netlicensing-csharp-actions-runs.png "GitHub Actions executions"){:class="blog-center"}

## Manual Tasks & Open Points

Having the most of the steps automated we still have some minor but essential manual steps:

- **GitHub release version** - create a new GitHub [release version](https://github.com/Labs64/NetLicensingClient-csharp/releases){:target="_blank"}{:rel="noopener nofollow"} for the created tag
- NuGet **package documentation** - provide a link to the prepared [README-nuget.md](https://github.com/Labs64/NetLicensingClient-csharp/blob/master/README-nuget.md){:target="_blank"}{:rel="noopener nofollow"} file in the *"Manage package"* at NuGet
- Increase project next **development version** in Visual Studio

---

Possibly, there are some handy automation options available for the above manual tasks. We will be happy for any suggestions from the community.
