# Trade Component Library

A Storybook-style reference for everything currently built in the Trade
Shopify theme — design tokens, primitives, and components. Owned by the Design org.

## What's here

- `index.html` — landing page and nav
- `tokens.html` — colors, typography, spacing, radii, breakpoints (real Trade Tailwind classes, hex values computed live)
- `primitives.html` — buttons, badges (more coming)
- `components.html` — section catalog (coming next)
- `assets/trade-tailwind.css` — the actual compiled Tailwind from the theme; refreshed each time the library regenerates
- `assets/style.css` — library-only chrome (sidebar, layout)
- `assets/script.js`, `assets/tokens.js` — render swatches and read computed values

## How to refresh

The theme moves; this site doesn't auto-sync. To pull the latest:

1. Open this folder in Claude.
2. Paste:

   > **Refresh the Trade component library — pull current sections, snippets, design tokens, regenerate all pages, and show me a changelog.**

3. Claude pulls the live preview theme via the Shopify MCP tools, regenerates the static files, and surfaces what changed.
4. `git push` to update the deployed site.

Refresh runs through Claude because Shopify theme data is only reachable via the MCP tools. If a teammate without Claude/MCP access needs to refresh, we'd need to wire up a Node script with a Shopify API token (deferred until needed).

## Deployment

Hosted on GitHub Pages from this repo. To enable Pages on first push:

1. Go to **Settings → Pages** in the GitHub repo
2. Source: **Deploy from a branch**
3. Branch: **main** / **root**
4. Save

The site will be at `https://nina-trade.github.io/Component-library/`.

## Access control

This repo is currently **public**. For password protection without a paid GitHub plan, the simplest path is [staticrypt](https://github.com/robinmoisson/staticrypt) — wraps the site in a password gate that encrypts the output. To add: `npx staticrypt index.html tokens.html primitives.html components.html -p "<password>"`. Deferred until you've gotten value from v1.

## Local preview

Just open `index.html` in a browser, or run any static server in this directory (`python3 -m http.server 8000`).
