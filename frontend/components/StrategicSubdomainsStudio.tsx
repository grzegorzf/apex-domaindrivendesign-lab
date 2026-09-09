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
    recommendation: 'BUILD BESPOKE IN-HOUSE: Assign top in-house senior engineers. Zero framework bleed. Pure domain logic.',
  },
  {
    id: 'underwriting',
    name: 'Real-Time Fraud & Risk Scoring',
    category: 'core',
    complexity: 8,
    differentiation: 9,
    description: 'Sub-millisecond risk evaluation classifying transactions before payment authorization to minimize chargebacks.',
    recommendation: 'BUILD BESPOKE IN-HOUSE: Primary IP differentiator. Continuous iteration with domain risk officers.',
  },
  {
    id: 'replenishment',
    name: 'Warehouse Stock Replenishment Planner',
    category: 'supporting',
    complexity: 6,
    differentiation: 4,
    description: 'Calculates reorder points for low-stock SKUs based on supplier delivery SLAs and safety stock levels.',
    recommendation: 'SUPPORTING: Custom build or pragmatic team. Keep simple; avoid gold-plating or unnecessary distributed frameworks.',
  },
  {
    id: 'invoice',
    name: 'Custom B2B Invoice PDF Generator',
    category: 'supporting',
    complexity: 4,
    differentiation: 3,
    description: 'Generates fiscal invoices matching localized enterprise client procurement templates.',
    recommendation: 'SUPPORTING: Use standard templating libraries. Low ROI for advanced tactical patterns.',
  },
  {
    id: 'auth',
    name: 'Identity, OAuth2 & SAML SSO',
    category: 'generic',
    complexity: 7,
    differentiation: 1,
    description: 'User login, MFA verification, session token issuance, and enterprise LDAP federation.',
    recommendation: 'GENERIC: BUY / OFF-THE-SHELF (Keycloak, Auth0, Okta). Never write custom auth cryptography in-house!',
  },
  {
    id: 'email',
    name: 'Transactional Email & SMS Gateway',
    category: 'generic',
    complexity: 5,
    differentiation: 1,
    description: 'SMTP delivery, bounce handling, SMS shortcodes, and carrier reputation optimization.',
    recommendation: 'GENERIC: BUY SAAS (Postmark, SendGrid, Twilio). Integrate strictly via an Anti-Corruption Layer.',
  },
]

