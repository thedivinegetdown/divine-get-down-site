# Execution Order EO-2026-001: CI Validation Gates

**Roadmap reference:** Program 9, Phase 9.1
**Enterprise Architecture references:** Sections 24-26
**ADR references:** ADR-010
**Status:** Implemented; pending pull-request and branch-protection review

## Phase A: Prepare

### Objective

Add a repeatable GitHub pull-request validation gate for the repository's
established lint, test, build, and responsive browser checks.

### In Scope

- GitHub Actions validation for pull requests and pushes to `main`
- a stable package script for structural and functional browser checks
- repository validation and operations documentation
- a production-v1 repository audit and prioritized continuation roadmap
- the smallest responsive correction for a defect exposed by the new CI gate

### Out of Scope

- branch-protection mutation
- Netlify or production deployment changes
- Stripe configuration, checkout, webhook, or customer actions
- paid-content entitlement architecture
- framework or dependency migration
- product copy, Scripture, media, or visual changes

### Dependencies

- Roadmap Program 0 is complete.
- ADR-010 keeps GitHub and Netlify as the current delivery path.
- The existing build and 23-scenario browser harness are the validation source
  of truth.

### Risks

- Hosted-runner browser rendering can differ from the reviewed Windows pixel
  baseline. CI therefore runs the harness's explicit `--check-only` mode, which
  preserves structural and functional journey checks without claiming pixel
  identity across operating systems.
- CI does not protect `main` until an owner enables a required status check in
  GitHub branch rules.

### Rollback

Revert this execution-order commit. No data, external configuration, production
deployment, or customer state is migrated.

## Phase B: Execute

1. Add a least-privilege GitHub Actions workflow using locked dependencies and
   Node.js 22, matching Netlify.
2. Run lint, serial unit/rendering tests, production build, responsive browser
   journeys, and `git diff --check`.
3. Add a named functional-browser package script and document the release gate.
4. Record repository findings and the prioritized v1 continuation roadmap.
5. Correct the 320px pinned-link overflow reproduced by Linux Chrome and add a
   focused design-system regression assertion.

### Constraints

- Follow ADR-010 and retain GitHub-to-Netlify delivery.
- Add no dependencies and make no production configuration changes.
- Do not initiate Stripe checkout or submit a production form.
- Preserve all existing public content and route behavior.

## Phase C: Validate and Release

### One Validation Cycle

```text
git diff --check
npm run lint
npm test -- --runInBand
npm run build
npm run test:visual:functional
git status --short
```

Manual checks:

- inspect the workflow permissions, triggers, Node version, and command order
- confirm the diff contains no secret, generated build output, or unrelated file
- confirm GitHub Actions starts on the draft pull request

### Acceptance Criteria

- Every pull request and push to `main` starts one bounded validation job.
- The job installs from `package-lock.json` and runs the established quality
  gates without mutating production.
- Browser journey checks do not depend on the workstation-specific screenshot
  baseline browser patch.
- Required branch protection is documented as the remaining owner action.

### Commit

```text
ci(repository): add automated validation gates
```

### Push Target

```text
origin agent/ci-validation-gates
```

### Architecture Review

- The implementation conforms to GitHub-to-Netlify ADR-010.
- No new architectural decision or third-party provider was introduced.
- Security improves through least-privilege workflow permissions and locked
  installation; privacy and production runtime behavior are unchanged.
- Branch protection, dependency migration, paid fulfillment, and external
  service activation remain separately scoped follow-up work.
