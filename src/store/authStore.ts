import { create } from 'zustand'
import { supabase } from '../services/supabase'
import type { Session } from '@supabase/supabase-js'

interface AuthState {
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  initAuth: () => () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  loading: true,

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null })
  },

  initAuth: () => {
    supabase.auth.getSession().then(({ data }) => {
      set({ session: data.session, loading: false })
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, loading: false })
    })

    return () => subscription.unsubscribe()
  },
}))
