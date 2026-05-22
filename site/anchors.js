/* scryspec.com — header deep-link anchors
 *
 * Adds a permanent, quiet "#" affordance after every <h2>/<h3> on the
 * page. Clicking it copies the absolute deep link to the clipboard,
 * updates the URL hash, and flashes a brief "copied" confirmation.
 *
 * To opt a header out, add class="no-anchor".
 */
(function () {
  function slug(s) {
    return s
      .toLowerCase()
      .replace(/[‘’“”']/g, '')
      .replace(/&[a-z]+;/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function init() {
    var used = Object.create(null);
    // Pre-register any existing ids so we don't collide with them.
    document.querySelectorAll('[id]').forEach(function (el) {
      used[el.id] = true;
    });

    var headers = document.querySelectorAll('h2, h3');
    headers.forEach(function (h) {
      if (h.classList.contains('no-anchor')) return;
      // Use only the text content (excluding any pre-existing children).
      var text = (h.textContent || '').trim();
      if (!text) return;

      var id = h.id;
      if (!id) {
        var base = slug(text) || 'section';
        id = base;
        var n = 2;
        while (used[id]) {
          id = base + '-' + n;
          n++;
        }
        h.id = id;
      }
      used[id] = true;

      var a = document.createElement('a');
      a.className = 'h-anchor';
      a.href = '#' + id;
      a.textContent = '#';
      a.setAttribute('aria-label', 'Copy link to section: ' + text);
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var url =
          window.location.origin + window.location.pathname + '#' + id;
        try {
          history.replaceState(null, '', '#' + id);
        } catch (_) {
          window.location.hash = id;
        }
        var done = function () {
          a.classList.add('copied');
          setTimeout(function () {
            a.classList.remove('copied');
          }, 1200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, function () {
            // Fallback below.
            fallbackCopy(url);
            done();
          });
        } else {
          fallbackCopy(url);
          done();
        }
      });
      h.appendChild(document.createTextNode(' '));
      h.appendChild(a);
    });

    // If the page loaded with a hash, scroll to it now that ids exist.
    if (window.location.hash) {
      var target = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1))
      );
      if (target && target.scrollIntoView) {
        target.scrollIntoView();
      }
    }
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (_) {
      /* swallow */
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
