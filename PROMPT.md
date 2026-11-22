# Codex prompt: build Renish Aryan's portfolio site

> **How to use (for Renish):** make an empty folder, save this file in it as `PROMPT.md`, open the folder in Codex and say: *"Read PROMPT.md completely, then build the site exactly as specified. Follow the workflow in section 11 and give the final report in section 12."* Everything below this line is the prompt.

---

## 0. Mission

Build a **fast, static, single-owner portfolio site** for **Renish Aryan**, a final-year B.Tech CSE (AI & ML) student applying for **applied-AI / LLM / backend engineering internships and roles at startups**. It will be linked from job application forms, so it must make a strong impression within about 60 seconds of skimming by a founder or engineering lead.

The site's job: prove that Renish has **shipped real LLM systems** (agents, retrieval, document pipelines, grounding and evaluation) and can explain the engineering decisions behind them. It is not a design showcase, not a blog, and not a template.

### What makes this site not generic (these are requirements, not suggestions)
1. **Case-study-first.** Two projects get their own pages with a real **architecture diagram**, a **"Key decisions"** section and a **"Limits"** section. Most portfolios show a card and a GitHub link; this one shows how the systems work and where they are weak.
2. **Architecture diagrams are first-class components**, built from data in `content/site.ts` (not screenshots, not images from a generator), with a subtle draw-in animation and a fully accessible text alternative.
3. **Editorial engineering look**: serif display type + monospace labels + one accent colour on near-black, hairline borders, section indices like `01 / WORK`. No template-y gradients.
4. **Evidence rows only appear when real.** Any metric or link that is empty in the content file is not rendered at all.

---

## 1. Audience and tone

- Readers: startup founders, engineering leads, recruiters on a phone between meetings. Mobile is the primary viewport (design at 375 px first, then scale up).
- Tone: plain, specific, understated. Short sentences. Say what was built and how. No hype.
- **Banned words in any copy you write** (microcopy, aria labels, README): passionate, cutting-edge, leverage, seamless, robust, innovative, synergy, "dive into", "world-class", "rockstar", "ninja". Do not rewrite the copy supplied in section 4; use it verbatim.

---

## 2. Non-negotiable rules

