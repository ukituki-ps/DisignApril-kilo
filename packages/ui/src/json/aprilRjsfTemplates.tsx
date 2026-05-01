import { isValidElement, type ReactNode } from 'react';
import { ActionIcon, Box, Button, Group, Input, Paper, Stack, Text } from '@mantine/core';
import { ArrowDown, ArrowUp, Clipboard, Plus, Send, Trash2, X } from 'lucide-react';
import {
  buttonId,
  canExpand,
  descriptionId,
  getSubmitButtonOptions,
  getTemplate,
  getUiOptions,
  titleId,
  TranslatableString,
  type ArrayFieldItemButtonsTemplateProps,
  type ArrayFieldItemTemplateProps,
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
import { AprilRjsfArrayItemToolbarProvider } from './AprilRjsfArrayItemToolbarContext';
import { AprilJsonValidationSummary } from './AprilJsonValidationSummary';
import { aprilJsonMantineFieldSize } from './aprilJsonMantineFieldSize';

/** Plain scalar array items: toolbar goes into Mantine `Input` right section (aligned with control). */
function schemaSupportsInlineArrayToolbar(schema: RJSFSchema): boolean {
  if (Array.isArray(schema.enum) && schema.enum.length > 0) {
    return false;
  }
  const t = schema.type;
  if (t === 'string' || t === 'number' || t === 'integer') {
    return true;
  }
  if (Array.isArray(t)) {
    return t.some((x) => x === 'string' || x === 'number' || x === 'integer');
  }
  return false;
}

function useAprilRjsfToolbarActionIconSize(): 'sm' | 'md' {
  const { density } = useDensity();
  return density === 'compact' ? 'sm' : 'md';
}

function useAprilRjsfToolbarGlyphSize(): number {
  const { density } = useDensity();
  return density === 'compact' ? 14 : 16;
}

function pickRjsfToolbarIconProps<T, S extends StrictRJSFSchema, F extends FormContextType>(props: IconButtonProps<T, S, F>) {
  const { id, className, disabled, onClick, title } = props;
  return { id, className, disabled, onClick, title };
}

export function AprilRjsfCopyButton<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: IconButtonProps<T, S, F>
) {
  const { id, className, disabled, onClick, title } = pickRjsfToolbarIconProps(props);
  const size = useAprilRjsfToolbarActionIconSize();
  const glyph = useAprilRjsfToolbarGlyphSize();
  return (
    <ActionIcon
      id={id}
      type="button"
      variant="subtle"
      size={size}
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={typeof title === 'string' ? title : undefined}>
      <Clipboard size={glyph} aria-hidden strokeWidth={2} />
    </ActionIcon>
  );
}

export function AprilRjsfMoveUpButton<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: IconButtonProps<T, S, F>
) {
  const { id, className, disabled, onClick, title } = pickRjsfToolbarIconProps(props);
  const size = useAprilRjsfToolbarActionIconSize();
  const glyph = useAprilRjsfToolbarGlyphSize();
  return (
    <ActionIcon
      id={id}
      type="button"
      variant="subtle"
      size={size}
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={typeof title === 'string' ? title : undefined}>
      <ArrowUp size={glyph} aria-hidden strokeWidth={2} />
    </ActionIcon>
  );
}

export function AprilRjsfMoveDownButton<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: IconButtonProps<T, S, F>
) {
  const { id, className, disabled, onClick, title } = pickRjsfToolbarIconProps(props);
  const size = useAprilRjsfToolbarActionIconSize();
  const glyph = useAprilRjsfToolbarGlyphSize();
  return (
    <ActionIcon
      id={id}
      type="button"
      variant="subtle"
      size={size}
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={typeof title === 'string' ? title : undefined}>
      <ArrowDown size={glyph} aria-hidden strokeWidth={2} />
    </ActionIcon>
  );
}

export function AprilRjsfRemoveButton<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: IconButtonProps<T, S, F>
) {
  const { id, className, disabled, onClick, title } = pickRjsfToolbarIconProps(props);
  const size = useAprilRjsfToolbarActionIconSize();
  const glyph = useAprilRjsfToolbarGlyphSize();
  return (
    <ActionIcon
      id={id}
      type="button"
      variant="subtle"
      color="red"
      size={size}
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={typeof title === 'string' ? title : undefined}>
      <Trash2 size={glyph} aria-hidden strokeWidth={2} />
    </ActionIcon>
  );
}

export function AprilRjsfClearButton<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: IconButtonProps<T, S, F>
) {
  const { id, className, disabled, onClick, title } = pickRjsfToolbarIconProps(props);
  const size = useAprilRjsfToolbarActionIconSize();
  const glyph = useAprilRjsfToolbarGlyphSize();
  return (
    <ActionIcon
      id={id}
      type="button"
      variant="subtle"
      size={size}
      className={className}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={typeof title === 'string' ? title : undefined}>
      <X size={glyph} aria-hidden strokeWidth={2} />
    </ActionIcon>
  );
}

