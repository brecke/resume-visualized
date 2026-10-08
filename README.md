# Resume visualized

A visual résumé that maps years against work disciplines. Color intensity shows exclusive shares of working time—not proficiency—making changes in a career visible at a glance.

Created by Miguel Laginha, inspired by David McCandless's [The beauty of data visualization](https://informationisbeautiful.net/2010/the-beauty-of-data-visualization/).

![Editorial résumé matrix with all eleven recorded years and six disciplines](images/desktop.webp)

[Phone and selected-year detail reference](images/mobile.webp).

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

The renderer in `app/scripts/main.ts` provides a caption, linked row/column headers, and exact values as text. Native CSS maps 0% to white and 100% to the discipline's base color. Unknown cells are labelled and hatched; incomplete years are marked partial. The editorial layout uses one quiet theme, system serif/sans typography, and small CSS tokens; the original matrix and palette remain the centerpiece.

On narrow screens, focus the signposted matrix region and use arrow keys to reach every year and discipline, or scroll by touch. Year labels and column headers remain sticky inside the region; native scroll padding keeps backward keyboard focus clear of the headers. Desktop uses the matrix's full content height rather than a nested vertical scroll cap.

Tab to a year and press Enter/Space, or tap it, to open its exact six values and recorded completeness/coverage context. Activation focuses the native detail summary; Enter/Space on that summary closes it. Fine-pointer hover shows the same information without stealing focus. Only years are buttons—not every cell—and the table remains readable without opening details. Introductory text, metric explanation, and the real GitHub contact remain readable with JavaScript disabled; the matrix itself needs JavaScript. No animation is introduced.

## Revamp tracking

- [GitHub epic #1](https://github.com/brecke/resume-visualized/issues/1): canonical task tracking and release criteria.
- [Foundation #2](https://github.com/brecke/resume-visualized/issues/2): the implemented data/tooling/renderer cutover; publication status remains in the issue.
- [Design #3](https://github.com/brecke/resume-visualized/issues/3): editorial layout, accessible responsive matrix, native year details, and reference screenshots.
- [ROADMAP.md](ROADMAP.md): historical assessment, direction, and links to design, copy, and release work.
- [AGENTS.md](AGENTS.md): repository map and AI-assisted contribution rules.

The foundation and responsive design are implemented locally. Owner-reviewed current career narrative, sharing assets, and deployment remain separate phases; publication status belongs in the linked issues.

## Verification and attribution

The foundation passed clean-checkout installation, type checking, the deterministic regression, and production build on the pinned runtime, including its simulated 2040 clock check. The design change passed the same typecheck/regression/build gate and real production browser smoke at **390 × 844**, **1366 × 900**, and **1920 × 1080**. All 66 recorded values and 41 zero/full-color endpoints were preserved. Native touchscreen input, forward/backward Tab navigation, arrow-key scrolling, hover, disclosure, state-preserving resize, script-disabled contact, and temporary unknown/partial data were exercised. A backward-focus occlusion was reproduced and fixed with native scroll padding.

Computed text contrast was at least **7.32:1** across 107 inspected text elements; an achromatopsia simulation retained readable labels and exact values. The actual Chromium accessibility tree exposed the headings, captioned table, seven column headers, eleven row headers, 66 cells, and eleven year buttons. This checks semantic reading order, not an auditory VoiceOver/NVDA session or a WCAG certification. **200% layout zoom was emulated** using half the laptop's CSS viewport and double device scale, with scrolling and year details still usable.

Final production HTML/CSS/JS loaded at `/resume-visualized/` without CDN requests or observed application runtime errors. A browser-initiated undeclared favicon 404 remains release work. Headed-browser touch automation timed out; trusted touch input succeeded in isolated headless Chromium. Temporary smoke builds, browser profiles, and services were removed. Remote CI and deployment have not been exercised.

The original MIT author notice is retained in `app/scripts/main.ts`; there is still no root license file. Confirm reuse licensing with the owner before promoting a template. Palette attribution remains in `data.ts` ([Flat UI Colors](http://flatuicolors.com/)). The removed gradient helper originated from [JS Color Gradients](http://aurer.co.uk/project/js-color-gradients/); native CSS now handles the shading. Reference screenshots are repository-owned rather than dependent on the unavailable original remote host.
