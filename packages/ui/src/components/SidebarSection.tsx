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
    { id: "dashboard", type: "link", label: "Обзор", icon: LayoutDashboardIcon, href: "#" },
    { id: "tasks", type: "link", label: "Задачи", icon: CheckSquareIcon, href: "#", badge: "12" },
    { id: "inbox", type: "link", label: "Входящие", icon: InboxIcon, href: "#", badge: "3" },
    { id: "calendar", type: "link", label: "Календарь", icon: CalendarIcon, href: "#" },
    { id: "divider1", type: "divider", label: "CRM" },
    { id: "contacts", type: "link", label: "Контакты", icon: UsersIcon, href: "#" },
    { id: "deals", type: "link", label: "Сделки", icon: BriefcaseIcon, href: "#" },
    { id: "companies", type: "link", label: "Компании", icon: BuildingIcon, href: "#" },
    { id: "divider2", type: "divider", label: "HRM" },
    { id: "employees", type: "link", label: "Сотрудники", icon: UserCogIcon, href: "#" },
    { id: "recruitment", type: "link", label: "Подбор", icon: ClipboardListIcon, href: "#" },
    { id: "divider3", type: "divider", label: "Прочее" },
    { id: "documents", type: "link", label: "Документы", icon: FileTextIcon, href: "#" },
    { id: "projects", type: "link", label: "Проекты", icon: FolderIcon, href: "#" },
    { id: "reports", type: "link", label: "Отчёты", icon: BarChart3Icon, href: "#" },
  ];
}

export function SidebarSection(): JSX.Element {
  const { density } = useDensity();
  const isCompact = density === "compact";
  const [active, setActive] = useState("tasks");

  const navItems = buildSidebarDemoItems();

  const activeMeta = navItems.find(
    (i): i is Extract<ProductSidebarNavEntry, { type: "link" }> => i.type === "link" && i.id === active
  );

  const labelForContent = activeMeta?.label ?? "Обзор";

  return (
    <Stack gap="xl">
      <Box>
        <Text fw={500} size="sm" mb="md">
          Боковая панель продукта
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
                Область контента
              </Text>
            </Stack>
          </Box>
        </Group>
      </Box>

      <Box>
        <Text fw={500} size="sm" mb="xs">
          Состав боковой панели
        </Text>
        <Text size="sm" c="dimmed">
          <strong>Разделы:</strong> обзор и продуктивность (задачи, входящие, календарь), CRM (контакты, сделки,
          компании), HRM (сотрудники, подбор), прочее (документы, проекты, отчёты).
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          <strong>Возможности:</strong> сворачивание до режима только иконок (60px). Активный пункт — бирюзовый
          акцент. Счётчики на пунктах с действиями. Настройки закреплены внизу. Реагирует на плотность.
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          Ширина: {isCompact ? "220px (компакт)" : "250px (комфорт)"} в развёрнутом виде, 60px в свёрнутом.
        </Text>
      </Box>
    </Stack>
  );
}
