import { Route, Routes } from 'react-router-dom'
import './App.css'
import StationsListPage from './pages/StationsListPage'
import StationDetailsPage from './pages/StationDetailsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<StationsListPage />} />
      <Route path="/station/:id" element={<StationDetailsPage />} />
    </Routes>
  )
}

export default App
