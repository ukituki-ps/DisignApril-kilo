## Мета

- Задача / ID: DS-010 — модалки: действия в шапке, скролл тела
- Постановка: `tasks/ds-010-modal-header-actions/TASK.md`
- Статус плана: выполнен

## Контекст

- Пакет `packages/ui`, Mantine 7 `Modal`.
- Эталонные примеры: `ModalSection`, `SafetyPatterns`, встроенные модалки `CardListColumn`.

## Целевой результат

- Публичный `AprilModal` с `headerTitle` / `headerActions` и фиксированной шапкой при скролле тела.
- Документация: `DESIGN_SYSTEM.md`, `docs/COMPONENT_STANDARDS.md`, описание секции в `UIKit`.
- Тесты смоки без регрессий.

## Фазы / шаги

1. Реализовать `AprilModal` (слияние `styles` для `content` / `body`).
2. Перевести `ModalSection`, `SafetyPatterns`, `CardListColumn` на `AprilModal`; JSDoc для `renderFilterModal` / `renderSortModal`.
3. Экспорт из `index.ts`, обновить гайды.
4. `pnpm lint` / `typecheck` / `build` / `test`, отчёт `REPORT.md`.

## Риски и откат

| Риск | Митигация |
|------|-----------|
| Кастомные `renderFilterModal` без шапки-действий | Документировано в JSDoc; встроенный дефолт следует DS. |
| Невалидная вложенность в `ModalTitle` | Разметка заголовка через `span` + phrasing-контент. |

## Проверка

- `pnpm lint && pnpm typecheck && pnpm build && pnpm test`
