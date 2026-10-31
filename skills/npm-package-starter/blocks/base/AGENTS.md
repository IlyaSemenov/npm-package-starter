# package-name Agent Guide

## Overview

description

Read [README.md](README.md) completely before changing the public API, package behavior, supported runtimes, or user documentation.

Extend this guide only with stable, non-obvious conventions, architecture, contracts, workflows, and gotchas.
Do not catalog files or restate information evident from their names and locations.

## Release status

The package is at version 0.0.0 and has no users; remove this section with the initial release.

- Judge a change only by the contract it produces.
  Do not compare behavior with previous revisions, call changes breaking, or add compatibility paths, migration notes, or deprecations.
- Do not add changesets: the pending initial release covers every change.

## Scope

- Keep production code in `src/`.
- Name a directory of one concept in the singular, such as `parser/`, and a directory of like items in the plural, such as `rules/`.
- Keep focused module tests beside their source: `foo.test.ts` and `foo.type-test.ts` test `foo.ts`.
- Test each behavior at the lowest level that can check it: a helper directly, a module that combines helpers by its own unit tests.
- Keep integration and package-boundary tests in `tests/`.
- Name runtime tests `*.test.ts` and compile-only type tests `*.type-test.ts`.
- Keep `src/index.ts` limited to explicit public exports.
- Export from `src/index.ts` every type that the inferred types of public values reference, so that the declarations of a consumer module can name them.
- Treat `package.json` exports and supported runtimes as public contracts.

## Design

- With every change, look for refactorings that reduce complexity: duplicated logic, a concept spread over several modules, or code that an upcoming feature will need elsewhere.
  Make those that belong to the change, and propose the others in the final report.
- Give a domain rule or contract its own function or module at its first use, such as how a cache key is built or which values an option accepts, so that the next use finds it.
  Do not extract code that only looks alike.
- Before adding a helper, search for an existing one that does the same.

## Refactoring

- When moving or splitting code, move its tests to follow it.

## Documentation

- Write public README and JSDoc text for package users who do not know the implementation.
- Write user documentation as a guide to using the API in plain terms: what to call and what it does, not how it is typed or implemented.
- Start each section of user documentation from what users want to achieve in their application, such as retrying failed requests, rather than from a description of the package or its concepts.
  Name only a task that users really have; when none fits, state plainly what the API does instead of inventing a task for a "To …" opening.
  Open with a short statement of the common case and its example, and put details, alternatives, and edge cases after the example.
- Other things being equal, write the happy path as an instruction of what to do, such as "Pass the options to `connect`", rather than as a description of the API, such as "`connect` takes options".
  This is a preference, not a rule: keep a description wherever it reads more clearly.
- Do not restate in prose what users see in their editor's types or learn from a TypeScript or runtime error.
- Mention an edge case in user documentation only when users must write different code because of it; cover other edge cases with tests.
- Write a rule that users must follow as an instruction, such as to call `close` before the process exits, rather than as the check or error that enforces it.
- When a change makes an existing statement false, fix that statement rather than add an explanation next to it.
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
- Choose the SemVer bump from the public contract: `patch` for backward-compatible fixes and `minor` for backward-compatible functionality.
- Before 1.0, use `minor` for breaking changes; starting with 1.0, use `major` and remove this rule.
- Create `.changeset/<unique-name>.md` with this format:

```markdown
---
"package-name": patch
---

Describe the user-visible change.
```

- Briefly describe the user-observable change or new capability in the public contract, without implementation details or rationale.
  Prefer a single sentence.
- For a fix, describe the problem users saw, not how the fix works:
  - Avoid: "Compare cache keys by the normalized path instead of the raw argument."
  - Prefer: "Fix stale results when the same file is passed through different relative paths."
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
