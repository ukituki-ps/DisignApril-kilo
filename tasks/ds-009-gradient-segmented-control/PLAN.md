## Мета

- Задача / ID: DS-009 — градиентный SegmentedControl
- Постановка: `tasks/ds-009-gradient-segmented-control/TASK.md`
- Статус плана: выполнен

## Контекст

- Пакет `packages/ui`, Mantine 7 peer; витрина через alias на `src` в `apps/showcase`.
- Рецепт Mantine UI визуально воспроизведён через проп **`styles`** у `SegmentedControl`: при `tsup` + `local-css` классы из CSS module попадали в `dist` как пустой объект, поэтому для публикуемого бандла выбраны только inline-стили (CSS-переменные Mantine).

## Целевой результат

- Публичный компонент `AprilGradientSegmentedControl`, экспорт из `index.ts`.
- Секция **§20** в `UIKit`, тесты Vitest, обновление `DESIGN_SYSTEM.md` и `COMPONENT_STANDARDS.md`.

## Фазы / шаги

1. Компонент + дефолтные `styles` + поверхностный merge пользовательских `styles`.
2. Секция витрины, тесты, документация, отчёт.

## Риски и откат

| Риск | Митигация |
|------|-----------|
| Потребители registry без пересборки не увидят изменения | Semver релиз по `docs/PUBLISHING.md`. |
| Пользовательский `styles` перезаписывает целой частью ключ | Ожидаемо при shallow merge; глубокие правки — через `styles` как функцию и явное объединение в продукте. |

## Проверка

- `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`.
