import React, { useEffect, useState } from 'react';
import { games } from '../utils/api';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await games.getLeaderboard();
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading leaderboard...</div>;

  return (
    <div className="leaderboard-page">
      <div className="container">
        <h1 className="page-title">🏆 Leaderboard</h1>
        <p className="page-subtitle">Top players competing for glory</p>

        {leaderboard.length === 0 ? (
          <div className="empty-state glass-card">
            <h2>No players yet!</h2>
            <p>Be the first to make it to the leaderboard</p>
          </div>
        ) : (
          <div className="leaderboard-table glass-card">
            <div className="table-header">
              <div className="col-rank">Rank</div>
              <div className="col-player">Player</div>
              <div className="col-wins">Wins</div>
              <div className="col-games">Games</div>
              <div className="col-streak">Best Streak</div>
              <div className="col-score">Total Score</div>
            </div>

            {leaderboard.map((player, index) => (
              <div key={index} className={`table-row ${index < 3 ? 'top-player' : ''}`}>
                <div className="col-rank">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `#${index + 1}`}
                </div>
                <div className="col-player">{player.username}</div>
                <div className="col-wins">{player.totalWins}</div>
                <div className="col-games">{player.totalGames}</div>
                <div className="col-streak">{player.bestStreak}</div>
                <div className="col-score">{player.totalScore}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
