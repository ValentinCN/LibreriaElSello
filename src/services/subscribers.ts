import { supabase } from './supabase'

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
  } catch (_e) {
    return 'error'
  }
}
