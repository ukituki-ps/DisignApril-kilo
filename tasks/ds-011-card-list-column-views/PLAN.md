## Мета

- Задача / ID: DS-011 Card List Column views
- Постановка: `tasks/ds-011-card-list-column-views/TASK.md`
- Статус плана: выполнен

## Контекст

- Пакет `packages/ui`, компонент `CardListColumn`, витрина через `CardListColumnSection` в `UIKit`.
- Зависимость от DS-010 (`AprilModal`) — без изменений паттерна модалок.

## Целевой результат

- Три вида `list` | `grid` | `collapsed`, цикл одной кнопкой; опционально controlled `view` / `onViewChange`.
- Выбор элемента, аватар/иконка в дефолтном списке и сетке; типы и экспорт в `index.ts`.
- Подмодули в `cardListColumn/`; документация §13; smoke-тесты и витрина.

## Фазы / шаги

1. Утилиты вида и подкомпоненты карточек списка/сетки.
2. Рефакторинг `CardListColumn.tsx`: состояние вида и выбора, разметка трёх видов, load more в сетке.
3. Showcase, `DESIGN_SYSTEM.md`, тесты, проверки `pnpm lint/typecheck/build/test`.

## Риски и откат

| Риск | Митигация |
|------|-----------|
| Ломаются тесты на старые `aria-label` свёрнуть/развернуть | Заменить сценарии на цикл видов. |
| Кастомный `renderCard` без выбора | Обёртка с `onClick` для выбора вокруг слота. |

## Проверка

- `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`
