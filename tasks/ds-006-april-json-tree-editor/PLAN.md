## Мета

- Задача / ID: DS-006 — April JSON tree editor
- Постановка: `tasks/ds-006-april-json-tree-editor/TASK.md`
- Статус плана: выполнен (код и отчёт зафиксированы в репозитории)

## Контекст

- Mantine 7, `DensityProvider`, `json-edit-react` 1.29 с программной темой и Lucide-иконками.
- Валидация: Ajv 8 + `ajv-formats`, разрешение `$ref` через `@apidevtools/json-schema-ref-parser` при подготовке валидатора.

## Целевой результат

- Публичные `AprilJsonTreeEditor`, `createAprilJsonEditTheme`, `createAprilJsonEditIcons`, хелперы/типы Ajv, секция UIKit, раздел в `DESIGN_SYSTEM.md`, тесты, отчёт.

## Фазы / шаги

1. Зависимости и `tsup` external для новых runtime-пакетов.
2. Модуль `packages/ui/src/json/*` (Ajv, тема, иконки, TextEditor, основной компонент).
3. Экспорты и showcase-секция в `UIKit`.
4. Документация и тесты.
5. Проверки `lint` / `typecheck` / `build` / `test`, `REPORT.md`.

## Риски и откат

| Риск | Митигация |
|------|-----------|
| Размер бандла april-ui | Зависимости вынесены в `external` в tsup — ставятся вместе с `@ukituki-ps/april-ui`. |
| Внешние URL в `$ref` | Документировано: dereference может падать в браузере без CORS; локальные `$ref` в одном документе поддерживаются. |

## Проверка

- `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm --filter @ukituki-ps/april-ui test`
