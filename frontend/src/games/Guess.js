import React, { useState } from 'react';
import { games } from '../utils/api';
import './Guess.css';

const Guess = () => {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([]);
  const [won, setWon] = useState(false);
  const MAX_ATTEMPTS = 7;

  const getSmartHint = (guessedNum, target) => {
    const diff = Math.abs(guessedNum - target);
    const isLow = guessedNum < target;

    if (diff <= 3) return isLow ? '🔥 Very Close! A Little Low' : '🔥 Very Close! A Little High';
    if (diff <= 10) return isLow ? '📈 A Little Low' : '📉 A Little High';
    if (diff <= 25) return isLow ? '📈 Too Low' : '📉 Too High';
    return isLow ? '❄️ Way Too Low' : '❄️ Way Too High';
  };

  const handleGuess = async () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setFeedback('Please enter a number between 1 and 100');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setHistory([...history, num]);

    if (num === targetNumber) {
      setGameOver(true);
      setWon(true);
      setFeedback('🎉 Correct!');
      
      const score = Math.max(1000 - (newAttempts * 50), 100);
      try {
        await games.saveScore({
          game: 'guess',
          score,
          details: { attempts: newAttempts, won: true, targetNumber }
        });
      } catch (error) {
        console.error('Failed to save score');
      }
    } else if (newAttempts >= MAX_ATTEMPTS) {
      setGameOver(true);
      setWon(false);
      setFeedback(`💔 Game Over! The number was ${targetNumber}`);
      
      try {
        await games.saveScore({
          game: 'guess',
          score: 0,
          details: { attempts: newAttempts, won: false, targetNumber }
        });
      } catch (error) {
        console.error('Failed to save score');
      }
    } else {
      setFeedback(getSmartHint(num, targetNumber));
    }

    setGuess('');
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setFeedback('');
    setGameOver(false);
    setHistory([]);
    setWon(false);
  };

  return (
    <div className="guess-game">
      <div className="container">
        <h1 className="game-title">Guess The Number</h1>
        
        <div className="game-container glass-card">
          <p className="game-instruction">I'm thinking of a number between 1 and 100</p>
          <p className="game-limit">You have {MAX_ATTEMPTS} attempts to guess it!</p>
          
          <div className="attempts-display">
            Attempts: <span className="attempts-count">{attempts} / {MAX_ATTEMPTS}</span>
          </div>

          {!gameOver ? (
            <div className="guess-input-section">
              <input
                type="number"
                className="input-field guess-input"
                placeholder="Enter your guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                min="1"
                max="100"
              />
              <button onClick={handleGuess} className="btn btn-primary">
                Submit Guess
              </button>
            </div>
          ) : (
            <div className="game-over-section">
              <h2 className={won ? 'neon-text' : 'lose-text'}>{won ? '🎉 You Won!' : '💔 You Lost!'}</h2>
              <p className="win-message">
                {won 
                  ? `You found the number in ${attempts} attempts!` 
                  : `The number was ${targetNumber}. Better luck next time!`
                }
              </p>
              <button onClick={resetGame} className="btn btn-accent">
                Play Again
              </button>
            </div>
          )}

          {feedback && (
            <div className={`feedback ${gameOver ? 'success' : ''}`}>
              {feedback}
            </div>
          )}

          {history.length > 0 && (
            <div className="guess-history">
              <h3>Your Guesses:</h3>
              <div className="history-list">
                {history.map((h, i) => (
                  <span key={i} className="history-item">{h}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guess;
