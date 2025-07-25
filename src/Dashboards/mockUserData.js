//mock data for the entire inventory management system
export const mockData = {
  // User Management Data
  stats: {
    totalUsers: 24,
    activeUsers: 18,
    newUsers: 3
  },
  users: [
    { id: 1, name: 'Jane Doe', email: 'jane@inventorypro.com', role: 'Admin', lastActive: '2 hours ago', status: 'online', avatar: 'JD' },
    { id: 2, name: 'John Smith', email: 'john@inventorypro.com', role: 'Manager', lastActive: '1 hour ago', status: 'online', avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', email: 'mike@inventorypro.com', role: 'Staff', lastActive: '30 min ago', status: 'online', avatar: 'MJ' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@inventorypro.com', role: 'Admin', lastActive: '1 day ago', status: 'offline', avatar: 'SW' },
    { id: 5, name: 'Alex Brown', email: 'alex@inventorypro.com', role: 'Staff', lastActive: '2 days ago', status: 'offline', avatar: 'AB' },
    { id: 6, name: 'Lisa Davis', email: 'lisa@inventorypro.com', role: 'Manager', lastActive: '3 hours ago', status: 'online', avatar: 'LD' }
  ],
  roles: [
    { name: 'Admin', count: 2, permissions: ['Full Access', 'User Management', 'System Settings'] },
    { name: 'Manager', count: 2, permissions: ['Inventory Management', 'Reports', 'Staff Management'] },
    { name: 'Staff', count: 18, permissions: ['Basic Operations', 'Stock Updates', 'View Reports'] },
    { name: 'Guest', count: 2, permissions: ['View Only', 'Limited Access'] }
  ],
  accessLogs: [
    { user: 'Jane Doe', role: 'Admin', action: 'Login', description: 'Successfully logged into the system', time: '2 hours ago', duration: '45 min' },
    { user: 'Jane Doe', role: 'Admin', action: 'User Management', description: 'Added new user: Lisa Davis', time: '3 hours ago', duration: '15 min' },
    { user: 'John Smith', role: 'Manager', action: 'Inventory Update', description: 'Updated stock levels for Electronics category', time: '3 hours ago', duration: '2 hours' },
    { user: 'John Smith', role: 'Manager', action: 'Report Generation', description: 'Generated monthly inventory report', time: '4 hours ago', duration: '30 min' },
    { user: 'Mike Johnson', role: 'Staff', action: 'Login', description: 'Successfully logged into the system', time: '4 hours ago', duration: '1 hour' },
    { user: 'Mike Johnson', role: 'Staff', action: 'Stock Update', description: 'Updated quantity for Laptop Charger item', time: '5 hours ago', duration: '10 min' },
    { user: 'Sarah Wilson', role: 'Admin', action: 'System Settings', description: 'Modified notification preferences', time: '1 day ago', duration: '30 min' },
    { user: 'Sarah Wilson', role: 'Admin', action: 'Role Management', description: 'Updated permissions for Manager role', time: '1 day ago', duration: '45 min' },
    { user: 'Alex Brown', role: 'Staff', action: 'Failed Login', description: 'Multiple failed login attempts detected', time: '2 days ago', duration: '0 min' },
    { user: 'Lisa Davis', role: 'Manager', action: 'Login', description: 'Successfully logged into the system', time: '3 hours ago', duration: '1.5 hours' }
  ],

  // Inventory Data
  inventory: {
    // Overall KPIs
    kpis: {
      totalValue: 6784500, // KSH 
      totalItems: 1247, 
      lowStock: 23, 
      outOfStock: 5,
      categories: 12, 
      stockAvailability: 85 
    },

    // Categories
    categories: [
      { id: 1, name: 'Electronics', description: 'Electronic devices and accessories', itemCount: 8, totalValue: 2500000, assignedManager: 'John Smith', isDeleted: false, deletedAt: null, deletedBy: null },
      { id: 2, name: 'Furniture', description: 'Office furniture and fixtures', itemCount: 4, totalValue: 1800000, assignedManager: 'Lisa Davis', isDeleted: false, deletedAt: null, deletedBy: null },
      { id: 3, name: 'Office Supplies', description: 'Basic office supplies', itemCount: 4, totalValue: 1200000, assignedManager: 'John Smith', isDeleted: false, deletedAt: null, deletedBy: null },
      { id: 4, name: 'Clothing', description: 'Work uniforms and apparel', itemCount: 3, totalValue: 800000, assignedManager: 'Lisa Davis', isDeleted: false, deletedAt: null, deletedBy: null },
      { id: 5, name: 'Books', description: 'Reference books and manuals', itemCount: 2, totalValue: 484500, assignedManager: 'John Smith', isDeleted: false, deletedAt: null, deletedBy: null },
      { id: 6, name: 'Old Equipment', description: 'Deprecated and obsolete equipment', itemCount: 0, totalValue: 0, assignedManager: null, isDeleted: true, deletedAt: '2024-01-10T14:30:00', deletedBy: 'Jane Doe' },
      { id: 7, name: 'Test Category', description: 'Testing category for development', itemCount: 0, totalValue: 0, assignedManager: null, isDeleted: true, deletedAt: '2024-01-15T09:15:00', deletedBy: 'John Smith' }
    ],

    // Items
    items: [
      {
        id: 1,
        sku: 'SKU-001',
        name: 'Laptop Dell XPS 13',
        category: 'Electronics',
        quantity: 15,
        minStock: 10,
        price: 185000,
        supplier: 'Dell Inc.',
        lastUpdated: '2024-01-15T09:30:00',
        status: 'In Stock',
        assignedStaff: 'Mike Johnson',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 2,
        sku: 'SKU-002',
        name: 'Office Chair',
        category: 'Furniture',
        quantity: 25,
        minStock: 15,
        price: 45000,
        supplier: 'Office Depot',
        lastUpdated: '2024-01-14T14:15:00',
        status: 'In Stock',
        assignedStaff: 'Alex Brown',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 3,
        sku: 'SKU-003',
        name: 'Printer HP LaserJet',
        category: 'Electronics',
        quantity: 8,
        minStock: 5,
        price: 65000,
        supplier: 'HP Inc.',
        lastUpdated: '2024-01-13T11:45:00',
        status: 'Low Stock',
        assignedStaff: 'Mike Johnson',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 4,
        sku: 'SKU-004',
        name: 'Desk Lamp',
        category: 'Furniture',
        quantity: 30,
        minStock: 10,
        price: 8500,
        supplier: 'IKEA',
        lastUpdated: '2024-01-12T16:20:00',
        status: 'In Stock',
        assignedStaff: 'Alex Brown',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 5,
        sku: 'SKU-005',
        name: 'Wireless Mouse',
        category: 'Electronics',
        quantity: 8,
        minStock: 15,
        price: 3500,
        supplier: 'Logitech',
        lastUpdated: '2024-01-14T14:15:00',
        status: 'Low Stock',
        assignedStaff: 'Mike Johnson',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 6,
        sku: 'SKU-006',
        name: 'USB Cable',
        category: 'Electronics',
        quantity: 0,
        minStock: 20,
        price: 1200,
        supplier: 'Amazon',
        lastUpdated: '2024-01-12T16:20:00',
        status: 'Out of Stock',
        assignedStaff: 'Mike Johnson',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 7,
        sku: 'SKU-007',
        name: 'Notebook',
        category: 'Office Supplies',
        quantity: 100,
        minStock: 50,
        price: 450,
        supplier: 'Staples',
        lastUpdated: '2024-01-05T10:30:00',
        status: 'In Stock',
        assignedStaff: 'Alex Brown',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 8,
        sku: 'SKU-008',
        name: 'Pen Set',
        category: 'Office Supplies',
        quantity: 75,
        minStock: 30,
        price: 850,
        supplier: 'Office Depot',
        lastUpdated: '2024-01-03T14:20:00',
        status: 'In Stock',
        assignedStaff: 'Alex Brown',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 9,
        sku: 'SKU-009',
        name: 'Old Model Phone',
        category: 'Electronics',
        quantity: 5,
        minStock: 10,
        price: 25000,
        supplier: 'Samsung',
        lastUpdated: '2023-11-20T09:15:00',
        status: 'Low Stock',
        assignedStaff: 'Mike Johnson',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 10,
        sku: 'SKU-010',
        name: 'Monitor LG 24',
        category: 'Electronics',
        quantity: 2,
        minStock: 5,
        price: 52000,
        supplier: 'LG Electronics',
        lastUpdated: '2023-10-15T11:45:00',
        status: 'Low Stock',
        assignedStaff: 'Mike Johnson',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 11,
        sku: 'SKU-011',
        name: 'Expensive Desk',
        category: 'Furniture',
        quantity: 3,
        minStock: 2,
        price: 135000,
        supplier: 'Herman Miller',
        lastUpdated: '2024-01-16T17:45:00',
        status: 'Low Stock',
        assignedStaff: 'Alex Brown',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 12,
        sku: 'SKU-012',
        name: 'Paper Clips',
        category: 'Office Supplies',
        quantity: 500,
        minStock: 100,
        price: 250,
        supplier: 'Staples',
        lastUpdated: '2024-01-17T08:30:00',
        status: 'In Stock',
        assignedStaff: 'Alex Brown',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 13,
        sku: 'SKU-013',
        name: 'Filing Cabinet',
        category: 'Furniture',
        quantity: 0,
        minStock: 5,
        price: 25000,
        supplier: 'Staples',
        lastUpdated: '2024-01-10T09:30:00',
        status: 'Out of Stock',
        assignedStaff: 'Alex Brown',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 14,
        sku: 'SKU-014',
        name: 'Laptop Charger',
        category: 'Electronics',
        quantity: 45,
        minStock: 20,
        price: 3500,
        supplier: 'Dell Inc.',
        lastUpdated: '2024-01-15T10:30:00',
        status: 'In Stock',
        assignedStaff: 'Mike Johnson',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 15,
        sku: 'SKU-015',
        name: 'Wireless Headphones',
        category: 'Electronics',
        quantity: 12,
        minStock: 8,
        price: 8500,
        supplier: 'Sony',
        lastUpdated: '2024-01-16T14:20:00',
        status: 'In Stock',
        assignedStaff: 'Mike Johnson',
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      {
        id: 16,
        sku: 'SKU-DELETED-001',
        name: 'Old Printer Model',
        category: 'Electronics',
        quantity: 0,
        minStock: 5,
        price: 25000,
        supplier: 'HP Inc.',
        lastUpdated: '2024-01-10T11:45:00',
        status: 'Out of Stock',
        assignedStaff: 'Mike Johnson',
        isDeleted: true,
        deletedAt: '2024-01-15T14:30:00',
        deletedBy: 'Jane Doe'
      },
      {
        id: 17,
        sku: 'SKU-DELETED-002',
        name: 'Broken Desk Chair',
        category: 'Furniture',
        quantity: 2,
        minStock: 10,
        price: 15000,
        supplier: 'Office Depot',
        lastUpdated: '2024-01-08T16:20:00',
        status: 'Low Stock',
        assignedStaff: 'Alex Brown',
        isDeleted: true,
        deletedAt: '2024-01-12T10:15:00',
        deletedBy: 'John Smith'
      },
      {
        id: 18,
        sku: 'SKU-DELETED-003',
        name: 'Expired Notebooks',
        category: 'Office Supplies',
        quantity: 50,
        minStock: 20,
        price: 300,
        supplier: 'Staples',
        lastUpdated: '2024-01-05T09:30:00',
        status: 'In Stock',
        assignedStaff: 'Alex Brown',
        isDeleted: true,
        deletedAt: '2024-01-14T13:45:00',
        deletedBy: 'Lisa Davis'
      }
    ],

    // Chart Data
    categoryData: [
      { name: 'Electronics', value: 2500000, color: '#1ABC9C' },
      { name: 'Furniture', value: 1800000, color: '#27ae60' },
      { name: 'Office Supplies', value: 1200000, color: '#f39c12' },
      { name: 'Clothing', value: 800000, color: '#e67e22' },
      { name: 'Books', value: 484500, color: '#e74c3c' }
    ],

    stockStatusData: [
      { name: 'In Stock', value: 1050, color: '#27ae60' },
      { name: 'Low Stock', value: 174, color: '#f39c12' },
      { name: 'Out of Stock', value: 23, color: '#e74c3c' }
    ],

    turnoverByCategory: [
      { category: 'Electronics', turnover: 8.5, color: '#1ABC9C' },
      { category: 'Furniture', turnover: 2.1, color: '#27ae60' },
      { category: 'Office Supplies', turnover: 25.3, color: '#f39c12' },
      { category: 'Clothing', turnover: 12.3, color: '#e67e22' },
      { category: 'Books', turnover: 6.2, color: '#e74c3c' }
    ],

    topMovingItems: [
      { name: 'Laptop Charger', sales: 156, category: 'Electronics' },
      { name: 'Wireless Mouse', sales: 142, category: 'Electronics' },
      { name: 'USB Cable', sales: 138, category: 'Electronics' },
      { name: 'Notebook', sales: 125, category: 'Office Supplies' },
      { name: 'Pen Set', sales: 118, category: 'Office Supplies' }
    ],

    // Staff Assignment Data
    staffAssignments: {
      'Mike Johnson': {
        name: 'Mike Johnson',
        email: 'mike.johnson@inventorypro.com',
        role: 'Warehouse Staff',
        avatar: 'MJ',
        status: 'online',
        lastActivity: '2024-01-15T10:30:00',
        performance: 88,
        assignedItemsCount: 8,
        lowStockItems: 4,
        completedTasks: 12,
        pendingTasks: 2,
        assignedCategories: ['Electronics'],
        assignedItems: [1, 3, 5, 6, 9, 10, 14, 15] // Item IDs
      },
      'Alex Brown': {
        name: 'Alex Brown',
        email: 'alex@inventorypro.com',
        role: 'Warehouse Staff',
        avatar: 'AB',
        status: 'offline',
        lastActivity: '2024-01-13T16:45:00',
        performance: 92,
        assignedItemsCount: 7,
        lowStockItems: 2,
        completedTasks: 15,
        pendingTasks: 1,
        assignedCategories: ['Furniture', 'Office Supplies'],
        assignedItems: [2, 4, 7, 8, 11, 12, 13] // Item IDs
      }
    },

    // Tasks and Activity Data
    tasks: [
      {
        id: 1,
        title: 'Inventory count for Electronics',
        description: 'Complete physical count of all electronics items',
        assignedTo: 'Mike Johnson',
        dueDate: '2024-01-20',
        status: 'completed',
        priority: 'high',
        category: 'Electronics'
      },
      {
        id: 2,
        title: 'Restock USB Cables',
        description: 'Order and receive new USB cable stock',
        assignedTo: 'Mike Johnson',
        dueDate: '2024-01-18',
        status: 'pending',
        priority: 'critical',
        category: 'Electronics'
      },
      {
        id: 3,
        title: 'Update furniture inventory',
        description: 'Verify and update all furniture item quantities',
        assignedTo: 'Alex Brown',
        dueDate: '2024-01-22',
        status: 'in-progress',
        priority: 'medium',
        category: 'Furniture'
      }
    ],

    recentActivity: [
      {
        id: 1,
        action: 'Updated stock for Laptop Dell XPS 13',
        quantity: '+5',
        timestamp: '2024-01-15T09:30:00',
        type: 'stock_update',
        user: 'Mike Johnson',
        item: 'Laptop Dell XPS 13'
      },
      {
        id: 2,
        action: 'Completed task: Inventory count for Electronics',
        timestamp: '2024-01-14T16:45:00',
        type: 'task_completed',
        user: 'Mike Johnson',
        item: null
      },
      {
        id: 3,
        action: 'Removed stock for Wireless Mouse',
        quantity: '-3',
        timestamp: '2024-01-14T14:15:00',
        type: 'stock_update',
        user: 'Mike Johnson',
        item: 'Wireless Mouse'
      },
      {
        id: 4,
        action: 'Added new Expensive Desk item',
        timestamp: '2024-01-16T17:45:00',
        type: 'item_added',
        user: 'John Smith',
        item: 'Expensive Desk'
      },
      {
        id: 5,
        action: 'Filing Cabinet is out of stock',
        timestamp: '2024-01-10T09:30:00',
        type: 'low_stock_alert',
        user: 'System',
        item: 'Filing Cabinet'
      }
    ]
  },

  // Analytics Data
  analytics: {
    monthlyTrends: [
      { month: 'Jan', value: 18500000, turnover: 6.2 },
      { month: 'Feb', value: 17200000, turnover: 5.8 },
      { month: 'Mar', value: 19500000, turnover: 7.1 },
      { month: 'Apr', value: 18800000, turnover: 6.9 },
      { month: 'May', value: 21500000, turnover: 8.3 },
      { month: 'Jun', value: 22800000, turnover: 9.1 },
      { month: 'Jul', value: 25200000, turnover: 10.2 },
      { month: 'Aug', value: 21200000, turnover: 7.8 },
      { month: 'Sep', value: 28500000, turnover: 11.5 },
      { month: 'Oct', value: 26500000, turnover: 9.9 },
      { month: 'Nov', value: 29800000, turnover: 12.1 },
      { month: 'Dec', value: 33500000, turnover: 13.8 }
    ],
    performanceMetrics: {
      avgOrderValue: 45000,
      orderFulfillmentRate: 96.8,
      stockAccuracy: 94.2,
      reorderEfficiency: 78.9
    }
  }
};


export const getInventoryItems = () => mockData.inventory.items;
export const getInventoryKPIs = () => mockData.inventory.kpis;
export const getCategories = () => mockData.inventory.categories;
export const getStaffAssignments = () => mockData.inventory.staffAssignments;
export const getTasks = () => mockData.inventory.tasks;
export const getRecentActivity = () => mockData.inventory.recentActivity;
export const getUsers = () => mockData.users; 