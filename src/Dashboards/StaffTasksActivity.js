import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Chip, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { Task, CheckCircle, TrendingUp, Assignment, Schedule, Warning, Done, MoreHoriz } from '@mui/icons-material';

// Mock data
const mockTasks = [
  { id: 1, title: 'Stock count for Electronics', status: 'Pending', priority: 'High', dueDate: '2024-06-20', assignedBy: 'Manager Smith', description: 'Verify and update stock levels for all electronics.', completed: false },
  { id: 2, title: 'Restock USB Cables', status: 'In Progress', priority: 'Medium', dueDate: '2024-06-21', assignedBy: 'Manager Smith', description: 'Restock all USB cables in bin A3.', completed: false },
  { id: 3, title: 'Quality check: Office Chairs', status: 'Completed', priority: 'Low', dueDate: '2024-06-18', assignedBy: 'Manager Smith', description: 'Inspect all office chairs for defects.', completed: true },
  { id: 4, title: 'Organize Furniture Section', status: 'Pending', priority: 'Low', dueDate: '2024-06-22', assignedBy: 'Manager Smith', description: 'Rearrange and label all items in the furniture section.', completed: false },
];

const mockActivity = [
  { id: 1, action: 'Completed task: Quality check: Office Chairs', timestamp: '2024-06-18T15:00:00' },
  { id: 2, action: 'Updated stock for Wireless Mouse', timestamp: '2024-06-19T10:30:00' },
  { id: 3, action: 'Marked task as in progress: Restock USB Cables', timestamp: '2024-06-19T09:00:00' },
  { id: 4, action: 'Received low stock alert for USB Cable', timestamp: '2024-06-18T08:00:00' },
];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function StaffTasksActivity() {
  const [tasks, setTasks] = useState(mockTasks);
  const [activity] = useState(mockActivity);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [openMarkAllDialog, setOpenMarkAllDialog] = useState(false);
  const [openExtensionDialog, setOpenExtensionDialog] = useState(false);
  const [extensionTask, setExtensionTask] = useState(null);
  const [extensionReason, setExtensionReason] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const pendingTasks = tasks.filter(t => !t.completed && t.status !== 'Completed').length;
  const completedTasks = tasks.filter(t => t.completed || t.status === 'Completed').length;
  const completionRate = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const handleMarkComplete = (task) => {
    setTaskToComplete(task);
    setOpenConfirmDialog(true);
  };

  const confirmMarkComplete = () => {
    if (taskToComplete) {
      setTasks(tasks.map(t => t.id === taskToComplete.id ? { ...t, status: 'Completed', completed: true } : t));
      setSnackbar({ open: true, message: 'Task marked as completed!', severity: 'success' });
    }
    setOpenConfirmDialog(false);
    setTaskToComplete(null);
  };

  const cancelMarkComplete = () => {
    setOpenConfirmDialog(false);
    setTaskToComplete(null);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setOpenTaskDialog(true);
  };

  // Quick Actions Handlers
  const handleMarkAllComplete = () => {
    setOpenMarkAllDialog(true);
  };

  const confirmMarkAllComplete = () => {
    const pendingTasks = tasks.filter(t => !t.completed && t.status !== 'Completed');
    if (pendingTasks.length > 0) {
      setTasks(tasks.map(t => ({ ...t, status: 'Completed', completed: true })));
      setSnackbar({ open: true, message: `All ${pendingTasks.length} pending tasks marked as completed!`, severity: 'success' });
    } else {
      setSnackbar({ open: true, message: 'No pending tasks to complete!', severity: 'info' });
    }
    setOpenMarkAllDialog(false);
  };

  const handleRequestExtension = () => {
    const pendingTasks = tasks.filter(t => !t.completed && t.status !== 'Completed');
    if (pendingTasks.length > 0) {
      setExtensionTask(pendingTasks[0]); // Default to first pending task
      setOpenExtensionDialog(true);
    } else {
      setSnackbar({ open: true, message: 'No pending tasks to request extension for!', severity: 'info' });
    }
  };

  const submitExtensionRequest = () => {
    if (extensionTask && extensionReason.trim()) {
      setSnackbar({ open: true, message: `Extension request submitted for "${extensionTask.title}"`, severity: 'success' });
      setOpenExtensionDialog(false);
      setExtensionTask(null);
      setExtensionReason('');
    } else {
      setSnackbar({ open: true, message: 'Please provide a reason for the extension request', severity: 'warning' });
    }
  };

  const cancelExtensionRequest = () => {
    setOpenExtensionDialog(false);
    setExtensionTask(null);
    setExtensionReason('');
  };

  return (
    <div className="container-fluid p-4">
      {/* Overview Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Task sx={{ fontSize: 40, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>{pendingTasks}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Pending Tasks</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>{completedTasks}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Completed Tasks</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #27ae60 0%, #f39c12 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>{completionRate}%</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Completion Rate</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Assignment sx={{ fontSize: 40, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>{tasks.length}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Tasks</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="row">
        {/* My Tasks Table */}
        <div className="col-lg-8 mb-4">
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
                My Tasks
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map(task => (
                      <TableRow key={task.id} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{task.title}</Typography>
                          <Typography variant="caption" color="text.secondary">Assigned by: {task.assignedBy}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={task.priority} size="small" sx={{ bgcolor: task.priority === 'High' ? '#e74c3c' : task.priority === 'Medium' ? '#f39c12' : '#27ae60', color: 'white', fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell>
                          <Chip label={task.status} size="small" sx={{ bgcolor: task.status === 'Completed' ? '#27ae60' : task.status === 'In Progress' ? '#f39c12' : '#95a5a6', color: 'white', fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{formatDate(task.dueDate)}</Typography>
                          {task.status !== 'Completed' && new Date(task.dueDate) < new Date() && (
                            <Chip label="Overdue" size="small" sx={{ bgcolor: '#e74c3c', color: 'white', fontWeight: 'bold', ml: 1 }} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {task.status !== 'Completed' && (
                              <IconButton color="success" size="small" onClick={() => handleMarkComplete(task)}>
                                <Done />
                              </IconButton>
                            )}
                            <IconButton color="primary" size="small" onClick={() => handleViewTask(task)}>
                              <MoreHoriz />
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

        {/* Activity Feed & Quick Actions */}
        <div className="col-lg-4 mb-4">
          <Card sx={{ borderRadius: 3, mb: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
                Activity Feed
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activity.map(act => (
                  <Box key={act.id} sx={{ p: 2, background: 'rgba(26, 188, 156, 0.05)', borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.1)' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 0.5 }}>{act.action}</Typography>
                    <Typography variant="caption" color="text.secondary">{formatDate(act.timestamp)}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<CheckCircle />} 
                  fullWidth 
                  onClick={handleMarkAllComplete}
                  sx={{ borderColor: '#1ABC9C', color: '#1ABC9C', '&:hover': { borderColor: '#27ae60', color: '#27ae60' } }}
                >
                  Mark All Complete
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<Schedule />} 
                  fullWidth 
                  onClick={handleRequestExtension}
                  sx={{ borderColor: '#2C3E50', color: '#2C3E50', '&:hover': { borderColor: '#34495e', color: '#34495e' } }}
                >
                  Request Extension
                </Button>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={cancelMarkComplete} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white', borderRadius: '12px 12px 0 0', py: 3, px: 4 }}>
          Confirm Task Completion
        </DialogTitle>
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          {taskToComplete && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2C3E50' }}>
                Are you sure you want to mark this task as completed?
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', color: '#1ABC9C' }}>
                "{taskToComplete.title}"
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#7f8c8d' }}>
                This action cannot be undone. The task will be moved to the completed section and your completion rate will be updated.
              </Typography>
              <Box sx={{ p: 2, background: 'rgba(26, 188, 156, 0.1)', borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.2)' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>Task Details:</Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}><strong>Priority:</strong> {taskToComplete.priority}</Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}><strong>Due Date:</strong> {formatDate(taskToComplete.dueDate)}</Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}><strong>Assigned By:</strong> {taskToComplete.assignedBy}</Typography>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, background: '#f8f9fa', borderRadius: '0 0 12px 12px', borderTop: '1px solid rgba(26, 188, 156, 0.1)' }}>
          <Button onClick={cancelMarkComplete} sx={{ color: '#7f8c8d', fontWeight: 500, px: 3, py: 1.5, borderRadius: 2, '&:hover': { background: 'rgba(127, 140, 141, 0.1)' } }}>
            Cancel
          </Button>
          <Button onClick={confirmMarkComplete} variant="contained" sx={{ background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)', color: 'white', fontWeight: 500, px: 3, py: 1.5, borderRadius: 2, '&:hover': { background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)' } }}>
            Mark as Completed
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task Details Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white', borderRadius: '12px 12px 0 0', py: 3, px: 4 }}>
          Task Details
        </DialogTitle>
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          {selectedTask && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{selectedTask.title}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>{selectedTask.description}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><strong>Priority:</strong> {selectedTask.priority}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><strong>Status:</strong> {selectedTask.status}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><strong>Due Date:</strong> {formatDate(selectedTask.dueDate)}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}><strong>Assigned By:</strong> {selectedTask.assignedBy}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, background: '#f8f9fa', borderRadius: '0 0 12px 12px', borderTop: '1px solid rgba(26, 188, 156, 0.1)' }}>
          <Button onClick={() => setOpenTaskDialog(false)} sx={{ color: '#7f8c8d', fontWeight: 500, px: 3, py: 1.5, borderRadius: 2, '&:hover': { background: 'rgba(127, 140, 141, 0.1)' } }}>Close</Button>
        </DialogActions>
      </Dialog>



      {/* Mark All Complete Confirmation Dialog */}
      <Dialog open={openMarkAllDialog} onClose={() => setOpenMarkAllDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white', borderRadius: '12px 12px 0 0', py: 3, px: 4 }}>
          Confirm Bulk Completion
        </DialogTitle>
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2C3E50' }}>
            Are you sure you want to mark all pending tasks as completed?
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#7f8c8d' }}>
            This action will mark all {pendingTasks} pending tasks as completed. This action cannot be undone.
          </Typography>
          <Box sx={{ p: 2, background: 'rgba(26, 188, 156, 0.1)', borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.2)' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>Tasks that will be completed:</Typography>
            {tasks.filter(t => !t.completed && t.status !== 'Completed').map(task => (
              <Typography key={task.id} variant="body2" sx={{ mb: 0.5, color: '#1ABC9C' }}>• {task.title}</Typography>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, background: '#f8f9fa', borderRadius: '0 0 12px 12px', borderTop: '1px solid rgba(26, 188, 156, 0.1)' }}>
          <Button onClick={() => setOpenMarkAllDialog(false)} sx={{ color: '#7f8c8d', fontWeight: 500, px: 3, py: 1.5, borderRadius: 2, '&:hover': { background: 'rgba(127, 140, 141, 0.1)' } }}>
            Cancel
          </Button>
          <Button onClick={confirmMarkAllComplete} variant="contained" sx={{ background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)', color: 'white', fontWeight: 500, px: 3, py: 1.5, borderRadius: 2, '&:hover': { background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)' } }}>
            Mark All Complete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request Extension Dialog */}
      <Dialog open={openExtensionDialog} onClose={cancelExtensionRequest} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white', borderRadius: '12px 12px 0 0', py: 3, px: 4 }}>
          Request Task Extension
        </DialogTitle>
        <DialogContent sx={{ p: 4, background: '#f6fefb' }}>
          {extensionTask && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2C3E50' }}>
                Request Extension for Task
              </Typography>
              <Box sx={{ p: 2, background: 'rgba(26, 188, 156, 0.1)', borderRadius: 2, border: '1px solid rgba(26, 188, 156, 0.2)', mb: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1ABC9C', mb: 1 }}>{extensionTask.title}</Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}><strong>Priority:</strong> {extensionTask.priority}</Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}><strong>Due Date:</strong> {formatDate(extensionTask.dueDate)}</Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}><strong>Assigned By:</strong> {extensionTask.assignedBy}</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: '#2C3E50' }}>Reason for Extension:</Typography>
              <textarea
                value={extensionReason}
                onChange={(e) => setExtensionReason(e.target.value)}
                placeholder="Please provide a detailed reason for requesting an extension..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '12px',
                  border: '1px solid rgba(26, 188, 156, 0.3)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  background: 'white'
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, background: '#f8f9fa', borderRadius: '0 0 12px 12px', borderTop: '1px solid rgba(26, 188, 156, 0.1)' }}>
          <Button onClick={cancelExtensionRequest} sx={{ color: '#7f8c8d', fontWeight: 500, px: 3, py: 1.5, borderRadius: 2, '&:hover': { background: 'rgba(127, 140, 141, 0.1)' } }}>
            Cancel
          </Button>
          <Button onClick={submitExtensionRequest} variant="contained" sx={{ background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)', color: 'white', fontWeight: 500, px: 3, py: 1.5, borderRadius: 2, '&:hover': { background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)' } }}>
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
} 