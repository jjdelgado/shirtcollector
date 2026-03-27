import { useEffect, useState } from "react";
import { Container, Grid, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { listTeams } from "../api/teamsApi";
import { createShirt, listShirts } from "../api/shirtsApi";
import { ShirtCreateForm } from "../components/shirts/ShirtCreateForm";
import { ShirtFilters } from "../components/shirts/ShirtFilters";
import { ShirtList } from "../components/shirts/ShirtList";
import type { Team } from "../types/team";
import type {
  AuthenticityType,
  CreateShirtRequest,
  Shirt,
  ShirtType,
  SleeveType,
} from "../types/shirt";

export function ShirtsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [shirts, setShirts] = useState<Shirt[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingShirts, setLoadingShirts] = useState(false);

  const [teamId, setTeamId] = useState("");
  const [season, setSeason] = useState("");
  const [type, setType] = useState<"" | ShirtType>("");
  const [sleeve, setSleeve] = useState<"" | SleeveType>("");
  const [authenticity, setAuthenticity] = useState<"" | AuthenticityType>("");
  const [brand, setBrand] = useState("");

  async function loadTeamsData() {
    setLoadingTeams(true);
    try {
      const data = await listTeams();
      setTeams(data);
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Failed to load teams",
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    } finally {
      setLoadingTeams(false);
    }
  }

  async function loadShirtsData() {
    setLoadingShirts(true);
    try {
      const data = await listShirts({
        teamId: teamId || undefined,
        season: season || undefined,
        type: type || undefined,
        sleeve: sleeve || undefined,
        authenticity: authenticity || undefined,
        brand: brand || undefined,
      });
      setShirts(data);
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Failed to load shirts",
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    } finally {
      setLoadingShirts(false);
    }
  }

  useEffect(() => {
    loadTeamsData();
  }, []);

  useEffect(() => {
    loadShirtsData();
  }, [teamId, season, type, sleeve, authenticity, brand]);

  async function handleCreate(payload: CreateShirtRequest) {
    await createShirt(payload);
    notifications.show({
      color: "green",
      title: "Shirt created",
      message: "The shirt was added successfully.",
    });
    await loadShirtsData();
  }

  function clearFilters() {
    setTeamId("");
    setSeason("");
    setType("");
    setSleeve("");
    setAuthenticity("");
    setBrand("");
  }

  return (
    <Container size="xl">
      <Stack gap="lg">
        <div>
          <Title order={1}>Shirts</Title>
          <Text c="dimmed">
            Manage the shirt catalogue by team, season, type, sleeve, authenticity and brand.
          </Text>
        </div>

        <Grid align="start">
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <ShirtCreateForm teams={teams} onSubmit={handleCreate} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack gap="md">
              <ShirtFilters
                teams={teams}
                teamId={teamId}
                season={season}
                type={type}
                sleeve={sleeve}
                authenticity={authenticity}
                brand={brand}
                loading={loadingShirts || loadingTeams}
                shownCount={shirts.length}
                onTeamIdChange={setTeamId}
                onSeasonChange={setSeason}
                onTypeChange={setType}
                onSleeveChange={setSleeve}
                onAuthenticityChange={setAuthenticity}
                onBrandChange={setBrand}
                onRefresh={loadShirtsData}
                onClear={clearFilters}
              />

              <ShirtList shirts={shirts} loading={loadingShirts} />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}