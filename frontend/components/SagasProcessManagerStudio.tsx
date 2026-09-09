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
  const [copiedCode, setCopiedCode] = useState(false)
  const [logs, setLogs] = useState<string[]>(['Saga Coordinator initialized and waiting for checkout trigger.'])

  const [steps, setSteps] = useState<SagaStep[]>([
    {
      id: 'order',
      name: '1. Create Order',
      context: 'Sales Context',
      forwardAction: 'order.createPending()',
      compensatingAction: 'order.cancel("Saga rollback")',
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
    setSteps((prev) => prev.map((s) => ({ ...s, status: 'PENDING' })))

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      setSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'RUNNING' } : s))
      )
      setLogs((prev) => [`⏳ [FORWARD ACTION] ${step.context}: Executing ${step.forwardAction}...`, ...prev])

      await new Promise((r) => setTimeout(r, 600))

      if (failAtStep === step.id) {
        setSteps((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: 'FAILED' } : s))
        )
        setLogs((prev) => [
          `💥 [FAILURE] ${step.name} failed! Saga Process Manager initiating backward compensating transactions...`,
          ...prev,
        ])

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

      setSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'SUCCESS' } : s))
      )
      setLogs((prev) => [`✅ [SUCCESS] ${step.name} completed successfully.`, ...prev])
    }

    setLogs((prev) => ['🎉 Saga completed with 100% cross-context eventual consistency!', ...prev])
    setIsExecuting(false)
  }

  const codeJava = `// Java 26+ Saga Orchestrator / Process Manager with Virtual Threads
package com.apex.core.checkout.saga;

import java.time.Duration;

public class CheckoutSagaOrchestrator {
    private final OrderPort orderPort;
    private final PaymentPort paymentPort;
    private final InventoryPort inventoryPort;
    private final ShippingPort shippingPort;

    public void executeCheckoutSaga(CheckoutContext ctx) {
        try {
            // Forward actions
            orderPort.createPendingOrder(ctx);
            paymentPort.authorizePayment(ctx);
            inventoryPort.reserveInventory(ctx);
            shippingPort.bookCourier(ctx);
            orderPort.markConfirmed(ctx);
        } catch (InventoryExhaustedException e) {
            // Backward Compensating Transactions in reverse order
            rollbackSaga(ctx, e);
        }
    }

    private void rollbackSaga(CheckoutContext ctx, Exception cause) {
        // Compensating actions must be idempotent
        paymentPort.voidAuthorization(ctx.paymentId());
        orderPort.cancelOrder(ctx.orderId(), cause.getMessage());
    }
}`

  const codeGo = `// Go 1.24 Distributed Saga Process Manager
package saga

import (
	"context"
	"errors"
)

type Step struct {
	Name       string
	Execute    func(ctx context.Context) error
	Compensate func(ctx context.Context) error
}

type SagaManager struct {
	steps []Step
}

func (sm *SagaManager) Run(ctx context.Context) error {
	executed := []Step{}

	for _, step := range sm.steps {
		if err := step.Execute(ctx); err != nil {
			// Trigger backward compensating rollback in reverse
			for i := len(executed) - 1; i >= 0; i-- {
				_ = executed[i].Compensate(ctx)
			}
			return errors.New("saga failed: executed rollback")
		}
		executed = append(executed, step)
	}
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
      <div className="studio-card" style={{ background: 'var(--surface-elevated)', borderLeft: '4px solid var(--violet)', marginBottom: 'var(--space-6)' }}>
        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-violet">Level 5 · Distributed Systems</span>
              <span className="badge-lime">Compensating Sagas</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Distributed Sagas &amp; Process Managers: Maintaining Eventual Consistency Across Boundaries
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          In distributed microservice ecosystems where each Bounded Context owns its private database, ACID 2-Phase Commit (2PC) transactions are impossible without crippling system availability.
          A <strong>Saga</strong> coordinates a sequence of local transactions across bounded contexts, relying on backward <strong>Compensating Transactions</strong> to semantically undo state if an intermediate step fails.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: The Two-Phase Commit (2PC) Trap &amp; Half-Committed Data
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Distributed systems cannot use ACID transactions across HTTP or asynchronous message buses.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              1. <em>The 2PC Deadlock:</em> Traditional distributed 2PC holds locks across network boundaries; if one node or network switch hiccups, all participating databases freeze.<br />
              2. <em>The Partial Failure Hazard:</em> A checkout service calls Payment, debits $500, and then calls Warehouse Inventory which fails with <code>HTTP 500 Out of Stock</code>. The customer's credit card remains debited while no inventory was allocated, creating data corruption and financial liability.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Sagas &amp; Backward Compensating Process Managers
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Sagas trade strict atomic locking for <strong>Eventual Consistency</strong> through forward and backward workflows:
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>1. Local Transactions:</strong> Each step commits locally inside its own Bounded Context (Order, Billing, Inventory, Shipping).<br />
              <strong>2. Compensating Actions:</strong> For every forward action $A_i$, there exists an exact compensating action $C_i$ (e.g., <code>authorizePayment()</code> has <code>voidAuthorization()</code>).<br />
              <strong>3. Process Manager / Orchestrator:</strong> A state machine orchestrates the workflow. If step 3 fails, the orchestrator halts forward execution and executes $C_2, C_1$ in reverse order, returning the system to a clean, consistent state.
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(168, 85, 247, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(168, 85, 247, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Amazon, Uber, and Airbnb operate millions of concurrent transactions using Sagas. Temporal.io and AWS Step Functions are purpose-built enterprise engines designed specifically to manage long-running Saga compensations and process managers.
          </span>
          <span className="mono-badge" style={{ color: 'var(--violet-light)' }}>Garcia-Molina &amp; Salem (1987) · Sagas</span>
        </div>
      </div>

      {/* Interactive Saga Orchestration Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive Distributed Saga Orchestrator</h3>
              <span className="live-badge"><span className="live-dot" /> Live Failure Injection</span>
            </div>
            <p className="card-desc">
              Trigger forward execution across 4 Bounded Contexts, or inject simulated failures to watch the Process Manager trigger backward compensating transactions in real time.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Inject Chaos Failure:</label>
            <select
              value={failAtStep}
              onChange={(e) => setFailAtStep(e.target.value)}
              disabled={isExecuting}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
              }}
            >
              <option value="none">No Failure (100% Success)</option>
              <option value="payment">Fail at Step 2 (Billing Decline)</option>
              <option value="inventory">Fail at Step 3 (Out of Stock)</option>
              <option value="shipping">Fail at Step 4 (Carrier Unavailable)</option>
            </select>
          </div>
        </div>

        {/* Step Progress Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          {steps.map((step) => {
            const isSuccess = step.status === 'SUCCESS'
            const isRunning = step.status === 'RUNNING'
            const isFailed = step.status === 'FAILED'
            const isComp = step.status === 'COMPENSATING'

            return (
              <div
                key={step.id}
                style={{
                  background: 'var(--bg)',
                  border: `1px solid ${isSuccess ? 'var(--lime)' : isFailed ? 'var(--rose)' : isComp ? '#fbbf24' : isRunning ? 'var(--cyan)' : 'var(--border-subtle)'}`,
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--duration-fast)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: 'var(--text-xs)' }}>{step.name}</strong>
                  <span
                    className={isSuccess ? 'badge-lime' : isFailed ? 'badge-rose' : isRunning ? 'badge-cyan' : isComp ? 'badge-amber' : 'mono-badge'}
                  >
                    {step.status}
                  </span>
                </div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
                  {step.context}
                </div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: isComp ? '#fbbf24' : 'var(--text-secondary)' }}>
                  {isComp ? `Compensate: ${step.compensatingAction}` : `Forward: ${step.forwardAction}`}
                </div>
              </div>
            )
          })}
        </div>

        {/* Controls and Log output */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={runSaga}
            disabled={isExecuting}
          >
            {isExecuting ? 'Orchestrating Saga...' : '🚀 Execute Checkout Saga'}
          </button>
        </div>

        <div style={{ maxHeight: '140px', overflowY: 'auto', background: '#05070a', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: 'var(--space-6)' }}>
          <div style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
            SAGA PROCESS MANAGER TELEMETRY LOG
          </div>
          {logs.map((log, idx) => (
            <div key={idx} style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: log.includes('💥') || log.includes('FAILED') ? 'var(--rose)' : log.includes('🔄') ? '#fbbf24' : log.includes('✅') || log.includes('🎉') ? '#10b981' : 'var(--cyan)', marginBottom: '3px' }}>
              {log}
            </div>
          ))}
        </div>

        {/* Code Viewer */}
        <div className="code-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {language === 'java' ? 'Java 26+ · Saga Orchestrator with Compensations' : 'Go 1.24 · Distributed Saga Process Manager'}
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
