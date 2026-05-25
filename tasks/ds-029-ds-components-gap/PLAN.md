# План задачи ds-029 — Недостающие компоненты Design System

## Мета

- Задача / ID: ds-029-ds-components-gap
- Постановка: `tasks/ds-029-ds-components-gap/TASK.md`
- Детальное ТЗ: `docs/029-ds-components-gap-tz.md`
- Прототип: `docs/Прототип ЛК физика(1).html`
- Статус плана: завершён 2026-05-25

## Контекст

- Репозиторий: `DisignApril`, пакет `@ukituki-ps/april-ui`
- Пакет `packages/ui` — 141 строка в `index.ts`, ~90 файлов в `components/`
- Готовые компоненты-зависимости: `AprilModal`, `StatusChip`, `BenefitCard`, `QuickActionsGrid`, `GamifiedProgress`, `FacetedSearch`, `ProductHeaderToolbar`, `ProductSidebarNavigation`, `AprilMobileShellBar`, `AprilVaulBottomSheet`
- Не добавлять новые npm-зависимости
- Прототип: `docs/Прототип ЛК физика(1).html` — 1606 строк, 6 страниц (Dashboard, Каталог, Баллы, Документы, Поддержка) + 3 модалки (ДМС деталь, DMS wizard, MatCapital wizard)

## Целевой результат

- 11 новых компонентов в `@april/ui` (см. таблицу в TASK.md)
- Каждый компонент: `.tsx` + типы + `.test.tsx` + `*Section.tsx` (витрина) + экспорт в `index.ts`
- `WizardContainer` включает 2 подкомпонента: `WizardProgress`, `WizardFooter`
- Верстка каждого компонента сверена с CSS-классами прототипа
- `pnpm lint && pnpm typecheck && pnpm build && pnpm test` — exit code 0

## Фазы / шаги

### Фаза 1 — Dashboard + Каталог + Header (4 компонента)

1. [x] `StatCard` — типы + компонент + тест + секция в UIKit + экспорт
2. [x] `FilterPills` — типы + компонент + тест + секция в UIKit + экспорт
3. [x] `TransactionList` — типы + компонент + тест + секция в UIKit + экспорт
4. [x] `BalancePill` — типы + компонент + тест + секция в UIKit + экспорт
5. [x] Прогон: `pnpm lint && pnpm typecheck && pnpm build && pnpm test`

### Фаза 2 — Wizards + модалки льгот (3 компонента + 2 подкомпонента)

6. [x] `WizardProgress` — подкомпонент (done/active/pending states, step circles)
7. [x] `WizardFooter` — подкомпонент (back/next/final buttons)
8. [x] `WizardContainer` — оркестратор (controlled/uncontrolled, validate, navigation)
9. [x] `WizardContainer` — тест (navigation, validation blocks forward, a11y)
10. [x] `PolicyCard` — компонент + тест + секция в UIKit + экспорт
11. [x] `ClinicMapList` — компонент + тест + секция в UIKit + экспорт
12. [x] Прогон: `pnpm lint && pnpm typecheck && pnpm build && pnpm test`

### Фаза 3 — Полировка (4 компонента)

13. [x] `EventsFeed` — компонент + тест + секция в UIKit + экспорт
14. [x] `TopTabNavigation` — компонент + тест + секция в UIKit + экспорт
15. [x] `DocumentRow` — компонент + тест + секция в UIKit + экспорт
16. [x] `SupportFAQ` — обёртка над Mantine `Accordion` + тест + секция в UIKit + экспорт
17. [x] Прогон: `pnpm lint && pnpm typecheck && pnpm build && pnpm test`

## Сверка компонентов с CSS-классами прототипа

| Компонент | CSS-классы прототипа |
|---|---|
| `StatCard` | `.stat-card`, `.stat-card.green`, `.stat-label`, `.stat-val`, `.stat-hint` |
| `FilterPills` | `.filter-pills`, `.filter-pill`, `.filter-pill.active` |
| `TransactionList` | `.tx-row`, `.tx-icon.plus/minus`, `.tx-desc`, `.tx-name`, `.tx-date`, `.tx-amount`, `.tx-toolbar`, `.tx-filter` |
| `BalancePill` | `.balance-pill` |
| `WizardContainer` | `.wizard-progress`, `.wizard-steps`, `.wizard-step`, `.wizard-step-circle`, `.wizard-step-line`, `.wizard-body`, `.wizard-step-content`, `.wizard-footer` |
| `WizardContainer` step1 | `.option-cards`, `.option-card`, `.option-card.selected` |
| `WizardContainer` step2 | `.pay-options`, `.pay-option`, `.pay-option.selected` |
| `WizardContainer` step3 | `.confirm-doc`, `.confirm-checkbox` |
| `WizardContainer` step4 | `.wizard-success`, `.wizard-success-icon` |
| `PolicyCard` | `.policy-card`, `.policy-label`, `.policy-number`, `.policy-meta`, `.policy-meta-item`, `.policy-actions` |
| `ClinicMapList` | `.clinic-map`, `.clinic-list`, `.clinic-item` |
| `EventsFeed` | `.event-row`, `.ev-icon.ev-green/yellow/blue`, `.ev-text`, `.ev-time` |
| `TopTabNavigation` | `.nav-inner`, `.nav-link`, `.nav-link.active` |
| `DocumentRow` | `.docs-table td`, `.doc-name`, `.doc-meta`, `.btn-download` |
| `SupportFAQ` | `.faq-item`, `.faq-question`, `.faq-answer`, `.faq-item.open` |

## Порядок внутри фазы 1

Фаза 1 выполняется последовательно в порядке:
1. StatCard (простой, без состояния, хороший warm-up)
2. FilterPills (простой, controlled pattern)
3. TransactionList (средняя сложность — filter + list)
4. BalancePill (простой, компактный)

## Риски и откат

| Риск | Митигация |
|------|-----------|
| WizardContainer — сложный компонент с state-логикой | Разбить на WizardProgress + WizardFooter + WizardContainer. Тесты на каждом уровне |
| WizardContainer может конфликтовать с AprilModal по layout | WizardContainer — контент внутри AprilModal (children). Не дублировать header/footer |
| TopTabNavigation vs ProductSidebarNavigation — дублирование | TopTabNavigation — отдельный паттерн для ЛК. Не трогать sidebar |
| ClinicMapList зависит от iframe (CORS, загрузка) | iframe — опциональный (`mapUrl?`). Без карты — только список |
| SupportFAQ — можно обойтись Mantine Accordion | Сделать тонкую обёртку с кастомным chevron и hover-эффектами. Если DS решит не делать — реализовать в продукте напрямую |
| Цвета прототипа (`#00B33C`) не совпадают с DS (`teal`) | Использовать Mantine `teal` palette. Прототип — референс layout, не точные цвета |

## Проверка

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```
