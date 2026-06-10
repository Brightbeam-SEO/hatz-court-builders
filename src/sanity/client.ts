import { createClient, type SanityClient } from "@sanity/client";

function getSanityConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
  return { projectId, dataset, apiVersion };
}

let serverClient: SanityClient | null | undefined;

export function getSanityClient(): SanityClient | null {
  const { projectId, dataset, apiVersion } = getSanityConfig();
  if (!projectId) {
    return null;
  }
  if (serverClient === undefined) {
    serverClient = createClient({
      projectId,
      dataset,
      apiVersion,
      // Use API origin so published edits are available immediately on revalidation.
      useCdn: false,
    });
  }
  return serverClient;
}
