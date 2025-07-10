import React, { useState } from 'react';
import { Box, Typography, Toolbar, AppBar, IconButton, Avatar, Button, DialogActions } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
import StaffAssignedInventory from './StaffAssignedInventory';
import StaffStockUpdates from './StaffStockUpdates';
import StaffTasksActivity from './StaffTasksActivity';
import StaffSettings from './StaffSettings';

const MIN_DRAWER_WIDTH = 60;
const MAX_DRAWER_WIDTH = 260;

const sections = [
  { label: 'Assigned Inventory', icon: <DashboardIcon />, path: 'assigned-inventory' },
  { label: 'Stock Updates', icon: <InventoryIcon />, path: 'stock-updates' },
  { label: 'Tasks & Activity', icon: <AssignmentIcon />, path: 'tasks-activity' },
  { label: 'Settings & Notifications', icon: <SettingsIcon />, path: 'settings' },
];

const sectionContent = [
  'Assigned Inventory Section (List of assigned items, current stock levels, item details)',
  'Stock Updates Section (Record stock received/issued, quick actions, notes for changes)',
  'Tasks & Activity Section (Daily/weekly tasks, status tracker, task completion, activity feed, mini charts, items updated this week, stock change activity)',
  'Settings & Notifications Section (Low stock alerts, restock reminders, recent updates feed, personal settings)',
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
          {/* Logo as App Name */}
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
      <Dialog 
        open={profileOpen} 
        onClose={handleProfileClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(44, 62, 80, 0.12)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(26, 188, 156, 0.1)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
            color: 'white',
            borderRadius: '12px 12px 0 0',
            py: 3,
            px: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AccountCircle sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            User Profile
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                fontSize: '2rem', 
                bgcolor: '#1ABC9C',
                mb: 2,
                boxShadow: '0 4px 12px rgba(26, 188, 156, 0.3)'
              }}
            >
              {user.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d', mb: 2 }}>
              {role}
            </Typography>
          </Box>
          
          <Box sx={{ 
            p: 3, 
            background: 'rgba(26, 188, 156, 0.05)', 
            borderRadius: 2, 
            border: '1px solid rgba(26, 188, 156, 0.1)'
          }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#2C3E50', fontWeight: 'bold' }}>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: '50%', 
                  background: '#1ABC9C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AccountCircle sx={{ color: 'white', fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.8rem' }}>
                    Full Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2C3E50' }}>
                    {user.name}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: '50%', 
                  background: '#27ae60',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AccountCircle sx={{ color: 'white', fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.8rem' }}>
                    Email Address
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2C3E50' }}>
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: '50%', 
                  background: '#2C3E50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AccountCircle sx={{ color: 'white', fontSize: 16 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.8rem' }}>
                    Role
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#2C3E50' }}>
                    {role}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 4, 
          background: '#f8f9fa',
          borderRadius: '0 0 12px 12px',
          borderTop: '1px solid rgba(26, 188, 156, 0.1)'
        }}>
          <Button 
            onClick={handleProfileClose}
            variant="contained"
            sx={{ 
              background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
              color: 'white',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(26, 188, 156, 0.3)',
              '&:hover': { 
                background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)',
                boxShadow: '0 6px 16px rgba(26, 188, 156, 0.4)'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const StaffDashboard = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock user info for now
  const user = { name: 'Mike Johnson', email: 'staff@inventorypro.com' };
  const role = 'Warehouse Staff';

  // Find the selected index based on the URL section
  const getSelectedIndex = () => {
    const index = sections.findIndex(s => s.path === section);
    return index >= 0 ? index : 0;
  };

  const selectedIndex = getSelectedIndex();

  const handleSectionSelect = (index) => {
    const newSection = sections[index].path;
    navigate(`/staff-dashboard/${newSection}`);
  };

  const handleSettings = () => {
    navigate('/staff-dashboard/settings');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f6fefb' }}>
      {/* Top Navbar */}
      <DashboardNavbar user={user} role={role} onSettings={handleSettings} />
      {/* Sidebar */}
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
            <StaffAssignedInventory />
          ) : selectedIndex === 1 ? (
            <StaffStockUpdates />
          ) : selectedIndex === 2 ? (
            <StaffTasksActivity />
          ) : selectedIndex === 3 ? (
            <StaffSettings />
          ) : (
            <Box sx={{ width: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Staff Dashboard
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

export default StaffDashboard; 