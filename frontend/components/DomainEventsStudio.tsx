'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

interface StoredEvent {
  step: number
  name: string
  timestamp: string
  payload: Record<string, any>
}

const HISTORICAL_EVENTS: StoredEvent[] = [
  {
    step: 1,
    name: 'OrderCreatedEvent',
    timestamp: '10:00:15 UTC',
    payload: { orderId: 'ORD-9021', customerId: 'CUST-41', initialAmount: 1200.0, status: 'DRAFT' },
  },
  {
    step: 2,
    name: 'PromotionalDiscountAppliedEvent',
    timestamp: '10:02:40 UTC',
    payload: { discountPercentage: 15, deductedAmount: 180.0, currentTotal: 1020.0 },
  },
  {
    step: 3,
    name: 'LineItemAddedEvent',
    timestamp: '10:05:12 UTC',
    payload: { sku: 'USB4-CABLE-PRO', quantity: 2, unitPrice: 35.0, currentTotal: 1090.0 },
  },
  {
    step: 4,
    name: 'OrderConfirmedEvent',
    timestamp: '10:10:02 UTC',
    payload: { status: 'CONFIRMED', paymentIntentId: 'pi_99218204' },
  },
  {
    step: 5,
    name: 'OrderShippedEvent',
    timestamp: '11:30:00 UTC',
    payload: { status: 'SHIPPED', carrier: 'FedEx Express', trackingNumber: 'TRK-98127391' },
  },
]

