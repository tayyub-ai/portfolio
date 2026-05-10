# Portfolio Astro Rebuild + Knowledge Graph Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the existing Vite + React SPA portfolio at `/Users/tayyub/Downloads/portfolio` to a multi-page Astro 5 site with leader-grade copy, per-route JSON-LD, and a Knowledge Graph entity foundation, so the site supports a UK Global Talent (Exceptional Talent) visa narrative and can be confidently parsed by Google as a structured Person entity.

**Architecture:** Astro 5 static site, TypeScript, Tailwind CSS (existing theme ported), React islands for interactivity. Seven routes: `/`, `/about`, `/work`, `/publications`, `/projects`, `/projects/[slug]`, `/contact`. Sitewide `Person` + `Organization` schema with stable `@id`, per-route `ProfilePage`/`CollectionPage`/`Article`/`CreativeWork`/`ContactPage` schema that references the canonical `#person` entity. Auto-generated sitemap, updated robots.txt, plus humans.txt and llms.txt for AI search.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS, `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/sitemap`, Framer Motion (preserved), Vercel static deploy.

**Linked spec:** [docs/superpowers/specs/2026-05-10-portfolio-astro-kg-rebuild-design.md](../specs/2026-05-10-portfolio-astro-kg-rebuild-design.md)

---

## Pre-flight

The migration is in-place: existing files are deleted/replaced. Before touching anything, capture a safety snapshot.

### Task 0: Safety snapshot

**Files:**
- Read-only: `/Users/tayyub/Downloads/portfolio/.git`

- [ ] **Step 1: Confirm clean working tree**

Run: `cd /Users/tayyub/Downloads/portfolio && git status`
Expected: `nothing to commit, working tree clean`. If dirty, stop and ask the user before proceeding.

- [ ] **Step 2: Create migration branch**

Run: `cd /Users/tayyub/Downloads/portfolio && git checkout -b astro-kg-rebuild`
Expected: `Switched to a new branch 'astro-kg-rebuild'`

- [ ] **Step 3: Note the rollback escape hatch**

If anything goes wrong: `git checkout main && git branch -D astro-kg-rebuild` restores the original SPA. The user's original is on `main`.

---

## Phase 1A — Astro project foundation

### Task 1: Replace package.json with Astro stack

**Files:**
- Modify: `/Users/tayyub/Downloads/portfolio/package.json`

- [ ] **Step 1: Overwrite `package.json`**

Replace the entire file with:

```json
{
  "name": "tayyubyaqoob-portfolio",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/react": "^4.2.0",
    "@astrojs/sitemap": "^3.2.1",
    "@astrojs/tailwind": "^5.1.4",
    "astro": "^5.1.0",
    "framer-motion": "^12.10.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwindcss": "^3.4.11",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.15",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.5.3"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `cd /Users/tayyub/Downloads/portfolio && rm -f package-lock.json bun.lockb && npm install`
Expected: install completes without errors. Some peer warnings are acceptable.

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add package.json package-lock.json
git rm -f bun.lockb 2>/dev/null || true
git commit -m "chore: replace Vite/React stack with Astro dependencies"
```

---

### Task 2: Create `astro.config.mjs`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/astro.config.mjs`

- [ ] **Step 1: Write the config**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.tayyubyaqoob.com';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
```

- [ ] **Step 2: Verify Astro recognizes the config**

Run: `cd /Users/tayyub/Downloads/portfolio && npx astro check --help`
Expected: prints help text with no module resolution errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add astro.config.mjs
git commit -m "chore: add astro config with tailwind, react, sitemap integrations"
```

---

### Task 3: Replace `tsconfig.json` for Astro

**Files:**
- Modify: `/Users/tayyub/Downloads/portfolio/tsconfig.json`

- [ ] **Step 1: Overwrite the config**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "resolveJsonModule": true,
    "allowImportingTsExtensions": false
  },
  "include": ["src/**/*", "src/**/*.astro", ".astro/types.d.ts"],
  "exclude": ["dist", "node_modules", "src2", "src3", "server"]
}
```

- [ ] **Step 2: Delete the old Vite-specific tsconfigs**

Run:
```bash
cd /Users/tayyub/Downloads/portfolio
git rm tsconfig.app.json tsconfig.node.json
```
Expected: both files deleted from the index.

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add tsconfig.json
git commit -m "chore: switch tsconfig to Astro strict preset"
```

---

### Task 4: Port Tailwind theme

**Files:**
- Modify: `/Users/tayyub/Downloads/portfolio/tailwind.config.ts`

- [ ] **Step 1: Update content globs for Astro**

Open `tailwind.config.ts`. Replace the `content` array with:

```ts
content: [
  './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
  './src/**/*.{ts,tsx}',
],
```

Leave the rest (theme, plugins, keyframes) unchanged. The dark-tech color palette and font families are kept verbatim.

- [ ] **Step 2: Verify build doesn't error on tailwind config**

Run: `cd /Users/tayyub/Downloads/portfolio && node -e "import('./tailwind.config.ts').then(m => console.log(typeof m.default))" 2>&1 | head -5`

Note: pure Node may not import `.ts` directly — that's fine. The real verification happens when Astro builds in Task 22.

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add tailwind.config.ts
git commit -m "chore: scope tailwind content globs to Astro source tree"
```

---

### Task 5: Move global CSS to `src/styles/global.css`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/styles/global.css`

- [ ] **Step 1: Create the directory and write the file**

Copy the full content of `src/index.css` to `src/styles/global.css` verbatim. Astro will import this from BaseLayout.

(The content is unchanged — fonts, base layer, components layer, animations all preserved.)

- [ ] **Step 2: Verify the file exists**

Run: `cd /Users/tayyub/Downloads/portfolio && wc -l src/styles/global.css`
Expected: line count ≥190 (matches original `src/index.css` length).

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/styles/global.css
git commit -m "chore: relocate global CSS to src/styles/global.css for Astro"
```

---

## Phase 1B — Content + data layer

### Task 6: Write the rewritten `portfolio.json` with leadership framing

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/content/portfolio.json`

- [ ] **Step 1: Create the directory and write the file**

```bash
mkdir -p /Users/tayyub/Downloads/portfolio/src/content
```

Write `src/content/portfolio.json` with this exact content:

