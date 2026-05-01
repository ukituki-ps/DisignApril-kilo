import { useState } from 'react';
import { Stack, Text, VisuallyHidden } from '@mantine/core';
import { AprilGradientSegmentedControl } from './AprilGradientSegmentedControl';
import { AprilIcon } from '../icons/AprilIcon';
import { AprilIconMoon, AprilIconSun } from '../icons/aprilUiIcons';

export function GradientSegmentedControlSection() {
  const [view, setView] = useState('light');
  const [framework, setFramework] = useState('react');

  return (
    <Stack gap="lg">
      <div>
        <Text size="sm" fw={500} mb={6}>
          Базовый пример
        </Text>
        <AprilGradientSegmentedControl
          value={framework}
          onChange={setFramework}
          data={[
            { label: 'React', value: 'react' },
            { label: 'Angular', value: 'ng' },
            { label: 'Vue', value: 'vue' },
          ]}
        />
      </div>

      <div>
        <Text size="sm" fw={500} mb={6}>
          Отключённый пункт и отключённый контрол
        </Text>
        <Stack gap="sm">
          <AprilGradientSegmentedControl
            data={[
              { label: 'Все', value: 'all' },
              { label: 'Только активные', value: 'active', disabled: true },
              { label: 'Архив', value: 'archived' },
            ]}
            defaultValue="all"
          />
          <AprilGradientSegmentedControl
            disabled
            data={[
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
            ]}
            defaultValue="a"
          />
        </Stack>
      </div>

      <div>
        <Text size="sm" fw={500} mb={6}>
          Только иконки (доступное имя через VisuallyHidden)
        </Text>
        <AprilGradientSegmentedControl
          value={view}
          onChange={setView}
          data={[
            {
              value: 'light',
              label: (
                <>
                  <AprilIcon icon={AprilIconSun} size="sm" />
                  <VisuallyHidden>Светлая тема</VisuallyHidden>
                </>
              ),
            },
            {
              value: 'dark',
              label: (
                <>
                  <AprilIcon icon={AprilIconMoon} size="sm" />
                  <VisuallyHidden>Тёмная тема</VisuallyHidden>
                </>
              ),
            },
          ]}
        />
      </div>

      <Text size="xs" c="dimmed">
        Переключите тему и плотность в шапке витрины — стили опираются на CSS-переменные Mantine (teal, light-dark).
      </Text>
    </Stack>
  );
}
