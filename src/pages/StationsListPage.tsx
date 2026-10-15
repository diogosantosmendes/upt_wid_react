import { useCallback, useState } from 'react'
import jsonStations from '../assets/stations.json';
import StationComponent from '../components/stations/StationComponent';
import type { Station } from '../types/Station';

function StationsListPage() {
    const [stations, setStations] = useState<Station[]>(jsonStations)

    const toggleAvailability = useCallback((id: string) => {
        setStations(prev => prev.map((station) => station.id === id ? { ...station, available: !station.available } : station));
    }, []);

    return (
        <div className="container">
            <div className="row">
                {stations.map((station) => (
                    <div key={station.id} className="col-12 col-sm-6 col-md-4 col-xl-3">
                        <StationComponent
                            id={station.id}
                            location={station.location}
                            available={station.available}
                            toggleAvailability={toggleAvailability}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StationsListPage
