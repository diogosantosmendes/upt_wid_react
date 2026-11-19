import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import type { Charge, ChargeForm as ChargeFormData } from "../../types/Charge";
import { ChargeService } from "../../services/ChargeService";

interface ChargeFormProps {
    charge?: Charge;
    onSuccess: (charge: Charge) => void;
}

type NumericChargeField = "duration";

function createDefaultCharge(): ChargeFormData {
    return {
        duration: 0,
        stationId: "",
    };
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "An unknown error occurred.";
}

export default function ChargeForm({ charge, onSuccess }: ChargeFormProps) {
    const [formData, setFormData] = useState<ChargeFormData>(charge ?? createDefaultCharge());

    const save = useCallback(async (data: ChargeFormData) => {
        try {
            const savedCharge = charge
                ? await ChargeService.update(charge.id, data)
                : await ChargeService.create(data);
            onSuccess(savedCharge);

            if (!charge) {
                setFormData(createDefaultCharge());
            }
        } catch (error) {
            alert(`Failed to save charge: ${getErrorMessage(error)}`);
        }
    }, [charge, onSuccess]);

    const handleNumberChange = useCallback((field: NumericChargeField) => (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const value = Number(event.currentTarget.value);
        setFormData(previous => ({ ...previous, [field]: value }));
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void save(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="charge-station-id" className="form-label">Station ID</label>
                <input
                    id="charge-station-id"
                    type="text"
                    className="form-control"
                    value={formData.stationId}
                    onChange={event => {
                        const stationId = event.currentTarget.value;
                        setFormData(previous => ({ ...previous, stationId }));
                    }}
                    required
                />

                <label htmlFor="charge-duration" className="form-label mt-3">Duration</label>
                <input
                    id="charge-duration"
                    type="number"
                    className="form-control"
                    min={0}
                    step="any"
                    value={formData.duration}
                    onChange={handleNumberChange("duration")}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Save Charge</button>
        </form>
    );
}
