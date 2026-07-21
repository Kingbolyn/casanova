/* ============================================================
   CasaNova — Motion System Constants (IB-007)
   Single source of truth for all animation values.
   ============================================================ */

/* ─── Duration (seconds, for Framer Motion) ─────────────── */
export const DUR = {
  instant:   0.12,   /* 120ms — input focus, button press, selection */
  micro:     0.2,    /* 200ms — hover states, overlays, micro interactions */
  standard:  0.35,   /* 350ms — cards, navigation, content, filters (default) */
  large:     0.6,    /* 600ms — section reveals, gallery transitions */
  cinematic: 0.9,    /* 900ms — hero, page transitions, panorama entry */
} as const

/* ─── Easing (Framer Motion array syntax) ───────────────── */
export const EASE = {
  standard:  [0.25, 0.1,  0.25, 1   ] as [number, number, number, number],
  entrance:  [0.16, 1,    0.3,  1   ] as [number, number, number, number],
  exit:      [0.7,  0,    0.84, 0   ] as [number, number, number, number],
  cinematic: [0.22, 1,    0.36, 1   ] as [number, number, number, number],
} as const

/* ─── Convenience transition presets ────────────────────── */
export const T = {
  instant:   { duration: DUR.instant,   ease: EASE.standard  },
  micro:     { duration: DUR.micro,     ease: EASE.standard  },
  standard:  { duration: DUR.standard,  ease: EASE.standard  },
  entrance:  { duration: DUR.large,     ease: EASE.entrance  },
  exit:      { duration: DUR.standard,  ease: EASE.exit      },
  cinematic: { duration: DUR.cinematic, ease: EASE.cinematic },
} as const
