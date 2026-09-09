'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

export default function DomainServicesStudio() {
  const { language } = useLanguage()
  const [amountUSD, setAmountUSD] = useState<number>(500)
  const [destCountry, setDestCountry] = useState<'DE' | 'GB' | 'JP' | 'US'>('DE')
  const [includeVat, setIncludeVat] = useState<boolean>(true)

  // Simulation parameters for domain calculation
  const exchangeRates = { DE: 0.92, GB: 0.79, JP: 154.2, US: 1.0 }
  const taxRates = { DE: 0.19, GB: 0.20, JP: 0.10, US: 0.0825 }
  const currencyCodes = { DE: 'EUR', GB: 'GBP', JP: 'JPY', US: 'USD' }

  const convertedBase = amountUSD * exchangeRates[destCountry]
  const taxAmount = includeVat ? convertedBase * taxRates[destCountry] : 0
  const finalSettlement = convertedBase + taxAmount

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-advanced">Level 3 · Tactical Building Blocks</span>
        <h1 className="studio-title">Domain Services vs Application Services</h1>
        <p className="studio-lead">
          One of the most frequent architectural failures is confusing <strong>Domain Services</strong> with <strong>Application Services</strong>.
          Domain Services encapsulate business rules that span multiple aggregates, while Application Services orchestrate transactions and infrastructure.
        </p>
      </div>

      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ borderTop: '3px solid var(--cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)' }}>Domain Service (Pure Business Logic)</strong>
            <span className="spec-badge">STATELESS</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            <li>✓ Pure domain calculations (e.g. Tax Nexus, Forex conversion, Credit Score)</li>
            <li>✓ Operates strictly on Value Objects and Entities</li>
            <li>✓ 100% free of framework dependencies (zero HTTP, zero SQL, zero email)</li>
            <li>✓ Deterministic and easily unit-tested without mocks</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ borderTop: '3px solid var(--violet)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)' }}>Application Service (Orchestrator)</strong>
            <span className="spec-badge" style={{ background: 'rgba(168,85,247,0.15)', color: 'var(--violet)' }}>USE CASE</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            <li>✓ Coordinates security authentication and authorization</li>
            <li>✓ Opens and commits database transactions</li>
            <li>✓ Loads aggregates from Repositories and invokes Domain Services</li>
            <li>✓ Dispatches Domain Events to message brokers (Kafka/RabbitMQ)</li>
          </ul>
        </div>
      </div>

      {/* Interactive Settlement & Tax Domain Service Engine */}
      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Interactive Multi-Currency Settlement Engine
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
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
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                  Destination Jurisdiction:
                </label>
                <select
                  value={destCountry}
                  onChange={(e) => setDestCountry(e.target.value as any)}
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
                  <option value="DE">Germany (19% VAT · EUR)</option>
                  <option value="GB">United Kingdom (20% VAT · GBP)</option>
                  <option value="JP">Japan (10% Consumption Tax · JPY)</option>
                  <option value="US">USA California (8.25% Sales Tax · USD)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
                <input
                  type="checkbox"
                  id="includeVat"
                  checked={includeVat}
                  onChange={(e) => setIncludeVat(e.target.checked)}
                  style={{ accentColor: 'var(--cyan)' }}
                />
                <label htmlFor="includeVat" style={{ fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                  Apply Regional VAT / Tax
                </label>
              </div>
            </div>
          </div>

          <div style={{ background: '#070b14', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--cyan)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Pure Domain Service Output (SettlementCalculation):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: 'var(--text-xs)' }}>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>FX Rate Applied:</span>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>1 USD = {exchangeRates[destCountry]} {currencyCodes[destCountry]}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Converted Subtotal:</span>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{convertedBase.toFixed(2)} {currencyCodes[destCountry]}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Tax Nexus Amount:</span>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--amber)' }}>{taxAmount.toFixed(2)} {currencyCodes[destCountry]}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Final Settlement:</span>
                <div style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--lime)', fontSize: 'var(--text-sm)' }}>
                  {finalSettlement.toFixed(2)} {currencyCodes[destCountry]}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Execution Sequence Diagram */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Architectural Call Sequence
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--text-xs)' }}>
            <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--violet)' }}>
              <strong>1. Application Service: <code>TransferFundsUseCase</code></strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-2xs)', marginTop: '0.2rem' }}>
                Begins DB Transaction. Authenticates caller. Loads <code>SourceAccount</code> and <code>DestinationAccount</code> aggregates from Repository.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--cyan)' }}>
              <strong>2. Domain Service: <code>SettlementCalculationService</code></strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-2xs)', marginTop: '0.2rem' }}>
                Pure domain logic: Evaluates exchange rates, cross-border banking limits, and regional tax nexus. Zero side effects.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--lime)' }}>
              <strong>3. Aggregates: State Mutation & Invariants</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-2xs)', marginTop: '0.2rem' }}>
                <code>source.debit(500 USD)</code> and <code>dest.credit(finalAmount)</code>. Each aggregate verifies its internal invariants.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--violet)' }}>
              <strong>4. Application Service: Commit & Dispatch</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-2xs)', marginTop: '0.2rem' }}>
                Saves aggregates via repository. Commits DB transaction. Publishes <code>FundsTransferredEvent</code> to Outbox.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Polyglot Code Implementation */}
      <div className="code-container">
        <div className="code-header">
          <div className="code-lang-tag">
            {language === 'java' ? '☕ JAVA 26+ DOMAIN SERVICE VS APPLICATION SERVICE' : '🐹 GO 1.24 DOMAIN FUNCTION VS USE CASE'}
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
            Decoupling Pure Domain Math from Transactional Use Cases
          </span>
        </div>
        <pre className="code-pre">
          {language === 'java' ? (
`// Java 26: Pure Domain Service (zero framework annotations)
package com.apex.ddd.banking.domain.service;

public final class SettlementDomainService {
    // Pure function: takes Domain Value Objects, returns Calculated Settlement
    public SettlementResult calculateCrossBorderSettlement(
        Money sourceAmount, 
        ExchangeRate rate, 
        TaxNexus taxRule
    ) {
        Money converted = sourceAmount.multiply(rate.ratio());
        Money tax = converted.percentage(taxRule.percentage());
        Money total = converted.add(tax);
        return new SettlementResult(converted, tax, total);
    }
}

// Application Service: Orchestrates use case, transactions, and repositories
@Service
public class TransferFundsApplicationService {
    private final AccountRepository accounts;
    private final SettlementDomainService settlementService;
    private final DomainEventPublisher eventPublisher;

    @Transactional
    public void execute(TransferFundsCommand cmd) {
        var source = accounts.loadOrThrow(cmd.sourceId());
        var dest = accounts.loadOrThrow(cmd.destId());

        var result = settlementService.calculateCrossBorderSettlement(cmd.amount(), cmd.rate(), cmd.taxRule());
        
        source.debit(cmd.amount());
        dest.credit(result.finalSettlement());

        accounts.save(source);
        accounts.save(dest);
        eventPublisher.publish(new FundsTransferredEvent(source.getId(), dest.getId(), result.finalSettlement()));
    }
}`
          ) : (
`// Go 1.24: Pure Domain Service function vs Application Use Case
package domain

// CalculateSettlement is a pure Domain Service function
func CalculateSettlement(amount Money, rate float64, taxPct float64) SettlementResult {
	converted := int64(float64(amount.Cents) * rate)
	tax := int64(float64(converted) * taxPct)
	return SettlementResult{
		ConvertedCents: converted,
		TaxCents:       tax,
		TotalCents:     converted + tax,
	}
}

// Application Service / Use Case
type TransferFundsUseCase struct {
	repo      AccountRepository
	publisher EventPublisher
}

func (uc *TransferFundsUseCase) Execute(ctx context.Context, cmd TransferCommand) error {
	source, err := uc.repo.FindByID(ctx, cmd.SourceID)
	if err != nil { return err }

	dest, err := uc.repo.FindByID(ctx, cmd.DestID)
	if err != nil { return err }

	// Invoke stateless domain service
	settlement := CalculateSettlement(cmd.Amount, cmd.Rate, cmd.TaxPct)

	if err := source.Debit(cmd.Amount); err != nil { return err }
	dest.Credit(settlement.TotalCents)

	if err := uc.repo.Save(ctx, source); err != nil { return err }
	return uc.repo.Save(ctx, dest)
}`
          )}
        </pre>
      </div>
    </div>
  )
}
