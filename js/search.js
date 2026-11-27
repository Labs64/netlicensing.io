/*
 * Site search on /search/: filters search.json in the browser. Every word of the
 * query must appear in the title, description or tags; title matches rank first.
 */
(function () {
  'use strict';

  var list = document.querySelector('[data-search-results]');
  var status = document.querySelector('[data-search-status]');
  var input = document.getElementById('search-q');
  if (!list || !status || !input) {
    return;
  }

  var LIMIT = 30;
  var index = [];

  function score(doc, words) {
    var title = doc.title.toLowerCase();
    var tags = doc.tags.toLowerCase();
    var text = doc.text.toLowerCase();
    var total = 0;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var points = (title.indexOf(word) > -1 ? 5 : 0) +
        (tags.indexOf(word) > -1 ? 2 : 0) +
        (text.indexOf(word) > -1 ? 1 : 0);
      if (!points) {
        return 0;
      }
      total += points;
    }
    return total;
  }

  function element(name, text, className) {
    var node = document.createElement(name);
    node.textContent = text;
    if (className) {
      node.className = className;
    }
    return node;
  }

  function render() {
    var words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    list.textContent = '';
    if (!words.length) {
      status.textContent = '';
      return;
    }
    var found = index.map(function (doc, order) {
      return { doc: doc, score: score(doc, words), order: order };
    }).filter(function (hit) {
      return hit.score;
    }).sort(function (a, b) {
      // Same score: keep the index order, which lists newer articles first.
      return b.score - a.score || a.order - b.order;
    });
    status.textContent = found.length === 0 ? 'No results. Try fewer or different words.' :
      found.length + (found.length === 1 ? ' result' : ' results') +
      (found.length > LIMIT ? ', showing the first ' + LIMIT : '');
    found.slice(0, LIMIT).forEach(function (hit) {
      var doc = hit.doc;
      var item = document.createElement('li');
      var link = element('a', doc.title);
      link.href = doc.url;
      item.appendChild(link);
      item.appendChild(element('small', doc.date ? doc.kind + ' · ' + doc.date : doc.kind));
      item.appendChild(element('p', doc.text));
      list.appendChild(item);
    });
  }

  input.value = new URLSearchParams(window.location.search).get('q') || '';

  fetch(list.getAttribute('data-index'))
    .then(function (response) {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(function (data) {
      index = data;
      input.addEventListener('input', render);
      render();
    })
    .catch(function () {
      status.textContent = 'Search is unavailable right now. Please try again later.';
    });
})();
