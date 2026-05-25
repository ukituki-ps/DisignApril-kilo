# План задачи ds-023 — FacetedSearch

## Мета

- Задача / ID: ds-023-faceted-search
- Постановка: `tasks/ds-023-faceted-search/TASK.md`
- Статус плана: завершено

## Контекст

- Репозиторий: `DisignApril`, пакет `@ukituki-ps/april-ui`
- Зависимости: Mantine (Checkbox, Radio, RangeSlider, Select, Drawer, Badge, Button, TextInput), `AprilVaulBottomSheet` (уже в DS)
- Не добавлять новые зависимости
- Прототип: `docs/Прототип ЛК физика(1).html` — `.catalog-toolbar`, `.filter-pills`, `.search-box`

## Целевой результат

- Компонент `FacetedSearch` с типами `Facet`, `FacetOption`
- Режимы: inline, drawer, auto
- Мобильный: `AprilVaulBottomSheet`
- Тесты, showcase секция 28, экспорт в index.ts

## Фазы / шаги

1. [x] Создать `FacetedSearch.tsx` — типы, компонент (checkbox, radio, range, select facets)
2. [x] Добавить режимы inline/drawer/auto + mobile BottomSheet
3. [x] Написать `FacetedSearch.test.tsx`
4. [x] Создать `FacetedSearchSection.tsx` для UIKit секции 28
5. [x] Добавить секцию 28 в `UIKit.tsx`
6. [x] Экспорт в `index.ts`
7. [x] Проверки: lint, typecheck, build, test

## Риски и откат

| Риск | Митигация |
|------|-----------|
| RangeSlider не в Mantine core | Использовать `@mantine/core` — RangeSlider там есть |
| Сложность mobile-режима | Использовать готовый `AprilVaulBottomSheet` |

## Проверка

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```
