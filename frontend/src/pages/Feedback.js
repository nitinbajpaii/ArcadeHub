import React, { useEffect, useState } from 'react';
import './Feedback.css';

const DEFAULT_GUEST_NAME = 'Arcade User';

const getStoredUserName = () => {
  try {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) return null;
    const user = JSON.parse(rawUser);
    return user?.username || user?.name || null;
  } catch {
    return null;
  }
};

const Feedback = () => {
  const storedUserName = getStoredUserName();
  const resolvedUserName = storedUserName || DEFAULT_GUEST_NAME;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    game: '',
    message: '',
    rating: 0
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData((prev) => (prev.name ? prev : { ...prev, name: resolvedUserName }));
  }, [resolvedUserName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const form = e.currentTarget;
      const formDataToSend = new FormData(form);
      formDataToSend.set('name', resolvedUserName);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formDataToSend
      });

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || 'Submission failed');
        }
      } else if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Submission failed');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', category: '', game: '', message: '', rating: 0 });
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to submit feedback');
    }
  };

  return (
    <div className="feedback-page">
      <div className="container">
        <div className="feedback-header">
          <h1 className="page-title">💡 Help Us Improve</h1>
          <p className="page-subtitle">Your ideas make ArcadeHub better!</p>
        </div>

        <div className="feedback-container glass-card">
          {submitted ? (
            <div className="success-message animate-slide-up">
              <h2>🎉 Thank You!</h2>
              <p>Your feedback has been received. We appreciate your input!</p>
            </div>
          ) : (
            <form action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit} className="feedback-form">
              <input type="hidden" name="access_key" value="8d1dc784-cee7-43f7-83c4-77386980a14b" />
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  placeholder="Your name"
                  value={formData.name || resolvedUserName}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  className="input-field"
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="improve">Improve existing game</option>
                  <option value="new-game">Suggest new game</option>
                  <option value="bug">Report a bug</option>
                  <option value="general">General feedback</option>
                </select>
              </div>

              {(formData.category === 'improve' || formData.category === 'bug') && (
                <div className="form-group">
                  <label>Select Game</label>
                  <select
                    className="input-field"
                    name="game"
                    value={formData.game}
                    onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                  >
                    <option value="">Select a game</option>
                    <option value="rps">Rock Paper Scissors</option>
                    <option value="memory">Memory Cards</option>
                    <option value="guess">Guess The Number</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  className="input-field textarea"
                  name="message"
                  placeholder="Share your thoughts, ideas, or report issues..."
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Rate Your Experience</label>
                <input type="hidden" name="rating" value={formData.rating} />
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${formData.rating >= star ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, rating: star })}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Feedback
              </button>
            </form>
          )}
        </div>

        <div className="feedback-info">
          <div className="info-card glass-card">
            <h3>🎮 Suggest New Games</h3>
            <p>Have an idea for an awesome game? We'd love to hear it!</p>
          </div>
          <div className="info-card glass-card">
            <h3>⚡ Improve Existing</h3>
            <p>Help us make current games even more addictive</p>
          </div>
          <div className="info-card glass-card">
            <h3>🐛 Report Bugs</h3>
            <p>Found something broken? Let us know so we can fix it</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
