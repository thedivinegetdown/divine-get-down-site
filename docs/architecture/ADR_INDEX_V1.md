# The Divine Get Down Architectural Decision Record Index v1.0

**Status:** Initial ADR register

Accepted ADRs are not silently rewritten. Material changes require a new ADR that supersedes the prior decision.

## ADR Template

Each ADR includes:

- ID and title
- Status: Proposed, Accepted, Superseded, or Rejected
- Date
- Context
- Decision
- Alternatives considered
- Consequences
- Security, accessibility, privacy, and operational impact
- Related roadmap phases
- Supersedes or superseded by

## ADR-001: Structured Content as the Canonical Source

**Status:** Accepted  
**Decision:** Ministry content will be represented through structured content types and revisions. JSX is a presentation layer, not the long-term source of truth.  
**Rationale:** Creator Studio, search, scheduling, revisions, SEO, and multi-channel publishing require structured data.  
**Consequences:** A content schema and migration are required. Hardcoded content remains temporarily supported but should not expand without justification.  
**Related roadmap:** 2.1, 2.2, 2.3.

## ADR-002: Canonical Route-Based Public Navigation

**Status:** Accepted  
**Decision:** Primary public destinations and indexable content use stable routes. Hash state may support local anchors but is not the canonical identity of major content.  
**Rationale:** Improves navigation history, accessibility, analytics, deep linking, and SEO.  
**Consequences:** Existing hash links require compatibility or redirects.  
**Related roadmap:** 1.2, 6.2.

## ADR-003: Tiered Media Strategy

**Status:** Accepted  
**Decision:** YouTube remains the public discovery platform. Premium media and paid downloads require entitlement-aware delivery. Source assets and optimized renditions are managed separately.  
**Rationale:** Public reach and protected fulfillment have different requirements.  
**Consequences:** Public and premium assets cannot share one unrestricted delivery policy.  
**Related roadmap:** 5.1, 5.2, 5.3.

## ADR-004: Integrated Creator Studio with Server-Enforced Roles

**Status:** Accepted  
**Decision:** Creator Studio is an authenticated module within the product architecture, backed by server-enforced authorization and audit logs.  
**Rationale:** A separate early microservice or product would add unnecessary operational complexity.  
**Consequences:** Strong public and administrative boundaries and role tests are mandatory.  
**Related roadmap:** 3.1, 3.2, 3.3.

## ADR-005: Stripe with Server-Verified Checkout and Entitlements

**Status:** Accepted  
**Decision:** Stripe remains the payment processor. Checkout sessions, webhook verification, order records, and entitlements are server-managed. Redirect URLs are not proof of payment.  
**Rationale:** The current public access route is insufficient for protected paid products.  
**Consequences:** A backend, verified webhook endpoint, idempotency, and entitlement model are required.  
**Related roadmap:** 4.1, 4.2, 4.3.

## ADR-006: Christ-Centered Brand System as a Product Constraint

**Status:** Accepted  
**Decision:** Brand direction is encoded in design tokens, content guidelines, interaction patterns, and review checklists. The platform remains peaceful, Scripture-rooted, reverent, modern, and free from manipulative engagement design.  
**Rationale:** Brand defines product behavior and trust, not only appearance.  
**Consequences:** Growth experiments require brand review. Dark patterns are prohibited.  
**Related roadmap:** 1.3, 3.3.

## ADR-007: Privacy-First Analytics

**Status:** Accepted  
**Decision:** Analytics use a documented minimal event taxonomy and avoid sensitive spiritual profiling. A privacy-respecting public analytics provider is preferred. Operational product and payment events may be stored first-party where needed.  
**Rationale:** Measurement must preserve ministry trust.  
**Consequences:** Every event requires purpose, owner, schema, lawful basis or consent where applicable, and retention.  
**Related roadmap:** 6.1, 6.3.

## ADR-008: Server-Rendered SEO for Indexable Content

**Status:** Proposed  
**Decision:** The future public content platform will use server rendering or static generation for indexable content and metadata.  
**Rationale:** Client-only metadata and hash tabs are weaker foundations for reliable discovery at scale.  
**Alternatives:** Remain entirely with Create React App, prerender selected routes, or migrate through a dedicated framework phase.  
**Consequences:** Any framework migration requires its own Execution Order and cannot be mixed with feature work.  
**Related roadmap:** 1.2, 6.2.

