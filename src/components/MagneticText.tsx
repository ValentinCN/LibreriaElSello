import { Fragment, useRef, useEffect, useCallback, useMemo } from 'react'
import { animate, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'

interface MagneticTextProps {
  children: string
  as?: TextTag
  style?: CSSProperties
  maxLift?: number
  radius?: number
}

export default function MagneticText({
  children,
  as = 'h1',
  style,
  maxLift = 9,
  radius = 90,
}: MagneticTextProps) {
  const Tag = as
  const prefersReduced = useReducedMotion()
  const chars = useMemo(() => children.split(''), [children])
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const rectsRef   = useRef<(DOMRect | null)[]>([])
  const lastRef    = useRef(0)

  const updateRects = useCallback(() => {
    rectsRef.current = letterRefs.current.map(el => el?.getBoundingClientRect() ?? null)
  }, [])

  useEffect(() => {
    if (prefersReduced) return

    updateRects()
    window.addEventListener('scroll', updateRects, { passive: true })
    window.addEventListener('resize', updateRects)

    const handleMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastRef.current < 33) return
      lastRef.current = now

      letterRefs.current.forEach((el, i) => {
        if (!el || chars[i] === ' ') return
        const rect = rectsRef.current[i]
        if (!rect) return
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2)
        const lift = dist < radius ? maxLift * Math.pow(1 - dist / radius, 1.8) : 0
        animate(el, { y: -lift }, { type: 'spring', stiffness: 420, damping: 22, mass: 0.5 })
      })
    }

    const handleLeave = () => {
      letterRefs.current.forEach(el => {
        if (!el) return
        animate(el, { y: 0 }, { type: 'spring', stiffness: 300, damping: 25 })
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseleave', handleLeave, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateRects)
      window.removeEventListener('resize', updateRects)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [prefersReduced, chars, maxLift, radius, updateRects])

  // Cada palabra va en un span nowrap: entre letras inline-block el navegador
  // puede cortar línea en cualquier lado ("univer / sidad"); así solo corta en
  // los espacios. `start` mantiene el índice global de chars para letterRefs.
  const words = useMemo(() => {
    const parts = children.split(' ')
    return parts.map((word, wi) => ({
      word,
      start: parts.slice(0, wi).reduce((n, p) => n + p.length + 1, 0),
    }))
  }, [children])

  return (
    <Tag style={style}>
      {words.map(({ word, start }, wi) => (
        <Fragment key={wi}>
          {wi > 0 && ' '}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((char, j) => (
              <span
                key={`${start + j}-${char}`}
                ref={el => { letterRefs.current[start + j] = el }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}
