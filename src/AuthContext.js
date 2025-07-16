import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      if (AuthService.isAuthenticated()) {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    const result = AuthService.login(email, password);
    
    if (result.success) {
      setUser(result.user);
      setIsAuthenticated(true);
      return { success: true, user: result.user };
    }
    
    return { success: false, message: result.message };
  };

  // Logout function
  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check role function
  const hasRole = (requiredRoles) => {
    return AuthService.hasRole(requiredRoles);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 