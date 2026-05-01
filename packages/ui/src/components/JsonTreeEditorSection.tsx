import { useMemo, useState } from 'react';
import { Button, Code, Group, Stack, Tabs, Text, Title } from '@mantine/core';
import type { RJSFSchema } from '@rjsf/utils';
import { AprilJsonSchemaForm } from '../json/AprilJsonSchemaForm';
import { AprilJsonTreeEditor } from '../json/AprilJsonTreeEditor';
import {
  jsonTreeEditorInvalidInstance,
  jsonTreeEditorSampleInstance,
  jsonTreeEditorSampleSchema,
} from './JsonTreeEditorSection.samples';

function deepClone<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}

export function JsonTreeEditorSection() {
  const initialSchema = useMemo(() => deepClone(jsonTreeEditorSampleSchema), []);
  const initialInstance = useMemo(() => deepClone(jsonTreeEditorSampleInstance), []);

  const [schemaData, setSchemaData] = useState<Record<string, unknown>>(() =>
    deepClone(jsonTreeEditorSampleSchema) as Record<string, unknown>
  );
  const [instanceData, setInstanceData] = useState<Record<string, unknown>>(() =>
    deepClone(jsonTreeEditorSampleInstance) as Record<string, unknown>
  );

  const [instanceTab, setInstanceTab] = useState<string | null>('form');

  const resetDemos = () => {
    setSchemaData(deepClone(initialSchema) as Record<string, unknown>);
    setInstanceData(deepClone(initialInstance) as Record<string, unknown>);
  };

  const loadInvalidInstance = () => {
    setInstanceData(deepClone(jsonTreeEditorInvalidInstance) as Record<string, unknown>);
    setInstanceTab('form');
  };

  const schemaForRjsf = schemaData as unknown as RJSFSchema;

  return (
    <Stack gap="xl">
      <Group justify="flex-end" wrap="wrap" gap="sm">
        <Button variant="light" color="red" onClick={loadInvalidInstance}>
          Load invalid instance (validation)
        </Button>
        <Button variant="light" onClick={resetDemos}>
          Reset demos
        </Button>
      </Group>

      <Stack gap="md">
        <Title order={4}>JSON Schema (editable tree)</Title>
        <Text size="sm" c="dimmed">
          Edit the schema as JSON. The form and instance tree below use this object for validation.
        </Text>
        <AprilJsonTreeEditor
          data={schemaData}
          setData={(d) => setSchemaData(d as Record<string, unknown>)}
          rootName="schema"
          showSearch
          searchFilter="all"
        />
      </Stack>

      <Stack gap="md">
        <Title order={4}>Instance data: form vs tree</Title>
        <Text size="sm" c="dimmed">
          Same <Code>schema</Code> and <Code>formData</Code> — switch tabs to compare RJSF (Mantine widgets) with the
          json-edit-react tree. Try <Code>Load invalid instance</Code> to surface Ajv errors in both modes.
        </Text>
        <Tabs value={instanceTab} onChange={setInstanceTab}>
          <Tabs.List>
            <Tabs.Tab value="form">Form</Tabs.Tab>
            <Tabs.Tab value="tree">Tree</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="form" pt="md">
            <AprilJsonSchemaForm<Record<string, unknown>>
              schema={schemaForRjsf}
              formData={instanceData}
              onChange={(next) => setInstanceData(next as Record<string, unknown>)}
            />
          </Tabs.Panel>
          <Tabs.Panel value="tree" pt="md">
            <AprilJsonTreeEditor
              data={instanceData}
              setData={(d) => setInstanceData(d as Record<string, unknown>)}
              rootName="instance"
              validationSchema={schemaData}
              showSearch
            />
          </Tabs.Panel>
        </Tabs>
      </Stack>

      <Stack gap="md">
        <Title order={4}>Read-only form (same instance)</Title>
        <Text size="sm" c="dimmed">
          Mirrors live <Code>formData</Code> without edits — useful for previews.
        </Text>
        <AprilJsonSchemaForm<Record<string, unknown>>
          schema={schemaForRjsf}
          formData={instanceData}
          onChange={() => undefined}
          readonly
        />
      </Stack>

      <Stack gap="md">
        <Title order={4}>Read-only tree</Title>
        <Text size="sm" c="dimmed">
          Same schema snapshot, view only (toolbar actions hidden by json-edit-react).
        </Text>
        <AprilJsonTreeEditor data={schemaData} readOnly rootName="schemaReadOnly" showSearch />
      </Stack>
    </Stack>
  );
}
