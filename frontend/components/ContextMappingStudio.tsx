'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

type IntegrationPattern = 'acl' | 'conformist' | 'shared-kernel' | 'ohs-pl'

export default function ContextMappingStudio() {
  const { language } = useLanguage()
  const [activePattern, setActivePattern] = useState<IntegrationPattern>('acl')
  const [copiedCode, setCopiedCode] = useState(false)
  const [legacyPayload] = useState({
    KUNNR: '00098412',
    VBLEN: 'ORD-991827',
    NETWR: 4500.0,
    WAERK: 'EUR',
    STATUS_CODE: 'ST_04_SHP',
  })

  const codeJava = `// Java 26+ Anti-Corruption Layer (ACL) Translator & Adapter
package com.apex.core.orders.infrastructure.acl;

import com.apex.core.orders.domain.*;
import java.math.BigDecimal;
import java.util.Currency;

// 1. Raw Upstream Legacy DTO (SAP ERP IDoc format)
public record SapErpOrderDto(
    String KUNNR,       // SAP Customer Account Number
    String VBLEN,       // Sales Document Number
    BigDecimal NETWR,   // Net Value in Document Currency
    String WAERK,       // Currency Key
    String STATUS_CODE  // Internal SAP status code
) {}

// 2. Anti-Corruption Translator: Isolates Pure Domain from Legacy Schema
public class SapOrderTranslator {
    public static Order toDomainEntity(SapErpOrderDto raw) {
        // Enforce invariant translation and domain mapping
        CustomerId customer = new CustomerId(raw.KUNNR().replaceFirst("^0+", ""));
        OrderId orderId = new OrderId(raw.VBLEN());
        Money amount = Money.of(raw.NETWR(), Currency.getInstance(raw.WAERK()));
        
        OrderStatus status = switch (raw.STATUS_CODE()) {
            case "ST_01_DRF" -> OrderStatus.DRAFT;
            case "ST_02_CFM" -> OrderStatus.CONFIRMED;
            case "ST_04_SHP" -> OrderStatus.SHIPPED;
            default -> throw new IllegalArgumentException("Unknown SAP status: " + raw.STATUS_CODE());
        };

        return new Order(orderId, customer, amount, status);
    }
}`

  const codeGo = `// Go 1.24 Anti-Corruption Layer (ACL) Translator & Adapter
package acl

import (
	"errors"
	"strings"
	"com.apex/orders/domain"
)

// Upstream Legacy SAP ERP IDoc Representation
type SapErpOrderDTO struct {
	KUNNR      string  \`json:"KUNNR"\`
	VBLEN      string  \`json:"VBLEN"\`
	NETWR      float64 \`json:"NETWR"\`
	WAERK      string  \`json:"WAERK"\`
	StatusCode string  \`json:"STATUS_CODE"\`
}

// AntiCorruptionLayer translates legacy payload into Pure Domain Order
type SapOrderACL struct{}

func (acl *SapOrderACL) TranslateToDomain(dto SapErpOrderDTO) (*domain.Order, error) {
	cleanCustomerID := strings.TrimLeft(dto.KUNNR, "0")
	if cleanCustomerID == "" {
		return nil, errors.New("invalid customer account ID")
	}

	var status domain.OrderStatus
	switch dto.StatusCode {
	case "ST_01_DRF":
		status = domain.StatusDraft
	case "ST_04_SHP":
		status = domain.StatusShipped
	default:
		return nil, errors.New("unrecognized SAP status code: " + dto.StatusCode)
	}

	return domain.NewOrder(dto.VBLEN, cleanCustomerID, dto.NETWR, status)
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
      <div className="studio-card" style={{ background: 'var(--surface-elevated)', borderLeft: '4px solid var(--cyan)', marginBottom: 'var(--space-6)' }}>
        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-cyan">Level 2 · Strategic Design</span>
              <span className="badge-lime">Context Mapping &amp; ACL</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Bounded Contexts &amp; Context Mapping: Shielding Core Models from Upstream Rot
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          In enterprise software ecosystems, no single model can encompass all corporate reality without collapsing under its own cognitive weight. Context Mapping formally defines the technical and organizational contracts (Upstream vs. Downstream) between autonomous Bounded Contexts.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: The Big Ball of Mud &amp; Upstream Model Contamination
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              When modern services integrate with legacy mainframes, SAP ERPs, or third-party partner APIs, developers often take the path of least resistance: conforming directly to the upstream data schema.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              Cryptic column abbreviations (<code>KUNNR</code>, <code>VBLEN</code>, magic integer status codes) leak directly into modern domain entities, database tables, and frontend viewmodels. When the upstream vendor changes a database column or alters status flags, downstream systems experience cascading outages. Legacy rot metastasizes into the greenfield core.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Formal Context Boundaries &amp; The Anti-Corruption Layer (ACL)
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Strategic DDD enforces formal Context Maps and implements an <strong>Anti-Corruption Layer (ACL)</strong> between Upstream (U) and Downstream (D).
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>Zero Leakage &amp; Invariant Isolation:</strong>
              The ACL acts as a bidirectional translation diaphragm: it ingests foreign, dirty payloads, validates invariants, and maps them into clean, expressive, first-class domain models (e.g. <code>KUNNR</code> $\rightarrow$ <code>CustomerId</code>, <code>ST_04_SHP</code> $\rightarrow$ <code>OrderStatus.SHIPPED</code>). If upstream breaks their contract, only the ACL adapter needs modification; the core business domain remains completely untouched.
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--cyan-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Martin Fowler and Thoughtworks formulated the Strangler Fig Application pattern based on DDD ACLs. When Uber decoupled their ride dispatching from monolithic legacy MySQL storage, ACLs translated incoming trip state to protect downstream driver payout ledgers from breaking schema modifications.
          </span>
          <span className="mono-badge" style={{ color: 'var(--cyan)' }}>Evans Ch. 14 · Context Mapping</span>
        </div>
      </div>

      {/* Interactive Context Map Visualizer Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive Context Mapping &amp; Translation Simulator</h3>
              <span className="live-badge"><span className="live-dot" /> Live Blast Radius Visualizer</span>
            </div>
            <p className="card-desc">
              Compare how different integration patterns impact blast radius and model contamination when consuming upstream legacy systems.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
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
              ⛓️ Conformist
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
              🌐 Open Host / PL
            </button>
          </div>
        </div>

        {/* Visual Pipeline Canvas */}
        <div
          style={{
            position: 'relative',
            background: '#080c14',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            minHeight: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: 'var(--space-6)',
            flexWrap: 'wrap',
          }}
        >
          {/* Upstream */}
          <div
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(251, 113, 133, 0.1)',
              border: '1px solid rgba(251, 113, 133, 0.4)',
              textAlign: 'center',
            }}
          >
            <span className="badge-rose">UPSTREAM (U)</span>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.4rem 0' }}>Legacy SAP ERP System</strong>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              Raw IDoc: KUNNR, VBLEN, NETWR
            </div>
          </div>

          {/* Middle Boundary / ACL */}
          <div
            style={{
              flex: '1',
              minWidth: '220px',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: activePattern === 'acl' ? 'rgba(56, 189, 248, 0.1)' : activePattern === 'conformist' ? 'rgba(251, 113, 133, 0.1)' : 'rgba(168, 85, 247, 0.1)',
              border: `1px solid ${activePattern === 'acl' ? 'var(--cyan)' : activePattern === 'conformist' ? 'var(--rose)' : 'var(--violet)'}`,
              textAlign: 'center',
            }}
          >
            <span className="mono-badge">INTEGRATION STRATEGY</span>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.4rem 0', color: activePattern === 'acl' ? 'var(--cyan)' : activePattern === 'conformist' ? 'var(--rose)' : 'var(--violet)' }}>
              {activePattern === 'acl' && '🛡️ Anti-Corruption Layer (ACL)'}
              {activePattern === 'conformist' && '⛓️ Conformist (Zero Isolation)'}
              {activePattern === 'shared-kernel' && '🤝 Shared Kernel'}
              {activePattern === 'ohs-pl' && '🌐 Open Host / Published Language'}
            </strong>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
              {activePattern === 'acl' && 'Bidirectional translation isolating upstream schemas from domain models.'}
              {activePattern === 'conformist' && 'Downstream blindly uses upstream schema; zero blast-radius protection.'}
              {activePattern === 'shared-kernel' && 'Shared binary library; any change requires coordinated deploy.'}
              {activePattern === 'ohs-pl' && 'Standardized public API & protocol (OpenAPI / Protocol Buffers).'}
            </div>
          </div>

          {/* Downstream */}
          <div
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(163, 230, 53, 0.1)',
              border: '1px solid var(--lime-border)',
              textAlign: 'center',
            }}
          >
            <span className="badge-lime">DOWNSTREAM (D)</span>
            <strong style={{ fontSize: 'var(--text-xs)', display: 'block', margin: '0.4rem 0' }}>Core Orders &amp; Fulfillment</strong>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              Domain: OrderId, CustomerId, Money
            </div>
          </div>
        </div>

        {/* Translation Live Demo */}
        <div className="grid-2" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div className="metric-label">Input Upstream Legacy Payload (SAP IDoc)</div>
            <pre style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--rose)', marginTop: '6px' }}>
              {JSON.stringify(legacyPayload, null, 2)}
            </pre>
          </div>

          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div className="metric-label">Output Clean Domain Model (Post-ACL)</div>
            <pre style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--lime)', marginTop: '6px' }}>
              {JSON.stringify({
                orderId: "ORD-991827",
                customer: { id: "98412", verified: true },
                amount: { value: 4500.0, currency: "EUR" },
                status: "SHIPPED",
                translatedVia: "SapOrderTranslator.java"
              }, null, 2)}
            </pre>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="code-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {language === 'java' ? 'Java 26+ · Anti-Corruption Layer Translator' : 'Go 1.24 · Anti-Corruption Layer Adapter'}
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
