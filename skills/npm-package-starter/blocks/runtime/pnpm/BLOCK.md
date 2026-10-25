# runtime/pnpm

Adds a Node/pnpm runtime for development and testing.

## Apply

Copy to the project root:

- `tests/main.test.ts`
- `tsconfig.json`
- `vite.config.ts`

Merge into the matching files:

- `.github/workflows/test-and-release.yml`
- `mise.toml`
- `package.json`

## Review

- Replace `package-name` in `vite.config.ts`.

## Dependency updates

- After `pnpm install`, run `pnpm update --latest` to raise dependencies in `package.json` and `pnpm-lock.yaml` to their latest releases; it keeps each specifier's form.
  In an existing project, pass only the added or changed packages.
- Run `pnpm dedupe` after every dependency update.

## Notes

- In `package.json`, insert `packageManager` and then `devEngines` immediately after `version` instead of appending them after the existing fields.
- Insert the workflow fragment after `Setup mise` in the base workflow.
- The workflow fragment assumes the package is installed, built, and tested through pnpm scripts.
