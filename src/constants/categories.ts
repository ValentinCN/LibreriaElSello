import { Backpack, Palette, Briefcase, CompassTool } from '@phosphor-icons/react'
import type { ElementType } from 'react'

// Slugs iguales a los de la tienda en Tiendanube y a categories.slug en Supabase.
export type CategoriaSlug = 'escolar' | 'artistica' | 'oficina-universidad' | 'tecnica'
export type Categoria = 'Escolar' | 'Artística' | 'Oficina y universidad' | 'Técnica'

export interface CategoriaMeta {
  slug: CategoriaSlug
  label: Categoria
  icon: ElementType
  /** Token de color (var(--color-*)) — para íconos, bordes y fondos suaves. No usar como color de texto. */
  color: string
  glow: string
  /** >= 4.5:1 sobre blanco y sobre --color-bg — único uso válido como color de texto. */
  textColor: string
  desc: string
}

/** Color con transparencia: reemplaza concatenar alfa en hex, que no funciona con var(). */
export const alpha = (color: string, pct: number) =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`

export const CATEGORIAS: CategoriaMeta[] = [
  {
    slug: 'escolar',
    label: 'Escolar',
    icon: Backpack,
    color: 'var(--color-primary)',
    glow: alpha('var(--color-primary)', 12),
    textColor: 'var(--color-primary)',
    desc: 'Cuadernos, carpetas, témperas y útiles para el cole',
  },
  {
    slug: 'artistica',
    label: 'Artística',
    icon: Palette,
    color: 'var(--color-gold)',
    glow: alpha('var(--color-gold)', 12),
    textColor: 'var(--color-gold-text)',
    desc: 'Pintura, cerámica y manualidades',
  },
  {
    slug: 'oficina-universidad',
    label: 'Oficina y universidad',
    icon: Briefcase,
    color: 'var(--color-sky)',
    glow: alpha('var(--color-sky)', 12),
    // --color-sky da 3.1:1 sobre --color-bg: no llega a AA como texto.
    textColor: 'var(--color-text)',
    desc: 'Carpetas, folios y artículos de oficina',
  },
  {
    slug: 'tecnica',
    label: 'Técnica',
    icon: CompassTool,
    color: 'var(--color-text)',
    glow: alpha('var(--color-text)', 12),
    textColor: 'var(--color-text)',
    desc: 'Tableros, escuadras y dibujo técnico',
  },
]

export const CATEGORIA_BY_SLUG: Record<CategoriaSlug, CategoriaMeta> = Object.fromEntries(
  CATEGORIAS.map(c => [c.slug, c])
) as Record<CategoriaSlug, CategoriaMeta>
