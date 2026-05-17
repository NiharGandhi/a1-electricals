import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Allow major AI crawlers full access for AI search visibility
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://a1electricals.com"}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_SITE_URL ?? "https://a1electricals.com",
  };
}
