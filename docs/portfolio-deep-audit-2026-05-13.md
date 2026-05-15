# Portfolio Audit - 2026-05-13

## Scope

This audit reviews the current public site at `https://www.tayyubyaqoob.com` and the local Astro codebase as:

- a personal credibility site
- a supporting surface for UK Global Talent digital technology endorsement under the `leader / exceptional talent` route
- a search-facing entity page that should help Google understand the person, the work, and the supporting evidence

Audit basis:

- code inspection of the current Astro routes in `src/pages`
- local production build with `npm run build`
- live-domain checks against `https://www.tayyubyaqoob.com`
- current official guidance from GOV.UK, Tech Nation, and Google Search Central checked on 2026-05-13

## Executive Verdict

The site is visually strong and materially better than a normal portfolio, but it is not yet a reliable high-stakes evidence surface.

The main problem is not aesthetics. It is evidence integrity, information architecture, and search/entity clarity.

Right now the site often looks more editorial than evidential. For a hiring manager that may still work. For a Global Talent reviewer, journalist, or Google entity resolver, it is too indirect. The strongest proofs are either hidden, duplicated, softened, or presented in a way that reduces confidence.

My blunt assessment:

- good portfolio
- promising credibility surface
- not yet endorsement-grade
- not yet knowledge-graph-friendly
- too many page names and section labels are clever where they need to be literal

## External Criteria Checked

### UK Global Talent digital technology

As of 2026-05-13, GOV.UK says the digital technology `leader` route requires that you show you have been recognised by others as a leading talent in the field in the last 5 years, and that at least 2 additional criteria are met. GOV.UK lists examples including innovation, contribution outside work, significant product-led contributions, and research that has been published or endorsed by an expert.

GOV.UK also says you must provide:

- a CV
- 3 letters of recommendation
- up to 10 evidence documents
- at least 2 documents showing recognition as a leading or potential talent
- at least 4 more documents across 2 additional criteria

Source checks:

- GOV.UK eligibility page checked 2026-05-13
- GOV.UK endorsement documents page checked 2026-05-13
- Tech Nation Global Talent material checked 2026-05-13

### Google rich results / knowledge graph / knowledge panels

As of 2026-05-13, Google Search Central documents relevant here are:

- `ProfilePage` for a page primarily about one person or organisation
- `Organization`
- supported structured data types including `Article`, `Breadcrumb`, `Organization`, and `ProfilePage`

Google also explicitly says structured data does not guarantee rich-result appearance.

Source checks:

- Google Search Central `ProfilePage` checked 2026-05-13
- Google Search Central `Organization` checked 2026-05-13
- Google Search Central structured data gallery checked 2026-05-13

## Findings

### 1. High: the site weakens genuine evidence by presenting it indirectly

This is the biggest problem.

Examples:

- `src/pages/publications.astro:138-289` lists many Cointelegraph articles, but every item links to the author profile, not the article itself.
- `src/pages/publications.astro:319-344` does the same for AlphaWire.
- `src/pages/research.astro:151-197` shows stylised article titles and all of them also link to the author profile, not the actual articles.
- `src/pages/publications.astro:357-368` shows CCN excerpts, but the public page does not link to the actual source pages.

Why this matters:

- For endorsement, proof has to feel inspectable.
- For search, article-level links create a better entity graph than repeatedly pointing at one author page.
- For human reviewers, indirect linking makes real work look less real.

Recommendation:

- Link every listed article to its actual URL, not just the author page.
- Remove stylised or paraphrased titles unless they are exact article titles.
- Add publication date, outlet, topic, and direct article URL for each flagship item.
- For CCN, either publish the actual URLs or remove the impression that a reader can verify them instantly.

### 2. High: the `Code` page appears illustrative rather than verifiable

`src/pages/open-source.astro:41-67` presents four public repo names as evidence:

- `analytics-audit-examples`
- `gsc-bigquery-notebooks`
- `pptx-report-engine`
- `forecasting-sketches`

I checked the public GitHub API for `tayyub-ai` on 2026-05-13. Those repo names did not appear in the returned public repositories. The repos that did appear included names such as `ai-tools`, `awesome-llm-apps`, `basketball-player-movement-analysis`, `cv-builder`, `image-driven-dialogue`, `markdown-rag-knowledgebase`, and `portfolio`.

Why this matters:

- This is a trust problem, not a branding problem.
- If a reviewer clicks through expecting public proof and finds different assets, confidence drops fast.
- For Global Talent, evidence surfaces must be tighter than normal marketing pages.

