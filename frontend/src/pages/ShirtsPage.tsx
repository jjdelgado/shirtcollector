import { Card, Stack, Text, Title } from "@mantine/core";

export function ShirtsPage() {
  return (
    <Card withBorder radius="md" padding="xl">
      <Stack>
        <Title order={2}>Shirts</Title>
        <Text c="dimmed">
          This page will manage shirt catalogue entries and filtering by team, season, type, sleeve and authenticity.
        </Text>
      </Stack>
    </Card>
  );
}