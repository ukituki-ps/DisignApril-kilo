import { useState } from "react";
import { Box, Group, Stack, Text } from "@mantine/core";
import {
  LayoutDashboardIcon,
  CheckSquareIcon,
  UsersIcon,
  UserCogIcon,
  FileTextIcon,
  BarChart3Icon,
  CalendarIcon,
  InboxIcon,
  BriefcaseIcon,
  FolderIcon,
  BuildingIcon,
  ClipboardListIcon,
} from "lucide-react";
import { useDensity } from "../DensityContext";
import { ProductSidebarNavigation, type ProductSidebarNavEntry } from "./ProductSidebarNavigation";

function buildSidebarDemoItems(): ProductSidebarNavEntry[] {
  return [
    { id: "dashboard", type: "link", label: "Dashboard", icon: LayoutDashboardIcon, href: "#" },
    { id: "tasks", type: "link", label: "Tasks", icon: CheckSquareIcon, href: "#", badge: "12" },
    { id: "inbox", type: "link", label: "Inbox", icon: InboxIcon, href: "#", badge: "3" },
    { id: "calendar", type: "link", label: "Calendar", icon: CalendarIcon, href: "#" },
    { id: "divider1", type: "divider", label: "CRM" },
    { id: "contacts", type: "link", label: "Contacts", icon: UsersIcon, href: "#" },
    { id: "deals", type: "link", label: "Deals", icon: BriefcaseIcon, href: "#" },
    { id: "companies", type: "link", label: "Companies", icon: BuildingIcon, href: "#" },
    { id: "divider2", type: "divider", label: "HRM" },
    { id: "employees", type: "link", label: "Employees", icon: UserCogIcon, href: "#" },
    { id: "recruitment", type: "link", label: "Recruitment", icon: ClipboardListIcon, href: "#" },
    { id: "divider3", type: "divider", label: "Other" },
    { id: "documents", type: "link", label: "Documents", icon: FileTextIcon, href: "#" },
    { id: "projects", type: "link", label: "Projects", icon: FolderIcon, href: "#" },
    { id: "reports", type: "link", label: "Reports", icon: BarChart3Icon, href: "#" },
  ];
}

export function SidebarSection(): JSX.Element {
  const { density } = useDensity();
  const isCompact = density === "compact";
  const [active, setActive] = useState("tasks");

  const navItems = buildSidebarDemoItems();

  const activeMeta = navItems.find((i): i is Extract<ProductSidebarNavEntry, { type: "link" }> => i.type === "link" && i.id === active);

  const labelForContent = activeMeta?.label ?? "Dashboard";

  return (
    <Stack gap="xl">
      <Box>
        <Text fw={500} size="sm" mb="md">
          Product Sidebar
        </Text>
        <Group align="flex-start" gap="lg" wrap="nowrap">
          <ProductSidebarNavigation items={navItems} activeId={active} onDemoActivate={setActive} />
          <Box
            style={{
              flex: 1,
              minHeight: 520,
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: "var(--mantine-radius-md)",
              backgroundColor: "var(--mantine-color-gray-0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack align="center" gap="xs">
              <Text size="lg" fw={500}>
                {labelForContent}
              </Text>
              <Text size="sm" c="dimmed">
                Content area
              </Text>
            </Stack>
          </Box>
        </Group>
      </Box>

      <Box>
        <Text fw={500} size="sm" mb="xs">
          Sidebar Anatomy
        </Text>
        <Text size="sm" c="dimmed">
          <strong>Sections:</strong> Dashboard & productivity (Tasks, Inbox, Calendar), CRM (Contacts, Deals, Companies),
          HRM (Employees, Recruitment), Other (Documents, Projects, Reports).
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          <strong>Features:</strong> Collapsible to icon-only mode (60px). Active state uses teal accent. Badge counters for
          actionable items. Settings pinned to bottom. Responds to density mode.
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          Width: {isCompact ? "220px (compact)" : "250px (comfortable)"} expanded, 60px collapsed.
        </Text>
      </Box>
    </Stack>
  );
}