Recommendation:

- Replace the four descriptive placeholders with the real public repo names and links.
- If the intended repos are private or not ready, do not name them as public examples.
- Add repo-level links, short summaries, and one sentence on why each repo matters as evidence.

### 3. High: the information architecture is not aligned to how a reviewer evaluates evidence

The strongest support page is `The receipts`, but it is buried in the footer instead of being a primary route.

At the same time, the main navigation uses ambiguous labels:

- `Words`
- `Research`
- `Products`
- `Systems`

The problem is not only naming. It is evaluation flow.

Current reviewer journey:

- Home
- Systems
- Products
- Writing
- Research
- Words
- About

Better reviewer journey:

- Home
- Evidence
- Case Studies
- Publications
- Recognition
- About
- Contact

Why this matters:

- Global Talent reviewers are looking for recognition, impact, innovation, contribution, and evidence.
- Your nav currently reflects a creative/editorial portfolio, not an endorsement dossier.
- Evidence is duplicated across `Writing`, `Research`, and `Receipts`, which adds friction and confusion.

Recommendation:

- Promote `/receipts` into the main nav and rename it to `Evidence`.
- Collapse overlap between `/publications` and `/research`.
- Make the route architecture literal and reviewer-friendly.

### 4. High: `Products` is a misleading page name for what is currently shown

`src/pages/products.astro:35-102` frames the page as `Independent products`, but every item shown is `In development`.

That creates two problems:

- it overstates maturity
- it pulls focus toward unfinished work

For a serious reviewer, unfinished products can help only if they are clearly secondary to shipped evidence. Here they have a primary-nav position.

Recommendation:

- Rename the route and nav label to `Labs`, `R&D`, or `In Development`.
- Alternatively remove it from the primary nav until one product is publicly launched.
- Do not let unfinished product work outrank verified shipped systems and external recognition.

### 5. High: the site still reads as multi-persona rather than one sharp exceptional-talent case

The homepage currently tries to be all of these at once:

- analytics systems portfolio
- media expert page
- crypto writer profile
- GA4 product teaser
- peer-review proof surface
- founder-in-progress story

This breadth is real, but the site does not control it tightly enough.

Evidence:

- homepage hero and CTA mix systems, media, and product framing: `src/pages/index.astro:93-109`
- `Research` mixes publications, citations, and peer review: `src/pages/research.astro:72-240`
- `Press kit` is highly developed, while reviewer-facing evidence is less directly surfaced: `src/pages/press.astro:102-256`

Why this matters:

- Exceptional talent cases work best when the thesis is simple.
- Right now the simplest reading is "broad technical operator with media-facing work".
- The site needs to force the stronger reading: "technical leader in AI-driven analytics systems with external recognition and published sector contribution."

Recommendation:

- Pick one primary identity:
  `AI systems and analytics engineering leader`
- Make writing, peer review, and press serve that thesis instead of competing with it.
- Reduce the crypto/media identity from front-and-centre to supporting recognition, unless you want the whole case judged primarily through that lens.

### 6. High: the page naming is too clever in places where clarity matters more

Problem labels:

- `Words`
- `The receipts`
- `What the room says`
- `The shelf`
- `The clippings`
- `About, plainly`
- `Featured, cited & in review`

These are stylish, but they slow comprehension and weaken search semantics.

For human evaluators:

- they add decoding work
- they make the site feel authored rather than evidenced

For search:

- some page titles are not explicit enough
- several routes are missing meta descriptions entirely

Recommendation summary:

- prefer literal route names
- keep the poetic microcopy inside the page if you want it
- do not use poetic labels as the main naming system

### 7. High: the live site has a real crawl/discovery defect

Verified on 2026-05-13:

- `robots.txt` points to `https://www.tayyubyaqoob.com/sitemap-index.xml`
- that URL returned `404 NOT_FOUND`
- `https://www.tayyubyaqoob.com/sitemap.xml` also returned `404`

Code context:

- `public/robots.txt:21` points to `sitemap-index.xml`
- `astro.config.mjs:15-17` enables the Astro sitemap integration
- local build successfully generated `dist/sitemap-index.xml` and `dist/sitemap-0.xml`

Conclusion:

- this is a deployment issue, not a local build issue

Why this matters:

- it hurts crawl discovery
- it weakens page freshness and indexing confidence
- it is exactly the kind of avoidable technical defect that should not exist on a credibility site

