# cjs

Adds CommonJS output alongside the default ESM output.

## Apply

Merge into the matching files:

- `package.json`
- `tsdown.config.ts`

## Remove

- When migrating back to ESM-only, restore `exports["."]` and `types` from `base/package.json`, remove `main` and `module`, and restore `format` and `attw.profile` from `base/tsdown.config.ts` before building.
- Do not rely on the base tsdown build to replace stale CommonJS package fields.

## Notes

- Apply this block after `base`.
- The block's tsdown config overrides the base format with dual CJS and ESM output.
- The strict attw profile validates both module formats.
