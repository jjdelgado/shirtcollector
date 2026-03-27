import { Badge, Card, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import type { Shirt } from "../../types/shirt";

interface Props {
  shirts: Shirt[];
  loading: boolean;
}

export function ShirtList({ shirts, loading }: Props) {
  if (loading) {
    return <Text c="dimmed">Loading shirts...</Text>;
  }

  if (shirts.length === 0) {
    return (
      <Card withBorder radius="md" padding="xl">
        <Text fw={500}>No shirts found</Text>
        <Text size="sm" c="dimmed" mt={4}>
          Adjust filters or create your first shirt.
        </Text>
      </Card>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, xl: 2 }} spacing="md">
      {shirts.map((shirt) => (
        <Card key={shirt.id} withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Group justify="space-between" align="flex-start">
              <div>
                <Text fw={600}>{shirt.team.fullName}</Text>
                <Text size="sm" c="dimmed">
                  {shirt.season} • {shirt.brand}
                </Text>
              </div>

              <Group gap="xs">
                <Badge variant="light">{shirt.type}</Badge>
                <Badge variant="light">{shirt.sleeve}</Badge>
              </Group>
            </Group>

            <div>
              <Text size="sm">
                <strong>Team alias:</strong> {shirt.team.alias}
              </Text>
              <Text size="sm">
                <strong>Authenticity:</strong> {shirt.authenticity}
              </Text>
              <Text size="sm">
                <strong>Country:</strong> {shirt.team.country}
              </Text>
              {shirt.notes ? (
                <Text size="sm">
                  <strong>Notes:</strong> {shirt.notes}
                </Text>
              ) : null}
            </div>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}