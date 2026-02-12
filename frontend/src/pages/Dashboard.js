import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { games } from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

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
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header animate-slide-up">
          <h1>Welcome back, <span className="neon-text">{user?.username}</span>!</h1>
          <p>Ready to break some records?</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-value">{stats?.user?.stats?.totalGames || 0}</div>
            <div className="stat-label">Total Games</div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{stats?.user?.stats?.totalWins || 0}</div>
            <div className="stat-label">Total Wins</div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{stats?.user?.stats?.bestStreak || 0}</div>
            <div className="stat-label">Best Streak</div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">
              {stats?.user?.stats?.totalGames > 0 
                ? Math.round((stats?.user?.stats?.totalWins / stats?.user?.stats?.totalGames) * 100) 
                : 0}%
            </div>
            <div className="stat-label">Win Rate</div>
          </div>
        </div>

        <div className="quick-play">
          <h2>Quick Play</h2>
          <div className="game-select-grid">
            <div className="game-select-card glass-card" onClick={() => navigate('/games/rps')}>
              <div className="game-select-icon">✊✋✌️</div>
              <h3>Rock Paper Scissors</h3>
              <p>Tournament Mode</p>
            </div>

            <div className="game-select-card glass-card" onClick={() => navigate('/games/memory')}>
              <div className="game-select-icon">🃏</div>
              <h3>Memory Cards</h3>
              <p>Flip & Match</p>
            </div>

            <div className="game-select-card glass-card" onClick={() => navigate('/games/guess')}>
              <div className="game-select-icon">🔢</div>
              <h3>Guess The Number</h3>
              <p>Mind Challenge</p>
            </div>
          </div>
        </div>

        {stats?.recentGames?.length > 0 && (
          <div className="recent-games">
            <h2>Recent Games</h2>
            <div className="recent-games-list">
              {stats.recentGames.slice(0, 5).map((game) => (
                <div key={game.id} className="recent-game-item glass-card">
                  <span className="game-name">{game.game.toUpperCase()}</span>
                  <span className="game-score">Score: {game.score}</span>
                  <span className={`game-result ${game.details.won ? 'won' : 'lost'}`}>
                    {game.details.won ? '✓ Won' : '✗ Lost'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
