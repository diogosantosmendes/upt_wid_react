import { Route, Routes } from 'react-router-dom'
import './App.css'
import StationsListPage from './pages/StationsListPage'
import StationDetailsPage from './pages/StationDetailsPage'
import Navbar from './components/common/Navbar'
import { useSession } from './hooks/useSession'
import LoginPage from './pages/LoginPage'
import ChargesListPage from './pages/ChargesListPage'
import ChargeDetailsPage from './pages/ChargeDetailsPage'

function App() {
  const { isAuthenticated } = useSession();

  if(!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-vh-100">
      <Navbar />
      <div className="container py-3">
        <Routes>
          <Route path="/" element={<StationsListPage />} />
          <Route path="/station/:id" element={<StationDetailsPage />} />
          <Route path="/charges" element={<ChargesListPage />} />
          <Route path="/charges/:id" element={<ChargeDetailsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
