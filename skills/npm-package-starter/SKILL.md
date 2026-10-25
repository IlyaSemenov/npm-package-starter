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
The default setup is ESM-only with Bun and OXC.
Dual CJS and ESM output, Node.js/pnpm, Biome, ESLint, and PostgreSQL-in-CI are supported variants with their own starter blocks, so existing projects can be assessed or updated without forcing a full migration to the default stack.

The block files live under `blocks/` in this skill directory.
Treat them as the source of truth.

| Block             | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `base/`           | Shared package skeleton and baseline defaults |
| `cjs/`            | CommonJS output alongside the default ESM     |
| `runtime/bun/`    | Bun runtime for development and testing       |
| `runtime/pnpm/`   | Node/pnpm runtime for development and testing |
| `linting/oxc/`    | OXC linting and formatting                    |
| `linting/biome/`  | Biome linting and formatting                  |
| `linting/eslint/` | ESLint linting and formatting                 |
| `ci/postgres/`    | PostgreSQL service for GitHub Actions tests   |

## Block rules

- Resolve block paths relative to this `SKILL.md`.
- Copy full files as-is, except for resolving versions as described in [Versions](#versions).
- When a block ships a fragment for an existing file, merge it into the file with the same path.
- When merging block fragments, preserve applicable comments from the blocks.
  Treat those comments as semantic documentation, not formatting noise.
- Use each block's `BLOCK.md` only as application notes for that block, and never copy it into the target project.
- Preserve project-specific customizations when assessing existing projects.
- Stop if a required block or fragment is missing.

## Versions

Block files record the versions of tools, package managers, packages, and GitHub Actions that were current when the block was last updated.
Treat them as minimum versions, not literal versions to install.
Whenever a workflow adds or proposes a version from a block, use the latest stable release that is compatible with it:

- Treat a calendar version, such as `version: 2026.10.19` for mise in `jdx/mise-action`, as compatible with every later release.
- Treat an exact version, such as `bun = "1.4.4"` in `mise.toml`, `bun@1.4.4` in `packageManager`, or `changesets/action@v2.1.2`, as a caret range.
- Keep the semantics of ranges and partial versions, such as `^0.22.14`, `~6.0.3`, `node = "24"`, or `actions/checkout@v6`.
- Write the resolved version in the block's specifier form: an exact version stays exact, a range keeps its operator with the resolved version as its lower bound, and a partial version stays unchanged.
  When a version carries derived values, set it through the tool that owns them, such as `corepack use pnpm@x.y.z` for `packageManager` with its integrity hash; never write derived values by hand.
- Use the same resolved version everywhere the same tool or package appears.
- Lock the resolved versions in the same change: package dependencies in the package-manager lockfile and `mise.toml` tools in `mise.lock`.
- Never downgrade a version that an existing project already uses.

Update package dependencies as described in the selected runtime block's `BLOCK.md`.
Resolve mise tool versions with `mise latest tool@prefix` and the mise version itself with `npm view @jdxcode/mise version`.
