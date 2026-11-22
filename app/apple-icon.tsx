import { ImageResponse } from "next/og";
import { ui } from "@/content/site";
import { imageAssets } from "@/lib/image-assets";
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default async function AppleIcon() {
  const { bg, accent, fonts } = await imageAssets();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        color: accent,
        fontFamily: "Display",
        fontSize: 112,
      }}
    >
      {ui.monogram}
    </div>,
    { ...size, fonts },
  );
}
