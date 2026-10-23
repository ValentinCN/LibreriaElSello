import type { PostgrestError } from '@supabase/supabase-js'
import { supabase } from './supabase'

export type SubscriberExportRow = { email: string; created_at: string }

const EXPORT_PAGE = 1000 // tope por defecto de filas por request en Supabase

export async function getSubscribersForExport(): Promise<
  { data: SubscriberExportRow[]; error: null } | { data: null; error: PostgrestError }
> {
  const rows: SubscriberExportRow[] = []
  for (let from = 0; ; from += EXPORT_PAGE) {
    const { data, error } = await supabase
      .from('subscribers')
      .select('email, created_at')
      .order('created_at', { ascending: true })
      .order('id', { ascending: true })
      .range(from, from + EXPORT_PAGE - 1)

    if (error) return { data: null, error }
    rows.push(...(data as SubscriberExportRow[]))
    if (data.length < EXPORT_PAGE) return { data: rows, error: null }
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SubscribeResult = 'ok' | 'already_subscribed' | 'invalid_email' | 'error'

export async function subscribe(rawEmail: string, source: string): Promise<SubscribeResult> {
  const email = rawEmail.trim().toLowerCase()
  if (!EMAIL_RE.test(email)) return 'invalid_email'

  try {
    const { error } = await supabase.from('subscribers').insert({
      email,
      consent: true,
      consent_at: new Date().toISOString(),
      source,
    })

    if (!error) return 'ok'
    if (error.code === '23505') return 'already_subscribed'

    console.error('[el-Sello] subscribe error:', error.message)
    return 'error'
  } catch {
    return 'error'
  }
}
