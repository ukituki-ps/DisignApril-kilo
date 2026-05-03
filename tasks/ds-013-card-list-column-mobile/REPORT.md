## 1) Итого
- Статус: ✅
- Задача: DS-013 — mobile `CardListColumn` (нижняя панель, одна колонка карточек, Vaul)
- Ветка: `feature/ds-013-card-list-column-mobile` (локально; коммит — автор)
- PR: не создавался

## 2) Что сделано
- **[ui]** Пропы `mobileLayout` (`off` | `auto` | `on`, по умолчанию `off`), `mobileShellBarPosition`, `mobileShellLeading`; `useMediaQuery('(max-width: 47.99em)')` для `auto`.
- **[ui]** На mobile: только **сетка** с одной колонкой; скрыты цикл видов, inline-поиск и ресайз; **`AprilMobileShellBar`** с поиском, фильтром, сортировкой, add; **`AprilVaulBottomSheet`** вместо `AprilModal` для трёх сценариев; действия листа в панели (один контекст); отступ скролла через `aprilMobileShellBarContentPaddingBottom()`.
- **[ui]** Экспорт типа `CardListColumnMobileLayout` из `index.ts`.
- **[showcase]** Mobile lab: раздел **«Колонка карточек»** (`PageCardListColumn`) без второй глобальной нижней панели — только шапка продукта и колонка с `mobileShellBarPosition="fixed"`.
- **[docs]** `DESIGN_SYSTEM.md` §13 — подпункт mobile для Card List Column.
- **[tests]** Smoke: `mobileLayout="on"` — наличие `[data-april-mobile-shell-bar]`, отсутствие поиска внутри Paper.

## 3) Измененные файлы
- `packages/ui/src/components/CardListColumn.tsx`
- `packages/ui/src/components/CardListColumn.smoke.test.tsx`
- `packages/ui/src/index.ts`
- `apps/showcase/src/MobileShowcase.tsx`
- `DESIGN_SYSTEM.md`
- `tasks/ds-013-card-list-column-mobile/TASK.md`
- `tasks/ds-013-card-list-column-mobile/PLAN.md`
- `tasks/README.md`

## 4) Проверки
- Линт: ok
- Типы: ok
- Сборка: ok (корневой `pnpm typecheck` включал сборку `april-ui`)

Команды:
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## 5) Риски и ограничения
- **`mobileLayout="auto"`** в узком iframe на десктопе включит mobile-режим — при необходимости продукт задаёт `mobileLayout="off"` или `isMobile` можно позже вынести в явный проп без media query.
- **Кастомные** `renderFilterModal` / `renderSortModal` на mobile: в панели только **«Закрыть»**; применение — в теле колбэка (как на десктопе без `headerActions`).
- **Две** нижние панели возможны, если встроить колонку с `fixed` в экран, где уже есть глобальный shell — в постановке и демо «Колонка карточек» layout без глобального `AprilMobileShellBar` оболочки раздела.

## 6) Что осталось
- [ ] По желанию: Kanban-rail + `collapsed` на очень узкой ширине (открытый вопрос в `TASK.md`).
- [ ] Виртуализация длинных списков — вне scope.
