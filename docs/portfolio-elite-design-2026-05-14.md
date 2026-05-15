# Portfolio Elite Design Spec · 2026-05-14

Working spec for the "Editorial Data Observatory" redesign. Each section gets a content-appropriate visualization rather than a generic card. Implementation follows this document verbatim — when in doubt, the spec wins.

---

## 0 · Operating principles

1. **One artifact per content type.** Cards for everything is the problem. Replace each section with the visualization metaphor that fits its content (chart, schematic, ledger, timeline, certificate, archive, network graph, etc.).
2. **Warm editorial palette stays.** Instrument Serif headings, JetBrains Mono labels, Inter body, terra/ochre/coral/sage/moss accents. Already established; don't relitigate.
3. **Animation serves clarity, not decoration.** Every animated element must reveal information that a static version would not — direction of change, sequence of steps, relationship between nodes.
4. **No new dependencies.** Pure SVG + CSS + vanilla JS. Site stays under 50 KB JS, deploys instantly, zero supply-chain surface.
5. **Reduced-motion respected.** All animated treatments must degrade to a still version under `prefers-reduced-motion: reduce`.
6. **Mobile-considered.** Multi-panel visualizations collapse to vertical stacks under ~720 px; complex interactive graphs degrade to static SVG snapshots.

---

## 1 · Tech approach

- **SVG-first.** Every viz is hand-authored SVG with semantic classes the CSS animates. No canvas, no WebGL.
- **CSS-driven where possible.** Stroke-dashoffset animations, opacity sweeps, transform scales, gradient shifts. JS only where we need IntersectionObserver, ticker counters, or user input.
- **Class naming pattern.** New animation primitives prefixed `viz-` (e.g. `viz-river`, `viz-blueprint`, `viz-passport`). Avoids collision with the existing `cdx-` / `feat-card-` namespaces and makes them addressable from any context.
- **Per-page CSS in `<style slot="head">`.** Section-specific styles stay scoped to the page that uses them; only cross-cutting primitives go to `public/styles.css`.

---

## 2 · Home page (`index.astro`)

### 2.1 Hero

**Current:** Headshot card to the right of H1 with two evidence badges.

**Replace with:** A **"console" panel** alongside the H1. Three stacked rows:

- **Row A — Now:** A live-feel ticker showing one of four rotating status lines, each fading in/out every 4 s: `· current focus: AI-search visibility research`, `· shipped: forecasting workflow update`, `· this week: 2 new Cointelegraph drafts`, `· open: senior-role conversations`.
- **Row B — Mini forecast sparkline:** A 60×220 SVG line chart with a solid historical line, a dashed forecast line with confidence band, animated draw-in on load. Labelled "Channel forecast · GA4".
- **Row C — Citation tickers:** Three tiny circular gauges (Cointelegraph · CCN · IGI), each showing a count (8 · 4 · 3) and a single-word label. Tick-up on intersection.

The headshot moves *into* the console as a 40 px circular avatar at the top, alongside "Tayyub Yaqoob · Senior Digital Analyst · Stirling".

**Why this works:** It signals "this person operates instruments" without explicit claims. Replaces the conventional portfolio headshot pattern with something that fits the content positioning.

### 2.2 Client marquee

**Current:** Already a horizontal marquee with logos.

**Enhance:** Below the marquee, add a thin **industry-distribution stacked bar** (height ~14 px, full width, segmented in 5 colours): Media · Financial · Consumer · Insurance · Personal Finance. Each segment labelled with its share percentage in small mono. Animates from 0% to target width when scrolled into view.

### 2.3 Metric strip

**Current:** Four square stat tiles.

**Replace with:** Four **annotated radial dials**.

- Each dial: 90 px SVG circle, partial arc (terra colour) sweeping from 270° to a value-proportional angle, centred number, label plate below.
- Dials draw in on intersection (`gauge-arc` style stroke-dashoffset).
- The number inside still uses the existing counter tick-up.

```
   ╭───────╮      ╭───────╮      ╭───────╮      ╭───────╮
   │  ◜    │      │  ◜    │      │  ◜    │      │  ◜    │
   │  35+  │      │   3   │      │  50+  │      │  12+  │
   │       │      │       │      │       │      │       │
   ╰───────╯      ╰───────╯      ╰───────╯      ╰───────╯
   Technical      IGI Global     Teams using    AI / ML
   articles       reviews        systems        credentials
```

