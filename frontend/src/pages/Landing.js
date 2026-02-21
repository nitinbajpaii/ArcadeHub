import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Landing.css';
import { motion } from 'framer-motion';

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
        <motion.div
          className="hero-content animate-slide-up"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="hero-title">
            Welcome to <span className="neon-text">ArcadeHub</span>
          </h1>
          <p className="hero-subtitle">
            The ultimate gaming platform where every second counts
          </p>
          <div className="hero-buttons">
            <motion.button
              whileHover={{ scale: 1.05, y: -3, x: 3 }}
              whileTap={{ scale: 0.98, y: 0 }}
              onClick={() => navigate('/signup')}
              className="btn btn-primary"
            >
              Start Playing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3, x: 3 }}
              whileTap={{ scale: 0.98, y: 0 }}
              onClick={() => navigate('/login')}
              className="btn btn-accent"
            >
              Login
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          className="hero-visual animate-float"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div className="game-icon" whileHover={{ scale: 1.08 }}>🎮</motion.div>
          <motion.div className="game-icon" whileHover={{ scale: 1.08 }}>🎯</motion.div>
          <motion.div className="game-icon" whileHover={{ scale: 1.08 }}>🧠</motion.div>
        </motion.div>
      </div>

      <div className="features">
        <div className="container">
          <h2 className="section-title">Featured Games</h2>
          <div className="game-grid">
            <motion.div whileHover={{ y: -8 }} className="game-card glass-card">
              <div className="game-emoji">✊✋✌️</div>
              <h3>Rock Paper Scissors</h3>
              <p>Tournament mode with best of 5 or 10 rounds</p>
              <div className="game-stats">
                <span>🏆 Track Wins</span>
                <span>🔥 Win Streaks</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="game-card glass-card">
              <div className="game-emoji">🃏</div>
              <h3>Memory Cards</h3>
              <p>Flip and match cards to test your memory</p>
              <div className="game-stats">
                <span>⏱️ Time Challenge</span>
                <span>🎯 Accuracy</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} className="game-card glass-card">
              <div className="game-emoji">🔢</div>
              <h3>Guess The Number</h3>
              <p>Can you guess the secret number?</p>
              <div className="game-stats">
                <span>🧠 Strategy</span>
                <span>📊 Score Based</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to dominate the leaderboard?</h2>
            <p>Join thousands of players competing for the top spot</p>
            <motion.button
              whileHover={{ scale: 1.05, y: -3, x: 3 }}
              whileTap={{ scale: 0.98, y: 0 }}
              onClick={() => navigate('/signup')}
              className="btn btn-primary"
            >
              Create Account Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
