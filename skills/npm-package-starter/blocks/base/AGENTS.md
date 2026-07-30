# package-name Agent Guide

## Overview

description

Read [README.md](README.md) completely before changing the public API, package behavior, supported runtimes, or user documentation.

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

## Checks

- Run the `types` script when public types or TypeScript configuration change.
- Run the `test` script when behavior changes.
- Run the `build` script when package exports, declarations, or supported runtimes change.

Extend this guide with the package's source map, architecture, contracts, and test map as those conventions become stable.