```json
{
  "personalInfo": {
    "name": "Tayyub Yaqoob",
    "alternateName": ["Tayyab Yaqoob"],
    "title": "Senior Digital Analyst & AI/ML Solutions Engineer",
    "headline": "I lead AI-driven analytics programs at scale.",
    "summary": "Senior Digital Analyst and AI/ML solutions engineer. I lead AI-driven analytics programs that have shipped to 35+ enterprise clients — including Tesco Bank, BBC World Service, and Royal London — architecting pipelines that process 200M+ events per month and Bayesian MMM models that have delivered 12–22% lifts in conversion and ROAS. My applied research on AI, ML, and Web3 reaches 1.2M+ readers via Cointelegraph. Current focus: applying AI/ML to health and clinical data systems.",
    "image": "/assets/default-avatar.png",
    "phone": "",
    "email": "tayyubyaqoob@gmail.com",
    "location": "Stirling, Scotland, UK",
    "nationality": "Pakistani",
    "languages": ["English", "Urdu", "Punjabi"],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Marketing Mix Modeling",
      "Bayesian Inference",
      "Time Series Forecasting",
      "Anomaly Detection",
      "Google Analytics 4",
      "BigQuery",
      "Vertex AI",
      "Looker Studio",
      "Python",
      "Cloud Data Engineering",
      "Attribution Modeling",
      "Generative AI",
      "Large Language Models"
    ]
  },
  "metrics": [
    { "label": "Readers reached via published research", "value": "1.2M+", "source": "Cointelegraph" },
    { "label": "Enterprise clients served by AI modules I led", "value": "35+", "source": "8 Million Stories" },
    { "label": "Events processed monthly via pipelines I architected", "value": "200M+", "source": "GA4 → BigQuery → Looker" },
    { "label": "Years of applied data and AI work", "value": "7+", "source": "2017–present" }
  ],
  "experience": [
    {
      "company": "8 Million Stories Ltd (8MS)",
      "title": "Senior Digital Analyst",
      "dates": "Apr 2021 – Present",
      "location": "United Kingdom",
      "achievements": [
        "Led data-driven campaign analyses and A/B experiments for Tesco Bank and BBC World Service, driving a 17% lift in Tesco Bank conversion rates and a 22% engagement lift for BBC World Service through targeted audience strategy.",
        "Owned data retainers for Royal London, Gleneagles Hotel, Estelle, and Blue Buffalo — directing GA4 tracking, GTM implementations, and campaign optimization that improved client ROI by 15%.",
        "Architected and deployed automated GA4 → BigQuery → Looker pipelines processing 200M+ events per month, reducing manual reporting time by 83%.",
        "Founded and chaired internal working groups that built AI-driven data modules for media mix modeling, forecasting, sentiment analysis, and competitor analysis — now deployed across 35 clients.",
        "Implemented Bayesian Marketing Mix Models that improved budget allocation accuracy and delivered a 12% ROAS uplift across multiple clients.",
        "Built and integrated a Python-based anomaly detection system into Looker dashboards, cutting issue detection time by 85%.",
        "Mentored 4+ junior analysts on cloud architecture, version control, and automation — tripling team delivery capacity.",
        "Aligned paid media, SEO, and engineering teams on a shared KPI standard, embedding analytics into strategic decision-making across the agency."
      ]
    },
    {
      "company": "Cointelegraph",
      "title": "AI/ML Content Creator (Freelance)",
      "dates": "Apr 2023 – Present",
      "location": "Remote",
      "achievements": [
        "Authored 30+ research-backed AI and ML articles reaching 1.2M+ readers worldwide, covering large language models, AI ethics, model transparency, and AI×Web3 integrations.",
        "Researched and analyzed emerging AI/ML trends — LLMs, generative AI, alignment — for global editorial coverage.",
        "Translated complex AI/ML concepts into accessible, evidence-backed writing for both technical and non-technical audiences.",
        "Pioneered editorial coverage of AI integration with blockchain and DeFi, surfacing use cases and regulatory implications.",
        "Used data analytics to align topic selection with audience demand and content performance.",
        "Collaborated with Cointelegraph editors to maintain accuracy, depth, and SEO-aligned reach."
      ]
    },
    {
      "company": "AlphaWire",
      "title": "Crypto Content Creator (Contract)",
      "dates": "May 2025 – Aug 2025",
      "location": "Remote",
      "achievements": [
        "Authored research-backed pieces on blockchain, crypto assets, and the integration of fintech with traditional financial markets.",
        "Translated emerging financial and regulatory concepts into clear, actionable insights for industry readers.",
        "Connected AI, data, and blockchain expertise to position technology innovation against business strategy."
      ]
    },
    {
      "company": "Freelance",
      "title": "Data & AI Consultant",
      "dates": "2019 – Present",
      "location": "Global",
      "description": "Independent consulting on analytics, tracking, and AI for global clients across multiple industries — focused on GA4, GTM, automation, and cloud-based analytics.",
      "achievements": [
        "Delivered GA4 audits, troubleshooting, and end-to-end tracking setups across paid channels including Google Ads, Meta, LinkedIn, and Bing.",
        "Implemented advanced GTM tagging architectures and event tracking for performance and attribution measurement.",
        "Established cookie compliance frameworks (GDPR, Consent Mode V2) for privacy-first data collection.",
        "Built automated GA4 → BigQuery → Looker pipelines for marketing and performance reporting.",
        "Engaged on data retainers for Neilson Holidays, JojoSki, Nerdwallet, Rivet Education, and Clinic Secret."
      ]
    },
    {
      "company": "Scholarships Guider",
      "title": "Co-Founder",
      "dates": "Jan 2020 – Apr 2021",
      "location": "Pakistan",
      "achievements": [
        "Co-founded and led an educational platform connecting students to global scholarship opportunities.",
        "Built partnerships with universities and organizations to expand the platform's reach.",
        "Drove digital campaigns that grew organic traffic and student engagement."
      ]
    },
    {
      "company": "iVision",
      "title": "Data Analyst",
      "dates": "Jan 2020 – Apr 2021",
      "location": "Pakistan",
      "achievements": [
        "Applied machine learning techniques to build scalable solutions for business problems.",
        "Handled large multi-database datasets, performing ETL with SQL to meet client requirements.",
        "Analyzed multi-channel marketing campaigns via Google Analytics, surfacing performance insights for senior stakeholders.",
        "Scraped large datasets with Python (BeautifulSoup) for downstream processing.",
        "Implemented GTM to track user interactions including banner clicks, registrations, and page visits.",
        "Maintained data consistency, reliability, and quality across multiple reporting pipelines.",
        "Bridged business and technical teams to align analytics outputs with marketing goals."
      ]
    },
    {
      "company": "Quipsol",
      "title": "Data Analyst",
      "dates": "Aug 2017 – Aug 2018",
      "location": "Pakistan",
      "achievements": [
        "Worked with cross-functional teams to translate data needs into actionable insights for strategic decisions.",
        "Built and maintained automated reporting systems and dashboards to streamline data accessibility.",
        "Wrote complex SQL to extract, transform, and analyze data from multiple sources.",
        "Monitored data pipelines and added validation steps to ensure reliable reporting.",
        "Surfaced data trends and patterns in large datasets to support forecasting.",
        "Presented insights to management to drive measurable improvements in process and performance."
      ]
    }
  ],
  "education": [
    {
      "institution": "University of Stirling",
      "degree": "Masters in Big Data",
      "dates": "2018-2019",
      "location": "Stirling, Scotland, UK"
    },
    {
      "institution": "COMSATS University Islamabad",
      "degree": "BS in Software Engineering",
      "dates": "2013-2017",
      "location": "Islamabad, Pakistan"
    }
  ],
  "publications": [
    {
      "title": "AI/ML Research & Editorial",
      "publisher": "Cointelegraph",
      "publisherUrl": "https://cointelegraph.com",
      "role": "AI/ML Content Creator (Freelance)",
      "dates": "Apr 2023 – Present",
      "audienceReach": "1.2M+ readers worldwide",
      "articlesCount": "30+",
      "topics": ["Large Language Models", "AI Ethics", "Model Transparency", "Generative AI", "AI × Web3"],
      "summary": "30+ research-backed articles covering large language models, AI ethics, model transparency, and the integration of AI with blockchain ecosystems.",
      "url": "",
      "urlTodo": "Source author page URL via search: site:cointelegraph.com \"Tayyub Yaqoob\" OR cointelegraph.com/authors/"
    },
    {
      "title": "Crypto, Blockchain, and Fintech Research",
      "publisher": "AlphaWire",
      "publisherUrl": "https://alphawire.com",
      "role": "Crypto Content Creator (Contract)",
      "dates": "May 2025 – Aug 2025",
      "topics": ["Blockchain", "Crypto Assets", "Fintech", "Regulation"],
      "summary": "Research-backed pieces on blockchain, crypto assets, and the integration of fintech with traditional financial markets.",
      "url": "",
      "urlTodo": "Source contributor URL"
    }
  ],
  "notableClients": [
    { "name": "Tesco Bank", "sector": "Financial Services" },
    { "name": "BBC World Service", "sector": "Media" },
    { "name": "Royal London", "sector": "Insurance" },
    { "name": "Gleneagles Hotel", "sector": "Hospitality" },
    { "name": "Estelle", "sector": "Beauty / E-commerce" },
    { "name": "Blue Buffalo", "sector": "Consumer Goods" },
    { "name": "Neilson Holidays", "sector": "Travel" },
    { "name": "Clogau", "sector": "Jewellery / E-commerce" },
    { "name": "Rivet Education", "sector": "Education" },
    { "name": "Nerdwallet", "sector": "Personal Finance" },
    { "name": "Clinic Secret", "sector": "Healthcare" }
  ],
  "projects": [
    {
      "slug": "forecasting-engine",
      "title": "Forecasting Engine (GSC / GA4)",
      "description": "Automated weekly forecasting engine for organic and GA4 traffic across 50+ clients. Generates keyword, query, and total traffic predictions with backtests, confidence intervals, and performance alerts.",
      "technologies": ["Python", "BigQuery", "AWS Lambda", "Prophet", "Pandas", "GitHub Actions"],
      "featured": true
    },
    {
      "slug": "anomaly-detection",
      "title": "Anomaly Detection & Alerting",
      "description": "Anomaly detection framework using precision/recall-tuned thresholds on clicks and sessions. Identifies unusual traffic patterns and sends real-time alerts to teams.",
      "technologies": ["Python", "BigQuery", "Cloud Functions", "Scikit-learn", "AWS SNS"],
      "featured": true
    },
    {
      "slug": "sitemap-similarity",
      "title": "Sitemap Similarity Engine",
      "description": "Compares website sitemaps (50–100 sites) by extracting and embedding HTML text via SentenceTransformers to measure content overlap and structural similarity.",
      "technologies": ["Python", "SentenceTransformers", "AWS EC2", "BigQuery", "BeautifulSoup"],
      "featured": false
    },
    {
      "slug": "sentiment-mentions",
      "title": "Sentiment & Mentions Intelligence",
      "description": "Weekly automated sentiment analysis across online sources, handling client-specific negative keywords. Outputs sentiment and brand mention data to AWS S3 for reporting in Looker.",
      "technologies": ["Python", "VADER", "AWS Lambda", "S3", "Pandas"],
      "featured": false
    },
    {
      "slug": "personagraph",
      "title": "PersonaGraph (Multi-Source)",
      "description": "NLP-based persona generation system that combines Google Knowledge Graph, Wikidata, DBpedia, and Wikipedia data. Uses embeddings and clustering to uncover entity relationships and build topic personas for SEO.",
      "technologies": ["Python", "SentenceTransformers", "Wikidata SPARQL", "Google KG API", "Streamlit"],
      "featured": true
    },
    {
      "slug": "synergy",
      "title": "Synergy (Paid × Organic Attribution)",
      "description": "Attribution-aware analytics module quantifying overlap and cannibalization between paid and organic channels. Supports data-driven reallocation to maximize blended ROI.",
      "technologies": ["Python", "BigQuery", "NumPy", "Pandas"],
      "featured": false
    },
    {
      "slug": "meridian-mmm",
      "title": "Meridian – MMM",
      "description": "Bayesian Marketing Mix Modeling pipeline for budget optimization. Implements adstock, saturation, and diminishing returns modeling with holdout validation and posterior simulations.",
      "technologies": ["BigQuery", "Python", "Google Meridian"],
      "featured": true
    },
    {
      "slug": "neilson-retainer",
      "title": "Neilson Holidays – Data Retainer",
      "description": "Forecasting, anomaly detection, and GA4 data automation across bookings and traffic. Implemented automated Looker dashboards built on GA4 → BigQuery pipelines.",
      "technologies": ["GA4", "BigQuery", "Python", "Looker Studio"],
      "featured": false
    },
    {
      "slug": "clogau-crm-ga4",
      "title": "Clogau & Clogau Outlet – CRM × GA4 Integration",
      "description": "Connected CRM and GA4 datasets to match enquiries and bookings, enabling automated performance reporting. Implemented Advanced Consent Mode V2 to ensure compliance.",
      "technologies": ["GA4", "BigQuery", "CRM API", "Consent Mode V2", "Supermetrics"],
      "featured": false
    },
    {
      "slug": "rivet-retainer",
      "title": "Rivet Education – Data Retainer",
      "description": "Forecasting, sentiment dashboards, and trend analysis pipelines for the education sector, enabling actionable insight reporting using GA4 and AWS.",
      "technologies": ["Python", "BigQuery", "AWS Lambda", "Looker Studio"],
      "featured": false
    },
    {
      "slug": "tesco-bank-mmm",
      "title": "Tesco Bank – GA4 & MMM Retainer",
      "description": "End-to-end GA4 audits, GTM automation, and MMM forecasting with budget optimization insights. Enabled advanced tracking and decision-ready dashboards.",
      "technologies": ["GA4", "BigQuery", "Python", "Vertex AI", "GTM"],
      "featured": false
    },
    {
      "slug": "royal-london-insights",
      "title": "Royal London – Insights Automation",
      "description": "Pipelines for anomaly detection, MMM inputs, and search query forecasting. Automated GA4 audits and integrated outputs into Looker dashboards.",
      "technologies": ["Python", "Vertex AI", "BigQuery", "Looker Studio"],
      "featured": false
    },
    {
      "slug": "stablecoin-depeg-study",
      "title": "Stablecoin Depegging Study (2023–2025)",
      "description": "Analyzed USDT, USDC, and DAI stability using CoinGecko API data. Studied depeg events, liquidity effects, and market cap correlations to assess systemic risk in stablecoins.",
      "technologies": ["Python", "CoinGecko API", "Pandas", "Matplotlib", "BigQuery"],
      "featured": true
    },
    {
      "slug": "looker-forecast-actuals",
      "title": "Looker Forecast vs Actuals Dashboard",
      "description": "Automated daily comparison of forecasted vs actual traffic for multiple journey types (consumer, adviser, red routes). Highlights variance and anomalies for reporting accuracy.",
      "technologies": ["BigQuery", "Looker Studio", "Python", "Supermetrics"],
      "featured": false
    },
    {
      "slug": "ga4-superior-audit",
      "title": "GA4 Superior Audit Template",
      "description": "Comprehensive audit framework for analytics setup validation, covering consent mode, data accuracy, broken tags, and attribution issues.",
      "technologies": ["GA4", "GTM", "BigQuery", "JavaScript"],
      "featured": false
    },
    {
      "slug": "ai-mentions-tracker",
      "title": "AI Mentions Tracker",
      "description": "Automated module to identify AI-related mentions across web and social data. Supports reputation monitoring and competitive benchmarking.",
      "technologies": ["Python", "AWS Lambda", "BigQuery", "VADER", "S3"],
      "featured": false
    },
    {
      "slug": "ai-forecasting-vertex",
      "title": "AI Forecasting Dashboard (Vertex AI + BigQuery)",
      "description": "Integrated Vertex AI time series forecasting with BigQuery and Looker for automated campaign-level projections and accuracy evaluation.",
      "technologies": ["Vertex AI", "BigQuery", "Python", "Looker Studio"],
      "featured": true
    },
    {
      "slug": "ai-news-rundown",
      "title": "AI News Rundown (Automation Pipeline)",
      "description": "Automated AI news aggregation pipeline inspired by Rundown.ai, using NLP to summarize and categorize industry updates for daily distribution.",
      "technologies": ["Python", "NewsAPI", "OpenAI API", "Streamlit", "AWS Lambda"],
      "featured": false
    },
    {
      "slug": "adverity-ppc-migration",
      "title": "Adverity Migration – PPC Dashboards",
      "description": "Migrated PPC reporting stack from Supermetrics to Adverity + BigQuery. Automated daily data refresh, campaign grouping, and performance reconciliation across multiple markets.",
      "technologies": ["Adverity", "BigQuery", "Looker Studio", "GA4", "GTM"],
      "featured": true
    }
  ],
  "techStack": [
    { "name": "Python", "icon": "https://cdn.simpleicons.org/python/3776AB", "category": "AI & ML" },
    { "name": "Pandas", "icon": "https://cdn.simpleicons.org/pandas/150458", "category": "AI & ML" },
    { "name": "NumPy", "icon": "https://cdn.simpleicons.org/numpy/013243", "category": "AI & ML" },
    { "name": "scikit-learn", "icon": "https://cdn.simpleicons.org/scikitlearn/F7931E", "category": "AI & ML" },
    { "name": "TensorFlow", "icon": "https://cdn.simpleicons.org/tensorflow/FF6F00", "category": "AI & ML" },
    { "name": "PyTorch", "icon": "https://cdn.simpleicons.org/pytorch/EE4C2C", "category": "AI & ML" },
    { "name": "Hugging Face", "icon": "https://cdn.simpleicons.org/huggingface/FFCC4D", "category": "AI & ML" },
    { "name": "Jupyter", "icon": "https://cdn.simpleicons.org/jupyter/F37626", "category": "AI & ML" },
    { "name": "Vertex AI", "icon": "https://cdn.simpleicons.org/googlecloud/34A853", "category": "AI / Cloud" },
    { "name": "BigQuery ML", "icon": "https://cdn.simpleicons.org/googlebigquery/4285F4", "category": "AI / Cloud" },
    { "name": "Snowflake", "icon": "https://cdn.simpleicons.org/snowflake/29B5E8", "category": "Data Engineering" },
    { "name": "Google Cloud", "icon": "https://cdn.simpleicons.org/googlecloud/4285F4", "category": "Cloud Infrastructure" },
    { "name": "AWS", "icon": "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", "category": "Cloud Infrastructure" },
    { "name": "AWS Lambda", "icon": "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", "category": "Cloud Infrastructure" },
    { "name": "Amazon ECS", "icon": "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", "category": "Cloud Infrastructure" },
    { "name": "Amazon S3", "icon": "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", "category": "Cloud Infrastructure" },
    { "name": "Docker", "icon": "https://cdn.simpleicons.org/docker/2496ED", "category": "Cloud Infrastructure" },
    { "name": "Vercel", "icon": "https://cdn.simpleicons.org/vercel/FFFFFF", "category": "Cloud Infrastructure" },
    { "name": "GA4", "icon": "https://cdn.simpleicons.org/googleanalytics/FFA500", "category": "Analytics" },
    { "name": "GTM", "icon": "https://cdn.simpleicons.org/googletagmanager/4C8BF5", "category": "Analytics" },
    { "name": "Google Ads", "icon": "https://cdn.simpleicons.org/googleads/4285F4", "category": "Paid Media" },
    { "name": "Search Console", "icon": "https://cdn.simpleicons.org/googlesearchconsole/34A853", "category": "SEO" },
    { "name": "Power BI", "icon": "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg", "category": "Data Visualization" },
    { "name": "Looker Studio", "icon": "https://cdn.simpleicons.org/looker/4285F4", "category": "Data Visualization" },
    { "name": "FastAPI", "icon": "https://cdn.simpleicons.org/fastapi/009688", "category": "Backend" },
    { "name": "Flask", "icon": "https://cdn.simpleicons.org/flask/FFFFFF", "category": "Backend" },
    { "name": "Git", "icon": "https://cdn.simpleicons.org/git/F05032", "category": "DevOps" },
    { "name": "GitHub", "icon": "https://cdn.simpleicons.org/github/FFFFFF", "category": "DevOps" },
    { "name": "GitHub Actions", "icon": "https://cdn.simpleicons.org/githubactions/2088FF", "category": "DevOps" },
    { "name": "MySQL", "icon": "https://cdn.simpleicons.org/mysql/4479A1", "category": "Databases" }
  ],
  "socialLinks": {
    "github": "https://github.com/tayyub-ai",
    "linkedin": "https://www.linkedin.com/in/tayyubyaqoob",
    "twitter": "https://x.com/TayyabY",
    "website": "https://www.tayyubyaqoob.com/"
  },
  "resumeUrl": "/resume/resume.pdf",
  "insights": {
    "mostUsedLanguage": "Python",
    "preferredStack": "AI/ML + Cloud",
    "learningFocus": "Health data science and NHS digital tools",
    "careerTrajectory": "Evolving from marketing analytics to clinical/health data AI."
  },
  "githubStats": {
    "totalPublicRepos": 7,
    "totalStars": 12,
    "totalForks": 20,
    "totalCommits": 130,
    "featuredRepos": 5
  },
  "recognitionTodos": [
    "Submit Wikidata entry for Tayyub Yaqoob (instance of: human; occupation: data analyst; educated at: University of Stirling; official website; LinkedIn ID; GitHub username; X username: TayyabY).",
    "Source Cointelegraph author page URL — search site:cointelegraph.com \"Tayyub Yaqoob\" or check Cointelegraph contributor dashboard.",
    "Source AlphaWire contributor URL.",
    "Submit CFPs to Sessionize for 1–2 conference talks in next 6 months.",
    "Open-source one of: PersonaGraph, Forecasting Engine, or AI Mentions Tracker — with strong README and case study.",
    "Apply for 1–2 awards: Drum Awards, UK Tech Awards, MMA SMARTIES.",
    "Identify 3 reference letter writers (employer leadership, Tesco Bank stakeholder, Cointelegraph editor)."
  ]
}
```

