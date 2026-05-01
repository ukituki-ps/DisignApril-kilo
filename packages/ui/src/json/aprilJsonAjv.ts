import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import type { ErrorObject, ValidateFunction } from 'ajv';

export type AprilJsonValidationError = {
  instancePath: string;
  message: string;
};

export type AprilJsonValidationResult = {
  valid: boolean;
  errors: AprilJsonValidationError[];
};

function mapAjvErrors(errors: ErrorObject[] | null | undefined): AprilJsonValidationError[] {
  if (!errors?.length) {
    return [];
  }
  return errors.map((e) => ({
    instancePath: e.instancePath === '' ? '(корень)' : e.instancePath,
    message: e.message ?? 'Некорректное значение',
  }));
}

function cloneJson<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}

/**
 * Compiles a JSON Schema (optionally with local `$ref` / bundled refs) into a synchronous validator.
 * External HTTP `$ref` may fail in the browser (CORS); document failures via thrown errors.
 */
export async function createAprilJsonSchemaValidator(
  schema: unknown,
  options?: { resolveRefs?: boolean }
): Promise<(data: unknown) => AprilJsonValidationResult> {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  let resolved: unknown = schema;
  if (options?.resolveRefs !== false && schema !== null && typeof schema === 'object') {
    resolved = await $RefParser.dereference(cloneJson(schema as object));
  }

  const validate = ajv.compile(resolved as object) as ValidateFunction<unknown>;

  return (data: unknown): AprilJsonValidationResult => {
    const valid = validate(data) as boolean;
    return {
      valid,
      errors: valid ? [] : mapAjvErrors(validate.errors),
    };
  };
}

/**
 * Validates `data` against `schema` in one call (async due to optional `$ref` resolution).
 */
export async function validateWithSchema(
  data: unknown,
  schema: unknown,
  options?: { resolveRefs?: boolean }
): Promise<AprilJsonValidationResult> {
  const validate = await createAprilJsonSchemaValidator(schema, options);
  return validate(data);
}
