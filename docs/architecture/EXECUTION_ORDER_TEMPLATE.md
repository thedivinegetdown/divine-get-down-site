# Compact Three-Phase Execution Order Template

## Execution Order

**ID:** EO-YYYY-NNN  
**Roadmap reference:** Program X, Phase X.Y  
**Enterprise Architecture references:** Sections ...  
**ADR references:** ADR-...  
**Status:** Proposed

## Phase A: Prepare

### Objective

State the single intended outcome.

### In Scope

- bounded subsystem, files, or journey

### Out of Scope

- unrelated features
- architecture redesign
- opportunistic cleanup

### Dependencies

- completed roadmap phases
- required environments or access

### Risks

- known implementation and release risks

### Rollback

Describe how the change will be reversed safely.

## Phase B: Execute

1. Ordered implementation step
2. Ordered implementation step
3. Required test and documentation update

### Constraints

- follow referenced architecture and ADRs
- do not add unauthorized dependencies
- preserve compatibility unless explicitly removed
- stop when architecture conflict is discovered

## Phase C: Validate and Release

### One Validation Cycle

```text
List exact automated commands and manual checks.
```

### Acceptance Criteria

- measurable outcome
- measurable outcome

### Commit

```text
<type>(<scope>): <outcome>
```

### Push Target

```text
origin <branch>
```

### Architecture Review

- Did implementation conform to the referenced architecture?
- Were all applicable ADRs followed?
- Did a new decision or assumption emerge?
- Were accessibility, security, privacy, performance, and observability preserved?
- Is follow-up work recorded rather than silently included?
