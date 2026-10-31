## Overview

Read the user documentation in [docs/](docs/) completely before changing the public API, package behavior, supported runtimes, or user documentation.

## Documentation

- Keep user documentation in the VitePress site in `docs/`, published to GitHub Pages; keep `README.md` short and link to the site.
- Add every new page to the sidebar in `docs/.vitepress/config.ts`.
- Update the affected site pages together with a change to the public API or behavior.

## Checks

- Run the `docs:build` script when site pages or the VitePress configuration change.
