import { useState } from 'react';
import { Box, Grid, GridCol, Stack, Text, Button, Badge } from '@mantine/core';
import {
  AprilFilterPills,
  AprilWizardProgress,
  AprilWizard,
  AprilStatCard,
  AprilCard,
  AprilBenefitRow,
  AprilEventRow,
  AprilQuickButton,
  AprilBalanceCard,
  AprilTransactionRow,
  AprilFaqItem,
  AprilOptionCard,
  AprilPayOptionCard,
  AprilFormInput,
  AprilFormTextarea,
  AprilFormSelect,
  AprilConfirmCheckbox,
  AprilSuccessScreen,
  AprilConfirmDoc,
} from '../index';
import {
  Coins, Gift, Calendar, ShoppingBag, Dumbbell,
  Heart, GraduationCap, Languages, MapPin, UserPlus,
  Check, Circle, ArrowUpCircle, Download, FileText,
} from 'lucide-react';

const sectionBorder: React.CSSProperties = {
  border: '1px solid var(--mantine-color-default-border)',
  borderRadius: 'var(--mantine-radius-md)',
  padding: 'var(--mantine-spacing-md)',
  overflow: 'hidden',
};

export function LkflComponentsSection() {
  const [filterActive, setFilterActive] = useState('all');
  const [wizardCurrent, setWizardCurrent] = useState('select');
  const [optionSelected, setOptionSelected] = useState('dms');
  const [paySelected, setPaySelected] = useState('card');
  const [faqOpened, setFaqOpened] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [formName, setFormName] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formCategory, setFormCategory] = useState('');

  const wizardSteps = [
    { id: 'select', label: 'Выбор льготы', content: (
      <Stack gap="md">
        <Text fw={700} size="md">Выберите льготу</Text>
        <Stack gap="sm">
          <AprilOptionCard
            name="ДМС Стандарт"
            description="Базовое медицинское страхование"
            price="Бесплатно"
            selected={optionSelected === 'dms'}
            onChange={() => setOptionSelected('dms')}
          />
          <AprilOptionCard
            name="Фитнес клуб"
            description="Подписка на фитнес-клуб"
            price="1 200 баллов/мес"
            selected={optionSelected === 'fitness'}
            onChange={() => setOptionSelected('fitness')}
          />
          <AprilOptionCard
            name="Онлайн обучение"
            description="Доступ к курсам повышения квалификации"
            price="500 баллов/мес"
            selected={optionSelected === 'edu'}
            onChange={() => setOptionSelected('edu')}
          />
        </Stack>
      </Stack>
    )},
    { id: 'payment', label: 'Оплата', content: (
      <Stack gap="md">
        <Text fw={700} size="md">Способ оплаты</Text>
        <Grid grow>
          <GridCol span={{ base: 12, sm: 6 }}>
            <AprilPayOptionCard
              icon={ShoppingBag}
              name="Баллы"
              description="Оплата из вашего баланса"
              selected={paySelected === 'points'}
              onChange={() => setPaySelected('points')}
            />
          </GridCol>
          <GridCol span={{ base: 12, sm: 6 }}>
            <AprilPayOptionCard
              icon={Gift}
              name="Карта"
              description="Банковская карта"
              selected={paySelected === 'card'}
              onChange={() => setPaySelected('card')}
            />
          </GridCol>
        </Grid>
      </Stack>
    )},
    { id: 'confirm', label: 'Подтверждение', content: (
      <Stack gap="md">
        <AprilConfirmDoc
          title="ДМС Стандарт"
          content={
            <>
              <Text component="div" style={{ marginBottom: 8 }}>
                Провайдер: ООО «МедЛайф»
              </Text>
              <Text component="div" style={{ marginBottom: 8 }}>
                Срок действия: 12 месяцев
              </Text>
              <Text component="div">
                Стоимость: 0 баллов/мес
              </Text>
            </>
          }
        />
        <AprilConfirmCheckbox
          checked={checkboxChecked}
          onChange={setCheckboxChecked}
          label={
            <>
              Я согласен с <Button variant="link" size="xs" p={0} style={{ fontSize: 12 }}>условиями использования</Button>
            </>
          }
        />
      </Stack>
    )},
  ];

  return (
    <Stack gap="xl">
      {/* 1. AprilFilterPills */}
      <Stack gap="sm">
        <Text fw={600} size="sm">1. AprilFilterPills</Text>
        <Box style={sectionBorder}>
          <AprilFilterPills
            items={[
              { value: 'all', label: 'Все' },
              { value: 'dms', label: 'ДМС' },
              { value: 'sport', label: 'Спорт' },
              { value: 'food', label: 'Питание' },
              { value: 'dev', label: 'Развитие' },
              { value: 'merch', label: 'Мерч' },
            ]}
            active={filterActive}
            onChange={setFilterActive}
          />
        </Box>
      </Stack>

      {/* 2. AprilStatCard */}
      <Stack gap="sm">
        <Text fw={600} size="sm">2. AprilStatCard</Text>
        <Box style={sectionBorder}>
          <Grid grow>
            <GridCol span={{ base: 12, sm: 4 }}>
              <AprilStatCard
                label="Баланс баллов"
                value="1 250"
                icon={Coins}
                hint="+500 баллов в июне"
                variant="highlight"
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 4 }}>
              <AprilStatCard
                label="Активных льгот"
                value="7"
                icon={Gift}
                hint="Из 12 подключено"
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 4 }}>
              <AprilStatCard
                label="До конца периода"
                value="14 дн."
                icon={Calendar}
                hint="Сброс 14 июня"
              />
            </GridCol>
          </Grid>
        </Box>
      </Stack>

      {/* 3. AprilBalanceCard */}
      <Stack gap="sm">
        <Text fw={600} size="sm">3. AprilBalanceCard</Text>
        <Box style={sectionBorder}>
          <AprilBalanceCard
            label="Доступный баланс"
            value="1 250"
            subtitle="Следующее начисление: +500 в июне"
            categories={[
              { label: 'Здоровье', value: '450', percentage: 60 },
              { label: 'Спорт', value: '320', percentage: 42 },
              { label: 'Питание', value: '280', percentage: 36 },
            ]}
          />
        </Box>
      </Stack>

      {/* 4. AprilCard */}
      <Stack gap="sm">
        <Text fw={600} size="sm">4. AprilCard</Text>
        <Box style={{ ...sectionBorder, padding: 0 }}>
          <AprilCard
            title="Каталог льгот"
            icon={ShoppingBag}
            action={<Button variant="link" size="xs" p={0}>Весь каталог →</Button>}
          >
            <AprilBenefitRow
              icon={Heart}
              name="Медицинское страхование"
              meta="МедЛайф • до 31.12.2025"
              badge={<Badge variant="light" color="teal">Активен</Badge>}
              onClick={() => alert('Benefit clicked')}
            />
            <AprilBenefitRow
              icon={Dumbbell}
              name="Фитнес клуб"
              meta="СпортЛайф • до 31.03.2026"
              badge={<Badge variant="light" color="orange">Ожидание</Badge>}
            />
            <AprilBenefitRow
              icon={GraduationCap}
              name="Онлайн курсы"
              meta="SkillBox • без ограничений"
            />
          </AprilCard>
        </Box>
      </Stack>

      {/* 5. AprilEventRow */}
      <Stack gap="sm">
        <Text fw={600} size="sm">5. AprilEventRow</Text>
        <Box style={sectionBorder}>
          <AprilEventRow
            icon={Check}
            variant="green"
            text="Баллы начислены: +500"
            time="10 мин назад"
          />
          <AprilEventRow
            icon={ArrowUpCircle}
            variant="yellow"
            text="Статус заявки обновлён"
            time="2 часа назад"
          />
          <AprilEventRow
            icon={Circle}
            variant="blue"
            text="Новая льгота доступна в каталоге"
            time="Вчера"
          />
        </Box>
      </Stack>

      {/* 6. AprilQuickButton */}
      <Stack gap="sm">
        <Text fw={600} size="sm">6. AprilQuickButton</Text>
        <Box style={sectionBorder}>
          <Grid grow>
            {[
              { icon: ShoppingBag, text: 'Каталог льгот' },
              { icon: FileText, text: 'Мои документы' },
              { icon: MapPin, text: 'Найти клинику' },
              { icon: Languages, text: 'Перевод баллов' },
              { icon: UserPlus, text: 'Добавить члена семьи' },
              { icon: Download, text: 'Скачать полис' },
            ].map((item) => (
              <GridCol key={item.text} span={{ base: 6, sm: 4, md: 2 }}>
                <AprilQuickButton
                  icon={item.icon}
                  text={item.text}
                  onClick={() => alert(item.text)}
                />
              </GridCol>
            ))}
          </Grid>
        </Box>
      </Stack>

      {/* 7. AprilTransactionRow */}
      <Stack gap="sm">
        <Text fw={600} size="sm">7. AprilTransactionRow</Text>
        <Box style={sectionBorder}>
          <AprilTransactionRow
            icon={Coins}
            type="plus"
            name="Начисление за май"
            date="1 июня 2025"
            amount="500"
          />
          <AprilTransactionRow
            icon={ShoppingBag}
            type="minus"
            name="Оплата фитнес клуба"
            date="28 мая 2025"
            amount="1 200"
          />
          <AprilTransactionRow
            icon={Gift}
            type="plus"
            name="Бонус за активность"
            date="25 мая 2025"
            amount="150"
          />
        </Box>
      </Stack>

      {/* 8. AprilFaqItem */}
      <Stack gap="sm">
        <Text fw={600} size="sm">8. AprilFaqItem</Text>
        <Box style={sectionBorder}>
          <AprilFaqItem
            question="Как активировать полис ДМС?"
            answer="Активация происходит автоматически при оформлении. Для ручной активации обратитесь в HR-отдел или войдите в личный кабинет → «Мои льготы» → «Активировать ДМС»."
            opened={faqOpened}
            onOpenedChange={setFaqOpened}
          />
        </Box>
      </Stack>

      {/* 9. AprilFormInput, AprilFormTextarea, AprilFormSelect */}
      <Stack gap="sm">
        <Text fw={600} size="sm">9. AprilFormInput / AprilFormTextarea / AprilFormSelect</Text>
        <Box style={sectionBorder}>
          <Stack gap="md">
            <AprilFormInput
              label="Имя"
              placeholder="Введите ваше имя"
              value={formName}
              onChange={setFormName}
            />
            <AprilFormSelect
              label="Категория"
              placeholder="Выберите категорию"
              value={formCategory}
              onChange={setFormCategory}
              options={[
                { value: 'dms', label: 'Медицина' },
                { value: 'sport', label: 'Спорт' },
                { value: 'food', label: 'Питание' },
                { value: 'edu', label: 'Образование' },
              ]}
            />
            <AprilFormTextarea
              label="Комментарий"
              placeholder="Дополнительный комментарий"
              value={formComment}
              onChange={setFormComment}
              rows={3}
            />
            <AprilFormInput
              label="Поле с ошибкой"
              placeholder="Некорректное значение"
              value="wrong"
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={() => {}}
              error="Значение некорректно"
            />
          </Stack>
        </Box>
      </Stack>

      {/* 10. AprilConfirmCheckbox */}
      <Stack gap="sm">
        <Text fw={600} size="sm">10. AprilConfirmCheckbox</Text>
        <Box style={sectionBorder}>
          <AprilConfirmCheckbox
            checked={checkboxChecked}
            onChange={setCheckboxChecked}
            label={
              <>
                Я подтверждаю, что ознакомлен с условиями и согласен на обработку персональных данных
              </>
            }
          />
        </Box>
      </Stack>

      {/* 11. AprilSuccessScreen */}
      <Stack gap="sm">
        <Text fw={600} size="sm">11. AprilSuccessScreen</Text>
        <Box style={sectionBorder}>
          <AprilSuccessScreen
            title="Заявка оформлена!"
            description="Мы отправили подтверждение на вашу электронную почту. Вы можете отслеживать статус в разделе «Мои заявки»."
          />
        </Box>
      </Stack>

      {/* 12. AprilConfirmDoc */}
      <Stack gap="sm">
        <Text fw={600} size="sm">12. AprilConfirmDoc</Text>
        <Box style={sectionBorder}>
          <AprilConfirmDoc
            title="ДМС Стандарт"
            content={
              <>
                <Text component="div" style={{ marginBottom: 8 }}>
                  Провайдер: ООО «МедЛайф»
                </Text>
                <Text component="div" style={{ marginBottom: 8 }}>
                  Срок действия: 12 месяцев
                </Text>
                <Text component="div">
                  Стоимость: 0 баллов/мес
                </Text>
              </>
            }
          />
        </Box>
      </Stack>

      {/* 13. AprilOptionCard */}
      <Stack gap="sm">
        <Text fw={600} size="sm">13. AprilOptionCard</Text>
        <Box style={sectionBorder}>
          <Stack gap="sm">
            <AprilOptionCard
              name="ДМС Стандарт"
              description="Базовое медицинское страхование"
              price="Бесплатно"
              selected={optionSelected === 'dms'}
              onChange={() => setOptionSelected('dms')}
            />
            <AprilOptionCard
              name="Фитнес клуб"
              description="Подписка на фитнес-клуб"
              price="1 200 баллов/мес"
              selected={optionSelected === 'fitness'}
              onChange={() => setOptionSelected('fitness')}
            />
            <AprilOptionCard
              name="Онлайн обучение"
              description="Доступ к курсам"
              price="500 баллов/мес"
              selected={optionSelected === 'edu'}
              onChange={() => setOptionSelected('edu')}
            />
          </Stack>
        </Box>
      </Stack>

      {/* 14. AprilPayOptionCard */}
      <Stack gap="sm">
        <Text fw={600} size="sm">14. AprilPayOptionCard</Text>
        <Box style={sectionBorder}>
          <Grid grow>
            <GridCol span={{ base: 12, sm: 6 }}>
              <AprilPayOptionCard
                icon={ShoppingBag}
                name="Баллы"
                description="Оплата из вашего баланса"
                selected={paySelected === 'points'}
                onChange={() => setPaySelected('points')}
              />
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }}>
              <AprilPayOptionCard
                icon={Gift}
                name="Карта"
                description="Банковская карта"
                selected={paySelected === 'card'}
                onChange={() => setPaySelected('card')}
              />
            </GridCol>
          </Grid>
        </Box>
      </Stack>

      {/* 15. AprilWizard (composite demo) */}
      <Stack gap="sm">
        <Text fw={600} size="sm">15. AprilWizard (composite demo)</Text>
        <Box style={{ ...sectionBorder, padding: 0 }}>
          <AprilWizard
            steps={wizardSteps}
            current={wizardCurrent}
            onChange={setWizardCurrent}
          >
            {/* Wizard renders step content from wizardSteps[current] */}
          </AprilWizard>
        </Box>
      </Stack>

      {/* 16. AprilWizardProgress */}
      <Stack gap="sm">
        <Text fw={600} size="sm">16. AprilWizardProgress</Text>
        <Box style={sectionBorder}>
          <AprilWizardProgress
            steps={[
              { id: '1', label: 'Выбор', status: 'done' },
              { id: '2', label: 'Настройка', status: 'active' },
              { id: '3', label: 'Подтверждение', status: 'pending' },
              { id: '4', label: 'Готово', status: 'pending' },
            ]}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
