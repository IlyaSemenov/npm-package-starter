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
- `bootstrap.md`
- `lefthook.yml`
- `mise.toml`
- `package.json`
- `README.md`
- `src/`
- `tests/`
- `tsdown.config.ts`

## Review

- Replace `package-name` in `AGENTS.md`, `README.md`, `bootstrap.md`, `package.json`, `.changeset/initial-release.md`, and `tests/tsconfig.json`.
- Replace `OWNER` and `REPO` in `package.json` only when the GitHub repository is known from a reliable source.
- Replace `YEAR` and `author` in `LICENSE`.
- Fill in `description` and `author`, including the placeholders in `AGENTS.md`.
- Customize every identity, repository, visibility, token-scope, and command placeholder in `bootstrap.md` for the project and user.
- Keep `/bootstrap.md` in `.gitignore`; the generated checklist removes this rule during its final cleanup.

## Notes

- The base package builds and publishes ESM only.
- Apply the `cjs` block when consumers also require CommonJS output.
- `repository.url` is publish-critical metadata. If `OWNER/REPO` cannot be derived reliably, ask instead of guessing.
- `bootstrap.md` is created only by the scaffold workflow and must never be committed to the generated project.
- If the GitHub repository or remote already exists, replace the repository-creation command with commands matching the actual state.
- Tool installation and lockfile generation happen after the full block stack is assembled.
- Other blocks may extend files from this block by merging same-path fragments or by adding more files alongside the base ones.
