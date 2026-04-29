## 1) Итого
- Статус: ⚠️ (инфраструктура и документация готовы; первая фактическая публикация в GitHub Packages — после merge и ручного запуска workflow)
- Задача: DS-005 — публикация `@april/tokens` и `@april/ui` в приватный npm registry (GitHub Packages)
- Ветка: `feature/ds-005-registry-npm-publish` (рекомендуется для PR)
- Коммиты: не фиксировались агентом в git
- PR: не создавался

## 2) Дополнение (имена пакетов в GitHub Packages)

GitHub Packages для npm требует scope владельца репозитория; произвольный `@april/*` даёт 403 при `PUT`. Публикуемые имена: **`@ukituki-ps/april-tokens`**, **`@ukituki-ps/april-ui`**. В `docs/PUBLISHING.md` описаны npm-алиасы, чтобы в сервисах сохранить импорты `from '@april/ui'` / `from '@april/tokens'`.

## 3) Что сделано (исходная реализация)
- [tokens] В `packages/tokens/package.json`: `repository`, `publishConfig.registry` → `https://npm.pkg.github.com`, `access: restricted`.
- [ui] В `packages/ui/package.json`: то же для согласованности с GitHub Packages.
- [showcase] Не менялся (визуальных изменений нет).
- [docs] Добавлен `docs/PUBLISHING.md` — порядок релиза патч/минор, breaking policy, `.npmrc` для потребителей, проверки `npm view` и dry-run. Обновлены `README.md`, `DESIGN_SYSTEM.md`, `docs/DOCUMENTATION_MAP.md`, `docs/DEVELOPMENT_WORKFLOW.md`.
- [ci] Добавлен `.github/workflows/publish-april-packages.yml`: `workflow_dispatch` с выбором `tokens` | `ui` | `both`, `pnpm install --frozen-lockfile`, lint + typecheck + build, затем `pnpm publish` с `GITHUB_TOKEN` и `packages: write`.
- [meta] Добавлен `docs/AGENT_PLAN_TEMPLATE.md` (в репозитории не было; требование мастер-промпта). Обновлены `tasks/ds-005-registry-npm-publish/PLAN.md` и `TASK.md`.

## 4) Измененные файлы
- `packages/tokens/package.json`
- `packages/ui/package.json`
- `.github/workflows/publish-april-packages.yml`
- `docs/PUBLISHING.md`
- `docs/AGENT_PLAN_TEMPLATE.md`
- `docs/DOCUMENTATION_MAP.md`
- `docs/DEVELOPMENT_WORKFLOW.md`
- `DESIGN_SYSTEM.md`
- `README.md`
- `tasks/ds-005-registry-npm-publish/PLAN.md`
- `tasks/ds-005-registry-npm-publish/TASK.md`
- `tasks/ds-005-registry-npm-publish/REPORT.md`

## 5) Проверки
- Линт: ok
- Типы: ok
- Сборка: ok
- Тесты (`pnpm test`): ok

Команды:
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm --filter @april/tokens publish --dry-run --no-git-checks
pnpm --filter @april/ui publish --dry-run --no-git-checks
```

Dry-run публикует в `https://npm.pkg.github.com` (проверено для tokens; ui — аналогично через `publishConfig`).

## 6) Риски и ограничения
- **Первая публикация** возможна только на GitHub после merge workflow и наличия прав `packages: write` у `GITHUB_TOKEN` для этого репозитория (обычно включено для приватных пакетов в том же repo).
- При выборе `both` версии в обоих `package.json` на ветке должны быть согласованы: в tarball `@april/ui` зависимость на `@april/tokens` переписывается в semver текущей версии токенов из монорепо — перед релизом UI убедиться, что нужная версия токенов уже опубликована, если поднимали только UI.
- Потребители из **других** репозиториев org могут нуждаться в PAT / настройке `read:packages` для `npm ci`; это описано в `docs/PUBLISHING.md`.

## 7) Что осталось
- [ ] Смержить изменения, на **GitHub Actions** вручную запустить **Publish @april packages** (например `both` для первого релиза `0.1.0`).
- [ ] Проверить `npm view @april/ui versions` и `@april/tokens` с read-токеном; передать версии в PR april-worker (эпик 049-03).
- [ ] Согласовать с владельцем эпика 049 стартовые версии при необходимости bump до первого merge lock на стороне Hub.
