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

## Hook migrations

When replacing Husky or lint-staged with Lefthook:

- Inspect every tracked hook in `.husky/`, excluding the generated `.husky/_` directory, and every lint-staged configuration source before planning their removal.
- Map each hook to `lefthook.yml` with the same Git hook name, command order, and file globs.
- Preserve staged-file handling explicitly.
  Use `{staged_files}` for commands that lint-staged ran on staged files and `stage_fixed: true` when fixes must be staged again.
- Remove the Husky and lint-staged dependencies, configuration, and tracked hook scripts.
- Inspect `git config --local --get core.hooksPath`.
- If it points to Husky's `.husky/_`, unset it with `git config --local --unset core.hooksPath`.
  Preserve any unrelated custom hooks path.
- Run `lefthook install`, then remove the generated `.husky/` directory.

## Lockfile updates

Include lockfile updates with the safe mechanical change that caused them:

- Regenerate the package-manager lockfile after changing dependencies in the package manifest.
- Ensure `mise.lock` exists and run `mise lock` after changing tools in `mise.toml`.

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
