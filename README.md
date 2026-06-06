# npm-package-starter

Starter skill for scaffolding TypeScript npm packages from reusable blocks, or assessing an existing package against the same starter.

The skill has two workflows:

- create a new TypeScript package project
- review an existing package project and report how it differs from the starter

## Install

```bash
npx skills add -g https://github.com/IlyaSemenov/npm-package-starter
```

## Usage

Use the first argument to select the workflow:

- `create` or `scaffold`: create a new TypeScript npm package project
- `update` or `sync`: inspect an existing project and prepare a sync plan

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
$npm-package-starter update
```

## What It Builds

The scaffold workflow creates a ready-to-publish TypeScript package with build, test, lint, release, and CI setup already wired together.

What the starter configures:

- Runtime: Bun by default, or Node.js with pnpm.
- Linting and formatting: Biome by default, or ESLint.
- Tool versions managed with `mise`.
- Git hooks managed with `lefthook`.
- Releases managed with Changesets.
- Test and release automation through GitHub Actions.
- Markdown linting and editor defaults.

The sync workflow does not rewrite an existing project automatically. It compares the project with the starter and reports what matches, what is missing, and what should be reviewed before changing.
