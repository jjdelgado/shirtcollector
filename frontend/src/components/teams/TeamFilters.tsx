import { Button, Card, Group, Select, SimpleGrid, Text, TextInput } from "@mantine/core";
import { IconRefresh, IconSearch, IconX } from "@tabler/icons-react";
import type { TeamType } from "../../types/team";

interface Props {
  teamType: "ALL" | TeamType;
  country: string;
  search: string;
  loading: boolean;
  shownCount: number;
  onTeamTypeChange: (value: "ALL" | TeamType) => void;
  onCountryChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  onClear: () => void;
}

export function TeamFilters({
  teamType,
  country,
  search,
  loading,
  shownCount,
  onTeamTypeChange,
  onCountryChange,
  onSearchChange,
  onRefresh,
  onClear,
}: Props) {
  const hasFilters = teamType !== "ALL" || country.trim() !== "" || search.trim() !== "";

  return (
    <Card withBorder radius="md" padding="lg">
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        <Select
          label="Type"
          data={[
            { value: "ALL", label: "All" },
            { value: "CLUB", label: "Club" },
            { value: "NATION", label: "Nation" },
          ]}
          value={teamType}
          onChange={(value) => onTeamTypeChange((value as "ALL" | TeamType) ?? "ALL")}
        />

        <TextInput
          label="Country"
          placeholder="Filter by country"
          value={country}
          onChange={(e) => onCountryChange(e.currentTarget.value)}
        />

        <TextInput
          label="Search"
          placeholder="Alias, name, country..."
          value={search}
          leftSection={<IconSearch size={16} />}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
        />
      </SimpleGrid>

      <Group justify="space-between" mt="md">
        <Text size="sm" c="dimmed">
          {shownCount} shown
        </Text>

        <Group>
          {hasFilters && (
            <Button variant="subtle" leftSection={<IconX size={16} />} onClick={onClear}>
              Clear
            </Button>
          )}
          <Button variant="light" leftSection={<IconRefresh size={16} />} loading={loading} onClick={onRefresh}>
            Refresh
          </Button>
        </Group>
      </Group>
    </Card>
  );
}