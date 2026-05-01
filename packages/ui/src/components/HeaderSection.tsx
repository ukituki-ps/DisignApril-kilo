import { Avatar, Box, Menu, Stack, Text } from "@mantine/core";
import { ChevronDownIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useDensity } from "../DensityContext";
import { ProductHeaderToolbar } from "./ProductHeaderToolbar";

export function HeaderSection(): JSX.Element {
  const { density } = useDensity();
  const isCompact = density === "compact";

  const demoUserMenu = (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center", marginLeft: 4, gap: 6 }}>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            size={isCompact ? "sm" : "md"}
            radius="xl"
          />
          <Box style={{ lineHeight: 1 }} visibleFrom="sm">
            <Text size="xs" fw={500}>
              Иванова Мария
            </Text>
            <Text size="xs" c="dimmed">
              Менеджер продукта
            </Text>
          </Box>
          <ChevronDownIcon size={14} style={{ color: "var(--mantine-color-dimmed)" }} />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<UserIcon size={14} />}>Профиль</Menu.Item>
        <Menu.Item leftSection={<SettingsIcon size={14} />}>Настройки</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<LogOutIcon size={14} />} color="red">
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <Stack gap="xl">
      <Box>
        <Text fw={500} size="sm" mb="md">
          Шапка продукта
        </Text>
        <Box
          style={{
            border: "1px solid var(--mantine-color-default-border)",
            borderRadius: "var(--mantine-radius-md)",
            overflow: "hidden",
          }}
        >
          <ProductHeaderToolbar
            appName="April"
            userSlot={demoUserMenu}
            demoPageContent={
              <Box p="md" style={{ backgroundColor: "var(--mantine-color-gray-0)", minHeight: 60 }}>
                <Text size="sm" c="dimmed">
                  Область содержимого страницы
                </Text>
              </Box>
            }
          />
        </Box>
      </Box>

      <Box>
        <Text fw={500} size="sm" mb="xs">
          Состав шапки
        </Text>
        <Text size="sm" c="dimmed">
          <strong>Слева:</strong> логотип и имя приложения — всегда видны. &nbsp;
          <strong>По центру:</strong> глобальный поиск — на мобильных схлопывается в иконку. &nbsp;
          <strong>Справа:</strong> сообщения, уведомления (с индикатором), справка, меню пользователя с аватаром и
          ролью.
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          Высота: {isCompact ? "48px (компакт)" : "56px (комфорт)"}. Реагирует на режим плотности.
        </Text>
      </Box>
    </Stack>
  );
}
