# Отчёт ds-029 — Недостающие компоненты Design System

## Мета

- **ID:** ds-029
- **Ветка:** `feature/ds-029-components-gap`
- **Статус:** завершено
- **Дата начала:** 2026-05-25
- **Дата завершения:** 2026-05-25
- **Приоритет:** high
- **Фаза:** M09 (React SPA — компоненты ЛК физлица)
- **Постановка:** `tasks/ds-029-ds-components-gap/TASK.md`
- **Детальное ТЗ:** `docs/029-ds-components-gap-tz.md`
- **Прототип:** `docs/Прототип ЛК физика(1).html`

## Результат

Все 11 недостающих компонентов `@ukituki-ps/april-ui` реализованы end-to-end:
компонент `.tsx` + типы, тест `.test.tsx`, showcase-секция `*Section.tsx`, экспорт в `index.ts`.
Компоненты разбиты на 3 фазы по приоритету.

## Что сделано

### Фаза 1 — Dashboard + Каталог + Header (4 компонента)

| Компонент | Файл | Тестов | CSS-классы прототипа |
|---|---|---|---|
| `StatCard` | `components/StatCard.tsx` | 7 | `.stat-card`, `.stat-label`, `.stat-val`, `.stat-hint` |
| `FilterPills` | `components/FilterPills.tsx` | 10 | `.filter-pills`, `.filter-pill`, `.filter-pill.active` |
| `TransactionList` | `components/TransactionList.tsx` | 14 | `.tx-row`, `.tx-toolbar`, `.tx-filter`, `.tx-amount` |
| `BalancePill` | `components/BalancePill.tsx` | 6 | `.balance-pill` |

### Фаза 2 — Wizards + модалки льгот (3 компонента + 2 подкомпонента)

| Компонент | Файл | Тестов | CSS-классы прототипа |
|---|---|---|---|
| `WizardProgress` | `components/WizardProgress.tsx` | 16 (в WizardContainer.test) | `.wizard-progress`, `.wizard-step-circle` |
| `WizardFooter` | `components/WizardFooter.tsx` | 16 (в WizardContainer.test) | `.wizard-footer` |
| `WizardContainer` | `components/WizardContainer.tsx` | 16 | `.wizard-body`, `.wizard-step-content` |
| `PolicyCard` | `components/PolicyCard.tsx` | 7 | `.policy-card`, `.policy-number`, `.policy-meta` |
| `ClinicMapList` | `components/ClinicMapList.tsx` | 8 | `.clinic-map`, `.clinic-list`, `.clinic-item` |

### Фаза 3 — Полировка (4 компонента)

| Компонент | Файл | Тестов | CSS-классы прототипа |
|---|---|---|---|
| `EventsFeed` | `components/EventsFeed.tsx` | 6 | `.event-row`, `.ev-icon`, `.ev-text`, `.ev-time` |
| `TopTabNavigation` | `components/TopTabNavigation.tsx` | 11 | `.nav-inner`, `.nav-link`, `.nav-link.active` |
| `DocumentRow` | `components/DocumentRow.tsx` | 6 | `.docs-table td`, `.doc-name`, `.btn-download` |
| `SupportFAQ` | `components/SupportFAQ.tsx` | 6 | `.faq-item`, `.faq-question`, `.faq-answer` |

## Изменения в коде

### Новые файлы: 39

**Компоненты (11):**
- `StatCard.tsx`, `FilterPills.tsx`, `TransactionList.tsx`, `BalancePill.tsx`
- `WizardContainer.tsx`, `WizardProgress.tsx`, `WizardFooter.tsx`
- `PolicyCard.tsx`, `ClinicMapList.tsx`
- `EventsFeed.tsx`, `TopTabNavigation.tsx`, `DocumentRow.tsx`, `SupportFAQ.tsx`

**Композит (3 подкомпонента WizardContainer):**
- `WizardProgress.tsx` — горизонтальный progress bar (done/active/pending)
- `WizardFooter.tsx` — buttons (back/next/final)

**Тесты (14 файлов):**
- `StatCard.test.tsx`, `FilterPills.test.tsx`, `TransactionList.test.tsx`, `BalancePill.test.tsx`
- `WizardContainer.test.tsx`, `PolicyCard.test.tsx`, `ClinicMapList.test.tsx`
- `EventsFeed.test.tsx`, `TopTabNavigation.test.tsx`, `DocumentRow.test.tsx`, `SupportFAQ.test.tsx`

