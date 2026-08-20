import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

// Navbar component — Task 2
// Uses React Router NavLink (no full-page reload)
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">📚 Library System</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/books" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/borrow" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Borrow
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
