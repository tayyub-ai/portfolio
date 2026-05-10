# Portfolio Astro Rebuild + Knowledge Graph Foundation

**Date:** 2026-05-10
**Owner:** Tayyub Yaqoob
**Status:** Approved (design phase)

## Goal

Rebuild the portfolio as a multi-page Astro site that:

1. Positions Tayyub for the UK Global Talent Visa (Exceptional Talent — proven leader route) using leadership-grade copy anchored only in verifiable claims.
2. Establishes a structured Knowledge Graph entity foundation so Google can confidently parse a Person entity, with the goal of (eventually) producing a visible Knowledge Panel as external signals accumulate.

## Context

Current state: Vite + React SPA at `/Users/tayyub/Downloads/portfolio` with three template variants (`src/`, `src2/`, `src3/`) and a `TemplateSwitcher`. Active template is `src/` (default `TEMPLATE_NUMBER=0`). Content driven from `public/data/portfolio.json`. Single-page layout, no per-route URLs, no JSON-LD, meta tags use unfilled `%VITE_*%` placeholders.

## Honest constraint (read first)

The user selected the "proven leader" route, but lacks the recognition signals that route conventionally requires (talks, awards, judging, open-source community leadership, standards work). This spec does **not** invent signals. It uses leader-grade verbs on real, verifiable claims, and lists action items the user must complete externally (Wikidata submission, conference talks, awards, sourcing actual byline URLs) to fully qualify.

## Scope

### In scope
- Full migration to Astro 5 + TypeScript + Tailwind
- Seven routes (`/`, `/about`, `/work`, `/publications`, `/projects`, `/projects/[slug]`, `/contact`)
- Per-route JSON-LD (Person, Organization, ProfilePage, CollectionPage, Article, CreativeWork, ContactPage, BreadcrumbList)
- Content rewrite of all portfolio data with leadership framing on real claims
- Two new content arrays: `publications[]`, `notableClients[]`
- `sameAs` array including LinkedIn, GitHub, X (`https://x.com/TayyabY`), Cointelegraph TODO, AlphaWire TODO
- Real `<title>`, canonical, OG, Twitter card per route
- Auto-generated `sitemap.xml`, updated `robots.txt`, `humans.txt`, `llms.txt`
- Preserve GTM container `GTM-MH7NJ4VX`
- Preserve dark theme + visual style direction
- Vercel deploy via Astro static adapter

### Out of scope
- Migrating `src/pages/Dashboard.tsx` (server-backed admin view — separate concern)
- Migrating the Express server in `server/`
- Resume PDF rewrite
- Wikidata submission (user must do — template provided in this doc)
- Sourcing real Cointelegraph/AlphaWire author URLs (user must do — TODOs scaffolded)
- Visa application paperwork or reference letter prep
- `src2/` and `src3/` template variants (deleted)
- `TemplateSwitcher` component (deleted)
- Phase 2 visual polish + per-route OG image generation
- Phase 3 optional `/writing/` blog

## Architecture

### Stack
- **Astro 5** with TypeScript
- **Tailwind CSS** (preserve existing theme tokens from `tailwind.config.ts`)
- **React islands** for the contact form, particle background (if kept), and any animation-heavy components
- **Framer Motion** retained for hero motion
- **`@astrojs/sitemap`** integration
- **`@astrojs/react`** integration for islands
- **`astro-icon`** or inline SVG (no separate icon library required)

### Routes

| Path | Astro file | Purpose | Primary schema |
|---|---|---|---|
| `/` | `src/pages/index.astro` | Leadership statement, key impact metrics, top 3 featured projects, recognition strip, CTA | `WebSite` + `Person` (mainEntity) |
| `/about` | `src/pages/about.astro` | Full leader-framed bio, expertise, education, languages | `ProfilePage` + `Person` |
| `/work` | `src/pages/work.astro` | Experience timeline + Notable Clients grid | `Person` with `worksFor`/`alumniOf`/`hasOccupation` |
| `/publications` | `src/pages/publications.astro` | Cointelegraph + AlphaWire bylines (key visa + KG signal) | `CollectionPage` + `Article[]` |
| `/projects` | `src/pages/projects/index.astro` | Filterable index of all projects | `CollectionPage` + `CreativeWork[]` |
| `/projects/[slug]` | `src/pages/projects/[slug].astro` | Per-project detail | `CreativeWork` or `SoftwareApplication` |
| `/contact` | `src/pages/contact.astro` | Contact form, email, social | `ContactPage` |

### Layout system
- `src/layouts/BaseLayout.astro` — html/head, common meta, GTM, sitewide JSON-LD (Organization + Person + BreadcrumbList), Header, Footer slot
- `src/layouts/PageLayout.astro` — wraps BaseLayout with hero band, content slot

