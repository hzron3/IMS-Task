import React, { useState } from 'react';
import { mockData } from './mockUserData';
import { 
  Box, Card, CardContent, Typography, Paper, Chip, List, ListItem, ListItemText, 
  ListItemIcon, Divider, Button, Avatar, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton, Badge, Select, MenuItem, FormControl, InputLabel,
  Grid, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, Stack
} from '@mui/material';
import {
  People, PersonAdd, Edit, Delete, Security, AccessTime, 
  TrendingUp, Warning, CheckCircle, Cancel, Visibility, ExpandMore,
  FilterList, Group, AdminPanelSettings, SupervisorAccount, Person,
  Add, MoreVert, Search, FilterAlt
} from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const StatCard = ({ title, value, icon, bgGradient, subtitle }) => (
  <Card sx={{ height: '100%', background: bgGradient, borderRadius: 3 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ 
          color: 'white', 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          borderRadius: '50%', 
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const UserCard = ({ user, onDelete, onEdit }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#27ae60';
      case 'offline': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return '#e74c3c';
      case 'Manager': return '#f39c12';
      case 'Staff': return '#3498db';
      case 'Guest': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  return (
    <Card sx={{ 
      height: '100%', 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      border: '1px solid #e9ecef',
      borderRadius: 3,
      transition: 'all 0.3s ease',
      '&:hover': { 
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        borderColor: '#1ABC9C'
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            bgcolor: getRoleColor(user.role), 
            mr: 2,
            width: 50,
            height: 50,
            fontSize: '1.2rem'
          }}>
            {user.avatar}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ color: '#2C3E50', fontWeight: 'bold', mb: 0.5 }}>
              {user.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#7f8c8d', mr: 2 }}>
                {user.email}
              </Typography>
              <Chip 
                label={user.role} 
                size="small" 
                sx={{ 
                  bgcolor: getRoleColor(user.role),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                }} 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: getStatusColor(user.status)
              }} />
              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                {user.status}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton size="small" sx={{ color: '#1ABC9C', '&:hover': { bgcolor: 'rgba(26, 188, 156, 0.1)' } }} onClick={() => onEdit(user)}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: '#e74c3c', '&:hover': { bgcolor: 'rgba(231, 76, 60, 0.1)' } }} onClick={() => onDelete(user.id)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 2 }}>
          Last active: {user.lastActive}
        </Typography>
      </CardContent>
    </Card>
  );
};

const RoleCard = ({ role }) => (
  <Card sx={{ 
    height: '100%', 
    width: 320,
    margin: '0 auto',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    border: '1px solid #e9ecef',
    borderRadius: 3,
    transition: 'all 0.3s ease',
    '&:hover': { 
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
      borderColor: '#1ABC9C'
    }
  }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {role.name === 'Admin' && <AdminPanelSettings sx={{ color: '#e74c3c' }} />}
          {role.name === 'Manager' && <SupervisorAccount sx={{ color: '#f39c12' }} />}
          {role.name === 'Staff' && <Person sx={{ color: '#3498db' }} />}
          {role.name === 'Guest' && <Group sx={{ color: '#95a5a6' }} />}
          <Typography variant="h6" sx={{ color: '#2C3E50', fontWeight: 'bold' }}>
            {role.name}
          </Typography>
        </Box>
        <Chip 
          label={`${role.count} users`} 
          size="small" 
          sx={{ bgcolor: '#1ABC9C', color: 'white', fontWeight: 'bold' }} 
        />
      </Box>
      
      <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 2 }}>
        Permissions:
      </Typography>
      
      <Stack spacing={1}>
        {role.permissions.map((permission, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle fontSize="small" sx={{ color: '#27ae60' }} />
            <Typography variant="body2" sx={{ color: '#34495e', fontSize: '0.85rem' }}>
              {permission}
            </Typography>
          </Box>
        ))}
      </Stack>
      
      <Button 
        variant="outlined" 
        size="small" 
        sx={{ 
          mt: 3, 
          borderColor: '#1ABC9C', 
          color: '#1ABC9C',
          borderRadius: 2,
          '&:hover': { 
            borderColor: '#27ae60', 
            color: '#27ae60',
            bgcolor: 'rgba(26, 188, 156, 0.05)'
          }
        }}
      >
        Edit Permissions
      </Button>
    </CardContent>
  </Card>
);

