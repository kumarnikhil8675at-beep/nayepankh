import React, { useState, useEffect } from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {

  return (
    <button 
      className="theme-toggle" 
      aria-label="Toggle Theme" 
      onClick={toggleTheme}
    >
      <span className="track">
        <span className="text dark-text">Dark</span>
        <span className="text light-text">Light</span>
      </span>
      <span className="glass-slider">
        {/* Moon Icon */}
        <svg 
          className="icon moon" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
        {/* Sun Icon */}
        <svg 
          className="icon sun" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle;
