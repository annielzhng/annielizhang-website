<?xml version="1.0" encoding="UTF-8"?>
<!-- Makes /rss.xml readable in a browser. Feed readers ignore this and read the feed directly. -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Follow the CSSC Briefs · Annie Li Zhang</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&amp;family=IBM+Plex+Mono:wght@400;500&amp;family=Literata:opsz,wght@7..72,400..650&amp;display=swap" />
        <style>
          :root { --paper:#F5EBE0; --surface:#FBF6F0; --band:#D5BDAF; --head:#774936; --ink:#5E3828; --muted:#8A5A44; --rule:#D6C3B4; --rose:#9A5245; --rose-pink:#A34E62; --pink:#E3BFBE; --sage:#D8E2DC; --sage-ink:#3E4F46; color-scheme: light; }
          @media (prefers-color-scheme: dark) { :root { --paper:#231915; --surface:#2D221D; --band:#4A342B; --head:#E9C9B5; --ink:#F0E2D6; --muted:#C9A792; --rule:#4A3930; --rose:#EBA999; --rose-pink:#E8A3B3; --pink:#5A3A3E; --sage:#33433B; --sage-ink:#DCE8E1; color-scheme: dark; } }
          * { box-sizing: border-box; }
          body { margin: 0; background: var(--paper); color: var(--ink); font-family: "Literata", Georgia, serif; font-size: 1.06rem; line-height: 1.65; }
          .band { background: var(--band); border-bottom: 1px solid var(--rule); }
          .wrap { max-width: 50rem; margin-inline: auto; padding-inline: clamp(16px, 4vw, 32px); }
          .band .wrap { padding-block: 14px; }
          .band a { font-family: "Bricolage Grotesque", Arial, sans-serif; font-weight: 750; font-size: 1.2rem; color: var(--ink); text-decoration: none; }
          main { padding-block: 48px 80px; display: flex; flex-direction: column; gap: 22px; }
          .label { font-family: "IBM Plex Mono", monospace; font-size: .74rem; text-transform: uppercase; letter-spacing: .1em; color: var(--muted); margin: 0; }
          h1 { font-family: "Bricolage Grotesque", Arial, sans-serif; font-size: clamp(2rem, 5vw, 2.8rem); line-height: 1.05; letter-spacing: -0.02em; color: var(--head); margin: 0; }
          p { margin: 0; }
          .box { background: var(--surface); border: 1px solid var(--rule); border-radius: 16px; padding: 22px 24px; display: flex; flex-direction: column; gap: 12px; }
          .box h2 { font-family: "Bricolage Grotesque", Arial, sans-serif; font-size: 1.15rem; color: var(--rose-pink); margin: 0; }
          .box ol { margin: 0; padding-left: 1.2em; display: flex; flex-direction: column; gap: 6px; }
          .url { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
          code { font-family: "IBM Plex Mono", monospace; font-size: .92rem; background: var(--sage); color: var(--sage-ink); padding: .35em .7em; border-radius: 8px; user-select: all; overflow-wrap: anywhere; }
          h2.list { font-family: "Bricolage Grotesque", Arial, sans-serif; font-size: 1.4rem; color: var(--head); margin: 18px 0 0; padding-bottom: 10px; border-bottom: 2px solid var(--head); }
          .item { padding-block: 18px; border-bottom: 1px solid var(--rule); display: flex; flex-direction: column; gap: 6px; }
          .item a { font-family: "Bricolage Grotesque", Arial, sans-serif; font-weight: 680; font-size: 1.2rem; line-height: 1.25; color: var(--head); text-decoration: none; }
          .item a:hover { color: var(--rose-pink); }
          .item .date { font-family: "IBM Plex Mono", monospace; font-size: .76rem; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); }
          .item p { color: var(--muted); font-size: 1rem; }
          .back { font-family: "Bricolage Grotesque", Arial, sans-serif; font-weight: 650; color: var(--rose); text-decoration: none; }
        </style>
      </head>
      <body>
        <header class="band"><div class="wrap"><a href="/">Annie Li Zhang</a></div></header>
        <main class="wrap">
          <a class="back" href="/briefs/">← All CSSC Briefs</a>
          <p class="label">RSS feed</p>
          <h1>Follow the CSSC Briefs</h1>
          <p>This page is a feed: a list of every CSSC Brief that apps called feed readers check automatically. Add it to one, and each new brief shows up there as soon as it’s published.</p>
          <div class="box">
            <h2>How to follow</h2>
            <ol>
              <li>Open a feed reader, such as Feedly, Inoreader, NetNewsWire, or Reeder.</li>
              <li>Choose “Add” or “Follow,” and paste this address:</li>
            </ol>
            <div class="url"><code>https://annielizhang.com/rss.xml</code></div>
          </div>
          <h2 class="list">In this feed</h2>
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <span class="date"><xsl:value-of select="substring(pubDate, 9, 8)" /></span>
              <a><xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute><xsl:value-of select="title" /></a>
              <p><xsl:value-of select="description" /></p>
            </div>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
