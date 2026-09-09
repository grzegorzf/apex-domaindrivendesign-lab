'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

type DomainTerm = 'Order' | 'Customer' | 'Product'
type ModelingType = 'anemic' | 'rich'

export default function UbiquitousLanguageStudio() {
  const { language } = useLanguage()
  const [selectedTerm, setSelectedTerm] = useState<DomainTerm>('Order')
  const [modelType, setModelType] = useState<ModelingType>('rich')
  const [discountInput, setDiscountInput] = useState<number>(15)
  const [orderStatus, setOrderStatus] = useState<'Draft' | 'Confirmed' | 'Shipped' | 'Cancelled'>('Confirmed')
  const [auditLog, setAuditLog] = useState<string[]>([
    'System initialized with confirmed order #ORD-2027-99',
  ])
  const [copiedCode, setCopiedCode] = useState(false)

  const handleApplyDiscount = () => {
    if (modelType === 'anemic') {
      setAuditLog((prev) => [
        `⚠️ [ANEMIC MODEL] Setter applied discount ${discountInput}% directly without invariant validation. Any external service can mutate fields arbitrarily!`,
        ...prev,
      ])
    } else {
      if (discountInput > 50) {
        setAuditLog((prev) => [
          `❌ [RICH MODEL ERROR] InvariantViolation: Max promotional discount is capped at 50%. Attempted: ${discountInput}%. Mutation rejected by Domain Model!`,
          ...prev,
        ])
        return
      }
      setAuditLog((prev) => [
        `✅ [RICH MODEL] Business Method: order.applyPromotionalDiscount(${discountInput}%) executed successfully with domain rule verification.`,
        ...prev,
      ])
    }
  }

  const handleCancelOrder = () => {
    if (modelType === 'anemic') {
      setOrderStatus('Cancelled')
      setAuditLog((prev) => [
        `⚠️ [ANEMIC MODEL] order.setStatus("Cancelled") executed without invariant check. Bug: Cancelled an already shipped order!`,
        ...prev,
      ])
    } else {
      if (orderStatus === 'Shipped') {
        setAuditLog((prev) => [
          `❌ [RICH MODEL ERROR] IllegalDomainStateTransition: Shipped orders cannot be cancelled directly. Customer must initiate a Return Merchandize Authorization (RMA).`,
          ...prev,
        ])
        return
      }
      setOrderStatus('Cancelled')
      setAuditLog((prev) => [
        `✅ [RICH MODEL] Business Method: order.cancel(Reason.CUSTOMER_REQUEST) transitioned state and queued OrderCancelledDomainEvent.`,
        ...prev,
      ])
    }
  }

  const codeJava = `// Java 26+ Rich Domain Model with Invariant Enforcement & Sealed State
package com.apex.ddd.sales.domain;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

public class Order {
    private final OrderId id;
    private final CustomerId customerId;
    private OrderStatus status;
    private Money totalAmount;
    private Percentage discount;

    // Factory method enforcing creation invariants
    public static Order create(CustomerId customerId, Money initialAmount) {
        Objects.requireNonNull(customerId, "CustomerId must not be null");
        Objects.requireNonNull(initialAmount, "Initial amount must not be null");
        if (initialAmount.isNegativeOrZero()) {
            throw new InvariantViolationException("Initial order value must be strictly positive");
        }
        return new Order(new OrderId(UUID.randomUUID()), customerId, OrderStatus.DRAFT, initialAmount, Percentage.ZERO);
    }

    // Rich business method: Invariants guarded at the boundary
    public void applyPromotionalDiscount(Percentage promoDiscount) {
        if (this.status != OrderStatus.DRAFT && this.status != OrderStatus.CONFIRMED) {
            throw new IllegalDomainStateTransition("Discounts can only be applied to unfulfilled orders");
        }
        if (promoDiscount.isGreaterThan(Percentage.of(50))) {
            throw new InvariantViolationException("Promotional discounts cannot exceed 50%");
        }
        this.discount = promoDiscount;
        this.totalAmount = this.totalAmount.multiply(Percentage.of(100).subtract(promoDiscount));
    }

    public void cancel(CancellationReason reason) {
        if (this.status == OrderStatus.SHIPPED) {
            throw new IllegalDomainStateTransition("Shipped orders cannot be cancelled directly; initiate RMA");
        }
        this.status = OrderStatus.CANCELLED;
    }
}`

  const codeGo = `// Go 1.24 Rich Domain Model with Encapsulated Invariants
package domain

import (
	"errors"
	"fmt"
	"time"
)

type OrderStatus int

const (
	StatusDraft OrderStatus = iota
	StatusConfirmed
	StatusShipped
	StatusCancelled
)

type Order struct {
	id          string
	customerID  string
	status      OrderStatus
	totalAmount float64
	discountPct float64
	updatedAt   time.Time
}

// NewOrder enforces creation invariants
func NewOrder(id, customerID string, initialAmount float64) (*Order, error) {
	if customerID == "" {
		return nil, errors.New("customerID cannot be empty")
	}
	if initialAmount <= 0 {
		return nil, errors.New("initial order amount must be positive")
	}
	return &Order{
		id:          id,
		customerID:  customerID,
		status:      StatusDraft,
		totalAmount: initialAmount,
		updatedAt:   time.Now().UTC(),
	}, nil
}

// ApplyPromotionalDiscount encapsulates business invariants
func (o *Order) ApplyPromotionalDiscount(discountPct float64) error {
	if o.status != StatusDraft && o.status != StatusConfirmed {
		return errors.New("discounts only applicable before shipment")
	}
	if discountPct > 50.0 {
		return fmt.Errorf("promotional discount %.1f%% exceeds 50%% ceiling", discountPct)
	}
	o.discountPct = discountPct
	o.totalAmount = o.totalAmount * (1.0 - (discountPct / 100.0))
	o.updatedAt = time.Now().UTC()
	return nil
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
              <span className="badge-cyan">Level 1 · Strategic Foundations</span>
              <span className="badge-lime">Eric Evans Canonical DDD</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Ubiquitous Language &amp; Domain Modeling: Eliminating Conceptual Dissonance
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          Domain-Driven Design begins by dismantling the linguistic divide between business domain experts and software developers.
          A Ubiquitous Language is not merely a glossary—it is a formal, shared conceptual model embedded directly into code artifacts (classes, records, methods, and domain events) without translation layers.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: The Anemic Domain Model &amp; Universal Word Anti-Pattern
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              In traditional architectures, teams attempt to build a single "Universal Enterprise Entity" (such as a 120-column SQL table for <code>Order</code>) shared across Sales, Fulfillment, Billing, and Returns.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              Domain objects are reduced to "anemic data bags" with public getters and setters (<code>order.setStatus("Cancelled")</code>). Business invariants are scattered across hundreds of procedural service classes. Any developer or script can bypass validation, mutate state illegally (e.g., cancelling an order that was already placed on a FedEx delivery plane), and create silent database corruption.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Bounded Ubiquitous Language &amp; Rich Self-Guarding Models
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              DDD segregates the enterprise into discrete <strong>Bounded Contexts</strong>, each owning a focused, unambiguous vocabulary.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>Linguistic Precision &amp; Behavioral Encapsulation:</strong>
              An "Order" in Sales models checkout intent and discount thresholds; in Warehouse it models picking manifests and pallet weight; in Billing it models accounts receivable. Furthermore, entities are implemented as <strong>Rich Domain Models</strong> that protect their own invariants: state changes only occur through expressive domain methods (<code>order.applyPromotionalDiscount(promo)</code>) that reject illegal transitions at compile and runtime.
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--cyan-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Amazon uncoupled their single shared monolithic database into contextual service boundaries when an "Item" had 40 conflicting definitions across consumer retail, Amazon Web Services billing, and Kiva robotics fulfillment centers. Shopify refactored their 15-year-old monolithic Rails core into strict Packwerk-enforced modular domain boundaries.
          </span>
          <span className="mono-badge" style={{ color: 'var(--cyan)' }}>Evans Ch. 2 · Ubiquitous Language</span>
        </div>
      </div>

      {/* Interactive Playground & Code Viewer Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive Linguistic Disambiguation &amp; Invariant Sandbox</h3>
              <span className="live-badge"><span className="live-dot" /> Live Simulation</span>
            </div>
            <p className="card-desc">
              Test how business terms shift invariants between Bounded Contexts, and compare anemic data bags against rich self-guarding domain models.
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          {/* Panel 1: Linguistic Disambiguation */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <strong style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--cyan)' }}>
                1. Select Domain Concept
              </strong>
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['Order', 'Customer', 'Product'] as DomainTerm[]).map((term) => (
                  <button
                    key={term}
                    type="button"
                    className={`control-pill ${selectedTerm === term ? 'active-lang' : ''}`}
                    onClick={() => setSelectedTerm(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {selectedTerm === 'Order' && (
                <>
                  <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--cyan)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--cyan)' }}>Sales &amp; Checkout Context</strong>
                      <span className="mono-badge">Bounded Context A</span>
                    </div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                      <strong>Language:</strong> <em>Shopping Cart, Line Item, Discount Code, Checkout Intent, Quoted Price.</em>
                    </p>
                    <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                      ⚡ Invariant: Quoted price cannot expire during active checkout session.
                    </p>
                  </div>

                  <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--lime)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--lime)' }}>Warehouse &amp; Logistics Context</strong>
                      <span className="mono-badge">Bounded Context B</span>
                    </div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                      <strong>Language:</strong> <em>Picking Slip, SKU Allocation, Bin Location, Weight Matrix, Manifest.</em>
                    </p>
                    <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                      ⚡ Invariant: Total carton weight cannot exceed conveyor limit (30kg).
                    </p>
                  </div>

                  <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--violet)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--violet)' }}>Invoicing &amp; Accounting Context</strong>
                      <span className="mono-badge">Bounded Context C</span>
                    </div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                      <strong>Language:</strong> <em>Accounts Receivable, Tax Nexus, VAT Breakdown, General Ledger Entry.</em>
                    </p>
                    <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                      ⚡ Invariant: Debits must balance credits with zero rounding drift.
                    </p>
                  </div>
                </>
              )}

              {selectedTerm === 'Customer' && (
                <>
                  <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--cyan)' }}>
                    <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--cyan)' }}>Identity &amp; Access Context:</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Called <strong>Subject</strong> or <strong>User Account</strong>. Owns credentials, MFA tokens, and OAuth scopes.
                    </p>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--amber)' }}>
                    <strong style={{ fontSize: 'var(--text-xs)', color: '#fbbf24' }}>Marketing &amp; CRM Context:</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Called <strong>Lead</strong> or <strong>Prospect</strong>. Tracks engagement scores, churn propensity, and campaign touchpoints.
                    </p>
                  </div>
                </>
              )}

              {selectedTerm === 'Product' && (
                <>
                  <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--cyan)' }}>
                    <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--cyan)' }}>E-Commerce Catalog Context:</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Called <strong>Merchandise Display</strong>. Owns high-res media, localized copy, and SEO meta tags.
                    </p>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--lime)' }}>
                    <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--lime)' }}>Fulfillment Context:</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Called <strong>Stock Keeping Unit (SKU)</strong>. Owns hazard codes, shelf-life dates, and warehouse slot coords.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Panel 2: Invariant Sandbox */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <strong style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--violet)' }}>
                2. Invariant Guard Sandbox
              </strong>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  className={`control-pill ${modelType === 'rich' ? 'active-lang' : ''}`}
                  onClick={() => setModelType('rich')}
                >
                  🛡️ Rich Model (DDD)
                </button>
                <button
                  type="button"
                  className={`control-pill ${modelType === 'anemic' ? 'active-lang' : ''}`}
                  onClick={() => setModelType('anemic')}
                >
                  ⚠️ Anemic CRUD
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--text-xs)' }}>
              Order State: <span className="mono-badge" style={{ color: orderStatus === 'Shipped' ? 'var(--lime)' : orderStatus === 'Cancelled' ? 'var(--rose)' : 'var(--cyan)' }}>{orderStatus}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)' }}>
              <input
                type="number"
                value={discountInput}
                onChange={(e) => setDiscountInput(Number(e.target.value))}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  width: '90px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                }}
              />
              <button
                type="button"
                className="btn-primary"
                onClick={handleApplyDiscount}
              >
                Apply Discount (%)
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancelOrder}
                style={{ color: 'var(--rose)' }}
              >
                Cancel Order
              </button>
            </div>

            <div style={{ maxHeight: '160px', overflowY: 'auto', background: '#05070a', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                DOMAIN AUDIT LOG
              </div>
              {auditLog.map((log, idx) => (
                <div key={idx} style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: log.startsWith('❌') ? 'var(--rose)' : log.startsWith('⚠️') ? '#fbbf24' : '#10b981', marginBottom: '4px' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Polyglot Code Viewer */}
        <div className="code-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {language === 'java' ? 'Java 26+ · Rich Invariant Domain Model' : 'Go 1.24 · Encapsulated Invariant Domain Model'}
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
