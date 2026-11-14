# Changesets

This folder is managed by `@changesets/cli` and stores release notes for pending version changes.
See the [Changesets documentation](https://github.com/changesets/changesets) for the workflow and file format.

## Adding a changeset

- Add one `.changeset/*.md` file for each independently releasable user-visible change.
- Do not add changesets for internal refactors, maintenance, tests, or documentation changes that do not require a package release.
- Choose the SemVer bump from the public contract: `patch` for backward-compatible fixes and `minor` for backward-compatible functionality.
- Before 1.0, use `minor` for breaking changes; starting with 1.0, use `major` and remove this rule.
- Create `.changeset/<unique-name>.md` with this format:

```markdown
---
"package-name": patch
---

Describe the user-visible change.
```

- Briefly describe the user-observable change or new capability in the public contract, without implementation details or rationale.
  Prefer a single sentence.
- For a fix, describe the problem users saw, not how the fix works:
  - Avoid: "Compare cache keys by the normalized path instead of the raw argument."
  - Prefer: "Fix stale results when the same file is passed through different relative paths."
- Do not edit the package version or `CHANGELOG.md` by hand, and do not run `changeset version` or `changeset publish`; the maintainer releases pending changesets.
