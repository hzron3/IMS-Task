import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Avatar, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip,
  Badge, LinearProgress, Divider, List, ListItem, ListItemText,
  ListItemAvatar, Switch, FormControlLabel, Alert, Snackbar
} from '@mui/material';
import {
  Add, Edit, Delete, Assignment, Person, TrendingUp, Warning,
  CheckCircle, Schedule, Notifications, Download, FilterList,
  Refresh, Visibility, AddCircle, RemoveCircle, AssignmentInd,
  Group, Task, Analytics, Inventory, LocalShipping, Assessment
} from '@mui/icons-material';

import './ManagerItemManagement.css';

const ManagerItemManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('items');
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [openStockDialog, setOpenStockDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [staffFilter, setStaffFilter] = useState('all');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Task creation state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium',
    category: ''
  });

  // Mock data for manager's assigned categories
  const [categories] = useState([
    {
      id: 1,
      name: "Electronics",
      totalItems: 45,
      lowStockItems: 8,
      avgStockLevel: 75,
      totalValue: 1250000,
      assignedStaff: 3
    },
    {
      id: 2,
      name: "Furniture",
      totalItems: 32,
      lowStockItems: 5,
      avgStockLevel: 82,
      totalValue: 890000,
      assignedStaff: 2
    }
  ]);

  const [items, setItems] = useState([
    {
      id: 1,
      sku: 'ELEC-001',
      name: 'Laptop Dell XPS 13',
      category: 'Electronics',
      currentStock: 15,
      minStock: 10,
      price: 185000,
      assignedStaff: 'John Doe',
      lastUpdated: '2024-01-15T09:30:00',
      status: 'In Stock'
    },
    {
      id: 2,
      sku: 'ELEC-002',
      name: 'Wireless Mouse',
      category: 'Electronics',
      currentStock: 8,
      minStock: 15,
      price: 3500,
      assignedStaff: 'Jane Smith',
      lastUpdated: '2024-01-14T14:15:00',
      status: 'Low Stock'
    },
    {
      id: 3,
      sku: 'FURN-001',
      name: 'Office Chair',
      category: 'Furniture',
      currentStock: 25,
      minStock: 15,
      price: 45000,
      assignedStaff: 'Mike Johnson',
      lastUpdated: '2024-01-13T11:45:00',
      status: 'In Stock'
    },
    {
      id: 4,
      sku: 'ELEC-003',
      name: 'USB Cable',
      category: 'Electronics',
      currentStock: 0,
      minStock: 20,
      price: 1200,
      assignedStaff: 'John Doe',
      lastUpdated: '2024-01-12T16:20:00',
      status: 'Out of Stock'
    },
    {
      id: 5,
      sku: 'FURN-002',
      name: 'Desk Lamp',
      category: 'Furniture',
      currentStock: 12,
      minStock: 10,
      price: 8500,
      assignedStaff: 'Sarah Wilson',
      lastUpdated: '2024-01-11T08:55:00',
      status: 'Low Stock'
    }
  ]);

  const [staff] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@inventorypro.com',
      assignedItems: 12,
      completedTasks: 8,
      pendingTasks: 2,
      status: 'online',
      avatar: 'JD',
      assignedCategories: ['Electronics'],
      lastActivity: '2024-01-15T09:30:00',
      workloadStatus: 'normal', // normal, busy, overloaded
      phone: '+254 700 123 456'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@inventorypro.com',
      assignedItems: 8,
      completedTasks: 6,
      pendingTasks: 1,
      status: 'online',
      avatar: 'JS',
      assignedCategories: ['Electronics'],
      lastActivity: '2024-01-15T10:15:00',
      workloadStatus: 'normal',
      phone: '+254 700 123 457'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@inventorypro.com',
      assignedItems: 15,
      completedTasks: 12,
      pendingTasks: 3,
      status: 'away',
      avatar: 'MJ',
      assignedCategories: ['Furniture'],
      lastActivity: '2024-01-15T08:45:00',
      workloadStatus: 'busy',
      phone: '+254 700 123 458'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@inventorypro.com',
      assignedItems: 10,
      completedTasks: 9,
      pendingTasks: 1,
      status: 'offline',
      avatar: 'SW',
      assignedCategories: ['Furniture'],
      lastActivity: '2024-01-14T16:20:00',
      workloadStatus: 'normal',
      phone: '+254 700 123 459'
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Update Laptop Stock',
      description: 'Check and update Dell XPS 13 stock levels',
      assignedTo: 'John Doe',
      dueDate: '2024-01-16',
      priority: 'high',
      status: 'pending',
      itemId: 1
    },
    {
      id: 2,
      title: 'Restock Wireless Mice',
      description: 'Order and restock wireless mouse inventory',
      assignedTo: 'Jane Smith',
      dueDate: '2024-01-17',
      priority: 'medium',
      status: 'in-progress',
      itemId: 2
    },
    {
      id: 3,
      title: 'Audit Office Chairs',
      description: 'Conduct physical count of office chairs',
      assignedTo: 'Mike Johnson',
      dueDate: '2024-01-18',
      priority: 'low',
      status: 'completed',
      itemId: 3
    }
  ]);

  const [activityFeed] = useState([
    {
      id: 1,
      action: 'Stock Updated',
      description: 'John Doe updated Dell XPS 13 stock to 15 units',
      timestamp: '2024-01-15T09:30:00',
      user: 'John Doe',
      type: 'stock_update'
    },
    {
      id: 2,
      action: 'Task Completed',
      description: 'Mike Johnson completed office chair audit',
      timestamp: '2024-01-15T08:45:00',
      user: 'Mike Johnson',
      type: 'task_completed'
    },
    {
      id: 3,
      action: 'Item Assigned',
      description: 'USB Cable assigned to John Doe',
      timestamp: '2024-01-15T08:30:00',
      user: 'Manager',
      type: 'assignment'
    },
    {
      id: 4,
      action: 'Low Stock Alert',
      description: 'Wireless Mouse stock below minimum level',
      timestamp: '2024-01-15T08:15:00',
      user: 'System',
      type: 'alert'
    }
  ]);

  // Helper functions
  const getStockStatus = (current, min) => {
    if (current === 0) return 'Out of Stock';
    if (current <= min) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return '#27ae60';
      case 'Low Stock': return '#f39c12';
      case 'Out of Stock': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return `${diffInMinutes} minutes ago`;
      }
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  const showNotification = (message) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
  };

  const getWorkloadColor = (status) => {
    switch (status) {
      case 'normal': return '#27ae60';
      case 'busy': return '#f39c12';
      case 'overloaded': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getWorkloadText = (status) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'busy': return 'Busy';
      case 'overloaded': return 'Overloaded';
      default: return 'Unknown';
    }
  };

  // Filtered data
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesStaff = staffFilter === 'all' || item.assignedStaff === staffFilter;
    
    return matchesSearch && matchesStatus && matchesStaff;
  });



  const renderItemManagement = () => (
    <Box>
      {/* Search and Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="In Stock">In Stock</MenuItem>
            <MenuItem value="Low Stock">Low Stock</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Staff</InputLabel>
          <Select
            value={staffFilter}
            label="Staff"
            onChange={(e) => setStaffFilter(e.target.value)}
          >
            <MenuItem value="all">All Staff</MenuItem>
            {staff.map((s) => (
              <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenItemDialog(true)}
          sx={{ bgcolor: '#1ABC9C', '&:hover': { bgcolor: '#27ae60' } }}
        >
          Add Item
        </Button>
      </Box>

      {/* Items Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Item Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Current Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Min Stock</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Assigned Staff</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.category}
                    size="small"
                    sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {item.currentStock}
                  </Typography>
                </TableCell>
                <TableCell align="right">{item.minStock}</TableCell>
                <TableCell>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      bgcolor: getStatusColor(item.status),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                      {item.assignedStaff.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    {item.assignedStaff}
                  </Box>
                </TableCell>
                <TableCell>{formatDateTime(item.lastUpdated)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Update Stock">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedItem(item);
                          setOpenStockDialog(true);
                        }}
                        sx={{ color: '#1ABC9C' }}
                      >
                        <AddCircle />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Item">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedItem(item);
                          setOpenItemDialog(true);
                        }}
                        sx={{ color: '#3498db' }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Assign Staff">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedItem(item);
                          setOpenAssignmentDialog(true);
                        }}
                        sx={{ color: '#f39c12' }}
                      >
                        <AssignmentInd />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderStaffManagement = () => (
    <Box>
      {/* Staff Management Header */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
        Staff Management
      </Typography>

      {/* Staff Cards */}
      <Grid container spacing={3}>
        {staff.map((member) => (
          <Grid item xs={12} sm={6} lg={4} key={member.id}>
            <Card sx={{ 
              borderRadius: 4, 
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              height: '100%',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                {/* Header Section */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          border: '2px solid white',
                          bgcolor: member.status === 'online' ? '#27ae60' : 
                                  member.status === 'away' ? '#f39c12' : '#95a5a6'
                        }}
                      />
                    }
                  >
                    <Avatar sx={{ 
                      width: 60, 
                      height: 60, 
                      bgcolor: '#1ABC9C',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {member.avatar}
                    </Avatar>
                  </Badge>
                  <Box sx={{ ml: 3, flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 'bold', 
                      color: '#2C3E50',
                      mb: 0.5,
                      fontSize: '1.1rem'
                    }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#7f8c8d', 
                      mb: 1.5,
                      fontSize: '0.85rem'
                    }}>
                      {member.email}
                    </Typography>
                    <Chip
                      label={getWorkloadText(member.workloadStatus)}
                      size="small"
                      sx={{
                        bgcolor: getWorkloadColor(member.workloadStatus),
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        height: 24
                      }}
                    />
                  </Box>
                </Box>

                {/* Categories Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ 
                    color: '#2C3E50', 
                    mb: 1.5, 
                    fontWeight: '600',
                    fontSize: '0.85rem'
                  }}>
                    Assigned Categories
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                    {member.assignedCategories.map((category, index) => (
                      <Chip
                        key={index}
                        label={category}
                        size="small"
                        sx={{
                          bgcolor: '#f8f9fa',
                          color: '#2C3E50',
                          fontSize: '0.75rem',
                          height: 24,
                          border: '1px solid #e9ecef'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                
                {/* Task Progress Section */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ 
                      color: '#2C3E50', 
                      fontWeight: '600',
                      fontSize: '0.85rem'
                    }}>
                      Task Progress
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#1ABC9C', 
                      fontWeight: 'bold',
                      fontSize: '0.85rem'
                    }}>
                      {Math.round((member.completedTasks / (member.completedTasks + member.pendingTasks)) * 100)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(member.completedTasks / (member.completedTasks + member.pendingTasks)) * 100}
                    sx={{ 
                      height: 6, 
                      borderRadius: 3, 
                      bgcolor: '#f1f3f4',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#1ABC9C',
                        borderRadius: 3
                      }
                    }}
                  />
                </Box>
                
                {/* Stats Section */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: 2, 
                  mb: 3,
                  p: 2,
                  bgcolor: '#f8f9fa',
                  borderRadius: 2
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ 
                      color: '#27ae60', 
                      fontWeight: 'bold',
                      mb: 0.5
                    }}>
                      {member.completedTasks}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#7f8c8d', 
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Completed
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ 
                      color: '#f39c12', 
                      fontWeight: 'bold',
                      mb: 0.5
                    }}>
                      {member.pendingTasks}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#7f8c8d', 
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Pending
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ 
                      color: '#3498db', 
                      fontWeight: 'bold',
                      mb: 0.5
                    }}>
                      {member.assignedItems}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#7f8c8d', 
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Items
                    </Typography>
                  </Box>
                </Box>

                {/* Last Activity */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ 
                    color: '#7f8c8d', 
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <Box sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: '#95a5a6' 
                    }} />
                    Last active: {formatDateTime(member.lastActivity)}
                  </Typography>
                </Box>
                
                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Task />}
                    onClick={() => {
                      setSelectedStaff(member);
                      setOpenTaskDialog(true);
                    }}
                    sx={{ 
                      bgcolor: '#1ABC9C',
                      color: 'white',
                      flex: 1,
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      height: 36,
                      '&:hover': {
                        bgcolor: '#27ae60'
                      }
                    }}
                  >
                    Assign Task
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => {
                      showNotification(`Viewing ${member.name}'s assigned items`);
                    }}
                    sx={{ 
                      borderColor: '#3498db', 
                      color: '#3498db',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      height: 36,
                      '&:hover': {
                        borderColor: '#2980b9',
                        bgcolor: 'rgba(52, 152, 219, 0.04)'
                      }
                    }}
                  >
                    View Items
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderTaskManagement = () => (
    <Box>
      {/* Task Management Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
          Task Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenTaskDialog(true)}
          sx={{ bgcolor: '#1ABC9C', '&:hover': { bgcolor: '#27ae60' } }}
        >
          Create Task
        </Button>
      </Box>

      {/* Task Columns */}
      <Grid container spacing={3}>
        {['pending', 'in-progress', 'completed'].map((status) => (
          <Grid item xs={12} md={4} key={status}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              height: 'fit-content'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                    {status.charAt(0).toUpperCase() + status.slice(1)} Tasks
                  </Typography>
                  <Chip 
                    label={tasks.filter(t => t.status === status).length}
                    size="small"
                    sx={{ bgcolor: '#1ABC9C', color: 'white', fontWeight: 'bold' }}
                  />
                </Box>
                <List sx={{ maxHeight: 500, overflow: 'auto' }}>
                  {tasks
                    .filter(task => task.status === status)
                    .map((task) => (
                      <ListItem 
                        key={task.id} 
                        sx={{ 
                          border: '1px solid #ecf0f1', 
                          borderRadius: 2, 
                          mb: 1,
                          flexDirection: 'column',
                          alignItems: 'flex-start'
                        }}
                      >
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                            {task.title}
                          </Typography>
                          <Chip
                            label={task.priority}
                            size="small"
                            sx={{
                              bgcolor: getPriorityColor(task.priority),
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '0.7rem'
                            }}
                          />
                        </Box>
                        
                        <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1, fontSize: '0.85rem' }}>
                          {task.description}
                        </Typography>
                        
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 20, height: 20, fontSize: '0.7rem', bgcolor: '#1ABC9C' }}>
                              {staff.find(s => s.name === task.assignedTo)?.avatar || 'U'}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: '#1ABC9C', fontWeight: 'bold', fontSize: '0.8rem' }}>
                              {task.assignedTo}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.8rem' }}>
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        {task.category && (
                          <Box sx={{ mb: 1 }}>
                            <Chip
                              label={task.category}
                              size="small"
                              sx={{
                                bgcolor: '#e3f2fd',
                                color: '#1976d2',
                                fontSize: '0.7rem'
                              }}
                            />
                          </Box>
                        )}
                        
                        {/* Quick Actions */}
                        {status === 'pending' && (
                          <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<CheckCircle />}
                              onClick={() => {
                                const updatedTasks = tasks.map(t => 
                                  t.id === task.id ? {...t, status: 'in-progress'} : t
                                );
                                setTasks(updatedTasks);
                                showNotification(`Task "${task.title}" moved to In Progress`);
                              }}
                              sx={{ 
                                borderColor: '#27ae60', 
                                color: '#27ae60',
                                fontSize: '0.7rem',
                                flex: 1
                              }}
                            >
                              Start
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Edit />}
                              onClick={() => {
                                setSelectedStaff(staff.find(s => s.name === task.assignedTo));
                                setNewTask({
                                  title: task.title,
                                  description: task.description,
                                  assignedTo: task.assignedTo,
                                  dueDate: task.dueDate,
                                  priority: task.priority,
                                  category: task.category || ''
                                });
                                setOpenTaskDialog(true);
                              }}
                              sx={{ 
                                borderColor: '#3498db', 
                                color: '#3498db',
                                fontSize: '0.7rem',
                                flex: 1
                              }}
                            >
                              Edit
                            </Button>
                          </Box>
                        )}
                        
                        {status === 'in-progress' && (
                          <Box sx={{ display: 'flex', gap: 1, width: '100%', mt: 1 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<CheckCircle />}
                              onClick={() => {
                                const updatedTasks = tasks.map(t => 
                                  t.id === task.id ? {...t, status: 'completed'} : t
                                );
                                setTasks(updatedTasks);
                                showNotification(`Task "${task.title}" marked as completed`);
                              }}
                              sx={{ 
                                borderColor: '#27ae60', 
                                color: '#27ae60',
                                fontSize: '0.7rem',
                                flex: 1
                              }}
                            >
                              Complete
                            </Button>
                          </Box>
                        )}
                      </ListItem>
                    ))}
                  {tasks.filter(task => task.status === status).length === 0 && (
                    <ListItem sx={{ textAlign: 'center', color: '#7f8c8d', fontStyle: 'italic' }}>
                      No {status} tasks
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderActivityFeed = () => (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#2C3E50' }}>
        Recent Activity
      </Typography>
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent>
          <List>
            {activityFeed.map((activity) => (
              <ListItem key={activity.id} sx={{ borderBottom: '1px solid #ecf0f1' }}>
                <ListItemAvatar>
                  <Avatar sx={{ 
                    bgcolor: activity.type === 'stock_update' ? '#1ABC9C' :
                             activity.type === 'task_completed' ? '#27ae60' :
                             activity.type === 'assignment' ? '#3498db' : '#f39c12'
                  }}>
                    {activity.type === 'stock_update' ? <AddCircle /> :
                     activity.type === 'task_completed' ? <CheckCircle /> :
                     activity.type === 'assignment' ? <Assignment /> : <Warning />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {activity.action}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                        {formatDateTime(activity.timestamp)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                        {activity.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#1ABC9C', fontWeight: 'bold' }}>
                        {activity.user}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box className="manager-item-management" sx={{ width: '100%', maxWidth: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4, color: '#2C3E50' }}>
        Item Management
      </Typography>

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[
            { key: 'items', label: 'Items', icon: <Inventory /> },
            { key: 'staff', label: 'Staff', icon: <Group /> },
            { key: 'tasks', label: 'Tasks', icon: <Task /> },
            { key: 'activity', label: 'Activity', icon: <Assessment /> }
          ].map((tab) => (
            <Button
              key={tab.key}
              startIcon={tab.icon}
              onClick={() => setActiveTab(tab.key)}
              sx={{
                bgcolor: activeTab === tab.key ? '#1ABC9C' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#2C3E50',
                '&:hover': {
                  bgcolor: activeTab === tab.key ? '#27ae60' : '#f8f9fa'
                },
                borderRadius: 2,
                px: 3,
                py: 1
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Tab Content */}
      {activeTab === 'items' && renderItemManagement()}
      {activeTab === 'staff' && renderStaffManagement()}
      {activeTab === 'tasks' && renderTaskManagement()}
      {activeTab === 'activity' && renderActivityFeed()}

      {/* Task Assignment Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
          color: 'white',
          borderRadius: '8px 8px 0 0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Task />
            <Typography variant="h6">
              {selectedStaff ? `Assign Task to ${selectedStaff.name}` : 'Create New Task'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="e.g., Update Laptop Stock Levels"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Description"
                multiline
                rows={3}
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Describe what needs to be done..."
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Assign To</InputLabel>
                <Select
                  value={newTask.assignedTo}
                  label="Assign To"
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                >
                  {staff.map((member) => (
                    <MenuItem key={member.id} value={member.name}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: '#1ABC9C' }}>
                          {member.avatar}
                        </Avatar>
                        {member.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newTask.category}
                  label="Category"
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTask.priority}
                  label="Priority"
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <MenuItem value="low">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27ae60' }} />
                      Low
                    </Box>
                  </MenuItem>
                  <MenuItem value="medium">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f39c12' }} />
                      Medium
                    </Box>
                  </MenuItem>
                  <MenuItem value="high">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#e74c3c' }} />
                      High
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => {
              setOpenTaskDialog(false);
              setNewTask({
                title: '',
                description: '',
                assignedTo: '',
                dueDate: '',
                priority: 'medium',
                category: ''
              });
            }}
            sx={{ color: '#7f8c8d' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              // Add new task to tasks array
              const taskToAdd = {
                id: tasks.length + 1,
                ...newTask,
                status: 'pending',
                itemId: null
              };
              setTasks([...tasks, taskToAdd]);
              setOpenTaskDialog(false);
              setNewTask({
                title: '',
                description: '',
                assignedTo: '',
                dueDate: '',
                priority: 'medium',
                category: ''
              });
              showNotification('Task assigned successfully!');
            }}
            variant="contained"
            sx={{ bgcolor: '#1ABC9C', '&:hover': { bgcolor: '#27ae60' } }}
            disabled={!newTask.title || !newTask.assignedTo}
          >
            Assign Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Stock Update Dialog */}
      <Dialog open={openStockDialog} onClose={() => setOpenStockDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Stock Level</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedItem.name} ({selectedItem.sku})
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#7f8c8d' }}>
                Current Stock: {selectedItem.currentStock} | Min Stock: {selectedItem.minStock}
              </Typography>
              <TextField
                fullWidth
                label="New Stock Level"
                type="number"
                defaultValue={selectedItem.currentStock}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Reason</InputLabel>
                <Select label="Reason" defaultValue="restock">
                  <MenuItem value="restock">Restock</MenuItem>
                  <MenuItem value="damaged">Damaged</MenuItem>
                  <MenuItem value="sold">Sold</MenuItem>
                  <MenuItem value="returned">Returned</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                placeholder="Additional notes..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStockDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              setOpenStockDialog(false);
              showNotification('Stock updated successfully!');
            }}
            variant="contained"
            sx={{ bgcolor: '#1ABC9C' }}
          >
            Update Stock
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManagerItemManagement; 