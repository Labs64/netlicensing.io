// Promo offer on /pricing/: show it only between data-start and data-end.
// Without JavaScript the regular prices stay visible.
(function () {
  'use strict';

  var marker = document.getElementById('promo');
  if (!marker) return;

  var now = Date.now();
  var live = now >= Date.parse(marker.getAttribute('data-start')) &&
             now <= Date.parse(marker.getAttribute('data-end'));
  if (!live) return;

  [].forEach.call(document.querySelectorAll('[data-promo-on]'), function (el) { el.hidden = false; });
  [].forEach.call(document.querySelectorAll('[data-promo-off]'), function (el) { el.hidden = true; });
  [].forEach.call(document.querySelectorAll('[data-promo-href]'), function (el) {
    el.href = el.getAttribute('data-promo-href');
  });
})();
