# Agent guide

## Purpose and scope

This is Miguel Laginha's personal visual résumé: years form rows, work disciplines form columns, and color intensity represents estimated, exclusive shares of working time. Preserve the distinctive matrix rather than replacing it with a generic portfolio.

Read [README.md](README.md) for setup, commands and copy sources, and [ROADMAP.md](ROADMAP.md) for historical context and direction. [GitHub epic #1](https://github.com/brecke/resume-visualized/issues/1) and its native sub-issues are the source of truth for tasks and acceptance criteria. Foundation, responsive design, owner-reviewed copy and the share-ready site are published; implement only the requested issue, not speculative optional enhancements.

## Repository map

| Path | Responsibility |
| --- | --- |
| `app/index.html` | Static biography/contact, dated narrative/guide, manual update date, canonical/OG/card metadata, matrix and disclosure shell. |
| `app/career.json` | Single source of dated career facts, declared coverage, discipline IDs/labels/colors, and completeness. |
| `app/scripts/data.ts` | Typed data model, runtime validation, and exported `careerData`. |
| `app/scripts/main.ts` | Semantic table, one button per year, exact selected-year details, native disclosure state/focus, and fine-pointer hover. |
| `app/styles/main.css` | Screen editorial/matrix/focus tokens and native full-matrix/contact print CSS. |
| `app/scripts/test/data.test.ts` | One deterministic Node built-in regression for the data contract and supplied dataset. |
| `package.json`, `package-lock.json` | Pinned npm tooling, commands, and the single application dependency lockfile. |
| `.nvmrc`, `tsconfig.json`, `vite.config.ts` | Node pin, strict type checking, relative-base Vite build from `app/` to `dist/`. |
| `.github/workflows/ci.yml` | One pinned check/build; master-only checked artifact and protected-environment Pages deployment, never PR deployment. |
| `.gitignore` | Excludes dependencies, generated output, and local workflow artifacts. |
| `images/desktop.webp`, `images/mobile.webp` | Repository-owned production references; update intentionally when design or visible copy changes. |
| `app/public/` | Vite-copied favicon, 1200×630 real-matrix social PNG, standalone 404 and deployed legal notices. |
| `LICENSE` | Owner-confirmed project MIT grant. |

Runtime flow: `index.html` → `main.ts` → validated `career.json` → semantic table and native year details; CSS supplies native intensity mapping. Static introduction/contact survive script failure. The regression independently imports the data and validator. There is no canvas, Bower/Grunt pipeline, shared-global script wiring, or second renderer.

## Data and visualization rules

- Do not invent career history, percentages, achievements, contact details, or data after 2016. Ask for owner facts only when the requested work needs information absent from the repository.
- Percentages are owner-confirmed estimates of exclusive working-time shares, not expertise scores. Complete years have no nulls and total 100%; incomplete years have known totals at most 100% and may contain nulls. Keep the validator's floating-point tolerance.
- The owner approved the 2015 architecture correction from 70% to 50%, preserving other values. Do not normalize other allocations or change facts just to pass a check.
- `coverage` is inclusive and data-driven. Every covered year needs one explicit record with exactly the declared discipline IDs. For unknown years, use incomplete records with nulls—not invented zeros or omitted gaps.
- Preserve recorded zero versus unknown, chronological order, discipline labels/order, and per-discipline colors. Zero is white; 100% is the exact base color; unknown is labelled and hatched.
- Trace rendering and validation consumers before changing exports, data shape, coverage, or color calculation. Update both paths together; never introduce a parallel source of career data.
- Keep exact values readable as text with caption and row/column headers. Color and hover must not be the only ways to read the chart. Keyboard and touch need access to the same information.
- Current biography/contact are owner-approved from [Miguel's published profile](https://miguellaginha.com/). The primary mailto address is `me@miguellaginha.com`; the secondary route is that real profile, not an invented résumé download. New factual claims and label changes need owner review.
- Keep the current biography distinct from historical 2006–2016 allocations. Static turning points in `index.html` describe existing records only; do not infer employers, projects, outcomes, or the cause of a change.
- The `<time>` in `index.html` is a manually maintained content-update date, currently 2026-10-08. Change it only for an actual content review/update, not every build or deployment. It never extends chart coverage.

## Working and checking

Use Node **24.21.0** and npm **12.2.0**. Follow README setup; run from the repository root:

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run preview
```

- `dev` serves source; `preview` serves the generated production build. A listening server or passing test alone does not prove the chart renders.
- For visual changes, inspect actual 390px phone, laptop, wide-screen and 200% zoom layouts, then resize. Exercise all years/columns, forward **and backward** Tab navigation past sticky headers, arrow scrolling, tap/keyboard/hover year details, native disclosure/focus, unknown states, contrast and console/network diagnostics. Keep the underlying table readable and avoid per-cell tab stops.
- Inspect actual accessibility-tree reading order and script-disabled intro/contact. State whether zoom is native or layout-emulated, and whether screen-reader evidence is structural or an auditory session; do not turn those checks into certification claims. No animation is needed.
- When extending coverage with owner facts, also update the static historical-period copy and noscript message in `index.html`; never let the readable fallback contradict `career.json`.
- For data changes, retain the small deterministic regression for consumer-visible boundaries and invariants. Do not test source strings, incidental wording, or copies of implementation wiring.
- For build changes, inspect generated assets at the intended deployment subpath. Keep scripts/dependencies local; no CDN injection as proof of an unmodified production build.
- Report exactly which commands and surfaces were exercised. Do not claim remote CI, deployment, commits, or issue completion without actual evidence.
- Canonical public URL is `https://miguellaginha.com/resume-visualized/`, the owner-approved inherited Pages domain; keep static canonical/OG/card image URLs and the absolute 404 home route aligned. Metadata must work without JavaScript. Do not change root-site/DNS settings.
- Publishing data updates requires owner review, data/copy/manual-date alignment, actual production/print checks, intentional social PNG/reference refresh, a reviewed feature PR and observed master CI/Pages completion. Follow README; do not claim publication from local output.
- Social PNG must contain the actual complete recorded matrix, owner name and honest estimated-share/period description. It is manually refreshed, not an automatic export. No custom share widget is needed over browser-native sharing.
- Check actual PDF pagination and text extraction; no promise of a downloadable résumé. Keep owner/Vite/Rolldown notices in deployed output. MIT does not grant rights over referenced third-party sites/artwork.

## Contribution conventions

- Reuse Vite, vanilla TypeScript, native HTML/CSS, local JSON, and static hosting. No UI/charting framework, backend, CMS, or generic schema layer without a demonstrated requirement.
- Keep one application package manager/lockfile, the pinned supported runtime, and minimal CI. Remove replaced code; no compatibility shims, duplicate renderers, or vendor-specific assistant rule files.
- Update README commands and this map when changing the workflow. Track progress in the relevant GitHub issue, not a duplicate local checklist; satisfy its exit criteria before closing it.
- Do not deploy, push, or commit to the default branch unless requested. Keep publication decisions explicit; local implementation is not a published release.
- Do not commit `node_modules`, `dist/`, local `.a5c/` workflow state, or temporary smoke fixtures. A deliberate repository-owned social image/reference screenshot is a project asset.
- Preserve owner, palette, inspiration and deployed third-party notices. Project MIT is owner-confirmed in `LICENSE`; review any new dependency's deployed license obligations rather than inventing grants.
