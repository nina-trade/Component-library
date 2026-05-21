// Renders every token by applying real Trade Tailwind classes to DOM nodes,
// then reads the computed style to surface the hex value. Anything that
// resolves to "rgba(0,0,0,0)" (transparent) means the class isn't defined in
// the Tailwind bundle, and we drop it so we don't show empty swatches.

(function () {
  // ===== Colors =====
  // Standard Tailwind scale + design-system custom scales
  var SCALE = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  var COLOR_FAMILIES = [
    { id: 'charcoal',    target: '#swatch-charcoal' },
    { id: 'highlighter', target: '#swatch-highlighter' },
    { id: 'blurple',     target: '#swatch-blurple' },
    { id: 'ice',         target: '#swatch-ice' },
    { id: 'bubblegum',   target: '#swatch-bubblegum' },
    { id: 'roast',       target: '#swatch-roast' }
  ];
  COLOR_FAMILIES.forEach(function (fam) {
    var container = document.querySelector(fam.target);
    if (!container) return;
    SCALE.forEach(function (step) {
      var twClass = 'bg-' + fam.id + '-' + step;
      renderSwatch(container, twClass);
    });
    // Some families have an unscaled base too (e.g. bg-roast). Try it.
    renderSwatch(container, 'bg-' + fam.id, true);
  });

  // Surface tokens (special-cased — no numeric scale)
  var surfaceContainer = document.querySelector('#swatch-surface');
  if (surfaceContainer) {
    ['bg-surface-white', 'bg-surface-warm', 'bg-white', 'bg-black'].forEach(function (cls) {
      renderSwatch(surfaceContainer, cls);
    });
  }

  function renderSwatch(container, className, allowMissing) {
    var probe = document.createElement('div');
    probe.className = className;
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    document.body.appendChild(probe);
    var bg = getComputedStyle(probe).backgroundColor;
    document.body.removeChild(probe);

    if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
      // Class isn't defined — skip silently
      return;
    }

    var hex = rgbToHex(bg) || bg;
    var luminance = brightnessFromRgb(bg);
    var swatch = document.createElement('div');
    swatch.className = 'lib-swatch';
    swatch.setAttribute('data-tw-bg', className);
    swatch.innerHTML =
      '<div class="lib-swatch__chip ' + className + '" style="' +
        (luminance > 200 ? 'border-bottom-color:#ebeae6' : '') + '"></div>' +
      '<div class="lib-swatch__meta">' +
        '<div class="lib-swatch__name">' + className.replace(/^bg-/, '') + '</div>' +
        '<div class="lib-swatch__value">' + hex + '</div>' +
      '</div>';
    swatch.addEventListener('click', function () {
      navigator.clipboard && navigator.clipboard.writeText(className);
      flash(swatch);
    });
    swatch.style.cursor = 'pointer';
    container.appendChild(swatch);
  }

  function flash(el) {
    var prev = el.style.outline;
    el.style.outline = '2px solid #687afd';
    setTimeout(function () { el.style.outline = prev; }, 400);
  }

  function rgbToHex(rgb) {
    var m = rgb.match(/rgba?\((\d+)[, ]\s*(\d+)[, ]\s*(\d+)/);
    if (!m) return null;
    return '#' + [m[1], m[2], m[3]].map(function (n) {
      return Number(n).toString(16).padStart(2, '0');
    }).join('').toUpperCase();
  }

  function brightnessFromRgb(rgb) {
    var m = rgb.match(/rgba?\((\d+)[, ]\s*(\d+)[, ]\s*(\d+)/);
    if (!m) return 0;
    return 0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3];
  }

  // ===== Typography =====
  function renderTypeScale(targetSel, classPrefix, sizes, sampleText) {
    var container = document.querySelector(targetSel);
    if (!container) return;
    sizes.forEach(function (size) {
      var className = classPrefix + size;
      var probe = document.createElement('span');
      probe.className = className;
      document.body.appendChild(probe);
      var cs = getComputedStyle(probe);
      var px = cs.fontSize;
      var weight = cs.fontWeight;
      var lh = cs.lineHeight;
      document.body.removeChild(probe);

      if (!px || px === '16px' && weight === '400' && classPrefix !== 'text-body-') {
        // Likely undefined — skip (heuristic)
        // Allow text-body- defaults through
      }

      var row = document.createElement('div');
      row.className = 'lib-type-row';
      row.innerHTML =
        '<div class="lib-type-row__sample ' + className + '">' + sampleText + '</div>' +
        '<div class="lib-type-row__meta">' +
          '<div class="lib-type-row__class">' + className + '</div>' +
          '<div>' + px + ' / ' + (lh === 'normal' ? 'normal' : lh) + ' / ' + weight + '</div>' +
        '</div>';
      container.appendChild(row);
    });
  }

  renderTypeScale('#type-display', 'text-display-', ['72', '60', '48', '36'], 'Display sample');
  renderTypeScale('#type-headline', 'text-headline-', ['44', '36', '28', '24', '22', '20', '18'], 'Headline sample');
  renderTypeScale('#type-body', 'text-body-', ['24', '20', '18', '16', '14', '12'], 'Body sample — the quick brown fox jumps over the lazy dog.');
  renderTypeScale('#type-eyebrow', 'text-eyebrow-', ['lg', 'md', 'sm', 'xs'], 'EYEBROW SAMPLE');

  // ===== Spacing =====
  var spacingValues = ['0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '64', '80', '96'];
  var spacingContainer = document.querySelector('#spacing-list');
  if (spacingContainer) {
    spacingValues.forEach(function (v) {
      var probe = document.createElement('div');
      probe.style.paddingLeft = '0';
      probe.className = 'pl-' + v;
      document.body.appendChild(probe);
      var px = getComputedStyle(probe).paddingLeft;
      document.body.removeChild(probe);
      if (!px || px === '0px') return;
      var row = document.createElement('div');
      row.className = 'lib-spacing-row';
      row.innerHTML =
        '<div class="lib-spacing-row__name">' + v + '</div>' +
        '<div class="lib-spacing-row__value">' + px + '</div>' +
        '<div class="lib-spacing-bar" style="width:' + px + '"></div>';
      spacingContainer.appendChild(row);
    });
  }

  // ===== Radii =====
  var radiusValues = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '18', '20', '24', '28', 'full'];
  var radiusContainer = document.querySelector('#radius-list');
  if (radiusContainer) {
    radiusValues.forEach(function (v) {
      var className = 'rounded-' + v;
      var probe = document.createElement('div');
      probe.className = className;
      document.body.appendChild(probe);
      var r = getComputedStyle(probe).borderRadius;
      document.body.removeChild(probe);
      if (!r || r === '0px' && v !== 'none') return;

      var tile = document.createElement('div');
      tile.className = 'lib-radius-tile ' + className;
      tile.innerHTML =
        '<div>' +
          '<div style="color:#252525">' + className + '</div>' +
          '<div style="color:#4a4a4d;margin-top:2px">' + r + '</div>' +
        '</div>';
      radiusContainer.appendChild(tile);
    });
  }
})();
