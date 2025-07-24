import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    // Password validation: min 8 chars, at least 1 special char
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    } else if (!/[!@#$%^&*(),.?":{}|<>_]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setErrors({});
      
      try {
        const result = await login(email, password);
        
        if (result.success) {
          // Redirect based on user role
          const role = result.user.role;
          switch (role) {
            case 'admin':
              navigate('/admin-dashboard');
              break;
            case 'manager':
              navigate('/manager-dashboard');
              break;
            case 'staff':
              navigate('/staff-dashboard');
              break;
            case 'guest':
              navigate('/guest-dashboard');
              break;
            default:
              navigate('/staff-dashboard');
          }
        } else {
          setErrors({ general: result.message });
        }
      } catch (error) {
        setErrors({ general: 'An error occurred during login. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGuestLogin = async () => {
    const result = await login('guest@gmail.com', 'guest123.');
    
    if (result.success) {
      navigate('/guest-dashboard');
    } else {
      setErrors({ general: result.message });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src="https://picsum.photos/seed/inventorypro/500/600" alt="Login visual" />
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login to InventoryPro</h2>
            <div className="form-group">
              <label htmlFor="email" className="login-label">Email</label>
              <input
                className="login-input"
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="username"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="login-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  className="login-input"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <img
                    src="https://img.icons8.com/material-outlined/24/visible--v2.png"
                    alt={showPassword ? 'Hide password' : 'Show password'}
                    className="password-toggle-icon"
                  />
                </button>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button 
              type="submit" 
              className="login-btn" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            
            {/* Divider */}
            <div className="login-divider">
              <span>or</span>
            </div>
            
            {/* Guest Login Button */}
            <button 
              type="button" 
              className="guest-login-btn"
              onClick={handleGuestLogin}
              disabled={isLoading}
            >
              Login as Guest
            </button>
            
            {errors.general && (
              <div className="error-message" style={{ 
                color: '#e74c3c', 
                textAlign: 'center', 
                marginTop: '10px',
                padding: '10px',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderRadius: '5px',
                border: '1px solid rgba(231, 76, 60, 0.2)'
              }}>
                {errors.general}
              </div>
            )}
            
            <div className="login-link-signup">
              <span>Don't have an account? </span>
              <a href="/signup">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 