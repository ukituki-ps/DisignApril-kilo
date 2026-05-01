# April Design System

**Corporate Productivity Platform** — Task Manager, CRM, HRM, Documents.

Аудитория: разработчики фронтендов и дизайнеры продуктов April. Границы: визуальный язык, UI-слой на Mantine, паттерны взаимодействия и токены. Бизнес-логика и схемы данных живут в сервисах; дизайн-система не диктует API.

Живая витрина: после `pnpm dev` в корне репозитория (приложение `@april/showcase`; монорепозиторий на **pnpm**, связи пакетов — `workspace:*`).

---

## 1. Интеграция (registry и монорепозиторий)

Поставка — **два пакета** в registry, без git submodule. В этом репозитории пакеты связаны через **pnpm** и протокол **`workspace:*`** под именами `@ukituki-ps/april-tokens` и `@ukituki-ps/april-ui` (не путать с установкой из registry в сервисах — там только semver).

В **GitHub Packages** опубликованные имена обязаны совпадать с владельцем репозитория (`@ukituki-ps`). В документации ниже по-прежнему используются удобные имена `@april/*` для импортов — в сервисе их можно получить через **npm-алиасы** к пакетам `@ukituki-ps/april-*` (см. [`docs/PUBLISHING.md`](./docs/PUBLISHING.md)).

| Пакет (логическое имя импорта) | Содержимое |
|-------|------------|
| `@april/tokens` | TS-константы (`accent`, `mantineGray`, `mantineDark`, `logoFilters`, спецификация плотности), файл `tokens.css` с CSS variables |
| `@april/ui` | `createAprilTheme`, `AprilProviders`, `DensityProvider` / `useDensity`, витрина `UIKit`, зависимости: React Flow, dnd-kit, lucide-react |

Каждый микрофронт добавляет в `package.json` оба пакета (или только токены, если интерфейс без React). Версии поднимаются релизами в registry (порядок выпуска и `.npmrc` — в [`docs/PUBLISHING.md`](./docs/PUBLISHING.md)).

**Минимальный shell:**

```tsx
import '@mantine/core/styles.css';
import '@xyflow/react/dist/style.css'; // если используете секции с диаграммами из @april/ui
import { AprilProviders } from '@april/ui';

export function App() {
  return <AprilProviders>{/* маршруты сервиса */}</AprilProviders>;
}
```

---

## 2. Карта токенов → Mantine

| Продукт / документ | Значение | Mantine / код |
|--------------------|----------|----------------|
| Primary accent | `#12B886` | `primaryColor: 'teal'`, `color="teal"` |
| `teal-1` … `teal-9` | шкала бренда | `theme.colors.teal` (встроенная), имена в DS — для документации |
| Нейтрали светлой темы | gray.0 … gray.9 | переопределены через `@april/tokens` → `mantineGray` |
| Нейтрали тёмной темы | dark.0 … dark.9 | `mantineDark` |
| Semantic danger / warning / success | см. таблицу в §4 «Semantic» | `color="red"`, `orange`, `green` + при необходимости кастом |

Импорт в коде: `import { accent, mantineGray, logoFilters } from '@april/tokens'`.

CSS-only (микросервис без React): `import '@april/tokens/css'` — переменные `--april-accent-*`, `--april-semantic-danger|warning|success`, нейтрали. Для тёмной темы те же имена переопределяются под `[data-mantine-color-scheme='dark']` (семантика — как `semantic.*.dark` в TS; нейтрали — как в Mantine dark). Микрофронт без Mantine должен выставить этот атрибут на `html`/`body` при переключении темы или продублировать значения под своим селектором (например `.theme-dark`).

---

## 3. Brand

### Logo

- **Full logo**: иконка + wordmark «APRIL»
- **Icon only**: для favicon, аватаров, размеров &lt; 32px
- **Wordmark**: текст «APRIL» в шапке

**SVG (currentColor):** файлы в `apps/showcase/public/`: `logo-full.svg` (полный знак), `logo-icon.svg` (только иконка), `logo-wordmark.svg` (только слово). Для продакшена — копия в CDN/registry артефактов с версионированием.

**Logo colors (CSS filter на SVG):** используйте `logoFilters` из `@april/tokens` (`primary`, `onDark`, `monochrome`).

**Правила:** минимальный отступ = высота иконки; не растягивать и не поворачивать; без градиентов и произвольных цветов; на шумном фоне — контейнер.

---

## 4. Color Palette

### Accent

