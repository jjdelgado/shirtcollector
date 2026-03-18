import { useState } from "react";
import type { Team, TeamType, UpdateTeamRequest } from "../../types/team";

interface Props {
  team: Team;
  onSubmit: (payload: UpdateTeamRequest) => Promise<void>;
  onCancel: () => void;
}

export function TeamEditForm({ team, onSubmit, onCancel }: Props) {
  const [teamType, setTeamType] = useState<"" | TeamType>("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: UpdateTeamRequest = {};
    if (teamType) payload.teamType = teamType;
    if (fullName.trim()) payload.fullName = fullName.trim();
    if (country.trim()) payload.country = country.trim();
    if (city.trim()) payload.city = city.trim();

    setSubmitting(true);
    try {
      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type</label>
        <br />
        <select value={teamType} onChange={(e) => setTeamType(e.target.value as "" | TeamType)}>
          <option value="">Unchanged</option>
          <option value="CLUB">CLUB</option>
          <option value="NATION">NATION</option>
        </select>
      </div>

      <div>
        <label>Full name</label>
        <br />
        <input
          placeholder={team.fullName}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div>
        <label>Country</label>
        <br />
        <input
          placeholder={team.country}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <div>
        <label>City</label>
        <br />
        <input
          placeholder={team.city ?? "No city"}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={teamType === "NATION"}
        />
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}