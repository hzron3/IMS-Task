import './App.css';
import LandingPage from './LandingPage/LandingPage';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './Dashboards/AdminDashboard';
import ManagerDashboard from './Dashboards/ManagerDashboard';
import StaffDashboard from './Dashboards/StaffDashboard';
import GuestDashboard from './Dashboards/GuestDashboard';
import Unauthorized from './Unauthorized';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Navigate to="/admin-dashboard/overview" replace />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard/:section" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/manager-dashboard" element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <Navigate to="/manager-dashboard/category-overview" replace />
              </ProtectedRoute>
            } />
            <Route path="/manager-dashboard/:section" element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/staff-dashboard" element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'staff']}>
                <Navigate to="/staff-dashboard/assigned-inventory" replace />
              </ProtectedRoute>
            } />
            <Route path="/staff-dashboard/:section" element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'staff']}>
                <StaffDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/guest-dashboard" element={
              <ProtectedRoute allowedRoles={['guest']}>
                <Navigate to="/guest-dashboard/overview" replace />
              </ProtectedRoute>
            } />
            <Route path="/guest-dashboard/:section" element={
              <ProtectedRoute allowedRoles={['guest']}>
                <GuestDashboard />
              </ProtectedRoute>
            } />
            
            {/* error 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
