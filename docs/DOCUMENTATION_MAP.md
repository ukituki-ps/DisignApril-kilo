# Documentation Map

Этот документ помогает быстро понять, где находится нужная информация по дизайн-системе.

## 1. Обязательная база

1. `README.md` - структура монорепозитория, запуск, сборка.
2. `DESIGN_SYSTEM.md` - правила бренда, токены, компоненты, плотность, темы.
3. `docs/DEVELOPMENT_WORKFLOW.md` - как вносить изменения без регрессий.

## 2. Документы по развитию

- `docs/PUBLISHING.md` - выпуск `@ukituki-ps/april-*` в GitHub Packages, npm-алиасы для импортов `@april/*`, `.npmrc`.
- `docs/COMPONENT_STANDARDS.md` - критерии качества API компонента до merge (в т.ч. mobile: нижняя панель — один контекст, см. `DESIGN_SYSTEM.md` §8).
- `docs/TESTING_STRATEGY.md` - уровни тестирования, quality gate и команды запуска тестов.
- `docs/ROADMAP.md` - инициативы по развитию и ожидаемый результат.

## 3. Работа через агента

- `docs/AGENT_MASTER_PROMPT.md` - рамки для любой инженерной задачи.
- `docs/AGENT_TASK_TEMPLATE.md` - единый формат постановки.
- `docs/AGENT_PLAN_TEMPLATE.md` - единый формат детального плана (`tasks/<id>/PLAN.md`).
- `docs/AGENT_REPORT_TEMPLATE.md` - единый формат результата.

## 4. Где вести задачи

- Стратегические и текущие задачи: `tasks/`.
- Краткий список и правила ведения: `tasks/README.md`.
