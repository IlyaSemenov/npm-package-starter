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
Keep `@typescript/native` as the `tsc` provider and `typescript@6.0.3` as the JavaScript API used by `typescript-eslint`.
