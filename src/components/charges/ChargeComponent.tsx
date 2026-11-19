import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import type { Charge } from "../../types/Charge";
import { ChargeService } from "../../services/ChargeService";

interface ChargeComponentProps {
    charge: Charge;
    onDelete: (id: string) => void;
}

function ChargeComponent({ charge, onDelete }: ChargeComponentProps) {
    const handleDelete = useCallback(async () => {
        try {
            await ChargeService.delete(charge.id);
            onDelete(charge.id);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred.";
            alert(`Failed to delete charge: ${message}`);
        }
    }, [charge.id, onDelete]);

    return (
        <article className="card my-2">
            <div className="card-body">
                <h2 className="card-title h5">Charge</h2>
                <dl className="row mb-0">
                    <dt className="col-sm-4">Timestamp</dt>
                    <dd className="col-sm-8">{new Date(charge.timestamp).toLocaleString()}</dd>
                    <dt className="col-sm-4">Duration</dt>
                    <dd className="col-sm-8">{charge.duration}</dd>
                    <dt className="col-sm-4">Energy</dt>
                    <dd className="col-sm-8">{charge.kWh} kWh</dd>
                    <dt className="col-sm-4">Cost</dt>
                    <dd className="col-sm-8">{charge.cost}</dd>
                    <dt className="col-sm-4">Station</dt>
                    <dd className="col-sm-8">
                        <Link to={`/station/${charge.stationId}`}>{charge.stationId}</Link>
                    </dd>
                </dl>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <Link to={`/charges/${charge.id}`} className="btn btn-sm btn-primary">
                    Details
                </Link>
                <button type="button" className="btn btn-sm btn-danger" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </article>
    );
}

export default memo(ChargeComponent);
