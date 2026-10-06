import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Every file in src/content/briefs/ is one CSSC Brief.
// The fields below are the "form" each brief fills in; the site builds everything else from them.
export const METHODS = ["Survey experiment", "Survey", "Interviews"] as const;
export const RESEARCH_AREAS = [
  "Self-presentation",
  "Media representation",
  "Message strategies",
  "Social media",
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
    method: z.enum(METHODS),
    methodNote: z.string().optional(),
    participants: z.string().optional(),
    areas: z.array(z.enum(RESEARCH_AREAS)).min(1),
    doi: z.string(),
    // Optional: the accepted manuscript, uploaded to public/papers/ (e.g. "/papers/no-laughing-matter.pdf").
    acceptedPdf: z.string().optional(),
    citation: z.string(),
  }),
});

export const collections = { briefs };
