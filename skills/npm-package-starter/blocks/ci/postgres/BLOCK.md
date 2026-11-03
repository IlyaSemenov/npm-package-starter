# ci/postgres

Adds a PostgreSQL service to the GitHub Actions test job.

## Apply

Merge into the matching file:

- `.github/workflows/test.yml`

## Notes

- This is an optional block for packages whose tests need PostgreSQL in CI.
- Merge `services.postgres` into `jobs.test`.
- Add `DATABASE_URL` to the existing `Test package` step.
- Keep the runtime block's install, build, and test commands unchanged.
