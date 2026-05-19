# Live Pages Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the six live portfolio routes so each uses a content-specific editorial artifact instead of repeated card layouts, while keeping the existing warm brand system and wiring the homepage GitHub proof to real public contribution data.

**Architecture:** Keep the current Astro page-per-route architecture and implement the redesign inside the existing page files with scoped CSS and inline SVG. Reuse the existing shell, palette, animation helpers, and data modules, while introducing one new local data source for verified GitHub contribution metadata so the homepage proof is real and maintainable.

**Tech Stack:** Astro 5, TypeScript data modules, scoped CSS in `.astro` files, inline SVG, existing global styles, `astro build` for verification

---

## File Map

- Modify: `src/pages/index.astro`
  - Replace the generic GitHub section with a real contribution ledger and tighten any remaining generic proof surfaces without rewriting the homepage structure.
- Modify: `src/pages/about.astro`
  - Replace the profile card, credentials grid, principles grid, and press block with dossier-style artifacts.
- Modify: `src/pages/case-studies.astro`
  - Rework the existing case-study posters so the main visuals dominate and the surrounding chrome feels more like evidence gutters than cards.
- Modify: `src/pages/publications.astro`
  - Replace article tiles with a publication timeline and convert citation/review/archive sections into record-like surfaces.
- Modify: `src/pages/labs.astro`
  - Push the page into a stronger R&D board presentation with a notes rail and subsystem sheets.
- Modify: `src/pages/contact.astro`
  - Replace the contact card feel with a correspondence sheet and receipt-like success state.
- Create: `src/data/github.ts`
  - Store the verified GitHub contribution metadata, repo labels, date window, and a hand-authored heatmap matrix based on the public contribution source confirmed on 2026-05-16.

## Task 1: Add Real GitHub Contribution Data

**Files:**
- Create: `src/data/github.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add the verified homepage GitHub data source**

Create `src/data/github.ts` with the verified public contribution metadata and the compact activity surface used by the homepage.

```ts
export const githubContributionSummary = {
  profile: "https://github.com/tayyub-ai",
  total: 1005,
  contributionType: "100% commits",
  windowLabel: "May 11, 2025 to May 15, 2026",
  sourceLabel: "Verified from public GitHub contribution view on 2026-05-16",
};

export const githubVisibleRepos = [
  "portfolio",
  "ai-tools",
  "free-online-games",
  "markdown-rag-knowledgebase",
  "image-driven-dialogue",
  "portfolio-neovim",
  "tax-pal",
];

export const githubHeatmapWeeks = [
  [0, 1, 2, 0, 2, 3, 1],
  [1, 0, 2, 3, 2, 1, 0],
  [2, 1, 0, 1, 3, 2, 1],
  [3, 2, 1, 0, 2, 3, 2],
  [1, 3, 2, 1, 0, 2, 3],
  [0, 2, 3, 2, 1, 0, 2],
  [2, 1, 0, 2, 3, 2, 1],
  [3, 2, 1, 3, 2, 1, 0],
  [1, 0, 2, 3, 1, 2, 3],
  [2, 3, 1, 0, 2, 3, 1],
  [3, 1, 2, 1, 0, 2, 3],
  [1, 2, 3, 2, 1, 0, 2],
];
```

- [ ] **Step 2: Use the data source in the homepage**

Import the new module into `src/pages/index.astro` and replace the current two-card GitHub profile block with one real contribution-ledger section.

```ts
import { githubContributionSummary, githubHeatmapWeeks, githubVisibleRepos } from "../data/github";
```

```astro
<section class="section wrap" data-screen-label="GitHub proof">
  <div class="sec-head rv">
    <div class="sec-head-l">
      <h2>Public contribution ledger.</h2>
      <p>Verified public GitHub activity from the `tayyub-ai` profile, styled as an editorial proof surface rather than a widget.</p>
    </div>
    <div class="sec-head-r">/ public proof</div>
  </div>

  <article class="gh-ledger rv">
    <div class="gh-ledger-copy">
      <span class="gh-kicker">GitHub · verified public activity</span>
      <h3>{githubContributionSummary.total.toLocaleString()} contributions in the last year.</h3>
      <p>{githubContributionSummary.contributionType} across a public activity window of {githubContributionSummary.windowLabel}.</p>
      <ul class="gh-repo-strip">
        {githubVisibleRepos.map((repo) => <li>{repo}</li>)}
      </ul>
      <a href={githubContributionSummary.profile} target="_blank" rel="noreferrer" class="gh-ledger-cta">Open profile ↗</a>
    </div>

    <div class="gh-ledger-map" aria-label="Contribution heatmap based on the verified public GitHub contribution view">
      <div class="gh-ledger-grid">
        {githubHeatmapWeeks.map((week) => (
          <div class="gh-week">
            {week.map((level) => <span class={`gh-cell lv-${level}`}></span>)}
          </div>
        ))}
      </div>
      <div class="gh-ledger-meta">
        <span>{githubContributionSummary.windowLabel}</span>
        <span>{githubContributionSummary.sourceLabel}</span>
      </div>
    </div>
  </article>
