import { useCallback } from 'react';
import { Checkbox, NumberInput, Select, TextInput, Textarea } from '@mantine/core';
import type {
  FormContextType,
  RJSFSchema,
  RegistryWidgetsType,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { ariaDescribedByIds } from '@rjsf/utils';
import { useDensity } from '../DensityContext';
import { useAprilRjsfArrayItemToolbar } from './AprilRjsfArrayItemToolbarContext';
import { aprilJsonMantineFieldSize } from './aprilJsonMantineFieldSize';

function useAprilFieldSize(): 'xs' | 'sm' {
  const { density } = useDensity();
  return aprilJsonMantineFieldSize(density);
}

export function AprilRjsfTextWidget<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    htmlName,
    rawErrors,
  } = props;
  const size = useAprilFieldSize();
  const arrayItemToolbar = useAprilRjsfArrayItemToolbar();
  const inlineToolbar = arrayItemToolbar?.toolbar;

  return (
    <TextInput
      id={id}
      name={htmlName || id}
      value={value ?? ''}
      onChange={(e) => onChange(e.currentTarget.value === '' ? undefined : e.currentTarget.value)}
      onBlur={(e) => onBlur(id, e.currentTarget.value)}
      onFocus={(e) => onFocus(id, e.currentTarget.value)}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      placeholder={placeholder}
      aria-describedby={ariaDescribedByIds(id)}
      error={rawErrors?.join(', ')}
      size={size}
      {...(inlineToolbar
        ? {
            rightSection: inlineToolbar,
            rightSectionPointerEvents: 'auto' as const,
            rightSectionWidth: '7.5rem',
            rightSectionProps: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              },
            },
          }
        : {})}
    />
  );
}

export function AprilRjsfTextareaWidget<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    options = {},
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    htmlName,
    rawErrors,
  } = props;
  const size = useAprilFieldSize();
  const rows = typeof options.rows === 'number' ? options.rows : 4;

  const handleChange = useCallback(
    (v: string) => onChange(v === '' ? options.emptyValue : v),
    [onChange, options]
  );

  return (
    <Textarea
      id={id}
      name={htmlName || id}
      value={value ?? ''}
      onChange={(e) => handleChange(e.currentTarget.value)}
      onBlur={(e) => onBlur(id, e.currentTarget.value)}
      onFocus={(e) => onFocus(id, e.currentTarget.value)}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      placeholder={placeholder}
      minRows={rows}
      aria-describedby={ariaDescribedByIds(id)}
      error={rawErrors?.join(', ')}
      size={size}
    />
  );
}

export function AprilRjsfNumberWidget<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    htmlName,
    rawErrors,
    schema,
  } = props;
  const size = useAprilFieldSize();
  const arrayItemToolbar = useAprilRjsfArrayItemToolbar();
  const inlineToolbar = arrayItemToolbar?.toolbar;
  const min = typeof schema.minimum === 'number' ? schema.minimum : undefined;
  const max = typeof schema.maximum === 'number' ? schema.maximum : undefined;
  const step: number | undefined = schema.multipleOf === 1 || schema.type === 'integer' ? 1 : undefined;

  return (
    <NumberInput
      id={id}
      name={htmlName || id}
      value={typeof value === 'number' ? value : value === '' ? undefined : (value as number | undefined)}
      onChange={(v) => {
        if (v === '' || v === undefined) {
          onChange(undefined);
        } else {
          onChange(v as number);
        }
      }}
      onBlur={() => onBlur(id, value)}
      onFocus={() => onFocus(id, value)}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      clampBehavior="strict"
      aria-describedby={ariaDescribedByIds(id)}
      error={rawErrors?.join(', ')}
      size={size}
      hideControls={Boolean(inlineToolbar)}
      {...(inlineToolbar
        ? {
            rightSection: inlineToolbar,
            rightSectionPointerEvents: 'auto' as const,
            rightSectionWidth: '7.5rem',
            rightSectionProps: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              },
            },
          }
        : {})}
    />
  );
}

export function AprilRjsfCheckboxWidget<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WidgetProps<T, S, F>) {
  const { id, value, disabled, readonly, autofocus, onChange, onBlur, onFocus, label, htmlName, rawErrors } = props;
  const size = useAprilFieldSize();

  return (
    <Checkbox
      id={id}
      name={htmlName || id}
      checked={Boolean(value)}
      onChange={(e) => onChange(e.currentTarget.checked)}
      onBlur={() => onBlur(id, value)}
      onFocus={() => onFocus(id, value)}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      label={label}
      aria-describedby={ariaDescribedByIds(id)}
      error={rawErrors?.join(', ')}
      size={size}
    />
  );
}

export function AprilRjsfSelectWidget<
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = FormContextType,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    htmlName,
    rawErrors,
    multiple,
  } = props;
  const size = useAprilFieldSize();
  const enumOptions = options.enumOptions ?? [];

  const data = enumOptions.map((opt, i) => ({
    value: String(i),
    label: String(opt.label ?? opt.value),
  }));

  const selectedIndex = enumOptions.findIndex((o) => o.value === value);
  const selectValue = selectedIndex >= 0 ? String(selectedIndex) : null;

  if (multiple) {
    return (
      <TextInput
        id={id}
        name={htmlName || id}
        value="Множественный выбор в AprilJsonSchemaForm не поддерживается"
        disabled
        size={size}
        error={rawErrors?.join(', ')}
      />
    );
  }

  return (
    <Select
      id={id}
      name={htmlName || id}
      data={data}
      value={selectValue}
      onChange={(v) => {
        if (v === null) {
          onChange(undefined);
          return;
        }
        const idx = Number(v);
        const opt = enumOptions[idx];
        if (opt) {
          onChange(opt.value);
        }
      }}
      onBlur={() => onBlur(id, value)}
      onFocus={() => onFocus(id, value)}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      placeholder={placeholder}
      clearable={!required}
      aria-describedby={ariaDescribedByIds(id)}
      error={rawErrors?.join(', ')}
      size={size}
    />
  );
}

/** Mantine-backed widgets merged into RJSF defaults via `Form` `widgets` prop. */
// eslint-disable-next-line react-refresh/only-export-components -- RJSF registry map, not a route module
export const aprilRjsfWidgetOverrides: RegistryWidgetsType<
  unknown,
  RJSFSchema,
  FormContextType
> = {
  TextWidget: AprilRjsfTextWidget,
  EmailWidget: AprilRjsfTextWidget,
  URLWidget: AprilRjsfTextWidget,
  PasswordWidget: AprilRjsfTextWidget,
  TextareaWidget: AprilRjsfTextareaWidget,
  UpDownWidget: AprilRjsfNumberWidget,
  SelectWidget: AprilRjsfSelectWidget,
  CheckboxWidget: AprilRjsfCheckboxWidget,
};
