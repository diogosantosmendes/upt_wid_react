import { useCallback, useState } from "react";
import type { Station, StationForm } from "../../types/Station";
import { StationService } from "../../services/StationService";


interface StationFormProps {
    station?: Station,
    onSuccess: (station: Station) => void
}

const defaultStation: Station = {
    id: '',
    location: '',
    status: 0,
    coord: { lat: 0, long: 0 },
    pricePerKWh: 0
}

export default function StationForm({ station, onSuccess }: StationFormProps) {
    const [formData, setFormData] = useState<StationForm>(station || defaultStation);

    const save = useCallback(async (formData: StationForm) => {
        try {
            if (station) {
                const updated = await StationService.update(station.id, formData);
                onSuccess(updated);
            } else {
                const newStation = await StationService.create(formData);
                onSuccess(newStation);
                setFormData(defaultStation);
            }
        } catch (error: any) {
            alert("Failed to save station: " + error.message);
        }
    }, [station]);

    const handleChangeOnPricePerKWh = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const value = parseFloat(e.target.value);
            if (isNaN(value)) {
                alert("Invalid input for price per KWh. Please enter a valid number.");
                return;
            }
            if (value < 0) {
                alert("Price per KWh cannot be negative. Please enter a positive number.");
                return;
            }

            setFormData(f => ({ ...f, pricePerKWh: value }));
        } catch (error: any) {
            alert("Invalid input for price per KWh. Please enter a valid number: " + error.message);
        }
    }, [setFormData]);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            save(formData);
        }}>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                    id="location"
                    type="text"
                    className="form-control"
                    value={formData.location}
                    onChange={(e) => setFormData(f => ({ ...f, location: e.target.value }))}
                />

                <label htmlFor="pricePerKWh" className="form-label">Price per KWh</label>
                <input
                    id="pricePerKWh"
                    type="number"
                    className="form-control"
                    value={formData.pricePerKWh}
                    min={0}
                    step="any"
                    onChange={handleChangeOnPricePerKWh}
                />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
}