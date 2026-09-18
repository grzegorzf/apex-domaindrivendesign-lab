'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/lib/theme'
import { useLanguage } from '@/lib/language'

import UbiquitousLanguageStudio from '@/components/UbiquitousLanguageStudio'
import StrategicSubdomainsStudio from '@/components/StrategicSubdomainsStudio'
import ContextMappingStudio from '@/components/ContextMappingStudio'
import ValueObjectsStudio from '@/components/ValueObjectsStudio'
import AggregatesStudio from '@/components/AggregatesStudio'
import DomainEventsStudio from '@/components/DomainEventsStudio'
import DomainServicesStudio from '@/components/DomainServicesStudio'
import HexagonalArchitectureStudio from '@/components/HexagonalArchitectureStudio'
import SagasProcessManagerStudio from '@/components/SagasProcessManagerStudio'
import DddCurriculumBlueprint from '@/components/DddCurriculumBlueprint'
import TechnicalSpecsOverlay from '@/components/TechnicalSpecsOverlay'
import ApexDddVisualArt from '@/components/ApexDddVisualArt'

type DddTab =
  | 'ubiquitous'
  | 'subdomains'
  | 'context-mapping'
  | 'value-objects'
  | 'aggregates'
  | 'domain-events'
  | 'domain-services'
  | 'hexagonal'
  | 'sagas'
  | 'blueprint'

