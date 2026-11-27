/*
 * Home page: shows the newest published entry of the wiki changelog feed, so the
 * line stays current without editing the site. Entries dated in the future are
 * skipped. The element stays hidden if the feed can't be read.
 */
(function () {
  'use strict';

  var line = document.querySelector('[data-latest-update]');
  if (!line || !window.fetch || !window.DOMParser) {
    return;
  }

  var CHANGELOG = 'https://netlicensing.io/wiki/changelog';

  function text(item, name) {
    var node = item.getElementsByTagName(name)[0];
    return node ? node.textContent.trim() : '';
  }

  fetch(line.getAttribute('data-feed'))
    .then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.text();
    })
    .then(function (xml) {
      var items = new DOMParser().parseFromString(xml, 'application/xml').getElementsByTagName('item');
      var now = Date.now();
      var latest = [].slice.call(items).filter(function (item) {
        return Date.parse(text(item, 'pubDate')) <= now && text(item, 'title');
      }).sort(function (a, b) {
        return Date.parse(text(b, 'pubDate')) - Date.parse(text(a, 'pubDate'));
      })[0];
      if (!latest) {
        return;
      }
      var date = new Date(text(latest, 'pubDate')).toLocaleDateString('en-US',
        { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
      var link = document.createElement('a');
      link.href = CHANGELOG;
      link.textContent = text(latest, 'title');
      line.appendChild(document.createTextNode('Latest update, ' + date + ': '));
      line.appendChild(link);
      line.hidden = false;
    })
    .catch(function () {
      // Leave the line hidden.
    });
})();
