# package-name Agent Guide

## Overview

description

Read [README.md](README.md) completely before changing the public API, package behavior, supported runtimes, or user documentation.

Extend this guide only with stable, non-obvious conventions, architecture, contracts, workflows, and gotchas.
Do not catalog files or restate information evident from their names and locations.

## Scope

- Keep production code in `src/`.
- Use `src/*.test.ts` only for focused tests of one source module.
- Keep integration, package-boundary, and type-inference tests in `tests/`.
- Keep `src/index.ts` limited to explicit public exports.
- Treat `package.json` exports and supported runtimes as public contracts.

## Documentation

- Write public README and JSDoc text for package users who do not know the implementation.
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

## Checks

- Run the `types` script when public types or TypeScript configuration change.
- Run the `test` script when behavior changes.
- Run the `build` script when package exports, declarations, or supported runtimes change.
