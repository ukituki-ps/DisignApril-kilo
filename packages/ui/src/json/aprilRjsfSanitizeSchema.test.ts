import { describe, expect, it } from 'vitest';
import { sanitizeSchemaForRjsf } from './aprilRjsfSanitizeSchema';

describe('sanitizeSchemaForRjsf', () => {
  it('passes through null and primitives', () => {
    expect(sanitizeSchemaForRjsf(null as never)).toBe(null);
    expect(sanitizeSchemaForRjsf('x' as never)).toBe('x');
    expect(sanitizeSchemaForRjsf(1 as never)).toBe(1);
  });

  it('does not mutate the input object', () => {
    const input = {
      type: 'object',
      properties: { a: null, b: { type: 'string' } },
    };
    const snapshot = structuredClone(input);
    sanitizeSchemaForRjsf(input);
    expect(input).toEqual(snapshot);
  });

  it('replaces null entries in properties with empty objects', () => {
    const out = sanitizeSchemaForRjsf({
      type: 'object',
      properties: { broken: null, ok: { type: 'string' } },
    });
    expect(out.properties).toEqual({
      broken: {},
      ok: { type: 'string' },
    });
  });

  it('replaces null map value when properties (or defs map) is null', () => {
    expect(
      sanitizeSchemaForRjsf({
        type: 'object',
        properties: null,
      } as Record<string, unknown>)
    ).toMatchObject({ properties: {} });
    expect(
      sanitizeSchemaForRjsf({
        $defs: null,
      } as Record<string, unknown>)
    ).toMatchObject({ $defs: {} });
  });

  it('sanitizes nested property maps recursively', () => {
    const out = sanitizeSchemaForRjsf({
      type: 'object',
      properties: {
        outer: {
          type: 'object',
          properties: { inner: null },
        },
      },
    });
    expect((out.properties as Record<string, unknown>).outer).toEqual({
      type: 'object',
      properties: { inner: {} },
    });
  });

  it('sanitizes patternProperties', () => {
    const out = sanitizeSchemaForRjsf({
      type: 'object',
      patternProperties: { '^x$': null },
    });
    expect(out.patternProperties).toEqual({ '^x$': {} });
  });

  it('sanitizes definitions and $defs', () => {
    const out = sanitizeSchemaForRjsf({
      definitions: { Foo: null },
      $defs: { Bar: null },
    } as Record<string, unknown>);
    expect(out.definitions).toEqual({ Foo: {} });
    expect(out.$defs).toEqual({ Bar: {} });
  });

  it('sanitizes items when null, array, or object', () => {
    expect(
      sanitizeSchemaForRjsf({
        type: 'array',
        items: null,
      })
    ).toMatchObject({ items: {} });

    expect(
      sanitizeSchemaForRjsf({
        type: 'array',
        items: [null, { type: 'string' }],
      })
    ).toMatchObject({ items: [{}, { type: 'string' }] });

    const nested = sanitizeSchemaForRjsf({
      type: 'array',
      items: { type: 'object', properties: { z: null } },
    });
    expect(nested.items).toEqual({ type: 'object', properties: { z: {} } });
  });

  it('walks additionalProperties when it is an object schema', () => {
    const out = sanitizeSchemaForRjsf({
      type: 'object',
      additionalProperties: { type: 'object', properties: { dyn: null } },
    });
    expect(out.additionalProperties).toEqual({
      type: 'object',
      properties: { dyn: {} },
    });
  });

  it('leaves additionalProperties boolean unchanged', () => {
    const out = sanitizeSchemaForRjsf({
      type: 'object',
      additionalProperties: true,
    });
    expect(out.additionalProperties).toBe(true);
  });

  it('replaces null branches in oneOf, anyOf, and allOf', () => {
    const out = sanitizeSchemaForRjsf({
      oneOf: [null, { type: 'string' }],
      anyOf: [null],
      allOf: [{ type: 'object', properties: { q: null } }],
    } as Record<string, unknown>);
    expect(out.oneOf).toEqual([{}, { type: 'string' }]);
    expect(out.anyOf).toEqual([{}]);
    expect(out.allOf).toEqual([{ type: 'object', properties: { q: {} } }]);
  });

  it('recurses not, if, then, else when object', () => {
    const out = sanitizeSchemaForRjsf({
      not: { type: 'object', properties: { n: null } },
      if: { type: 'object', properties: { i: null } },
      then: { type: 'object', properties: { t: null } },
      else: { type: 'object', properties: { e: null } },
    } as Record<string, unknown>);
    expect(out.not).toEqual({ type: 'object', properties: { n: {} } });
    expect(out.if).toEqual({ type: 'object', properties: { i: {} } });
    expect(out.then).toEqual({ type: 'object', properties: { t: {} } });
    expect(out.else).toEqual({ type: 'object', properties: { e: {} } });
  });

  it('maps through top-level arrays (tuple-style etc.)', () => {
    const out = sanitizeSchemaForRjsf([
      { type: 'object', properties: { a: null } },
      1,
      null,
    ] as never);
    expect(out).toEqual([{ type: 'object', properties: { a: {} } }, 1, null]);
  });
});
