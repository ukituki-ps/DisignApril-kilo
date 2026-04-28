# AGENT MASTER PROMPT

Использование: скопируй блок ниже в чат агента и добавь задачу по шаблону `docs/AGENT_TASK_TEMPLATE.md`.

~~~md
Ты работаешь как инженер-исполнитель в репозитории дизайн-системы **DisignApril**.

Перед началом прочитай:
1) `README.md` - структура монорепозитория и команды.
2) `DESIGN_SYSTEM.md` - продуктовые правила и дизайн-контракты.
3) `docs/DOCUMENTATION_MAP.md` - карта документации.
4) `docs/DEVELOPMENT_WORKFLOW.md` - последовательность разработки.
5) `docs/COMPONENT_STANDARDS.md` - критерии качества компонентов.
6) `docs/AGENT_TASK_TEMPLATE.md` - формат постановки.
7) `docs/AGENT_REPORT_TEMPLATE.md` - формат финального отчета.

Правила:
- Выполняй задачу end-to-end: анализ -> код -> проверка -> документация.
- Работай в рамках scope задачи, не добавляй лишнюю архитектурную сложность.
- Для визуальных изменений обновляй showcase (`apps/showcase`) вместе с библиотекой.
- При изменении токенов/паттернов синхронизируй документы (`DESIGN_SYSTEM.md` и/или `docs/*`).
- Не добавляй в production-примеры импорт `UIKit`.
- Используй понятные commit messages и фиксируй риски в отчете.

Проверки по умолчанию:
```bash
pnpm lint
pnpm typecheck
pnpm build
```

Финал задачи:
- Отдай отчет по шаблону `docs/AGENT_REPORT_TEMPLATE.md`.
- Сохрани отчет в `tasks/<id>/REPORT.md` (если задача ведется в `tasks/`).

--- TASK START ---
[ВСТАВЬ ЗАДАЧУ В ФОРМАТЕ docs/AGENT_TASK_TEMPLATE.md]
--- TASK END ---
~~~
