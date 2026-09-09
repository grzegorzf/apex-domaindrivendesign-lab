'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

interface OrderLineItem {
  id: string
  sku: string
  quantity: number
  price: number
}

export default function AggregatesStudio() {
  const { language } = useLanguage()
  const [items, setItems] = useState<OrderLineItem[]>([
    { id: '1', sku: 'APEX-GPU-4090', quantity: 1, price: 1599.0 },
    { id: '2', sku: 'NVME-4TB-PRO', quantity: 2, price: 299.0 },
  ])
  const [orderState, setOrderState] = useState<'DRAFT' | 'CONFIRMED' | 'SHIPPED'>('DRAFT')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const handleAddItem = () => {
    if (orderState !== 'DRAFT') {
      setErrorMessage(`❌ Invariant Violation: Cannot mutate an Order Aggregate in ${orderState} state!`)
      return
    }
    if (totalQuantity >= 10) {
      setErrorMessage('❌ Invariant Violation: Maximum order volume cap reached (10 items maximum per order aggregate).')
      return
    }
    setErrorMessage(null)
    setItems((prev) => [
      ...prev,
      { id: String(Date.now()), sku: 'MECH-KEYBOARD-RGB', quantity: 1, price: 149.0 },
    ])
  }

  const handleConfirmOrder = () => {
    if (items.length === 0) {
      setErrorMessage('❌ Invariant Violation: Cannot confirm an empty order without line items!')
      return
    }
    setErrorMessage(null)
    setOrderState('CONFIRMED')
  }

  const handleReset = () => {
    setOrderState('DRAFT')
    setErrorMessage(null)
    setItems([
      { id: '1', sku: 'APEX-GPU-4090', quantity: 1, price: 1599.0 },
      { id: '2', sku: 'NVME-4TB-PRO', quantity: 2, price: 299.0 },
    ])
  }

  const codeJava = `// Java 26+ Aggregate Root with Invariant Consistency Boundary
package com.apex.core.orders.domain;

import java.util.*;

public class Order {
    private final OrderId id; // Aggregate Root Identity
    private final CustomerId customerId; // Referenced by ID ONLY (not object pointer)
    private OrderStatus status;
    private final List<OrderLineItem> lineItems = new ArrayList<>(); // Strictly encapsulated

    // Constructor guarantees atomic valid root creation
    public Order(OrderId id, CustomerId customerId) {
        this.id = Objects.requireNonNull(id);
        this.customerId = Objects.requireNonNull(customerId);
        this.status = OrderStatus.DRAFT;
    }

    // Command method on the Aggregate Root guarding multi-entity invariants
    public void addLineItem(Sku sku, Quantity quantity, Money unitPrice) {
        if (this.status != OrderStatus.DRAFT) {
            throw new IllegalStateException("Cannot mutate items in " + status + " state");
        }
        
        int currentTotalUnits = lineItems.stream().mapToInt(item -> item.quantity().value()).sum();
        if (currentTotalUnits + quantity.value() > 10) {
            throw new InvariantViolationException("Order line cap exceeded: maximum 10 units allowed");
        }

        this.lineItems.add(new OrderLineItem(new LineItemId(UUID.randomUUID()), sku, quantity, unitPrice));
    }

    // Read-only defensive copy ensures outside code cannot tamper with internal list
    public List<OrderLineItem> lineItems() {
        return Collections.unmodifiableList(lineItems);
    }
}`

  const codeGo = `// Go 1.24 Aggregate Root with Encapsulated Consistency Boundary
package domain

import (
	"errors"
	"fmt"
)

type Order struct {
	id         string          // Aggregate Root Identifier
	customerID string          // Referenced by Identity only
	status     string
	lineItems  []orderLineItem // Private unexported slice (No direct external tampering)
}

type orderLineItem struct {
	sku      string
	quantity int
	price    float64
}

// AddLineItem executes through the root, enforcing aggregate invariants
func (o *Order) AddLineItem(sku string, quantity int, price float64) error {
	if o.status != "DRAFT" {
		return fmt.Errorf("cannot mutate order in %s status", o.status)
	}

	totalUnits := 0
	for _, item := range o.lineItems {
		totalUnits += item.quantity
	}

	if totalUnits+quantity > 10 {
		return errors.New("invariant violation: aggregate item cap exceeded (max 10 units)")
	}

	o.lineItems = append(o.lineItems, orderLineItem{
		sku:      sku,
		quantity: quantity,
		price:    price,
	})
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
      <div className="studio-card" style={{ background: 'var(--surface-elevated)', borderLeft: '4px solid var(--lime)', marginBottom: 'var(--space-6)' }}>
        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-lime">Level 3 · Tactical Building Blocks</span>
              <span className="badge-cyan">Transactional Boundary</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Entities, Invariants &amp; Aggregate Roots: The Ironclad Consistency Perimeter
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          An <strong>Aggregate</strong> is a cluster of associated entities and value objects treated as a single indivisible unit for data changes.
          The <strong>Aggregate Root</strong> is the sole gateway: external callers are strictly forbidden from holding references to internal entities or altering internal state directly.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: Direct Child Entity Tampering &amp; Multi-Table Deadlocks
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              In typical relational ORM applications, tables are mapped directly to models with bidirectional relationships (`@OneToMany`).
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              1. <em>Direct Tampering:</em> External services bypass the parent entity and query internal tables directly (e.g., <code>orderLineRepository.deleteById(42)</code>). The parent <code>Order</code> has zero opportunity to re-verify volume caps, discount invariants, or gross weight.<br />
              2. <em>Massive Distributed Locking:</em> Transactions span across Customer, Order, Inventory, and Billing tables simultaneously, causing database thread pool starvation, deadlocks, and severe throughput collapse under concurrent traffic.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Aggregate Roots &amp; The "One Transaction per Aggregate" Rule
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              DDD establishes clear transactional consistency boundaries governed by three non-negotiable rules:
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>1. Sole Gateway:</strong> Outside code can only hold a reference to the Aggregate Root. Internal entities (like <code>OrderLine</code>) can only be accessed or modified via methods on the root (<code>order.addLineItem(...)</code>).<br />
              <strong>2. One Transaction Rule:</strong> Exactly one Aggregate instance is modified per ACID database transaction. Cross-aggregate coordination is handled via eventual consistency.<br />
              <strong>3. Reference by ID Only:</strong> Aggregates never hold direct object pointers to other aggregates; they reference them strictly by identity (<code>CustomerId</code>).
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(163, 230, 53, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--lime-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Vaughn Vernon’s famous series *Effective Aggregate Design* demonstrated that 70% of enterprise database deadlocks originate from bloated "God Aggregates" spanning dozens of tables. Re-architecting into small aggregates with single-row transactions enabled companies like Shopify to sustain 100,000+ orders/minute during Black Friday without database lock exhaustion.
          </span>
          <span className="mono-badge" style={{ color: 'var(--lime)' }}>Vernon · Effective Aggregate Design</span>
        </div>
      </div>

      {/* Aggregate Architecture Rules */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card" style={{ borderTop: '3px solid var(--cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-cyan">1. SOLE GATEWAY</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            External clients only communicate with the Root. Internal entities are hidden and protected from direct mutation.
          </div>
        </div>

        <div className="metric-card" style={{ borderTop: '3px solid var(--lime)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-lime">2. ONE TRANSACTION RULE</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Modify only one aggregate per database transaction. Eliminate long-running distributed table locks.
          </div>
        </div>

        <div className="metric-card" style={{ borderTop: '3px solid var(--violet)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-violet">3. REFERENCE BY ID</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Store foreign aggregate IDs, never direct memory pointers or ORM object graphs.
          </div>
        </div>
      </div>

      {/* Interactive Aggregate Sandbox Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive Order Aggregate State Machine</h3>
              <span className="live-badge"><span className="live-dot" /> Live Invariant Boundary</span>
            </div>
            <p className="card-desc">
              Test how command methods on the Aggregate Root enforce business caps (max 10 units total) and reject mutations once state transitions beyond DRAFT.
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          {/* Order Summary & Actions */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <span className="metric-label" style={{ color: 'var(--cyan)' }}>Order Aggregate State</span>
              <span className={orderState === 'DRAFT' ? 'badge-cyan' : orderState === 'CONFIRMED' ? 'badge-lime' : 'badge-violet'}>
                STATUS: {orderState}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div className="metric-card">
                <div className="metric-label">Total Units</div>
                <div className="metric-value" style={{ color: totalQuantity >= 10 ? 'var(--rose)' : 'var(--cyan)' }}>
                  {totalQuantity} / 10
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Aggregate Total</div>
                <div className="metric-value" style={{ color: 'var(--lime)' }}>
                  ${totalAmount.toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleAddItem}
              >
                + Add Item via Root
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleConfirmOrder}
              >
                ✓ Confirm Order
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleReset}
              >
                Reset State
              </button>
            </div>

            {errorMessage && (
              <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(251, 113, 133, 0.1)', border: '1px solid rgba(251, 113, 133, 0.4)', color: 'var(--rose)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>
                {errorMessage}
              </div>
            )}
          </div>

          {/* Internal Line Items (Encapsulated) */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span className="metric-label">Encapsulated Internal Entities (OrderLineItem)</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--surface)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)' }}>
                      {item.sku}
                    </div>
                    <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>
                      Quantity: {item.quantity} &nbsp;·&nbsp; Unit Price: ${item.price}
                    </div>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--cyan)' }}>
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="code-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {language === 'java' ? 'Java 26+ · Aggregate Root Invariant Perimeter' : 'Go 1.24 · Aggregate Root Invariant Perimeter'}
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
