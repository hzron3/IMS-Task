import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Switch, FormControlLabel, TextField, Avatar, Chip, Divider, Alert, Snackbar } from '@mui/material';
import { Person, Notifications, Work, Security, Help, Save, Restore, Visibility, VisibilityOff, Email, Phone, LocationOn } from '@mui/icons-material';

// Mock user data
const mockUser = {
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@inventorypro.com",
  phone: "+254 700 987 654",
  department: "Warehouse Operations",
  position: "Warehouse Staff",
  lastLogin: "2024-06-19 08:30 AM",
  accountStatus: "Active",
  profilePicture: null
};

export default function StaffSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile Settings
  const [profile, setProfile] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
    phone: mockUser.phone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    lowStockAlerts: true,
    restockReminders: true,
    stockMovement: true,
    newTasks: true,
    taskReminders: true,
    taskCompletion: false,
    managerMessages: true,
    systemAnnouncements: true,
    inAppNotifications: true,
    emailNotifications: true,
    pushNotifications: false
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    theme: 'light',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24',
    defaultNotes: 'Stock update',
    autoSave: true,
    confirmDialogs: true,
    taskView: 'list',
    taskSorting: 'dueDate',
    autoRefresh: 5
  });



  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (setting) => {
    setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };



  const handleSave = () => {
    setSnackbar({ open: true, message: 'Settings saved successfully!', severity: 'success' });
  };

  const handleRestoreDefaults = () => {
    setSnackbar({ open: true, message: 'Settings restored to defaults!', severity: 'info' });
  };

  const handlePasswordChange = () => {
    if (profile.newPassword !== profile.confirmPassword) {
      setSnackbar({ open: true, message: 'Passwords do not match!', severity: 'error' });
      return;
    }
    if (profile.newPassword.length < 8) {
      setSnackbar({ open: true, message: 'Password must be at least 8 characters!', severity: 'error' });
      return;
    }
    setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
    setProfile(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Account', icon: <Person /> },
    { id: 'notifications', label: 'Notifications', icon: <Notifications /> },
    { id: 'preferences', label: 'Preferences', icon: <Work /> },
    { id: 'help', label: 'Help & Support', icon: <Help /> }
  ];

  const renderProfileTab = () => (
    <div className="row">
      <div className="col-lg-8">
        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Personal Information
            </Typography>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="First Name"
                  value={profile.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Email Address"
                  value={profile.email}
                  disabled
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  helperText="Contact your manager to change email"
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Department"
                  value={mockUser.department}
                  disabled
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Position"
                  value={mockUser.position}
                  disabled
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Change Password
            </Typography>
            <div className="row">
              <div className="col-md-12 mb-3">
                <TextField
                  fullWidth
                  label="Current Password"
                  type={showPassword ? 'text' : 'password'}
                  value={profile.currentPassword}
                  onChange={(e) => handleProfileChange('currentPassword', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="New Password"
                  type={showPassword ? 'text' : 'password'}
                  value={profile.newPassword}
                  onChange={(e) => handleProfileChange('newPassword', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showPassword ? 'text' : 'password'}
                  value={profile.confirmPassword}
                  onChange={(e) => handleProfileChange('confirmPassword', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </div>
            </div>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                onClick={handlePasswordChange}
                sx={{ 
                  background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
                  '&:hover': { background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)' }
                }}
              >
                Change Password
              </Button>
              <FormControlLabel
                control={
                  <Switch
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Password"
              />
            </Box>
          </CardContent>
        </Card>
      </div>

      <div className="col-lg-4">
        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Profile Picture
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  bgcolor: '#1ABC9C',
                  mb: 2,
                  boxShadow: '0 4px 12px rgba(26, 188, 156, 0.3)'
                }}
              >
                {profile.firstName[0]}{profile.lastName[0]}
              </Avatar>
              <Button
                variant="outlined"
                component="label"
                sx={{ borderColor: '#1ABC9C', color: '#1ABC9C', '&:hover': { borderColor: '#27ae60', color: '#27ae60' } }}
              >
                Upload Photo
                <input type="file" hidden accept="image/*" />
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Account Status
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">Last Login:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{mockUser.lastLogin}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">Status:</Typography>
                <Chip label={mockUser.accountStatus} color="success" size="small" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="row">
      <div className="col-lg-8">
        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Stock Alerts
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.lowStockAlerts}
                    onChange={() => handleNotificationChange('lowStockAlerts')}
                    color="primary"
                  />
                }
                label="Low stock alerts for assigned items"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.restockReminders}
                    onChange={() => handleNotificationChange('restockReminders')}
                    color="primary"
                  />
                }
                label="Restock reminders"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.stockMovement}
                    onChange={() => handleNotificationChange('stockMovement')}
                    color="primary"
                  />
                }
                label="Stock movement notifications"
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Task Notifications
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.newTasks}
                    onChange={() => handleNotificationChange('newTasks')}
                    color="primary"
                  />
                }
                label="New task assignments"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.taskReminders}
                    onChange={() => handleNotificationChange('taskReminders')}
                    color="primary"
                  />
                }
                label="Task due date reminders"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.taskCompletion}
                    onChange={() => handleNotificationChange('taskCompletion')}
                    color="primary"
                  />
                }
                label="Task completion confirmations"
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Communication
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.managerMessages}
                    onChange={() => handleNotificationChange('managerMessages')}
                    color="primary"
                  />
                }
                label="Manager messages and updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.systemAnnouncements}
                    onChange={() => handleNotificationChange('systemAnnouncements')}
                    color="primary"
                  />
                }
                label="System announcements"
              />
            </Box>
          </CardContent>
        </Card>
      </div>

      <div className="col-lg-4">
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Delivery Methods
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.inAppNotifications}
                    onChange={() => handleNotificationChange('inAppNotifications')}
                    color="primary"
                  />
                }
                label="In-app notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.emailNotifications}
                    onChange={() => handleNotificationChange('emailNotifications')}
                    color="primary"
                  />
                }
                label="Email notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.pushNotifications}
                    onChange={() => handleNotificationChange('pushNotifications')}
                    color="primary"
                  />
                }
                label="Push notifications"
              />
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="row">
      <div className="col-lg-8">
        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Display Settings
            </Typography>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  select
                  fullWidth
                  label="Theme"
                  value={preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="auto">Auto</option>
                </TextField>
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  select
                  fullWidth
                  label="Date Format"
                  value={preferences.dateFormat}
                  onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </TextField>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  select
                  fullWidth
                  label="Time Format"
                  value={preferences.timeFormat}
                  onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  <option value="12">12 Hour</option>
                  <option value="24">24 Hour</option>
                </TextField>
              </div>

            </div>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Stock Update Preferences
            </Typography>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  fullWidth
                  label="Default Notes"
                  value={preferences.defaultNotes}
                  onChange={(e) => handlePreferenceChange('defaultNotes', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  select
                  fullWidth
                  label="Auto-refresh Interval"
                  value={preferences.autoRefresh}
                  onChange={(e) => handlePreferenceChange('autoRefresh', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  <option value={1}>1 minute</option>
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={30}>30 minutes</option>
                </TextField>
              </div>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.autoSave}
                    onChange={(e) => handlePreferenceChange('autoSave', e.target.checked)}
                    color="primary"
                  />
                }
                label="Auto-save draft updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.confirmDialogs}
                    onChange={(e) => handlePreferenceChange('confirmDialogs', e.target.checked)}
                    color="primary"
                  />
                }
                label="Confirmation dialogs for bulk actions"
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Task Management
            </Typography>
            <div className="row">
              <div className="col-md-6 mb-3">
                <TextField
                  select
                  fullWidth
                  label="Task View"
                  value={preferences.taskView}
                  onChange={(e) => handlePreferenceChange('taskView', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  <option value="list">List View</option>
                  <option value="grid">Grid View</option>
                  <option value="calendar">Calendar View</option>
                </TextField>
              </div>
              <div className="col-md-6 mb-3">
                <TextField
                  select
                  fullWidth
                  label="Task Sorting"
                  value={preferences.taskSorting}
                  onChange={(e) => handlePreferenceChange('taskSorting', e.target.value)}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                  <option value="assignedDate">Assigned Date</option>
                </TextField>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  );



  const renderHelpTab = () => (
    <div className="row">
      <div className="col-lg-8">
        <Card sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Documentation
            </Typography>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Card sx={{ borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.2)', cursor: 'pointer', '&:hover': { boxShadow: 2 } }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1ABC9C', mb: 1 }}>
                      User Manual
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Complete guide to using InventoryPro
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div className="col-md-6 mb-3">
                <Card sx={{ borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.2)', cursor: 'pointer', '&:hover': { boxShadow: 2 } }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1ABC9C', mb: 1 }}>
                      FAQ
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Frequently asked questions
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>

          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Support
            </Typography>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Email />}
                  sx={{ borderColor: '#1ABC9C', color: '#1ABC9C', '&:hover': { borderColor: '#27ae60', color: '#27ae60' } }}
                >
                  Contact Manager
                </Button>
              </div>
              <div className="col-md-6 mb-3">
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Help />}
                  sx={{ borderColor: '#2C3E50', color: '#2C3E50', '&:hover': { borderColor: '#34495e', color: '#34495e' } }}
                >
                  Report Issue
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Phone />}
                  sx={{ borderColor: '#27ae60', color: '#27ae60', '&:hover': { borderColor: '#1ABC9C', color: '#1ABC9C' } }}
                >
                  IT Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-lg-4">
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
              Quick Help
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="text"
                fullWidth
                sx={{ justifyContent: 'flex-start', color: '#1ABC9C' }}
              >
                How to update stock levels
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ justifyContent: 'flex-start', color: '#1ABC9C' }}
              >
                How to mark tasks as complete
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ justifyContent: 'flex-start', color: '#1ABC9C' }}
              >
                How to request extensions
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ justifyContent: 'flex-start', color: '#1ABC9C' }}
              >
                How to view assigned items
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'preferences':
        return renderPreferencesTab();
      case 'help':
        return renderHelpTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>
          Settings & Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings, notifications, and preferences
        </Typography>
      </Box>

      {/* Tab Navigation */}
      <Card sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', borderBottom: '1px solid rgba(26, 188, 156, 0.1)' }}>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                sx={{
                  flex: 1,
                  py: 2,
                  px: 3,
                  borderRadius: 0,
                  color: activeTab === tab.id ? '#1ABC9C' : '#7f8c8d',
                  borderBottom: activeTab === tab.id ? '2px solid #1ABC9C' : 'none',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  '&:hover': {
                    background: 'rgba(26, 188, 156, 0.05)',
                    color: '#1ABC9C'
                  }
                }}
                startIcon={tab.icon}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Content */}
      {renderContent()}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={handleRestoreDefaults}
          sx={{ borderColor: '#7f8c8d', color: '#7f8c8d', '&:hover': { borderColor: '#95a5a6', color: '#95a5a6' } }}
        >
          Restore Defaults
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          startIcon={<Save />}
          sx={{ 
            background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)' }
          }}
        >
          Save Changes
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
} 