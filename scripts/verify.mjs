import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const base = process.env.TEST_URL || "http://localhost:3000";
const routes = ["/", "/work/clarivo/", "/work/hindsite/"];
const resultDir = "test-results/final";
await mkdir(resultDir, { recursive: true });
const browser = await chromium.launch();
const report = process.env.VERIFY_RESUME
  ? JSON.parse(await readFile(`${resultDir}/report.json`, "utf8"))
  : { pages: [], interactions: [], errors: [], contrast: [], javascript: 0 };
try {
  if (!process.env.VERIFY_RESUME)
    for (const theme of ["dark", "light"]) {
      const context = await browser.newContext({
        colorScheme: theme,
        reducedMotion: "reduce",
        permissions: ["clipboard-read", "clipboard-write"],
      });
      const page = await context.newPage();
      page.on("pageerror", (error) => report.errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") report.errors.push(message.text());
      });
      const externalRequests = new Set();
      page.on("request", (request) => {
        if (
          !request.url().startsWith(base) &&
          !request.url().startsWith("data:")
        )
          externalRequests.add(request.url());
      });
      for (const route of routes) {
        const name = route === "/" ? "home" : route.split("/")[2];
        for (const width of [320, 360, 375, 768, 1040, 1280, 1440, 1920]) {
          await page.setViewportSize({ width, height: 960 });
          const response = await page.goto(base + route, {
            waitUntil: "networkidle",
          });
          assert.equal(response.status(), 200);
          await page.evaluate(() => document.fonts.ready);
          assert.equal(await page.locator("h1").count(), 1);
          assert.equal(
            await page.locator("html").getAttribute("data-theme"),
            theme,
          );
          const overflow = await page.evaluate(
            () => document.scrollingElement.scrollWidth > innerWidth,
          );
          assert.equal(overflow, false, `${route} ${width} ${theme} overflow`);
          const nodeOverflow = await page
            .locator(".diagram-node[data-node]")
            .evaluateAll((nodes) =>
              nodes
                .filter((node) => {
                  const box = node.querySelector(".node-rect").getBBox();
                  return [...node.querySelectorAll("text")].some((text) => {
                    const r = text.getBBox();
                    return (
                      r.x < 0 ||
                      r.x + r.width > box.width ||
                      r.y + r.height > box.height
                    );
                  });
                })
                .map((node) => node.getAttribute("data-node")),
            );
          assert.deepEqual(nodeOverflow, [], `${route} SVG text exceeds nodes`);
          if ([360, 768, 1440].includes(width)) {
            await page.screenshot({
              path: `${resultDir}/${name}-${width}-${theme}.png`,
              fullPage: true,
            });
            await page.screenshot({
              path: `${resultDir}/${name}-${width}-${theme}-top.png`,
            });
            const axe = await new AxeBuilder({ page }).analyze();
            const violations = axe.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.map((n) => n.target),
            }));
            const serious = violations.filter((v) =>
              ["serious", "critical"].includes(v.impact),
            );
            report.pages.push({
              route,
              width,
              theme,
              overflow,
              axe: violations,
            });
            assert.deepEqual(
              serious,
              [],
              `${route} axe serious/critical: ${JSON.stringify(serious)}`,
            );
            console.log(
              `PASS ${name} ${width} ${theme}; axe ${violations.length}`,
            );
          }
        }
        assert.equal(await page.locator("#evidence").count(), 0);
        assert.equal(
          await page.getByText("Live demo", { exact: true }).count(),
          0,
        );
        if (name === "hindsite")
          assert.equal(await page.locator("#limits").count(), 0);
        if (name === "clarivo")
          assert.equal(await page.locator("#limits").count(), 1);
        assert.equal(
          await page
            .locator('a[target="_blank"]:not([rel="noopener noreferrer"])')
            .count(),
          0,
        );
        assert.equal(await page.locator('form,input[type="tel"]').count(), 0);
      }
      await page.goto(base, { waitUntil: "networkidle" });
      await page.keyboard.press("Tab");
      assert.equal(
        await page.locator(":focus").textContent(),
        "Skip to content",
      );
      await page.keyboard.press("Enter");
      assert.equal(await page.locator(":focus").getAttribute("id"), "main");
      await page
        .getByRole("button", { name: "Copy email", exact: true })
        .click();
      assert.equal(
        await page.evaluate(() => navigator.clipboard.readText()),
        "renisharyan2000@gmail.com",
      );
      assert.equal(await page.getByRole("status").textContent(), "Copied");
      await page.waitForTimeout(2100);
      assert.equal(
        await page
          .getByRole("button", { name: "Copy email", exact: true })
          .textContent(),
        "Copy",
      );
      await page.getByRole("button", { name: "Toggle light theme" }).click();
      const toggled = theme === "dark" ? "light" : "dark";
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        toggled,
      );
      await page.reload({ waitUntil: "networkidle" });
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        toggled,
      );
      report.interactions.push(
        `${theme}: skip link, clipboard and reset, theme persistence passed`,
      );
      assert.deepEqual(
        [...externalRequests],
        [],
        "Runtime third-party requests",
      );
      await context.close();
    }
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage({
    viewport: { width: 1440, height: 960 },
  });
  await page.goto(base + "/work/clarivo/", { waitUntil: "networkidle" });
  await page.locator("#architecture").scrollIntoViewIfNeeded();
  await page.locator('[data-node="c8"]').focus();
  assert.equal(
    await page
      .locator(".diagram-interactive")
      .evaluate((el) => el.classList.contains("has-active-node")),
    true,
  );
  assert.equal(
    await page
      .locator('[data-legend-node="c8"]')
      .evaluate((el) => el.classList.contains("connected")),
    true,
  );
  assert.equal(
    await page
      .locator('[data-node="c8"] .node-rect')
      .evaluate((el) => getComputedStyle(el).strokeWidth),
    "3px",
  );
  await page.screenshot({ path: `${resultDir}/diagram-focus.png` });
  await page.locator("#decisions").evaluate((el) => el.scrollIntoView());
  await page.waitForFunction(
    () =>
      document
        .querySelector('.side-index a[href="#decisions"]')
        ?.getAttribute("aria-current") === "location",
  );
  report.interactions.push(
    "Diagram keyboard highlight, legend match, and active side index passed",
  );
  for (const theme of ["light", "dark"]) {
    await page.evaluate((theme) => {
      document.documentElement.dataset.theme = theme;
    }, theme);
    const tokens = await page.evaluate(() =>
      Object.fromEntries(
        [
          "bg",
          "surface",
          "line",
          "text",
          "muted",
          "accent",
          "accent-fill",
          "accent-ink",
        ].map((name) => [
          name,
          getComputedStyle(document.documentElement)
            .getPropertyValue(`--${name}`)
            .trim(),
        ]),
      ),
    );
    function luminance(hex) {
      let value = hex.slice(1);
      if (value.length === 3) value = [...value].map((c) => c + c).join("");
      const rgb = value
        .match(/../g)
        .map((v) => parseInt(v, 16) / 255)
        .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
      return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    }
    function contrast(a, b) {
      const values = [luminance(tokens[a]), luminance(tokens[b])].sort(
        (x, y) => y - x,
      );
      return (values[0] + 0.05) / (values[1] + 0.05);
    }
    const ratios = {};
    for (const bg of ["bg", "surface"])
      for (const fg of ["text", "muted", "accent", "line"]) {
        const ratio = contrast(fg, bg);
        ratios[`${fg}/${bg}`] = Number(ratio.toFixed(2));
        assert(
          ratio >= (fg === "line" ? 3 : 4.5),
          `${theme} contrast ${fg}/${bg}: ${ratio}`,
        );
      }
    ratios["accent-ink/accent-fill"] = Number(
      contrast("accent-ink", "accent-fill").toFixed(2),
    );
    assert(ratios["accent-ink/accent-fill"] >= 4.5);
    report.contrast.push({ theme, tokens, ratios });
  }
  await page.goto(base + "/missing-page/", { waitUntil: "networkidle" });
  assert.equal(await page.locator("h1").textContent(), "Page not found");
  await context.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  for (const route of routes) {
    await staticPage.goto(base + route);
    assert(await staticPage.locator("h1").isVisible());
    assert(await staticPage.locator("#main").isVisible());
    assert.equal(await staticPage.locator('[style*="opacity: 0"]').count(), 0);
  }
  await noJs.close();
  report.interactions.push("Content remains visible with JavaScript disabled");
  const zoom = await browser.newContext({
    viewport: { width: 640, height: 480 },
    deviceScaleFactor: 2,
  });
  const zoomPage = await zoom.newPage();
  for (const route of routes) {
    await zoomPage.goto(base + route);
    assert.equal(
      await zoomPage.evaluate(
        () => document.scrollingElement.scrollWidth > innerWidth,
      ),
      false,
    );
  }
  await zoom.close();
  report.interactions.push(
    "200% zoom equivalent: 640 CSS pixels at 2x scale passed",
  );
  const jsContext = await browser.newContext();
  const jsPage = await jsContext.newPage();
  const scripts = new Set();
  jsPage.on("request", (request) => {
    if (request.resourceType() === "script")
      scripts.add(new URL(request.url()).pathname);
  });
  await jsPage.goto(base, { waitUntil: "networkidle" });
  for (const script of scripts) {
    const buffer = await readFile(`out${script}`);
    report.javascript += gzipSync(buffer).length;
  }
  await jsContext.close();
  assert.deepEqual(report.errors, [], "Browser console errors");
  console.log(
    `All checks passed. Initial JS: ${(report.javascript / 1024).toFixed(1)} KiB gzip.`,
  );
} finally {
  await writeFile(`${resultDir}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
