import React, { useState, useEffect, useRef } from 'react';
import { games } from '../utils/api';
import './RPS.css';

const choices = ['rock', 'paper', 'scissors'];
const emojis = { rock: '✊', paper: '✋', scissors: '✌️' };

const RPS = () => {
  const [mode, setMode] = useState(null);
  const [round, setRound] = useState(1);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isDeciding, setIsDeciding] = useState(false);
  const [timer, setTimer] = useState(5);
  const [tempChoice, setTempChoice] = useState(null);
  const timerRef = useRef(null);
  const modeRef = useRef(null);
  const roundRef = useRef(1);
  const scoreRef = useRef({ wins: 0, losses: 0, draws: 0 });
  const streakRef = useRef(0);
  const tempChoiceRef = useRef(null);
  const phaseIdRef = useRef(0);
  const lockTriggeredRef = useRef(false);
  const revealTimeoutRef = useRef(null);
  const nextPhaseTimeoutRef = useRef(null);
  const endGameTimeoutRef = useRef(null);

  const clearPendingTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    if (nextPhaseTimeoutRef.current) clearTimeout(nextPhaseTimeoutRef.current);
    if (endGameTimeoutRef.current) clearTimeout(endGameTimeoutRef.current);
    timerRef.current = null;
    revealTimeoutRef.current = null;
    nextPhaseTimeoutRef.current = null;
    endGameTimeoutRef.current = null;
  };

  useEffect(() => {
    return () => {
      clearPendingTimers();
    };
  }, []);

  const startGame = (selectedMode) => {
    phaseIdRef.current += 1;
    lockTriggeredRef.current = false;
    clearPendingTimers();
    setMode(selectedMode);
    modeRef.current = selectedMode;
    setRound(1);
    roundRef.current = 1;
    setScore({ wins: 0, losses: 0, draws: 0 });
    scoreRef.current = { wins: 0, losses: 0, draws: 0 };
    setStreak(0);
    streakRef.current = 0;
    setGameOver(false);
    startDecisionPhase();
  };

  const startDecisionPhase = () => {
    const phaseId = phaseIdRef.current + 1;
    phaseIdRef.current = phaseId;
    lockTriggeredRef.current = false;
    clearPendingTimers();
    setIsDeciding(true);
    setTimer(5);
    setTempChoice(null);
    tempChoiceRef.current = null;
    setPlayerChoice(null);
    setBotChoice(null);
    setResult(null);
    setShowResult(false);

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          if (!lockTriggeredRef.current) {
            lockTriggeredRef.current = true;
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
            lockAndReveal(phaseId);
          }
          return 0;
        }
        return next;
      });
    }, 1000);
  };

  const lockAndReveal = (phaseId) => {
    if (phaseId !== phaseIdRef.current) return;
    setIsDeciding(false);

    const finalPlayerChoice = tempChoiceRef.current || choices[Math.floor(Math.random() * 3)];
    const finalBotChoice = choices[Math.floor(Math.random() * 3)];
    
    setPlayerChoice(finalPlayerChoice);
    setBotChoice(finalBotChoice);
    setShowResult(true);

    revealTimeoutRef.current = setTimeout(() => {
      if (phaseId !== phaseIdRef.current) return;
      const roundResult = determineWinner(finalPlayerChoice, finalBotChoice);
      setResult(roundResult);

      const newScore = { ...scoreRef.current };
      let nextStreak = streakRef.current;
      if (roundResult === 'win') {
        newScore.wins++;
        nextStreak += 1;
      } else if (roundResult === 'lose') {
        newScore.losses++;
        nextStreak = 0;
      } else {
        newScore.draws++;
      }
      setScore(newScore);
      scoreRef.current = newScore;
      setStreak(nextStreak);
      streakRef.current = nextStreak;

      const maxRounds = modeRef.current === 5 ? 5 : 10;
      const currentRound = roundRef.current;
      if (currentRound >= maxRounds) {
        endGameTimeoutRef.current = setTimeout(() => {
          if (phaseId !== phaseIdRef.current) return;
          endGame(newScore);
        }, 2000);
      } else {
        const nextRound = currentRound + 1;
        setRound(nextRound);
        roundRef.current = nextRound;
        nextPhaseTimeoutRef.current = setTimeout(() => {
          if (phaseId !== phaseIdRef.current) return;
          startDecisionPhase();
        }, 2500);
      }
    }, 500);
  };

  const handleChoiceClick = (choice) => {
    if (isDeciding) {
      setTempChoice(choice);
      tempChoiceRef.current = choice;
    }
  };

  const determineWinner = (player, bot) => {
    if (player === bot) return 'draw';
    if (
      (player === 'rock' && bot === 'scissors') ||
      (player === 'paper' && bot === 'rock') ||
      (player === 'scissors' && bot === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const endGame = async (finalScore) => {
    setGameOver(true);
    const won = finalScore.wins > finalScore.losses;
    
    try {
      await games.saveScore({
        game: 'rps',
        score: finalScore.wins * 10,
        details: { ...finalScore, won, streak: streakRef.current, mode: modeRef.current }
      });
    } catch (error) {
      console.error('Failed to save score');
    }
  };

  const resetGame = () => {
    phaseIdRef.current += 1;
    lockTriggeredRef.current = false;
    clearPendingTimers();
    setMode(null);
    modeRef.current = null;
    setRound(1);
    roundRef.current = 1;
    setPlayerChoice(null);
    setBotChoice(null);
    setResult(null);
    setScore({ wins: 0, losses: 0, draws: 0 });
    scoreRef.current = { wins: 0, losses: 0, draws: 0 };
    setStreak(0);
    streakRef.current = 0;
    setGameOver(false);
    setShowResult(false);
    setIsDeciding(false);
    setTimer(5);
    setTempChoice(null);
    tempChoiceRef.current = null;
  };

  if (!mode) {
    return (
      <div className="rps-game">
        <div className="container">
          <h1 className="game-title">Rock Paper Scissors Tournament</h1>
          <div className="mode-selection">
            <div className="mode-card glass-card" onClick={() => startGame(5)}>
              <h2>Best of 5</h2>
              <p>Quick Tournament</p>
            </div>
            <div className="mode-card glass-card" onClick={() => startGame(10)}>
              <h2>Best of 10</h2>
              <p>Epic Battle</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const won = score.wins > score.losses;
    return (
      <div className="rps-game">
        <div className="container">
          <div className="game-over glass-card">
            <h1 className={won ? 'neon-text' : ''}>{won ? '🏆 Victory!' : '💔 Defeat'}</h1>
            <div className="final-score">
              <div className="score-item">
                <span className="score-label">Wins</span>
                <span className="score-value glow-accent">{score.wins}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Losses</span>
                <span className="score-value">{score.losses}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Draws</span>
                <span className="score-value">{score.draws}</span>
              </div>
            </div>
            <button onClick={resetGame} className="btn btn-primary">Play Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rps-game">
      <div className="container">
        <div className="game-header">
          <h1>Round {round} / {mode}</h1>
          <div className="score-display">
            <span className="score-wins">W: {score.wins}</span>
            <span className="score-losses">L: {score.losses}</span>
            <span className="score-draws">D: {score.draws}</span>
            <span className="score-streak">🔥 {streak}</span>
          </div>
        </div>

        {isDeciding && (
          <div className="decision-phase animate-slide-up">
            <div className="timer-display">
              <h2 className="timer-text">⏳ {timer}</h2>
              <p className="timer-label">Decide your move — Bot is choosing...</p>
            </div>
            <div className="bot-thinking">
              <span className="bot-status">🤖 Thinking</span>
              <span className="thinking-dots">...</span>
            </div>
          </div>
        )}

        {showResult && (
          <div className="battle-arena animate-slide-up">
            <div className="choice-display">
              <div className="player-choice">
                <div className={`choice-emoji ${result === 'win' ? 'winner-glow' : ''}`}>{emojis[playerChoice]}</div>
                <p>You</p>
              </div>
              <div className="vs">VS</div>
              <div className="bot-choice">
                <div className={`choice-emoji ${result === 'lose' ? 'winner-glow' : ''}`}>{emojis[botChoice]}</div>
                <p>Bot</p>
              </div>
            </div>
            {result && (
              <div className={`result-text ${result}`}>
                {result === 'win' && '🎉 You Win!'}
                {result === 'lose' && '😢 You Lose!'}
                {result === 'draw' && '🤝 Draw!'}
              </div>
            )}
          </div>
        )}

        {isDeciding && (
          <div className="choices">
            {choices.map((choice) => (
              <button
                key={choice}
                className={`choice-btn glass-card ${tempChoice === choice ? 'selected' : ''}`}
                onClick={() => handleChoiceClick(choice)}
              >
                <span className="choice-emoji-large">{emojis[choice]}</span>
                <span className="choice-name">{choice}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RPS;
