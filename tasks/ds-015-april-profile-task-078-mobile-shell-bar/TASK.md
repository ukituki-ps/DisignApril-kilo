## Мета
- ID / ветка: `DS-015` / (ветка по месту правок в DisignApril)
- Приоритет: medium
- Статус: done (см. `REPORT.md`, `PLAN.md`)
- Связанные документы (DisignApril): `DESIGN_SYSTEM.md` §8 Mobile, §11 (нормативный контракт `AprilMobileShellBar`, паттерн форм), `docs/COMPONENT_STANDARDS.md`, `docs/DEVELOPMENT_WORKFLOW.md`, `docs/PUBLISHING.md`, `docs/AGENT_TASK_TEMPLATE.md`, `docs/AGENT_REPORT_TEMPLATE.md`
- Связанные документы (april-profile, локальный клон): `task_list.md` (пункт **078**), [`tasks/078-external-DisignApril-april-mobile-shell-bar-refactor/TASK.md`](https://github.com/ukituki-ps/april-profile/blob/main/tasks/078-external-DisignApril-april-mobile-shell-bar-refactor/TASK.md), `docs/adr/0006-mobile-chrome-layers-widget-host.md`; родитель эпика: `tasks/074-phase-8-ds-gpr-and-mobile-shell-unification/`

## Важно: «78» — две разные сущности

| Что | Где | Смысл |
|-----|-----|--------|
| **GitHub issue/PR #78** | `ukituki-ps/april-profile` | `ConflictQueueWidget` (задача 031), **уже MERGED** — к DS и `AprilMobileShellBar` не относится. |
| **Задача 078** | `april-profile` / `task_list.md` | Внешнее исполнение в **DisignApril**: контракт, код, тесты **`AprilMobileShellBar`** (стратегия A), при необходимости publish **`@ukituki-ps/april-ui`**. |

**Объём этой постановки (DS-015)** — внутренняя **задача 078** эпика 074 (волна B), а не GitHub #78.

## Цель

Довести **публичный контракт и реализацию** `AprilMobileShellBar` (и при необходимости согласованные примитивы: `CardListColumn.hideMobileShellBar`, связка с `AprilVaulBottomSheet` / back) в соответствии со **стратегией A** (ADR-0006, `DESIGN_SYSTEM.md` §8, §11); усилить **тесты** в `@april/ui`; при изменении runtime или типов — **опубликовать** новую версию **`@ukituki-ps/april-ui`** и зафиксировать это в отчёте.

**Зачем:** разблокировать **079** в `april-profile` (`profile-ui` + shell по стратегии A) и закрыть волну B эпика 074 согласованно с Hub/виджетами.

## Контекст
- **Репозиторий выполнения:** `DisignApril` (не `april-profile`).
- **Пакет:** `packages/ui` → публикация `@ukituki-ps/april-ui` (алиас потребителей `@april/ui`).
- **Ключевые файлы:**  
  `packages/ui/src/components/AprilMobileShellBar.tsx`,  
  `packages/ui/src/components/aprilMobileShellBarLayout.ts`,  
  `packages/ui/src/components/AprilMobileShellBar.smoke.test.tsx`,  
  `packages/ui/src/components/CardListColumn.tsx` (в т.ч. `hideMobileShellBar`, mobile layout),  
  `packages/ui/src/index.ts` (экспорт публичного API),  
  `apps/showcase/src/MobileShowcase.tsx` (Mobile lab).
- **Зависимость по процессу:** в `april-profile` рекомендуется начинать **после волны A (075–077)**, чтобы bump UI не пересекался с переводом потребителей на GPR; параллель — только по согласованию с командой.

## Входит в объём
- Сверка **JSDoc / `AprilMobileShellBarProps`** и фактического поведения с **`DESIGN_SYSTEM.md`** (§8 «Встраивание», стратегия A; §11 нормативный контракт и паттерн форм/подтверждений). При расхождениях — правка кода **или** норматива (согласованно; публичные изменения пропсов — semver).
- Тесты (**Vitest / RTL**): покрыть критичные ветки (например: `withSearch` / раскрытие поиска, controlled vs uncontrolled для search, взаимоисключение слотов при сценариях из §11, `position` fixed vs absolute там, где это влияет на разметку; при необходимости — доработка существующего `AprilMobileShellBar.smoke.test.tsx` и смежных тестов `CardListColumn`).
- Убедиться, что **Mobile lab** и документация по компоненту остаются согласованными с контрактом (без лишних демо, нарушающих «один активный контекст»).
- Если менялись **типы или runtime** — changelog / semver для consumer-реп, публикация в GPR по **`docs/PUBLISHING.md`**.

## Не входит в объём
- Правки **`@april/profile-ui`**, Hub, `april-worker` — задачи **079**, **080** в `april-profile`.
- Стратегия B (единая панель только в Hub) — вне контракта v1.
- Закрытие или переделка GitHub **issue #78** (`ConflictQueueWidget`) — не часть DS-015.

## Ограничения
- Монорепозиторий на **pnpm**; не импортировать `UIKit` в production-примеры пакета.
- Изменения публичного API и поведения — с обновлением **`DESIGN_SYSTEM.md`** и осмысленным **semver**.
- Один каноничный путь публикации — см. `docs/PUBLISHING.md` и отчёт `tasks/ds-005-registry-npm-publish` при сомнениях.

## Критерии готовности
- [x] `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` проходят в DisignApril.
- [x] Контракт `AprilMobileShellBar` (и заявленные связки с листами / `CardListColumn`) согласован с §8, §11 и ADR-0006; тесты отражают MUST/MUST NOT, важные для регрессий.
- [x] При изменении пакета: в GPR доступны **0.1.10** для `@ukituki-ps/april-ui` и `@ukituki-ps/april-tokens` — **после merge и запуска workflow** (см. `REPORT.md` и статус Actions).
- [x] Заполнен **`tasks/ds-015-april-profile-task-078-mobile-shell-bar/REPORT.md`** по шаблону `docs/AGENT_REPORT_TEMPLATE.md` (PR DisignApril, версия пакета, ссылки на задачу 078 в `april-profile`).
- [ ] Опционально по исходной постановке 078: блок в docs-site `april-profile` (`task-story-074`).

## Проверка

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

Публикация (при необходимости): см. `docs/PUBLISHING.md`.

## Формат отчёта

`tasks/ds-015-april-profile-task-078-mobile-shell-bar/REPORT.md` по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.

## Синхронизация с `april-profile`

После выполнения: добавить/обновить **`tasks/078-external-DisignApril-april-mobile-shell-bar-refactor/REPORT.md`** в репозитории `april-profile` (ссылка на PR DisignApril, опубликованная версия `@ukituki-ps/april-ui`), отметить чеклисты в исходном `TASK.md` задачи 078.
