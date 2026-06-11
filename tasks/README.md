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

## P1 — Расширение для LKFL (каталог + геймификация)

- `ds-016-status-chip` — todo — **StatusChip**: индикатор состояния с цветовой индикацией, пульсацией, dot/chip variant, mobile-адаптив; Showcase секция 21.
- `ds-017-benefit-card` — todo — **BenefitCard**: карточка льготы/активности (title, status, price, progress, quickAction); mobile — полноширинный стек; Showcase секция 22. Зависит от ds-016.
- `ds-018-quick-actions-grid` — todo — **QuickActionsGrid**: адаптивная сетка быстрых действий (2/3/4 колонки); Showcase секция 23.
- `ds-019-gamified-progress` — todo — **GamifiedProgress**: визуальный прогресс с наградой, CSS animation, ARIA progressbar; Showcase секция 24.
- `ds-020-achievement-badge` — todo — **AchievementBadge**: значок достижения (bronze/silver/gold/platinum) с тултипом; Showcase секция 25.
- `ds-021-empty-state-illustration` — todo — **EmptyStateIllustration**: пустые состояния (title + description + CTA + optional icon); Showcase секция 26.
- `ds-022-smart-bundle` — todo — **SmartBundle**: пакет льгот (expandable список, discount badge, CTA); mobile — свёрнуто по умолчанию; Showcase секция 27. Зависит от ds-016.
- `ds-023-faceted-search` — todo — **FacetedSearch**: фильтры каталога (checkbox/radio/range/select); desktop — inline/drawer, mobile — BottomSheet; Showcase секция 28.

## Текущие задачи

- `ds-031-card-appearance` — done — **CardAppearance**: `AprilCardBanner`, `AprilCatalogCard`, `AprilCardAppearanceEditor`, типы + валидаторы, CSS-паттерны, Showcase секция 36; запрос от LKFLv2.
- `ds-024-product-header-padding` — todo — **AprilProductHeader**: проп `px` (переопределение горизонтального padding), проброс `className`/`style` на корневой `Box`; non-breaking; Showcase + тесты; запрос от LKFL.
- `ds-015-april-profile-task-078-mobile-shell-bar` - done — **april-profile задача 078**: a11y триггер поиска, тесты controlled/`position`, patch **0.1.10**; `TASK.md`, `PLAN.md`, `REPORT.md`.
- `ds-014-april-profile-1-issue-75` - done — **075** / GPR: `TASK.md`, `REPORT.md`; отчёт в `april-profile` `tasks/075-external-DisignApril-ds-packages-gpr-publish/REPORT.md`; канон публикации — DisignApril `publish-april-packages.yml` (см. отчёты).
- `ds-013-card-list-column-mobile` - done — `CardListColumn`: `mobileLayout` off/auto/on, сетка 1 колонка, `AprilMobileShellBar` + `AprilVaulBottomSheet`; Mobile lab «Колонка карточек»; см. `TASK.md`, `REPORT.md`.
- `ds-012-mobile-bottom-panel` - done — `AprilMobileShellBar`, `AprilMobileBottomSheet`, inset; **Mobile lab** — список разделов + полноэкранные демо в `MobileShowcase.tsx`; норма **один активный контекст** в нижней панели — `DESIGN_SYSTEM.md` §8; см. `TASK.md`, `REPORT.md`.
- `ds-011-card-list-column-views` - done — `CardListColumn`: три вида (свернуто / список / сетка), выбор, аватар, документация и витрина.
- `ds-009-gradient-segmented-control` - градиентный `SegmentedControl` (паттерн Mantine UI + бренд April), обёртка, витрина, документация.
- `ds-008-april-icons` - коллекция UI-иконок (Lucide), обёртка, витрина в `UIKit`, документация.
- `ds-001-card-list-column` - реализация компонента Card List Column.
- `ds-002-testing-infrastructure` - внедрение инфраструктуры тестирования UI-компонентов.
- `ds-003-card-list-column-tests` - создание тестов для Card List Column.
- `ds-005-registry-npm-publish` - публикация `@april/ui` / `@april/tokens` в приватный npm registry (эпик 049 AprilHub).
