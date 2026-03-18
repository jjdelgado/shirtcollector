import { Card, Grid, Group, Text, ThemeIcon } from "@mantine/core";
import { IconBuildingSkyscraper, IconFlag, IconMapPin, IconUsersGroup } from "@tabler/icons-react";
import type { Team } from "../../types/team";

interface Props {
  teams: Team[];
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Group justify="space-between">
        <div>
          <Text size="sm" c="dimmed">
            {label}
          </Text>
          <Text size="xl" fw={700}>
            {value}
          </Text>
        </div>
        <ThemeIcon size="lg" radius="md" variant="light">
          {icon}
        </ThemeIcon>
      </Group>
    </Card>
  );
}

export function TeamStats({ teams }: Props) {
  const clubs = teams.filter((t) => t.teamType === "CLUB").length;
  const nations = teams.filter((t) => t.teamType === "NATION").length;
  const countries = new Set(teams.map((t) => t.country.trim().toUpperCase())).size;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <StatCard label="Total teams" value={teams.length} icon={<IconUsersGroup size={18} />} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <StatCard label="Clubs" value={clubs} icon={<IconBuildingSkyscraper size={18} />} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <StatCard label="National teams" value={nations} icon={<IconFlag size={18} />} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
        <StatCard label="Countries" value={countries} icon={<IconMapPin size={18} />} />
      </Grid.Col>
    </Grid>
  );
}