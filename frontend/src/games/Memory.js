import React, { useState, useEffect } from 'react';
import { games } from '../utils/api';
import './Memory.css';

const cardSymbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺'];

const Memory = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  const initGame = () => {
    const shuffled = [...cardSymbols, ...cardSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setGameStarted(false);
    setGameOver(false);
  };

  const handleCardClick = (id) => {
    if (!gameStarted) setGameStarted(true);
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard.symbol === secondCard.symbol) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setFlipped([]);

        if (newMatched.length === cards.length) {
          endGame();
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const endGame = async () => {
    setGameOver(true);
    const accuracy = Math.round((cardSymbols.length / moves) * 100);
    const score = Math.max(1000 - (moves * 10) - time, 100);

    try {
      await games.saveScore({
        game: 'memory',
        score,
        details: { moves, time, accuracy, won: true }
      });
    } catch (error) {
      console.error('Failed to save score');
    }
  };

  if (gameOver) {
    const accuracy = Math.round((cardSymbols.length / moves) * 100);
    return (
      <div className="memory-game">
        <div className="container">
          <div className="game-over glass-card">
            <h1 className="neon-text">🎉 Completed!</h1>
            <div className="final-stats">
              <div className="stat-item">
                <span className="stat-label">Moves</span>
                <span className="stat-value">{moves}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Time</span>
                <span className="stat-value">{time}s</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Accuracy</span>
                <span className="stat-value glow-accent">{accuracy}%</span>
              </div>
            </div>
            <button onClick={initGame} className="btn btn-primary">Play Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-game">
      <div className="container">
        <h1 className="game-title">Memory Cards</h1>
        
        <div className="game-stats">
          <div className="stat">Moves: <span className="stat-highlight">{moves}</span></div>
          <div className="stat">Time: <span className="stat-highlight">{time}s</span></div>
          <div className="stat">Matched: <span className="stat-highlight">{matched.length / 2}/{cardSymbols.length}</span></div>
        </div>

        <div className="cards-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`memory-card ${flipped.includes(card.id) || matched.includes(card.id) ? 'flipped' : ''} ${matched.includes(card.id) ? 'matched' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card.symbol}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={initGame} className="btn btn-accent reset-btn">Reset Game</button>
      </div>
    </div>
  );
};

export default Memory;