export default function DomainDrivenDesignLabPage() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<DddTab>('ubiquitous')
  const [isSpecsOpen, setIsSpecsOpen] = useState(false)

  const switchTab = (tab: DddTab) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setActiveTab(tab)
      })
    } else {
      setActiveTab(tab)
    }
  }

  // Desktop horizontal navigation scrolling
  const tabsRef = useRef<HTMLElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  const updateScrollButtons = () => {
    if (!tabsRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
  }

  useEffect(() => {
    const el = tabsRef.current
    if (!el) return
    updateScrollButtons()
    el.addEventListener('scroll', updateScrollButtons, { passive: true })
    window.addEventListener('resize', updateScrollButtons)
    return () => {
      el.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (e.deltaY !== 0 && tabsRef.current) {
      tabsRef.current.scrollLeft += e.deltaY * 1.2
    }
  }

  const scrollNav = (direction: 'left' | 'right') => {
    if (!tabsRef.current) return
    const offset = direction === 'left' ? -280 : 280
    tabsRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (!tabsRef.current) return
    isDragging.current = true
    startX.current = e.pageX - tabsRef.current.offsetLeft
    scrollStart.current = tabsRef.current.scrollLeft
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !tabsRef.current) return
    e.preventDefault()
    const x = e.pageX - tabsRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    tabsRef.current.scrollLeft = scrollStart.current - walk
  }

  const onMouseUpOrLeave = () => {
    isDragging.current = false
  }

  return (
    <div className="app-container">
      {/* Sticky Site Navigation Header */}
      <header className="site-nav">
        <div className="site-nav-inner">
          {/* Brand Group */}
          <div
            className="brand-badge"
            onClick={() => switchTab('ubiquitous')}
            style={{ cursor: 'pointer' }}
          >
            <div className="brand-monogram" aria-hidden="true">
              DDD
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="brand-title">Apex Domain-Driven Design Lab</span>
                <span className="live-badge">
                  <span className="live-dot" /> DDD ENGINE
                </span>
              </div>
              <div className="brand-subtitle">
                Enterprise Strategic &amp; Tactical Patterns · Polyglot Engine · 2027
              </div>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="nav-actions">
            {/* Global Language Switcher (Java 26 vs Go 1.24) */}
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                padding: '2px',
                gap: '2px',
              }}
            >
              <button
                type="button"
                className={`control-pill ${language === 'java' ? 'active-lang' : ''}`}
                onClick={() => setLanguage('java')}
                style={{ border: 'none', borderRadius: 'var(--radius-full)' }}
                title="Switch all code examples to Java 26 (Records, Sealed Interfaces, Virtual Threads)"
              >
                ☕ Java 26
              </button>
              <button
                type="button"
                className={`control-pill ${language === 'go' ? 'active-lang' : ''}`}
                onClick={() => setLanguage('go')}
                style={{ border: 'none', borderRadius: 'var(--radius-full)' }}
                title="Switch all code examples to Go 1.24 (Goroutines, Channels, Ports & Adapters)"
              >
                🐹 Go 1.24
              </button>
            </div>

            {/* Theme Switcher */}
            <button
              type="button"
              className="control-pill"
              onClick={toggleTheme}
              title="Switch between Midnight and Daylight themes"
            >
              <span>{theme === 'midnight' ? '🌙 Midnight' : '☀️ Daylight'}</span>
            </button>

            {/* Technical Specs Trigger */}
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsSpecsOpen(true)}
              style={{ padding: '0.4rem 0.85rem', fontSize: 'var(--text-2xs)', borderRadius: 'var(--radius-full)' }}
            >
              📊 Technical Specs
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Lab Hero Banner (Ref. Image 2 & apex_visual_system.md) */}
      <section className="lab-hero-banner" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'clamp(1.25rem, 3vw, 2.5rem) clamp(1.25rem, 3.5vw, 3rem)' }}>
          <div className="apex-card" style={{ cursor: 'default' }}>
            {/* Visual Art Canvas (Left) */}
            <div className="apex-card-art">
              <ApexDddVisualArt showBadge={true} interactive={true} />
            </div>

            {/* Technical Copy & Telemetry HUD (Right) */}
            <div className="apex-card-copy">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
                  <span className="section-overline">INTERACTIVE SYSTEMS &amp; ENGINEERING LABS</span>
                  <span className="badge-violet">ARCHITECTURE &amp; SYSTEMS</span>
                </div>

                <h1 className="editorial-title" style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.1rem)', marginBottom: '0.5rem' }}>
                  Apex Domain-Driven <span className="serif-accent">Design Lab</span>
                </h1>

                <div className="hero-subtitle" style={{ marginBottom: '1rem' }}>
                  Tactical &amp; strategic DDD simulation workbench
                </div>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  Enterprise architectural laboratory demystifying Domain-Driven Design—turning abstract invariants, aggregate boundaries, transactional outboxes, event-sourcing streams, and distributed sagas into tangible, interactive telemetry with real-time Java 26+ and Go 1.24 polyglot engines.
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                  <span className="mono-badge">TypeScript</span>
                  <span className="mono-badge">React 19</span>
                  <span className="mono-badge">Domain-Driven Design</span>
                  <span className="mono-badge">Event Sourcing</span>
                  <span className="mono-badge">Hexagonal Architecture</span>
                  <span className="mono-badge">Compensating Sagas</span>
                </div>
              </div>

              {/* Action and Telemetry Strip */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="live-badge"><span className="live-dot" /> 10 ACTIVE STUDIOS</span>
                  <span style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                    ENGINE: {language === 'java' ? 'JAVA 26+' : 'GO 1.24'}
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsSpecsOpen(true)}
                  style={{ padding: '0.45rem 1rem', fontSize: 'var(--text-2xs)' }}
                >
                  Explore Educational Lab ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs Sub-Bar with desktop wheel + chevron + touch scrolling */}
      <div className="nav-container">
        {canScrollLeft && (
          <button
            type="button"
            className="nav-scroll-btn"
            onClick={() => scrollNav('left')}
            aria-label="Scroll navigation left"
            title="Scroll left"
          >
            ‹
          </button>
        )}
        <nav
          ref={tabsRef}
          className="nav-tabs-wrapper"
          onWheel={handleWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          aria-label="Domain-Driven Design Lab Navigation"
        >
          <button
            type="button"
            className={`nav-tab ${activeTab === 'ubiquitous' ? 'active' : ''}`}
            onClick={() => switchTab('ubiquitous')}
          >
            💬 Ubiquitous Language
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'subdomains' ? 'active' : ''}`}
            onClick={() => switchTab('subdomains')}
          >
            🎯 Strategic Subdomains
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'context-mapping' ? 'active' : ''}`}
            onClick={() => switchTab('context-mapping')}
          >
            🗺️ Context Mapping (ACL)
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'value-objects' ? 'active' : ''}`}
            onClick={() => switchTab('value-objects')}
          >
            💎 Value Objects
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'aggregates' ? 'active' : ''}`}
            onClick={() => switchTab('aggregates')}
          >
            🛡️ Aggregates &amp; Invariants
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'domain-events' ? 'active' : ''}`}
            onClick={() => switchTab('domain-events')}
          >
            🔄 Events &amp; Sourcing
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'domain-services' ? 'active' : ''}`}
            onClick={() => switchTab('domain-services')}
          >
            ⚙️ Domain Services
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'hexagonal' ? 'active' : ''}`}
            onClick={() => switchTab('hexagonal')}
          >
            🏛️ Hexagonal Architecture
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'sagas' ? 'active' : ''}`}
            onClick={() => switchTab('sagas')}
          >
            ⚡ Distributed Sagas
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'blueprint' ? 'active' : ''}`}
            onClick={() => switchTab('blueprint')}
          >
            🧭 Master Blueprint
          </button>
        </nav>
        {canScrollRight && (
          <button
            type="button"
            className="nav-scroll-btn"
            onClick={() => scrollNav('right')}
            aria-label="Scroll navigation right"
            title="Scroll right"
          >
            ›
          </button>
        )}
      </div>

      {/* Main Content & Studio Viewport */}
      <main className="main-content">
        {activeTab === 'ubiquitous' && <UbiquitousLanguageStudio />}
        {activeTab === 'subdomains' && <StrategicSubdomainsStudio />}
        {activeTab === 'context-mapping' && <ContextMappingStudio />}
        {activeTab === 'value-objects' && <ValueObjectsStudio />}
        {activeTab === 'aggregates' && <AggregatesStudio />}
        {activeTab === 'domain-events' && <DomainEventsStudio />}
        {activeTab === 'domain-services' && <DomainServicesStudio />}
        {activeTab === 'hexagonal' && <HexagonalArchitectureStudio />}
        {activeTab === 'sagas' && <SagasProcessManagerStudio />}
        {activeTab === 'blueprint' && <DddCurriculumBlueprint />}
      </main>

      {/* Site Footer */}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <strong>Apex Domain-Driven Design Lab</strong> · Baseline 2026 Enterprise Polyglot Systems · MIT Open Source
          </div>
          <div style={{ opacity: 0.8 }}>
            Polyglot Domain Core: Java 26+ (Records, Sealed Hierarchies, Virtual Threads) &amp; Go 1.24 (Goroutines, Channels, Ports &amp; Adapters)
          </div>
        </div>
      </footer>

      <TechnicalSpecsOverlay isOpen={isSpecsOpen} onClose={() => setIsSpecsOpen(false)} />
    </div>
  )
}
