import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockData } from './mockUserData';
import './GuestReports.css';

const COLORS = ['#1ABC9C', '#27ae60', '#f39c12', '#e67e22', '#e74c3c', '#9b59b6'];

export default function GuestReports() {
  const [generatingReport, setGeneratingReport] = useState(false);

  // Get data from mock data
  const inventoryData = mockData.inventory;
  const categoryData = inventoryData.categoryData;
  const stockStatusData = inventoryData.stockStatusData;
  const topMovingItems = inventoryData.topMovingItems;
  const kpis = inventoryData.kpis;

  // Report types available for guests
  const reportTypes = [
    {
      id: 'inventory-summary',
      title: 'Inventory Summary Report',
      description: 'Comprehensive overview of all inventory items with current stock levels and values',
      icon: '📊',
      format: 'PDF',
      size: 'Medium',
      lastGenerated: '2024-01-15'
    },
    {
      id: 'stock-status',
      title: 'Stock Status Report',
      description: 'Detailed breakdown of items by stock status (In Stock, Low Stock, Out of Stock)',
      icon: '⚠️',
      format: 'Excel',
      size: 'Small',
      lastGenerated: '2024-01-14'
    },
    {
      id: 'category-analysis',
      title: 'Category Analysis Report',
      description: 'Inventory distribution and value analysis by category',
      icon: '📁',
      format: 'PDF',
      size: 'Small',
      lastGenerated: '2024-01-13'
    },
    {
      id: 'low-stock-alert',
      title: 'Low Stock Alert Report',
      description: 'Items that need immediate attention due to low stock levels',
      icon: '🚨',
      format: 'Excel',
      size: 'Small',
      lastGenerated: '2024-01-16'
    },
    {
      id: 'value-analysis',
      title: 'Inventory Value Analysis',
      description: 'Total inventory value breakdown and financial overview',
      icon: '💰',
      format: 'PDF',
      size: 'Medium',
      lastGenerated: '2024-01-12'
    },
    {
      id: 'top-items',
      title: 'Top Moving Items Report',
      description: 'Analysis of the most frequently used inventory items',
      icon: '📈',
      format: 'Excel',
      size: 'Small',
      lastGenerated: '2024-01-11'
    }
  ];

  const generateReport = async (reportType) => {
    setGeneratingReport(true);
    
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${reportType.id}_${timestamp}.${reportType.format.toLowerCase()}`;
      
      if (reportType.format === 'Excel') {
        // Generate Excel file
        const XLSX = await import('xlsx');
        
        let excelData = [];
        let worksheetName = 'Report Data';
        
        // Prepare data based on report type
        switch (reportType.id) {
          case 'inventory-summary':
            excelData = inventoryData.items.map(item => ({
              'SKU': item.sku,
              'Item Name': item.name,
              'Category': item.category,
              'Current Stock': item.quantity,
              'Min Stock': item.minStock,
              'Status': item.status,
              'Price (KES)': item.price,
              'Total Value (KES)': item.quantity * item.price,
              'Supplier': item.supplier,
              'Last Updated': new Date(item.lastUpdated).toLocaleDateString()
            }));
            worksheetName = 'Inventory Summary';
            break;
            
          case 'stock-status':
            const stockStatusItems = inventoryData.items.filter(item => 
              item.status === 'Low Stock' || item.status === 'Out of Stock'
            );
            excelData = stockStatusItems.map(item => ({
              'SKU': item.sku,
              'Item Name': item.name,
              'Category': item.category,
              'Current Stock': item.quantity,
              'Min Stock': item.minStock,
              'Status': item.status,
              'Stock Gap': item.minStock - item.quantity,
              'Price (KES)': item.price,
              'Supplier': item.supplier
            }));
            worksheetName = 'Stock Status';
            break;
            
          case 'category-analysis':
            excelData = categoryData.map(cat => ({
              'Category': cat.name,
              'Value (KES)': cat.value,
              'Value (Million KES)': (cat.value / 1000000).toFixed(2),
              'Percentage': ((cat.value / kpis.totalValue) * 100).toFixed(1) + '%'
            }));
            worksheetName = 'Category Analysis';
            break;
            
          case 'low-stock-alert':
            const lowStockItems = inventoryData.items.filter(item => 
              item.quantity < item.minStock
            );
            excelData = lowStockItems.map(item => ({
              'SKU': item.sku,
              'Item Name': item.name,
              'Category': item.category,
              'Current Stock': item.quantity,
              'Min Stock': item.minStock,
              'Stock Gap': item.minStock - item.quantity,
              'Status': item.status,
              'Price (KES)': item.price,
              'Supplier': item.supplier,
              'Priority': item.quantity === 0 ? 'Critical' : 'High'
            }));
            worksheetName = 'Low Stock Alert';
            break;
            
          case 'value-analysis':
            excelData = [
              {
                'Metric': 'Total Inventory Value',
                'Value (KES)': kpis.totalValue,
                'Value (Million KES)': (kpis.totalValue / 1000000).toFixed(2)
              },
              {
                'Metric': 'Total Items',
                'Value (KES)': kpis.totalItems,
                'Value (Million KES)': '-'
              },
              {
                'Metric': 'Average Item Value',
                'Value (KES)': Math.round(kpis.totalValue / kpis.totalItems),
                'Value (Million KES)': ((kpis.totalValue / kpis.totalItems) / 1000000).toFixed(2)
              },
              {
                'Metric': 'Categories',
                'Value (KES)': kpis.categories,
                'Value (Million KES)': '-'
              }
            ];
            worksheetName = 'Value Analysis';
            break;
            
          case 'top-items':
            excelData = topMovingItems.map((item, index) => ({
              'Rank': index + 1,
              'Item Name': item.name,
              'Category': item.category,
              'Sales Volume': item.sales,
              'Units Sold': item.sales
            }));
            worksheetName = 'Top Moving Items';
            break;
            
          default:
            excelData = [{ 'Message': 'Report data not available' }];
        }
        
        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        
        // Set column widths 
        const columnWidths = Object.keys(excelData[0] || {}).map(key => ({
          wch: Math.max(key.length, 15)
        }));
        worksheet['!cols'] = columnWidths;
        
        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
        
        // Generate Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { 
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        
      } else {
        // Generate PDF-like text file (placeholder for PDF)
        const content = `InventoryAce Report: ${reportType.title}
Generated: ${new Date().toLocaleString()}
Report Type: ${reportType.format}

This is a sample report for ${reportType.title}.
In a real implementation, this would be a proper PDF file with formatted content.

Report Summary:
- Total Items: ${kpis.totalItems.toLocaleString()}
- Total Value: KSH ${kpis.totalValue.toLocaleString()}
- Categories: ${kpis.categories}
- Low Stock Items: ${kpis.lowStock}

Generated by InventoryAce System
© 2024 InventoryAce. All rights reserved.`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
      
    } catch (error) {
      console.error('Error generating report:', error);
      // Fallback to text file
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${reportType.id}_${timestamp}.txt`;
      const content = `Error generating ${reportType.title}. Please try again.`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } finally {
      setGeneratingReport(false);
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="reports-title">Reports & Analytics</h2>
          <p className="reports-subtitle">
            Access downloadable reports and visual analytics for inventory insights
          </p>
          
          <div className="alert alert-info" role="alert">
            <strong>Guest Access:</strong> You have read-only access to generate and download inventory reports. 
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="row">
        {/* Available Reports */}
        <div className="col-lg-8">
          <div className="card reports-card">
            <div className="card-body">
              <h5 className="card-title">Available Reports</h5>
              
              <div className="row">
                {reportTypes.map((report) => (
                  <div className="col-sm-6 mb-3" key={report.id}>
                    <div className="report-item">
                      <div className="report-header">
                        <div className="report-icon">{report.icon}</div>
                        <div className="report-info">
                          <h6 className="report-title">{report.title}</h6>
                          <p className="report-description">{report.description}</p>
                        </div>
                      </div>
                      
                      <div className="report-tags">
                        <span className="badge badge-primary">{report.format}</span>
                        <span className="badge badge-secondary">{report.size}</span>
                      </div>
                      
                      <div className="report-footer">
                        <small className="text-muted">Last: {report.lastGenerated}</small>
                        <button
                          className="btn btn-primary btn-sm download-btn"
                          onClick={() => generateReport(report)}
                          disabled={generatingReport}
                        >
                          <i className="fas fa-download me-1"></i>
                          {generatingReport ? 'Generating...' : 'Download'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Analytics */}
        <div className="col-lg-4">
          <div className="card analytics-card mb-3">
            <div className="card-body">
              <h5 className="card-title">Stock Status Overview</h5>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={stockStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stockStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [value.toLocaleString(), 'Items']}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card analytics-card">
            <div className="card-body">
              <h5 className="card-title">Top Moving Items</h5>
              <div className="top-items-list">
                {topMovingItems.slice(0, 5).map((item, index) => (
                  <div className="top-item" key={index}>
                    <div className="item-rank">#{index + 1}</div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-details">{item.sales} units • {item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Analysis Chart */}
      <div className="row mt-3">
        <div className="col-12">
          <div className="card chart-card">
            <div className="card-body">
              <h5 className="card-title">Inventory Value by Category</h5>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#BDC3C7" opacity={0.5} />
                    <XAxis dataKey="name" stroke="#2C3E50" />
                    <YAxis stroke="#2C3E50" />
                    <Tooltip 
                      formatter={(value) => [`KSH ${(value / 1000000).toFixed(1)}M`, 'Value']}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #BDC3C7' }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#1ABC9C" name="Inventory Value (KSH)">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 