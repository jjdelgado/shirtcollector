import { Card, Stack, Text, Title } from "@mantine/core";

export function CollectionPage() {
  return (
    <Card withBorder radius="md" padding="xl">
      <Stack>
        <Title order={2}>Collection</Title>
        <Text c="dimmed">
          This page will manage user-owned shirts, player name, number, match-worn status and collection browsing.
        </Text>
      </Stack>
    </Card>
  );
}