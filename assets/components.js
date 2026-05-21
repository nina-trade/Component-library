(function () {
  var all = window.LIB_COMPONENTS || [];
  var categorize = window.LIB_CATEGORIZE;
  var flagsOf = window.LIB_FLAGS;
  var previews = window.LIB_PREVIEWS || {};
  var previewBase = window.LIB_PREVIEW_BASE;
  var previewThemeId = window.LIB_PREVIEW_THEME_ID;

  // Build category map
  var byCategory = {};
  all.forEach(function (name) {
    var cat = categorize(name);
    (byCategory[cat] = byCategory[cat] || []).push({
      name: name,
      flags: flagsOf(name, all),
      preview: previews[name] || null
    });
  });

  var CATEGORY_ORDER = [
    'Hero',
    'Brand sections',
    'Marketing blocks',
    'Product / PDP',
    'Collection / PLP',
    'Quiz / Find My Match',
    'Onboarding',
    'Account / Subscriber',
    'Gift',
    'Blog',
    'Upsell',
    'Layout / Nav',
    'Integrations',
    'Utility / Dev'
  ];

  function categorySort(a, b) {
    var ia = CATEGORY_ORDER.indexOf(a);
    var ib = CATEGORY_ORDER.indexOf(b);
    if (ia === -1) ia = 999;
    if (ib === -1) ib = 999;
    return ia - ib;
  }

  var categoryNames = Object.keys(byCategory).sort(categorySort);

  // Sidebar category nav
  var sidebarNav = document.getElementById('lib-category-nav');
  categoryNames.forEach(function (cat) {
    var a = document.createElement('a');
    a.href = '#' + slug(cat);
    a.className = 'lib-nav-link';
    a.innerHTML = cat + ' <span class="lib-nav-count">' + byCategory[cat].length + '</span>';
    sidebarNav.appendChild(a);
  });

  // Totals
  var totalPreviewable = 0;
  categoryNames.forEach(function (cat) {
    byCategory[cat].forEach(function (item) { if (item.preview) totalPreviewable++; });
  });
  document.getElementById('lib-count').textContent =
    ' (' + all.length + ' sections · ' + totalPreviewable + ' with live previews · ' + categoryNames.length + ' categories)';

  // Render category sections
  var root = document.getElementById('lib-categories');
  categoryNames.forEach(function (cat) {
    var items = byCategory[cat].sort(function (a, b) { return a.name.localeCompare(b.name); });
    var section = document.createElement('section');
    section.className = 'lib-section lib-cat';
    section.id = slug(cat);
    section.setAttribute('data-cat-section', cat);
    section.innerHTML =
      '<header class="lib-cat__header">' +
        '<h2 class="lib-h2">' + cat + '</h2>' +
        '<span class="lib-cat__count">' + items.length + '</span>' +
      '</header>' +
      '<div class="lib-cat__grid"></div>';
    var grid = section.querySelector('.lib-cat__grid');
    items.forEach(function (item) {
      grid.appendChild(renderCard(item));
    });
    root.appendChild(section);
  });

  // ===== Filtering =====
  var searchInput = document.getElementById('lib-search');
  var flagFilter = 'all';
  var query = '';

  document.querySelectorAll('[data-flag-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-flag-filter]').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      flagFilter = btn.getAttribute('data-flag-filter');
      applyFilters();
    });
  });

  searchInput.addEventListener('input', function () {
    query = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  function applyFilters() {
    document.querySelectorAll('[data-card]').forEach(function (card) {
      var name = card.getAttribute('data-name');
      var flagged = card.getAttribute('data-flagged') === 'true';
      var hasPreview = card.getAttribute('data-has-preview') === 'true';
      var matchQuery = !query || name.indexOf(query) !== -1;
      var matchFlag =
        flagFilter === 'all' ||
        (flagFilter === 'flagged' && flagged) ||
        (flagFilter === 'clean' && !flagged) ||
        (flagFilter === 'previewable' && hasPreview);
      card.style.display = matchQuery && matchFlag ? '' : 'none';
    });
    document.querySelectorAll('[data-cat-section]').forEach(function (sec) {
      var visible = sec.querySelectorAll('[data-card]:not([style*="display: none"])').length;
      sec.style.display = visible ? '' : 'none';
    });
  }

  // ===== Card rendering =====
  function previewUrl(item) {
    if (!item.preview) return null;
    var url = previewBase + item.preview.path + '?preview_theme_id=' + previewThemeId;
    if (item.preview.sectionId) url += '#shopify-section-' + item.preview.sectionId;
    return url;
  }

  function renderCard(item) {
    var card = document.createElement('div');
    var hasPreview = !!item.preview;
    card.className = 'lib-comp-card' +
      (item.flags.length ? ' is-flagged' : '') +
      (hasPreview ? ' has-preview' : '');
    card.setAttribute('data-card', 'true');
    card.setAttribute('data-name', item.name);
    card.setAttribute('data-flagged', item.flags.length ? 'true' : 'false');
    card.setAttribute('data-has-preview', hasPreview ? 'true' : 'false');

    var flagsHtml = item.flags.length
      ? '<ul class="lib-comp-card__flags">' +
          item.flags.map(function (f) { return '<li>⚠ ' + escapeHtml(f) + '</li>'; }).join('') +
        '</ul>'
      : '';

    var previewBadge = hasPreview
      ? '<span class="lib-comp-card__badge lib-comp-card__badge--preview">live</span>'
      : '<span class="lib-comp-card__badge lib-comp-card__badge--pending">preview pending</span>';

    var actionsHtml = hasPreview
      ? '<div class="lib-comp-card__actions">' +
          '<button data-action="toggle-preview" class="lib-comp-action">Preview ▾</button>' +
          '<a href="' + previewUrl(item) + '" target="_blank" rel="noopener" data-action="open-tab" class="lib-comp-action lib-comp-action--secondary">Open in tab ↗</a>' +
          '<button data-action="copy-path" class="lib-comp-action lib-comp-action--secondary">Copy path</button>' +
        '</div>'
      : '<div class="lib-comp-card__actions">' +
          '<span class="lib-comp-card__hint">Not yet mapped to a template — needs usage scan.</span>' +
          '<button data-action="copy-path" class="lib-comp-action lib-comp-action--secondary">Copy path</button>' +
        '</div>';

    var previewSlot = hasPreview
      ? '<div class="lib-comp-card__preview" data-preview-slot></div>'
      : '';

    card.innerHTML =
      '<div class="lib-comp-card__head">' +
        '<div>' +
          '<div class="lib-comp-card__name">' + escapeHtml(item.name) + '</div>' +
          '<div class="lib-comp-card__path">sections/' + escapeHtml(item.name) + '.liquid</div>' +
        '</div>' +
        previewBadge +
      '</div>' +
      flagsHtml +
      (item.preview && item.preview.note ? '<div class="lib-comp-card__note">Note: ' + escapeHtml(item.preview.note) + '</div>' : '') +
      actionsHtml +
      previewSlot;

    wireCard(card, item);
    return card;
  }

  function wireCard(card, item) {
    var toggleBtn = card.querySelector('[data-action="toggle-preview"]');
    var copyBtn = card.querySelector('[data-action="copy-path"]');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var expanded = card.classList.toggle('is-expanded');
        toggleBtn.textContent = expanded ? 'Hide preview ▴' : 'Preview ▾';
        if (expanded) {
          mountPreview(card, item);
        }
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        navigator.clipboard && navigator.clipboard.writeText('sections/' + item.name + '.liquid');
        copyBtn.textContent = 'Copied ✓';
        setTimeout(function () { copyBtn.textContent = 'Copy path'; }, 1200);
      });
    }
  }

  function mountPreview(card, item) {
    var slot = card.querySelector('[data-preview-slot]');
    if (!slot || slot.querySelector('iframe')) return;
    var url = previewUrl(item);
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = item.name + ' preview';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    iframe.className = 'lib-comp-card__iframe';

    // Fallback if Shopify blocks iframing (X-Frame-Options).
    // We can't reliably detect that across origins, but we can render a soft
    // fallback in the slot below the iframe so the user always has a way through.
    var fallback = document.createElement('div');
    fallback.className = 'lib-comp-card__fallback';
    fallback.innerHTML =
      'If the preview is blank, Shopify is blocking iframing. ' +
      '<a href="' + url + '" target="_blank" rel="noopener">Open in a new tab ↗</a>';

    slot.appendChild(iframe);
    slot.appendChild(fallback);
  }

  // ===== Helpers =====
  function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
