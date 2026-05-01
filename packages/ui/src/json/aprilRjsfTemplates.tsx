import { isValidElement } from 'react';
import { Button, Group, Input, Paper, Stack, Text } from '@mantine/core';
import { Plus } from 'lucide-react';
import {
  buttonId,
  canExpand,
  descriptionId,
  getSubmitButtonOptions,
  getTemplate,
  getUiOptions,
  titleId,
  TranslatableString,
  type ArrayFieldTemplateProps,
  type ErrorListProps,
  type FieldErrorProps,
  type FieldTemplateProps,
  type FormContextType,
  type IconButtonProps,
  type ObjectFieldTemplateProps,
  type RJSFSchema,
  type StrictRJSFSchema,
  type SubmitButtonProps,
} from '@rjsf/utils';
import { useDensity } from '../DensityContext';
import { AprilJsonValidationSummary } from './AprilJsonValidationSummary';
import { aprilJsonMantineFieldSize } from './aprilJsonMantineFieldSize';

export function AprilRjsfAddButton<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: IconButtonProps<T, S, F>
) {
  const { id, className, onClick, disabled, registry } = props;
  const { translateString } = registry;
  const { density } = useDensity();
  const size = aprilJsonMantineFieldSize(density);
  const label = translateString(TranslatableString.AddButton);
  return (
    <Group justify="flex-end" className={className}>
      <Button
        id={id}
        type="button"
        variant="light"
        leftSection={<Plus size={14} aria-hidden />}
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        size={size}>
        {label}
      </Button>
    </Group>
  );
}

export function AprilRjsfSubmitButton<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: SubmitButtonProps<T, S, F>
) {
  const { uiSchema } = props;
  const { submitText, norender, props: btnProps = {} } = getSubmitButtonOptions(uiSchema);
  const { density } = useDensity();
  const size = aprilJsonMantineFieldSize(density);
  if (norender) {
    return null;
  }
  return (
    <Group justify="flex-end" mt="md">
      <Button {...btnProps} type="submit" size={size}>
        {submitText}
      </Button>
    </Group>
  );
}

export function AprilRjsfFieldTemplate<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: FieldTemplateProps<T, S, F>
) {
  const {
    id,
    label,
    children,
    errors,
    help,
    description,
    hidden,
    required,
    displayLabel,
    registry,
    uiSchema,
  } = props;
  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate('WrapIfAdditionalTemplate', registry, uiOptions);
  const { density } = useDensity();
  const size = aprilJsonMantineFieldSize(density);

  if (hidden) {
    return <div className="hidden">{children}</div>;
  }

  const isCheckbox = uiOptions.widget === 'checkbox';

  return (
    <WrapIfAdditionalTemplate {...props}>
      <Stack gap="xs">
        {displayLabel && !isCheckbox ? (
          <Input.Label htmlFor={id} required={required} size={size}>
            {label}
          </Input.Label>
        ) : null}
        {displayLabel && description ? description : null}
        {children}
        {errors}
        {help}
      </Stack>
    </WrapIfAdditionalTemplate>
  );
}

export function AprilRjsfObjectFieldTemplate<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: ObjectFieldTemplateProps<T, S, F>
) {
  const {
    className,
    description,
    disabled,
    formData,
    fieldPathId,
    onAddProperty,
    optionalDataControl,
    properties,
    readonly,
    registry,
    required,
    schema,
    title,
    uiSchema,
  } = props;
  const options = getUiOptions(uiSchema);
  const TitleFieldTemplate = getTemplate('TitleFieldTemplate', registry, options);
  const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
  const isPureUnionSchema =
    (schema.oneOf || schema.anyOf) && !schema.properties && properties.length === 0;
  if (isPureUnionSchema) {
    return null;
  }
  const showOptionalDataControlInTitle = !readonly && !disabled;
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  return (
    <fieldset
      className={className}
      id={fieldPathId.$id}
      style={{
        border: 'none',
        padding: 0,
        margin: 0,
        minWidth: 0,
      }}>
      <Stack gap="sm">
        {title ? (
          <TitleFieldTemplate
            id={titleId(fieldPathId)}
            title={title}
            required={required}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
            optionalDataControl={showOptionalDataControlInTitle ? optionalDataControl : undefined}
          />
        ) : null}
        {description ? (
          <DescriptionFieldTemplate
            id={descriptionId(fieldPathId)}
            description={description}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
        ) : null}
        {!showOptionalDataControlInTitle ? optionalDataControl : null}
        <Stack gap="sm">{properties.map((prop) => prop.content)}</Stack>
        {canExpand(schema, uiSchema, formData) ? (
          <AddButton
            id={buttonId(fieldPathId, 'add')}
            className="rjsf-object-property-expand"
            onClick={onAddProperty}
            disabled={disabled || readonly}
            uiSchema={uiSchema}
            registry={registry}
          />
        ) : null}
      </Stack>
    </fieldset>
  );
}

