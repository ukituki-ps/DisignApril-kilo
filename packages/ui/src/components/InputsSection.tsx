import {
  Stack,
  TextInput,
  PasswordInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Text,
  SimpleGrid,
} from '@mantine/core';
import { useDensity } from '../DensityContext';
export function InputsSection() {
  const { density } = useDensity();
  const isCompact = density === 'compact';
  const size = isCompact ? 'xs' : 'sm';
  return (
    <Stack gap="xl">
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        <Stack gap="md">
          <Text fw={500} size="sm">
            Текстовые поля
          </Text>

          <TextInput
            label="Обычное поле"
            description="Введите полное имя"
            placeholder="Иванов Иван"
            size={size}
          />

          <TextInput label="Отключённое поле" placeholder="Редактирование недоступно" disabled size={size} />

          <TextInput
            label="Поле с ошибкой"
            placeholder="Введите email"
            error="Некорректный адрес электронной почты"
            size={size}
          />

          <PasswordInput label="Пароль" placeholder="Ваш пароль" size={size} />
        </Stack>

        <Stack gap="md">
          <Text fw={500} size="sm">
            Другие элементы
          </Text>

          <Select label="Выпадающий список" placeholder="Выберите вариант" data={['React', 'Angular', 'Vue', 'Svelte']} size={size} />

          <Textarea label="Многострочный текст" placeholder="Введите сообщение…" minRows={3} size={size} />
        </Stack>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
        <Stack gap="sm">
          <Text fw={500} size="sm">
            Флажки
          </Text>
          <Checkbox label="Флажок по умолчанию" size={size} />
          <Checkbox label="Включённый флажок" defaultChecked size={size} />
          <Checkbox label="Отключённый флажок" disabled size={size} />
        </Stack>

        <Stack gap="sm">
          <Text fw={500} size="sm">
            Переключатели (radio)
          </Text>
          <Radio.Group name="favoriteFramework" defaultValue="react" size={size}>
            <Stack gap="xs" mt="xs">
              <Radio value="react" label="React" />
              <Radio value="svelte" label="Svelte" />
              <Radio value="ng" label="Angular" disabled />
            </Stack>
          </Radio.Group>
        </Stack>

        <Stack gap="sm">
          <Text fw={500} size="sm">
            Тумблеры
          </Text>
          <Switch label="Тумблер по умолчанию" size={size} />
          <Switch label="Включённый тумблер" defaultChecked size={size} />
          <Switch label="Отключённый тумблер" disabled size={size} />
        </Stack>
      </SimpleGrid>
    </Stack>
  );
}
