import { create } from 'zustand'
import { supabase } from '../services/supabase'
import type { Session } from '@supabase/supabase-js'

interface AuthState {
  session: Session | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  initAuth: () => () => void
}

async function checkIsAdmin(session: Session | null): Promise<boolean> {
  if (!session) return false
  const { data, error } = await supabase.rpc('is_admin')
  return !error && data === true
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  loading: true,
  isAdmin: false,

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null, isAdmin: false })
  },

  initAuth: () => {
    supabase.auth.getSession().then(async ({ data }) => {
      const isAdmin = await checkIsAdmin(data.session)
      set({ session: data.session, isAdmin, loading: false })
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // TOKEN_REFRESHED es silencioso (cada ~1h) y no cambia de usuario:
      // no recalcular ni tocar loading evita que el dashboard parpadee a "Cargando...".
      if (event === 'TOKEN_REFRESHED') {
        set({ session })
        return
      }
      set({ loading: true })
      checkIsAdmin(session).then((isAdmin) => set({ session, isAdmin, loading: false }))
    })

    return () => subscription.unsubscribe()
  },
}))