### Content store
- `src/content/portfolio.json` — single source of truth (replaces `public/data/portfolio.json`)
- Loaded via Astro content collections OR direct import (decision deferred to plan; both viable)
- Fields:
  - `personalInfo` (existing, with rewritten `summary`)
  - `experience[]` (existing, with rewritten `achievements`)
  - `education[]` (existing)
  - `projects[]` (existing, with added `slug` per project)
  - `techStack[]` (existing)
  - `socialLinks` (existing, with `twitter` populated)
  - `insights` (existing)
  - `githubStats` (existing)
  - **NEW** `publications[]` — `{ title, publisher, role, dates, audienceReach, url, urlTodo }`
  - **NEW** `notableClients[]` — `{ name, sector, engagement, dates }`
  - **NEW** `recognitionTodos[]` — user's action plan for actual visa qualification

### Schema entities

**Sitewide (`BaseLayout.astro`):**
- `Organization` — `@id: https://www.tayyubyaqoob.com/#organization`, name, url, logo
- `Person` — `@id: https://www.tayyubyaqoob.com/#person`, name, alternateName, jobTitle, description, image, url, sameAs, worksFor (ref to `#organization`), alumniOf, knowsAbout, knowsLanguage, nationality, address, hasOccupation
- `BreadcrumbList`

**Per-route additions:**
- `/`: `WebSite` (`@id: https://www.tayyubyaqoob.com/#website`, mainEntity references `#person`)
- `/about`: `ProfilePage` with `mainEntity` referencing `#person`
- `/publications`: `CollectionPage` with `hasPart` array of `Article` items (each with `author` referencing `#person`)
- `/projects`: `CollectionPage` with `hasPart` array of `CreativeWork` items
- `/projects/[slug]`: `CreativeWork` or `SoftwareApplication` with `creator` referencing `#person`
- `/contact`: `ContactPage`

**`sameAs` array on Person:**
- `https://www.linkedin.com/in/tayyubyaqoob`
- `https://github.com/tayyub-ai`
- `https://x.com/TayyabY`
- `// TODO: Cointelegraph author page URL`
- `// TODO: AlphaWire contributor page URL`

## Content rewrite strategy

### Title
Kept as-is per user instruction: `Senior Digital Analyst & AI/ML Solutions Engineer`.

### Summary (leader-framed)
Rewrite to lead with leadership identity, surface verifiable scale (1.2M readers via published research, 35+ enterprise clients via internal modules, 200M events/month pipeline scale), and close with current focus.

### Achievement bullets
Apply leadership verbs (`Led`, `Architected`, `Pioneered`, `Established`, `Authored`, `Spearheaded`, `Drove`) where the underlying fact supports it. No invented metrics. Existing metrics (17%, 22%, 12% ROAS, 200M events, 83% reduction, 85% reduction) preserved verbatim — these are the verifiable evidence.

### `publications[]` entries
- Cointelegraph — AI/ML Content Creator, ~30 articles, 1.2M readers, URL TODO
- AlphaWire — Crypto Content Creator, multiple pieces, URL TODO

### `notableClients[]` entries
Tesco Bank, BBC World Service, Royal London, Gleneagles Hotel, Estelle, Blue Buffalo, Neilson Holidays, Clogau, Rivet Education, Nerdwallet, Clinic Secret. Source: existing JSON.

## SEO + KG infrastructure

### Sitemap + robots
- `@astrojs/sitemap` auto-generates `sitemap-index.xml`
- `public/robots.txt` updated:
  - Allow all
  - Sitemap directive
  - Allow all major search + AI crawlers (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot)
- `public/humans.txt` — small KG signal indicating site authorship
- `public/llms.txt` — AI search optimization (briefly summarizes site identity, links to key pages)

### Per-route meta
- `<title>` — page-specific, format: `{Page} — Tayyub Yaqoob`
- `<meta name="description">` — page-specific, ≤155 chars
- `<link rel="canonical">` — full absolute URL
- OG: `og:type` (website / profile / article), `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`
- Twitter: `summary_large_image`, site `@TayyabY`

### OG images
- Phase 1: single sitewide OG image (existing avatar with overlay text or a simple branded card — user supplies or Phase 2 generates)
- Phase 2: per-route OG image generation via `@vercel/og` or Astro endpoint

## Migration mechanics