1. **Single source of truth:** all text, links and data live in `content/site.ts` (section 4). Components render from it. No copy hard-coded in components except tiny UI labels ("Copy email", "Back to work", "Skip to content").
2. **Never invent anything.** No metrics, user counts, awards, testimonials, "trusted by" logos, dates, job titles, screenshots, quotes or technologies that are not in `content/site.ts`. No lorem ipsum. No "coming soon" placeholders.
3. **Empty means hidden.** If a string is `""` or an array is `[]`, the UI element that would show it is **not rendered** (no empty card, heading, chip, button or divider). This applies to `demo` links, `metrics`, `limits`, `photo`, screenshots.
4. **No stock photos, no illustrations, no AI-generated portraits, no emoji.** A photo appears only if `site.photo` is set.
5. **Never show a phone number.** Email, GitHub, LinkedIn and the resume are the only contact routes.
6. **No contact form, blog, CMS, database, auth, API routes, cookies, analytics or third-party scripts.** Fully static.
7. **No skill-level bars, percentages, star ratings or "proficiency" visuals.**
8. **Do not add sections, pages or features that are not specified.** If you think something is missing, mention it in the final report instead of building it.
9. **Do not list front-end frameworks as skills or project stack** (the site itself is built with Next.js, but that is not a claim about Renish's skills). Do not mention it in the UI except an optional footer line "Built with Next.js, hosted on Vercel."

---

## 3. Stack and repository layout

- **Next.js (latest stable, App Router) + TypeScript (strict) + Tailwind CSS (latest stable).**
- `next.config`: `output: "export"`, `images: { unoptimized: true }`, `trailingSlash: true`.
- Fonts via `next/font/google`, self-hosted at build, Latin subset, `display: "swap"`:
  - Display/headings: **Instrument Serif** (regular + italic)
  - Body/UI: **Inter**
  - Labels/code/chips: **JetBrains Mono**
- Allowed dependencies: `clsx`, and optionally `motion` (the Framer Motion successor) **only if** CSS cannot do it. Prefer CSS + `IntersectionObserver`. **Forbidden:** UI kits (shadcn, MUI, Chakra), GSAP, three.js, particle libraries, icon packs larger than what you use (inline the few SVG icons you need: arrow-up-right, github, linkedin, mail, download, sun, moon, copy, check).
- Use npm. Node LTS.
- Default to **server components**. Client components only for: theme toggle, copy-email button, scroll-reveal wrapper, and the diagram's in-view trigger.

```
app/
  layout.tsx              # fonts, theme script, metadata, skip link, Nav, Footer
  page.tsx                # home
  work/[slug]/page.tsx    # case study (generateStaticParams from content)
  not-found.tsx
  sitemap.ts
  robots.ts
  opengraph-image.tsx     # static 1200x630 (see section 9)
  globals.css             # tokens, base styles
components/
  Nav.tsx  Footer.tsx  ThemeToggle.tsx  Reveal.tsx
  Section.tsx  Chip.tsx  ButtonLink.tsx  CopyEmail.tsx
  home/ Hero.tsx  NowCard.tsx  WorkList.tsx  ProjectRow.tsx  Experience.tsx  About.tsx  Skills.tsx  Contact.tsx
  case/ CaseHeader.tsx  Problem.tsx  Decisions.tsx  Evidence.tsx  Limits.tsx  CaseNav.tsx  SideIndex.tsx
  diagram/ Diagram.tsx  DiagramDesktop.tsx  DiagramStepper.tsx  types.ts
content/site.ts           # single source of truth
lib/seo.ts
public/                   # resume.pdf goes here (Renish adds it), favicon files
AGENTS.md                 # repo rules for future edits (section 10)
README.md                 # section 10
```

---

## 4. Content: `content/site.ts` (create this file exactly, then render only from it)

Strings are final copy. Do not paraphrase. Fields left as `""` or `[]` are intentionally empty (see rule 2.3).

```ts
// content/site.ts
export type NodeKind = "external" | "compute" | "store" | "llm" | "check" | "ui";
export type DiagramNode = { id: string; lane: number; row: number; label: string; sub?: string; kind: NodeKind; step: number };
export type DiagramEdge = { from: string; to: string; label?: string; dashed?: boolean };
export type Diagram = { lanes: string[]; nodes: DiagramNode[]; edges: DiagramEdge[]; summary: string };
export type Project = {
  slug: string; index: string; name: string; tagline: string; period: string; role: string;
  stack: string[]; github: string; demo: string; screenshots: string[];
  highlights: string[]; problem: string; diagram: Diagram;
  decisions: { title: string; body: string }[];
  metrics: { label: string; value: string; note?: string }[];
  limits: string[];
};

export const site = {
  name: "Renish Aryan",
  role: "Applied AI & backend engineer",
  email: "renisharyan2000@gmail.com",
  github: "https://github.com/renish04",
  linkedin: "https://linkedin.com/in/renish-aryan-84600a191",
  resumePath: "/resume.pdf",
  location: "India",
  availability: "Open to AI and backend engineering internships and roles.",
  photo: "", // e.g. "/renish.jpg". Empty = no photo and no placeholder.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Applied AI and backend engineer building LLM agents, retrieval and document-intelligence systems. Clarivo, HindSite, and eight months of production AI at Ywork.ai.",
};

export const hero = {
  lines: ["I build LLM systems that read messy documents,", "find the evidence, and"],
  accent: "act on it.",
  sub: "Final-year CSE (AI & ML) student at VIT Bhopal. I spent eight months shipping production AI at Ywork.ai in London (document pipelines, RAG and agents) and I'm now building Clarivo, an agentic accounts-payable system.",
  now: [
    { label: "Now", value: "Clarivo, an agentic accounts-payable system (final-year capstone)" },
    { label: "Before", value: "AI Engineer Intern, Ywork.ai, London (remote), May 2025 to Jan 2026" },
    { label: "Studying", value: "B.Tech CSE (AI & ML), VIT Bhopal, 2023 to 2027" },
  ],
};

export const experience = [
  {
    company: "Ywork.ai",
    role: "AI Engineer Intern",
    place: "Remote, London, UK",
    period: "May 2025 – January 2026",
    summary: "Production AI features at a London construction-procurement startup.",
    link: {
      label: "Letter of recommendation",
      href: "https://drive.google.com/file/d/1OzsM96pC93TCflCccQSIWgAnD1vsSDOt/view?usp=sharing",
    },
    bullets: [
      "Built document-intelligence pipelines on AWS Lambda combining OCR with LLM-based extraction, converting unstructured construction PDFs (quotes, invoices, spec sheets) into schema-validated JSON for downstream services.",
      "Built a tool-calling folder-management AI agent that reorganizes uploads into a clean hierarchy: embedding files into Weaviate, retrieving related files by similarity, and having an LLM group them by content, filenames and structure; new synced files are placed automatically, and chat corrections are applied via tool calls, retaining context.",
      "Engineered the RAG layer over a multi-tenant Weaviate corpus (chunking, embedding and semantic retrieval) powering a real-time AI chat over client project data.",
      "Integrated the Google Maps API to surface nearby suppliers for a location, letting users shortlist local vendors and request quotations in-platform.",
      "Built event-driven file-ingestion REST APIs in Django (webhook and polling pipelines over AWS S3) keeping cloud files synchronized, and architected OAuth 2.0 authorization in Django REST Framework across 4 cloud providers (Microsoft, Google Drive, OneDrive, Dropbox), handling token refresh and per-provider scope differences.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "clarivo",
    index: "01",
    name: "Clarivo",
    tagline: "Autonomous accounts payable: three-way matching and exception resolution with LLM agents.",
    period: "2026",
    role: "Backend and AI pipeline (team capstone, VIT Bhopal)",
    stack: ["Django REST Framework", "AWS Lambda", "Docker · ECR", "S3", "DynamoDB", "Weaviate", "Gemini", "Tesseract OCR", "Gmail API", "GCP Pub/Sub"],
    github: "https://github.com/renish04/Clarivo",
    demo: "",
    screenshots: [],
    highlights: [
      "Gmail Pub/Sub ingestion, containerized Lambda extraction, hybrid retrieval, then a cited and grounded LLM verdict per invoice.",
      "Grounding layer checks every cited figure against its source; unverified citations are flagged, not trusted.",
      "Event-driven re-evaluation: a new delivery re-opens closed invoices so split-shipment overbills resolve themselves.",
    ],
    problem:
      "Three-way matching compares a purchase order, a goods-received note and an invoice. Detecting a mismatch is routine; resolving it is where the manual work piles up. Clarivo targets mid-market Indian manufacturers and the accounting firms that serve them: it ingests documents from email, finds discrepancies with cited evidence, and closes the explainable ones without a human.",
    diagram: {
      lanes: ["Ingest", "Extract & store", "Index & retrieve", "Reason & verify", "Serve"],
      summary:
        "Invoices arrive by Gmail push notification, land in S3, are extracted by a containerized Lambda, indexed in Weaviate, judged by an LLM with cited evidence, verified by a grounding check, stored as case state, and served through a Django API to a dashboard and copilot. New evidence re-opens closed invoices.",
      nodes: [
        { id: "c1", lane: 0, row: 0, label: "Gmail mailbox watch", sub: "OAuth 2.0", kind: "external", step: 1 },
        { id: "c2", lane: 0, row: 1, label: "Pub/Sub push", sub: "triggers a Django webhook", kind: "external", step: 2 },
        { id: "c3", lane: 1, row: 0, label: "S3", sub: "attachments land here", kind: "store", step: 3 },
        { id: "c4", lane: 1, row: 1, label: "Lambda (container on ECR)", sub: "native PDF parse, or Tesseract OCR for scans", kind: "compute", step: 4 },
        { id: "c5", lane: 1, row: 2, label: "DynamoDB", sub: "extracted text and fields", kind: "store", step: 5 },
        { id: "c6", lane: 2, row: 0, label: "Weaviate", sub: "chunks and embeddings", kind: "store", step: 6 },
        { id: "c7", lane: 2, row: 1, label: "Hybrid search", sub: "BM25 + dense, token-budgeted", kind: "compute", step: 7 },
        { id: "c8", lane: 3, row: 0, label: "LLM verdict", sub: "structured JSON with cited evidence", kind: "llm", step: 8 },
        { id: "c9", lane: 3, row: 1, label: "Grounding check", sub: "every cited figure verified against source", kind: "check", step: 9 },
        { id: "c10", lane: 3, row: 2, label: "Case state", sub: "clean · flagged · auto-resolved · needs info", kind: "store", step: 10 },
        { id: "c11", lane: 4, row: 0, label: "Django REST API", sub: "audit trail", kind: "compute", step: 11 },
        { id: "c12", lane: 4, row: 1, label: "Dashboard + RAG copilot", kind: "ui", step: 12 },
      ],
      edges: [
        { from: "c1", to: "c2" }, { from: "c2", to: "c3" }, { from: "c3", to: "c4" },
        { from: "c4", to: "c5" }, { from: "c4", to: "c6", label: "embed" },
        { from: "c6", to: "c7" }, { from: "c7", to: "c8" }, { from: "c8", to: "c9" },
        { from: "c9", to: "c10" }, { from: "c10", to: "c11" }, { from: "c11", to: "c12" },
        { from: "c10", to: "c7", label: "new PO or delivery re-opens closed invoices", dashed: true },
      ],
    },
    decisions: [
      {
        title: "Reasoning over field matching",
        body: "Field-by-field matching broke on informal and inconsistent documents. Each invoice is now judged by one LLM call over the related purchase orders, delivery notes and earlier invoices, returning a verdict with cited evidence.",
      },
      {
        title: "Grounding stays in code",
        body: "The model never grades itself. A deterministic check confirms each cited figure actually appears in the retrieved source; anything unverified is flagged for review instead of silently trusted.",
      },
      {
        title: "Re-evaluate when evidence changes",
        body: "Early on, an invoice that had been checked once was never looked at again. Now a new order or delivery from the same supplier re-opens matching invoices, so split-shipment overbills resolve themselves when the missing delivery arrives.",
      },
      {
        title: "Containers for OCR",
        body: "Tesseract's binaries do not fit in a Lambda zip package, so extraction ships as a container image on ECR. PDFs with a text layer skip OCR entirely.",
      },
      {
        title: "Test data I had to author",
        body: "I could not find a public dataset that links purchase orders, delivery notes, invoices and payments with planted discrepancies, so I wrote one by hand covering six error classes.",
      },
    ],
    metrics: [
      { label: "Planted discrepancies detected", value: "", note: "Hand-authored test set, six error classes" },
    ],
    limits: [
      "Grounding verifies that cited figures exist in the source; it does not verify the model's conclusion. A wrong inference from correct figures still needs human review.",
      "The evaluation set is hand-authored, so it checks for regressions rather than claiming real-world accuracy.",
    ],
  },
  {
    slug: "hindsite",
    index: "02",
    name: "HindSite",
    tagline: "Semantic search over the pages you actually read, with a two-stage retrieval pipeline.",
    period: "2026",
    role: "Personal project",
    stack: ["FastAPI", "PostgreSQL", "pgvector", "Cohere embeddings", "Cross-encoder reranking", "Chrome extension"],
    github: "https://github.com/renish04/HindSite",
    demo: "",
    screenshots: [],
    highlights: [
      "Engagement-based capture (reading time, scroll depth) indexes only pages actually read.",
      "Two-stage retrieval: pgvector similarity over 1024-dimensional Cohere embeddings, then cross-encoder reranking.",
      "A query router separates semantic search from live tab-switching, by voice or text.",
    ],
    problem:
      "Browser history search matches titles and URLs, but people remember content: \"that ML article from last week\". HindSite indexes the pages you actually read and lets you search them in natural language.",
    diagram: {
      lanes: ["Capture", "Index", "Query"],
      summary:
        "A Chrome extension measures reading time and scroll depth and sends only pages that were actually read to a FastAPI service, which embeds them with Cohere and stores them in PostgreSQL with pgvector. A query router either runs two-stage retrieval (pgvector shortlist, then cross-encoder rerank) or switches to an open tab directly.",
      nodes: [
        { id: "h1", lane: 0, row: 0, label: "Chrome extension", sub: "reading time, scroll depth", kind: "ui", step: 1 },
        { id: "h2", lane: 0, row: 1, label: "Engagement filter", sub: "index only pages actually read", kind: "compute", step: 2 },
        { id: "h3", lane: 1, row: 0, label: "FastAPI ingest", kind: "compute", step: 3 },
        { id: "h4", lane: 1, row: 1, label: "Cohere embeddings", sub: "1024-dimensional", kind: "llm", step: 4 },
        { id: "h5", lane: 1, row: 2, label: "PostgreSQL + pgvector", kind: "store", step: 5 },
        { id: "h6", lane: 2, row: 0, label: "Query router", sub: "semantic search or live tab-switch", kind: "compute", step: 6 },
        { id: "h7", lane: 2, row: 1, label: "Stage 1: similarity", sub: "pgvector shortlist", kind: "compute", step: 7 },
        { id: "h8", lane: 2, row: 2, label: "Stage 2: rerank", sub: "cross-encoder over the shortlist", kind: "compute", step: 8 },
        { id: "h9", lane: 2, row: 3, label: "Result or tab switch", sub: "voice or text", kind: "ui", step: 9 },
      ],
      edges: [
        { from: "h1", to: "h2" }, { from: "h2", to: "h3" }, { from: "h3", to: "h4" }, { from: "h4", to: "h5" },
        { from: "h6", to: "h7" }, { from: "h5", to: "h7", label: "reads" }, { from: "h7", to: "h8" }, { from: "h8", to: "h9" },
        { from: "h6", to: "h9", label: "open-tab path", dashed: true },
      ],
    },
    decisions: [
      {
        title: "Index what was read, not what was visited",
        body: "The extension tracks reading time and scroll depth and only sends pages the user actually engaged with, which keeps noise out of the index.",
      },
      {
        title: "Two stages: recall, then precision",
        body: "A bi-encoder shortlist from pgvector over 1024-dimensional Cohere embeddings is re-scored by a cross-encoder, so the more expensive model only sees a handful of candidates.",
      },
      {
        title: "Route before retrieving",
        body: "A query router decides whether a request is a semantic search or a live tab switch, so switching to an open tab never has to touch the vector index.",
      },
    ],
    metrics: [],
    limits: [],
  },
];

export const skills = [
  { group: "LLMs and retrieval", items: ["LLM agents", "Tool calling", "Structured outputs", "Prompt engineering", "RAG", "Hybrid search", "Semantic search", "Vector embeddings", "Cross-encoder reranking", "LLM evals", "Document intelligence and OCR"] },
  { group: "Backend", items: ["Python", "Django and DRF", "FastAPI", "REST API design", "Event-driven architecture", "Webhooks", "OAuth 2.0", "Multi-tenant systems", "WebSockets"] },
  { group: "Data", items: ["PostgreSQL", "pgvector", "DynamoDB", "Weaviate", "ChromaDB", "SQL"] },
  { group: "Cloud and tooling", items: ["AWS (Lambda, S3, DynamoDB, ECR)", "GCP Pub/Sub", "Docker", "Git"] },
  { group: "Models and frameworks", items: ["LangChain", "Gemini", "OpenAI", "Cohere"] },
];

export const about = {
  text: "I'm a final-year student who spent eight months building production AI features at a London construction-procurement startup. I care about the parts of LLM systems that decide whether they can be trusted: retrieval quality, grounding, evaluation and failure modes, and about backends that stay boring and reliable.",
  education: { school: "VIT Bhopal University", degree: "B.Tech, Computer Science and Engineering (AI & ML)", period: "2023 – 2027", cgpa: "CGPA 8.75 / 10" },
};
```

---

## 5. Pages

### 5.1 Home (`/`), in this order

**Nav** (sticky, height 56 px, translucent bg using `--bg` at 85% with `backdrop-filter: blur(8px)` only if it does not hurt performance; otherwise solid):
- Left: wordmark `Renish Aryan` in the serif display face. Right: links `Work`, `Experience`, `About`, `Contact` (smooth-scroll anchors; on case-study pages they link back to `/#work` etc.), a `Resume` button (outline, download icon, `href={site.resumePath}`, opens in new tab) and the theme toggle.
- Mobile: no hamburger needed; show wordmark + `Resume` + theme toggle only, and let the page scroll. Section links are hidden below 768 px.

**Hero** (left-aligned, never centred):
- Mono eyebrow: `site.role` with a small pulsing dot only if `site.availability` is non-empty, followed by `site.availability` as a single mono line beneath the H1 block (not in the eyebrow).
- H1 from `hero.lines` joined with a line break; `hero.accent` rendered in **italic serif in the accent colour**. Size `clamp(2.5rem, 1.5rem + 4.6vw, 5rem)`, line-height 1.02, letter-spacing -0.01em, max width about 16 words per line cap (`max-w-[18ch]`-style constraint per line is not required; just keep it from running wider than ~900 px).
- Sub paragraph `hero.sub`, muted colour, max width 62ch.
- CTA row: primary button `View selected work` (anchor to `#work`, filled accent), secondary icon-links: GitHub, LinkedIn, Email (each with visible text label on desktop, icon-only with `aria-label` on mobile).
- **NowCard** (desktop: right column; mobile: below CTAs): a bordered card with three mono rows from `hero.now` (`Now`, `Before`, `Studying`), label in muted mono uppercase, value in body text. If `site.photo` is set, show it as a small square (96 px, 10 px radius) at the top of this card; otherwise nothing.
- Background: a very subtle 1 px dot grid (`radial-gradient`, opacity 0.05 dark / 0.06 light) behind the hero only, fading out at the bottom with a mask. No animation on the background.

**01 / WORK** (`id="work"`): `WorkList` renders each `projects[]` as a **full-width row card** (not a thumbnail grid):
- Left column: index (`01`, mono, muted), project name in serif at 40–56 px, tagline, the three `highlights` as a plain list with small accent square bullets, stack as `Chip`s, then actions: `Read the case study` (primary text-link with arrow, `/work/<slug>/`), `GitHub` (external), and `Live demo` only if `demo` is non-empty.
- Right column (desktop only, ≥1024 px): a **miniature of the project's diagram** (non-interactive, decorative, `aria-hidden`, lanes as faint columns, nodes as small rounded rectangles coloured by `kind`, no text labels), drawn by the same `Diagram` data. On hover/focus-within of the card the miniature's edges brighten and the card border turns accent.
- Mobile: single column, miniature omitted.
- If `screenshots` is non-empty (not at launch), show the first screenshot instead of the miniature.

**02 / EXPERIENCE** (`id="experience"`): a vertical timeline with a 1 px line and an accent node. For each entry: company in serif, role and place in body, period in mono on the right (stacked under on mobile), `summary` line, the `link` as a small external text-link with arrow, then the bullets as a plain list (body size, comfortable line length, no truncation, no "read more").

**03 / ABOUT** (`id="about"`): two columns on desktop. Left: `about.text`. Right: education block (`school`, `degree`, `period`, `cgpa`) and, below it, the `Skills` grid: five groups, each with a mono group label and `Chip`s. No bars, no icons per skill.

**04 / CONTACT** (`id="contact"`): large serif line "Let's talk about what you're building." (this is the only new copy allowed; it is final). Below: the email as a very large mono link with a `Copy` button (`CopyEmail`: copies to clipboard, button text switches to `Copied` with a check icon for 2 s, announces via `aria-live="polite"`), then GitHub, LinkedIn and Resume links in a row.

**Footer:** one line, muted mono: `© {year} Renish Aryan` on the left; on the right, `Built with Next.js, hosted on Vercel.` (rule 2.9). `{year}` computed at build time.

### 5.2 Case study (`/work/[slug]/`)

Statically generated for every project via `generateStaticParams`. Unknown slug → `not-found`.

Layout: on ≥1024 px a two-column grid: a **sticky `SideIndex`** (180 px) listing the section anchors present on the page, highlighting the active one via `IntersectionObserver`; the main column is max 760 px wide, except the diagram, which may span wider (up to 1040 px). On mobile there is no side index.

Sections in order (skip any that have no data):
1. **`CaseHeader`**: `← Work` link, mono label `CASE STUDY {index}`, project name (serif, large), tagline, then an "at a glance" definition list: Role, Period, Stack (chips), Links (GitHub, Live demo if set).
2. **Problem**: `problem` text.
3. **Architecture**: the `Diagram` (section 7), followed by the numbered step legend. Caption in mono: `Architecture as built. Dashed lines are feedback paths.`
4. **Key decisions**: each decision as a block: mono number, title in serif, body in body text. No accordions; everything visible.
5. **Evidence**: render only `metrics` entries whose `value` is non-empty, as large mono numbers with label and note. If none have a value, omit the whole section. Do not show an empty state.
6. **Limits**: heading `Where it falls short`, items as a plain list. Omit if empty.
7. **`CaseNav`**: links to the previous and next project (wrap around), plus `Back to work`.

Screenshots (when present in `screenshots`): shown in a bordered, optimized-for-dark figure after the header, lazy-loaded, with width/height attributes to avoid layout shift. Not used at launch.

---

## 6. Visual design system

Define tokens in `globals.css` as CSS variables, expose them to Tailwind (`theme.extend.colors`), and never use raw hex values inside components.

```css
:root {                      /* light */
  --bg: #F7F6F2;  --surface: #FFFFFF;  --line: #DAD8D0;
  --text: #121212;  --muted: #5E5E66;
  --accent: #476900;          /* accent used for text and lines on light */
  --accent-fill: #CFF45C;     /* filled buttons / highlights */
  --accent-ink: #121212;      /* text on accent-fill */
}
:root[data-theme="dark"] {   /* dark */
  --bg: #0B0B0C;  --surface: #121214;  --line: #26262B;
  --text: #ECECE7;  --muted: #9A9AA1;
  --accent: #CFF45C;  --accent-fill: #CFF45C;  --accent-ink: #0B0B0C;
}
```
- **Default theme: dark.** If the user has no saved choice, follow `prefers-color-scheme`. Persist the toggle in `localStorage`. Add a tiny inline script in `<head>` to set `data-theme` before paint (no flash). The toggle is a real `<button aria-pressed>` with an accessible name.
- Verify **WCAG AA (4.5:1)** for all text and 3:1 for UI borders in both themes. If any token fails, adjust the lightness slightly and keep the look. Report the final values.
- **Type:**
  - H1: Instrument Serif, `clamp(2.5rem, 1.5rem + 4.6vw, 5rem)`, 1.02.
  - H2 (section titles) and project names: Instrument Serif, 2.25–3.5 rem.
  - Body: Inter 17 px / 1.65 (16 px on small phones), muted for secondary text.
  - Labels, chips, indices, metadata: JetBrains Mono 12 px, uppercase, `letter-spacing: 0.08em`.
- **Section header pattern:** mono label `01 / WORK` followed by a 1 px `--line` rule that fills the remaining width, then the serif H2 if the section has one.
- **Layout:** content max-width 1120 px, side padding 20 px mobile / 32 px tablet / 40 px desktop. Vertical rhythm: sections 72 px apart on mobile, 120 px on desktop.
- **Surfaces:** 1 px borders in `--line`, radius 10 px for cards, 6 px for chips and buttons. **No box-shadows**, no glassmorphism, no gradient orbs, no gradient text.
- **Chips:** mono 12 px, `--line` border, transparent background, 6 px radius, padding 4×8.
- **Buttons:** primary = `--accent-fill` background with `--accent-ink` text; secondary = 1 px `--line` border. Min height 44 px (touch target). Visible `:focus-visible` ring: 2 px `--accent`, 3 px offset.
- **Links:** underlined with `text-underline-offset: 4px`, accent colour on hover, no colour-only distinction.

---

## 7. The `Diagram` component (the centrepiece)

Input: a `Diagram` object from `content/site.ts`. Two renderers, chosen by CSS/container width, both generated from the same data:

**Desktop (≥768 px) `DiagramDesktop`**: an inline `<svg>` with a responsive `viewBox`.
- Each `lane` is a column with a mono header label at the top and a faint vertical band (`--surface`).
- Each node: rounded rect (8 px radius), 1 px stroke coloured by `kind`, fill `--bg`, step number in a small mono badge at the top-left, `label` in Inter 600 14 px, `sub` in Inter 12 px muted (wrap text manually into lines at about 26 characters; do not rely on `foreignObject`). Node size is consistent (e.g. 200×64) so rows align.
- `kind` colours (derive from tokens, keep them restrained; a legend is shown under the diagram):
  - `external` dashed stroke, muted
  - `compute` solid, `--text`
  - `store` solid, `--accent`
  - `llm` solid, accent fill at 12% opacity with `--accent` stroke
  - `check` solid, double outline (inner stroke), `--accent`
  - `ui` solid, `--muted`
- Edges: orthogonal or gently curved paths with arrowheads, 1.25 px, `--muted`; labelled edges show the label in mono 11 px on a small `--bg` pill. `dashed` edges use `stroke-dasharray: 4 4` and are routed so they do not cross node text.
- Layout is computed from `lane` and `row` (lane → x, row → y). Choose spacing so the diagram is readable at 1040 px width with no overlapping text. Compute edge routing in a small pure function; add a unit test or a build-time assertion that no two nodes share the same `lane,row`.
- **Draw-in animation:** when the diagram scrolls into view (once), edges animate `stroke-dashoffset` from full length to 0 over ~900 ms, staggered by edge order, and nodes fade in. Dashed edges fade in instead of drawing. Honour `prefers-reduced-motion` by rendering the final state immediately.
- Hovering or focusing a node (nodes are focusable via an invisible `<a>`/`tabindex=0` group) highlights the node and its connected edges and dims the rest; show the matching step in the legend list.

**Mobile (<768 px) `DiagramStepper`**: the same data as a **vertical numbered stepper**: lane headers as sticky-less mono subheadings, each node as a bordered row with the step number, label and sub, connectors as a 1 px vertical line; edges with labels (especially dashed feedback edges) appear as a small mono note under the source node, e.g. `↺ new PO or delivery re-opens closed invoices`. No horizontal scrolling, no pinch-zoom required.

**Accessibility (both):** the SVG has `role="img"` and `aria-labelledby` pointing to a visually hidden title and `diagram.summary` as the description. The step legend under the diagram is a real `<ol>` containing every node (`label` + `sub`) in step order and is the screen-reader-friendly equivalent; the stepper renderer *is* that list.

**Miniature** (used on the home work rows): the same layout function rendered at small size with no text, `aria-hidden`.

---

## 8. Motion

- `Reveal` wrapper: elements fade in and rise 8 px once when ~15% visible (`IntersectionObserver`, `threshold: 0.15`), 400 ms, ease-out, no stagger longer than 80 ms per item. Apply to section headers, project rows, timeline entries, decision blocks. Content must be fully visible without JS (SSR renders visible; the effect enhances).
- Link hover: underline offset transition only. Button hover: 1 px upward translate is allowed; nothing bounces or scales.
- No typewriter text, no cursor effects, no parallax, no scroll-jacking, no auto-playing anything.
- `@media (prefers-reduced-motion: reduce)`: disable all transitions and the diagram draw-in.

---

## 9. Accessibility, performance, SEO

**Accessibility**
- Semantic landmarks (`header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`), one `h1` per page, logical heading order.
- "Skip to content" link as the first focusable element.
- Visible focus states on everything interactive; every control reachable by keyboard; 44 px minimum touch targets.
- External links: `rel="noopener noreferrer"`, `target="_blank"`, plus a visually hidden "(opens in a new tab)".
- Text must remain usable at 200% zoom and at 320 px width with no horizontal page scroll.
- Run axe-core (via Playwright or similar) on `/`, `/work/clarivo/`, `/work/hindsite/`; zero serious or critical violations.

**Performance**
- Targets on mobile emulation: Lighthouse Performance, Accessibility, Best Practices and SEO all **≥ 95**; CLS 0; no render-blocking third-party requests.
- Minimal client JS: keep the home route's first-load JS lean (aim under ~130 kB gzipped). Fonts self-hosted with `font-display: swap` and `size-adjust` fallbacks (the `next/font` default) to avoid layout shift.
- No images are required at launch. If `site.photo` or screenshots are set, use explicit `width`/`height`, `loading="lazy"` (except above the fold), and modern formats where possible.

**SEO and sharing**
- `metadataBase` from `site.siteUrl`. Title template `%s | Renish Aryan`. Home title: `Renish Aryan | Applied AI & Backend Engineer`. Home description: `site.description`. Case-study pages: title `<Project> case study`, description = the project's `tagline`.
- Canonical URLs, Open Graph and Twitter `summary_large_image` tags.
- `opengraph-image`: a statically generated 1200×630 image (use the Next.js file-convention image with `dynamic = "force-static"`; if that is incompatible with `output: "export"`, generate a PNG at build time with a small script and reference it). Content: `Renish Aryan` in the serif face, `Applied AI & backend engineer` in mono, accent dot, `--bg`/`--text` dark palette. No photos.
- `sitemap.ts` (home + each case study), `robots.ts` (allow all, point to sitemap).
- JSON-LD `Person` on the home page: `name`, `jobTitle` (= `site.role`), `url`, `sameAs` (GitHub, LinkedIn), `email`. Do not include a phone number.
- Favicon: a monogram `RA` (serif, accent on `--bg`), SVG + a 180 px PNG apple-touch icon, generated at build or checked in.

---

## 10. README and AGENTS.md (write both)

**README.md** must contain, in this order, with every shell command **PowerShell-compatible** (no `&&`, no `export`; use `;` or separate lines, and `$env:NAME = "value"` for env vars):
1. What this is (2 lines).
2. **Edit the content:** "All text lives in `content/site.ts`. Empty fields are hidden automatically."
3. **Run locally:** `npm install`, `npm run dev`, open `http://localhost:3000`. Build check: `npm run build` (static export goes to `out/`).
4. **Add the resume:** put the PDF at `public/resume.pdf`.
5. **Add project links/screenshots later:** where to set `demo` and `screenshots`, and where to fill the `metrics` value once measured.
6. **Deploy on Vercel (free):** push the repo to GitHub; in Vercel choose *Add New → Project*, import the repo, keep defaults, deploy; set the environment variable `NEXT_PUBLIC_SITE_URL` to the final `https://` domain and redeploy.
7. **Connect a domain bought at Spaceship (domain only, no hosting plan needed):** in Vercel open the project's *Settings → Domains*, add the apex domain and the `www` version; Vercel then displays the exact DNS records to create. In Spaceship's hPanel open the domain's DNS zone, add the records **exactly as Vercel shows them** (do not hard-code values from this README, they can change), and delete Spaceship's default parking records for the same host names (`@`, `www`) if they conflict. Wait for DNS to propagate; Vercel issues HTTPS automatically. Choose one canonical host and let Vercel redirect the other.
8. Troubleshooting: "Invalid configuration" in Vercel usually means a leftover Spaceship record; propagation can take from minutes to a few hours.

**AGENTS.md** (for future Codex sessions in this repo), short:
- Content lives only in `content/site.ts`; never hard-code copy in components.
- Never invent metrics, links, testimonials, dates or technologies; empty means hidden.
- Keep the site static (`output: "export"`), no trackers, no forms, no API routes.
- Do not add front-end frameworks to the skills or stack lists.
- Before finishing any change: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Keep AA contrast, keyboard access and `prefers-reduced-motion` support.

---

## 11. Workflow (do the phases in order; run the checks after each)

1. **Plan (post it before coding):** a short list of files you will create and any ambiguity you found in this prompt. Do not ask questions; choose the most conservative interpretation and note it in the final report.
2. **Scaffold:** Next.js + TS + Tailwind, `next.config`, fonts, tokens, theme script, layout, skip link, Nav, Footer. Check: `npm run build`.
3. **Content:** create `content/site.ts` exactly as in section 4 (types included).
4. **Home:** Hero, NowCard, WorkList (miniature can be a stub until step 5), Experience, About + Skills, Contact. Check: 375, 768, 1280 px.
5. **Diagram:** `Diagram`, desktop renderer, stepper, miniature, draw-in animation, node highlighting, accessible list. Verify both projects render without overlapping text at 1040, 768 and 375 px.
6. **Case studies:** all sections, side index, case nav.
7. **Polish pass:** SEO, JSON-LD, OG image, sitemap/robots, favicon, 404 page, empty-means-hidden audit (temporarily blank a field to prove the element disappears, then restore it).
8. **Verify:** `npm run lint`, `npx tsc --noEmit`, `npm run build`, then serve `out/` locally and run Playwright screenshots of `/`, `/work/clarivo/`, `/work/hindsite/` at 360, 768 and 1440 px in **both themes**; assert `document.scrollingElement.scrollWidth <= window.innerWidth` at every size; check the browser console for errors; run axe-core; run Lighthouse (mobile) if available. Fix everything you find. Look at the screenshots yourself and fix visual problems (cramped spacing, overlapping diagram text, orphan words in the H1, broken wrapping of long chips).
9. **Docs:** README and AGENTS.md.

---

## 12. Definition of done and final report

Done means all of the following are true:
- `npm run build` succeeds and produces a static export; `lint` and `tsc` are clean.
- No horizontal scroll at 320 to 1920 px; both themes look intentional; keyboard-only navigation works; reduced-motion respected.
- Lighthouse ≥ 95 in all four categories on mobile emulation (or an explanation if a tool was unavailable); axe has no serious/critical issues.
- Nothing in the UI is absent from `content/site.ts`; blanking `demo`, `metrics[].value`, `limits` or `photo` removes the corresponding UI.
- No phone number, no tracker, no form, no stock imagery, no banned words.

**Final report (print this at the end):**
1. Files created, in a tree.
2. Commands run and their results (build, lint, tsc, Lighthouse scores, axe result, overflow check).
3. Final colour tokens after the contrast check.
4. **Open items for Renish** (fields still empty or files missing): `public/resume.pdf`, `demo` links, `metrics[0].value` (the evaluation result, which must come from a real run), optional `screenshots`, optional `photo`, `NEXT_PUBLIC_SITE_URL`.
5. Any interpretation choices you made and anything you think is missing but did not build.
6. The exact commands to run locally, in PowerShell.