### 2.4 "Where to look first" — network graph

**Current:** Four feature tile cards.

**Replace with:** An **interactive SVG network graph** (`viz-network`).

- Centre node: monogram circle "TY" with subtle pulse halo.
- Four primary nodes around it (Case Studies, Publications, Recognition, Evidence), connected by curved lines with animated dashed stroke that flows from centre outward.
- Four secondary nodes further out (Testimonials, Press, Labs, Open Source), connected to the nearest primary.
- Hovering any node: brightens its line, shows a small caption to the side ("Production systems · 4"), and slightly enlarges the node.
- Click navigates to the page.
- Layout: SVG viewBox 800×500, nodes positioned by hand so it looks designed not algorithmic.

### 2.5 Three production systems

**Current:** Three small feat-cards with mini SVG visualizations.

**Replace with:** Three **schematic case-study posters**, full-width on desktop (vertical stack on mobile). Each is roughly 1:0.6 aspect.

- **Poster 1 · Forecasting** (`viz-forecast-poster`)
  - Title block top-left ("Forecasting · BigQuery · GA4").
  - Main viz: historical line (solid, terra), forecast line (dashed, ochre), confidence band (ochre 20% opacity), "now" vertical marker.
  - Right gutter: stack of stats (MAPE label, R² label, run count). Tick-up on scroll-in.
  - Stack chips: BigQuery · Python · GSC API · GA4.

- **Poster 2 · Sentiment monitoring** (`viz-river-poster`)
  - Title block: "Sentiment monitoring · LLM-assisted".
  - Main viz: a **sentiment river** (stacked area chart over 12 months), three bands (positive · neutral · negative), each band coloured. Two annotation flags pinned to particular dates ("Coverage spike", "Topic shift").
  - Right gutter: counts of surfaces tracked.
  - Stack chips: Python · LLM API · BigQuery · structured outputs.

- **Poster 3 · AI visibility tracking** (`viz-serp-poster`)
  - Title block: "AI vs traditional search · visibility".
  - Main viz: a **split panel** — left side a stylised SERP result list with the brand result moving up/down over time, right side an AI Overviews citation panel with the brand appearing/disappearing. Connected by a thin animated arrow showing migration.
  - Below: a 12-month timeline scrubber with markers at each tracked event.
  - Stack chips: Search · AI Overviews · ChatGPT · Perplexity.

### 2.6 Closer detail CTA

**Current:** Plain text + button on a card.

**Replace with:** A **folded letter** animation. SVG envelope on the left "unfolds" on scroll-into-view (CSS `transform-origin` rotation), revealing inside a typewritten message with the CTA button at the bottom. Stamp graphic in the corner with date ("Stirling · MMXXVI").

---

## 3 · About page (`about.astro`)

### 3.1 Profile card

**Current:** Photo + name + role + meta list.

**Replace with:** A **press-pass / archive ID** card.

- Aspect: 5:7 portrait, ~280 px wide.
- Top: monogram stamp + archive number ("AR-2026-001").
- Middle: photo (rounded, slight desaturation).
- Bottom: name (serif italic), role line (mono), validity strip ("VALID 2026 →").
- Corner: a "REVIEWED" rubber-stamp graphic, semi-transparent, slightly rotated.
- Hover: tilts in 3D, stamp lifts.

### 3.2 Bio block — venn diagram

**Current:** H3 + 3 paragraphs of prose.

**Add above the prose:** A **three-circle Venn** SVG.

- Three circles labelled AI · Automation · Measurement.
- Each pairwise overlap labelled with a domain example (AI ∩ Measurement = "AI-search visibility"; AI ∩ Automation = "LLM-assisted analytics"; Automation ∩ Measurement = "Reporting QA").
- Centre triple overlap labelled "Day-to-day".
- Circles fade in sequentially on scroll-into-view, labels typewriter-reveal.

Keep the prose paragraphs below (already rewritten in prior pass).

### 3.3 Credentials — bookshelf

