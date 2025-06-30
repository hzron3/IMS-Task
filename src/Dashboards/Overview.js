import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Paper, Chip, List,ListItem,ListItemText,ListItemIcon,Divider} from '@mui/material';
import {TrendingUp,Inventory,Warning,Cancel,Timeline,Assessment,Category,TrendingDown} from '@mui/icons-material';
import {LineChart,Line,BarChart,Bar,PieChart,Pie,Cell,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from 'recharts';

// Mock data for demonstration
const mockData = {
  kpis: {
    totalValue: 125000,
    totalItems: 2847,
    lowStock: 23,
    outOfStock: 5
  },
  turnoverByCategory: [
    { category: 'Electronics', turnover: 8.5, color: '#8884d8' },
    { category: 'Clothing', turnover: 12.3, color: '#82ca9d' },
    { category: 'Books', turnover: 6.2, color: '#ffc658' },
    { category: 'Home & Garden', turnover: 4.8, color: '#ff7300' },
    { category: 'Sports', turnover: 9.1, color: '#00C49F' },
    { category: 'Automotive', turnover: 3.4, color: '#FFBB28' }
  ],
  inventoryValueOverTime: [
    { month: 'Jan', value: 115000 },
    { month: 'Feb', value: 118000 },
    { month: 'Mar', value: 122000 },
    { month: 'Apr', value: 119000 },
    { month: 'May', value: 125000 },
    { month: 'Jun', value: 128000 }
  ],
  topMovingItems: [
    { name: 'Laptop Charger', sales: 156, category: 'Electronics' },
    { name: 'Wireless Mouse', sales: 142, category: 'Electronics' },
    { name: 'USB Cable', sales: 138, category: 'Electronics' },
    { name: 'T-Shirt XL', sales: 125, category: 'Clothing' },
    { name: 'Running Shoes', sales: 118, category: 'Sports' }
  ],
  deadStock: [
    { category: 'Electronics', percentage: 15 },
    { category: 'Clothing', percentage: 8 },
    { category: 'Books', percentage: 22 },
    { category: 'Home & Garden', percentage: 12 },
    { category: 'Sports', percentage: 5 },
    { category: 'Automotive', percentage: 18 }
  ],
  recentActivity: [
    { action: 'Item added', item: 'Wireless Headphones', time: '2 hours ago', user: 'Jane Doe', role: 'Admin' },
    { action: 'Stock updated', item: 'Laptop Charger', time: '4 hours ago', user: 'John Smith', role: 'Manager' },
    { action: 'Low stock alert', item: 'USB Cable', time: '6 hours ago', user: 'System', role: 'System' },
    { action: 'Item removed', item: 'Old Model Phone', time: '1 day ago', user: 'Mike Johnson', role: 'Staff' },
    { action: 'Category created', item: 'Smart Home', time: '2 days ago', user: 'Sarah Wilson', role: 'Admin' }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const KPICard = ({ title, value, icon, subtitle, bgGradient }) => (
  <Card sx={{ height: '100%', background: bgGradient }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
            {title === "Total Inventory Value" && typeof value === 'number' && value >= 1000 
              ? `$${(value / 1000).toFixed(1)}K` 
              : value}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ 
          color: 'white', 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          borderRadius: '50%', 
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Overview = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Dashboard Overview
      </Typography>

      {/* KPI Cards Row */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <KPICard
            title="Total Inventory Value"
            value={mockData.kpis.totalValue}
            icon={<TrendingUp />}
            subtitle="Current market value"
            bgGradient="linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <KPICard
            title="Total Items"
            value={mockData.kpis.totalItems}
            icon={<Inventory />}
            subtitle="Total Items"
            bgGradient="linear-gradient(135deg, #1ABC9C 0%,rgb(153, 157, 157) 100%)"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <KPICard
            title="Low Stock Alerts"
            value={mockData.kpis.lowStock}
            icon={<Warning />}
            subtitle="Below reorder level"
            bgGradient="linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <KPICard
            title="Out of Stock"
            value={mockData.kpis.outOfStock}
            icon={<Cancel />}
            subtitle="Zero quantity items"
            bgGradient="linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)"
          />
        </Box>
      </Box>

      {/* Charts Row 1 - Larger chart with smaller list */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '2 1 600px', minWidth: 400 }}>
          <Paper sx={{ 
            p: 3, 
            height: 350, 
            display: 'flex', 
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #F7FAFA 0%, #ECF0F1 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#2C3E50' }}>
              Stock Turnover Rate by Category
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.turnoverByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.5} />
                  <XAxis dataKey="category" stroke="#2C3E50" />
                  <YAxis stroke="#2C3E50" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7' }} />
                  <Legend />
                  <Bar dataKey="turnover" fill="#1ABC9C" name="Turnover Rate (times/year)" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Paper sx={{ 
            p: 3, 
            height: 350, 
            display: 'flex', 
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #F7FAFA 0%, #ECF0F1 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#2C3E50' }}>
              Top Moving Items
            </Typography>
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {mockData.topMovingItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <ListItem sx={{ py: 1 }}>
                    <ListItemIcon>
                      <Chip 
                        label={index + 1} 
                        size="small" 
                        sx={{ 
                          backgroundColor: index === 0 ? '#1ABC9C' : index === 1 ? '#E67E22' : index === 2 ? '#2C3E50' : '#BDC3C7',
                          color: 'white',
                          fontWeight: 'bold'
                        }} 
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.sales} units sold | ${item.category}`}
                      sx={{ 
                        '& .MuiListItemText-primary': { color: '#2C3E50', fontWeight: 'bold' },
                        '& .MuiListItemText-secondary': { color: '#34495e' }
                      }}
                    />
                  </ListItem>
                  {index < mockData.topMovingItems.length - 1 && <Divider sx={{ borderColor: '#BDC3C7' }} />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>

      {/* Charts Row 2 - Two equal charts */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 500px', minWidth: 400 }}>
          <Paper sx={{ 
            p: 3, 
            height: 320, 
            display: 'flex', 
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#2C3E50' }}>
              Inventory Value Over Time
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.inventoryValueOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.5} />
                  <XAxis dataKey="month" stroke="#2C3E50" />
                  <YAxis stroke="#2C3E50" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7', color: '#2C3E50' }} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#E67E22" 
                    strokeWidth={3}
                    name="Inventory Value"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 500px', minWidth: 400 }}>
          <Paper sx={{ 
            p: 3, 
            height: 320, 
            display: 'flex', 
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#2C3E50' }}>
              Dead Stock by Category
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.deadStock}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category}: ${percentage}%`}
                    outerRadius={80}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {mockData.deadStock.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#2C3E50', '#E67E22', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'][index]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7', color: '#2C3E50' }} formatter={(value) => [`${value}%`, 'Dead Stock']} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Recent Activity - Full width */}
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ 
          p: 3, 
          height: 300,
          background: 'linear-gradient(90deg, #2C3E50 0%, #1ABC9C 100%)',
          boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)'
        }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
            Recent Activity
          </Typography>
          <List sx={{ flexGrow: 1, overflow: 'auto', maxHeight: 220 }}>
            {mockData.recentActivity.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1 }}>
                  <ListItemIcon>
                    <Timeline sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={`${activity.item} - ${activity.time} - ${activity.user} (${activity.role})`}
                    sx={{ 
                      '& .MuiListItemText-primary': { color: 'white', fontWeight: 'bold' },
                      '& .MuiListItemText-secondary': { color: 'rgba(255,255,255,0.8)' }
                    }}
                  />
                </ListItem>
                {index < mockData.recentActivity.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Overview; 