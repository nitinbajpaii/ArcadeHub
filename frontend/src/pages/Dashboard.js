import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { games } from '../utils/api';
import './Dashboard.css';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const dashboardRef = useRef(null);
  const gamesRef = useRef(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (location.pathname === '/games' && gamesRef.current) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = gamesRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else if (location.pathname === '/dashboard' && dashboardRef.current) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [location.pathname, loading]);

  const fetchStats = async () => {
    try {
      const response = await games.getMyStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard" ref={dashboardRef}>
      <div className="container">
        <motion.div
          className="dashboard-header animate-slide-up"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>Welcome back, <span className="neon-text">{user?.username}</span>!</h1>
          <p>Ready to break some records?</p>
        </motion.div>

        <div className="stats-grid">
          <motion.div whileHover={{ y: -6 }} className="stat-card glass-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-value">{stats?.user?.stats?.totalGames || 0}</div>
            <div className="stat-label">Total Games</div>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="stat-card glass-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{stats?.user?.stats?.totalWins || 0}</div>
            <div className="stat-label">Total Wins</div>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="stat-card glass-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{stats?.user?.stats?.bestStreak || 0}</div>
            <div className="stat-label">Best Streak</div>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="stat-card glass-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">
              {stats?.user?.stats?.totalGames > 0 
                ? Math.round((stats?.user?.stats?.totalWins / stats?.user?.stats?.totalGames) * 100) 
                : 0}%
            </div>
            <div className="stat-label">Win Rate</div>
          </motion.div>
        </div>

        <div className="quick-play" ref={gamesRef}>
          <h2>Quick Play</h2>
          <div className="game-select-grid">
            <motion.div whileHover={{ y: -8 }} className="game-select-card glass-card" onClick={() => navigate('/games/rps')}>
              <div className="game-select-icon">✊✋✌️</div>
              <h3>Rock Paper Scissors</h3>
              <p>Tournament Mode</p>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="game-select-card glass-card" onClick={() => navigate('/games/memory')}>
              <div className="game-select-icon">🃏</div>
              <h3>Memory Cards</h3>
              <p>Flip & Match</p>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="game-select-card glass-card" onClick={() => navigate('/games/guess')}>
              <div className="game-select-icon">🔢</div>
              <h3>Guess The Number</h3>
              <p>Mind Challenge</p>
            </motion.div>
          </div>
        </div>

        {stats?.recentGames?.length > 0 && (
          <div className="recent-games">
            <h2>Recent Games</h2>
            <div className="recent-games-list">
              {stats.recentGames.slice(0, 5).map((game) => (
                <motion.div key={game.id} className="recent-game-item glass-card" whileHover={{ y: -4 }}>
                  <span className="game-name">{game.game.toUpperCase()}</span>
                  <span className="game-score">Score: {game.score}</span>
                  <span className={`game-result ${game.details.won ? 'won' : 'lost'}`}>
                    {game.details.won ? '✓ Won' : '✗ Lost'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