**Current:** 2×3 grid of plain cards.

**Replace with:** A **bookshelf** layout.

- Six vertical book spines lined up along a thin shelf rule.
- Each spine: tall narrow rectangle, distinctive colour per issuer (Google · LinkedIn · AWS), title typeset vertically along the spine in serif italic, year stamped at the bottom.
- Click any spine: it "pulls out" of the shelf and rotates 90° into a horizontal cert spread showing skills tags, click again to push back.

### 3.4 Principles — field notebook

**Current:** Four plain numbered cards.

**Replace with:** A **graph-paper notebook page**.

- Background: subtle 16 px grid line texture.
- Four principles laid out as notebook entries, each with:
  - A hand-drawn underline (SVG path with a slight wobble) under the heading.
  - Margin annotation in a different colour ("→ see /case-studies").
  - Tick or dot marker before each.
- Page corner has a curled-up effect (CSS `clip-path` triangle with shadow).

---

## 4 · Case Studies (`case-studies.astro`)

Four full-width **schematic posters**, one per case study. Each follows the same skeleton but the central viz differs.

### 4.1 Skeleton (applies to all four)

```
┌─ Poster ──────────────────────────────────────────────┐
│ /N · CATEGORY TAG               STATUS BADGE          │
│                                                       │
│ Headline                                              │
│ One-line body description.                            │
│                                                       │
│ ╭─ Main viz ─────────────────────╮  ╭─ Stats ───╮     │
│ │                                │  │ Stat 1    │     │
│ │   [content-specific viz]       │  │ Stat 2    │     │
│ │                                │  │ Stat 3    │     │
│ ╰────────────────────────────────╯  ╰───────────╯     │
│                                                       │
│ Stack: BigQuery · Python · GSC API · GA4              │
│                                                       │
│ Evidence on request →                                 │
└───────────────────────────────────────────────────────┘
```

### 4.2 Poster 1 · Forecasting

Main viz: historical line, forecast dashed line, confidence band, "now" vertical marker, x-axis labelled by month, y-axis with ticks. Animated path draw-in.

Right gutter stats: MAPE label · R² label · runs/month.

### 4.3 Poster 2 · Sentiment monitoring

Main viz: stacked area "river" (positive · neutral · negative) over 12 months, two annotation flags. Areas fade in bottom-to-top on scroll-in.

Right gutter stats: surfaces tracked · alerts/week · sources.

### 4.4 Poster 3 · AI visibility

Main viz: split panel SERP vs AI Overviews with animated migration arrow + 12-month timeline scrubber underneath.

Right gutter stats: queries tracked · platforms · weekly snapshots.

### 4.5 Poster 4 · Reporting automation

Main viz: **before/after timeline split**.

- Top bar: "Manual" — long horizontal bar broken into sub-steps (gather, clean, build, review, send), each step labelled with minutes, total time at the right end. Bar fills left-to-right.
- Bottom bar: "Automated" — short bar with one block "review", labelled with minutes, total at the right.
- Vertical "vs" mark between them.

Right gutter stats: reports/month · time saved · variance flags.

### 4.6 Evidence bento

**Replace** with a **case-file folder** mockup. SVG illustration of a manila folder with four documents fanned out, each labelled (Evidence index · Recognition · Publications · Testimonials). Hovering a document brings it forward and rotates it slightly upright.

---

## 5 · Evidence page (`evidence.astro`)

### 5.1 Header

**Add** an "audit-trail" stamp block on the right: archive number, last-updated date as a rubber-stamp circle, custodian field as a typed memo line. Border = dashed archive-box outline.

### 5.2 Each of the four blocks

**Replace** the 2-card grid with a **ledger / register table**.

Columns:

| Source | Type | Status | Access |
|---|---|---|---|
| Senior Digital Analyst at 8MS | Employment record | Primary | On request |
| Case studies + approved outputs | Approved screenshots · diagrams | Strong | On request |

- Status uses real status pills (existing colours: primary green, strong terra, support ochre, in-progress coral).
- Row hover lightens background, expands a small inline detail row beneath the row.
- Click "Access" → mailto link or page link.
- Block heading + lede sit above the table as before.

---

## 6 · Publications (`publications.astro`)

