/*
 * Keeps the plan in view on /pricing/: once a column's top button has scrolled away,
 * a slim bar under the navigation repeats its name, price and button, placed over
 * that column. It works for four columns, two per row and one per row alike.
 * Without JavaScript the page works as before.
 */
(function () {
  'use strict';

  var columns = [].slice.call(document.querySelectorAll('.NL_pricing [data-plan]'));
  var nav = document.querySelector('.NL_navbar');
  if (!columns.length || !nav) {
    return;
  }

  var strip = document.createElement('div');
  strip.className = 'NL_plan_strip';
  strip.hidden = true;
  document.body.appendChild(strip);

  var cells = columns.map(function (column) {
    var cell = document.createElement('div');
    cell.className = 'NL_plan_strip_cell' +
      (column.classList.contains('NL_price_promo') ? ' NL_plan_strip_promo' : '');
    cell.hidden = true;
    strip.appendChild(cell);
    return cell;
  });

  function shownPrice(column) {
    var tag = [].slice.call(column.querySelectorAll('.NL_price_tag')).filter(function (el) {
      return !el.hidden;
    })[0];
    if (!tag) {
      return '';
    }
    var copy = tag.cloneNode(true);
    // The offer footnote mark stays; only the struck-through regular price goes.
    [].forEach.call(copy.querySelectorAll('s'), function (el) { el.parentNode.removeChild(el); });
    // "mo" keeps name and price on one line in narrow columns.
    return copy.textContent.replace(/\s+/g, ' ').replace('/ month', '/ mo').trim();
  }

  // Built on first show, after js/promo.js has set offer prices and links.
  function fill(cell, column) {
    var text = document.createElement('div');
    var name = document.createElement('b');
    var amount = document.createElement('small');
    name.textContent = column.querySelector('.NL_plan_name').textContent;
    amount.textContent = shownPrice(column);
    text.appendChild(name);
    text.appendChild(amount);

    var source = column.querySelector('[data-plan-cta]');
    var link = document.createElement('a');
    link.href = source.href;
    link.target = source.target;
    link.rel = source.rel;
    // Short labels fit a narrow column.
    link.textContent = { free: 'Register', enterprise: 'Quote' }[column.getAttribute('data-plan')] || 'Free trial';
    link.setAttribute('aria-label', source.textContent.trim() + ', ' + name.textContent);

    cell.appendChild(text);
    cell.appendChild(link);
  }

  function update() {
    var line = nav.getBoundingClientRect().bottom;
    var any = false;
    columns.forEach(function (column, i) {
      var box = column.getBoundingClientRect();
      var button = column.querySelector('[data-plan-cta]').getBoundingClientRect();
      var show = button.bottom < line && box.bottom > line + 120;
      var cell = cells[i];
      if (show) {
        if (!cell.firstChild) {
          fill(cell, column);
        }
        cell.style.left = box.left + 'px';
        cell.style.width = box.width + 'px';
        cell.classList.toggle('NL_plan_strip_narrow', box.width < 230);
        any = true;
      }
      cell.hidden = !show;
    });
    strip.style.top = line + 'px';
    strip.hidden = !any;
  }

  var queued = false;
  function schedule() {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        update();
      });
    }
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
})();
