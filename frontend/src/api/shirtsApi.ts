import type { CreateShirtRequest, ListShirtFilters, Shirt } from "../types/shirt";
import { apiFetch } from "./http";

export function listShirts(filters?: ListShirtFilters): Promise<Shirt[]> {
    const params = new URLSearchParams();

    if (filters?.teamId) params.set("teamid", filters.teamId);
    if (filters?.season?.trim()) params.set("season", filters.season.trim());
    if (filters?.type) params.set("type", filters.type);
    if (filters?.sleeve) params.set("sleeve", filters.sleeve);
    if (filters?.authenticity) params.set("authenticity", filters.authenticity);
    if (filters?.brand?.trim()) params.set("brand", filters.brand.trim());

    const query = params.toString();
    return apiFetch<Shirt[]>(`/shirts${query ? `?${query}` : ""}`);
}

export function createShirt(payload: CreateShirtRequest): Promise<Shirt> {
    return apiFetch<Shirt>("/shirts", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}