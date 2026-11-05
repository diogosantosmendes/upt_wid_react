import { memo, useCallback } from "react";
import { StationStatus, type Station } from "../../types/Station";
import { Link } from "react-router-dom";
import { StationService } from "../../services/StationService";

interface StationComponentProps {
    station: Station;
    onAvailabilityChange: (station: Station) => void;
    onDelete: (id: string) => void;
}

function StationComponent({ station, onAvailabilityChange, onDelete }: StationComponentProps) {

    const toggleAvailability = useCallback(async () => {
        try {
            const newStatus = station.status === StationStatus.Available ? StationStatus.Charging : StationStatus.Available;
            
            const updated = await StationService.update(station.id, { ...station, status: newStatus });
            
            onAvailabilityChange(updated);
        } catch (error: any) {
            alert("Failed to change availability: " + error.message);
        }
    }, [station]);

    const handleDelete = useCallback(async () => {
        try {
            await StationService.delete(station.id);
            onDelete(station.id);
        } catch (error: any) {
            alert("Failed to delete station: " + error.message);
        }
    }, [station, onDelete]);

    return <div className="card my-2">
        <div className="card-body">
            <h5 className="card-title">{station.location}</h5>
            <p className="card-text">{station.id}</p>
            <button 
                className={`btn btn-sm btn-block btn-outline-${station.status === StationStatus.Available ? "success" : "secondary"}`}
                onClick={toggleAvailability}
             >
                {station.status == StationStatus.Available ? "Available" : "Unavailable"}
            </button>
        </div>
        <div className="card-footer d-flex justify-content-between">
            { !location.pathname.includes(`/station/${station.id}`) &&
                <Link to={`/station/${station.id}`} className="btn btn-sm btn-primary ms-2">Details</Link>
            }
            <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
        </div>
    </div>
}

export default memo(StationComponent);