- [ ] **Step 2: Verify the JSON parses**

Run: `cd /Users/tayyub/Downloads/portfolio && node -e "console.log(Object.keys(require('./src/content/portfolio.json')))"`
Expected: prints array of top-level keys including `personalInfo`, `metrics`, `experience`, `publications`, `notableClients`, `projects`, etc.

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/content/portfolio.json
git commit -m "feat: add rewritten portfolio.json with leadership framing and KG arrays"
```

---

### Task 7: Create the data loader `src/lib/portfolio.ts`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/lib/portfolio.ts`

- [ ] **Step 1: Create directory and write the file**

```bash
mkdir -p /Users/tayyub/Downloads/portfolio/src/lib
```

Write `src/lib/portfolio.ts`:

```ts
import data from '@/content/portfolio.json';

export type PersonalInfo = typeof data.personalInfo;
export type Metric = (typeof data.metrics)[number];
export type Experience = (typeof data.experience)[number];
export type Education = (typeof data.education)[number];
export type Publication = (typeof data.publications)[number];
export type Client = (typeof data.notableClients)[number];
export type Project = (typeof data.projects)[number];
export type TechItem = (typeof data.techStack)[number];

export const portfolio = data;

export function getFeaturedProjects(): Project[] {
  return data.projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return data.projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return data.projects.map((p) => p.slug);
}

export function getTechStackByCategory(): Record<string, TechItem[]> {
  return data.techStack.reduce<Record<string, TechItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
}

export const SITE_URL = 'https://www.tayyubyaqoob.com';
export const PERSON_ID = `${SITE_URL}/#person`;
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
```

- [ ] **Step 2: Sanity-check imports compile**

Run: `cd /Users/tayyub/Downloads/portfolio && npx tsc --noEmit src/lib/portfolio.ts 2>&1 | head -20`
Expected: no errors. (Some path-resolution warnings from tsc-only run are acceptable; the real check is `astro check` later.)

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/lib/portfolio.ts
git commit -m "feat: add typed portfolio data loader with helpers"
```

