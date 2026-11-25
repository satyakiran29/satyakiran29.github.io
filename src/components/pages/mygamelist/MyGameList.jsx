import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaSteam,
  FaGamepad,
  FaStar,
  FaSearch,
  FaClock,
  FaTimes,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaLaptop,
  FaTrophy,
  FaCalendarAlt,
  FaHourglassHalf,
  FaThLarge,
  FaLayerGroup
} from "react-icons/fa";
import { GAMING_PROFILE, LAPTOP_SPECS, initialGames } from "../../../data/gamesData";
import { useIstStatus } from "../../../utils/useIstStatus";
import "./mygamelist.css";

const STATUS_TABS = ["All", "Playing", "Completed", "On Hold", "Plan to Play"];
const GENRE_FILTERS = ["All", "Action RPG", "Open World", "FPS", "Adventure"];

const TIER_GROUPS = [
  {
    key: "S",
    label: "S",
    sub: "9.5 – 10",
    match: (g) => typeof g.rating === "number" && g.rating >= 9.5,
  },
  {
    key: "A",
    label: "A",
    sub: "9.0 – 9.4",
    match: (g) => typeof g.rating === "number" && g.rating >= 9.0 && g.rating < 9.5,
  },
  {
    key: "B",
    label: "B",
    sub: "8.0 – 8.9",
    match: (g) => typeof g.rating === "number" && g.rating > 0 && g.rating < 9.0,
  },
  {
    key: "Unrated",
    label: "—",
    sub: "Unrated",
    match: (g) => typeof g.rating !== "number" || g.rating <= 0,
  },
];

const matchesGenre = (game, genre) => {
  if (genre === "All") return true;
  return (game.genre || "").toLowerCase().includes(genre.toLowerCase());
};

