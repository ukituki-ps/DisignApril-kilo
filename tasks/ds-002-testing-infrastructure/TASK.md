## Мета
- ID / ветка: `DS-002` / `feature/ds-002-testing-infrastructure`
- Приоритет: high
- Статус: todo
- Связанные документы: `docs/TESTING_STRATEGY.md`, `docs/COMPONENT_STANDARDS.md`, `docs/DEVELOPMENT_WORKFLOW.md`, `docs/AGENT_TASK_TEMPLATE.md`

## Цель
Создать базовую и воспроизводимую инфраструктуру тестирования для `DisignApril`, чтобы новые и изменяемые UI-компоненты проверялись автоматически в локальной разработке и CI.

## Контекст
- Репозиторий: `DisignApril`
- Затрагиваемые области: `packages/ui`, `apps/showcase`, корневые конфиги монорепозитория
- Важные ориентиры:
  - тестовая стратегия: `docs/TESTING_STRATEGY.md`
  - стандарты компонентов: `docs/COMPONENT_STANDARDS.md`
  - текущие команды quality gate: `README.md`

## Входит в объем
- Внедрить тестовый стек для UI:
  - `vitest`;
  - `@testing-library/react`;
  - `@testing-library/jest-dom`;
  - `jsdom`;
  - (опционально) `@testing-library/user-event`.
- Настроить базовые тестовые конфиги:
  - `vitest.config.*` (или секция в текущем Vite-конфиге);
  - `setupTests.*` для общих матчеров/полифилов;
  - единый pattern для файлов `*.test.ts(x)`.
- Добавить scripts в корень и пакеты:
  - `test` (однократный запуск);
  - `test:watch` (локальная разработка);
  - при необходимости `test:ui` или `test:coverage` как неблокирующие.
- Обеспечить запуск тестов для `@april/ui` в контуре монорепозитория через `pnpm`.
- Подготовить минимум один smoke-тест инфраструктуры (простая проверка рендера/интеракции), подтверждающий работоспособность пайплайна.
- Обновить документацию запуска тестов:
  - `README.md` (раздел scripts/команды);
  - при необходимости `docs/DEVELOPMENT_WORKFLOW.md`.

## Не входит в объем
- Полное покрытие существующих компонентов тестами.
- Browser e2e для showcase (Playwright) как обязательный gate.
- Визуальные snapshot/regression тесты.

## Ограничения
- Следовать архитектуре монорепозитория на pnpm.
- Не ломать текущие команды `pnpm lint`, `pnpm typecheck`, `pnpm build`.
- Не добавлять heavy tooling без явной пользы для CI-скорости.
- Тесты должны быть детерминированными и не зависеть от внешних сервисов.

## Критерии готовности
- [ ] Добавлены зависимости и конфиги для запуска unit-тестов UI-компонентов.
- [ ] Работают команды `pnpm test` и `pnpm test:watch` (или эквивалент, зафиксированный в README).
- [ ] Есть минимум один проходящий пример теста, подтверждающий корректность инфраструктуры.
- [ ] Документация обновлена: как запускать тесты локально и что входит в обязательный quality gate.
- [ ] Базовые проверки проходят: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`.

## Проверка
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## Формат отчета
`tasks/ds-002-testing-infrastructure/REPORT.md` по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.
