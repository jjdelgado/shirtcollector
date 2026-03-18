import { useState } from "react";
import { Button, Card, Select, Stack, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type { CreateTeamRequest, TeamType } from "../../types/team";

interface Props {
  onSubmit: (payload: CreateTeamRequest) => Promise<void>;
}

export function TeamCreateForm({ onSubmit }: Props) {
  const [teamType, setTeamType] = useState<TeamType>("CLUB");
  const [alias, setAlias] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!alias.trim() || !fullName.trim() || !country.trim()) {
      notifications.show({
        color: "red",
        title: "Missing fields",
        message: "Alias, full name and country are required.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        teamType,
        alias: alias.trim().toLowerCase(),
        fullName: fullName.trim(),
        country: country.trim().toUpperCase(),
        city: teamType === "NATION" ? undefined : city.trim() || undefined,
      });

      setTeamType("CLUB");
      setAlias("");
      setFullName("");
      setCountry("");
      setCity("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card withBorder radius="md" padding="lg">
      <form onSubmit={handleSubmit}>
        <Stack>
          <Text fw={600} size="lg">
            Create team
          </Text>

          <Select
            label="Type"
            data={[
              { value: "CLUB", label: "Club" },
              { value: "NATION", label: "Nation" },
            ]}
            value={teamType}
            onChange={(value) => setTeamType((value as TeamType) ?? "CLUB")}
            allowDeselect={false}
          />

          <TextInput
            label="Alias"
            placeholder="e.g. benfica"
            value={alias}
            onChange={(e) => setAlias(e.currentTarget.value)}
          />

          <TextInput
            label="Full name"
            placeholder="e.g. Sport Lisboa e Benfica"
            value={fullName}
            onChange={(e) => setFullName(e.currentTarget.value)}
          />

          <TextInput
            label="Country"
            placeholder="e.g. PT"
            value={country}
            onChange={(e) => setCountry(e.currentTarget.value)}
          />

          <TextInput
            label="City"
            placeholder={teamType === "NATION" ? "Not used for nations" : "e.g. Lisbon"}
            value={city}
            disabled={teamType === "NATION"}
            onChange={(e) => setCity(e.currentTarget.value)}
          />

          <Button type="submit" loading={submitting}>
            Create team
          </Button>
        </Stack>
      </form>
    </Card>
  );
}