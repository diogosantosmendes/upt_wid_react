import { useCallback, useEffect, useState } from 'react'
import StationComponent from '../components/stations/StationComponent';
import type { Station } from '../types/Station';
import { StationService } from '../services/StationService';
import StationForm from '../components/stations/StationForm';

function StationsListPage() {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        StationService.getPage()
            .then(res => setStations(res.data))
            .catch(() => {
                alert("Failed to get stations list.");
            })
            .finally(() => setLoading(false));
    }, []);

    const toggleAvailability = useCallback((station: Station) => {
        setStations(prev => prev.map((s) => station.id === s.id ? station : s));
    }, []);

    const handleDelete = useCallback((id: string) => {
        setStations(prev => prev.filter(s => s.id !== id));
    }, []);

    const onStationCreate = useCallback((newStation: Station) => {
        setStations(prev => [newStation, ...prev]);
    }, []);

    if (loading) {
        return <div className="spinner-border"></div>;
    }

    return (
        <div className="container">
            <div className="card shadow-sm p-3">
                <div className="card-body">
                    <h5 className="card-text">Update Station</h5>
                    <StationForm onSuccess={onStationCreate} />
                </div>
            </div>
            <div className="row">
                {stations.map((station) => (
                    <div key={station.id} className="col-12 col-sm-6 col-md-4">
                        <StationComponent
                            station={station}
                            onAvailabilityChange={toggleAvailability}
                            onDelete={handleDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StationsListPage
