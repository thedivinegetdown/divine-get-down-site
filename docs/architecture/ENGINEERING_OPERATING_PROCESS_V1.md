# The Divine Get Down Engineering Operating Process v1.0

**Status:** Permanent engineering workflow

This process applies to architecture, product, frontend, backend, content, media, payments, membership, community, infrastructure, and operations.

## 1. Permanent Workflow

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

## 2. Governing Artifacts

Every implementation activity must reference:

1. `ENTERPRISE_ARCHITECTURE_V1.md`
2. `IMPLEMENTATION_ROADMAP_V1.md`
3. Applicable ADRs in `ADR_INDEX_V1.md`
4. The active Execution Order

Execution Orders reference these documents rather than repeating or redesigning their architecture.

## 3. Architecture Phase

Permitted:

- repository assessment
- architecture specifications
- roadmaps
- ADRs
- engineering-process updates
- risk registers
- system diagrams
- decision proposals

Not permitted:

- new functionality
- opportunistic refactoring
- dependency upgrades
- visual redesign
- infrastructure migration
- schema changes
- production configuration changes

Architecture work ends only when current state, target state, risks, assumptions, roadmap placement, and required ADRs are documented.

## 4. Roadmap Phase Requirements

Every roadmap phase defines:

- objective
- dependencies
- implementation scope
- acceptance criteria
- validation requirements
- definition of done

A roadmap phase establishes sequence and completion standards. It is not an implementation prompt.

## 5. Compact Three-Phase Execution Order

### Phase A: Prepare

Every Execution Order includes:

- Execution Order ID
- roadmap program and phase
- architecture sections referenced
- ADRs referenced
- objective
- in-scope files or subsystems
- out-of-scope work
- known risks
- rollback approach

### Phase B: Execute

Includes:

- ordered implementation steps
- required constraints
- migration or compatibility requirements
- documentation changes

### Phase C: Validate and Release

Includes:

- one defined validation cycle
- exact commands and manual checks
- acceptance criteria
- one commit message
- one push target
- architecture-review questions

## 6. Scope Rules

An Execution Order must be small enough to understand before implementation, complete coherently, validate once, commit once, push once, and review architecturally.

Prohibited:

- giant prompts spanning multiple roadmap phases
- hidden architecture changes
- unrelated cleanup
- “while we are here” changes
- unauthorized dependencies
- infrastructure replacement during feature work
- multiple commits for one Execution Order
- repeated push cycles caused by skipped validation

When scope expands, stop and create a new Execution Order.

## 7. Implementation Rules

1. Read governing artifacts before changing code.
2. Confirm the repository is synchronized.
3. Work only within defined scope.
4. Preserve compatibility unless removal is explicitly authorized.
5. Do not redesign architecture during implementation.
6. Record newly discovered architecture issues without fixing them outside scope.
7. Update tests and required documentation in the same change.
8. Never commit secrets, private credentials, or sensitive production data.

## 8. One Validation Cycle

Validation occurs after implementation is complete.

It may include:

- install integrity
- formatting
- lint
- type checking
- unit tests
- integration tests
- accessibility checks
- production build
- targeted manual journey checks
- mobile validation
- security checks

When validation fails:

1. classify the failure
2. correct only work within the Execution Order
3. rerun the full defined validation cycle
4. do not push until it passes

“One validation cycle” means one defined release gate applied to the completed change. Reruns are allowed only to correct failures before release.

## 9. One Commit

One Execution Order produces one coherent commit containing implementation, tests, documentation, and migrations when applicable.

Commit format:

```text
<type>(<scope>): <outcome>
```

Examples:

```text
fix(mobile): stabilize homepage navigation on Safari
feat(content): add structured reflection schema
docs(architecture): establish TDG architecture baseline
```

The commit must not contain unrelated changes.

## 10. One Push

After validation passes:

1. confirm branch and working-tree status
2. create the single commit
3. push once
4. observe CI and deployment
5. do not patch production directly

A failed CI gate does not authorize ad hoc changes. Diagnose it and correct it within the same Execution Order only when the correction remains in scope.

## 11. Architecture Review

After release, answer:

- Did implementation conform to the referenced architecture?
- Were ADRs followed?
- Did an assumption prove false?
- Did a new architectural decision emerge?
- Did subsystem boundaries remain intact?
- Were security, accessibility, privacy, performance, and observability preserved?
- Did technical debt increase?
- Should the roadmap or an ADR be updated?
- Is rollback still viable?

The outcome is one of:

- Accepted
- Accepted with recorded follow-up
- Rework required
- ADR required before further work

## 12. Next Sprint Selection

The next sprint is selected based on dependencies, current risk, user value, production incidents, operational readiness, and architecture sequence.

Work is not selected only because it is easy or visually attractive.

## 13. Defect Handling

### Critical Production Defect

A tightly scoped emergency Execution Order may be issued immediately. Architecture is not redesigned. Targeted validation is mandatory. A post-incident architecture review follows.

### Noncritical Defect

Place it in the appropriate roadmap phase or backlog and schedule a normal Execution Order.

### Architecture Defect

Stop implementation. Create or revise an ADR and roadmap item first.

## 14. Dependency Policy

A new dependency requires:

- documented purpose
- maintenance assessment
- license review
- security review
- bundle or runtime impact
- alternatives considered
- removal strategy when relevant

Major framework, database, identity, payment, analytics, search, media, and hosting changes require an ADR.

## 15. Definition of Ready

Work is ready for an Execution Order when:

- architecture reference exists
- roadmap phase exists
- relevant ADRs are accepted or explicitly proposed
- scope is bounded
- acceptance criteria are testable
- dependencies are complete
- rollback is understood
- required access and environments are available

## 16. Definition of Done

An Execution Order is done when:

- implementation matches scope
- acceptance criteria pass
- validation passes
- documentation is updated
- one coherent commit is created
- one push is completed
- CI and deployment status are reviewed
- architecture review is recorded
- follow-up work is added to the roadmap rather than silently included

## 17. Architecture Change Control

When an architectural conflict appears during implementation:

1. document the conflict
2. do not improvise a redesign
3. create a proposed ADR
4. evaluate roadmap impact
5. approve or reject the decision
6. issue a new or amended Execution Order

## 18. Initial Execution Recommendation

The first product implementation Execution Order should address:

**Roadmap Phase 1.1: Mobile Crash Root-Cause Investigation**

It must not add new product functionality. It should establish reproducibility, telemetry, diagnosis, and the smallest verified stability correction.
