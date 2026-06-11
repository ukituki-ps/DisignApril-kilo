# ds-031-card-appearance

## Мета
- ID / ветка: `ds-031`, `feature/ds-031-card-appearance`
- Приоритет: high
- Связанные документы: `docs/CardAppearance-ТЗ.md`, `DESIGN_SYSTEM.md` §11

## Цель

Создать набор компонентов для настройки внешнего вида карточек каталога льгот (LKFLv2):
тип состояния `AprilCardAppearanceState`, баннер `AprilCardBanner`, карточка каталога
`AprilCatalogCard` и редактор `AprilCardAppearanceEditor`.

Исходное ТЗ (`docs/CardAppearance-ТЗ.md`) описывает vanilla JS модуль `CardAppearance`.
В дизайн-системе April он адаптируется как набор React-компонентов на Mantine с TypeScript.

## Контекст
- Репозиторий: `DisignApril`
- Затрагиваемые области: `packages/ui` (новые компоненты, типы, утилиты), `apps/showcase` (демо), `DESIGN_SYSTEM.md`
- Важные файлы: `packages/ui/src/index.ts`, `packages/ui/src/components/`
- Существующие компоненты, на которые опирается задача: `AprilCard`, `StatusChip`, `AprilIcon`

## Входит в объем

1. **`AprilCardAppearanceState`** — TS-тип + валидаторы + дефолты + палитра цветов (8 swatch'ей)
2. **`AprilCardBanner`** — визуальный баннер: фон (solid/gradient), CSS-паттерн, контент (изображение/иконка/Lucide/текст/ничего)
3. **`AprilCatalogCard`** — карточка каталога: баннер + тело (название, категория, цена, валюта, период, статус, плагин)
4. **`AprilCardAppearanceEditor`** — контролируемый редактор: swatch-цвета, режим solid/gradient, узор + параметры, контент баннера, загрузка файла
5. **CSS-классы паттернов** — dots, stripes, grid, waves, cross через CSS gradients
6. **Showcase-секция** — интерактивное демо всех компонентов
7. **Экспорт в `index.ts`** — компоненты + типы + константы
8. **Документация** — `DESIGN_SYSTEM.md` §11 (новый подраздел), `COMPONENT_STANDARDS.md` чеклист

## Не входит в объем
- Vanilla JS модуль `CardAppearance` (не нужен в April DS)
- Интеграция с бэкендом LKFLv2 (сохранение, API)
- S10-модалка детализации (задача продукта)
- e2e/smoke-тесты (P1)
- Поддержка IE11

## Ограничения
- React 18 + TypeScript strict + Mantine core
- Иконки: только `lucide-react` через `AprilIcon`
- Палитра цветов: кастомная (8 swatch'ей по ТЗ)
- CSS-паттерны: через CSS gradients, без изображений/JS-анимации
- Компоненты должны работать в light/dark теме
- Mobile (<768px): редактор в одну колонку, карточка полноширинная

## Критерии готовности
- [ ] `AprilCardAppearanceState` экспортирован, валидаторы работают
- [ ] `AprilCardBanner` рендерит все комбинации фон + узор + контент
- [ ] `AprilCatalogCard` рендерит полную карточку
- [ ] `AprilCardAppearanceEditor` — контролируемый, условная видимость секций
- [ ] CSS-паттерны корректны с переменными масштаба `--p` / `--pr`
- [ ] Showcase секция с интерактивным демо
- [ ] Экспорт в `index.ts`
- [ ] `DESIGN_SYSTEM.md` обновлён
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` — ok

## Проверка
```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Формат отчета
`tasks/ds-031-card-appearance/REPORT.md` по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.