export function AprilRjsfAddButton<T = unknown, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = FormContextType>(
  props: IconButtonProps<T, S, F>
) {
  const { id, className, onClick, disabled, registry } = props;
  const { translateString } = registry;
  const { density } = useDensity();
  const size = aprilJsonMantineFieldSize(density);
  const label = translateString(TranslatableString.AddButton);
  const glyph = useAprilRjsfToolbarGlyphSize();
  return (
    <Group justify="flex-end" className={className}>
      <ActionIcon
        id={id}
        type="button"
        variant="light"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        title={label}
        size={size}>
        <Plus size={glyph} strokeWidth={2} aria-hidden />
      </ActionIcon>
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
  const glyph = useAprilRjsfToolbarGlyphSize();
  if (norender) {
    return null;
  }
  const { children: _omitChildren, ...restBtnProps } = btnProps as { children?: ReactNode } & Record<string, unknown>;
  void _omitChildren;
  return (
    <Group justify="flex-end" mt="md">
      <Button
        {...(restBtnProps as typeof btnProps)}
        type="submit"
        size={size}
        px="xs"
        aria-label={submitText}
        title={submitText}>
        <Send size={glyph} strokeWidth={2} aria-hidden style={{ display: 'block' }} />
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

/** Toolbar buttons with DS spacing (replaces Bootstrap `btn-group` flush layout). */
export function AprilRjsfArrayFieldItemButtonsTemplate<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: ArrayFieldItemButtonsTemplateProps<T, S, F>) {
  const {
    disabled,
    hasCopy,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    fieldPathId,
    onCopyItem,
    onRemoveItem,
    onMoveDownItem,
    onMoveUpItem,
    readonly,
    registry,
    uiSchema,
  } = props;
  const { translateString } = registry;
  const { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } = registry.templates.ButtonTemplates;

  return (
    <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
      {(hasMoveUp || hasMoveDown) && (
        <MoveUpButton
          id={buttonId(fieldPathId, 'moveUp')}
          className="rjsf-array-item-move-up"
          title={translateString(TranslatableString.MoveUpButton)}
          disabled={disabled || readonly || !hasMoveUp}
          onClick={onMoveUpItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {(hasMoveUp || hasMoveDown) && (
        <MoveDownButton
          id={buttonId(fieldPathId, 'moveDown')}
          className="rjsf-array-item-move-down"
          title={translateString(TranslatableString.MoveDownButton)}
          disabled={disabled || readonly || !hasMoveDown}
          onClick={onMoveDownItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {hasCopy && (
        <CopyButton
          id={buttonId(fieldPathId, 'copy')}
          className="rjsf-array-item-copy"
          title={translateString(TranslatableString.CopyButton)}
          disabled={disabled || readonly}
          onClick={onCopyItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {hasRemove && (
        <RemoveButton
          id={buttonId(fieldPathId, 'remove')}
          className="rjsf-array-item-remove"
          title={translateString(TranslatableString.RemoveButton)}
          disabled={disabled || readonly}
          onClick={onRemoveItem}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </Group>
  );
}

/** One array row: inline toolbar inside scalar inputs, else field + toolbar row. */
export function AprilRjsfArrayFieldItemTemplate<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: ArrayFieldItemTemplateProps<T, S, F>) {
  const { children, className, buttonsProps, hasToolbar, registry, uiSchema, displayLabel, schema } = props;
  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldItemButtonsTemplate = getTemplate('ArrayFieldItemButtonsTemplate', registry, uiOptions);

  const toolbar = hasToolbar ? <ArrayFieldItemButtonsTemplate {...buttonsProps} /> : null;
  const useInlineToolbar = Boolean(toolbar) && schemaSupportsInlineArrayToolbar(schema);

  if (useInlineToolbar) {
    return (
      <div className={className} style={{ width: '100%' }}>
        <AprilRjsfArrayItemToolbarProvider value={{ toolbar }}>{children}</AprilRjsfArrayItemToolbarProvider>
      </div>
    );
  }

  return (
    <Group
      className={className}
      wrap="nowrap"
      align={displayLabel ? 'center' : 'flex-start'}
      gap="md"
      style={{ width: '100%' }}>
      <Box style={{ flex: 1, minWidth: 0 }}>
        {children}
      </Box>
      {toolbar}
    </Group>
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
      title="Проверка данных"
      items={errors.map((e) => ({
        path: e.property?.trim() ? e.property : '(корень)',
        message: e.stack || e.message || 'Ошибка',
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
  ArrayFieldItemTemplate: AprilRjsfArrayFieldItemTemplate,
  ArrayFieldItemButtonsTemplate: AprilRjsfArrayFieldItemButtonsTemplate,
  ArrayFieldTemplate: AprilRjsfArrayFieldTemplate,
  ErrorListTemplate: AprilRjsfErrorListTemplate,
  FieldErrorTemplate: AprilRjsfFieldErrorTemplate,
  ButtonTemplates: {
    AddButton: AprilRjsfAddButton,
    SubmitButton: AprilRjsfSubmitButton,
    CopyButton: AprilRjsfCopyButton,
    MoveUpButton: AprilRjsfMoveUpButton,
    MoveDownButton: AprilRjsfMoveDownButton,
    RemoveButton: AprilRjsfRemoveButton,
    ClearButton: AprilRjsfClearButton,
  },
};
