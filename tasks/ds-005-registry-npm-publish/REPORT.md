## 1) Итого
- Статус: ✅ (пакеты опубликованы в GitHub Packages; workflow зелёный)
- Задача: DS-005 — публикация дизайн-системы в приватный npm registry (GitHub Packages)
- Ветка / merge: изменения влиты в `main` через PR [#15](https://github.com/ukituki-ps/DisignApril/pull/15), [#16](https://github.com/ukituki-ps/DisignApril/pull/16), [#17](https://github.com/ukituki-ps/DisignApril/pull/17), [#18](https://github.com/ukituki-ps/DisignApril/pull/18)
- Успешный прогон публикации: [Actions run 25134476568](https://github.com/ukituki-ps/DisignApril/actions/runs/25134476568)

## 2) Имена пакетов в registry

GitHub Packages для npm требует scope владельца репозитория; произвольный `@april/*` даёт **403** при `PUT`. Публикуемые имена: **`@ukituki-ps/april-tokens@0.1.0`**, **`@ukituki-ps/april-ui@0.1.0`**. Чтобы в сервисах сохранить импорты `from '@april/ui'`, используйте npm-алиасы — [`docs/PUBLISHING.md`](../../docs/PUBLISHING.md).

## 3) Что сделано
- [tokens/ui] Манифесты, `publishConfig`, workflow **Publish @april packages**, документация, исправления CI (workspace registry, порядок `typecheck`/`dist`).
- [naming] Переименование workspace-пакетов в `@ukituki-ps/april-*` для совместимости с GPR; обновлены showcase, lockfile, README, `DESIGN_SYSTEM.md`.
- [publish] Ручной `workflow_dispatch` с `packages=both` после merge PR #18 — оба пакета опубликованы.

## 4) Измененные области (ключевые)
- `packages/tokens/package.json`, `packages/ui/package.json`
- `.github/workflows/publish-april-packages.yml`
- `package.json` (скрипты `typecheck` / `build` / `test`)
- `docs/PUBLISHING.md`, `README.md`, `DESIGN_SYSTEM.md`, прочие `docs/*`
- `apps/showcase/*`, `pnpm-lock.yaml`
- `tasks/ds-005-registry-npm-publish/*`

## 5) Проверки
- Локально: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` — ok
- CI publish: lint → typecheck → build → publish tokens → publish ui — ok

Проверка версий (нужен `.npmrc` с `@ukituki-ps:registry` и токеном read):

```bash
npm view @ukituki-ps/april-tokens versions --json
npm view @ukituki-ps/april-ui versions --json
```

## 6) Риски и ограничения
- **AprilHub / AprilProfile** нужно перевести на зависимости `@ukituki-ps/april-*` или на npm-алиасы к ним (см. `docs/PUBLISHING.md`); старые имена `@april/*` в `package.json` без алиасов из registry **не** установятся.
- Потребители в других репозиториях: PAT / `read:packages`, см. PUBLISHING.

## 7) Что осталось для эпика 049
- [ ] Обновить `hub-shell` / lock в april-worker на версии `0.1.0` (или согласованный bump) с учётом имён `@ukituki-ps/april-*` или алиасов.
- [ ] Закрыть задачи AprilProfile по тому же принципу.
