'use client'

import React, { useEffect } from 'react'
import { useLanguage } from '@/lib/language'
import { useTheme } from '@/lib/theme'
import ApexDddVisualArt from './ApexDddVisualArt'

interface TechnicalSpecsOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function TechnicalSpecsOverlay({ isOpen, onClose }: TechnicalSpecsOverlayProps) {
  const { language, setLanguage } = useLanguage()
  const { theme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="split-drawer-backdrop" onClick={onClose}>
      <div
        className="split-drawer-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Apex Domain-Driven Design Lab Technical Specifications"
      >
        {/* Left Half: Dark Canvas with Signature DDD Visual System Artwork (Image 4) */}
        <div className="split-drawer-left">
          <ApexDddVisualArt showBadge={true} interactive={false} style={{ height: '70%', minHeight: '18rem' }} />

          {/* Telemetry Micro-HUD on Left Pane */}
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              marginTop: '1.25rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
            }}
          >
            <div className="telemetry-meter">
              <div className="meter-header">
                <span className="meter-label">Boundary Invariants</span>
                <span className="meter-value">100% Guarded</span>
              </div>
              <div className="meter-track">
                <div className="meter-fill" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="telemetry-meter">
              <div className="meter-header">
                <span className="meter-label">Polyglot Engine</span>
                <span className="meter-value" style={{ color: 'var(--violet-light)' }}>
                  {language === 'java' ? 'Java 26+' : 'Go 1.24'}
                </span>
              </div>
              <div className="meter-track">
                <div className="meter-fill" style={{ width: '100%', background: 'var(--violet)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Half: Warm Parchment Editorial Sheet (Image 4) */}
        <div className="split-drawer-right split-drawer-content" style={{ background: '#f1efe8', color: '#131217' }}>
          {/* Circular Close Button */}
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close specifications dialog"
            title="Close (Esc)"
          >
            ✕
          </button>

          {/* Editorial Overline & Lab Title */}
          <div>
            <div className="section-overline">INTERACTIVE EDUCATIONAL LAB</div>
            <h2
              className="editorial-title"
              style={{
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                margin: '0.4rem 0 0.35rem',
                color: 'var(--apex-ink)',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              Apex Domain-Driven Design Lab
            </h2>
            <div
              className="serif-accent"
              style={{
                fontSize: '1.15rem',
                color: '#554f60',
                fontStyle: 'italic',
              }}
            >
              Tactical &amp; strategic DDD simulation workbench
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.65,
              color: '#3b3644',
            }}
          >
            An intuitive, visual laboratory for Domain-Driven Design and enterprise distributed architectures.
            Interactively demonstrates ubiquitous language modeling, aggregate root consistency perimeters,
            invariant rule enforcement, transactional outbox CDC pipelines, event-sourced append-only ledgers,
            hexagonal ports &amp; adapters, and distributed compensating sagas.
          </p>

          {/* Educational Focus & Mental Models Callout Box */}
          <div className="dialog-educational-box">
            <span className="dialog-educational-title">EDUCATIONAL FOCUS &amp; MENTAL MODELS</span>
            <p>
              Built as an approachable, visual introduction to Domain-Driven Design fundamentals. Core enterprise
              concepts like aggregate boundaries, transaction boundaries, and eventual consistency often feel
              abstract until you watch them enforce rules under concurrent load. This laboratory lets engineers
              inspect domain invariants, test transactional outbox guarantees, replay event streams with time travel,
              and orchestrate compensating rollback sagas in both Java 26+ and Go 1.24.
            </p>
          </div>

          {/* Key Capabilities & Interactive Scenarios */}
          <div>
            <div
              style={{
                font: '700 0.68rem var(--font-mono)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#655e70',
                marginBottom: '0.5rem',
              }}
            >
              KEY CAPABILITIES &amp; INTERACTIVE SCENARIOS
            </div>
            <ul className="scenario-list">
              <li className="scenario-item">
                Visual Aggregate Root boundary: Invariant consistency perimeter &amp; sole gateway
              </li>
              <li className="scenario-item">
                Live Invariant Evaluation Matrix: Real-time volume caps &amp; transition validation
              </li>
              <li className="scenario-item">
                Transactional Outbox Dual-Commit: Database ACID commit paired with CDC event publishing
              </li>
              <li className="scenario-item">
                Event Sourcing Append-Only Ledger: Immutable stream with scrubbable time-travel replay
              </li>
              <li className="scenario-item">
                Strategic Subdomains &amp; Context Mapping: Core vs Supporting vs Generic with Anti-Corruption Layer (ACL)
              </li>
              <li className="scenario-item">
                Hexagonal Architecture Topology: Primary driving vs secondary driven ports &amp; adapters
              </li>
              <li className="scenario-item">
                Distributed Sagas Coordinator: Choreographed &amp; orchestrated compensating rollback workflows
              </li>
            </ul>
          </div>

          {/* Polyglot Engine Telemetry & Web Standards */}
          <div
            style={{
              background: '#e9e6dd',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #d6d1c4',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ font: '700 0.65rem var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#686173' }}>
                  ACTIVE CODE ENGINE
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--apex-ink)' }}>
                  {language === 'java' ? '☕ Java 26+ (Virtual Threads & Records)' : '🐹 Go 1.24 (Goroutines & Channels)'}
                </div>
              </div>

              {/* Language Switch Buttons */}
              <div style={{ display: 'inline-flex', gap: '4px', background: '#ded9cc', padding: '3px', borderRadius: 'var(--radius-full)' }}>
                <button
                  type="button"
                  onClick={() => setLanguage('java')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: language === 'java' ? '#ffffff' : 'transparent',
                    color: language === 'java' ? '#8b5cf6' : '#554f60',
                    font: '700 0.68rem var(--font-mono)',
                    cursor: 'pointer',
                    boxShadow: language === 'java' ? '0 2px 6px rgba(0,0,0,0.12)' : 'none',
                  }}
                >
                  Java 26
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('go')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: language === 'go' ? '#ffffff' : 'transparent',
                    color: language === 'go' ? '#4d7c0f' : '#554f60',
                    font: '700 0.68rem var(--font-mono)',
                    cursor: 'pointer',
                    boxShadow: language === 'go' ? '0 2px 6px rgba(0,0,0,0.12)' : 'none',
                  }}
                >
                  Go 1.24
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem', color: '#4d4756' }}>
              <div><strong>Port Binding:</strong> <code>PORT 3017</code></div>
              <div><strong>Compliance:</strong> WCAG 2.2 AA Passed</div>
              <div><strong>Stack:</strong> Next.js 16 (React 19)</div>
              <div><strong>Theme Mode:</strong> <span style={{ textTransform: 'capitalize' }}>{theme}</span></div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="btn-primary"
            onClick={onClose}
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            Close Specs &amp; Return to Lab
          </button>
        </div>
      </div>
    </div>
  )
}
