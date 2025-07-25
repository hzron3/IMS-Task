import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Restore, 
  DeleteForever, 
  Visibility,
  Refresh,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { mockData } from './mockUserData';

const RecycleBin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [openPermanentDeleteDialog, setOpenPermanentDeleteDialog] = useState(false);
  const [itemToAction, setItemToAction] = useState(null);
  const [actionType, setActionType] = useState(''); // 'item' or 'category'

  // Get deleted items and categories from mock data
  const deletedItems = mockData.inventory.items.filter(item => item.isDeleted);
  const deletedCategories = mockData.inventory.categories.filter(cat => cat.isDeleted);

  const handleRestore = (item, type) => {
    setItemToAction(item);
    setActionType(type);
    setOpenRestoreDialog(true);
  };

  const handlePermanentDelete = (item, type) => {
    setItemToAction(item);
    setActionType(type);
    setOpenPermanentDeleteDialog(true);
  };

  const confirmRestore = () => {
    // restore logic
    console.log(`Restoring ${actionType}:`, itemToAction);
    setOpenRestoreDialog(false);
    setItemToAction(null);
    setActionType('');
  };

  const confirmPermanentDelete = () => {
    // permanent delete logic
    console.log(`Permanently deleting ${actionType}:`, itemToAction);
    setOpenPermanentDeleteDialog(false);
    setItemToAction(null);
    setActionType('');
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3, color: '#2C3E50' }}>
        <DeleteIcon sx={{ mr: 2, color: '#e74c3c' }} />
        Recycle Bin
      </Typography> 

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              color: '#7f8c8d',
              '&.Mui-selected': {
                color: '#2C3E50'
              }
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>Deleted Items</span>
                <Chip 
                  label={deletedItems.length} 
                  size="small" 
                  sx={{ 
                    backgroundColor: '#e74c3c', 
                    color: 'white',
                    fontSize: '0.7rem'
                  }} 
                />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>Deleted Categories</span>
                <Chip 
                  label={deletedCategories.length} 
                  size="small" 
                  sx={{ 
                    backgroundColor: '#f39c12', 
                    color: 'white',
                    fontSize: '0.7rem'
                  }} 
                />
              </Box>
            } 
          />
        </Tabs>
      </Paper>

      {/* Deleted Items Tab */}
      {activeTab === 0 && (
        <>
          {deletedItems.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <DeleteIcon sx={{ fontSize: 64, color: '#bdc3c7', mb: 2 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No Deleted Items
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Items that are soft-deleted will appear here for restoration or permanent deletion.
              </Typography>
            </Paper>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>SKU</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Item Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Deleted By</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Deleted Date</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deletedItems.map((item) => (
                    <TableRow key={item.id} sx={{ opacity: 0.8, '&:hover': { opacity: 1, backgroundColor: '#f8f9fa' } }}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {item.sku}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={item.category} 
                          size="small" 
                          sx={{ 
                            backgroundColor: '#1ABC9C', 
                            color: 'white',
                            fontWeight: 'bold'
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {item.deletedBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {formatDateTime(item.deletedAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="Restore Item">
                            <IconButton
                              color="primary"
                              onClick={() => handleRestore(item, 'item')}
                              sx={{ 
                                backgroundColor: 'rgba(26, 188, 156, 0.1)',
                                '&:hover': { backgroundColor: 'rgba(26, 188, 156, 0.2)' }
                              }}
                            >
                              <Restore />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Permanently">
                            <IconButton
                              color="error"
                              onClick={() => handlePermanentDelete(item, 'item')}
                              sx={{ 
                                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                                '&:hover': { backgroundColor: 'rgba(231, 76, 60, 0.2)' }
                              }}
                            >
                              <DeleteForever />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {/* Deleted Categories Tab */}
      {activeTab === 1 && (
        <>
          {deletedCategories.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <DeleteIcon sx={{ fontSize: 64, color: '#bdc3c7', mb: 2 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No Deleted Categories
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Categories that are soft-deleted will appear here for restoration or permanent deletion.
              </Typography>
            </Paper>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Deleted By</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Deleted Date</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deletedCategories.map((category) => (
                    <TableRow key={category.id} sx={{ opacity: 0.8, '&:hover': { opacity: 1, backgroundColor: '#f8f9fa' } }}>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {category.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {category.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {category.deletedBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="textSecondary">
                          {formatDateTime(category.deletedAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="Restore Category">
                            <IconButton
                              color="primary"
                              onClick={() => handleRestore(category, 'category')}
                              sx={{ 
                                backgroundColor: 'rgba(26, 188, 156, 0.1)',
                                '&:hover': { backgroundColor: 'rgba(26, 188, 156, 0.2)' }
                              }}
                            >
                              <Restore />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Permanently">
                            <IconButton
                              color="error"
                              onClick={() => handlePermanentDelete(category, 'category')}
                              sx={{ 
                                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                                '&:hover': { backgroundColor: 'rgba(231, 76, 60, 0.2)' }
                              }}
                            >
                              <DeleteForever />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {/* Restore Confirmation Dialog */}
      <Dialog 
        open={openRestoreDialog} 
        onClose={() => setOpenRestoreDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Restore />
          Restore {actionType === 'item' ? 'Item' : 'Category'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            This will restore the {actionType} and make it available again in the system.
          </Alert>
          <Typography>
            Are you sure you want to restore <strong>"{itemToAction?.name}"</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenRestoreDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={confirmRestore} 
            variant="contained" 
            sx={{ 
              background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)' }
            }}
            startIcon={<Restore />}
          >
            Restore
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permanent Delete Confirmation Dialog */}
      <Dialog 
        open={openPermanentDeleteDialog} 
        onClose={() => setOpenPermanentDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <DeleteForever />
          Permanently Delete {actionType === 'item' ? 'Item' : 'Category'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <strong>Warning:</strong> This action cannot be undone. The {actionType} will be permanently removed from the system.
          </Alert>
          <Typography>
            Are you sure you want to permanently delete <strong>"{itemToAction?.name}"</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenPermanentDeleteDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={confirmPermanentDelete} 
            variant="contained" 
            color="error"
            startIcon={<DeleteForever />}
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecycleBin; 