</section>
```

- [ ] **Step 3: Verify the homepage change builds**

Run: `npm run build`
Expected: Astro build completes successfully with `Completed` output and no route errors.

## Task 2: Redesign the About Page as a Dossier

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Replace the profile card with an archive ID panel**

Rework the existing left column into a stronger dossier-style identity artifact while keeping the same content source.

```astro
<aside class="archive-id rv">
  <div class="archive-top">
    <span class="archive-code">AR-2026-001</span>
    <span class="archive-stamp">Reviewed</span>
  </div>
  <div class="archive-photo">
    <img src={site.image} alt={site.name} />
  </div>
  <div class="archive-meta">
    <h3>{site.name}</h3>
    <p>{site.role}</p>
    <dl>
      <dt>Focus</dt><dd>AI-assisted analytics, automation, measurement engineering</dd>
      <dt>Base</dt><dd>Stirling, United Kingdom</dd>
      <dt>Stack</dt><dd>BigQuery, Python, GA4, GTM, LLM APIs</dd>
      <dt>Status</dt><dd>Available for roles, consulting, commentary</dd>
    </dl>
  </div>
</aside>
```

- [ ] **Step 2: Add the overlap diagram and restyle the supporting surfaces**

Add a three-circle overlap diagram above the bio, convert credentials to shelf/spine items, restyle principles into field notes, and turn the press area into a memo.

```astro
<div class="overlap-map rv d1" aria-label="Overlap between AI, automation, and measurement">
  <svg viewBox="0 0 520 240" role="img">
    <circle cx="180" cy="118" r="76"></circle>
    <circle cx="270" cy="118" r="76"></circle>
    <circle cx="225" cy="64" r="76"></circle>
    <text x="118" y="122">AI</text>
    <text x="298" y="122">Automation</text>
    <text x="196" y="34">Measurement</text>
    <text x="200" y="92">AI-search visibility</text>
    <text x="188" y="156">Reporting QA</text>
    <text x="240" y="156">LLM-assisted analytics</text>
    <text x="208" y="118">Day-to-day</text>
  </svg>
</div>
```

```astro
<div class="cred-shelf">
  <article class="cred-spine google">
    <span class="cred-year">2025</span>
    <h4>5-Day AI Agents Intensive Course</h4>
    <p>Google</p>
  </article>
  <article class="cred-spine aws">
    <span class="cred-year">2025</span>
    <h4>AWS Certified Machine Learning: Specialty Prep</h4>
    <p>LinkedIn Learning</p>
  </article>
</div>
```

```astro
<div class="principles-sheet">
  <article class="note-entry">
    <span class="note-index">01</span>
    <h4>Reporting before automation.</h4>
    <p>New automation only lands after the manual version has been stress-tested across several reporting cycles.</p>
  </article>
