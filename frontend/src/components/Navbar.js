import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../utils/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} shadow-glow`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <motion.span
            className="logo-text"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            🎮 ArcadeHub
          </motion.span>
        </Link>

        {isAuthenticated && (
          <>
            <button
              className="mobile-toggle"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              ☰
            </button>
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/games" className="nav-link">Games</Link>
              <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
              <Link to="/feedback" className="nav-link">Help Us Improve</Link>
              <div className="nav-user">
                <span className="username">{user?.username}</span>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2, x: 3 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  onClick={handleLogout}
                  className="btn-logout"
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </>
        )}
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
