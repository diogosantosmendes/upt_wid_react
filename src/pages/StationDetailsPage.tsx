import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Station } from "../types/Station";
import StationComponent from "../components/stations/StationComponent";
import StationForm from "../components/stations/StationForm";
import { StationService } from "../services/StationService";

export default function StationDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [station, setStation] = useState<Station>();
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (!id) {
            navigate('/');
            return;
        }
        StationService.getById(id)
            .then(setStation)
            .catch(() => {
                alert("Failed to get station details.");
                navigate('/');
            })
            .finally(() => setLoading(false));
    }, [id]);

    const onDelete = useCallback(() => {
        navigate('/');
    }, [navigate]);

    if (loading || !station) {
        return <div className="spinner-border"></div>;
    }

    const onFormSuccess = (updatedStation: Station) => {
        setStation(updatedStation);
        setShowForm(false);
    }

    return (
        <div className="container">
            <Link to="/" className="btn btn-primary my-3">Back to Stations List</Link>
            <StationComponent
                station={station}
                onAvailabilityChange={setStation}
                onDelete={onDelete}
            />

            <div className="mt-3">
                {showForm ? (
                    <div className="card shadow-sm p-3">
                        <div className="card-body">
                            <h5 className="card-text">Update Station</h5>
                            <StationForm station={station} onSuccess={onFormSuccess} />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        Update Station
                    </button>
                )}
            </div>
        </div>
    );
}