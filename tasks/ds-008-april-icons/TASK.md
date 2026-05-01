## Мета
- ID / ветка: `DS-008` / `feature/ds-008-april-icons`
- Приоритет: medium
- Статус: done
- Связанные документы: `DESIGN_SYSTEM.md` (зависимости `@april/ui`, SVG-логотипы, JSON-редактор + Lucide), `docs/COMPONENT_STANDARDS.md` (UX/a11y), `docs/AGENT_TASK_TEMPLATE.md`, [Lucide React](https://lucide.dev/guide/packages/lucide-react) (tree-shaking, пропсы `size`, `strokeWidth`, `absoluteStrokeWidth`)

## Цель
Оформить **коллекцию иконок дизайн-системы April** как управляемый слой поверх уже принятого **`lucide-react`**: единый публичный API (обёртка и/или курируемый реестр), согласованные размеры и доступность, **витрина в showcase** (`UIKit`) и правила в документации — чтобы продукты не импортировали десятки иконок напрямую из разных источников и не расходились по именованию (`Foo` vs `FooIcon`).

## Контекст
- Репозиторий: `DisignApril`
- Сегодня `lucide-react` уже зависимость `packages/ui` и используется точечно в секциях (`ButtonsSection`, `SidebarSection`, JSON-дерево через `createAprilJsonEditIcons`, и т.д.); `tsup` внешняя зависимость `lucide-react` уже учитывает.
- Брендовые знаки остаются отдельными SVG в `apps/showcase/public/` (`logo-icon.svg` и др.) — это не смешиваем с UI-иконками.
- Затрагиваемые области: `packages/ui` (новый модуль и экспорты), `packages/ui` showcase внутри `UIKit`, `docs` / `DESIGN_SYSTEM.md`

## Входит в объем

### 1. Публичный API в `@ukituki-ps/april-ui`
- **`AprilIcon`** (или согласованное имя в PR): тонкая обёртка над Lucide-компонентом с пропсами, согласованными с DS:
  - размер по умолчанию и маппинг на типичные значения (например 16 / 20 / 24) и при необходимости связка с `size` контролов Mantine;
  - `strokeWidth` / наследование `currentColor` для темы light/dark;
  - a11y: по умолчанию декоративные сценарии с `aria-hidden`, опционально непустой `aria-label` для осмысленных standalone-иконок; подсказка при наведении — через `Tooltip` (см. `docs/COMPONENT_STANDARDS.md`).
- **Курируемый реестр** (например `packages/ui/src/icons/` + `index.ts`): явный список разрешённых иконок для продуктов с **стабильными алиасами** экспорта (`aprilIcons` / именованные реэкспорты). Цель — не дублировать весь Lucide, а зафиксировать стартовый набор (навигация, действия, статусы, формы) с возможностью расширения по ревью DS.
- Тип для слотов «иконка слева» в паттернах DS: единый тип вроде **`LucideIcon`** / `ComponentType<SVGProps<SVGSVGElement>>` — согласовать с существующим использованием в `ProductSidebarNavigation` и др., без ломания обратной совместимости без необходимости.

### 2. Showcase (`UIKit`)
- Новая секция **иконок** (порядковый номер согласовать с текущим списком в `UIKit.tsx`): сетка превью, имя экспорта, краткое назначение (опционально группы: Navigation, Actions, Status, Editor).
- Проверка **light / dark** и при необходимости **comfortable / compact** на примерах рядом с кнопками/`ActionIcon` (как в реальных паттернах).

### 3. Документация
- Раздел в **`DESIGN_SYSTEM.md`**: политика иконок (Lucide как единственный набор UI-иконок, кастом SVG только для бренда, как импортировать из `@ukituki-ps/april-ui`, размеры, a11y).
- При необходимости — одна ссылка/подпункт в **`docs/COMPONENT_STANDARDS.md`** (интерактивные icon-only кнопки).

### 4. Миграция (по объёму PR)
- Либо **только** новый API + секция + дока (минимальный PR).
- Либо поэтапная замена прямых `import { X } from 'lucide-react'` внутри `packages/ui` на реестр — **не обязательно** закрывать всё в DS-008; явно перечислить в PR, что перенесено, а что оставлено как технический долг.

### 5. Экспорт и проверки
- Публичные экспорты в **`packages/ui/src/index.ts`**.
- `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` (как в корневом `package.json`).

## Не входит в объем
- Подключение второй библиотеки иконок (Heroicons, Phosphor и т.д.) без отдельного обоснования и ADR.
- Генерация иконок из Figma в CI, SVG-sprite pipeline, отдельный npm-пакет `@april/icons` — только если явно вынесено в follow-up задачу.
- Замена брендовых логотипов или новые маркетинговые ассеты.

## Ограничения
- Монорепозиторий **pnpm**; версия **`lucide-react`** менять только осознанно (semver, changelog для потребителей).
- **Не импортировать `UIKit`** в production-коде вне витрины; секция — внутри существующего паттерна showcase в пакете.
- Сохранить **tree-shaking**: избегать `import * as Icons from 'lucide-react'` в публичном API; реэкспорты — явные именованные.
- Соблюдать **`docs/COMPONENT_STANDARDS.md`** для интерактивных сценариев.

## Критерии готовности
- [x] Описан и реализован публичный слой (обёртка + курируемый список экспортов) в `packages/ui`, экспорт из `index.ts`.
- [x] Секция витрины в `UIKit` с сеткой иконок и проверкой темы/плотности по согласованию с постановкой.
- [x] Обновлён **`DESIGN_SYSTEM.md`** (политика иконок и импорты).
- [x] `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` проходят.
- [x] Отчёт: `tasks/ds-008-april-icons/REPORT.md` по `docs/AGENT_REPORT_TEMPLATE.md`.

## Проверка
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## Формат отчета
`tasks/ds-008-april-icons/REPORT.md` по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.
