## Мета
- ID / ветка: `DS-006` / `feature/ds-006-april-json-tree-editor`
- Приоритет: high
- Статус: done
- Связанные документы: `DESIGN_SYSTEM.md`, `docs/COMPONENT_STANDARDS.md`, `docs/AGENT_TASK_TEMPLATE.md`, [json-edit-react README](https://github.com/CarlosNZ/json-edit-react/blob/main/README.md) (темы, `theme`, `icons`, `viewOnly`, `TextEditor`, JSON Schema validation через Ajv)
- Зависимости по поставке: задача **DS-007** опирается на общие утилиты валидации и паттерны из этой задачи (импорт из `@ukituki-ps/april-ui` после merge DS-006 или общий PR с двумя коммитами по согласованию с командой).

## Цель
Ввести в `@ukituki-ps/april-ui` **целевые** (не промежуточные) компоненты для **просмотра и редактирования произвольного JSON** и **JSON Schema как JSON-объекта** на базе **`json-edit-react`**, с **жёстким выравниванием под April DS**: тема Mantine (светлая/тёмная), плотность **comfortable / compact**, типографика и поверхности как у остальных блоков, **переиспользование Mantine** для оболочки (контейнер, тулбар, поиск, ошибки, кнопки).

Поведение «механики» (кнопки, отступы, размеры контролов, фокус-кольца) должно совпадать с существующими секциями DS (ориентир: `InputsSection`, `ModalSection`, обёртка секций в `UIKit`).

## Контекст
- Репозиторий: `DisignApril`
- Затрагиваемые области: `packages/ui`, `apps/showcase` (только если потребуется для CI; основной showcase — внутри `UIKit` в `packages/ui`), `docs`
- Текущий стек: React 18, Mantine **7**, Vite SPA, `DensityProvider` / `useDensity`, `AprilProviders`
- `json-edit-react` **не использует Mantine** — визуальное единство достигается **программной темой** (`theme` prop: объект / merge с базой по [документации](https://github.com/CarlosNZ/json-edit-react/blob/main/README.md#themes--styles)) из значений `useMantineTheme()` и при необходимости **иконками** через prop `icons` (**`lucide-react`**, уже зависимость `april-ui`).

## Входит в объем

### Публичный API (отдельные компоненты, без монолита «все вкладки в одном»)
1. **`AprilJsonTreeEditor`** (рабочее имя согласовать в PR; альтернатива: `AprilJsonDocumentEditor`)
   - Назначение: единый **деревянный** редактор/просмотр для **данных** и **схемы** (различие только в пропсах/лейблах и опциях валидации, не в дублировании обёртки).
   - Обязательные возможности целевого варианта:
     - `data` + контролируемое обновление через **`setData`** (рекомендованный паттерн библиотеки с v1.14+, см. README).
     - Режим **только просмотр**: `viewOnly` / эквивалент через `restrictEdit` — единый понятный проп для потребителей (например `readOnly`).
     - Связка с **`useDensity`**: размер шрифта дерева, отступы узлов, высота/компактность строк — измеримо согласованы с `size` Mantine (`sm` / `xs` или принятый в DS маппинг).
     - **`createAprilJsonEditTheme(...)`** (или аналог): функция, возвращающая объект темы для `JsonEditor`, построенный из **токенов Mantine** (`theme.colors`, `theme.fontFamilyMonospace`, радиусы, `defaultRadius`, семантические цвета ошибок), без произвольных hex вне системы.
     - Иконки действий редактора — **Lucide**, размеры как у `ActionIcon`/`Button` в DS.
   - Опционально в том же объёме (если не откладывается): prop **`TextEditor`** для режима «правка поддерева текстом» — **обёртка над `@mantine/core` `Textarea`** с теми же `size`/density, с пробросом `onKeyDown` как требует [документация json-edit-react](https://github.com/CarlosNZ/json-edit-react/blob/main/README.md#full-object-editing) (без подключения CodeMirror в первой версии, если не решите иначе — но тогда Mantine `Textarea` обязателен как целевой нативный вариант DS).

2. **Валидация JSON Schema (инстанс ↔ схема)**
   - Модуль **`packages/ui/src/.../aprilJsonAjv.ts`** (имя файла по соглашению репо): компиляция схемы, опционально **`ajv-formats`**, опционально разрешение **`$ref`** через `@apidevtools/json-schema-ref-parser` (или эквивалент с той же лицензией) — **входит в целевой объём**, если продукты используют внешние `$ref`; иначе явно задокументировать ограничение в `DESIGN_SYSTEM.md` и типах (без «временного» молчания).
   - Публичный хелпер уровня **`validateWithSchema(data, schema): { valid: boolean; errors: AprilJsonValidationError[] }`** + стабильный тип ошибки (путь Ajv → строка пути для UI).
   - Интеграция с деревом: при переданном `schema` — валидация после обновлений (паттерн из README json-edit-react + Ajv); отображение ошибок через **Mantine** (`Alert`, `List`, `Text`), не через дефолтный «красный текст» библиотеки без обёртки.

3. **Тулбар и поиск (только Mantine)**
   - Поле поиска: **`TextInput`** с `searchText` / `searchFilter` json-edit-react (см. README Search/Filtering).
   - Действия по согласованию с DS: копирование, сброс демо-данных в showcase — через **`Button`**, **`Group`**, **`Tooltip`** при необходимости.

4. **Showcase (обязательно)**
   - Новая секция в **`UIKit`** (следующий порядковый номер после Card List Column), например **«18. JSON & JSON Schema (tree)»**.
   - Минимум три демонстрации:
     - редактирование **примера JSON Schema** (реальный не тривиальный фрагмент draft-2020-07 или тот draft, который закрепите в доке);
     - редактирование **инстанса данных** по этой схеме с отображением ошибок валидации;
     - **read-only** дерево (просмотр).
   - Проверка **light / dark** и **comfortable / compact** на каждой демонстрации.

5. **Документация**
   - Раздел в **`DESIGN_SYSTEM.md`**: когда использовать дерево, валидация, ограничения по `$ref`, зависимости (Ajv).
   - При необходимости — краткий фрагмент в **`docs/COMPONENT_STANDARDS.md`** (ссылка на JSON-компоненты).

6. **Экспорт**
   - Публичные экспорты в **`packages/ui/src/index.ts`**: компонент(ы), типы пропсов, тема-фабрика, хелперы валидации.

7. **Тесты**
   - Unit-тесты на **фабрику темы** (снимок ключевых полей для light/dark и density) и на **хелпер Ajv** (валидный / невалидный инстанс).
   - Smoke-тест рендера обёртки с **`AprilProviders`** (как в других тестах пакета, если есть паттерн).

## Не входит в объем
- Форма по схеме (**RJSF**) — отдельная задача **DS-007**.
- Monaco / CodeMirror как обязательный текстовый редактор (опционально позже отдельной задачей).
- Генерация ограничений редактирования из схемы «чтобы нельзя было ввести невалидное» (в README json-edit-react отмечено как исследуемая область) — не входит.
- Изменения в приложениях вне монорепозитория.

## Ограничения
- Монорепозиторий **pnpm**; зависимости добавлять в **`packages/ui/package.json`** с явным semver; `peerDependencies` Mantine/React не ломать.
- **Не импортировать `UIKit`** в production-коде потребителей (только showcase внутри пакета для витрины — текущий паттерн).
- Не использовать **`@rjsf/mantine`**: peer **`@mantine/core >= 8`**, конфликт с Mantine 7 в DS.
- Соблюдать **`docs/COMPONENT_STANDARDS.md`**: a11y для кнопок/полей поиска, различимые error-состояния.
- Стили: приоритет — **тема json-edit-react из Mantine**; точечные override через классы `jer-*` только если без этого невозможно достичь паритета с DS (обосновать в PR).

## Критерии готовности
- [x] Реализованы публичные компоненты/хелперы в `packages/ui`, экспорт из `index.ts`.
- [x] Тема дерева визуально согласована с Mantine April (light/dark + density).
- [x] Иконки действий — Lucide, размеры согласованы с DS.
- [x] Ajv-валидация инстанса по схеме с предсказуемым списком ошибок в UI Mantine.
- [x] Политика по **`$ref`** задокументирована и реализована или явно ограничена в API.
- [x] Секция **showcase** в `UIKit` с тремя сценариями выше.
- [x] Обновлён **`DESIGN_SYSTEM.md`** (и при необходимости `COMPONENT_STANDARDS.md`).
- [x] `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` (в `packages/ui`) проходят.

## Проверка
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm --filter @ukituki-ps/april-ui test
```

## Формат отчета
`tasks/ds-006-april-json-tree-editor/REPORT.md` по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.
