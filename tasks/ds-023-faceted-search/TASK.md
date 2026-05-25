# ds-023 — FacetedSearch

## Мета
- ID: ds-023
- Ветка: `feature/ds-023-faceted-search`
- Приоритет: medium
- Фаза: P1 (каталог)
- Связанные: DS-expansion-ADR, `DESIGN_SYSTEM.md` §8 (Mobile), §11 (BottomSheet)

## Цель
Создать `FacetedSearch` — фильтры каталога для ускорения поиска в каталоге 1000+ позиций. Desktop: inline-панель или drawer. Mobile: `AprilVaulBottomSheet`.

## Контекст
- Репозиторий: `DisignApril`
- Пакет: `packages/ui`
- Showcase: `UIKit` (секция 28) + MobileShowcase
- Зависимость: `AprilVaulBottomSheet` (уже есть в DS)

## Входит в объем

### Компонент `FacetedSearch`
- **Файл:** `packages/ui/src/components/FacetedSearch.tsx`
- **Пропсы:**
  - `facets: Facet[]` — массив фильтров
  - `selected: Record<string, string[]>` — текущие выбранные значения (controlled)
  - `onChange: (selected: Record<string, string[]>) => void` — callback при изменении
  - `onClearAll?: () => void` — callback "Сбросить всё"
  - `searchValue?: string` — текст основного поиска (опционально, интегрированный)
  - `onSearchChange?: (value: string) => void` — callback поиска
  - `mode: "inline" | "drawer" | "auto"` — режим отображения (по умолчанию `"auto"`)
    - `"inline"`: фильтры отображаются inline (sidebar или top bar)
    - `"drawer"`: Mantine `Drawer` справа
    - `"auto"`: inline на desktop >=768px, drawer на mobile <768px
- **Тип `Facet`:**
  - `id: string` — уникальный ID фильтра
  - `label: string` — название фильтра ("Цена", "Тип", "Провайдер")
  - `type: "checkbox" | "radio" | "range" | "select"` — тип ввода
  - `options: FacetOption[]` — варианты (для checkbox/radio/select)
  - `min?: number` — min значение (для range)
  - `max?: number` — max значение (для range)
  - `unit?: string` — единица измерения (для range, "₽")
- **Тип `FacetOption`:**
  - `value: string` — значение
  - `label: string` — отображаемый текст
  - `count?: number` — количество результатов (опционально)
- **Layout:**
  - Header: "Фильтры" + "Сбросить всё" (показывает число активных фильтров)
  - Facets: вертикальный стек
    - Checkbox: Mantine `Checkbox.Group` с options
    - Radio: Mantine `Radio.Group`
    - Range: Mantine `RangeSlider`
    - Select: Mantine `Select`
  - Footer: кнопка "Применить" (для drawer/auto mode)
  - Mobile `<768px`: `AprilVaulBottomSheet` или `Drawer` (выбор через mode)
- **Состояния:**
  - Active filters count badge
  - Clear All кнопка (показывается когда есть активные)
  - Apply кнопка (drawer mode)
- **Доступность:**
  - `role="search"` на контейнере
  - Facet header: `aria-expanded` (если collapsible)
  - Checkbox/Radio группы: `aria-labelledby`
  - Clear All: `aria-label="Сбросить все фильтры"`
- **Density:** `useDensity()` → регулировка padding/gap
- **Темизация:** CSS variables, light/dark

### Тест `FacetedSearch.tsx.test.tsx`
- Рендер с facets
- Checkbox selection вызывает onChange
- Radio selection вызывает onChange
- Range selection вызывает onChange
- Clear All сбрасывает все фильтры
- Active count отображается
- Drawer mode opens on trigger

### Showcase `FacetedSearchSection.tsx`
- Basic: 2-3 фильтра (checkbox + radio)
- Complex: checkbox + radio + range + select
- Applied filters с count
- Mobile preview: drawer/BottomSheet

### Экспорт
- `FacetedSearch` + `FacetedSearchProps` + `Facet` + `FacetOption` + `FacetType` → `packages/ui/src/index.ts`

## Не входит в объем
- Storybook
- Visual regression
- Server-side filtering (onChange — сервис делает запрос)
- Debounce поиска (в сервисе)
- i18n-библиотека
- Infinite scroll результатов

## Ограничения
- Не добавлять новые зависимости
- Mantine компоненты (Checkbox, Radio, RangeSlider, Select, Drawer)
- AprilVaulBottomSheet для mobile (уже в DS)
- Controlled pattern: selected + onChange

## Сверка с прототипом
Верстку компонента сверить с `docs/Прототип ЛК физика(1).html`:
- Панель фильтров каталога (`.catalog-toolbar`, `.search-box`, `.filter-pills`, `.filter-pill`) — страница Catalog
- Поиск: строка с иконкой, placeholder, border 1.5px
- Фильтры-таблетки: pill-кнопки с border-radius 20px, активный — зелёный фон + белый текст
- Категории: ДМС, Фитнес, Питание, Обучение, Мерч, Стоматология

## Критерии готовности
- [ ] `FacetedSearch` реализован с props из ТЗ
- [ ] Facet types: checkbox, radio, range, select
- [ ] Inline/drawer/auto modes
- [ ] Active filters count + Clear All
- [ ] Mobile: drawer/BottomSheet
- [ ] ARIA атрибуты
- [ ] Верстка сверена с `docs/Прототип ЛК физика(1).html` (`.catalog-toolbar`, `.filter-pills`, `.search-box`)
- [ ] Тест `.test.tsx` проходит
- [ ] Showcase секция 28 добавлена в UIKit
- [ ] Экспорт в `index.ts`
- [ ] `pnpm lint && pnpm typecheck && pnpm build && pnpm test` — exit code 0
- [ ] REPORT.md записан

## Проверка
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## Формат отчёта
`tasks/ds-023-faceted-search/REPORT.md`
