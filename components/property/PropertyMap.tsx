/**
 * PropertyMap — CN-020
 *
 * Server component. Renders an OpenStreetMap iframe embed — zero JS bundle,
 * native lazy-load, no API key required. When Mapbox is adopted in Sprint 2,
 * this is the only file that changes.
 *
 * Tile credit: © OpenStreetMap contributors (https://www.openstreetmap.org/copyright)
 */

interface PropertyMapProps {
  lat:     number
  lng:     number
  title:   string
  address: string
}

/**
 * Build OSM embed URL.
 * bbox = [west, south, east, north] — roughly 1 km radius at Nigerian latitudes.
 */
function buildOsmUrl(lat: number, lng: number): string {
  const dLat = 0.007
  const dLng = 0.010
  const bbox = [
    (lng - dLng).toFixed(6),
    (lat - dLat).toFixed(6),
    (lng + dLng).toFixed(6),
    (lat + dLat).toFixed(6),
  ].join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(6)},${lng.toFixed(6)}`
}

/**
 * Google Maps directions URL (works on all platforms; Android/iOS deep-link
 * to native Maps app via the universal maps link).
 */
function buildDirectionsUrl(lat: number, lng: number, address: string): string {
  const encoded = encodeURIComponent(address)
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_name=${encoded}`
}

function PropertyMap({ lat, lng, title, address }: PropertyMapProps) {
  const osmUrl        = buildOsmUrl(lat, lng)
  const directionsUrl = buildDirectionsUrl(lat, lng, address)

  return (
    <div>
      {/* Map container */}
      <div
        style={{
          position:     'relative',
          width:        '100%',
          aspectRatio:  '16/7',
          overflow:     'hidden',
          border:       '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-surface-muted)',
        }}
        role="region"
        aria-label={`Interactive map showing location of ${title}`}
      >
        <iframe
          src={osmUrl}
          title={`Map showing ${title} in ${address}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          allowFullScreen
          style={{
            width:  '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            /* Desaturate the OSM tiles to align with CasaNova's muted palette */
            filter: 'saturate(0.55) brightness(1.03)',
          }}
        />
      </div>

      {/* Footer: tile attribution + directions CTA */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        style={{ marginTop: 'var(--space-4)' }}
      >
        <p
          style={{
            fontSize:   'var(--type-xs)',
            color:      'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
        >
          Map data ©{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-text-muted)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            OpenStreetMap
          </a>{' '}
          contributors
        </p>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
          style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--type-xs)',
            fontWeight:    600,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color:         'var(--color-text-primary)',
            textDecoration: 'none',
            flexShrink:    0,
            transition:    'color var(--dur-micro) var(--ease-standard)',
          }}
          aria-label={`Get directions to ${title} (opens in Google Maps)`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M7 1L7 10M7 1L4 4M7 1L10 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 13h10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          Get directions
        </a>
      </div>
    </div>
  )
}

export { PropertyMap }
export type { PropertyMapProps }
