import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Paper, Stack, Text, TextInput, useComputedColorScheme, useMantineTheme } from '@mantine/core';
import { JsonEditor, type JsonData, type JsonEditorProps } from 'json-edit-react';
import { Search } from 'lucide-react';
import { useDensity } from '../DensityContext';
import { AprilJsonCollectionTextEditor } from './AprilJsonCollectionTextEditor';
import { createAprilJsonEditIcons } from './createAprilJsonEditIcons';
import {
  aprilJsonTreeRootLayout,
  createAprilJsonEditTheme,
} from './createAprilJsonEditTheme';
import {
  createAprilJsonSchemaValidator,
  type AprilJsonValidationError,
} from './aprilJsonAjv';
import { AprilJsonValidationSummary } from './AprilJsonValidationSummary';

export type AprilJsonTreeEditorProps = {
  data: Record<string, unknown> | unknown[];
  setData?: (data: Record<string, unknown> | unknown[]) => void;
  readOnly?: boolean;
  rootName?: string;
  /** When set, `data` is validated and errors are shown above the tree. */
  validationSchema?: unknown;
  /** When false, `$ref` is not dereferenced (Ajv compiles the raw schema). Default true. */
  resolveValidationSchemaRefs?: boolean;
  showSearch?: boolean;
  searchFilter?: 'key' | 'value' | 'all';
  className?: string;
  /** Passed through to JsonEditor except fields owned by this wrapper. */
  jsonEditorProps?: Omit<
    JsonEditorProps,
    | 'data'
    | 'setData'
    | 'viewOnly'
    | 'theme'
    | 'icons'
    | 'searchText'
    | 'searchFilter'
    | 'TextEditor'
    | 'rootName'
    | 'minWidth'
    | 'maxWidth'
    | 'rootFontSize'
  >;
};

export function AprilJsonTreeEditor({
  data,
  setData,
  readOnly = false,
  rootName = 'root',
  validationSchema,
  resolveValidationSchemaRefs = true,
  showSearch = false,
  searchFilter = 'all',
  className,
  jsonEditorProps,
}: AprilJsonTreeEditorProps) {
  const mantineTheme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light');
  const { density } = useDensity();
  const [searchText, setSearchText] = useState('');
  const [validationErrors, setValidationErrors] = useState<AprilJsonValidationError[]>([]);
  const [validatorError, setValidatorError] = useState<string | null>(null);
  const [validate, setValidate] = useState<
    ((value: unknown) => { valid: boolean; errors: AprilJsonValidationError[] }) | null
  >(null);

  const jerTheme = useMemo(
    () =>
      createAprilJsonEditTheme({
        mantineTheme,
        colorScheme,
        density,
      }),
    [mantineTheme, colorScheme, density]
  );

  const icons = useMemo(() => createAprilJsonEditIcons(density), [density]);

  const layout = useMemo(() => aprilJsonTreeRootLayout(density), [density]);
  const indent = density === 'compact' ? 1.65 : 2;

  useEffect(() => {
    if (validationSchema === undefined) {
      setValidate(null);
      setValidatorError(null);
      setValidationErrors([]);
      return;
    }

    let cancelled = false;
    setValidatorError(null);

    void (async () => {
      try {
        const v = await createAprilJsonSchemaValidator(validationSchema, {
          resolveRefs: resolveValidationSchemaRefs,
        });
        if (!cancelled) {
          setValidate(v);
        }
      } catch (e) {
        if (!cancelled) {
          setValidate(null);
          setValidatorError(e instanceof Error ? e.message : String(e));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [validationSchema, resolveValidationSchemaRefs]);

  useEffect(() => {
    if (!validate) {
      setValidationErrors([]);
      return;
    }
    const { errors, valid } = validate(data);
    setValidationErrors(valid ? [] : errors);
  }, [data, validate]);

  const inputSize = density === 'compact' ? 'xs' : 'sm';

  const handleSetData = useCallback(
    (next: JsonData) => {
      if (readOnly) {
        return;
      }
      if (next !== null && typeof next === 'object') {
        setData?.(next as Record<string, unknown> | unknown[]);
      }
    },
    [readOnly, setData]
  );

  return (
    <Stack gap="sm">
      {validatorError ? (
        <Alert color="red" title="Schema preparation failed">
          <Text size="sm">{validatorError}</Text>
          <Text size="xs" c="dimmed" mt="xs">
            External <code>$ref</code> URLs may be blocked by CORS in the browser; use inline or
            bundled references for portable validation.
          </Text>
        </Alert>
      ) : null}

      <AprilJsonValidationSummary
        title="Validation"
        items={validationErrors.map((err) => ({
          path: err.instancePath,
          message: err.message,
        }))}
      />

      {showSearch ? (
        <TextInput
          size={inputSize}
          label="Search"
          placeholder="Filter by key or value"
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          leftSection={<Search size={14} aria-hidden />}
          aria-label="Filter JSON tree"
        />
      ) : null}

      <Paper withBorder p="xs" radius="md">
        <JsonEditor
          {...jsonEditorProps}
          data={data}
          setData={readOnly ? undefined : handleSetData}
          viewOnly={readOnly}
          rootName={rootName}
          theme={jerTheme}
          icons={icons}
          TextEditor={AprilJsonCollectionTextEditor}
          searchText={showSearch ? searchText : undefined}
          searchFilter={searchFilter}
          showIconTooltips
          indent={indent}
          minWidth={layout.minWidth}
          maxWidth={layout.maxWidth}
          className={className}
        />
      </Paper>
    </Stack>
  );
}
