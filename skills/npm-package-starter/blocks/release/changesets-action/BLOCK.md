# release/changesets-action

Releases pending changesets from GitHub Actions with the Changesets action: it maintains a Version pull request and publishes to npm with Trusted Publishing (OIDC) and provenance when the pull request is merged.

## Apply

Copy to the project root:

- `bootstrap.md`

Merge into the matching files:

- `.github/workflows/test-and-release.yml`
- `package.json`

## Review

- Replace `package-name`, `author`, `description`, `NPM_USER`, `OWNER`, `REPO`, `REPOSITORY_VISIBILITY`, and `REPOSITORY_TOPICS` in `bootstrap.md`.
  `REPOSITORY_TOPICS` is a comma-separated list of topics selected for the package.
- Customize the token scope and other commands in `bootstrap.md` for the project and user.
- Preserve the npm CLI token flow of `bootstrap.md`: run token creation during bootstrap, pausing for the npm password and browser-based two-factor authentication, then upload the printed token through the interactive GitHub secret prompt.
- Preserve the bootstrap-only `NODE_AUTH_TOKEN` environment block in the workflow until `bootstrap.md` confirms the initial publication.

## Notes

- Apply this block after the runtime and CI blocks, which extend the base test workflow.
- Before merging the workflow fragment, rename `.github/workflows/test.yml` to `test-and-release.yml` and its job `test` to `test-and-release`.
  Then replace `name`, `permissions`, and the job `name` with the fragment's values, insert `env` before `on`, insert the `Setup Node` step after `Setup mise`, and append the remaining steps.
- With `runtime/pnpm`, name the Node step `Setup npm authentication`, remove its `# for npx publish` comment and `node-version`, and start its `with` block with the comment `# Node is already provided by mise.`
- Keep `npx changeset publish` with every runtime; Bun does not support npm OIDC Trusted Publishing through `bunx`.
