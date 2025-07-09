import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Avatar, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip,
  Badge, LinearProgress, Divider, List, ListItem, ListItemText,
  ListItemAvatar, ListItemIcon, Switch, FormControlLabel, Alert, Snackbar,
  Tabs, Tab, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import './StaffManagement.css';
import {
  Add, Edit, Delete, Assignment, Person, TrendingUp, Warning,
  CheckCircle, Schedule, Notifications, Download, FilterList,
  Refresh, Visibility, AddCircle, RemoveCircle, AssignmentInd,
  Group, Task, Analytics, Inventory, LocalShipping, Assessment,
  ExpandMore, Search, Sort, FilterAlt, AddBox, Edit as EditIcon,
  Delete as DeleteIcon, Assignment as AssignmentIcon, Visibility as VisibilityIcon,
  Message, SettingsIcon
} from '@mui/icons-material';

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [workloadFilter, setWorkloadFilter] = useState('all');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Mock staff data
  const [staff] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@inventorypro.com',
      phone: '+254 700 123 456',
      role: 'Warehouse Staff',
      assignedItems: 12,
      completedTasks: 8,
      pendingTasks: 2,
      status: 'online',
      avatar: 'JD',
      assignedCategories: ['Electronics'],
      lastActivity: '2024-01-15T09:30:00',
      workloadStatus: 'normal',
      performance: 85,
      joinDate: '2023-03-15',
      department: 'Inventory',
      supervisor: 'Manager Smith'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@inventorypro.com',
      phone: '+254 700 123 457',
      role: 'Warehouse Staff',
      assignedItems: 8,
      completedTasks: 6,
      pendingTasks: 1,
      status: 'online',
      avatar: 'JS',
      assignedCategories: ['Electronics'],
      lastActivity: '2024-01-15T10:15:00',
      workloadStatus: 'normal',
      performance: 92,
      joinDate: '2023-05-20',
      department: 'Inventory',
      supervisor: 'Manager Smith'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@inventorypro.com',
      phone: '+254 700 123 458',
      role: 'Warehouse Staff',
      assignedItems: 15,
      completedTasks: 12,
      pendingTasks: 3,
      status: 'away',
      avatar: 'MJ',
      assignedCategories: ['Furniture'],
      lastActivity: '2024-01-15T08:45:00',
      workloadStatus: 'busy',
      performance: 78,
      joinDate: '2023-02-10',
      department: 'Inventory',
      supervisor: 'Manager Smith'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@inventorypro.com',
      phone: '+254 700 123 459',
      role: 'Warehouse Staff',
      assignedItems: 10,
      completedTasks: 9,
      pendingTasks: 1,
      status: 'offline',
      avatar: 'SW',
      assignedCategories: ['Furniture'],
      lastActivity: '2024-01-14T16:30:00',
      workloadStatus: 'normal',
      performance: 88,
      joinDate: '2023-07-12',
      department: 'Inventory',
      supervisor: 'Manager Smith'
    }
  ]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWorkloadColor = (status) => {
    switch (status) {
      case 'normal': return '#27ae60';
      case 'busy': return '#f39c12';
      case 'overloaded': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#27ae60';
      case 'away': return '#f39c12';
      case 'offline': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const showNotification = (message) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderStaffOverview = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#2C3E50' }}>
        Staff Overview
      </Typography>

      {/* Staff Summary Cards */}
      <div className="row mb-4">
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(44, 62, 80, 0.3)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {staff.length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    Total Staff
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Active team members
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Group sx={{ fontSize: 36, opacity: 0.9 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card sx={{ 
            background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(26, 188, 156, 0.3)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {staff.filter(s => s.status === 'online').length}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    Online Now
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Currently active
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CheckCircle sx={{ fontSize: 36, opacity: 0.9 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2C3E50 0%, #34495e 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(44, 62, 80, 0.3)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {staff.reduce((sum, s) => sum + s.assignedItems, 0)}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    Assigned Items
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Total inventory managed
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Inventory sx={{ fontSize: 36, opacity: 0.9 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card sx={{ 
            background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(26, 188, 156, 0.3)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {Math.round(staff.reduce((sum, s) => sum + s.performance, 0) / staff.length)}%
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    Avg Performance
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Team efficiency
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <TrendingUp sx={{ fontSize: 36, opacity: 0.9 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card sx={{ 
        mb: 4, 
        borderRadius: 4, 
        background: 'linear-gradient(135deg, #f6fefb 0%, #ecf0f1 100%)',
        boxShadow: '0 4px 20px rgba(44, 62, 80, 0.1)'
      }}>
        <CardContent sx={{ p: 3 }}>
          <div className="row align-items-center">
            <div className="col-12 col-md-4 mb-3">
              <TextField
                fullWidth
                placeholder="Search staff by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: '#1ABC9C' }} />,
                  sx: { 
                    borderRadius: 3,
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                  }
                }}
                sx={{ '& .MuiInputBase-root': { boxShadow: '0 2px 8px rgba(44, 62, 80, 0.1)' } }}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-2 mb-3">
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select 
                  label="Status" 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ 
                    borderRadius: 3,
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    boxShadow: '0 2px 8px rgba(44, 62, 80, 0.1)'
                  }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="online">Online</MenuItem>
                  <MenuItem value="away">Away</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-sm-6 col-md-2 mb-3">
              <FormControl fullWidth>
                <InputLabel>Workload</InputLabel>
                <Select 
                  label="Workload" 
                  value={workloadFilter}
                  onChange={(e) => setWorkloadFilter(e.target.value)}
                  sx={{ 
                    borderRadius: 3,
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    boxShadow: '0 2px 8px rgba(44, 62, 80, 0.1)'
                  }}
                >
                  <MenuItem value="all">All Workloads</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="busy">Busy</MenuItem>
                  <MenuItem value="overloaded">Overloaded</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-sm-6 col-md-2 mb-3">
              <Button
                variant="contained"
                startIcon={<Add />}
                fullWidth
                sx={{ 
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
                  boxShadow: '0 4px 15px rgba(44, 62, 80, 0.4)',
                  '&:hover': { 
                    background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(26, 188, 156, 0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Add Staff
              </Button>
            </div>
            <div className="col-12 col-sm-6 col-md-2 mb-3">
              <Button
                variant="outlined"
                startIcon={<Assignment />}
                fullWidth
                sx={{ 
                  borderRadius: 3,
                  borderColor: '#1ABC9C',
                  color: '#1ABC9C',
                  borderWidth: 2,
                  '&:hover': { 
                    borderColor: '#16a085',
                    color: '#16a085',
                    bgcolor: 'rgba(26, 188, 156, 0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Assign Task
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Cards */}
      <div className="row">
        {staff
          .filter(member => 
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (statusFilter === 'all' || member.status === statusFilter) &&
            (workloadFilter === 'all' || member.workloadStatus === workloadFilter)
          )
          .map((member) => (
          <div className="col-12 col-md-6 mb-3" key={member.id}>
            <Card sx={{ 
              borderRadius: 4, 
              p: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f6fefb 100%)',
              border: member.status === 'online' ? '2px solid #1ABC9C' : 
                      member.status === 'away' ? '2px solid #2C3E50' : '2px solid #95a5a6',
              boxShadow: member.status === 'online' ? '0 8px 32px rgba(26, 188, 156, 0.2)' : 
                         member.status === 'away' ? '0 8px 32px rgba(44, 62, 80, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': { 
                transform: 'translateY(-8px)',
                boxShadow: member.status === 'online' ? '0 12px 40px rgba(26, 188, 156, 0.3)' : 
                           member.status === 'away' ? '0 12px 40px rgba(44, 62, 80, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.15)'
              }
            }}>
              {/* Header Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar sx={{ 
                    width: 64, 
                    height: 64, 
                    background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(44, 62, 80, 0.3)'
                  }}>
                    {member.avatar}
                  </Avatar>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: member.status === 'online' ? '#1ABC9C' : 
                               member.status === 'away' ? '#2C3E50' : '#95a5a6',
                      border: '3px solid white',
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 0.5 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                    {member.email}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                         <Box
                       sx={{
                         width: 8,
                         height: 8,
                         borderRadius: '50%',
                         bgcolor: member.status === 'online' ? '#1ABC9C' : 
                                  member.status === 'away' ? '#2C3E50' : '#95a5a6'
                       }}
                     />
                    <Typography variant="caption" color="text.secondary">
                      Last active: {formatDateTime(member.lastActivity)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              {/* Status and Performance Row */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Chip
                  label={member.workloadStatus}
                  size="medium"
                  sx={{
                    background: `linear-gradient(135deg, ${getWorkloadColor(member.workloadStatus)} 0%, ${getWorkloadColor(member.workloadStatus)}dd 100%)`,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                    px: 2
                  }}
                />
                                 <Box sx={{ textAlign: 'right' }}>
                   <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1ABC9C' }}>
                     {member.performance}%
                   </Typography>
                   <Typography variant="caption" color="text.secondary">
                     Performance
                   </Typography>
                 </Box>
              </Box>
              
              {/* Metrics Grid */}
              <div className="row mb-3">
                <div className="col-4">
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    borderRadius: 3,
                    background: 'linear-gradient(135deg,rgb(206, 207, 207) 0%,rgb(196, 229, 222) 100%)',
                    color: 'white'
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {Math.round((member.completedTasks / (member.completedTasks + member.pendingTasks)) * 100)}%
                    </Typography>
                    <Typography variant="caption" color="black" sx={{ opacity: 0.9 }}>
                      Completion
                    </Typography>
                  </Box>
                </div>
                <div className="col-4">
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    borderRadius: 3,
                    background: 'linear-gradient(135deg,rgb(206, 207, 207) 0%,rgb(196, 229, 222) 100%)',
                    color: 'white'
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {member.assignedItems}
                    </Typography>
                    <Typography variant="caption" color="black" sx={{ opacity: 0.9 }}>
                      Items
                    </Typography>
                  </Box>
                </div>
                <div className="col-4">
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    borderRadius: 3,
                    background: 'linear-gradient(135deg,rgb(206, 207, 207) 0%,rgb(196, 229, 222) 100%)',
                    color: 'white'
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {member.pendingTasks}
                    </Typography>
                    <Typography variant="caption" color="black" sx={{ opacity: 0.9 }}>
                      Pending
                    </Typography>
                  </Box>
                </div>
              </div>
              
              {/* Task Progress */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                    Task Progress
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {member.completedTasks}/{member.completedTasks + member.pendingTasks}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(member.completedTasks / (member.completedTasks + member.pendingTasks)) * 100}
                  sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    bgcolor: 'rgba(26, 188, 156, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
                      borderRadius: 5
                    }
                  }}
                />
              </Box>
              
              {/* Assigned Categories */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                {member.assignedCategories.map(category => (
                                      <Chip
                      key={category}
                      label={category}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.75rem'
                      }}
                    />
                ))}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Assignment />}
                  sx={{ 
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
                    boxShadow: '0 4px 15px rgba(44, 62, 80, 0.3)',
                    '&:hover': { 
                      background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(26, 188, 156, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Assign Task
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Visibility />}
                  sx={{ 
                    borderRadius: 3,
                    borderColor: '#1ABC9C',
                    color: '#1ABC9C',
                    '&:hover': { 
                      borderColor: '#16a085',
                      color: '#16a085',
                      bgcolor: 'rgba(26, 188, 156, 0.05)'
                    }
                  }}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Message />}
                  sx={{ 
                    borderRadius: 3,
                    borderColor: '#2C3E50',
                    color: '#2C3E50',
                    '&:hover': { 
                      borderColor: '#34495e',
                      color: '#34495e',
                      bgcolor: 'rgba(44, 62, 80, 0.05)'
                    }
                  }}
                >
                  Message
                </Button>
              </Box>
            </Card>
          </div>
        ))}
      </div>
    </Box>
  );

  const renderTaskManagement = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Staff Task Management
      </Typography>
      
      {/* Task Overview Cards */}
      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {staff.reduce((sum, s) => sum + s.pendingTasks, 0)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Active Tasks
                  </Typography>
                </Box>
                <Task sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card sx={{ 
            background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {staff.reduce((sum, s) => sum + s.completedTasks, 0)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Completed Today
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card sx={{ 
            background: 'linear-gradient(135deg, #27ae60 0%, #f39c12 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {staff.filter(s => s.workloadStatus === 'normal').length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Available Staff
                  </Typography>
                </Box>
                <Person sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card sx={{ 
            background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {Math.round((staff.reduce((sum, s) => sum + s.completedTasks, 0) / 
                                (staff.reduce((sum, s) => sum + s.completedTasks, 0) + 
                                 staff.reduce((sum, s) => sum + s.pendingTasks, 0))) * 100)}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Completion Rate
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-8 mb-3">
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                  Active Tasks by Staff
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{ bgcolor: '#1ABC9C', '&:hover': { bgcolor: '#27ae60' } }}
                >
                  Assign New Task
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Staff Member</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Task</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {staff.flatMap(member => 
                      Array.from({ length: member.pendingTasks }, (_, i) => ({
                        id: `${member.id}-${i}`,
                        title: `Task ${i + 1} for ${member.name}`,
                        assignedTo: member.name,
                        priority: i === 0 ? 'High' : 'Medium',
                        status: 'In Progress',
                        dueDate: '2024-01-20',
                        member
                      }))
                    ).map((task) => (
                      <TableRow key={task.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#1ABC9C', fontSize: '0.875rem' }}>
                              {task.member.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {task.assignedTo}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {task.member.workloadStatus} workload
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {task.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Assigned {formatDateTime(task.member.lastActivity)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={task.priority} 
                            size="small"
                            sx={{ 
                              bgcolor: task.priority === 'High' ? '#e74c3c' : '#f39c12',
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={task.status} 
                            size="small"
                            sx={{ bgcolor: '#1ABC9C', color: 'white' }}
                          />
                        </TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="Edit Task">
                              <IconButton size="small">
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View Details">
                              <IconButton size="small">
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reassign">
                              <IconButton size="small">
                                <Assignment />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-12 col-md-4 mb-3">
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2C3E50' }}>
                Staff Workload Overview
              </Typography>
              {staff.map((member) => (
                <Box key={member.id} sx={{ mb: 3, p: 2, border: '1px solid #e9ecef', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.workloadStatus}
                      size="small"
                      sx={{
                        bgcolor: getWorkloadColor(member.workloadStatus),
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Tasks: {member.pendingTasks} pending, {member.completedTasks} completed
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(member.completedTasks / (member.completedTasks + member.pendingTasks)) * 100}
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: 'rgba(26, 188, 156, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#1ABC9C'
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {member.assignedItems} items assigned
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {member.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Box>
  );

  const renderPerformanceAnalytics = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Performance Analytics
      </Typography>
      
      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2C3E50' }}>
                Performance Overview
              </Typography>
              {staff.map((member) => (
                <Box key={member.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1ABC9C' }}>
                      {member.performance}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={member.performance}
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'rgba(26, 188, 156, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: member.performance >= 80 ? '#27ae60' : 
                                member.performance >= 60 ? '#f39c12' : '#e74c3c'
                      }
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="col-12 col-md-6 mb-3">
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2C3E50' }}>
                Workload Distribution
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Normal Workload
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(staff.filter(s => s.workloadStatus === 'normal').length / staff.length) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#27ae60' }}
                />
                <Typography variant="caption" color="text.secondary">
                  {staff.filter(s => s.workloadStatus === 'normal').length} staff members
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Busy Workload
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(staff.filter(s => s.workloadStatus === 'busy').length / staff.length) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#f39c12' }}
                />
                <Typography variant="caption" color="text.secondary">
                  {staff.filter(s => s.workloadStatus === 'busy').length} staff members
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Overloaded Workload
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(staff.filter(s => s.workloadStatus === 'overloaded').length / staff.length) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#e74c3c' }}
                />
                <Typography variant="caption" color="text.secondary">
                  {staff.filter(s => s.workloadStatus === 'overloaded').length} staff members
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    </Box>
  );

  return (
    <Box className="staff-management-container" sx={{ width: '100%', maxWidth: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4, color: '#2C3E50' }}>
        Staff Management
      </Typography>

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ '& .MuiTab-root': { fontWeight: 'bold' } }}>
          <Tab label="Staff Overview" icon={<Group />} iconPosition="start" />
          <Tab label="Task Management" icon={<Task />} iconPosition="start" />
          <Tab label="Performance Analytics" icon={<Analytics />} iconPosition="start" />
        </Tabs>
      </Box>

      {activeTab === 0 && renderStaffOverview()}
      {activeTab === 1 && renderTaskManagement()}
      {activeTab === 2 && renderPerformanceAnalytics()}

      {/* Snackbar for notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StaffManagement; 