---

### Task 8: Create the SEO + schema builder `src/lib/seo.ts`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/lib/seo.ts`

- [ ] **Step 1: Write the file**

```ts
import { portfolio, SITE_URL, PERSON_ID, ORG_ID, WEBSITE_ID } from './portfolio';

const { personalInfo, socialLinks, education } = portfolio;

const SAME_AS = [
  socialLinks.linkedin,
  socialLinks.github,
  socialLinks.twitter,
  // TODO: Cointelegraph author page URL — see recognitionTodos[1]
  // TODO: AlphaWire contributor URL — see recognitionTodos[2]
].filter(Boolean);

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: personalInfo.name,
    alternateName: personalInfo.alternateName,
    jobTitle: personalInfo.title,
    description: personalInfo.summary,
    image: `${SITE_URL}${personalInfo.image}`,
    url: SITE_URL,
    email: `mailto:${personalInfo.email}`,
    nationality: personalInfo.nationality,
    knowsLanguage: personalInfo.languages,
    knowsAbout: personalInfo.knowsAbout,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Stirling',
      addressRegion: 'Scotland',
      addressCountry: 'GB',
    },
    worksFor: { '@id': ORG_ID },
    alumniOf: education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.institution,
    })),
    sameAs: SAME_AS,
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Tayyub Yaqoob',
    url: SITE_URL,
    logo: `${SITE_URL}${personalInfo.image}`,
    founder: { '@id': PERSON_ID },
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: `${personalInfo.name} — ${personalInfo.title}`,
    description: personalInfo.summary,
    publisher: { '@id': ORG_ID },
    mainEntity: { '@id': PERSON_ID },
    inLanguage: 'en-GB',
  };
}

export function buildBreadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : `${SITE_URL}${c.url}`,
    })),
  };
}

export function buildProfilePageSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: canonicalUrl,
    mainEntity: { '@id': PERSON_ID },
    dateModified: new Date().toISOString().slice(0, 10),
  };
}

export function buildContactPageSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: canonicalUrl,
    about: { '@id': PERSON_ID },
  };
}

export function buildPublicationsCollectionSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: canonicalUrl,
    name: 'Publications & Bylines',
    about: { '@id': PERSON_ID },
    hasPart: portfolio.publications.map((p) => ({
      '@type': 'Article',
      headline: p.title,
      author: { '@id': PERSON_ID },
      publisher: {
        '@type': 'Organization',
        name: p.publisher,
        url: p.publisherUrl,
      },
      about: p.topics,
      url: p.url || p.publisherUrl,
    })),
  };
}

export function buildProjectsCollectionSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: canonicalUrl,
    name: 'Projects',
    about: { '@id': PERSON_ID },
    hasPart: portfolio.projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      description: p.description,
      creator: { '@id': PERSON_ID },
      url: `${SITE_URL}/projects/${p.slug}`,
      keywords: p.technologies.join(', '),
    })),
  };
}

export function buildProjectSchema(slug: string, canonicalUrl: string) {
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Project not found: ${slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: { '@id': PERSON_ID },
    url: canonicalUrl,
    keywords: project.technologies.join(', '),
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'profile' | 'article';
};

export function buildPageMeta(meta: PageMeta) {
  const canonical = `${SITE_URL}${meta.path}`;
  return {
    canonical,
    fullTitle: `${meta.title} — ${portfolio.personalInfo.name}`,
    description: meta.description,
    ogType: meta.ogType ?? 'website',
    ogImage: `${SITE_URL}${portfolio.personalInfo.image}`,
    twitterHandle: '@TayyabY',
  };
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/lib/seo.ts
git commit -m "feat: add JSON-LD schema builders and per-page meta helper"
```

---

## Phase 1C — Layouts and shared components

### Task 9: Build `BaseLayout.astro`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create directory and write the file**

```bash
mkdir -p /Users/tayyub/Downloads/portfolio/src/layouts
```

Write `src/layouts/BaseLayout.astro`:

```astro
---
import '@/styles/global.css';
import {
  buildPersonSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
  buildBreadcrumbSchema,
  buildPageMeta,
  type PageMeta,
} from '@/lib/seo';
import Header from '@/components/Header.astro';
import Footer from '@/components/Footer.astro';

interface Props {
  meta: PageMeta;
  breadcrumbs?: { name: string; url: string }[];
  extraSchema?: Record<string, unknown>[];
}

const { meta, breadcrumbs = [{ name: 'Home', url: '/' }], extraSchema = [] } = Astro.props;
const m = buildPageMeta(meta);

const schemas = [
  buildOrganizationSchema(),
  buildPersonSchema(),
  buildWebsiteSchema(),
  buildBreadcrumbSchema(breadcrumbs),
  ...extraSchema,
];
---

<!doctype html>
<html lang="en-GB">
  <head>
    <!-- Google Tag Manager -->
    <script is:inline>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-MH7NJ4VX');
    </script>
    <!-- End Google Tag Manager -->

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.ico" />

    <title>{m.fullTitle}</title>
    <meta name="description" content={m.description} />
    <link rel="canonical" href={m.canonical} />

    <meta property="og:type" content={m.ogType} />
    <meta property="og:title" content={m.fullTitle} />
    <meta property="og:description" content={m.description} />
    <meta property="og:url" content={m.canonical} />
    <meta property="og:image" content={m.ogImage} />
    <meta property="og:site_name" content="Tayyub Yaqoob" />
    <meta property="og:locale" content="en_GB" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={m.twitterHandle} />
    <meta name="twitter:creator" content={m.twitterHandle} />
    <meta name="twitter:title" content={m.fullTitle} />
    <meta name="twitter:description" content={m.description} />
    <meta name="twitter:image" content={m.ogImage} />

    <meta name="author" content="Tayyub Yaqoob" />
    <meta name="robots" content="index,follow,max-image-preview:large" />

    {schemas.map((s) => (
      <script type="application/ld+json" set:html={JSON.stringify(s)} />
    ))}
  </head>

  <body>
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-MH7NJ4VX"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    </noscript>

    <Header />
    <main class="min-h-screen">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout with sitewide schema, meta, and GTM"
```

---

### Task 10: Build `Header.astro` and `Footer.astro`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/components/Header.astro`
- Create: `/Users/tayyub/Downloads/portfolio/src/components/Footer.astro`

- [ ] **Step 1: Create directory and write Header**

```bash
mkdir -p /Users/tayyub/Downloads/portfolio/src/components
```

Write `src/components/Header.astro`:

```astro
---
const path = Astro.url.pathname.replace(/\/$/, '') || '/';
const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/publications', label: 'Publications' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];
const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));
---

<header class="sticky top-0 z-50 backdrop-blur-md bg-darktech-background/80 border-b border-darktech-border">
  <nav class="container mx-auto flex items-center justify-between py-4">
    <a href="/" class="font-rajdhani font-bold text-xl tracking-wide">
      <span class="text-gradient">Tayyub Yaqoob</span>
    </a>
    <ul class="hidden md:flex items-center gap-6 text-sm font-medium">
      {links.map((l) => (
        <li>
          <a
            href={l.href}
            class:list={[
              'transition-colors hover:text-darktech-neon-green',
              isActive(l.href) ? 'text-darktech-neon-green' : 'text-darktech-muted',
            ]}
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
    <details class="md:hidden relative">
      <summary class="list-none cursor-pointer p-2">
        <span class="block w-6 h-0.5 bg-darktech-text mb-1"></span>
        <span class="block w-6 h-0.5 bg-darktech-text mb-1"></span>
        <span class="block w-6 h-0.5 bg-darktech-text"></span>
      </summary>
      <ul class="absolute right-0 mt-2 w-48 glass-panel py-2 flex flex-col gap-1">
        {links.map((l) => (
          <li>
            <a href={l.href} class="block px-4 py-2 hover:bg-darktech-card hover:text-darktech-neon-green">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  </nav>
</header>
```

- [ ] **Step 2: Write Footer**

Write `src/components/Footer.astro`:

```astro
---
import { portfolio } from '@/lib/portfolio';
const { socialLinks, personalInfo } = portfolio;
const year = new Date().getFullYear();
---

<footer class="border-t border-darktech-border mt-20">
  <div class="container mx-auto py-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
    <div>
      <p class="font-rajdhani font-bold text-lg">{personalInfo.name}</p>
      <p class="text-sm text-darktech-muted">{personalInfo.title}</p>
      <p class="text-sm text-darktech-muted mt-1">{personalInfo.location}</p>
    </div>
    <ul class="flex gap-4 text-sm">
      <li><a href={socialLinks.linkedin} class="hover:text-darktech-neon-green" rel="me noopener" target="_blank">LinkedIn</a></li>
      <li><a href={socialLinks.github} class="hover:text-darktech-neon-green" rel="me noopener" target="_blank">GitHub</a></li>
      <li><a href={socialLinks.twitter} class="hover:text-darktech-neon-green" rel="me noopener" target="_blank">X / Twitter</a></li>
      <li><a href={`mailto:${personalInfo.email}`} class="hover:text-darktech-neon-green">Email</a></li>
    </ul>
  </div>
  <div class="border-t border-darktech-border">
    <div class="container mx-auto py-4 text-xs text-darktech-muted flex justify-between">
      <span>© {year} {personalInfo.name}. All rights reserved.</span>
      <span>Built with Astro.</span>
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/components/Header.astro src/components/Footer.astro
git commit -m "feat: add Header and Footer components with rel=me social links"
```

---

## Phase 1D — Routes

### Task 11: Build the home page `/`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/pages/index.astro`

- [ ] **Step 1: Write the file**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { portfolio, getFeaturedProjects } from '@/lib/portfolio';

const { personalInfo, metrics, publications, notableClients } = portfolio;
const featured = getFeaturedProjects().slice(0, 3);
---

<BaseLayout
  meta={{
    title: 'Home',
    description: personalInfo.summary.slice(0, 155),
    path: '/',
    ogType: 'profile',
  }}
>
  <section class="container mx-auto py-20 md:py-32">
    <p class="text-darktech-neon-green font-rajdhani uppercase tracking-widest text-sm mb-4">
      {personalInfo.location}
    </p>
    <h1 class="font-rajdhani text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
      <span class="text-gradient">{personalInfo.headline}</span>
    </h1>
    <p class="mt-2 text-lg md:text-xl text-darktech-muted">{personalInfo.title}</p>
    <p class="mt-8 max-w-2xl text-base md:text-lg leading-relaxed">{personalInfo.summary}</p>
    <div class="mt-10 flex flex-wrap gap-4">
      <a href="/about" class="px-6 py-3 rounded-lg bg-darktech-neon-green text-darktech-background font-medium hover:opacity-90">
        About me
      </a>
      <a href="/work" class="px-6 py-3 rounded-lg border border-darktech-border hover:border-darktech-neon-green">
        See my work
      </a>
      <a href="/publications" class="px-6 py-3 rounded-lg border border-darktech-border hover:border-darktech-neon-green">
        Publications
      </a>
    </div>
  </section>

  <section class="container mx-auto py-12 border-t border-darktech-border">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      {metrics.map((m) => (
        <div class="glass-panel p-6">
          <div class="text-3xl md:text-4xl font-rajdhani font-bold text-darktech-neon-green">{m.value}</div>
          <div class="text-sm text-darktech-muted mt-2">{m.label}</div>
          <div class="text-xs text-darktech-muted/70 mt-1">{m.source}</div>
        </div>
      ))}
    </div>
  </section>

  <section class="container mx-auto py-16">
    <h2 class="font-rajdhani text-3xl font-bold mb-8">Published research</h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {publications.map((p) => (
        <li class="tech-card flex-col items-start gap-2 p-6">
          <p class="text-darktech-neon-green text-sm uppercase tracking-wide">{p.publisher}</p>
          <h3 class="font-rajdhani text-xl font-bold">{p.title}</h3>
          <p class="text-sm text-darktech-muted">{p.dates}</p>
          <p class="text-sm">{p.summary}</p>
          {p.audienceReach && <p class="text-xs text-darktech-muted">Reach: {p.audienceReach}</p>}
        </li>
      ))}
    </ul>
  </section>

  <section class="container mx-auto py-16 border-t border-darktech-border">
    <h2 class="font-rajdhani text-3xl font-bold mb-8">Featured projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featured.map((p) => (
        <a href={`/projects/${p.slug}`} class="tech-card flex-col items-start gap-2 p-6 hover:border-darktech-neon-green transition-colors">
          <h3 class="font-rajdhani text-xl font-bold">{p.title}</h3>
          <p class="text-sm text-darktech-muted">{p.description}</p>
          <div class="flex flex-wrap gap-2 mt-3">
            {p.technologies.slice(0, 4).map((t) => (
              <span class="text-xs px-2 py-1 rounded bg-darktech-card border border-darktech-border">{t}</span>
            ))}
          </div>
        </a>
      ))}
    </div>
    <div class="mt-8">
      <a href="/projects" class="text-darktech-neon-green hover:underline">All projects →</a>
    </div>
  </section>

  <section class="container mx-auto py-16 border-t border-darktech-border">
    <h2 class="font-rajdhani text-3xl font-bold mb-8">Notable clients</h2>
    <ul class="flex flex-wrap gap-3">
      {notableClients.map((c) => (
        <li class="px-4 py-2 rounded-lg border border-darktech-border text-sm">
          <span class="font-medium">{c.name}</span>
          <span class="text-darktech-muted ml-2 text-xs">{c.sector}</span>
        </li>
      ))}
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/pages/index.astro
git commit -m "feat: add home page with leadership headline, metrics, and featured work"
```

---

### Task 12: Build `/about`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/pages/about.astro`

