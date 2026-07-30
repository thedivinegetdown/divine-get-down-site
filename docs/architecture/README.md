# The Divine Get Down Architecture Package v1.0

This directory contains the permanent governing architecture documents for The Divine Get Down.

## Governing Documents

1. [`ENTERPRISE_ARCHITECTURE_V1.md`](./ENTERPRISE_ARCHITECTURE_V1.md)  
   Defines the product vision, architectural principles, target application architecture, content platform, Creator Studio, media, checkout, membership, search, analytics, SEO, security, accessibility, observability, deployment, and release strategy.

2. [`IMPLEMENTATION_ROADMAP_V1.md`](./IMPLEMENTATION_ROADMAP_V1.md)  
   Converts remaining work into ordered Programs and Phases. Every phase defines its objective, dependencies, scope, acceptance criteria, validation requirements, and definition of done.

3. [`ADR_INDEX_V1.md`](./ADR_INDEX_V1.md)  
   Records durable architectural decisions for content, routing, media, Creator Studio, checkout, branding, analytics, SEO, accessibility, deployment, scalability, domains, search, and community safety.

4. [`ENGINEERING_OPERATING_PROCESS_V1.md`](./ENGINEERING_OPERATING_PROCESS_V1.md)  
   Defines the permanent architecture-first engineering process used for all future work.

## Authority

These documents govern future product and engineering work for The Divine Get Down.

All implementation must use a compact three-phase Execution Order that references:

- the Enterprise Architecture
- the applicable Roadmap Program and Phase
- the applicable ADRs
- the Engineering Operating Process

Execution Orders must not repeat or redesign architecture.

## Architecture Changes

A material change to framework, backend, database, identity, payments, media delivery, analytics, search, hosting, canonical domain, content lifecycle, or other durable architecture requires an ADR before implementation.

Accepted ADRs are not silently rewritten. A replacement decision must explicitly supersede the prior ADR.

## Permanent Workflow

Architecture

↓

Roadmap

↓

Execution Order

↓

Implementation

↓

One Validation Cycle

↓

One Commit

↓

One Push

↓

Architecture Review

↓

Next Sprint

## First Recommended Implementation Phase

The recommended first product implementation phase is:

**Roadmap Phase 1.1: Mobile Crash Root-Cause Investigation**

That phase must diagnose and stabilize the existing mobile experience before new product functionality is introduced.

## Repository Assessment Notes

The architecture assessment identified the following current-state items for later authorized work:

- The application currently uses React 18 and Create React App.
- Public navigation mixes React routes with homepage hash-based tabs.
- Content remains primarily embedded in React components.
- There is no first-party backend or database.
- Stripe Payment Links are client-configured.
- The paid access page and paid companion PDF are not protected by verified entitlements.
- Authentication, membership, Creator Studio, and community moderation systems do not yet exist.
- Analytics are optional and do not yet provide complete production observability.
- Mobile Safari instability requires a formal diagnostic Execution Order.
- Repository package metadata contains older repository references that should be corrected in Roadmap Phase 0.2.

## Architecture-Phase Change Statement

This architecture baseline adds documentation only.

No application functionality, route behavior, dependency, payment configuration, public asset, Netlify configuration, or production code was changed as part of this architecture package.
