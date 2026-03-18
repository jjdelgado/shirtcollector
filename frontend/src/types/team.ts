export type TeamType = "CLUB" | "NATION";

export interface Team {
  id: string;
  teamType: TeamType;
  alias: string;
  fullName: string;
  country: string;
  city: string | null;
  createdAt: string;
}

export interface CreateTeamRequest {
  teamType: TeamType;
  alias: string;
  fullName: string;
  country: string;
  city?: string;
}

export interface UpdateTeamRequest {
  teamType?: TeamType;
  fullName?: string;
  country?: string;
  city?: string;
}