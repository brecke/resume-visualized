# Roadmap

## Direction

Make this a distinctive, trustworthy, shareable visual résumé—not a generic portfolio with a chart attached. Preserve the year-by-discipline matrix, its color rhythm, and the ability to see a career changing at a glance.

The first release is Miguel Laginha's personal page. Keep the data easy to replace, but do not turn the project into a résumé builder, hosted service, or component library without an actual need.

Track execution in [GitHub epic #1](https://github.com/brecke/resume-visualized/issues/1). Its native sub-issues are the source of truth for task checklists, progress, and acceptance criteria. This document retains historical assessment and direction; the foundation cutover is implemented, with publication status tracked in #2.

## Historical baseline — before the foundation cutover

Assessment: 2026-10-08. Source inspection, dependency-free execution of the existing test, and desktop/mobile browser inspection.

| Area | Evidence | Consequence |
| --- | --- | --- |
| Dependencies | `package.json` uses Grunt 0.4-era tooling and Node `>=0.8.0`; `bower.json` declares jQuery and Modernizr but not Fabric, which `app/index.html` loads. No lockfile is present. | The documented setup is incomplete and not reproducible. |
| Clean source preview | Browser requests for the three Bower scripts return 404; `$` and `fabric` are undefined. | The checked-out page renders blank without additional dependencies. |
| Timeline | Every occupation array in `app/scripts/jobs.js` contains 11 values: 2006–2016. `variables.js` extends rendering to the wall-clock year. | Later years have no supplied data; the passage of time changes rendering and test behavior. |
| Data integrity | Executing `app/scripts/test/test.js` fails with `100 == 120`; the supplied 2015 allocations total 120%. | Decide what percentages mean before changing values or assertions. |
| Color mapping | `main.js` indexes an 11-color scale with `(percentage / 10) - 1`. Execution gives no color for 0%, white for 10%, and the penultimate shade for 100%. | The encoding does not faithfully represent the endpoints. |
| Layout | Recovered rendering has content bounds of roughly 1195 × 1115 pixels. A fresh 390 × 844 canvas clips columns and years; resizing does not resize the canvas. | Phone visitors cannot see the complete chart. |
| Content and access | Empty page title and description; canvas-only content, no readable body text, legend, introduction, or contact link. | Visitors and assistive technology get no context; sharing has no useful metadata. |
| Build and documentation | Grunt's build blocks omit jQuery, Fabric, and `js-gradient.js`; its copy task does not include those scripts. The README's remotely hosted screenshot could not be fetched because its host did not resolve. | Verify production assets during migration and stop relying on the external screenshot. |

The unmodified page was blank. Visual assessment used real jQuery 1.9.1 and Fabric 1.4.0 injected into the browser, then executed the existing source; no app files were changed. This recovered preview is not proof that the documented installation or Grunt production build works. Those commands were not run.

## Foundation implementation

Issue #2 replaces the legacy pipeline with Vite, vanilla TypeScript, npm, one application lockfile, and a semantic HTML/CSS matrix. Node 24.21.0 and npm 12.2.0 are pinned; README and AGENTS describe the actual commands and file map.

The owner confirmed **exclusive working-time shares**, not proficiency, and corrected 2015 architecture from 70% to 50% (20 percentage points), leaving other allocations intact. Explicit records retain 2006–2016 coverage. Complete years total 100%; incomplete years may contain nulls or partial totals at most 100%. Unknown is distinct from recorded zero, and missing covered years require explicit unknown records.

Local installation, type checking, the deterministic data regression, and production build passed. Real browser checks exercised desktop/390px phone layout, keyboard scrolling, resize, all recorded values and zero/full color endpoints, a future clock, unknown/partial data, and actual production assets at `/resume-visualized/`. Remote CI and deployment were not exercised. These results replace the foundation failures above; they do not complete the design, copy, or release phases.

## Recommended technical direction

- **Vite + vanilla TypeScript + native HTML/CSS.** Use ES modules and one npm dependency graph. [Vite supports this directly](https://vite.dev/guide/); no UI framework is needed for one matrix and a detail panel.
- **A semantic HTML table styled as the heatmap.** Rows are years, columns are disciplines, values remain readable to assistive technology. Start here rather than replacing Fabric with another scene graph. Use SVG only if a demonstrated visual/export requirement cannot be met with HTML/CSS.
- **One local, explicitly dated data file.** Keep content independent of rendering, with stable discipline IDs and explicit years. Use a small typed model and runtime checks; no CMS or backend.
- **Static hosting.** Build to `dist`, keep dependencies bundled locally, and deploy to one host. GitHub Pages is a reasonable default if this repository is hosted on GitHub; otherwise use an existing static host. Verify its base path rather than assuming deployment at `/`.
- **Small verification surface.** Type checking, dependency-free data assertions, production-preview browser smoke checks, and one CI workflow. Do not start with a large testing or configuration stack.

## Delivery phases

The full task lists, draft copy, sequencing, and exit checks have moved to GitHub. Update those issues rather than maintaining a second completion checklist here.

| Phase | Priority | Tracker |
| --- | --- | --- |
| 1. Trustworthy data and a reproducible foundation | P0 | [#2 — Modernize the stack and make career data trustworthy](https://github.com/brecke/resume-visualized/issues/2) |
| 2. Visual design and accessible interaction | P1 | [#3 — Redesign the matrix for responsive and accessible use](https://github.com/brecke/resume-visualized/issues/3) |
| 3. Copy and career narrative | P1 | [#4 — Refresh copy and the career narrative](https://github.com/brecke/resume-visualized/issues/4) |
| 4. Share-ready release | P1 | [#5 — Launch a share-ready visual résumé](https://github.com/brecke/resume-visualized/issues/5) |
| 5. Optional post-launch improvements | P2 | [#6 — Evaluate optional enhancements after launch](https://github.com/brecke/resume-visualized/issues/6) |

Phases 1–4 define the first release. Phase 5 is optional and does not block publication. Skip accounts, databases, a CMS, analytics, animation libraries, and a UI framework unless a concrete requirement justifies them.

## Owner input needed before publication

The metric and 2015 correction are resolved. Remaining publication decisions:

1. Should the public release retain the existing historical period, or include owner-verified data since 2016?
2. What current introduction, career highlights, contact destination, and résumé/profile link may be published?
3. What public URL/hosting account and reuse license should the project use?

## Next

Publish the verified foundation change through the owner-approved contribution path and track it in #2. Refine design (#3) and owner-reviewed copy (#4), then complete production sharing and hosting checks (#5). Keep the recognizable matrix; do not turn the remaining revamp into another framework migration.
