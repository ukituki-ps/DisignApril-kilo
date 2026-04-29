# Публикация `@april/tokens` и `@april/ui` (GitHub Packages)

Цель: воспроизводимые версии в приватном npm registry, без `file:` и без ручной сборки `dist` на стендах.

## Реестр и scope

| Параметр | Значение |
|----------|----------|
| Registry | `https://npm.pkg.github.com` |
| Scope пакетов | `@april` |
| Репозиторий исходников | `https://github.com/ukituki-ps/DisignApril` |

Пакеты привязаны к этому репозиторию через поле `repository` в `packages/tokens/package.json` и `packages/ui/package.json`.

## Важно: порядок и `workspace:*`

В монорепо `@april/ui` зависит от `@april/tokens` через `workspace:*`. При публикации **pnpm** подставляет в tarball semver токенов (см. `pnpm pack` / `pnpm publish`). Публиковать **`@april/tokens` первым**, затем `@april/ui`, если версия UI ссылается на новую версию токенов. В workflow **Publish @april packages** вариант `both` делает это в правильном порядке.

## Релиз патча / минора

1. Ветка от актуального `main`: поднять `version` в `packages/tokens/package.json` и/или `packages/ui/package.json` (и при необходимости синхронизировать зависимость: после публикации токенов следующий publish UI подтянет нужный semver из lock/workspace автоматически при сборке).
2. PR: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`.
3. После merge в `main`: **Actions → Publish @april packages → Run workflow**:
   - `tokens` — только токены;
   - `ui` — только UI (токены нужной версии уже должны быть в registry);
   - `both` — токены, затем UI.

Права: workflow использует `GITHUB_TOKEN` с `packages: write` (см. `permissions` в workflow). Отдельный PAT не обязателен для публикации из того же репозитория.

## Breaking changes

- **Мажор** (`1.0.0`): публичный API или поведение, требующее правок у потребителей — описать в PR и при необходимости в `DESIGN_SYSTEM.md` / задаче эпика.
- **Минор / патч**: обратно совместимые дополнения и исправления.

Краткий changelog по желанию в описании PR релиза; отдельный файл не обязателен.

## Потребители: `.npmrc` (без секретов в git)

Создайте у себя (и в CI через secret) read-доступ к GitHub Packages для scope `@april`:

```ini
@april:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

В GitHub Actions задайте `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` (если пакеты в том же org и права выданы) или PAT с правом `read:packages` для установки из другого репозитория.

Проверка после публикации:

```bash
npm view @april/tokens versions --json
npm view @april/ui versions --json
```

(Нужен настроенный `.npmrc` и токен с read.)

## Локальная проверка tarball

```bash
pnpm build
pnpm --filter @april/tokens publish --dry-run --no-git-checks
pnpm --filter @april/ui publish --dry-run --no-git-checks
```

Убедитесь, что в логе указан registry `npm.pkg.github.com` и что в упакованном `@april/ui` зависимость на `@april/tokens` — semver, не `workspace:*` (pnpm переписывает при pack/publish).
