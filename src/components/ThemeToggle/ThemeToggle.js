import React from 'react';
import './styles.css'; 

const ThemeToggle = ({ toggleTheme, darkMode }) => {
  return (
    <div className="theme-toggle">
      <button id="themeToggleBtn" onClick={toggleTheme}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default ThemeToggle;