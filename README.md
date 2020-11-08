# Publish a new Node.js/Typescript project at NPM

```
npx degit IlyaSemenov/npm-package-starter mylib
cd mylib
git init .
gh repo create
```

Note: if the repo already existed, make sure its main branch is `master` and not `main`. This is important for Travis CI and semantic-release.

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
yarn
```

---

Put sources to `src/index.ts`, build with:

```
yarn build
```

---

Put tests to `src/**/*.test.ts`, run with:

```
yarn test
```

---

Prepare package documentation:

```
mv README.lib.md README.md
```

---

Test npm packaging:

```
npm pack && rm *.tgz
```

---

- Open https://travis-ci.org/
- My repositories > Add > (search) > On > Settings > Environment Variables:
  - `GH_TOKEN` > branch: master > Add
  - `NPM_TOKEN` > branch: master > Add

---

```
git add .
git commit -m "Initial release"
git push -u origin master
```
