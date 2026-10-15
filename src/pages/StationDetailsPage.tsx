import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Station } from "../types/Station";
import jsonStations from '../assets/stations.json';
import StationComponent from "../components/stations/StationComponent";

export default function StationDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [station, setStation] = useState<Station>();

    useEffect(() => {
        const foundStation = jsonStations.find((s) => s.id === id);
        setStation(foundStation);
    }, [id]);

    if (!station) {
        return <div className="alert alert-danger" role="alert">
            <h1>Station not found</h1>
            <Link to="/" className="btn btn-primary">Back to Stations List</Link>
        </div>
    }

    return (
        <div className="container">
            <Link to="/" className="btn btn-primary my-3">Back to Stations List</Link>
            <StationComponent
                available={station.available}
                id={station.id}
                location={station.location}
                toggleAvailability={() => setStation(prev => ({ ...prev!, available: !prev!.available }))}
            />
        </div>
    );
}