import React, { useState, useMemo } from 'react';
import { 
  Typography, 
  Chip, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  Download, 
  Visibility, 
  Warning, 
  Cancel,
  CheckCircle,
  Sort
} from '@mui/icons-material';
import { mockData } from './mockUserData';
import './GuestInventoryData.css';

export default function GuestInventoryData() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(mockData.inventory.items.map(item => item.category))];
    return uniqueCategories.sort();
  }, []);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = mockData.inventory.items.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort items
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'price' || sortField === 'quantity' || sortField === 'minStock') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, categoryFilter, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning';
      case 'Out of Stock': return 'error';
      default: return 'default';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Stock': return <CheckCircle fontSize="small" />;
      case 'Low Stock': return <Warning fontSize="small" />;
      case 'Out of Stock': return <Cancel fontSize="small" />;
      default: return <Visibility fontSize="small" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['SKU', 'Name', 'Category', 'Current Stock', 'Min Stock', 'Status', 'Price (KES)', 'Supplier', 'Last Updated'];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedItems.map(item => [
        item.sku,
        `"${item.name}"`,
        item.category,
        item.quantity,
        item.minStock,
        item.status,
        item.price,
        `"${item.supplier}"`,
        formatDate(item.lastUpdated)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Export to Excel
  const exportToExcel = () => {
    import('xlsx').then((XLSX) => {
      const excelData = filteredAndSortedItems.map(item => ({
        'SKU': item.sku,
        'Item Name': item.name,
        'Category': item.category,
        'Current Stock': item.quantity,
        'Min Stock': item.minStock,
        'Status': item.status,
        'Price (KES)': item.price,
        'Supplier': item.supplier,
        'Last Updated': formatDate(item.lastUpdated)
      }));

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Set column widths
      const columnWidths = [
        { wch: 12 }, // SKU
        { wch: 25 }, // Item Name
        { wch: 15 }, // Category
        { wch: 12 }, // Current Stock
        { wch: 10 }, // Min Stock
        { wch: 12 }, // Status
        { wch: 15 }, // Price
        { wch: 20 }, // Supplier
        { wch: 20 }  // Last Updated
      ];
      worksheet['!cols'] = columnWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory Data');

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inventory_data_${new Date().toISOString().split('T')[0]}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    }).catch(error => {
      console.error('Error exporting to Excel:', error);
      // Fallback to CSV if Excel export fails
      exportToCSV();
    });
  };

  return (
    <div className="container-fluid p-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Typography variant="h4" className="fw-bold text-dark mb-2">
                Inventory Data
              </Typography>
              <Typography variant="body1" className="text-muted">
                Read-only access to comprehensive inventory information
              </Typography>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={exportToExcel}
                className="export-btn"
              >
                Export Excel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <Card className="summary-card">
            <CardContent className="text-center">
              <Typography variant="h4" className="fw-bold text-primary mb-1">
                {filteredAndSortedItems.length}
              </Typography>
              <Typography variant="body2" className="text-muted">
                Total Items
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3 mb-3">
          <Card className="summary-card">
            <CardContent className="text-center">
              <Typography variant="h4" className="fw-bold text-success mb-1">
                {filteredAndSortedItems.filter(item => item.status === 'In Stock').length}
              </Typography>
              <Typography variant="body2" className="text-muted">
                In Stock
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3 mb-3">
          <Card className="summary-card">
            <CardContent className="text-center">
              <Typography variant="h4" className="fw-bold text-warning mb-1">
                {filteredAndSortedItems.filter(item => item.status === 'Low Stock').length}
              </Typography>
              <Typography variant="body2" className="text-muted">
                Low Stock
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3 mb-3">
          <Card className="summary-card">
            <CardContent className="text-center">
              <Typography variant="h4" className="fw-bold text-danger mb-1">
                {filteredAndSortedItems.filter(item => item.status === 'Out of Stock').length}
              </Typography>
              <Typography variant="body2" className="text-muted">
                Out of Stock
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters Section */}
      <div className="row mb-4">
        <div className="col-12">
          <Card className="filter-card">
            <CardContent>
              <div className="row align-items-end">
                <div className="col-md-4 mb-3">
                  <TextField
                    fullWidth
                    label="Search Items"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search className="text-muted me-2" />
                    }}
                    placeholder="Search by name, SKU, or category..."
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      label="Category"
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      {categories.map(category => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-3 mb-3">
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="In Stock">In Stock</MenuItem>
                      <MenuItem value="Low Stock">Low Stock</MenuItem>
                      <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-2 mb-3">
                  <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setStatusFilter('all');
                    }}
                    fullWidth
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Info */}
      <div className="row mb-3">
        <div className="col-12">
          <Alert severity="info" className="results-info">
            Showing {paginatedItems.length} of {filteredAndSortedItems.length} items
            {searchTerm && ` matching "${searchTerm}"`}
            {categoryFilter !== 'all' && ` in ${categoryFilter}`}
            {statusFilter !== 'all' && ` with status ${statusFilter}`}
          </Alert>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="row">
        <div className="col-12">
          <Card className="table-card">
            <CardContent className="p-0">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="table-header">
                      <TableCell 
                        className="sortable-header"
                        onClick={() => handleSort('sku')}
                      >
                        <div className="d-flex align-items-center">
                          SKU
                          {sortField === 'sku' && (
                            <Sort className="ms-1" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell 
                        className="sortable-header"
                        onClick={() => handleSort('name')}
                      >
                        <div className="d-flex align-items-center">
                          Item Name
                          {sortField === 'name' && (
                            <Sort className="ms-1" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell 
                        className="sortable-header"
                        onClick={() => handleSort('category')}
                      >
                        <div className="d-flex align-items-center">
                          Category
                          {sortField === 'category' && (
                            <Sort className="ms-1" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell 
                        className="sortable-header"
                        onClick={() => handleSort('quantity')}
                      >
                        <div className="d-flex align-items-center">
                          Current Stock
                          {sortField === 'quantity' && (
                            <Sort className="ms-1" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>Min Stock</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell 
                        className="sortable-header"
                        onClick={() => handleSort('price')}
                      >
                        <div className="d-flex align-items-center">
                          Price (KES)
                          {sortField === 'price' && (
                            <Sort className="ms-1" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>Supplier</TableCell>
                      <TableCell 
                        className="sortable-header"
                        onClick={() => handleSort('lastUpdated')}
                      >
                        <div className="d-flex align-items-center">
                          Last Updated
                          {sortField === 'lastUpdated' && (
                            <Sort className="ms-1" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedItems.map((item) => (
                      <TableRow key={item.id} className="table-row">
                        <TableCell className="sku-cell">
                          <Typography variant="body2" className="fw-bold">
                            {item.sku}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" className="fw-bold">
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={item.category} 
                            size="small" 
                            className="category-chip"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="d-flex align-items-center">
                            <Typography variant="body2" className="fw-bold me-2">
                              {item.quantity}
                            </Typography>
                            {item.quantity < item.minStock && (
                              <Warning className="text-warning" fontSize="small" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item.minStock}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(item.status)}
                            label={item.status}
                            size="small"
                            color={getStatusColor(item.status)}
                            className="status-chip"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" className="fw-bold">
                            {new Intl.NumberFormat('en-KE', {
                              style: 'currency',
                              currency: 'KES',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                            }).format(item.price)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item.supplier}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" className="text-muted">
                            {formatDate(item.lastUpdated)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      )}

      {/* Data Source Info */}
      <div className="row mt-4">
        <div className="col-12">
          <Alert severity="info" className="data-source-info">
            <Typography variant="body2">
              <strong>Data Source:</strong> InventoryAce System | 
              <strong>Last Updated:</strong> {new Date().toLocaleString()} | 
              <strong>Total Records:</strong> {mockData.inventory.items.length} items
            </Typography>
          </Alert>
        </div>
      </div>
    </div>
  );
} 