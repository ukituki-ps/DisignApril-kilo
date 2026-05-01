/** Draft-07 sample (RJSF / Ajv-friendly) for UIKit JSON section: tree + schema form. */
export const jsonTreeEditorSampleSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['title', 'config'],
  properties: {
    title: { type: 'string', minLength: 1 },
    status: {
      type: 'string',
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    tags: {
      type: 'array',
      items: { type: 'string', minLength: 1 },
      default: ['demo'],
    },
    config: {
      type: 'object',
      required: ['enabled', 'retries'],
      properties: {
        enabled: { type: 'boolean' },
        retries: { type: 'integer', minimum: 0, maximum: 10 },
      },
    },
  },
} as const;

export const jsonTreeEditorSampleInstance = {
  title: 'My workflow',
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
