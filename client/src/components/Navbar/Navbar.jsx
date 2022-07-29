import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="navbar_button" to="/create">
        Create your superhero
      </Link>
    </nav>
  );
}

export default Navbar;
