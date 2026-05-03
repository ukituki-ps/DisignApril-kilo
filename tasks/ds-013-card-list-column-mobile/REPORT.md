## 1) Итого
- Статус: ✅
- Задача: Удаление вида **`collapsed`** у `CardListColumn` (тип `CardListColumnView`, цикл видов, разметка, проп `emptySelectionLabel`)
- Ветка: `main`
- Коммиты: один коммит на `main` — `feat(ui): remove CardListColumn collapsed view` (хеш: `git log -1 --format=%h`)
- PR: не создавался

## 2) Что сделано
- **[ui]** `CardListColumnView` = `'list' | 'grid'`; цикл `getNextCardListColumnView` — `list` ↔ `grid`; убраны узкая rail-разметка, иконка `PanelLeftCloseIcon`, проп **`emptySelectionLabel`**.
- **[ui]** `packages/ui/src/components/cardListColumn/viewCycle.ts` — подписи и порядок без `collapsed`.
- **[showcase]** `CardListColumnSection.tsx` — текст подсказки про виды.
- **[docs]** `DESIGN_SYSTEM.md` §8 (деградация сложных виджетов) и §13 (Card List Column) приведены к двум видам.
- **[tasks]** `tasks/ds-013-card-list-column-mobile/TASK.md` — актуализированы контекст и открытые вопросы (убран пункт про rail `collapsed`).
- **[tests]** `CardListColumn.smoke.test.tsx` — сценарий цикла `list` → `grid` → `list`.

## 3) Измененные файлы
- `packages/ui/src/components/cardListColumn/viewCycle.ts`
- `packages/ui/src/components/CardListColumn.tsx`
- `packages/ui/src/components/CardListColumnSection.tsx`
- `packages/ui/src/components/CardListColumn.smoke.test.tsx`
- `DESIGN_SYSTEM.md`
- `tasks/ds-013-card-list-column-mobile/TASK.md`
- `tasks/ds-013-card-list-column-mobile/REPORT.md`

## 4) Проверки
- Линт: ok
- Типы: ok
- Сборка: ok
- Тесты (`pnpm test`): ok

Команды:
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## 5) Риски и ограничения
- **Breaking change для потребителей `@april/ui`:** значение `'collapsed'` в `view` / `defaultView` и проп **`emptySelectionLabel`** больше не поддерживаются; при сохранённом в `localStorage` значении `'collapsed'` нужна миграция на `'list'` или `'grid'` на стороне продукта.
- Исторические задачи **`tasks/ds-011-*`** описывают трёхвидовый API; архив постановок не переписывался.

## 6) Что осталось
- [ ] При желании: синхронизировать архив `tasks/ds-011-card-list-column-views/*.md` с текущим контрактом (косметика для читателей репозитория).
