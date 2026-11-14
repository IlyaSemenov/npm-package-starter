# docs/vitepress

Adds a VitePress documentation site published to GitHub Pages.

## Apply

Copy to the project root:

- `.github/workflows/docs.yml`
- `docs/`

Merge into the matching files:

- `.github/workflows/test.yml`
- `.gitignore`
- `AGENTS.md`
- `package.json`
- `tsconfig.json`

## Review

- Replace `package-name`, `description`, `OWNER`, and `REPO` in `docs/` and `package.json` under the same rules as in `base`.
  Write `OWNER` in lowercase in `github.io` URLs.
- After the title of `README.md`, add a paragraph `See the [documentation](https://OWNER.github.io/REPO/).`
- In `bootstrap.md`, step 3:
  - set `--homepage` of `gh repo edit` to `https://OWNER.github.io/REPO/`;
  - at the end of the step, add `gh api --method POST repos/OWNER/REPO/pages -f build_type=workflow` to enable GitHub Pages before the first push.
- GitHub Pages requires a public repository or a paid plan; for another private repository, ask the user before applying this block.

## Notes

- Append the `tsconfig.json` `include` entry to the runtime block's list.
- In `AGENTS.md`, replace the Overview sentence about reading `README.md` with the fragment's sentence, put the Documentation bullets at the start of that section, write "public documentation" instead of "public README" in its other bullets, and append the Checks bullet.
- Insert the test workflow fragment after `Test package`; with `release/changesets-action`, merge it into the `test-and-release` job of `test-and-release.yml`.
- With `release/changesets-local`, append `bun run docs:build` to the `release:check` script.
- With `runtime/pnpm`, replace `bun install --frozen-lockfile` with `pnpm install --frozen-lockfile` in `docs.yml`, and `bun run docs:build` with `pnpm run docs:build` in `docs.yml`, the test workflow, and `release:check`.
- Keep `docs.yml` on the same `actions/checkout` and mise versions as `test.yml`, or `test-and-release.yml` with `release/changesets-action`.
