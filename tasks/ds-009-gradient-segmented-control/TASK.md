## Мета
- ID / ветка: `DS-009` / `feature/ds-009-gradient-segmented-control`
- Приоритет: medium
- Статус: done
- Связанные документы: `DESIGN_SYSTEM.md` (§2 токены / teal, Mantine), `docs/COMPONENT_STANDARDS.md`, `docs/AGENT_TASK_TEMPLATE.md`
- Внешняя референс-реализация (рецепт, не пакет npm): [Gradient segmented control — Mantine UI](https://ui.mantine.dev/component/gradient-segmented-control/) ([исходники репозитория](https://github.com/mantinedev/ui.mantine.dev/tree/master/lib/GradientSegmentedControl))

## Цель
Добавить в `@ukituki-ps/april-ui` **обёртку над Mantine `SegmentedControl`** с оформлением «градиентный индикатор» по тому же принципу, что в рецепте Mantine UI: стили через **Styles API / `classNames` + CSS module** (корень, индикатор, контрол, подпись). Продукты получают **единый брендированный паттерн** (teal / токены April), витрину в `UIKit`, документацию и предсказуемый публичный API — без копирования pink→orange из демо.

## Контекст
- Репозиторий: `DisignApril`, пакет `packages/ui`, peer `@mantine/core` ^7.
- В ядре Mantine отдельного пропа `variant="gradient"` для `SegmentedControl` нет; градиент задаётся стилями элемента **`indicator`** (см. [SegmentedControl — Mantine](https://mantine.dev/core/segmented-control/), раздел Styles API: `root`, `control`, `input`, `label`, `indicator`, `innerLabel`).
- В репозитории уже есть «голый» `SegmentedControl` (например `packages/ui/src/components/CardListColumnSection.tsx`); новый компонент **не обязан** сразу заменять эти места — по желанию follow-up.
- Рецепт Mantine UI: `SegmentedControl` + `classNames={classes}` + модуль с градиентом на `.indicator`, оформление `.root`, снятие псевдоэлемента у `.control`, контраст активной `.label`.

## Входит в объем

### 1. Компонент в `packages/ui`
- Имя (согласовать в PR, ориентир): **`AprilGradientSegmentedControl`**.
- Реализация: **тонкая обёртка** — `forwardRef`, проброс всех значимых пропсов Mantine `SegmentedControl` (`data`, `value`, `defaultValue`, `onChange`, `name`, `disabled`, `readOnly`, `size`, `radius`, `fullWidth`, `orientation`, `color` при необходимости, `transitionDuration`, и т.д.) через `...rest`, без дублирования логики выбора значения.
- Стили: **CSS module** рядом с компонентом (как в рецепте), подключение через **`classNames`**; при необходимости слияние с пользовательскими `classNames` из `rest` — не ломать расширяемость (явно описать в PR подход: merge или «перезапись только наших ключей»).
- **Бренд**: градиент индикатора строить на **шкале teal / primary** (`DESIGN_SYSTEM.md` §2), не копировать демо pink→orange. Допустимо: CSS `light-dark(...)`, переменные Mantine (`var(--mantine-color-teal-*)`) и/или согласование с `@ukituki-ps/april-tokens`, если это уменьшает расхождение с остальным UI.
- **Контраст подписей**: при градиентном индикаторе проверить читаемость; при необходимости задействовать проп Mantine **`autoContrast`** или явные правила для `[data-active]` в стилях (см. `docs/COMPONENT_STANDARDS.md` — light/dark, состояния).
- **a11y**: поведение как у группы радиокнопок Mantine; для сегментов **только с иконками** — `VisuallyHidden` или эквивалент (как в официальной доке Mantine для `SegmentedControl`).

### 2. Публичный API
- Экспорт из `packages/ui/src/index.ts`.
- Типизация: дженерики `SegmentedControl<T>` при необходимости для `value`/`data` — согласовать с версией Mantine в репо.

### 3. Витрина (`UIKit`)
- Новая секция (номер и заголовок — по текущему порядку в `UIKit.tsx`): базовый пример, **light/dark** (и при необходимости **comfortable/compact**), опционально пример с `disabled` / с объектным `data` (`disabled: true` на пункте).
- Не импортировать `UIKit` вне витрины.

### 4. Документация
- Краткий подпункт в **`DESIGN_SYSTEM.md`**: когда использовать градиентный сегментированный контроль vs обычный `SegmentedControl`; ссылка на Mantine UI как на **визуальный референс**, с пометкой, что в DS цвета приведены к April.
- При появлении неочевидных правил a11y — одна строка-отсылка в **`docs/COMPONENT_STANDARDS.md`** (по аналогии с иконками).

### 5. Тесты и проверки
- Минимум: unit/smoke-тест (Vitest + Testing Library): рендер, смена значения по клику или роль `radiogroup` / radio, при наличии — snapshot классов или проверка, что индикатор не ломает базовую доступность.
- `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`.

## Не входит в объем
- Публикация отдельного npm-пакета или зависимость от репозитория `ui.mantine.dev` как от библиотеки — только **адаптация паттерна** в коде `packages/ui`.
- Глобальная замена всех `SegmentedControl` в продуктовых сценариях на новый компонент без отдельного согласования.
- Собственный некомпозитный контрол с нуля без Mantine.

## Ограничения
- Монорепозиторий **pnpm**; не поднимать major `@mantine/core` в рамках этой задачи без отдельного обоснования.
- Не тянуть тяжёлые зависимости: достаточно `@mantine/core` + существующие токены.
- Соблюдать **`docs/COMPONENT_STANDARDS.md`** (тема, плотность, a11y, showcase).

## Критерии готовности
- [x] Реализован `AprilGradientSegmentedControl` (или согласованное имя) с пробросом пропсов и ref.
- [x] Стили соответствуют бренду April (teal), корректны в light/dark.
- [x] Секция в `UIKit` с примерами и граничными случаями по согласованию с постановкой.
- [x] Обновлён `DESIGN_SYSTEM.md` (и при необходимости `COMPONENT_STANDARDS.md`).
- [x] Экспорт из `packages/ui/src/index.ts`.
- [x] `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` проходят.
- [x] Отчёт: `tasks/ds-009-gradient-segmented-control/REPORT.md` по `docs/AGENT_REPORT_TEMPLATE.md` (после выполнения).

## Проверка
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## Формат отчета
`tasks/ds-009-gradient-segmented-control/REPORT.md` по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.

## Примечание для исполнителя
Официальная страница [mantine.dev/core/segmented-control](https://mantine.dev/core/segmented-control/) описывает API компонента; визуал «gradient» в постановке опирается на рецепт **Mantine UI** (`ui.mantine.dev`) — при расхождении версий Mantine сверять селекторы Styles API с актуальной документацией v7.

## Примечание выполнения (DS-009)
Вместо CSS module + `classNames` в релизной сборке `tsup` использованы дефолтные **`styles`** у `SegmentedControl` (тот же визуальный рецепт, палитра teal), иначе hashed-классы из `.module.css` попадали в `dist` как пустой объект. Подробности — `tasks/ds-009-gradient-segmented-control/REPORT.md` §5.
