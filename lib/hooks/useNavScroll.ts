'use client'

import { useEffect, useRef, useState } from 'react'

interface NavScrollState {
  scrolled: boolean  /* true when scrollY > 60 — drives bg / height */
  hidden:   boolean  /* true when scrolling down past 180px — hides navbar */
}

export function useNavScroll(): NavScrollState {
  const [state, setState] = useState<NavScrollState>({ scrolled: false, hidden: false })
  const prevY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const scrolled = y > 60
      const hidden   = y > 180 && y > prevY.current
      prevY.current  = y
      setState({ scrolled, hidden })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
