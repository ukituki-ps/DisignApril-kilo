import { useMemo, useState } from 'react';
import { ActionIcon, Box, Code, Group, Paper, Stack, Tabs, Text, Title } from '@mantine/core';
import { AlertTriangle, Braces, ClipboardList, RotateCcw, Send } from 'lucide-react';
import type { IChangeEvent } from '@rjsf/core';
import type { RJSFSchema } from '@rjsf/utils';
import { AprilJsonSchemaForm } from '../json/AprilJsonSchemaForm';
import { AprilJsonTreeEditor } from '../json/AprilJsonTreeEditor';
import {
  jsonTreeEditorInvalidInstance,
  jsonTreeEditorSampleInstance,
  jsonTreeEditorSampleSchema,
} from './JsonTreeEditorSection.samples';

const INSTANCE_FORM_ID = 'april-json-showcase-instance-form';

const INSTANCE_FORM_UI_SCHEMA = {
  status: {
    'ui:enumNames': ['Черновик', 'Опубликовано', 'В архиве'],
  },
} as const;

/** Кнопки действий в секции 18: фиксированный квадрат 26×26. */
const JSON_SECTION_ACTION_PX = 26;
const JSON_SECTION_ACTION_GLYPH = 15;

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
  const [submitHint, setSubmitHint] = useState<string | null>(null);

  const resetDemos = () => {
    setSchemaData(deepClone(initialSchema) as Record<string, unknown>);
    setInstanceData(deepClone(initialInstance) as Record<string, unknown>);
    setSubmitHint(null);
  };

  const loadInvalidInstance = () => {
    setInstanceData(deepClone(jsonTreeEditorInvalidInstance) as Record<string, unknown>);
    setInstanceTab('form');
    setSubmitHint(null);
  };

  const handleInstanceTabChange = (value: string | null) => {
    setInstanceTab(value);
    setSubmitHint(null);
  };

  const handleInstanceFormSubmit = (evt: IChangeEvent<Record<string, unknown>>) => {
    const keys = evt.formData && typeof evt.formData === 'object' ? Object.keys(evt.formData).length : 0;
    setSubmitHint(
      `Форма принята в ${new Date().toLocaleTimeString('ru-RU')}. Полей верхнего уровня в данных: ${keys}.`
    );
  };

  const schemaForRjsf = schemaData as unknown as RJSFSchema;

  return (
    <Stack gap="xl">
      <Stack gap="md">
        <Title order={4}>JSON Schema (редактируемое дерево)</Title>
        <Text size="sm" c="dimmed">
          Редактируйте схему как JSON. Слева поле фильтра; справа — кнопки 26×26 «невалидный пример» и «сброс» вне рамки
          поля ввода (без красной обводки ошибки). Форма и дерево экземпляра ниже используют эту схему для проверки.
        </Text>
        <AprilJsonTreeEditor
          data={schemaData}
          setData={(d) => setSchemaData(d as Record<string, unknown>)}
          rootName="schema"
          showSearch
          searchFilter="all"
          searchTrailing={
            <>
              <ActionIcon
                variant="light"
                color="red"
                w={JSON_SECTION_ACTION_PX}
                h={JSON_SECTION_ACTION_PX}
                onClick={loadInvalidInstance}
                aria-label="Загрузить невалидный экземпляр (демо отправки формы)"
                title="Загрузить невалидный экземпляр (демо отправки формы)">
                <AlertTriangle size={JSON_SECTION_ACTION_GLYPH} strokeWidth={2} aria-hidden />
              </ActionIcon>
              <ActionIcon
                variant="light"
                w={JSON_SECTION_ACTION_PX}
                h={JSON_SECTION_ACTION_PX}
                onClick={resetDemos}
                aria-label="Сбросить схему и экземпляр к демо-данным"
                title="Сбросить схему и экземпляр к демо-данным">
                <RotateCcw size={JSON_SECTION_ACTION_GLYPH} strokeWidth={2} aria-hidden />
              </ActionIcon>
            </>
          }
        />
      </Stack>

      <Stack gap="md">
        <Title order={4}>Данные экземпляра: форма и дерево (встроенная панель)</Title>
        <Text size="sm" c="dimmed">
          Те же <Code>schema</Code> и <Code>formData</Code>, что выше, в оболочке фиксированного размера. Строка вкладок
          (иконки формы и дерева) и кнопка отправки 26×26 закреплены; прокручивается только содержимое вкладки. Отправка
          проверяет форму RJSF только на вкладке с иконкой формы; сначала нажмите красное предупреждение выше, затем
          отправку, чтобы увидеть ошибки.
        </Text>
        <Paper
          withBorder
          radius="md"
          p="sm"
          maw={320}
          mah={280}
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minHeight: 0,
          }}>
          <Tabs
            value={instanceTab}
            onChange={handleInstanceTabChange}
            keepMounted={false}
            style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <Group justify="space-between" align="center" gap="xs" wrap="nowrap" mb={4} style={{ flexShrink: 0 }}>
              <Tabs.List grow style={{ flex: 1, minWidth: 0 }}>
                <Tabs.Tab
                  value="form"
                  aria-label="Форма"
                  title="Форма"
                  style={{ display: 'flex', justifyContent: 'center', flex: 1, minWidth: 0, paddingInline: 4 }}>
                  <ClipboardList size={18} strokeWidth={2} aria-hidden />
                </Tabs.Tab>
                <Tabs.Tab
                  value="tree"
                  aria-label="Дерево"
                  title="Дерево"
                  style={{ display: 'flex', justifyContent: 'center', flex: 1, minWidth: 0, paddingInline: 4 }}>
                  <Braces size={18} strokeWidth={2} aria-hidden />
                </Tabs.Tab>
              </Tabs.List>
              <ActionIcon
                type="submit"
                form={INSTANCE_FORM_ID}
                variant="filled"
                w={JSON_SECTION_ACTION_PX}
                h={JSON_SECTION_ACTION_PX}
                disabled={instanceTab !== 'form'}
                aria-label="Отправить форму"
                title={
                  instanceTab !== 'form'
                    ? 'Переключитесь на вкладку «Форма», чтобы проверить и отправить данные RJSF.'
                    : 'Отправить форму'
                }>
                <Send size={JSON_SECTION_ACTION_GLYPH} strokeWidth={2} aria-hidden />
              </ActionIcon>
            </Group>
            {submitHint ? (
              <Text size="xs" c="dimmed" mb={4} style={{ flexShrink: 0 }} lineClamp={2}>
                {submitHint}
              </Text>
            ) : null}
            <Box style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Tabs.Panel value="form" pt={0}>
                <Box style={{ minWidth: 0 }}>
                  <AprilJsonSchemaForm<Record<string, unknown>>
                    id={INSTANCE_FORM_ID}
                    hideDefaultSubmit
                    uiSchema={INSTANCE_FORM_UI_SCHEMA as never}
                    schema={schemaForRjsf}
                    formData={instanceData}
                    onChange={(next) => setInstanceData(next as Record<string, unknown>)}
                    onSubmit={handleInstanceFormSubmit}
                  />
                </Box>
              </Tabs.Panel>
              <Tabs.Panel value="tree" pt={0}>
                <Box style={{ minWidth: 0 }}>
                  <AprilJsonTreeEditor
                    data={instanceData}
                    setData={(d) => setInstanceData(d as Record<string, unknown>)}
                    rootName="instance"
                    validationSchema={schemaData}
                    showSearch
                  />
                </Box>
              </Tabs.Panel>
            </Box>
          </Tabs>
        </Paper>
      </Stack>

      <Stack gap="md">
        <Title order={4}>Форма только для чтения (те же данные, низкая панель)</Title>
        <Text size="sm" c="dimmed">
          Те же данные, только просмотр — в низкой оболочке форма выше области и прокручивается (как в узком футере или
          сводке).
        </Text>
        <Paper withBorder radius="md" p="sm" maw={320} mah={200} style={{ overflow: 'auto' }}>
          <Box style={{ minWidth: 0 }}>
            <AprilJsonSchemaForm<Record<string, unknown>>
              hideDefaultSubmit
              uiSchema={INSTANCE_FORM_UI_SCHEMA as never}
              schema={schemaForRjsf}
              formData={instanceData}
              onChange={() => undefined}
              readonly
            />
          </Box>
        </Paper>
      </Stack>

      <Stack gap="md">
        <Title order={4}>Дерево только для чтения</Title>
        <Text size="sm" c="dimmed">
          Тот же снимок схемы, только просмотр (действия панели скрыты в json-edit-react).
        </Text>
        <AprilJsonTreeEditor data={schemaData} readOnly rootName="schemaReadOnly" showSearch />
      </Stack>
    </Stack>
  );
}
