import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './Dashboard.css';

const sidebarTabs = [
  { id: 'category', label: 'Category Overview', icon: 'fas fa-layer-group' },
  { id: 'stock', label: 'Stock Movement', icon: 'fas fa-exchange-alt' },
  { id: 'staff', label: 'Staff Performance', icon: 'fas fa-user-check' },
  { id: 'export', label: 'Export & Share', icon: 'fas fa-file-export' },
];

const categoryData = [
  { name: 'Electronics', stock: 120, lowStock: 5 },
  { name: 'Furniture', stock: 80, lowStock: 2 },
  { name: 'Apparel', stock: 60, lowStock: 8 },
  { name: 'Stationery', stock: 40, lowStock: 1 },
];
const stockMovementData = [
  { date: '2024-06-01', movement: 30 },
  { date: '2024-06-02', movement: 22 },
  { date: '2024-06-03', movement: 18 },
  { date: '2024-06-04', movement: 27 },
  { date: '2024-06-05', movement: 23 },
  { date: '2024-06-06', movement: 34 },
  { date: '2024-06-07', movement: 29 },
];
const staffPerformanceData = [
  { name: 'John', tasks: 12, accuracy: 98 },
  { name: 'Jane', tasks: 15, accuracy: 95 },
  { name: 'Mike', tasks: 10, accuracy: 92 },
  { name: 'Sarah', tasks: 8, accuracy: 97 },
];
const COLORS = ['#1ABC9C', '#27ae60', '#2C3E50', '#16a085'];

const ManagerReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('category');

  const renderCategoryOverview = () => (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12 col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white', borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total Items</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>300</Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #1ABC9C 0%, #27ae60 100%)', color: 'white', borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Low Stock Items</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>16</Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #27ae60 0%, #2C3E50 100%)', color: 'white', borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Restock Needed</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>7</Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-md-3 mb-3">
          <Card sx={{ background: 'linear-gradient(135deg, #1ABC9C 0%, #2C3E50 100%)', color: 'white', borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Avg. Turnover Rate</Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>18%</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12 col-lg-6 mb-3">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Stock by Category</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#2C3E50" />
                  <YAxis stroke="#2C3E50" />
                  <Tooltip />
                  <Bar dataKey="stock" fill="#1ABC9C" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Category Distribution</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} dataKey="stock" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Category Details</Typography>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead style={{ background: '#f6fefb' }}>
                    <tr>
                      <th>Category</th>
                      <th>Total Items</th>
                      <th>Low Stock</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.map((cat, idx) => (
                      <tr key={cat.name} style={{ background: idx % 2 === 0 ? '#ecf0f1' : '#fff' }}>
                        <td>{cat.name}</td>
                        <td>{cat.stock}</td>
                        <td>{cat.lowStock}</td>
                        <td>2024-06-0{idx + 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="contained" sx={{ background: 'linear-gradient(135deg, #1ABC9C 0%, #2C3E50 100%)', color: 'white', borderRadius: 3 }}>
                  Export Category Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderStockMovement = () => (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12 col-lg-8 mb-3">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Stock Movement (Last 7 Days)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={stockMovementData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.3} />
                  <XAxis dataKey="date" stroke="#2C3E50" />
                  <YAxis stroke="#2C3E50" />
                  <Tooltip />
                  <Line type="monotone" dataKey="movement" stroke="#1ABC9C" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-lg-4 mb-3">
          <Card sx={{ borderRadius: 4, background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Top Movers</Typography>
              <ul className="list-unstyled mb-0">
                <li>Electronics: 30</li>
                <li>Furniture: 22</li>
                <li>Apparel: 18</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Stock Movement Details</Typography>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead style={{ background: '#f6fefb' }}>
                    <tr>
                      <th>Date</th>
                      <th>Movement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockMovementData.map((row, idx) => (
                      <tr key={row.date} style={{ background: idx % 2 === 0 ? '#ecf0f1' : '#fff' }}>
                        <td>{row.date}</td>
                        <td>{row.movement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderStaffPerformance = () => (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12 col-lg-8 mb-3">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Staff Performance</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={staffPerformanceData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#2C3E50" />
                  <YAxis stroke="#2C3E50" />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#1ABC9C" radius={[8, 8, 0, 0]} name="Tasks Completed" />
                  <Bar dataKey="accuracy" fill="#27ae60" radius={[8, 8, 0, 0]} name="Accuracy (%)" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-lg-4 mb-3">
          <Card sx={{ borderRadius: 4, background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Top Performer</Typography>
              <ul className="list-unstyled mb-0">
                <li>Jane: 15 tasks, 95% accuracy</li>
                <li>John: 12 tasks, 98% accuracy</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Staff Details</Typography>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead style={{ background: '#f6fefb' }}>
                    <tr>
                      <th>Name</th>
                      <th>Tasks Completed</th>
                      <th>Accuracy (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffPerformanceData.map((row, idx) => (
                      <tr key={row.name} style={{ background: idx % 2 === 0 ? '#ecf0f1' : '#fff' }}>
                        <td>{row.name}</td>
                        <td>{row.tasks}</td>
                        <td>{row.accuracy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderExportShare = () => (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12 col-lg-6 mb-3">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Export Reports</Typography>
              <ul className="list-unstyled mb-3">
                <li>Weekly Category Summary</li>
                <li>Monthly Stock Movement</li>
                <li>Staff Performance Report</li>
                <li>Low Stock Alert Report</li>
              </ul>
              <Button variant="contained" sx={{ background: 'linear-gradient(135deg, #1ABC9C 0%, #2C3E50 100%)', color: 'white', borderRadius: 3 }}>
                Export as PDF
              </Button>
              <Button variant="outlined" sx={{ borderColor: '#1ABC9C', color: '#1ABC9C', borderRadius: 3, ml: 2 }}>
                Export as Excel
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2C3E50' }}>Schedule Reports</Typography>
              <ul className="list-unstyled mb-3">
                <li>Set up automatic report delivery</li>
                <li>Choose frequency: daily, weekly, monthly</li>
                <li>Select recipients</li>
              </ul>
              <Button variant="contained" sx={{ background: 'linear-gradient(135deg, #27ae60 0%, #1ABC9C 100%)', color: 'white', borderRadius: 3 }}>
                Schedule Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="manager-reports-analytics d-flex" style={{ minHeight: '100vh', background: '#f6fefb' }}>
      {/* Sidebar */}
      <div className="sidebar p-3" style={{ minWidth: 220, background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)', color: 'white', borderTopRightRadius: 24, borderBottomRightRadius: 24 }}>
        <h4 className="mb-4" style={{ fontWeight: 'bold', color: '#fff' }}>Reports & Analytics</h4>
        <div className="nav flex-column">
          {sidebarTabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-link text-start mb-2 ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                background: activeTab === tab.id ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 18,
                padding: '12px 16px',
                transition: 'background 0.2s',
                outline: 'none',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(44,62,80,0.08)' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={`${tab.icon} me-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-grow-1 p-4">
        {activeTab === 'category' && renderCategoryOverview()}
        {activeTab === 'stock' && renderStockMovement()}
        {activeTab === 'staff' && renderStaffPerformance()}
        {activeTab === 'export' && renderExportShare()}
      </div>
    </div>
  );
};

export default ManagerReportsAnalytics; 