const MyGameList = () => {
  const ist = useIstStatus();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedGame, setSelectedGame] = useState(null);
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    if (!selectedGame) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedGame(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedGame]);

  const nowPlayingList = useMemo(
    () => initialGames.filter((g) => g.status === "Playing"),
    []
  );

  const primaryNowPlaying = nowPlayingList[0] || GAMING_PROFILE.nowPlaying;

  const favoriteCompleted = useMemo(() => {
    return initialGames
      .filter((g) => g.status === "Completed")
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  }, []);

  const stats = useMemo(() => {
    const total = initialGames.length;
    const playing = initialGames.filter((g) => g.status === "Playing").length;
    const completed = initialGames.filter((g) => g.status === "Completed").length;
    const rated = initialGames.filter((g) => typeof g.rating === "number" && g.rating > 0);
    const avgRating = rated.length
      ? (rated.reduce((sum, g) => sum + g.rating, 0) / rated.length).toFixed(1)
      : "—";
    return { total, playing, completed, avgRating };
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const searchMatches = useMemo(() => {
    return initialGames.filter((g) => {
      if (!normalizedSearch) return true;
      return (
        g.title.toLowerCase().includes(normalizedSearch) ||
        (g.platform || "").toLowerCase().includes(normalizedSearch) ||
        (g.genre || "").toLowerCase().includes(normalizedSearch) ||
        (g.review || "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [normalizedSearch]);

  const genreScopedMatches = useMemo(
    () => searchMatches.filter((g) => matchesGenre(g, selectedGenre)),
    [searchMatches, selectedGenre]
  );

  const statusCounts = useMemo(() => {
    return STATUS_TABS.reduce((acc, tab) => {
      acc[tab] =
        tab === "All"
          ? genreScopedMatches.length
          : genreScopedMatches.filter((g) => g.status === tab).length;
      return acc;
    }, {});
  }, [genreScopedMatches]);

  const statusScopedMatches = useMemo(
    () =>
      searchMatches.filter(
        (g) => selectedStatus === "All" || g.status === selectedStatus
      ),
    [searchMatches, selectedStatus]
  );

  const genreCounts = useMemo(() => {
    return GENRE_FILTERS.reduce((acc, genre) => {
      acc[genre] = statusScopedMatches.filter((g) => matchesGenre(g, genre)).length;
      return acc;
    }, {});
  }, [statusScopedMatches]);

  const visibleGames = useMemo(() => {
    const filtered = statusScopedMatches.filter((g) => matchesGenre(g, selectedGenre));
    if (sortBy === "rating") {
      return [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    if (sortBy === "title") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    return filtered;
  }, [statusScopedMatches, selectedGenre, sortBy]);

  const tierRows = useMemo(() => {
    const base = [...visibleGames].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return TIER_GROUPS.map((tier) => ({
      ...tier,
      games: base.filter(tier.match),
    })).filter((tier) => tier.games.length > 0);
  }, [visibleGames]);

  const handleCopyText = (key, value) => {
    navigator.clipboard?.writeText(value);
    setCopiedId(key);
    setTimeout(() => setCopiedId(""), 1800);
  };

  const getStatusClass = (status) => {
    if (status === "Playing") return "mgl-status--playing";
    if (status === "Completed") return "mgl-status--completed";
    if (status === "On Hold") return "mgl-status--hold";
    return "mgl-status--planned";
  };

  return (
    <div className="mgl-page">
      <Helmet>
        <title>MyGameList | Satyakiran — Game Log &amp; Reviews</title>
        <meta
          name="description"
          content="Satyakiran's personal MyGameList tracking currently playing games, completed titles, ratings, reviews, and Steam ID."
        />
        <link rel="canonical" href="https://satyakiran.vercel.app/mygamelist" />
      </Helmet>

      <div className="mgl-container">
        {/* Steam-Inspired Profile Header */}
        <header className="mgl-header">
          <div className="mgl-steam-banner">
            <div className="mgl-steam-profile">
              <div className="mgl-steam-avatar-wrap">
                <img
                  src="https://avatars.githubusercontent.com/u/87798342?v=4"
                  alt="Satyakiran Steam Avatar"
                  className="mgl-steam-avatar"
                />
                <span className="mgl-steam-avatar-status" aria-hidden="true" />
              </div>
              <div className="mgl-steam-identity">
                <div className="mgl-steam-name-row">
                  <span className="mgl-eyebrow">
                    <FaSteam /> MyGameList
                  </span>
                  <span className="mgl-steam-status-tag">
                    In-Game • {primaryNowPlaying.title}
                  </span>
                </div>
                <h1 className="mgl-title">Satyakiran</h1>
                <p className="mgl-subtitle">
                  Personal game log, ratings, reviews, and live playing status.
                </p>
              </div>
            </div>

            <div className="mgl-steam-banner-right">
              <div className="mgl-steam-level-box">
                <span className="mgl-steam-level-num">{stats.completed}</span>
                <span className="mgl-steam-level-lbl">Completed</span>
              </div>
              <a
                href={GAMING_PROFILE.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mgl-steam-profile-btn"
              >
                <FaSteam /> Steam Profile <FaExternalLinkAlt />
              </a>
            </div>
          </div>

          {/* Gamer IDs & Updated Time */}
          <div className="mgl-ids-bar">
            <div className="mgl-id-card">
              <div className="mgl-id-left">
                <FaSteam className="mgl-platform-icon mgl-platform-icon--steam" />
                <div>
                  <span className="mgl-id-label">Steam ID</span>
                  <a
                    href={GAMING_PROFILE.steamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mgl-id-value mgl-id-link"
                  >
                    {GAMING_PROFILE.steamId} <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
              <button
                type="button"
                className="mgl-copy-icon-btn"
                onClick={() => handleCopyText("steam", GAMING_PROFILE.steamId)}
                aria-label="Copy Steam ID"
                title="Copy Steam ID"
              >
                {copiedId === "steam" ? <FaCheck /> : <FaCopy />}
              </button>
            </div>

            <div className="mgl-id-card mgl-id-card--time">
              <div className="mgl-id-left">
                <FaClock className="mgl-platform-icon mgl-platform-icon--clock" />
                <div>
                  <span className="mgl-id-label">List Updated • IST {ist.timeText}</span>
                  <span className="mgl-id-value">{GAMING_PROFILE.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Now Playing Spotlight */}
        {primaryNowPlaying && (
          <section className="mgl-now-playing" aria-label="Now Playing">
            <div className="mgl-np-image-wrap">
              {primaryNowPlaying.image ? (
                <img
                  src={primaryNowPlaying.image}
                  alt={primaryNowPlaying.title}
                  className="mgl-np-image"
                />
              ) : (
                <div className="mgl-cover-fallback">
                  <FaGamepad />
                </div>
              )}
              <span className="mgl-np-live-badge">
                <span className="mgl-np-dot" aria-hidden="true" />
                Now Playing
              </span>
            </div>
            <div className="mgl-np-body">
              <div className="mgl-np-meta">
                <span className="mgl-pill">{primaryNowPlaying.platform}</span>
                {primaryNowPlaying.genre && (
                  <span className="mgl-pill">{primaryNowPlaying.genre}</span>
                )}
                <span className="mgl-updated-text">
                  <FaClock /> Updated {primaryNowPlaying.updatedAt}
                </span>
              </div>
              <h2 className="mgl-np-title">{primaryNowPlaying.title}</h2>
              <p className="mgl-np-desc">
                {primaryNowPlaying.review || primaryNowPlaying.note}
              </p>
            </div>
          </section>
        )}

        {/* Stats Strip */}
        <section className="mgl-stats-strip" aria-label="Gaming Summary">
          <div className="mgl-stat-item">
            <span className="mgl-stat-val">{stats.total}</span>
            <span className="mgl-stat-lbl">Total Games</span>
          </div>
          <div className="mgl-stat-item">
            <span className="mgl-stat-val mgl-stat-val--playing">{stats.playing}</span>
            <span className="mgl-stat-lbl">Playing</span>
          </div>
          <div className="mgl-stat-item">
            <span className="mgl-stat-val mgl-stat-val--completed">{stats.completed}</span>
            <span className="mgl-stat-lbl">Completed</span>
          </div>
          <div className="mgl-stat-item">
            <span className="mgl-stat-val">{stats.avgRating}</span>
            <span className="mgl-stat-lbl">Avg Score / 10</span>
          </div>
        </section>

        {/* Steam Game Collector / Favorite Completions Showcase */}
        {favoriteCompleted.length > 0 && (
          <section className="mgl-showcase-box" aria-label="Favorite Completed Games">
            <div className="mgl-showcase-bar">
              <span className="mgl-showcase-heading">
                <FaTrophy /> Game Collector Showcase
              </span>
              <span className="mgl-showcase-sub">Top Rated Completions</span>
            </div>
            <div className="mgl-showcase-grid">
              {favoriteCompleted.map((game, idx) => (
                <div
                  key={game.id}
                  className="mgl-showcase-slot"
                  onClick={() => setSelectedGame(game)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedGame(game);
                    }
                  }}
                >
                  <div className="mgl-showcase-cover-wrap">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="mgl-showcase-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="mgl-showcase-rank">#{idx + 1}</span>
                    {typeof game.rating === "number" && (
                      <span className="mgl-score-badge">
                        <FaStar /> {game.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="mgl-showcase-info">
                    <h3 className="mgl-showcase-title">{game.title}</h3>
                    <span className="mgl-pill">{game.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Laptop Rig Specs */}
        <section className="mgl-rig-card" aria-label="Laptop Specifications">
          <div className="mgl-rig-header">
            <span className="mgl-rig-eyebrow">
              <FaLaptop /> Gaming &amp; Dev Rig
            </span>
            <h2 className="mgl-rig-title">{LAPTOP_SPECS.model}</h2>
          </div>
          <div className="mgl-rig-grid">
            {LAPTOP_SPECS.specs.map((item) => (
              <div key={item.label} className="mgl-rig-item">
                <span className="mgl-rig-label">{item.label}</span>
                <span className="mgl-rig-value">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Controls: Search, Filter Tabs, Genre Pills, Sort */}
        <div className="mgl-controls">
          <div className="mgl-controls-top">
            <div className="mgl-tabs" role="tablist" aria-label="Filter games by status">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={selectedStatus === tab}
                  onClick={() => setSelectedStatus(tab)}
                  className={`mgl-tab${selectedStatus === tab ? " active" : ""}`}
                >
                  <span>{tab}</span>
                  <span className="mgl-tab-count">{statusCounts[tab]}</span>
                </button>
              ))}
            </div>

            <div className="mgl-search-sort">
              <div className="mgl-search-box">
                <FaSearch className="mgl-search-icon" />
                <input
                  type="text"
                  placeholder="Search games, platform, review..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mgl-search-input"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="mgl-search-clear"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              <select
                className="mgl-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort games"
              >
                <option value="default">Sort: Recent</option>
                <option value="rating">Sort: Score (High → Low)</option>
                <option value="title">Sort: Title (A–Z)</option>
              </select>

              <div className="mgl-view-toggle" role="group" aria-label="View mode">
                <button
                  type="button"
                  className={`mgl-view-btn${viewMode === "grid" ? " active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                  title="Grid view"
                >
                  <FaThLarge /> Grid
                </button>
                <button
                  type="button"
                  className={`mgl-view-btn${viewMode === "tier" ? " active" : ""}`}
                  onClick={() => setViewMode("tier")}
                  aria-pressed={viewMode === "tier"}
                  title="Tier List view"
                >
                  <FaLayerGroup /> Tier List
                </button>
              </div>
            </div>
          </div>

          <div className="mgl-genre-bar" role="group" aria-label="Filter games by genre">
            <span className="mgl-genre-label">Genre</span>
            <div className="mgl-genre-pills">
              {GENRE_FILTERS.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  aria-pressed={selectedGenre === genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`mgl-genre-pill${selectedGenre === genre ? " active" : ""}`}
                >
                  <span>{genre}</span>
                  <span className="mgl-genre-count">{genreCounts[genre]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Games Grid or Tier List */}
        {visibleGames.length === 0 ? (
          <div className="mgl-grid">
            <div className="mgl-empty">
              <p>No games match the current filter.</p>
              <button
                type="button"
                className="mgl-btn mgl-btn--secondary"
                onClick={() => {
                  setSelectedStatus("All");
                  setSelectedGenre("All");
                  setSearchTerm("");
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : viewMode === "tier" ? (
          <div className="mgl-tier-board" aria-label="Games Tier List">
            {tierRows.map((tier) => (
              <section key={tier.key} className="mgl-tier-row">
                <div className={`mgl-tier-badge mgl-tier-badge--${tier.key.toLowerCase()}`}>
                  <span className="mgl-tier-letter">{tier.label}</span>
                  <span className="mgl-tier-sub">{tier.sub}</span>
                </div>
                <div className="mgl-tier-items">
                  {tier.games.map((game) => (
                    <div
                      key={game.id}
                      className="mgl-tier-tile"
                      onClick={() => setSelectedGame(game)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedGame(game);
                        }
                      }}
                    >
                      <div className="mgl-tier-cover-wrap">
                        {game.image ? (
                          <img
                            src={game.image}
                            alt={game.title}
                            className="mgl-tier-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="mgl-cover-fallback">
                            <FaGamepad />
                          </div>
                        )}
                        {typeof game.rating === "number" && game.rating > 0 ? (
                          <span className="mgl-score-badge">
                            <FaStar /> {game.rating.toFixed(1)}
                          </span>
                        ) : (
                          <span className={`mgl-status-pill ${getStatusClass(game.status)}`}>
                            {game.status}
                          </span>
                        )}
                      </div>
                      <div className="mgl-tier-tile-body">
                        <h3 className="mgl-tier-tile-title">{game.title}</h3>
                        <div className="mgl-tier-tile-meta">
                          <span className="mgl-pill">{game.platform}</span>
                          {game.hours && <span className="mgl-meta-chip">{game.hours}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mgl-grid">
            {visibleGames.map((game) => (
              <article
                key={game.id}
                className="mgl-card"
                onClick={() => setSelectedGame(game)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedGame(game);
                  }
                }}
              >
                <div className="mgl-card-cover-wrap">
                  {game.image ? (
                    <img
                      src={game.image}
                      alt={game.title}
                      className="mgl-card-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="mgl-cover-fallback">
                      <FaGamepad />
                    </div>
                  )}
                  <span className={`mgl-status-pill ${getStatusClass(game.status)}`}>
                    {game.status}
                  </span>
                  {typeof game.rating === "number" && game.rating > 0 && (
                    <span className="mgl-score-badge">
                      <FaStar /> {game.rating.toFixed(1)}
                    </span>
                  )}
                </div>

                <div className="mgl-card-body">
                  <div className="mgl-card-tags">
                    <span className="mgl-pill">{game.platform}</span>
                    {game.genre && <span className="mgl-pill">{game.genre}</span>}
                  </div>
                  <h3 className="mgl-card-title">{game.title}</h3>
                  <p className="mgl-card-review">{game.review}</p>
                  <div className="mgl-card-footer">
                    <span className="mgl-updated-text">
                      <FaClock /> {game.updatedAt}
                    </span>
                    {(game.year || game.hours) && (
                      <div className="mgl-card-extra-meta">
                        {game.year && (
                          <span className="mgl-meta-chip">
                            <FaCalendarAlt /> {game.year}
                          </span>
                        )}
                        {game.hours && (
                          <span className="mgl-meta-chip">
                            <FaHourglassHalf /> {game.hours}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Game Review Detail Modal */}
      {selectedGame && (
        <div
          className="mgl-modal-overlay"
          onClick={() => setSelectedGame(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedGame.title}
        >
          <div className="mgl-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="mgl-modal-close"
              onClick={() => setSelectedGame(null)}
              aria-label="Close review modal"
            >
              <FaTimes />
            </button>
            <div className="mgl-modal-cover-wrap">
              {selectedGame.image ? (
                <img
                  src={selectedGame.image}
                  alt={selectedGame.title}
                  className="mgl-modal-cover"
                />
              ) : (
                <div className="mgl-cover-fallback mgl-cover-fallback--lg">
                  <FaGamepad />
                </div>
              )}
            </div>
            <div className="mgl-modal-body">
              <div className="mgl-modal-top-meta">
                <span className={`mgl-status-pill ${getStatusClass(selectedGame.status)}`}>
                  {selectedGame.status}
                </span>
                {typeof selectedGame.rating === "number" && selectedGame.rating > 0 && (
                  <span className="mgl-modal-score">
                    <FaStar /> {selectedGame.rating.toFixed(1)} / 10
                  </span>
                )}
              </div>
              <h2 className="mgl-modal-title">{selectedGame.title}</h2>
              <div className="mgl-card-tags">
                <span className="mgl-pill">{selectedGame.platform}</span>
                {selectedGame.genre && <span className="mgl-pill">{selectedGame.genre}</span>}
                {selectedGame.year && (
                  <span className="mgl-meta-chip">
                    <FaCalendarAlt /> {selectedGame.year}
                  </span>
                )}
                {selectedGame.hours && (
                  <span className="mgl-meta-chip">
                    <FaHourglassHalf /> {selectedGame.hours}
                  </span>
                )}
                <span className="mgl-updated-text">
                  <FaClock /> Updated {selectedGame.updatedAt}
                </span>
              </div>
              <div className="mgl-modal-review-box">
                <span className="mgl-modal-review-label">Review &amp; Notes</span>
                <p>{selectedGame.review}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGameList;
