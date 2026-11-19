import { useCallback, useEffect, useState } from "react";
import ChargeComponent from "../components/charges/ChargeComponent";
import ChargeForm from "../components/charges/ChargeForm";
import { ChargeService } from "../services/ChargeService";
import type { Charge } from "../types/Charge";

export default function ChargesListPage() {
    const [charges, setCharges] = useState<Charge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        ChargeService.getPage()
            .then(response => {
                if (isActive) {
                    setCharges(response.data);
                }
            })
            .catch((cause: unknown) => {
                if (isActive) {
                    setError(cause instanceof Error ? cause.message : "Failed to get charges list.");
                }
            })
            .finally(() => {
                if (isActive) {
                    setLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, []);

    const handleDelete = useCallback((id: string) => {
        setCharges(previous => previous.filter(charge => charge.id !== id));
    }, []);

    const handleCreate = useCallback((newCharge: Charge) => {
        setCharges(previous => [newCharge, ...previous]);
    }, []);

    return (
        <div className="container">
            <h1 className="h3 mb-3">Charges</h1>
            <div className="card shadow-sm p-3 mb-3">
                <div className="card-body">
                    <h2 className="h5 card-title">Record a Charge</h2>
                    <ChargeForm onSuccess={handleCreate} />
                </div>
            </div>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {loading ? (
                <div className="spinner-border" role="status" aria-label="Loading charges" />
            ) : (
                <div className="row">
                    {charges.map(charge => (
                        <div key={charge.id} className="col-12 col-sm-6 col-md-4">
                            <ChargeComponent charge={charge} onDelete={handleDelete} />
                        </div>
                    ))}
                    {charges.length === 0 && !error && (
                        <p className="text-body-secondary">No charges found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
