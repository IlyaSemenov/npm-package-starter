---
name: npm-package-starter
description: Create a new TypeScript npm package project, or assess an existing npm package project for alignment with this starter.
---

# npm-package-starter

This skill, its workflow documents, and its block notes instruct an agent to scaffold or assess a target project through exactly two workflows: `scaffold` and `sync`.

## Contract

- `scaffold`: create a new TypeScript npm package project.
  Read [scaffold.md](scaffold.md).
- `sync`: assess an existing npm package project and prepare a sync plan.
  Read [sync.md](sync.md).
- If the user names a workflow, use it.
- If the user does not name a workflow, use `scaffold` when creating a new project and `sync` when working with an existing project.
- If the task intent does not distinguish the workflows, stop and ask the user to choose `scaffold` or `sync`.
  Do not infer the workflow from a package name or directory name.

## Blocks

Blocks are reusable project slices used by both workflows.
Each block owns one concern, such as the package skeleton, runtime setup, or linting setup.
The `scaffold` workflow applies selected blocks to create a project; the `sync` workflow compares an existing project against the same blocks to describe drift.

The starter defines a ready-to-publish TypeScript package setup with build, test, lint, release, and CI wired together.
The default setup is ESM-only with Bun and Biome.
Dual CJS and ESM output, Node.js/pnpm, ESLint, and PostgreSQL-in-CI are supported variants with their own starter blocks, so existing projects can be assessed or updated without forcing a full migration to the default stack.

The block files live under `blocks/` in this skill directory.
Treat them as the source of truth.

| Block             | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `base/`           | Shared package skeleton and baseline defaults |
| `cjs/`            | CommonJS output alongside the default ESM     |
| `runtime/bun/`    | Bun runtime for development and testing       |
| `runtime/pnpm/`   | Node/pnpm runtime for development and testing |
| `linting/biome/`  | Biome linting and formatting                  |
| `linting/eslint/` | ESLint linting and formatting                 |
| `ci/postgres/`    | PostgreSQL service for GitHub Actions tests   |

## Block rules

- Resolve block paths relative to this `SKILL.md`.
- Copy full files as-is.
- When a block ships a fragment for an existing file, merge it into the file with the same path.
- When merging block fragments, preserve applicable comments from the blocks.
  Treat those comments as semantic documentation, not formatting noise.
- Use each block's `BLOCK.md` only as application notes for that block, and never copy it into the target project.
- Preserve project-specific customizations when assessing existing projects.
- Stop if a required block or fragment is missing.
