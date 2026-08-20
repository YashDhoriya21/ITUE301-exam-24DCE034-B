import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import './BooksPage.css';

// BooksPage — Tasks 1 & 4
// Fetches books from GET /api/v1/books using fetch + useEffect
// Manages three states: data, loading, error
function BooksPage() {
  const [data, setData] = useState([]);       // book data from API
  const [loading, setLoading] = useState(true);  // loading indicator
  const [error, setError] = useState(null);   // error message

  // Task 4: fetch on component mount using useEffect
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/api/v1/books');

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const json = await response.json();
        setData(json.data);  // API returns { success: true, data: [...] }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // empty dependency array → runs once on mount

  // 1. Display loading indicator while request is in progress
  if (loading) {
    return (
      <div className="books-page">
        <h1 className="page-title">📖 Books</h1>
        <div className="status-box loading-box">
          <span className="spinner">⏳</span>
          <p>Loading books from server...</p>
        </div>
      </div>
    );
  }

  // 2. Display error message if request fails
  if (error) {
    return (
      <div className="books-page">
        <h1 className="page-title">📖 Books</h1>
        <div className="status-box error-box">
          <span>❌</span>
          <p><strong>Error:</strong> {error}</p>
          <small>Make sure the backend server is running on port 5000.</small>
        </div>
      </div>
    );
  }

  // 3. Display book data after successful request
  return (
    <div className="books-page">
      <h1 className="page-title">📖 Books</h1>
      <p className="page-subtitle">
        {data.length} book{data.length !== 1 ? 's' : ''} available in the library
      </p>

      {data.length === 0 ? (
        <div className="status-box">
          <p>No books found.</p>
        </div>
      ) : (
        // 4. Render book data from API response (not hardcoded)
        <div className="books-grid">
          {data.map((book) => (
            <BookCard
              key={book.id || book._id}
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BooksPage;
