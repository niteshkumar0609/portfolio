import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const pages = JSON.parse(await readFile(path.join(root, 'src/site-pages.json'), 'utf8'))
const template = await readFile(path.join(root, 'index.html'), 'utf8')
const origin = 'https://portfolio-nine-tan-21.vercel.app'
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function documentFor(page) {
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/>)/, `$1${escape(page.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/>)/, `$1${escape(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/>)/, `$1${escape(page.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/>)/, `$1${origin}${page.path}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/>)/, `$1${origin}${page.path}$2`)
  // Only Home renders a portrait; the other pages should not preload it.
  html = html.replace(/\s*<link rel="preload" as="image"[^>]*\/>/, '')
  return html
}

for (const page of pages.filter(page => page.id !== 'home')) {
  const directory = path.join(root, page.id)
  await mkdir(directory, { recursive: true })
  await writeFile(path.join(directory, 'index.html'), documentFor(page))
}

const notFound = documentFor({ path: '/404/', title: 'Page not found | Nitesh Kumar', description: 'This page could not be found. Return to Nitesh Kumar’s portfolio.' })
  .replace(/\s*<link rel="canonical"[^>]*\/>/, '')
  .replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>')
await writeFile(path.join(root, '404.html'), notFound)
await writeFile(path.join(root, 'public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>${origin}${page.path}</loc></url>`).join('\n')}\n</urlset>\n`)
console.log(`Prepared ${pages.length} portfolio pages, a 404 page, and sitemap.`)
