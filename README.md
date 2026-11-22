# Renish Aryan — portfolio

A static portfolio for Renish Aryan's applied AI and backend engineering work.
The home page introduces the work; Clarivo and HindSite have architecture diagrams and case studies.

## Edit the content

All text lives in `content/site.ts`. Empty fields are hidden automatically.

The supplied portfolio copy is followed by a `ui` object containing interface labels. Components render from these exports. Change the content here rather than in components.

## Run locally

Use Node LTS and npm. The site builds on Node 22.14 or newer; Node 22.19+ also satisfies the optional Lighthouse tooling requirement.

```powershell
npm install
npm run dev
```

Open <http://localhost:3000>.

```powershell
npm run build
```

The static export goes to `out/`. To preview that export, stop the development server first, then run:

```powershell
npm run start
```

## Add the resume

Put the PDF at `public/resume.pdf`. The Resume links already point there. After adding or replacing it, run `npm run build` to copy the PDF into the static export before previewing with `npm run start` or deploying.

Copy the original PDF file with File Explorer or PowerShell `Copy-Item`. Do not paste its contents into a text editor or save it as UTF-8 text; that damages the binary data and causes the browser's “Failed to load PDF document” error.

## Add project links and screenshots later

In `content/site.ts`, set a project's `demo` to its real URL. Put screenshot files in `public/` and add their root-relative paths to that project's `screenshots` array. Images reserve a 1440 × 900 case-study frame and a 640 × 400 preview frame; use that aspect ratio where possible. Set `site.photo` to a root-relative image path only if you want a photo.

Fill Clarivo's `metrics[0].value` only with a result from a real evaluation run. Until then, its entire evidence section stays hidden. HindSite has no metrics or limits supplied; those sections stay hidden too.

## Deploy on Vercel (free)

Push the repository to GitHub. In Vercel, choose **Add New → Project**, import the repository, keep the framework defaults, and deploy.

Set `NEXT_PUBLIC_SITE_URL` to the final `https://` domain in the project's environment variables, then redeploy. This sets canonical URLs, sharing metadata, sitemap URLs, and the JSON-LD URL. Its development fallback is `http://localhost:3000`.

For a local build with the production URL:

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://your-domain.example"
npm run build
```

## Connect a domain bought at Spaceship

Only the domain is needed; no Spaceship hosting plan is required.

In Vercel, open the project's **Settings → Domains**. Add the apex domain and the `www` version. Vercel displays the exact DNS records to create.

In Spaceship's hPanel, open the domain's DNS zone and add the records **exactly as Vercel shows them**. Do not copy fixed DNS values from a guide: they can change. Delete Spaceship's default parking records for the same host names (`@`, `www`) if they conflict with those records.

Wait for DNS to propagate. Vercel issues HTTPS automatically. Choose one canonical host, let Vercel redirect the other, and use the canonical host for `NEXT_PUBLIC_SITE_URL`.

## Troubleshooting

“Invalid configuration” in Vercel usually means a leftover Spaceship record. Propagation can take from minutes to a few hours. Compare the current DNS zone with the exact records Vercel requests.

If port 3000 is occupied, stop the other local server or choose a different port:

```powershell
npm run dev -- --port 3001
```

## Verification

```powershell
npm run lint
npx tsc --noEmit
npm run build
npx playwright install chromium
npm run start
```

Keep that static server running. In another PowerShell terminal:

```powershell
npm run verify
npm run lighthouse
```

`verify` captures all three pages at 360, 768, and 1440 px in both themes, runs axe, and checks overflow at eight widths from 320 to 1920 px. It also checks diagram text bounds, keyboard focus, the skip link, clipboard feedback, theme persistence, the section index, no-JavaScript rendering, runtime requests, contrast, and a 200% zoom equivalent.

Reports and screenshots are written to ignored `test-results/`. Lighthouse runs mobile emulation on all three pages. Its command uses an npm-cached Node 22 runtime so it also works when the system's Node 22 release predates Lighthouse's minimum.

For a different preview address:

```powershell
$env:TEST_URL = "http://localhost:3001"
npm run verify
npm run lighthouse
```

Fonts are self-hosted by `next/font/google` during the build. The local TTF files in `lib/fonts/` are used only to generate the static social image and apple-touch icon; their licenses are included. The favicon is generated from the content and dark palette before each build. Next.js metadata image conventions export PNG files at `/opengraph-image` and `/apple-icon`.
