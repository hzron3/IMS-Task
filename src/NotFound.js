import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="error-number">Error 404:</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-description">
          Oops! The page you're looking for doesn't exist. Please check the URL and try again.
        </p>
        
        <div className="error-actions">
          <button 
            className="primary-btn" 
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
          <button 
            className="secondary-btn" 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 