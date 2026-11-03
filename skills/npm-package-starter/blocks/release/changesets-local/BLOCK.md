# release/changesets-local

Releases pending changesets from the maintainer's terminal with changesets-local: it versions the package, publishes it to npm, pushes the release commit and tag, and creates a GitHub Release.

## Apply

Copy to the project root:

- `bootstrap.md`

Merge into the matching files:

- `mise.toml`
- `package.json`

## Review

- Replace `package-name`, `author`, `description`, `NPM_USER`, `OWNER`, `REPO`, `REPOSITORY_VISIBILITY`, and `REPOSITORY_TOPICS` in `bootstrap.md`.
  `REPOSITORY_TOPICS` is a comma-separated list of topics selected for the package.

## Notes

- With `runtime/pnpm`, replace `bun run` with `pnpm run` in the `release:check` script and in `bootstrap.md`.
- Keep `release:check` running the same checks as the test workflow; changesets-local runs it before asking to confirm a release.
- changesets-local requires `"commit": false` in `.changeset/config.json`.
- `node` in `mise.toml` provides Node.js and npm, which changesets-local and `changeset publish` run on; with `runtime/pnpm`, the runtime block already provides it.

## Migrate from release/changesets-action

- Rename `.github/workflows/test-and-release.yml` to `test.yml` and its job `test-and-release` to `test`, and take the workflow `name`, job `name`, and `permissions` from `base/`.
  Keep the job's runtime and CI steps, services, and project-specific settings.
- In the workflow, remove `MAIN_REF` from `env`, and `env` itself when it becomes empty, the `Setup Node` or `Setup npm authentication` step, and the `Capture release title` and `Create Release Pull Request or Publish to npm` steps.
- Remove `publishConfig.provenance` from `package.json`.
- Close the open Version pull request, if there is one.
- Delete the `NPM_TOKEN` repository secret, if it exists, and revoke the npm Trusted Publisher of the package with `npm trust list` and `npm trust revoke`.