### 6.1 Counter

Same **radial dial treatment** as home metric strip.

### 6.2 Cointelegraph + AlphaWire lists

**Replace** the plain row list with a **horizontal time-scrubber**.

- Year axis at the top (e.g. 2022 → 2026), tick marks for each quarter.
- Each article = a small dot positioned on the axis by publish date, coloured by outlet (terra = Cointelegraph, ochre = AlphaWire).
- Hovering a dot raises a small tooltip card with title + outlet + format.
- Clicking opens the article.
- Below the scrubber: the existing list view as a fallback / detailed view. List items animate to highlight when their corresponding dot is hovered.

### 6.3 Archive card

**Replace** with a **microfilm reel** illustration.

- SVG: two reels connected by a tape, slight rotation animation on the reels.
- Centre plate stamped with "COINTELEGRAPH · ARCHIVE · 2022-2024".
- CTA underneath: "Retrieve PDF →".

---

## 7 · Recognition (`recognition.astro`)

### 7.1 Three signal cards — three distinct artifacts

**Card 1 · Publications → magazine cover**

- Aspect ratio 3:4 portrait.
- Top: "COINTELEGRAPH" masthead in serif caps.
- Below: a feature-article title typeset like a cover headline ("Crypto-security after quantum: rebuilding wallet trust").
- Bottom: issue number / month stamp.

**Card 2 · Expert source → newspaper clipping**

- Aspect ratio 4:3 landscape.
- Two-column layout, serif body type, paper-grain background.
- Masthead "CCN" with section "Markets · AI".
- Pull-quote in the middle in large italic.
- Dog-eared corner.

**Card 3 · Peer review → certificate**

- Square aspect.
- Embossed border, centre text "Certificate of Review · IGI Global", three titles listed, three wax-seal SVG marks at the bottom for each completed review.

### 7.2 Quotes — newspaper column

**Replace** the two plain quote boxes with a **two-column newspaper layout**:

- Masthead at the top "CCN · MARKETS DESK".
- Two columns of newspaper-style text with the quotes inside, column rules between, drop caps for each quote.
- Date / archive number in the footer.

### 7.3 Peer review record — certificate scroll

**Replace** the two panels with a single **embossed certificate scroll**.

- Decorative serif border.
- Heading: "Chapter Review Record · IGI Global · 2022 to 2023".
- Three review titles as line items, each with a small wax-seal stamp and date.
- Signature line at the bottom (illustrative).

---

## 8 · Labs (`labs.astro`)

### 8.1 LedgerTouch — blueprint sheet

**Replace** the long card with a **technical drawing aesthetic**:

- Background: very subtle blueprint grid (cyan-white tinted).
- Title block in the bottom-right corner like a real engineering drawing: project · version · status · drawn-by · date.
- Main area: a schematic showing system modules with dimension lines, arrows, leader lines, callouts.
- Version stamp top-right: "v0.1-alpha · in dev · 2026".

### 8.2 GTM audit + Consent audit — schematic wireframes

Same blueprint family, smaller. Each shows a system-architecture diagram with labelled subsystems (containers, audit nodes, validators). Status overlay: "design partner sought" badge.

---

## 9 · Testimonials (`testimonials.astro`)

**Replace** four similar quote cards with four **distinct authentic-medium artifacts**:

### 9.1 BBC — printed email screenshot

Mock email client UI: header strip with redacted From / To / Subject, body containing the verbatim quote, paper-print drop shadow.

### 9.2 General Mills — letterhead memo

Letterhead with mock company crest at top, "INTEROFFICE" stamp, memo header (To / From / Re / Date), quote as the body.

### 9.3 Diligent Pharma — Slack-style chat bubble

Single chat bubble with avatar circle, name + role above, timestamp on the right, bubble containing the quote.

### 9.4 MRI Management — handwritten notebook note

Notebook page background (subtle ruled lines), Caveat font for the quote (already loaded), torn paper edge at the bottom.

---

## 10 · Press (`press.astro`)

### 10.1 Bios — press-kit panels

Each bio in a **typewriter-style box**:

- Monospace font for the bio text itself (currently serif; change for press-kit feel).
- Above the bio: label strip with section name + word count meter.
- Below: a "copy" button that animates to "copied ✓" with checkmark on click.

