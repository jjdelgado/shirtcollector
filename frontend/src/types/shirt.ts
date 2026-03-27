import type { Team } from "./team";

export type ShirtType = "HOME" | "AWAY" | "THIRD" | "GK" | "FESTIVE" | "OTHER"
export type SleeveType = "SHORT" | "LONG"
export type AuthenticityType = "OFFICIAL" | "REPLICA"

export interface Shirt {
    id: string;
    team: Team;
    season: string;
    type: ShirtType;
    sleeve: SleeveType;
    authenticity: AuthenticityType;
    brand: string;
    notes?: string | null;
    createdAt: string
}

export interface CreateShirtRequest {
    teamId: string;
    season: string;
    type: ShirtType;
    sleeve: SleeveType;
    authenticity: AuthenticityType;
    brand: string;
    notes?: string;
}

export interface ListShirtFilters {
    teamId?: string;
    season?: string;
    type?: ShirtType;
    sleeve?: SleeveType;
    authenticity?: AuthenticityType;
    brand?: string;
}