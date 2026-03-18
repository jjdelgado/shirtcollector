import { NavLink, Stack, Text } from "@mantine/core";
import {
  IconChartBar,
  IconClipboardList,
  IconShirtSport,
  IconShield,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "Teams", path: "/teams", icon: IconShield },
  { label: "Shirts", path: "/shirts", icon: IconShirtSport },
  { label: "Collection", path: "/collection", icon: IconClipboardList },
  { label: "Stats", path: "/stats", icon: IconChartBar },
];

export function AppNavbar() {
  const location = useLocation();

  return (
    <Stack gap="xs">
      <div>
        <Text size="xs" tt="uppercase" fw={700} c="dimmed">
          Navigation
        </Text>
      </div>

      {items.map((item) => {
        const Icon = item.icon;
        const active = location.pathname === item.path;

        return (
          <NavLink
            key={item.path}
            component={Link}
            to={item.path}
            label={item.label}
            active={active}
            leftSection={<Icon size={16} />}
            variant="filled"
            color="blue"
            radius="md"
          />
        );
      })}
    </Stack>
  );
}