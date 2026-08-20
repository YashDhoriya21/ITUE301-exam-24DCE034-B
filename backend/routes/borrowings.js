const express = require('express');
const router = express.Router();
const Borrowing = require('../models/Borrowing');
const Book = require('../models/Book');

// GET all borrowing records (populated with member & book info)
router.get('/', async (req, res) => {
  try {
    const borrowings = await Borrowing.find()
      .populate('memberId', 'name email department')
      .populate('bookId', 'title author isbn')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: borrowings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single borrowing record by ID
router.get('/:id', async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id)
      .populate('memberId', 'name email department')
      .populate('bookId', 'title author isbn');
    if (!borrowing) {
      return res.status(404).json({ success: false, message: 'Borrowing record not found' });
    }
    res.json({ success: true, data: borrowing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a new borrowing record
router.post('/', async (req, res) => {
  try {
    const { memberId, bookId, borrowDate, returnDate, status } = req.body;

    // Check if the book is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    if (!book.available) {
      return res.status(400).json({ success: false, message: 'Book is not available for borrowing' });
    }

    // Create borrowing record
    const borrowing = new Borrowing({ memberId, bookId, borrowDate, returnDate, status: status || 'borrowed' });
    const savedBorrowing = await borrowing.save();

    // Mark book as unavailable
    book.available = false;
    await book.save();

    res.status(201).json({ success: true, data: savedBorrowing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update a borrowing record (e.g., mark as returned)
router.put('/:id', async (req, res) => {
  try {
    const borrowing = await Borrowing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!borrowing) {
      return res.status(404).json({ success: false, message: 'Borrowing record not found' });
    }

    // If status changed to 'returned', mark the book as available again
    if (req.body.status === 'returned') {
      await Book.findByIdAndUpdate(borrowing.bookId, { available: true });
    }

    res.json({ success: true, data: borrowing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE a borrowing record by ID
router.delete('/:id', async (req, res) => {
  try {
    const borrowing = await Borrowing.findByIdAndDelete(req.params.id);
    if (!borrowing) {
      return res.status(404).json({ success: false, message: 'Borrowing record not found' });
    }
    res.json({ success: true, message: 'Borrowing record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
