# Resume visualized

A visual résumé that maps years against work disciplines. Color intensity shows exclusive shares of working time—not proficiency—making changes in a career visible at a glance.

Created by Miguel Laginha, inspired by David McCandless's [The beauty of data visualization](https://informationisbeautiful.net/2010/the-beauty-of-data-visualization/).

## Development

The application is a static Vite + vanilla TypeScript site, with a semantic HTML/CSS matrix and no runtime dependencies or CDN scripts. Use **Node 24.21.0** and **npm 12.2.0**, pinned in `.nvmrc` and `package.json`.

With [nvm](https://github.com/nvm-sh/nvm) installed, run from the repository root:

```sh
nvm install
nvm use
npm install --global npm@12.2.0
npm ci
npm run dev
```

Open the local URL printed by Vite. The npm version must be selected separately from Node's bundled npm. With another version manager, select the same Node version; `npm exec --yes --package npm@12.2.0 -- npm ci` also runs the pinned npm without changing the global installation.

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

`build` writes `dist/`; `preview` serves that production output. Relative asset URLs support hosting under a project subpath such as `/resume-visualized/`. Do not publish the source directory or commit generated output. `.github/workflows/ci.yml` installs the pinned runtime/npm and runs installation, type checking, the data regression, and the production build.

## Career data

Edit **`app/career.json`**, the single source of career facts:

- `coverage` declares inclusive `startYear` and `endYear`; the supplied history is **2006–2016**. The current date never extends it.
- `disciplines` declares stable IDs, display names, and six-digit hex base colors in column order.
- `years` contains explicitly dated records with a `complete` flag and one allocation per discipline ID.
- Numeric values are finite percentages in **0–100**. A recorded `0` means no time allocated; `null` means unknown, not zero.
- Complete years have no unknown values and total **100%**. Incomplete years may contain unknown values or partial totals, but their known shares cannot exceed 100%. Validation allows a small floating-point tolerance when comparing totals.
- Every year in declared coverage needs a record. Represent a wholly unknown year explicitly as incomplete with null allocations; do not silently skip gaps or invent zeros.

The owner confirmed exclusive working-time shares and corrected **2015 Software architect from 70% to 50%** (20 percentage points), retaining the other allocations. Its total is now 100%. No other career values were changed.

`app/scripts/data.ts` validates imported data before rendering. `app/scripts/test/data.test.ts` uses Node's built-in test runner to cover totals, coverage, missing data, malformed records, and percentage boundaries. Update facts only from owner-supplied information, then run the checks above.

The renderer in `app/scripts/main.ts` provides a caption, linked row/column headers, and exact values as text. Native CSS maps 0% to white and 100% to the discipline's base color. Unknown cells are labelled and hatched; incomplete years are marked partial. On narrow screens, focus or touch the horizontally scrollable matrix to reach every discipline.

## Revamp tracking

- [GitHub epic #1](https://github.com/brecke/resume-visualized/issues/1): canonical task tracking and release criteria.
- [Foundation #2](https://github.com/brecke/resume-visualized/issues/2): the implemented data/tooling/renderer cutover; publication status remains in the issue.
- [ROADMAP.md](ROADMAP.md): historical assessment, direction, and links to design, copy, and release work.
- [AGENTS.md](AGENTS.md): repository map and AI-assisted contribution rules.

The broader visual redesign, current career narrative, sharing assets, and deployment are separate phases—not part of the foundation cutover.

## Verification and attribution

Local verification passed installation, type checking, the deterministic data regression, and the production build on the pinned Node/npm versions. Production browser checks exercised desktop and 390px phone views, keyboard scrolling, resize, all 66 recorded values, all 41 zero/full-color endpoints, a simulated 2040 clock, and actual assets served beneath `/resume-visualized/`. A temporary alternative data build verified unknown/partial rendering without changing career facts; it was removed afterward. No CDN dependencies or application runtime errors were observed. The static smoke server received a browser-initiated favicon 404; sharing assets remain release work. Remote CI and deployment have not been exercised.

The original MIT author notice is retained in `app/scripts/main.ts`; there is still no root license file. Confirm reuse licensing with the owner before promoting a template. Palette attribution remains in `data.ts` ([Flat UI Colors](http://flatuicolors.com/)). The removed gradient helper originated from [JS Color Gradients](http://aurer.co.uk/project/js-color-gradients/); native CSS now handles the shading. Add a repository-owned screenshot when the revamped design is ready rather than restoring the unavailable remote image.
