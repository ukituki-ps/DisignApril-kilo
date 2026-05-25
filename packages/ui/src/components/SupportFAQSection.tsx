import { Stack, Text, Badge, Group, Box } from '@mantine/core';
import { SupportFAQ, FAQItem } from './SupportFAQ';

/** Showcase-секция SupportFAQ — демо во UIKit. */
export function SupportFAQSection() {
  const faqItems: FAQItem[] = [
    {
      id: 'dms-activation',
      question: 'Как активировать полис ДМС?',
      answer: (
        <>
          Активация происходит автоматически при оформлении. Для ручной активации обратитесь в HR-отдел
          или войдите в личный кабинет → «Мои льготы» → «Активировать ДМС». Срок действия полиса зависит
          от выбранного тарифа.
        </>
      ),
    },
    {
      id: 'points-balance',
      question: 'Как проверить баланс баллов?',
      answer: (
        <>
          Текущий баланс отображается на главной странице в разделе «Мой баланс». Баллы начисляются ежемесячно
          1-го числа и списываются при оплате льгот.
        </>
      ),
    },
    {
      id: 'points-transfer',
      question: 'Можно ли передать баллы родственникам?',
      answer: (
        <>
          Да. Передача доступна раз в квартал через раздел «Передача баллов» в личном кабинете.
          Примите заявку родственник обязан быть зарегистрирован в системе.
        </>
      ),
    },
    {
      id: 'dmis-clinics',
      question: 'Где найти ближайшие клиники по ДМС?',
      answer: (
        <>
          Список клиник доступен в разделе «Медицина» → «Найти клинику». Вы можете отфильтровать по типу
          услуги, рейтингу и удалённости от вашего местоположения.
        </>
      ),
    },
    {
      id: 'benefit-add',
      question: 'Как добавить льготу в избранные?',
      answer: (
        <>
          Откройте карточку льготы и нажмите на значок сердечка. Льгота появится в разделе «Избранное» на
          главной странице. В избранном не более 10 льгот.
        </>
      ),
    },
    {
      id: 'benefit-remove',
      question: 'Можно ли удалить льготу из списка?',
      answer: (
        <>
          Льготы устанавливаются работодателем и не удаляются из основного перечня. Вы можете удалить льготу
          только из избранного. Изменения перечня уточняйте в HR-отделе.
        </>
      ),
    },
  ];

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Text size="sm" fw={500}>
          Поддержка — частые вопросы
        </Text>
        <Badge variant="light" size="sm" color="teal">
          FAQ
        </Badge>
      </Group>

      <Box>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <SupportFAQ items={faqItems} onChange={() => {}} />
      </Box>

      <Stack gap="xs">
        <Text fw={500} size="sm">
          Multiple режим
        </Text>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <SupportFAQ items={faqItems.slice(0, 3)} multiple onChange={() => {}} />
      </Stack>
    </Stack>
  );
}
