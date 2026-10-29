export const StationStatus = {
    Unavailable: 0,
    Available: 1,
    Charging: 2,
    UnderMaintenance: 3
} as const;
export type StationStatus = typeof StationStatus[keyof typeof StationStatus];

export interface Station {
    id: string,
    location: string,
    status: StationStatus,
    coord: {
        lat: number,
        long: number
    },
    pricePerKWh: number
}

export type StationForm = Omit<Station, 'id'>;