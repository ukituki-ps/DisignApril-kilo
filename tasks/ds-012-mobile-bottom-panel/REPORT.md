## 1) Итого

- Статус: ✅
- Задача: DS-012 — нижняя панель mobile (`AprilMobileShellBar`) + Mobile lab в showcase
- Ветка: не создавалась (локальная работа в рабочей копии)
- Коммиты: (будут зафиксированы автором)
- PR: не создавался

## 2) Что сделано

- **[ui]** Добавлен `AprilMobileShellBar`: слоты `leading` / `center`, встроенный поиск (`withSearch`), `Escape`, safe-area, `position` `fixed` | `absolute`, контролируемые и неконтролируемые режимы для раскрытия поиска и строки запроса.
- **[ui]** Вынесены константы и `aprilMobileShellBarContentPaddingBottom()` в `aprilMobileShellBarLayout.ts` (без предупреждения react-refresh о смешении констант и компонента в одном файле).
- **[ui]** Smoke-тест `AprilMobileShellBar.smoke.test.tsx`.
- **[showcase]** `MobileShowcase.tsx`: эволюция — **меню разделов** и полноэкранные демо-страницы в рамке ~430px (ранее два фиксированных кадра 390×844 / 360×800).
- **[showcase]** В `App.tsx` вкладки **UIKit** / **Mobile lab** в шапке.
- **[docs]** `DESIGN_SYSTEM.md` §11 подпункт про `AprilMobileShellBar`; §8 «Витрина» — ссылка на `MobileShowcase.tsx` и вкладку Mobile lab.
- **[tasks]** `PLAN.md` актуализирован; `TASK.md` — критерии выполнены.

## 3) Измененные файлы

- `packages/ui/src/components/AprilMobileShellBar.tsx`
- `packages/ui/src/components/aprilMobileShellBarLayout.ts`
- `packages/ui/src/components/AprilMobileShellBar.smoke.test.tsx`
- `packages/ui/src/index.ts`
- `apps/showcase/src/App.tsx`
- `apps/showcase/src/MobileShowcase.tsx`
- `DESIGN_SYSTEM.md`
- `tasks/ds-012-mobile-bottom-panel/TASK.md`
- `tasks/ds-012-mobile-bottom-panel/PLAN.md`
- `tasks/README.md`

## 4) Проверки

- Линт: ok
- Типы: ok
- Сборка: ok
- Тесты: ok (`pnpm test` в корне = vitest пакета `ui`)

Команды:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

## 5) Риски и ограничения

- **Высота панели:** `aprilMobileShellBarContentPaddingBottom()` зашит под одну строку капсулы (`PILL_MIN_HEIGHT`); многострочный `center` требует большего `padding-bottom` в продукте (задокументировано в §11).
- **Иконка «фильтр»:** в курируемом наборе нет `AprilIconFilter`; в drill-down демо используется `AprilIconClipboardList` с подписью «Список / фильтр».
- **Порог 768px:** сам компонент не привязан к media query — размещение на mobile решает оболочка продукта (как в §8).

## 6) Что осталось

- [ ] При необходимости — отдельный эпик: токены touch в `@april/tokens`, расширение Mobile lab (таблицы, формы RJSF), e2e a11y.
- [ ] Продуктовое правило «панель при `AprilModal`» остаётся на стороне платформы; на витрине зафиксировано только демо-правило.
