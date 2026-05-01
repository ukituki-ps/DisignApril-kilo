import type { RJSFSchema } from '@rjsf/utils';

/**
 * RJSF's `ObjectField` passes `lodash/get(schema, ['properties', name], {})` into `SchemaField`.
 * If a property is explicitly `null`, `get` returns `null` (not the default), and
 * `resolveUiSchema(null, …)` throws when reading `__rjsf_ref`.
 */
export function sanitizeSchemaForRjsf<S extends RJSFSchema = RJSFSchema>(schema: S): S {
  return sanitizeNode(schema) as S;
}

function sanitizeNode(node: unknown): unknown {
  if (node === null || typeof node !== 'object') {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map((x) => sanitizeNode(x));
  }
  const o = { ...(node as Record<string, unknown>) };

  const fixPropertyMap = (key: string) => {
    const v = o[key];
    if (v === null) {
      o[key] = {};
      return;
    }
    if (typeof v !== 'object' || Array.isArray(v)) {
      return;
    }
    const m = { ...(v as Record<string, unknown>) };
    for (const k of Object.keys(m)) {
      if (m[k] === null) {
        m[k] = {};
      } else {
        m[k] = sanitizeNode(m[k]);
      }
    }
    o[key] = m;
  };

  fixPropertyMap('properties');
  fixPropertyMap('patternProperties');
  fixPropertyMap('definitions');
  fixPropertyMap('$defs');

  if ('items' in o) {
    if (o.items === null) {
      o.items = {};
    } else if (Array.isArray(o.items)) {
      o.items = o.items.map((x) => (x === null ? {} : sanitizeNode(x)));
    } else if (typeof o.items === 'object') {
      o.items = sanitizeNode(o.items);
    }
  }

  const ap = o.additionalProperties;
  if (typeof ap === 'object' && ap !== null && !Array.isArray(ap)) {
    o.additionalProperties = sanitizeNode(ap);
  }

  for (const k of ['oneOf', 'anyOf', 'allOf'] as const) {
    if (Array.isArray(o[k])) {
      o[k] = (o[k] as unknown[]).map((x) => (x === null ? {} : sanitizeNode(x)));
    }
  }
  for (const k of ['not', 'if', 'then', 'else'] as const) {
    if (k in o && o[k] !== null && typeof o[k] === 'object' && !Array.isArray(o[k])) {
      o[k] = sanitizeNode(o[k]);
    }
  }

  return o;
}
