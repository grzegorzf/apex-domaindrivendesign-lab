'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

export default function DomainServicesStudio() {
  const { language } = useLanguage()
  const [amountUSD, setAmountUSD] = useState<number>(500)
  const [destCountry, setDestCountry] = useState<'DE' | 'GB' | 'JP' | 'US'>('DE')
  const [includeVat, setIncludeVat] = useState<boolean>(true)
  const [copiedCode, setCopiedCode] = useState(false)

  // Simulation parameters for pure domain calculation
  const exchangeRates = { DE: 0.92, GB: 0.79, JP: 154.2, US: 1.0 }
  const taxRates = { DE: 0.19, GB: 0.20, JP: 0.10, US: 0.0825 }
  const currencyCodes = { DE: 'EUR', GB: 'GBP', JP: 'JPY', US: 'USD' }

  const convertedBase = amountUSD * exchangeRates[destCountry]
  const taxAmount = includeVat ? convertedBase * taxRates[destCountry] : 0
  const finalSettlement = convertedBase + taxAmount

  const codeJava = `// Java 26+ Pure Domain Service vs Orchestrating Application Service
package com.apex.core.billing.domain.service;

import com.apex.core.shared.domain.Money;
import java.math.BigDecimal;
import java.util.Currency;

// 1. DOMAIN SERVICE: Pure Business Logic, Stateless, Zero Framework Bleed
public class CrossBorderSettlementDomainService {
    public SettlementResult calculateSettlement(Money sourceAmount, ExchangeRate rate, TaxNexusPolicy taxPolicy) {
        Money converted = rate.convert(sourceAmount);
        Money tax = taxPolicy.calculateTax(converted);
        Money total = converted.add(tax);
        return new SettlementResult(converted, tax, total);
    }
}

// 2. APPLICATION SERVICE: Use Case Orchestrator (Transactions, Security, I/O)
package com.apex.core.billing.application;

@Service
@Transactional
public class CheckoutApplicationService {
    private final OrderRepository orderRepo;
    private final ExchangeRatePort exchangePort;
    private final CrossBorderSettlementDomainService settlementService;
    private final DomainEventPublisher eventPublisher;

    public void executeCheckout(CheckoutCommand cmd) {
        Order order = orderRepo.findById(cmd.orderId()).orElseThrow();
        ExchangeRate rate = exchangePort.fetchRate(order.currency(), cmd.targetCurrency());
        
        // Pure domain calculation delegated to domain service
        SettlementResult settlement = settlementService.calculateSettlement(order.total(), rate, cmd.taxPolicy());
        
        order.markPaid(settlement.total());
        orderRepo.save(order);
        eventPublisher.publish(new OrderSettledEvent(order.id(), settlement));
    }
}`

  const codeGo = `// Go 1.24 Pure Domain Service vs Application Service Handler
package domain

// DOMAIN SERVICE: Pure Business Logic (Deterministic & Testable with Zero Mocks)
type SettlementDomainService struct{}

func (s *SettlementDomainService) CalculateSettlement(amount Money, rate float64, taxRate float64) (converted, tax, total Money) {
	convCents := int64(float64(amount.Cents()) * rate)
	taxCents := int64(float64(convCents) * taxRate)
	totalCents := convCents + taxCents

	return Money{cents: convCents}, Money{cents: taxCents}, Money{cents: totalCents}
}

// APPLICATION SERVICE: Use Case Handler (Coordinates DB, Ports, and Events)
type CheckoutApplicationService struct {
	repo      OrderRepository
	forexPort ForexRatePort
	domainSvc *SettlementDomainService
	broker    EventBroker
}

func (app *CheckoutApplicationService) Execute(cmd CheckoutCommand) error {
	order, err := app.repo.FindByID(cmd.OrderID)
	if err != nil {
		return err
	}
	rate := app.forexPort.GetRate(order.Currency(), cmd.TargetCurrency)
	_, _, total := app.domainSvc.CalculateSettlement(order.Total(), rate, cmd.TaxRate)

	order.ApplyPayment(total)
	return app.repo.Save(order)
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
              <span className="badge-cyan">Level 3 · Tactical Building Blocks</span>
              <span className="badge-lime">Separation of Concerns</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Domain Services vs. Application Services: Decoupling Pure Logic from Orchestration
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          One of the most frequent architectural failures in enterprise software is conflating <strong>Domain Services</strong> with <strong>Application Services</strong>.
          Domain Services encapsulate pure business calculations that cross aggregate boundaries, while Application Services orchestrate use-case workflows, transactions, and infrastructure I/O.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: The "Bloated Service" Anti-Pattern &amp; Leaky Orchestration
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Developers create monolithic Spring <code>@Service</code> or NestJS classes where business rules, database transactions, HTTP calls, and emails are crammed together.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              1. <em>Mocking Hell:</em> Testing a 4-line tax calculation requires spinning up Spring Test contexts or mocking 8 repositories, Redis caches, and Kafka brokers.<br />
              2. <em>Unnatural Aggregate Coupling:</em> Attempting to force multi-entity operations (e.g. money transfer between Account A and Account B) directly onto one aggregate pollutes its responsibilities.<br />
              3. <em>Transaction Leakage:</em> Calculation code accidentally acquires database transaction locks for seconds while making remote third-party API calls.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Pure Domain Services vs. Stateless Application Use Cases
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              DDD establishes a clean, razor-sharp architectural boundary between the two:
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>1. Domain Service (Pure Logic):</strong> Stateless and 100% free of framework annotations or I/O. Operates purely on Value Objects and Entities. Runs in sub-microseconds with zero mock dependencies.<br />
              <strong>2. Application Service (Orchestrator):</strong> Executes a specific user use case. Manages security context, opens database transactions, loads aggregates, invokes the Domain Service, commits state, and dispatches events. Contains zero mathematical business rules.
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--cyan-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Fintech payment gateways like Wise and Adyen use pure Domain Services for algorithmic Forex cross-rate matching and anti-money laundering (AML) heuristic scoring, keeping them completely decoupled from Application Services managing bank ACH webhooks and ACID isolation levels.
          </span>
          <span className="mono-badge" style={{ color: 'var(--cyan)' }}>Evans Ch. 4 · Services</span>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card" style={{ borderTop: '3px solid var(--cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-cyan">DOMAIN SERVICE</span>
            <span className="mono-badge" style={{ color: 'var(--cyan)' }}>PURE BUSINESS LOGIC</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            <li>✓ Pure business calculations (Tax Nexus, Forex Conversion, Risk Score)</li>
            <li>✓ Operates strictly on Value Objects &amp; Entities</li>
            <li>✓ 100% framework-agnostic (zero HTTP, SQL, or email imports)</li>
            <li>✓ Deterministic and unit-tested in microseconds without mocks</li>
          </ul>
        </div>

        <div className="metric-card" style={{ borderTop: '3px solid var(--violet)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-violet">APPLICATION SERVICE</span>
            <span className="mono-badge" style={{ color: 'var(--violet-light)' }}>USE CASE ORCHESTRATOR</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            <li>✓ Authenticates caller &amp; authorizes permissions</li>
            <li>✓ Begins, commits, or rolls back database transactions</li>
            <li>✓ Fetches aggregates via Repositories and invokes Domain Services</li>
            <li>✓ Publishes Domain Events to message brokers (Kafka/RabbitMQ)</li>
          </ul>
        </div>
      </div>

      {/* Interactive Settlement & Tax Domain Service Engine Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive Multi-Currency Settlement Domain Engine</h3>
              <span className="live-badge"><span className="live-dot" /> Pure Domain Calculation</span>
            </div>
            <p className="card-desc">
              Demonstrates a pure stateless Domain Service computing cross-border exchange rates and localized tax nexus rules without touching database or framework infrastructure.
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          {/* Inputs */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Transfer Amount (USD):
              </label>
              <input
                type="number"
                value={amountUSD}
                onChange={(e) => setAmountUSD(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div>
                <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Target Jurisdiction:
                </label>
                <select
                  value={destCountry}
                  onChange={(e) => setDestCountry(e.target.value as any)}
                  style={{
                    width: '100%',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  <option value="DE">Germany (EUR - 19% VAT)</option>
                  <option value="GB">United Kingdom (GBP - 20% VAT)</option>
                  <option value="JP">Japan (JPY - 10% Consumption Tax)</option>
                  <option value="US">USA (USD - 8.25% State Nexus)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '18px' }}>
                <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={includeVat}
                    onChange={(e) => setIncludeVat(e.target.checked)}
                    style={{ accentColor: 'var(--cyan)' }}
                  />
                  Apply Jurisdiction Tax Nexus
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span className="metric-label" style={{ color: 'var(--cyan)' }}>Domain Calculation Output</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: '10px', marginBottom: 'var(--space-4)' }}>
              <div className="metric-card">
                <div className="metric-label">Converted Base</div>
                <div className="metric-value" style={{ color: 'var(--cyan)' }}>
                  {convertedBase.toFixed(2)} {currencyCodes[destCountry]}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Calculated Tax</div>
                <div className="metric-value" style={{ color: '#fbbf24' }}>
                  {taxAmount.toFixed(2)} {currencyCodes[destCountry]}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700 }}>Total Final Settlement:</span>
              <span style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--lime)' }}>
                {finalSettlement.toFixed(2)} {currencyCodes[destCountry]}
              </span>
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="code-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {language === 'java' ? 'Java 26+ · Pure Domain Service vs Application Orchestrator' : 'Go 1.24 · Pure Domain Service vs Application Handler'}
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
