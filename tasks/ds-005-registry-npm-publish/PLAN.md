# План: публикация `@april/ui` и `@april/tokens` в приватный npm registry

- **Постановка:** [`TASK.md`](./TASK.md)
- **Шаблон структуры:** [`docs/AGENT_PLAN_TEMPLATE.md`](../../docs/AGENT_PLAN_TEMPLATE.md)
- **Связь с эпиком AprilHub:** `april-worker` → `tasks/049-april-ds-registry-consumption-epic/`
- **Источник требований:** `april-worker/.../EXTERNAL_DISIGNAPRIL_TASK.md`
- **Статус плана:** выполнен (реализация в репозитории + отчёт [`REPORT.md`](./REPORT.md); первая фактическая публикация — после ручного запуска workflow на `main`)

## Контекст репозитория (снимок на момент плана)

- Корневой `package.json` приватный; сборка: `pnpm build` → сначала tokens, затем ui.
- В `packages/ui/package.json` зависимость `@april/tokens: workspace:*` — при публикации через **pnpm** протокол `workspace:` обычно подменяется на фактическую версию из монорепо; **порядок релизов:** сначала `@april/tokens`, затем `@april/ui` (или один прогон `pnpm publish -r` с топологической сортировкой).
- В пакетах уже есть `files: ["dist"]`, `exports`, `publishConfig.access: restricted`; может не хватать явного `publishConfig.registry` под выбранный хостинг (GitHub Packages).
- Каталога `.github/workflows` в DisignApril пока нет — workflow нужно добавить с нуля.

## Фазы реализации

### Фаза A — манифесты и содержимое tarball

1. Зафиксировать **registry и scope** с AprilHub (рекомендация эпика: GitHub Packages, `@april`).
2. Дополнить `publishConfig` в `packages/tokens/package.json` и `packages/ui/package.json`:
   - `registry` (например `https://npm.pkg.github.com` при GitHub Packages),
   - при необходимости `provenance` / поля `repository` (часто ожидаются для приватных пакетов на GitHub).
3. Проверить, что в tarball не попадают секреты и лишние файлы (уже ограничено полем `files`).
4. Локально: `pnpm --filter @april/tokens publish --dry-run` и то же для ui после сборки; убедиться, что в упакованном `package.json` у `@april/ui` зависимость на tokens — **semver**, не `workspace:*`.

### Фаза B — CI: сборка и публикация

1. Добавить workflow (например `.github/workflows/publish-april-packages.yml`):
   - триггер: **git tag** (`tokens-v*`, `ui-v*`) и/или `workflow_dispatch` с input версии (выбрать один канонический способ и описать в доке).
   - шаги: checkout, setup pnpm/node, `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm publish` с `NODE_AUTH_TOKEN` (read/write для job публикации).
2. Права: минимально необходимые (`permissions: packages: write` или PAT в secrets — по политике org).
3. Согласовать **стартовые версии** с владельцем эпика 049 до merge lock в april-worker (см. EXTERNAL).

### Фаза C — документация и координаты для потребителей

1. Документ в `docs/` (или раздел в `README.md`): как выпустить патч/минор, политика breaking / changelog (кратко, без лишней бюрократии).
2. Пример **`.npmrc`** для потребителей: `@april:registry=…`, указание на `NODE_AUTH_TOKEN` / GitHub token read.
3. В описании первого PR на april-worker (049-03) передать опубликованные версии.

## Зависимости между фазами

`A → B → C` (доку можно черновить параллельно с B, но «координаты для потребителей» финализировать после первой успешной публикации).

## Риски

| Риск | Митигация |
|------|-----------|
| В опубликованном ui остался `workspace:*` на tokens | Проверять dry-run / содержимое tarball до первого настоящего publish |
| Истечение/отсутствие прав токена в CI | Чеклист secrets в доке; минимальные permissions |
| Расхождение версий Hub и Profile | Зафиксировать в RELEASE-доке согласованные миноры с эпиком 049 |

## Подзадачи для разных исполнителей (опционально)

| ID | Содержание | Зависимости |
|----|------------|-------------|
| ds-005-A | Только фаза A (package.json, dry-run) | — |
| ds-005-B | Только фаза B (workflow) | после A или параллельно черновик workflow |
| ds-005-C | Только фаза C (docs) | финализация после первой публикации |

В монорепозитории удобнее вести **одну** ветку `feature/ds-005-registry-npm-publish` с коммитами по фазам.
