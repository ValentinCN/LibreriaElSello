const TZ = 'America/Argentina/Buenos_Aires'
const SEP = ';' // Excel en español usa ";" como separador de listas

/** Escapa un campo y neutraliza fórmulas (CSV injection): los emails los carga cualquiera. */
export function csvField(value: string): string {
  let v = value
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`
  if (/[";\r\n]/.test(v)) v = `"${v.replace(/"/g, '""')}"`
  return v
}

export function buildCsv(headers: string[], rows: string[][]): string {
  const lines = [headers, ...rows].map((r) => r.map(csvField).join(SEP))
  // BOM UTF-8: sin él Excel abre el archivo como ANSI y rompe los acentos.
  return '﻿' + lines.join('\r\n')
}

function partsAR(date: Date, opts: Intl.DateTimeFormatOptions) {
  const parts = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, ...opts }).formatToParts(date)
  return Object.fromEntries(parts.map((p) => [p.type, p.value])) as Record<string, string>
}

/** DD/MM/AAAA HH:mm en hora de Buenos Aires. */
export function formatFechaAR(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const p = partsAR(d, {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  })
  return `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute}`
}

/** AAAA-MM-DD de hoy en hora de Buenos Aires. */
export function fechaArchivoAR(date = new Date()): string {
  const p = partsAR(date, { day: '2-digit', month: '2-digit', year: 'numeric' })
  return `${p.year}-${p.month}-${p.day}`
}

export function downloadCsv(filename: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
