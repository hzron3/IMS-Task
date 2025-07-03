import React, { useState } from "react";
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
    dataRetention: 365
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
    { id: 'appearance', label: 'Appearance', icon: 'fas fa-palette' },
    { id: 'notifications', label: 'Notification Preferences', icon: 'fas fa-bell' },
    { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
    { id: 'system', label: 'System Settings', icon: 'fas fa-cog' }
  ];

  const renderContent = () => {
    switch (activeTab) {
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

      case 'notifications':
        return (
          <div className="settings-content">
            <div className="settings-notifications-section">
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
                  id="smsNotifications"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="smsNotifications">
                  SMS Notifications
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
                  id="systemAlerts"
                  checked={settings.systemAlerts}
                  onChange={(e) => handleSettingChange('systemAlerts', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="systemAlerts">
                  System Alerts
                </label>
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
              <p>Are you sure you want to restore all settings to their default values? This action cannot be undone.</p>
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
            <button className="btn-close ms-auto" onClick={handleCloseSnackbar}></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 