# runtime/bun

Adds a Bun runtime for development and testing.

## Apply

Copy to the project root:

- `tests/main.test.ts`
- `tsconfig.json`

Merge into the matching files:

- `.github/workflows/test-and-release.yml`
- `mise.toml`
- `package.json`

## Notes

- Insert the workflow fragment after `Setup mise` in the base workflow.
- The workflow fragment keeps Node available for release tooling while Bun remains the main runtime.
- Do not rewrite the base workflow's release or publish steps for Bun.
  Keep `npx changeset publish` as-is; Bun does not support npm OIDC trusted publishing through `bunx`.
