import { Palette, Backpack, BookOpen, Scissors } from '@phosphor-icons/react'
import type { ElementType } from 'react'

export type CategoriaSlug = 'artistico' | 'escolar' | 'libreria' | 'papeleria'
export type Categoria = 'Artístico' | 'Escolar' | 'Librería' | 'Papelería'

export interface CategoriaMeta {
  slug: CategoriaSlug
  label: Categoria
  icon: ElementType
  /** Vivo — para íconos, bordes y fondos suaves. No usar como color de texto. */
  color: string
  glow: string
  /** >= 4.5:1 sobre blanco y sobre --color-bg — único uso válido como color de texto. */
  textColor: string
  desc: string
}

export const CATEGORIAS: CategoriaMeta[] = [
  {
    slug: 'artistico',
    label: 'Artístico',
    icon: Palette,
    color: '#FF6B35',
    glow: 'rgba(255,107,53,0.12)',
    textColor: '#9A3412',
    desc: 'Marcadores, lápices, acrílicos, pinceles y más',
  },
  {
    slug: 'escolar',
    label: 'Escolar',
    icon: Backpack,
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.12)',
    textColor: '#1D4ED8',
    desc: 'Cuadernos, cartucheras, mochilas y útiles',
  },
  {
    slug: 'libreria',
    label: 'Librería',
    icon: BookOpen,
    color: '#22C55E',
    glow: 'rgba(34,197,94,0.12)',
    textColor: '#166534',
    desc: 'Agendas Hello Kitty, Pusheen, Mickey y más',
  },
  {
    slug: 'papeleria',
    label: 'Papelería',
    icon: Scissors,
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.12)',
    textColor: '#7E22CE',
    desc: 'Resmas, tijeras, bisturí, cintas y compases',
  },
]

export const CATEGORIA_BY_SLUG: Record<CategoriaSlug, CategoriaMeta> = Object.fromEntries(
  CATEGORIAS.map(c => [c.slug, c])
) as Record<CategoriaSlug, CategoriaMeta>

export const CATEGORIA_BY_LABEL: Record<Categoria, CategoriaMeta> = Object.fromEntries(
  CATEGORIAS.map(c => [c.label, c])
) as Record<Categoria, CategoriaMeta>
