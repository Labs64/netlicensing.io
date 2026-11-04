# Local development image. Ruby 3.3 matches the GitHub Pages build environment;
# the jekyll/jekyll images are no longer maintained.
FROM ruby:3.3-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential git \
 && rm -rf /var/lib/apt/lists/* \
 && gem install bundler -v 4.0.16

WORKDIR /srv/jekyll

# Expose Jekyll server port and LiveReload port
EXPOSE 4000 35729
