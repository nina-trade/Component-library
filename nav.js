(function () {
  'use strict';

  const filename = window.location.pathname.split('/').pop() || 'foundations.html';
  const hash = window.location.hash;

  function isActive(href) {
    const [hFile, hAnchor] = href.split('#');
    const fileMatch = filename === hFile;
    const anchorMatch = !hAnchor || hash === '#' + hAnchor;
    return fileMatch && anchorMatch;
  }

  function link(href, label) {
    const active = isActive(href);
    return `<a href="${href}" class="block px-3 py-[6px] rounded-md text-[14px] leading-[1.6] no-underline transition-colors duration-150 ${active ? 'bg-[#EBFF88] font-medium text-[#252525]' : 'text-[#252525] hover:bg-[#F7F7F8]'}">${label}</a>`;
  }

  document.getElementById('sidebar').innerHTML = `
    <div style="margin-bottom:32px">
      <div style="font-family:'GT Alpina',Georgia,serif;font-size:22px;font-weight:500;color:#252525;line-height:1.2">Trade</div>
      <div style="font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:0.15em;color:#7A7A7F;text-transform:uppercase;margin-top:5px">Component Library</div>
    </div>
    <nav style="display:flex;flex-direction:column;gap:20px">
      <div>
        <div style="font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:0.15em;color:#B8B8BC;text-transform:uppercase;margin-bottom:6px;padding-left:12px">Foundations</div>
        <div style="display:flex;flex-direction:column;gap:1px">
          ${link('foundations.html#overview', 'Overview')}
          ${link('foundations.html#colors', 'Colors')}
          ${link('foundations.html#typography', 'Typography')}
          ${link('foundations.html#spacing', 'Spacing')}
          ${link('foundations.html#radii', 'Radii')}
        </div>
      </div>
      <div>
        <div style="font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:0.15em;color:#B8B8BC;text-transform:uppercase;margin-bottom:6px;padding-left:12px">Primitives</div>
        <div style="display:flex;flex-direction:column;gap:1px">
          ${link('primitives.html#buttons', 'Buttons')}
          ${link('primitives.html#badges', 'Badges')}
          ${link('primitives.html#inputs', 'Inputs')}
          ${link('primitives.html#dropdowns', 'Dropdowns')}
          ${link('primitives.html#selectors', 'Selectors')}
          ${link('primitives.html#chips-tags', 'Chips & tags')}
          ${link('primitives.html#accordions', 'Accordions')}
          ${link('primitives.html#avatars', 'Avatars')}
          ${link('primitives.html#progress', 'Progress')}
        </div>
      </div>
      <div>
        <div style="font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:0.15em;color:#B8B8BC;text-transform:uppercase;margin-bottom:6px;padding-left:12px">Components</div>
        <div style="display:flex;flex-direction:column;gap:1px">
          ${link('components.html', 'All sections')}
        </div>
      </div>
    </nav>
  `;

  // Copy class string on click
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-copy]');
    if (!el) return;
    const text = el.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(function () {
      const prev = el.textContent;
      const prevColor = el.style.color;
      el.textContent = 'Copied!';
      el.style.color = '#252525';
      setTimeout(function () {
        el.textContent = prev;
        el.style.color = prevColor;
      }, 1500);
    });
  });

  // Scroll to hash on load
  if (hash) {
    setTimeout(function () {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }
})();
