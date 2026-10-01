# linting/oxc

Adds OXC linting and formatting with the shared `@ilyasemenov/oxc-config` presets.

## Apply

Copy to the project root:

- `oxfmt.config.ts`
- `oxlint.config.ts`

Merge into the matching files:

- `.vscode/`
- `lefthook.yml`
- `package.json`

## Notes

- When replacing `.oxfmtrc.json` or `.oxlintrc.json`, carry project-specific options into the TypeScript configs and drop oxfmt `sortImports`, because oxlint sorts imports.
