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

  const handleAdd = () => {
    if (currency1 !== currency2) {
      setHasError(true)
      setResultLog(
        `❌ Domain Rule Violation: Cannot add ${currency1} to ${currency2} without explicit CurrencyExchangeRate domain service! Money values are strongly typed.`
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
      `⚠️ Primitive Obsession Bug: In raw IEEE-754 floats, 0.1 + 0.2 = ${rawFloatSum}. In DDD Money Value Object, rounding is exact (0.30 USD) using integer cents / BigDecimal!`
    )
  }

  return (
    <div className="studio-main">
      <div className="studio-hero">
        <span className="studio-level-tag level-intermediate">Level 3 · Tactical Building Blocks</span>
        <h1 className="studio-title">Value Objects & Primitive Obsession</h1>
        <p className="studio-lead">
          Primitive Obsession is the most rampant code smell in modern software. Passing raw numbers and strings leaves systems vulnerable to currency mismatch and rounding bugs.
          A <strong>Value Object</strong> is an immutable, self-validating entity defined purely by its structural attributes.
        </p>
      </div>

      <div className="grid-3col" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ borderTop: '3px solid var(--cyan)' }}>
          <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)' }}>1. Structural Equality</strong>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Two Value Objects with identical attributes are completely interchangeable. A $100 bill in your pocket equals another $100 bill; they have no persistent identity.
          </p>
        </div>

        <div className="glass-panel" style={{ borderTop: '3px solid var(--lime)' }}>
          <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--lime)' }}>2. Absolute Immutability</strong>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Once instantiated, a Value Object can never change state. Adding $5 to $100 does not mutate the original $100—it returns an entirely new $105 Value Object.
          </p>
        </div>

        <div className="glass-panel" style={{ borderTop: '3px solid var(--violet)' }}>
          <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)' }}>3. Self-Validating Invariants</strong>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            It is physically impossible to hold an invalid Value Object in memory. If an email address has no <code>@</code> sign, construction throws an error immediately.
          </p>
        </div>
      </div>

      {/* Interactive Money Arithmetic Simulator */}
      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Interactive Money & Currency Simulator
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {/* Value Object 1 */}
            <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--cyan)', fontWeight: 700, marginBottom: '0.5rem' }}>
                MONEY VALUE OBJECT 1
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="number"
                  value={amount1}
                  onChange={(e) => setAmount1(Number(e.target.value))}
                  style={{
                    width: '65%',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    padding: '0.35rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                  }}
                />
                <select
                  value={currency1}
                  onChange={(e) => setCurrency1(e.target.value)}
                  style={{
                    width: '35%',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    padding: '0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>
            </div>

            {/* Value Object 2 */}
            <div style={{ background: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--lime)', fontWeight: 700, marginBottom: '0.5rem' }}>
                MONEY VALUE OBJECT 2
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="number"
                  value={amount2}
                  onChange={(e) => setAmount2(Number(e.target.value))}
                  style={{
                    width: '65%',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    padding: '0.35rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                  }}
                />
                <select
                  value={currency2}
                  onChange={(e) => setCurrency2(e.target.value)}
                  style={{
                    width: '35%',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    padding: '0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <button type="button" className="btn-primary" onClick={handleAdd}>
              Execute: a.add(b)
            </button>
            <button type="button" className="control-pill" onClick={handleFloatingPointComparison}>
              Test 0.1 + 0.2 Precision Drift
            </button>
          </div>

          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              background: '#070b12',
              border: `1px solid ${hasError ? 'var(--rose)' : 'var(--border)'}`,
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: hasError ? 'var(--rose)' : 'var(--text)',
              lineHeight: 1.5,
            }}
          >
            {resultLog}
          </div>
        </div>

        {/* Primitive Obsession vs Strongly Typed Value Objects */}
        <div className="glass-panel">
          <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Primitive Obsession vs Domain Type Safety
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 'var(--text-xs)' }}>
            <div style={{ background: 'rgba(251, 113, 133, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--rose)' }}>
              <div style={{ color: 'var(--rose)', fontWeight: 700 }}>❌ Primitive Obsession (Dangerous):</div>
              <div style={{ fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                transferFunds(String fromId, String toId, double amount, String currency)
              </div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-2xs)', marginTop: '0.25rem' }}>
                Vulnerable to parameter transposition (accidentally swapping fromId/toId) and negative amounts.
              </div>
            </div>

            <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--cyan)' }}>
              <div style={{ color: 'var(--cyan)', fontWeight: 700 }}>✅ Strongly Typed Value Objects (Robust):</div>
              <div style={{ fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                transferFunds(AccountId from, AccountId to, Money amount)
              </div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-2xs)', marginTop: '0.25rem' }}>
                Compiler forbids parameter swapping. Money self-guarantees positive amounts and structural immutability.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Polyglot Code Implementation */}
      <div className="code-container">
        <div className="code-header">
          <div className="code-lang-tag">
            {language === 'java' ? '☕ JAVA 26+ RECORD VALUE OBJECT' : '🐹 GO 1.24 IMMUTABLE VALUE STRUCT'}
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-secondary)' }}>
            Compact Constructors & Currency Safety
          </span>
        </div>
        <pre className="code-pre">
          {language === 'java' ? (
`// Java 26: Money Value Object implemented as a Record
package com.apex.ddd.shared.domain;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Currency;
import java.util.Objects;

public record Money(BigDecimal amount, Currency currency) {
    // Compact constructor enforces invariants at the moment of creation
    public Money {
        Objects.requireNonNull(amount, "Amount cannot be null");
        Objects.requireNonNull(currency, "Currency cannot be null");
        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Money amount cannot be negative");
        }
        // Normalize scale to 2 decimal places to prevent rounding drift
        amount = amount.setScale(2, RoundingMode.HALF_EVEN);
    }

    public static Money of(double value, String currencyCode) {
        return new Money(BigDecimal.valueOf(value), Currency.getInstance(currencyCode));
    }

    // Side-Effect-Free Function: Returns a brand new Money instance
    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new CurrencyMismatchException(
                "Cannot add " + other.currency + " to " + this.currency
            );
        }
        return new Money(this.amount.add(other.amount), this.currency);
    }
}`
          ) : (
`// Go 1.24: Immutable Money Value Object using integer cents
package domain

import (
	"errors"
	"fmt"
)

var ErrCurrencyMismatch = errors.New("cannot perform arithmetic across different currencies")

// Money is an immutable Value Object. Amount is in cents (e.g. $10.50 -> 1050).
type Money struct {
	cents    int64
	currency string
}

// NewMoney guarantees self-validation and non-negative amounts
func NewMoney(cents int64, currency string) (Money, error) {
	if cents < 0 {
		return Money{}, errors.New("money cannot be negative")
	}
	if len(currency) != 3 {
		return Money{}, errors.New("currency must be a 3-letter ISO code")
	}
	return Money{cents: cents, currency: currency}, nil
}

// Add returns a brand-new Money instance with value semantics (no pointer mutation)
func (m Money) Add(other Money) (Money, error) {
	if m.currency != other.currency {
		return Money{}, fmt.Errorf("%w: %s vs %s", ErrCurrencyMismatch, m.currency, other.currency)
	}
	return Money{
		cents:    m.cents + other.cents,
		currency: m.currency,
	}, nil
}`
          )}
        </pre>
      </div>
    </div>
  )
}
