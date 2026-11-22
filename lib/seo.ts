import type { Metadata } from "next";
import { site, ui } from "@/content/site";
export const baseUrl = new URL(site.siteUrl);
export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  const url = new URL(pathname, baseUrl);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [
        {
          url: new URL("/opengraph-image", baseUrl),
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/opengraph-image", baseUrl)],
    },
  };
}
export const rootMetadata: Metadata = {
  metadataBase: baseUrl,
  title: { default: ui.homeTitle, template: `%s | ${site.name}` },
  description: site.description,
  icons: { icon: "/favicon.svg" },
};
export const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: baseUrl.href,
  sameAs: [site.github, site.linkedin].filter(Boolean),
  ...(site.email ? { email: site.email } : {}),
};
