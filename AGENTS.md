# npm-package-starter Agent Guide

## Scope

- Treat `skills/npm-package-starter/` as the distributable skill and its `blocks/` directory as the source of truth for generated projects.
- Read [SKILL.md](skills/npm-package-starter/SKILL.md) and the applicable workflow document before changing workflow behavior.
- Keep workflow details in `SKILL.md`, `scaffold.md`, `sync.md`, and the relevant `BLOCK.md` instead of duplicating them here.
- Treat root configuration files as configuration for this repository only unless they are intentionally copied into a block.

## Block ownership

- Put files and settings shared by every generated package in `blocks/base/`.
- Put runtime, linting, and CI-specific files and fragments in their corresponding variant blocks.
- Preserve applicable comments when merging same-path fragments because they document generated behavior.
- Update the owning `BLOCK.md` whenever a block adds, removes, renames, or changes how it applies a template file.
- Keep placeholder occurrences and their replacement instructions aligned across templates, the owning `BLOCK.md`, and `scaffold.md`.
- Inspect the assembled default stack and every affected variant after changing files composed from multiple blocks.

## Agent guides

- Keep instructions for maintaining this repository in this file.
- Keep instructions for generated packages in `blocks/base/AGENTS.md`.
- Treat `blocks/base/AGENTS.md` as template output rather than maintainer guidance when editing the starter.

## Documentation

- Write Markdown prose using One Sentence Per Line.

## Commands

- `bun run lint` runs Biome with auto-fixes and is a mutating command.
