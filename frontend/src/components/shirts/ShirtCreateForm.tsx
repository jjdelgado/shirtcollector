import { useMemo, useState } from "react";
import type { AuthenticityType, CreateShirtRequest, ShirtType, SleeveType } from "../../types/shirt";
import type { Team } from "../../types/team";
import { notifications } from "@mantine/notifications";
import { Button, Card, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";

interface Props {
    teams: Team[];
    onSubmit: (payload: CreateShirtRequest) => Promise<void>;
}

const shirtTypeOptions = [
    { value: "HOME", label: "Home" },
    { value: "AWAY", label: "Away" },
    { value: "THIRD", label: "Third" },
    { value: "GK", label: "Goalie" },
    { value: "FESTIVE", label: "Festive" },
    { value: "OTHER", label: "Other" }
];

const sleeveOptions = [
    { value: "SHORT", label: "Short sleeve" },
    { value: "LONG", label: "Long sleeve" }
];

const authenticityOptions = [
  { value: "OFFICIAL_MATCH", label: "Official match" },
  { value: "REPLICA", label: "Replica" },
];

export function ShirtCreateForm({ teams, onSubmit }: Props) {
    const [teamId, setTeamId] = useState<string | null>(null);
    const [season, setSeason] = useState("");
    const [type, setType] = useState<ShirtType | null>("HOME");
    const [sleeve, setSleeve] = useState<SleeveType | null>("SHORT");
    const [authenticity, setAuthenticity] = useState<AuthenticityType | null>("REPLICA");
    const [brand, setBrand] = useState("");
    const [notes, setNotes] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const teamOptions = useMemo(
        () =>
            teams.map((team) => ({
                value: team.id,
                label: `${team.alias} - (${team.fullName})`,
            })),
            [teams]
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!teamId || !season.trim() || !type || !sleeve || !authenticity || !brand.trim()) {
            notifications.show({
                color: "red",
                title: "Missing mandatory fields",
                message: "Team, season, type, sleeve, authenticity and brand are required."
            });
            return;
        }

        setSubmitting(true);
        try{
            await onSubmit({
                teamId,
                season: season.trim(),
                type,
                sleeve,
                authenticity,
                brand: brand.trim(),
                notes: notes.trim() || undefined
            });

            setTeamId(null);
            setSeason("");
            setType("HOME");
            setSleeve("SHORT");
            setAuthenticity("REPLICA");
            setBrand("");
            setNotes("");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Card withBorder radius="md" padding="lg">
            <form onSubmit={handleSubmit}>
                <Stack>
                    <Text fw={600} size="lg">
                        Create shirt
                    </Text>

                    <Select
                        label="Team"
                        placeholder="Select Team"
                        searchable
                        data={teamOptions}
                        value={teamId}
                        onChange={setTeamId}
                        nothingFoundMessage="No teams found"
                    />

                    <TextInput
                        label="Season"
                        placeholder="e.g. 1993/1994"
                        value={season}
                        onChange={(e) => setSeason(e.currentTarget.value)}
                    />

                    <Select
                        label="Type"
                        data={shirtTypeOptions}
                        value={type}
                        onChange={(value) => setType((value as ShirtType) ?? "HOME")}
                        allowDeselect={false}
                    />

                    <Select
                        label="Sleeve"
                        data={sleeveOptions}
                        value={sleeve}
                        onChange={(value) => setSleeve((value as SleeveType) ?? "SHORT")}
                        allowDeselect={false}
                    />

                    <Select
                        label="Authenticity"
                        data={authenticityOptions}
                        value={authenticity}
                        onChange={(value) => setAuthenticity((value as AuthenticityType) ?? "REPLICA")}
                        allowDeselect={false}
                    />

                    <TextInput
                        label="Brand"
                        placeholder="e.g. Adidas"
                        value={brand}
                        onChange={(e) => setBrand(e.currentTarget.value)}
                    />

                    <Textarea
                        label="Notes"
                        placeholder="Optional notes"
                        minRows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.currentTarget.value)}
                    />

                    <Button type="submit" loading={submitting}>
                        Create shirt
                    </Button>
                </Stack>
            </form>
        </Card>
    );
}