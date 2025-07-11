import React, { useState, useEffect } from 'react';
import { 
  Box, Card, CardContent, Typography, Grid, Paper, Chip, 
  Select, MenuItem, FormControl, InputLabel, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, Inventory, Warning, Assessment, 
  FileDownload, FilterList, Refresh
} from '@mui/icons-material';
import './Analytics.css';
import { mockData } from './mockUserData';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [performancePeriod, setPerformancePeriod] = useState('weekly');

  // Use centralized inventory data
  const [inventoryData] = useState(mockData.inventory.items);

  // Mock user activity data
  const [userActivityData] = useState([
    { user: 'Jane Doe', role: 'Admin', actions: 45, loginTime: '2 hours ago', status: 'online' },
    { user: 'John Smith', role: 'Manager', actions: 32, loginTime: '1 hour ago', status: 'online' },
    { user: 'Mike Johnson', role: 'Staff', actions: 28, loginTime: '30 min ago', status: 'online' },
    { user: 'Sarah Wilson', role: 'Admin', actions: 15, loginTime: '1 day ago', status: 'offline' },
    { user: 'Alex Brown', role: 'Staff', actions: 12, loginTime: '2 days ago', status: 'offline' },
    { user: 'Lisa Davis', role: 'Manager', actions: 67, loginTime: '15 min ago', status: 'online' },
    { user: 'Tom Wilson', role: 'Staff', actions: 8, loginTime: '5 days ago', status: 'offline' },
    { user: 'Emma Thompson', role: 'Guest', actions: 3, loginTime: '1 week ago', status: 'offline' },
    { user: 'David Chen', role: 'Staff', actions: 89, loginTime: '5 min ago', status: 'online' },
    { user: 'Maria Garcia', role: 'Manager', actions: 23, loginTime: '3 hours ago', status: 'online' }
  ]);

  // Use centralized analytics data
  const [analyticsData] = useState({
    turnoverRates: mockData.inventory.turnoverByCategory.map(cat => ({
      category: cat.category,
      rate: cat.turnover,
      trend: cat.turnover > 5 ? 'up' : 'down',
      change: cat.turnover > 5 ? `+${Math.floor(Math.random() * 30)}%` : `-${Math.floor(Math.random() * 20)}%`
    })),
    monthlyTrends: mockData.analytics.monthlyTrends,
    performanceMetrics: mockData.analytics.performanceMetrics,
    topPerformers: {
      weekly: [
        { name: 'Laptop Dell XPS 13', sales: 45, revenue: 8325000, growth: '+18%', period: 'This Week' },
        { name: 'Wireless Mouse', sales: 38, revenue: 133000, growth: '+15%', period: 'This Week' },
        { name: 'USB Cable', sales: 67, revenue: 80400, growth: '+12%', period: 'This Week' },
        { name: 'Office Chair', sales: 23, revenue: 1035000, growth: '+10%', period: 'This Week' },
        { name: 'Desk Lamp', sales: 19, revenue: 161500, growth: '+8%', period: 'This Week' }
      ],
      monthly: [
        { name: 'Laptop Dell XPS 13', sales: 156, revenue: 28860000, growth: '+23%', period: 'This Month' },
        { name: 'Wireless Mouse', sales: 142, revenue: 497000, growth: '+18%', period: 'This Month' },
        { name: 'Office Chair', sales: 89, revenue: 4005000, growth: '+15%', period: 'This Month' },
        { name: 'USB Cable', sales: 234, revenue: 280800, growth: '+12%', period: 'This Month' },
        { name: 'Desk Lamp', sales: 67, revenue: 569500, growth: '+9%', period: 'This Month' }
      ],
      quarterly: [
        { name: 'Laptop Dell XPS 13', sales: 423, revenue: 78255000, growth: '+31%', period: 'This Quarter' },
        { name: 'Office Chair', sales: 267, revenue: 12015000, growth: '+28%', period: 'This Quarter' },
        { name: 'Wireless Mouse', sales: 389, revenue: 1361500, growth: '+25%', period: 'This Quarter' },
        { name: 'Printer HP LaserJet', sales: 89, revenue: 5785000, growth: '+22%', period: 'This Quarter' },
        { name: 'USB Cable', sales: 567, revenue: 680400, growth: '+19%', period: 'This Quarter' }
      ],
      yearly: [
        { name: 'Laptop Dell XPS 13', sales: 1247, revenue: 230695000, growth: '+45%', period: 'This Year' },
        { name: 'Office Chair', sales: 892, revenue: 40140000, growth: '+38%', period: 'This Year' },
        { name: 'Wireless Mouse', sales: 1156, revenue: 4046000, growth: '+35%', period: 'This Year' },
        { name: 'Printer HP LaserJet', sales: 334, revenue: 21710000, growth: '+32%', period: 'This Year' },
        { name: 'USB Cable', sales: 1892, revenue: 2270400, growth: '+28%', period: 'This Year' }
      ]
    },
    systemHealth: {
      activeUsers: 24,
      systemUptime: 99.2,
      avgResponseTime: 1.2,
      errorRate: 0.8
    },
    salesData: {
      dailySales: [
        { date: '2024-01-01', sales: 45, revenue: 1850000 },
        { date: '2024-01-02', sales: 52, revenue: 2100000 },
        { date: '2024-01-03', sales: 38, revenue: 1450000 },
        { date: '2024-01-04', sales: 61, revenue: 2500000 },
        { date: '2024-01-05', sales: 49, revenue: 1950000 },
        { date: '2024-01-06', sales: 55, revenue: 2250000 },
        { date: '2024-01-07', sales: 42, revenue: 1750000 },
        { date: '2024-01-08', sales: 78, revenue: 3500000 },
        { date: '2024-01-09', sales: 34, revenue: 1300000 },
        { date: '2024-01-10', sales: 89, revenue: 4000000 },
        { date: '2024-01-11', sales: 23, revenue: 1000000 },
        { date: '2024-01-12', sales: 67, revenue: 2800000 },
        { date: '2024-01-13', sales: 91, revenue: 4500000 },
        { date: '2024-01-14', sales: 28, revenue: 1200000 }
      ],
              categorySales: [
          { category: 'Electronics', sales: 234, revenue: 23000000, percentage: 45 },
          { category: 'Furniture', sales: 89, revenue: 6800000, percentage: 15 },
          { category: 'Office Supplies', sales: 289, revenue: 20000000, percentage: 40 }
        ],
              salesByItem: [
          { name: 'Laptop Dell XPS 13', category: 'Electronics', sales: 156, revenue: 28860000, margin: 15.2 },
          { name: 'Wireless Mouse', category: 'Electronics', sales: 142, revenue: 497000, margin: 22.5 },
          { name: 'Office Chair', category: 'Furniture', sales: 89, revenue: 4005000, margin: 18.7 },
          { name: 'USB Cable', category: 'Electronics', sales: 234, revenue: 280800, margin: 35.8 },
          { name: 'Desk Lamp', category: 'Furniture', sales: 67, revenue: 569500, margin: 25.3 },
          { name: 'Printer HP LaserJet', category: 'Electronics', sales: 23, revenue: 1495000, margin: 12.8 },
          { name: 'Notebook', category: 'Office Supplies', sales: 289, revenue: 130050, margin: 45.2 },
          { name: 'Pen Set', category: 'Office Supplies', sales: 156, revenue: 132600, margin: 38.9 },
          { name: 'Expensive Desk', category: 'Furniture', sales: 2, revenue: 270000, margin: 8.5 },
          { name: 'Paper Clips', category: 'Office Supplies', sales: 500, revenue: 125000, margin: 65.3 },
          { name: 'Old Model Phone', category: 'Electronics', sales: 0, revenue: 0, margin: 0 },
          { name: 'Monitor LG 24', category: 'Electronics', sales: 0, revenue: 0, margin: 0 }
        ]
    }
  });

  // Calculate analytics data
  const calculateAnalytics = () => {
    const totalValue = inventoryData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
    const lowStockItems = inventoryData.filter(item => item.quantity <= item.minStock).length;
    const outOfStockItems = inventoryData.filter(item => item.quantity === 0).length;

    // Category distribution
    const categoryData = inventoryData.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { value: 0, count: 0, items: [] };
      }
      acc[item.category].value += item.price * item.quantity;
      acc[item.category].count += item.quantity;
      acc[item.category].items.push(item);
      return acc;
    }, {});

    const categoryChartData = Object.keys(categoryData).map(category => ({
      name: category,
      value: categoryData[category].value,
      count: categoryData[category].count,
      fill: category === 'Electronics' ? '#1ABC9C' : category === 'Furniture' ? '#3498db' : '#e74c3c'
    }));

    // Stock level analysis
    const stockLevelData = inventoryData.map(item => ({
      name: item.name,
      current: item.quantity,
      minimum: item.minStock,
      status: item.quantity <= item.minStock ? 'Low' : item.quantity === 0 ? 'Out' : 'Good'
    }));

    // Top moving items (based on quantity)
    const topMovingItems = [...inventoryData]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map(item => ({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        value: item.price * item.quantity
      }));

    // Dead stock analysis (items not updated recently)
    const deadStockThreshold = 30; // days
    const deadStockItems = inventoryData.filter(item => {
      const lastUpdate = new Date(item.lastUpdated);
      const daysSinceUpdate = (new Date() - lastUpdate) / (1000 * 60 * 60 * 24);
      return daysSinceUpdate > deadStockThreshold;
    });

    // Supplier analysis
    const supplierData = inventoryData.reduce((acc, item) => {
      if (!acc[item.supplier]) {
        acc[item.supplier] = { count: 0, value: 0, items: [] };
      }
      acc[item.supplier].count += 1;
      acc[item.supplier].value += item.price * item.quantity;
      acc[item.supplier].items.push(item);
      return acc;
    }, {});

    const supplierChartData = Object.keys(supplierData).map(supplier => ({
      name: supplier,
      count: supplierData[supplier].count,
      value: supplierData[supplier].value
    }));

    return {
      totalValue,
      totalItems,
      lowStockItems,
      outOfStockItems,
      categoryChartData,
      stockLevelData,
      categoryData,
      topMovingItems,
      deadStockItems,
      supplierChartData
    };
  };

  const analytics = calculateAnalytics();

  const COLORS = ['#1ABC9C', '#3498db', '#e74c3c', '#f39c12', '#9b59b6'];

  const KPICard = ({ title, value, icon, subtitle, bgGradient }) => (
    <Card className="analytics-kpi-card" sx={{ background: bgGradient }}>
      <CardContent>
        <div className="kpi-content">
          <div className="kpi-text">
            <Typography variant="h4" component="div" className="kpi-value">
                          {title === "Total Inventory Value" && typeof value === 'number' && value >= 1000 
              ? `Ksh ${(value / 1000).toFixed(1)}K` 
              : value}
            </Typography>
            <Typography variant="body2" className="kpi-title">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" className="kpi-subtitle">
                {subtitle}
              </Typography>
            )}
          </div>
          <div className="kpi-icon">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <div className="analytics-overview">


      {/* Turnover Rate Analysis */}
      <div className="turnover-section">
        <Typography variant="h6" className="section-title">
          Turnover Rate Analysis
        </Typography>
        <div className="turnover-cards">
          {analyticsData.turnoverRates.map((item, index) => (
            <div key={index} className="turnover-card">
              <div className="turnover-header">
                <Typography variant="h6" className="turnover-category">
                  {item.category}
                </Typography>
                <div className={`trend-indicator ${item.trend}`}>
                  {item.trend === 'up' ? '↗' : '↘'}
                </div>
              </div>
              <div className="turnover-value">{item.rate}x</div>
              <div className="turnover-change">{item.change}</div>
              <div className="turnover-description">
                {item.trend === 'up' ? 'Improving' : 'Declining'} performance
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends Chart */}
      <div className="trends-section">
        <Typography variant="h6" className="section-title">
          Monthly Inventory Value & Turnover Trends
        </Typography>
        <div className="trends-chart">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={analyticsData.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.5} />
              <XAxis dataKey="month" stroke="#2C3E50" />
              <YAxis yAxisId="left" stroke="#1ABC9C" />
              <YAxis yAxisId="right" orientation="right" stroke="#e74c3c" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7' }} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="value" 
                stroke="#1ABC9C" 
                strokeWidth={3}
                name="Inventory Value ($)" 
                dot={{ fill: '#1ABC9C', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="turnover" 
                stroke="#e74c3c" 
                strokeWidth={3}
                name="Turnover Rate" 
                dot={{ fill: '#e74c3c', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

             {/* Sales Analytics Section */}
       <div className="sales-analytics-section">
         <Typography variant="h6" className="section-title">
           Sales Analytics
         </Typography>
         
         {/* Sales Charts Row */}
         <div className="sales-charts">
           <div className="sales-chart-card">
             <Typography variant="h6" className="chart-title">
               Daily Sales Trend (Last 7 Days)
             </Typography>
             <ResponsiveContainer width="100%" height={300}>
               <LineChart data={analyticsData.salesData.dailySales}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.5} />
                 <XAxis dataKey="date" stroke="#2C3E50" />
                 <YAxis yAxisId="left" stroke="#1ABC9C" />
                 <YAxis yAxisId="right" orientation="right" stroke="#e74c3c" />
                 <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7' }} />
                 <Legend />
                 <Line 
                   yAxisId="left"
                   type="monotone" 
                   dataKey="sales" 
                   stroke="#1ABC9C" 
                   strokeWidth={3}
                   name="Sales Count" 
                   dot={{ fill: '#1ABC9C', strokeWidth: 2, r: 4 }}
                 />
                 <Line 
                   yAxisId="right"
                   type="monotone" 
                   dataKey="revenue" 
                   stroke="#e74c3c" 
                   strokeWidth={3}
                   name="Revenue ($)" 
                   dot={{ fill: '#e74c3c', strokeWidth: 2, r: 4 }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>

           <div className="sales-chart-card">
             <Typography variant="h6" className="chart-title">
               Sales by Category
             </Typography>
             <ResponsiveContainer width="100%" height={300}>
               <PieChart>
                 <Pie
                   data={analyticsData.salesData.categorySales}
                   cx="50%"
                   cy="50%"
                   labelLine={false}
                   label={({ category, percentage }) => `${category} ${percentage}%`}
                   outerRadius={80}
                   fill="#8884d8"
                   dataKey="revenue"
                 >
                   {analyticsData.salesData.categorySales.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
               </PieChart>
             </ResponsiveContainer>
           </div>
         </div>

         {/* Detailed Sales Table */}
         <div className="sales-table-section">
           <Typography variant="h6" className="section-subtitle">
             Detailed Sales by Item
           </Typography>
           <div className="sales-table">
             <TableContainer>
               <Table>
                 <TableHead>
                   <TableRow>
                     <TableCell>Item Name</TableCell>
                     <TableCell>Category</TableCell>
                     <TableCell align="right">Sales Count</TableCell>
                     <TableCell align="right">Revenue</TableCell>
                     <TableCell align="right">Profit Margin</TableCell>
                     <TableCell align="center">Performance</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {analyticsData.salesData.salesByItem.map((item, index) => (
                     <TableRow key={index}>
                       <TableCell>
                         <div className="item-name">
                           <span className="category-badge">{item.category}</span>
                           {item.name}
                         </div>
                       </TableCell>
                       <TableCell>{item.category}</TableCell>
                       <TableCell align="right">{item.sales}</TableCell>
                       <TableCell align="right">Ksh {item.revenue.toLocaleString()}</TableCell>
                       <TableCell align="right">
                         <span className={`margin-badge ${item.margin > 20 ? 'high' : item.margin > 15 ? 'medium' : 'low'}`}>
                           {item.margin}%
                         </span>
                       </TableCell>
                       <TableCell align="center">
                         <div className="sales-performance-bar">
                           <div 
                             className="sales-performance-fill" 
                             style={{ width: `${(item.revenue / Math.max(...analyticsData.salesData.salesByItem.map(i => i.revenue))) * 100}%` }}
                           ></div>
                         </div>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
           </div>
         </div>
       </div>

       {/* Top Performers Table */}
       <div className="top-performers-section">
         <div className="performers-header">
           <Typography variant="h6" className="section-title">
             Top Performing Items
           </Typography>
           <div className="period-controls">
             <FormControl size="small" className="period-select">
               <InputLabel>Time Period</InputLabel>
               <Select
                 value={performancePeriod}
                 label="Time Period"
                 onChange={(e) => setPerformancePeriod(e.target.value)}
               >
                 <MenuItem value="weekly">Weekly</MenuItem>
                 <MenuItem value="monthly">Monthly</MenuItem>
                 <MenuItem value="quarterly">Quarterly</MenuItem>
                 <MenuItem value="yearly">Yearly</MenuItem>
               </Select>
             </FormControl>
           </div>
         </div>
         <div className="performers-table">
           <TableContainer>
             <Table>
               <TableHead>
                 <TableRow>
                   <TableCell>Item Name</TableCell>
                   <TableCell align="right">Sales Count</TableCell>
                   <TableCell align="right">Revenue</TableCell>
                   <TableCell align="right">Growth</TableCell>
                   <TableCell align="center">Performance</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {analyticsData.topPerformers[performancePeriod].map((item, index) => (
                   <TableRow key={index}>
                     <TableCell>
                       <div className="item-name">
                         <span className="rank-badge">{index + 1}</span>
                         <div className="item-details">
                           <div className="item-title">{item.name}</div>
                           <div className="period-indicator">{item.period}</div>
                         </div>
                       </div>
                     </TableCell>
                     <TableCell align="right">{item.sales}</TableCell>
                     <TableCell align="right">Ksh {item.revenue.toLocaleString()}</TableCell>
                     <TableCell align="right">
                       <span className={`growth-badge ${item.growth.includes('+') ? 'positive' : 'negative'}`}>
                         {item.growth}
                       </span>
                     </TableCell>
                     <TableCell align="center">
                       <div className="performance-bar">
                         <div 
                           className="performance-fill" 
                           style={{ width: `${Math.min(100, (index + 1) * 20)}%` }}
                         ></div>
                       </div>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
         </div>
       </div>
     </div>
   );

  const renderInventoryAnalytics = () => (
    <div className="inventory-analytics">
      <div className="filters-section">
        <div className="filter-group">
          <FormControl size="small" className="filter-control">
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              label="Date Range"
              onChange={(e) => setDateRange(e.target.value)}
            >
              <MenuItem value="7">Last 7 days</MenuItem>
              <MenuItem value="30">Last 30 days</MenuItem>
              <MenuItem value="90">Last 90 days</MenuItem>
              <MenuItem value="365">One year</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className="filter-control">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
              <MenuItem value="Office Supplies">Office Supplies</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            className="refresh-btn"
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="analytics-tables">
        <div className="table-card">
          <Typography variant="h6" className="table-title">
            Low Stock Items
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Current Stock</TableCell>
                  <TableCell>Minimum Stock</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryData
                  .filter(item => item.quantity <= item.minStock)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.minStock}</TableCell>
                      <TableCell>
                        <Chip 
                          label={item.quantity === 0 ? 'Out of Stock' : 'Low Stock'}
                          color={item.quantity === 0 ? 'error' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="table-card">
          <Typography variant="h6" className="table-title">
            Dead Stock Items (Not Updated in 30+ Days)
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Current Stock</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics.deadStockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>Ksh{(item.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                {analytics.deadStockItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No dead stock items found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );

  const renderUserAnalytics = () => (
    <div className="user-analytics">
      <div className="user-activity-chart">
        <Typography variant="h6" className="chart-title">
          User Activity Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.5} />
            <XAxis dataKey="user" stroke="#2C3E50" />
            <YAxis stroke="#2C3E50" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7' }} />
            <Legend />
            <Bar dataKey="actions" fill="#1ABC9C" name="Actions Performed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="user-table">
        <Typography variant="h6" className="table-title">
          User Activity Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userActivityData.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.user}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role}
                      color={user.role === 'Admin' ? 'error' : user.role === 'Manager' ? 'warning' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.actions}</TableCell>
                  <TableCell>{user.loginTime}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status}
                      color={user.status === 'online' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="reports-section">
      <div className="reports-header">
        <Typography variant="h6" className="section-title">
          Custom Reports
        </Typography>
        <div className="report-actions">
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            className="export-btn"
          >
            Export Report
          </Button>
        </div>
      </div>

      <div className="report-filters">
        <div className="filter-group">
          <FormControl size="small" className="filter-control">
            <InputLabel>Report Type</InputLabel>
            <Select defaultValue="inventory">
              <MenuItem value="inventory">Inventory Report</MenuItem>
              <MenuItem value="user-activity">User Activity Report</MenuItem>
              <MenuItem value="category-analysis">Category Analysis</MenuItem>
              <MenuItem value="dead-stock">Dead Stock Report</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className="filter-control">
            <InputLabel>Date Range</InputLabel>
            <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <MenuItem value="7">Last 7 days</MenuItem>
              <MenuItem value="30">Last 30 days</MenuItem>
              <MenuItem value="90">Last 90 days</MenuItem>
              <MenuItem value="365">Last year</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className="filter-control">
            <InputLabel>Category</InputLabel>
            <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
              <MenuItem value="Office Supplies">Office Supplies</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<FilterList />}
            className="generate-btn"
          >
            Generate Report
          </Button>
        </div>
      </div>

      <div className="report-preview">
        <Typography variant="body2" className="preview-text">
          Report preview will appear here after generation...
        </Typography>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'inventory':
        return renderInventoryAnalytics();
      case 'users':
        return renderUserAnalytics();
      case 'reports':
        return renderReports();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <Typography variant="h4" className="analytics-title">
          Analytics & Reports
        </Typography>
        <Typography variant="body1" className="analytics-subtitle">
          Comprehensive insights into your inventory and user activity
        </Typography>
      </div>

      <div className="analytics-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overall Analytics
        </button>
        <button 
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory Analytics
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Analytics
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Custom Reports
        </button>
      </div>

      <div className="analytics-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Analytics; 