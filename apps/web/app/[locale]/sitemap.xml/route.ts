import { env } from '@/env';

/**
 * Dynamic sitemap.xml route handler
 * Generates XML sitemap with MedPrep Institute pages
 */
export async function GET() {
  // Determine protocol and base URL for sitemap entries
  const protocol = env.VERCEL_PROJECT_PRODUCTION_URL?.startsWith('https')
    ? 'https'
    : 'http';
  const baseUrl = `${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`;

  // Generate XML sitemap with MedPrep Institute pages
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

  // Return XML response with proper content type
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
