import type { MetadataRoute } from "next";
import { siteConfig, getSiteUrl } from "@/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/treatments`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...(siteConfig.sections.showDoctors
      ? [
          {
            url: `${siteUrl}/doctors`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.9,
          },
        ]
      : []),
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/book`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const treatmentRoutes: MetadataRoute.Sitemap = siteConfig.treatments.map((t) => ({
    url: `${siteUrl}/treatments/${t.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const doctorRoutes: MetadataRoute.Sitemap = siteConfig.sections.showDoctors
    ? siteConfig.doctors.map((d) => ({
        url: `${siteUrl}/doctors/${d.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.85,
      }))
    : [];

  return [...staticRoutes, ...treatmentRoutes, ...doctorRoutes];
}
