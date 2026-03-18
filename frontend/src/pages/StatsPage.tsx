import { Card, Stack, Text, Title } from "@mantine/core";

export function StatsPage() {
  return (
    <Card withBorder radius="md" padding="xl">
      <Stack>
        <Title order={2}>Stats</Title>
        <Text c="dimmed">
          This page will show collection summaries, counts by team, season, shirt type and shareable insights.
        </Text>
      </Stack>
    </Card>
  );
}