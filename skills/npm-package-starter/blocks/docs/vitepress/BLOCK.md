# docs/vitepress

Adds a VitePress documentation site published to GitHub Pages.

## Apply

Copy to the project root:

- `.github/workflows/docs.yml`
- `docs/`

Merge into the matching files:

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
  - after the workflow permissions command, add `gh api --method POST repos/OWNER/REPO/pages -f build_type=workflow` to enable GitHub Pages before the first push.
- GitHub Pages requires a public repository or a paid plan; for another private repository, ask the user before applying this block.

## Notes

- Append the `tsconfig.json` `include` entry to the runtime block's list.
- In `AGENTS.md`, replace the Overview sentence about reading `README.md` with the fragment's sentence, put the Documentation bullets at the start of that section, write "public documentation" instead of "public README" in its other bullets, and append the Checks bullet.
- With `runtime/pnpm`, replace `bun install --frozen-lockfile` and `bun run docs:build` in `docs.yml` with `pnpm install --frozen-lockfile` and `pnpm run docs:build`.
- Keep `docs.yml` on the same `actions/checkout` and mise versions as `test-and-release.yml`.
