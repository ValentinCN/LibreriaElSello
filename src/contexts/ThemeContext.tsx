import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface ThemeCtx {
  dark: boolean
  toggle: () => void
}

const Ctx = createContext<ThemeCtx>({ dark: false, toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Dark mode desactivado temporalmente — siempre claro.
  // TODO: reimplementar al final del proyecto.
  const [dark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }, [])

  return (
    <Ctx.Provider value={{ dark, toggle: () => {} }}>
      {children}
    </Ctx.Provider>
  )
}

export const useTheme = () => useContext(Ctx)
