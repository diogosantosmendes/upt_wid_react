import { memo } from "react";

export interface IStation {
    id: string;
    location: string;
    available: boolean;
}

interface IStationComponentProps extends IStation {
    toggleAvailability: (id: string) => void;
}

function StationComponent(props: IStationComponentProps) {
    console.log(props.id);

    return <div className="col-12 col-sm-6 col-md-4 col-xl-3">
        <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">{props.id}</h5>
                <p className="card-text">{props.location}</p>
            </div>
            <div className="card-footer">
                <button className="btn btn-secondary" onClick={()=>props.toggleAvailability(props.id)}>
                    {props.available ? "Available" : "Unavailable"}
                </button>
            </div>
        </div>
    </div>
}

export default memo(StationComponent);