| Token | Hex | Usage |
|-------|-----|--------|
| `teal-1` | `#C3FAE8` | Лёгкие фоны, hover |
| `teal-3` | `#63E6BE` | Вторичные акценты |
| `teal-6` | `#12B886` | **Primary** — кнопки, ссылки, active |
| `teal-8` | `#0CA678` | Hover primary |
| `teal-9` | `#099268` | Pressed primary |

### Semantic

| Role | Light | Dark |
|------|-------|------|
| Danger | `#FA5252` | `#FF6B6B` |
| Warning | `#FD7E14` | `#FFA94D` |
| Success | `#40C057` | `#51CF66` |

### Neutrals — Light

| Role | Hex | Mantine |
|------|-----|---------|
| Background | `#FFFFFF` / `#F8F9FA` | `white` / `gray.0` |
| Surface | `#FFFFFF` | `white` |
| Border | `#DEE2E6` | `gray.3` |
| Text primary | `#212529` | `gray.9` |
| Text secondary | `#868E96` | `gray.6` |

### Neutrals — Dark

| Role | Hex | Mantine |
|------|-----|---------|
| Background | `#1A1B1E` / `#25262B` | `dark.7` / `dark.6` |
| Surface | `#2C2E33` | `dark.5` |
| Border | `#373A40` | `dark.4` |
| Text primary | `#C1C2C5` | `dark.0` |
| Text secondary | `#909296` | `dark.2` |

---

## 5. Typography

**Font:** Inter (Google Fonts).

| Role | Size | Weight | Mantine |
|------|------|--------|---------|
| H1 — Page title | 24px | 700 | `<Title order={1}>` |
| H2 — Section | 18px | 600 | `<Title order={2}>` |
| H3 — Subsection | 16px | 600 | `<Title order={3}>` |
| Body | 14px | 400 | `<Text size="sm">` |
| Body compact | 13px | 400 | `<Text size="xs">` |
| Caption | 12px | 400 | `<Text size="xs" c="dimmed">` |
| Label | 12px | 500 | `<Text size="xs" fw={500}>` |

---

## 6. Density

Режимы: **Comfortable** (по умолчанию) и **Compact** (для опытных пользователей). Числовые значения экспортируются из `@april/tokens` (`densityComfortable`, `densityCompact`).

| Параметр | Comfortable | Compact |
|----------|-------------|---------|
| Table row height | 44px | 32px |
| Button padding | 8×16px | 4×12px |
| Gap | 12–16px | 8px |
| Input height | 36px | 28px |
| Body | 14px | 13px |
| Sidebar | 250px | 220px |
| Header | 56px | 48px |

**Реализация:** `useDensity()` из `@april/ui` (контекст задаётся в `AprilProviders`).

**Синхронизация с Mantine 7:** сейчас плотность живёт в отдельном контексте и в константах `@april/tokens`; на витрине размеры подбираются вручную (`size={isCompact ? 'xs' : 'sm'}` и т.п.). Когда платформа захочет единый стиль для всех продуктовых приложений, имеет смысл добавить в `@april/ui` общие хелперы (например маппинг плотности → `size`/`spacing` для полей и кнопок) или тонкую обёртку над темой/`MantineProvider`, чтобы не дублировать условия в каждом сервисе. До этого шага текущая схема остаётся договорённостью «витрина + документ».

---

## 7. Themes

- **Light (default):** `defaultColorScheme="light"`
- **Dark:** `useMantineColorScheme()`; фон `dark.7`, карточки `dark.5`, граница `dark.4`
- **React Flow:** `colorMode={colorScheme}` в примерах витрины для согласованности

---

## 8. Layout & breakpoints

| Breakpoint | Устройство | Поведение |
|------------|------------|-----------|
| ≥1280px | Desktop | Sidebar 250px + контент + опциональная панель |
| 768–1279px | Tablet | Сворачиваемый sidebar |
| &lt;768px | Mobile | Нижние табы / полноэкранные страницы |

### Header

Слева: логотип + имя приложения. Центр: глобальный поиск (на мобильных — иконка). Справа: сообщения, уведомления, помощь, меню пользователя.

### Sidebar

Секции: Dashboard, Tasks, Inbox, Calendar → CRM → HRM → Documents, Projects, Reports. Сворачивание до 60px (только иконки). Active — teal. Счётчики на пунктах. Настройки внизу.

---

## 9. Формы (продукт vs дизайн-система)

**В продукте** единый подход: схемы валидации (например Zod) + связка с формами (например React Hook Form) — один раз согласованы на уровне платформы.

**В дизайн-системе** только:

