import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site.config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return siteConfig.treatments.map((t) => ({
    slug: t.slug,
  }));
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/treatments/${slug}`);
}
