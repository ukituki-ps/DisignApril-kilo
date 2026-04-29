## Мета
- ID / ветка: `DS-005` / `feature/ds-005-registry-npm-publish`
- Приоритет: medium
- Статус: done
- Связанные документы: `tasks/ds-005-registry-npm-publish/PLAN.md`, эпик `april-worker/tasks/049-april-ds-registry-consumption-epic/EXTERNAL_DISIGNAPRIL_TASK.md`, `README.md`, `DESIGN_SYSTEM.md`

## Цель
Настроить публикацию пакетов `packages/ui` (`@april/ui`) и `packages/tokens` (`@april/tokens`) в **приватный npm registry** (рекомендуется **GitHub Packages** для scope `@april`), с **семантическим версионированием** и воспроизводимым CI, чтобы AprilHub и AprilProfile перешли с `file:` на версии из registry.

## Контекст
- Репозиторий: `DisignApril`
- Затрагиваемые области: `packages/ui`, `packages/tokens`, `.github/workflows`, `docs` (и при необходимости корневой `README.md`)
- Важные файлы: `packages/ui/package.json`, `packages/tokens/package.json`, корневой `package.json`, `pnpm-workspace.yaml`
- Детальный план по фазам: `tasks/ds-005-registry-npm-publish/PLAN.md`

## Входит в объем
- Поля `name`, `version`, `files`, `exports`, `publishConfig` для публикуемых пакетов (дополнить/выровнять под выбранный registry и политику org).
- GitHub Actions workflow: сборка (`pnpm build`) + `pnpm publish` / `npm publish` на **tag** или **workflow_dispatch** с версией (один согласованный с командой канонический способ).
- Документация в DisignApril: как выпустить версию (патч/минор), краткая breaking / changelog policy.
- Первый опубликованный релиз: **согласовать стартовые версии** с AprilHub (эпик 049) до merge lock потребителей там.
- В отчёте и в PR на april-worker указать опубликованные версии и координаты registry.

## Не входит в объем
- Изменения в приложениях-потребителях (hub-shell, AprilProfile) — отдельные репозитории и постановки эпика 049.
- Изменения в `apps/showcase`, кроме случаев, когда это необходимо исключительно для прохождения CI в этом репозитории.

## Ограничения
- Следовать архитектуре монорепозитория на pnpm.
- Секреты только через GitHub Secrets / `GITHUB_TOKEN` с минимально необходимыми правами.
- В опубликованный tarball не включать PII и секреты; не коммитить токены в `.npmrc`.
- Не импортировать `UIKit` в production-примеры (не относится напрямую к publish, но сохраняем общий контракт репозитория).

## Критерии готовности
- [ ] Успешная публикация `@april/tokens` и `@april/ui` в выбранный registry (проверка `npm view` с read-доступом) — **после первого запуска** workflow на GitHub; см. `REPORT.md`.
- [x] Документ «как выпустить патч/минор» и политика breaking/changelog в этом репозитории (`docs/PUBLISHING.md`).
- [x] Зафиксированы координаты для потребителей: URL registry, scope, пример `.npmrc` (без секретов) — в `docs/PUBLISHING.md`.
- [x] `pnpm lint`, `pnpm typecheck`, `pnpm build` проходят после изменений.

## Проверка
```bash
pnpm lint
pnpm typecheck
pnpm build
```

После настройки registry и read-токена (локально или в CI):
```bash
npm view @april/ui versions --json
npm view @april/tokens versions --json
```

## Формат отчета
`tasks/ds-005-registry-npm-publish/REPORT.md` по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.
