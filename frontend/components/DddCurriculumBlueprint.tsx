'use client'

import React, { useState } from 'react'

export default function DddCurriculumBlueprint() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    ubiquitous: true,
    valueObjects: true,
    aggregates: true,
    hexagonal: false,
    sagas: false,
    acl: true,
    events: true,
    subdomains: false,
  })

  const [decisionQuestion, setDecisionQuestion] = useState<'entity-or-vo' | 'acl-or-conformist' | 'service-or-entity'>('entity-or-vo')

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const maturityScore = Math.round((Object.values(checkedItems).filter(Boolean).length / 8) * 100)

  return (
    <div className="tab-pane-container">
      {/* Comprehensive Architectural & Problem-Solution Hero Card */}
      <div className="studio-card" style={{ background: 'var(--surface-elevated)', borderLeft: '4px solid var(--lime)', marginBottom: 'var(--space-6)' }}>
        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-lime">Level 5 · Curriculum &amp; Blueprint</span>
              <span className="badge-cyan">Architecture Decision Engine</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Master DDD Blueprint: Strategic Decision Tree &amp; Enterprise Maturity Engine
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          A definitive architectural roadmap navigating Domain-Driven Design from day-one fundamentals to enterprise-scale distributed systems.
          Use the decision tree to navigate complex architectural tradeoffs and measure your organization's DDD maturity.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: The "DDD Cargo-Cult" &amp; Premature Distributed Complexity
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Engineering teams often jump straight into tactical distributed complexity (Kafka event sourcing, distributed sagas, 40 microservices) without first establishing Ubiquitous Language or Core Subdomain boundaries.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              The organization creates an unmaintainable "Distributed Monolith" where simple CRUD requests require synchronous roundtrips across 8 microservices. Engineers suffer eventual consistency bugs and distributed transaction deadlocks for capabilities that should have been a simple modular monolith or an off-the-shelf SaaS.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Progressive 5-Stage Maturity &amp; Strict Tactical Triage
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              DDD must be adopted systematically from strategic clarity to tactical building blocks:
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>1. Strategic First:</strong> Define Bounded Contexts, Ubiquitous Language, and Core Subdomains before writing any microservices.<br />
              <strong>2. Tactical Encapsulation:</strong> Replace primitive types with Value Objects; guard invariants with Aggregate Roots.<br />
              <strong>3. Decoupled Isolation:</strong> Use Hexagonal Ports &amp; Adapters to protect the core domain from framework churn, using Sagas only where physical database isolation demands it.
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(163, 230, 53, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--lime-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Shopify and GitHub avoided microservice gridlock by building modular monoliths using DDD Bounded Contexts enforced at compile time. They extracted independent microservices only for specific subdomains where extreme operational scaling necessitated it.
          </span>
          <span className="mono-badge" style={{ color: 'var(--lime)' }}>DDD Executive Roadmap</span>
        </div>
      </div>

      {/* 5-Stage Progression Roadmap */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">The 5-Stage Domain-Driven Design Progression</h3>
              <span className="badge-cyan">Curriculum Path</span>
            </div>
            <p className="card-desc">
              From day-one linguistic foundations to bleeding-edge distributed compensating workflows.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <div className="metric-card" style={{ borderTop: '3px solid var(--lime)' }}>
            <span className="badge-lime">LEVEL 1</span>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '4px 0' }}>Ubiquitous Language</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Eliminating linguistic ambiguity. Shared vocabulary between business experts and code.
            </p>
          </div>

          <div className="metric-card" style={{ borderTop: '3px solid var(--cyan)' }}>
            <span className="badge-cyan">LEVEL 2</span>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '4px 0' }}>Strategic Design</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Core vs Supporting vs Generic Subdomains. Context Mapping with Anti-Corruption Layers (ACL).
            </p>
          </div>

          <div className="metric-card" style={{ borderTop: '3px solid var(--violet)' }}>
            <span className="badge-violet">LEVEL 3</span>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '4px 0' }}>Tactical Building Blocks</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Value Objects (structural equality), Aggregates &amp; Invariant Boundaries, Domain Events.
            </p>
          </div>

          <div className="metric-card" style={{ borderTop: '3px solid var(--amber)' }}>
            <span className="badge-amber">LEVEL 4</span>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '4px 0' }}>Hexagonal Isolation</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Ports &amp; Adapters architecture. Keeping the core domain 100% free of Spring, ORM, and SQL.
            </p>
          </div>

          <div className="metric-card" style={{ borderTop: '3px solid var(--rose)' }}>
            <span className="badge-rose">LEVEL 5</span>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '4px 0' }}>Distributed Sagas</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Event Sourcing append-only ledgers, CQRS read projections, and compensating Sagas.
            </p>
          </div>
        </div>
      </div>

      {/* Decision Wizard & Maturity Checklist Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive DDD Decision Wizard &amp; Maturity Audit</h3>
              <span className="live-badge"><span className="live-dot" /> Audit &amp; Assessment</span>
            </div>
            <p className="card-desc">
              Evaluate key architectural decisions and audit your codebase against the 8-point enterprise DDD standard.
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-6)' }}>
          {/* Decision Tree */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span className="metric-label" style={{ color: 'var(--cyan)' }}>Architecture Decision Tree</span>
            <div style={{ display: 'flex', gap: '4px', marginTop: '8px', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`control-pill ${decisionQuestion === 'entity-or-vo' ? 'active-lang' : ''}`}
                onClick={() => setDecisionQuestion('entity-or-vo')}
              >
                Entity vs Value Object?
              </button>
              <button
                type="button"
                className={`control-pill ${decisionQuestion === 'acl-or-conformist' ? 'active-lang' : ''}`}
                onClick={() => setDecisionQuestion('acl-or-conformist')}
              >
                ACL vs Conformist?
              </button>
              <button
                type="button"
                className={`control-pill ${decisionQuestion === 'service-or-entity' ? 'active-lang' : ''}`}
                onClick={() => setDecisionQuestion('service-or-entity')}
              >
                Service vs Method?
              </button>
            </div>

            <div style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)' }}>
              {decisionQuestion === 'entity-or-vo' && (
                <>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--cyan)', marginBottom: '4px' }}>
                    Q: Does this object have an ongoing identity that spans state mutations?
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <strong>Rule:</strong> If you care <em>which</em> instance it is over time (e.g., a Customer who changes their name or an Order transitioning status), it is an <strong>Entity</strong>.<br />
                    If you only care about <em>what attributes</em> it has (e.g. 50 USD, postal code 90210, email address), it must be an immutable <strong>Value Object</strong> with structural equality.
                  </p>
                </>
              )}

              {decisionQuestion === 'acl-or-conformist' && (
                <>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--violet-light)', marginBottom: '4px' }}>
                    Q: Does the upstream system's data model match your ubiquitous language?
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <strong>Rule:</strong> If upstream is a legacy SAP ERP, vendor SaaS, or poorly designed database, build an <strong>Anti-Corruption Layer (ACL)</strong> to translate payloads.<br />
                    Only use <strong>Conformist</strong> if upstream is a well-crafted industry standard (e.g. Stripe API, SWIFT financial protocol) that your downstream team has decided to standardize upon.
                  </p>
                </>
              )}

              {decisionQuestion === 'service-or-entity' && (
                <>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--lime)', marginBottom: '4px' }}>
                    Q: Does the business calculation naturally belong inside a single entity?
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <strong>Rule:</strong> If logic modifies internal aggregate invariants (e.g. <code>order.applyDiscount()</code>), keep it inside the Aggregate Root entity.<br />
                    If logic crosses multiple aggregates or involves complex external policy rules (e.g. cross-border Forex settlement, Tax nexus, Bank transfer), encapsulate it inside a stateless <strong>Domain Service</strong>.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Maturity Checklist */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <span className="metric-label" style={{ color: 'var(--lime)' }}>Team DDD Maturity Assessment</span>
              <span className="metric-value" style={{ fontSize: 'var(--text-lg)', color: maturityScore >= 80 ? 'var(--lime)' : maturityScore >= 50 ? 'var(--cyan)' : '#fbbf24' }}>
                {maturityScore}%
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { key: 'ubiquitous', label: 'Ubiquitous Language defined & validated with domain experts' },
                { key: 'valueObjects', label: 'Zero Primitive Obsession (Money, IDs are immutable Value Objects)' },
                { key: 'aggregates', label: 'Aggregates enforce invariants; one transaction per aggregate' },
                { key: 'subdomains', label: 'Core, Supporting, and Generic Subdomains clearly classified' },
                { key: 'acl', label: 'Legacy integrations isolated behind Anti-Corruption Layers' },
                { key: 'hexagonal', label: 'Core domain is 100% free of Spring/ORM database imports' },
                { key: 'events', label: 'Past-tense Domain Events published on state mutations' },
                { key: 'sagas', label: 'Cross-boundary workflows managed via Compensating Sagas' },
              ].map((item) => (
                <label
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checkedItems[item.key] ?? false}
                    onChange={() => toggleCheck(item.key)}
                    style={{ accentColor: 'var(--lime)' }}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
