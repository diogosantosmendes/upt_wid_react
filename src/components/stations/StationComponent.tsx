import { memo } from "react";
import type { Station } from "../../types/Station";
import { Link } from "react-router-dom";

interface StationComponentProps extends Station {
    toggleAvailability: (id: string) => void;
}

function StationComponent(props: StationComponentProps) {

    return <div className="card my-2">
        <div className="card-body">
            <h5 className="card-title">{props.id}</h5>
            <p className="card-text">{props.location}</p>
        </div>
        <div className="card-footer">
            <button className="btn btn-secondary" onClick={() => props.toggleAvailability(props.id)}>
                {props.available ? "Available" : "Unavailable"}
            </button>
            { location.pathname !== `/station/${props.id}` &&
                <Link to={`/station/${props.id}`} className="btn btn-primary ms-2">Details</Link>
            }
        </div>
    </div>
}

export default memo(StationComponent);