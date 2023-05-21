# Publish a new Node.js/Typescript project at NPM

```
npx degit IlyaSemenov/npm-package-starter mylib
cd mylib
git init .
gh repo create
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

```
pnpm i
```

---

Put sources to `src/index.ts`, build with:

```
pnpm build
```

---

Put tests under `src` and `tests` as `*.test.ts`, run with:

```
pnpm test
```

---

Prepare package documentation:

```
mv README.lib.md README.md
```

---

```
git add .
git commit -m "feat: initial release"
git push -u origin master
```

---

Publish to NPM:

```
pnpm release
```
