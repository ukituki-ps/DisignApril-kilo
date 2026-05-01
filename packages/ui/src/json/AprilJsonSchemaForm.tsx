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
  children,
  ...rest
}: AprilJsonSchemaFormProps<T, S, F>) {
  return (
    <Form<T, S, F>
      {...rest}
      schema={schema}
      formData={formData}
      uiSchema={uiSchema as UiSchema<T, S, F>}
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