- UI-слой: `TextInput`, `Select`, `Checkbox`, группировка полей, сообщения об ошибках через Mantine (`error`, `description`)
- Соглашения: обязательные поля помечать явно; тексты ошибок — короткие и рядом с полем; не блокировать отправку без понятной причины
- **Опциональные peer dependencies** в `@april/ui` (`package.json`): `react-hook-form`, `zod` — перечислены в `peerDependencies` и помечены `peerDependenciesMeta.optional: true`; сервис ставит их сам при необходимости, пакет DS не импортирует

---

## 10. Доступность (a11y)

Не отдельная «книга» — минимальный обязательный уровень для всех сервисов.

### Чеклист

- Фокус видимый; порядок табов соответствует визуальному порядку
- Интерактивные элементы: `aria-label` / видимый текст; иконки-кнопки — всегда с именем для скринридеров
- Контраст текста и границ — ориентир **WCAG 2.1 AA** для основного контента (Mantine по умолчанию близок; кастомные цвета проверять)
- Формы: связка `label` + `id`, ошибки объявлять (`aria-invalid`, `aria-describedby` где уместно)
- Модалки: фокус внутри, возврат фокуса при закрытии (Mantine `Modal` — базовая поддержка)

### React Flow отдельно

- Узлы содержат текст или `aria-label`; не полагаться только на цвет статуса
- Мини-карта и контролы — дублировать действия с клавиатуры где возможно; для сложных графов в продукте описать сценарий «альтернатива таблице/списку»
- При смене темы сохранять читаемость рёбер и подписей (`colorMode` синхронизирован с Mantine на витрине)

### Рост библиотеки (по желанию команды)

При расширении набора компонентов имеет смысл точечно прогонять критичные сценарии (модалки, ловушка фокуса, формы) или завести минимальные e2e / автоматические a11y-проверки на витрине — не как обязательный порог для каждого PR, а как страховку для сложных виджетов.

---

## 11. Компоненты и стек

**В `@april/ui` входят зависимости:**

- `@mantine/core` — **peer**
- `@emotion/react` — **peer**
- `lucide-react`, `@xyflow/react`, `@dnd-kit/*` — зависимости пакета (иконки, канбан, диаграммы)
- `json-edit-react`, `ajv`, `ajv-formats`, `@apidevtools/json-schema-ref-parser` — дерево JSON / JSON Schema и клиентская валидация схемой (dependencies `@ukituki-ps/april-ui`, в сборке библиотеки помечены как **external** в `tsup`)
- `@rjsf/core`, `@rjsf/utils`, `@rjsf/validator-ajv8` — форма по JSON Schema (RJSF + Ajv 8), **external** в `tsup`; виджеты и шаблоны — только **Mantine 7** внутри April (пакет **`@rjsf/mantine` не используется** — он требует Mantine 8+)

### Иконки интерфейса

- **Единственный набор** пиктограмм UI в продуктах April — **`lucide-react`** (зависимость `@april/ui`, см. §1).
- **Публичный API дизайн-системы:** компонент **`AprilIcon`** (размеры `xs | sm | md | lg` или число в px, наследование `currentColor`, по умолчанию декоративные иконки с `aria-hidden`) и курируемые именованные реэкспорты **`AprilIcon*`** из `@april/ui` — согласованные имена и состав; новые символы добавляются через ревью DS (файл `packages/ui/src/icons/aprilUiIcons.ts`).
- **Импорт:** `import { AprilIcon, AprilIconSettings } from '@april/ui'`. Для пропсов вида «компонент иконки» используйте тип **`AprilLucideIcon`** (алиас `LucideIcon` из `lucide-react`).
- **Бренд** (логотип APRIL, §3) — отдельные SVG, не смешивать с UI-иконками.

**Не входят в пакет (по необходимости в сервисе):** графики (`recharts`), тосты (`sonner`), анимации (`framer-motion`) — подключайте в продукте отдельно, визуал согласуйте с палитрой April.

### JSON tree и JSON Schema (дерево)

- **Компонент:** `AprilJsonTreeEditor` — обёртка над `json-edit-react`: тема и типографика из Mantine (`createAprilJsonEditTheme`), иконки Lucide (`createAprilJsonEditIcons`), плотность `comfortable` / `compact` через `useDensity`, поиск через Mantine `TextInput`, режим правки коллекции как JSON через Mantine `Textarea` (`AprilJsonCollectionTextEditor`).
- **Валидация:** `createAprilJsonSchemaValidator` / `validateWithSchema` — Ajv 8 + `ajv-formats`; по умолчанию **`$ref` разрешаются** через `@apidevtools/json-schema-ref-parser` (клон схемы перед dereference). Ссылки на **внешние URL** в браузере могут упасть из‑за CORS — для портативных сценариев держите схему самодостаточной или отключайте разрешение (`resolveValidationSchemaRefs={false}` на редакторе).
- **Когда использовать дерево:** админки и инструменты, где нужен структурный просмотр/правка произвольного JSON или черновика JSON Schema без фиксированного набора полей.

