/* ============================================================
   CasaNova — Core Type Definitions
   CN-019: Property Data Architecture
   ============================================================ */

/* ─── Property ──────────────────────────────────────────── */

export type PropertyStatus = 'for-sale' | 'for-rent' | 'sold' | 'off-market'
export type PropertyType   = 'house' | 'apartment' | 'villa' | 'penthouse' | 'townhouse' | 'land'

export interface PropertyLocation {
  address:      string
  city:         string
  neighbourhood: string
  state:        string
  country:      string
  coordinates?: { lat: number; lng: number }
}

export interface PropertyMedia {
  hero:       string
  gallery:    string[]
  floorPlan?: string
  video?:     string
  panorama?:  string
}

export interface PropertyFeatures {
  bedrooms:    number
  bathrooms:   number
  garages:     number
  squareFeet:  number
  lotSize?:    number
  yearBuilt?:  number
  amenities:   string[]
}

export interface Property {
  id:          string
  slug:        string
  title:       string
  tagline:     string
  description: string
  status:      PropertyStatus
  type:        PropertyType
  price:       number
  priceLabel:  string        /* formatted: "$2,400,000" */
  location:    PropertyLocation
  media:       PropertyMedia
  features:    PropertyFeatures
  featured:    boolean
  collection?: string
  createdAt:   string
  updatedAt:   string
}

/* ─── Collection ────────────────────────────────────────── */

export interface Collection {
  id:          string
  slug:        string
  name:        string
  description: string
  heroImage:   string
  properties:  string[]   /* property IDs */
}

/* ─── Navigation ────────────────────────────────────────── */

export interface NavItem {
  label: string
  href:  string
  children?: NavItem[]
}

/* ─── Component Props ───────────────────────────────────── */

export interface WithClassName {
  className?: string
}

export interface WithChildren {
  children: React.ReactNode
}

export interface WithChildrenAndClassName extends WithChildren, WithClassName {}
