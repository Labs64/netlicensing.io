---
layout: post
title: "SVN / Git &#58; side-by-side command reference"
description: "We created for you this hands-on SVN / Git side-by-side command reference"
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/blog-placeholder.jpg
  hide: true
tags:
  - Programming
  - CommandLine
  - Git
  - GitHub
  - Reference
  - Subversion
  - SVN
  - VCS
---

In our projects we use both SVN and Git and know how difficult sometimes it can be to mentally switch from one version control to another. As an aid, we created for you this hands-on SVN / Git side-by-side command reference:

<table border="0">
  <tr>
    <th>
      <strong> </strong>
    </th>

    <th>
      <strong>SVN</strong>
    </th>

    <th>
      <strong>Git</strong>
    </th>
  </tr>

  <tr>
    <td>
      <strong>Checkout from central repository</strong>
    </td>

    <td>
      <kbd>svn checkout https://www.labs64.com/<br /> NetLicensingClient-java/trunk</kbd>
    </td>

    <td>
      <kbd>git clone https://github.com/Labs64/<br /> NetLicensingClient-csharp.git</kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Update from central repository</strong>
    </td>

    <td>
      <kbd>svn update</kbd>
    </td>

    <td>
      <kbd>git pull</kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Push changes to central repository</strong>
    </td>

    <td>
      <kbd>svn commit -m "msg" <em>file</em></kbd>
    </td>

    <td>
      <kbd>git commit -m "msg" <em>file</em>;\</kbd><br /> <kbd>git push</kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Push all changes to central repository</strong>
    </td>

    <td>
      <kbd>svn commit -m "msg"</kbd>
    </td>

    <td>
      <kbd>git commit -a -m "msg";\</kbd><br /> <kbd>git push</kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Show local changes</strong>
    </td>

    <td>
      <kbd>svn status</kbd>
    </td>

    <td>
      <kbd>git status</kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Diff local changes</strong>
    </td>

    <td>
      <kbd>svn diff <em>file</em></kbd>
    </td>

    <td>
      <kbd>git diff <em>file</em></kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Revert local changes</strong>
    </td>

    <td>
      <kbd>svn revert <em>file</em></kbd>
    </td>

    <td>
      <kbd>git checkout <em>file</em></kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Revert all local changes</strong>
    </td>

    <td>
      <kbd>svn revert . -R</kbd>
    </td>

    <td>
      <kbd>git reset –hard HEAD</kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Add new file</strong>
    </td>

    <td>
      <kbd>svn add <em>file</em></kbd>
    </td>

    <td>
      <kbd>git add <em>file</em></kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Add new folder recursively</strong>
    </td>

    <td>
      <kbd>svn add <em>folder</em></kbd>
    </td>

    <td>
      <kbd>git add <em>folder</em></kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Delete file</strong>
    </td>

    <td>
      <kbd>svn delete <em>file</em></kbd>
    </td>

    <td>
      <kbd>git rm <em>file</em></kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Delete folder</strong>
    </td>

    <td>
      <kbd>svn delete <em>folder</em></kbd>
    </td>

    <td>
      <kbd>git rm -r <em>folder</em></kbd>
    </td>
  </tr>

  <tr>
    <td>
      <strong>Ignore artifacts</strong>
    </td>

    <td>
      <kbd>svn propset svn:ignore <em>"bin"</em> .;\</kbd><br /> <kbd>svn commit -N -m "svn:ignore" .</kbd>
    </td>

    <td>
      <kbd>echo <em>"bin"</em> > .gitignore;\</kbd><br /> <kbd>git commit -m "gitignore" .gitignore</kbd>
    </td>
  </tr>
</table>

Of course, this reference does not contain all the commands available in Git and SVN, but it gives a brief overview on basic commands used in a daily work.