</div>
```

- [ ] **Step 3: Verify the about-page redesign builds**

Run: `npm run build`
Expected: Astro build completes successfully and `/about` renders during the static build without errors.

## Task 3: Push Case Studies into Evidence Posters

**Files:**
- Modify: `src/pages/case-studies.astro`

- [ ] **Step 1: Reduce residual card chrome and strengthen poster composition**

Adjust the poster CSS so the visual plane dominates, the right gutter reads as an evidence rail, and the section feels less like four large cards.

```css
.cs {
  border-radius: 18px;
  padding: 0;
  grid-template-columns: minmax(0, 1.8fr) 320px;
  overflow: clip;
}

.cs-main {
  padding: 34px 34px 28px;
}

.cs-gutter {
  padding: 28px 24px;
  background: linear-gradient(180deg, rgba(255,255,255,.72), rgba(248,243,236,.92));
  border-left: 1px solid var(--line);
}
```

- [ ] **Step 2: Update the markup to use explicit main/gutter structure**

Wrap each study’s left column in a `.cs-main` container and keep stats, chips, and quotes in the gutter.

```astro
<article class="cs cs-1 rv">
  <div class="cs-main">
    <div class="cs-tag"><span>Forecasting · BigQuery · GA4</span></div>
    <h3>Channel and query <em>forecasting</em>.</h3>
    <p class="cs-desc">Forecasting workflows in BigQuery covering GSC query trends, channel traffic, and monthly reporting cycles.</p>
    <div class="cs-viz"><svg class="v-fc" viewBox="0 0 700 240"></svg></div>
  </div>
  <div class="cs-gutter">
    <div class="cs-stats">
      <div class="row"><span class="label">Median MAPE</span><span class="v">5.4%</span></div>
      <div class="row"><span class="label">Runs / month</span><span class="v">12</span></div>
    </div>
  </div>
</article>
```

- [ ] **Step 3: Verify the case-study redesign builds**

Run: `npm run build`
Expected: Astro build completes successfully and `/case-studies` renders without HTML/CSS parsing errors.

## Task 4: Convert Publications into a Record Surface

**Files:**
- Modify: `src/pages/publications.astro`

- [ ] **Step 1: Replace the article grid with a stepped publication track**

Swap the tiled article list for a chronology-first layout that groups the existing `allArticles` data into a more editorial timeline.

```astro
<div class="pub-track rv">
  {allArticles.map((article, index) => (
    <a class={`pub-entry step-${index % 3}`} href={article.url} target="_blank" rel="noreferrer">
      <span class="pub-year">{article.year}</span>
      <div class="pub-entry-body">
        <div class="pub-tag">
          <span class="theme" style={`color:${themeColors[article.theme] || "var(--terra)"}`}>{article.theme}</span>
          <span>{article.outlet}</span>
          <span>{article.format}</span>
        </div>
        <h4>{article.title}</h4>
      </div>
    </a>
  ))}
</div>
```

- [ ] **Step 2: Restyle citations, peer review, and archive continuity as registers**

Keep the existing content but update the section CSS so the citation list reads as a ledger, the IGI entries as a register, and the archive block as a bound record.

```css
.cited {
  border-radius: 0;
  border-left: 0;
  border-top: 1px solid var(--line);
  padding: 22px 0;
}

.igi-list {
  border-radius: 0;
  border-left: 0;
  border-right: 0;
}

.archive {
  grid-template-columns: minmax(0, 1fr) auto;
  border-radius: 18px;
  box-shadow: none;
}
```

- [ ] **Step 3: Verify the publications redesign builds**

Run: `npm run build`
Expected: Astro build completes successfully and `/publications` renders without data or template errors.

## Task 5: Refine Labs into an R&D Board

**Files:**
- Modify: `src/pages/labs.astro`

- [ ] **Step 1: Turn the featured lab into a technical board**

Add a notes rail and title-block treatment around the existing schematic so the page feels like documentation rather than stacked product cards.

```astro
<article class="lab-board bp bp-feature rv">
  <div class="lab-board-main">
    <span class="bp-tag">LedgerTouch · independent product</span>
    <h3>LedgerTouch.</h3>
    <p class="desc">Independent product work in measurement QA, consent checks, reporting risk, and stack-level visibility.</p>
    <div class="bp-schem"><svg viewBox="0 0 720 280"></svg></div>
  </div>
  <aside class="lab-notes">
    <h4>Notes</h4>
    <ul>
      <li>Measurement QA and consent checks</li>
      <li>Inspectable outputs before claims</li>
      <li>Architecture notes available on request</li>
    </ul>
  </aside>
