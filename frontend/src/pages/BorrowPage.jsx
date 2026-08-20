import React, { useState } from 'react';
import './BorrowPage.css';

// BorrowPage — Task 2
// Controlled form with useState for: memberName, bookTitle, borrowDate, returnDate
// Displays a live preview as the user types (demonstrates state change on page)
function BorrowPage() {
  // State values (Task 2: at least two state values used meaningfully)
  const [memberName, setMemberName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memberName || !bookTitle || !borrowDate || !returnDate) {
      alert('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
  };

  // Reset form
  const handleReset = () => {
    setMemberName('');
    setBookTitle('');
    setBorrowDate('');
    setReturnDate('');
    setSubmitted(false);
  };

  return (
    <div className="borrow-page">
      <h1 className="page-title">📝 Borrow a Book</h1>
      <p className="page-subtitle">Fill out the form below to borrow a book from the library.</p>

      <div className="borrow-layout">
        {/* Borrowing Form — controlled component using value and onChange */}
        <form className="borrow-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="memberName">Member Name</label>
            <input
              id="memberName"
              type="text"
              placeholder="Enter your full name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}  // controlled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bookTitle">Book Title</label>
            <input
              id="bookTitle"
              type="text"
              placeholder="Enter the book title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}   // controlled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="borrowDate">Borrow Date</label>
            <input
              id="borrowDate"
              type="date"
              value={borrowDate}
              onChange={(e) => setBorrowDate(e.target.value)}  // controlled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="returnDate">Return Date</label>
            <input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}  // controlled
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Submit Request</button>
            <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
          </div>
        </form>

        {/* Live Preview — displays state values as they change */}
        <div className="borrow-preview">
          <h3>📋 Live Preview</h3>
          <p className="preview-note">This updates as you type, demonstrating state changes.</p>
          <div className="preview-card">
            <div className="preview-row">
              <span className="preview-label">Member Name</span>
              <span className="preview-value">{memberName || <em className="placeholder">—</em>}</span>
            </div>
            <div className="preview-row">
              <span className="preview-label">Book Title</span>
              <span className="preview-value">{bookTitle || <em className="placeholder">—</em>}</span>
            </div>
            <div className="preview-row">
              <span className="preview-label">Borrow Date</span>
              <span className="preview-value">{borrowDate || <em className="placeholder">—</em>}</span>
            </div>
            <div className="preview-row">
              <span className="preview-label">Return Date</span>
              <span className="preview-value">{returnDate || <em className="placeholder">—</em>}</span>
            </div>
            <div className="preview-row">
              <span className="preview-label">Status</span>
              <span className="preview-value status-badge">borrowed</span>
            </div>
          </div>

          {/* Success message after submission */}
          {submitted && (
            <div className="success-box">
              <h4>✅ Borrow Request Submitted!</h4>
              <p><strong>{memberName}</strong> has requested <strong>"{bookTitle}"</strong></p>
              <p>From <strong>{borrowDate}</strong> to <strong>{returnDate}</strong></p>
              <button className="btn-reset" onClick={handleReset}>Make Another Request</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BorrowPage;
