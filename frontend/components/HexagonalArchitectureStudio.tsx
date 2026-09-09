'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

type HexLayer = 'adapters' | 'ports' | 'domain'

export default function HexagonalArchitectureStudio() {
  const { language } = useLanguage()
  const [selectedLayer, setSelectedLayer] = useState<HexLayer>('domain')
  const [copiedCode, setCopiedCode] = useState(false)

  const codeJava = `// Java 26+ Hexagonal Architecture (Ports & Adapters)
// 1. DOMAIN CORE: (Zero external frameworks, 100% pure Java)
package com.apex.core.orders.domain;

public class Order {
    private final OrderId id;
    private Money total;

    public void processPayment(PaymentReceipt receipt) {
        // Business invariant checks
    }
}

// 2. INBOUND PORT: Driving Interface (Use Case API)
package com.apex.core.orders.ports.inbound;
public interface PlaceOrderUseCase {
    OrderId placeOrder(PlaceOrderCommand command);
}

// 3. OUTBOUND PORT: Driven Interface (Infrastructure Contract defined BY domain)
package com.apex.core.orders.ports.outbound;
public interface OrderRepositoryPort {
    void save(Order order);
    Optional<Order> findById(OrderId id);
}

// 4. INFRASTRUCTURE ADAPTER: Outbound Implementation (PostgreSQL / Spring Data)
package com.apex.infrastructure.adapters.persistence;

@Repository
public class PostgresOrderAdapter implements OrderRepositoryPort {
    private final SpringDataJpaOrderRepository jpaRepo;

    @Override
    public void save(Order order) {
        OrderJpaEntity entity = OrderMapper.toEntity(order);
        jpaRepo.save(entity);
    }
}`

  const codeGo = `// Go 1.24 Hexagonal Architecture (Ports & Adapters via Interface Decoupling)
package domain

// 1. DOMAIN CORE: Pure domain model
type Order struct {
	ID    string
	Total float64
}

// 2. OUTBOUND PORT: Interface owned by domain, implemented by infrastructure
type OrderRepositoryPort interface {
	Save(order *Order) error
	FindByID(id string) (*Order, error)
}

// 3. INBOUND PORT: Use Case Service
type PlaceOrderUseCase interface {
	Execute(customerID string, items []string) (*Order, error)
}

// 4. INFRASTRUCTURE ADAPTER: Implements the Outbound Port
package postgres

import "domain"

type PostgresOrderAdapter struct {
	db *sql.DB
}

func (p *PostgresOrderAdapter) Save(order *domain.Order) error {
	_, err := p.db.Exec("INSERT INTO orders (id, total) VALUES ($1, $2)", order.ID, order.Total)
	return err
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
              <span className="badge-violet">Level 4 · Architectural Boundaries</span>
              <span className="badge-lime">Alistair Cockburn Canonical</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Hexagonal Architecture (Ports &amp; Adapters): Preserving Pure Domain Independence
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          Keep your Core Domain 100% pure and completely independent of databases, web frameworks, message brokers, and third-party vendors.
          In <strong>Hexagonal Architecture (Ports &amp; Adapters)</strong>, dependencies point strictly inwards: the domain lives at the center, isolated behind Inbound (Driving) and Outbound (Driven) <strong>Ports</strong>.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: The "Database-Driven" Anti-Pattern &amp; Framework Bleed
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              In traditional 3-tier architectures, domain models are tightly coupled to relational databases using JPA annotations (<code>@Entity</code>, <code>@Table</code>, <code>@Id</code>, <code>@Column</code>) and HTTP transport annotations.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              1. <em>Framework Lock-in:</em> Business algorithms cannot execute without a live Spring ApplicationContext or a running PostgreSQL database.<br />
              2. <em>Torturously Slow Test Suites:</em> Running simple domain tests requires starting database testcontainers or H2 in-memory databases, ballooning CI pipeline times from seconds to 25 minutes.<br />
              3. <em>Migration Paralysis:</em> Migrating from PostgreSQL to DynamoDB or switching from REST to gRPC requires rewriting core business classes.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Dependency Inversion via Inbound &amp; Outbound Ports
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Hexagonal Architecture isolates business rules inside a fortress, decoupling the domain through interfaces:
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>1. The Dependency Rule:</strong> Dependencies point strictly inward ($Adapters \rightarrow Ports \rightarrow Domain$). The domain has zero external imports.<br />
              <strong>2. Inbound (Driving) Ports:</strong> Use case interfaces (<code>PlaceOrderUseCase</code>) driven by REST, gRPC, or CLI adapters.<br />
              <strong>3. Outbound (Driven) Ports:</strong> Contracts defined <em>by the domain</em> (<code>OrderRepositoryPort</code>) and implemented by external Infrastructure Adapters (JPA, Mongo, Stripe). You can swap database implementations with zero changes to domain logic.
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(168, 85, 247, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(168, 85, 247, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Netflix standardized their core playback and member microservices on Hexagonal Architecture. When upgrading their microservice fleet to Java 21 and 25 with Virtual Threads, domain engines ran without a single line change because their business models contained zero Spring or database imports.
          </span>
          <span className="mono-badge" style={{ color: 'var(--violet-light)' }}>Cockburn · Ports &amp; Adapters</span>
        </div>
      </div>

      {/* Interactive Concentric Layer Inspector Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive 3-Ring Concentric Hexagonal Inspector</h3>
              <span className="live-badge"><span className="live-dot" /> Layer Isolation</span>
            </div>
            <p className="card-desc">
              Inspect how the inner Domain Core is shielded by middle Port interfaces and outer Infrastructure Adapters.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              className={`control-pill ${selectedLayer === 'domain' ? 'active-lang' : ''}`}
              onClick={() => setSelectedLayer('domain')}
            >
              💎 Core Domain (Inner)
            </button>
            <button
              type="button"
              className={`control-pill ${selectedLayer === 'ports' ? 'active-lang' : ''}`}
              onClick={() => setSelectedLayer('ports')}
            >
              🔌 Ports (Middle)
            </button>
            <button
              type="button"
              className={`control-pill ${selectedLayer === 'adapters' ? 'active-lang' : ''}`}
              onClick={() => setSelectedLayer('adapters')}
            >
              ⚙️ Adapters (Outer)
            </button>
          </div>
        </div>

        {/* Concentric Rings Visualizer */}
        <div
          style={{
            position: 'relative',
            background: '#070a12',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {/* Outer Ring: Adapters */}
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              padding: '1.25rem',
              borderRadius: 'var(--radius-xl)',
              border: `2px solid ${selectedLayer === 'adapters' ? 'var(--lime)' : 'rgba(255,255,255,0.1)'}`,
              background: selectedLayer === 'adapters' ? 'rgba(163,230,53,0.06)' : 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all var(--duration-fast) ease',
            }}
          >
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--lime)', fontWeight: 700 }}>
              OUTER LAYER: INFRASTRUCTURE ADAPTERS (REST, PostgreSQL, Kafka, Stripe SDK)
            </span>

            {/* Middle Ring: Ports */}
            <div
              style={{
                width: '90%',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                border: `2px solid ${selectedLayer === 'ports' ? 'var(--violet)' : 'rgba(255,255,255,0.1)'}`,
                background: selectedLayer === 'ports' ? 'rgba(168,85,247,0.08)' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all var(--duration-fast) ease',
              }}
            >
              <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--violet-light)', fontWeight: 700 }}>
                MIDDLE LAYER: PORTS (Inbound Use Cases &amp; Outbound Repository Interfaces)
              </span>

              {/* Inner Core: Domain */}
              <div
                style={{
                  width: '80%',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedLayer === 'domain' ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'}`,
                  background: selectedLayer === 'domain' ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.02)',
                  textAlign: 'center',
                  transition: 'all var(--duration-fast) ease',
                }}
              >
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 800, color: 'var(--cyan)' }}>
                  INNER LAYER: PURE DOMAIN CORE
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Entities, Value Objects, Domain Events, Invariant Rules
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="code-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {language === 'java' ? 'Java 26+ · Hexagonal Ports & Adapters Architecture' : 'Go 1.24 · Hexagonal Interface Decoupling'}
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
