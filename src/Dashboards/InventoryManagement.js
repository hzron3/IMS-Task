import React, { useState, useEffect } from "react";
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
      price: 185000,
      supplier: "Dell Inc.",
      lastUpdated: "2024-01-15T09:30:00"
    },
    {
      id: 2,
      sku: 'SKU-002',
      name: "Office Chair",
      category: "Furniture",
      quantity: 25,
      minStock: 15,
      price: 45000,
      supplier: "Office Depot",
      lastUpdated: "2024-01-14T14:15:00"
    },
    {
      id: 3,
      sku: 'SKU-003',
      name: "Printer HP LaserJet",
      category: "Electronics",
      quantity: 8,
      minStock: 5,
      price: 65000,
      supplier: "HP Inc.",
      lastUpdated: "2024-01-13T11:45:00"
    },
    {
      id: 4,
      sku: 'SKU-004',
      name: "Desk Lamp",
      category: "Furniture",
      quantity: 30,
      minStock: 10,
      price: 8500,
      supplier: "IKEA",
      lastUpdated: "2024-01-12T16:20:00"
    },
    {
      id: 5,
      sku: 'SKU-005',
      name: "Wireless Mouse",
      category: "Electronics",
      quantity: 45,
      minStock: 20,
      price: 3500,
      supplier: "Logitech",
      lastUpdated: "2024-01-10T08:55:00"
    },
    {
      id: 6,
      sku: 'SKU-006',
      name: "USB Cable",
      category: "Electronics",
      quantity: 0,
      minStock: 15,
      price: 1200,
      supplier: "Amazon",
      lastUpdated: "2024-01-08T13:10:00"
    },
    {
      id: 7,
      sku: 'SKU-007',
      name: "Notebook",
      category: "Office Supplies",
      quantity: 100,
      minStock: 50,
      price: 450,
      supplier: "Staples",
      lastUpdated: "2024-01-05T10:25:00"
    },
    {
      id: 8,
      sku: 'SKU-008',
      name: "Pen Set",
      category: "Office Supplies",
      quantity: 75,
      minStock: 30,
      price: 850,
      supplier: "Office Depot",
      lastUpdated: "2024-01-03T15:40:00"
    },
    {
      id: 9,
      sku: 'SKU-009',
      name: "Old Model Phone",
      category: "Electronics",
      quantity: 5,
      minStock: 10,
      price: 25000,
      supplier: "Samsung",
      lastUpdated: "2023-11-20T12:30:00"
    },
    {
      id: 10,
      sku: 'SKU-010',
      name: "Monitor LG 24",
      category: "Electronics",
      quantity: 2,
      minStock: 5,
      price: 52000,
      supplier: "LG Electronics",
      lastUpdated: "2023-10-15T09:15:00"
    },
    {
      id: 11,
      sku: 'SKU-011',
      name: "Expensive Desk",
      category: "Furniture",
      quantity: 3,
      minStock: 2,
      price: 135000,
      supplier: "Herman Miller",
      lastUpdated: "2024-01-16T17:45:00"
    },
    {
      id: 12,
      sku: 'SKU-012',
      name: "Paper Clips",
      category: "Office Supplies",
      quantity: 500,
      minStock: 100,
      price: 250,
      supplier: "Staples",
      lastUpdated: "2024-01-17T08:20:00"
    }
  ]);

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Electronic devices and equipment",
      itemCount: 0,
      totalValue: 0,
      lastUpdated: "2024-01-15T10:30:00",
      assignedManager: null
    },
    {
      id: 2,
      name: "Furniture",
      description: "Office furniture and fixtures",
      itemCount: 0,
      totalValue: 0,
      lastUpdated: "2024-01-14T14:45:00",
      assignedManager: "John Smith"
    },
    {
      id: 3,
      name: "Office Supplies",
      description: "General office supplies and stationery",
      itemCount: 0,
      totalValue: 0,
      lastUpdated: "2024-01-10T11:20:00",
      assignedManager: "Lisa Davis"
    }
  ]);

  // Mock managers data
  const [managers, setManagers] = useState([
    { id: 1, name: "John Smith", email: "john@inventorypro.com", assignedCategories: ["Furniture"] },
    { id: 2, name: "Lisa Davis", email: "lisa@inventorypro.com", assignedCategories: ["Office Supplies"] },
    { id: 3, name: "Mike Johnson", email: "mike@inventorypro.com", assignedCategories: [] },
    { id: 4, name: "Sarah Wilson", email: "sarah@inventorypro.com", assignedCategories: [] }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [openReassignmentWarning, setOpenReassignmentWarning] = useState(false);
  const [pendingAssignment, setPendingAssignment] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategoryForAssignment, setSelectedCategoryForAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockStatusFilter, setStockStatusFilter] = useState("all");
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
  const [assignmentFormData, setAssignmentFormData] = useState({
    managerId: "",
    managerName: ""
  });
  const [openDeleteItemConfirm, setOpenDeleteItemConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openDeleteCategoryConfirm, setOpenDeleteCategoryConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest'); 
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Calculate number of items in each category
  const calculateCategoryStats = (inventoryItems, categoriesList) => {
    return categoriesList.map(category => {
      const categoryItems = inventoryItems.filter(item => item.category === category.name && !item.isDeleted);
      const itemCount = categoryItems.length;
      const totalValue = categoryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...category,
        itemCount,
        totalValue
      };
    });
  };

  // Update categories when inventory changes
  useEffect(() => {
    setCategories(prevCategories => calculateCategoryStats(inventory, prevCategories));
  }, [inventory]);

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

  const validateItemForm = () => {
    const basicValidation = formData.sku.trim() !== '' &&
           formData.name.trim() !== '' &&
           formData.category.trim() !== '' &&
           formData.supplier.trim() !== '' &&
           formData.quantity.trim() !== '' &&
           formData.minStock.trim() !== '' &&
           formData.price.trim() !== '' &&
           parseInt(formData.quantity) >= 0 &&
           parseInt(formData.minStock) >= 0 &&
           parseFloat(formData.price) >= 0;

    return basicValidation;
  };

  const validateSKU = () => {
    const existingItemWithSKU = inventory.find(item => 
      item.sku.toLowerCase() === formData.sku.trim().toLowerCase() && 
      (!editingItem || item.id !== editingItem.id)
    );

    if (existingItemWithSKU) {
      alert(`${formData.sku.trim()} SKU already exists.`);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateItemForm()) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    if (!validateSKU()) {
      return;
    }

    if (editingItem) {
      setInventory(inventory.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              ...formData,
              quantity: parseInt(formData.quantity),
              minStock: parseInt(formData.minStock),
              price: parseFloat(formData.price),
              lastUpdated: new Date().toISOString()
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
        lastUpdated: new Date().toISOString()
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
    // Soft delete 
    setInventory(inventory.map(item => 
      item.id === itemToDelete 
        ? { 
            ...item, 
            isDeleted: true, 
            deletedAt: new Date().toISOString(), 
            deletedBy: 'Current User' 
          }
        : item
    ));
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

  const validateCategoryForm = () => {
    return categoryFormData.name.trim() !== '' &&
           categoryFormData.description.trim() !== '';
  };

  const handleCategorySubmit = () => {
    if (!validateCategoryForm()) {
      alert('Please fill in all required fields.');
      return;
    }

    if (editingCategory) {
      setCategories(categories.map(category =>
        category.id === editingCategory.id
          ? {
              ...category,
              ...categoryFormData,
              lastUpdated: new Date().toISOString()
            }
          : category
      ));
    } else {
      const newCategory = {
        id: Math.max(...categories.map(category => category.id)) + 1,
        ...categoryFormData,
        itemCount: 0,
        totalValue: 0,
        lastUpdated: new Date().toISOString()
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
    const categoryToDeleteObj = categories.find(cat => cat.id === categoryToDelete);
    
    // Check if there are items in this category
    const itemsInCategory = inventory.filter(item => item.category === categoryToDeleteObj?.name && !item.isDeleted);
    
    if (itemsInCategory.length > 0) {
      // If there are active items, show an alert and prevent deletion
      alert(`Cannot delete category "${categoryToDeleteObj?.name}" because it contains ${itemsInCategory.length} active item(s). Please reassign or delete these items first.`);
      setOpenDeleteCategoryConfirm(false);
      setCategoryToDelete(null);
      return;
    }
    
    // Soft delete
    setCategories(categories.map(cat => 
      cat.id === categoryToDelete 
        ? { 
            ...cat, 
            isDeleted: true, 
            deletedAt: new Date().toISOString(), 
            deletedBy: 'Current User' 
          }
        : cat
    ));
    setOpenDeleteCategoryConfirm(false);
    setCategoryToDelete(null);
  };

  // Category Assignment Handlers
  const handleOpenAssignmentDialog = (category) => {
    setSelectedCategoryForAssignment(category);
    setAssignmentFormData({
      managerId: category.assignedManager ? managers.find(m => m.name === category.assignedManager)?.id || "" : "",
      managerName: category.assignedManager || ""
    });
    setOpenAssignmentDialog(true);
  };

  const handleCloseAssignmentDialog = () => {
    setOpenAssignmentDialog(false);
    setSelectedCategoryForAssignment(null);
    setAssignmentFormData({
      managerId: "",
      managerName: ""
    });
  };

  const handleAssignmentInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update manager name when manager ID changes
    if (name === 'managerId') {
      const selectedManager = managers.find(m => m.id.toString() === value);
      setAssignmentFormData(prev => ({
        ...prev,
        managerName: selectedManager ? selectedManager.name : ""
      }));
    }
  };

  const handleAssignmentSubmit = () => {
    if (!selectedCategoryForAssignment || !assignmentFormData.managerId) return;

    const selectedManager = managers.find(m => m.id.toString() === assignmentFormData.managerId);
    
    // Check if the selected manager already has a category assigned and show warning modal if true
    if (selectedManager && selectedManager.assignedCategories.length > 0) {
      setPendingAssignment({
        manager: selectedManager,
        category: selectedCategoryForAssignment,
        oldCategory: selectedManager.assignedCategories[0] 
      });
      setOpenReassignmentWarning(true);
      return;
    }

    performAssignment(selectedManager, selectedCategoryForAssignment);
  };

  const performAssignment = (selectedManager, category) => {
    // Update category with assigned manager
    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.id === category.id 
          ? { ...cat, assignedManager: selectedManager ? selectedManager.name : null }
          : cat
      )
    );

    // Update managers state to reflect the new assignment and remove the old category
    setManagers(prevManagers => 
      prevManagers.map(manager => {
        if (manager.id.toString() === assignmentFormData.managerId) {
          const updatedCategories = [...manager.assignedCategories, category.name];
          return { ...manager, assignedCategories: updatedCategories };
        } else if (manager.assignedCategories.includes(category.name)) {
          const updatedCategories = manager.assignedCategories.filter(cat => cat !== category.name);
          return { ...manager, assignedCategories: updatedCategories };
        }
        return manager;
      })
    );

    handleCloseAssignmentDialog();
  };

  const handleConfirmReassignment = () => {
    if (!pendingAssignment) return;

    const { manager, category, oldCategory } = pendingAssignment;

    // Remove the old assignment
    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.name === oldCategory 
          ? { ...cat, assignedManager: null }
          : cat
      )
    );

    // Update managers to remove old category
    setManagers(prevManagers => 
      prevManagers.map(m => 
        m.id === manager.id 
          ? { ...m, assignedCategories: [] }
          : m
      )
    );

    // Performs the new assignment
    performAssignment(manager, category);

    setOpenReassignmentWarning(false);
    setPendingAssignment(null);
  };

  // Cancel reassignment if false
  const handleCancelReassignment = () => {
    setOpenReassignmentWarning(false);
    setPendingAssignment(null);
    setAssignmentFormData({
      managerId: "",
      managerName: ""
    });
  };

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 30000); // hide after 30 seconds
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Show toast notification for categories tab if there are unassigned categories
    if (tab === 'categories') {
      const unassignedCategories = categories.filter(cat => !cat.assignedManager);
      if (unassignedCategories.length > 0) {
        const message = unassignedCategories.length === 1 
          ? "1 category is missing a manager assignment"
          : `${unassignedCategories.length} categories are missing manager assignments`;
        showToastNotification(message);
      }
    }
  };

  const handleRemoveAssignment = (categoryId) => {
    const categoryToRemove = categories.find(cat => cat.id === categoryId);
    
    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, assignedManager: null }
          : cat
      )
    );

    // Update managers state to remove the category from the assigned manager
    if (categoryToRemove && categoryToRemove.assignedManager) {
      setManagers(prevManagers => 
        prevManagers.map(manager => {
          if (manager.name === categoryToRemove.assignedManager) {
            const updatedCategories = manager.assignedCategories.filter(cat => cat !== categoryToRemove.name);
            return { ...manager, assignedCategories: updatedCategories };
          }
          return manager;
        })
      );
    }
  };

  const getStockStatus = (quantity, minStock) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity > minStock) return 'In Stock';
    if (quantity <= minStock && quantity > minStock / 2) return 'Low Stock';
    if (quantity <= minStock / 2 && quantity > 0) return 'Critical';
    return '';
  };

  const getQuantityStatus = (quantity, minStock) => {
    if (quantity === 0) return 'outofstock';
    if (quantity > minStock) return 'instock';
    if (quantity <= minStock && quantity > minStock / 2) return 'lowstock';
    if (quantity <= minStock / 2 && quantity > 0) return 'critical';
    return 'instock';
  };

  const sortByDate = (a, b) => {
    const dateA = new Date(a.lastUpdated);
    const dateB = new Date(b.lastUpdated);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    // Format: "Jan 15, 2024 09:30 AM" or "2 hours ago" for recent updates
    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return `${diffInMinutes} minutes ago`;
      }
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  const filteredInventory = inventory.filter(item => {
    // Exclude deleted items by default
    if (item.isDeleted) return false;
    
    // Text search filter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Stock status filter
    const matchesStockStatus = stockStatusFilter === "all" || 
                              getStockStatus(item.quantity, item.minStock).toLowerCase() === stockStatusFilter.toLowerCase();
    
    return matchesSearch && matchesStockStatus;
  }).sort(sortByDate);

  const filteredCategories = categories.filter(cat => {
    // Exclude deleted categories by default
    if (cat.isDeleted) return false;
    
    return cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           cat.description.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort(sortByDate);

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
              onClick={() => handleTabChange('items')}
            >
              Items
            </button>
            <button
              className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => handleTabChange('categories')}
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
                  <th className="text-end">Price (Ksh)</th>
                  <th>Supplier</th>
                  <th>
                    <div className="status-filter-header">
                      <span>Status</span>
                      <select
                        className="status-filter-dropdown"
                        value={stockStatusFilter}
                        onChange={(e) => setStockStatusFilter(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="all">All</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Critical">Critical</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                  >
                    Last Updated
                    <span className="sort-indicator">
                      {sortOrder === 'newest' ? (
                        <i className="fas fa-sort-up"></i>
                      ) : (
                        <i className="fas fa-sort-down"></i>
                      )}
                    </span>
                  </th>
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
                      <span className={`quantity-badge ${getQuantityStatus(item.quantity, item.minStock)}`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="text-end">{item.minStock}</td>
                    <td className="text-end">Ksh {item.price.toFixed(2)}</td>
                    <td>{item.supplier}</td>
                    <td>
                      <span className={`stock-status-badge ${getStockStatus(item.quantity, item.minStock).replace(/\s/g, '').toLowerCase()}`}>
                        {getStockStatus(item.quantity, item.minStock)}
                      </span>
                    </td>
                    <td>{formatDateTime(item.lastUpdated)}</td>
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
                  <th className="text-end">Total Value (Ksh)</th>
                  <th>Assigned Manager</th>
                  <th 
                    className="sortable-header"
                    onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                  >
                    Last Updated
                    <span className="sort-indicator">
                      {sortOrder === 'newest' ? (
                        <i className="fas fa-sort-up"></i>
                      ) : (
                        <i className="fas fa-sort-down"></i>
                      )}
                    </span>
                  </th>
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
                    <td className="text-end">Ksh {category.totalValue.toFixed(2)}</td>
                    <td>
                      {category.assignedManager ? (
                        <div className="assigned-manager">
                          <span className="manager-badge">
                            <i className="fas fa-user-tie me-1"></i>
                            {category.assignedManager}
                          </span>
                        </div>
                      ) : (
                        <span className="no-manager text-muted">
                          <i className="fas fa-user-slash me-1"></i>
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td>{formatDateTime(category.lastUpdated)}</td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleOpenCategoryDialog(category)}
                          title="Edit Category"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-info"
                          onClick={() => handleOpenAssignmentDialog(category)}
                          title="Assign Manager"
                        >
                          <i className="fas fa-user-plus"></i>
                        </button>
                        {category.assignedManager && (
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => handleRemoveAssignment(category.id)}
                            title="Remove Assignment"
                          >
                            <i className="fas fa-user-minus"></i>
                          </button>
                        )}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteCategory(category.id)}
                          title="Delete Category"
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
            <div className="col-md-3">
              <div className="stat-card">
                <h3>{categories.filter(cat => !cat.isDeleted).length}</h3>
                <p>Total Categories</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3>{categories.filter(cat => !cat.isDeleted).reduce((sum, cat) => sum + cat.itemCount, 0)}</h3>
                <p>Total Items</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3>{categories.filter(cat => !cat.isDeleted && cat.itemCount === 0).length}</h3>
                <p>Empty Categories</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3>{categories.filter(cat => !cat.isDeleted && cat.assignedManager).length}</h3>
                <p>Assigned Categories</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards for Items */}
      {activeTab === 'items' && (
        <div className="stats-container">
          <div className="row">
            <div className="col-md-2">
              <div className="stat-card">
                <h3>{inventory.filter(item => !item.isDeleted).length}</h3>
                <p>Total Items</p>
              </div>
            </div>
            <div className="col-md-2">
              <div className="stat-card">
                <h3>{inventory.filter(item => !item.isDeleted && item.quantity === 0).length}</h3>
                <p>Out of Stock</p>
              </div>
            </div>
            <div className="col-md-2">
              <div className="stat-card">
                <h3>{inventory.filter(item => !item.isDeleted && item.quantity > 0 && item.quantity <= item.minStock && item.quantity > item.minStock / 2).length}</h3>
                <p>Low Stock</p>
              </div>
            </div>
            <div className="col-md-2">
              <div className="stat-card">
                <h3>{inventory.filter(item => !item.isDeleted && item.quantity > 0 && item.quantity <= item.minStock / 2).length}</h3>
                <p>Critical</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <h3>Ksh {inventory.filter(item => !item.isDeleted).reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</h3>
                <p>Total Inventory Value</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {openDialog && (
        <div className="modal-overlay">
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
                    {categories.filter(cat => !cat.isDeleted).map((category) => (
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
                <label className="form-label">Price (Ksh)</label>
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
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleSubmit}
                disabled={!validateItemForm()}
              >
                {editingItem ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {openCategoryDialog && (
        <div className="modal-overlay">
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
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleCategorySubmit}
                disabled={!validateCategoryForm()}
              >
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
              <p>Are you sure you want to delete this item? It will be moved to the Recycle Bin where you can restore it later or delete it permanently.</p>
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
              <p>Are you sure you want to delete this category? It will be moved to the Recycle Bin where you can restore it later or delete it permanently.</p>
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

      {/* Category Assignment Modal */}
      {openAssignmentDialog && (
        <div className="modal-overlay" onClick={handleCloseAssignmentDialog}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-user-plus text-info me-2"></i>
                Assign Manager to Category
              </h5>
              <button type="button" className="btn-close" onClick={handleCloseAssignmentDialog}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedCategoryForAssignment?.name || ""}
                  readOnly
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Select Manager</label>
                <select
                  className="form-select"
                  name="managerId"
                  value={assignmentFormData.managerId}
                  onChange={handleAssignmentInputChange}
                  required
                >
                  <option value="">Select a manager</option>
                  {managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name} ({manager.email})
                    </option>
                  ))}
                </select>
              </div>
              {assignmentFormData.managerName && (
                <div className="mb-3">
                  <label className="form-label">Selected Manager</label>
                  <div className="alert alert-info">
                    <i className="fas fa-user-tie me-2"></i>
                    <strong>{assignmentFormData.managerName}</strong>
                  </div>
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Current Assignments</label>
                <div className="current-assignments">
                  {managers.map((manager) => (
                    <div key={manager.id} className="manager-assignment-item">
                      <strong>{manager.name}:</strong>
                      {manager.assignedCategories.length > 0 ? (
                        <span className="assigned-categories">
                          {manager.assignedCategories.join(", ")}
                        </span>
                      ) : (
                        <span className="no-assignments text-muted">No categories assigned</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseAssignmentDialog}>
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleAssignmentSubmit}
                disabled={!assignmentFormData.managerId}
              >
                Assign Manager
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reassignment Warning Modal */}
      {openReassignmentWarning && (
        <div className="modal-overlay" onClick={handleCancelReassignment}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                Manager Already Assigned
              </h5>
              <button type="button" className="btn-close" onClick={handleCancelReassignment}></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Warning:</strong> This manager is already assigned to a category.
              </div>
              
              <div className="mb-3">
                <p><strong>Manager:</strong> {pendingAssignment?.manager?.name}</p>
                <p><strong>Currently Assigned to:</strong> {pendingAssignment?.oldCategory}</p>
                <p><strong>New Assignment:</strong> {pendingAssignment?.category?.name}</p>
              </div>

              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                <strong>What will happen:</strong>
                <ul className="mb-0 mt-2">
                  <li>The manager will be <strong>unassigned</strong> from "{pendingAssignment?.oldCategory}"</li>
                  <li>The manager will be <strong>assigned</strong> to "{pendingAssignment?.category?.name}"</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCancelReassignment}>
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-warning" 
                onClick={handleConfirmReassignment}
              >
                <i className="fas fa-exchange-alt me-2"></i>
                Proceed with Reassignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <i className="fas fa-info-circle toast-icon"></i>
            <span className="toast-message">{toastMessage}</span>
            <button 
              className="toast-close" 
              onClick={() => setShowToast(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement; 