import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Paper, Chip, List,ListItem,ListItemText,ListItemIcon,Divider} from '@mui/material';
import {TrendingUp,Inventory,Warning,Cancel,Timeline,Assessment,Category,TrendingDown} from '@mui/icons-material';
import {LineChart,Line,BarChart,Bar,PieChart,Pie,Cell,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import { mockData } from './mockUserData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const KPICard = ({ title, value, icon, subtitle, bgGradient }) => (
  <Card sx={{ height: '100%', background: bgGradient }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
            {title === "Total Inventory Value" && typeof value === 'number' 
              ? new Intl.NumberFormat('en-KE', {
                  style: 'currency',
                  currency: 'KES',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value)
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
            value={mockData.inventory.kpis.totalValue}
            icon={<TrendingUp />}
            subtitle="Current market value"
            bgGradient="linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <KPICard
            title="Total Items"
            value={mockData.inventory.kpis.totalItems}
            icon={<Inventory />}
            subtitle="Total Items"
            bgGradient="linear-gradient(135deg, #1ABC9C 0%,rgb(153, 157, 157) 100%)"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <KPICard
            title="Low Stock Alerts"
            value={mockData.inventory.kpis.lowStock}
            icon={<Warning />}
            subtitle="Below reorder level"
            bgGradient="linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)"
          />
        </Box>
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <KPICard
            title="Out of Stock"
            value={mockData.inventory.kpis.outOfStock}
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
                <BarChart data={mockData.inventory.turnoverByCategory}>
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
              {mockData.inventory.topMovingItems.map((item, index) => (
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
                  {index < mockData.inventory.topMovingItems.length - 1 && <Divider sx={{ borderColor: '#BDC3C7' }} />}
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
                <LineChart data={mockData.analytics.monthlyTrends}>
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
              Stock Status Overview
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.inventory.stockStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.inventory.stockStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7', color: '#2C3E50' }} formatter={(value) => [value, 'Items']} />
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
                          {mockData.inventory.recentActivity.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1 }}>
                  <ListItemIcon>
                    <Timeline sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={`${activity.item || 'N/A'} - ${new Date(activity.timestamp).toLocaleDateString()} - ${activity.user}`}
                    sx={{ 
                      '& .MuiListItemText-primary': { color: 'white', fontWeight: 'bold' },
                      '& .MuiListItemText-secondary': { color: 'rgba(255,255,255,0.8)' }
                    }}
                  />
                </ListItem>
                {index < mockData.inventory.recentActivity.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Overview; 