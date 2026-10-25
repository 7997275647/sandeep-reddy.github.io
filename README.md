# Sandeep Modugu - Engineering Portfolio

**Software that moves the real world.**

A custom, evidence-led portfolio for Sandeep Reddy Modugu, Embedded Software
Engineer. Built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer
Motion, shadcn/ui (Radix), and Lucide. The production site is a static export:
no server, database, API token in the browser, or third-party tracking required.

## Design and content

Read the [complete research, brand positioning, UI/UX strategy, design system,
palette, typography, information architecture and wireframes](docs/STRATEGY.md).

The visual direction pairs an original isometric circuit-board illustration,
signal-green accents, editorial typography and instrument-panel details.
Content emphasizes measured engineering outcomes rather than inflated titles:

- 2x motor-control filtering performance, Hilti master's thesis.
- 80% fewer MISRA C static-analysis violations, Hilti internship.
- 30% shorter builds, Jenkins-to-GitLab CI/CD migration at Hilti.

These are CV-reported outcomes, not benchmarks independently reproduced by this
website. No invented awards, certifications, client endorsements or contribution
counts. LinkedIn blocked automated research; CV dates take precedence over
conflicting dates in the previous portfolio.

## Local development

Prerequisite: Node.js 22+ (Node 24 used for validation and CI).

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000`. The checked-in GitHub snapshot and optimized assets
make development independent of external APIs.

Do not copy `.env.example` for normal root-path development; it demonstrates
the **GitHub Pages production** configuration. Next.js automatically loads
`.env.local` if you choose to create one.

### Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Next.js development server |
| `npm run github:sync` | Fetch and validate public GitHub profile, repositories and events |
| `npm run assets:prepare` | Rebuild optimized portrait and original social-sharing image |
| `npm run build` | Refresh GitHub data, then build a static site into `out/` |
| `npm run build:offline` | Build using the dated, committed GitHub snapshot |
| `npm run lint` | ESLint / Next.js best-practice rules |
| `npm run typecheck` | Strict TypeScript checks |
| `npm test` | Content/data and deployment unit tests |
| `npm run test:e2e` | Desktop/mobile Chromium, interactions and axe accessibility checks |

For browser tests, install the browser once:

```powershell
npx playwright install chromium
npm run test:e2e
```

Tests start their own development server on port 3100 (or reuse one already
running there). They force a root-path configuration. `next build` also performs
TypeScript validation and generates the route types used by `typecheck`.

To run the same browser suite against an already-served **production export**,
set `PLAYWRIGHT_BASE_URL` to its full URL including any base path and trailing
slash. The test runner then skips starting a development server:

```powershell
$env:PLAYWRIGHT_BASE_URL = "http://127.0.0.1:3101/Personal-Portfolio/"
npm run test:e2e
```

## Architecture

```text
src/
  app/                  Server-rendered page, layout, metadata, sitemap and robots
  components/           Focused section components and interactive client islands
    ui/                 Official shadcn-generated primitives
  data/
    portfolio.ts        Verified career content and curated project case studies
    github.json         Validated, timestamped public GitHub snapshot
  hooks/                Live reduced-motion preference
  lib/                  Typed GitHub transforms, deployment URLs and utilities
scripts/                GitHub synchronization and asset generation
tests/
  unit/                 Content integrity, API data transforms and URL contracts
  e2e/                  Responsive behavior, accessibility and interaction tests
