'use client'

import React, { useEffect } from 'react'
import { useLanguage } from '@/lib/language'
import { useTheme } from '@/lib/theme'

interface TechnicalSpecsOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function TechnicalSpecsOverlay({ isOpen, onClose }: TechnicalSpecsOverlayProps) {
  const { language } = useLanguage()
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 200ms ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '100%',
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          boxShadow: 'var(--shadow-main)',
          padding: '2rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>Technical Specs</span>
              <span className="spec-badge">PORT 3017</span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              Apex Domain-Driven Design Lab · Telemetry & Standards
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: 'var(--radius-sm)',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            ✕
          </button>
        </div>

        {/* Runtime & Language Telemetry */}
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <h4 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '0.75rem' }}>
            Polyglot Execution Environment
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: 'var(--text-xs)' }}>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Active Engine:</span>
              <div style={{ fontWeight: 700, color: language === 'java' ? 'var(--cyan)' : 'var(--lime)' }}>
                {language === 'java' ? '☕ Java 26+ (Structured Concurrency)' : '🐹 Go 1.24 (Goroutines & Channels)'}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Theme Mode:</span>
              <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{theme}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Rendering Runtime:</span>
              <div style={{ fontWeight: 700 }}>Next.js 16 (React 19)</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Multi-Tab Sync:</span>
              <div style={{ fontWeight: 700, color: 'var(--lime)' }}>Active (BroadcastChannel)</div>
            </div>
          </div>
        </div>

        {/* DDD Standards Matrix */}
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <h4 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--violet)', marginBottom: '0.75rem' }}>
            Domain-Driven Design Curriculum
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--text-xs)' }}>
            <li>🎯 <strong>Ubiquitous Language:</strong> Disambiguation dictionaries & rich domain models</li>
            <li>🗺️ <strong>Strategic Design:</strong> Core vs Supporting vs Generic subdomains & Context Mapping</li>
            <li>💎 <strong>Tactical Patterns:</strong> Value Objects, Entities, Aggregates, Invariants, Events</li>
            <li>🔄 <strong>Event Sourcing:</strong> Append-only ledgers & time-travel state reconstruction</li>
            <li>🏛️ <strong>Hexagonal Architecture:</strong> Inbound/Outbound Ports, Zero-Dependency Core</li>
            <li>⚡ <strong>Distributed Sagas:</strong> Process Managers & Compensating Rollback Transactions</li>
          </ul>
        </div>

        {/* High-Tech Web Standards */}
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <h4 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: '0.75rem' }}>
            Web Platform Capabilities (Baseline 2026)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: 'var(--text-xs)' }}>
            <div>✨ <strong>View Transitions API Level 2:</strong> Seamless theme & polyglot morphs</div>
            <div>🔘 <strong>Invoker Commands API:</strong> Declarative <code>commandfor</code> dialog toggles</div>
            <div>🎨 <strong>OKLCH & Color-Mix:</strong> Perceptually uniform wide-gamut palettes</div>
            <div>📐 <strong>Corner-Shape Squircle:</strong> Mathematical continuous curvature</div>
            <div>📜 <strong>Scroll-Driven Animations:</strong> Real-time scroll timeline indicators</div>
            <div>📶 <strong>BroadcastChannel:</strong> Multi-tab real-time theme & language sync</div>
          </div>
        </div>

        {/* Accessibility & Compliance */}
        <div className="glass-panel" style={{ padding: '1rem' }}>
          <h4 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.75rem' }}>
            Accessibility & Deployment
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: 'var(--text-xs)' }}>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>WCAG Compliance:</span>
              <div style={{ fontWeight: 700, color: 'var(--lime)' }}>2.2 AA Passed</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Static Export:</span>
              <div style={{ fontWeight: 700 }}>Supported (GitHub/GitLab)</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Docker Mode:</span>
              <div style={{ fontWeight: 700 }}>Daemon / Multi-Stage</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Typography:</span>
              <div style={{ fontWeight: 700 }}>Plus Jakarta / Mono / Serif</div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={onClose}
          style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
        >
          Close Specs Overlay
        </button>
      </div>
    </div>
  )
}
