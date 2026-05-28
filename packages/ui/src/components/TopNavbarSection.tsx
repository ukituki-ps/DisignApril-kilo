import { useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Indicator,
  Stack,
  Text,
} from '@mantine/core';
import {
  BellIcon,
  CoinsIcon,
  HomeIcon,
  PackageIcon,
  FileTextIcon,
  HeadphonesIcon,
  StarIcon,
} from 'lucide-react';
import { BalancePill } from './BalancePill';
import { AprilTopNavbar } from './AprilTopNavbar';

/** SVG-логотип-заглушка для демо (teal). */
const DemoLogo = (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect width="26" height="26" rx="6" fill="var(--mantine-color-teal-6)" />
    <text
      x="13"
      y="17"
      textAnchor="middle"
      fill="white"
      fontSize="12"
      fontWeight="700"
    >
      A
    </text>
  </svg>
);

const demoTabs = [
  { key: 'dashboard', label: 'Главная', icon: <HomeIcon size={16} /> },
  { key: 'catalog', label: 'Каталог льгот', icon: <PackageIcon size={16} /> },
  { key: 'points', label: 'Мои баллы', icon: <CoinsIcon size={16} /> },
  { key: 'documents', label: 'Документы', icon: <FileTextIcon size={16} /> },
  { key: 'support', label: 'Поддержка', icon: <HeadphonesIcon size={16} /> },
];

const demoRightSection = (
  <Group gap={10} wrap="nowrap">
    <BalancePill value="1 250" unit="баллов" />
    <Indicator color="red" size={8} offset={4} processing>
      <ActionIcon variant="subtle" color="gray" size="md">
        <BellIcon size={18} />
      </ActionIcon>
    </Indicator>
    <Avatar
      size="sm"
      color="teal"
      radius="xl"
      name="Алексей А."
      style={{ cursor: 'pointer' }}
    />
  </Group>
);

export function TopNavbarSection() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Stack gap="xl">
      {/* Базовый: полный navbar как в прототипе */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Базовый (прототип: logo + табы + правый слот)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <AprilTopNavbar
            logo={DemoLogo}
            onClickLogo={() => setActiveTab('dashboard')}
            tabs={demoTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            rightSection={demoRightSection}
            sticky={false}
          />
          {/* Content placeholder */}
          <Box
            p="md"
            style={{
              minHeight: 120,
              backgroundColor: 'var(--mantine-color-body)',
            }}
          >
            <Text size="sm" c="dimmed">
              Контент страницы «{demoTabs.find((t) => t.key === activeTab)?.label}»
            </Text>
          </Box>
        </Box>
      </Stack>

      {/* Без rightSection */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Без правого слота (минимальный)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <AprilTopNavbar
            logo={DemoLogo}
            tabs={demoTabs.slice(0, 3)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            sticky={false}
          />
          <Box
            p="md"
            style={{
              minHeight: 80,
              backgroundColor: 'var(--mantine-color-body)',
            }}
          >
            <Text size="sm" c="dimmed">
              Минимальный вариант: только logo + табы
            </Text>
          </Box>
        </Box>
      </Stack>

      {/* С иконками в табах */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Табы с иконками (desktop — иконка + текст; mobile до 768px — только иконки)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <AprilTopNavbar
            logo={DemoLogo}
            onClickLogo={() => setActiveTab('dashboard')}
            tabs={demoTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            rightSection={demoRightSection}
            sticky={false}
          />
          <Box
            p="md"
            style={{
              minHeight: 80,
              backgroundColor: 'var(--mantine-color-body)',
            }}
          >
            <Text size="sm" c="dimmed">
              С иконками — на узких экранах тексты скрываются
            </Text>
          </Box>
        </Box>
      </Stack>

      {/* Кастомная высота */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Кастомная высота (48px — compact)
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <AprilTopNavbar
            logo={DemoLogo}
            tabs={demoTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            rightSection={demoRightSection}
            height={48}
            sticky={false}
          />
          <Box
            p="md"
            style={{
              minHeight: 80,
              backgroundColor: 'var(--mantine-color-body)',
            }}
          >
            <Text size="sm" c="dimmed">
              Компактная высота 48px
            </Text>
          </Box>
        </Box>
      </Stack>

      {/* rightSection только с иконками (favicons pattern) */}
      <Stack gap="sm">
        <Text fw={500} size="sm">
          Правый слот: избранное + уведомления + аватар
        </Text>
        <Box
          style={{
            border: '1px solid var(--mantine-color-default-border)',
            borderRadius: 'var(--mantine-radius-md)',
            overflow: 'hidden',
          }}
        >
          <AprilTopNavbar
            logo={DemoLogo}
            tabs={demoTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            rightSection={
              <Group gap={10} wrap="nowrap">
                <ActionIcon variant="subtle" color="gray" size="md">
                  <StarIcon size={18} />
                </ActionIcon>
                <Indicator color="red" size={8} offset={4} processing>
                  <ActionIcon variant="subtle" color="gray" size="md">
                    <BellIcon size={18} />
                  </ActionIcon>
                </Indicator>
                <Avatar
                  size="sm"
                  color="teal"
                  radius="xl"
                  name="Алексей А."
                  style={{ cursor: 'pointer' }}
                />
              </Group>
            }
            sticky={false}
          />
          <Box
            p="md"
            style={{
              minHeight: 80,
              backgroundColor: 'var(--mantine-color-body)',
            }}
          >
            <Text size="sm" c="dimmed">
              Альтернативный правый слот
            </Text>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}
