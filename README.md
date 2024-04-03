# Publish a new Node.js/Typescript project at NPM

```sh
gh repo create mylib --public
gh repo clone mylib
npx degit IlyaSemenov/npm-package-starter --force
```

---

Edit `package.json`:

- name
- description
- repository

Edit `tsconfig.json`:

- compilerOptions.paths

---

Install development dependencies:

```sh
pnpm i
```

---

Put sources to `src/index.ts`, build with:

```sh
pnpm build
```

---

Put tests under `src` and `tests` as `*.test.ts`, run with:

```sh
pnpm test
```

---

Prepare package documentation:

```sh
mv README.lib.md README.md
```

---

Commit:

```sh
git add .
git commit -m "Initial release"
```

Version package(s):

```sh
pnpx changeset
# choose major
# Description: Initial release.
git add .
git commit --amend
```

---

Setup Github Actions:

```sh
gh repo view --web
```

Under Settings > Secrets and variables > Actions > New repository secret:

- Add new secret `NPM_TOKEN`.

Under Settings > Actions > General > Workflow permissions:

- Choose: Read and write permissions.
- Enable: Allow GitHub Actions to create and approve pull requests.

Push repo:

```sh
git push -u origin master
```

Under Pull Requests, open the new "Version Packages" PR and click Rebase and Merge.
