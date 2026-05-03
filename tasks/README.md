# Design System Tasks

Папка для задач по развитию дизайн-системы.

## Рекомендуемый формат

- Одна задача = одна подпапка `tasks/<id-slug>/`.
- В подпапке:
  - `TASK.md` - постановка (по `docs/AGENT_TASK_TEMPLATE.md`).
  - `PLAN.md` - детальный план для нетривиальных задач (опционально).
  - `REPORT.md` - результат выполнения (по `docs/AGENT_REPORT_TEMPLATE.md`).

## Быстрый шаблон

- Title:
- Goal:
- Scope in:
- Scope out:
- Status: todo | in-progress | done
- Validation:
- Notes:

## Текущие задачи

- `ds-013-card-list-column-mobile` - done — `CardListColumn`: `mobileLayout` off/auto/on, сетка 1 колонка, `AprilMobileShellBar` + `AprilVaulBottomSheet`; Mobile lab «Колонка карточек»; см. `TASK.md`, `REPORT.md`.
- `ds-012-mobile-bottom-panel` - done — `AprilMobileShellBar`, `AprilMobileBottomSheet`, inset; **Mobile lab** — список разделов + полноэкранные демо в `MobileShowcase.tsx`; норма **один активный контекст** в нижней панели — `DESIGN_SYSTEM.md` §8; см. `TASK.md`, `REPORT.md`.
- `ds-011-card-list-column-views` - done — `CardListColumn`: три вида (свернуто / список / сетка), выбор, аватар, документация и витрина.
- `ds-009-gradient-segmented-control` - градиентный `SegmentedControl` (паттерн Mantine UI + бренд April), обёртка, витрина, документация.
- `ds-008-april-icons` - коллекция UI-иконок (Lucide), обёртка, витрина в `UIKit`, документация.
- `ds-001-card-list-column` - реализация компонента Card List Column.
- `ds-002-testing-infrastructure` - внедрение инфраструктуры тестирования UI-компонентов.
- `ds-003-card-list-column-tests` - создание тестов для Card List Column.
- `ds-005-registry-npm-publish` - публикация `@april/ui` / `@april/tokens` в приватный npm registry (эпик 049 AprilHub).
