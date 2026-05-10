## 1) Итого

- Статус: ✅
- Задача: DS-015 — контракт и тесты `AprilMobileShellBar` (april-profile **078**, не GitHub #78)
- Ветка: `feat/ds-015-mobile-shell-bar-0-1-10` → merge в `main`
- Коммиты / PR: см. вывод `gh` после выполнения
- Публикация GPR: workflow **Publish @april packages** (`both`) после merge

## 2) Что сделано

- [ui] `AprilMobileShellBar`: у кнопки «Открыть поиск» **`aria-expanded`** привязан к состоянию раскрытия (раньше было зафиксировано `false`); на кнопках раскрытия/закрытия поиска добавлен **`type="button"`**, чтобы не отправлять формы по ошибке.
- [ui] Тесты: controlled **`searchExpanded`** / **`searchValue`**, **`position: absolute`** на корневом контейнере, проверка **`aria-expanded`** у триггера в свёрнутом состоянии.
- [docs] `DESIGN_SYSTEM.md` §11: в строку про встроенный поиск добавлено требование **`aria-expanded`** на триггере; `docs/PUBLISHING.md` — пример алиаса для `@april/ui` обновлён на **`^0.1.10`**.
- [versions] `@ukituki-ps/april-ui` и `@ukituki-ps/april-tokens` **0.1.10** (токены — выравнивание semver с UI по `docs/PUBLISHING.md`; содержимое токенов без функциональных изменений).
- [tasks] Добавлен `PLAN.md`; постановка `TASK.md` актуализирована по статусу.

## 3) Измененные файлы

- `DESIGN_SYSTEM.md`
- `docs/PUBLISHING.md`
- `packages/tokens/package.json`
- `packages/ui/package.json`
- `packages/ui/src/components/AprilMobileShellBar.tsx`
- `packages/ui/src/components/AprilMobileShellBar.smoke.test.tsx`
- `tasks/README.md`
- `tasks/ds-015-april-profile-task-078-mobile-shell-bar/TASK.md`
- `tasks/ds-015-april-profile-task-078-mobile-shell-bar/PLAN.md`
- `tasks/ds-015-april-profile-task-078-mobile-shell-bar/REPORT.md`

## 4) Проверки

- Линт: ok
- Типы: ok
- Сборка: ok
- Тесты: ok (`pnpm test` — 77 тестов)

Команды:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## 5) Риски и ограничения

- **GPR:** версия **0.1.10** в монорепо зафиксирована в `package.json`; фактическая публикация в GitHub Packages — после merge и запуска workflow (см. `docs/PUBLISHING.md`). До публикации потребители с `^0.1.9` не получат правки автоматически до bump.
- **Showcase:** сценарий «Bottom sheet» в `MobileShowcase.tsx` уже использует `shellWithSearch={!opened}` — норма «один активный контекст» сохранена; визуальных правок не потребовалось.
- Объём **079/080** (profile-ui, Hub) и **docs-site** april-profile не затрагивался (опциональный блок в task-story-074 — на усмотрение команды).

## 6) Что осталось

- [ ] Закоммитить изменения, открыть PR в `DisignApril`, смержить и **опубликовать** `@ukituki-ps/april-ui@0.1.10` в GPR.
- [ ] В репозитории **april-profile** обновить трекинг задачи **078** (файл `tasks/078-external-DisignApril-april-mobile-shell-bar-refactor/REPORT.md` — черновик добавлен локально при наличии клона).
- [ ] Опционально: поднять lock потребителей (**076/077** или follow-up) на **^0.1.10** после публикации.
