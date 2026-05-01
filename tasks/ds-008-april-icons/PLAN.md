## Мета

- Задача / ID: DS-008 April Icons
- Постановка: `tasks/ds-008-april-icons/TASK.md`
- Статус плана: выполнен

## Контекст

- В репозитории уже используется `lucide-react`; нужен управляемый публичный слой без второй библиотеки и без `import *`.

## Целевой результат

- `AprilIcon`, `resolveAprilIconSize`, тип `AprilLucideIcon`, курируемые `AprilIcon*`, секция **19** в `UIKit`, обновление `DESIGN_SYSTEM.md` и `COMPONENT_STANDARDS.md`.

## Фазы / шаги

1. Модуль `packages/ui/src/icons/` (обёртка, размеры, реэкспорты, данные витрины).
2. Секция `IconsSection` и подключение в `UIKit`.
3. Экспорт из `packages/ui/src/index.ts`, unit-тест `AprilIcon`.
4. Документация и отчёт.

## Риски и откат

| Риск | Митигация |
|------|-----------|
| Рост бандла при импорте всего реестра | Именованные реэкспорты; без монолитного объекта `aprilIcons`. |

## Проверка

- `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`
