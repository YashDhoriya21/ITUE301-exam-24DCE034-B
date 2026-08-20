/**
 * Task 5 — MongoDB Schema Test Script
 * Run: node dbTest.js
 * Demonstrates: successful save + validation failures
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Member = require('./models/Member');
const Borrowing = require('./models/Borrowing');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/library_db';

async function runTests() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clean up previous test data
    await Book.deleteMany({ isbn: 'TEST-ISBN-001' });
    await Member.deleteMany({ email: 'testuser@library.com' });

    // ── Test 1: Valid Book Save ──────────────────────────────────────────────
    console.log('--- Test 1: Valid Book Save ---');
    const book = new Book({
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      category: 'Computer Science',
      isbn: 'TEST-ISBN-001',
      available: true,
    });
    const savedBook = await book.save();
    console.log('✅ Book saved:', savedBook.title, '| ID:', savedBook._id.toString());

    // ── Test 2: Valid Member Save ────────────────────────────────────────────
    console.log('\n--- Test 2: Valid Member Save ---');
    const member = new Member({
      name: 'Yash Dhoriya',
      email: 'testuser@library.com',
      phone: '9876543210',
      department: 'Computer Science',
    });
    const savedMember = await member.save();
    console.log('✅ Member saved:', savedMember.name, '| ID:', savedMember._id.toString());

    // ── Test 3: Valid Borrowing Save ─────────────────────────────────────────
    console.log('\n--- Test 3: Valid Borrowing Save ---');
    const borrowing = new Borrowing({
      memberId: savedMember._id,
      bookId: savedBook._id,
      borrowDate: new Date('2026-08-01'),
      returnDate: new Date('2026-08-15'),
      status: 'borrowed',
    });
    const savedBorrowing = await borrowing.save();
    console.log('✅ Borrowing saved | Status:', savedBorrowing.status);

    // ── Test 4: Validation Failure — Missing Book Title ──────────────────────
    console.log('\n--- Test 4: Validation Failure — Missing Book Title ---');
    try {
      const invalidBook = new Book({ author: 'Unknown', category: 'Test', isbn: 'INVALID-001' });
      await invalidBook.save();
    } catch (err) {
      console.log('✅ Validation caught:', JSON.stringify({
        success: false,
        message: 'Validation failed',
        errors: Object.keys(err.errors).map((field) => ({
          field,
          message: err.errors[field].message,
        })),
      }, null, 2));
    }

    // ── Test 5: Validation Failure — Invalid Borrowing Status ───────────────
    console.log('\n--- Test 5: Validation Failure — Invalid Borrowing Status ---');
    try {
      const invalidBorrowing = new Borrowing({
        memberId: savedMember._id,
        bookId: savedBook._id,
        borrowDate: new Date(),
        returnDate: new Date(),
        status: 'pending', // Invalid — not in enum
      });
      await invalidBorrowing.save();
    } catch (err) {
      console.log('✅ Validation caught:', JSON.stringify({
        success: false,
        message: 'Validation failed',
        errors: Object.keys(err.errors).map((field) => ({
          field,
          message: err.errors[field].message,
        })),
      }, null, 2));
    }

    // ── Test 6: Validation Failure — Missing Member Name ────────────────────
    console.log('\n--- Test 6: Validation Failure — Missing Member Name ---');
    try {
      const invalidMember = new Member({ email: 'noemail@test.com', department: 'CS' });
      await invalidMember.save();
    } catch (err) {
      console.log('✅ Validation caught:', JSON.stringify({
        success: false,
        message: 'Validation failed',
        errors: Object.keys(err.errors).map((field) => ({
          field,
          message: err.errors[field].message,
        })),
      }, null, 2));
    }

    console.log('\n✅ All schema tests completed successfully!');
  } catch (err) {
    console.error('❌ Test error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

runTests();
