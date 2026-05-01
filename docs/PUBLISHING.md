# Публикация пакетов DS в GitHub Packages

Цель: воспроизводимые версии в приватном npm registry, без `file:` и без ручной сборки `dist` на стендах.

## Имена пакетов в registry

На **github.com** npm-пакеты в GitHub Packages привязаны к владельцу репозитория: scope в `package.json` должен совпадать с org/user (**не** произвольный `@april`). Поэтому в registry публикуются:

| Пакет в registry | Папка в монорепо |
|------------------|------------------|
| `@ukituki-ps/april-tokens` | `packages/tokens` |
| `@ukituki-ps/april-ui` | `packages/ui` |

Импорты в коде потребителя могут оставаться привычными `@april/...`, если в `package.json` задать **npm-алиасы** (см. ниже).

## Реестр

| Параметр | Значение |
|----------|----------|
| Registry | `https://npm.pkg.github.com` |
| Репозиторий исходников | `https://github.com/ukituki-ps/DisignApril` |

Пакеты привязаны к репозиторию через поле `repository` в манифестах.

## Порядок и `workspace:*`

В монорепо `@ukituki-ps/april-ui` зависит от `@ukituki-ps/april-tokens` через `workspace:*`. При публикации **pnpm** подставляет в tarball semver токенов. Публиковать **токены первыми**, затем UI. Workflow **Publish @april packages**, вариант `both`, делает это в правильном порядке.

## Релиз патча / минора

1. Ветка от актуального `main`: поднять `version` в `packages/tokens/package.json` и/или `packages/ui/package.json`.
2. PR: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`.
3. После merge в `main`: **Actions → Publish @april packages → Run workflow**:
   - `tokens` — только токены;
   - `ui` — только UI (нужная версия токенов уже в registry);
   - `both` — токены, затем UI.

Права: workflow использует `GITHUB_TOKEN` с `packages: write`. Отдельный PAT не обязателен для публикации из того же репозитория.

## Breaking changes

- **Мажор** (`1.0.0`): публичный API или поведение, требующее правок у потребителей — описать в PR и при необходимости в `DESIGN_SYSTEM.md` / задаче эпика.
- **Минор / патч**: обратно совместимые дополнения и исправления.

## Потребители: `.npmrc` (без секретов в git)

Для установки пакетов с префиксом `@ukituki-ps`:

```ini
@ukituki-ps:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

В GitHub Actions: `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` или PAT с `read:packages`.

### Сохранить импорты `from '@april/ui'` / `from '@april/tokens'`

В `package.json` сервиса:

```json
{
  "dependencies": {
    "@april/ui": "npm:@ukituki-ps/april-ui@^0.1.3",
    "@april/tokens": "npm:@ukituki-ps/april-tokens@^0.1.2"
  }
}
```

Тогда в TypeScript по-прежнему `import { AprilProviders } from '@april/ui'`. Для подпутей (`@april/tokens/css`) используйте тот же алиас или прямой путь к пакету в registry.

Проверка после публикации:

```bash
npm view @ukituki-ps/april-tokens versions --json
npm view @ukituki-ps/april-ui versions --json
```

## Локальная проверка tarball

```bash
pnpm build
pnpm --filter @ukituki-ps/april-tokens publish --dry-run --no-git-checks
pnpm --filter @ukituki-ps/april-ui publish --dry-run --no-git-checks
```

Убедитесь, что в логе указан `npm.pkg.github.com` и что в tarball UI зависимость на токены — semver, не `workspace:*`.
