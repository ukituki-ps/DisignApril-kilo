import { describe, expect, it } from 'vitest';
import { createAprilJsonSchemaValidator, validateWithSchema } from './aprilJsonAjv';

const simpleSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string', minLength: 1 },
    count: { type: 'integer', minimum: 0 },
  },
};

describe('aprilJsonAjv', () => {
  it('createAprilJsonSchemaValidator rejects invalid data', async () => {
    const validate = await createAprilJsonSchemaValidator(simpleSchema, { resolveRefs: false });
    const empty = validate({});
    expect(empty.valid).toBe(false);
    expect(empty.errors.some((e) => e.instancePath === '(root)')).toBe(true);

    const ok = validate({ name: 'x', count: 2 });
    expect(ok.valid).toBe(true);
    expect(ok.errors).toHaveLength(0);
  });

  it('validateWithSchema returns errors for invalid instance', async () => {
    const result = await validateWithSchema({ name: '' }, simpleSchema, { resolveRefs: false });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
