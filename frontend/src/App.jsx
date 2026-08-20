import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components (reusable)
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BorrowPage from './pages/BorrowPage';

import './App.css';

// App — Task 2: React Router configuration
// Routes:
//   /        → HomePage
//   /books   → BooksPage
//   /borrow  → BorrowPage
function App() {
  return (
    <BrowserRouter>
      {/* Navbar renders on every page (contains router links) */}
      <Navbar />

      {/* Route definitions */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/borrow" element={<BorrowPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
