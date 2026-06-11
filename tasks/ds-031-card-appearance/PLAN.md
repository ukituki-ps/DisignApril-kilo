# План: ds-031-card-appearance

## Мета
- Задача / ID: `ds-031-card-appearance`
- Постановка: `tasks/ds-031-card-appearance/TASK.md`
- Статус плана: выполнен

## Контекст
- Репозиторий: `DisignApril`, ветка `main`
- Затронутые пакеты: `packages/ui` (компоненты, типы, утилиты), `apps/showcase` (демо), `DESIGN_SYSTEM.md`
- Исходное ТЗ: `docs/CardAppearance-ТЗ.md` — vanilla JS модуль. Адаптируется в React-компоненты April DS.
- Зависимости: нет (самостоятельная задача). Использует существующие `AprilIcon`, `StatusChip`, `AprilCard`.

## Целевой результат

| Экспорт | Тип | Назначение |
|---------|-----|-----------|
| `AprilCardBanner` | компонент | Баннер карточки: фон + паттерн + контент |
| `AprilCatalogCard` | компонент | Карточка каталога: баннер + тело (название, цена, статус) |
| `AprilCardAppearanceEditor` | компонент | Контролируемый редактор настроек внешнего вида |
| `AprilCardAppearanceState` | тип | Модель состояния |
| `AprilCatalogCardContent` | тип | Данные тела карточки |
| `APRIL_CARD_APPEARANCE_COLORS` | константа | Палитра 8 swatch-цветов |
| `DEFAULT_CARD_APPEARANCE` | константа | Значения по умолчанию |
| `validateCardAppearanceState` | функция | Валидация + санитизация состояния |

## Фазы / шаги

### Фаза 1: Типы и утилиты [x]
**Файл:** `packages/ui/src/components/aprilCardAppearance/aprilCardAppearance.types.ts`

1. Интерфейс `AprilCardAppearanceState` (JSDoc на каждом поле)
2. Интерфейс `AprilCatalogCardContent` (name, category, price, currency, period, status, plugin?, onClick?)
3. Константа `APRIL_CARD_APPEARANCE_COLORS` — 8 цветов
4. Константа `DEFAULT_CARD_APPEARANCE` — дефолты
5. Функция `validateCardAppearanceState(partial)` — санитизует и возвращает валидное состояние
   - HEX-валидация для color/color2
   - Clamp для patternOpacity (0.1–0.8)
   - Snap для patternScale [0.5, 0.75, 1, 1.5, 2]
   - Snap для patternRatio [0.25, 0.33, 0.5, 1, 2, 3, 4]
   - Fallback bannerIcon → 'sparkles'

### Фаза 2: CSS-классы паттернов [x]
**Файл:** `packages/ui/src/components/aprilCardAppearance/aprilCardAppearance.css`

1. `.april-card-banner` — контейнер баннера (height 90px, flex center)
2. `.april-card-banner-image` — изображение (cover)
3. `.april-card-banner-icon` — иконка (36px, rgba-white)
4. `.april-card-banner-text` — текст (18px bold, rgba-white)
5. `.april-pattern-overlay` — базовый overlay (absolute, inset 0)
6. `.april-pattern-dots` — точки (radial-gradient)
7. `.april-pattern-stripes` — полоски (repeating-linear-gradient, 45deg)
8. `.april-pattern-grid` — сетка (dual linear-gradient)
9. `.april-pattern-waves` — волны (dual radial-gradient)
10. `.april-pattern-cross` — ромбы (dual repeating-linear-gradient, ±45deg)
11. CSS-переменные: `--april-pattern-scale` (дефолт 1), `--april-pattern-ratio` (дефолт 1)
12. `.april-card-catalog` — контейнер карточки
13. `.april-card-body`, `.april-card-name`, `.april-card-category`
14. `.april-card-footer`, `.april-card-price`, `.april-card-status`
15. `.april-color-swatch` — 28×28px, border-radius 6px, hover scale, active ring

### Фаза 3: AprilCardBanner [x]
**Файл:** `packages/ui/src/components/aprilCardAppearance/AprilCardBanner.tsx`

