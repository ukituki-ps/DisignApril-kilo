## Мета
- ID / ветка: `DS-007` / `feature/ds-007-april-json-schema-form`
- Приоритет: high
- Статус: done
- Связанные документы: `DESIGN_SYSTEM.md`, `docs/COMPONENT_STANDARDS.md`, [RJSF docs](https://rjsf-team.github.io/react-jsonschema-form/docs/), задача **DS-006** (общие типы ошибок валидации / хелперы Ajv — **переиспользовать**, не дублировать логику компиляции схемы)
- Предпосылка: после или вместе с **DS-006** должны существовать экспортируемые **`aprilJsonAjv`** / типы ошибок из `packages/ui` для единообразного отображения ошибок между **деревом** и **формой**.

## Цель
Добавить в `@ukituki-ps/april-ui` **целевой** компонент (или набор: `Form` + тема) для **заполнения данных по JSON Schema** через [**@rjsf/core**](https://www.npmjs.com/package/@rjsf/core) с валидатором [**@rjsf/validator-ajv8**](https://www.npmjs.com/package/@rjsf/validator-ajv8), с **полной визуальной и UX-консистентностью** с остальной DS: **только виджеты на `@mantine/core` v7** (как в формах в `InputsSection` / продуктовых паттернах), **поддержка `useDensity`**, **light/dark**, те же `size`/отступы/лейблы/ошибки полей, что и у нативных Mantine-форм.

**Запрещено** для целевого варианта: подключение **`@rjsf/mantine`** (требует **`@mantine/core >= 8`**, см. `npm view @rjsf/mantine peerDependencies`) — это несовместимо с текущей версией Mantine в DS без отдельного эпика на апгрейд Mantine.

## Контекст
- Репозиторий: `DisignApril`
- Затрагиваемые области: `packages/ui`, `docs`, при необходимости `apps/showcase` для CI
- RJSF расширяется через **`widgets`**, **`fields`**, **`templates`**, **`Theme` из `@rjsf/utils`** — целевой путь кастомизации без чужого UI-kit.

## Входит в объем

### 1. Зависимости
- `@rjsf/core`, `@rjsf/utils`, `@rjsf/validator-ajv8`
- **`ajv`** / **`ajv-formats`**: согласовать с версиями, ожидаемыми `validator-ajv8` (избежать дубликатов major Ajv в lockfile — один согласованный набор с DS-006).

### 2. Публичный API
- **`AprilJsonSchemaForm`** (имя согласуемо в PR) — пропсы минимум:
  - `schema: RJSFSchema` (или тип из `@rjsf/utils`);
  - `formData: unknown` + `onChange` (или контролируемый паттерн RJSF с `liveValidate` по умолчанию для целевого UX — зафиксировать в доке);
  - опции: `uiSchema`, `disabled`, `readonly`;
  - при необходимости `transformErrors` для человекочитаемых сообщений на русском/английском — политика i18n зафиксировать в `DESIGN_SYSTEM.md`.
- Внутренняя реализация: **`Form`** из `@rjsf/core` + **`customizeValidator`** из `@rjsf/validator-ajv8` + набор **`widgets`**:
  - текстовые поля → `TextInput` / `Textarea` Mantine;
  - число → `NumberInput` (или `TextInput` + parse — выбрать один целевой паттерн и держаться его);
  - boolean → `Checkbox` или `Switch` — **один** выбранный паттерн DS;
  - enum → `Select`;
  - массивы/объекты — через дефолтные `ArrayFieldTemplate` / `ObjectFieldTemplate` **переопределённые на Mantine** (`Stack`, `Group`, `Paper`, `Button` для add/remove), без сырого HTML там, где в DS уже есть компонент.

### 3. Ошибки валидации
- Отображение ошибок RJSF через кастомные **`FieldErrorTemplate` / `ErrorListTemplate`** на компонентах Mantine (`Alert`, `List`, `Text` с `c="dimmed"`), **визуально согласованно** с блоком ошибок в **DS-006** (одинаковая иерархия: заголовок + список путей).

### 4. Showcase (обязательно)
- Расширить секцию JSON в **`UIKit`** (та же секция, что и в DS-006, или соседняя **«19. …»** — не дублировать два разных места без причины):
  - **вкладки Mantine `Tabs`**: «Form» | «Tree» — оба режима над **одними и теми же** `schema` + `formData` (синхронизация состояния), чтобы демонстрировать эквивалентность данных и общую валидацию.
  - Вкладка Form: полный сценарий с несколькими типами полей из схемы (string, number, enum, nested object, array).
  - Edge-case в showcase: **ошибка валидации** после намеренно неверного ввода + `readonly` форма.

### 5. Документация
- `DESIGN_SYSTEM.md`: когда использовать **форму** vs **дерево**; ссылка на RJSF; ограничения кастомных виджетов; версии пакетов.

### 6. Тесты
- Unit: рендер формы с минимальной схемой + сабмит/change (Testing Library), проверка что Mantine-инпуты получают `size` из density.
- При возможности — снимок структуры темы RJSF (если вводите стабильный объект темы).

## Не входит в объем
- Апгрейд Mantine до v8 ради `@rjsf/mantine` — отдельный эпик.
- Серверные async-валидаторы, загрузку схем по URL, multi-step wizard.
- Генерацию схем из UI.

## Ограничения
- Только **Mantine 7** primitives из уже принятых в DS паттернов.
- Не дублировать код Ajv-компиляции: **импорт из модуля, введённого в DS-006** (или вынести общий `packages/ui/src/json/` при одном PR).
- `pnpm` workspace; не тянуть лишние `@rjsf/*` пакеты без необходимости.

## Критерии готовности
- [x] `AprilJsonSchemaForm` экспортирован из `packages/ui/src/index.ts` с типами.
- [x] Все основные виджеты — Mantine 7; density и тема работают.
- [x] Валидация через `@rjsf/validator-ajv8`; ошибки отображаются в стиле DS.
- [x] Showcase: Tabs Form + Tree, общее состояние, edge-case с ошибкой.
- [x] `DESIGN_SYSTEM.md` обновлён.
- [x] `pnpm lint`, `pnpm typecheck`, `pnpm build`, тесты `packages/ui` проходят.

## Проверка
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm --filter @ukituki-ps/april-ui test
```

## Формат отчета
`tasks/ds-007-april-json-schema-form/REPORT.md` по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.
