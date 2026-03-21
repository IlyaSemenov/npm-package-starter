---
name: npm-scaffold
description: Assemble a new TypeScript npm package from the starter blocks.
argument-hint: <package-name>
---

# npm-scaffold

Assemble a new package named **$ARGUMENTS** from the starter blocks.

## Default stack

1. `blocks/base/`
2. `blocks/runtime/bun/`
3. `blocks/linting/biome/`

## Workflow

1. Confirm the target directory. Default: current working directory.
2. If the target directory is not a git repository yet, run `git init .`.
3. Apply the blocks in order, copying full files and merging same-path fragments.
4. Replace the `package-name`, `author`, and `description` placeholders.
5. Resolve publish-critical metadata:
   - If the repository owner can be derived from a reliable source, replace `OWNER`.
   - Otherwise ask the user before filling `repository.url` or any other publish-critical field.
6. Run `mise trust`.
7. Run `mise install`.
8. Run `bun install`.
9. Run `mise lock`.
10. Verify `bun test`, `bun run lint`, and `bun run build`.

## Report

Always tell the user:

- which blocks were applied
- whether `git init` was needed
- which placeholders or publish-critical fields still need review
- whether `mise trust`, `mise install`, `bun install`, `mise lock`, test, lint, and build passed

## Constraints

- Treat block files as the source of truth.
- Never guess repository owners or publish URLs.
- Stop if a required block or fragment is missing.
