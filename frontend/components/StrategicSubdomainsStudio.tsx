'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

interface Subsystem {
  id: string
  name: string
  category: 'core' | 'supporting' | 'generic'
  complexity: number // 1-10
  differentiation: number // 1-10
  description: string
  recommendation: string
}

const SUBSYSTEMS: Subsystem[] = [
  {
    id: 'pricing',
    name: 'Dynamic High-Frequency Pricing Engine',
    category: 'core',
    complexity: 9,
    differentiation: 10,
    description: 'Proprietary algorithmic model adjusting pricing based on competitor bids, real-time demand curves, and inventory velocity.',
    recommendation: 'BUILD IN-HOUSE: Assign top in-house senior engineers. Zero framework bleed. Pure domain logic.',
  },
  {
    id: 'underwriting',
    name: 'Real-Time Fraud & Credit Scoring',
    category: 'core',
    complexity: 8,
    differentiation: 9,
    description: 'Sub-millisecond risk evaluation classifying transactions before payment authorization.',
    recommendation: 'BUILD IN-HOUSE: IP differentiator. Continuous iteration with domain risk officers.',
  },
  {
    id: 'replenishment',
    name: 'Warehouse Stock Replenishment Planner',
    category: 'supporting',
    complexity: 6,
    differentiation: 4,
    description: 'Calculates reorder points for low-stock SKUs based on supplier delivery SLAs.',
    recommendation: 'SUPPORTING: Custom build or outsource. Keep simple; do not over-engineer.',
  },
  {
    id: 'invoice',
    name: 'Custom B2B Invoice PDF Generator',
    category: 'supporting',
    complexity: 4,
    differentiation: 3,
    description: 'Generates fiscal invoices matching enterprise client procurement templates.',
    recommendation: 'SUPPORTING: Use standard templating libraries. Low ROI for advanced abstractions.',
  },
  {
    id: 'auth',
    name: 'Identity, OAuth2 & SAML SSO',
    category: 'generic',
    complexity: 7,
    differentiation: 1,
    description: 'User login, MFA verification, session token issuance, and LDAP integration.',
    recommendation: 'GENERIC: BUY / OFF-THE-SHELF (Keycloak, Auth0, Okta). Do not write custom auth cryptography!',
  },
  {
    id: 'email',
    name: 'Transactional Email Dispatcher',
    category: 'generic',
    complexity: 5,
    differentiation: 1,
    description: 'SMTP delivery, bounce handling, and spam score optimization.',
    recommendation: 'GENERIC: BUY SAAS (Postmark, SendGrid, AWS SES). Integrating via Anti-Corruption Layer.',
  },
]