export default function StrategicSubdomainsStudio() {
  const { language } = useLanguage()
  const [selectedSubsystem, setSelectedSubsystem] = useState<Subsystem>(SUBSYSTEMS[0])
  const [copiedCode, setCopiedCode] = useState(false)

  const codeJava = `// Java 26+ Core Domain Module Structure with Clean Architecture Boundaries
// Core Domain: com.apex.core.pricing (Zero external framework dependencies)
package com.apex.core.pricing.domain;

import java.math.BigDecimal;
import java.time.Instant;

public record PricingQuote(
    QuoteId quoteId,
    SkuId skuId,
    Money calculatedPrice,
    MarginMultiplier appliedMargin,
    Instant validUntil
) {
    public boolean isExpired(Instant now) {
        return now.isAfter(validUntil);
    }
}

// Supporting Module: com.apex.supporting.replenishment
package com.apex.supporting.replenishment;
public record ReorderSignal(SkuId sku, int suggestedBatchUnits) {}

// Generic Integration: com.apex.generic.identity.adapter (ACL over Keycloak)
package com.apex.generic.identity.adapter;
public class KeycloakTokenVerifier implements IdentityPort {
    // Translates external JWT claims into internal SecurityPrincipal
}`

  const codeGo = `// Go 1.24 Strategic Module Boundaries (Hexagonal Package Distillation)
package domain

import "time"

// CORE DOMAIN: Pure Domain Types (No database or HTTP frameworks allowed)
type PricingQuote struct {
	QuoteID         string
	SkuID           string
	CalculatedPrice float64
	ValidUntil      time.Time
}

func (q *PricingQuote) IsExpired(now time.Time) bool {
	return now.After(q.ValidUntil)
}

// SUPPORTING SUBDOMAIN: Pragmatic CRUD Operations
type ReplenishmentPlan struct {
	SkuID          string
	ReorderTrigger int
}

// GENERIC SUBDOMAIN: Anti-Corruption Layer for Third-Party Identity
type IdentityAdapter struct {
	// Consumes third-party OAuth2 tokens and returns domain Principal
}`

  const handleCopy = () => {
    const text = language === 'java' ? codeJava : codeGo
    navigator.clipboard.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="tab-pane-container">
      {/* Comprehensive Architectural & Problem-Solution Hero Card */}
      <div className="studio-card" style={{ background: 'var(--surface-elevated)', borderLeft: '4px solid var(--violet)', marginBottom: 'var(--space-6)' }}>
        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-violet">Level 2 · Strategic Design</span>
              <span className="badge-lime">Core Distillation</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Strategic Subdomains: Channeling Engineering Firepower into Competitive Moats
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          Not all software inside an enterprise is created equal. Strategic DDD forces architects and engineering leaders to classify enterprise capabilities into Core, Supporting, and Generic subdomains. Misallocating engineering effort into commodity infrastructure instead of proprietary competitive differentiators is the single most pervasive cause of corporate software failure.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: The "Not-Invented-Here" Trap &amp; Uniform Effort Anti-Pattern
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Engineering teams frequently treat every microservice with identical architectural priority and equal staffing.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              Top developers spend months writing bespoke OAuth2 servers, home-grown message brokers, or custom PDF invoice engines. Meanwhile, the actual revenue engine (dynamic pricing, real-time fraud scoring, carrier routing) is staffed with junior developers, rushed to market with technical debt, and becomes a brittle bottleneck.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Strategic Subdomain Distillation &amp; Triage
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              DDD splits the enterprise domain into three distinct architectural investment horizons:
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>1. Core Domain (Build Bespoke):</strong> The primary competitive differentiator. Staffed with top senior engineers; isolated with zero framework bleed.<br />
              <strong>2. Supporting Subdomain (Pragmatic Customization):</strong> Necessary operational capabilities that are not market differentiators. Build simply without over-engineering.<br />
              <strong>3. Generic Subdomain (Buy SaaS / OSS):</strong> Standard commodity problems (Auth, CRM, SMTP). Adopt off-the-shelf solutions and isolate them behind Anti-Corruption Layers.
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(168, 85, 247, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(168, 85, 247, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Netflix treats AWS infrastructure and Okta identity as Generic Subdomains (bought off-the-shelf), while investing 90% of internal R&amp;D into their Core Domains: Chaos Engineering and the Dynamic Content Recommendation Graph. Stripe treats its Double-Entry Ledger and Fraud Detection (Radar) as its sacred Core Domains.
          </span>
          <span className="mono-badge" style={{ color: 'var(--violet-light)' }}>Evans Ch. 15 · Distillation</span>
        </div>
      </div>

      {/* Subdomain Category Overview Matrix */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card" style={{ borderTop: '3px solid var(--cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-cyan">1. CORE DOMAIN</span>
            <span className="mono-badge" style={{ color: 'var(--cyan)' }}>BUILD BESPOKE</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Primary business differentiator. High complexity, proprietary intellectual property.
          </div>
          <div style={{ marginTop: '10px', fontSize: 'var(--text-2xs)', color: 'var(--cyan)', fontWeight: 700 }}>
            ★ Top Senior Talent &nbsp;·&nbsp; ★ Pure Domain Model
          </div>
        </div>

        <div className="metric-card" style={{ borderTop: '3px solid var(--lime)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-lime">2. SUPPORTING</span>
            <span className="mono-badge" style={{ color: 'var(--lime)' }}>CUSTOMIZE</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Operational complement. Essential to support the business, but not an industry differentiator.
          </div>
          <div style={{ marginTop: '10px', fontSize: 'var(--text-2xs)', color: 'var(--lime)', fontWeight: 700 }}>
            ★ Rapid Delivery &nbsp;·&nbsp; ★ Pragmatic CRUD
          </div>
        </div>

        <div className="metric-card" style={{ borderTop: '3px solid var(--amber)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-amber">3. GENERIC</span>
            <span className="mono-badge" style={{ color: '#fbbf24' }}>BUY SAAS / OSS</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Standard commodity software shared by all businesses. Zero competitive advantage.
          </div>
          <div style={{ marginTop: '10px', fontSize: 'var(--text-2xs)', color: '#fbbf24', fontWeight: 700 }}>
            ★ Commercial Off-The-Shelf &nbsp;·&nbsp; ★ Strict ACL
          </div>
        </div>
      </div>

      {/* Interactive Subsystem Classifier & Evaluation Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive Subsystem Strategic Classifier &amp; Investment Engine</h3>
              <span className="live-badge"><span className="live-dot" /> Live Evaluation</span>
            </div>
            <p className="card-desc">
              Select an enterprise capability to evaluate its competitive advantage score, domain complexity, and architecture investment recommendation.
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          {/* Subsystem List */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <strong style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--cyan)', display: 'block', marginBottom: 'var(--space-3)' }}>
              Select Enterprise Capability
            </strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {SUBSYSTEMS.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubsystem(sub)}
                  style={{
                    textAlign: 'left',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: selectedSubsystem.id === sub.id ? 'var(--surface-hover)' : 'var(--surface)',
                    border: `1px solid ${selectedSubsystem.id === sub.id ? 'var(--cyan)' : 'var(--border)'}`,
                    color: 'var(--text)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all var(--duration-fast)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700 }}>{sub.name}</div>
                    <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>{sub.description.slice(0, 50)}...</div>
                  </div>
                  <span className={sub.category === 'core' ? 'badge-cyan' : sub.category === 'supporting' ? 'badge-lime' : 'badge-amber'}>
                    {sub.category.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Architectural Decision Output */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <strong style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--violet)', display: 'block', marginBottom: 'var(--space-3)' }}>
              Architectural Investment Strategy
            </strong>

            <div style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>
                {selectedSubsystem.name}
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
                {selectedSubsystem.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="metric-card">
                  <div className="metric-label">Competitive Advantage</div>
                  <div className="metric-value" style={{ color: 'var(--cyan)' }}>{selectedSubsystem.differentiation} / 10</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Domain Complexity</div>
                  <div className="metric-value" style={{ color: '#fbbf24' }}>{selectedSubsystem.complexity} / 10</div>
                </div>
              </div>

              <div style={{ padding: '10px 12px', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--lime)' }}>
                <span style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                  Architecture Recommendation
                </span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)', fontWeight: 600 }}>
                  {selectedSubsystem.recommendation}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="code-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {language === 'java' ? 'Java 26+ · Subdomain Hexagonal Boundaries' : 'Go 1.24 · Subdomain Hexagonal Packages'}
            </span>
            <button
              type="button"
              className="control-pill"
              onClick={handleCopy}
              style={{ fontSize: 'var(--text-2xs)', padding: '2px 8px' }}
            >
              {copiedCode ? '✓ Copied' : '📋 Copy Code'}
            </button>
          </div>
          <pre>{language === 'java' ? codeJava : codeGo}</pre>
        </div>
      </div>
    </div>
  )
}
