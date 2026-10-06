import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Every file in src/content/briefs/ is one CSSC Brief.
// The fields below are the "form" each brief fills in; the site builds everything else from them.
export const METHODS = ["Survey experiment", "Survey", "Interviews", "Content analysis", "LLM-assisted"] as const;
export const RESEARCH_AREAS = [
  "Self-presentation",
  "Media representation",
  "Message strategies",
  "Social media",
  "Emerging technologies",
  "Trust & credibility",
  "Climate & environment",
  "Health communication",
  "Risk perceptions",
  "Public engagement of science",
] as const;

const briefs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/briefs" }),
  schema: z.object({
    headline: z.string(),
    takeaway: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}$/, "Use year-month, like 2025-10"),
    paperTitle: z.string(),
    journal: z.string(),
    journalShort: z.string().optional(),
    authors: z.array(z.string()).min(1),
    // One method, or a list when a study used several (e.g. Content analysis + LLM-assisted).
    method: z.union([z.enum(METHODS), z.array(z.enum(METHODS)).min(1)]).transform((m) => (Array.isArray(m) ? m : [m])),
    methodNote: z.string().optional(),
    participants: z.string().optional(),
    areas: z.array(z.enum(RESEARCH_AREAS)).min(1),
    doi: z.string(),
    // Optional: the accepted manuscript, uploaded to public/papers/ (e.g. "/papers/no-laughing-matter.pdf").
    acceptedPdf: z.string().optional(),
    // True when the published paper is free to read on the journal's site.
    openAccess: z.boolean().default(false),
    citation: z.string(),
  }),
});

export const collections = { briefs };
