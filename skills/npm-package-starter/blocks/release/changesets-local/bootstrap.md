# Bootstrap package-name

This local checklist creates the GitHub repository for `package-name` and prepares its initial release.
The maintainer publishes the release from a terminal with `bun run release`, which asks for confirmation and npm authentication.

Do not commit this file.
It is excluded by `.git/info/exclude` until the final cleanup.

- Author: author
- npm account: `NPM_USER`
- npm package: `package-name`
- GitHub repository: `OWNER/REPO`

## 1. Check authentication

The commands below must show the expected GitHub and npm accounts.

```sh
gh auth status
npm whoami
```

Expected npm account: `NPM_USER`.

## 2. Create the initial commit

`bootstrap.md` must not appear in the staged files.

```sh
git check-ignore bootstrap.md
git branch -M main
git add .
git status --short
git commit -m "Initial commit"
```

## 3. Create and configure the GitHub repository

```sh
gh repo create OWNER/REPO \
  --REPOSITORY_VISIBILITY \
  --source=. \
  --remote=origin

gh repo edit OWNER/REPO \
  --description "description" \
  --homepage "https://www.npmjs.com/package/package-name" \
  --add-topic REPOSITORY_TOPICS
```

## 4. Push the initial commit

Push the initial commit and wait for the test workflow to pass.

```sh
git push -u origin main
gh run watch --exit-status
```

## 5. Preview the initial release

```sh
bun run release --dry-run
```

The preview must show the release of `package-name@1.0.0` without warnings.
Fix the cause of any warning and repeat the preview.

## 6. Remove this checklist

```sh
sed -i.bak -e '/^\/bootstrap\.md$/d' .git/info/exclude
rm .git/info/exclude.bak

rm bootstrap.md
```

## 7. Report to the user

Send the user the message below, and stop.

````markdown
The GitHub repository `OWNER/REPO` is created, and the test workflow passes.

To publish `package-name@1.0.0` to npm and GitHub Releases, run in this directory:

```sh
bun run release
```

It shows the release and asks for confirmation; npm then asks for authentication in the terminal or browser.
````
