---
name: scaffold-bun-biome-package
description: Assemble a new TypeScript package from this repository's Bun + Biome starter blocks. Use when creating a new project from `blocks/bun-test-tsconfig`, `blocks/biome`, `blocks/readme`, and optionally `blocks/github-action` or `blocks/mise-lefthook`.
---

# Scaffold Bun Biome Package

Copy the Bun + Biome blocks into the target repository and leave the repository in a runnable state.

## Workflow

1. Confirm the target repository path.
2. Copy these required blocks into the target repository:
   - `blocks/bun-test-tsconfig`
   - `blocks/biome`
   - `blocks/readme`
3. Copy `blocks/mise-lefthook` when local tooling bootstrap is wanted.
4. Copy `blocks/github-action` when CI is wanted.
5. Replace placeholder package name `mylib` in copied files.
6. Run `bun install` in the target repository.
7. Run verification:
   - `bun test`
   - `bun run lint`
8. Report exactly which blocks were used.

## Required output

Always tell the user:

- which blocks were copied
- which placeholders still need manual review
- whether `bun install`, `bun test`, and `bun run lint` passed

## Constraints

- Prefer the Bun + Biome path over pnpm + Vitest.
- Do not invent extra blocks during scaffolding.
- If a required block is missing, stop and report it instead of improvising.
