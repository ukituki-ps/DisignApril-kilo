import { Alert, List, Text } from '@mantine/core';

export type AprilJsonValidationListItem = {
  path: string;
  message: string;
};

export type AprilJsonValidationSummaryProps = {
  /** Заголовок блока Alert (например, «Проверка данных»). */
  title?: string;
  items: AprilJsonValidationListItem[];
};

/**
 * Shared validation summary (Mantine `Alert` + `List`) for tree (Ajv) and RJSF form error lists.
 */
export function AprilJsonValidationSummary({
  title = 'Проверка данных',
  items,
}: AprilJsonValidationSummaryProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <Alert color="red" title={title}>
      <List size="sm" mt="xs" withPadding listStyleType="disc">
        {items.map((err, index) => (
          <List.Item key={`${index}:${err.path}:${err.message}`}>
            <Text span fw={600} component="span">
              {err.path}
            </Text>
            : {err.message}
          </List.Item>
        ))}
      </List>
    </Alert>
  );
}