Пропсы: `appearance: AprilCardAppearanceState`, `height?: number` (default 90), `className?`, `style?`
- Фон: solid → `background: {color}`; gradient → `linear-gradient(135deg, {color}, {color2})`
- Паттерн: `<div class="april-pattern-overlay april-pattern-{type}" style="opacity, --april-pattern-scale, --april-pattern-ratio">`
- Контент (только один):
  - `bannerType='image'` → `<img>` с object-fit cover
  - `bannerType='icon'` → `<AprilIcon icon={resolveLucide(bannerIcon)} size={36} />`
  - `bannerType='text'` → `<div class="april-card-banner-text">{bannerText}</div>`
  - `bannerType=''` → пусто

### Фаза 4: AprilCatalogCard [x]
**Файл:** `packages/ui/src/components/aprilCardAppearance/AprilCatalogCard.tsx`

Пропсы: `appearance: AprilCardAppearanceState`, `content: AprilCatalogCardContent`, `className?`, `style?`
- Структура: баннер + тело (name, category, footer: price + status-badge)
- Hover: box-shadow усиление
- Статус: active=teal, draft=gray, archived=red
- Currency labels: 'points'→'баллов', 'rub'→'₽', 'included'→'включено'
- Period labels: 'monthly'→'/мес', 'yearly'→'/год', 'one-time'→'', 'daily'→'/день'

### Фаза 5: AprilCardAppearanceEditor [x]
**Файл:** `packages/ui/src/components/aprilCardAppearance/AprilCardAppearanceEditor.tsx`

Контролируемый: `value: AprilCardAppearanceState`, `onChange: (state: AprilCardAppearanceState) => void`

Секции (Mantine-компоненты):
1. **Режим цвета**: `SegmentedControl` [solid, gradient] → `colorMode`
2. **Цвет 1**: swatch-выбор (8 цветов) → `color`
3. **Цвет 2** (только gradient): swatch-выбор → `color2`
4. **Узор**: `Select` ['', dots, stripes, grid, waves, cross] → `pattern`
5. **Прозрачность**: `Select` [10%, 20%, 35%, 50%, 65%, 80%] → `patternOpacity`
6. **Масштаб**: `Select` [0.5×, 0.75×, 1×, 1.5×, 2×] → `patternScale`
7. **Соотношение** (только stripes/cross): `Select` [1:4, 1:3, 1:2, 1:1, 2:1, 3:1, 4:1] → `patternRatio`
8. **Контент баннера**: `SegmentedControl` [none, image, icon, text] → `bannerType`
9. **Иконка** (только icon): `Select` списка Lucide-иконок → `bannerIcon`
10. **Текст** (только text): `TextInput` → `bannerText`
11. **Изображение** (только image): file input + preview + кнопка удаления → `bannerImageName`, `bannerImageUrl`

Условная видимость:
- color2 секция: `colorMode === 'gradient'`
- ratio секция: `pattern === 'stripes' || pattern === 'cross'`
- icon/text/image секции: по `bannerType` (только одна активна)

### Фаза 6: Подпакет и экспорт [x]
1. `packages/ui/src/components/aprilCardAppearance/index.ts` — barrel export
2. `packages/ui/src/index.ts` — экспорт всех публичных символов

### Фаза 7: Showcase [x]
**Файл:** `apps/showcase/src/pages/CardAppearanceSection.tsx`

- Интерактивный редактор + live-preview баннера и карточки
- Light/dark переключатель
- Демонстрация всех паттернов и типов контента

### Фаза 8: Документация [x]
1. `DESIGN_SYSTEM.md` §11 — новый подраздел: «CardAppearance (баннер + карточка каталога + редактор)»
2. `COMPONENT_STANDARDS.md` — чеклист обновлён (если применимо)

## Риски и откат

| Риск | Митигация |
|------|-----------|
| CSS-классы `.april-card-*` конфликтуют с CSS LKFLv2 | Префикс `april-` + scoped через Mantine `classNames` |
| `AprilCardAppearanceEditor` тяжёлый (много секций) | Все секции в одном файле, опционально подкомпоненты |
| Загрузка файла (file input) — большой файл | Лимит 5MB, `accept="image/*"`, ObjectURL cleanup |
| Light/dark: паттерны белыми на светлом фоне не видны | CSS: на светлой теме паттерны semi-transparent white; на тёмной — аналогично |

## Проверка

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Визуальная проверка в showcase:
- [ ] Все 5 паттернов с разными scale/ratio
- [ ] Solid и gradient фон
- [ ] Все 4 типа контента баннера
- [ ] Light/dark темы
- [ ] Мобильная ширина (<768px)