export function AprilRjsfArrayFieldTemplate<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: ArrayFieldTemplateProps<T, S, F>
) {
  const {
    canAdd,
    className,
    disabled,
    fieldPathId,
    uiSchema,
    items,
    optionalDataControl,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
  } = props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldDescriptionTemplate = getTemplate('ArrayFieldDescriptionTemplate', registry, uiOptions);
  const ArrayFieldTitleTemplate = getTemplate('ArrayFieldTitleTemplate', registry, uiOptions);
  const showOptionalDataControlInTitle = !readonly && !disabled;
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;

  return (
    <fieldset
      className={className}
      id={fieldPathId.$id}
      style={{
        border: 'none',
        padding: 0,
        margin: 0,
        minWidth: 0,
      }}>
      <Stack gap="sm">
        <ArrayFieldTitleTemplate
          fieldPathId={fieldPathId}
          title={uiOptions.title || title}
          required={required}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
          optionalDataControl={showOptionalDataControlInTitle ? optionalDataControl : undefined}
        />
        <ArrayFieldDescriptionTemplate
          fieldPathId={fieldPathId}
          description={uiOptions.description || schema.description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
        {!showOptionalDataControlInTitle ? optionalDataControl : null}
        <Stack gap="sm">
          {items.map((item, index) => (
            <Paper key={index} withBorder p="sm" radius="md">
              {item}
            </Paper>
          ))}
        </Stack>
        {canAdd ? (
          <AddButton
            id={buttonId(fieldPathId, 'add')}
            className="rjsf-array-item-add"
            onClick={onAddClick}
            disabled={disabled || readonly}
            uiSchema={uiSchema}
            registry={registry}
          />
        ) : null}
      </Stack>
    </fieldset>
  );
}

export function AprilRjsfErrorListTemplate<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: ErrorListProps<T, S, F>
) {
  const { errors } = props;
  return (
    <AprilJsonValidationSummary
      title="Validation"
      items={errors.map((e) => ({
        path: e.property?.trim() ? e.property : '(root)',
        message: e.stack || e.message || 'Invalid',
      }))}
    />
  );
}

export function AprilRjsfFieldErrorTemplate<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: FieldErrorProps<T, S, F>
) {
  const { errors = [], fieldPathId } = props;
  const { density } = useDensity();
  const size = aprilJsonMantineFieldSize(density);
  if (!errors.length) {
    return null;
  }
  return (
    <Stack gap={4} id={`${fieldPathId.$id}-error`} mt={4}>
      {errors
        .filter(Boolean)
        .map((error, index) => (
          <Text key={index} size={size} c="red" component="div">
            {typeof error === 'string' ? error : isValidElement(error) ? error : String(error)}
          </Text>
        ))}
    </Stack>
  );
}

/** Mantine layout templates for `Form` `templates` prop (defaults fill the rest). */
// eslint-disable-next-line react-refresh/only-export-components -- RJSF registry map, not a route module
export const aprilRjsfTemplateOverrides = {
  FieldTemplate: AprilRjsfFieldTemplate,
  ObjectFieldTemplate: AprilRjsfObjectFieldTemplate,
  ArrayFieldTemplate: AprilRjsfArrayFieldTemplate,
  ErrorListTemplate: AprilRjsfErrorListTemplate,
  FieldErrorTemplate: AprilRjsfFieldErrorTemplate,
  ButtonTemplates: {
    AddButton: AprilRjsfAddButton,
    SubmitButton: AprilRjsfSubmitButton,
  },
};