## ADR-009: WCAG 2.2 AA and Mobile Performance as Release Gates

**Status:** Accepted  
**Decision:** Accessibility and mobile performance are release criteria. Reduced motion, keyboard operation, captions and transcripts, contrast, focus, Core Web Vitals, and mobile memory stability are validated.  
**Rationale:** The ministry must be usable across abilities, devices, and connection quality.  
**Consequences:** CI gates and manual validation are required. Some visual effects may be reduced.  
**Related roadmap:** 1.1, 7.1, 7.2, 7.3.

## ADR-010: GitHub-to-Netlify with Preview, Staging, and Production Controls

**Status:** Accepted for the current phase  
**Decision:** GitHub remains source control and Netlify remains the deployment platform while requirements are met. Pull-request previews, protected main, validation gates, environment separation, and rollback are added.  
**Rationale:** Existing operational familiarity reduces migration risk.  
**Consequences:** Hosting is reviewed when backend, edge, compliance, or scale requirements exceed platform capability.  
**Related roadmap:** 9.1.

## ADR-011: Modular Monolith Before Microservices

**Status:** Accepted  
**Decision:** The backend begins as a modular monolith with explicit domain boundaries. Microservices require measured scaling or organizational justification.  
**Rationale:** Current product and team scale do not justify distributed-system complexity.  
**Consequences:** Modules must avoid circular dependencies and expose explicit interfaces.  
**Related roadmap:** 2.2, 4.1, 8.2, 9.2.

## ADR-012: Managed PostgreSQL as the System of Record

**Status:** Proposed  
**Decision:** Use managed PostgreSQL for identity references, content, catalog, orders, entitlements, community, analytics references, and audit records.  
**Rationale:** The domain is relational and requires transactions, constraints, and data portability.  
**Alternatives:** Document database, headless CMS only, or multiple specialized stores.  
**Consequences:** Migrations, backups, row-level security, and indexing become operational responsibilities.  
**Related roadmap:** 2.2, 3.1, 4.1, 8.2.

## ADR-013: Canonical Domain and Redirect Policy

**Status:** Accepted  
**Decision:** `thedivinegetdown.com` is canonical. `thedivinegetdown.net` and other owned brand domains permanently redirect to it.  
**Rationale:** Protects the brand while avoiding duplicate content and operational fragmentation.  
**Consequences:** TLS and redirect monitoring cover secondary domains.  
**Related roadmap:** 6.2, 9.1.

## ADR-014: Search Begins in PostgreSQL

**Status:** Proposed  
**Decision:** Initial search uses PostgreSQL full-text search and structured filters. A dedicated search service is introduced only after measured relevance, latency, or scale limitations.  
**Rationale:** Reduces early complexity and keeps search close to canonical data.  
**Consequences:** Ranking, indexing, and Scripture-reference normalization must be explicitly designed.  
**Related roadmap:** 2.3 and future search work.

## ADR-015: Community Safety Before Community Scale

**Status:** Accepted  
**Decision:** Community capabilities cannot launch until conduct, moderation, privacy, age, reporting, escalation, and operator ownership are approved.  
**Rationale:** Faith-based community spaces may involve vulnerable disclosures and require responsible safeguards.  
**Consequences:** Moderation capacity constrains growth and may delay launch.  
**Related roadmap:** 8.1, 8.2, 8.3.

## ADR Status Summary

| ADR | Decision | Status |
|---|---|---|
| 001 | Structured content | Accepted |
| 002 | Route-based navigation | Accepted |
| 003 | Tiered media | Accepted |
| 004 | Integrated Creator Studio | Accepted |
| 005 | Server-verified checkout | Accepted |
| 006 | Brand as product constraint | Accepted |
| 007 | Privacy-first analytics | Accepted |
| 008 | Server-rendered SEO | Proposed |
| 009 | Accessibility and performance gates | Accepted |
| 010 | GitHub and Netlify deployment | Accepted |
| 011 | Modular monolith | Accepted |
| 012 | Managed PostgreSQL | Proposed |
| 013 | Canonical domain | Accepted |
| 014 | PostgreSQL search first | Proposed |
| 015 | Community safety first | Accepted |
