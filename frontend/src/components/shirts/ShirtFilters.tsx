import { Button, Card, Group, Select, SimpleGrid, Text, TextInput } from "@mantine/core";
import { IconRefresh, IconX } from "@tabler/icons-react";
import type { Team } from "../../types/team";
import type { AuthenticityType, ShirtType, SleeveType } from "../../types/shirt";

interface Props {
  teams: Team[];
  teamId: string;
  season: string;
  type: "" | ShirtType;
  sleeve: "" | SleeveType;
  authenticity: "" | AuthenticityType;
  brand: string;
  loading: boolean;
  shownCount: number;
  onTeamIdChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
  onTypeChange: (value: "" | ShirtType) => void;
  onSleeveChange: (value: "" | SleeveType) => void;
  onAuthenticityChange: (value: "" | AuthenticityType) => void;
  onBrandChange: (value: string) => void;
  onRefresh: () => void;
  onClear: () => void;
}

export function ShirtFilters(props: Props) {
  const teamOptions = [
    { value: "", label: "All teams" },
    ...props.teams.map((team) => ({
      value: team.id,
      label: `${team.fullName} (${team.alias})`,
    })),
  ];

  const hasFilters =
    !!props.teamId ||
    !!props.season.trim() ||
    !!props.type ||
    !!props.sleeve ||
    !!props.authenticity ||
    !!props.brand.trim();

  return (
    <Card withBorder radius="md" padding="lg">
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        <Select
          label="Team"
          searchable
          data={teamOptions}
          value={props.teamId}
          onChange={(value) => props.onTeamIdChange(value ?? "")}
        />

        <TextInput
          label="Season"
          placeholder="e.g. 2024/2025"
          value={props.season}
          onChange={(e) => props.onSeasonChange(e.currentTarget.value)}
        />

        <TextInput
          label="Brand"
          placeholder="e.g. Adidas"
          value={props.brand}
          onChange={(e) => props.onBrandChange(e.currentTarget.value)}
        />

        <Select
          label="Type"
          data={[
            { value: "", label: "All types" },
            { value: "HOME", label: "Home" },
            { value: "AWAY", label: "Away" },
            { value: "THIRD", label: "Third" },
            { value: "GK_HOME", label: "GK Home" },
            { value: "GK_AWAY", label: "GK Away" },
          ]}
          value={props.type}
          onChange={(value) => props.onTypeChange((value as "" | ShirtType) ?? "")}
        />

        <Select
          label="Sleeve"
          data={[
            { value: "", label: "All sleeves" },
            { value: "SHORT", label: "Short" },
            { value: "LONG", label: "Long" },
          ]}
          value={props.sleeve}
          onChange={(value) => props.onSleeveChange((value as "" | SleeveType) ?? "")}
        />

        <Select
          label="Authenticity"
          data={[
            { value: "", label: "All" },
            { value: "OFFICIAL_MATCH", label: "Official match" },
            { value: "REPLICA", label: "Replica" },
          ]}
          value={props.authenticity}
          onChange={(value) => props.onAuthenticityChange((value as "" | AuthenticityType) ?? "")}
        />
      </SimpleGrid>

      <Group justify="space-between" mt="md">
        <Text size="sm" c="dimmed">
          {props.shownCount} shown
        </Text>

        <Group>
          {hasFilters && (
            <Button variant="subtle" leftSection={<IconX size={16} />} onClick={props.onClear}>
              Clear
            </Button>
          )}
          <Button variant="light" leftSection={<IconRefresh size={16} />} loading={props.loading} onClick={props.onRefresh}>
            Refresh
          </Button>
        </Group>
      </Group>
    </Card>
  );
}