### Files deleted
- `src2/` (entire directory)
- `src3/` (entire directory)
- `src/components/TemplateSwitcher.tsx`
- `src/main.tsx` (replaced by Astro entry)
- `src/App.tsx`, `src/App.css` (replaced by layouts)
- `vite.config.ts` (replaced by `astro.config.mjs`)
- `index.html` (Astro generates per-route HTML)
- `bun.lockb`, `package-lock.json` (regenerated)

### Files preserved (with possible relocation)
- `tailwind.config.ts` → kept; integrated via `@astrojs/tailwind`
- `src/index.css` → moved to `src/styles/global.css`
- `src/components/ui/*` (shadcn primitives) → moved to `src/components/ui/` in Astro
- `assets/` → moved to `src/assets/` (Astro's image optimization) and `public/assets/` (raw)
- `public/favicon.ico`, `public/portfolio-service-worker.js` → kept
- GTM container `GTM-MH7NJ4VX` → ported to BaseLayout

### Files added
- `astro.config.mjs`
- `src/pages/*.astro` (7 routes)
- `src/layouts/BaseLayout.astro`, `src/layouts/PageLayout.astro`
- `src/components/schema/*.astro` (one per schema type, for clarity)
- `src/components/Header.astro`, `Footer.astro`, `Hero.astro`, etc.
- `src/components/islands/*.tsx` (React islands)
- `src/content/portfolio.json` (rewritten)
- `src/lib/seo.ts` — helper for per-route meta + JSON-LD
- `public/humans.txt`, `public/llms.txt`
- Updated `public/robots.txt`

### Vercel config
- Replace `vercel.json` with Astro-compatible config
- Build command: `npm run build`
- Output directory: `dist/`
- Static adapter (no Node runtime needed)

## Phased delivery

### Phase 1 — this session
- Astro skeleton + all 7 routes with content + JSON-LD + meta + sitemap
- Content rewrite (`portfolio.json`)
- Header, Footer, Hero, basic page styling
- Deploys and is fully indexable

### Phase 2 — separate session
- Visual polish (motion, micro-interactions, responsive refinements)
- Per-route OG image generation
- Project detail pages fully fleshed out with rich media

### Phase 3 — separate session (optional)
- `/writing/` blog for original posts (additional KG signal)
- More publications wired in once URLs are sourced

## User action items (NOT done by this implementation)

These are required for actual Exceptional Talent visa qualification and full Knowledge Panel materialization. None can be done from the codebase.

1. **Submit Wikidata entry** for `Tayyub Yaqoob` — single biggest KG accelerator. Template:
   - Item: `Tayyub Yaqoob`
   - Description: `Senior Digital Analyst and AI/ML solutions engineer`
   - Statements: `instance of: human`, `occupation: data analyst`, `educated at: University of Stirling`, `country of citizenship: ?`, `official website: https://www.tayyubyaqoob.com/`, `LinkedIn ID`, `GitHub username`, `X username: TayyabY`
   - Add references for every statement (link to portfolio + LinkedIn).
2. **Source Cointelegraph author page URL** — visit your Cointelegraph dashboard or search `site:cointelegraph.com "Tayyub Yaqoob"` and capture the canonical author URL. Add it to `publications[0].url` in `src/content/portfolio.json`.
3. **Source AlphaWire contributor URL** — same process.
4. **Land 1–2 conference talks** — start with Sessionize CFPs and local meetups, escalate to mid-tier conferences. Add to a future `speaking[]` array.
5. **Open-source one project** — pick the strongest from your existing project list (PersonaGraph or Forecasting Engine are good candidates), publish to GitHub with a strong README and case study.
6. **Apply for 1–2 awards** in the next 6 months — Drum Awards, UK Tech Awards, MMA SMARTIES are reasonable targets given your work.
7. **Plan 3 reference letters** — required for visa endorsement. Identify referrers (current employer leadership, a Tesco Bank stakeholder, a Cointelegraph editor) and brief them.

## Testing / verification

- `npm run build` succeeds
- `npm run preview` renders all 7 routes without console errors
- Each route returns valid HTML with JSON-LD present in source (verify via `curl https://localhost:4321/about | grep application/ld+json`)
- Schema validates against Schema.org Validator (https://validator.schema.org/)
- Rich Results Test passes (https://search.google.com/test/rich-results) for at least the homepage and one project detail page
- Lighthouse SEO score ≥95 on at least the homepage
- Sitemap accessible at `/sitemap-index.xml`

## Open questions / deferred decisions

- Whether to use Astro content collections vs direct JSON import — implementation-time decision, no design impact
- Whether to keep `ParticleBackground` and `BackgroundEffect` as React islands or rewrite as Astro components — implementation-time decision
- Specific OG image visual treatment — Phase 2

## Approval

User approved this design via "yes go for it" on 2026-05-10.
