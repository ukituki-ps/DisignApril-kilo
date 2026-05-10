## Мета

- Задача / ID: DS-015 (april-profile **078** — `AprilMobileShellBar`)
- Постановка: `tasks/ds-015-april-profile-task-078-mobile-shell-bar/TASK.md`
- Статус плана: выполнен

## Контекст

- Реализация `AprilMobileShellBar` и Mobile lab уже соответствовали стратегии A; выявлен зазор в **a11y** (триггер поиска) и **покрытии тестами** controlled-режимов и `position`.
- Пакет: `@ukituki-ps/april-ui`.

## Целевой результат

- Норматив §11 и код согласованы по `aria-expanded` на триггере поиска.
- Расширены RTL/Vitest-тесты критичных веток.
- Patch semver **0.1.10**, документация и пример алиаса в `docs/PUBLISHING.md`.

## Фазы / шаги

1. Сверка с `DESIGN_SYSTEM.md` §8, §11 и `AprilMobileShellBar.tsx`.
2. Правка компонента (`aria-expanded`, `type="button"` на кнопках поиска).
3. Дополнение `AprilMobileShellBar.smoke.test.tsx`.
4. Обновление норматива в `DESIGN_SYSTEM.md`, примера версии в `PUBLISHING.md`, `package.json` UI.
5. `pnpm test` / `lint` / `typecheck` / `build`.
6. Отчёты: `REPORT.md` здесь; черновик `REPORT.md` в `april-profile` для задачи 078.

## Риски и откат

| Риск | Митигация |
|------|-----------|
| GPR ещё без 0.1.10 | После merge запустить штатный workflow публикации; потребители остаются на ^0.1.9 до bump. |
| Ложные срабатывания a11y-линтеров | Использованы штатные пропы Mantine `ActionIcon`. |

## Проверка

- `pnpm lint && pnpm typecheck && pnpm build && pnpm test`