Recommendation:

- fix the Vercel deployment so the generated sitemap files are actually published
- confirm `robots.txt` points to a live sitemap URL
- submit the correct sitemap in Search Console

### 8. High: the site currently has almost no entity or rich-result groundwork

Confirmed from the live homepage and generated HTML:

- no canonical tags
- no Open Graph metadata
- no Twitter card metadata
- no JSON-LD
- no `ProfilePage`
- no `Person`
- no `Organization`
- no `BreadcrumbList`

Examples:

- `src/pages/index.astro:1-11` only defines title and description
- same pattern appears across other routes
- the live homepage source on 2026-05-13 exposed plain HTML without structured data

Why this matters:

- Google needs help understanding that this is a person-led authority site, not just a static brochure
- knowledge graph / knowledge panel eligibility depends on much more than markup, but the current site provides almost none of the basic machine-readable identity signals
- social sharing is also weakened without OG/Twitter metadata

Recommendation:

- create a reusable head/SEO component
- add canonical URLs on every route
- add OG/Twitter metadata on every route
- add JSON-LD:
  - homepage: `WebSite` plus `Person`
  - `/about`: `ProfilePage` with `Person`
  - major routes: `BreadcrumbList`
  - any real on-site articles you publish later: `Article`
- include `sameAs` links to LinkedIn, GitHub, Cointelegraph, AlphaWire, and any other authoritative public profiles

Important:

- markup helps Google understand the entity
- it does not guarantee a knowledge panel

### 9. Medium-high: several pages are missing meta descriptions entirely

Pages with title tags but no visible meta description in source:

- `src/pages/about.astro`
- `src/pages/products.astro`
- `src/pages/research.astro`
- `src/pages/testimonials.astro`
- `src/pages/open-source.astro`

Why this matters:

- weaker search snippets
- lower control over SERP messaging
- avoidable inconsistency on a small static site

Recommendation:

- add deliberate descriptions for every indexable route
- each description should reinforce the main evidence thesis

### 10. Medium-high: proof is duplicated across routes in a way that creates drift and inconsistency

Examples:

- `Writing` already contains Cointelegraph, AlphaWire, and CCN: `src/pages/publications.astro:100-369`
- `Research` also contains Cointelegraph, CCN, and IGI: `src/pages/research.astro:78-240`
- homepage references article volume and IGI again: `src/pages/index.astro:96-108`

This duplication is already causing inconsistency:

- homepage says `35+ technical articles`: `src/pages/index.astro:97`
- `Writing` says `30+ Cointelegraph` and `5+ AlphaWire`: `src/pages/publications.astro:93-96`
- `Research` says `14+ articles` in one surface: `src/pages/research.astro:98-101`

Why this matters:

- reviewers notice number drift
- search engines see less clean topical separation
- maintenance burden rises quickly

Recommendation:

- one canonical route for publications
- one canonical route for recognition / peer review / citations
- derive repeated counts from one content source, not hardcoded strings across pages

### 11. Medium-high: the strongest route for endorsement is present, but it still needs one more level of rigor

`/receipts` is structurally the best page on the site.

It is closest to what a reviewer actually needs:

- organised evidence categories
- explicit proof types
- clearer honesty around `in progress` vs shipped

But it still has issues:

- it is hidden in the footer
- it still uses branded language like `The receipts`
- some evidence remains described rather than directly inspectable
- some entries refer to documents available `on request` instead of public proof

Recommendation:

- rename it to `Evidence`
- promote it into the main nav
- use it as the anchor page for the whole site
- add direct public links wherever confidentiality does not block them

### 12. Medium: the contact and CTA system is skewed too far toward media

The site repeatedly pushes `Media enquiries` and `Press` framing.

That is not wrong, but it is disproportionate if the priority is Global Talent and senior credibility.

Examples:

- homepage secondary CTA is `Media enquiries`: `src/pages/index.astro:100-101`
- footer repeatedly says `For media enquiries`
- `Contact` page headline is `Media & press enquiries`: `src/pages/contact.astro:81-83`

Why this matters:

- it makes the site feel press-led
- it under-serves referees, recommenders, hiring managers, and reviewers

Recommendation:

- broaden CTA language
- add `Request CV`, `Request evidence pack`, or `For recommendation / endorsement context`
- keep press as one path, not the dominant site-wide path

### 13. Medium: some editorial styling choices make the site feel performative

Examples:

- `Plate i — in studio`
- `MMXXVI`
- `About, plainly`
- `What the room says`
- `The shelf`
- `The clippings`
- `Open · 2026`

None of these is fatal alone. Together they create a layer of theatre between the reader and the proof.

Recommendation:

- keep strong visual design
- reduce literary labelling in headers, crumbs, and titles
- let the actual evidence feel serious and calm

## Global Talent Fit Assessment

### Where the site already helps

- public writing exists and is relevant
- external publication profiles exist
- expert-source citations exist
- peer-review activity exists
- the private-system story is plausible and differentiated
- the `Evidence` / `Receipts` concept is directionally right

### Where it is currently weak against the `leader / exceptional talent` bar

- recognition is not surfaced with enough direct public verification
- innovation is asserted more than evidenced
- contribution outside work is present but fragmented
- product-led contribution is muddied by unfinished products
- research and publication proof is not linked cleanly enough
- public code evidence is currently not trustworthy enough

### Bottom line

As of 2026-05-13, the site is a supporting asset for an endorsement case, but not a submission-grade front door on its own.

It needs to become:

- more literal
- more inspectable
- more internally consistent
- more machine-readable

## Google / Knowledge Graph Assessment

### What I could confirm

- I could not verify any meaningful rich-result implementation on the site because there is currently no visible structured data.
- I could not confirm an existing knowledge panel for the personal brand from the search results available to me.
- In the web searches I ran on 2026-05-13, external profiles surfaced more readily than the personal site.

### What this means

The current site is not giving Google much help with:

- entity disambiguation
- person-profile understanding
- authoritative same-entity linking
- rich search features

### What to do

1. Fix crawl basics first.
2. Add canonical + OG + Twitter metadata.
3. Add `ProfilePage` markup on `/about`.
4. Add `Person` JSON-LD with `sameAs` links.
5. Add breadcrumb markup.
6. Publish a few original on-site essays or research notes if you want realistic `Article` opportunities.
7. Build more consistent off-site corroboration:
   LinkedIn, GitHub, Cointelegraph, AlphaWire, company bio pages, speaker pages, and any relevant scholarly or professional profile.

## Recommended Route Names

These are the changes I recommend most strongly.

### Primary navigation

- `Home` -> `Home`
- `Systems` -> `Case Studies`
- `Products` -> `Labs` or `In Development`
- `Writing` -> `Publications`
- `Research` -> `Recognition`
- `Words` -> `Testimonials`
- `About` -> `About`
- add `Evidence`

### Secondary routes

- `The receipts` -> `Evidence`
- `Press kit` -> `Press`
- `Code` -> `Open Source`

### Suggested path mapping

- `/systems` -> `/case-studies`
- `/products` -> `/labs`
- `/publications` -> `/publications`
- `/research` -> `/recognition`
- `/testimonials` -> `/testimonials`
- `/receipts` -> `/evidence`
- `/press` -> `/press`
- `/open-source` -> `/open-source`

## Recommended New Structure

If the goal is exceptional-talent support first, I would restructure the site as:

1. `Home`
2. `Evidence`
3. `Case Studies`
4. `Publications`
5. `Recognition`
6. `Testimonials`
7. `About`
8. `Contact`

And I would make the homepage route people in this order:

1. Evidence
2. Flagship case studies
3. Publications and recognition
4. Testimonials
5. Contact

## Priority Actions

### Immediate

- fix the live sitemap 404
- add canonical, OG, Twitter, and JSON-LD foundations
- promote `/receipts` and rename it to `Evidence`
- rename `Words`, `Research`, and `Products`
- replace indirect article links with actual article URLs
- remove or correct any public-code claims that do not match the real GitHub profile

### Next

- collapse overlap between `Writing` and `Research`
- tighten the homepage thesis around one primary identity
- add a direct `Request CV / evidence pack` CTA
- standardise all counts from one source of truth

### Then

- publish 2 to 4 original on-site articles or research notes
- create stronger case-study pages with outcomes, architecture, and your role
- add a real profile page entity model for Google

## Final Assessment

The site has real substance behind it. The issue is not lack of material. The issue is packaging discipline.

You already have enough ingredients for a stronger endorsement surface than this. What is currently missing is not more achievement. It is a stricter evidence architecture, more literal naming, and less editorial indirection.

If you want this site to help with `exceptional talent`, it should feel less like a magazine about you and more like a precise, public dossier of verifiable technical leadership.
