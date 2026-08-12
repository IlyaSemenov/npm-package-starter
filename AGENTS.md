# npm-package-starter Agent Guide

## Document audiences

Every document in the distributable skill has exactly one of three audiences:

- **Starter maintainer:** changes this repository using this `AGENTS.md`; the root `CLAUDE.md` is only a bridge to it.
- **Skill application agent:** scaffolds or assesses a target project using `SKILL.md`, its workflow documents, and `BLOCK.md` files.
- **Generated-project reader:** works with the materialized files under `blocks/`, except `BLOCK.md`, as a human or agent; these files must stand alone without referring to the starter or its application instructions.

Keep each rule in one owning document; when another audience depends on it, route the reader to its owner or state only the required adaptation.

## Scope

- Treat `skills/npm-package-starter/` as the distributable skill and its `blocks/` directory as the source of truth for generated projects.
- Read [SKILL.md](skills/npm-package-starter/SKILL.md) and the applicable workflow document before changing workflow behavior.
- Treat root configuration files as configuration for this repository only unless they are intentionally copied into a block.

## Block ownership

- Put files and settings shared by every generated package in `blocks/base/`.
- Put runtime, linting, and CI-specific files and fragments in their corresponding variant blocks.
- Preserve applicable comments when merging same-path fragments because they document generated behavior.
- Update the owning `BLOCK.md` whenever a block adds, removes, renames, or changes how it applies a template file.
- Put block-local copy, merge, and placeholder replacement instructions in the owning `BLOCK.md`, put cross-block sequencing and project-wide customization in the workflow document, and describe adaptations without repeating generated-project instructions.
- Inspect the assembled default stack and every affected variant after changing files composed from multiple blocks.

## Documentation

- Write Markdown prose using One Sentence Per Line.

## Commands

- `bun run lint` runs Biome with auto-fixes and is a mutating command.
