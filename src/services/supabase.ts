import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !key) {
  throw new Error(
    '[el-Sello] Faltan env vars de Supabase, revisá .env.local y reiniciá el dev server.\n' +
    '  Requeridas: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY'
  )
}

console.log('[el-Sello] Supabase URL cargada:', url)

export const supabase = createClient(url, key)
