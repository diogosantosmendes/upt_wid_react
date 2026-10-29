import { STATION_API_URL } from "./configs";
import type { Station, StationForm } from "../types/Station";

export const StationService = {

    async getPage(page = 1, size = 20): Promise<{
        data: Array<Station>,
        page: number,
        size: number
    }> {
        const res = await fetch(`${STATION_API_URL}/page?page=${page}&size=${size}`);

        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error("Failed to fetch stations");
        }
    },

    async getCount(): Promise<{count: number}> {
        const res = await fetch(`${STATION_API_URL}/count`);

        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error("Failed to fetch station");
        }
    },

    async getById(id: string): Promise<Station> {
        const res = await fetch(`${STATION_API_URL}/${id}`);

        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error("Failed to fetch station");
        }
    },

    async create(stationData: StationForm): Promise<Station> {
        const res = await fetch(`${STATION_API_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stationData)
        });

        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error("Failed to create station");
        }
    },

    
    async update(id: string, stationData: StationForm): Promise<Station> {
        const res = await fetch(`${STATION_API_URL}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stationData)
        });

        if (res.ok) {
            return res.json();
        }
        else {
            throw new Error("Failed to update station");
        }
    },

    async delete(id: string): Promise<void> {
        const res = await fetch(`${STATION_API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error("Failed to delete station");
        }
    },
}