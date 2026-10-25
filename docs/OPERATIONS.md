# Performance, accessibility and launch guidance

## Validation performed - 25 October 2026

- Production Next.js static export built successfully using the real
  `/sandeep-reddy.github.io` GitHub Pages base path.
- Strict TypeScript, ESLint and `git diff --check` passed.
- 23 unit tests passed.
- 20 desktop/mobile Chromium tests passed on the development application.
- The same 20 tests passed against the actual static production output mounted
  at `/sandeep-reddy.github.io/`, not a development-server approximation.
- Automated axe checks found no violations for the tested WCAG A/AA rules on
  the page and project dialogs; the mobile menu was also checked.
- Tests covered project filtering, truthful case-study content, accordion
  behavior, skill selection, email-copy success/denial, live reduced-motion
  changes, keyboard navigation, repository expansion and JavaScript-disabled
  core content.
- No horizontal document overflow at widths of 320, 390, 768, 1024 or 1440px.
- All 15 unique root-relative assets referenced by the exported HTML had the
  correct base-path prefix and existed in the output. Canonical, OG image and
  sitemap URLs matched the intended public URL.
- No failed asset requests or page errors in a local production browser load.
- `npm audit` reported zero known vulnerabilities at validation time.
- Desktop (1440px) and mobile (390px) production screenshots were visually
  inspected, including the real portrait and original technical illustrations.

Local, unthrottled Chromium observation (not a field or Lighthouse result):
LCP approximately 324ms and CLS approximately 0.0013. Exported HTML was about
33.1 KiB gzipped; initially referenced JavaScript totaled about 297.6 KiB when
gzipped individually. These measurements are environment-specific and do not
establish mobile network performance or Core Web Vitals at p75.

Not performed: public deployment, physical Safari/Android device testing,
screen-reader certification, or field-traffic performance measurement.

## Implemented performance decisions

- Static Next.js export: application copy is prerendered and CDN-cacheable.
- Build-time GitHub synchronization: no user-facing API latency, secrets or rate
  limit failures.
- CSS/SVG artwork instead of a WebGL engine, video background or remote images.
- Framer Motion's `LazyMotion` / `domAnimation` bundle; interactive sections are
  client islands, not a client-rendered whole page.
- Local Manrope variable, DM Mono and Instrument Serif font assets with swap
  behavior; browsers select the needed Latin subsets.
- Pre-generated WebP portrait with fixed layout dimensions and PNG social card.
- Only the opt-in signal visualization loops continuously. Circuit traces finish
  within five seconds. The visible pause control stops the signal; reduced
  motion also suppresses animation.

## Production measurement

Measure the **deployed production URL**, not the development server:

1. Use Lighthouse in Chrome DevTools on mobile and desktop.
2. Test a cold-cache load with mobile CPU/network throttling.
3. Inspect layout shifts, font swaps and largest-contentful-paint attribution.
4. Check the Network panel: no Google font requests, GitHub visitor-time fetches,
   missing base-path assets, or original unoptimized image directory.
5. Keep the hero mostly text/SVG; do not add autoplay video or tracking scripts
   without reassessing the budget.

Suggested release targets (budgets, not claimed measurements):

| Measure | Target |
| --- | --- |
| LCP | <= 2.5s at p75 |
| INP | <= 200ms at p75 |
| CLS | <= 0.1 at p75 |
| Lighthouse accessibility | 100 automated score, plus manual review |
| First-party requests | No failed requests |
| Layout | No horizontal document overflow at 320px+ |

Field Core Web Vitals require real traffic; local lab results cannot establish
p75 field performance.

## Hosting

- Serve Brotli/gzip for HTML, CSS, JavaScript and SVG.
- Cache hashed `/_next/static/` assets with
  `Cache-Control: public, max-age=31536000, immutable` where the host allows it.
- Revalidate HTML so daily GitHub snapshot deployments become visible.
- Set HSTS, `X-Content-Type-Options: nosniff` and an appropriate referrer policy
  at the host/CDN. GitHub Pages provides limited custom-header control.
- If adding CSP, validate it against Next.js's generated inline hydration scripts;
  do not copy a policy that silently breaks client-side interactions.
- No service worker is installed, avoiding stale deployments.

## Privacy and content maintenance

The public contact surface is email, GitHub, LinkedIn and city/country.
No home address, phone, private repository information, original resume PDF,
analytics or form-submission service is bundled.

When updating a role or accomplishment, update its original context along with
the claim. The CV supports the 2x / 80% / 30% outcomes; it does not establish
people-management experience, professional embedded Linux expertise, awarded
certifications, independent publications or cryptographic boot authentication.

The source-of-truth content file is intentionally separate from GitHub metadata.
Never turn an arbitrary README's claims into unreviewed career/business outcomes.
The automatic repository explorer quotes public metadata but identifies the
collection as a mix of experiments, learning and completed projects.

## Manual accessibility checklist

- Navigate all controls with Tab, Shift+Tab, Enter and Space.
- Confirm focus remains in open dialogs and returns to the trigger on close.
- Read hero, timeline, filters, skill evidence, GitHub scope note and contact
  status using NVDA or VoiceOver.
- Verify 200% zoom and 400% reflow.
- Test high-contrast / forced-colors mode.
- Change OS reduced-motion while the page is open; the signal pauses and its
  control becomes disabled with an explanatory title.
- Test clipboard success and denial; email remains usable either way.
- Check iOS Safari and Android Chrome on physical devices. Automated browser
  tests use desktop Chromium and mobile-emulated Chromium, not physical devices.
- Confirm the portfolio remains understandable with JavaScript disabled.

## Launch checklist

- [ ] Verify career and contact copy with the owner.
- [ ] Add newly provided certifications or awards only after verification.
- [ ] Confirm the correct public origin and base path.
- [ ] Enable GitHub Actions as the Pages publishing source.
- [ ] Confirm the deployed sitemap, social preview and favicon.
- [ ] Run the manual accessibility checks above.
- [ ] Record production Lighthouse results and monitor field Web Vitals.
- [ ] Recheck project statuses when firmware integrations move beyond prototypes.

No deployment or commit is automatically performed by local source generation.
