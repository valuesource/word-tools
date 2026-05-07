export default function robots() {
  const baseUrl = 'https://wordunscramblr.net'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}