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
    <>
      <div className="scroll-progress-bar" />

      {/* Primary Sticky Header */}
      <header className="top-nav">
        <div className="nav-content">
          <div className="brand-wrapper">
            <div className="brand-icon-box">
              <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
                <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />
                <circle cx="32" cy="32" r="14" stroke="#818cf8" strokeWidth="2" fill="rgba(56, 189, 248, 0.2)" />
                <circle cx="32" cy="32" r="5" fill="#38bdf8" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="brand-title">Apex Domain-Driven Design Lab</span>
                <span className="live-badge">
                  <span className="live-dot" /> DDD ENGINE
                </span>
              </div>
              <div className="brand-subtitle">
                Enterprise Strategic & Tactical Patterns · Java 26+ & Go 1.24
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="nav-actions">
            {/* Java 26 / Go 1.24 Language Switcher */}
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
              title="Toggle theme (Midnight / Daylight)"
            >
              <span>{theme === 'midnight' ? '🌙 Midnight' : '☀️ Daylight'}</span>
            </button>

            {/* Technical Specs Overlay Trigger */}
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

      {/* Horizontal Sub-Navigation Tab Bar */}
      <div className="nav-container">
        {canScrollLeft && (
          <button
            type="button"
            className="nav-scroll-btn"
            onClick={() => scrollNav('left')}
            aria-label="Scroll left"
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
        >
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'ubiquitous' ? 'active' : ''}`}
            onClick={() => switchTab('ubiquitous')}
          >
            <span>💬</span> Ubiquitous Language
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'subdomains' ? 'active' : ''}`}
            onClick={() => switchTab('subdomains')}
          >
            <span>🎯</span> Strategic Subdomains
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'context-mapping' ? 'active' : ''}`}
            onClick={() => switchTab('context-mapping')}
          >
            <span>🗺️</span> Context Mapping (ACL)
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'value-objects' ? 'active' : ''}`}
            onClick={() => switchTab('value-objects')}
          >
            <span>💎</span> Value Objects
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'aggregates' ? 'active' : ''}`}
            onClick={() => switchTab('aggregates')}
          >
            <span>🛡️</span> Aggregates & Invariants
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'domain-events' ? 'active' : ''}`}
            onClick={() => switchTab('domain-events')}
          >
            <span>🔄</span> Events & Sourcing
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'domain-services' ? 'active' : ''}`}
            onClick={() => switchTab('domain-services')}
          >
            <span>⚙️</span> Domain Services
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'hexagonal' ? 'active' : ''}`}
            onClick={() => switchTab('hexagonal')}
          >
            <span>🏛️</span> Hexagonal Ports
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'sagas' ? 'active' : ''}`}
            onClick={() => switchTab('sagas')}
          >
            <span>⚡</span> Distributed Sagas
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'blueprint' ? 'active' : ''}`}
            onClick={() => switchTab('blueprint')}
          >
            <span>🧭</span> Master Blueprint
          </button>
        </nav>
        {canScrollRight && (
          <button
            type="button"
            className="nav-scroll-btn"
            onClick={() => scrollNav('right')}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>

      {/* Active Studio View */}
      <main>
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

      <TechnicalSpecsOverlay isOpen={isSpecsOpen} onClose={() => setIsSpecsOpen(false)} />
    </>
  )
}
