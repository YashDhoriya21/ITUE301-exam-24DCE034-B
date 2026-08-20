import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// HomePage — Task 1
function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1 className="hero-title">📚 Library Book Management System</h1>
        <p className="hero-subtitle">
          Manage books, members and borrowing records of your college library.
        </p>
        <div className="hero-actions">
          <Link to="/books" className="btn btn-primary">Browse Books</Link>
          <Link to="/borrow" className="btn btn-secondary">Borrow a Book</Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📖</span>
          <h3>Books</h3>
          <p>Browse the complete collection of books available in the library.</p>
          <Link to="/books" className="stat-link">View Books →</Link>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <h3>Borrow</h3>
          <p>Fill out a borrowing request form and check out your book today.</p>
          <Link to="/borrow" className="stat-link">Borrow Now →</Link>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏫</span>
          <h3>Library</h3>
          <p>College Library — open Monday to Saturday, 9 AM to 5 PM.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
