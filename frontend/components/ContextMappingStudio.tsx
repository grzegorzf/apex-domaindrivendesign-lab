'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

type IntegrationPattern = 'acl' | 'conformist' | 'shared-kernel' | 'ohs-pl'

export default function ContextMappingStudio() {
  const { language } = useLanguage()
  const [activePattern, setActivePattern] = useState<IntegrationPattern>('acl')
  const [legacyPayload, setLegacyPayload] = useState({
    KUNNR: '00098412',
    VBLEN: 'ORD-991827',
    NETWR: 4500.0,
    WAERK: 'EUR',
    STATUS_CODE: 'ST_04_SHP',
  })

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-intermediate">Level 2 · Strategic Design</span>
        <h1 className="studio-title">Bounded Contexts & Context Mapping</h1>
        <p className="studio-lead">
          In large enterprise landscapes, systems cannot share a single global domain model without collapsing under cognitive overload.
          Context Mapping defines the organizational and technical relationships between independent <strong>Bounded Contexts</strong>.
        </p>
      </div>

      {/* Pattern Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button
          type="button"
          className={`control-pill ${activePattern === 'acl' ? 'active-lang' : ''}`}
          onClick={() => setActivePattern('acl')}
        >
          🛡️ Anti-Corruption Layer (ACL)
        </button>
        <button
          type="button"
          className={`control-pill ${activePattern === 'conformist' ? 'active-lang' : ''}`}
          onClick={() => setActivePattern('conformist')}
        >
          ⛓️ Conformist (Tight Coupling)
        </button>
        <button
          type="button"
          className={`control-pill ${activePattern === 'shared-kernel' ? 'active-lang' : ''}`}
          onClick={() => setActivePattern('shared-kernel')}
        >
          🤝 Shared Kernel
        </button>
        <button
          type="button"
          className={`control-pill ${activePattern === 'ohs-pl' ? 'active-lang' : ''}`}
          onClick={() => setActivePattern('ohs-pl')}
        >
          🌐 Open Host / Published Language
        </button>
      </div>

      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        {/* Context Map Visual Substrate */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Context Boundary & Blast Radius Visualizer
          </h3>

          <div
            style={{
              position: 'relative',
              background: '#080c14',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              minHeight: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            {/* Upstream Context (Legacy ERP) */}
            <div
              style={{
                width: '180px',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(251, 113, 133, 0.1)',
                border: '1px solid rgba(251, 113, 133, 0.4)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--rose)', fontWeight: 700 }}>UPSTREAM (U)</div>
              <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.25rem 0' }}>Legacy SAP ERP</strong>
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                Payload: KUNNR, VBLEN
              </div>
            </div>

            {/* Middle Integration Boundary */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '2px',
                  width: '100%',
                  background: activePattern === 'acl' ? 'var(--cyan)' : activePattern === 'conformist' ? 'var(--rose)' : 'var(--amber)',
                  boxShadow: `0 0 8px ${activePattern === 'acl' ? 'var(--cyan-glow)' : 'transparent'}`,
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-2xs)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                  color: activePattern === 'acl' ? 'var(--cyan)' : activePattern === 'conformist' ? 'var(--rose)' : 'var(--amber)',
                }}
              >
                {activePattern.toUpperCase()}
              </span>
            </div>

            {/* Downstream Context (Modern Sales) */}
            <div
              style={{
                width: '180px',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid var(--cyan-border)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--cyan)', fontWeight: 700 }}>DOWNSTREAM (D)</div>
              <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.25rem 0' }}>Modern Sales Bounded Context</strong>
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                Clean Model: CustomerId, OrderId
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {activePattern === 'acl' && (
              <p>
                🛡️ <strong>Anti-Corruption Layer (ACL):</strong> Translates foreign ERP acronyms (<code>KUNNR</code>, <code>VBLEN</code>) into pure ubiquitous domain objects (<code>CustomerId</code>, <code>OrderId</code>). If the ERP updates its database schema, only the ACL adapter changes—your core domain remains 100% pristine.
              </p>
            )}
            {activePattern === 'conformist' && (
              <p style={{ color: 'var(--rose)' }}>
                ⚠️ <strong>Conformist:</strong> Downstream adopts the upstream data structures directly without translation. If the upstream ERP changes field names or data semantics, the downstream domain breaks immediately!
              </p>
            )}
            {activePattern === 'shared-kernel' && (
              <p>
                🤝 <strong>Shared Kernel:</strong> Both teams share a common library of domain entities. Any modification requires joint agreement and synchronized builds across both teams.
              </p>
            )}
            {activePattern === 'ohs-pl' && (
              <p>
                🌐 <strong>Open Host Service / Published Language:</strong> Upstream provides a standardized REST/gRPC API with semantic versioning and an OpenAPI/Protobuf contract.
              </p>
            )}
          </div>
        </div>

        {/* Translation Simulation Sandbox */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Real-Time Translation Sandbox
          </h3>

          <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              Incoming Upstream Legacy JSON (Raw ERP Payload):
            </span>
            <pre
              style={{
                background: '#090d16',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                fontSize: 'var(--text-2xs)',
                color: '#e2e8f0',
                marginTop: '0.25rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {JSON.stringify(legacyPayload, null, 2)}
            </pre>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              Resulting Downstream Domain Entity:
            </span>
            <pre
              style={{
                background: '#090d16',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                fontSize: 'var(--text-2xs)',
                color: activePattern === 'acl' ? 'var(--cyan)' : 'var(--rose)',
                marginTop: '0.25rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {activePattern === 'acl'
                ? `{\n  "orderId": "${legacyPayload.VBLEN}",\n  "customer": {\n    "externalId": "${legacyPayload.KUNNR}"\n  },\n  "amount": {\n    "amount": ${legacyPayload.NETWR},\n    "currency": "${legacyPayload.WAERK}"\n  },\n  "deliveryStatus": "SHIPPED"\n}`
                : `// CONFORMIST: Leaked Raw Legacy Field Names into Sales Domain!\n{\n  "KUNNR": "${legacyPayload.KUNNR}",\n  "VBLEN": "${legacyPayload.VBLEN}",\n  "NETWR": ${legacyPayload.NETWR},\n  "STATUS_CODE": "${legacyPayload.STATUS_CODE}"\n}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Polyglot Code Implementation */}
      <div className="code-container">
        <div className="code-header">
          <div className="code-lang-tag">
            {language === 'java' ? '☕ JAVA 26+ ANTI-CORRUPTION LAYER TRANSLATOR' : '🐹 GO 1.24 ACL ADAPTER'}
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
            Insulating the Domain from Legacy APIs
          </span>
        </div>
        <pre className="code-pre">
          {language === 'java' ? (
`// Java 26: Anti-Corruption Layer (ACL) Translator
package com.apex.ddd.sales.infrastructure.acl;

import com.apex.ddd.sales.domain.Order;
import com.apex.ddd.sales.domain.Money;
import com.apex.ddd.sales.domain.CustomerId;

// 1. Foreign DTO matching legacy SAP ERP structure
public record SapOrderDto(
    String KUNNR,
    String VBLEN,
    BigDecimal NETWR,
    String WAERK,
    String STATUS_CODE
) {}

// 2. Anti-Corruption Layer (ACL) Translator
public final class SapOrderTranslator {
    public static Order toDomainOrder(SapOrderDto dto) {
        // Translate foreign SAP fields to Pure Ubiquitous Language Value Objects
        var customerId = new CustomerId(dto.KUNNR());
        var totalAmount = Money.of(dto.NETWR(), dto.WAERK());
        var deliveryStatus = switch (dto.STATUS_CODE()) {
            case "ST_01_CRT" -> OrderStatus.CREATED;
            case "ST_04_SHP" -> OrderStatus.SHIPPED;
            default -> OrderStatus.PENDING;
        };

        return Order.reconstitute(new OrderId(dto.VBLEN()), customerId, totalAmount, deliveryStatus);
    }
}`
          ) : (
`// Go 1.24: Anti-Corruption Layer (ACL) Adapter
package acl

import (
	"com.apex/ddd/sales/domain"
)

// LegacySAPOrderDTO reflects upstream external wire format
type LegacySAPOrderDTO struct {
	KUNNR      string  \`json:"KUNNR"\`
	VBLEN      string  \`json:"VBLEN"\`
	NETWR      float64 \`json:"NETWR"\`
	WAERK      string  \`json:"WAERK"\`
	StatusCode string  \`json:"STATUS_CODE"\`
}

// TranslateSAPOrder converts external DTO into internal clean domain entity
func TranslateSAPOrder(dto LegacySAPOrderDTO) (*domain.Order, error) {
	status := domain.StatusPending
	switch dto.StatusCode {
	case "ST_01_CRT":
		status = domain.StatusCreated
	case "ST_04_SHP":
		status = domain.StatusShipped
	}

	money, err := domain.NewMoney(dto.NETWR, dto.WAERK)
	if err != nil {
		return nil, err
	}

	return domain.ReconstituteOrder(
		domain.OrderID(dto.VBLEN),
		domain.CustomerID(dto.KUNNR),
		money,
		status,
	), nil
}`
          )}
        </pre>
      </div>
    </div>
  )
}
