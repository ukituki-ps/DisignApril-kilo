import React from 'react';
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
export function UIKit() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Box mb="xl">
          <Title order={1} mb="xs">
            Design System Reference
          </Title>
          <Text c="dimmed">
            Comprehensive UI Kit for the corporate productivity service. Use the
            toggles in the header to test light/dark themes and
            comfortable/compact density modes.
          </Text>
        </Box>

        <Section
          title="1. Logo"
          description="Brand identity marks and usage guidelines.">
          
          <LogoSection />
        </Section>

        <Section
          title="2. Header"
          description="Top-level navigation bar with search, notifications, and user menu.">
          
          <HeaderSection />
        </Section>

        <Section
          title="3. Sidebar"
          description="Primary navigation with collapsible sections and module grouping.">
          
          <SidebarSection />
        </Section>

        <Section
          title="4. Color Palette"
          description="Core brand colors, neutrals, and semantic states.">
          
          <ColorPalette />
        </Section>

        <Section
          title="5. Typography"
          description="Type scale based on Inter font.">
          
          <TypographySection />
        </Section>

        <Section
          title="6. Buttons"
          description="Interactive elements for actions.">
          
          <ButtonsSection />
        </Section>

        <Section title="7. Inputs" description="Form controls and data entry.">
          <InputsSection />
        </Section>

        <Section
          title="8. Badges & Tags"
          description="Status indicators and categorization.">
          
          <BadgesSection />
        </Section>

        <Section
          title="9. Cards"
          description="Surface containers for content grouping.">
          
          <CardsSection />
        </Section>

        <Section
          title="10. Table"
          description="Data presentation with density support.">
          
          <TableSection />
        </Section>

        <Section
          title="11. Alerts & Notifications"
          description="System feedback and messaging.">
          
          <AlertsSection />
        </Section>

        <Section title="12. Modals" description="Overlays for focused tasks.">
          <ModalSection />
        </Section>

        <Section
          title="13. Safety Patterns"
          description="Destructive actions and confirmations.">
          
          <SafetyPatterns />
        </Section>

        <Section
          title="14. React Flow"
          description="Interactive node-based diagrams for workflows, org charts, and task dependencies.">
          
          <ReactFlowSection />
        </Section>

        <Section
          title="15. Kanban Board"
          description="Drag-and-drop task board for project management and workflow visualization.">
          
          <KanbanSection />
        </Section>
      </Stack>
    </Container>);

}
function Section({
  title,
  description,
  children




}: {title: string;description: string;children: React.ReactNode;}) {
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
          backgroundColor: 'var(--mantine-color-body)'
        }}>
        
        {children}
      </Box>
    </Box>);

}