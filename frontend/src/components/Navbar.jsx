import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, User as UserIcon, Home, BookOpen, HandHeart, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from './Button';
import img from "./logo.avif";
import ThemeToggle from './ThemeToggle';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const isFloating = isHome && isScrolled;

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`navbar ${isFloating ? 'navbar-floating' : ''}`}>
      <Link to="/" style={{textDecoration: 'none', display: 'flex' , justifyContent:'center',alignContent:'center'}} className="nav-logo-link">
      <div style={{ width: "80px", height: "80px", overflow: "hidden",marginRight: "5px" }}>
      <img src={img} alt="img" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
      </div>
      <div className='nav-brand'>UP GOVERNMENT, 80G & 12A Registered NGO</div>
      </Link>

      
      
      <div className="nav-links-container" style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
        <Link to="/" style={{color: 'var(--text-base)', textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
            <span className="nav-text">Home</span>
            <Home className="nav-icon" size={20} />
        </Link>
        <Link to="/about" style={{color: 'var(--text-base)', textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
            <span className="nav-text">About Us</span>
            <BookOpen className="nav-icon" size={20} />
        </Link>
        <Link to="/donate" style={{color: 'var(--text-base)', textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
            <span className="nav-text">Donate</span>
            <HandHeart className="nav-icon" size={20} />
        </Link>
        
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        {user ? (
          <div className="nav-auth-container" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
             <Link to="/dashboard" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-base)'}}>
               <UserIcon size={20} />
               <span className="nav-text">Dashboard</span>
             </Link>
             <Button variant="secondary" onClick={handleLogout} style={{padding: '0.8rem 1rem', fontSize: '0.9rem'}} className="nav-btn">
                <span className="nav-text">Logout</span>
                <LogOut className="nav-icon" size={20} />
             </Button>
          </div>
        ) : (
          <div className="nav-auth-container" style={{display: 'flex', gap: '0.5rem'}}>
            <Button variant="secondary" onClick={() => navigate('/login')} className="nav-btn">
               <span className="nav-text">Login</span>
               <LogIn className="nav-icon" size={20} />
            </Button>
          </div>
        )}
        
      </div>
    </header>
  );
};
