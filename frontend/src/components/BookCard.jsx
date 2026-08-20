import React from 'react';
import './BookCard.css';

// BookCard component — Task 1
// Accepts: title, author, category, available as props
function BookCard({ title, author, category, available }) {
  return (
    <div className="book-card">
      <div className="book-card-header">
        <span className="book-category">{category}</span>
        <span className={`book-availability ${available ? 'available' : 'unavailable'}`}>
          {available ? '✅ Available' : '❌ Not Available'}
        </span>
      </div>
      <h3 className="book-title">{title}</h3>
      <p className="book-author">by {author}</p>
    </div>
  );
}

export default BookCard;
