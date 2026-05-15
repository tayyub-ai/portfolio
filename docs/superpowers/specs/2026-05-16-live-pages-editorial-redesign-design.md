# Live Pages Editorial Redesign Spec

Date: 2026-05-16
Project: Portfolio live-route visualization redesign
Scope: `/`, `/about`, `/case-studies`, `/publications`, `/labs`, `/contact`

## 1. Goal

Redesign the live pages so they no longer read like a collection of similar cards. The shared brand system stays intact: warm editorial palette, Instrument Serif, Inter, JetBrains Mono, restrained motion, and no new dependencies.

The new standard is content-specific presentation. Each page should use a visual form that matches its job:

- home: public proof and orientation
- about: identity and operating method
- case studies: production evidence
- publications: authored record and external validation
- labs: honest R&D documentation
- contact: direct correspondence

## 2. Non-goals

- No redesign work on redirect-only routes.
- No homepage rewrite beyond the proof surfaces that still feel generic.
- No new JavaScript libraries, charting packages, or remote design systems.
- No fabricated proof, placeholder GitHub metrics, or invented repository activity.

## 3. Design Principles

1. Replace generic cards with artifacts.
   Content should appear as posters, ledgers, schematics, registers, notebooks, or correspondence sheets where appropriate.

2. One dominant visual idea per section.
   Each section gets one clear presentation metaphor and one clear takeaway.

3. Keep the site premium through restraint.
   The redesign should feel more authored, not more crowded.

4. Motion must explain.
   Animations should draw attention to sequence, relationship, or activity. If motion is ornamental only, remove it.

5. Mobile is first-class.
   Desktop compositions may be richer, but every artifact must collapse cleanly to a readable vertical flow.

## 4. Route Inventory

Live content routes confirmed on 2026-05-16:

- `/`
- `/about`
- `/case-studies`
- `/publications`
- `/labs`
- `/contact`

Redirect-only routes confirmed on 2026-05-16 and excluded from redesign:

- `/products`
- `/research`
- `/testimonials`
- `/recognition`
- `/receipts`
- `/evidence`
- `/open-source`
- `/systems`
- `/press`

## 5. Shared System Rules

### 5.1 Brand system

- Preserve the current warm editorial palette and existing typographic stack.
- Preserve the site-level spacing rhythm and overall shell so the redesign feels like an evolution, not a different brand.
- Avoid turning every page into a separate theme. Variety comes from structure, not from unrelated colors.

### 5.2 Layout language

- Default away from boxed cards.
- Prefer broad surfaces, ruled dividers, split layouts, notes rails, ledgers, and posters.
- Use borders and texture sparingly. If a section still feels premium after removing a shadow, that is a good sign.

### 5.3 Motion language

- Use intersection-triggered reveals, SVG path draws, contribution-cell activation, subtle hover lifts, and selective depth.
- Respect `prefers-reduced-motion`.
- No heavy parallax, autoplay gimmicks, or animation that delays readability.

### 5.4 Implementation constraints

- Astro page files remain the main implementation surface.
- Use inline SVG, scoped page CSS, and existing global utilities.
- No external APIs at runtime if the same data can be precomputed or stored locally.
- GitHub contribution data for the homepage must be sourced from the real public contribution view for `tayyub-ai`.

## 6. Homepage

### 6.1 Intent

Keep the homepage structure largely intact and improve the proof surfaces that still feel generic.

### 6.2 GitHub proof surface

Replace the generic GitHub block with a real contribution ledger based on the public `tayyub-ai` contribution surface.

Verified source on 2026-05-16:

- source: `https://github.com/users/tayyub-ai/contributions`
- displayed total: `1,005 contributions in the last year`
- contribution type visible: `100% commits`
- visible range: `May 11, 2025` to `May 15, 2026`
- visible active repos include `portfolio`, `ai-tools`, `free-online-games`, and four additional repositories shown in the public contribution list

### 6.3 Homepage treatment

The contribution section should include:

- the real yearly contribution count as the headline proof number
- a custom-styled contribution heat grid that matches the editorial system
- a compact repo-activity strip or list derived from real visible repositories
- a mono date-range note so the proof is explicit

The section should feel like a public activity record, not a decorative widget.

## 7. About Page

### 7.1 Intent

Make the page feel like a curated identity dossier instead of a left card plus right content stack.

### 7.2 Profile artifact

Replace the current sticky profile card with an archive ID panel or press-pass-style profile artifact:

- photo remains important
- metadata becomes more deliberate and archival
- identity details should feel stamped, indexed, and reviewed rather than boxed

### 7.3 Skill overlap

Add a three-circle overlap diagram for:

- AI
- Automation
- Measurement

Each overlap gets a short, real domain label tied to actual work.

### 7.4 Credentials

Replace equal-sized credential cards with a bookshelf or spine-like arrangement:

- stronger hierarchy
- less dashboard feel
- each credential still readable and clickable if needed

### 7.5 Principles

Replace the simple four-up layout with a field-notes treatment:

- ruled or notebook-like structure
- editorial annotations or margin notes
- principles remain concise and legible

### 7.6 Press memo

Keep the press content but restyle it as a memo or attached note rather than another rectangle in the stack.

## 8. Case Studies Page

### 8.1 Intent

Elevate the existing case studies from large cards into evidence posters.

### 8.2 Poster system

Each case study becomes a full-width landscape poster with:

- large left visual plane
- narrow right evidence gutter
- one dominant visualization
- restrained tags and supporting metrics

### 8.3 Study-specific visuals

Keep the current strong distinctions and push them further:

- forecasting: forecast line with confidence band
- sentiment monitoring: river or stacked-area signal
- AI visibility: split panel comparing search and AI surfaces
- reporting automation: manual vs automated assembly bars

### 8.4 Evidence tone

Testimonials, stack labels, and stats should feel secondary to the main proof surface. They support the poster; they should not compete with it.

## 9. Publications Page

### 9.1 Intent

Make the page read like an authored record, not a tiled article grid.

### 9.2 Authored work

Replace article cards with a publication timeline or stepped editorial track:

- clear chronology
- strong outlet and theme labeling
- easier scanning across years and topics

### 9.3 Expert citations

Restyle the CCN citation block as a quote ledger:

- each entry reads like a referenced citation record
- quote hierarchy remains strong
- external link affordance stays obvious

### 9.4 Peer review

Restyle IGI Global work as a review register:

- cleaner record format
- year and review context easy to scan

### 9.5 Archive continuity

Restyle the archive continuity callout as a bound archive slab or compact record surface, not a promotional card.

## 10. Labs Page

### 10.1 Intent

Keep the technical honesty of the page and lean harder into R&D documentation.

### 10.2 Featured project

The featured project should become a technical board:

- title block
- module map
- notes rail or documentation sidebar
- stronger feeling of an internal working artifact

### 10.3 Supporting modules

Smaller modules should become subsystem sheets rather than sibling cards:

- clearer boundaries
- tighter engineering language
- less brochure styling

### 10.4 Tone

This page must still say "in development" clearly. The goal is credibility, not product hype.

## 11. Contact Page

### 11.1 Intent

Turn the page into a premium correspondence surface rather than a standard styled form.

### 11.2 Main form

Replace the dominant card feeling with a flatter correspondence sheet:

- fields feel integrated into the surface
- labels and dividers do more work than container chrome
- the form still feels direct and easy to complete

### 11.3 Supporting information

Add a response protocol strip or memo area covering:

- what people can contact about
- expected response cadence
- direct-email fallback

### 11.4 Success state

The current success state should feel closer to a stamped receipt or confirmation slip than a generic message banner.

## 12. Implementation Notes

1. Do homepage first only for the GitHub proof surface.
2. Then redesign the live interior routes in this order:
   - about
   - case studies
   - publications
   - labs
   - contact
3. Reuse or refine existing visualizations where they are already strong.
4. Remove old card treatments rather than layering new effects on top of them.
5. Keep copy edits minimal unless a layout change requires a shorter or clearer label.

## 13. Acceptance Criteria

- All six live pages use content-specific presentation instead of repeating the same card pattern.
- The warm editorial theme remains recognizably the same site.
- The homepage GitHub section uses real public contribution data and explicitly states its date window.
- Redirect-only routes remain untouched.
- Mobile layouts remain readable and do not break artifact compositions.
- Reduced-motion users still get complete and legible content.
- No new dependencies are introduced.

## 14. Risks and Guardrails

- Risk: overdesign or clutter.
  Guardrail: each section gets one dominant idea only.

- Risk: pseudo-data visuals that feel fabricated.
  Guardrail: use real data where available and keep illustrative visuals clearly attached to described systems.

- Risk: warmth gets lost in a colder systems aesthetic.
  Guardrail: preserve the existing palette and type stack.

- Risk: better visuals but weaker readability.
  Guardrail: headings, labels, and proof points must still scan quickly on mobile.
