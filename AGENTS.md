# Repository rules

- Content lives only in `content/site.ts`; never hard-code copy in components. Keep interface labels in its `ui` export.
- Never invent metrics, links, testimonials, dates, or technologies; empty means hidden.
- Keep the site static (`output: "export"`), with no trackers, forms, or API routes.
- Do not add front-end frameworks to the skills or project stack lists.
- Before finishing any change, run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
- Keep AA contrast, keyboard access, and `prefers-reduced-motion` support.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
