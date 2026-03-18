import { useEffect, useState } from "react";
import { Button, Group, Modal, Select, Stack, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type { Team, TeamType, UpdateTeamRequest } from "../../types/team";

interface Props {
  team: Team | null;
  opened: boolean;
  onClose: () => void;
  onSubmit: (alias: string, payload: UpdateTeamRequest) => Promise<void>;
}

export function TeamEditModal({ team, opened, onClose, onSubmit }: Props) {
  const [teamType, setTeamType] = useState<"" | TeamType>("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!opened) {
      setTeamType("");
      setFullName("");
      setCountry("");
      setCity("");
    }
  }, [opened]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!team) return;

    const payload: UpdateTeamRequest = {};
    if (teamType) payload.teamType = teamType;
    if (fullName.trim()) payload.fullName = fullName.trim();
    if (country.trim()) payload.country = country.trim();
    if (city.trim()) payload.city = city.trim();

    if (Object.keys(payload).length === 0) {
      notifications.show({
        color: "yellow",
        title: "No changes",
        message: "Fill at least one field to update the team.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(team.alias, payload);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal opened={opened} onClose={onClose} title={team ? `Edit ${team.alias}` : "Edit team"} centered>
      {team && (
        <form onSubmit={handleSubmit}>
          <Stack>
            <Text size="sm" c="dimmed">
              Leave fields empty to keep their current values.
            </Text>

            <Select
              label="Type"
              placeholder="Leave unchanged"
              data={[
                { value: "CLUB", label: "Club" },
                { value: "NATION", label: "Nation" },
              ]}
              value={teamType || null}
              onChange={(value) => setTeamType((value as TeamType) ?? "")}
              clearable
            />

            <TextInput
              label="Full name"
              placeholder={team.fullName}
              value={fullName}
              onChange={(e) => setFullName(e.currentTarget.value)}
            />

            <TextInput
              label="Country"
              placeholder={team.country}
              value={country}
              onChange={(e) => setCountry(e.currentTarget.value)}
            />

            <TextInput
              label="City"
              placeholder={team.city ?? "No city"}
              value={city}
              disabled={teamType === "NATION"}
              onChange={(e) => setCity(e.currentTarget.value)}
            />

            <Group justify="flex-end">
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" loading={submitting}>
                Save changes
              </Button>
            </Group>
          </Stack>
        </form>
      )}
    </Modal>
  );
}