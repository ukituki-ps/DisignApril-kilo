import { Textarea } from '@mantine/core';
import type { TextEditorProps } from 'json-edit-react';
import { useDensity } from '../DensityContext';

/**
 * Mantine-backed text surface for json-edit-react full-object / collection JSON editing.
 */
export function AprilJsonCollectionTextEditor({ value, onChange, onKeyDown }: TextEditorProps) {
  const { density } = useDensity();
  const size = density === 'compact' ? 'xs' : 'sm';

  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      onKeyDown={onKeyDown}
      size={size}
      autosize
      minRows={density === 'compact' ? 5 : 6}
      styles={{
        input: {
          fontFamily: 'var(--mantine-font-family-monospace)',
        },
      }}
    />
  );
}
