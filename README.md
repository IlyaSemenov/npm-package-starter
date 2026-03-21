# npm-package-starter

Starter toolkit for assembling TypeScript npm packages from reusable blocks.

## Quick start

The scaffold skill applies a block stack, installs the toolchain, and verifies that the result still builds, lints, and tests.

Start with empty folder:

```sh
mkdir mylib && cd mylib
git init .
```

### Codex

Install the skill by cloning this repository into your local skills directory:

```sh
git clone https://github.com/IlyaSemenov/npm-package-starter.git ~/.agents/skills/npm-package-starter
```

Then use the skill from Codex:

```text
$npm-scaffold
```

### Claude Code

Install this repository as a Claude Code plugin:

```sh
claude /plugin install https://github.com/IlyaSemenov/npm-package-starter
```

Then scaffold a new package:

```sh
claude "/npm-scaffold mylib"
```

## Repository layout

### Blocks (`blocks/`)

Each block owns one concern. Copy full files as-is. When a block ships a fragment for an existing file, merge it into the file with the same path.

| Block | Purpose |
| --- | --- |
| `base/` | Shared package skeleton and baseline project defaults |
| `runtime/bun/` | Bun runtime for development and testing |
| `runtime/pnpm/` | Node/pnpm runtime for development and testing |
| `linting/biome/` | Biome linting and formatting |
| `linting/eslint/` | ESLint linting and formatting |

### Skills (`skills/`)

Skills orchestrate common workflows on top of the blocks.

| Skill | Purpose |
| --- | --- |
| `npm-scaffold` | Assemble a new package from the default block stack |
| `npm-sync` | Inspect an existing project and prepare a sync plan against the blocks |
