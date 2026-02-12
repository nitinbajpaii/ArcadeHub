import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="landing">
      <div className="hero">
        <div className="hero-content animate-slide-up">
          <h1 className="hero-title">
            Welcome to <span className="neon-text">ArcadeHub</span>
          </h1>
          <p className="hero-subtitle">
            The ultimate gaming platform where every second counts
          </p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/signup')} className="btn btn-primary">
              Start Playing
            </button>
            <button onClick={() => navigate('/login')} className="btn btn-accent">
              Login
            </button>
          </div>
        </div>
        
        <div className="hero-visual animate-float">
          <div className="game-icon">🎮</div>
          <div className="game-icon">🎯</div>
          <div className="game-icon">🧠</div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2 className="section-title">Featured Games</h2>
          <div className="game-grid">
            <div className="game-card glass-card">
              <div className="game-emoji">✊✋✌️</div>
              <h3>Rock Paper Scissors</h3>
              <p>Tournament mode with best of 5 or 10 rounds</p>
              <div className="game-stats">
                <span>🏆 Track Wins</span>
                <span>🔥 Win Streaks</span>
              </div>
            </div>

            <div className="game-card glass-card">
              <div className="game-emoji">🃏</div>
              <h3>Memory Cards</h3>
              <p>Flip and match cards to test your memory</p>
              <div className="game-stats">
                <span>⏱️ Time Challenge</span>
                <span>🎯 Accuracy</span>
              </div>
            </div>

            <div className="game-card glass-card">
              <div className="game-emoji">🔢</div>
              <h3>Guess The Number</h3>
              <p>Can you guess the secret number?</p>
              <div className="game-stats">
                <span>🧠 Strategy</span>
                <span>📊 Score Based</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <div className="cta-content glass-card">
            <h2>Ready to dominate the leaderboard?</h2>
            <p>Join thousands of players competing for the top spot</p>
            <button onClick={() => navigate('/signup')} className="btn btn-primary">
              Create Account Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