### 10.2 Fact sheet — index card

- Rounded corners, slight rotation.
- Top edge: perforated illusion (small dotted line).
- Body: monospace `LABEL : value` rows, aligned with a thin column rule.

### 10.3 Expert topics — weighted tag cloud

- Chips sized by experience-depth tier (heavy / medium / light).
- Heavy tier: larger font, terra colour.
- Medium: medium font, ochre colour.
- Light: smaller font, neutral.
- Click filters a list of related press assets below (asset cards remain).

### 10.4 Assets — control-board row

Existing cards stay; restyle as monospace label : value rows in a single tighter board.

---

## 11 · Open Source (`open-source.astro`)

**Repo grid** becomes **GitHub-style repo plates**:

- Repo name in mono caps.
- Below: short description.
- Bar: language colour bar + language name (e.g. "● Python").
- Mini contribution graph (sparkline): 12-month bar chart, 12 small bars representing commits-per-month (mock data acceptable since GitHub API isn't wired).
- Chips: stars · forks · last commit.
- Hover: card lifts, sparkline brightens.

---

## 12 · Contact (`contact.astro`)

### 12.1 Form

- **Floating labels** on every input. Label sits inside the input as placeholder, floats up on focus.
- Animated underline (no full border) that grows from left when focus lands.
- **Send button** morphs on submit: text fades to a paper-plane SVG that flies up-and-out.
- **Success state** stamped: "RECEIVED · 14 May 2026" in a rotated rubber-stamp graphic.

### 12.2 Side panel — status board

A single vertical panel (replacing 4 separate cards):

- Top: "STATUS" header with live time (UK local), refresh indicator dot.
- Rows: `OPEN     | 2026 conversations`, `INBOX    | tayyabyaqoob.1@gmail.com`, `LINKED   | linkedin.com/in/tayyubyaqoob`, `CODE     | github.com/tayyub-ai`, `EVIDENCE | /evidence`.
- Each row uses mono `LABEL : value` style.

---

## 13 · Cross-cutting

### 13.1 Page headers

The existing `PageHeader` component is fine but uniform. **Add** a thin animated meta-strip beneath the title showing breadcrumbs + estimated-read-time (mono, light) + last-updated (auto stamp). Gives every page a magazine-article feel.

### 13.2 Footer

Currently dense. **Restructure** into:
- Left third: tagline + a small monogram seal SVG.
- Middle third: pages list (existing).
- Right third: "next available" status block (live time + open status).

### 13.3 Side rail

Already mounted. **Enhance** by adding section names that briefly appear on hover with a small tooltip and section progress percentage.

### 13.4 Page transitions

When clicking an internal link, fade-and-slide the current main content out before navigation (200 ms). Astro doesn't have built-in transitions, but a simple `pagehide`/`load` opacity swap is fine.

---

## 14 · Implementation order (this session)

The user approved "Build everything now". Order of work:

1. **Home page** — hero console, marquee + industry bar, radial dials, network graph, three posters, envelope CTA.
2. **Case Studies** — four posters + case-file bento.
3. **Evidence** — audit-trail header + ledger tables ×4.
4. **About** — passport ID + venn + bookshelf + notebook.
5. **Publications** — radial dials + time-scrubber + microfilm reel.
6. **Recognition** — magazine cover + newspaper column + certificate.
7. **Testimonials** — four artifacts.
8. **Labs** — blueprint sheets.
9. **Press** — press-kit panels + index card + tag cloud.
10. **Open Source** — repo plates.
11. **Contact** — floating-label form + status board.
12. **Cross-cutting** — header meta-strip, footer restructure, rail enhancement, page transitions.
13. **Build + verify.** No dashes regressed. All 11 pages render. Reduced-motion honoured.

---

## 15 · Definition of done (per section)

- Visualization fits its content (not a generic card).
- At least one purposeful animation that reveals information.
- Mobile layout tested in mental model (graceful degradation).
- Reduced-motion fallback in place.
- No new dependencies.
- No em / en dashes introduced.
- No banned phrases (`evidence pack`, `core thesis`, `flagship`, etc.).
- Build passes.

End of spec.
