---
description: Prepare commit and branch for submission
---
Prepare a clean commit for submission. Follow these steps:

1. Run `git status` and `git diff` to review all changes
2. Ensure AGENTS.md rules followed: tests pass (run `/quality`), no UIKit in production, showcase updated alongside library changes
3. Stage relevant files: `git add <changed-files>`
4. Write conventional commit message: `<type>(<scope>): <subject>` where type is feat|fix|refactor|chore|docs|test
5. Create commit
6. Show the diff from main: `git log main..HEAD --oneline`
7. If ready for PR, show PR-ready summary: what changed, test evidence, risks

Use Russian or English commit language matching the existing convention in this repo.