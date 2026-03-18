import { apiFetch } from "./http";
import type { CreateTeamRequest, Team, TeamType, UpdateTeamRequest } from "../types/team";

export interface ListTeamsFilters {
  teamType?: TeamType;
  country?: string;
}

export function listTeams(filters?: ListTeamsFilters): Promise<Team[]> {
  const params = new URLSearchParams();

  if (filters?.teamType) {
    params.set("teamType", filters.teamType);
  }

  if (filters?.country?.trim()) {
    params.set("country", filters.country.trim());
  }

  const query = params.toString();
  return apiFetch<Team[]>(`/teams${query ? `?${query}` : ""}`);
}

export function getTeamByAlias(alias: string): Promise<Team> {
  return apiFetch<Team>(`/teams/${alias}`);
}

export function createTeam(payload: CreateTeamRequest): Promise<Team> {
  return apiFetch<Team>("/teams", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateTeam(alias: string, payload: UpdateTeamRequest): Promise<Team> {
  return apiFetch<Team>(`/teams/${alias}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}