# Sync Workflow

Map an existing project to the starter blocks.
Describe the drift.

## Status

This skill is planning-only. Automated sync is not implemented.

## Workflow

1. Inspect the target project.
2. Identify which blocks it already matches.
   - Ignore `bootstrap.md` and its temporary `/bootstrap.md` `.gitignore` rule; they belong only to the scaffold lifecycle.
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
- Do not add or recommend `bootstrap.md` for an existing project.
- Prefer diffs and migration notes over broad config rewrites.
