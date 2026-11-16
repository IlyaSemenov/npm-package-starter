# Bootstrap package-name

This local checklist creates the GitHub repository for `package-name` and sets up its publishing in two phases:

1. Initial publication: the maintainer publishes the first version from a terminal with `bun run release --publish=local`.
2. First update: configure npm trusted publishing, so that `bun run release` publishes this and later versions from GitHub Actions with provenance.

npm trusts a publishing workflow only for a package that already exists, so the first version is published from a terminal.
Run phase 2 only when the first update is ready to release, even if that is years after phase 1.
A new trusted publisher expires unless it publishes within two days, so it cannot be configured in advance.

Do not commit this file.
It is excluded by `.git/info/exclude` until the final cleanup.

- Author: author
- npm account: `NPM_USER`
- npm package: `package-name`
- GitHub repository: `OWNER/REPO`

## Phase 1: Initial publication

### 1. Check authentication

The commands below must show the expected GitHub and npm accounts.

```sh
gh auth status
npm whoami
```

Expected npm account: `NPM_USER`.

### 2. Create the initial commit

`bootstrap.md` must not appear in the staged files.

```sh
git check-ignore bootstrap.md
git branch -M main
git add .
git status --short
git commit -m "Initial commit"
```

### 3. Create and configure the GitHub repository

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

Limit the `npm` environment of the publishing workflow to `main`, so that a workflow run on another branch cannot publish.

```sh
gh api --method PUT repos/OWNER/REPO/environments/npm \
  -F 'deployment_branch_policy[protected_branches]=false' \
  -F 'deployment_branch_policy[custom_branch_policies]=true'

gh api --method POST repos/OWNER/REPO/environments/npm/deployment-branch-policies \
  -f name=main \
  -f type=branch
```

### 4. Push the initial commit

Push the initial commit and wait for the test workflow to pass.

```sh
git push -u origin main
gh run watch --exit-status
```

### 5. Preview the initial release

```sh
bun run release --dry-run --publish=local
```

The preview must show the release of `package-name@1.0.0` without warnings.
Fix the cause of any warning and repeat the preview.

### 6. Report to the user

Keep this file and its exclude rule for phase 2.
Send the user the message below, and stop.

````markdown
The GitHub repository `OWNER/REPO` is created, and the test workflow passes.

To publish `package-name@1.0.0` to npm and GitHub Releases, run in this directory:

```sh
bun run release --publish=local
```

It shows the release and asks for confirmation; npm then asks for authentication in the terminal or browser.

npm trusts a publishing workflow only for an existing package, so this first version is published from your terminal without provenance. Later versions are published from GitHub Actions once npm trusts the workflow, which is configured right before the first update because it expires if unused for two days.

Keep `bootstrap.md`. When the first update is ready to release, start an agent in this directory and send:

```text
Prepare the first update following phase 2 of bootstrap.md.
```
````

## Phase 2: First update

### 7. Check readiness

Run the authentication check from step 1, then check that npm has the initial version and preview the release of the first update.

```sh
npm view package-name@1.0.0 version --prefer-online
bun run release --dry-run
```

If npm does not have `package-name@1.0.0`, stop and tell the user to publish it as in step 6.
If the preview shows no release, stop and tell the user to commit the update with its changesets to `main` and push it.
Otherwise, the preview must show publishing from GitHub Actions without warnings.

### 8. Configure trusted publishing

Run the command below, confirm the operation, and complete browser-based two-factor authentication.

```sh
npm trust github package-name \
  --repo OWNER/REPO \
  --file publish.yml \
  --env npm \
  --allow-publish

npm trust list package-name
```

[The configuration expires unless it publishes within two days](https://docs.npmjs.com/trusted-publishers/#trusted-publisher-configuration-expiry); `npm trust list` still shows an expired configuration, and publishing fails with `ENEEDAUTH`.
In that case, revoke it with `npm trust revoke` and repeat this step.

### 9. Remove this checklist

```sh
sed -i.bak -e '/^\/bootstrap\.md$/d' .git/info/exclude
rm .git/info/exclude.bak

rm bootstrap.md
```

### 10. Report to the user

Send the user the message below, and stop.

````markdown
npm now trusts the publishing workflow of `OWNER/REPO`, and publishing setup is complete.

Within two days, before the trust expires unused, release the first update by running in this directory:

```sh
bun run release
```

It shows the release, asks for confirmation, and publishes it from GitHub Actions with provenance.
````
