# Bootstrap package-name

This local checklist sets up publishing for `package-name` in two phases:

1. Initial publication: publish the first version with a temporary npm token.
2. First update: configure npm Trusted Publishing (OIDC) and publish the next version with it.

Run phase 2 only when the first update is ready to publish, even if that is years after phase 1.
A new Trusted Publisher expires unless it publishes within two days, so it cannot be configured in advance.

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

Create the repository without pushing yet, so its Actions permissions and temporary npm secret are ready before the first workflow starts.

```sh
gh repo create OWNER/REPO \
  --REPOSITORY_VISIBILITY \
  --source=. \
  --remote=origin

gh repo edit OWNER/REPO \
  --description "description" \
  --homepage "https://www.npmjs.com/package/package-name" \
  --add-topic REPOSITORY_TOPICS

gh api --method PUT repos/OWNER/REPO/actions/permissions/workflow \
  -f default_workflow_permissions=write \
  -F can_approve_pull_request_reviews=true
```

### 4. Create the temporary npm token

Trusted Publishing needs an existing package, so the initial version is published with a token that is deleted in step 6.

Run the command below.
It asks for the account password in the terminal, then opens a browser for two-factor authentication, and prints the token.

```sh
npm token create \
  --name=REPO-bootstrap \
  --expires=7 \
  --bypass-2fa \
  --packages='*' \
  --packages-and-scopes-permission=read-write \
  --orgs-permission=no-access
```

Copy the printed token, then run the command below and paste it at the prompt.

```sh
gh secret set NPM_TOKEN --repo OWNER/REPO
```

Do not pass the token through chat, a command argument, or a file.
Clear the token from the clipboard after the secret is set.

### 5. Publish the initial version

Push the initial commit and wait for the workflow to open the Version pull request.

```sh
git push -u origin main
gh run watch --exit-status
```

Merge the Version pull request.

```sh
VERSION_PR="$(
  gh pr list \
    --state open \
    --search '"Version " in:title' \
    --json number \
    --jq '.[0].number'
)"
test -n "$VERSION_PR" &&
  gh pr merge "$VERSION_PR" --rebase --delete-branch
unset VERSION_PR
```

Wait for the release workflow and confirm that the released version exists on npm and as a GitHub Release.

```sh
gh run watch --exit-status
git pull --ff-only
RELEASE_VERSION="$(node -p 'require("./package.json").version')"
npm view "package-name@$RELEASE_VERSION" version --prefer-online &&
  gh release view "v$RELEASE_VERSION" --repo OWNER/REPO
unset RELEASE_VERSION
```

[npm scans new versions before serving them](https://github.blog/changelog/2026-07-28-npm-publish-time-malware-scanning-and-dual-use-metadata/), usually for about five minutes, so `npm view` can return 404 at first.
Repeat the check until it passes; do not republish.

### 6. Remove the temporary token

Delete the GitHub secret.

```sh
gh secret delete NPM_TOKEN --repo OWNER/REPO
```

On the npm website, open the profile menu, select Access Tokens, and delete the token named `REPO-bootstrap`.

In `.github/workflows/test-and-release.yml`, remove the `# Bootstrap only` comment, the `env` block with `NODE_AUTH_TOKEN` below it, and the blank line before the comment.

```sh
git add .github/workflows/test-and-release.yml
git commit -m "Remove npm bootstrap token"
git push
```

### 7. Report to the user

Keep this file and its exclude rule for phase 2.
Send the user the message below with `VERSION` filled in, and stop.

````markdown
`package-name@VERSION` is published to npm and GitHub Releases. The temporary npm token is deleted.

The release workflow now has no npm credentials. npm Trusted Publishing is configured right before the first update is published, because it expires if unused for two days. Until then, merging a Version pull request will fail to publish.

Keep `bootstrap.md`. When the Version pull request for the first update is open, start an agent in this directory and send:

```text
Publish the first update following phase 2 of bootstrap.md.
```
````

## Phase 2: First update

### 8. Check readiness

Run the authentication check from step 1, then find the Version pull request for the first update.

```sh
gh pr list \
  --state open \
  --search '"Version " in:title'
```

If there is none, stop and tell the user to push the update with its changesets to `main` and wait for the workflow to open the Version pull request.

### 9. Configure Trusted Publishing

Run the command below, confirm the operation, and complete browser-based two-factor authentication.

```sh
npm trust github package-name \
  --repo OWNER/REPO \
  --file test-and-release.yml \
  --allow-publish

npm trust list package-name
```

[The configuration expires unless it publishes within two days](https://docs.npmjs.com/trusted-publishers/#trusted-publisher-configuration-expiry); `npm trust list` still shows an expired configuration, and publishing fails with `ENEEDAUTH`.
In that case, revoke it with `npm trust revoke` and repeat this step.

### 10. Publish the first update

Merge the Version pull request and verify the release with the commands from step 5, including the npm scanning delay.

### 11. Remove this checklist

```sh
sed -i.bak -e '/^\/bootstrap\.md$/d' .git/info/exclude
rm .git/info/exclude.bak

rm bootstrap.md
```

Tell the user that the first update is published with Trusted Publishing and publishing setup is complete.