### JSON Schema form (RJSF + Mantine 7)

- **Компонент:** `AprilJsonSchemaForm` — обёртка над [`@rjsf/core`](https://github.com/rjsf-team/react-jsonschema-form) с валидатором **`@rjsf/validator-ajv8`**; кастомные **widgets** и **templates** на `@mantine/core` v7, плотность и светлая/тёмная тема через те же примитивы, что и в остальных формах DS. Сводка ошибок формы (`ErrorListTemplate`) визуально согласована с блоком ошибок дерева через общий **`AprilJsonValidationSummary`** (заголовок + список путей).
- **Поведение:** по умолчанию **`liveValidate="onChange"`** и **`showErrorList="top"`** — явно передайте другие значения при необходимости. Управляемый режим: проп **`formData`** + **`onChange(formData)`**.
- **Локализация сообщений Ajv/RJSF:** штатные строки на английском; для продукта передайте **`transformErrors`** (контракт RJSF) и/или локализатор на стороне приложения.
- **Когда использовать форму:** известная JSON Schema, нужны стандартные поля ввода (строка, число, enum, вложенные объекты, массивы) и предсказуемый UX формы без ручной вёрстки каждого поля.
- **Ограничения:** не подключать `@rjsf/mantine` до отдельного эпика на Mantine 8+; состав кастомных виджетов в April ограничен (например, **multi-select enum** в текущей версии не поддержан — явный запасной UI).

### Кнопки

| Variant | Назначение |
|---------|------------|
| `filled` | Основные действия |
| `light` | Вторичные |
| `outline` | Третичные |
| `subtle` | В контексте |
| `default` | Нейтральные (Cancel) |
| `filled` + `color="red"` | Удаление и разрушительные действия |

### Badges

| Color | Смысл |
|-------|--------|
| teal | Active, Done, Success |
| blue | In Progress |
| orange | Warning, Review, On Leave |
| red | Failed, Blocked, High Priority |
| gray | Archived, Inactive, Low Priority |

### Таблица

Полосатые строки, hover, чекбоксы, бейджи статусов, действия справа — с учётом режима плотности.

---

## 12. Safety patterns

| Действие | Паттерн |
|----------|---------|
| Удаление одной сущности | Диалог с именем объекта |
| Удаление с подтверждением | Ввод имени для активации кнопки |
| Массовые операции | Число затронутых + подтверждение |
| Необратимые | Красная кнопка + явный текст |

Дополнительно: автосохранение с индикатором; undo-toast ~5 с; предупреждение при уходе с несохранёнными изменениями.

---

## 13. Интерактивные паттерны

- **Kanban:** колонки To Do → In Progress → Review → Done; dnd-kit; счётчики в колонках
- **React Flow:** CRM pipeline, org chart, зависимости задач; кастомные узлы на Mantine; стили потока подключать в приложении (`@xyflow/react/dist/style.css`)
- **Card List Column:** одиночная колонка списка карточек с двумя секциями (панель управления + список), режимами `inline/overlay`, единым размером карточек и ресайзом ширины в диапазоне 15%-50% контейнера.
- **JSON tree (`AprilJsonTreeEditor`):** дерево с темой April; живой Ajv по опциональной `validationSchema`; см. §11 «JSON tree и JSON Schema».
- **JSON Schema form (`AprilJsonSchemaForm`):** RJSF на Mantine 7; см. §11 «JSON Schema form».

---

## 14. Mantine theme (фрагмент)

Конфигурация инкапсулирована в `createAprilTheme()` в `@april/ui`; при необходимости локальных правок передайте `theme` в `AprilProviders` (полная замена или объект, совместимый с Mantine).

---

## 15. Структура репозитория

```
packages/tokens/src/          # токены + tokens.css
packages/ui/src/
  DensityContext.tsx
  theme.ts
  providers.tsx
  index.ts
  icons/                        # AprilIcon, resolveAprilIconSize, курируемые AprilIcon* (Lucide)
  json/                         # AprilJsonTreeEditor, AprilJsonSchemaForm (RJSF), Ajv, тема json-edit-react
  components/                   # витрина + flow/, Kanban, …
apps/showcase/                # Vite-приложение-галерея
DESIGN_SYSTEM.md              # этот файл
```

---

*Обновлено: 1 мая 2026 · Продукт: April — Corporate Productivity Platform*
