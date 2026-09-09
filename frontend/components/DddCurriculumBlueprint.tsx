'use client'

import React, { useState } from 'react'

export default function DddCurriculumBlueprint() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    ubiquitous: true,
    valueObjects: true,
  })

  const [decisionQuestion, setDecisionQuestion] = useState<'entity-or-vo' | 'acl-or-conformist' | 'service-or-entity'>('entity-or-vo')

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const maturityScore = Math.round((Object.values(checkedItems).filter(Boolean).length / 8) * 100)

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-expert">Level 5 · Curriculum & Blueprint</span>
        <h1 className="studio-title">Master DDD Blueprint & Architecture Wizard</h1>
        <p className="studio-lead">
          A definitive architectural roadmap navigating Domain-Driven Design from day-one fundamentals to enterprise-scale distributed systems.
          Use the decision tree to evaluate your domain models and measure your team's DDD maturity.
        </p>
      </div>

      {/* 5-Stage Visual Curriculum Roadmap */}
      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          The 5-Stage Domain-Driven Design Progression
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid var(--lime)' }}>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--lime)', fontWeight: 700 }}>LEVEL 1</div>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.25rem 0' }}>Ubiquitous Language</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Eliminating linguistic ambiguity. Shared vocabulary between domain experts and developers. Rich vs Anemic models.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid var(--cyan)' }}>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--cyan)', fontWeight: 700 }}>LEVEL 2</div>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.25rem 0' }}>Strategic Design</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Core, Supporting, and Generic Subdomains. Context Mapping (ACL, Conformist, Shared Kernel, OHS, Published Language).
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid var(--violet)' }}>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--violet)', fontWeight: 700 }}>LEVEL 3</div>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.25rem 0' }}>Tactical Building Blocks</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Value Objects (structural equality), Entities (identity), Aggregates & Invariant Boundaries, Domain Events.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid var(--amber)' }}>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--amber)', fontWeight: 700 }}>LEVEL 4</div>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.25rem 0' }}>Hexagonal Isolation</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Ports and Adapters architecture. Keeping the core domain 100% free of Spring, ORM, SQL, and HTTP framework bleed.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderTop: '3px solid var(--rose)' }}>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--rose)', fontWeight: 700 }}>LEVEL 5</div>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.25rem 0' }}>Distributed Sagas & Sourcing</strong>
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              Event Sourcing append-only ledgers, CQRS projections, Outbox CDC, and multi-context compensating Sagas.
            </p>
          </div>
        </div>
      </div>

      {/* Decision Wizard & Maturity Checklist */}
      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        {/* Interactive Architecture Decision Tree */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Interactive DDD Decision Wizard
          </h3>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
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
              Domain Service vs Method?
            </button>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            {decisionQuestion === 'entity-or-vo' && (
              <div>
                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)' }}>
                  Decision Rule: Do we care about WHICH one it is, or only WHAT it is?
                </strong>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                  <li>• <strong>Make it a Value Object:</strong> If you only care about its attributes (Money, Address, Color, Dimensions). Value Objects are immutable and have structural equality.</li>
                  <li>• <strong>Make it an Entity:</strong> If two instances with identical attributes must remain distinct, or if state changes over a long lifecycle (Customer, Order, BankAccount).</li>
                </ul>
              </div>
            )}

            {decisionQuestion === 'acl-or-conformist' && (
              <div>
                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--lime)' }}>
                  Decision Rule: How much do you trust the upstream contract?
                </strong>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                  <li>• <strong>Build an Anti-Corruption Layer (ACL):</strong> When upstream is a legacy monolith, third-party vendor, or unstable API. Protect your domain from foreign semantics.</li>
                  <li>• <strong>Be a Conformist:</strong> Only when the upstream model is an industry standard (e.g. ISO 20022 banking messages, standard OAuth2 claims) where translation provides zero ROI.</li>
                </ul>
              </div>
            )}

            {decisionQuestion === 'service-or-entity' && (
              <div>
                <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--amber)' }}>
                  Decision Rule: Does the behavior belong to a single entity naturally?
                </strong>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                  <li>• <strong>Put it on the Entity/Aggregate:</strong> Always default to placing business logic on the entity that owns the data.</li>
                  <li>• <strong>Create a Domain Service:</strong> Only when an operation naturally involves multiple disparate aggregates (e.g. fund transfer between two accounts) or complex statutory algorithms (Tax nexus).</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Team DDD Maturity Checklist */}
        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--lime)', textTransform: 'uppercase' }}>
              Enterprise DDD Maturity Meter
            </h3>
            <span className="spec-badge" style={{ background: 'rgba(163,230,53,0.15)', color: 'var(--lime)' }}>
              SCORE: {maturityScore}%
            </span>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Evaluate your architecture against the 8 golden commandments of Domain-Driven Design:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--text-xs)' }}>
            {[
              { id: 'ubiquitous', label: 'Domain experts and engineers use the exact same vocabulary (Ubiquitous Language).' },
              { id: 'valueObjects', label: 'Zero primitive obsession: Money, Email, IDs are strongly typed immutable Value Objects.' },
              { id: 'aggregates', label: 'Business invariants are strictly guarded inside Aggregate Roots.' },
              { id: 'oneTx', label: 'Each database transaction modifies exactly ONE aggregate instance.' },
              { id: 'referenceById', label: 'Aggregates reference other aggregates by ID only (never by pointer).' },
              { id: 'portsAdapters', label: 'Domain Core has ZERO framework/database annotations or imports.' },
              { id: 'acl', label: 'Third-party APIs and legacy systems are wrapped in an Anti-Corruption Layer.' },
              { id: 'sagas', label: 'Cross-context transactions use asynchronous Sagas with compensating actions.' },
            ].map((item) => (
              <label
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: checkedItems[item.id] ? 'var(--surface)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={!!checkedItems[item.id]}
                  onChange={() => toggleCheck(item.id)}
                  style={{ accentColor: 'var(--lime)' }}
                />
                <span style={{ color: checkedItems[item.id] ? 'var(--text)' : 'var(--text-secondary)' }}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
