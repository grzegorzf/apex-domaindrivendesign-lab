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

  // Compute reconstituted aggregate state up to currentStep
  const activeEvents = HISTORICAL_EVENTS.slice(0, currentStep)
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

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-advanced">Level 3 · Event-Driven Architecture</span>
        <h1 className="studio-title">Domain Events & Event Sourcing</h1>
        <p className="studio-lead">
          A <strong>Domain Event</strong> is a full-fidelity record of an immutable business occurrence in the past.
          In <strong>Event Sourcing</strong>, state is not stored as mutable rows; instead, the append-only event log is the single source of truth, enabling time-travel auditing and 100% loss-free history.
        </p>
      </div>

      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        {/* Interactive Time-Travel Scrubbing */}
        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase' }}>
              Time-Travel State Reconstitution
            </h3>
            <span className="spec-badge">STEP {currentStep} OF {HISTORICAL_EVENTS.length}</span>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Drag the slider to scrub backward and forward through the append-only event log to replay and inspect the reconstituted aggregate:
          </p>

          <input
            type="range"
            min={1}
            max={HISTORICAL_EVENTS.length}
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            className="slider-control"
            style={{ marginBottom: '1.5rem' }}
          />

          {/* Reconstituted Aggregate Card */}
          <div style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text)' }}>
                Reconstituted Order Aggregate at Step {currentStep}
              </span>
              <span
                style={{
                  fontSize: 'var(--text-2xs)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: aggregateState.status === 'SHIPPED' ? 'var(--lime)' : aggregateState.status === 'CONFIRMED' ? 'var(--cyan)' : 'var(--amber)',
                }}
              >
                STATUS: {aggregateState.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: 'var(--text-xs)' }}>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Total Amount:</span>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--lime)' }}>
                  ${aggregateState.total.toFixed(2)} USD
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Applied Discount:</span>
                <div style={{ fontWeight: 700 }}>{aggregateState.discount}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Total Line Items:</span>
                <div style={{ fontWeight: 700 }}>{aggregateState.lineItemsCount} items</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Tracking Number:</span>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{aggregateState.trackingNumber}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Append-Only Event Stream Log */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Append-Only Event Stream
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {HISTORICAL_EVENTS.map((evt) => {
              const isActive = evt.step <= currentStep
              return (
                <div
                  key={evt.step}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'var(--surface)' : 'rgba(0,0,0,0.3)',
                    border: `1px solid ${isActive ? 'var(--border-accent)' : 'rgba(255,255,255,0.05)'}`,
                    opacity: isActive ? 1 : 0.4,
                    transition: 'all var(--duration-fast) ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 'var(--text-xs)', color: isActive ? 'var(--cyan)' : 'var(--text-secondary)' }}>
                      #{evt.step} · {evt.name}
                    </strong>
                    <span style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                      {evt.timestamp}
                    </span>
                  </div>
                  <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                    {JSON.stringify(evt.payload)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Polyglot Code Implementation */}
      <div className="code-container">
        <div className="code-header">
          <div className="code-lang-tag">
            {language === 'java' ? '☕ JAVA 26+ SEALED DOMAIN EVENTS & PATTERN MATCHING' : '🐹 GO 1.24 DOMAIN EVENTS & TYPE SWITCHES'}
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
            Reconstituting Aggregates from Event Stream
          </span>
        </div>
        <pre className="code-pre">
          {language === 'java' ? (
`// Java 26: Sealed Domain Events hierarchy with exhaustive pattern matching
package com.apex.ddd.events;

import java.time.Instant;

public sealed interface OrderDomainEvent permits 
    OrderCreatedEvent, PromotionalDiscountAppliedEvent, OrderShippedEvent {
    Instant occurredOn();
    OrderId orderId();
}

public record OrderCreatedEvent(OrderId orderId, Money initialTotal, Instant occurredOn) implements OrderDomainEvent {}
public record PromotionalDiscountAppliedEvent(OrderId orderId, Percentage pct, Instant occurredOn) implements OrderDomainEvent {}
public record OrderShippedEvent(OrderId orderId, TrackingNumber tracking, Instant occurredOn) implements OrderDomainEvent {}

// Event Sourced Aggregate reconstitution method using Java 26 pattern matching
public final class EventSourcedOrder {
    public void apply(OrderDomainEvent event) {
        switch (event) {
            case OrderCreatedEvent e -> {
                this.id = e.orderId();
                this.total = e.initialTotal();
                this.status = OrderStatus.DRAFT;
            }
            case PromotionalDiscountAppliedEvent e -> {
                this.total = this.total.subtract(this.total.percentage(e.pct()));
            }
            case OrderShippedEvent e -> {
                this.status = OrderStatus.SHIPPED;
                this.tracking = e.tracking();
            }
        }
    }
}`
          ) : (
`// Go 1.24: Domain Events with Type-Switch Replay Loop
package events

import "time"

type DomainEvent interface {
	OccurredOn() time.Time
	AggregateID() string
}

type OrderCreatedEvent struct {
	ID        string
	Amount    int64
	Timestamp time.Time
}
func (e OrderCreatedEvent) OccurredOn() time.Time { return e.Timestamp }
func (e OrderCreatedEvent) AggregateID() string   { return e.ID }

type OrderShippedEvent struct {
	ID             string
	TrackingNumber string
	Timestamp      time.Time
}
func (e OrderShippedEvent) OccurredOn() time.Time { return e.Timestamp }
func (e OrderShippedEvent) AggregateID() string   { return e.ID }

// Apply handles historical events using Go type switches
func (o *Order) Apply(evt DomainEvent) {
	switch e := evt.(type) {
	case OrderCreatedEvent:
		o.id = e.ID
		o.totalCents = e.Amount
		o.status = "DRAFT"
	case OrderShippedEvent:
		o.status = "SHIPPED"
		o.trackingNumber = e.TrackingNumber
	}
}`
          )}
        </pre>
      </div>
    </div>
  )
}