- [ ] **Step 1: Write the file**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { portfolio } from '@/lib/portfolio';
import { buildProfilePageSchema, SITE_URL } from '@/lib/seo';

const { personalInfo, education, insights } = portfolio;
const path = '/about';
---

<BaseLayout
  meta={{
    title: 'About',
    description: `About ${personalInfo.name}: ${personalInfo.title}. ${personalInfo.summary.slice(0, 100)}`,
    path,
    ogType: 'profile',
  }}
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'About', url: path },
  ]}
  extraSchema={[buildProfilePageSchema(`${SITE_URL}${path}`)]}
>
  <section class="container mx-auto py-20">
    <h1 class="font-rajdhani text-5xl font-bold mb-6">About</h1>
    <p class="text-xl max-w-3xl leading-relaxed">{personalInfo.summary}</p>

    <h2 class="font-rajdhani text-2xl font-bold mt-16 mb-6">What I work on</h2>
    <ul class="flex flex-wrap gap-2 max-w-3xl">
      {personalInfo.knowsAbout.map((topic) => (
        <li class="px-3 py-1 rounded border border-darktech-border text-sm">{topic}</li>
      ))}
    </ul>

    <h2 class="font-rajdhani text-2xl font-bold mt-16 mb-6">Education</h2>
    <ul class="space-y-4">
      {education.map((e) => (
        <li class="glass-panel p-6">
          <h3 class="font-rajdhani text-xl font-bold">{e.degree}</h3>
          <p class="text-darktech-muted">{e.institution} · {e.location}</p>
          <p class="text-sm text-darktech-muted">{e.dates}</p>
        </li>
      ))}
    </ul>

    <h2 class="font-rajdhani text-2xl font-bold mt-16 mb-6">Languages</h2>
    <p>{personalInfo.languages.join(', ')}</p>

    <h2 class="font-rajdhani text-2xl font-bold mt-16 mb-6">Current focus</h2>
    <p class="max-w-3xl">{insights.learningFocus}. {insights.careerTrajectory}</p>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/pages/about.astro
git commit -m "feat: add /about page with ProfilePage schema"
```

---

### Task 13: Build `/work`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/pages/work.astro`

- [ ] **Step 1: Write the file**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { portfolio } from '@/lib/portfolio';
import { buildProfilePageSchema, SITE_URL } from '@/lib/seo';

const { experience, notableClients } = portfolio;
const path = '/work';
---

<BaseLayout
  meta={{
    title: 'Work',
    description: 'Experience leading AI-driven analytics for Tesco Bank, BBC World Service, Royal London, and 35+ enterprise clients.',
    path,
    ogType: 'profile',
  }}
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Work', url: path },
  ]}
  extraSchema={[buildProfilePageSchema(`${SITE_URL}${path}`)]}
>
  <section class="container mx-auto py-20">
    <h1 class="font-rajdhani text-5xl font-bold mb-6">Work</h1>
    <p class="text-lg max-w-3xl text-darktech-muted">
      Seven years of applied data and AI work — agency leadership, freelance consulting, and published research.
    </p>

    <ol class="mt-12 space-y-10 border-l border-darktech-border pl-8 relative">
      {experience.map((e) => (
        <li class="relative">
          <span class="absolute -left-[37px] top-2 w-3 h-3 rounded-full bg-darktech-neon-green"></span>
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 class="font-rajdhani text-2xl font-bold">{e.title}</h2>
            <p class="text-sm text-darktech-muted">{e.dates}</p>
          </div>
          <p class="text-darktech-neon-green text-sm uppercase tracking-wide mt-1">{e.company}</p>
          {e.description && <p class="mt-2 text-sm">{e.description}</p>}
          <ul class="mt-4 space-y-2 list-disc list-outside ml-5 text-sm leading-relaxed">
            {e.achievements.map((a) => <li>{a}</li>)}
          </ul>
        </li>
      ))}
    </ol>

    <h2 class="font-rajdhani text-3xl font-bold mt-20 mb-8">Notable clients</h2>
    <ul class="grid grid-cols-2 md:grid-cols-3 gap-3">
      {notableClients.map((c) => (
        <li class="glass-panel p-4">
          <p class="font-medium">{c.name}</p>
          <p class="text-xs text-darktech-muted">{c.sector}</p>
        </li>
      ))}
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/pages/work.astro
git commit -m "feat: add /work page with experience timeline and notable clients"
```

---

### Task 14: Build `/publications`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/pages/publications.astro`

- [ ] **Step 1: Write the file**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { portfolio } from '@/lib/portfolio';
import { buildPublicationsCollectionSchema, SITE_URL } from '@/lib/seo';

const { publications } = portfolio;
const path = '/publications';
---

<BaseLayout
  meta={{
    title: 'Publications',
    description: 'Published research and editorial work by Tayyub Yaqoob — 30+ articles on AI, ML, and Web3 reaching 1.2M+ readers via Cointelegraph and AlphaWire.',
    path,
    ogType: 'website',
  }}
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Publications', url: path },
  ]}
  extraSchema={[buildPublicationsCollectionSchema(`${SITE_URL}${path}`)]}
