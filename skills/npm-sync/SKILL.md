---
name: npm-sync
description: Assess an existing project against the starter blocks and prepare a sync plan.
---

# npm-sync

Map an existing project to the starter blocks and describe the drift.

## Status

This skill is planning-only. Automated sync is not implemented.

## Workflow

1. Inspect the target project.
2. Identify which blocks it already matches.
3. Record missing blocks and drift from the starter.
4. Separate safe mechanical changes from local customizations.
5. Stop before broad config rewrites unless the user explicitly asks for them.

## Report

Always separate findings into:

- current block match
- missing blocks
- conflicting local customizations
- safe next steps

## Constraints

- Do not pretend automated sync exists.
- Prefer diffs and migration notes over broad config rewrites.
