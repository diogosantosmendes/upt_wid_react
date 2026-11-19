import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChargeComponent from "../components/charges/ChargeComponent";
import ChargeForm from "../components/charges/ChargeForm";
import { ChargeService } from "../services/ChargeService";
import type { Charge } from "../types/Charge";

export default function ChargeDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [charge, setCharge] = useState<Charge>();
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState<{ id: string; message: string } | null>(null);

    useEffect(() => {
        let isActive = true;

        if (!id) {
            return () => {
                isActive = false;
            };
        }

        ChargeService.getById(id)
            .then(result => {
                if (isActive) {
                    setCharge(result);
                }
            })
            .catch((cause: unknown) => {
                if (isActive) {
                    setError({
                        id,
                        message: cause instanceof Error ? cause.message : "Failed to get charge details.",
                    });
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
    }, [id]);

    const handleDelete = useCallback(() => {
        navigate("/charges");
    }, [navigate]);

    const handleUpdate = useCallback((updatedCharge: Charge) => {
        setCharge(updatedCharge);
        setShowForm(false);
    }, []);

    const currentError = id && error?.id === id ? error.message : null;

    if (!id) {
        return (
            <div className="container">
                <div className="alert alert-danger" role="alert">Charge ID is missing.</div>
                <Link to="/charges" className="btn btn-primary">Back to Charges</Link>
            </div>
        );
    }

    if (loading || (!currentError && charge?.id !== id)) {
        return <div className="spinner-border" role="status" aria-label="Loading charge" />;
    }

    return (
        <div className="container">
            <Link to="/charges" className="btn btn-primary my-3">Back to Charges</Link>
            {currentError && <div className="alert alert-danger" role="alert">{currentError}</div>}
            {charge?.id === id && (
                <>
                    <ChargeComponent charge={charge} onDelete={handleDelete} />
                    <div className="mt-3">
                        {showForm ? (
                            <div className="card shadow-sm p-3">
                                <div className="card-body">
                                    <h2 className="h5 card-title">Update Charge</h2>
                                    <ChargeForm charge={charge} onSuccess={handleUpdate} />
                                </div>
                                <div className="card-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShowForm(true)}
                            >
                                Update Charge
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
