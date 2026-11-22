import { readFile, writeFile, mkdir } from "node:fs/promises";
import ts from "typescript";
const source = await readFile("content/site.ts", "utf8");
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { ui } = await import(
  `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
);
const css = await readFile("app/globals.css", "utf8");
const dark = css.split(':root[data-theme="dark"]')[1].split("}")[0];
const color = (name) =>
  dark.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]+)`))[1];
await mkdir("public", { recursive: true });
await writeFile(
  "public/favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="${color("bg")}"/><text x="32" y="45" text-anchor="middle" font-family="Georgia,serif" font-size="42" fill="${color("accent")}">${ui.monogram}</text></svg>\n`,
);
console.log("Generated favicon from content and palette.");
