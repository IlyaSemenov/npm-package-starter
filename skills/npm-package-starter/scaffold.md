# Scaffold Workflow

Assemble a new package from the starter blocks.
Use the package name from the user request; if it is missing and cannot be derived from the target directory, ask before filling package metadata.

## Default stack

1. `blocks/base/`
2. `blocks/runtime/bun/`
3. `blocks/linting/biome/`

The default build publishes ESM only.
Apply `blocks/cjs/` immediately after `blocks/base/` when the package must also publish CommonJS output.

## Workflow

1. Confirm the target directory. Default: current working directory.
2. If the target directory is not a git repository yet, run `git init .`.
3. Apply the blocks in order, copying full files and merging same-path fragments.
4. Normalize merged configuration files after the complete selected block stack is assembled:
   - In `.vscode/*.json`, merge arrays without duplicates, sort string arrays alphabetically, and recursively sort object keys alphabetically.
   - In `mise.toml`, order tables as `[settings]`, its subtables, and then `[tools]`, and sort keys alphabetically within each table.
5. Resolve project and user metadata from explicit user input or reliable authenticated sources:
   - package name, author, and description
   - current year for the license notice
   - npm username
   - GitHub `OWNER/REPO`
   - repository visibility
   - repository topics
6. Replace the `package-name`, `author`, `description`, `YEAR`, `NPM_USER`, `OWNER`, `REPO`, `REPOSITORY_VISIBILITY`, and `REPOSITORY_TOPICS` placeholders.
7. Resolve publish-critical metadata:
   - If the repository owner can be derived from a reliable source, replace `OWNER`.
   - Otherwise ask the user before filling `repository.url` or any other publish-critical field.
8. Customize `bootstrap.md` for the resolved project, user, runtime, repository state, and repository visibility.
   - Leave no unresolved or example placeholders.
   - Keep the file excluded by the generated `.gitignore`.
   - Verify that `git check-ignore bootstrap.md` succeeds.
   - Preserve the npm CLI token flow from the template.
   - Run token creation during bootstrap, pausing for the npm password and browser-based two-factor authentication, then upload the printed token through the interactive GitHub secret prompt.
   - Preserve the blank line and bootstrap comment before `NPM_TOKEN` in `.github/workflows/test-and-release.yml`.
9. Run `mise trust`.
10. Run `mise install`.
11. Run `bun install`.
12. Run `mise lock`.
13. Verify `bun test`, `bun run types`, `bun run lint`, and `bun run build`.

## Report

Always tell the user:

- which blocks were applied
- whether `git init` was needed
- which placeholders or publish-critical fields still need review
- whether `bootstrap.md` was fully customized and remains ignored by Git
- that all remaining repository and npm setup continues from `bootstrap.md`
- whether `mise trust`, `mise install`, `bun install`, `mise lock`, test, types, lint, and build passed

## Constraints

- Never guess repository owners or publish URLs.
- Stop if a required block or fragment is missing.