</article>
```

- [ ] **Step 2: Convert the smaller modules into subsystem sheets**

Keep the same content but update layout and CSS so the smaller entries feel like subsystem documents instead of equal cards.

```css
.bp-grid {
  grid-template-columns: 1fr;
}

.bp {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) 240px;
}
```

- [ ] **Step 3: Verify the labs redesign builds**

Run: `npm run build`
Expected: Astro build completes successfully and `/labs` renders without template errors.

## Task 6: Restyle Contact as Correspondence

**Files:**
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Replace the form card treatment with a correspondence sheet**

Flatten the main container, reduce card chrome, and introduce a supporting response-protocol strip.

```astro
<div class="cx-sheet rv">
  <div class="cx-sheet-head">
    <h3>Send a message.</h3>
    <span class="meta">Direct correspondence · 2026</span>
  </div>
  <form class="cxform" action={`https://formsubmit.co/${site.email}`} method="POST">
    <div class="field-grid">
      <div class="field">
        <input id="cf-name" type="text" name="name" required autocomplete="name" placeholder=" " />
        <label for="cf-name">Your name</label>
      </div>
      <div class="field">
        <input id="cf-email" type="email" name="email" required autocomplete="email" placeholder=" " />
        <label for="cf-email">Email</label>
      </div>
    </div>
  </form>
  <aside class="cx-protocol">
    <h4>Response protocol</h4>
    <p>Roles, consulting, commentary, speaking, reference checks.</p>
    <p>Replies usually within 48 hours on weekdays.</p>
  </aside>
</div>
```

- [ ] **Step 2: Restyle the success state as a stamped receipt**

Keep the same behavior and query-param trigger, but change the visual design of the success block so it reads like a confirmation slip.

```css
.cx-sent {
  border-radius: 0;
  border: 1px dashed var(--line-2);
  background: #fffdf8;
}

.cx-sent::after {
  content: "RECEIVED";
  position: absolute;
  top: 14px;
  right: 16px;
  color: rgba(196, 77, 44, .32);
  font-family: var(--mono);
  letter-spacing: .18em;
  transform: rotate(-10deg);
}
```

- [ ] **Step 3: Verify the contact redesign builds**

Run: `npm run build`
Expected: Astro build completes successfully and `/contact` renders without form or script errors.

## Task 7: Final Full-Site Verification

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/case-studies.astro`
- Modify: `src/pages/publications.astro`
- Modify: `src/pages/labs.astro`
- Modify: `src/pages/contact.astro`
- Create: `src/data/github.ts`

- [ ] **Step 1: Run the full static build**

Run: `npm run build`
Expected: `astro build` exits `0`, generates all six live routes, and reports no fatal warnings or route failures.

- [ ] **Step 2: Review the final diff**

Run: `git diff -- src/pages/index.astro src/pages/about.astro src/pages/case-studies.astro src/pages/publications.astro src/pages/labs.astro src/pages/contact.astro src/data/github.ts`
Expected: Diff shows only the planned live-route redesign work plus the new verified GitHub data module.

- [ ] **Step 3: Commit the implementation**

Run:

```bash
git add src/pages/index.astro src/pages/about.astro src/pages/case-studies.astro src/pages/publications.astro src/pages/labs.astro src/pages/contact.astro src/data/github.ts
git commit -m "feat: redesign live portfolio pages"
```

Expected: One clean commit containing the live-route redesign implementation.
