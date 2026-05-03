## 1) Итого

- Статус: ✅
- Задача: DS-010 — паттерн модалок: действия в шапке, скролл тела (`AprilModal`)
- Ветка: `feature/ds-010-modal-header-actions` (рекомендуемая; коммит выполнен в текущей ветке рабочей копии)
- Коммиты: один коммит с сообщением `feat(ui): add AprilModal with header actions and scroll body (DS-010)` (проверка: `git log -1 --oneline`)
- PR: не создавался

## 2) Что сделано

- [ui] Добавлен **`AprilModal`**: пропы `headerTitle`, `headerActions`; слияние `styles` для колоночной раскладки и прокрутки тела (`content` / `body`); проброс остальных пропов Mantine `Modal` без `title`.
- [ui] Переведены на `AprilModal`: **`ModalSection`** (иконка подтверждения у «Создать проект», длинное тело для скролла), **`SafetyPatterns`** (опасная модалка: действия в шапке, `AprilIconWarning` / `AprilIconTrash`), **`CardListColumn`** (фильтр/сортировка/add: кнопки «Сбросить»/«Применить» в шапке для встроенного UI; при `renderFilterModal` / `renderSortModal` — только заголовок + крестик, с JSDoc о паттерне).
- [showcase] Описание секции **§12** в `UIKit` обновлено под новый паттерн (витрина тянет обновлённый `ModalSection` через `UIKit`).
- [docs] **`DESIGN_SYSTEM.md`**: подпункт §11 «Модальные окна (`AprilModal`)», уточнение в §10 чеклисте; **`docs/COMPONENT_STANDARDS.md`**: требование к шапке/скроллу и отсылка к §12 `UIKit`.
- [tasks] **`PLAN.md`**, статус и критерии в **`TASK.md`**, этот отчёт.

## 3) Измененные файлы

- `packages/ui/src/components/AprilModal.tsx`
- `packages/ui/src/components/ModalSection.tsx`
- `packages/ui/src/components/SafetyPatterns.tsx`
- `packages/ui/src/components/CardListColumn.tsx`
- `packages/ui/src/components/UIKit.tsx`
- `packages/ui/src/index.ts`
- `DESIGN_SYSTEM.md`
- `docs/COMPONENT_STANDARDS.md`
- `tasks/ds-010-modal-header-actions/TASK.md`
- `tasks/ds-010-modal-header-actions/PLAN.md`
- `tasks/ds-010-modal-header-actions/REPORT.md`

## 4) Проверки

- Линт: ok
- Типы: ok
- Сборка: ok
- Тесты (`pnpm test`): ok

Команды:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## 5) Риски и ограничения

- Потребители **`renderFilterModal` / `renderSortModal`** по-прежнему отвечают за разметку сами: встроенный `AprilModal` не добавляет `headerActions` для кастомного тела; без действий в шапке паттерн DS может не соблюдаться — это зафиксировано в JSDoc на пропах.
- Слияние **`styles`**: при передаче функции результат глубоко объединяется для ключей `content` и `body` с дефолтами `AprilModal`; остальные ключи стилей — поверхностное объединение с пользовательским объектом.
- Кнопка удаления в примере **`SafetyPatterns`**: подпись сокращена до «Удалить» (в шапке), смысл по-прежнему раскрыт текстом в теле модалки.

## 6) Что осталось

- [ ] По желанию: отдельный пример витрины для **`CardListColumn`** с кастомной модалкой, где действия вынесены в шапку на стороне `renderFilterModal`.
- [ ] Продукты вне монорепозитория: миграция существующих `Modal` на `AprilModal` по обновлённому гайду.
