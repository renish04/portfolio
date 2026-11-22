import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.TEST_URL || "http://localhost:3000";
const dir = "test-results/lighthouse";
await mkdir(dir, { recursive: true });
const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
});
const scores = [];
try {
  for (const route of ["/", "/work/clarivo/", "/work/hindsite/"]) {
    const name = route === "/" ? "home" : route.split("/")[2];
    const result = await lighthouse(base + route, {
      port: chrome.port,
      output: ["html", "json"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      formFactor: "mobile",
      screenEmulation: {
        mobile: true,
        width: 375,
        height: 812,
        deviceScaleFactor: 1,
        disabled: false,
      },
    });
    await writeFile(`${dir}/${name}.html`, result.report[0]);
    await writeFile(`${dir}/${name}.json`, result.report[1]);
    const categories = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    );
    const row = {
      route,
      ...categories,
      cls: result.lhr.audits["cumulative-layout-shift"].numericValue,
    };
    scores.push(row);
    console.log(JSON.stringify(row));
  }
} finally {
  await writeFile(`${dir}/scores.json`, JSON.stringify(scores, null, 2));
  await chrome.kill();
}
if (
  scores.some((row) =>
    ["performance", "accessibility", "best-practices", "seo"].some(
      (key) => row[key] < 95,
    ),
  )
)
  process.exitCode = 1;
