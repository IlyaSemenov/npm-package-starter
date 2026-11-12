# runtime/bun

Adds a Bun runtime for development and testing.

## Apply

Copy to the project root:

- `tests/main.test.ts`
- `tsconfig.json`

Merge into the matching files:

- `.github/workflows/test.yml`
- `mise.toml`
- `package.json`

## Dependency updates

- After `bun install`, run `bun update --latest` to raise dependencies in `package.json` and `bun.lock` to their latest releases; it keeps each specifier's form.
  In an existing project, pass only the added or changed packages.
- Run `bun dedupe` after every dependency update.

## Notes

- In `package.json`, insert `packageManager` immediately after `version` instead of appending it after the existing fields.
- The `types` script replaces the base script that runs `tsc`.
  Keep `typescript` in `devDependencies`, because tsdown uses it to generate declarations.
- When the project runs `vue-tsc` or `nuxt typecheck`, use the latest `typescript` 6.x and keep `bun check` for the other type checks.
  `typescript` 7 has no JavaScript API, which `vue-tsc` requires.
- Insert the workflow fragment after `Setup mise` in the base workflow.
