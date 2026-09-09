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

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const handleAddItem = () => {
    if (orderState !== 'DRAFT') {
      setErrorMessage(`❌ Invariant Violation: Cannot mutate an Order Aggregate in ${orderState} state!`)
      return
    }
    if (totalQuantity >= 10) {
      setErrorMessage('❌ Invariant Violation: Max order volume cap reached (10 items maximum per order aggregate).')
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
      setErrorMessage('❌ Invariant Violation: Cannot confirm an empty order!')
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

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-advanced">Level 3 · Tactical Building Blocks</span>
        <h1 className="studio-title">Entities, Invariants & Aggregate Roots</h1>
        <p className="studio-lead">
          An <strong>Aggregate</strong> is a cluster of associated domain objects that we treat as a single unit for the purpose of data changes.
          The <strong>Aggregate Root</strong> is the gateway entity that guarantees every business invariant inside the perimeter remains 100% consistent across transactions.
        </p>
      </div>

      <div className="grid-3col" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ borderTop: '3px solid var(--cyan)' }}>
          <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)' }}>1. Consistency Boundary</strong>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            External objects can only hold references to the Aggregate Root. Direct references to internal entities (like individual OrderLines) from outside are forbidden.
          </p>
        </div>

        <div className="glass-panel" style={{ borderTop: '3px solid var(--lime)' }}>
          <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--lime)' }}>2. One Transaction Rule</strong>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            A single database transaction should modify exactly <strong>one</strong> Aggregate instance. Modifications across multiple aggregates must rely on eventual consistency via Domain Events.
          </p>
        </div>

        <div className="glass-panel" style={{ borderTop: '3px solid var(--violet)' }}>
          <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)' }}>3. Reference by Identity</strong>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Aggregates reference other aggregates by their unique ID (e.g. <code>CustomerId</code>), never by direct object pointers, preventing massive memory graphs and lock contention.
          </p>
        </div>
      </div>

      {/* Interactive Aggregate Simulator */}
      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Interactive Order Aggregate State Machine
          </h3>

          <div
            style={{
              background: '#070b14',
              border: '2px dashed var(--cyan-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              marginBottom: '1rem',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="spec-badge">AGGREGATE ROOT: Order #ORD-2027</span>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  State: <strong style={{ color: orderState === 'CONFIRMED' ? 'var(--lime)' : 'var(--amber)' }}>{orderState}</strong>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)' }}>Total Quantity:</span>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: totalQuantity >= 10 ? 'var(--rose)' : 'var(--cyan)' }}>
                  {totalQuantity} / 10 items
                </div>
              </div>
            </div>

            {/* Child Entities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--surface)',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-tertiary)', marginRight: '0.5rem' }}>#{idx + 1}</span>
                    <strong>{item.sku}</strong>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>× {item.quantity}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--lime)' }}>
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Aggregate Invariant Check:</span>
              <span style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                ${totalAmount.toFixed(2)} USD
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn-primary" onClick={handleAddItem}>
              + Add Child Line Item
            </button>
            <button type="button" className="control-pill" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
            <button type="button" className="control-pill" onClick={handleReset}>
              Reset State
            </button>
          </div>

          {errorMessage && (
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'rgba(251, 113, 133, 0.1)',
                border: '1px solid var(--rose)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                color: 'var(--rose)',
              }}
            >
              {errorMessage}
            </div>
          )}
        </div>

        {/* Aggregate Boundary Architectural Primer */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Guarding Invariants & Eliminating Data Corruption
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            Without an Aggregate boundary, client applications could bypass business rules by directly modifying the database table:
          </p>
          <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: '#f1f5f9', marginBottom: '1rem' }}>
            <code>// DANGEROUS SQL BYPASSING DOMAIN RULES:<br />UPDATE order_lines SET quantity = 9999 WHERE id = 42;</code>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            By channeling all modifications through the Aggregate Root, the domain guarantees that every business rule (volume limit, discount constraints, status integrity) is validated before state is committed to storage.
          </p>
        </div>
      </div>

      {/* Polyglot Code Implementation */}
      <div className="code-container">
        <div className="code-header">
          <div className="code-lang-tag">
            {language === 'java' ? '☕ JAVA 26+ AGGREGATE ROOT & DEFENSIVE COPYING' : '🐹 GO 1.24 AGGREGATE ROOT PATTERN'}
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
            Encapsulating Collections & Invariant Boundaries
          </span>
        </div>
        <pre className="code-pre">
          {language === 'java' ? (
`// Java 26: Aggregate Root enforcing business invariants & defensive copying
package com.apex.ddd.order.domain;

import java.util.Collections;
import java.util.List;

public final class OrderAggregateRoot {
    private final OrderId id;
    private final CustomerId customerId; // Referenced by ID only!
    private OrderStatus status;
    private final List<OrderLine> lines = new ArrayList<>();

    public OrderAggregateRoot(OrderId id, CustomerId customerId) {
        this.id = Objects.requireNonNull(id);
        this.customerId = Objects.requireNonNull(customerId);
        this.status = OrderStatus.DRAFT;
    }

    // Encapsulated domain business method
    public void addLineItem(Sku sku, int quantity, Money unitPrice) {
        // Invariant 1: Cannot modify non-draft order
        if (this.status != OrderStatus.DRAFT) {
            throw new InvariantViolationException("Cannot modify confirmed or shipped orders");
        }

        // Invariant 2: Total quantity volume cap
        int currentTotal = lines.stream().mapToInt(OrderLine::quantity).sum();
        if (currentTotal + quantity > 10) {
            throw new InvariantViolationException("Order exceeds maximum capacity of 10 items");
        }

        this.lines.add(new OrderLine(OrderLineId.generate(), sku, quantity, unitPrice));
    }

    // Defensive Copy: External callers cannot mutate the internal lines list!
    public List<OrderLine> getLines() {
        return Collections.unmodifiableList(this.lines);
    }
}`
          ) : (
`// Go 1.24: Aggregate Root with Invariant Encapsulation
package order

import (
	"errors"
	"fmt"
)

var (
	ErrNotDraft        = errors.New("cannot mutate an order that is not in DRAFT state")
	ErrMaxVolumeExceeded = errors.New("order exceeds maximum volume of 10 items")
)

type OrderAggregate struct {
	id         OrderID
	customerID CustomerID // Referenced by ID, never pointer!
	status     OrderStatus
	lines      []OrderLine // unexported slice
}

func (o *OrderAggregate) AddLineItem(sku SKU, qty int, price Money) error {
	if o.status != StatusDraft {
		return ErrNotDraft
	}

	totalQty := 0
	for _, l := range o.lines {
		totalQty += l.Quantity
	}
	if totalQty+qty > 10 {
		return fmt.Errorf("%w: current %d + requested %d", ErrMaxVolumeExceeded, totalQty, qty)
	}

	o.lines = append(o.lines, OrderLine{
		ID:       NewLineID(),
		SKU:      sku,
		Quantity: qty,
		Price:    price,
	})
	return nil
}

// Lines returns a copy of lines to prevent slice header aliasing mutations
func (o *OrderAggregate) Lines() []OrderLine {
	copied := make([]OrderLine, len(o.lines))
	copy(copied, o.lines)
	return copied
}`
          )}
        </pre>
      </div>
    </div>
  )
}
