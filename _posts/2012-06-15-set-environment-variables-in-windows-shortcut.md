---
layout: post
title: "Set environment variables in windows shortcut"
description: "I faced this problem when installed Inkscape (GNU GPL licensed SVG editor) with multiple language packs"
author:
  name: NetLicensing
  url: http://netlicensing.io
image:
  url: /img/blog/blog-placeholder.jpg
tags:
  - Programming
  - Scripting
  - CMD
  - Environment Variable
  - Inkscape
  - Script
  - Shortcut
  - Windows
---

I faced this problem when installed Inkscape (GNU GPL licensed SVG editor) with multiple language packs. Once I started the Inkscape for the first time, I got the UI in German language. Not nice, I wanted it in English. So, I started to look where can I switch the language, and surprisingly I didn&#8217;t find this option. Also there appeared to be no command-line switch for it. Brief search through the Web revealed, that the Inkscape shows its UI in default system locale (which is German in my case), unless locale is overridden by the LANG environment variable. Tested from the command line &#8211; worked like a charm. So far so good, but I don&#8217;t like to start Inkscape from the command line each time.

Of course, the immediate solution is to create a batch script, and start it via the shortcut. Separate batch script for that simple thing? Hmm&#8230;

Another possibility would be to set the environment variable for my entire user account using standard windows dialog. But this is not flexible, since other programs may also react on LANG variable.

So, here is my final recipie, how to do it for a single program via the Windows shortcut without a separate batch script (on the example of Inkscape):
1. Create a new shortcut, enter the following command line:

{% highlight shell %}
C:\Windows\System32\cmd.exe /c "SET LANG=en && START /D ^"C:\Program Files (x86)\Inkscape^" inkscape.exe"
{% endhighlight %}

Drill-down:

<table border="0">
  <tr>
    <th>
      <strong>Code fragment</strong>
    </th>

    <th>
      <strong>Explanation</strong>
    </th>
  </tr>

  <tr>
    <td>
      C:\Windows\System32\cmd.exe
    </td>

    <td>
      start command line processor
    </td>
  </tr>

  <tr>
    <td>
      /c
    </td>

    <td>
      instruct the command processor to execute provided string: &#8220;SET &#8230; inkscape.exe&#8221;
    </td>
  </tr>

  <tr>
    <td>
      SET LANG=en
    </td>

    <td>
      set the environment variable, multiple SET commands can be chained using &&
    </td>
  </tr>

  <tr>
    <td>
      &&
    </td>

    <td>
      execute another command if preceding SET has exited with the error code 0 (success)
    </td>
  </tr>

  <tr>
    <td>
      START
    </td>

    <td>
      start a program in a new window
    </td>
  </tr>

  <tr>
    <td>
      /D
    </td>

    <td>
      specify working directory for the program
    </td>
  </tr>

  <tr>
    <td>
      ^&#8221;
    </td>

    <td>
      Just a quotation mark, ^ is an escape character in Windows, ensures that the quotation mark is included in the string, instead of closing it
    </td>
  </tr>

  <tr>
    <td>
      C:\Program Files (x86)\Inkscape
    </td>

    <td>
      working directory for the program, can be taken from the original shortcut
    </td>
  </tr>

  <tr>
    <td>
      inkscape.exe
    </td>

    <td>
      executable to start
    </td>
  </tr>
</table>

2. Name the shortcut by the target program name (by default Windows proposes to call it &#8220;cmd&#8221;, since this is the first program this shortcut is pointing to)

3. Change the icon to the one from the target program executable

4. Change the &#8220;Run&#8221; mode to &#8220;minimized&#8221;

Since command processor is started first, without this option you will see a console window popping up shortly. Not critical, but a bit annoying. When started minimized, most likely you&#8217;ll not notice it at all.

Voila! My Inkscape is starting now with UI in English.
