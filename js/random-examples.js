// Home page: show a random selection of case studies out of those rendered in [data-random-examples].
(function () {
    var list = document.querySelector('[data-random-examples]');
    if (!list) {
        return;
    }
    var count = parseInt(list.getAttribute('data-random-examples'), 10) || 3;
    var cards = Array.prototype.slice.call(list.children);

    // Fisher-Yates shuffle.
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var card = cards[i];
        cards[i] = cards[j];
        cards[j] = card;
    }

    cards.forEach(function (item, index) {
        item.hidden = index >= count;
        list.appendChild(item);
    });
})();
