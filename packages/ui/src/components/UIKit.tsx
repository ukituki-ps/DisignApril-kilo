import type { ReactNode } from 'react';
import { Container, Stack, Title, Text, Box } from '@mantine/core';
import { LogoSection } from './LogoSection';
import { HeaderSection } from './HeaderSection';
import { SidebarSection } from './SidebarSection';
import { ColorPalette } from './ColorPalette';
import { TypographySection } from './TypographySection';
import { ButtonsSection } from './ButtonsSection';
import { InputsSection } from './InputsSection';
import { BadgesSection } from './BadgesSection';
import { CardsSection } from './CardsSection';
import { TableSection } from './TableSection';
import { AlertsSection } from './AlertsSection';
import { ModalSection } from './ModalSection';
import { SafetyPatterns } from './SafetyPatterns';
import { ReactFlowSection } from './ReactFlowSection';
import { KanbanSection } from './KanbanSection';
import { LoginSection } from './LoginSection';
import { CardListColumnSection } from './CardListColumnSection';
import { JsonTreeEditorSection } from './JsonTreeEditorSection';
import { IconsSection } from './IconsSection';
export function UIKit() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Box mb="xl">
          <Title order={1} mb="xs">
            Справочник дизайн-системы
          </Title>
          <Text c="dimmed">
            Полный UI Kit для корпоративного сервиса продуктивности. Переключатели в шапке позволяют проверить светлую и
            тёмную тему, а также комфортный и компактный режим плотности интерфейса.
          </Text>
        </Box>

        <Section
          title="1. Логотип"
          description="Фирменные знаки и правила использования.">
          <LogoSection />
        </Section>

        <Section
          title="2. Шапка"
          description="Верхняя панель: поиск, уведомления, меню пользователя.">
          <HeaderSection />
        </Section>

        <Section
          title="3. Боковая панель"
          description="Основная навигация со сворачиваемыми разделами и группировкой модулей.">
          <SidebarSection />
        </Section>

        <Section
          title="4. Цветовая палитра"
          description="Основной бренд, нейтральные тона и семантические состояния.">
          <ColorPalette />
        </Section>

        <Section
          title="5. Типографика"
          description="Масштаб начертаний на базе шрифта Inter.">
          <TypographySection />
        </Section>

        <Section
          title="6. Кнопки"
          description="Интерактивные элементы для действий.">
          <ButtonsSection />
        </Section>

        <Section title="7. Поля ввода" description="Элементы форм и ввод данных.">
          <InputsSection />
        </Section>

        <Section
          title="8. Бейджи и теги"
          description="Индикаторы статуса и категоризация.">
          <BadgesSection />
        </Section>

        <Section
          title="9. Карточки"
          description="Контейнеры-поверхности; сетка экосистемы April (простая карточка: буква, продукт, краткое описание).">
          <CardsSection />
        </Section>

        <Section
          title="10. Таблица"
          description="Табличные данные с поддержкой плотности.">
          <TableSection />
        </Section>

        <Section
          title="11. Алерты и уведомления"
          description="Обратная связь системы и сообщения.">
          <AlertsSection />
        </Section>

        <Section title="12. Модальные окна" description="Оверлеи для сфокусированных задач.">
          <ModalSection />
        </Section>

        <Section
          title="13. Безопасные сценарии"
          description="Опасные действия и подтверждения.">
          <SafetyPatterns />
        </Section>

        <Section
          title="14. React Flow"
          description="Интерактивные диаграммы: воронки, оргструктура, зависимости задач.">
          <ReactFlowSection />
        </Section>

        <Section
          title="15. Канбан-доска"
          description="Доска задач с перетаскиванием для проектов и процессов.">
          <KanbanSection />
        </Section>

        <Section
          title="16. Форма входа"
          description="Экран авторизации: соц. SSO и вход по почте и паролю.">
          <LoginSection />
        </Section>

        <Section
          title="17. Колонка списка карточек"
          description="Колонка в стиле канбана: поиск, фиксированная высота карточек, сворачивание, оверлей, изменяемая ширина.">
          <CardListColumnSection />
        </Section>

        <Section
          title="18. JSON и JSON Schema (дерево + форма)"
          description="AprilJsonTreeEditor и AprilJsonSchemaForm (RJSF): тема Mantine, плотность, Ajv; демо во вложенных панелях меньше контента — прокрутка внутри оболочки.">
          <JsonTreeEditorSection />
        </Section>

        <Section
          title="19. Иконки"
          description="Lucide через AprilIcon и курируемые экспорты AprilIcon*; размеры и доступность согласованы с DS.">
          <IconsSection />
        </Section>
      </Stack>
    </Container>
  );
}
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Box component="section" mb="xl">
      <Title order={2} mb="xs">
        {title}
      </Title>
      <Text c="dimmed" mb="lg">
        {description}
      </Text>
      <Box
        p="md"
        style={{
          border: '1px solid var(--mantine-color-default-border)',
          borderRadius: 'var(--mantine-radius-md)',
          backgroundColor: 'var(--mantine-color-body)',
        }}>
        {children}
      </Box>
    </Box>
  );
}
