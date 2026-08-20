require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── In-Memory Data (Task 3) ─────────────────────────────────────────────────
const inMemoryBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', isbn: '978-0743273565', available: true },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic', isbn: '978-0061935466', available: false },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', isbn: '978-0132350884', available: true },
  { id: 4, title: 'The Pragmatic Programmer', author: 'David Thomas', category: 'Technology', isbn: '978-0135957059', available: true },
];

const inMemoryBorrowings = [
  { id: 1, memberId: 'member001', bookId: 2, borrowDate: '2026-08-01', returnDate: '2026-08-15', status: 'borrowed' },
];

// ─── Custom Request Logger Middleware (Task 3) ───────────────────────────────
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.path} [${timestamp}]`);
  next();
};

// ─── Global Middleware ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(requestLogger);  // Apply logger globally

// ─── Task 3 — In-Memory API Routes (/api/v1) ────────────────────────────────

// GET /api/v1/books — return all books
app.get('/api/v1/books', (req, res) => {
  res.status(200).json({ success: true, data: inMemoryBooks });
});

// POST /api/v1/borrowings — create new borrowing record
app.post('/api/v1/borrowings', (req, res) => {
  const { memberId, bookId, borrowDate, returnDate, status } = req.body;

  if (!memberId || !bookId || !borrowDate || !returnDate) {
    return res.status(400).json({
      success: false,
      message: 'memberId, bookId, borrowDate, and returnDate are required',
    });
  }

  const newBorrowing = {
    id: inMemoryBorrowings.length + 1,
    memberId,
    bookId,
    borrowDate,
    returnDate,
    status: status || 'borrowed',
  };
  inMemoryBorrowings.push(newBorrowing);

  res.status(201).json({ success: true, data: newBorrowing });
});

// GET /api/v1/borrowings — return all borrowing records
app.get('/api/v1/borrowings', (req, res) => {
  res.status(200).json({ success: true, data: inMemoryBorrowings });
});

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Library Book Management API is running 📚' });
});

// ─── Task 5 — Mongoose Routes (/api/v2) ─────────────────────────────────────
const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/members');
const borrowingRoutes = require('./routes/borrowings');

app.use('/api/v2/books', bookRoutes);
app.use('/api/v2/members', memberRoutes);
app.use('/api/v2/borrowings', borrowingRoutes);

// ─── Global Error-Handling Middleware (Task 3 — must be last) ────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.name : undefined,
  });
});

// ─── MongoDB Connection (Task 5) ─────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✅  Connected to MongoDB');
    })
    .catch((err) => {
      console.warn('⚠️  MongoDB connection failed (in-memory mode active):', err.message);
    });
} else {
  console.warn('⚠️  MONGO_URI not set — running in in-memory mode only');
}

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
