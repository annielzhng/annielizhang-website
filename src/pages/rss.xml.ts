import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getBriefs } from "../lib/briefs";
import site from "../data/site.json";

export async function GET(context: APIContext) {
  const briefs = await getBriefs();
  return rss({
    title: "CSSC Briefs · Annie Li Zhang",
    description: "Plain-language summaries of research on the science of science communication.",
    site: context.site ?? site.url,
    stylesheet: "/rss-style.xsl",
    items: briefs.map((b) => ({
      title: b.data.headline,
      description: b.data.takeaway,
      pubDate: new Date(`${b.data.date}-01T12:00:00Z`),
      link: `/briefs/${b.id}/`,
    })),
  });
}
