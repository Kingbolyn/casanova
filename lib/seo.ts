export const BASE_URL = 'https://casanova.vercel.app'
export const SITE_NAME = 'CasaNova'

export function canonical(path: string): string {
  return `${BASE_URL}${path}`
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: BASE_URL,
  description:
    'Premium real estate discovery platform presenting exceptional properties across Nigeria.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@casanova.com',
    telephone: '+234-000-000-0000',
    contactType: 'customer service',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}
