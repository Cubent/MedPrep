import type { MetadataRoute } from 'next';

const baseUrl = 'https://medprepinstitute.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/admin/', '/dashboard/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
