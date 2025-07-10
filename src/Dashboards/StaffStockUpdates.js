import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Chip, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  Snackbar, Alert, InputAdornment, LinearProgress, Divider,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { 
  AddCircle, RemoveCircle, Search, Warning, Inventory, 
  TrendingUp, CheckCircle, Schedule, Notifications,
  Person, Task, Analytics, Visibility, FilterList,
  Download, Upload, History, Assessment
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockStockItems = [
  {
    id: 1,
    sku: 'ELEC-001',
    name: 'Laptop Dell XPS 13',
    category: 'Electronics',
    currentStock: 15,
    minStock: 10,
    maxStock: 50,
    unit: 'units',
    lastUpdated: '2024-01-15T09:30:00',
    status: 'In Stock',
    assignedTo: 'Mike Johnson'
  },
  {
    id: 2,
    sku: 'ELEC-002',
    name: 'Wireless Mouse',
    category: 'Electronics',
    currentStock: 8,
    minStock: 15,
    maxStock: 100,
    unit: 'units',
    lastUpdated: '2024-01-14T14:15:00',
    status: 'Low Stock',
    assignedTo: 'Mike Johnson'
  },
  {
    id: 3,
    sku: 'FURN-001',
    name: 'Office Chair',
    category: 'Furniture',
    currentStock: 25,
    minStock: 15,
    maxStock: 75,
    unit: 'units',
    lastUpdated: '2024-01-13T11:45:00',
    status: 'In Stock',
    assignedTo: 'Mike Johnson'
  },
  {
    id: 4,
    sku: 'ELEC-003',
    name: 'USB Cable',
    category: 'Electronics',
    currentStock: 0,
    minStock: 20,
    maxStock: 200,
    unit: 'units',
    lastUpdated: '2024-01-12T16:20:00',
    status: 'Out of Stock',
    assignedTo: 'Mike Johnson'
  },
  {
    id: 5,
    sku: 'FURN-002',
    name: 'Desk Lamp',
    category: 'Furniture',
    currentStock: 12,
    minStock: 10,
    maxStock: 60,
    unit: 'units',
    lastUpdated: '2024-01-15T08:20:00',
    status: 'In Stock',
    assignedTo: 'Mike Johnson'
  }
];

const mockStockMovements = [
  { date: '2024-01-15', received: 5, issued: 2, item: 'Laptop Dell XPS 13' },
  { date: '2024-01-14', received: 0, issued: 3, item: 'Wireless Mouse' },
  { date: '2024-01-13', received: 10, issued: 0, item: 'Office Chair' },
  { date: '2024-01-12', received: 0, issued: 15, item: 'USB Cable' },
  { date: '2024-01-11', received: 8, issued: 1, item: 'Desk Lamp' }
];

const mockStockChartData = [
  { name: 'Electronics', value: 23, fill: '#1ABC9C' },
  { name: 'Furniture', value: 37, fill: '#3498DB' },
  { name: 'Office Supplies', value: 15, fill: '#F39C12' },
  { name: 'IT Equipment', value: 25, fill: '#E74C3C' }
];

const mockMovementChartData = [
  { name: 'Mon', received: 5, issued: 2 },
  { name: 'Tue', received: 0, issued: 3 },
  { name: 'Wed', received: 10, issued: 0 },
  { name: 'Thu', received: 0, issued: 15 },
  { name: 'Fri', received: 8, issued: 1 }
];

export default function StaffStockUpdates() {
  const [items, setItems] = useState(mockStockItems);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [openStockDialog, setOpenStockDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [stockAction, setStockAction] = useState('add');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenStockDialog = (item, action) => {
    setSelectedItem(item);
    setStockAction(action);
    setQuantity('');
    setReason('');
    setNote('');
    setOpenStockDialog(true);
  };

  const handleOpenDetailsDialog = (item) => {
    setSelectedItem(item);
    setOpenDetailsDialog(true);
  };

  const handleStockUpdate = () => {
    if (!quantity || quantity <= 0) {
      setSnackbar({ open: true, message: 'Please enter a valid quantity', severity: 'error' });
      return;
    }

    setItems(items.map(i =>
      i.id === selectedItem.id
        ? {
            ...i,
            currentStock: stockAction === 'add'
              ? i.currentStock + Number(quantity)
              : Math.max(0, i.currentStock - Number(quantity)),
            status: (stockAction === 'add'
              ? i.currentStock + Number(quantity)
              : Math.max(0, i.currentStock - Number(quantity))) < i.minStock
              ? 'Low Stock'
              : (stockAction === 'add'
                ? i.currentStock + Number(quantity)
                : Math.max(0, i.currentStock - Number(quantity))) === 0
                ? 'Out of Stock'
                : 'In Stock',
            lastUpdated: new Date().toISOString()
          }
        : i
    ));
    setSnackbar({ 
      open: true, 
      message: `Stock ${stockAction === 'add' ? 'added' : 'removed'} successfully!`, 
      severity: 'success' 
    });
    setOpenStockDialog(false);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.category.toLowerCase().includes(search.toLowerCase()) ||
                         item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return '#27ae60';
      case 'Low Stock': return '#f39c12';
      case 'Out of Stock': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStockPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  return (
    <div className="container-fluid p-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', 
            color: 'white',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(44, 62, 80, 0.12)'
          }}>
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="mb-2" style={{ fontWeight: 'bold' }}>
                    <Inventory className="me-2" />
                    Stock Updates & Management
                  </h2>
                  <p className="mb-0 opacity-75">
                    Manage stock levels, record movements, and track inventory changes
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card h-100" style={{ 
            borderRadius: '15px', 
            border: '2px solid rgba(26, 188, 156, 0.15)',
            boxShadow: '0 8px 25px rgba(44, 62, 80, 0.12), 0 4px 10px rgba(26, 188, 156, 0.08)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 35px rgba(44, 62, 80, 0.15), 0 6px 15px rgba(26, 188, 156, 0.12)'
            }
          }}>
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
                }}>
                  <AddCircle sx={{ fontSize: 35, color: 'white' }} />
                </div>
              </div>
              <h5 className="card-title" style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: '1.1rem' }}>
                Stock Received Today
              </h5>
              <h3 className="text-success fw-bold" style={{ fontSize: '2.5rem', margin: '10px 0' }}>23</h3>
              <p className="text-muted small" style={{ fontSize: '0.9rem' }}>+15% from yesterday</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card h-100" style={{ 
            borderRadius: '15px', 
            border: '2px solid rgba(231, 76, 60, 0.15)',
            boxShadow: '0 8px 25px rgba(44, 62, 80, 0.12), 0 4px 10px rgba(231, 76, 60, 0.08)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            transition: 'all 0.3s ease'
          }}>
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
                }}>
                  <RemoveCircle sx={{ fontSize: 35, color: 'white' }} />
                </div>
              </div>
              <h5 className="card-title" style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: '1.1rem' }}>
                Stock Issued Today
              </h5>
              <h3 className="text-danger fw-bold" style={{ fontSize: '2.5rem', margin: '10px 0' }}>8</h3>
              <p className="text-muted small" style={{ fontSize: '0.9rem' }}>-12% from yesterday</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card h-100" style={{ 
            borderRadius: '15px', 
            border: '2px solid rgba(243, 156, 18, 0.15)',
            boxShadow: '0 8px 25px rgba(44, 62, 80, 0.12), 0 4px 10px rgba(243, 156, 18, 0.08)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            transition: 'all 0.3s ease'
          }}>
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0 4px 15px rgba(243, 156, 18, 0.3)'
                }}>
                  <Warning sx={{ fontSize: 35, color: 'white' }} />
                </div>
              </div>
              <h5 className="card-title" style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: '1.1rem' }}>
                Low Stock Alerts
              </h5>
              <h3 className="text-warning fw-bold" style={{ fontSize: '2.5rem', margin: '10px 0' }}>3</h3>
              <p className="text-muted small" style={{ fontSize: '0.9rem' }}>Requires attention</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card h-100" style={{ 
            borderRadius: '15px', 
            border: '2px solid rgba(26, 188, 156, 0.15)',
            boxShadow: '0 8px 25px rgba(44, 62, 80, 0.12), 0 4px 10px rgba(26, 188, 156, 0.08)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            transition: 'all 0.3s ease'
          }}>
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
                }}>
                  <CheckCircle sx={{ fontSize: 35, color: 'white' }} />
                </div>
              </div>
              <h5 className="card-title" style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: '1.1rem' }}>
                Updates Completed
              </h5>
              <h3 className="text-success fw-bold" style={{ fontSize: '2.5rem', margin: '10px 0' }}>15</h3>
              <p className="text-muted small" style={{ fontSize: '0.9rem' }}>This week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card" style={{ 
            borderRadius: '15px', 
            border: '2px solid rgba(26, 188, 156, 0.15)',
            boxShadow: '0 8px 25px rgba(44, 62, 80, 0.12), 0 4px 10px rgba(26, 188, 156, 0.08)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }}>
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-4 mb-3">
                  <TextField
                    fullWidth
                    placeholder="Search items by name, SKU, or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      label="Category"
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      <MenuItem value="Electronics">Electronics</MenuItem>
                      <MenuItem value="Furniture">Furniture</MenuItem>
                      <MenuItem value="Office Supplies">Office Supplies</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-5 mb-3">
                  <div className="d-flex gap-2">
                    <Button
                      variant="outlined"
                      startIcon={<History />}
                      sx={{ borderColor: '#1ABC9C', color: '#1ABC9C' }}
                    >
                      View History
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="row">
        {/* Stock Items Table */}
        <div className="col-lg-8 mb-4">
          <div className="card" style={{ 
            borderRadius: '15px', 
            border: '2px solid rgba(26, 188, 156, 0.15)',
            boxShadow: '0 8px 25px rgba(44, 62, 80, 0.12), 0 4px 10px rgba(26, 188, 156, 0.08)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }}>
            <div className="card-header" style={{ 
              background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
              color: 'white',
              borderBottom: '2px solid rgba(26, 188, 156, 0.2)',
              borderRadius: '15px 15px 0 0',
              padding: '1rem 1.5rem'
            }}>
              <h5 className="mb-0" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                <Inventory className="me-2" />
                Assigned Stock Items
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Item Name</th>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Category</th>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Current Stock</th>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Status</th>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Last Updated</th>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div>
                            <div style={{ fontWeight: 'bold', color: '#2C3E50' }}>
                              {item.name}
                            </div>
                            <small className="text-muted">SKU: {item.sku}</small>
                          </div>
                        </td>
                        <td>
                          <Chip
                            label={item.category}
                            size="small"
                            sx={{ background: '#e8f5e8', color: '#2C3E50', fontWeight: 'bold' }}
                          />
                        </td>
                        <td>
                          <div>
                            <div style={{ fontWeight: 'bold', color: '#2C3E50' }}>
                              {item.currentStock} {item.unit}
                            </div>
                            <div className="mt-1">
                              <LinearProgress
                                variant="determinate"
                                value={getStockPercentage(item.currentStock, item.maxStock)}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: '#e9ecef',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: getStockPercentage(item.currentStock, item.maxStock) < 20 ? '#e74c3c' : 
                                                   getStockPercentage(item.currentStock, item.maxStock) < 50 ? '#f39c12' : '#27ae60'
                                  }
                                }}
                              />
                              <small className="text-muted">
                                {getStockPercentage(item.currentStock, item.maxStock)}% of max
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Chip
                            label={item.status}
                            size="small"
                            sx={{
                              background: item.status === 'In Stock' ? '#e8f5e8' : 
                                         item.status === 'Low Stock' ? '#fff3cd' : '#f8d7da',
                              color: getStatusColor(item.status),
                              fontWeight: 'bold'
                            }}
                          />
                        </td>
                        <td>
                          <small className="text-muted">
                            {formatDateTime(item.lastUpdated)}
                          </small>
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenStockDialog(item, 'add')}
                              sx={{ color: '#27ae60' }}
                            >
                              <AddCircle />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenStockDialog(item, 'remove')}
                              sx={{ color: '#e74c3c' }}
                            >
                              <RemoveCircle />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDetailsDialog(item)}
                              sx={{ color: '#3498db' }}
                            >
                              <Visibility />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="col-lg-4 mb-4">
          <div className="row">
            {/* Stock Distribution Chart */}
            <div className="col-12 mb-4">
              <div className="card" style={{ 
                borderRadius: '15px', 
                border: '2px solid rgba(26, 188, 156, 0.15)',
                boxShadow: '0 8px 25px rgba(44, 62, 80, 0.12), 0 4px 10px rgba(26, 188, 156, 0.08)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }}>
                <div className="card-header" style={{ 
                  background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
                  color: 'white',
                  borderBottom: '2px solid rgba(26, 188, 156, 0.2)',
                  borderRadius: '15px 15px 0 0',
                  padding: '1rem 1.5rem'
                }}>
                  <h6 className="mb-0" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <Analytics className="me-2" />
                    Stock by Category
                  </h6>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={mockStockChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {mockStockChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Stock Movement Chart */}
            <div className="col-12 mb-4">
              <div className="card" style={{ 
                borderRadius: '15px', 
                border: '2px solid rgba(26, 188, 156, 0.15)',
                boxShadow: '0 8px 25px rgba(44, 62, 80, 0.12), 0 4px 10px rgba(26, 188, 156, 0.08)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }}>
                <div className="card-header" style={{ 
                  background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
                  color: 'white',
                  borderBottom: '2px solid rgba(26, 188, 156, 0.2)',
                  borderRadius: '15px 15px 0 0',
                  padding: '1rem 1.5rem'
                }}>
                  <h6 className="mb-0" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <TrendingUp className="me-2" />
                    Weekly Stock Movement
                  </h6>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={mockMovementChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="received" fill="#27ae60" name="Received" />
                      <Bar dataKey="issued" fill="#e74c3c" name="Issued" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Stock Movements - Full Width */}
      <div className="row">
        <div className="col-12">
          <div className="card" style={{ 
            borderRadius: '15px', 
            border: '2px solid rgba(26, 188, 156, 0.15)',
            boxShadow: '0 8px 25px rgba(44, 62, 80, 0.12), 0 4px 10px rgba(26, 188, 156, 0.08)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }}>
            <div className="card-header" style={{ 
              background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
              color: 'white',
              borderBottom: '2px solid rgba(26, 188, 156, 0.2)',
              borderRadius: '15px 15px 0 0',
              padding: '1rem 1.5rem'
            }}>
              <h6 className="mb-0" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                <History className="me-2" />
                Recent Stock Movements
              </h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Item Name</th>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Date</th>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Stock Received</th>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Stock Issued</th>
                      <th style={{ color: '#2C3E50', fontWeight: 'bold' }}>Net Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStockMovements.map((movement, index) => (
                      <tr key={index}>
                        <td>
                          <div style={{ fontWeight: 'bold', color: '#2C3E50' }}>
                            {movement.item}
                          </div>
                        </td>
                        <td>
                          <small className="text-muted">{movement.date}</small>
                        </td>
                        <td>
                          {movement.received > 0 ? (
                            <span className="text-success fw-bold">+{movement.received}</span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          {movement.issued > 0 ? (
                            <span className="text-danger fw-bold">-{movement.issued}</span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          <span className={`fw-bold ${movement.received - movement.issued >= 0 ? 'text-success' : 'text-danger'}`}>
                            {movement.received - movement.issued >= 0 ? '+' : ''}{movement.received - movement.issued}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Update Dialog */}
      <Dialog 
        open={openStockDialog} 
        onClose={() => setOpenStockDialog(false)}
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
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          py: 3,
          px: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {stockAction === 'add' ? (
              <AddCircle sx={{ color: 'white', fontSize: 20 }} />
            ) : (
              <RemoveCircle sx={{ color: 'white', fontSize: 20 }} />
            )}
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {stockAction === 'add' ? 'Add Stock' : 'Remove Stock'} - {selectedItem?.name}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {stockAction === 'add' 
                ? 'Record stock received for this item' 
                : 'Record stock issued or removed from this item'
              }
            </Typography>
          </Box>
          <div className="row">
            <div className="col-12 mb-3">
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {stockAction === 'add' ? <AddCircle color="success" /> : <RemoveCircle color="error" />}
                    </InputAdornment>
                  ),
                }}
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
            </div>
            <div className="col-12 mb-3">
              <FormControl fullWidth>
                <InputLabel>Reason</InputLabel>
                <Select
                  value={reason}
                  label="Reason"
                  onChange={(e) => setReason(e.target.value)}
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
                  <MenuItem value="restock">Restock</MenuItem>
                  <MenuItem value="damaged">Damaged/Lost</MenuItem>
                  <MenuItem value="issued">Issued to Department</MenuItem>
                  <MenuItem value="returned">Returned</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12">
              <TextField
                fullWidth
                label="Notes (Optional)"
                multiline
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any additional notes..."
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
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ 
          p: 4, 
          background: '#f8f9fa',
          borderRadius: '0 0 12px 12px',
          borderTop: '1px solid rgba(26, 188, 156, 0.1)'
        }}>
          <Button 
            onClick={() => setOpenStockDialog(false)}
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
            onClick={handleStockUpdate}
            variant="contained"
            disabled={!quantity || quantity <= 0 || !reason}
            sx={{ 
              background: stockAction === 'add' 
                ? 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)'
                : 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
              color: 'white',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: stockAction === 'add'
                ? '0 4px 12px rgba(39, 174, 96, 0.3)'
                : '0 4px 12px rgba(231, 76, 60, 0.3)',
              '&:hover': { 
                background: stockAction === 'add'
                  ? 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)'
                  : 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)',
                boxShadow: stockAction === 'add'
                  ? '0 6px 16px rgba(39, 174, 96, 0.4)'
                  : '0 6px 16px rgba(231, 76, 60, 0.4)'
              },
              '&:disabled': {
                background: '#bdc3c7',
                boxShadow: 'none'
              }
            }}
          >
            {stockAction === 'add' ? 'Add Stock' : 'Remove Stock'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Item Details Dialog */}
      <Dialog 
        open={openDetailsDialog} 
        onClose={() => setOpenDetailsDialog(false)}
        maxWidth="lg"
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
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          py: 3,
          px: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
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
            Item Details - {selectedItem?.name}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          {selectedItem && (
            <div className="row">
              {/* Item Information */}
              <div className="col-lg-6 mb-4">
                <div className="card" style={{ 
                  borderRadius: '12px', 
                  border: '1px solid rgba(26, 188, 156, 0.1)',
                  background: 'white'
                }}>
                  <div className="card-header" style={{ 
                    background: 'rgba(26, 188, 156, 0.05)',
                    borderBottom: '1px solid rgba(26, 188, 156, 0.1)',
                    borderRadius: '12px 12px 0 0',
                    padding: '1rem 1.5rem'
                  }}>
                    <h6 className="mb-0" style={{ color: '#2C3E50', fontWeight: 'bold' }}>
                      <Inventory className="me-2" />
                      Item Information
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">SKU</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                          {selectedItem.sku}
                        </Typography>
                      </div>
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">Category</Typography>
                        <Chip
                          label={selectedItem.category}
                          size="small"
                          sx={{ background: '#e8f5e8', color: '#2C3E50', fontWeight: 'bold' }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">Current Stock</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                          {selectedItem.currentStock} {selectedItem.unit}
                        </Typography>
                      </div>
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">Status</Typography>
                        <Chip
                          label={selectedItem.status}
                          size="small"
                          sx={{
                            background: selectedItem.status === 'In Stock' ? '#e8f5e8' : 
                                       selectedItem.status === 'Low Stock' ? '#fff3cd' : '#f8d7da',
                            color: getStatusColor(selectedItem.status),
                            fontWeight: 'bold'
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">Min Stock Level</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                          {selectedItem.minStock} {selectedItem.unit}
                        </Typography>
                      </div>
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">Max Stock Level</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                          {selectedItem.maxStock} {selectedItem.unit}
                        </Typography>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                          {formatDateTime(selectedItem.lastUpdated)}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock Analytics */}
              <div className="col-lg-6 mb-4">
                <div className="card" style={{ 
                  borderRadius: '12px', 
                  border: '1px solid rgba(26, 188, 156, 0.1)',
                  background: 'white'
                }}>
                  <div className="card-header" style={{ 
                    background: 'rgba(26, 188, 156, 0.05)',
                    borderBottom: '1px solid rgba(26, 188, 156, 0.1)',
                    borderRadius: '12px 12px 0 0',
                    padding: '1rem 1.5rem'
                  }}>
                    <h6 className="mb-0" style={{ color: '#2C3E50', fontWeight: 'bold' }}>
                      <Analytics className="me-2" />
                      Stock Analytics
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">Stock Level</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={getStockPercentage(selectedItem.currentStock, selectedItem.maxStock)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#e9ecef',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getStockPercentage(selectedItem.currentStock, selectedItem.maxStock) < 20 ? '#e74c3c' : 
                                             getStockPercentage(selectedItem.currentStock, selectedItem.maxStock) < 50 ? '#f39c12' : '#27ae60'
                            }
                          }}
                        />
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold', color: '#2C3E50' }}>
                          {getStockPercentage(selectedItem.currentStock, selectedItem.maxStock)}% of max capacity
                        </Typography>
                      </div>
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">Stock Health</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          {selectedItem.currentStock >= selectedItem.minStock ? (
                            <CheckCircle sx={{ color: '#27ae60', fontSize: 20 }} />
                          ) : (
                            <Warning sx={{ color: '#f39c12', fontSize: 20 }} />
                          )}
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                            {selectedItem.currentStock >= selectedItem.minStock ? 'Healthy' : 'Low Stock Alert'}
                          </Typography>
                        </Box>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">Assigned To</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                          {selectedItem.assignedTo}
                        </Typography>
                      </div>
                      <div className="col-6">
                        <Typography variant="body2" color="text.secondary">Unit</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                          {selectedItem.unit}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Stock Movements */}
              <div className="col-12">
                <div className="card" style={{ 
                  borderRadius: '12px', 
                  border: '1px solid rgba(26, 188, 156, 0.1)',
                  background: 'white'
                }}>
                  <div className="card-header" style={{ 
                    background: 'rgba(26, 188, 156, 0.05)',
                    borderBottom: '1px solid rgba(26, 188, 156, 0.1)',
                    borderRadius: '12px 12px 0 0',
                    padding: '1rem 1.5rem'
                  }}>
                    <h6 className="mb-0" style={{ color: '#2C3E50', fontWeight: 'bold' }}>
                      <History className="me-2" />
                      Recent Stock Movements
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead style={{ background: '#f8f9fa' }}>
                          <tr>
                            <th style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: '0.9rem' }}>Date</th>
                            <th style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: '0.9rem' }}>Action</th>
                            <th style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: '0.9rem' }}>Quantity</th>
                            <th style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: '0.9rem' }}>Reason</th>
                            <th style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: '0.9rem' }}>Updated By</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockStockMovements
                            .filter(movement => movement.item === selectedItem.name)
                            .slice(0, 5)
                            .map((movement, index) => (
                              <tr key={index}>
                                <td>
                                  <small className="text-muted">{movement.date}</small>
                                </td>
                                <td>
                                  {movement.received > 0 ? (
                                    <Chip label="Received" size="small" sx={{ background: '#e8f5e8', color: '#27ae60', fontWeight: 'bold' }} />
                                  ) : (
                                    <Chip label="Issued" size="small" sx={{ background: '#f8d7da', color: '#e74c3c', fontWeight: 'bold' }} />
                                  )}
                                </td>
                                <td>
                                  <span className={`fw-bold ${movement.received > 0 ? 'text-success' : 'text-danger'}`}>
                                    {movement.received > 0 ? `+${movement.received}` : `-${movement.issued}`}
                                  </span>
                                </td>
                                <td>
                                  <small className="text-muted">
                                    {movement.received > 0 ? 'Restock' : 'Department Issue'}
                                  </small>
                                </td>
                                <td>
                                  <small className="text-muted">Mike Johnson</small>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ 
          p: 4, 
          background: '#f8f9fa',
          borderRadius: '0 0 12px 12px',
          borderTop: '1px solid rgba(26, 188, 156, 0.1)'
        }}>
          <Button 
            onClick={() => setOpenDetailsDialog(false)}
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
            Close
          </Button>
          <Button 
            onClick={() => {
              setOpenDetailsDialog(false);
              handleOpenStockDialog(selectedItem, 'add');
            }}
            variant="contained"
            sx={{ 
              background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
              color: 'white',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)',
              '&:hover': { 
                background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                boxShadow: '0 6px 16px rgba(39, 174, 96, 0.4)'
              }
            }}
          >
            Add Stock
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
} 