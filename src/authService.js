import { validateCredentials } from './user credentials/users';

class AuthService {
  // Login method
  login(email, password) {
    const user = validateCredentials(email, password);
    
    if (user) {
      // Create session
      const session = {
        user,
        token: this.generateToken(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        authenticatedForDashboard: user.role 
      };
      
      // Store in localStorage
      localStorage.setItem('authSession', JSON.stringify(session));
      
      return { success: true, user, session };
    }
    
    return { success: false, message: 'Invalid credentials' };
  }
  
  // Logout method
  logout() {
    localStorage.removeItem('authSession');
    return { success: true };
  }
  
  // Check if user is authenticated
  isAuthenticated() {
    const session = this.getSession();
    if (!session) return false;
    
    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      this.logout();
      return false;
    }
    
    return true;
  }
  
  getCurrentUser() {
    const session = this.getSession();
    return session ? session.user : null;
  }
  
  // Get session from localStorage
  getSession() {
    try {
      const session = localStorage.getItem('authSession');
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Error parsing session:', error);
      return null;
    }
  }
  
  generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  
  // Check if user has required role
  hasRole(requiredRoles) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    
    return user.role === requiredRoles;
  }

  isAuthenticatedForDashboard(requiredRole) {
    const session = this.getSession();
    if (!session) return false;
    
    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      this.logout();
      return false;
    }
    
    return session.authenticatedForDashboard === requiredRole;
  }

  //Get the dashboard the user is currently authenticated for
  getAuthenticatedDashboard() {
    const session = this.getSession();
    return session ? session.authenticatedForDashboard : null;
  }
}

const authService = new AuthService();
export default authService; 