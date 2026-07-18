# @uraniumtech/ui

Uranium Technologies design system: brand tokens (`src/styles/tokens.css`), React components, D3 chart wrappers. Consumed as a git dependency by `astro_utechapp` (uraniumtech.app), `uraniumtechnologies` (marketing, tokens.css only — it is React-free), and the future utechcrm rebuild.

Brand rules (palette, typography, anti-defaults) live in the `uranium-technologies-branding` skill — load it before any visual work here.

## The four-artifact rule (enforced by CI)

A component is not done until ALL FOUR exist — `scripts/check-manifest.mjs` fails otherwise:

1. `src/components/X.tsx` (or `src/charts/X.tsx`) exported from `src/index.ts`
2. `src/components/X.test.tsx` co-located Vitest + Testing Library tests
3. An entry in `llms.txt` (with a `REPLACES:` line — say what agents should stop hand-writing) AND `manifest.json`
4. Rendered on `docs/src/pages/index.astro` (light + dark)

## Hard rules

- No raw hex in components — Tailwind token classes (`bg-petrol`, `text-ut-muted`) or `var(--ut-*)`. Chart colors only via `src/charts/theme.ts`.
- Never build Tailwind class names from props (`bg-${x}-500` is silently dropped by v4). Use static lookup tables — see `StatCard.tsx` for the pattern.
- Prefer semantic tokens (`bg-ut-surface`, `text-ut-text`, `border-ut-border`) so components work in both themes; palette tokens (`bg-petrol`) only where the color is intentional in both modes.
- d3 stays inside `src/charts/`. Chart series colors are palette token names, never hex props.
- Keyboard a11y is not optional: interactive components need roles + arrow-key handling (see SegmentedControl/Tabs).

## Commands

- `npm test` — Vitest (jsdom; ResizeObserver mocked in `vitest.setup.ts`)
- `npm run check` — tsc + tests + manifest check (run before committing)
- `npm run build` — tsup → dist/
- `npm run docs:dev` — component gallery at localhost:4321
- `npm run test:visual` — Playwright screenshots of the docs pages

## Releasing

`dist/` is checked into git (there is no `prepare` script — consumers install the git dep without building or pulling devDependencies). To release: run `npm run build`, bump `version` in package.json, commit **including `dist/`**, `git tag vX.Y.Z`, push with tags. Consumers pin `github:cincybc/ut-ui#vX.Y.Z`.
