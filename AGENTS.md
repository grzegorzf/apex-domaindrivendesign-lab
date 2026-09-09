# Apex Domain-Driven Design Lab — Workspace Guidelines

This project is the Domain-Driven Design curriculum and interactive architecture laboratory of the 2027 portfolio suite, demonstrating strategic domain distillation, tactical building blocks (Value Objects, Entities, Aggregate Roots, Domain Events, Event Sourcing, Domain Services), Hexagonal Architecture (Ports & Adapters), and Distributed Compensating Sagas, unified with a real-time polyglot Java 26+ and Go 1.24 code engine.

---

## 1. Pre-Task Checklist

- [ ] **Check Environment**: Sourced from root or local `.env`. Never hardcode API keys or secrets.
- [ ] **Ports & Environment**: Ports are environment-provisioned (`PORT` in `.env`) with deterministic fallbacks.

---

## 2. Environment-Provisioned Ports & Network Summary

All network bindings are dynamically provisioned via environment variables with fixed default fallbacks:

| Service | Stack | Environment Variable | Default Fallback Port |
| :--- | :--- | :--- | :--- |
| **frontend** | Next.js 16 App Router, React 19, TypeScript 6 | `PORT` | `3017` |

---

## 3. Post-Task Verification Gate

Before declaring complete:
- [ ] **Build Frontend**: `pnpm build` in `frontend/` (zero errors).
- [ ] **Build Static Pages**: `pnpm run build:pages` in `frontend/` (zero errors).
- [ ] **Docker Compose Validation**: `docker compose config` passes with zero schema or volume warnings.
