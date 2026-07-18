export interface Testimonial {
  id:         string
  name:       string
  role:       string
  quote:      string
  property:   string
}

export const testimonials: Testimonial[] = [
  {
    id:       'test-001',
    name:     'Adaeze Okonkwo',
    role:     'Acquired The Meridian Penthouse',
    quote:    'CasaNova changed how I thought about finding a home. The experience made me feel what living there would feel like, long before I ever visited in person.',
    property: 'The Meridian Penthouse',
  },
  {
    id:       'test-002',
    name:     'Emeka Nwosu',
    role:     'Acquired Casa del Mar Villa',
    quote:    'Every detail communicated quality and care. I knew from the first moment that this was a team that understood what a home truly means.',
    property: 'Casa del Mar Villa',
  },
  {
    id:       'test-003',
    name:     'Zainab Aliyu',
    role:     'Acquired The Grove Residence',
    quote:    'There was no pressure, no noise. Just an honest, beautiful experience that helped me find exactly what I was looking for.',
    property: 'The Grove Residence',
  },
]
