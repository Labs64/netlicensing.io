#!/usr/bin/env bash
#
# Create a new Jekyll draft post
# Usage: ./_new_post.sh "Your Post Title"

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 \"Post Title\""
  exit 1
fi

title="$*"

# Convert to lowercase
slug=$(echo "$title" | tr '[:upper:]' '[:lower:]')
# Replace accented characters
slug=$(echo "$slug" | sed 'y/āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛ/aaaaeeeeiiiioooouuuuüüüüAAAAEEEEIIIIOOOOUUUUÜÜÜÜ/')
# Replace punctuation with spaces
slug=$(echo "$slug" | tr '[:punct:]' ' ')
# Replace spaces and underscores with hyphens
slug=$(echo "$slug" | tr ' _' '--')
# Squeeze multiple hyphens into a single hyphen
slug=$(echo "$slug" | tr -s '-')
# Remove leading and trailing hyphens
slug=$(echo "$slug" | sed -e 's/^-//' -e 's/-$//')

date_prefix=$(date +"%Y-%m-%d")
post_dir="./_drafts"
post_path="${post_dir}/${date_prefix}-${slug}.md"

# Ensure drafts directory exists
mkdir -p "$post_dir"

if [ -f "$post_path" ]; then
  echo "Error: Post $post_path already exists!"
  exit 1
fi

cat <<EOF > "$post_path"
---
layout: post
title: "$title"
description: "Description: $title"
image:
  url: /img/blog/blog-placeholder.jpg
  hide: false
tags:
  - NetLicensing
author:
  name: NetLicensing
  url: https://netlicensing.io
sitemap:
  images:
canonical:
---

Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

EOF

echo "✅ Created new draft post: $post_path"
