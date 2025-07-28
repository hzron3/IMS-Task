import React from 'react';
import './BottomNavigation.css';

const BottomNavigation = ({ sections, selectedIndex, onSectionSelect }) => {
  return (
    <div className="bottom-navigation">
      <div className="bottom-nav-container">
        {sections.map((section, idx) => (
          <button
            key={section.label}
            className={`bottom-nav-item ${selectedIndex === idx ? 'active' : ''}`}
            onClick={() => onSectionSelect(idx)}
            aria-label={section.label}
          >
            <div className="bottom-nav-icon">
              {section.icon}
            </div>
            <span className="bottom-nav-label">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation; 