import type { CSSProperties } from 'react'

// Inputs de 16px (iOS hace zoom con menos) y botones de 44px de alto (touch).

export const labelStyle: CSSProperties = {
  display: 'block',
  color: '#1a3a50',
  fontSize: '0.85rem',
  fontWeight: 600,
  marginBottom: '0.3rem',
}

export const inputStyle: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  minHeight: 44,
  padding: '0.55rem 0.7rem',
  border: '1.5px solid #cfe0ee',
  borderRadius: 6,
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  color: '#1a3a50',
  background: '#fff',
}

const buttonBase: CSSProperties = {
  minHeight: 44,
  borderRadius: 8,
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  fontWeight: 600,
  padding: '0.5rem 1.1rem',
  cursor: 'pointer',
}

export const primaryButton: CSSProperties = {
  ...buttonBase,
  background: '#2d6490',
  border: '1.5px solid #2d6490',
  color: '#fff',
}

export const secondaryButton: CSSProperties = {
  ...buttonBase,
  background: 'transparent',
  border: '1.5px solid #5a8ab0',
  color: '#2d6490',
}

export const errorBox: CSSProperties = {
  color: '#c0392b',
  background: '#fdf2f2',
  border: '1px solid #f5c6c6',
  borderRadius: 6,
  padding: '0.6rem 0.8rem',
  margin: '0 0 1rem',
  fontSize: '0.875rem',
}

export const PERMISOS_MSG = 'No tenés permisos para modificar productos.'

/** PGRST116 = el update/select no devolvió fila (RLS lo filtró); 42501 = RLS rechazó un insert. */
export function esErrorDePermisos(code: string | undefined): boolean {
  return code === 'PGRST116' || code === '42501'
}

/**
 * Acepta "1500", "1500,50", "1.500", "1.500,50" y "12.5".
 * Un punto seguido de exactamente 3 dígitos se toma como separador de miles.
 */
export function parsePrecio(raw: string): number {
  let s = raw.trim().replace(/\s|\$/g, '')
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.')
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '')
  return /^\d+(\.\d+)?$/.test(s) ? Number(s) : NaN
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`
}
