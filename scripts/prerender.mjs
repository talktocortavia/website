// Turns the client build into real HTML files, one per page, so every URL
// loads instantly, works without JavaScript, and needs no server rewrite rules
// (which GitHub Pages does not have).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, allPages, NOT_FOUND, redirects, SITE } = await import(
  pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href
);

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function write(file, html) {
  const full = path.join(dist, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}

function canonicalOf(p) {
  return `${SITE.url}${p}`;
}

// Preload the two fonts used above the fold (hashed file names found in dist/assets).
const preloads = fs
  .readdirSync(path.join(dist, 'assets'))
  .filter((f) => /^(funnel-display|schibsted-grotesk|cinzel)-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`);

function headTags(meta) {
  const url = canonicalOf(meta.path);
  const image = `${SITE.url}/og.png`;
  const tags = [
    ...preloads,
    `<link rel="canonical" href="${esc(url)}" />`,
    meta.noindex ? '<meta name="robots" content="noindex" />' : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ];
  if (meta.path === '/') {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.legalName,
      url: SITE.url,
      logo: `${SITE.url}/icon-512.png`,
      email: SITE.email,
      slogan: SITE.tagline,
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
  }
  return tags.filter(Boolean).join('\n    ');
}

function page(meta, url) {
  const html = render(url);
  return template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(meta.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(meta.description)}" />`)
    .replace('<!--head-tags-->', headTags(meta))
    .replace('<!--app-html-->', html);
}

const pages = allPages();
for (const meta of pages) {
  const html = page(meta, meta.path);
  if (meta.path === '/') write('index.html', html);
  else if (meta.path.endsWith('/')) write(`${meta.path}index.html`.replace(/^\//, ''), html);
  else {
    // e.g. /financetrail/privacy: serve it with and without a trailing slash
    write(`${meta.path}.html`.replace(/^\//, ''), html);
    write(`${meta.path}/index.html`.replace(/^\//, ''), html);
  }
}

write('404.html', page(NOT_FOUND, '/page-not-found'));

for (const r of redirects) {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta http-equiv="refresh" content="0; url=${esc(r.to)}" />
<link rel="canonical" href="${esc(canonicalOf(r.to))}" />
<meta name="robots" content="noindex" />
<title>Redirecting…</title>
<script>location.replace(${JSON.stringify(r.to)});</script>
</head><body><p>Redirecting to <a href="${esc(r.to)}">${esc(r.to)}</a>…</p></body></html>
`;
  write(`${r.from}.html`.replace(/^\//, ''), html);
  write(`${r.from}/index.html`.replace(/^\//, ''), html);
}

const urls = pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${esc(canonicalOf(p.path))}</loc></url>`)
  .join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
write('.nojekyll', '');

fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${pages.length} pages, 404, ${redirects.length} redirects, sitemap.`);
