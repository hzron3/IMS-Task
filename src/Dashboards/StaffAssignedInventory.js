//revamped to be Overview
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Chip, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  Snackbar, Alert, InputAdornment, Avatar
} from '@mui/material';
import { 
  AddCircle, RemoveCircle, Search, Warning, Inventory, 
  Assignment, CheckCircle, Schedule, Notifications,
  Person, Task, Analytics, Visibility
} from '@mui/icons-material';

// Import centralized mock data
import { mockData } from './mockUserData';

// Use centralized data for Mike Johnson
const mockStaffData = mockData.inventory.staffAssignments['Mike Johnson'];
console.log('mockStaffData:', mockStaffData); // Debug log
const mockAssignedItems = mockData.inventory.items.filter(item => 
  mockData.inventory.staffAssignments['Mike Johnson'].assignedItems.includes(item.id)
).map(item => ({
  id: item.id,
  name: item.name,
  category: item.category,
  currentStock: item.quantity,
  minStock: item.minStock,
  status: item.status,
  lastUpdated: item.lastUpdated
}));

const mockRecentActivity = mockData.inventory.recentActivity.filter(activity => 
  activity.user === 'Mike Johnson'
).map(activity => ({
  id: activity.id,
  action: activity.action,
  quantity: activity.quantity || '',
  timestamp: activity.timestamp,
  type: activity.type
}));

export default function StaffAssignedInventory() {
  const [items, setItems] = useState(mockAssignedItems);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [openStockDialog, setOpenStockDialog] = useState(false);
  const [stockAction, setStockAction] = useState('add');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleOpenStockDialog = (item, action) => {
    setSelectedItem(item);
    setStockAction(action);
    setQuantity('');
    setNote('');
    setOpenStockDialog(true);
  };

  const handleStockUpdate = () => {
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
              : 'In Stock',
            lastUpdated: new Date().toISOString()
          }
        : i
    ));
    setSnackbar({ open: true, message: 'Stock updated successfully!' });
    setOpenStockDialog(false);
  };

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

  return (
    <Box sx={{ width: '100%' }}>
      

      {/* Staff Profile Header */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              background: 'rgba(255,255,255,0.2)',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              {mockStaffData.avatar}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                {mockStaffData.name}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 1 }}>
                {mockStaffData.email}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Chip
                  label={mockStaffData.role}
                  sx={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
                />
                <Chip
                  label={mockStaffData.status}
                  sx={{ 
                    background: mockStaffData.status === 'online' ? '#27ae60' : '#f39c12',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {mockStaffData.performance}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Performance
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="row mb-4">
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
                    {mockStaffData.assignedItemsCount}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Assigned Items
                  </Typography>
                </Box>
                <Inventory sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    {mockStaffData.completedTasks}
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
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {mockStaffData.lowStockItems || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Low Stock Alerts
                  </Typography>
                </Box>
                <Warning sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    {mockStaffData.pendingTasks}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Pending Tasks
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="row">
        {/* Assigned Items Table */}
        <div className="col-12 col-lg-8 mb-3">
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                  Assigned Items
                </Typography>
                <TextField
                  placeholder="Search items..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
                  }}
                  sx={{ width: 250 }}
                />
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Item Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Current Stock</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Min Stock</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.filter(i =>
                      i.name.toLowerCase().includes(search.toLowerCase()) ||
                      i.category.toLowerCase().includes(search.toLowerCase())
                    ).map(item => (
                      <TableRow key={item.id} hover>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Last updated: {formatDateTime(item.lastUpdated)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={item.category} size="small" sx={{ background: '#1ABC9C', color: 'white' }} />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {item.currentStock}
                            </Typography>
                            {item.currentStock < item.minStock && (
                              <Warning color="warning" fontSize="small" />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>{item.minStock}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            size="small"
                            sx={{ 
                              background: getStatusColor(item.status),
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton 
                              color="success" 
                              size="small"
                              onClick={() => handleOpenStockDialog(item, 'add')}
                            >
                              <AddCircle />
                            </IconButton>
                            <IconButton 
                              color="error" 
                              size="small"
                              onClick={() => handleOpenStockDialog(item, 'remove')}
                            >
                              <RemoveCircle />
                            </IconButton>
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

        {/* Recent Activity & Quick Actions */}
        <div className="col-12 col-lg-4 mb-3">
          <div className="row">
            {/* Recent Activity */}
            <div className="col-12 mb-3">
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
                    Recent Activity
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {mockRecentActivity.map(activity => (
                      <Box key={activity.id} sx={{ 
                        p: 2, 
                        background: 'rgba(26, 188, 156, 0.05)', 
                        borderRadius: 2,
                        border: '1px solid rgba(26, 188, 156, 0.1)'
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 0.5 }}>
                          {activity.action}
                          {activity.quantity && (
                            <Chip 
                              label={activity.quantity} 
                              size="small" 
                              sx={{ 
                                ml: 1,
                                background: activity.quantity.startsWith('+') ? '#27ae60' : '#e74c3c',
                                color: 'white',
                                fontWeight: 'bold'
                              }} 
                            />
                          )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDateTime(activity.timestamp)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="col-12 mb-3">
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Inventory />}
                      fullWidth
                      sx={{ 
                        background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
                        '&:hover': { background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)' }
                      }}
                    >
                      View All Items
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Task />}
                      fullWidth
                      sx={{ 
                        borderColor: '#1ABC9C',
                        color: '#1ABC9C',
                        '&:hover': { borderColor: '#27ae60', color: '#27ae60' }
                      }}
                    >
                      View Tasks
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Analytics />}
                      fullWidth
                      sx={{ 
                        borderColor: '#2C3E50',
                        color: '#2C3E50',
                        '&:hover': { borderColor: '#34495e', color: '#34495e' }
                      }}
                    >
                      Performance Report
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Update Dialog */}
      <Dialog 
        open={openStockDialog} 
        onClose={() => setOpenStockDialog(false)}
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
            {stockAction === 'add' ? <AddCircle sx={{ color: 'white', fontSize: 20 }} /> : <RemoveCircle sx={{ color: 'white', fontSize: 20 }} />}
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {stockAction === 'add' ? 'Add Stock' : 'Remove Stock'} for {selectedItem?.name}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          <Box sx={{ mb: 3, p: 3, background: 'rgba(26, 188, 156, 0.05)', borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.1)' }}>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Current Stock: <strong>{selectedItem?.currentStock}</strong> | Min Stock: <strong>{selectedItem?.minStock}</strong>
            </Typography>
          </Box>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Note/Reason"
            value={note}
            onChange={e => setNote(e.target.value)}
            fullWidth
            multiline
            rows={3}
            placeholder="Enter reason for stock change (e.g., restock, damaged, issued to customer)..."
          />
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
            variant="contained"
            onClick={handleStockUpdate}
            disabled={!quantity}
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
            Update Stock
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
      >
        <Alert severity="success">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
} 