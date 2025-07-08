import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Avatar, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip,
  Badge, LinearProgress, Divider, List, ListItem, ListItemText,
  ListItemAvatar, ListItemIcon, Switch, FormControlLabel, Alert, Snackbar,
  Tabs, Tab, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
  Add, Edit, Delete, Assignment, Person, TrendingUp, Warning,
  CheckCircle, Schedule, Notifications, Download, FilterList,
  Refresh, Visibility, AddCircle, RemoveCircle, AssignmentInd,
  Group, Task, Analytics, Inventory, LocalShipping, Assessment,
  ExpandMore, Search, Sort, FilterAlt, AddBox, Edit as EditIcon,
  Delete as DeleteIcon, Assignment as AssignmentIcon, Visibility as VisibilityIcon,
  Message
} from '@mui/icons-material';

import './ManagerItemManagement.css';

const ManagerItemManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [openStockDialog, setOpenStockDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  
  // Form states
  const [itemForm, setItemForm] = useState({
    sku: '',
    name: '',
    category: '',
    currentStock: '',
    minStock: '',
    price: '',
    supplier: '',
    description: ''
  });

  const [stockUpdateForm, setStockUpdateForm] = useState({
    newStock: '',
    reason: 'restock',
    notes: ''
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
      status: 'In Stock',
      supplier: 'Dell Inc.',
      description: 'High-performance laptop for professional use'
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
      status: 'Low Stock',
      supplier: 'Logitech',
      description: 'Ergonomic wireless mouse'
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
      status: 'In Stock',
      supplier: 'Herman Miller',
      description: 'Ergonomic office chair with lumbar support'
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
      status: 'Out of Stock',
      supplier: 'Anker',
      description: 'High-speed USB-C cable'
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
      status: 'Low Stock',
      supplier: 'IKEA',
      description: 'LED desk lamp with adjustable brightness'
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
      workloadStatus: 'normal',
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

  // Helper functions
  const getStockStatus = (current, min) => {
    if (current === 0) return 'Out of Stock';
    if (current <= Math.floor(min * 0.5)) return 'Critical';
    if (current <= min) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return '#27ae60';
      case 'Low Stock': return '#f39c12';
      case 'Critical': return '#e74c3c';
      case 'Out of Stock': return '#c0392b';
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setItemForm({
      sku: '',
      name: '',
      category: '',
      currentStock: '',
      minStock: '',
      price: '',
      supplier: '',
      description: ''
    });
    setOpenItemDialog(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setItemForm({
      sku: item.sku,
      name: item.name,
      category: item.category,
      currentStock: item.currentStock.toString(),
      minStock: item.minStock.toString(),
      price: item.price.toString(),
      supplier: item.supplier,
      description: item.description
    });
    setOpenItemDialog(true);
  };

  const handleUpdateStock = (item) => {
    setSelectedItem(item);
    setStockUpdateForm({
      newStock: item.currentStock.toString(),
      reason: 'restock',
      notes: ''
    });
    setOpenStockDialog(true);
  };

  const handleAssignItem = (item) => {
    setSelectedItem(item);
    setOpenAssignmentDialog(true);
  };

  const handleSaveItem = () => {
    if (editingItem) {
      // Update existing item
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...itemForm, currentStock: parseInt(itemForm.currentStock), minStock: parseInt(itemForm.minStock), price: parseInt(itemForm.price) }
          : item
      ));
      showNotification('Item updated successfully!');
    } else {
      // Add new item
      const newItem = {
        id: items.length + 1,
        ...itemForm,
        currentStock: parseInt(itemForm.currentStock),
        minStock: parseInt(itemForm.minStock),
        price: parseInt(itemForm.price),
        assignedStaff: 'Unassigned',
        lastUpdated: new Date().toISOString(),
        status: getStockStatus(parseInt(itemForm.currentStock), parseInt(itemForm.minStock))
      };
      setItems([...items, newItem]);
      showNotification('Item added successfully!');
    }
    setOpenItemDialog(false);
  };

  const handleSaveStockUpdate = () => {
    if (selectedItem) {
      setItems(items.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              currentStock: parseInt(stockUpdateForm.newStock),
              lastUpdated: new Date().toISOString(),
              status: getStockStatus(parseInt(stockUpdateForm.newStock), item.minStock)
            }
          : item
      ));
      showNotification('Stock updated successfully!');
    }
    setOpenStockDialog(false);
  };

  // Assign item to staff
  const handleAssignToStaff = () => {
    if (selectedItem && selectedStaff) {
      setItems(items.map(item => 
        item.id === selectedItem.id 
          ? { ...item, assignedStaff: selectedStaff.name }
          : item
      ));
      showNotification('Item assigned successfully!');
    }
    setOpenAssignmentDialog(false);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const renderItemManagement = () => (
    <Box>
      {/* Search and Filters */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search items by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="In Stock">In Stock</MenuItem>
                  <MenuItem value="Low Stock">Low Stock</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddItem}
                  sx={{ 
                    bgcolor: '#1ABC9C',
                    '&:hover': { bgcolor: '#27ae60' },
                    borderRadius: 2
                  }}
                >
                  Add Item
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Item Details</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Stock Level</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Assigned Staff</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        SKU: {item.sku}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ksh {item.price.toLocaleString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {item.currentStock} / {item.minStock}
                      </Typography>
                      <Chip
                        label={item.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(item.status),
                          color: 'white',
                          fontWeight: 'bold',
                          mt: 0.5
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.category}
                      size="small"
                      sx={{
                        bgcolor: '#e3f2fd',
                        color: '#1976d2',
                        fontWeight: 'bold'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: '#1ABC9C' }}>
                        {item.assignedStaff.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="body2">
                        {item.assignedStaff}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDateTime(item.lastUpdated)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Update Stock">
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateStock(item)}
                          sx={{ color: '#1ABC9C' }}
                        >
                          <AddCircle />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Assign Staff">
                        <IconButton
                          size="small"
                          onClick={() => handleAssignItem(item)}
                          sx={{ color: '#f39c12' }}
                        >
                          <Assignment />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Item Details">
                        <IconButton
                          size="small"
                          onClick={() => handleEditItem(item)}
                          sx={{ color: '#3498db' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );

  const renderStaffManagement = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Staff Management
      </Typography>

      {/* Search and Filter Controls */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search staff by name..."
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status" defaultValue="all">
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="online">Online</MenuItem>
                  <MenuItem value="away">Away</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Workload</InputLabel>
                <Select label="Workload" defaultValue="all">
                  <MenuItem value="all">All Workloads</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="busy">Busy</MenuItem>
                  <MenuItem value="overloaded">Overloaded</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                startIcon={<Add />}
                fullWidth
                sx={{ bgcolor: '#1ABC9C', '&:hover': { bgcolor: '#27ae60' } }}
              >
                Assign Task
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Staff Cards */}
      <Grid container spacing={3}>
        {staff.map((member) => (
          <Grid item xs={12} md={6} key={member.id}>
            <Card sx={{ borderRadius: 3, p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar sx={{ width: 48, height: 48, bgcolor: '#1ABC9C', fontSize: '1.2rem' }}>
                    {member.avatar}
                  </Avatar>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: member.status === 'online' ? '#27ae60' : 
                               member.status === 'away' ? '#f39c12' : '#95a5a6',
                      border: '2px solid white',
                      position: 'absolute',
                      bottom: 0,
                      right: 0
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last active: {formatDateTime(member.lastActivity)}
                  </Typography>
                </Box>
              </Box>
              
              {/* Workload Status */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="body2">Workload:</Typography>
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
              
              {/* Performance Metrics */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Performance Metrics
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Task Completion Rate
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {Math.round((member.completedTasks / (member.completedTasks + member.pendingTasks)) * 100)}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Assigned Items
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {member.assignedItems}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              {/* Task Progress */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Task Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(member.completedTasks / (member.completedTasks + member.pendingTasks)) * 100}
                  sx={{ height: 6, borderRadius: 3 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {member.completedTasks} completed / {member.completedTasks + member.pendingTasks} total tasks
                </Typography>
              </Box>
              
              {/* Assigned Categories */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {member.assignedCategories.map(category => (
                  <Chip
                    key={category}
                    label={category}
                    size="small"
                    sx={{
                      bgcolor: '#e3f2fd',
                      color: '#1976d2',
                      fontWeight: 'bold'
                    }}
                  />
                ))}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Assignment />}
                  sx={{ borderRadius: 2 }}
                >
                  Assign Task
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Visibility />}
                  sx={{ borderRadius: 2 }}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Notifications />}
                  sx={{ borderRadius: 2 }}
                >
                  Message
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderQuickActions = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Quick Actions
      </Typography>
      
      {/* Priority Alerts */}
      {items.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').length > 0 && (
        <Card sx={{ mb: 3, borderRadius: 3, border: '2px solid #f39c12' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Warning sx={{ color: '#f39c12', fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                Priority Alerts
              </Typography>
              <Chip 
                label={items.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').length}
                size="small"
                sx={{ 
                  bgcolor: '#f39c12', 
                  color: 'white', 
                  fontWeight: 'bold',
                  ml: 'auto'
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Items requiring immediate attention
            </Typography>
            <List sx={{ p: 0 }}>
              {items.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock')
                .slice(0, 3).map(item => (
                <ListItem 
                  key={item.id} 
                  sx={{ 
                    px: 2, 
                    py: 1, 
                    mb: 1, 
                    border: '1px solid #f0f0f0', 
                    borderRadius: 2,
                    bgcolor: item.status === 'Out of Stock' ? 'rgba(231, 76, 60, 0.05)' : 'rgba(243, 156, 18, 0.05)'
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {item.currentStock} units remaining (Min: {item.minStock})
                      </Typography>
                    }
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleUpdateStock(item)}
                    sx={{ 
                      borderRadius: 2,
                      bgcolor: item.status === 'Out of Stock' ? '#e74c3c' : '#f39c12',
                      '&:hover': { bgcolor: item.status === 'Out of Stock' ? '#c0392b' : '#e67e22' },
                      fontWeight: 'bold',
                      px: 2
                    }}
                  >
                    Update Stock
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Quick Action Buttons */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2C3E50' }}>
            Common Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddItem}
                sx={{ 
                  py: 2.5,
                  borderRadius: 2,
                  bgcolor: '#1ABC9C',
                  '&:hover': { bgcolor: '#27ae60' },
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Add New Item
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Assignment />}
                sx={{ 
                  py: 2.5,
                  borderRadius: 2,
                  borderColor: '#1ABC9C',
                  color: '#1ABC9C',
                  '&:hover': { 
                    borderColor: '#27ae60',
                    bgcolor: 'rgba(26, 188, 156, 0.04)'
                  },
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Assign Tasks
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Assessment />}
                sx={{ 
                  py: 2.5,
                  borderRadius: 2,
                  borderColor: '#1ABC9C',
                  color: '#1ABC9C',
                  '&:hover': { 
                    borderColor: '#27ae60',
                    bgcolor: 'rgba(26, 188, 156, 0.04)'
                  },
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Generate Report
              </Button>
            </Grid>
          </Grid>
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
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ '& .MuiTab-root': { fontWeight: 'bold' } }}>
          <Tab label="Items" icon={<Inventory />} iconPosition="start" />
          <Tab label="Staff" icon={<Group />} iconPosition="start" />
          <Tab label="Quick Actions" icon={<Assessment />} iconPosition="start" />
        </Tabs>
      </Box>

      {activeTab === 0 && renderItemManagement()}
      {activeTab === 1 && renderStaffManagement()}
      {activeTab === 2 && renderQuickActions()}

      {/* Add/Edit Item Dialog */}
      <Dialog open={openItemDialog} onClose={() => setOpenItemDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingItem ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SKU"
                value={itemForm.sku}
                onChange={(e) => setItemForm({...itemForm, sku: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Item Name"
                value={itemForm.name}
                onChange={(e) => setItemForm({...itemForm, name: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={itemForm.category}
                  label="Category"
                  onChange={(e) => setItemForm({...itemForm, category: e.target.value})}
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
                label="Supplier"
                value={itemForm.supplier}
                onChange={(e) => setItemForm({...itemForm, supplier: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Current Stock"
                type="number"
                value={itemForm.currentStock}
                onChange={(e) => setItemForm({...itemForm, currentStock: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Minimum Stock"
                type="number"
                value={itemForm.minStock}
                onChange={(e) => setItemForm({...itemForm, minStock: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price (Ksh)"
                type="number"
                value={itemForm.price}
                onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={itemForm.description}
                onChange={(e) => setItemForm({...itemForm, description: e.target.value})}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenItemDialog(false)}
            sx={{ color: '#7f8c8d' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveItem}
            variant="contained"
            sx={{ bgcolor: '#1ABC9C', '&:hover': { bgcolor: '#27ae60' } }}
            disabled={!itemForm.name || !itemForm.sku || !itemForm.category}
          >
            {editingItem ? 'Update Item' : 'Add Item'}
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
                value={stockUpdateForm.newStock}
                onChange={(e) => setStockUpdateForm({...stockUpdateForm, newStock: e.target.value})}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Reason</InputLabel>
                <Select 
                  value={stockUpdateForm.reason}
                  label="Reason"
                  onChange={(e) => setStockUpdateForm({...stockUpdateForm, reason: e.target.value})}
                >
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
                value={stockUpdateForm.notes}
                onChange={(e) => setStockUpdateForm({...stockUpdateForm, notes: e.target.value})}
                placeholder="Additional notes..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStockDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveStockUpdate}
            variant="contained"
            sx={{ bgcolor: '#1ABC9C' }}
          >
            Update Stock
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assignment Dialog */}
      <Dialog open={openAssignmentDialog} onClose={() => setOpenAssignmentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Item to Staff</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {selectedItem.name} ({selectedItem.sku})
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#7f8c8d' }}>
                Currently assigned to: {selectedItem.assignedStaff}
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Assign To</InputLabel>
                <Select
                  value={selectedStaff ? selectedStaff.id : ''}
                  label="Assign To"
                  onChange={(e) => {
                    const staffMember = staff.find(s => s.id === e.target.value);
                    setSelectedStaff(staffMember);
                  }}
                >
                  {staff.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: '#1ABC9C' }}>
                          {member.avatar}
                        </Avatar>
                        {member.name} ({member.assignedItems} items)
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignmentDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAssignToStaff}
            variant="contained"
            sx={{ bgcolor: '#1ABC9C' }}
            disabled={!selectedStaff}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* notifications for stock updates */}
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