# npm-package-starter

Starter for creating and maintaining TypeScript npm packages from reusable blocks.

It can scaffold a new package, or compare an existing package with the starter and report what should be updated.

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
- CI database service: optional PostgreSQL for tests that need it.
- Markdown linting and editor defaults.

The sync workflow does not rewrite an existing project automatically. It compares the project with the starter and reports what matches, what is missing, and what should be reviewed before changing.

## Publishing

The starter includes a GitHub Actions release workflow using Changesets.

Before the first release, configure the repository:

```sh
gh repo view --web
```

Under **Settings > Secrets and variables > Actions > New repository secret**:

- Add `NPM_TOKEN`.

Under **Settings > Actions > General > Workflow permissions**:

- Choose **Read and write permissions**.
- Enable **Allow GitHub Actions to create and approve pull requests**.

Push the repository, then open the generated **Version Packages** pull request and merge it.

After the first publish, configure npm trusted publishing for the package:

- Publisher: GitHub Actions
- Organization or user: `IlyaSemenov`
- Repository: your package repository
- Workflow filename: `test-and-release.yml`
- Allowed actions: ☑ Allow `npm publish`

Then remove `NPM_TOKEN` from the workflow and from repository secrets.
