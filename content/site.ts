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

// Interface copy specified by the brief; supplied portfolio content above is unchanged.
export const ui = {
  navigation: [{ id: 'work', label: 'Work' }, { id: 'experience', label: 'Experience' }, { id: 'about', label: 'About' }, { id: 'contact', label: 'Contact' }],
  sections: { work: '01 / Work', experience: '02 / Experience', about: '03 / About', contact: '04 / Contact' },
  resume: 'Resume', github: 'GitHub', linkedin: 'LinkedIn', email: 'Email',
  skip: 'Skip to content', newTab: '(opens in a new tab)', navigationLabel: 'Main navigation', theme: 'Toggle light theme',
  viewWork: 'View selected work', readCase: 'Read the case study', demo: 'Live demo',
  contact: "Let's talk about what you're building.", copy: 'Copy', copied: 'Copied', copyEmail: 'Copy email', copyFailed: 'Could not copy. Select the email link to send a message.',
  footer: 'Built with Next.js, hosted on Vercel.',
  caseStudy: 'Case study', role: 'Role', period: 'Period', stack: 'Stack', links: 'Links',
  problem: 'Problem', architecture: 'Architecture', decisions: 'Key decisions', evidence: 'Evidence', limits: 'Where it falls short',
  caption: 'Architecture as built. Dashed lines are feedback paths.', steps: 'Architecture steps', kinds: ['external', 'compute', 'store', 'llm', 'check', 'ui'],
  back: 'Back to work', previous: 'Previous project', next: 'Next project', index: 'On this page',
  homeTitle: 'Renish Aryan | Applied AI & Backend Engineer', caseTitle: 'case study', monogram: 'RA',
  notFound: { code: '404', title: 'Page not found' },
};
