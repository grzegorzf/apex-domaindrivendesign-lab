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

  const handleApplyDiscount = () => {
    if (modelType === 'anemic') {
      setAuditLog((prev) => [
        `⚠️ [ANEMIC MODEL] Setter applied discount ${discountInput}% directly without invariant validation. Any external service can mutate fields!`,
        ...prev,
      ])
    } else {
      if (discountInput > 50) {
        setAuditLog((prev) => [
          `❌ [RICH MODEL ERROR] InvariantViolation: Max promotional discount capped at 50%. Attempted: ${discountInput}%. Mutation rejected by Domain Model!`,
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
        `⚠️ [ANEMIC MODEL] order.setStatus("Cancelled") executed regardless of shipment status. Bug: Cancelled an already shipped order!`,
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

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-beginner">Level 1 · Foundations</span>
        <h1 className="studio-title">Ubiquitous Language & Domain Modeling</h1>
        <p className="studio-lead">
          Domain-Driven Design begins by breaking down the linguistic barrier between business domain experts and software engineers.
          Learn why anemic CRUD models lead to data corruption at scale and how a rigorous Ubiquitous Language anchors rich domain behavior.
        </p>
      </div>

      {/* Spec Support & Architecture Primer */}
      <div className="spec-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="spec-badge">STRATEGIC PRINCIPLE</span>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700 }}>Single Vocabulary per Bounded Context</span>
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          In traditional architectures, the noun <em>"Order"</em> is stuffed into a massive database table with 100+ columns serving every department. In DDD, language is context-bound. An <strong>Order</strong> in Sales represents an agreed intent to purchase; in Fulfillment it represents physical items in warehouse bins; in Billing it is an invoice with tax line items.
        </p>
      </div>

      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        {/* Interactive Linguistic Disambiguation */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            1. Ubiquitous Language Disambiguation Explorer
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Select a domain term to observe how its definition, invariants, and ubiquitous vocabulary mutate across Bounded Contexts:
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selectedTerm === 'Order' && (
              <>
                <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--cyan)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--cyan)' }}>Sales & Checkout Context</strong>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>Bounded Context A</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    <strong>Language:</strong> <em>Shopping Cart, Line Item, Discount Code, Checkout Intent, Quoted Price.</em>
                  </p>
                  <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                    Invariant: Quoted price cannot expire during checkout session.
                  </p>
                </div>

                <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--lime)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--lime)' }}>Warehouse & Logistics Context</strong>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>Bounded Context B</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    <strong>Language:</strong> <em>Picking Slip, SKU Allocation, Bin Location, Dimension Matrix, Manifest.</em>
                  </p>
                  <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                    Invariant: Total box gross weight cannot exceed carrier conveyor limit (30kg).
                  </p>
                </div>

                <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--violet)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--violet)' }}>Invoicing & Accounting Context</strong>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>Bounded Context C</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    <strong>Language:</strong> <em>Accounts Receivable, Tax Nexus, VAT Breakdown, General Ledger Entry, Fiscal Debit.</em>
                  </p>
                  <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                    Invariant: Debits must balance credits with zero rounding drift.
                  </p>
                </div>
              </>
            )}

            {selectedTerm === 'Customer' && (
              <>
                <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--cyan)' }}>
                  <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--cyan)' }}>Identity & Access Context:</strong>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Called <strong>Subject</strong> or <strong>User Account</strong>. Owns credentials, MFA tokens, and OAuth scopes.
                  </p>
                </div>
                <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--amber)' }}>
                  <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--amber)' }}>Marketing & CRM Context:</strong>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Called <strong>Lead</strong> or <strong>Prospect</strong>. Tracks engagement scores, churn propensity, and campaign touchpoints.
                  </p>
                </div>
              </>
            )}

            {selectedTerm === 'Product' && (
              <>
                <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--cyan)' }}>
                  <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--cyan)' }}>E-Commerce Catalog Context:</strong>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Called <strong>Merchandise Display</strong>. Owns high-res galleries, localized descriptions, and SEO tags.
                  </p>
                </div>
                <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--lime)' }}>
                  <strong style={{ fontSize: 'var(--text-xs)', color: 'var(--lime)' }}>Fulfillment Context:</strong>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Called <strong>Stock Keeping Unit (SKU)</strong>. Owns hazardous material classifications, shelf life, and pallet coordinates.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Anemic vs Rich Domain Model Interactive Sandbox */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            2. Anemic vs Rich Domain Model Sandbox
          </h3>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <button
              type="button"
              className={`control-pill ${modelType === 'rich' ? 'active-lang' : ''}`}
              onClick={() => setModelType('rich')}
            >
              🛡️ Rich Domain Model (DDD)
            </button>
            <button
              type="button"
              className={`control-pill ${modelType === 'anemic' ? 'active-lang' : ''}`}
              onClick={() => setModelType('anemic')}
            >
              ⚠️ Anemic Model (Anti-Pattern)
            </button>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '0.5rem' }}>
              <span>Order State: <strong style={{ color: orderStatus === 'Shipped' ? 'var(--lime)' : 'var(--amber)' }}>{orderStatus}</strong></span>
              <span>Model Mode: <strong style={{ color: modelType === 'rich' ? 'var(--cyan)' : 'var(--rose)' }}>{modelType.toUpperCase()}</strong></span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
              <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Discount %:</label>
              <input
                type="number"
                value={discountInput}
                onChange={(e) => setDiscountInput(Number(e.target.value))}
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  padding: '0.35rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  width: '80px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                }}
              />
              <button type="button" className="btn-primary" onClick={handleApplyDiscount} style={{ fontSize: 'var(--text-2xs)' }}>
                Apply Discount
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                type="button"
                className="control-pill"
                onClick={() => setOrderStatus('Shipped')}
                style={{ fontSize: 'var(--text-2xs)' }}
              >
                Simulate: Mark Shipped
              </button>
              <button
                type="button"
                className="control-pill"
                onClick={handleCancelOrder}
                style={{ fontSize: 'var(--text-2xs)', borderColor: 'var(--rose)', color: 'var(--rose)' }}
              >
                Simulate: Cancel Order
              </button>
            </div>
          </div>

          {/* Audit Stream */}
          <div>
            <span style={{ fontSize: 'var(--text-2xs)', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
              Domain Audit & Invariant Log
            </span>
            <div
              style={{
                background: '#090d16',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                maxHeight: '140px',
                overflowY: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                lineHeight: 1.5,
                marginTop: '0.25rem',
              }}
            >
              {auditLog.map((log, i) => (
                <div key={i} style={{ color: log.startsWith('❌') ? 'var(--rose)' : log.startsWith('⚠️') ? 'var(--amber)' : '#94a3b8' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Polyglot Code Implementation */}
      <div className="code-container">
        <div className="code-header">
          <div className="code-lang-tag">
            {language === 'java' ? '☕ JAVA 26+ RECORD & RICH AGGREGATE' : '🐹 GO 1.24 RICH DOMAIN STRUCT'}
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
            Encapsulating Invariants & Ubiquitous Language
          </span>
        </div>
        <pre className="code-pre">
          {language === 'java' ? (
`// Java 26: Rich Domain Model with Self-Guarding Invariants & Value Objects
package com.apex.ddd.sales.domain;

import java.math.BigDecimal;
import java.util.Objects;

public final class Order {
    private final OrderId id;
    private OrderStatus status;
    private Money totalAmount;
    private final List<OrderLine> lines = new ArrayList<>();

    // Private constructor: Invariants enforced via intention-revealing factory methods
    private Order(OrderId id, Money initialAmount) {
        this.id = Objects.requireNonNull(id, "OrderId cannot be null");
        this.totalAmount = Objects.requireNonNull(initialAmount, "Initial amount required");
        this.status = OrderStatus.CONFIRMED;
    }

    public static Order create(OrderId id, Money amount) {
        if (amount.isNegativeOrZero()) {
            throw new InvalidDomainStateException("Initial order amount must be positive");
        }
        return new Order(id, amount);
    }

    // Ubiquitous Language Method: Intention-revealing, guards business invariants
    public void applyPromotionalDiscount(Percentage discount) {
        if (discount.isGreaterThan(Percentage.of(50))) {
            throw new PromotionalDiscountExceededException("Promotional discount cannot exceed 50%");
        }
        this.totalAmount = this.totalAmount.subtract(this.totalAmount.percentage(discount));
    }

    public void cancel(CancellationReason reason) {
        // Business Rule: Shipped orders cannot be cancelled directly
        if (this.status == OrderStatus.SHIPPED) {
            throw new IllegalDomainStateTransitionException("Cannot cancel an order that has already shipped");
        }
        this.status = OrderStatus.CANCELLED;
    }
}`
          ) : (
`// Go 1.24: Rich Domain Struct with Unexported Fields & Invariant Protection
package domain

import (
	"errors"
	"fmt"
)

var (
	ErrDiscountTooHigh     = errors.New("domain: promotional discount cannot exceed 50%")
	ErrCannotCancelShipped = errors.New("domain: shipped order cannot be cancelled")
)

// Order has unexported fields to prevent external packages from mutating internal state
type Order struct {
	id          OrderID
	status      OrderStatus
	totalAmount Money
	lines       []OrderLine
}

// NewOrder is the factory enforcing creation invariants
func NewOrder(id OrderID, initialAmount Money) (*Order, error) {
	if initialAmount.Amount <= 0 {
		return nil, errors.New("initial order amount must be positive")
	}
	return &Order{
		id:          id,
		status:      StatusConfirmed,
		totalAmount: initialAmount,
		lines:       make([]OrderLine, 0),
	}, nil
}

// ApplyPromotionalDiscount reveals business intention and validates invariants
func (o *Order) ApplyPromotionalDiscount(pct float64) error {
	if pct > 50.0 {
		return fmt.Errorf("%w: requested %.1f%%", ErrDiscountTooHigh, pct)
	}
	o.totalAmount = o.totalAmount.SubtractPercent(pct)
	return nil
}

// Cancel transitions order state safely according to ubiquitous business rules
func (o *Order) Cancel(reason string) error {
	if o.status == StatusShipped {
		return ErrCannotCancelShipped
	}
	o.status = StatusCancelled
	return nil
}`
          )}
        </pre>
      </div>
    </div>
  )
}
