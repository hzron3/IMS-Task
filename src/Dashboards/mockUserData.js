// Mock data for user management
export const mockData = {
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
  ]
}; 