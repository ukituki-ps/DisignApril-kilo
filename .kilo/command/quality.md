---
description: Run the DisignApril quality gate (lint + typecheck + build)
---
Run the mandatory quality gate for DisignApril.

Execute (in order, stop on first failure):
1. `pnpm lint` — ESLint across apps/showcase and packages/
2. `pnpm typecheck` — TypeScript strict check
3. `pnpm build` — Build @ukituki-ps/april-tokens + @ukituki-ps/april-ui

If any step fails: fix the failures. Re-run the full pipeline until all pass.
Report final status: PASS or FAIL with summary of each step.