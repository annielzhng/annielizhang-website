// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://annielizhang.com",
  // A sitemap helps Google find every page (submit /sitemap-index.xml in Search Console).
  integrations: [sitemap({ filter: (page) => !page.includes("/contact/thanks/") })],
});
