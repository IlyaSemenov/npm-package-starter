# package-name Agent Guide

## Overview

description

Read [README.md](README.md) completely before changing the public API, package behavior, supported runtimes, or user documentation.

Extend this guide only with stable, non-obvious conventions, architecture, contracts, workflows, and gotchas.
Do not catalog files or restate information evident from their names and locations.

## Scope

- Keep production code in `src/`.
- Keep focused module tests beside their source as `*.test.ts`.
- Keep integration, package-boundary, and type-inference tests in `tests/`.
- Name compile-only tests `*.type-test.ts`.
- Keep `src/index.ts` limited to explicit public exports.
- Treat `package.json` exports and supported runtimes as public contracts.

## Documentation

- Write public README and JSDoc text for package users who do not know the implementation.
- Add JSDoc to every exported declaration and to internal helpers whose contract, inputs, output, or failure behavior is not obvious.
- Add inline comments beside every non-obvious invariant, algorithmic choice, safety constraint, and intentionally limited behavior.
- Update nearby JSDoc and inline comments whenever the documented code changes, and remove comments that no longer apply.
- Do not narrate self-evident syntax or restate what a name already communicates.
- Do not document obvious or implied defaults.
- Describe a default only when readers need it to make a decision or avoid surprising behavior.
- Use One Sentence Per Line for connected prose.
- Keep semantically connected explanations as prose paragraphs.
- Use lists for separate assertions instead of presenting them as prose paragraphs.

## Changesets

- Add one `.changeset/*.md` file for each independently releasable user-visible change.
- Do not add changesets for internal refactors, maintenance, tests, or documentation changes that do not require a package release.
- Choose the SemVer bump from the public contract: `patch` for backward-compatible fixes, `minor` for backward-compatible functionality, and `major` for breaking changes.
- Create `.changeset/<unique-name>.md` with this format:

```markdown
---
"package-name": patch
---

Describe the user-visible change.
```

- Write one or two sentences for package users that describe the observable change or new capability without implementation details or rationale.
- Do not edit the package version or `CHANGELOG.md` by hand, and do not run `changeset version` or `changeset publish`; the release workflow consumes pending changesets.

## Tests

- Add a `describe` block where the file gives a reason for it: several APIs or behaviors in one file, or a fixture that belongs to some cases but not all.
  Name such a block after what it covers and keep its fixtures inside it.
- Distinguish several same-kind values by role rather than by order.
  When values differ only by order, number them with digits instead of ordinal words.
- Keep tests deterministic so a failure repeats on every run.
  Generate random inputs from an explicit seed and print the seed in failure messages so the failing input can be replayed.

## Checks

- Run the `types` script when public types or TypeScript configuration change.
- Run the `test` script when behavior changes.
- Run the `build` script when package exports, declarations, or supported runtimes change.
