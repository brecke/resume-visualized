# Agent guide

## Purpose and scope

This is Miguel Laginha's personal visual résumé: years form rows, work disciplines form columns, and color intensity represents exclusive shares of working time. Preserve the distinctive matrix rather than replacing it with a generic portfolio.

Read [README.md](README.md) for setup and commands, and [ROADMAP.md](ROADMAP.md) for historical context and direction. [GitHub epic #1](https://github.com/brecke/resume-visualized/issues/1) and its native sub-issues are the source of truth for tasks and acceptance criteria. The foundation has been implemented; design, copy, and release remain separate work. Implement only the requested issue.

## Repository map

| Path | Responsibility |
| --- | --- |
| `app/index.html` | Page entry, metric explanation, legend, and local module/style entry points. |
| `app/career.json` | Single source of dated career facts, declared coverage, discipline IDs/labels/colors, and completeness. |
| `app/scripts/data.ts` | Typed data model, runtime validation, and exported `careerData`. |
| `app/scripts/main.ts` | Semantic table renderer, exact percentage/unknown text, caption, and header relationships. |
| `app/styles/main.css` | Heatmap colors, unknown hatching, content-sized layout, and focusable horizontal scrolling. |
| `app/scripts/test/data.test.ts` | One deterministic Node built-in regression for the data contract and supplied dataset. |
| `package.json`, `package-lock.json` | Pinned npm tooling, commands, and the single application dependency lockfile. |
| `.nvmrc`, `tsconfig.json`, `vite.config.ts` | Node pin, strict type checking, relative-base Vite build from `app/` to `dist/`. |
| `.github/workflows/ci.yml` | Pinned-runtime installation, type check, data regression, and production build. |
| `.gitignore` | Excludes dependencies, generated output, and local workflow artifacts. |

Runtime flow: `index.html` → `main.ts` → validated `career.json` → semantic table; CSS supplies native intensity mapping. The regression independently imports the data and validator. There is no canvas, Bower/Grunt pipeline, shared-global script wiring, or second renderer.

## Data and visualization rules

- Do not invent career history, percentages, achievements, contact details, or data after 2016. Ask for owner facts only when the requested work needs information absent from the repository.
- Percentages are exclusive working-time shares, not expertise scores. Complete years have no nulls and total 100%; incomplete years have known totals at most 100% and may contain nulls. Keep the validator's floating-point tolerance.
- The owner approved the 2015 architecture correction from 70% to 50%, preserving other values. Do not normalize other allocations or change facts just to pass a check.
- `coverage` is inclusive and data-driven. Every covered year needs one explicit record with exactly the declared discipline IDs. For unknown years, use incomplete records with nulls—not invented zeros or omitted gaps.
- Preserve recorded zero versus unknown, chronological order, discipline labels/order, and per-discipline colors. Zero is white; 100% is the exact base color; unknown is labelled and hatched.
- Trace rendering and validation consumers before changing exports, data shape, coverage, or color calculation. Update both paths together; never introduce a parallel source of career data.
- Keep exact values readable as text with caption and row/column headers. Color and hover must not be the only ways to read the chart. Keyboard and touch need access to the same information.

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
- For visual changes, inspect the actual page on desktop and a 390px phone viewport, then resize. Exercise the full matrix, horizontal scrolling/focus, labels, missing-data states, and console/network diagnostics.
- For data changes, retain the small deterministic regression for consumer-visible boundaries and invariants. Do not test source strings, incidental wording, or copies of implementation wiring.
- For build changes, inspect generated assets at the intended deployment subpath. Keep scripts/dependencies local; no CDN injection as proof of an unmodified production build.
- Report exactly which commands and surfaces were exercised. Do not claim remote CI, deployment, commits, or issue completion without actual evidence.

## Contribution conventions

- Reuse Vite, vanilla TypeScript, native HTML/CSS, local JSON, and static hosting. No UI/charting framework, backend, CMS, or generic schema layer without a demonstrated requirement.
- Keep one application package manager/lockfile, the pinned supported runtime, and minimal CI. Remove replaced code; no compatibility shims, duplicate renderers, or vendor-specific assistant rule files.
- Update README commands and this map when changing the workflow. Track progress in the relevant GitHub issue, not a duplicate local checklist; satisfy its exit criteria before closing it.
- Do not deploy, push, or commit to the default branch unless requested. Keep publication decisions explicit; local implementation is not a published release.
- Do not commit `node_modules`, `dist/`, local `.a5c/` workflow state, or temporary smoke fixtures. A deliberate repository-owned social image/reference screenshot is a project asset.
- Preserve author, palette, and inspiration notices. Do not create a root license grant without owner confirmation.
