import { getCollection, type CollectionEntry } from "astro:content";

export type Brief = CollectionEntry<"briefs">;

const ME = "Annie Li Zhang";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** All briefs, newest first. */
export async function getBriefs(): Promise<Brief[]> {
  const all = await getCollection("briefs");
  return all.sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** "2025-10" → "October 2025" (long) or "Oct 2025" (short). */
export function formatDate(date: string, style: "long" | "short" = "long"): string {
  const [y, m] = date.split("-").map(Number);
  const name = MONTHS[m - 1];
  return `${style === "short" ? name.slice(0, 3) : name} ${y}`;
}

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const me = (name: string, html: string) => (name === ME ? `<b class="me">${html}</b>` : html);

/** Full names for cards and "Study at a glance". More than five authors: first three, …, last. */
export function authorsLine(authors: string[]): string {
  const list = authors.length > 5 ? [...authors.slice(0, 3), "…", authors[authors.length - 1]] : authors;
  return list.map((a) => me(a, esc(a))).join(", ");
}

/** Initials for the small Research-page cards. Up to three authors: all; more: first author et al. */
export function shortAuthors(authors: string[]): string {
  const fmt = (full: string) => {
    const parts = full.trim().split(/\s+/);
    const last = parts.pop()!;
    return me(full, esc(`${parts.map((p) => p[0] + ".").join(" ")} ${last}`));
  };
  if (authors.length > 3) return `${fmt(authors[0])} et al.`;
  const names = authors.map(fmt);
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} &amp; ${names[names.length - 1]}` : names[0];
}

/** APA citation: *italics* become italics and Annie's name is highlighted. */
export function citationHTML(citation: string): string {
  return esc(citation)
    .replace(/\*([^*]+)\*/g, "<i>$1</i>")
    .replace("Zhang, A. L.", "<b>Zhang, A. L.</b>");
}

/** Plain-text citation for the copy button. */
export function citationText(b: Brief): string {
  return `${b.data.citation.replace(/\*/g, "")} https://doi.org/${b.data.doi}`;
}
