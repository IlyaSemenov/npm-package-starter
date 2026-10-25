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

## Dependency updates

- After `bun install`, run `bun update` without `--latest` to raise dependency ranges in `package.json` and `bun.lock` to the latest compatible versions.
  In an existing project, pass only the added or changed packages.
- Run `bun dedupe` after every dependency update.

## Notes

- In `package.json`, insert `packageManager` immediately after `version` instead of appending it after the existing fields.
- The `types` script replaces the base script that runs `tsc`.
  Keep `typescript` in `devDependencies`, because tsdown uses it to generate declarations.
- Insert the workflow fragment after `Setup mise` in the base workflow.
- The workflow fragment keeps Node available for release tooling while Bun remains the main runtime.
- Do not rewrite the base workflow's release or publish steps for Bun.
  Keep `npx changeset publish` as-is; Bun does not support npm OIDC trusted publishing through `bunx`.
