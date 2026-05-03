## 1) Итого

- Статус: ✅
- Задача: DS-011 — три вида `CardListColumn` (list / grid / collapsed), выбор, аватар, документация и витрина
- Ветка: не создавалась (изменения в рабочем дереве)
- PR: не создавался

## 2) Что сделано

- [ui] Введён тип вида `CardListColumnView` (`list` | `grid` | `collapsed`) и цикл переключения одной кнопкой с подсказкой и `aria-label` вида «Следующий вид: …».
- [ui] Расширен `CardListColumnItem` (`imageUrl`, `avatarIcon`); пропсы `view` / `defaultView` / `onViewChange`, `selectedItemId` / `defaultSelectedItemId` / `onSelectItem`, `defaultListItemIcon`, `emptySelectionLabel`.
- [ui] Подмодули `packages/ui/src/components/cardListColumn/` (`types`, `viewCycle`, `DefaultListCard`, `GridItemCard`); свёрнутый вид показывает выбранный заголовок (или заглушку), сетка — CSS Grid и карточка с прогресс-плейсхолдером для витрины; ресайз ширины сохранён для `list` и `grid`.
- [ui] Клик по элементу в списке/сетке переключает выбор (повторный клик по выбранному снимает выбор); кастомный `renderCard` обёрнут в фокусируемую зону с клавиатурой Enter/Space.
- [showcase] `CardListColumnSection`: демо выбора, данные с `imageUrl` / `avatarIcon`, переключатель дефолтных и кастомных карточек, пояснение про виды.
- [docs] Обновлён `DESIGN_SYSTEM.md` §13 (Card List Column).
- [tests] Обновлён и расширен `CardListColumn.smoke.test.tsx` (цикл видов, выбор).

## 3) Измененные файлы

- `packages/ui/src/components/CardListColumn.tsx`
- `packages/ui/src/components/cardListColumn/types.ts`
- `packages/ui/src/components/cardListColumn/viewCycle.ts`
- `packages/ui/src/components/cardListColumn/DefaultListCard.tsx`
- `packages/ui/src/components/cardListColumn/GridItemCard.tsx`
- `packages/ui/src/components/CardListColumnSection.tsx`
- `packages/ui/src/components/CardListColumn.smoke.test.tsx`
- `packages/ui/src/index.ts`
- `DESIGN_SYSTEM.md`
- `tasks/ds-011-card-list-column-views/PLAN.md`
- `tasks/ds-011-card-list-column-views/REPORT.md`

## 4) Проверки

- Линт: ok
- Типы: ok
- Сборка: ok
- Тесты: ok (`@ukituki-ps/april-ui`, 65 тестов)

Команды:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## 5) Риски и ограничения

- Внешние URL картинок (`picsum.photos`) на витрине зависят от сети; для офлайн-CI это только dev/showcase.
- Дублирование разметки панели между `list` и `grid` — осознанный минимум в рамках scope; при дальнейшем росте имеет смысл вынести общий фрагмент.
- Виртуализация длинных сеток не делалась (вне scope).

## 6) Что осталось

- [ ] По желанию: заменить `SegmentedControl` в секции на `AprilGradientSegmentedControl` (см. DS-009 REPORT).
