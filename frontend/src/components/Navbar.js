import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">🎮 ArcadeHub</span>
        </Link>
        
        {isAuthenticated && (
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/games" className="nav-link">Games</Link>
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
            <Link to="/feedback" className="nav-link">Help Us Improve</Link>
            <div className="nav-user">
              <span className="username">{user?.username}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
