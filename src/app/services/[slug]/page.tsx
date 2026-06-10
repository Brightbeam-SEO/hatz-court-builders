import { notFound, redirect } from "next/navigation";
import { getPmServicePage, pmServicePagePath } from "@/lib/pm-service-pages";

type Props = { params: Promise<{ slug: string }> };

/** Legacy `/services/[slug]/` → canonical root URL. */
export default async function LegacyServicesRedirect({ params }: Props) {
  const { slug } = await params;
  const clean = slug.replace(/^\/+|\/+$/g, "");

  if (getPmServicePage(clean)) {
    redirect(pmServicePagePath(clean));
  }

  notFound();
}
