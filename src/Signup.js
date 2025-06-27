import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const roles = [
  { value: '', label: 'Select Role' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'warehouse', label: 'Warehouse Staff' },
];

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    } else if (!/[!@#$%^&*(),.?":{}|<>_]/.test(form.password)) {
      newErrors.password = 'Password must contain at least one special character.';
    }
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!form.role) newErrors.role = 'Please select a role.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Mock signup - redirect based on role
      switch (form.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'manager':
          navigate('/manager-dashboard');
          break;
        case 'warehouse':
          navigate('/staff-dashboard');
          break;
        default:
          setErrors({ role: 'Please select a valid role.' });
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up for InventoryPro</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="signup-input"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="signup-input"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="username"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  className="signup-input"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="new-password"
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  className="signup-input"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  <img
                    src="https://img.icons8.com/material-outlined/24/visible--v2.png"
                    alt={showConfirmPassword ? 'Hide password' : 'Show password'}
                    className="password-toggle-icon"
                  />
                </button>
              </div>
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="signup-input"
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
            <div className="signup-link-login">
              <span>Already have an account? </span>
              <a href="/login">Login</a>
            </div>
          </form>
        </div>
        <div className="signup-image">
          <img src="https://picsum.photos/seed/inventorypro-signup/500/600" alt="Signup visual" />
        </div>
      </div>
    </div>
  );
};

export default Signup;