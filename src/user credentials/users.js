//valid users for the app -use credentials to login
export const users = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'admin@gmail.com',
    password: 'admin123.',
    role: 'admin',
    avatar: 'JD',
    lastActive: '2 hours ago',
    status: 'online'
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'manager@gmail.com',
    password: 'manager123.',
    role: 'manager',
    avatar: 'JS',
    lastActive: '1 hour ago',
    status: 'online'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'staff@gmail.com',
    password: 'staff123.',
    role: 'staff',
    avatar: 'MJ',
    lastActive: '30 min ago',
    status: 'online'
  },
  {
    id: 4,
    name: 'Guest User',
    email: 'guest@gmail.com',
    password: 'guest123.',
    role: 'guest',
    avatar: 'GU',
    lastActive: '5 min ago',
    status: 'online'
  }
];

export const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

export const validateCredentials = (email, password) => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    // Return user object without password for security
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

export const getUserById = (id) => {
  const user = users.find(user => user.id === id);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}; 