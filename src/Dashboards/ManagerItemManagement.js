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

  const renderStockAlerts = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Stock Alerts & Low Inventory
      </Typography>

      {/* Alert Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {items.filter(item => item.currentStock === 0).length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Out of Stock
                  </Typography>
                </Box>
                <Warning sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {items.filter(item => item.currentStock < item.minStock && item.currentStock > 0).length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Low Stock
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {items.filter(item => item.currentStock <= item.minStock * 0.5).length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Critical Stock
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Critical Items Table */}
      <Card sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2C3E50' }}>
            Critical Stock Items - Immediate Action Required
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Current Stock</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Min Stock</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items
                  .filter(item => item.currentStock <= item.minStock)
                  .sort((a, b) => a.currentStock - b.currentStock)
                  .map((item) => (
                  <TableRow key={item.id} hover sx={{ 
                    bgcolor: item.currentStock === 0 ? 'rgba(231, 76, 60, 0.05)' : 'rgba(243, 156, 18, 0.05)'
                  }}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          SKU: {item.sku} | {item.category}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 'bold',
                        color: item.currentStock === 0 ? '#e74c3c' : '#f39c12'
                      }}>
                        {item.currentStock}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {item.minStock}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.currentStock === 0 ? 'Out of Stock' : 'Low Stock'}
                        size="small"
                        sx={{
                          bgcolor: item.currentStock === 0 ? '#e74c3c' : '#f39c12',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDateTime(item.lastUpdated)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Restock Item">
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateStock(item)}
                            sx={{ color: '#27ae60' }}
                          >
                            <AddCircle />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            sx={{ color: '#3498db' }}
                          >
                            <Visibility />
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

      {/* Restock Recommendations */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2C3E50' }}>
            Restock Recommendations
          </Typography>
          <Grid container spacing={2}>
            {items
              .filter(item => item.currentStock <= item.minStock)
              .map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Card sx={{ 
                  p: 2, 
                  border: '1px solid #e9ecef',
                  bgcolor: item.currentStock === 0 ? 'rgba(231, 76, 60, 0.02)' : 'rgba(243, 156, 18, 0.02)'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Chip
                      label={`Need ${item.minStock - item.currentStock} units`}
                      size="small"
                      sx={{
                        bgcolor: item.currentStock === 0 ? '#e74c3c' : '#f39c12',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Current: {item.currentStock} | Min: {item.minStock} | Supplier: {item.supplier}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => handleUpdateStock(item)}
                      sx={{ 
                        bgcolor: '#27ae60',
                        '&:hover': { bgcolor: '#2ecc71' }
                      }}
                    >
                      Restock Now
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: '#3498db', color: '#3498db' }}
                    >
                      Contact Supplier
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );

  const renderItemAnalytics = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Item Analytics & Insights
      </Typography>

      {/* Analytics Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {items.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Items
                  </Typography>
                </Box>
                <Inventory sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {categories.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Categories
                  </Typography>
                </Box>
                <Assessment sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #27ae60 0%, #f39c12 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Ksh {items.reduce((sum, item) => sum + (item.currentStock * item.price), 0).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Value
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {Math.round((items.filter(item => item.currentStock >= item.minStock).length / items.length) * 100)}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Stock Health
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Category Performance */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2C3E50' }}>
                Category Performance
              </Typography>
              {categories.map((category) => {
                const categoryItems = items.filter(item => item.category === category.name);
                const avgStockLevel = categoryItems.length > 0 
                  ? Math.round(categoryItems.reduce((sum, item) => sum + (item.currentStock / item.minStock * 100), 0) / categoryItems.length)
                  : 0;
                
                return (
                  <Box key={category.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {category.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1ABC9C' }}>
                        {avgStockLevel}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={avgStockLevel}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: 'rgba(26, 188, 156, 0.2)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: avgStockLevel >= 80 ? '#27ae60' : 
                                  avgStockLevel >= 60 ? '#f39c12' : '#e74c3c'
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {categoryItems.length} items
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Ksh {categoryItems.reduce((sum, item) => sum + (item.currentStock * item.price), 0).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2C3E50' }}>
                Stock Level Distribution
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Well Stocked (≥100% of min)
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(items.filter(item => item.currentStock >= item.minStock).length / items.length) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#27ae60' }}
                />
                <Typography variant="caption" color="text.secondary">
                  {items.filter(item => item.currentStock >= item.minStock).length} items
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Low Stock (50-99% of min)
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(items.filter(item => item.currentStock >= item.minStock * 0.5 && item.currentStock < item.minStock).length / items.length) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#f39c12' }}
                />
                <Typography variant="caption" color="text.secondary">
                  {items.filter(item => item.currentStock >= item.minStock * 0.5 && item.currentStock < item.minStock).length} items
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Critical Stock (&lt;50% of min)
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(items.filter(item => item.currentStock < item.minStock * 0.5 && item.currentStock > 0).length / items.length) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#e74c3c' }}
                />
                <Typography variant="caption" color="text.secondary">
                  {items.filter(item => item.currentStock < item.minStock * 0.5 && item.currentStock > 0).length} items
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Out of Stock (0 units)
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(items.filter(item => item.currentStock === 0).length / items.length) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#95a5a6' }}
                />
                <Typography variant="caption" color="text.secondary">
                  {items.filter(item => item.currentStock === 0).length} items
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Items by Value */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#2C3E50' }}>
            Top Items by Inventory Value
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Stock Level</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Unit Price</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total Value</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items
                  .sort((a, b) => (b.currentStock * b.price) - (a.currentStock * a.price))
                  .slice(0, 10)
                  .map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          SKU: {item.sku}
                        </Typography>
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
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {item.currentStock} / {item.minStock}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        Ksh {item.price.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1ABC9C' }}>
                        Ksh {(item.currentStock * item.price).toLocaleString()}
                      </Typography>
                    </TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
          <Tab label="Inventory" icon={<Inventory />} iconPosition="start" />
          <Tab label="Stock Alerts" icon={<Warning />} iconPosition="start" />
          <Tab label="Item Analytics" icon={<Analytics />} iconPosition="start" />
        </Tabs>
      </Box>

      {activeTab === 0 && renderItemManagement()}
      {activeTab === 1 && renderStockAlerts()}
      {activeTab === 2 && renderItemAnalytics()}

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