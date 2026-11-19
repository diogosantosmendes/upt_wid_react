import { authenticatedFetch, CHARGE_API_URL } from "./configs";
import type { Charge, ChargeForm } from "../types/Charge";
import { StationService } from "./StationService";

export const ChargeService = {
    async getPage(page = 1, size = 20): Promise<{
        data: Array<Charge>;
        page: number;
        size: number;
    }> {
        const res = await authenticatedFetch(`${CHARGE_API_URL}/page?page=${page}&size=${size}`);

        if (!res.ok) {
            throw new Error("Failed to fetch charges");
        }

        return res.json();
    },

    async getById(id: string): Promise<Charge> {
        const res = await authenticatedFetch(`${CHARGE_API_URL}/${id}`);

        if (!res.ok) {
            throw new Error("Failed to fetch charge");
        }

        return res.json();
    },

    async create(chargeData: ChargeForm): Promise<Charge> {
        const station = await StationService.getById(chargeData.stationId);
        const kWh = station.pricePerKWh;
        const data: Omit<Charge, "id"> = {
            timestamp: new Date().toISOString(),
            duration: chargeData.duration,
            kWh,
            cost: kWh * chargeData.duration,
            stationId: chargeData.stationId,
        };

        const res = await authenticatedFetch(CHARGE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Failed to create charge");
        }

        return res.json();
    },

    async update(id: string, chargeData: ChargeForm): Promise<Charge> {
        const existingCharge = await ChargeService.getById(id);
        const data: Omit<Charge, "id"> = {
            timestamp: existingCharge.timestamp,
            duration: chargeData.duration,
            kWh: existingCharge.kWh,
            cost: existingCharge.kWh * chargeData.duration,
            stationId: chargeData.stationId,
        };

        const res = await authenticatedFetch(`${CHARGE_API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Failed to update charge");
        }

        return res.json();
    },

    async delete(id: string): Promise<void> {
        const res = await authenticatedFetch(`${CHARGE_API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error("Failed to delete charge");
        }
    },
};
