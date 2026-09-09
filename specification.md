# Apex Domain-Driven Design Lab — Master Technical Specification

> **Version**: 2027.1.0  
> **Status**: Living Architectural Specification  
> **Target Runtimes**: Next.js 16 (React 19), Polyglot Java 26+ (Virtual Threads / Records) & Go 1.24+ (Structs / Goroutines)  
> **Portfolio Reference**: Strategic & Tactical Architecture Foundation for Enterprise Microservices

---

## 1. Executive Summary & Mission

`apex-domaindrivendesign-lab` is the comprehensive Domain-Driven Design (DDD) curriculum and interactive execution laboratory within the 2027 portfolio workspace. It bridges the gap between high-level enterprise business architecture and low-level code implementation, taking engineers from foundational linguistic principles to mission-critical distributed consensus.

Key capabilities include:
1. **Strategic Domain Modeling**: Distilling Core, Supporting, and Generic subdomains, establishing context boundaries, and modeling the 7 canonical Context Mapping patterns (Shared Kernel, Customer/Supplier, Conformist, Anti-Corruption Layer, Open Host Service, Published Language, Separate Ways).
2. **Tactical Building Blocks**: Enforcing immutable Value Objects, Aggregate consistency boundaries (the Rule of One Transaction per Aggregate), append-only Domain Event streams, Event Sourcing time-travel reconstitution, and stateless Domain Services.
3. **Enterprise Integration & Architecture**: Structuring zero-dependency domain cores via Hexagonal Architecture (Ports & Adapters) and coordinating long-running business transactions via Distributed Compensating Sagas.
4. **Synchronized Polyglot Code Engine**: Instant side-by-side code inspection switchable between **Java 26+** (Records, Sealed Interfaces, Pattern Matching, Virtual Threads) and **Go 1.24+** (Unexported Struct Fields, Value Receivers, Type Switches, Goroutines/Channels).
5. **Modern Web & CSS Baseline 2026**: High-tech UI featuring OKLCH color palettes, View Transitions Level 2, continuous superellipse curves (`corner-shape: squircle`), and multi-tab state synchronization (`BroadcastChannel`).

---

## 2. Ports & Network Topography

All network bindings are managed via a **Single Point of Truth (`.env`)**:

| Service Component | Technology Stack | Internal Port | Default Host Port | Environment Variable | Protocol / Transport |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Frontend Studio** | Next.js 16 App Router, React 19, Vanilla CSS | `3017` | `3017` | `PORT` | HTTP/2, HTTPS, WebSocket |

---

## 3. Interactive Studios & Curriculum Architecture

### 3.1 Studio 1: Ubiquitous Language & Linguistic Disambiguation (Level 1)
* **Problem**: In anemic, ambiguous domain models, the same noun (e.g. "Policy", "User", "Order") means conflicting things to different departments, causing semantic corruption in code.
* **DDD Solution**: Ubiquitous Language bounds terms strictly within specific business contexts. In Underwriting, "Policy" is a set of actuarial risk equations; in Claims, "Policy" is a coverage ledger.
* **Interactive Sandbox**: Interactive term disambiguation and rich entity mutation engine demonstrating how Rich Models reject invalid business transitions that Anemic models permit.

### 3.2 Studio 2: Strategic Subdomains & Core Distillation (Level 2)
* **Problem**: Engineering teams over-engineer generic boilerplate (e.g. building a custom authentication engine) while starving their core competitive differentiator of resources.
* **DDD Solution**: Categorize systems into **Core Domain** (competitive edge, in-house custom build), **Supporting Subdomain** (custom-built but not a market differentiator), and **Generic Subdomain** (SaaS / COTS integration).
* **Interactive Sandbox**: Subdomain classification matrix with live ROI and technical debt calculators.

### 3.3 Studio 3: Bounded Contexts & Context Mapping (Level 2)
* **Problem**: Monolithic databases with direct foreign keys across disparate departments create tight coupling and cascading release failures.
* **DDD Solution**: Formal Context Mapping defining explicit organizational relationships: **Shared Kernel**, **Customer/Supplier**, **Conformist**, **Anti-Corruption Layer (ACL)**, **Open Host Service (OHS)**, and **Published Language (PL)**.
* **Interactive Sandbox**: Visual context topology graph with live ERP translation sandbox demonstrating bidirectional DTO conversion through an ACL.

### 3.4 Studio 4: Value Objects & Primitive Obsession (Level 3)
* **Problem**: Representing complex business concepts as primitive types (`double price`, `String email`) causes validation logic to duplicate across thousands of classes, introducing floating-point currency rounding bugs.
* **DDD Solution**: Value Objects defined by their attributes rather than identity. Immutable, self-validating, structurally equal, and rich with domain methods.
* **Interactive Sandbox**: Multi-currency arithmetic engine with automatic currency conversion and rounding protection.

### 3.5 Studio 5: Entities, Invariants & Aggregate Roots (Level 3)
* **Problem**: Direct outside modification of internal collections (e.g. `order.getItems().clear()`) causes invariant corruption where order totals, taxes, and discounts desynchronize.
* **DDD Solution**: Entities have persistent identity. Aggregates define consistency boundaries guarded strictly by the Aggregate Root. Outside callers cannot directly mutate child entities.
* **Interactive Sandbox**: Order state machine simulating line item additions, discount applications, and invariant enforcement.

