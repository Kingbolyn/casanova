import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'CasaNova',
    short_name:       'CasaNova',
    description:      'Discover exceptional properties through an immersive experience.',
    start_url:        '/',
    display:          'standalone',
    background_color: '#F9F8F6',
    theme_color:      '#1A1A1A',
    icons: [
      { src: '/icon?size=192', sizes: '192x192', type: 'image/png' },
      { src: '/icon?size=512', sizes: '512x512', type: 'image/png' },
    ],
  }
}
