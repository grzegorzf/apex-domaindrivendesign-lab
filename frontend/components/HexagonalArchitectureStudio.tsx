'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

type HexLayer = 'adapters' | 'ports' | 'domain'

export default function HexagonalArchitectureStudio() {
  const { language } = useLanguage()
  const [selectedLayer, setSelectedLayer] = useState<HexLayer>('domain')

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-advanced">Level 4 · Architectural Boundaries</span>
        <h1 className="studio-title">Hexagonal Architecture (Ports & Adapters)</h1>
        <p className="studio-lead">
          Keep your Core Domain 100% pure and independent of frameworks, databases, and network transports.
          In <strong>Hexagonal Architecture</strong>, the domain lives at the center, isolated behind Inbound (Driving) and Outbound (Driven) <strong>Ports</strong>.
        </p>
      </div>

      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        {/* Interactive Hexagonal Ring Visualizer */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Interactive Hexagonal Onion Rings
          </h3>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <button
              type="button"
              className={`control-pill ${selectedLayer === 'domain' ? 'active-lang' : ''}`}
              onClick={() => setSelectedLayer('domain')}
            >
              💎 Core Domain (Inner Ring)
            </button>
            <button
              type="button"
              className={`control-pill ${selectedLayer === 'ports' ? 'active-lang' : ''}`}
              onClick={() => setSelectedLayer('ports')}
            >
              🔌 Ports (Middle Ring)
            </button>
            <button
              type="button"
              className={`control-pill ${selectedLayer === 'adapters' ? 'active-lang' : ''}`}
              onClick={() => setSelectedLayer('adapters')}
            >
              ⚙️ Adapters (Outer Ring)
            </button>
          </div>

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
            }}
          >
            {/* Outer Ring: Adapters */}
            <div
              style={{
                width: '100%',
                maxWidth: '420px',
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
                OUTER RING: INFRASTRUCTURE ADAPTERS (REST, Postgres, Kafka, Stripe)
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
                <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--violet)', fontWeight: 700 }}>
                  MIDDLE RING: PORTS (Use Cases & Repository Interfaces)
                </span>

                {/* Inner Core: Domain */}
                <div
                  style={{
                    width: '80%',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${selectedLayer === 'domain' ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'}`,
                    background: selectedLayer === 'domain' ? 'rgba(56,189,248,0.12)' : '#101726',
                    textAlign: 'center',
                    boxShadow: selectedLayer === 'domain' ? '0 0 20px var(--cyan-glow)' : 'none',
                    transition: 'all var(--duration-fast) ease',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--cyan)', fontWeight: 800 }}>
                    INNER CORE: DOMAIN MODEL
                  </span>
                  <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Zero Frameworks · Pure Java / Go
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Layer Architectural Governance */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Layer Purity & Dependency Rule
          </h3>

          {selectedLayer === 'domain' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--text-xs)' }}>
              <strong style={{ color: 'var(--cyan)' }}>The Pure Domain Core:</strong>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Contains Entities, Aggregates, Value Objects, and Domain Services. The Domain knows nothing about HTTP, Spring Boot, Gin, SQL, MongoDB, or AWS.
              </p>
              <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--lime)', fontWeight: 700 }}>Allowed Imports:</span>
                <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-2xs)', marginTop: '0.25rem' }}>
                  Standard library types (e.g. <code>java.math.BigDecimal</code>, <code>time.Time</code>). ZERO framework annotations!
                </div>
              </div>
            </div>
          )}

          {selectedLayer === 'ports' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--text-xs)' }}>
              <strong style={{ color: 'var(--violet)' }}>Driving & Driven Ports:</strong>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <strong>Driving (Inbound) Ports:</strong> Define use case contracts exposed to controllers (e.g. <code>CreateOrderUseCase</code>).<br />
                <strong>Driven (Outbound) Ports:</strong> Define interfaces for external capabilities needed by the domain (e.g. <code>OrderRepositoryPort</code>, <code>PaymentGatewayPort</code>).
              </p>
              <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>Dependency Inversion:</span>
                <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-2xs)', marginTop: '0.25rem' }}>
                  The domain declares the port interface. The outer infrastructure layer implements it. Dependencies strictly point INWARD!
                </div>
              </div>
            </div>
          )}

          {selectedLayer === 'adapters' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--text-xs)' }}>
              <strong style={{ color: 'var(--lime)' }}>Infrastructure Adapters:</strong>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                The glue between tech stacks and ports. For example, <code>PostgresOrderRepositoryAdapter</code> implements <code>OrderRepositoryPort</code> by executing SQL queries via JPA or pgx.
              </p>
              <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--amber)', fontWeight: 700 }}>Framework Segregation:</span>
                <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-2xs)', marginTop: '0.25rem' }}>
                  If you swap PostgreSQL for MongoDB or upgrade Spring Boot, not a single line of Core Domain code changes.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Polyglot Code Implementation */}
      <div className="code-container">
        <div className="code-header">
          <div className="code-lang-tag">
            {language === 'java' ? '☕ JAVA 26+ HEXAGONAL PORTS & REPOSITORY ADAPTER' : '🐹 GO 1.24 PORTS & ADAPTERS'}
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
            Strict Dependency Inversion
          </span>
        </div>
        <pre className="code-pre">
          {language === 'java' ? (
`// 1. IN CORE DOMAIN: Zero framework dependencies
package com.apex.ddd.order.domain.port;

public interface OrderRepositoryPort {
    Optional<Order> findById(OrderId id);
    void save(Order order);
}

// 2. IN INFRASTRUCTURE LAYER: Implements the domain port using PostgreSQL / Spring Data
package com.apex.ddd.order.infrastructure.adapter;

import com.apex.ddd.order.domain.Order;
import com.apex.ddd.order.domain.port.OrderRepositoryPort;
import org.springframework.stereotype.Repository;

@Repository
public final class PostgresOrderRepositoryAdapter implements OrderRepositoryPort {
    private final JpaOrderRepository jpaRepo;
    private final OrderEntityMapper mapper;

    public PostgresOrderRepositoryAdapter(JpaOrderRepository jpaRepo, OrderEntityMapper mapper) {
        this.jpaRepo = jpaRepo;
        this.mapper = mapper;
    }

    @Override
    public Optional<Order> findById(OrderId id) {
        return jpaRepo.findById(id.value()).map(mapper::toDomain);
    }

    @Override
    public void save(Order order) {
        var jpaEntity = mapper.toJpaEntity(order);
        jpaRepo.save(jpaEntity);
    }
}`
          ) : (
`// 1. IN DOMAIN PACKAGE: Defines the outbound port interface
package domain

import "context"

type OrderRepositoryPort interface {
	FindByID(ctx context.Context, id OrderID) (*Order, error)
	Save(ctx context.Context, order *Order) error
}

// 2. IN INFRASTRUCTURE ADAPTER PACKAGE: Implements the port with pgx / SQL
package postgres

import (
	"context"
	"com.apex/ddd/domain"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PostgresOrderAdapter struct {
	pool *pgxpool.Pool
}

func NewPostgresOrderAdapter(pool *pgxpool.Pool) domain.OrderRepositoryPort {
	return &PostgresOrderAdapter{pool: pool}
}

func (a *PostgresOrderAdapter) FindByID(ctx context.Context, id domain.OrderID) (*domain.Order, error) {
	// Query database and map SQL row to clean domain entity
	return nil, nil
}

func (a *PostgresOrderAdapter) Save(ctx context.Context, order *domain.Order) error {
	// Persist aggregate state transactionally
	return nil
}`
          )}
        </pre>
      </div>
    </div>
  )
}
