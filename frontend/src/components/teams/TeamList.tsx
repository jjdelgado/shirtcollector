import { Badge, Button, Card, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import type { Team } from "../../types/team";

interface Props {
  teams: Team[];
  loading: boolean;
  onEdit: (team: Team) => void;
}

export function TeamList({ teams, loading, onEdit }: Props) {
  if (loading) {
    return <Text c="dimmed">Loading teams...</Text>;
  }

  if (teams.length === 0) {
    return (
      <Card withBorder radius="md" padding="xl">
        <Text fw={500}>No teams found</Text>
        <Text size="sm" c="dimmed" mt={4}>
          Adjust filters or create your first team.
        </Text>
      </Card>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, xl: 2 }} spacing="md">
      {teams.map((team) => (
        <Card key={team.id} withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={600}>{team.fullName}</Text>
                <Text size="sm" c="dimmed">
                  {team.alias}
                </Text>
              </div>

              <Badge variant="light">{team.teamType}</Badge>
            </Group>

            <div>
              <Text size="sm">
                <strong>Country:</strong> {team.country}
              </Text>
              <Text size="sm">
                <strong>City:</strong> {team.city ?? "—"}
              </Text>
            </div>

            <Group justify="flex-end">
              <Button variant="light" onClick={() => onEdit(team)}>
                Edit
              </Button>
            </Group>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}