/*
 * Adds a "Copy" button to each shell example inside .NL_start_code. Without
 * JavaScript or clipboard access the examples stay selectable as usual.
 */
(function () {
  'use strict';

  if (!navigator.clipboard) {
    return;
  }

  [].forEach.call(document.querySelectorAll('.NL_start_code .language-bash'), function (code) {
    var block = code.closest('.highlighter-rouge, figure.highlight') || code.parentNode;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'NL_copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-live', 'polite');
    button.addEventListener('click', function () {
      navigator.clipboard.writeText(code.textContent.trim()).then(function () {
        button.textContent = 'Copied';
      }, function () {
        button.textContent = 'Select and copy';
      }).then(function () {
        setTimeout(function () {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
    block.classList.add('NL_copyable');
    block.appendChild(button);
  });
})();
