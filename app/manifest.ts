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
  }
}
