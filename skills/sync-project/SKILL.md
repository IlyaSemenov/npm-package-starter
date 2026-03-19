---
name: sync-project
description: Plan synchronization of an existing project with this repository's starter blocks. Use when comparing an existing repository against the starter, identifying drift, or preparing future sync automation. This skill is intentionally a stub and should not claim that automated sync is implemented.
---

# Sync Project

Inspect an existing project, map it to starter blocks, and produce a sync plan.

## Current status

This skill is a placeholder.

Automated sync is **not implemented yet**.

## What to do for now

1. Inspect the target project.
2. Identify which starter blocks it already matches.
3. Identify drift from the starter blocks.
4. Propose a manual migration plan.
5. Stop before applying broad mechanical changes unless the user explicitly asks for them.

## Required output

Always separate findings into:

- current block match
- missing blocks
- conflicting local customizations
- safe next steps

## Constraints

- Do not pretend sync exists.
- Do not overwrite large config surfaces automatically.
- Prefer diffs and migration plans over direct edits until the sync layer is actually built.
