## Мета

- Задача / ID: DS-013 — mobile `CardListColumn`
- Постановка: `tasks/ds-013-card-list-column-mobile/TASK.md`
- Статус плана: выполнен (код и отчёт согласованы с `TASK.md`)

## Целевой результат

- Проп `mobileLayout`: `off` | `auto` | `on`; при `auto` — `(max-width: 47.99em)`.
- На mobile: одна колонка карточек (сетка), тулбар в `AprilMobileShellBar`, модалки через `AprilVaulBottomSheet`, действия в панели (один контекст).
- Mobile lab + §13; smoke-тест с `mobileLayout="on"`.

## Фазы

1. Расширить `CardListColumn` + экспорт типов при необходимости.
2. Витрина `MobileShowcase` (раздел без второй глобальной панели).
3. Документация + `TASK.md` / `REPORT.md`.

## Риски

| Риск | Митигация |
|------|-----------|
| Двойная нижняя панель в lab | Отдельный layout раздела без `MobileSectionLayout` shell |
| `useMediaQuery` в тестах | По умолчанию `mobileLayout="off"`; явный `on` в тесте mobile |