public/                 Optimized portrait, OG image and .nojekyll
docs/                   Design, research and operational documentation
```

The original `Images/` directory is preserved as source material, but is not
copied into the deployed bundle. Only optimized, deliberately selected assets
are public. The original CV (which contains a street address and phone number)
is not included.

### Content updates

- Edit [portfolio.ts](src/data/portfolio.ts) for roles, contact details, education-
  related narrative, skills and case studies. Degree cards and impact figures
  are in [page.tsx](src/app/page.tsx); keep CV-derived values consistent.
- Four curated case studies are resolved against actual GitHub repositories.
  Missing curated repositories fail the synchronization/build explicitly.
- The expandable repository explorer automatically lists other owned, non-fork
  repositories; new repositories do not require new components.
- Project descriptions separate implemented behavior from roadmap items.
  CRC32 is **not** represented as cryptographic secure boot.
- The GitHub event chart visualizes the REST API's available feed, up to 300
  events, in a 12-week window. It is **not** a GitHub contribution graph and must
  not be described as a complete contribution history. Empty cells are not proof
  of inactivity.
- The language chart counts each non-fork repository's primary language. It does
  not measure lines of code, language proficiency or experience.

### GitHub refresh and failure behavior

`github:sync` paginates public repositories, validates API responses with Zod,
deduplicates public events, validates curation and atomically replaces the
snapshot only after success. A rate-limit, missing repository or network/schema
error fails visibly without replacing the snapshot.

`GITHUB_TOKEN` is an optional **server/build-only** environment variable. Never
prefix it with `NEXT_PUBLIC_`, put it in client code or commit it.

Use `build:offline` deliberately if the API is unavailable. The UI continues
to show the actual snapshot date; it never claims the old data is live.
The Pages workflow refreshes data daily and on production deployments.

## Deployment

### Existing GitHub Pages URL

Target: <https://7997275647.github.io/Personal-Portfolio/>

1. Commit and push the application to `main`, or merge the working branch into
   `main` after review.
2. In the repository, open **Settings > Pages > Build and deployment** and
   choose **GitHub Actions** as the source.
3. Allow the [deployment workflow](.github/workflows/deploy.yml) to run. It
   validates the app, builds `out/`, tests interactions and deploys the artifact.
4. Approve the `github-pages` environment if repository protection requires it.

The workflow sets both the origin and repository base path; JavaScript, CSS,
images, canonical URLs and sitemap URLs retain `/Personal-Portfolio`. Do not
deploy the source directory or the removed legacy HTML file. Deploy `out/`.

To reproduce that build locally:

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://7997275647.github.io"
$env:NEXT_PUBLIC_BASE_PATH = "/Personal-Portfolio"
npm run build
```

A generic static file server must mount that output at `/Personal-Portfolio/`,
not at `/`. Remove those environment variables (or open a fresh terminal) before
returning to normal root-path development.

Scheduled GitHub Actions run only from the default branch. GitHub may disable
schedules in inactive public repositories; a manual workflow run or new push
can refresh the data again.

### Vercel or a custom domain

1. Import the repository into Vercel (Next.js framework).
2. Set `NEXT_PUBLIC_SITE_URL` to the real origin, such as your configured custom
   domain, **without a path or trailing query**.
3. Leave `NEXT_PUBLIC_BASE_PATH` empty for a root deployment.
4. Use `npm run build` as the build command and the static `out` output.
5. Optionally provide `GITHUB_TOKEN` for build-time API rate limits.
6. To refresh data daily on Vercel, configure a deployment hook and schedule it;
   the included daily workflow deploys GitHub Pages, not Vercel.

For any other static host, upload `out/` with the matching origin/base-path
environment set at build time. Do not run `next start`; this project uses
`output: "export"`.

## SEO

[layout.tsx](src/app/layout.tsx) defines the title, description, canonical,
Open Graph image, Twitter card, author and relevant recruiter search terms.
The home page includes Person JSON-LD with degrees, technical specialties and
verified social URLs. Sitemap, robots, favicon and a branded 404 page are
generated statically.

`NEXT_PUBLIC_SITE_URL` must be an HTTP(S) origin; `NEXT_PUBLIC_BASE_PATH` is a
separate path. Invalid configurations throw rather than generate misleading
URLs. Set these values for the actual public host before deployment.

On GitHub project Pages, `robots.txt` is exported under the repository path;
search engines normally request robots at the **origin root**. Submit the
repository sitemap directly in Search Console or configure origin-level
robots through the account's root Pages site if needed.

## Accessibility and performance

- Semantic landmarks, skip link, visible focus, descriptive external links.
- Radix-powered dialogs with focus trapping/Escape dismissal and an accessible
  accordion. Native, keyboard-operable repository expansion.
- Responsive layouts from 320px through desktop, no hover-only project actions.
- User-pausable signal animation; OS reduced-motion changes take effect while
  the page is open. No scroll hijacking or WebGL.
- Primary narrative, project summaries and source links remain readable without
  JavaScript.
- Server-rendered static content, local fonts, optimized WebP portrait and
  explicit image dimensions. Original SVG project artwork adds no image fetches.
- No runtime GitHub requests, analytics, remote font service or contact backend.

See [performance and launch guidance](docs/OPERATIONS.md). Automated axe checks
are useful regression tests, not a claim of complete WCAG certification.
Screen-reader review and field performance should be checked on the deployed
domain before a public launch.
