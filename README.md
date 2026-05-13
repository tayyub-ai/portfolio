# Tayyub Yaqoob Portfolio

Astro-based portfolio and evidence site for Tayyub Yaqoob, focused on:

- AI and analytics leadership
- enterprise delivery proof
- public technical writing
- a stronger review surface for senior roles and Global Talent-style scrutiny

## What this site is

This is not a generic developer portfolio template.

It is a structured evidence surface built to show:

- measurable commercial impact
- leadership through systems and team leverage
- flagship project case studies
- public-facing research and editorial work

## Routes

- `/` — homepage with proof, leadership framing, flagship work, and client footprint
- `/about` — narrative background, working principles, expertise, and education
- `/work` — detailed timeline of roles, scope, and outcomes
- `/evidence` — reviewer-oriented proof page
- `/publications` — AI, ML, fintech, and Web3 editorial work
- `/projects` — featured case studies plus archive
- `/projects/[slug]` — project detail pages
- `/contact` — high-intent contact surface

## Content source

All portfolio content is driven from:

- `src/content/portfolio.json`

Key site logic lives in:

- `src/lib/portfolio.ts`
- `src/lib/seo.ts`

Shared shell and styling:

- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/styles/global.css`

## Development

Install dependencies:

```bash
npm install
```

Run local dev server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Notes

- The site is intentionally content-first and evidence-first.
- Some external proof still depends on sourcing real third-party URLs, especially publication author pages.
- `package.json` and `package-lock.json` may contain unrelated local changes; review before committing.
