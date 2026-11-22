import { readFile } from "node:fs/promises";
import path from "node:path";
export async function imageAssets() {
  const css = await readFile(
    path.join(process.cwd(), "app/globals.css"),
    "utf8",
  );
  const block = css.split(':root[data-theme="dark"]')[1].split("}")[0];
  function token(name: string) {
    const value = block.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]+)`))?.[1];
    if (!value) throw new Error(`Missing palette token: ${name}`);
    return value;
  }
  const [serif, mono] = await Promise.all([
    readFile(path.join(process.cwd(), "lib/fonts/InstrumentSerif-Regular.ttf")),
    readFile(path.join(process.cwd(), "lib/fonts/JetBrainsMono-Regular.ttf")),
  ]);
  return {
    bg: token("bg"),
    text: token("text"),
    accent: token("accent"),
    fonts: [
      {
        name: "Display",
        data: serif.buffer.slice(
          serif.byteOffset,
          serif.byteOffset + serif.byteLength,
        ) as ArrayBuffer,
        weight: 400 as const,
      },
      {
        name: "Mono",
        data: mono.buffer.slice(
          mono.byteOffset,
          mono.byteOffset + mono.byteLength,
        ) as ArrayBuffer,
        weight: 400 as const,
      },
    ],
  };
}
