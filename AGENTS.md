# DisignApril — Agent Context

## Язык общения

ВСЕГДА отвечай на русском языке: сообщения в чат, комментарии, commit messages, отчёты и планы. Исключение: имена файлов, переменные, ошибки — оставляй как есть.

## Before starting a task

1. Read `README.md` — monorepo structure and packages
2. Read `DESIGN_SYSTEM.md` — product rules and design contracts
3. Read `docs/DOCUMENTATION_MAP.md` — documentation map
4. Read `docs/DEVELOPMENT_WORKFLOW.md` — development sequence
5. Read `docs/COMPONENT_STANDARDS.md` — component quality criteria
6. Check `tasks/` — current task boundaries

## Fixed Stack

**Build:** pnpm monorepo
**UI:** React + TypeScript, Mantine core, custom April components
**Tokens:** CSS variables, colors, density, logo filters
**Showcase:** Vite dev server with component gallery
**Publishing:** GitHub Packages (npm registry), semver

Do not replace these technologies without explicit request.

## Project Structure

- `packages/tokens/` — `@ukituki-ps/april-tokens` (CSS vars, theme)
- `packages/ui/` — `@ukituki-ps/april-ui` (Mantine theme, providers, component library)
- `apps/showcase/` — `@april/showcase` (component gallery, dev server)
- `docs/` — development workflow, testing, publishing, agent templates
- `tasks/` — task folders (`ds-NNN-slug/`) with TASK.md, PLAN.md, REPORT.md

## Code Conventions

### TypeScript / React
- Strict TypeScript
- Functional components and hooks
- UI: Mantine as base; April-specific wrappers and patterns
- Naming: consistency with existing component structure
- Accessibility and semantics per product requirements

### Mobile (<768px)
- `AprilMobileShellBar` — single active context: when modal/bottom sheet is open, show only its buttons, not global screen tabs
- See `DESIGN_SYSTEM.md` §8 Mobile and §11

### UI Kit Import Rule
- `UIKit` is development-only (gallery, Kanban, React Flow demos)
- Do not import `UIKit` in production examples or library exports
- Production components must be individually available without UIKit dependency

### Comments
- Comment non-obvious implementation choices
- No commented-out dead code
- Language: follow existing convention per file

## Git Workflow

- Default branch: `main`
- Work in feature branches
- Merge via PR with clear commit messages

## Task Execution

1. Check existing tasks in `tasks/` before starting new work
2. For visual changes: update showcase (`apps/showcase`) alongside library
3. When changing tokens/patterns: sync documentation (`DESIGN_SYSTEM.md` and/or `docs/*`)
4. For non-trivial tasks: create `PLAN.md` per `docs/AGENT_PLAN_TEMPLATE.md`
5. Deliver end-to-end: analysis → code → verification → documentation
6. Final report per `docs/AGENT_REPORT_TEMPLATE.md` saved as `tasks/<ds-NNN-slug>/REPORT.md`

## Testing & Build Commands

```bash
# Mandatory checks before any PR
pnpm lint
pnpm typecheck
pnpm build

# Tests
pnpm test              # Vitest + RTL tests for @ukituki-ps/april-ui
pnpm test:watch        # Watch mode
```

## Documentation

- Design contracts: `DESIGN_SYSTEM.md`
- Component standards: `docs/COMPONENT_STANDARDS.md`
- Development workflow: `docs/DEVELOPMENT_WORKFLOW.md`
- Documentation map: `docs/DOCUMENTATION_MAP.md`
- Publishing (GitHub Packages): `docs/PUBLISHING.md`
- Testing strategy: `docs/TESTING_STRATEGY.md`
- Task templates: `docs/AGENT_TASK_TEMPLATE.md`, `docs/AGENT_PLAN_TEMPLATE.md`, `docs/AGENT_REPORT_TEMPLATE.md`