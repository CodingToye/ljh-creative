import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error("Missing Sanity environment variabbles.");
}

const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-27",
  perspective: "published",
  useCdn: !isLocal,
});
