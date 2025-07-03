import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Search as SearchIcon,
  Warning as WarningIcon
} from "@mui/icons-material";
import "./InventoryManagement.css";

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState('items');
  
  const [inventory, setInventory] = useState([
    {
      id: 1,
      sku: 'SKU-001',
      name: "Laptop Dell XPS 13",
      category: "Electronics",
      quantity: 15,
      minStock: 10,
      price: 1299.99,
      supplier: "Dell Inc.",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      sku: 'SKU-002',
      name: "Office Chair",
      category: "Furniture",
      quantity: 25,
      minStock: 15,
      price: 299.99,
      supplier: "Office Depot",
      lastUpdated: "2024-01-14"
    },
    {
      id: 3,
      sku: 'SKU-003',
      name: "Printer HP LaserJet",
      category: "Electronics",
      quantity: 8,
      minStock: 5,
      price: 449.99,
      supplier: "HP Inc.",
      lastUpdated: "2024-01-13"
    },
    {
      id: 4,
      sku: 'SKU-004',
      name: "Desk Lamp",
      category: "Furniture",
      quantity: 30,
      minStock: 10,
      price: 89.99,
      supplier: "IKEA",
      lastUpdated: "2024-01-12"
    }
  ]);

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Electronic devices and equipment",
      itemCount: 2,
      totalValue: 1749.98,
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: "Furniture",
      description: "Office furniture and fixtures",
      itemCount: 2,
      totalValue: 389.98,
      lastUpdated: "2024-01-14"
    },
    {
      id: 3,
      name: "Office Supplies",
      description: "General office supplies and stationery",
      itemCount: 0,
      totalValue: 0,
      lastUpdated: "2024-01-10"
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: '',
    quantity: '',
    minStock: '',
    price: '',
    supplier: ''
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: ""
  });
  const [openDeleteItemConfirm, setOpenDeleteItemConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openDeleteCategoryConfirm, setOpenDeleteCategoryConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        sku: item.sku,
        name: item.name,
        category: item.category,
        quantity: item.quantity.toString(),
        minStock: item.minStock.toString(),
        price: item.price.toString(),
        supplier: item.supplier
      });
    } else {
      setEditingItem(null);
      setFormData({
        sku: '',
        name: '',
        category: '',
        quantity: '',
        minStock: '',
        price: '',
        supplier: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({
      sku: '',
      name: '',
      category: '',
      quantity: '',
      minStock: '',
      price: '',
      supplier: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editingItem) {
      setInventory(inventory.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              ...formData,
              quantity: parseInt(formData.quantity),
              minStock: parseInt(formData.minStock),
              price: parseFloat(formData.price),
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : item
      ));
    } else {
      const newItem = {
        id: Math.max(...inventory.map(item => item.id)) + 1,
        ...formData,
        quantity: parseInt(formData.quantity),
        minStock: parseInt(formData.minStock),
        price: parseFloat(formData.price),
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setInventory([...inventory, newItem]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setOpenDeleteItemConfirm(true);
  };

  const handleConfirmDeleteItem = () => {
    setInventory(inventory.filter(item => item.id !== itemToDelete));
    setOpenDeleteItemConfirm(false);
    setItemToDelete(null);
  };

  const handleOpenCategoryDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryFormData({
        name: category.name,
        description: category.description
      });
    } else {
      setEditingCategory(null);
      setCategoryFormData({
        name: "",
        description: ""
      });
    }
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
    setEditingCategory(null);
    setCategoryFormData({
      name: "",
      description: ""
    });
  };

  const handleCategoryInputChange = (e) => {
    setCategoryFormData({
      ...categoryFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategorySubmit = () => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? {
              ...cat,
              ...categoryFormData,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : cat
      ));
    } else {
      // Add new category
      const newCategory = {
        id: Math.max(...categories.map(cat => cat.id)) + 1,
        ...categoryFormData,
        itemCount: 0,
        totalValue: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
    }
    handleCloseCategoryDialog();
  };

  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setOpenDeleteCategoryConfirm(true);
  };

  const handleConfirmDeleteCategory = () => {
    setCategories(categories.filter(cat => cat.id !== categoryToDelete));
    setOpenDeleteCategoryConfirm(false);
    setCategoryToDelete(null);
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (quantity, minStock) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity > minStock) return 'In Stock';
    if (quantity <= minStock && quantity > minStock / 2) return 'Low Stock';
    if (quantity <= minStock / 2 && quantity > 0) return 'Critical';
    return '';
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <div className="inventory-header-title-tabs">
          <h2>
            <i className="bi bi-box-seam me-2"></i>
            Inventory Management
          </h2>
          <div className="inventory-tabs">
            <button
              className={`tab-button ${activeTab === 'items' ? 'active' : ''}`}
              onClick={() => setActiveTab('items')}
            >
              Items
            </button>
            <button
              className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
          </div>
        </div>
      </div>
      <div className="inventory-search-row">
        <div className="input-group">
          <span className="input-group-text">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          style={{ borderRadius: '26px' }}
          startIcon={<AddIcon />}
          onClick={() => activeTab === 'items' ? handleOpenDialog() : handleOpenCategoryDialog()}
          className="add-item-button"
        >
          Add {activeTab === 'items' ? 'Item' : 'Category'}
        </Button>
      </div>

      {/* Items Table */}
      {activeTab === 'items' && (
        <div className="inventory-table">
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>SKU</strong></TableCell>
                  <TableCell><strong>Item Name</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell align="right"><strong>Quantity</strong></TableCell>
                  <TableCell align="right"><strong>Min Stock</strong></TableCell>
                  <TableCell align="right"><strong>Price ($)</strong></TableCell>
                  <TableCell><strong>Supplier</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Last Updated</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <span className={`category-badge ${item.category.toLowerCase()}`}>
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className={`quantity-badge ${item.quantity < 10 ? 'low' : item.quantity < 20 ? 'medium' : 'high'}`}>
                        {item.quantity}
                      </span>
                    </TableCell>
                    <TableCell align="right">{item.minStock}</TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>
                      <span className={`stock-status-badge ${getStockStatus(item.quantity, item.minStock).replace(/\s/g, '').toLowerCase()}`}>
                        {getStockStatus(item.quantity, item.minStock)}
                      </span>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell align="center">
                      <div className="action-buttons">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(item.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Categories Table */}
      {activeTab === 'categories' && (
        <div className="inventory-table">
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Category Name</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell align="right"><strong>Item Count</strong></TableCell>
                  <TableCell align="right"><strong>Total Value ($)</strong></TableCell>
                  <TableCell><strong>Last Updated</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id} hover>
                    <TableCell>
                      <span className="category-name">{category.name}</span>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell align="right">
                      <span className="item-count">{category.itemCount}</span>
                    </TableCell>
                    <TableCell align="right">${category.totalValue.toFixed(2)}</TableCell>
                    <TableCell>{category.lastUpdated}</TableCell>
                    <TableCell align="center">
                      <div className="action-buttons">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenCategoryDialog(category)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteCategory(category.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Summary Cards */}
      {activeTab === 'categories' && (
        <div className="inventory-stats">
          <div className="stat-card">
            <h3>{categories.length}</h3>
            <p>Total Categories</p>
          </div>
          <div className="stat-card">
            <h3>{categories.reduce((sum, cat) => sum + cat.itemCount, 0)}</h3>
            <p>Total Items</p>
          </div>
          <div className="stat-card">
            <h3>{categories.filter(cat => cat.itemCount === 0).length}</h3>
            <p>Empty Categories</p>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth 
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(120deg, #2C3E50 0%, #1ABC9C 100%)',
          color: '#ECF0F1',
          fontWeight: 700,
          fontSize: '1.25rem',
          pb: 3,
          margin: '0 !important',
          padding: '24px 32px 24px 32px !important'
        }}>
          {editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}
        </DialogTitle>
        <DialogContent sx={{ 
          p: 4, 
          pt: 6, 
          overflow: 'visible',
          padding: '32px !important',
          paddingTop: '48px !important'
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                sx={{ flex: 1, minWidth: 200 }}
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                required
              />
              <TextField
                sx={{ flex: 1, minWidth: 200 }}
                label="Item Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                sx={{ flex: 1, minWidth: 200 }}
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
              <TextField
                sx={{ flex: 1, minWidth: 200 }}
                label="Supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                sx={{ flex: 1, minWidth: 200 }}
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
              <TextField
                sx={{ flex: 1, minWidth: 200 }}
                label="Min Stock"
                name="minStock"
                type="number"
                value={formData.minStock}
                onChange={handleInputChange}
                required
              />
            </Box>
            <TextField
              fullWidth
              label="Price ($)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingItem ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Category Dialog */}
      <Dialog 
        open={openCategoryDialog} 
        onClose={handleCloseCategoryDialog} 
        maxWidth="sm" 
        fullWidth 
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(120deg, #2C3E50 0%, #1ABC9C 100%)',
          color: '#ECF0F1',
          fontWeight: 700,
          fontSize: '1.25rem',
          pb: 3,
          margin: '0 !important',
          padding: '24px 32px 24px 32px !important'
        }}>
          {editingCategory ? "Edit Category" : "Add New Category"}
        </DialogTitle>
        <DialogContent sx={{ 
          p: 4, 
          pt: 6, 
          overflow: 'visible',
          padding: '32px !important',
          paddingTop: '48px !important'
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Category Name"
              name="name"
              value={categoryFormData.name}
              onChange={handleCategoryInputChange}
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={categoryFormData.description}
              onChange={handleCategoryInputChange}
              multiline
              rows={3}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategoryDialog}>Cancel</Button>
          <Button onClick={handleCategorySubmit} variant="contained">
            {editingCategory ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Item Confirmation Modal */}
      <Dialog open={openDeleteItemConfirm} onClose={() => setOpenDeleteItemConfirm(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon sx={{ color: '#c62828', fontSize: 32 }} />
          Confirm Delete Item
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteItemConfirm(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmDeleteItem} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Category Confirmation Modal */}
      <Dialog open={openDeleteCategoryConfirm} onClose={() => setOpenDeleteCategoryConfirm(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon sx={{ color: '#c62828', fontSize: 32 }} />
          Confirm Delete Category
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteCategoryConfirm(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmDeleteCategory} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InventoryManagement; 