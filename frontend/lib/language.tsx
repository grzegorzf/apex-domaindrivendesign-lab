'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'java' | 'go'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'java',
  toggleLanguage: () => {},
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('java')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('apex_ddd_lang') as Language | null
    if (saved === 'java' || saved === 'go') {
      setLanguageState(saved)
    }
    setMounted(true)

    // BroadcastChannel: Multi-tab real-time language sync
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('apex_ddd_language_sync')
      channel.onmessage = (event) => {
        if (event.data === 'java' || event.data === 'go') {
          setLanguageState(event.data)
        }
      }
      return () => {
        channel.close()
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    const applyLang = () => {
      setLanguageState(lang)
      localStorage.setItem('apex_ddd_lang', lang)
    }

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        applyLang()
      })
    } else {
      applyLang()
    }

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('apex_ddd_language_sync')
      channel.postMessage(lang)
    }
  }

  const toggleLanguage = () => {
    const nextLang = language === 'java' ? 'go' : 'java'
    setLanguage(nextLang)
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
