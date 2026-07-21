export interface Neighbourhood {
  slug:           string
  name:           string
  city:           string
  state:          string
  heroImage:      string
  architecturalStyle: string
  lifestyle:      string[]
  description:    string
}

export const neighbourhoods: Neighbourhood[] = [
  {
    slug:               'victoria-island',
    name:               'Victoria Island',
    city:               'Lagos',
    state:              'Lagos State',
    heroImage:          'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    architecturalStyle: 'Contemporary High-Rise',
    lifestyle:          ['Waterfront access', 'World-class dining', 'Financial district proximity'],
    description:        'The financial and social heartbeat of Lagos. Where ambition meets the Atlantic.',
  },
  {
    slug:               'banana-island',
    name:               'Banana Island',
    city:               'Lagos',
    state:              'Lagos State',
    heroImage:          'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&q=80',
    architecturalStyle: 'Luxury Estate',
    lifestyle:          ['Private island security', 'Manicured streets', 'Absolute exclusivity'],
    description:        "Nigeria's most prestigious address. A private island where discretion is the standard.",
  },
  {
    slug:               'ikoyi',
    name:               'Ikoyi',
    city:               'Lagos',
    state:              'Lagos State',
    heroImage:          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    architecturalStyle: 'Colonial & Contemporary',
    lifestyle:          ['Mature tree canopy', 'Quiet wide roads', 'Old-money calm'],
    description:        'Graceful, tree-lined, and unhurried. The original address of distinction in Lagos.',
  },
  {
    slug:               'lekki',
    name:               'Lekki',
    city:               'Lagos',
    state:              'Lagos State',
    heroImage:          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    architecturalStyle: 'Modern Residential',
    lifestyle:          ['Rapid development', 'Gated communities', 'Coastal corridor'],
    description:        'Lagos growing forward. Lekki offers space, modernity, and the promise of tomorrow.',
  },
  {
    slug:               'maitama',
    name:               'Maitama',
    city:               'Abuja',
    state:              'FCT',
    heroImage:          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    architecturalStyle: 'Diplomatic Estate',
    lifestyle:          ['Tree-lined avenues', 'Diplomatic calm', 'Generous plot sizes'],
    description:        "Abuja's diplomatic quarter. An atmosphere of calm authority and considered space.",
  },
  {
    slug:               'asokoro',
    name:               'Asokoro',
    city:               'Abuja',
    state:              'FCT',
    heroImage:          'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=80',
    architecturalStyle: 'State Residential',
    lifestyle:          ['Security and privacy', 'Proximity to government', 'Executive residences'],
    description:        'Proximity to power, insistence on privacy. Where Abuja holds its most important addresses.',
  },
]
