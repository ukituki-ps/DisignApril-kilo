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
              Jane Doe
            </Text>
            <Text size="xs" c="dimmed">
              Product Manager
            </Text>
          </Box>
          <ChevronDownIcon size={14} style={{ color: "var(--mantine-color-dimmed)" }} />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<UserIcon size={14} />}>Profile</Menu.Item>
        <Menu.Item leftSection={<SettingsIcon size={14} />}>Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<LogOutIcon size={14} />} color="red">
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <Stack gap="xl">
      <Box>
        <Text fw={500} size="sm" mb="md">
          Product Header
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
                  Page content area
                </Text>
              </Box>
            }
          />
        </Box>
      </Box>

      <Box>
        <Text fw={500} size="sm" mb="xs">
          Header Anatomy
        </Text>
        <Text size="sm" c="dimmed">
          <strong>Left:</strong> Logo + app name — always visible. &nbsp;
          <strong>Center:</strong> Global search — collapses to icon on mobile. &nbsp;
          <strong>Right:</strong> Messages, notifications (with indicator), help, user menu with avatar and role.
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          Height: {isCompact ? "48px (compact)" : "56px (comfortable)"}. Responds to density mode.
        </Text>
      </Box>
    </Stack>
  );
}
