# Sandeep Modugu - portfolio strategy and evidence

Research date: 25 October 2026.

## Positioning

**Hardware-near engineering. Real-world impact.**

Sandeep combines electrical engineering foundations, embedded C implementation,
motor-control/DSP optimization, and repeatable verification. His most distinctive
evidence is not a large technology list: it is a measured improvement on real
hardware and the ability to improve the engineering workflow around it.

The ten-second story:

1. Embedded software engineer based in Germany.
2. Firmware for systems that move, sense and connect.
3. 2x filtering performance, 80% fewer MISRA C violations, 30% faster builds.
4. Experience at Hilti, Honeywell, seleon and Software Engineering Weber.
5. Clear routes to inspect real work and start a conversation.

## Source analysis

| Source | What it supports | Limitations / decisions |
| --- | --- | --- |
| Supplied CV, `SandeepReddyModugu_CV.pdf` | Career, degrees, metrics, skills, languages, work authorization | Primary career source; street address and phone not republished. Original CV is not placed in the public bundle. |
| [LinkedIn](https://www.linkedin.com/in/sandeep-reddy-modugu-5278a3163/) | Verified user-supplied social destination | HTTP 999 blocks automated access. No content, recommendations or credentials inferred from it. |
| [GitHub profile](https://github.com/7997275647) and REST API | Public repository metadata, profile README, public activity | Snapshot at build time; forks distinguished; event feed is not a total contribution count. |
| [Existing portfolio](https://7997275647.github.io/Personal-Portfolio/) and original local HTML | Existing narrative, contact, imagery, project selection | Superseded by CV where dates or claims conflict. |
| [Qt dashboard README](https://github.com/7997275647/CrossPlatform_IoT_Dashboard) | 1,024-sample buffers, payload formats, charts, CSV export, simulator | Personal project; no customer or deployment metrics. |
| [Bootloader README](https://github.com/7997275647/SecureBoot-STM32) | CRC32 check before CMD_GO, UART, checksum script | README overstates malicious-tampering protection. Portfolio explicitly describes integrity detection, not authentication. |
| [C++ patterns README](https://github.com/7997275647/Cpp_DesignPatterns_and_Basics) | Five patterns, CMake, Doxygen/Sphinx | CI tools also supported by CV; no claim of commercial C++ framework ownership. |
| [Gateway README](https://github.com/7997275647/Industrial-IoT-Gateway) | Board bring-up and working Qt MQTT subscriber | MCU networking, publishing, sensor acquisition, TLS and watchdog recovery are roadmap items. |

### Reconciled career timeline

- Jun 2026-present: Technology & Strategy GmbH, Embedded Software Consultant;
  client Hilti, Munich. Motor-control modernization, safety checks, MISRA C and
  stakeholder coordination.
- Feb-Mar 2026: Software Engineering Weber, working student, Kempten. STM32H7
  industrial control, middleware, GUI and FreeRTOS task coordination.
- Jul 2025-Jan 2026: Hilti master's thesis, Kaufering. CMSIS-DSP/SIMD, hardware
  acceleration and reproducible HiL comparisons; 2x filtering improvement.
- Jan-Jul 2025: Hilti internship. 80% reduction in MISRA C violations; 30% shorter
  builds; KiCad infrastructure and Python/documentation automation.
- May-Nov 2024: seleon, working student, Leipzig. Qt/QML deployment tooling and
  Docker development environments. CV's November end date overrides October on
  the old portfolio.
- Oct 2023-Apr 2024: Honeywell Elster internship, Lotte. NB-IoT connection state
  machines and MATLAB verification.
- Oct 2021-Apr 2026: M.Sc. Embedded Systems, TU Chemnitz, grade 2.1 (good).
  CV's April end date overrides May on the old portfolio.
- Jun 2015-Mar 2019: B.Tech. Electrical and Electronics Engineering, JBIET.

### Skills and truthful scope

- Professional core: C, STM32/ARM Cortex-M, HAL, FreeRTOS, motor control, GPIO,
  SPI, UART, hardware integration, MISRA C, HiL, IEC 60730 Annex H, IEC 62841.
- Engineering tools: Python, Git, GitLab CI/CD, Jenkins, Axivion, KiCad, MATLAB,
  Simulink, UML, Sphinx, logic analyzers and multimeters.
- Mixed work/project experience: Qt/QML, Docker, C++.
- Personal/learning projects: C++17, MQTT, CMake, GitHub Actions, cppcheck,
  CodeQL, bootloaders, Linux modules and Yocto.
- Languages: English C1; German A2, actively working toward B1.
- EU Blue Card (Germany) is documented but not treated as a promise of
  unrestricted authorization in every EU country.

### Achievements, leadership, publications and certifications

The three quantified achievements above are CV-reported outcomes, not
independently benchmarked here. Their original scopes remain attached.
Technical priority coordination, team tooling, reproducible tests and guidelines
demonstrate ownership and leadership potential; no people-management role is
claimed. No awards, certifications or published papers were evidenced. A
master's thesis is not presented as a peer-reviewed publication. No unverified
upstream open-source contributions, streaks or contribution totals are invented.

### Branding and writing

The existing voice is hands-on, hardware-minded and curious. Preserve first-person
clarity and technical specificity. Replace sweeping phrases such as
"production-grade", "full-stack embedded expert" and "secure chain of trust"
with evidence, precise boundaries and useful outcomes. The site should feel
confident, not inflated.

## Audience and content strategy

Primary audiences: embedded hiring managers, technical recruiters, industrial
product teams and founders building hardware-enabled products.

Strongest industry fit: power tools, industrial automation, connected instruments,
sensor systems, engineering tooling and safety-conscious product development.
Medical-device tooling experience is relevant but does not establish medical
regulatory expertise. Automotive, robotics and edge-device teams are adjacent
targets, not implied prior domain experience.

Search terms: Embedded Software Engineer, Embedded C, STM32, ARM Cortex-M,
FreeRTOS, motor control, CMSIS-DSP, DSP optimization, MISRA C, Hardware-in-the-Loop,
IEC 60730, IEC 62841, firmware verification, Qt/QML, Germany.

Prioritize a role's real relevance over brand-name keyword stuffing.

## Information architecture and wireframe

1. **Navigation:** personal monogram, four anchor links, contact CTA; accessible
   modal menu on mobile.
2. **Hero:** role/location, large three-line value statement, one-sentence
   specialty, work/contact CTAs, original circuit-board illustration. Portrait
   appears as a small personal signature, not as a full-screen stock backdrop.
3. **Proof:** quiet company wordmarks with relationship labels.
4. **About:** first-person narrative paired with an oscilloscope-style
   visualization. Explicitly illustrative, not a real benchmark.
5. **Selected impact:** three measurable outcomes and their original contexts.
6. **Experience:** chronological accordion; dates, role and summary always
   visible, technical details expandable. Current consulting relationship explicit.
7. **Projects:** filtered two-column case-study cards with original technical
   illustrations; accessible dialogs contain challenge, approach, outcome,
   limitations, tags and direct source links. A native expandable explorer
   automatically lists the other non-fork GitHub repositories.
8. **Expertise:** four selectable areas, evidence-backed skill clusters. No
   arbitrary percentage proficiency bars.
9. **Foundations:** two degrees and language levels; no fabricated credential
   section to fill space.
10. **GitHub:** API-generated repository statistics, real public event history,
    language mix and repository links. Timestamp and scope visible.
11. **Contact/footer:** direct email, copy with explicit success/error feedback,
    GitHub and LinkedIn. No nonfunctional contact form.

Mobile stacks panels in reading order; navigation and controls have comfortable
44px targets. Project information never depends on hover.

## Design system

Concept: **The engineering field journal**. Editorial scale meets instrument-panel
precision. The signature is the original isometric microcontroller and animated
signal paths, rather than generic gradients, stock 3D blobs or skill-logo clouds.

| Token | Value | Use |
| --- | --- | --- |
| Canvas | `#101210` | Main dark background |
| Surface | `#171b16` | Cards, glass-panel fallback |
| Elevated | `#20261e` | Controls, dialog surfaces |
| Ink | `#f1f3eb` | Primary text |
| Muted | `#a5aea0` | Supporting text |
| Signal | `#c3f58a` | Primary CTA, signal traces, focus |
| Signal dim | `#769953` | Decorative illustration only |
| Border | `#343c30` | Panel dividers |
| Cool signal | `#98c7ce` | Secondary data series |

Typography: self-hosted Manrope variable for interface and headings, Instrument
Serif italic for selective editorial emphasis, DM Mono for dates and instrument
labels. Fonts are bundled locally, not fetched from Google at runtime.

Layout: approximately 1,200px content width; fluid 24-64px horizontal gutters;
8px spacing rhythm; 96-128px section rhythm; 16-24px card corners; fine borders.
Avoid overuse of glass: sticky navigation and small instrument overlays only.

Motion: 160-240ms control feedback, restrained one-time entrance/scroll accents,
short SVG signal traces, and a user-pausable illustrative signal. Honor
`prefers-reduced-motion`; no parallax or scroll hijacking. Content remains visible
without animation and main reading content is server-rendered.

## SEO and performance principles

- Static Next.js output and server-rendered primary copy.
- Unique title/description, canonical, Open Graph image, Twitter metadata,
  Person JSON-LD, sitemap, robots and semantic heading structure.
- Separate small client islands for interactions; no WebGL or canvas render loop.
- Locally optimized portrait, explicit image dimensions, local subset fonts.
- GitHub API used at build time, never with a browser-exposed token.
- Display snapshot time. Fail refresh explicitly; allow deliberate offline builds.
- Daily deployment workflow refreshes public data without requiring live APIs
  during a visitor's session.
- Validate responsive behavior, keyboard/focus handling, reduced motion, absence
  of horizontal overflow, automatic accessibility checks and production output.
  Automated accessibility tests do not constitute a full WCAG certification.
