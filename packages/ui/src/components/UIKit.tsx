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
import { GradientSegmentedControlSection } from './GradientSegmentedControlSection';
import { StatusChipSection } from './StatusChipSection';
import { BenefitCardSection } from './BenefitCardSection';
import { QuickActionsGridSection } from './QuickActionsGridSection';
import { GamifiedProgressSection } from './GamifiedProgressSection';
import { AchievementBadgeSection } from './AchievementBadgeSection';
import { EmptyStateIllustrationSection } from './EmptyStateIllustrationSection';
import { SmartBundleSection } from './SmartBundleSection';
import { FacetedSearchSection } from './FacetedSearchSection';
import { BalancePillSection } from './BalancePillSection';
import { FilterPillsSection } from './FilterPillsSection';
import { StatCardSection } from './StatCardSection';
import { PolicyCardSection } from './PolicyCardSection';
import { ClinicMapListSection } from './ClinicMapListSection';
import { SupportFAQSection } from './SupportFAQSection';
import { DocumentRowSection } from './DocumentRowSection';
import { TopNavbarSection } from './TopNavbarSection';
import { LkflComponentsSection } from './LkflComponentsSection';

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

        <Section
          title="12. Модальные окна"
          description="Оверлеи для сфокусированных задач: действия в шапке справа (рядом с закрытием), тело с прокруткой — см. AprilModal в пакете и DESIGN_SYSTEM.md.">
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

        <Section
          title="20. Градиентный SegmentedControl"
          description="AprilGradientSegmentedControl — Mantine SegmentedControl со стилями по рецепту Mantine UI и палитрой teal April; см. DESIGN_SYSTEM §11.">
          <GradientSegmentedControlSection />
        </Section>

        <Section
          title="21. StatusChip"
          description="Компактный индикатор состояния: статусы, пульсация, dot/chip variant, density. Базовый компонент для BenefitCard, SmartBundle, каталога.">
          <StatusChipSection />
        </Section>

        <Section
          title="22. BenefitCard"
          description="Универсальная карточка льготы/активности: статус, цена, прогресс, CTA. Адаптивный layout (desktop/mobile).">
          <BenefitCardSection />
        </Section>

        <Section
          title="23. QuickActionsGrid"
          description="Адаптивная сетка быстрых действий для главной страницы: иконка в круге, подпись, badge, hover. Сверено с прототипом ЛК физика (.quick-grid / .quick-btn).">
          <QuickActionsGridSection />
        </Section>

        <Section
          title="24. GamifiedProgress"
          description="Прогресс с наградой: текущее/целевое значение, иконка награды, CSS-анимация, completed state. Сверено с прототипом ЛК физика (.progress-bar / .progress-fill).">
          <GamifiedProgressSection />
        </Section>

        <Section
          title="25. AchievementBadge"
          description="Значок достижения с тултипом: bronze/silver/gold/platinum/custom, earned/unearned, disabled, размеры, touch-тултип.">
          <AchievementBadgeSection />
        </Section>

        <Section
          title="26. EmptyStateIllustration"
          description="Компонент пустых состояний: иконка, заголовок, описание, CTA. Выравнивание center/left, размеры иконки. Сверено с прототипом ЛК физика (пустые состояния в каталоге/секциях).">
          <EmptyStateIllustrationSection />
        </Section>

        <Section
          title="27. SmartBundle"
          description="Пакет льгот (сценарий): состав пакета визуально, expandable список, статусы элементов через StatusChip, скидка, CTA. Desktop — раскрыт, mobile — свёрнут.">
          <SmartBundleSection />
        </Section>

        <Section
          title="28. FacetedSearch"
          description="Фильтры каталога: checkbox, radio, range, select facets. Inline / drawer / auto mode. На mobile — AprilVaulBottomSheet. Сверено с прототипом ЛК физика (.catalog-toolbar, .filter-pills, .search-box).">
          <FacetedSearchSection />
        </Section>

        <Section
          title="29. BalancePill"
          description="Компактный pill-индикатор баланса для header: значение,单位, иконка, hover, onClick. Цвета из theme.colors.teal.">
          <BalancePillSection />
        </Section>

        <Section
          title="30. FilterPills"
          description="Inline фильтр-пили (категории) для каталога льгот: controlled pills, active state через teal, count, scrollable контейнер, поддержка плотности и light/dark.">
          <FilterPillsSection />
        </Section>

        <Section
          title="30. StatCard"
          description="Компактная карточка с числовой метрикой для Dashboard: label, value, icon, hint, density. Вариants default и accent (teal фон).">
          <StatCardSection />
        </Section>

        <Section
          title="31. PolicyCard"
          description="Градиентная карточка полиса ДМС для модалки льготы: type, policyNumber, meta-поля, кнопки Download / Share. Градиент через Mantine teal/green scale.">
          <PolicyCardSection />
        </Section>

        <Section
          title="31. ClinicMapList"
          description="Карта + список клиник: iframe-карта сверху, скrollable список клиник снизу с MapPin-иконками, schedule, empty state.">
          <ClinicMapListSection />
        </Section>

        <Section
          title="32. SupportFAQ"
          description="FAQ-аккордеон для раздела «Поддержка»: вопросы-ответы, hover teal, chevron rotation, single и multiple режимы.">
          <SupportFAQSection />
        </Section>

        <Section
          title="33. DocumentRow"
          description="Строка документа для таблицы раздела «Документы»: название, тип, дата, статус (badge), кнопка скачивания. Поддержка плотности и light/dark.">
          <DocumentRowSection />
        </Section>

        <Section
          title="34. Top navbar (AprilTopNavbar)"
          description="Вид shell «хеддер + навбар» для портальных приложений: sticky-панель с логотипом, горизонтальной навигацией (табы с underline) и правым слотом (баланс, уведомления, аватар). Мобильный fallback: <768px — иконки, <480px — скрыты.">
          <TopNavbarSection />
        </Section>

        <Section
          title="35. LKFL-компоненты"
          description="Белые компоненты для продуктов April: AprilFilterPills, AprilWizard, AprilWizardProgress, AprilStatCard, AprilCard, AprilBenefitRow, AprilEventRow, AprilQuickButton, AprilBalanceCard, AprilTransactionRow, AprilFaqItem, AprilOptionCard, AprilPayOptionCard, AprilFormInput, AprilFormTextarea, AprilFormSelect, AprilConfirmCheckbox, AprilSuccessScreen, AprilConfirmDoc.">
          <LkflComponentsSection />
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
