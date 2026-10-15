import { useCallback, useState } from 'react'
import './App.css'
import jsonStations from './assets/stations.json';
import StationComponent, { type IStation } from './StationComponent';

function App() {
  const [stations, setStations] = useState<IStation[]>(jsonStations)

  const toggleAvailability = useCallback((id: string) => {
    setStations(prev => prev.map((station) => station.id === id ? { ...station, available: !station.available } : station));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {stations.map((station) => (
          <StationComponent
            key={station.id}
            id={station.id}
            location={station.location}
            available={station.available}
            toggleAvailability={toggleAvailability}
          />
        ))}
      </div>
    </div>
  )
}

export default App
