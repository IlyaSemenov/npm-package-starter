# base

Provides the starting package that other blocks build on.

## Apply

Copy to the project root:

- `.changeset/`
- `.github/`
- `.gitignore`
- `.markdownlint.yaml`
- `.vscode/`
- `AGENTS.md`
- `CLAUDE.md`
- `LICENSE`
- `lefthook.yml`
- `mise.toml`
- `package.json`
- `README.md`
- `src/`
- `tests/`
- `tsdown.config.ts`

## Review

- Replace `package-name` in `AGENTS.md`, `README.md`, `package.json`, `.changeset/initial-release.md`, and `tests/tsconfig.json`.
- Replace `OWNER` and `REPO` in `package.json` only when the GitHub repository is known from a reliable source.
- Replace `YEAR` and `author` in `LICENSE`.
- Fill in `description` and `author`, including the `description` placeholder in `AGENTS.md`.

## Notes

- The base package builds and publishes ESM only.
- Apply the `cjs` block when consumers also require CommonJS output.
- The base package records releases with Changesets; a `release/*` block sets up how they are published.
- `repository.url` is publish-critical metadata. If `OWNER/REPO` cannot be derived reliably, ask instead of guessing.
- The `Release status` section of `AGENTS.md` applies only to a package that has not been released; omit it from a released package.
- Tool installation and lockfile generation happen after the full block stack is assembled.
- Other blocks may extend files from this block by merging same-path fragments or by adding more files alongside the base ones.
