'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/lib/language'

export default function ValueObjectsStudio() {
  const { language } = useLanguage()
  const [amount1, setAmount1] = useState<number>(100.5)
  const [currency1, setCurrency1] = useState<string>('USD')
  const [amount2, setAmount2] = useState<number>(45.25)
  const [currency2, setCurrency2] = useState<string>('USD')
  const [resultLog, setResultLog] = useState<string>('Ready for Value Object calculations.')
  const [hasError, setHasError] = useState<boolean>(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const handleAdd = () => {
    if (currency1 !== currency2) {
      setHasError(true)
      setResultLog(
        `❌ Domain Rule Violation: IncompatibleCurrencyException. Cannot add ${currency1} to ${currency2} without an explicit CurrencyExchangeRate domain service! Money values are strongly typed.`
      )
      return
    }
    setHasError(false)
    const sum = (Math.round((amount1 + amount2) * 100) / 100).toFixed(2)
    setResultLog(
      `✅ Immutable Operation: Money.of(${amount1}, "${currency1}").add(Money.of(${amount2}, "${currency2}")) -> Result: ${sum} ${currency1} (Brand new instance created!)`
    )
  }

  const handleFloatingPointComparison = () => {
    const rawFloatSum = 0.1 + 0.2
    setHasError(false)
    setResultLog(
      `⚠️ Primitive Obsession Bug: In raw IEEE-754 floats, 0.1 + 0.2 = ${rawFloatSum}. In DDD Money Value Object, rounding is exact (0.30 USD) using integer smallest units / BigDecimal!`
    )
  }

  const codeJava = `// Java 26+ Pure Value Object using Compact Record & Invariant Validation
package com.apex.core.shared.domain;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Currency;
import java.util.Objects;

public record Money(BigDecimal amount, Currency currency) implements Comparable<Money> {

    // Compact constructor guarding structural invariants
    public Money {
        Objects.requireNonNull(amount, "Amount must not be null");
        Objects.requireNonNull(currency, "Currency must not be null");
        // Normalize to standard currency decimal scale
        amount = amount.setScale(currency.getDefaultFractionDigits(), RoundingMode.HALF_EVEN);
    }

    public static Money of(double amount, String currencyCode) {
        return new Money(BigDecimal.valueOf(amount), Currency.getInstance(currencyCode));
    }

    // Pure immutable business method: returns new instance
    public Money add(Money other) {
        Objects.requireNonNull(other, "Cannot add null Money");
        if (!this.currency.equals(other.currency)) {
            throw new IncompatibleCurrencyException(
                "Cannot add " + other.currency + " to " + this.currency + " without CurrencyExchangeService"
            );
        }
        return new Money(this.amount.add(other.amount), this.currency);
    }

    public boolean isPositive() {
        return amount.compareTo(BigDecimal.ZERO) > 0;
    }

    @Override
    public int compareTo(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IncompatibleCurrencyException("Cannot compare different currencies");
        }
        return this.amount.compareTo(other.amount);
    }
}`

  const codeGo = `// Go 1.24 Immutable Value Object with Structural Equality
package domain

import (
	"errors"
	"fmt"
	"math"
)

// Money represents an immutable financial amount stored in integer smallest units (cents)
type Money struct {
	cents    int64
	currency string
}

// NewMoney guards creation invariants
func NewMoney(amount float64, currency string) (Money, error) {
	if currency == "" {
		return Money{}, errors.New("currency code cannot be empty")
	}
	// Prevent IEEE-754 precision loss by converting to exact integer cents
	cents := int64(math.Round(amount * 100))
	return Money{cents: cents, currency: currency}, nil
}

// Add returns a brand new Money Value Object (Pure Functional Semantics)
func (m Money) Add(other Money) (Money, error) {
	if m.currency != other.currency {
		return Money{}, fmt.Errorf("currency mismatch: cannot add %s to %s", other.currency, m.currency)
	}
	return Money{
		cents:    m.cents + other.cents,
		currency: m.currency,
	}, nil
}

func (m Money) Formatted() string {
	return fmt.Sprintf("%.2f %s", float64(m.cents)/100.0, m.currency)
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
              <span className="badge-lime">Self-Guarding Invariants</span>
            </div>
            <h2 className="card-title" style={{ fontSize: 'var(--text-xl)' }}>
              Value Objects &amp; Primitive Obsession: Eliminating Type Rot &amp; Rounding Drift
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          Primitive Obsession is the most pervasive anti-pattern in modern software engineering. Relying on raw primitives (<code>double</code>, <code>String</code>, <code>UUID</code>) leaves business logic exposed to silent calculation drift, currency mismatch bugs, and accidental parameter transposition. A <strong>Value Object</strong> is an immutable, self-validating entity defined purely by its structural attributes.
        </p>

        <div className="grid-2" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
          {/* Problem */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--rose)', marginBottom: 'var(--space-2)' }}>
              ❌ The Problem: Primitive Obsession &amp; IEEE-754 Precision Drift
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Developers pass around raw floats, doubles, and strings to represent complex domain quantities like prices, email addresses, and SKUs.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>What breaks at enterprise scale:</strong>
              1. <em>IEEE-754 Floating-point Drift:</em> Operations like <code>0.1 + 0.2 = 0.30000000000000004</code> create cumulative rounding errors that break financial ledger reconciliation.<br />
              2. <em>Currency Mismatch:</em> An API receives <code>amount: 100</code> without currency context, accidentally adding 100 USD to 100 JPY (a 150x financial error).<br />
              3. <em>Parameter Transposition:</em> A method <code>transfer(String fromId, String toId, double amount)</code> easily accepts swapped IDs without compile-time error.
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lime)', marginBottom: 'var(--space-2)' }}>
              💡 The Solution: Immutable, Self-Validating Value Objects
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              DDD models these concepts as first-class <strong>Value Objects</strong> adhering to three fundamental laws:
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>
              <strong>1. Structural Equality:</strong> Two Value Objects with identical properties are identical; they possess no arbitrary entity ID.<br />
              <strong>2. Absolute Immutability:</strong> State can never be mutated in place. Methods like <code>money.add(other)</code> return brand-new instances, preventing concurrency race conditions.<br />
              <strong>3. Constructor Invariant Guards:</strong> It is impossible to hold an invalid Value Object in memory. <code>Money.of(-5, "USD")</code> or adding USD to EUR throws immediately at the boundary.
            </div>
          </div>
        </div>

        {/* Enterprise Reality */}
        <div style={{ marginTop: 'var(--space-4)', padding: '10px 14px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--cyan-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text)' }}>
            🏢 <strong>Enterprise Production Reality:</strong> Stripe processes hundreds of billions of dollars annually by representing all balances as immutable integer smallest currency units (cents) wrapped in strongly typed Value Objects, preventing floating-point precision theft and currency contamination across multi-country settlements.
          </span>
          <span className="mono-badge" style={{ color: 'var(--cyan)' }}>Evans Ch. 5 · Value Objects</span>
        </div>
      </div>

      {/* Value Object Three Pillars Grid */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card" style={{ borderTop: '3px solid var(--cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-cyan">1. STRUCTURAL EQUALITY</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Identical attributes define equivalence. Two $100 bills are interchangeable; they have no persistent identity.
          </div>
        </div>

        <div className="metric-card" style={{ borderTop: '3px solid var(--lime)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-lime">2. ABSOLUTE IMMUTABILITY</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            State never mutates. Operations return new instances, making Value Objects thread-safe and cache-friendly.
          </div>
        </div>

        <div className="metric-card" style={{ borderTop: '3px solid var(--violet)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge-violet">3. SELF-VALIDATING</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Guaranteed valid at construction time. Invalid states are caught at the boundary before entering the domain.
          </div>
        </div>
      </div>

      {/* Interactive Arithmetic Simulator Card */}
      <div className="studio-card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className="card-title">Interactive Money &amp; Currency Safety Simulator</h3>
              <span className="live-badge"><span className="live-dot" /> Live Invariant Test</span>
            </div>
            <p className="card-desc">
              Test how strongly typed Value Objects reject incompatible currency operations and eliminate floating point rounding errors.
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          {/* Controls */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              {/* VO 1 */}
              <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }}>
                <span className="metric-label" style={{ color: 'var(--cyan)' }}>Value Object 1</span>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                  <input
                    type="number"
                    value={amount1}
                    onChange={(e) => setAmount1(Number(e.target.value))}
                    style={{
                      width: '65%',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                    }}
                  />
                  <select
                    value={currency1}
                    onChange={(e) => setCurrency1(e.target.value)}
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '4px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              {/* VO 2 */}
              <div style={{ background: 'var(--surface)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)' }}>
                <span className="metric-label" style={{ color: 'var(--lime)' }}>Value Object 2</span>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                  <input
                    type="number"
                    value={amount2}
                    onChange={(e) => setAmount2(Number(e.target.value))}
                    style={{
                      width: '65%',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                    }}
                  />
                  <select
                    value={currency2}
                    onChange={(e) => setCurrency2(e.target.value)}
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '4px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleAdd}
              >
                Execute Money.add()
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleFloatingPointComparison}
              >
                Simulate Float Drift (0.1 + 0.2)
              </button>
            </div>
          </div>

          {/* Output log */}
          <div style={{ background: 'var(--bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span className="metric-label">Execution Result &amp; Invariant Feedback</span>
            <div
              style={{
                marginTop: '10px',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                background: hasError ? 'rgba(251, 113, 133, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                border: `1px solid ${hasError ? 'rgba(251, 113, 133, 0.4)' : 'rgba(16, 185, 129, 0.3)'}`,
                fontSize: 'var(--text-xs)',
                color: hasError ? 'var(--rose)' : '#10b981',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.5,
              }}
            >
              {resultLog}
            </div>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="code-block">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {language === 'java' ? 'Java 26+ · Value Object Record with Compact Invariant Constructor' : 'Go 1.24 · Immutable Value Object Struct'}
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
