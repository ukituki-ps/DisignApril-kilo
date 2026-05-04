## 1) Итого
- Статус: ✅
- Задача: DS-014 — выравнивание с **075** (`april-profile`): GPR `@ukituki-ps/april-*`, отчётность и канон публикации
- Ветка: `main` (рабочая копия; правки только документации задачи)
- Коммиты: не фиксировались в этом шаге (только `TASK.md` / `REPORT.md`)
- PR: не создавался

## 2) Что сделано
- [анализ] Подтверждено: исполнение **075** по коду публикации закрыто в DisignApril задачей **DS-005** (`tasks/ds-005-registry-npm-publish/REPORT.md`, workflow **Publish @april packages**).
- [трекинг] Добавлен отчёт в `april-profile`: `tasks/075-external-DisignApril-ds-packages-gpr-publish/REPORT.md` — ссылки на DS, каноничный путь, примечание по дублирующему workflow в **april-worker**.
- [версии] В монорепо `packages/*/package.json` сейчас **0.1.9** (ориентир постановки 075 `^0.1.9` согласован).
- [проверки] Прогнан обязательный контур DisignApril: `pnpm lint`, `pnpm typecheck`, `pnpm build` — ok.

## 3) Измененные файлы
- `tasks/ds-014-april-profile-1-issue-75/TASK.md`
- `tasks/ds-014-april-profile-1-issue-75/REPORT.md`
- `tasks/README.md`
- (внешний репозиторий) `/home/ukituki/april-profile-1/tasks/075-external-DisignApril-ds-packages-gpr-publish/REPORT.md`
- (внешний репозиторий) `/home/ukituki/april-profile-1/task_list.md` — задача **075** отмечена выполненной, добавлена ссылка на `REPORT.md`

## 4) Проверки
- Линт: ok
- Типы: ok
- Сборка: ok

Команды:
```bash
pnpm lint
pnpm typecheck
pnpm build
```

Проверка **GPR** (`npm view …`) на этой машине без `.npmrc` на `npm.pkg.github.com` не выполнялась; инструкция — в `docs/PUBLISHING.md` и в отчёте **075** в `april-profile`.

## 5) Риски и ограничения
- В **april-worker** существует `publish-april-ds-gpr.yml`: публикует из submodule, **переписывает** поле `repository` на `april-worker` и при публикации UI подставляет зависимость на токены **`^0.1.0`** в скрипте — возможен **рассинхрон** с актуальной semver-линией и с каноничным манифестом DisignApril. Рекомендация зафиксирована в отчёте 075: считать каноном **DisignApril** `.github/workflows/publish-april-packages.yml`; вариант в worker — вспомогательный до выравнивания или явного deprecated.

## 6) Что осталось
- [ ] Опционально по **075**: строка в `april-profile/docs-site` (чеклист в исходном `TASK.md` 075).
- [ ] **076** / **077** в соответствующих репозиториях — потребление GPR (вне DS-014).
- [ ] Согласовать с командой судьбу `publish-april-ds-gpr.yml` в **april-worker** (deprecated vs синхронизация версий/`repository`).
