/** Draft-07 sample (RJSF / Ajv-friendly) for UIKit JSON section: tree + schema form. */
export const jsonTreeEditorSampleSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['title', 'config'],
  properties: {
    title: { type: 'string', minLength: 1, title: 'Название' },
    status: {
      type: 'string',
      title: 'Статус',
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    tags: {
      type: 'array',
      title: 'Теги',
      items: { type: 'string', minLength: 1 },
      default: ['demo'],
    },
    config: {
      type: 'object',
      title: 'Конфигурация',
      required: ['enabled', 'retries'],
      properties: {
        enabled: { type: 'boolean', title: 'Включено' },
        retries: { type: 'integer', minimum: 0, maximum: 10, title: 'Повторы' },
      },
    },
  },
} as const;

export const jsonTreeEditorSampleInstance = {
  title: 'Мой процесс',
  status: 'draft' as const,
  tags: ['alpha', 'beta'],
  config: { enabled: true, retries: 3 },
} as const;

export const jsonTreeEditorInvalidInstance = {
  title: '',
  status: 'draft' as const,
  tags: ['alpha', 'beta'],
  config: { enabled: true, retries: 99 },
} as const;