export default function StrategicSubdomainsStudio() {
  const { language } = useLanguage()
  const [selectedSubsystem, setSelectedSubsystem] = useState<Subsystem>(SUBSYSTEMS[0])

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-intermediate">Level 2 · Strategic Design</span>
        <h1 className="studio-title">Strategic Subdomains & Core Distillation</h1>
        <p className="studio-lead">
          Not all software in an enterprise is created equal. Strategic DDD dictates that 80% of engineering firepower and senior architectural focus must be channeled into the <strong>Core Domain</strong>, while generic subsystems are bought off-the-shelf.
        </p>
      </div>

      <div className="grid-3col" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ borderTop: '3px solid var(--cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)' }}>1. Core Domain</strong>
            <span className="spec-badge">BUILD</span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            The primary competitive advantage that differentiates your business from rivals. High complexity, bespoke algorithms, and deep domain expertise.
          </p>
          <div style={{ marginTop: '0.75rem', fontSize: 'var(--text-2xs)', color: 'var(--cyan)' }}>
            ✓ Top senior talent &nbsp;·&nbsp; ✓ Zero tech debt tolerance
          </div>
        </div>

        <div className="glass-panel" style={{ borderTop: '3px solid var(--lime)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--lime)' }}>2. Supporting Subdomain</strong>
            <span className="spec-badge" style={{ background: 'rgba(163,230,53,0.15)', color: 'var(--lime)' }}>CUSTOMIZE</span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Complements the core business. Necessary for operations but not an industry differentiator. Can be built quickly, outsourced, or iterated with lightweight frameworks.
          </p>
          <div style={{ marginTop: '0.75rem', fontSize: 'var(--text-2xs)', color: 'var(--lime)' }}>
            ✓ Rapid turnaround &nbsp;·&nbsp; ✓ Pragmatic design
          </div>
        </div>

        <div className="glass-panel" style={{ borderTop: '3px solid var(--amber)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--amber)' }}>3. Generic Subdomain</strong>
            <span className="spec-badge" style={{ background: 'rgba(251,191,36,0.15)', color: 'var(--amber)' }}>BUY / SAAS</span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Standard problems solved across every company (Auth, SMTP, Payments, CRM). Writing custom code here burns engineering capital with zero ROI.
          </p>
          <div style={{ marginTop: '0.75rem', fontSize: 'var(--text-2xs)', color: 'var(--amber)' }}>
            ✓ Off-the-shelf OSS/SaaS &nbsp;·&nbsp; ✓ Wrapped by ACL
          </div>
        </div>
      </div>

      {/* Interactive 2D Strategic Matrix & Subsystem Classifier */}
      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Interactive Subsystem Strategic Classifier
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Select an enterprise capability to evaluate its Strategic Investment Profile and ROI:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {SUBSYSTEMS.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubsystem(sub)}
                style={{
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: selectedSubsystem.id === sub.id ? 'var(--surface-hover)' : 'var(--surface)',
                  border: `1px solid ${selectedSubsystem.id === sub.id ? 'var(--cyan)' : 'var(--border)'}`,
                  color: 'var(--text)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700 }}>{sub.name}</div>
                  <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>{sub.description.slice(0, 55)}...</div>
                </div>
                <span
                  className="spec-badge"
                  style={{
                    background: sub.category === 'core' ? 'rgba(56,189,248,0.2)' : sub.category === 'supporting' ? 'rgba(163,230,53,0.2)' : 'rgba(251,191,36,0.2)',
                    color: sub.category === 'core' ? 'var(--cyan)' : sub.category === 'supporting' ? 'var(--lime)' : 'var(--amber)',
                  }}
                >
                  {sub.category.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Strategic Analysis Output */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Architectural Investment Decision
          </h3>

          <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.25rem' }}>
              {selectedSubsystem.name}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {selectedSubsystem.description}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>Competitive Advantage:</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--cyan)' }}>
                  {selectedSubsystem.differentiation} / 10
                </div>
              </div>
              <div>
                <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>Domain Complexity:</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--amber)' }}>
                  {selectedSubsystem.complexity} / 10
                </div>
              </div>
            </div>

            <div style={{ background: '#070b12', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: 'var(--text-2xs)', textTransform: 'uppercase', color: 'var(--lime)', fontWeight: 700 }}>
                Strategic Guidance:
              </span>
              <p style={{ fontSize: 'var(--text-xs)', color: '#f1f5f9', marginTop: '0.25rem', lineHeight: 1.5 }}>
                {selectedSubsystem.recommendation}
              </p>
            </div>
          </div>

          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            💡 <strong>Core Distillation Rule:</strong> Never allow Generic Subdomain details (like OAuth tokens or SendGrid webhook JSON structures) to pollute your Core Domain entities. Protect your Core Domain with an Anti-Corruption Layer!
          </div>
        </div>
      </div>

      {/* Polyglot Code Example */}
      <div className="code-container">
        <div className="code-header">
          <div className="code-lang-tag">
            {language === 'java' ? '☕ JAVA 26+ CORE DOMAIN ISOLATION' : '🐹 GO 1.24 CORE DOMAIN PORTS'}
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
            Decoupling Core Domain from Generic Services
          </span>
        </div>
        <pre className="code-pre">
          {language === 'java' ? (
`// Java 26: Core Domain Interface completely free of generic infrastructure dependencies
package com.apex.ddd.pricing.domain;

import java.math.BigDecimal;

// Pure Domain Model in the CORE DOMAIN
public record DynamicQuote(
    QuoteId id,
    Sku sku,
    Money basePrice,
    SurgeMultiplier surgeFactor,
    Currency currency
) {
    public Money calculateFinalPrice() {
        return basePrice.multiply(surgeFactor.value());
    }
}

// Outbound Port: Core domain requires competitor data, but knows NOTHING about external scraping APIs
public interface CompetitorPriceFeedPort {
    CompetitorIndex fetchRealtimeIndex(Sku sku);
}

// In the GENERIC SUBDOMAIN (Infrastructure Adapter): We wire up AWS/HTTP scrapers
// Notice that the Core Domain never imports third-party HTTP clients or Jackson/Gson!`
          ) : (
`// Go 1.24: Core Domain Logic with Port Definition
package pricing

// DynamicQuote lives in the CORE DOMAIN - pure Go types
type DynamicQuote struct {
	ID          string
	SKU         string
	BasePrice   int64 // Stored in cents (zero floating point drift)
	SurgeFactor float64
}

func (q DynamicQuote) CalculateFinalPrice() int64 {
	return int64(float64(q.BasePrice) * q.SurgeFactor)
}

// CompetitorPriceFeedPort is an outbound port owned by the Core Domain.
// Generic Subdomain adapters (HTTP scrapers, Redis feeds) implement this interface.
type CompetitorPriceFeedPort interface {
	FetchRealtimeIndex(sku string) (float64, error)
}`
          )}
        </pre>
      </div>
    </div>
  )
}
