# Sync Workflow

Map an existing project to the starter blocks.
Describe the drift.

## Status

This skill is planning-only. Automated sync is not implemented.

## Workflow

1. Inspect the target project.
2. Identify which blocks it already matches.
   - Ignore `bootstrap.md` and its temporary ignore rule; they belong only to the scaffold lifecycle.
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

## Release migrations

When replacing changesets-local with changesets-release:

- Replace the `changesets-local` dev dependency with `changesets-release`, and `changesets-local` with `changesets-release` in the `release` script.

When replacing a Version pull request with `changesets/action`:

- Rename `.github/workflows/test-and-release.yml` to `test.yml` and its job `test-and-release` to `test`, and take the workflow `name`, job `name`, and `permissions` from `blocks/base/`.
  Keep the job's runtime and CI steps, services, and project-specific settings.
- In the workflow, remove `MAIN_REF` from `env`, and `env` itself when it becomes empty, the `Capture release title` or `Capture release version` step, and the `Create Release Pull Request or Publish to npm` step.
  Remove the `Setup Node` or `Setup npm authentication` step unless a project-specific step needs a Node.js version other than the one in `mise.toml`; then replace its comment with that reason.
- Remove `publishConfig.provenance` from `package.json`: npm generates provenance with trusted publishing from a public repository.
- Add `changesets-release` to the dev dependencies and the `release` script from `blocks/base/package.json`.
- Close the open Version pull request, if there is one, and delete its `changeset-release/main` branch.
- Disable creating and approving pull requests from GitHub Actions with `gh api --method PUT repos/OWNER/REPO/actions/permissions/workflow -F can_approve_pull_request_reviews=false`.
- Delete the `NPM_TOKEN` repository secret, if it exists.

In both cases:

- Add `node` to `mise.toml`, the `if` condition of the `test` job, and `publish.yml` with the install step of the runtime block.
- Limit the `npm` environment to the base branch with the commands of step 3 of `blocks/base/bootstrap.md`.
- Right before the next release, configure the trusted publisher of `publish.yml` with the command of step 8 of `blocks/base/bootstrap.md`.
  Revoke a trusted publisher of another workflow with `npm trust list` and `npm trust revoke`.

## Lockfile updates

Include lockfile updates with the safe mechanical change that caused them:

- Regenerate the package-manager lockfile after changing dependencies in the package manifest.
- Ensure `mise.lock` exists and run `mise lock` after changing tools in `mise.toml`.

## Commits

Make every sync change self-sufficient in the target project:

- Split the changes into commits that each make one meaningful change; do not bundle unrelated differences because they come from the same block.
- Name each commit after what it changes in the project, such as `Add EditorConfig`, never after its relation to the starter, such as `Align package skeleton with starter`.
- Do not mention the starter, its blocks, or the sync in commit messages, changesets, documentation, or comments of the target project.

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
