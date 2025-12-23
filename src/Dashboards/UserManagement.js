import React, { useState } from 'react';
import { mockData } from './mockUserData';
import { 
  Box, Card, CardContent, Typography, Chip, Paper,
  Button, Avatar, IconButton, Select, MenuItem, FormControl, InputLabel,
  Tabs, Tab, Stack
} from '@mui/material';
import {
  People, PersonAdd, Edit, Delete, 
  CheckCircle, TrendingUp,
  Group, AdminPanelSettings, SupervisorAccount, Person,
  Add
} from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const StatCard = ({ title, value, icon, bgGradient, subtitle }) => (
  <Card sx={{ 
    height: '100%', 
    background: bgGradient, 
    borderRadius: { xs: 2, md: 3 }
  }}>
    <CardContent sx={{ 
      p: { xs: 2, md: 3 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: { xs: 'flex-start', md: 'center' }, 
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 0 }
      }}>
        <Box>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              lineHeight: { xs: 1.2, md: 1.4 }
            }}
          >
            {value}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              mt: { xs: 0.5, md: 1 },
              fontSize: { xs: '0.75rem', md: '0.875rem' }
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255,255,255,0.6)',
                fontSize: { xs: '0.65rem', md: '0.75rem' }
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ 
          color: 'white', 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          borderRadius: '50%', 
          p: { xs: 1, md: 1.5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: { xs: 'flex-end', md: 'center' }
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
      borderRadius: { xs: 2, md: 3 },
      transition: 'all 0.3s ease',
      '&:hover': { 
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        borderColor: '#1ABC9C'
      }
    }}>
      <CardContent sx={{ 
        p: { xs: 2, md: 3 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: { xs: 'flex-start', md: 'center' }, 
          mb: { xs: 1.5, md: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 2 }
        }}>
          <Avatar sx={{ 
            bgcolor: getRoleColor(user.role), 
            width: { xs: 40, md: 50 },
            height: { xs: 40, md: 50 },
            fontSize: { xs: '1rem', md: '1.2rem' }
          }}>
            {user.avatar}
          </Avatar>
          <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#2C3E50', 
                fontWeight: 'bold', 
                mb: { xs: 0.25, md: 0.5 },
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              {user.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#7f8c8d', 
                mb: { xs: 0.5, md: 1 },
                fontSize: { xs: '0.75rem', md: '0.875rem' }
              }}
            >
              {user.email}
            </Typography>
            <Chip 
              label={user.role} 
              size="small" 
              sx={{ 
                bgcolor: getRoleColor(user.role),
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '0.65rem', md: '0.75rem' }
              }} 
            />
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: { xs: 1, md: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 0.5, sm: 1 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, md: 1 }
          }}>
            <Box sx={{ 
              width: { xs: 8, md: 10 }, 
              height: { xs: 8, md: 10 }, 
              borderRadius: '50%', 
              bgcolor: getStatusColor(user.status)
            }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#7f8c8d',
                fontSize: { xs: '0.65rem', md: '0.75rem' }
              }}
            >
              {user.status}
            </Typography>
          </Box>
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#7f8c8d', 
            mb: { xs: 1.5, md: 2 },
            fontSize: { xs: '0.75rem', md: '0.875rem' }
          }}
        >
          Last active: {user.lastActive}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1, md: 1.5 },
          justifyContent: { xs: 'center', sm: 'flex-start' },
          mt: 'auto'
        }}>
          <IconButton 
            size="small" 
            sx={{ 
              color: '#1ABC9C', 
              '&:hover': { bgcolor: 'rgba(26, 188, 156, 0.1)' },
              p: { xs: 0.5, md: 1 }
            }} 
            onClick={() => onEdit(user)}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ 
              color: '#e74c3c', 
              '&:hover': { bgcolor: 'rgba(231, 76, 60, 0.1)' },
              p: { xs: 0.5, md: 1 }
            }} 
            onClick={() => onDelete(user.id)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const RoleCard = ({ role }) => (
  <Card sx={{ 
    height: '100%', 
    width: '100%',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    border: '1px solid #e9ecef',
    borderRadius: { xs: 2, md: 3 },
    transition: 'all 0.3s ease',
    '&:hover': { 
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
      borderColor: '#1ABC9C'
    }
  }}>
    <CardContent sx={{ 
      p: { xs: 2, md: 3 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mb: { xs: 1.5, md: 2 },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 0 }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 0.5, md: 1 }
        }}>
          {role.name === 'Admin' && <AdminPanelSettings sx={{ color: '#e74c3c', fontSize: { xs: '1.2rem', md: '1.5rem' } }} />}
          {role.name === 'Manager' && <SupervisorAccount sx={{ color: '#f39c12', fontSize: { xs: '1.2rem', md: '1.5rem' } }} />}
          {role.name === 'Staff' && <Person sx={{ color: '#3498db', fontSize: { xs: '1.2rem', md: '1.5rem' } }} />}
          {role.name === 'Guest' && <Group sx={{ color: '#95a5a6', fontSize: { xs: '1.2rem', md: '1.5rem' } }} />}
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#2C3E50', 
              fontWeight: 'bold',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            {role.name}
          </Typography>
        </Box>
        <Chip 
          label={`${role.count} users`} 
          size="small" 
          sx={{ 
            bgcolor: '#1ABC9C', 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: { xs: '0.65rem', md: '0.75rem' }
          }} 
        />
      </Box>
      
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#7f8c8d', 
          mb: { xs: 1.5, md: 2 },
          fontSize: { xs: '0.75rem', md: '0.875rem' }
        }}
      >
        Permissions:
      </Typography>
      
      <Stack spacing={{ xs: 0.5, md: 1 }} sx={{ flexGrow: 1 }}>
        {role.permissions.map((permission, index) => (
          <Box key={index} sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, md: 1 }
          }}>
            <CheckCircle fontSize="small" sx={{ color: '#27ae60' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#34495e', 
                fontSize: { xs: '0.7rem', md: '0.85rem' }
              }}
            >
              {permission}
            </Typography>
          </Box>
        ))}
      </Stack>
      
      <Button 
        variant="outlined" 
        size="small" 
        sx={{ 
          mt: { xs: 2, md: 3 }, 
          borderColor: '#1ABC9C', 
          color: '#1ABC9C',
          borderRadius: { xs: 1, md: 2 },
          fontSize: { xs: '0.7rem', md: '0.875rem' },
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
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      flexGrow: 1, 
      p: { xs: 1, sm: 2, md: 2 }
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          mb: { xs: 2, md: 4 },
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
        }}
      >
        User & Role Management
      </Typography>

      {/* Stats Cards */}
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 1, sm: 2, md: 2 }, 
        mb: { xs: 2, md: 4 }, 
        flexWrap: 'wrap' 
      }}>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <StatCard
            title="Total Users"
            value={mockData.stats.totalUsers}
            icon={<People />}
            subtitle="Registered users"
            bgGradient="linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <StatCard
            title="Active Users"
            value={mockData.stats.activeUsers}
            icon={<TrendingUp />}
            subtitle="Online today"
            bgGradient="linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <StatCard
            title="New Users"
            value={mockData.stats.newUsers}
            icon={<PersonAdd />}
            subtitle="This month"
            bgGradient="linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <StatCard
            title="System Health"
            value="99.2%"
            icon={<CheckCircle />}
            subtitle="Uptime"
            bgGradient="linear-gradient(135deg, #f39c12 0%, #e67e22 100%)"
          />
        </Box>
      </Box>

      {/* Main Content with Tabs */}
      <Paper sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: { xs: 2, md: 3 },
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            borderBottom: '1px solid #e9ecef',
            '& .MuiTab-root': {
              color: '#7f8c8d',
              fontWeight: 600,
              minHeight: { xs: '48px', md: 'auto' },
              fontSize: { xs: '0.875rem', md: '1rem' },
              '&.Mui-selected': {
                color: '#1ABC9C'
              }
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#1ABC9C'
            },
            '& .MuiTabs-scrollButtons': {
              color: '#1ABC9C',
              '&.Mui-disabled': {
                opacity: 0.3
              }
            }
          }}
        >
          <Tab label="Users" />
          <Tab label="Roles" />
          <Tab label="Access Logs" />
        </Tabs>

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {/* Users Tab */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: { xs: 2, md: 3 },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, md: 0 }
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#2C3E50',
                    fontSize: { xs: '1.125rem', md: '1.25rem' }
                  }}
                >
                  User Management
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={() => setAddUserOpen(true)}
                  sx={{ 
                    bgcolor: '#1ABC9C',
                    borderRadius: { xs: 1, md: 2 },
                    minHeight: { xs: '48px', md: 'auto' },
                    width: { xs: '100%', md: 'auto' },
                    display: { xs: 'none', lg: 'inline-flex' }, // Hide on mobile, show on desktop
                    '&:hover': { bgcolor: '#27ae60' }
                  }}
                >
                  Add New User
                </Button>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2, md: 2 }, 
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {users.map((user) => (
                  <Box key={user.id} sx={{ 
                    flex: { xs: '1 1 100%', sm: '1 1 300px', md: '1 1 300px' }, 
                    minWidth: { xs: 'auto', md: 300 },
                    maxWidth: { xs: '100%', md: 350 }
                  }}>
                    <UserCard user={user} onDelete={handleDeleteUser} onEdit={handleEditUser} />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Roles Tab */}
          {activeTab === 1 && (
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#2C3E50', 
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '1.125rem', md: '1.25rem' }
                }}
              >
                Role Management
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2, md: 2 }, 
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {mockData.roles.map((role) => (
                  <Box key={role.name} sx={{ 
                    flex: { xs: '1 1 100%', sm: '1 1 300px', md: '1 1 300px' }, 
                    minWidth: { xs: 'auto', md: 300 },
                    maxWidth: { xs: '100%', md: 350 }
                  }}>
                    <RoleCard role={role} />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Access Logs Tab */}
          {activeTab === 2 && (
            <Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: { xs: 2, md: 3 },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 0 }
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#2C3E50',
                    fontSize: { xs: '1.125rem', md: '1.25rem' }
                  }}
                >
                  Access Logs
                </Typography>
                <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 200 } }}>
                  <InputLabel sx={{ color: '#2C3E50' }}>Filter by Role</InputLabel>
                  <Select
                    value={selectedRole}
                    label="Filter by Role"
                    onChange={(e) => setSelectedRole(e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e9ecef' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1ABC9C' },
                      borderRadius: { xs: 1, md: 2 }
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
              
              <Box sx={{ maxHeight: { xs: 400, md: 500 }, overflow: 'auto' }}>
                {filteredLogs.map((log, index) => (
                  <Card key={index} sx={{ 
                    mb: { xs: 1, md: 2 }, 
                    p: { xs: 2, md: 2.5 },
                    background: 'white',
                    border: '1px solid #e9ecef',
                    borderRadius: { xs: 1, md: 2 },
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      borderColor: '#1ABC9C'
                    }
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: { xs: 1, md: 2 },
                      flexDirection: { xs: 'column', sm: 'row' }
                    }}>
                      <Avatar sx={{ 
                        bgcolor: log.role === 'Admin' ? '#e74c3c' : log.role === 'Manager' ? '#f39c12' : '#3498db',
                        width: { xs: 35, md: 40 },
                        height: { xs: 35, md: 40 },
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      }}>
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: { xs: 0.5, md: 1 }, 
                          mb: { xs: 0.5, md: 1 },
                          flexWrap: 'wrap'
                        }}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 'bold', 
                              color: '#2C3E50',
                              fontSize: { xs: '0.875rem', md: '1rem' }
                            }}
                          >
                            {log.user}
                          </Typography>
                          <Chip 
                            label={log.role} 
                            size="small" 
                            sx={{ 
                              bgcolor: log.role === 'Admin' ? '#e74c3c' : log.role === 'Manager' ? '#f39c12' : '#3498db',
                              color: 'white',
                              fontSize: { xs: '0.6rem', md: '0.7rem' },
                              fontWeight: 'bold'
                            }} 
                          />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#7f8c8d', 
                              ml: { xs: 0, sm: 'auto' },
                              fontSize: { xs: '0.65rem', md: '0.75rem' }
                            }}
                          >
                            {log.time}
                          </Typography>
                        </Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#34495e', 
                            mb: { xs: 1, md: 1.5 },
                            fontSize: { xs: '0.75rem', md: '0.875rem' }
                          }}
                        >
                          {log.description}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: { xs: 0.5, md: 1 },
                          flexWrap: 'wrap'
                        }}>
                          <Chip 
                            label={log.action} 
                            size="small" 
                            sx={{ 
                              bgcolor: getActionColor(log.action),
                              color: 'white',
                              fontSize: { xs: '0.6rem', md: '0.7rem' },
                              fontWeight: 'bold'
                            }} 
                          />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#7f8c8d',
                              fontSize: { xs: '0.65rem', md: '0.75rem' }
                            }}
                          >
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

      {/* Floating Action Button - Mobile Only */}
      <Box
        sx={{
          position: 'fixed',
          bottom: '100px', 
          right: '20px',
          zIndex: 1000,
          display: { xs: 'block', lg: 'none' } // Show only on mobile/tablet
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(26, 188, 156, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '56px',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 6px 16px rgba(26, 188, 156, 0.6)',
              background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)'
            },
            '&:active': {
              transform: 'scale(0.95)'
            }
          }}
          onClick={() => setAddUserOpen(true)}
          aria-label="Add New User"
        >
          <Add />
        </Button>
      </Box>

      {/* Add User Dialog */}
      <Dialog 
        open={addUserOpen} 
        onClose={() => setAddUserOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, md: 3 },
            m: { xs: 2, md: 3 }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          pb: { xs: 1, md: 2 }
        }}>
          Add New User
        </DialogTitle>
        <DialogContent sx={{ 
          minWidth: { xs: 300, md: 350 },
          pt: { xs: 1, md: 2 }
        }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            sx={{ mb: { xs: 1.5, md: 2 } }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            sx={{ mb: { xs: 1.5, md: 2 } }}
          />
          <FormControl fullWidth sx={{ mb: { xs: 1.5, md: 2 } }}>
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
        <DialogActions sx={{ 
          p: { xs: 2, md: 3 },
          gap: { xs: 1, md: 2 }
        }}>
          <Button 
            onClick={() => setAddUserOpen(false)} 
            color="secondary"
            sx={{ 
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddUser} 
            variant="contained" 
            sx={{ 
              bgcolor: '#1ABC9C', 
              '&:hover': { bgcolor: '#27ae60' },
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog 
        open={editUserOpen} 
        onClose={() => setEditUserOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, md: 3 },
            m: { xs: 2, md: 3 }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          pb: { xs: 1, md: 2 }
        }}>
          Edit User
        </DialogTitle>
        <DialogContent sx={{ 
          minWidth: { xs: 300, md: 350 },
          pt: { xs: 1, md: 2 }
        }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editUser?.name || ''}
            onChange={e => setEditUser({ ...editUser, name: e.target.value })}
            sx={{ mb: { xs: 1.5, md: 2 } }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={editUser?.email || ''}
            onChange={e => setEditUser({ ...editUser, email: e.target.value })}
            sx={{ mb: { xs: 1.5, md: 2 } }}
          />
          <FormControl fullWidth sx={{ mb: { xs: 1.5, md: 2 } }}>
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
        <DialogActions sx={{ 
          p: { xs: 2, md: 3 },
          gap: { xs: 1, md: 2 }
        }}>
          <Button 
            onClick={() => setEditUserOpen(false)} 
            color="secondary"
            sx={{ 
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEditUserSave} 
            variant="contained" 
            sx={{ 
              bgcolor: '#1ABC9C', 
              '&:hover': { bgcolor: '#27ae60' },
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 