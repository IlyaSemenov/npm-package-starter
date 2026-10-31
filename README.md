# npm-package-starter

Starter for creating and maintaining TypeScript npm packages from reusable blocks.

It can scaffold a new package, or compare an existing package with the starter and report what should be updated.

## Install

```bash
npx skills add -g https://github.com/IlyaSemenov/npm-package-starter
```

## Usage

The starter has two workflows:

- `scaffold`: create a new TypeScript npm package project
- `sync`: inspect an existing project and prepare a sync plan

To create a project, start from an empty directory:

```sh
mkdir mylib && cd mylib
git init .
```

Ask the agent to use the scaffold workflow:

```text
$npm-package-starter scaffold mylib
```

For an existing project:

```text
$npm-package-starter sync
```

## What It Builds

The scaffold workflow creates a ready-to-publish TypeScript package with build, test, lint, release, and CI setup already wired together.

What the starter configures:

- Module format: ESM only by default, or dual CJS and ESM output.
- Runtime: Bun by default, or Node.js with pnpm.
- TypeScript 7 type-checking locally and in CI.
- Linting and formatting: OXC by default, or Biome and ESLint.
- Tool versions managed with `mise`.
- Git hooks managed with `lefthook`.
- Releases managed with Changesets.
- Test and release automation through GitHub Actions.
- A personalized MIT license.
- A starting `AGENTS.md`.
- CI database service: optional PostgreSQL for tests that need it.
- Documentation site: optional VitePress site published to GitHub Pages.
- Markdown linting and editor defaults.

The sync workflow does not rewrite an existing project automatically. It compares the project with the starter and reports what matches, what is missing, and what should be reviewed before changing.

## Bootstrap

After scaffolding, the generated `bootstrap.md` in the project root sets up publishing in two phases.

1. Initial publication, right after scaffolding: create the GitHub repository, publish the first version with a temporary npm token, then delete the token.
2. First update, whenever it is ready: configure npm Trusted Publishing (OIDC) and publish the update with it.

Trusted Publishing is configured only right before the first update because a new configuration expires unless it publishes within two days.
Until then, the release workflow has no npm credentials, and merging a Version pull request fails to publish.

Keep `bootstrap.md` after the initial publication.
When the Version pull request for the first update is open, ask an agent in the project directory:

```text
Publish the first update following phase 2 of bootstrap.md.
```
