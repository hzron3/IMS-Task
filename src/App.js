import './App.css';
import LandingPage from './LandingPage/LandingPage';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './Dashboards/AdminDashboard';
import ManagerDashboard from './Dashboards/ManagerDashboard';
import StaffDashboard from './Dashboards/StaffDashboard';
import GuestDashboard from './Dashboards/GuestDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route path="/admin-dashboard" element={<Navigate to="/admin-dashboard/overview" replace />} />
          <Route path="/admin-dashboard/:section" element={<AdminDashboard />} />
          <Route path="/manager-dashboard" element={<Navigate to="/manager-dashboard/category-overview" replace />} />
          <Route path="/manager-dashboard/:section" element={<ManagerDashboard />} />
          <Route path="/staff-dashboard" element={<Navigate to="/staff-dashboard/assigned-inventory" replace />} />
          <Route path="/staff-dashboard/:section" element={<StaffDashboard />} />
          <Route path="/guest-dashboard" element={<Navigate to="/guest-dashboard/overview" replace />} />
          <Route path="/guest-dashboard/:section" element={<GuestDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
