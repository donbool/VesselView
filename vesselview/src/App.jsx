import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import FleetOverview from './pages/FleetOverview';
import ShipDetails from './pages/ShipDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ship/:id" element={<ShipDetails />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/fleet-overview" element={<FleetOverview />} />
      </Routes>
    </Router>
  );
}

export default App;