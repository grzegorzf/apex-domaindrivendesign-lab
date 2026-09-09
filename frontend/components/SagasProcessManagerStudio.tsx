'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

type StepStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'COMPENSATING' | 'FAILED'

interface SagaStep {
  id: string
  name: string
  context: string
  forwardAction: string
  compensatingAction: string
  status: StepStatus
}

export default function SagasProcessManagerStudio() {
  const { language } = useLanguage()
  const [failAtStep, setFailAtStep] = useState<string>('none')
  const [isExecuting, setIsExecuting] = useState<boolean>(false)
  const [logs, setLogs] = useState<string[]>(['Saga Coordinator initialized and waiting for checkout trigger.'])

  const [steps, setSteps] = useState<SagaStep[]>([
    {
      id: 'order',
      name: '1. Create Order',
      context: 'Sales Context',
      forwardAction: 'order.createPending()',
      compensatingAction: 'order.cancel("Saga failed")',
      status: 'PENDING',
    },
    {
      id: 'payment',
      name: '2. Authorize Payment',
      context: 'Billing Context',
      forwardAction: 'payment.authorize($450)',
      compensatingAction: 'payment.voidAuthorization()',
      status: 'PENDING',
    },
    {
      id: 'inventory',
      name: '3. Reserve Inventory',
      context: 'Warehouse Context',
      forwardAction: 'inventory.reserveSKU(2 units)',
      compensatingAction: 'inventory.releaseReservation()',
      status: 'PENDING',
    },
    {
      id: 'shipping',
      name: '4. Schedule Dispatch',
      context: 'Logistics Context',
      forwardAction: 'shipping.bookCourier()',
      compensatingAction: 'shipping.cancelBooking()',
      status: 'PENDING',
    },
  ])

  const runSaga = async () => {
    setIsExecuting(true)
    setLogs(['🚀 Starting E-Commerce Checkout Saga orchestration...'])

    // Reset steps
    setSteps((prev) => prev.map((s) => ({ ...s, status: 'PENDING' })))

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      setSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'RUNNING' } : s))
      )
      setLogs((prev) => [`⏳ [FORWARD ACTION] ${step.context}: Executing ${step.forwardAction}...`, ...prev])

      await new Promise((r) => setTimeout(r, 600))

      if (failAtStep === step.id) {
        // Step failed! Initiate compensation
        setSteps((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: 'FAILED' } : s))
        )
        setLogs((prev) => [
          `💥 [FAILURE] ${step.name} failed! Saga Process Manager initiating backward compensating transactions...`,
          ...prev,
        ])

        // Compensate previous steps in reverse
        for (let j = i - 1; j >= 0; j--) {
          const compStep = steps[j]
          setSteps((prev) =>
            prev.map((s, idx) => (idx === j ? { ...s, status: 'COMPENSATING' } : s))
          )
          setLogs((prev) => [
            `🔄 [COMPENSATING ROLLBACK] ${compStep.context}: Calling ${compStep.compensatingAction}...`,
            ...prev,
          ])
          await new Promise((r) => setTimeout(r, 500))
          setSteps((prev) =>
            prev.map((s, idx) => (idx === j ? { ...s, status: 'FAILED' } : s))
          )
        }

        setLogs((prev) => ['🛑 Saga fully compensated and rolled back to consistent state.', ...prev])
        setIsExecuting(false)
        return
      }

      // Success
      setSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'SUCCESS' } : s))
      )
      setLogs((prev) => [`✅ [SUCCESS] ${step.name} committed locally.`, ...prev])
    }

    setLogs((prev) => ['🎉 Saga completed successfully across all Bounded Contexts!', ...prev])
    setIsExecuting(false)
  }

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-expert">Level 5 · Advanced Enterprise DDD</span>
        <h1 className="studio-title">Distributed Sagas & Process Managers</h1>
        <p className="studio-lead">
          When a business workflow spans multiple Bounded Contexts, traditional ACID 2PC distributed transactions kill performance.
          A <strong>Saga</strong> coordinates local transactions with backward <strong>Compensating Actions</strong>, achieving eventual consistency without global database locks.
        </p>
      </div>

      {/* Interactive Controls & Chaos Injection */}
      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Interactive Saga Orchestration Simulator
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Chaos Failure Injection Point:
              </label>
              <select
                value={failAtStep}
                onChange={(e) => setFailAtStep(e.target.value)}
                disabled={isExecuting}
                style={{
                  width: '100%',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                }}
              >
                <option value="none">None (Happy Path - 100% Success)</option>
                <option value="payment">Fail at Step 2: Payment Gateway Declined</option>
                <option value="inventory">Fail at Step 3: Warehouse Out of Stock</option>
                <option value="shipping">Fail at Step 4: Courier API Network Down</option>
              </select>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={runSaga}
              disabled={isExecuting}
              style={{ justifyContent: 'center' }}
            >
              {isExecuting ? 'Orchestrating Saga in Progress...' : '▶ Trigger Checkout Saga'}
            </button>
          </div>

          {/* Saga Visual Pipeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {steps.map((step) => {
              const color =
                step.status === 'SUCCESS'
                  ? 'var(--lime)'
                  : step.status === 'RUNNING'
                  ? 'var(--cyan)'
                  : step.status === 'COMPENSATING'
                  ? 'var(--amber)'
                  : step.status === 'FAILED'
                  ? 'var(--rose)'
                  : 'var(--text-tertiary)'

              return (
                <div
                  key={step.id}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface)',
                    border: `1px solid ${color}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700 }}>{step.name}</div>
                    <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
                      Context: {step.context} · Action: <code>{step.forwardAction}</code>
                    </div>
                  </div>
                  <span
                    className="spec-badge"
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      borderColor: color,
                      color: color,
                    }}
                  >
                    {step.status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Live Saga Event Log */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Saga Process Manager Telemetry
          </h3>

          <div
            style={{
              background: '#070a12',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              height: '320px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            {logs.map((log, i) => (
              <div
                key={i}
                style={{
                  color: log.includes('💥') || log.includes('🛑')
                    ? 'var(--rose)'
                    : log.includes('🔄')
                    ? 'var(--amber)'
                    : log.includes('✅') || log.includes('🎉')
                    ? 'var(--lime)'
                    : '#cbd5e1',
                }}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Polyglot Code Implementation */}
      <div className="code-container">
        <div className="code-header">
          <div className="code-lang-tag">
            {language === 'java' ? '☕ JAVA 26+ SAGA ORCHESTRATOR' : '🐹 GO 1.24 SAGA PROCESS MANAGER'}
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
            Coordinating Local Transactions & Compensating Actions
          </span>
        </div>
        <pre className="code-pre">
          {language === 'java' ? (
`// Java 26: Saga Orchestrator using Structured Concurrency & Virtual Threads
package com.apex.ddd.checkout.saga;

public final class CheckoutSagaOrchestrator {
    private final OrderPort orders;
    private final PaymentPort payments;
    private final InventoryPort inventory;

    public void executeCheckoutSaga(CheckoutCommand cmd) {
        OrderId orderId = orders.createOrder(cmd.items());
        PaymentId paymentId = null;

        try {
            // Forward Step 1: Authorize payment
            paymentId = payments.authorize(cmd.customerId(), cmd.amount());

            // Forward Step 2: Reserve inventory
            inventory.reserve(cmd.items());

            // Final Step: Confirm order
            orders.confirm(orderId);
        } catch (Exception ex) {
            // Failure triggered: Execute backward compensating transactions!
            if (paymentId != null) {
                payments.compensateVoid(paymentId);
            }
            orders.compensateCancel(orderId, ex.getMessage());
            throw new SagaExecutionFailedException("Checkout saga rolled back", ex);
        }
    }
}`
          ) : (
`// Go 1.24: Saga Process Manager with Compensating Rollback Tasks
package saga

import (
	"context"
	"fmt"
)

type Step struct {
	Name       string
	Execute    func(ctx context.Context) error
	Compensate func(ctx context.Context) error
}

type CheckoutSagaCoordinator struct {
	steps []Step
}

func (c *CheckoutSagaCoordinator) Execute(ctx context.Context) error {
	var executed []Step

	for _, step := range c.steps {
		if err := step.Execute(ctx); err != nil {
			// Roll back executed steps in reverse order
			for i := len(executed) - 1; i >= 0; i-- {
				_ = executed[i].Compensate(ctx)
			}
			return fmt.Errorf("saga failed at step %s: %w", step.Name, err)
		}
		executed = append(executed, step)
	}
	return nil
}`
          )}
        </pre>
      </div>
    </div>
  )
}
