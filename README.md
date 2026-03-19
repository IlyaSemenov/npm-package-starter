# npm-package-starter

This repository is now a **two-layer starter toolkit**.

## Layer 1: blocks

Reusable building blocks live under `blocks/`.

Current blocks:

- `blocks/bun-test-tsconfig` — Bun package manager + Bun test + TypeScript base
- `blocks/pnpm-vitest-tsconfig` — pnpm + Vitest + TypeScript base
- `blocks/biome` — Biome config
- `blocks/eslint` — ESLint config
- `blocks/github-action` — basic GitHub Actions CI for Bun projects
- `blocks/readme` — package README template
- `blocks/mise-lefthook` — local tooling bootstrap

## Layer 2: skills

Skills live under `skills/`.

Current skills:

- `skills/scaffold-bun-biome-package` — build a new project from the Bun + Biome blocks
- `skills/sync-project` — placeholder for future sync logic

---

# How to assemble a new Bun + Biome repo from this starter

For now the canonical path is manual assembly from blocks.

## 1. Create a new empty repository

```sh
PROJECT=mylib

gh repo create "$PROJECT" --public
```

## 2. Clone both repositories

Clone this toolkit somewhere temporary:

```sh
gh repo clone IlyaSemenov/npm-package-starter /tmp/npm-package-starter
```

Clone the new project:

```sh
gh repo clone "$PROJECT"
cd "$PROJECT"
```

## 3. Copy the required blocks

For a Bun + Biome project, copy these blocks:

```sh
cp -R /tmp/npm-package-starter/blocks/bun-test-tsconfig/. .
cp -R /tmp/npm-package-starter/blocks/biome/. .
cp -R /tmp/npm-package-starter/blocks/readme/. .
cp -R /tmp/npm-package-starter/blocks/mise-lefthook/. .
```

Optional: add CI now.

```sh
cp -R /tmp/npm-package-starter/blocks/github-action/. .
```

## 4. Replace placeholders

Replace `mylib` in copied files with the real package name.

At minimum check:

- `package.json`
- `README.md`

## 5. Install dependencies

```sh
bun install
```

This will generate `bun.lock` for the new repository.

## 6. Verify the project

```sh
bun test
bun run lint
```

## 7. Commit and push

```sh
git add .
git commit -m "Initialize Bun + Biome package"
git push -u origin main
```

---

## Notes

- The Bun + Biome path is the first supported path and the one the scaffold skill should use.
- `pnpm-vitest-tsconfig` is kept as a separate block, but is not the default assembly path anymore.
- `sync-project` exists only as a placeholder for now; do not treat it as implemented automation yet.
