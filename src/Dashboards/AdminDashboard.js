import React, { useState, useEffect } from 'react';
import { Box, Typography, Toolbar, AppBar, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useParams, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Overview from './Overview';
import UserManagement from './UserManagement';
import InventoryManagement from './InventoryManagement';
import Analytics from './Analytics';
import Settings from './Settings';

const MIN_DRAWER_WIDTH = 60;
const MAX_DRAWER_WIDTH = 260;

const sections = [
  { label: 'Overview', icon: <DashboardIcon />, path: 'overview' },
  { label: 'Inventory Management', icon: <InventoryIcon />, path: 'inventory-management' },
  { label: 'User & Role Management', icon: <PeopleIcon />, path: 'user-management' },
  { label: 'Analytics & Reports', icon: <BarChartIcon />, path: 'analytics' },
  { label: 'System Settings', icon: <SettingsIcon />, path: 'settings' },
];

const sectionContent = [
  'Overview Section (Inventory Value, Total Items, Low Stock Alerts, Activity Feed)',
  'Inventory Management Section (CRUD Items, Bulk Import/Export, Category Management)',
  'User & Role Management Section (User List, Add/Edit/Remove Users, Role Assignment, Access Logs)',
  'Analytics & Reports Section (Top Moving Items, Dead Stock, Category Distribution)',
  'System Settings Section (History, Notification Settings)',
];

// Dashboard Navbar
function DashboardNavbar({ user, role, onSettings }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleProfileOpen = () => {
    setProfileOpen(true);
    handleClose();
  };
  const handleProfileClose = () => setProfileOpen(false);
  const handleSettings = () => {
    if (onSettings) onSettings();
    handleClose();
  };
  const handleLogout = () => {
    handleClose();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(120deg, #2C3E50 0%, #0e6352 100%)',
          color: '#ECF0F1',
          boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
          fontFamily: 'Poppins, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        }}
        elevation={0}
      >
        <Toolbar sx={{ minHeight: '64px', px: { xs: 2, sm: 5 } }}>
          {/* App Name as Logo*/}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.7rem',
                letterSpacing: 1,
                color: '#ECF0F1',
                fontFamily: 'Poppins, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
              }}
            >
              InventoryPro
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {/* User Info and Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body1"
              sx={{ mr: 1, fontWeight: 500, color: '#ECF0F1', fontFamily: 'Poppins, Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}
            >
              {role}
            </Typography>
            <IconButton color="inherit" edge="end" onClick={handleMenu}>
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Profile Popup Window */}
      <Dialog open={profileOpen} onClose={handleProfileClose}>
        <DialogTitle>User Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Name:</strong> {user.name}<br />
            <strong>Email:</strong> {user.email}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

const AdminDashboard = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock user info for now
  const user = { name: 'Jane Doe', email: 'admin@inventorypro.com' };
  const role = 'Admin';

  // Find the selected index based on the URL section
  const getSelectedIndex = () => {
    const index = sections.findIndex(s => s.path === section);
    return index >= 0 ? index : 0;
  };

  const selectedIndex = getSelectedIndex();

  const handleSectionSelect = (index) => {
    const newSection = sections[index].path;
    navigate(`/admin-dashboard/${newSection}`);
  };

  const handleSettings = () => {
    navigate('/admin-dashboard/settings');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f6fefb' }}>
      <DashboardNavbar user={user} role={role} onSettings={handleSettings} />
      <Sidebar
        sections={sections}
        selectedIndex={selectedIndex}
        onSectionSelect={handleSectionSelect}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}
      >
        <Toolbar />
        <Box sx={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {selectedIndex === 0 ? (
            <Overview />
          ) : selectedIndex === 1 ? (
            <InventoryManagement />
          ) : selectedIndex === 2 ? (
            <UserManagement />
          ) : selectedIndex === 3 ? (
            <Analytics />
          ) : selectedIndex === 4 ? (
            <Settings />
          ) : (
            <Box sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Admin Dashboard
              </Typography>
              <Typography variant="h6" component="h2" sx={{ mt: 2, textAlign: 'center' }}>
                {sectionContent[selectedIndex]}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 