import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  // Mock user role
  const userRole = "Manager"; // Can be "Admin", "Manager", "Staff", "Guest"
  
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@inventorypro.com",
    phone: "+254 700 123 456",
    department: "Warehouse Management",
    profilePicture: null,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    lowStockAlerts: true,
    taskAssignments: true,
    weeklyReports: true,
    systemUpdates: true,
    realTimeUpdates: false,
    urgentAlerts: true,
    
    // Preferences
    theme: "light",
    timezone: "EAT",
    dateFormat: "DD/MM/YYYY",
    currency: "Ksh",
    exportFormat: "PDF",
    weeklyReports: true
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

  // Role-based navigation items
  const getNavigationItems = () => {
    switch (userRole) {
      case "Manager":
        return [
          { id: 'profile', label: 'Profile & Account', icon: 'fas fa-user' },
          { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
          { id: 'preferences', label: 'Preferences', icon: 'fas fa-cog' }
        ];
      case "Admin":
        return [
          { id: 'appearance', label: 'Appearance', icon: 'fas fa-palette' },
          { id: 'notifications', label: 'Notification Preferences', icon: 'fas fa-bell' },
          { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
          { id: 'system', label: 'System Settings', icon: 'fas fa-cog' }
        ];
      default:
        return [
          { id: 'profile', label: 'Profile & Account', icon: 'fas fa-user' },
          { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
          { id: 'preferences', label: 'Preferences', icon: 'fas fa-cog' }
        ];
    }
  };

  const navigationItems = getNavigationItems();

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-content">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.firstName}
                    onChange={(e) => handleSettingChange('firstName', e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.lastName}
                    onChange={(e) => handleSettingChange('lastName', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={settings.department}
                    onChange={(e) => handleSettingChange('department', e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => handleSettingChange('profilePicture', e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Last Login</label>
                  <input
                    type="text"
                    className="form-control"
                    value="2024-01-15 09:30 AM"
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Account Status</label>
                  <input
                    type="text"
                    className="form-control"
                    value="Active"
                    disabled
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-key me-2"></i>
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-content">
            <div className="settings-section">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="emailNotifications">
                  Email Notifications
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="lowStockAlerts"
                  checked={settings.lowStockAlerts}
                  onChange={(e) => handleSettingChange('lowStockAlerts', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="lowStockAlerts">
                  Low Stock Alerts
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="taskAssignments"
                  checked={settings.taskAssignments}
                  onChange={(e) => handleSettingChange('taskAssignments', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="taskAssignments">
                  Task Assignments
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="weeklyReports"
                  checked={settings.weeklyReports}
                  onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="weeklyReports">
                  Weekly Reports
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="systemUpdates"
                  checked={settings.systemUpdates}
                  onChange={(e) => handleSettingChange('systemUpdates', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="systemUpdates">
                  System Updates
                </label>
              </div>
            </div>
            
            <div className="settings-section">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="pushNotifications">
                  Push Notifications
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="realTimeUpdates"
                  checked={settings.realTimeUpdates}
                  onChange={(e) => handleSettingChange('realTimeUpdates', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="realTimeUpdates">
                  Real-time Stock Updates
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="urgentAlerts"
                  checked={settings.urgentAlerts}
                  onChange={(e) => handleSettingChange('urgentAlerts', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="urgentAlerts">
                  Urgent Alerts
                </label>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="settings-content">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Theme</label>
                  <select
                    className="form-select"
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Timezone</label>
                  <select
                    className="form-select"
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
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Date Format</label>
                  <select
                    className="form-select"
                    value={settings.dateFormat}
                    onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Currency</label>
                  <select
                    className="form-select"
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
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Default Export Format</label>
                  <select
                    className="form-select"
                    value={settings.exportFormat}
                    onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
                  >
                    <option value="Excel">Excel</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      // admin tab
      case 'appearance':
        return (
          <div className="settings-content">    
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Theme</label>
                  <select
                    className="form-select"
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Timezone</label>
                  <select
                    className="form-select"
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
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Currency</label>
                  <select
                    className="form-select"
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
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Date Format</label>
                  <select
                    className="form-select"
                    value={settings.dateFormat}
                    onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-content">
            <div className="row">
              <div className="col-md-6">
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="twoFactorAuth">
                    Two-Factor Authentication
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="loginNotifications"
                    checked={settings.loginNotifications}
                    onChange={(e) => handleSettingChange('loginNotifications', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="loginNotifications">
                    Login Notifications
                  </label>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Password Expiry (days)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={settings.passwordExpiry}
                    onChange={(e) => handleSettingChange('passwordExpiry', parseInt(e.target.value))}
                    min="30"
                    max="365"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    min="5"
                    max="480"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="settings-content">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Backup Frequency</label>
                  <select
                    className="form-select"
                    value={settings.backupFrequency}
                    onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Data Retention (days)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                    min="30"
                    max="1095"
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="autoBackup"
                    checked={settings.autoBackup}
                    onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="autoBackup">
                    Auto Backup
                  </label>
                </div>
              </div>
            </div>
            
            <div className="storage-info">
              <h4>Storage Information</h4>
              <div className="storage-progress-container">
                <div className="d-flex justify-content-between mb-2">
                  <span>Used Storage</span>
                  <span>2.4 GB / 10 GB</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{width: '24%'}}></div>
                </div>
                <small className="text-muted">24% of storage used</small>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="row">
        {/* Navigation Card */}
        <div className="col-md-3">
          <div className="settings-nav-card">
            <h4>Settings</h4>
            <div className="nav-list">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="col-md-9">
          <div className="settings-content-card">
            <div className="content-header">
              <div>
                <h2>Settings</h2>
                <p>Manage your account preferences and system settings</p>
              </div>
            </div>
            
            <div className="content-body">
              {renderContent()}
            </div>
            
            <div className="content-footer">
              <div className="d-flex justify-content-end gap-3">
                <button className="btn btn-outline-secondary" onClick={handleRestoreDefaults}>
                  <i className="fas fa-undo me-2"></i>
                  Restore Defaults
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  <i className="fas fa-save me-2"></i>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Confirmation Modal */}
      {openSaveConfirm && (
        <div className="modal-overlay" onClick={() => setOpenSaveConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-check-circle text-success me-2"></i>
                Confirm Save
              </h5>
              <button type="button" className="btn-close" onClick={() => setOpenSaveConfirm(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to save these settings?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setOpenSaveConfirm(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Defaults Confirmation Modal */}
      {openRestoreConfirm && (
        <div className="modal-overlay" onClick={() => setOpenRestoreConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                Confirm Restore
              </h5>
              <button type="button" className="btn-close" onClick={() => setOpenRestoreConfirm(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to restore all settings to their default values?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setOpenRestoreConfirm(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-warning" onClick={handleConfirmRestore}>
                Restore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar */}
      {openSnackbar && (
        <div className="snackbar">
          <div className="snackbar-content">
            <i className="fas fa-check-circle text-success me-2"></i>
            {snackbarMessage}
            <button className="btn-close" onClick={handleCloseSnackbar}></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 