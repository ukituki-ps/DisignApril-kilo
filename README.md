# April Design System

Монорепозиторий дизайн-системы **April** для корпоративной продуктивности (задачи, CRM, HRM, документы) и множества микрофронтендов в одном проекте.

## Пакеты

| Пакет | Назначение |
|--------|------------|
| [`@april/tokens`](./packages/tokens) | Цвета, плотность, фильтры логотипа, CSS-переменные для не-React сервисов |
| [`@april/ui`](./packages/ui) | Тема Mantine, провайдеры, плотность, витрина компонентов и паттернов (UIKit) |
| [`@april/showcase`](./apps/showcase) | Локальное приложение-галерея (`pnpm dev`) |

Публикация в registry: `@april/tokens` и `@april/ui` (без git submodule; версии поднимаются релизами в CI). Подробно: [`docs/PUBLISHING.md`](./docs/PUBLISHING.md).

Связка пакетов в монорепозитории через **`workspace:*`** (поддерживается **pnpm**; обычный **npm** этот протокол в `dependencies` не понимает — для локальной разработки здесь используется pnpm, см. `pnpm-workspace.yaml` и поле `packageManager`).

## Быстрый старт

Требования: **Node ≥ 18**, **pnpm ≥ 9** ([установка](https://pnpm.io/installation), либо `corepack enable` и версия из `packageManager` в корневом `package.json`).

```bash
pnpm install
pnpm dev
```

Откройте локальный URL Vite — витрина с переключением светлой/тёмной темы и плотности.

## Сборка библиотек

```bash
pnpm build              # tokens + @april/ui (dist для публикации)
pnpm build:showcase     # библиотеки + статическая витрина
```

## Использование в микросервисном фронтенде

**Продакшен-шелл:** в боевом микрофронте подключают `AprilProviders`, тему April и **свои** экраны и маршруты. Пакет даёт примитивы Mantine, контекст плотности и согласованные токены — не готовое приложение.

**Не импортируйте `UIKit` в продакшен.** `UIKit` — только интерактивная витрина для разработки и ревью (Kanban, React Flow, демо-секции); попадание её в пользовательский бандл раздует сборку и тянет лишние зависимости по ошибке. Для изучения паттернов используйте репозиторий витрины (`pnpm dev` здесь) или монтируйте `UIKit` только во внутренних dev-стендах, не в релизной сборке.

1. Установите зависимости из registry (как обычные semver-пакеты):

   `pnpm add @april/tokens @april/ui @mantine/core @emotion/react react react-dom`

   (или `npm install …` в **потребителе** — там только опубликованные версии, без `workspace:*`.)

2. Подключите стили Mantine и при необходимости React Flow (если в сервисе есть диаграммы на `@xyflow/react`):

   ```ts
   import '@mantine/core/styles.css';
   import '@xyflow/react/dist/style.css';
   ```

3. Оберните приложение провайдерами и отрисуйте маршруты сервиса (пример без витрины):

   ```tsx
   import { AprilProviders } from '@april/ui';

   export function App() {
     return (
       <AprilProviders>
         {/* Маршрутизатор и экраны вашего сервиса */}
       </AprilProviders>
     );
   }
   ```

4. Опционально CSS-токены без React:

   ```css
   @import '@april/tokens/css';
   ```

Полные соглашения — в [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).

## Связь с шаблоном сервиса

Репозиторий [april_template](https://github.com/ukituki-ps/april_template.git) задаёт каркас микросервиса; `@april/tokens` и `@april/ui` подключаются из registry как обычные зависимости.

## Скрипты корня

| Команда | Действие |
|---------|----------|
| `pnpm dev` | Витрина (showcase) |
| `pnpm build` | Сборка `@april/tokens` и `@april/ui` |
| `pnpm build:showcase` | Библиотеки + сборка витрины |
| `pnpm lint` | ESLint по `apps/showcase` и `packages/*` |
| `pnpm typecheck` | Проверка типов |
| `pnpm test` | Unit/smoke тесты `@april/ui` (Vitest + RTL) |
| `pnpm test:watch` | Тесты `@april/ui` в watch-режиме |
