## 1) Итого
- Статус: ✅
- Задача: Стабилизировать sync-ключ фильтра в `CardListColumn`
- Ветка: `feature/ds-004-filter-sync-key-stability`
- Коммиты: `не создавались`
- PR: не создавался

## 2) Что сделано
- [tokens] Изменений нет.
- [ui] В `CardListColumn` заменен `JSON.stringify(filterValue ?? {})` на стабильный ключ через сортировку ключей (`getStableFilterKey`), чтобы исключить ложную ресинхронизацию при эквивалентных фильтрах с разным порядком полей.
- [ui] В `CardListColumn.smoke.test.tsx` добавлен тест `does not treat reordered filter keys as a new sync value`, который фиксирует отсутствие ложной синхронизации при перестановке ключей в `filterValue`.
- [docs] Добавлен отчет задачи `DS-004`.

## 3) Измененные файлы
- `packages/ui/src/components/CardListColumn.tsx`
- `packages/ui/src/components/CardListColumn.smoke.test.tsx`
- `tasks/ds-004-filter-sync-key-stability/TASK.md`
- `tasks/ds-004-filter-sync-key-stability/REPORT.md`

## 4) Проверки
- Линт: ok
- Типы: ok
- Сборка: ok
- Тесты: ok

Команды:
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## 5) Риски и ограничения
- Текущий подход стабилизирует только фильтр (`CardListColumnFilter`) и не затрагивает логику sort-key, так как в сортировке фиксированная структура и риск порядка ключей отсутствует.
- Для очень больших фильтров стоимость сортировки ключей немного выше прямого `JSON.stringify`, но для реального размера `filterValue` в компоненте это незначимо.

## 6) Что осталось
- [ ] Опционально: создать коммит и PR для `DS-004`.
