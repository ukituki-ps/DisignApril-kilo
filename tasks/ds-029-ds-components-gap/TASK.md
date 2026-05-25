# ds-029 — Недостающие компоненты Design System для ЛК физлица

## Мета
- ID: ds-029
- Ветка: `feature/ds-029-components-gap`
- Приоритет: high
- Фаза: M09 (React SPA — компоненты ЛК физлица)
- Связанные: `docs/029-ds-components-gap-tz.md` (полное ТЗ), `DESIGN_SYSTEM.md` §8 (Mobile), §11 (Компоненты)
- Прототип: `docs/Прототип ЛК физика(1).html`

## Цель
Создать 11 недостающих компонентов `@ukituki-ps/april-ui` для полного покрытия прототипа личного кабинета физлица. Компоненты разбиты на 3 фазы по приоритету и зависимости.

## Контекст
- Репозиторий: `DisignApril`
- Пакет: `packages/ui`
- Showcase: `UIKit` (новые секции 29+) + MobileShowcase
- Готовые компоненты-зависимости: `AprilModal`, `StatusChip`, `BenefitCard`, `QuickActionsGrid`, `GamifiedProgress`, `FacetedSearch`, `ProductHeaderToolbar`, `ProductSidebarNavigation`, `AprilMobileShellBar`, `AprilVaulBottomSheet`
- Полное ТЗ по каждому компоненту: `docs/029-ds-components-gap-tz.md`

## Входит в объём — 11 компонентов

### Фаза 1 (критическая) — Dashboard + Каталог + Header

| # | Компонент | Файл | Прототип |
|---|---|---|---|
| DS-003 | `StatCard` | `components/StatCard.tsx` | Dashboard — 3 карточки метрик |
| DS-011 | `FilterPills` | `components/FilterPills.tsx` | Каталог — inline filter pills |
| DS-002 | `TransactionList` | `components/TransactionList.tsx` | «Мои баллы» — история транзакций |
| DS-008 | `BalancePill` | `components/BalancePill.tsx` | Header — баланс баллов |

### Фаза 2 (wizards + модалки льгот)

| # | Компонент | Файл | Прототип |
|---|---|---|---|
| DS-001 | `WizardContainer` (+ `WizardProgress`, `WizardFooter`) | `components/WizardContainer.tsx` | DMS upgrade/relative, MatCapital wizards |
| DS-005 | `PolicyCard` | `components/PolicyCard.tsx` | Модалка ДМС — полис пользователя |
| DS-006 | `ClinicMapList` | `components/ClinicMapList.tsx` | Модалка ДМС — клиники на карте |

### Фаза 3 (полировка)

| # | Компонент | Файл | Прототип |
|---|---|---|---|
| DS-004 | `EventsFeed` | `components/EventsFeed.tsx` | Dashboard — лента событий |
| DS-007 | `TopTabNavigation` | `components/TopTabNavigation.tsx` | Header ЛК — горизонтальные табы |
| DS-009 | `DocumentRow` | `components/DocumentRow.tsx` | Раздел «Документы» — строка таблицы |
| DS-010 | `SupportFAQ` | `components/SupportFAQ.tsx` | Раздел «Поддержка» — FAQ аккордеон |

### Для каждого компонента создаётся:
- Компонент `.tsx` + типы
- Тест `.test.tsx` (smoke + unit для критической логики)
- Showcase-секция `*Section.tsx` в UIKit
- Экспорт в `packages/ui/src/index.ts`

## Не входит в объём
- Storybook
- Visual regression / snapshot тесты
- Серверная логика (API-запросы, debounce, pagination)
- i18n-библиотека
- Кастомные CSS-анимации за пределами Mantine
- Интеграция с конкретным бэкендом

## Ограничения
- Не добавлять новые npm-зависимости в `@april/ui`
- Использовать только Mantine core + уже существующие зависимости (`lucide-react`, `@xyflow/react`, `@dnd-kit/*`, `vaul`)
- Цвета через Mantine theme (`teal`, `gray`, `dark`) — не хардкодить hex
- Поддержка density comfortable/compact через `useDensity()`
- Поддержка light/dark тем
- Mobile <768px: корректное поведение (fallback для `TopTabNavigation` → `AprilMobileShellBar`)
- a11y: WCAG 2.1 AA, aria-label, видимый фокус

## Критерии готовности

### Фаза 1
- [ ] `StatCard` — render, variant accent/default, icon, hint, типизация
- [ ] `FilterPills` — active/inactive states, scrollable, onChange
- [ ] `TransactionList` — credit/debit rows, filter tabs, empty state, a11y
- [ ] `BalancePill` — value, unit, icon, onClick, стили pill
- [ ] Тесты для всех 4 компонентов
- [ ] Showcase секции в UIKit
- [ ] Экспорт в `index.ts`
- [ ] `pnpm lint && pnpm typecheck && pnpm build && pnpm test` — exit code 0

### Фаза 2
- [ ] `WizardContainer` — steps navigation, controlled/uncontrolled, validate, progress bar
- [ ] `WizardProgress` — подкомпонент (done/active/pending states)
- [ ] `WizardFooter` — подкомпонент (back/next/final buttons)
- [ ] `PolicyCard` — gradient card, fields, actions (download/share)
- [ ] `ClinicMapList` — map iframe + clinic list, onClick
- [ ] Тесты для всех компонентов
- [ ] Showcase секции в UIKit
- [ ] Экспорт в `index.ts`
- [ ] `pnpm lint && pnpm typecheck && pnpm build && pnpm test` — exit code 0

### Фаза 3
- [ ] `EventsFeed` — event rows, icon variants, empty state
- [ ] `TopTabNavigation` — tabs, active indicator, rightSection, mobile fallback
- [ ] `DocumentRow` — row with badges, download button
- [ ] `SupportFAQ` — accordion wrapper (или использовать Mantine Accordion напрямую)
- [ ] Тесты
- [ ] Showcase секции
- [ ] Экспорт в `index.ts`
- [ ] `pnpm lint && pnpm typecheck && pnpm build && pnpm test` — exit code 0

## Сверка с прототипом
Каждый компонент сверить с соответствующей секцией `docs/Прототип ЛК физика(1).html`:
- **Dashboard:** `.stat-card`, `.stat-val`, `.stat-label`, `.stat-hint`, `.event-row`, `.ev-icon`
- **Каталог:** `.filter-pills`, `.filter-pill`, `.search-box`
- **Мои баллы:** `.tx-row`, `.tx-icon`, `.tx-amount`, `.tx-toolbar`, `.tx-filter`, `.points-balance-card`, `.progress-bar`
- **Документы:** `.docs-table`, `.doc-name`, `.doc-meta`, `.btn-download`
- **Поддержка:** `.faq-item`, `.faq-question`, `.faq-answer`
- **Header:** `.nav-link`, `.balance-pill`, `.nav-avatar`
- **Модалка ДМС:** `.policy-card`, `.clinic-map`, `.clinic-list`, `.clinic-item`
- **Wizards:** `.wizard-progress`, `.wizard-step`, `.wizard-body`, `.wizard-footer`, `.option-card`, `.pay-option`, `.confirm-doc`, `.wizard-success`

## Порядок выполнения
1. Фаза 1: StatCard → FilterPills → TransactionList → BalancePill
2. Фаза 2: WizardContainer → PolicyCard → ClinicMapList
3. Фаза 3: EventsFeed → TopTabNavigation → DocumentRow → SupportFAQ

Каждая фаза завершается полным прогоном проверок.

## Проверка
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## Формат отчёта
`tasks/ds-029-ds-components-gap/REPORT.md`