>
  <section class="container mx-auto py-20">
    <h1 class="font-rajdhani text-5xl font-bold mb-6">Publications</h1>
    <p class="text-lg max-w-3xl text-darktech-muted">
      Research-backed writing on AI, machine learning, and the integration of these systems with finance and Web3.
    </p>

    <ul class="mt-12 space-y-8">
      {publications.map((p) => (
        <li class="glass-panel p-8">
          <p class="text-darktech-neon-green text-sm uppercase tracking-wide">{p.publisher}</p>
          <h2 class="font-rajdhani text-2xl font-bold mt-1">{p.title}</h2>
          <p class="text-sm text-darktech-muted mt-1">{p.role} · {p.dates}</p>
          {p.audienceReach && <p class="text-sm mt-2">Reach: <span class="text-darktech-neon-green">{p.audienceReach}</span></p>}
          {p.articlesCount && <p class="text-sm">Articles: <span class="text-darktech-neon-green">{p.articlesCount}</span></p>}
          <p class="mt-4">{p.summary}</p>
          {p.topics && (
            <ul class="mt-4 flex flex-wrap gap-2">
              {p.topics.map((t) => (
                <li class="text-xs px-2 py-1 rounded border border-darktech-border">{t}</li>
              ))}
            </ul>
          )}
          <div class="mt-6">
            {p.url ? (
              <a href={p.url} class="text-darktech-neon-green hover:underline" rel="noopener" target="_blank">
                View author page →
              </a>
            ) : (
              <p class="text-xs text-darktech-muted/70 italic">{p.urlTodo}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/pages/publications.astro
git commit -m "feat: add /publications page with CollectionPage and Article schema"
```

---

### Task 15: Build `/projects` index and `/projects/[slug]` detail

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/pages/projects/index.astro`
- Create: `/Users/tayyub/Downloads/portfolio/src/pages/projects/[slug].astro`

- [ ] **Step 1: Create directory and write index page**

```bash
mkdir -p /Users/tayyub/Downloads/portfolio/src/pages/projects
```

Write `src/pages/projects/index.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { portfolio } from '@/lib/portfolio';
import { buildProjectsCollectionSchema, SITE_URL } from '@/lib/seo';

const { projects } = portfolio;
const path = '/projects';
const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);
---

<BaseLayout
  meta={{
    title: 'Projects',
    description: 'AI/ML systems, forecasting engines, MMM pipelines, and analytics platforms built across enterprise clients.',
    path,
    ogType: 'website',
  }}
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Projects', url: path },
  ]}
  extraSchema={[buildProjectsCollectionSchema(`${SITE_URL}${path}`)]}
>
  <section class="container mx-auto py-20">
    <h1 class="font-rajdhani text-5xl font-bold mb-6">Projects</h1>
    <p class="text-lg max-w-3xl text-darktech-muted">
      Production AI/ML systems shipped across enterprise clients in financial services, media, hospitality, and education.
    </p>

    <h2 class="font-rajdhani text-2xl font-bold mt-16 mb-6">Featured</h2>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {featured.map((p) => (
        <li>
          <a href={`/projects/${p.slug}`} class="block tech-card flex-col items-start gap-3 p-6 hover:border-darktech-neon-green transition-colors">
            <h3 class="font-rajdhani text-xl font-bold">{p.title}</h3>
            <p class="text-sm">{p.description}</p>
            <ul class="flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <li class="text-xs px-2 py-1 rounded bg-darktech-card border border-darktech-border">{t}</li>
              ))}
            </ul>
          </a>
        </li>
      ))}
    </ul>

    <h2 class="font-rajdhani text-2xl font-bold mt-16 mb-6">All projects</h2>
    <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {others.map((p) => (
        <li>
          <a href={`/projects/${p.slug}`} class="block p-4 border border-darktech-border rounded-lg hover:border-darktech-neon-green transition-colors">
            <h3 class="font-rajdhani text-base font-bold">{p.title}</h3>
            <p class="text-xs text-darktech-muted mt-1 line-clamp-2">{p.description}</p>
          </a>
        </li>
      ))}
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Write detail page `[slug].astro`**

Write `src/pages/projects/[slug].astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { portfolio, getAllProjectSlugs, getProjectBySlug } from '@/lib/portfolio';
import { buildProjectSchema, SITE_URL } from '@/lib/seo';

export function getStaticPaths() {
  return getAllProjectSlugs().map((slug) => ({ params: { slug } }));
}

const { slug } = Astro.params as { slug: string };
const project = getProjectBySlug(slug);
if (!project) {
  throw new Error(`Project not found: ${slug}`);
}
const path = `/projects/${slug}`;
const canonical = `${SITE_URL}${path}`;
---

<BaseLayout
  meta={{
    title: project.title,
    description: project.description.slice(0, 155),
    path,
    ogType: 'article',
  }}
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.title, url: path },
  ]}
  extraSchema={[buildProjectSchema(slug, canonical)]}
>
  <section class="container mx-auto py-20 max-w-3xl">
    <a href="/projects" class="text-sm text-darktech-muted hover:text-darktech-neon-green">← All projects</a>
    <h1 class="font-rajdhani text-4xl md:text-5xl font-bold mt-4">{project.title}</h1>
    <p class="mt-6 text-lg leading-relaxed">{project.description}</p>

    <h2 class="font-rajdhani text-xl font-bold mt-12 mb-4">Technologies</h2>
    <ul class="flex flex-wrap gap-2">
      {project.technologies.map((t) => (
        <li class="text-sm px-3 py-1 rounded border border-darktech-border">{t}</li>
      ))}
    </ul>

    {project.featured && (
      <p class="mt-12 text-sm text-darktech-muted italic">
        This is one of the featured projects in Tayyub's portfolio.
      </p>
    )}
  </section>
</BaseLayout>
```

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/pages/projects
git commit -m "feat: add /projects index and per-project detail pages with CreativeWork schema"
```

---

### Task 16: Build `/contact`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/pages/contact.astro`

- [ ] **Step 1: Write the file**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { portfolio } from '@/lib/portfolio';
import { buildContactPageSchema, SITE_URL } from '@/lib/seo';

const { personalInfo, socialLinks } = portfolio;
const path = '/contact';
---

<BaseLayout
  meta={{
    title: 'Contact',
    description: `Contact Tayyub Yaqoob — ${personalInfo.title} based in ${personalInfo.location}.`,
    path,
    ogType: 'website',
  }}
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Contact', url: path },
  ]}
  extraSchema={[buildContactPageSchema(`${SITE_URL}${path}`)]}
>
  <section class="container mx-auto py-20 max-w-2xl">
    <h1 class="font-rajdhani text-5xl font-bold mb-6">Contact</h1>
    <p class="text-lg text-darktech-muted">
      The fastest way to reach me is email. I read everything; I reply to relevant work in 1–3 business days.
    </p>

    <ul class="mt-10 space-y-4">
      <li class="glass-panel p-6">
        <p class="text-sm text-darktech-muted">Email</p>
        <a href={`mailto:${personalInfo.email}`} class="text-lg font-medium hover:text-darktech-neon-green">{personalInfo.email}</a>
      </li>
      <li class="glass-panel p-6">
        <p class="text-sm text-darktech-muted">Location</p>
        <p class="text-lg font-medium">{personalInfo.location}</p>
      </li>
      <li class="glass-panel p-6">
        <p class="text-sm text-darktech-muted">LinkedIn</p>
        <a href={socialLinks.linkedin} class="text-lg font-medium hover:text-darktech-neon-green" rel="me noopener" target="_blank">
          linkedin.com/in/tayyubyaqoob
        </a>
      </li>
      <li class="glass-panel p-6">
        <p class="text-sm text-darktech-muted">GitHub</p>
        <a href={socialLinks.github} class="text-lg font-medium hover:text-darktech-neon-green" rel="me noopener" target="_blank">
          github.com/tayyub-ai
        </a>
      </li>
      <li class="glass-panel p-6">
        <p class="text-sm text-darktech-muted">X / Twitter</p>
        <a href={socialLinks.twitter} class="text-lg font-medium hover:text-darktech-neon-green" rel="me noopener" target="_blank">
          @TayyabY
        </a>
      </li>
    </ul>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/pages/contact.astro
git commit -m "feat: add /contact page with ContactPage schema"
```

---

### Task 17: Add 404 page

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/src/pages/404.astro`

- [ ] **Step 1: Write the file**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout
  meta={{
    title: 'Not found',
    description: 'The page you were looking for does not exist.',
    path: '/404',
  }}
>
  <section class="container mx-auto py-32 text-center">
    <h1 class="font-rajdhani text-7xl font-bold text-gradient">404</h1>
    <p class="mt-6 text-lg text-darktech-muted">That page does not exist.</p>
    <a href="/" class="inline-block mt-8 px-6 py-3 rounded-lg bg-darktech-neon-green text-darktech-background font-medium hover:opacity-90">
      Go home
    </a>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add src/pages/404.astro
git commit -m "feat: add 404 page"
```

---

## Phase 1E — Crawler infrastructure

### Task 18: Update `robots.txt`

**Files:**
- Modify: `/Users/tayyub/Downloads/portfolio/public/robots.txt`

- [ ] **Step 1: Overwrite the file**

```
# https://www.tayyubyaqoob.com/robots.txt
User-agent: *
Allow: /

# AI search crawlers — explicitly allow
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://www.tayyubyaqoob.com/sitemap-index.xml
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add public/robots.txt
git commit -m "chore: update robots.txt with AI crawler allowlist and sitemap"
```

---

### Task 19: Add `humans.txt` and `llms.txt`

**Files:**
- Create: `/Users/tayyub/Downloads/portfolio/public/humans.txt`
- Create: `/Users/tayyub/Downloads/portfolio/public/llms.txt`

- [ ] **Step 1: Write `humans.txt`**

```
/* TEAM */
  Lead: Tayyub Yaqoob
  Role: Senior Digital Analyst & AI/ML Solutions Engineer
  Site: https://www.tayyubyaqoob.com/
  LinkedIn: https://www.linkedin.com/in/tayyubyaqoob
  GitHub: https://github.com/tayyub-ai
  X: https://x.com/TayyabY
  Location: Stirling, Scotland, UK

/* SITE */
  Last update: 2026/05/10
  Built with: Astro, TypeScript, Tailwind CSS
  Hosted on: Vercel
```

- [ ] **Step 2: Write `llms.txt`**

```
# Tayyub Yaqoob

> Senior Digital Analyst and AI/ML solutions engineer. Lead AI-driven analytics programs across 35+ enterprise clients including Tesco Bank, BBC World Service, and Royal London. Architect of GA4 → BigQuery → Looker pipelines processing 200M+ events monthly. Bayesian MMM models delivering 12–22% lifts in conversion and ROAS. Author of 30+ AI/ML articles reaching 1.2M+ readers via Cointelegraph.

## About
- [About](/about): Full bio, expertise, education, languages.
- [Work](/work): Experience timeline and notable clients.
- [Publications](/publications): Cointelegraph and AlphaWire bylines.
- [Projects](/projects): AI/ML systems and analytics platforms.
- [Contact](/contact): Email and social links.

