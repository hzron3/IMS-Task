import React, { useState } from "react";
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
      {/* Header */}
      <div className="inventory-header">
        <div className="inventory-header-content">
          <h2>
            <i className="fas fa-boxes me-2"></i>
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

      {/* Search and Add Row */}
      <div className="inventory-search-row">
        <div className="search-container">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control search-input"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button
          className="btn btn-primary add-button"
          onClick={() => activeTab === 'items' ? handleOpenDialog() : handleOpenCategoryDialog()}
        >
          <i className="fas fa-plus me-2"></i>
          Add {activeTab === 'items' ? 'Item' : 'Category'}
        </button>
      </div>

      {/* Items Table */}
      {activeTab === 'items' && (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-header">
                <tr>
                  <th>SKU</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th className="text-end">Quantity</th>
                  <th className="text-end">Min Stock</th>
                  <th className="text-end">Price ($)</th>
                  <th>Supplier</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>
                      <span className={`category-badge ${item.category.toLowerCase()}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="text-end">
                      <span className={`quantity-badge ${item.quantity < 10 ? 'low' : item.quantity < 20 ? 'medium' : 'high'}`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="text-end">{item.minStock}</td>
                    <td className="text-end">${item.price.toFixed(2)}</td>
                    <td>{item.supplier}</td>
                    <td>
                      <span className={`stock-status-badge ${getStockStatus(item.quantity, item.minStock).replace(/\s/g, '').toLowerCase()}`}>
                        {getStockStatus(item.quantity, item.minStock)}
                      </span>
                    </td>
                    <td>{item.lastUpdated}</td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Categories Table */}
      {activeTab === 'categories' && (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-header">
                <tr>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th className="text-end">Item Count</th>
                  <th className="text-end">Total Value ($)</th>
                  <th>Last Updated</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <span className="category-name">{category.name}</span>
                    </td>
                    <td>{category.description}</td>
                    <td className="text-end">
                      <span className="item-count">{category.itemCount}</span>
                    </td>
                    <td className="text-end">${category.totalValue.toFixed(2)}</td>
                    <td>{category.lastUpdated}</td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleOpenCategoryDialog(category)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Cards for Categories */}
      {activeTab === 'categories' && (
        <div className="stats-container">
          <div className="row">
            <div className="col-md-4">
              <div className="stat-card">
                <h3>{categories.length}</h3>
                <p>Total Categories</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <h3>{categories.reduce((sum, cat) => sum + cat.itemCount, 0)}</h3>
                <p>Total Items</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <h3>{categories.filter(cat => cat.itemCount === 0).length}</h3>
                <p>Empty Categories</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {openDialog && (
        <div className="modal-overlay" onClick={handleCloseDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}
              </h5>
              <button type="button" className="btn-close" onClick={handleCloseDialog}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">SKU</label>
                    <input
                      type="text"
                      className="form-control"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Supplier</label>
                  <input
                    type="text"
                    className="form-control"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Min Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      name="minStock"
                      value={formData.minStock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseDialog}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                {editingItem ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {openCategoryDialog && (
        <div className="modal-overlay" onClick={handleCloseCategoryDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h5>
              <button type="button" className="btn-close" onClick={handleCloseCategoryDialog}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={categoryFormData.name}
                  onChange={handleCategoryInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={categoryFormData.description}
                  onChange={handleCategoryInputChange}
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseCategoryDialog}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCategorySubmit}>
                {editingCategory ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Item Confirmation Modal */}
      {openDeleteItemConfirm && (
        <div className="modal-overlay" onClick={() => setOpenDeleteItemConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-exclamation-triangle text-danger me-2"></i>
                Confirm Delete Item
              </h5>
              <button type="button" className="btn-close" onClick={() => setOpenDeleteItemConfirm(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setOpenDeleteItemConfirm(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteItem}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      {openDeleteCategoryConfirm && (
        <div className="modal-overlay" onClick={() => setOpenDeleteCategoryConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-exclamation-triangle text-danger me-2"></i>
                Confirm Delete Category
              </h5>
              <button type="button" className="btn-close" onClick={() => setOpenDeleteCategoryConfirm(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this category? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setOpenDeleteCategoryConfirm(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmDeleteCategory}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement; 