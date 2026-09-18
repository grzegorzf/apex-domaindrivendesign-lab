import type { Metadata, Viewport } from 'next'
import './styles.css'
import { ThemeProvider } from '@/lib/theme'
import { LanguageProvider } from '@/lib/language'

export const viewport: Viewport = {
  themeColor: '#0d0c10',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Apex Domain-Driven Design Lab — Enterprise DDD from Beginner to Expert',
  description: 'Comprehensive interactive engineering lab and curriculum mastering Domain-Driven Design (DDD) from foundational ubiquitous language and rich aggregates to strategic bounded context mapping, anti-corruption layers, hexagonal architecture, and distributed sagas with switchable Java 26+ and Go 1.24 code engines.',
  keywords: [
    'Domain-Driven Design',
    'DDD',
    'Ubiquitous Language',
    'Bounded Context',
    'Context Mapping',
    'Strategic Design',
    'Aggregate Root',
    'Value Object',
    'Domain Invariants',
    'Domain Events',
    'Event Sourcing',
    'Domain Services',
    'Hexagonal Architecture',
    'Ports and Adapters',
    'Anti-Corruption Layer',
    'Distributed Sagas',
    'Java 26',
    'Go 1.24',
    'Clean Architecture',
  ],
  authors: [{ name: 'Apex Engineering Labs' }],
  creator: 'Apex Systems',
  publisher: 'Apex Systems',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'Apex Domain-Driven Design Lab — Enterprise DDD from Beginner to Expert',
    description: 'Interactive architectural laboratory exploring core DDD patterns with real-time Java 26+ and Go 1.24 polyglot code engines.',
    siteName: 'Apex Domain-Driven Design Lab',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Domain-Driven Design Lab — Enterprise DDD from Beginner to Expert',
    description: 'Interactive architectural laboratory exploring core DDD patterns with real-time Java 26+ and Go 1.24 polyglot code engines.',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="theme-midnight">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
