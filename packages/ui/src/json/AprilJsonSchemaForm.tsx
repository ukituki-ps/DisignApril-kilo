import { useMemo } from 'react';
import Form, { type FormProps, type IChangeEvent } from '@rjsf/core';
import type {
  ErrorTransformer,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  UiSchema,
  ValidatorType,
} from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { sanitizeSchemaForRjsf } from './aprilRjsfSanitizeSchema';
import { aprilRjsfTemplateOverrides } from './aprilRjsfTemplates';
import { aprilRjsfWidgetOverrides } from './aprilRjsfWidgets';

const defaultValidator = validator;

export type AprilJsonSchemaFormProps<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
> = Pick<
  FormProps<T, S, F>,
  | 'uiSchema'
  | 'disabled'
  | 'readonly'
  | 'transformErrors'
  | 'onSubmit'
  | 'onBlur'
  | 'onFocus'
  | 'onError'
  | 'id'
  | 'className'
  | 'noHtml5Validate'
  | 'extraErrors'
  | 'children'
> & {
  schema: S;
  formData: T;
  /** Called when the user edits the form; receives latest `formData`. */
  onChange: (formData: T, event?: IChangeEvent<T, S, F>) => void;
  /** Defaults to the preconfigured AJV8 validator from `@rjsf/validator-ajv8`. */
  validator?: ValidatorType<T, S, F>;
  /** Default `'onChange'` for immediate feedback. */
  liveValidate?: FormProps<T, S, F>['liveValidate'];
  /** Default `'top'` to match April JSON validation summary placement. */
  showErrorList?: FormProps<T, S, F>['showErrorList'];
  /** When true, merges `ui:submitButtonOptions.norender` so the default RJSF submit is hidden (use an external `type="submit"` with matching `form` id). */
  hideDefaultSubmit?: boolean;
};

/**
 * JSON Schema–driven form using RJSF with Mantine 7 widgets/templates and `@rjsf/validator-ajv8`.
 * Human-readable / localized messages: pass `transformErrors` (RJSF contract).
 */
export function AprilJsonSchemaForm<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>({
  schema,
  formData,
  onChange,
  uiSchema,
  disabled,
  readonly,
  transformErrors,
  validator = defaultValidator as ValidatorType<T, S, F>,
  liveValidate = 'onChange',
  showErrorList = 'top',
  hideDefaultSubmit = false,
  children,
  ...rest
}: AprilJsonSchemaFormProps<T, S, F>) {
  const mergedUiSchema = useMemo(() => {
    if (!hideDefaultSubmit) {
      return uiSchema as UiSchema<T, S, F> | undefined;
    }
    const base = (uiSchema && typeof uiSchema === 'object' ? uiSchema : {}) as Record<string, unknown>;
    const prev = (base['ui:submitButtonOptions'] as Record<string, unknown>) ?? {};
    return {
      ...base,
      'ui:submitButtonOptions': { ...prev, norender: true },
    } as UiSchema<T, S, F>;
  }, [hideDefaultSubmit, uiSchema]);

  const safeSchema = useMemo(() => sanitizeSchemaForRjsf(schema), [schema]);

  return (
    <Form<T, S, F>
      {...rest}
      schema={safeSchema}
      formData={formData}
      uiSchema={mergedUiSchema}
      validator={validator}
      widgets={aprilRjsfWidgetOverrides as unknown as FormProps<T, S, F>['widgets']}
      templates={aprilRjsfTemplateOverrides as unknown as FormProps<T, S, F>['templates']}
      disabled={disabled}
      readonly={readonly}
      transformErrors={transformErrors as ErrorTransformer<T, S, F> | undefined}
      liveValidate={liveValidate}
      showErrorList={showErrorList}
      onChange={(evt) => onChange(evt.formData as T, evt)}
      noHtml5Validate>
      {children}
    </Form>
  );
}
