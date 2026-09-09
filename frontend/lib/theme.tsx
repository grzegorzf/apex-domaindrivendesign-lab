'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'midnight' | 'daylight'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'midnight',
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('midnight')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('apex_ddd_theme') as Theme | null
    if (saved === 'daylight' || saved === 'midnight') {
      setTheme(saved)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'midnight' : 'daylight')
    }
    setMounted(true)

    // BroadcastChannel: Multi-tab real-time theme synchronization
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('apex_ddd_theme_sync')
      channel.onmessage = (event) => {
        if (event.data === 'midnight' || event.data === 'daylight') {
          setTheme(event.data)
        }
      }
      return () => {
        channel.close()
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const applyClasses = () => {
      document.documentElement.classList.remove('theme-midnight', 'theme-daylight')
      document.documentElement.classList.add(`theme-${theme}`)
      document.body.classList.remove('theme-midnight', 'theme-daylight')
      document.body.classList.add(`theme-${theme}`)
    }

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        applyClasses()
      })
    } else {
      applyClasses()
    }
    localStorage.setItem('apex_ddd_theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    const nextTheme = theme === 'midnight' ? 'daylight' : 'midnight'
    setTheme(nextTheme)
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('apex_ddd_theme_sync')
      channel.postMessage(nextTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
