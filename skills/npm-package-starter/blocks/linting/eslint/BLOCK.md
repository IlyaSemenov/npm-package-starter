# linting/eslint

Adds ESLint linting and formatting.

## Apply

Copy to the project root:

- `eslint.config.js`

Merge into the matching files:

- `.vscode/`
- `lefthook.yml`
- `package.json`

Merge this block's TypeScript dependencies after the base block.
Keep `typescript@~6.0.3` as the JavaScript API used by `typescript-eslint`.
With the `runtime/pnpm` block, keep `@typescript/native` as the `tsc` provider for the `types` script.
With the `runtime/bun` block, omit `@typescript/native`, because its `types` script runs `bun check`.
