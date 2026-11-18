import React, { useState, useMemo } from 'react';

const MOVIES = [
  { id: 1, title: 'Silent Orbit', genre: 'Sci-Fi', year: 2025, rating: 8.9, duration: '2h 25m', emoji: '🪐', desc: 'A lone astronaut picks up a signal from a station that went silent forty years ago, and what answers back knows her name.' },
  { id: 2, title: 'The Dark Horizon', genre: 'Sci-Fi', year: 2026, rating: 8.7, duration: '2h 18m', emoji: '🌌', desc: 'When the sun dims for the first time in history, a crew of engineers races to restart a dying star.' },
  { id: 3, title: 'The Last Algorithm', genre: 'Thriller', year: 2025, rating: 8.5, duration: '2h 12m', emoji: '💻', desc: 'A programmer discovers her own code is predicting crimes before they happen, and someone wants the predictions stopped.' },
  { id: 4, title: 'Midnight in Lahore', genre: 'Drama', year: 2025, rating: 8.2, duration: '1h 55m', emoji: '🌙', desc: 'Two estranged brothers meet again at their childhood home on the night of a wedding neither of them wanted.' },
  { id: 5, title: 'Mountain Echo', genre: 'Adventure', year: 2024, rating: 8.1, duration: '2h 02m', emoji: '🏔️', desc: 'A young guide leads a rescue team up a mountain she swore she would never climb again.' },
  { id: 6, title: 'Code Runner', genre: 'Action', year: 2026, rating: 7.9, duration: '2h 05m', emoji: '🏃', desc: 'A courier carrying a stolen drive outruns a city wide manhunt with nothing but a bicycle and a dead phone.' },
  { id: 7, title: 'Golden Hour', genre: 'Romance', year: 2026, rating: 7.6, duration: '1h 48m', emoji: '🌅', desc: 'A photographer and a street musician keep meeting at the same corner every evening, always one minute too late.' },
  { id: 8, title: 'Laugh Track', genre: 'Comedy', year: 2026, rating: 7.4, duration: '1h 42m', emoji: '🎤', desc: 'A failed sitcom star becomes a wedding singer and accidentally becomes the most honest man in town.' },
];

const GENRES = ['All', 'Sci-Fi', 'Drama', 'Thriller', 'Adventure', 'Action', 'Romance', 'Comedy'];

function App() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [watchlist, setWatchlist] = useState([1, 3, 5]);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return MOVIES.filter((movie) => {
      const matchesGenre = genre === 'All' || movie.genre === genre;
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [search, genre]);

  const avgRating = (MOVIES.reduce((sum, m) => sum + m.rating, 0) / MOVIES.length).toFixed(1);

  const toggleWatchlist = (id) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <nav className="navbar">
        <span className="logo">🎬 CineVerse</span>
        <div className="user-chip">
          <span className="avatar-circle">HK</span>
          <span>Hammad Khan</span>
        </div>
      </nav>

      <header className="hero">
        <h1>Discover your next favourite movie</h1>
        <p>Search, filter by genre, and build your watchlist.</p>
      </header>

      <div className="stats-row">
        <div className="stat-card">
          <div className="value">{MOVIES.length}</div>
          <div className="label">Movies</div>
        </div>
        <div className="stat-card">
          <div className="value">{avgRating}</div>
          <div className="label">Average Rating</div>
        </div>
        <div className="stat-card">
          <div className="value">{watchlist.length}</div>
          <div className="label">In My Watchlist</div>
        </div>
      </div>

      <div className="controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {GENRES.map((g) => (
          <button
            key={g}
            className={genre === g ? 'genre-chip active' : 'genre-chip'}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No movies match your search. Try another title or genre.</p>
      ) : (
        <div className="movie-grid">
          {filtered.map((movie) => (
            <div className="movie-card" key={movie.id} onClick={() => setSelected(movie)}>
              <div className="poster">{movie.emoji}</div>
              <div className="movie-body">
                <h3>{movie.title}</h3>
                <p className="movie-meta">{movie.genre} &middot; {movie.year} &middot; {movie.duration}</p>
                <span className="rating">★ {movie.rating}</span>
                <button
                  className={watchlist.includes(movie.id) ? 'watchlist-btn saved' : 'watchlist-btn'}
                  onClick={(e) => { e.stopPropagation(); toggleWatchlist(movie.id); }}
                >
                  {watchlist.includes(movie.id) ? '✓ In Watchlist' : '+ Add to Watchlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selected.emoji} {selected.title}</h2>
            <p className="movie-meta">{selected.genre} &middot; {selected.year} &middot; {selected.duration}</p>
            <p><span className="rating">★ {selected.rating}</span> / 10</p>
            <p>{selected.desc}</p>
            <button className="close-btn" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
