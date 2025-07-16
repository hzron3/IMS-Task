import { validateCredentials } from '../user credentials/users';

class AuthService {
  login(email, password) {
    const user = validateCredentials(email, password);
    
    if (user) {
      const session = {
        user,
        token: this.generateToken(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      };
      
      // Store in localStorage
      localStorage.setItem('authSession', JSON.stringify(session));
      
      return { success: true, user, session };
    }
    
    return { success: false, message: 'Invalid credentials' };
  }
  
  logout() {
    localStorage.removeItem('authSession');
    return { success: true };
  }
  
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
}

export default new AuthService(); 