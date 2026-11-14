# User documentation

How to write the user documentation of the package in `README.md`.

## Content

- Write user documentation as a guide to using the API in plain terms: what to call and what it does, not how it is typed or implemented.
- Start each section from what users want to achieve in their application, such as retrying failed requests, rather than from a description of the package or its concepts.
  Name only a task that users really have; when none fits, state plainly what the API does instead of inventing a task for a "To …" opening.
  Open with a short statement of the common case and its example, and put details, alternatives, and edge cases after the example.
- Other things being equal, write the happy path as an instruction of what to do, such as "Pass the options to `connect`", rather than as a description of the API, such as "`connect` takes options".
  This is a preference, not a rule: keep a description wherever it reads more clearly.
- Do not restate in prose what users see in their editor's types or learn from a TypeScript or runtime error.
- Mention an edge case only when users must write different code because of it; cover other edge cases with tests.
- Write a rule that users must follow as an instruction, such as to call `close` before the process exits, rather than as the check or error that enforces it.
