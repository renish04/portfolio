import type { MetadataRoute } from "next";
import { projects } from "@/content/site";
import { baseUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...projects.map((project) => `/work/${project.slug}/`)].map(
    (path) => ({ url: new URL(path, baseUrl).href }),
  );
}
