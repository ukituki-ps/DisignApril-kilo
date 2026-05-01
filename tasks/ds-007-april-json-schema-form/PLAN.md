## Мета

- Задача / ID: DS-007 — April JSON Schema form (RJSF + Mantine 7)
- Постановка: `tasks/ds-007-april-json-schema-form/TASK.md`
- Статус плана: выполнен

## Контекст

- `@rjsf/core` / `@rjsf/utils` / `@rjsf/validator-ajv8` v6.5.x; Mantine 7; без `@rjsf/mantine`.
- Переиспользование визуала ошибок с DS-006 через общий компонент списка.

## Целевой результат

- `AprilJsonSchemaForm`, merge-registry с дефолтами RJSF, showcase Tabs Form | Tree, документация, тесты, `REPORT.md`.

## Фазы

1. Зависимости + `tsup` external.
2. `AprilJsonValidationSummary` + рефактор дерева.
3. Виджеты/шаблоны RJSF на Mantine + форма.
4. Образцы + `JsonTreeEditorSection` + экспорты + `DESIGN_SYSTEM.md`.
5. Проверки и отчёт.

## Риски

| Риск | Митигация |
|------|-----------|
| Схема draft-2020 vs JSONSchema7 | Витринная схема переведена на draft-07 URL для RJSF. |

## Проверка

`pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`
