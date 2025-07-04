import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import { mockData } from './mockUserData';
import './CategoryOverview.css';

const CategoryOverview = () => {
  // Mock data for the assigned category (Furniture)
  const [assignedCategory] = useState({
    id: 2,
    name: "Office Supplies",
    description: "Office Supplies",
    itemCount: 4,
    totalValue: 228500,
    lastUpdated: "2024-01-16T17:45:00",
    assignedManager: "John Smith"
  });

  // Mock inventory data for the assigned category
  const [categoryItems, setCategoryItems] = useState([
    {
      id: 2,
      sku: 'SKU-002',
      name: "Office Chair",
      quantity: 25,
      minStock: 15,
      price: 45000,
      supplier: "Office Depot",
      lastUpdated: "2024-01-14T14:15:00",
      status: "In Stock"
    },
    {
      id: 4,
      sku: 'SKU-004',
      name: "Desk Lamp",
      quantity: 30,
      minStock: 10,
      price: 8500,
      supplier: "IKEA",
      lastUpdated: "2024-01-12T16:20:00",
      status: "In Stock"
    },
    {
      id: 11,
      sku: 'SKU-011',
      name: "Expensive Desk",
      quantity: 3,
      minStock: 2,
      price: 135000,
      supplier: "Herman Miller",
      lastUpdated: "2024-01-16T17:45:00",
      status: "Low Stock"
    },
    {
      id: 13,
      sku: 'SKU-013',
      name: "Filing Cabinet",
      quantity: 0,
      minStock: 5,
      price: 25000,
      supplier: "Staples",
      lastUpdated: "2024-01-10T09:30:00",
      status: "Out of Stock"
    }
  ]);

  // Mock staff data for the category
  const [assignedStaff] = useState([
    { id: 1, name: "Mike Johnson", email: "mike@inventorypro.com", tasksCompleted: 15, totalTasks: 20 },
    { id: 2, name: "Alex Brown", email: "alex@inventorypro.com", tasksCompleted: 8, totalTasks: 12 }
  ]);

  // Mock activity data
  const [recentActivity] = useState([
    { action: "Stock Update", description: "Updated Office Chair quantity to 25", time: "2 hours ago", user: "Mike Johnson" },
    { action: "Item Added", description: "Added new Expensive Desk item", time: "4 hours ago", user: "John Smith" },
    { action: "Low Stock Alert", description: "Filing Cabinet is out of stock", time: "1 day ago", user: "System" },
    { action: "Report Generated", description: "Monthly furniture inventory report", time: "2 days ago", user: "John Smith" }
  ]);

  // Calculate stock status distribution
  const stockStatusData = [
    { name: 'In Stock', value: 2, color: '#4CAF50' },
    { name: 'Low Stock', value: 1, color: '#FF9800' },
    { name: 'Out of Stock', value: 1, color: '#F44336' }
  ];

  // Stock levels data for bar chart
  const stockLevelsData = categoryItems.map(item => ({
    name: item.name,
    current: item.quantity,
    minimum: item.minStock
  }));

  // Trend data for line chart (last 7 days)
  const trendData = [
    { date: 'Jan 10', value: 58 },
    { date: 'Jan 11', value: 55 },
    { date: 'Jan 12', value: 52 },
    { date: 'Jan 13', value: 50 },
    { date: 'Jan 14', value: 48 },
    { date: 'Jan 15', value: 45 },
    { date: 'Jan 16', value: 43 }
  ];

  // Priority alerts
  const [priorityAlerts] = useState([
    { type: 'critical', message: 'Filing Cabinet is out of stock', item: 'SKU-013' },
    { type: 'warning', message: 'Expensive Desk is low on stock', item: 'SKU-011' }
  ]);

  const getStockStatus = (quantity, minStock) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= minStock) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'danger';
      default: return 'secondary';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="category-overview-container">
      {/* Header */}
      <div className="category-header">
        <div className="category-header-content">
          <h2>
            <i className="fas fa-layer-group me-2"></i>
            Category Overview - {assignedCategory.name}
          </h2>
          <div className="category-info">
            <span className="badge bg-primary">{assignedCategory.description}</span>
            <span className="last-updated">Last updated: {formatDateTime(assignedCategory.lastUpdated)}</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="row">
          <div className="col-md-3">
            <div className="card summary-card">
              <div className="card-body">
                <div className="card-icon bg-primary">
                  <i className="fas fa-boxes"></i>
                </div>
                <h5 className="card-title">Total Items</h5>
                <h3 className="card-value">{assignedCategory.itemCount}</h3>
                <p className="card-text">Items in category</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card summary-card">
              <div className="card-body">
                <div className="card-icon bg-success">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <h5 className="card-title">Total Value</h5>
                <h3 className="card-value">{formatCurrency(assignedCategory.totalValue)}</h3>
                <p className="card-text">Inventory worth</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card summary-card">
              <div className="card-body">
                <div className="card-icon bg-warning">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h5 className="card-title">Low Stock Alerts</h5>
                <h3 className="card-value">{priorityAlerts.length}</h3>
                <p className="card-text">Items need attention</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card summary-card">
              <div className="card-body">
                <div className="card-icon bg-info">
                  <i className="fas fa-users"></i>
                </div>
                <h5 className="card-title">Assigned Staff</h5>
                <h3 className="card-value">{assignedStaff.length}</h3>
                <p className="card-text">Team members</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="row">
          <div className="col-md-4">
            <div className="card chart-card">
              <div className="card-header">
                <h5><i className="fas fa-chart-pie me-2"></i>Stock Status Distribution</h5>
              </div>
                             <div className="card-body">
                 <ResponsiveContainer width="100%" height={240}>
                   <PieChart>
                    <Pie
                      data={stockStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stockStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card chart-card">
              <div className="card-header">
                <h5><i className="fas fa-chart-bar me-2"></i>Stock Levels</h5>
              </div>
                             <div className="card-body">
                 <ResponsiveContainer width="100%" height={240}>
                   <BarChart data={stockLevelsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#4CAF50" name="Current Stock" />
                    <Bar dataKey="minimum" fill="#FF9800" name="Minimum Stock" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card chart-card">
              <div className="card-header">
                <h5><i className="fas fa-chart-line me-2"></i>Stock Trend (7 Days)</h5>
              </div>
                             <div className="card-body">
                 <ResponsiveContainer width="100%" height={240}>
                   <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#2196F3" fill="#2196F3" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Alerts */}
      <div className="alerts-row">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5><i className="fas fa-exclamation-triangle me-2"></i>Priority Alerts</h5>
              </div>
              <div className="card-body">
                {priorityAlerts.length > 0 ? (
                  <div className="alerts-list">
                    {priorityAlerts.map((alert, index) => (
                      <div key={index} className={`alert alert-${alert.type === 'critical' ? 'danger' : 'warning'} d-flex align-items-center`}>
                        <i className={`fas fa-${alert.type === 'critical' ? 'times-circle' : 'exclamation-triangle'} me-2`}></i>
                        <div>
                          <strong>{alert.item}:</strong> {alert.message}
                        </div>
                        <button className="btn btn-sm btn-outline-primary ms-auto">Take Action</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-success">
                    <i className="fas fa-check-circle me-2"></i>
                    All items are properly stocked!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table and Recent Activity */}
      <div className="items-activity-row">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5><i className="fas fa-list me-2"></i>Category Items</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                                         <thead>
                       <tr>
                         <th>Item Name</th>
                         <th>SKU</th>
                         <th>Quantity</th>
                         <th>Status</th>
                         <th>Value</th>
                         <th>Last Updated</th>
                       </tr>
                     </thead>
                    <tbody>
                      {categoryItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td><span className="badge bg-secondary">{item.sku}</span></td>
                          <td>
                            <span className={`badge bg-${getStatusColor(item.status)}`}>
                              {item.quantity}
                            </span>
                          </td>
                          <td>
                            <span className={`badge bg-${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                                                     <td>{formatCurrency(item.price * item.quantity)}</td>
                           <td>{formatDateTime(item.lastUpdated)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5><i className="fas fa-clock me-2"></i>Recent Activity</h5>
              </div>
              <div className="card-body">
                <div className="activity-feed">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        <i className="fas fa-circle"></i>
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">{activity.action}</div>
                        <div className="activity-description">{activity.description}</div>
                        <div className="activity-meta">
                          <span className="activity-user">{activity.user}</span>
                          <span className="activity-time">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Management */}
      <div className="staff-management-row">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5><i className="fas fa-users me-2"></i>Assigned Staff</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {assignedStaff.map((staff) => (
                    <div key={staff.id} className="col-md-6">
                      <div className="staff-card">
                        <div className="staff-avatar">
                          <i className="fas fa-user"></i>
                        </div>
                        <div className="staff-info">
                          <h6>{staff.name}</h6>
                          <p>{staff.email}</p>
                          <div className="progress mb-2">
                            <div 
                              className="progress-bar" 
                              style={{width: `${(staff.tasksCompleted / staff.totalTasks) * 100}%`}}
                            >
                              {staff.tasksCompleted}/{staff.totalTasks} tasks
                            </div>
                          </div>
                          <small className="text-muted">
                            {Math.round((staff.tasksCompleted / staff.totalTasks) * 100)}% completion rate
                          </small>
                        </div>
                        <div className="staff-actions">
                          <button className="btn btn-sm btn-outline-primary">Assign Task</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryOverview; 