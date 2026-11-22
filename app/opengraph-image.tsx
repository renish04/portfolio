import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { imageAssets } from "@/lib/image-assets";
export const dynamic = "force-static";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const { bg, text, accent, fonts } = await imageAssets();
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: bg,
        color: text,
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontFamily: "Mono",
          fontSize: 24,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            background: accent,
          }}
        />
        {site.role}
      </div>
      <div style={{ fontFamily: "Display", fontSize: 112, marginTop: 32 }}>
        {site.name}
      </div>
    </div>,
    { ...size, fonts },
  );
}