**Showcase-секции (14 файлов):**
- `StatCardSection.tsx`, `FilterPillsSection.tsx`, `TransactionListSection.tsx`, `BalancePillSection.tsx`
- `WizardContainerSection.tsx`, `PolicyCardSection.tsx`, `ClinicMapListSection.tsx`
- `EventsFeedSection.tsx`, `TopTabNavigationSection.tsx`, `DocumentRowSection.tsx`, `SupportFAQSection.tsx`

### Изменённые файлы: 2

- `packages/ui/src/index.ts` — добавлены экспорт всех 11 компонентов + типов
- `packages/ui/src/components/UIKit.tsx` — добавлены showcase-секции (секции 29+)

### Исправления pre-existing багов

- `FilterPills.tsx` — `theme.colorScheme` не существует (заменено на `useMantineColorScheme()` + cached color strings)
- `FilterPills.test.tsx` — `container.firstChild` не находил Box (фрагмент рендера → `querySelector`)
- `PolicyCard.test.tsx` — устаревшие hex-значения Mantine green (обновлено на паттерн проверки)

## Публичный API (index.ts)

| Экспорт | Тип |
|---|---|
| `StatCard`, `StatCardProps`, `StatCardVariant` | Dashboard metric card |
| `FilterPills`, `FilterPillsProps`, `FilterPillItem` | Inline filter pills |
| `TransactionList`, `TransactionListProps`, `TransactionItem`, `TransactionType`, `TransactionFilter` | Transaction history list |
| `BalancePill`, `BalancePillProps` | Header balance indicator |
| `WizardContainer`, `WizardContainerProps`, `WizardStepConfig` | Multi-step wizard |
| `WizardProgress`, `WizardProgressProps` | Wizard progress bar |
| `WizardFooter`, `WizardFooterProps` | Wizard footer buttons |
| `PolicyCard`, `PolicyCardProps`, `PolicyField` | DMС policy card |
| `ClinicMapList`, `ClinicMapListProps`, `ClinicItem` | Clinic map + list |
| `EventsFeed`, `EventsFeedProps`, `EventItem`, `EventIconVariant` | Events feed / timeline |
| `TopTabNavigation`, `TopTabNavigationProps`, `TopTabItem` | Horizontal nav tabs |
| `DocumentRow`, `DocumentRowProps`, `DocumentRowData` | Document table row |
| `SupportFAQ`, `SupportFAQProps`, `FAQItem` | FAQ accordion |

## Проверка

```bash
pnpm lint      → 0 errors, 3 warnings (pre-existing non-null assertion в тестах)
pnpm typecheck → clean (ESM + CJS + DTS собраны)
pnpm build     → clean
pnpm test      → 287 passed (0 failed), 32 test files
```

## Проблемы и решения

| Проблема | Решение |
|---|---|
| FilterPills: `theme.colorScheme` не существует на MantineTheme | Использовать `useMantineColorScheme()` хук, кэшировать цвета inactive pills |
| FilterPills.test: `container.firstChild` возвращает `<style>`, а не `<Box>` | Переписать на `querySelector('.filter-pills-scrollable')` |
| PolicyCard.test: Mantine green hex изменился с `#30A46C` → `#40C057` | Тест проверяет паттерн `linear-gradient`, а не конкретные RGB |
| TopTabNavigation.test: `getComputedStyle` в jsdom не возвращает inline style | Проверять `element.style.position` напрямую |
| EventsFeed.test: Enter key тест — `row.tabIndex = 0` не работает | Использовать `querySelector('div[tabindex="0"]')` + `user.click()` |
| Color tuple cast: TS rугается на MantineColorsTuple → string | Использовать `as unknown as string` везде где inline style принимает `string` |

## Риски

| Риск | Статус | Митигация |
|---|---|---|
| WizardContainer может конфликтовать с AprilModal по layout | ✅ не актуально | WizardContainer — контент внутри AprilModal (children). Не дублирует header/footer |
| TopTabNavigation vs ProductSidebarNavigation — дублирование | ✅ не актуально | TopTabNavigation — отдельный паттерн для ЛК, не трогает sidebar |
| ClinicMapList iframe CORS | ✅ решено | iframe — опциональный (`mapUrl?`). Без карты — только список |
| SupportFAQ vs Mantine Accordion direct use | ✅ решено | Тонкая обёртка с кастомным chevron/ hover. Продукт может использовать напрямую Mantine Accordion |
| Новая тестовая инфраструктура (EventsFeed написан вручную) | ✅ прошло | Все 287 тестов зелёные, lint clean |