### 3.6 Studio 6: Domain Events & Event Sourcing (Level 3)
* **Problem**: Destructive relational updates (`UPDATE accounts SET balance = ...`) destroy the audit trail, hiding who changed what, when, and why.
* **DDD Solution**: Express state transitions as immutable past-tense Domain Events (`MoneyTransferred`, `OrderSubmitted`). In Event Sourcing, the event log is the authoritative source of truth.
* **Interactive Sandbox**: Append-only event store with a interactive time-travel timeline slider reconstituting aggregate state at any past point in history.

### 3.7 Studio 7: Domain Services vs Application Services (Level 3)
* **Problem**: Forcing multi-aggregate domain logic (e.g. cross-account funds transfers or currency nexus calculations) into an individual entity leads to bloated models or leaked business logic in UI controllers.
* **DDD Solution**: Stateless **Domain Services** handle pure business rules spanning multiple aggregates. **Application Services** handle technical orchestration (transactions, security, event publishing, repository loading).
* **Interactive Sandbox**: Cross-border funds settlement and multi-jurisdiction tax nexus engine.

### 3.8 Studio 8: Hexagonal Architecture / Ports & Adapters (Level 4)
* **Problem**: Business logic coupled directly to Spring annotations, JPA `@Entity` classes, or SQL queries cannot be tested without heavy mock frameworks or running databases.
* **DDD Solution**: The Domain Core has zero external dependencies. It declares inbound and outbound interfaces (**Ports**). Frameworks, databases, message brokers, and UIs connect via pluggable **Adapters**.
* **Interactive Sandbox**: Concentric 3-ring architecture inspector toggling primary (driving) and secondary (driven) adapters.

### 3.9 Studio 9: Distributed Sagas & Process Managers (Level 5)
* **Problem**: Distributed Two-Phase Commit (2PC) creates single points of failure, network latency locks, and distributed deadlocks across microservices.
* **DDD Solution**: Orchestrated or Choreographed Sagas executing a sequence of local transactions. If any step fails, backward **Compensating Actions** run in reverse order to restore eventual consistency.
* **Interactive Sandbox**: E-Commerce checkout saga simulator with injected chaos failures (payment decline, inventory stockout) demonstrating automated compensating rollbacks.

### 3.10 Studio 10: Master DDD Blueprint & Decision Wizard (Level 5)
* **Problem**: Teams apply DDD tactical patterns blindly to simple CRUD applications, introducing needless complexity and development friction.
* **DDD Solution**: 5-Level Mastery Roadmap and automated Decision Tree guiding architects to select the exact level of DDD complexity justified by their domain.
* **Interactive Sandbox**: Interactive architecture wizard evaluating team size, domain complexity, and regulatory compliance to generate tailored architectural recommendations.

---

## 4. Polyglot Code Engine

Every studio includes an instant, synchronized code view switchable via the header control:
- **Java 26+**:
  - Java Records with compact constructors for immutable Value Objects.
  - Sealed interfaces and exhaustive pattern matching (`switch (event)`).
  - Defensive copying and unmodifiable collections (`List.copyOf()`) for Aggregate Roots.
  - Virtual Threads (`Thread.startVirtualThread`) and Structured Concurrency for distributed Sagas.
- **Go 1.24+**:
  - Unexported struct fields with explicit factory constructors (`NewMoney(...)`) to protect invariants.
  - Value receivers for immutable Value Object semantics.
  - Type-switch event dispatch loops.
  - Hexagonal ports declared in domain packages, implemented by infrastructure packages.
  - Goroutines, channels, and context cancellation for compensating Saga workflows.

---

## 5. Deployment & Operational Standards

- **Single Point of Truth (`.env`):** Defines `PORT=3017` with fallback defaults.
- **Docker Compose:** Parameterized port binding `${PORT:-3017}:${PORT:-3017}`, standalone Next.js server, `env_file: [ .env ]`.
- **Start Script:** `./start.sh` supports background execution, attached streaming (`-f`), and native host development (`--local`).
- **Static Export:** `next.config.ts` configured with `output: 'export'` for `build:pages` deploying directly to GitHub / GitLab Pages.

---

## 6. Automated Testing & Verification Architecture

- **Domain Model Unit Test Suite (`tests/domain.test.mjs`)**:
  - Executes directly via Node 22 native test runner (`node --test`) without external testing dependencies.
  - Tests Value Object immutability: Verifies `Object.isFrozen` structural invariants and monetary precision rounding.
  - Tests Currency Boundary Guards: Guarantees that arithmetic across disparate currency codes throws domain invariant violation exceptions.
  - Tests Aggregate Root Invariant Boundaries: Verifies state transition consistency and event generation rules for Orders.
  - Tests Anti-Corruption Layer (ACL): Asserts safe boundary mapping between legacy schemas and domain entities.
- **Static Code Hygiene Scanner (`scripts/lint.mjs`)**:
  - Inspects TypeScript and React domain studio code for debugging statements (`debugger`, `alert()`), deprecated primer phrasing, and unhandled exceptions.
- **Continuous Integration**:
  - Enforced via GitHub Actions (`ci.yml`) and GitLab CI (`.gitlab-ci.yml`) ensuring unit tests, linting, and Next.js static export execute with zero warnings.

