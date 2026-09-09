import test from 'node:test';
import assert from 'node:assert/strict';

// --- Domain Model Implementations & Tests ---

// 1. Value Object: Money
class Money {
  constructor(amount, currency) {
    if (typeof amount !== 'number' || isNaN(amount)) throw new Error('Invalid amount');
    if (!currency || typeof currency !== 'string' || currency.length !== 3) throw new Error('Invalid ISO currency');
    this._amount = Math.round(amount * 100) / 100;
    this._currency = currency.toUpperCase();
    Object.freeze(this);
  }
  get amount() { return this._amount; }
  get currency() { return this._currency; }
  equals(other) {
    if (!(other instanceof Money)) return false;
    return this._amount === other.amount && this._currency === other.currency;
  }
  add(other) {
    if (this._currency !== other.currency) {
      throw new Error(`Currency mismatch: Cannot add ${other.currency} to ${this._currency}`);
    }
    return new Money(this._amount + other.amount, this._currency);
  }
}

// 2. Aggregate Root: Order
class Order {
  constructor(orderId) {
    this.id = orderId;
    this.status = 'PENDING';
    this.items = [];
    this.domainEvents = [];
  }
  addItem(sku, price, quantity) {
    if (this.status === 'CANCELLED') throw new Error('Cannot modify cancelled order');
    if (quantity <= 0) throw new Error('Quantity must be strictly positive');
    this.items.push({ sku, price, quantity });
    this.domainEvents.push({ type: 'LineItemAdded', sku, quantity });
  }
  cancel(reason) {
    if (this.status === 'COMPLETED') throw new Error('Cannot cancel completed order');
    this.status = 'CANCELLED';
    this.domainEvents.push({ type: 'OrderCancelled', reason });
  }
}

// 3. Anti-Corruption Layer (ACL)
class LegacyErpAdapter {
  static translateToDomainOrder(rawErpPayload) {
    if (!rawErpPayload.HDR_ID) throw new Error('Missing legacy header ID');
    const order = new Order(rawErpPayload.HDR_ID);
    if (rawErpPayload.LINES && Array.isArray(rawErpPayload.LINES)) {
      for (const line of rawErpPayload.LINES) {
        order.addItem(line.PROD_CD, new Money(line.UNIT_PRC, line.CURR_CD || 'USD'), line.QTY);
      }
    }
    return order;
  }
}

test('DDD Value Object: Money guarantees structural immutability and precision', () => {
  const m1 = new Money(100.50, 'USD');
  const m2 = new Money(100.50, 'USD');
  const m3 = new Money(50.25, 'USD');
  assert.equal(m1.equals(m2), true, 'Identical money instances must have structural equality');
  assert.equal(m1.equals(m3), false, 'Different amounts must not be equal');
  
  const sum = m1.add(m3);
  assert.equal(sum.amount, 150.75);
  assert.equal(sum.currency, 'USD');
  
  // Immutability check
  assert.throws(() => { m1._amount = 999; }, TypeError);
});

test('DDD Value Object: Rejects currency mismatch in arithmetic', () => {
  const usd = new Money(100, 'USD');
  const eur = new Money(100, 'EUR');
  assert.throws(() => usd.add(eur), /Currency mismatch/);
});

test('DDD Aggregate Root: Enforces invariant consistency boundaries', () => {
  const order = new Order('ord-101');
  order.addItem('SKU-A', new Money(29.99, 'USD'), 2);
  assert.equal(order.items.length, 1);
  assert.equal(order.domainEvents.length, 1);
  assert.equal(order.domainEvents[0].type, 'LineItemAdded');

  // Negative quantity invariant
  assert.throws(() => order.addItem('SKU-B', new Money(10, 'USD'), -1), /strictly positive/);

  // Cancellation lock
  order.cancel('Customer requested');
  assert.equal(order.status, 'CANCELLED');
  assert.throws(() => order.addItem('SKU-C', new Money(15, 'USD'), 1), /cancelled/);
});

test('DDD Strategic Design: Anti-Corruption Layer (ACL) safely isolates domain from legacy schemas', () => {
  const legacyErpData = {
    HDR_ID: 'ERP-9942',
    LINES: [
      { PROD_CD: 'PART-01', UNIT_PRC: 45.00, CURR_CD: 'USD', QTY: 3 }
    ]
  };
  const domainOrder = LegacyErpAdapter.translateToDomainOrder(legacyErpData);
  assert.equal(domainOrder.id, 'ERP-9942');
  assert.equal(domainOrder.items[0].sku, 'PART-01');
  assert.equal(domainOrder.items[0].price.amount, 45.00);
});
