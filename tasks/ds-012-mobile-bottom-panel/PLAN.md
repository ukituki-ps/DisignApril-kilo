## Мета

- Задача / ID: DS-012 — нижняя панель mobile + витрина
- Постановка: `tasks/ds-012-mobile-bottom-panel/TASK.md`
- Статус плана: выполнен (код и отчёт готовы)

## Контекст

- Порог mobile зафиксирован в `DESIGN_SYSTEM.md` §8 (&lt;768px).
- Showcase без роутера — переключение режимов через `useState` в `App.tsx`.

## Целевой результат

- `AprilMobileShellBar` в `packages/ui` + inset helper + экспорт.
- `MobileShowcase.tsx` с контейнерами 390×844 и 360×800.
- Документация §11 + уточнение §8.
- Smoke-тест и `REPORT.md`.

## Фазы / шаги

1. Реализовать `AprilMobileShellBar` (слоты, поиск, Escape, safe-area, `fixed` | `absolute`).
2. Экспорт и smoke-тест.
3. Mobile-витрина и правка `App.tsx`.
4. `DESIGN_SYSTEM.md`, прогон lint/typecheck/build/test.

## Риски и откат

| Риск | Митигация |
|------|-----------|
| `fixed` внутри iframe/device | проп `position="absolute"` + `position: relative` у родителя в витрине |
| Высота панели ≠ inset | один источник констант + `calc` с `env(safe-area-inset-bottom)` |

## Проверка

- `pnpm lint && pnpm typecheck && pnpm build && pnpm test`