const UserManagement = () => {
  const [selectedRole, setSelectedRole] = useState('All');
  const [activeTab, setActiveTab] = useState(0);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [users, setUsers] = useState([...mockData.users]);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const filteredLogs = (selectedRole === 'All' 
    ? mockData.accessLogs 
    : mockData.accessLogs.filter(log => log.role === selectedRole)
  ).filter(log => !log.action.includes('Failed'));

  const getActionColor = (action) => {
    if (action.includes('Failed')) return '#e74c3c';
    if (action.includes('Login')) return '#27ae60';
    if (action.includes('Update') || action.includes('Management')) return '#3498db';
    if (action.includes('Report')) return '#f39c12';
    return '#95a5a6';
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const avatar = newUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
    setUsers([
      ...users,
      {
        id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        lastActive: 'just now',
        status: 'online',
        avatar
      }
    ]);
    setAddUserOpen(false);
    setNewUser({ name: '', email: '', role: '' });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setEditUserOpen(true);
  };

  const handleEditUserSave = () => {
    setUsers(users.map(u => u.id === editUser.id ? { ...editUser } : u));
    setEditUserOpen(false);
    setEditUser(null);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4, color: '#2C3E50' }}>
        User & Role Management
      </Typography>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, width: '100%', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
        <Box sx={{ flex: 1, minWidth: 0, mb: { xs: 2, md: 0 } }}>
          <StatCard
            title="Total Users"
            value={mockData.stats.totalUsers}
            icon={<People />}
            subtitle="Registered users"
            bgGradient="linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)"
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, mb: { xs: 2, md: 0 } }}>
          <StatCard
            title="Active Users"
            value={mockData.stats.activeUsers}
            icon={<TrendingUp />}
            subtitle="Online today"
            bgGradient="linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)"
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <StatCard
            title="New Users"
            value={mockData.stats.newUsers}
            icon={<PersonAdd />}
            subtitle="This month"
            bgGradient="linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)"
          />
        </Box>
      </Box>

      {/* Main Content with Tabs */}
      <Paper sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ 
            borderBottom: '1px solid #e9ecef',
            '& .MuiTab-root': {
              color: '#7f8c8d',
              fontWeight: 600,
              '&.Mui-selected': {
                color: '#1ABC9C'
              }
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#1ABC9C'
            }
          }}
        >
          <Tab label="Users" />
          <Tab label="Roles" />
          <Tab label="Access Logs" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Users Tab */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                  User Management
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  sx={{ 
                    bgcolor: '#1ABC9C',
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#27ae60' }
                  }}
                  onClick={() => setAddUserOpen(true)}
                >
                  Add New User
                </Button>
              </Box>
              <Grid container spacing={3} justifyContent="center">
                {users.map((user) => (
                  <Grid item xs={12} sm={6} md={3} key={user.id}>
                    <UserCard user={user} onDelete={handleDeleteUser} onEdit={handleEditUser} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Roles Tab */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
                Role Management
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {mockData.roles.map((role) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={role.name}>
                    <RoleCard role={role} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Access Logs Tab */}
          {activeTab === 2 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                  Access Logs
                </Typography>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel sx={{ color: '#2C3E50' }}>Filter by Role</InputLabel>
                  <Select
                    value={selectedRole}
                    label="Filter by Role"
                    onChange={(e) => setSelectedRole(e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e9ecef' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1ABC9C' },
                      borderRadius: 2
                    }}
                  >
                    <MenuItem value="All">All Roles</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Staff">Staff</MenuItem>
                    <MenuItem value="Guest">Guest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
                {filteredLogs.map((log, index) => (
                  <Card key={index} sx={{ 
                    mb: 2, 
                    p: 2.5,
                    background: 'white',
                    border: '1px solid #e9ecef',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      borderColor: '#1ABC9C'
                    }
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: log.role === 'Admin' ? '#e74c3c' : log.role === 'Manager' ? '#f39c12' : '#3498db',
                        width: 40,
                        height: 40
                      }}>
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                            {log.user}
                          </Typography>
                          <Chip 
                            label={log.role} 
                            size="small" 
                            sx={{ 
                              bgcolor: log.role === 'Admin' ? '#e74c3c' : log.role === 'Manager' ? '#f39c12' : '#3498db',
                              color: 'white',
                              fontSize: '0.7rem',
                              fontWeight: 'bold'
                            }} 
                          />
                          <Typography variant="caption" sx={{ color: '#7f8c8d', ml: 'auto' }}>
                            {log.time}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#34495e', mb: 1.5 }}>
                          {log.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={log.action} 
                            size="small" 
                            sx={{ 
                              bgcolor: getActionColor(log.action),
                              color: 'white',
                              fontSize: '0.7rem',
                              fontWeight: 'bold'
                            }} 
                          />
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            Duration: {log.duration}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onClose={() => setAddUserOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              label="Role"
              onChange={e => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Guest">Guest</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddUser} variant="contained" sx={{ bgcolor: '#1ABC9C', '&:hover': { bgcolor: '#27ae60' } }}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserOpen} onClose={() => setEditUserOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ minWidth: 350 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editUser?.name || ''}
            onChange={e => setEditUser({ ...editUser, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={editUser?.email || ''}
            onChange={e => setEditUser({ ...editUser, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={editUser?.role || ''}
              label="Role"
              onChange={e => setEditUser({ ...editUser, role: e.target.value })}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Guest">Guest</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUserOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleEditUserSave} variant="contained" sx={{ bgcolor: '#1ABC9C', '&:hover': { bgcolor: '#27ae60' } }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 