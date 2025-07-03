import React, { useState } from "react";
import { 
  Box, 
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { 
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Restore as RestoreIcon
} from "@mui/icons-material";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [settings, setSettings] = useState({
    // User Profile Settings
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: "IT",
    position: "System Administrator",
    
    // Security Settings
    twoFactorAuth: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    loginNotifications: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    weeklyReports: true,
    systemAlerts: true,
    
    // Appearance Settings
    theme: "light",
    timezone: "EAT",
    dateFormat: "MM/DD/YYYY",
    currency: "Ksh",
    
    // System Settings
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: 365,
    performanceMode: false
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSaveConfirm, setOpenSaveConfirm] = useState(false);
  const [openRestoreConfirm, setOpenRestoreConfirm] = useState(false);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    setOpenSaveConfirm(true);
  };

  const handleRestoreDefaults = () => {
    setOpenRestoreConfirm(true);
  };

  const handleConfirmSave = () => {
    setOpenSaveConfirm(false);
    setSnackbarMessage("Settings saved successfully!");
    setOpenSnackbar(true);
  };

  const handleConfirmRestore = () => {
    setOpenRestoreConfirm(false);
    setSnackbarMessage("Settings restored to defaults!");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const navigationItems = [
    { id: 'appearance', label: 'Appearance', icon: <PaletteIcon /> },
    { id: 'notifications', label: 'Notification Preferences', icon: <NotificationsIcon /> },
    { id: 'security', label: 'Security', icon: <SecurityIcon /> },
    { id: 'system', label: 'System Settings', icon: <StorageIcon /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <div className="settings-content">
            <h3>Appearance Settings</h3>
            <p>Customize the look and feel of your dashboard</p>
            
            <div className="settings-form-group">
              <label>Theme</label>
              <select
                className="settings-select"
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            
            <div className="settings-form-group">
              <label>Timezone</label>
              <select
                className="settings-select"
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
              >
                <option value="EAT">East Africa Time (EAT)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC+0">UTC</option>
              </select>
            </div>
            
            <div className="settings-form-group">
              <label>Currency</label>
              <select
                className="settings-select"
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
              >
                <option value="Ksh">Kenyan Shilling (Ksh)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
              </select>
            </div>
            
            <div className="settings-form-group">
              <label>Date Format</label>
              <select
                className="settings-select"
                value={settings.dateFormat}
                onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-content">
            <h3>Notification Preferences</h3>
            <p>Manage how you receive notifications and alerts</p>
            
            <div className="settings-notifications-section">
              <div className="settings-switch">
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                  labelPlacement="start"
                />
              </div>
              
              <div className="settings-switch">
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Push Notifications"
                  labelPlacement="start"
                />
              </div>
              
              <div className="settings-switch">
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.smsNotifications}
                      onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="SMS Notifications"
                  labelPlacement="start"
                />
              </div>
              
              <div className="settings-switch">
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.lowStockAlerts}
                      onChange={(e) => handleSettingChange('lowStockAlerts', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Low Stock Alerts"
                  labelPlacement="start"
                />
              </div>
              
              <div className="settings-switch">
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.expiringItemsAlerts}
                      onChange={(e) => handleSettingChange('expiringItemsAlerts', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Expiring Items Alerts"
                  labelPlacement="start"
                />
              </div>
              
              <div className="settings-switch">
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.stockMovementAlerts}
                      onChange={(e) => handleSettingChange('stockMovementAlerts', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Stock Movement Notifications"
                  labelPlacement="start"
                />
              </div>
              
              <div className="settings-switch">
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.weeklyReports}
                      onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Weekly Reports"
                  labelPlacement="start"
                />
              </div>
              
              <div className="settings-switch">
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.systemAlerts}
                      onChange={(e) => handleSettingChange('systemAlerts', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="System Alerts"
                  labelPlacement="start"
                />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-content">
            <h3>Security Settings</h3>
            <p>Configure your account security and privacy settings</p>
            
            <div className="settings-switch">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                    color="primary"
                  />
                }
                label="Two-Factor Authentication"
                labelPlacement="start"
              />
            </div>
            
            <div className="settings-switch">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.loginNotifications}
                    onChange={(e) => handleSettingChange('loginNotifications', e.target.checked)}
                    color="primary"
                  />
                }
                label="Login Notifications"
                labelPlacement="start"
              />
            </div>
            
            <div className="settings-form-group">
              <label>Password Expiry</label>
              <select
                className="settings-select"
                value={settings.passwordExpiry}
                onChange={(e) => handleSettingChange('passwordExpiry', parseInt(e.target.value))}
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
            
            <div className="settings-form-group">
              <label>Session Timeout</label>
              <select
                className="settings-select"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              > 
                <option value="never">Never</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="240">4 hours</option>
              </select>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="settings-content">
            <h3>System Settings</h3>
            <p>Manage system preferences and backup options</p>
            
            <div className="settings-switch">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoBackup}
                    onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                    color="primary"
                  />
                }
                label="Auto Backup"
                labelPlacement="start"
              />
            </div>
            
            <div className="settings-form-group">
              <label>Backup Frequency</label>
              <select
                className="settings-select"
                value={settings.backupFrequency}
                onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div className="settings-form-group">
              <label>Data Retention</label>
              <select
                className="settings-select"
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
                <option value="730">2 years</option>
                <option value="1095">3 years</option>
              </select>
            </div>
            
            <div className="settings-form-group">
              <label>Storage Usage</label>
              <div className="storage-progress-container">
                <div className="storage-info">
                  <span>2.4 GB used of 10 GB</span>
                  <span>24%</span>
                </div>
                <div className="storage-progress-bar">
                  <div className="storage-progress-fill" style={{width: '24%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="settings-backup-actions">
              <button className="backup-btn">
                Backup
              </button>
              <button className="restore-backup-btn">
                Restore from Backup
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-layout">
        {/* Navigation Card */}
        <div className="settings-nav-card">
          <div className="settings-nav-header">
            <h4>Settings Categories</h4>
          </div>
          <div className="settings-nav-list">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`settings-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="settings-content-card">
          {renderContent()}
          <div className="settings-save-section">
            <button 
              className="save-button"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button 
              className="restore-button"
              onClick={handleRestoreDefaults}
            >
              Restore Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className="settings-snackbar"
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Save Confirmation Modal */}
      <Dialog open={openSaveConfirm} onClose={() => setOpenSaveConfirm(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 32 }} />
          Confirm Save
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save these settings? This will overwrite your current settings.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSaveConfirm(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmSave} variant="contained" color="success">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Restore Defaults Confirmation Modal */}
      <Dialog open={openRestoreConfirm} onClose={() => setOpenRestoreConfirm(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon sx={{ color: '#e67e22', fontSize: 32 }} />
          Confirm Restore Defaults
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to restore default settings? Your current settings will be lost. This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRestoreConfirm(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmRestore} variant="contained" color="warning">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings; 