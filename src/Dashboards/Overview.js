import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Paper, Chip, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { TrendingUp, Inventory, Warning, Cancel, Timeline } from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockData } from './mockUserData';

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
            {title === "Total Inventory Value" && typeof value === 'number' 
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

const Overview = () => {
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
        Dashboard Overview
      </Typography>

      {/* KPI Cards Row */}
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 1, sm: 2, md: 2 }, 
        mb: { xs: 2, md: 4 }, 
        flexWrap: 'wrap' 
      }}>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <KPICard
            title="Total Inventory Value"
            value={mockData.inventory.kpis.totalValue}
            icon={<TrendingUp />}
            subtitle="Current market value"
            bgGradient="linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <KPICard
            title="Total Items"
            value={mockData.inventory.kpis.totalItems}
            icon={<Inventory />}
            subtitle="Total Items"
            bgGradient="linear-gradient(135deg, #1ABC9C 0%,rgb(153, 157, 157) 100%)"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
          <KPICard
            title="Low Stock Alerts"
            value={mockData.inventory.kpis.lowStock}
            icon={<Warning />}
            subtitle="Below reorder level"
            bgGradient="linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)"
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 250px', md: '1 1 250px' }, minWidth: { xs: 'auto', md: 250 } }}>
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
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 1, sm: 2, md: 3 }, 
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
              Stock Turnover Rate by Category
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.inventory.turnoverByCategory}>
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
                  <Bar dataKey="turnover" fill="#1ABC9C" name="Turnover Rate (times/year)" />
                </BarChart>
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
              Top Moving Items
            </Typography>
            <List sx={{ 
              flexGrow: 1, 
              overflow: 'auto',
              '& .MuiListItem-root': {
                py: { xs: 0.5, md: 1 }
              }
            }}>
              {mockData.inventory.topMovingItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <ListItem sx={{ py: { xs: 0.5, md: 1 } }}>
                    <ListItemIcon>
                      <Chip 
                        label={index + 1} 
                        size="small" 
                        sx={{ 
                          backgroundColor: index === 0 ? '#1ABC9C' : index === 1 ? '#E67E22' : index === 2 ? '#2C3E50' : '#BDC3C7',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: { xs: '0.7rem', md: '0.75rem' }
                        }} 
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.sales} units sold | ${item.category}`}
                      sx={{ 
                        '& .MuiListItemText-primary': { 
                          color: '#2C3E50', 
                          fontWeight: 'bold',
                          fontSize: { xs: '0.875rem', md: '1rem' }
                        },
                        '& .MuiListItemText-secondary': { 
                          color: '#34495e',
                          fontSize: { xs: '0.75rem', md: '0.875rem' }
                        }
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
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 1, sm: 2, md: 3 }, 
        mb: { xs: 2, md: 4 }, 
        flexWrap: 'wrap' 
      }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 500px' }, minWidth: { xs: 'auto', md: 400 } }}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            height: { xs: 280, sm: 320, md: 320 }, 
            display: 'flex', 
            flexDirection: 'column',
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
                mb: { xs: 1, md: 2 }, 
                color: '#2C3E50',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Inventory Value Over Time
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.analytics.monthlyTrends}>
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
                      color: '#2C3E50',
                      fontSize: { xs: 11, sm: 12 }
                    }} 
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: { xs: 10, sm: 12 } }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#E67E22" 
                    strokeWidth={3}
                    name="Inventory Value"
                    dot={{ r: { xs: 2, md: 4 } }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 500px' }, minWidth: { xs: 'auto', md: 400 } }}>
          <Paper sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            height: { xs: 280, sm: 320, md: 320 }, 
            display: 'flex', 
            flexDirection: 'column',
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
                mb: { xs: 1, md: 2 }, 
                color: '#2C3E50',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Stock Status Overview
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

      {/* Recent Activity - Full width */}
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ 
          p: { xs: 2, sm: 2.5, md: 3 }, 
          height: { xs: 250, sm: 280, md: 300 },
          background: 'linear-gradient(90deg, #2C3E50 0%, #1ABC9C 100%)',
          boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10)',
          borderRadius: { xs: 2, md: 3 }
        }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: { xs: 1, md: 2 }, 
              color: 'white',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Recent Activity
          </Typography>
          <List sx={{ 
            flexGrow: 1, 
            overflow: 'auto', 
            maxHeight: { xs: 180, sm: 200, md: 220 },
            '& .MuiListItem-root': {
              py: { xs: 0.5, md: 1 }
            }
          }}>
            {mockData.inventory.recentActivity.map((activity, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: { xs: 0.5, md: 1 } }}>
                  <ListItemIcon>
                    <Timeline sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={`${activity.item || 'N/A'} - ${new Date(activity.timestamp).toLocaleDateString()} - ${activity.user}`}
                    sx={{ 
                      '& .MuiListItemText-primary': { 
                        color: 'white', 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      },
                      '& .MuiListItemText-secondary': { 
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: { xs: '0.75rem', md: '0.875rem' }
                      }
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