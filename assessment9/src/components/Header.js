import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/" className="navbar-brand">AGENTS</Link>
    </nav>
  );
}

export default Header;
