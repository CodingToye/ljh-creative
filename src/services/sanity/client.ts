import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error("Missing Sanity environment variabbles.");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-27",
  perspective: "published",
  useCdn: true,
});
