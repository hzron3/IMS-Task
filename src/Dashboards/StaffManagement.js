import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Avatar, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip,
  Badge, LinearProgress, Divider, List, ListItem, ListItemText,
  ListItemAvatar, ListItemIcon, Switch, FormControlLabel, Alert, Snackbar,
  Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Grid
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
  
  // Modal states
  const [openAddStaffDialog, setOpenAddStaffDialog] = useState(false);
  const [openEditStaffDialog, setOpenEditStaffDialog] = useState(false);
  const [openAssignTaskDialog, setOpenAssignTaskDialog] = useState(false);
  const [openViewDetailsDialog, setOpenViewDetailsDialog] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  
  // Form states
  const [staffForm, setStaffForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    supervisor: ''
  });
  
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignedTo: ''
  });

  // Mock staff data
  const [staff] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@InventoryAce.com',
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
      email: 'jane.smith@InventoryAce.com',
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
      email: 'mike.johnson@InventoryAce.com',
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
      email: 'sarah.wilson@InventoryAce.com',
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

  // Modal handlers
  const handleAddStaff = () => {
    setOpenAddStaffDialog(true);
  };

  const handleEditStaff = (staffMember) => {
    setSelectedStaff(staffMember);
    setStaffForm({
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone,
      role: staffMember.role,
      department: staffMember.department,
      supervisor: staffMember.supervisor
    });
    setOpenEditStaffDialog(true);
  };

  const handleAssignTask = (staffMember) => {
    setSelectedStaff(staffMember);
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignedTo: staffMember.id
    });
    setOpenAssignTaskDialog(true);
  };

  const handleSaveStaff = () => {
    showNotification('Staff member saved successfully!');
    setOpenAddStaffDialog(false);
    setOpenEditStaffDialog(false);
    setStaffForm({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      supervisor: ''
    });
  };

  const handleSaveTask = () => {
    showNotification('Task assigned successfully!');
    setOpenAssignTaskDialog(false);
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignedTo: ''
    });
  };

  const handleViewDetails = (staffMember) => {
    setSelectedStaff(staffMember);
    setOpenViewDetailsDialog(true);
  };

  const handleMessage = (staffMember) => {
    setSelectedStaff(staffMember);
    setOpenMessageDialog(true);
  };

  const renderStaffOverview = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
          Staff Overview
        </Typography>
      </Box>

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
                onClick={handleAddStaff}
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
                  onClick={() => handleAssignTask(member)}
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
                  onClick={() => handleViewDetails(member)}
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
                  onClick={() => handleMessage(member)}
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
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'white !important',
                      background: 'none !important',
                      WebkitBackgroundClip: 'unset !important',
                      WebkitTextFillColor: 'white !important',
                      backgroundClip: 'unset !important'
                    }}
                  >
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
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'white !important',
                      background: 'none !important',
                      WebkitBackgroundClip: 'unset !important',
                      WebkitTextFillColor: 'white !important',
                      backgroundClip: 'unset !important'
                    }}
                  >
                    {staff.reduce((sum, s) => sum + s.completedTasks, 0)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Completed Tasks
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
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'white !important',
                      background: 'none !important',
                      WebkitBackgroundClip: 'unset !important',
                      WebkitTextFillColor: 'white !important',
                      backgroundClip: 'unset !important'
                    }}
                  >
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
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'white !important',
                      background: 'none !important',
                      WebkitBackgroundClip: 'unset !important',
                      WebkitTextFillColor: 'white !important',
                      backgroundClip: 'unset !important'
                    }}
                  >
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

      {/* Add Staff Dialog */}
      <Dialog 
        open={openAddStaffDialog} 
        onClose={() => setOpenAddStaffDialog(false)} 
        maxWidth="md" 
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
            <Add sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Add New Staff Member
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Fill in the details to add a new staff member to your team
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={staffForm.name}
                onChange={(e) => setStaffForm({...staffForm, name: e.target.value})}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1ABC9C',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1ABC9C',
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={staffForm.email}
                onChange={(e) => setStaffForm({...staffForm, email: e.target.value})}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1ABC9C',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1ABC9C',
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={staffForm.phone}
                onChange={(e) => setStaffForm({...staffForm, phone: e.target.value})}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1ABC9C',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1ABC9C',
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={staffForm.role}
                  label="Role"
                  onChange={(e) => setStaffForm({...staffForm, role: e.target.value})}
                  sx={{ 
                    borderRadius: 2,
                    minWidth: '200px',
                    '& .MuiSelect-select': {
                      minWidth: '180px',
                      paddingRight: '32px'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1ABC9C',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1ABC9C',
                    }
                  }}
                >
                  <MenuItem value="Warehouse Staff">Warehouse Staff</MenuItem>
                  <MenuItem value="Inventory Manager">Inventory Manager</MenuItem>
                  <MenuItem value="Supervisor">Supervisor</MenuItem>
                  <MenuItem value="Assistant">Assistant</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 4, 
          background: '#f8f9fa',
          borderRadius: '0 0 12px 12px',
          borderTop: '1px solid rgba(26, 188, 156, 0.1)'
        }}>
          <Button 
            onClick={() => setOpenAddStaffDialog(false)}
            sx={{ 
              color: '#7f8c8d',
              fontWeight: 500,
              px: 3,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                background: 'rgba(127, 140, 141, 0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveStaff}
            variant="contained"
            disabled={!staffForm.name || !staffForm.email || !staffForm.role}
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
              },
              '&:disabled': {
                background: '#bdc3c7',
                boxShadow: 'none'
              }
            }}
          >
            Add Staff Member
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Task Dialog */}
      <Dialog 
        open={openAssignTaskDialog} 
        onClose={() => setOpenAssignTaskDialog(false)} 
        maxWidth="md" 
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
            <Assignment sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Assign New Task
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          {selectedStaff && (
            <Box>
              <Box sx={{ mb: 3, p: 3, background: 'rgba(26, 188, 156, 0.05)', borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.1)' }}>
                <Typography variant="h6" sx={{ mb: 1, color: '#2C3E50', fontWeight: 'bold' }}>
                  Assigning to: {selectedStaff.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Current workload: {selectedStaff.workloadStatus} | Pending tasks: {selectedStaff.pendingTasks}
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Task Title"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Task Description"
                    multiline
                    rows={3}
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                    placeholder="Provide detailed description of the task..."
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={taskForm.priority}
                      label="Priority"
                      onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                      sx={{ 
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e0e0e0',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        }
                      }}
                    >
                      <MenuItem value="low">🟢 Low</MenuItem>
                      <MenuItem value="medium">🟡 Medium</MenuItem>
                      <MenuItem value="high">🔴 High</MenuItem>
                      <MenuItem value="urgent">🚨 Urgent</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Due Date"
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        }
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 4, 
          background: '#f8f9fa',
          borderRadius: '0 0 12px 12px',
          borderTop: '1px solid rgba(26, 188, 156, 0.1)'
        }}>
          <Button 
            onClick={() => setOpenAssignTaskDialog(false)}
            sx={{ 
              color: '#7f8c8d',
              fontWeight: 500,
              px: 3,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                background: 'rgba(127, 140, 141, 0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveTask}
            variant="contained"
            disabled={!taskForm.title || !taskForm.description}
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
              },
              '&:disabled': {
                background: '#bdc3c7',
                boxShadow: 'none'
              }
            }}
          >
            Assign Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog 
        open={openViewDetailsDialog} 
        onClose={() => setOpenViewDetailsDialog(false)} 
        maxWidth="md" 
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
            <Visibility sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Staff Details & Tasks
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          {selectedStaff && (
            <Box>
              {/* Staff Info Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, p: 3, background: 'rgba(26, 188, 156, 0.05)', borderRadius: 3, border: '1px solid rgba(26, 188, 156, 0.1)' }}>
                <Avatar sx={{ 
                  width: 64, 
                  height: 64, 
                  background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {selectedStaff.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>
                    {selectedStaff.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#7f8c8d', mb: 0.5 }}>
                    {selectedStaff.email}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Chip
                      label={selectedStaff.role}
                      size="small"
                      sx={{ background: '#1ABC9C', color: 'white', fontWeight: 'bold' }}
                    />
                    <Chip
                      label={selectedStaff.workloadStatus}
                      size="small"
                      sx={{ 
                        background: `linear-gradient(135deg, ${getWorkloadColor(selectedStaff.workloadStatus)} 0%, ${getWorkloadColor(selectedStaff.workloadStatus)}dd 100%)`,
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Tasks Section */}
              <Typography variant="h6" sx={{ mb: 3, color: '#2C3E50', fontWeight: 'bold' }}>
                Assigned Tasks
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {/* Mock tasks data */}
                {[
                  {
                    id: 1,
                    title: 'Inventory Count - Electronics Section',
                    description: 'Complete physical count of all electronics items in warehouse A',
                    status: 'completed',
                    priority: 'high',
                    assignedDate: '2024-01-10',
                    completedDate: '2024-01-12',
                    dueDate: '2024-01-15'
                  },
                  {
                    id: 2,
                    title: 'Restock Laptops',
                    description: 'Update stock levels for laptop inventory and prepare restock order',
                    status: 'in-progress',
                    priority: 'medium',
                    assignedDate: '2024-01-13',
                    dueDate: '2024-01-18'
                  },
                  {
                    id: 3,
                    title: 'Quality Check - Mobile Phones',
                    description: 'Perform quality inspection on newly received mobile phone shipment',
                    status: 'pending',
                    priority: 'low',
                    assignedDate: '2024-01-14',
                    dueDate: '2024-01-20'
                  }
                ].map((task) => (
                  <Card key={task.id} sx={{ mb: 2, borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.1)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>
                            {task.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 2 }}>
                            {task.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip
                              label={task.priority}
                              size="small"
                              sx={{ 
                                background: task.priority === 'high' ? '#e74c3c' : 
                                           task.priority === 'medium' ? '#f39c12' : '#27ae60',
                                color: 'white',
                                fontWeight: 'bold'
                              }}
                            />
                            <Chip
                              label={task.status}
                              size="small"
                              sx={{ 
                                background: task.status === 'completed' ? '#27ae60' : 
                                           task.status === 'in-progress' ? '#f39c12' : '#95a5a6',
                                color: 'white',
                                fontWeight: 'bold'
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          Assigned: {task.assignedDate}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          Due: {task.dueDate}
                        </Typography>
                        {task.completedDate && (
                          <Typography variant="caption" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                            Completed: {task.completedDate}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 4, 
          background: '#f8f9fa',
          borderRadius: '0 0 12px 12px',
          borderTop: '1px solid rgba(26, 188, 156, 0.1)'
        }}>
          <Button 
            onClick={() => setOpenViewDetailsDialog(false)}
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

      {/* Message Dialog */}
      <Dialog 
        open={openMessageDialog} 
        onClose={() => setOpenMessageDialog(false)} 
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
            <Message sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Send Message
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          {selectedStaff && (
            <Box>
              <Box sx={{ mb: 3, p: 3, background: 'rgba(26, 188, 156, 0.05)', borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.1)' }}>
                <Typography variant="h6" sx={{ mb: 1, color: '#2C3E50', fontWeight: 'bold' }}>
                  To: {selectedStaff.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  {selectedStaff.email}
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    placeholder="Enter message subject..."
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    placeholder="Type your message here..."
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      label="Priority"
                      defaultValue="normal"
                      sx={{ 
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e0e0e0',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1ABC9C',
                        }
                      }}
                    >
                      <MenuItem value="normal">📧 Normal</MenuItem>
                      <MenuItem value="important">⚠️ Important</MenuItem>
                      <MenuItem value="urgent">🚨 Urgent</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 4, 
          background: '#f8f9fa',
          borderRadius: '0 0 12px 12px',
          borderTop: '1px solid rgba(26, 188, 156, 0.1)'
        }}>
          <Button 
            onClick={() => setOpenMessageDialog(false)}
            sx={{ 
              color: '#7f8c8d',
              fontWeight: 500,
              px: 3,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                background: 'rgba(127, 140, 141, 0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              showNotification('Message sent successfully!');
              setOpenMessageDialog(false);
            }}
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
            Send Message
          </Button>
        </DialogActions>
      </Dialog>

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