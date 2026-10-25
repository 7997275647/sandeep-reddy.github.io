import type { MetadataRoute } from "next";
import { siteOrigin, siteUrl } from "@/lib/deployment";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  };
}
