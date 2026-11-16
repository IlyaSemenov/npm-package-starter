# base

Provides the starting package that other blocks build on.

The maintainer releases pending changesets on demand with changesets-release: it runs in a terminal, versions the package, pushes the release commit, and dispatches the publishing workflow, which publishes to npm with trusted publishing and provenance, pushes the tag, and creates a GitHub Release.

## Apply

Copy to the project root:

- `.changeset/`
- `.editorconfig`
- `.github/`
- `.gitignore`
- `.markdownlint.yaml`
- `.vscode/`
- `AGENTS.md`
- `bootstrap.md`
- `CLAUDE.md`
- `development/`
- `LICENSE`
- `lefthook.yml`
- `mise.toml`
- `package.json`
- `README.md`
- `src/`
- `tests/`
- `tsdown.config.ts`

## Review

- Replace `package-name` in `AGENTS.md`, `README.md`, `package.json`, `.changeset/README.md`, `.changeset/initial-release.md`, and `tests/tsconfig.json`.
- Replace `OWNER` and `REPO` in `package.json` only when the GitHub repository is known from a reliable source.
- Replace `YEAR` and `author` in `LICENSE`.
- Fill in `description` and `author`, including the `description` placeholder in `AGENTS.md`.
- Replace `package-name`, `author`, `description`, `NPM_USER`, `OWNER`, `REPO`, `REPOSITORY_VISIBILITY`, and `REPOSITORY_TOPICS` in `bootstrap.md`.
  `REPOSITORY_TOPICS` is a comma-separated list of topics selected for the package.
- For a private repository, keep the `npm` environment commands of `bootstrap.md` step 3 only when the owner's GitHub plan supports environments in private repositories; otherwise remove them with their paragraph.

## Notes

- The base package builds and publishes ESM only.
- Apply the `cjs` block when consumers also require CommonJS output.
- In a test workflow with several jobs, add the `if` condition of the `test` job to every job that does not depend on a conditioned one.
- Keep `npx --no changesets-release ci` with every runtime: changesets-release finds the publishing workflow by the text `changesets-release ci`.
- Keep `publish.yml` on the same `actions/checkout` and mise versions as `test.yml`.
- Add a `release:check` script only for checks that the test workflow does not run, and remove one that repeats them: changesets-release waits for the CI of the released commit before publishing.
- Keep `"commit": false` in `.changeset/config.json`, which changesets-release requires.
- `node` in `mise.toml` provides Node.js and npm, which changesets-release runs on locally and the publishing workflow publishes with.
- Set the version in the `$schema` URL of `.changeset/config.json` to the version of `@changesets/config` that the installed `@changesets/cli` resolves, as `changeset init` writes it, rather than the latest `@changesets/config`.
- `repository.url` is publish-critical metadata. If `OWNER/REPO` cannot be derived reliably, ask instead of guessing.
- The `Release status` section of `AGENTS.md` applies only to a package that has not been released; omit it from a released package.
- Tool installation and lockfile generation happen after the full block stack is assembled.
- Other blocks may extend files from this block by merging same-path fragments or by adding more files alongside the base ones.
