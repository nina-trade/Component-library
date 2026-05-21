(function () {
  var all = window.LIB_COMPONENTS || [];
  var categorize = window.LIB_CATEGORIZE;
  var flagsOf = window.LIB_FLAGS;

  // Build category map
  var byCategory = {};
  all.forEach(function (name) {
    var cat = categorize(name);
    (byCategory[cat] = byCategory[cat] || []).push({
      name: name,
      flags: flagsOf(name, all)
    });
  });

  // Sort categories so the most relevant ones come first
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

  // Total count
  document.getElementById('lib-count').textContent =
    ' (' + all.length + ' sections across ' + categoryNames.length + ' categories)';

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
      var matchQuery = !query || name.indexOf(query) !== -1;
      var matchFlag =
        flagFilter === 'all' ||
        (flagFilter === 'flagged' && flagged) ||
        (flagFilter === 'clean' && !flagged);
      card.style.display = matchQuery && matchFlag ? '' : 'none';
    });
    // Hide empty categories
    document.querySelectorAll('[data-cat-section]').forEach(function (sec) {
      var visible = sec.querySelectorAll('[data-card]:not([style*="display: none"])').length;
      sec.style.display = visible ? '' : 'none';
    });
  }

  // ===== Helpers =====
  function renderCard(item) {
    var card = document.createElement('div');
    card.className = 'lib-comp-card' + (item.flags.length ? ' is-flagged' : '');
    card.setAttribute('data-card', 'true');
    card.setAttribute('data-name', item.name);
    card.setAttribute('data-flagged', item.flags.length ? 'true' : 'false');
    var flagsHtml = item.flags.length
      ? '<ul class="lib-comp-card__flags">' +
          item.flags.map(function (f) { return '<li>⚠ ' + escapeHtml(f) + '</li>'; }).join('') +
        '</ul>'
      : '';
    card.innerHTML =
      '<div class="lib-comp-card__name">' + escapeHtml(item.name) + '</div>' +
      '<div class="lib-comp-card__path">sections/' + escapeHtml(item.name) + '.liquid</div>' +
      flagsHtml;
    card.addEventListener('click', function () {
      navigator.clipboard && navigator.clipboard.writeText('sections/' + item.name + '.liquid');
      var prev = card.style.borderColor;
      card.style.borderColor = '#252525';
      setTimeout(function () { card.style.borderColor = prev; }, 400);
    });
    return card;
  }

  function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
