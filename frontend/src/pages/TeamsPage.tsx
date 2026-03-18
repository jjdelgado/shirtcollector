import { useEffect, useMemo, useState } from "react";
import { Container, Group, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { listTeams, createTeam, updateTeam } from "../api/teamsApi";
import type { CreateTeamRequest, Team, TeamType, UpdateTeamRequest } from "../types/team";
import { TeamStats } from "../components/teams/TeamStats";
import { TeamFilters } from "../components/teams/TeamFilters";
import { TeamCreateForm } from "../components/teams/TeamCreateForm";
import { TeamList } from "../components/teams/TeamList";
import { TeamEditModal } from "../components/teams/TeamEditModal";

export function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  const [teamType, setTeamType] = useState<"ALL" | TeamType>("ALL");
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("");

  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  async function loadTeams() {
    setLoading(true);
    try {
      const data = await listTeams({
        teamType: teamType === "ALL" ? undefined : teamType,
        country: country || undefined,
      });
      setTeams(data);
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Failed to load teams",
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeams();
  }, [teamType, country]);

  const filteredTeams = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return teams;

    return teams.filter((team) =>
      [team.alias, team.fullName, team.country, team.city ?? "", team.teamType]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [teams, search]);

  async function handleCreate(payload: CreateTeamRequest) {
    await createTeam(payload);
    notifications.show({
      color: "green",
      title: "Team created",
      message: `${payload.fullName} was added successfully.`,
    });
    await loadTeams();
  }

  async function handleUpdate(alias: string, payload: UpdateTeamRequest) {
    await updateTeam(alias, payload);
    notifications.show({
      color: "green",
      title: "Team updated",
      message: `${alias} was updated successfully.`,
    });
    setEditingTeam(null);
    await loadTeams();
  }

  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Group justify="space-between" align="end">
            <div>
              <Title order={1}>Teams</Title>
              <Text c="dimmed">
                Manage clubs and national teams before moving on to shirts.
              </Text>
            </div>
          </Group>
        </div>

        <TeamStats teams={teams} />

        <Group align="start" grow>
          <div style={{ flex: 1, maxWidth: 360 }}>
            <TeamCreateForm onSubmit={handleCreate} />
          </div>

          <div style={{ flex: 2 }}>
            <Stack gap="md">
              <TeamFilters
                teamType={teamType}
                country={country}
                search={search}
                loading={loading}
                shownCount={filteredTeams.length}
                onTeamTypeChange={setTeamType}
                onCountryChange={setCountry}
                onSearchChange={setSearch}
                onRefresh={loadTeams}
                onClear={() => {
                  setTeamType("ALL");
                  setCountry("");
                  setSearch("");
                }}
              />

              <TeamList
                teams={filteredTeams}
                loading={loading}
                onEdit={setEditingTeam}
              />
            </Stack>
          </div>
        </Group>
      </Stack>

      <TeamEditModal
        team={editingTeam}
        opened={!!editingTeam}
        onClose={() => setEditingTeam(null)}
        onSubmit={handleUpdate}
      />
    </Container>
  );
}