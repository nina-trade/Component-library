// Update "Last generated" timestamp from meta tag if present
(function () {
  var meta = document.querySelector('meta[name="lib-last-gen"]');
  var el = document.getElementById('lib-last-gen');
  if (meta && el) {
    el.textContent = meta.getAttribute('content');
  } else if (el) {
    el.textContent = document.lastModified.split(' ')[0] || '—';
  }

  // Mark current nav link active by URL
  var path = window.location.pathname.split('/').pop() || 'index.html';
  var hash = window.location.hash;
  var links = document.querySelectorAll('.lib-nav-link');
  links.forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || href === path + hash) {
      a.classList.add('is-active');
    }
  });

  // For each [data-tw] swatch, read computed background and display the rgb value
  document.querySelectorAll('[data-tw-bg]').forEach(function (swatch) {
    var chip = swatch.querySelector('.lib-swatch__chip');
    var valueEl = swatch.querySelector('.lib-swatch__value');
    if (!chip || !valueEl) return;
    var rgb = getComputedStyle(chip).backgroundColor;
    valueEl.textContent = rgbToHex(rgb) || rgb;
  });

  function rgbToHex(rgb) {
    var m = rgb.match(/rgba?\((\d+)[, ]\s*(\d+)[, ]\s*(\d+)/);
    if (!m) return null;
    return '#' + [m[1], m[2], m[3]].map(function (n) {
      return Number(n).toString(16).padStart(2, '0');
    }).join('').toUpperCase();
  }
})();
