import React, { useState } from 'react';
import { 
  Box, Card, CardContent, Typography, Chip, 
  Select, MenuItem, FormControl, InputLabel, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, Paper, Tabs, Tab
} from '@mui/material';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  FileDownload, FilterList, Refresh
} from '@mui/icons-material';
import { mockData } from './mockUserData';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30');
  const [selectedCategory, setSelectedCategory] = useState('all');
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
      responseTime: 0.8,
      errorRate: 0.1
    }
  });

  const calculateAnalytics = () => {
    const totalItems = inventoryData.length;
    const lowStockItems = inventoryData.filter(item => item.quantity <= item.minStock).length;
    const outOfStockItems = inventoryData.filter(item => item.quantity === 0).length;
    const totalValue = inventoryData.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    return {
      totalItems,
      lowStockItems,
      outOfStockItems,
      totalValue
    };
  };

  const analytics = calculateAnalytics();

  const KPICard = ({ title, value, icon, subtitle, bgGradient }) => (
    <Card sx={{ 
      height: '100%', 
      background: bgGradient,
      borderRadius: { xs: 2, md: 3 }
    }}>
      <CardContent sx={{ 
        p: { xs: 2, md: 3 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: { xs: 'flex-start', md: 'center' }, 
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 0 }
        }}>
          <Box>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                lineHeight: { xs: 1.2, md: 1.4 }
              }}
            >
              {title === "Total Value" && typeof value === 'number' 
                ? new Intl.NumberFormat('en-KE', {
                    style: 'currency',
                    currency: 'KES',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(value)
              : value}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)', 
                mt: { xs: 0.5, md: 1 },
                fontSize: { xs: '0.75rem', md: '0.875rem' }
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: { xs: '0.65rem', md: '0.75rem' }
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ 
            color: 'white', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            borderRadius: '50%', 
            p: { xs: 1, md: 1.5 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: { xs: 'flex-end', md: 'center' }
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <Box>
      {/* KPI Cards */}
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 1, sm: 2, md: 2 }, 
        mb: { xs: 2, md: 4 }, 
        flexWrap: 'wrap' 
      }}>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <KPICard
            title="Total Items"
            value={analytics.totalItems}
            icon={<FileDownload />}
            subtitle="In inventory"
            bgGradient="linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <KPICard
            title="Total Value"
            value={analytics.totalValue}
            icon={<Refresh />}
            subtitle="Current market value"
            bgGradient="linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <KPICard
            title="Low Stock"
            value={analytics.lowStockItems}
            icon={<FilterList />}
            subtitle="Below threshold"
            bgGradient="linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <KPICard
            title="Out of Stock"
            value={analytics.outOfStockItems}
            icon={<FileDownload />}
            subtitle="Zero quantity"
            bgGradient="linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"
          />
        </Box>
      </Box>

      {/* Charts Row */}
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 1, sm: 2, md: 2 }, 
        mb: { xs: 2, md: 4 }, 
        flexWrap: 'wrap' 
      }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '2 1 600px' }, minWidth: { xs: 'auto', md: 400 } }}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            height: { xs: 300, sm: 350, md: 350 }, 
            display: 'flex', 
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #F7FAFA 0%, #ECF0F1 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7',
            borderRadius: { xs: 2, md: 3 }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                mb: { xs: 1, md: 2 }, 
                color: '#2C3E50',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Monthly Inventory Trends
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#2C3E50"
                    fontSize={{ xs: 10, sm: 12 }}
                  />
                  <YAxis 
                    stroke="#2C3E50"
                    fontSize={{ xs: 10, sm: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #BDC3C7',
                      fontSize: { xs: 11, sm: 12 }
                    }} 
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: { xs: 10, sm: 12 } }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1ABC9C" 
                    strokeWidth={3}
                    name="Inventory Value"
                    dot={{ r: { xs: 2, md: 4 } }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 300px' }, minWidth: { xs: 'auto', md: 300 } }}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            height: { xs: 300, sm: 350, md: 350 }, 
            display: 'flex', 
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #F7FAFA 0%, #ECF0F1 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7',
            borderRadius: { xs: 2, md: 3 }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                mb: { xs: 1, md: 2 }, 
                color: '#2C3E50',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Category Distribution
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.inventory.stockStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={{ xs: 60, sm: 70, md: 80 }}
                    innerRadius={{ xs: 30, sm: 35, md: 50 }}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.inventory.stockStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #BDC3C7', 
                      color: '#2C3E50',
                      fontSize: { xs: 11, sm: 12 }
                    }} 
                    formatter={(value) => [value, 'Items']} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Performance Metrics */}
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ 
          p: { xs: 2, sm: 2.5, md: 3 },
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
          border: '1px solid #BDC3C7',
          borderRadius: { xs: 2, md: 3 }
        }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: { xs: 1.5, md: 2 }, 
              color: '#2C3E50',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            System Performance Metrics
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2, md: 2 }, 
            flexWrap: 'wrap'
          }}>
            <Box sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 200px', md: '1 1 200px' },
              textAlign: 'center', 
              p: { xs: 1.5, md: 2 },
              border: '1px solid #e9ecef',
              borderRadius: { xs: 1, md: 2 },
              bgcolor: 'white'
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#1ABC9C', 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                {analyticsData.systemHealth.activeUsers}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#7f8c8d',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}
              >
                Active Users
              </Typography>
            </Box>
            <Box sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 200px', md: '1 1 200px' },
              textAlign: 'center', 
              p: { xs: 1.5, md: 2 },
              border: '1px solid #e9ecef',
              borderRadius: { xs: 1, md: 2 },
              bgcolor: 'white'
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#27ae60', 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                {analyticsData.systemHealth.systemUptime}%
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#7f8c8d',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}
              >
                System Uptime
              </Typography>
            </Box>
            <Box sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 200px', md: '1 1 200px' },
              textAlign: 'center', 
              p: { xs: 1.5, md: 2 },
              border: '1px solid #e9ecef',
              borderRadius: { xs: 1, md: 2 },
              bgcolor: 'white'
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#3498db', 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                {analyticsData.systemHealth.responseTime}s
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#7f8c8d',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}
              >
                Response Time
              </Typography>
            </Box>
            <Box sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 200px', md: '1 1 200px' },
              textAlign: 'center', 
              p: { xs: 1.5, md: 2 },
              border: '1px solid #e9ecef',
              borderRadius: { xs: 1, md: 2 },
              bgcolor: 'white'
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#e74c3c', 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                {analyticsData.systemHealth.errorRate}%
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#7f8c8d',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}
              >
                Error Rate
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );

  const renderInventoryAnalytics = () => (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 'bold', 
          mb: { xs: 2, md: 3 }, 
          color: '#2C3E50',
          fontSize: { xs: '1.125rem', md: '1.25rem' }
        }}
      >
        Inventory Analytics
      </Typography>
      
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            height: { xs: 300, sm: 350, md: 400 },
            display: 'flex', 
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #F7FAFA 0%, #ECF0F1 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7',
            borderRadius: { xs: 2, md: 3 }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                mb: { xs: 1, md: 2 }, 
                color: '#2C3E50',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Turnover Rates by Category
          </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.turnoverRates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.5} />
                  <XAxis 
                    dataKey="category" 
                    stroke="#2C3E50"
                    fontSize={{ xs: 10, sm: 12 }}
                  />
                  <YAxis 
                    stroke="#2C3E50"
                    fontSize={{ xs: 10, sm: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #BDC3C7',
                      fontSize: { xs: 11, sm: 12 }
                    }} 
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: { xs: 10, sm: 12 } }}
                  />
                  <Bar dataKey="rate" fill="#1ABC9C" name="Turnover Rate" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            height: { xs: 300, sm: 350, md: 400 },
            display: 'flex', 
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #F7FAFA 0%, #ECF0F1 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7',
            borderRadius: { xs: 2, md: 3 }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                mb: { xs: 1, md: 2 }, 
                color: '#2C3E50',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Stock Level Distribution
          </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.inventory.stockStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={{ xs: 60, sm: 70, md: 80 }}
                    innerRadius={{ xs: 30, sm: 35, md: 50 }}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.inventory.stockStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #BDC3C7', 
                      color: '#2C3E50',
                      fontSize: { xs: 11, sm: 12 }
                    }} 
                    formatter={(value) => [value, 'Items']} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderUserAnalytics = () => (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 'bold', 
          mb: { xs: 2, md: 3 }, 
          color: '#2C3E50',
          fontSize: { xs: '1.125rem', md: '1.25rem' }
        }}
      >
        User Activity Analytics
        </Typography>
      
      <Paper sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
        border: '1px solid #BDC3C7',
        borderRadius: { xs: 2, md: 3 }
      }}>
        <TableContainer sx={{ maxHeight: { xs: 400, md: 500 } }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  bgcolor: '#f8f9fa',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}>
                  User
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  bgcolor: '#f8f9fa',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}>
                  Role
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  bgcolor: '#f8f9fa',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}>
                  Actions
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  bgcolor: '#f8f9fa',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}>
                  Last Login
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  bgcolor: '#f8f9fa',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userActivityData.map((user, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    {user.user}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    <Chip 
                      label={user.role}
                      size="small"
                      sx={{ 
                        bgcolor: user.role === 'Admin' ? '#e74c3c' : user.role === 'Manager' ? '#f39c12' : '#3498db',
                        color: 'white',
                        fontSize: { xs: '0.6rem', md: '0.7rem' }
                      }} 
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    {user.actions}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    {user.loginTime}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status}
                      size="small"
                      sx={{ 
                        bgcolor: user.status === 'online' ? '#27ae60' : '#95a5a6',
                        color: 'white',
                        fontSize: { xs: '0.6rem', md: '0.7rem' }
                      }} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );

  const renderReports = () => (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 'bold', 
          mb: { xs: 2, md: 3 }, 
          color: '#2C3E50',
          fontSize: { xs: '1.125rem', md: '1.25rem' }
        }}
      >
        Performance Reports
        </Typography>
      
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 },
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7',
            borderRadius: { xs: 2, md: 3 }
          }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                mb: { xs: 1.5, md: 2 }, 
                color: '#2C3E50',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Top Performers ({performancePeriod})
            </Typography>
            <Box sx={{ maxHeight: { xs: 300, md: 400 }, overflow: 'auto' }}>
              {analyticsData.topPerformers[performancePeriod].map((item, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  p: { xs: 1, md: 1.5 }, 
                  mb: { xs: 0.5, md: 1 },
                  border: '1px solid #e9ecef',
                  borderRadius: { xs: 1, md: 1.5 },
                  bgcolor: 'white'
                }}>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#2C3E50',
                        fontSize: { xs: '0.75rem', md: '0.875rem' }
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#7f8c8d',
                        fontSize: { xs: '0.65rem', md: '0.75rem' }
                      }}
                    >
                      {item.sales} units sold
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#1ABC9C',
                        fontSize: { xs: '0.75rem', md: '0.875rem' }
                      }}
                    >
                      {new Intl.NumberFormat('en-KE', {
                        style: 'currency',
                        currency: 'KES',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(item.revenue)}
                    </Typography>
                    <Chip 
                      label={item.growth} 
                      size="small" 
                      sx={{ 
                        bgcolor: '#27ae60', 
                        color: 'white',
                        fontSize: { xs: '0.6rem', md: '0.7rem' }
                      }} 
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 },
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
            border: '1px solid #BDC3C7',
            borderRadius: { xs: 2, md: 3 }
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: { xs: 1.5, md: 2 }
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#2C3E50',
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                Performance Period
              </Typography>
              <FormControl size="small" sx={{ minWidth: { xs: 120, md: 150 } }}>
                <Select
                  value={performancePeriod}
                  onChange={(e) => setPerformancePeriod(e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e9ecef' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1ABC9C' },
                    borderRadius: { xs: 1, md: 2 }
                  }}
                >
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 1, md: 1.5 }
            }}>
          <Button
                variant="outlined" 
                fullWidth 
            startIcon={<FileDownload />}
                sx={{ 
                  borderColor: '#1ABC9C', 
                  color: '#1ABC9C',
                  borderRadius: { xs: 1, md: 2 },
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  '&:hover': { 
                    borderColor: '#27ae60', 
                    color: '#27ae60',
                    bgcolor: 'rgba(26, 188, 156, 0.05)'
                  }
                }}
              >
                Export Performance Report
          </Button>
          <Button
            variant="outlined"
                fullWidth 
                startIcon={<FileDownload />}
                sx={{ 
                  borderColor: '#3498db', 
                  color: '#3498db',
                  borderRadius: { xs: 1, md: 2 },
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  '&:hover': { 
                    borderColor: '#2980b9', 
                    color: '#2980b9',
                    bgcolor: 'rgba(52, 152, 219, 0.05)'
                  }
                }}
              >
                Export User Activity
          </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<FileDownload />}
                sx={{ 
                  borderColor: '#f39c12', 
                  color: '#f39c12',
                  borderRadius: { xs: 1, md: 2 },
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  '&:hover': { 
                    borderColor: '#e67e22', 
                    color: '#e67e22',
                    bgcolor: 'rgba(243, 156, 18, 0.05)'
                  }
                }}
              >
                Export Inventory Report
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
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
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      flexGrow: 1, 
      p: { xs: 1, sm: 2, md: 2 }
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          mb: { xs: 2, md: 4 },
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
        }}
      >
        Analytics & Reports
      </Typography>

      {/* Filters */}
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 1, sm: 2 }, 
        mb: { xs: 2, md: 3 },
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
          <InputLabel>Date Range</InputLabel>
          <Select
            value={dateRange}
            label="Date Range"
            onChange={(e) => setDateRange(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e9ecef' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1ABC9C' },
              borderRadius: { xs: 1, md: 2 }
            }}
          >
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="90">Last 90 days</MenuItem>
            <MenuItem value="365">Last year</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e9ecef' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1ABC9C' },
              borderRadius: { xs: 1, md: 2 }
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="furniture">Furniture</MenuItem>
            <MenuItem value="office-supplies">Office Supplies</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Main Content with Tabs */}
      <Paper sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: { xs: 2, md: 3 },
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            borderBottom: '1px solid #e9ecef',
            '& .MuiTab-root': {
              color: '#7f8c8d',
              fontWeight: 600,
              minHeight: { xs: '48px', md: 'auto' },
              fontSize: { xs: '0.875rem', md: '1rem' },
              '&.Mui-selected': {
                color: '#1ABC9C'
              }
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#1ABC9C'
            },
            '& .MuiTabs-scrollButtons': {
              color: '#1ABC9C',
              '&.Mui-disabled': {
                opacity: 0.3
              }
            }
          }}
        >
          <Tab label="Overview" value="overview" />
          <Tab label="Inventory Analytics" value="inventory" />
          <Tab label="User Analytics" value="users" />
          <Tab label="Reports" value="reports" />
        </Tabs>

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {renderContent()}
        </Box>
      </Paper>
    </Box>
  );
};

export default Analytics; 