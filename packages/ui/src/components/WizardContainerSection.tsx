import { useState } from 'react';
import { Badge, Box, Group, Radio, Stack, Text, Title } from '@mantine/core';
import { WizardContainer, type WizardStepConfig } from './WizardContainer';

/** Showcase-секция: WizardContainer с 4 шагами заказа. */
export function WizardContainerSection() {
  const [finalResult, setFinalResult] = useState<string | null>(null);

  const steps: WizardStepConfig[] = [
    {
      id: 'option',
      label: 'Опция',
      content: (
        <Stack gap="md">
          <Title order={3}>Выберите тарифный план</Title>
          <Text size="sm" c="dimmed">Определите, какой план подходит для вашей команды</Text>
          <Radio.Group label="Тариф" withAsterisk>
            <Stack mt="sm">
              <Radio
                value="starter"
                label={
                  <Group gap="sm">
                    <span>Стартовый</span>
                    <Badge variant="light" color="gray">Бесплатно</Badge>
                  </Group>
                }
                description="До 3 пользователей, 5 ГБ хранилища"
              />
              <Radio
                value="pro"
                label={
                  <Group gap="sm">
                    <span>Профессиональный</span>
                    <Badge color="teal">Рекомендуем</Badge>
                  </Group>
                }
                description="До 20 пользователей, 50 ГБ, приоритетная поддержка"
              />
              <Radio
                value="enterprise"
                label={
                  <Group gap="sm">
                    <span>Корпоративный</span>
                    <Badge color="blue">Платный</Badge>
                  </Group>
                }
                description="Неограниченно пользователей, SSO, SLA 99.9%"
              />
            </Stack>
          </Radio.Group>
        </Stack>
      ),
    },
    {
      id: 'payment',
      label: 'Оплата',
      content: (
        <Stack gap="md">
          <Title order={3}>Способ оплаты</Title>
          <Text size="sm" c="dimmed">Выберите удобный способ оплаты</Text>
          <Radio.Group label="Метод оплаты" withAsterisk>
            <Stack mt="sm">
              <Radio value="card" label="Банковская карта" description="Visa / Mastercard / МИР" />
              <Radio value="transfer" label="Перевод по СБП" description="Мгновенный перевод через СБП" />
              <Radio value="invoice" label="Счёт для юр. лица" description="Оплата по безналичному расчёту" />
            </Stack>
          </Radio.Group>
        </Stack>
      ),
      validate: () => true,
    },
    {
      id: 'confirm',
      label: 'Подтверждение',
      content: (
        <Stack gap="md">
          <Title order={3}>Проверьте заказ</Title>
          <Text size="sm" c="dimmed">Перед подтверждением удостоверьтесь в правильности данных</Text>
          <Box
            style={{
              padding: 16,
              borderRadius: 8,
              background: 'var(--mantine-color-gray-0)',
              border: '1px solid var(--mantine-color-gray-2)',
            }}
          >
            <Stack gap="sm">
              <Group justify="space-between">
                <Text fw={500} size="sm">Тарифный план</Text>
                <Badge color="teal">Профессиональный</Badge>
              </Group>
              <Group justify="space-between">
                <Text fw={500} size="sm">Оплата</Text>
                <Text size="sm">Банковская карта</Text>
              </Group>
              <Group justify="space-between">
                <Text fw={500} size="sm">Итого</Text>
                <Text fw={700} size="sm">2 490 ₽/мес</Text>
              </Group>
            </Stack>
          </Box>
        </Stack>
      ),
      validate: () => true,
    },
    {
      id: 'done',
      label: 'Готово',
      content: (
        <Stack gap="md" align="center">
          <Box
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--mantine-color-teal-6)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            ✓
          </Box>
          <Title order={3} style={{ textAlign: 'center' }}>Заказ оформлен!</Title>
          <Text size="sm" c="dimmed" style={{ textAlign: 'center' }}>
            Чек отправлен на вашу почту. Спасибо за заказ!
          </Text>
        </Stack>
      ),
      validate: () => true,
    },
  ];

  return (
    <Stack gap="lg">
      <Text fw={500} size="sm">
        Мастер оформления заказа: {steps.length} шага (Опция → Оплата → Подтверждение → Готово)
      </Text>

      <Box style={{ maxWidth: 520, margin: '0 auto', width: '100%' }}>
        <WizardContainer
          steps={steps}
          nextLabel="Далее"
          backLabel="Назад"
          finalLabel="Завершить"
          onFinalStep={() => setFinalResult('Заказ успешно оформлен!')}
        />
      </Box>

      {finalResult !== null && (
        <Badge color="teal" size="md" style={{ display: 'inline-block' }}>
          {finalResult}
        </Badge>
      )}
    </Stack>
  );
}
