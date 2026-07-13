# @uraniumtech/ui

Uranium Technologies design system: brand tokens, tested React components, and D3 chart wrappers. Single source of truth for uraniumtech.app, uraniumtechnologies.com, and utechcrm.

- **Agent/component catalog**: [`llms.txt`](./llms.txt) (machine-readable: [`manifest.json`](./manifest.json))
- **Contributing rules**: [`CLAUDE.md`](./CLAUDE.md) — the four-artifact rule is enforced by CI
- **Gallery**: `npm run docs:dev` → http://localhost:4321 (light + dark)

## Install (git dependency)

```jsonc
// package.json
"dependencies": {
  "@uraniumtech/ui": "github:cincybc/ut-ui#v0.1.0"
}
```

```css
/* global.css — Tailwind v4 */
@import "tailwindcss";
@import "@uraniumtech/ui/tokens.css";
/* REQUIRED: let Tailwind scan the library's class names (adjust path depth per repo) */
@source "../../node_modules/@uraniumtech/ui/src";
```

Dark mode: `<body data-theme="dark">`. React-free consumers (marketing site) import only `tokens.css`.

## Develop

```
npm install
npm run check        # tsc + vitest + manifest check
npm run docs:dev     # component gallery
npm run test:visual  # Playwright screenshots vs docs pages
```

## Release

Bump `version`, commit, `git tag vX.Y.Z`, `git push --tags`. Consumers update the pinned tag; `dist/` is built on install via the `prepare` script.
