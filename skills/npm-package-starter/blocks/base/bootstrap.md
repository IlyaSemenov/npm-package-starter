# Bootstrap package-name

This is a local, one-time checklist for publishing `package-name`.
Do not commit this file.
It is excluded by `.gitignore` until the final cleanup.

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

Create the repository without pushing yet, so its Actions permissions and temporary npm secret are ready before the first workflow starts.

```sh
gh repo create OWNER/REPO \
  --REPOSITORY_VISIBILITY \
  --source=. \
  --remote=origin

gh api --method PUT repos/OWNER/REPO/actions/permissions/workflow \
  -f default_workflow_permissions=write \
  -F can_approve_pull_request_reviews=true
```

## 4. Create the temporary npm publishing token

The package does not exist yet, so Trusted Publishing cannot be configured before the first release.
This bootstrap token can publish packages, but expires after one day and is removed after the first release.
The command passes it directly from npm to GitHub without writing it to disk or shell history.

```sh
NPM_BOOTSTRAP_TOKEN="$(
  npm token create \
    --name REPO-bootstrap \
    --expires 1 \
    --packages-all \
    --packages-and-scopes-permission read-write \
    --bypass-2fa \
    --json |
    node -pe 'JSON.parse(require("node:fs").readFileSync(0, "utf8")).token'
)" &&
  print -rn -- "$NPM_BOOTSTRAP_TOKEN" |
  gh secret set NPM_TOKEN --repo OWNER/REPO
unset NPM_BOOTSTRAP_TOKEN
```

## 5. Push and merge the version pull request

Push the initial commit and wait for the first workflow to create the Version pull request.

```sh
git push -u origin main
gh run watch --exit-status
```

Merge the generated Version pull request from the CLI.

```sh
VERSION_PR="$(
  gh pr list \
    --state open \
    --search '"Version " in:title' \
    --json number \
    --jq '.[0].number'
)"
test -n "$VERSION_PR" &&
  gh pr merge "$VERSION_PR" --squash --delete-branch
unset VERSION_PR
```

Wait for the release workflow and confirm that the package now exists on npm.

```sh
gh run watch --exit-status
npm view package-name version
```

Do not continue until both commands succeed.

## 6. Enable Trusted Publishing

The package now exists, so replace the temporary token with npm Trusted Publishing.

```sh
npm trust github package-name \
  --repo OWNER/REPO \
  --file test-and-release.yml \
  --allow-publish

npm trust list package-name
```

## 7. Remove the bootstrap credentials and workflow fallback

Delete the temporary secret from GitHub.

```sh
gh secret delete NPM_TOKEN --repo OWNER/REPO
```

Find the token named `REPO-bootstrap` and revoke it.

```sh
NPM_BOOTSTRAP_TOKEN_ID="$(
  npm token list --json |
    node -pe '
      JSON.parse(require("node:fs").readFileSync(0, "utf8"))
        .find(({ name }) => name === "REPO-bootstrap")?.key ?? ""
    '
)"
test -n "$NPM_BOOTSTRAP_TOKEN_ID" &&
  npm token revoke "$NPM_BOOTSTRAP_TOKEN_ID"
unset NPM_BOOTSTRAP_TOKEN_ID
```

Remove the bootstrap comment and `NPM_TOKEN` fallback from the workflow while preserving the blank line after `GITHUB_TOKEN`.
Remove the temporary `.gitignore` rule at the same time.

```sh
git pull --ff-only

sed -i.bak \
  -e '/# Bootstrap only\. Remove after configuring Trusted Publishing\./d' \
  -e '/NPM_TOKEN:.*secrets\.NPM_TOKEN/d' \
  .github/workflows/test-and-release.yml
rm .github/workflows/test-and-release.yml.bak

sed -i.bak -e '/^\/bootstrap\.md$/d' .gitignore
rm .gitignore.bak

git add .github/workflows/test-and-release.yml .gitignore
git commit -m "Use npm trusted publishing"
git push
```

Finally, delete this local checklist.

```sh
rm bootstrap.md
```
