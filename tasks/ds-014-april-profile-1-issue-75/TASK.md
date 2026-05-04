## Мета
- ID / ветка: `DS-014` / (ветки по месту правок: DisignApril и/или `april-profile`)
- Приоритет: medium
- Статус: done (отчёты: DisignApril `REPORT.md`, `april-profile` `tasks/075-…/REPORT.md`)
- Связанные документы (DisignApril): `docs/PUBLISHING.md`, `tasks/ds-005-registry-npm-publish/REPORT.md`, `docs/AGENT_MASTER_PROMPT.md`, `docs/AGENT_TASK_TEMPLATE.md`, `docs/DEVELOPMENT_WORKFLOW.md`

## Что обнаружено на этой машине

- **Клон:** `/home/ukituki/april-profile-1`  
- **`git remote`:** `https://github.com/ukituki-ps/april-profile.git` (имя репозитория на GitHub — **`april-profile`**, не `april-profile-1`; локальная папка может называться иначе).
- **`gh issue view 75`** в этом клоне: GitHub **issue/PR #75** — *«docs(028): add execution report for aprilhub host instances task»*, состояние **MERGED**; это **отчётная документация** по другой задаче, **не** постановка GPR/DS.
- **Внутренняя задача эпика 074 «075»** (то, что в `task_list.md` и папке `tasks/075-*`): публикация `@ukituki-ps/april-*` в GPR — постановка в файле  
  `/home/ukituki/april-profile-1/tasks/075-external-DisignApril-ds-packages-gpr-publish/TASK.md`  
  В этой папке на машине **только** `TASK.md`, **`REPORT.md` ещё нет** (критерий готовности из постановки 075).

**Вывод:** если под «75 задачей» имелась **задача 075** из `april-profile`, исполнение по коду публикации уже покрыто в DisignApril задачей **`ds-005`**; остаётся **синхронизация трекинга** в `april-profile` (отчёт 075, при необходимости docs-site) и проверка **одного каноничного** publish-пути.

## Цель (выравнивание с задачей 075 в april-profile)

Выполнить и задокументировать требования **`tasks/075-external-DisignApril-ds-packages-gpr-publish`** относительно репозитория **DisignApril**: пакеты **`@ukituki-ps/april-tokens`** и **`@ukituki-ps/april-ui`** в GitHub Packages, semver совместимый с потреблением через алиасы `@april/tokens` / `@april/ui` (в постановке 075 указан ориентир **^0.1.9** или согласованный диапазон).

**Зачем:** разблокировать **076** и **077** в `april-profile` и закрыть волну A эпика **074** по плану в том репозитории.

## Требования из `april-profile` (задача 075) — конспект

Источник: `/home/ukituki/april-profile-1/tasks/075-external-DisignApril-ds-packages-gpr-publish/TASK.md`

- **Репозиторий выполнения:** DisignApril (или согласованный publish из **april-worker** — выбрать **один** каноничный процесс).
- **Входит:** сборка `dist`, публикация в GPR, документация (PAT/secret, workflow, bump); **один** каноничный пайплайн; дубли — deprecated или удалены, с фиксацией в отчёте.
- **Не входит:** перевод потребителей с `*.tgz` (**076**, **077**), рефакторинг `AprilMobileShellBar` (**078**).
- **Acceptance:** `npm view @ukituki-ps/april-ui versions` и `npm view @ukituki-ps/april-tokens versions` с read-токеном; в **отчёте задачи 075** — ссылка на тег/commit и инструкция повторной публикации; зафиксирован единственный каноничный путь.

## Связь с уже сделанным в DisignApril

- **`tasks/ds-005-registry-npm-publish`**: публикация в GPR, workflow, имена `@ukituki-ps/april-*` — см. `tasks/ds-005-registry-npm-publish/REPORT.md` и `docs/PUBLISHING.md`.
- Сверка с текущим состоянием зафиксирована в `REPORT.md` (DS-014 и отчёт 075 в `april-profile`): версии в исходниках, канон **DisignApril** `publish-april-packages.yml`, дубликат **`april-worker`** `publish-april-ds-gpr.yml` с риском рассинхрона.

## Входит в объём (DS-014)

- [x] Сверка критериев 075 с фактом публикации (источник: `ds-005` / версии в `packages/*/package.json`; `npm view` — по `docs/PUBLISHING.md` при наличии read-токена).
- [x] Завершение трекинга в **`april-profile`**: `/home/ukituki/april-profile-1/tasks/075-external-DisignApril-ds-packages-gpr-publish/REPORT.md` (канон DisignApril, ссылки на PR/Actions, примечание по **april-worker** `publish-april-ds-gpr.yml`).
- [ ] Опционально по 075: краткое обновление `docs-site` в `april-profile` после публикации (чеклист в исходной постановке 075).
- [x] Заполнить **`tasks/ds-014-april-profile-1-issue-75/REPORT.md`** в DisignApril по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.

## Не входит в объём

- Задачи **076** / **077** (потребление GPR во frontend profile и hub-shell) — отдельные ветки/PR в соответствующих репозиториях.
- GitHub **issue #75** (`docs(028)` …) — не смешивать с задачей **075** эпика.

## Проверка

```bash
# См. docs/PUBLISHING.md — нужен .npmrc и read-токен
npm view @ukituki-ps/april-ui version
npm view @ukituki-ps/april-tokens version
```

В DisignApril при любых правках кода:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## Формат отчета

`tasks/ds-014-april-profile-1-issue-75/REPORT.md` по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.
