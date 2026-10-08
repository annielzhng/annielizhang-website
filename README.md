# annielizhang.com

The website of Annie Li Zhang, Assistant Professor of Science Communication at Florida State University, and home of the **CSSC Briefs**.

Built with [Astro](https://astro.build). Every page is generated from a few simple files, so updating content never requires touching the design.

---

## Editing the site (no code needed)

The easiest way is **Pages CMS**, a free form-based editor:

1. Go to **[app.pagescms.org](https://app.pagescms.org)** and sign in with GitHub.
2. Open this repository.
3. Choose what to edit from the left menu: **CSSC Briefs**, **Research areas**, **The bigger picture**, **Teaching**, or **Site settings**.
4. Click **Save**. The live site updates about a minute later.

### Adding a new CSSC Brief

In Pages CMS, go to **CSSC Briefs → Add an entry** and fill in the form.

| Field | What to enter |
|---|---|
| Headline | A plain-language question or statement |
| The short version | One or two sentences; highlighted at the top of the brief and shown on cards |
| Publication date | Year-month, like `2025-10` |
| Paper title, Journal | As published |
| Authors | One per line, in order, full names |
| Method | One or more: Survey experiment, Survey, Interviews, Content analysis, LLM-assisted, Perspective |
| Research areas | Pick up to four, most central first (cards show the first three) |
| DOI | Just the DOI, like `10.1177/10755470221114352` |
| Open access | Turn on if the published paper is free to read on the journal's site; adds an "Open access" label |
| In press | Turn on while the paper is accepted but not yet in an issue; shows "In press" instead of the date. When it comes out, turn it off, set the real publication date, and update the citation |
| Accepted version (PDF) | Optional. Upload the accepted manuscript so readers can get past paywalls |
| Citation | APA. Put the journal and volume between `*asterisks*` to italicize them |
| Brief text | Three headings: **What we did**, **What we found** (as a bulleted list), **Why it matters** |

The new brief then appears automatically:

- on the homepage, if it's among the latest three
- in the CSSC Briefs list and filters
- in the Publications list
- in the RSS feed

Once there are more than 10 briefs, the list splits into pages.

To change the sample brief on the homepage (in “Why the CSSC Briefs”), open **Site settings** and set **Homepage sample brief** to the brief's file name, without `.md`. Leave it empty to show the latest brief.

To show a brief under a research area on the Research page, open **Research areas** and add the brief's file name to that area's **Related briefs**. Use the name shown in Pages CMS, without `.md`. Each area shows its five most recent briefs, newest first.

### Editing directly on GitHub

Every brief is a text file in `src/content/briefs/`. To add one, copy an existing brief, rename it, and edit the text. The file name becomes the web address: `scientists-humor.md` becomes `annielizhang.com/briefs/scientists-humor/`.

---

## Where things live

| What | File |
|---|---|
| CSSC Briefs | `src/content/briefs/*.md` |
| Publications without a brief | `src/data/publications.json` (when you write a brief for one, delete it here) |
| Research areas (Research page and homepage cards) | `src/data/research-areas.json` |
| The bigger picture, methods, funding | `src/data/research.json` |
| Courses | `src/data/teaching.json` |
| Email, profile links, CV path | `src/data/site.json` |
| Photo | `public/images/annie-li-zhang.jpg` |
| CV | `public/cv/` (then update `cv` in `site.json` to `/cv/your-file.pdf`) |
| Accepted-version PDFs | `public/papers/` |
| Page text (About, Teaching intro, homepage) | `src/pages/*.astro` |
| Colors and styles | `src/styles/global.css` (color tokens at the top) |
| Redirects from the old WordPress addresses | `public/_redirects` |

### Color palette

| Role | Hex |
|---|---|
| Page background (cream) | `#F5EBE0` |
| Header band (blush) | `#D5BDAF` |
| Headlines and buttons (brown) | `#774936` |
| Body text (dark brown) | `#5E3828` |
| Secondary text (mid brown) | `#8A5A44` |
| Highlights, method tags, light-blue hover (sage) | `#D8E2DC` |
| Deep blue-green (text) | `#3B5C61` |
| Rosewood (links, research-area tags) | `#9A5245` |
| Dusty rose (your name, paper titles, journals) | `#A34E62` |
| Dusty pink (soft fills, photo frame, CV hover) | `#E3BFBE` |
| Divider lines (taupe) | `#D6C3B4` |

---

## Hosting (Cloudflare)

The site is hosted for free on Cloudflare (as a Worker named **annielizhang**), which rebuilds it automatically whenever anything in this repository changes, including every save in Pages CMS. Build settings live in `wrangler.jsonc`; the Node version comes from `.node-version`. To see builds, open the Cloudflare dashboard → **Workers & Pages → annielizhang → Deployments**.

- **Contact form:** handled by [Web3Forms](https://web3forms.com) (free, 250 messages a month). Messages go to the email the access key was created with. The key lives in **Site settings → Contact form key** in Pages CMS (`formKey` in `src/data/site.json`); it is meant to be public. If the key is missing, the form tells visitors to email you directly.
- **Domain:** in the annielizhang project, go to **Settings → Domains & Routes → Add → Custom domain** and enter `annielizhang.com` (and `www.annielizhang.com`). Cloudflare walks you through pointing the domain at it.
- **Old links:** `public/_redirects` sends every old WordPress address to its new page. That covers each brief, `/cssc-briefs/`, `/research-interests/`, and `/77-2/`.

## Visitor statistics (GoatCounter)

Daily visitors, most-read briefs, and where readers come from are tracked with [GoatCounter](https://www.goatcounter.com): free, no cookies, no consent banner needed. The site's GoatCounter code lives in `src/data/site.json` (`goatcounter`); leave it empty to turn tracking off. View the dashboard at `https://<code>.goatcounter.com`.

## Working on the code (optional)

```sh
npm install      # once
npm run dev      # live preview at http://localhost:4321 while editing
npm run build    # produce the finished site in dist/
```