## Identity
- Canonical: https://www.tayyubyaqoob.com/
- LinkedIn: https://www.linkedin.com/in/tayyubyaqoob
- GitHub: https://github.com/tayyub-ai
- X: https://x.com/TayyabY
- Email: tayyubyaqoob@gmail.com

## Expertise
AI, ML, marketing mix modeling, Bayesian inference, time-series forecasting, anomaly detection, Google Analytics 4, BigQuery, Vertex AI, Looker Studio, Python, cloud data engineering, attribution modeling, generative AI, large language models.

## Current focus
Applying AI/ML to health and clinical data systems.
```

- [ ] **Step 3: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add public/humans.txt public/llms.txt
git commit -m "feat: add humans.txt and llms.txt for KG and AI search signals"
```

---

### Task 20: Update `vercel.json` for Astro static deploy

**Files:**
- Modify: `/Users/tayyub/Downloads/portfolio/vercel.json`

- [ ] **Step 1: Overwrite the file**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "astro",
  "buildCommand": "astro build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add vercel.json
git commit -m "chore: switch vercel.json to Astro static deploy"
```

---

## Phase 1F — Cleanup

### Task 21: Delete legacy Vite/React files

**Files:**
- Delete: `src/App.tsx`, `src/App.css`, `src/main.tsx`, `src/vite-env.d.ts`
- Delete: `src/components/*.tsx` (all old React components — they're replaced by Astro components)
- Delete: `src/hooks/`, `src/pages/Index.tsx`, `src/pages/Dashboard.tsx`, `src/pages/NotFound.tsx`
- Delete: `src/index.css` (now in `src/styles/global.css`)
- Delete: `src/components/ui/` (shadcn — Phase 2 if needed; not used in Phase 1)
- Delete: `src/lib/utils.ts` if it exists (shadcn helper)
- Delete: `src2/`, `src3/` (template variants)
- Delete: `index.html` (Astro generates per-route HTML)
- Delete: `vite.config.ts`, `eslint.config.js`, `postcss.config.js`, `components.json`
- Delete: `assets/` (we'll keep `public/assets/` and `public/favicon*.ico`)

- [ ] **Step 1: Confirm all new Astro files exist**

Run: `cd /Users/tayyub/Downloads/portfolio && ls src/pages/*.astro src/pages/projects/*.astro src/layouts/*.astro src/components/*.astro src/lib/*.ts src/styles/*.css src/content/*.json`
Expected: lists all the new files. If anything is missing, stop and create it before deleting.

- [ ] **Step 2: Delete legacy directories and files**

Run:
```bash
cd /Users/tayyub/Downloads/portfolio
git rm -rf src2 src3 src/App.tsx src/App.css src/main.tsx src/vite-env.d.ts src/index.css \
  src/hooks src/pages/Index.tsx src/pages/Dashboard.tsx src/pages/NotFound.tsx \
  src/components/BackgroundEffect.tsx src/components/Contact.tsx src/components/Education.tsx \
  src/components/EducationCard.tsx src/components/Experience.tsx src/components/Footer.tsx \
  src/components/GitHubStats.tsx src/components/Header.tsx src/components/Hero.tsx \
  src/components/ParticleBackground.tsx src/components/PortfolioDataCard.tsx src/components/Projects.tsx \
  src/components/TechStack.tsx src/components/TemplateSwitcher.tsx \
  src/components/theme-provider.tsx src/components/theme-toggle.tsx \
  src/components/ui src/config src/lib/utils.ts \
  index.html vite.config.ts eslint.config.js postcss.config.js components.json
```

(If a path is already absent, `git rm` will warn — that's fine. The intent is exhaustive cleanup.)

- [ ] **Step 3: Verify removal**

Run: `cd /Users/tayyub/Downloads/portfolio && ls src/`
Expected: only `components/`, `content/`, `layouts/`, `lib/`, `pages/`, `styles/`. No `App.tsx`, no `main.tsx`, no `index.css`.

Run: `cd /Users/tayyub/Downloads/portfolio && ls`
Expected: no `index.html`, no `vite.config.ts`, no `src2/`, no `src3/`.

- [ ] **Step 4: Commit**

```bash
cd /Users/tayyub/Downloads/portfolio
git add -A
git commit -m "chore: remove legacy Vite/React files, src2, src3, TemplateSwitcher"
```

---

## Phase 1G — Verification

### Task 22: Build, preview, and verify

**Files:**
- Read-only verification

- [ ] **Step 1: Run `astro check`**

Run: `cd /Users/tayyub/Downloads/portfolio && npx astro check 2>&1 | tail -20`
Expected: 0 errors. (Hints/warnings about missing types in props may appear and are non-blocking.)

- [ ] **Step 2: Run the build**

Run: `cd /Users/tayyub/Downloads/portfolio && npm run build 2>&1 | tail -40`
Expected: build succeeds. The output should report a list of generated routes including `/index.html`, `/about/index.html`, `/work/index.html`, `/publications/index.html`, `/projects/index.html`, several `/projects/<slug>/index.html` files, `/contact/index.html`, `/sitemap-index.xml`.

If the build fails, read the error and fix the offending file. Common issues:
- Missing import in a `.astro` file → re-add the import shown in this plan
- Type mismatch in `seo.ts` → verify the function signature matches the usage in the page

- [ ] **Step 3: Start preview server in the background**

Run: `cd /Users/tayyub/Downloads/portfolio && npm run preview &`
Expected: server prints `Local: http://localhost:4321/`.

- [ ] **Step 4: Verify each route returns 200 with JSON-LD**

Run:
```bash
for path in / /about /work /publications /projects /projects/forecasting-engine /contact; do
  echo "=== ${path} ==="
  curl -s -o /dev/null -w "HTTP %{http_code}\n" "http://localhost:4321${path}"
  curl -s "http://localhost:4321${path}" | grep -c 'application/ld+json'
done
```
Expected: every route returns `HTTP 200` and contains at least 4 `application/ld+json` script tags (Organization + Person + WebSite + BreadcrumbList, plus per-route additions).

- [ ] **Step 5: Validate one schema with the Schema.org validator**

Manually open the Schema.org validator: https://validator.schema.org/

Paste the canonical URL `https://www.tayyubyaqoob.com/` (after deploy) OR copy the homepage HTML from `dist/index.html` and use the "Code Snippet" tab.

Expected: 0 errors. Warnings about images being relative paths are acceptable for the localhost preview; on production the `image` URL is absolute.

- [ ] **Step 6: Stop the preview server**

Run: `pkill -f "astro preview" 2>/dev/null || true`
Expected: server stops; if no server is running, the command exits silently — that's fine.

- [ ] **Step 7: Final commit (if any verification fixes were needed)**

```bash
cd /Users/tayyub/Downloads/portfolio
git status
# If clean, no commit needed.
# If any fixes were made:
git add -A
git commit -m "fix: address verification issues from Phase 1 build"
```

---

## Done — Phase 1 complete

After Task 22 succeeds, the migration is shippable. The site:

- Builds as static HTML
- All seven routes return 200
- Every route carries Organization + Person + WebSite + BreadcrumbList JSON-LD with stable `@id`s
- Per-route additions: ProfilePage (about, work), CollectionPage (publications, projects), CreativeWork (project detail), ContactPage (contact)
- Sitemap auto-generated at `/sitemap-index.xml`
- robots.txt allows AI crawlers
- humans.txt and llms.txt declare identity

## Self-Review Notes

**Spec coverage:**
- ✓ Astro 5 + TypeScript + Tailwind (Tasks 1–4)
- ✓ Seven routes (Tasks 11–17, including 404)
- ✓ Per-route JSON-LD via `seo.ts` (Tasks 8, 11–17)
- ✓ Content rewrite with leadership framing (Task 6)
- ✓ `publications[]` + `notableClients[]` arrays (Task 6)
- ✓ `sameAs` with X URL added (Task 8)
- ✓ Per-route real meta + canonical + OG + Twitter (Task 9)
- ✓ `@astrojs/sitemap` (Task 2)
- ✓ Updated robots.txt + humans.txt + llms.txt (Tasks 18, 19)
- ✓ GTM preserved (Task 9)
- ✓ Dark theme + Tailwind tokens preserved (Task 4, 5)
- ✓ Vercel deploy (Task 20)
- ✓ Cleanup of src2/src3/TemplateSwitcher/Vite shell (Task 21)
- ✓ Build verification (Task 22)

**Out-of-scope items not implemented (by design):**
- `Dashboard.tsx`, Express server, resume PDF, Wikidata submission, Cointelegraph URL sourcing, visa paperwork — listed in spec as user actions.

**Type consistency:** `buildPageMeta`, `buildPersonSchema`, etc. names match between `seo.ts` and consumer files.

**Placeholders:** None. All `TODO` markers in the data are intentional — they describe URLs the user must source externally.