export default function DomainEventsStudio() {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState<number>(5)
  const [copiedCode, setCopiedCode] = useState(false)

  const isCreated = currentStep >= 1
  const hasDiscount = currentStep >= 2
  const hasExtraItem = currentStep >= 3
  const isConfirmed = currentStep >= 4
  const isShipped = currentStep >= 5

  const aggregateState = {
    orderId: 'ORD-9021',
    status: isShipped ? 'SHIPPED' : isConfirmed ? 'CONFIRMED' : isCreated ? 'DRAFT' : 'NONE',
    total: hasExtraItem ? (hasDiscount ? 1090.0 : 1270.0) : hasDiscount ? 1020.0 : 1200.0,
    discount: hasDiscount ? '15%' : '0%',
    lineItemsCount: hasExtraItem ? 3 : 1,
    trackingNumber: isShipped ? 'TRK-98127391' : 'None (Not Shipped)',
  }

  const codeJava = `// Java 26+ Event Sourcing with Sealed Permitted Events & Pattern Matching
package com.apex.core.orders.events;

import java.time.Instant;

// Sealed Domain Event hierarchy guarantees exhaustive compiler verification
public sealed interface OrderDomainEvent permits
    OrderCreated,
    DiscountApplied,
    OrderConfirmed,
    OrderShipped {
    
    OrderId orderId();
    Instant occurredAt();
}

public record OrderCreated(OrderId orderId, CustomerId customer, Money amount, Instant occurredAt) implements OrderDomainEvent {}
public record DiscountApplied(OrderId orderId, Percentage percentage, Instant occurredAt) implements OrderDomainEvent {}
public record OrderConfirmed(OrderId orderId, String paymentIntent, Instant occurredAt) implements OrderDomainEvent {}
public record OrderShipped(OrderId orderId, String carrier, String tracking, Instant occurredAt) implements OrderDomainEvent {}

// Pure Event Sourcing Aggregate Fold/Reconstitution
public class OrderAggregate {
    private OrderId id;
    private OrderStatus status;
    private Money total;

    public static OrderAggregate reconstitute(List<OrderDomainEvent> history) {
        OrderAggregate aggregate = new OrderAggregate();
        for (OrderDomainEvent event : history) {
            aggregate.apply(event);
        }
        return aggregate;
    }

    private void apply(OrderDomainEvent event) {
        switch (event) {
            case OrderCreated e -> { this.id = e.orderId(); this.total = e.amount(); this.status = OrderStatus.DRAFT; }
            case DiscountApplied e -> { this.total = this.total.applyDiscount(e.percentage()); }
            case OrderConfirmed e -> { this.status = OrderStatus.CONFIRMED; }
            case OrderShipped e -> { this.status = OrderStatus.SHIPPED; }
        }
    }
}`

  const codeGo = `// Go 1.24 Event Sourcing with Type Switch Fold
package events

import "time"

type DomainEvent interface {
	AggregateID() string
	OccurredAt() time.Time
}

type OrderCreated struct {
	OrderID    string
	CustomerID string
	Total      float64
	Timestamp  time.Time
}
func (e OrderCreated) AggregateID() string  { return e.OrderID }
func (e OrderCreated) OccurredAt() time.Time { return e.Timestamp }

type OrderShipped struct {
	OrderID        string
	TrackingNumber string
	Timestamp      time.Time
}
func (e OrderShipped) AggregateID() string  { return e.OrderID }
func (e OrderShipped) OccurredAt() time.Time { return e.Timestamp }

// Reconstitute folds an append-only event slice into active aggregate state
func Reconstitute(events []DomainEvent) *OrderState {
	state := &OrderState{}
	for _, event := range events {
		switch e := event.(type) {
		case OrderCreated:
			state.ID = e.OrderID
			state.Status = "DRAFT"
			state.Total = e.Total
		case OrderShipped:
			state.Status = "SHIPPED"
			state.Tracking = e.TrackingNumber
		}
	}
	return state
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
              <span className="badge-violet">Level 3 · Event-Driven Architecture</span>
              <span className="badge-lime">Append-Only Event Store</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Domain Events &amp; Event Sourcing: Eliminating Destructive State Overwrites
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          A <strong>Domain Event</strong> is a full-fidelity, immutable record of a business occurrence in the past.
          In <strong>Event Sourcing</strong>, state is not persisted as mutable SQL rows; instead, the append-only event stream is the single source of truth, enabling time-travel audits, forensic compliance, and CQRS read model regeneration.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: The Destructive UPDATE Anti-Pattern &amp; Lost Context
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Conventional relational systems continuously run destructive mutations: <code>UPDATE orders SET status = 'CANCELLED', total = 850.0 WHERE id = 101</code>.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              The preceding state is destroyed forever. When customer disputes, compliance audits, or billing regressions arise, engineers cannot answer <em>what happened</em>, <em>who changed it</em>, or <em>what the state was at 10:14 AM yesterday</em>. Attempting to synchronize other microservices via cron jobs or distributed dual writes inevitably creates split-brain data loss.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Immutable Past-Tense Events &amp; State Reconstitution
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              DDD captures state transitions as strictly immutable past-tense events (<code>OrderPlaced</code>, <code>PaymentCaptured</code>, <code>OrderShipped</code>).
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>100% Historical Fidelity &amp; Time-Travel:</strong>
              1. <em>Append-Only:</em> Events are never updated or deleted; they are only appended with timestamps and causal metadata.<br />
              2. <em>Pure Reconstitution:</em> Aggregate state at any point in history is computed deterministically by folding the event stream (<code>state = events.reduce(apply)</code>).<br />
              3. <em>Decoupled Projections (CQRS):</em> Multiple read models can be built, destroyed, and re-projected from the same event log without touching transactional tables.
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(168, 85, 247, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(168, 85, 247, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Double-entry bookkeeping has operated on Event Sourcing principles for 600 years—accountants never erase lines; they only append compensating entries. Stripe, NYSE, and EventStoreDB run mission-critical transactional backbones where events form an immutable audit ledger compliant with Sarbanes-Oxley (SOX).
          </span>
          <span className="mono-badge" style={{ color: 'var(--violet-light)' }}>Evans &amp; Vernon · Event Sourcing</span>
        </div>
      </div>

      {/* Interactive Time-Travel State Reconstitution Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive Time-Travel State Reconstitution Slider</h3>
              <span className="live-badge"><span className="live-dot" /> Live Event Replay</span>
            </div>
            <p className="card-desc">
              Scrub backward and forward across the append-only event stream to watch the aggregate fold events and reconstitute its exact state in real time.
            </p>
          </div>
          <span className="mono-badge">STEP {currentStep} OF {HISTORICAL_EVENTS.length}</span>
        </div>

        {/* Timeline Slider */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <input
            type="range"
            min={1}
            max={HISTORICAL_EVENTS.length}
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--cyan)',
              cursor: 'pointer',
              height: '6px',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', marginTop: '6px' }}>
            <span>Step 1: OrderCreated</span>
            <span>Step 2: DiscountApplied</span>
            <span>Step 3: LineItemAdded</span>
            <span>Step 4: Confirmed</span>
            <span>Step 5: Shipped</span>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          {/* Historical Event Stream Log */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span className="metric-label" style={{ color: 'var(--cyan)' }}>Append-Only Event Store</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {HISTORICAL_EVENTS.map((event) => {
                const isActive = event.step <= currentStep
                return (
                  <div
                    key={event.step}
                    style={{
                      background: isActive ? 'var(--surface)' : 'rgba(255,255,255,0.02)',
                      opacity: isActive ? 1 : 0.4,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: `3px solid ${isActive ? 'var(--cyan)' : 'var(--border)'}`,
                      transition: 'all var(--duration-fast)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 'var(--text-xs)', color: isActive ? 'var(--text)' : 'var(--text-tertiary)' }}>
                        #{event.step} {event.name}
                      </strong>
                      <span style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                        {event.timestamp}
                      </span>
                    </div>
                    <pre style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {JSON.stringify(event.payload)}
                    </pre>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Reconstituted State Snapshot */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span className="metric-label" style={{ color: 'var(--lime)' }}>Reconstituted Aggregate State at Step {currentStep}</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: '10px', marginBottom: 'var(--space-4)' }}>
              <div className="metric-card">
                <div className="metric-label">Status</div>
                <div className="metric-value" style={{ color: aggregateState.status === 'SHIPPED' ? 'var(--lime)' : aggregateState.status === 'CONFIRMED' ? 'var(--cyan)' : '#fbbf24' }}>
                  {aggregateState.status}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Reconstituted Total</div>
                <div className="metric-value" style={{ color: 'var(--cyan)' }}>
                  ${aggregateState.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div><strong>Discount:</strong> {aggregateState.discount}</div>
              <div><strong>Items Count:</strong> {aggregateState.lineItemsCount} SKU(s)</div>
              <div><strong>Tracking:</strong> {aggregateState.trackingNumber}</div>
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="code-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {language === 'java' ? 'Java 26+ · Sealed Domain Events & Pattern-Matching Fold' : 'Go 1.24 · Domain Event Type-Switch Fold'}
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
