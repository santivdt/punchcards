import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/cards/',
        '/clients/',
        '/dashboard/',
        '/hours/',
        '/settings/',
      ],
    },
    sitemap: 'https://punchcards.vercel.app/sitemap.xml',
  }
}
