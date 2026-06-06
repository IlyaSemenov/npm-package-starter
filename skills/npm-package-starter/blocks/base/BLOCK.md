# base

Provides the starting package that other blocks build on.

## Apply

Copy to the project root:

- `.changeset/`
- `.github/`
- `.gitignore`
- `.markdownlint.yaml`
- `.vscode/`
- `lefthook.yml`
- `mise.toml`
- `package.json`
- `README.md`
- `src/`
- `tests/`
- `tsdown.config.ts`

## Review

- Replace `package-name` in `README.md`, `package.json`, `.changeset/initial-release.md`, and `tests/tsconfig.json`.
- Replace `OWNER` in `package.json` only when the repository owner is known from a reliable source.
- Fill in `description` and `author`.

## Notes

- `repository.url` is publish-critical metadata. If the owner cannot be derived reliably, ask instead of guessing.
- Tool installation and lockfile generation happen after the full block stack is assembled.
- Other blocks may extend files from this block by merging same-path fragments or by adding more files alongside the base ones.
