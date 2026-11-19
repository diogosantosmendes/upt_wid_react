export interface Charge {
    id: string;
    timestamp: string;
    duration: number;
    kWh: number;
    cost: number;
    stationId: string;
}

export type ChargeForm = Pick<Charge, "duration" | "stationId">;
