import React from 'react';
import { Card, CardContent, Typography, Box, Alert, AlertTitle } from '@mui/material';
import { Inventory, AttachMoney, Category, Warning, TrendingUp } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockData } from './mockUserData';


const mockOverviewData = mockData.inventory.kpis;
const categoryData = mockData.inventory.categoryData;
const stockStatusData = mockData.inventory.stockStatusData;
const COLORS = ['#1ABC9C', '#27ae60', '#f39c12', '#e67e22', '#e74c3c'];

export default function GuestOverview() {
  return (
    <div className="container-fluid p-4">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 1 }}>
          Inventory Overview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Read-only access to inventory data for viewing and reporting purposes
        </Typography>
        
        
      </Box>

      {/* Key Metrics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Inventory sx={{ fontSize: 40, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {mockOverviewData.totalItems.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Items</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AttachMoney sx={{ fontSize: 40, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
                    KSH {mockOverviewData.totalValue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Value</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Category sx={{ fontSize: 40, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {mockOverviewData.categories}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Categories</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Warning sx={{ fontSize: 40, opacity: 0.8 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {mockOverviewData.lowStock}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Low Stock Items</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stock Availability Card */}
      <div className="row mb-4">
        <div className="col-12 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8, mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                  {mockOverviewData.stockAvailability}%
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'center' }}>Stock Availability</Typography>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
                Inventory by Category (Value)
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`KSH ${value.toLocaleString()}`, 'Value']}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-lg-6 mb-4">
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
                Stock Status Overview
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.5} />
                    <XAxis dataKey="name" stroke="#2C3E50" />
                    <YAxis stroke="#2C3E50" />
                    <Tooltip 
                      formatter={(value) => [value.toLocaleString(), 'Items']}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7' }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#1ABC9C" name="Number of Items">
                      {stockStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Inventory Summary Section */}
      <div className="row">
        <div className="col-12 mb-4">
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 3 }}>
                Inventory Summary
              </Typography>
              <div className="row">
                <div className="col-md-6">
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Total Inventory Items:</strong>
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1ABC9C' }}>
                      {mockOverviewData.totalItems.toLocaleString()} items
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Total Inventory Value:</strong>
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                      KSH {mockOverviewData.totalValue.toLocaleString()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Categories:</strong>
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f39c12' }}>
                      {mockOverviewData.categories} categories
                    </Typography>
                  </Box>
                </div>
                
                <div className="col-md-6">
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Low Stock Items:</strong>
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#e74c3c' }}>
                      {mockOverviewData.lowStock} items
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Stock Availability:</strong>
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1ABC9C' }}>
                      {mockOverviewData.stockAvailability}%
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
                      {mockOverviewData.lastUpdated}
                    </Typography>
                  </Box>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 